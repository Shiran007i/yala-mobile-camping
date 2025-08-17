import React, { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  TrendingUp,
  Download,
  RefreshCw,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
  Send,
  UserX,
  BarChart3
} from 'lucide-react';

const NewsletterAdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState('idle');

  // Fetch newsletter statistics
  const fetchStats = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) setRefreshing(true);
      else setLoading(true);
      
      const response = await fetch('/api/newsletter/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch stats');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching newsletter stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Test newsletter functionality
  const testNewsletter = async () => {
    setTestEmailStatus('loading');
    try {
      const response = await fetch('/api/test-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTestEmailStatus('success');
        setTimeout(() => setTestEmailStatus('idle'), 3000);
      } else {
        throw new Error(data.message || 'Test failed');
      }
    } catch (err) {
      setTestEmailStatus('error');
      setTimeout(() => setTestEmailStatus('idle'), 3000);
      console.error('Newsletter test failed:', err);
    }
  };

  // Export subscribers (basic CSV download)
  const exportSubscribers = () => {
    if (!stats || !stats.latestSubscriptions) return;
    
    const csvContent = [
      'Email,Subscribed At,Source,Status',
      ...stats.latestSubscriptions.map(sub => 
        `${sub.email},${new Date(sub.subscribedAt).toLocaleDateString()},${sub.source},Active`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Load stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading newsletter statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchStats()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
                <p className="text-gray-600 mt-1">Manage your newsletter subscribers and campaigns</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => fetchStats(true)}
                  disabled={refreshing}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={testNewsletter}
                  disabled={testEmailStatus === 'loading'}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    testEmailStatus === 'success' 
                      ? 'bg-green-600 text-white' 
                      : testEmailStatus === 'error'
                      ? 'bg-red-600 text-white'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  } disabled:opacity-50`}
                >
                  {testEmailStatus === 'loading' ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : testEmailStatus === 'success' ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : testEmailStatus === 'error' ? (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {testEmailStatus === 'loading' ? 'Testing...' : 
                   testEmailStatus === 'success' ? 'Test Sent!' :
                   testEmailStatus === 'error' ? 'Test Failed' : 'Test Newsletter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Active Subscribers</h3>
                <p className="text-2xl font-bold text-gray-900">{stats?.active || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Subscribers</h3>
                <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Recent (30 days)</h3>
                <p className="text-2xl font-bold text-gray-900">{stats?.recentSubscriptions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <UserX className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Unsubscribed</h3>
                <p className="text-2xl font-bold text-gray-900">{stats?.unsubscribed || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Subscription Sources</h3>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            
            {stats?.bySource && Object.keys(stats.bySource).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(stats.bySource)
                  .sort(([,a], [,b]) => b - a)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 capitalize">
                          {source.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-900 font-semibold mr-3">{count}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.max((count / stats.active) * 100, 5)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No subscription data available</p>
              </div>
            )}
          </div>

          {/* Latest Subscriptions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Latest Subscriptions</h3>
              <button
                onClick={exportSubscribers}
                className="flex items-center px-3 py-2 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
            
            {stats?.latestSubscriptions && stats.latestSubscriptions.length > 0 ? (
              <div className="space-y-4">
                {stats.latestSubscriptions.map((subscriber, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{subscriber.email}</p>
                      <p className="text-sm text-gray-500">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        {subscriber.source && (
                          <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">
                            {subscriber.source.replace('_', ' ')}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No subscribers yet</p>
                <p className="text-sm text-gray-400 mt-1">Subscribers will appear here once people sign up</p>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Health Status */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Health Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-900">Email Configuration</p>
                <p className="text-sm text-green-700">ZOHO & Gmail configured</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-900">Subscription Form</p>
                <p className="text-sm text-blue-700">Active on website footer</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-purple-900">Unsubscribe Page</p>
                <p className="text-sm text-purple-700">Available at /unsubscribe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => window.open('/api/health', '_blank')}
              className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              System Health
            </button>
            
            <button
              onClick={() => window.open('/#contact', '_blank')}
              className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              View Signup Form
            </button>
            
            <button
              onClick={() => window.open('/unsubscribe', '_blank')}
              className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <UserX className="h-5 w-5 mr-2" />
              Test Unsubscribe
            </button>
            
            <button
              onClick={() => fetchStats(true)}
              className="flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdminPanel;