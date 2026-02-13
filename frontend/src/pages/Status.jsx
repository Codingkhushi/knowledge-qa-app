import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { healthCheck } from '../api';

const Status = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const healthData = await healthCheck();
      setStatus(healthData);
      setError(null);
    } catch (err) {
      setError('Failed to connect to backend');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'healthy') return 'bg-green-500';
    if (status.includes('unhealthy')) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getStatusText = (status) => {
    if (status === 'healthy') return 'Healthy';
    if (status.includes('unhealthy')) return 'Unhealthy';
    return 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          System Status
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && !status ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Checking system health...</p>
          </div>
        ) : status ? (
          <div className="space-y-6">
            {/* Overall Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Overall Status
                </h2>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)} mr-2`}></div>
                  <span className="font-semibold text-gray-800">
                    {status.status === 'healthy' ? 'All Systems Operational' : 'Degraded Performance'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Last checked: {new Date(status.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Component Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Components
              </h2>
              <div className="space-y-4">
                {/* Backend */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Backend API</h3>
                    <p className="text-sm text-gray-600">FastAPI server</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status.components.backend)} mr-2`}></div>
                    <span className="font-medium text-gray-800">
                      {getStatusText(status.components.backend)}
                    </span>
                  </div>
                </div>

                {/* Database */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Database</h3>
                    <p className="text-sm text-gray-600">SQLite storage</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status.components.database)} mr-2`}></div>
                    <span className="font-medium text-gray-800">
                      {getStatusText(status.components.database)}
                    </span>
                  </div>
                </div>

                {/* LLM */}
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">LLM Connection</h3>
                    <p className="text-sm text-gray-600">Groq API (llama-3.3-70b-versatile)</p>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status.components.llm)} mr-2`}></div>
                    <span className="font-medium text-gray-800">
                      {typeof status.components.llm === 'string' && status.components.llm.includes('unhealthy') 
                        ? status.components.llm.split(': ')[1] 
                        : getStatusText(status.components.llm)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={checkHealth}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              {loading ? 'Checking...' : 'Refresh Status'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Status;
