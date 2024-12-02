import React, { useState } from 'react';
import { Menu, Plus, LayoutDashboard } from 'lucide-react';
import JobForm from './components/JobForm';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'job-form'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Field Agent App</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`p-2 rounded-lg ${
                  currentView === 'dashboard'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard size={20} />
              </button>
              <button
                onClick={() => setCurrentView('job-form')}
                className={`p-2 rounded-lg ${
                  currentView === 'job-form'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {currentView === 'dashboard' ? (
              <Dashboard />
            ) : (
              <>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Add New Job Listing</h2>
                <JobForm />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;