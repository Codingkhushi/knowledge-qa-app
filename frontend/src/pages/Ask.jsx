import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { askQuestion } from '../api';

const Ask = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setAnswer(null);
      const result = await askQuestion(question);
      setAnswer(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get answer. Make sure you have uploaded documents.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          Ask a Question
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Question Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know about your documents?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="4"
              disabled={loading}
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Make sure you have uploaded documents first
              </p>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </span>
                ) : (
                  'Get Answer'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Answer Display */}
        {answer && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Answer
              </h2>
              <div className="prose max-w-none text-gray-700">
                {answer.answer}
              </div>
            </div>

            {/* Sources */}
            {answer.sources && answer.sources.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Sources
                </h2>
                <div className="space-y-4">
                  {answer.sources.map((source, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            📄 {source.filename}
                          </p>
                          <p className="text-sm text-gray-600">
                            Section {source.chunk_index + 1}
                          </p>
                        </div>
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {(source.relevance * 100).toFixed(0)}% match
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 italic">
                        "{source.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Example Questions */}
        {!answer && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Example Questions
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                What is the main topic of the document?
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Can you summarize the key points?
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                What does the document say about [specific topic]?
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Are there any specific recommendations mentioned?
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ask;
