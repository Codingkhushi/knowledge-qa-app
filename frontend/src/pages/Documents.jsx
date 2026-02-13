import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDocuments, uploadDocument, deleteDocument } from '../api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const docs = await listDocuments();
      setDocuments(docs);
      setError(null);
    } catch (err) {
      setError('Failed to load documents. Please check if the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    if (!file.name.endsWith('.txt')) {
      setError('Only .txt files are supported');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      await uploadDocument(file);
      setSuccess(`${file.name} uploaded successfully!`);
      setTimeout(() => setSuccess(null), 3000);
      await loadDocuments();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload document');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId, filename) => {
    if (!window.confirm(`Delete "${filename}"?`)) return;

    try {
      await deleteDocument(docId);
      setSuccess('Document deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
      await loadDocuments();
    } catch (err) {
      setError('Failed to delete document');
      console.error(err);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
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
          Document Management
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-dashed transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop a .txt file here, or
            </p>
            <label className="mt-2 cursor-pointer inline-block">
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                {uploading ? 'Uploading...' : 'Browse Files'}
              </span>
              <input
                type="file"
                accept=".txt"
                className="hidden"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
                disabled={uploading}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500">Only .txt files are supported</p>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Uploaded Documents ({documents.length})
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No documents uploaded yet. Upload your first document above!
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{doc.filename}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(doc.upload_date).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id, doc.filename)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;
