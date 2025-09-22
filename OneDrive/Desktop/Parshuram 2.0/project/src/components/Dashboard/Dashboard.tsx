import React, { useState } from 'react';
import { ThreatLog, Notification } from '../../types';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Bell,
  TrendingUp,
  Activity,
  Server
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import NotificationPanel from './NotificationPanel';

const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - replace with real API calls
  const threatStats = {
    total: 1247,
    processing: 23,
    resolved: 1201,
    critical: 3
  };

  const threatTrends = [
    { name: 'Jan', threats: 120, resolved: 115 },
    { name: 'Feb', threats: 98, resolved: 95 },
    { name: 'Mar', threats: 145, resolved: 140 },
    { name: 'Apr', threats: 178, resolved: 170 },
    { name: 'May', threats: 203, resolved: 198 },
    { name: 'Jun', threats: 156, resolved: 150 }
  ];

  const deviceThreats = [
    { name: 'Windows Endpoints', value: 45, color: '#3B82F6' },
    { name: 'Linux Servers', value: 23, color: '#10B981' },
    { name: 'Network Devices', value: 18, color: '#F59E0B' },
    { name: 'Mobile Devices', value: 14, color: '#EF4444' }
  ];

  const recentThreats = [
    {
      id: '1',
      severity: 'critical' as const,
      message: 'Malware detected on DESKTOP-ABC123',
      timestamp: '2025-01-02T14:30:00Z',
      agentId: 'WIN-001'
    },
    {
      id: '2',
      severity: 'high' as const,
      message: 'Suspicious network activity from 192.168.1.50',
      timestamp: '2025-01-02T14:25:00Z',
      agentId: 'NET-005'
    },
    {
      id: '3',
      severity: 'medium' as const,
      message: 'Failed login attempts detected',
      timestamp: '2025-01-02T14:20:00Z',
      agentId: 'LIN-003'
    }
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      message: 'Critical malware detected on DESKTOP-ABC123',
      timestamp: '2025-01-02T14:30:00Z',
      severity: 'critical',
      read: false
    },
    {
      id: '2',
      message: 'High priority threat resolved on SERVER-XYZ789',
      timestamp: '2025-01-02T14:25:00Z',
      severity: 'high',
      read: false
    },
    {
      id: '3',
      message: 'New device connection approved',
      timestamp: '2025-01-02T14:20:00Z',
      severity: 'low',
      read: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Real-time overview of your security posture</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Threats</p>
              <p className="text-2xl font-bold text-white">{threatStats.total}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Being Processed</p>
              <p className="text-2xl font-bold text-yellow-400">{threatStats.processing}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-2xl font-bold text-green-400">{threatStats.resolved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Active</p>
              <p className="text-2xl font-bold text-red-400">{threatStats.critical}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Threat Trends */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Threat Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '8px' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="threats" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Threats Detected"
              />
              <Line 
                type="monotone" 
                dataKey="resolved" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Threats Resolved"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device-specific Threats */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Server className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Threats by Device Type</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceThreats}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceThreats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '8px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Recent Threat Activity</h3>
        </div>
        <div className="space-y-3">
          {recentThreats.map((threat) => (
            <div key={threat.id} className="flex items-start justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize
                    ${threat.severity === 'critical' ? 'bg-red-900 text-red-300' : ''}
                    ${threat.severity === 'high' ? 'bg-orange-900 text-orange-300' : ''}
                    ${threat.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' : ''}
                    ${threat.severity === 'low' ? 'bg-blue-900 text-blue-300' : ''}
                  `}>
                    {threat.severity}
                  </span>
                  <span className="text-gray-400 text-sm">{threat.agentId}</span>
                </div>
                <p className="text-white text-sm">{threat.message}</p>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date(threat.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;