import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Knowledge Q&A
          </h1>
          <p className="text-xl text-gray-600">
            Upload documents and ask questions about them
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            How it works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Upload Documents</h3>
                <p className="text-gray-600">
                  Upload your text files (.txt) containing the information you want to query.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Ask Questions</h3>
                <p className="text-gray-600">
                  Type your questions in natural language about the uploaded documents.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Get Answers with Sources</h3>
                <p className="text-gray-600">
                  Receive AI-powered answers along with the exact sources from your documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/documents"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 rounded-lg shadow-lg transition duration-200 text-center text-xl"
          >
            📄 Manage Documents
          </Link>
          <Link
            to="/ask"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6 px-8 rounded-lg shadow-lg transition duration-200 text-center text-xl"
          >
            💬 Ask Questions
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/status"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Check System Status →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
