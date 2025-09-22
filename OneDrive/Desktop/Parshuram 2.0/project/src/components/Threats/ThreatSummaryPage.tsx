// import React, { useState } from 'react';
// import { ThreatLog, Ticket } from '../../types';
// import { Search, Filter, Eye, AlertTriangle, Shield, Server } from 'lucide-react';
// import LogViewModal from '../Logs/LogViewModal';
// import TicketModal from '../Tickets/TicketModal';

// interface ThreatSummaryPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// // const ThreatSummaryPage: React.FC = () => {
// const ThreatSummaryPage: React.FC<ThreatSummaryPageProps> = ({ tickets, setTickets }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedThreat, setSelectedThreat] = useState<ThreatLog | null>(null);
//   const [showLogModal, setShowLogModal] = useState(false);
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [isCreateTicketMode, setIsCreateTicketMode] = useState(false);
//   const [filters, setFilters] = useState({
//     agentId: '',
//     ip: '',
//     os: '',
//     severity: '',
//     ruleMatched: '',
//     channel: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
  

//   // Mock data - replace with real API calls
//   const [threats, setThreats] = useState<ThreatLog[]>([
//     {
//       id: '1',
//       agentId: 'WIN-001',
//       ip: '192.168.1.100',
//       os: 'Windows 11',
//       severity: 'critical',
//       message: 'Malware detected: Trojan.Generic.KD.123456',
//       ruleMatched: 'RULE-001',
//       channel: 'sysmon',
//       timeCreated: '2025-01-02T14:30:00Z',
//       level: 'Error',
//       eventId: '1',
//       source: 'Microsoft-Windows-Sysmon',
//       task: 'Process Create',
//       computer: 'DESKTOP-ABC123',
//       description: 'Process creation detected for suspicious executable',
//       isProcessed: false,
//       isFixed: false
//     },
//     {
//       id: '2',
//       agentId: 'LIN-003',
//       ip: '192.168.1.102',
//       os: 'Ubuntu 22.04',
//       severity: 'high',
//       message: 'SSH brute force attack detected',
//       ruleMatched: 'RULE-045',
//       channel: 'auth',
//       timeCreated: '2025-01-02T14:25:00Z',
//       level: 'Warning',
//       eventId: '4625',
//       source: 'auth.log',
//       task: 'Authentication',
//       computer: 'SERVER-XYZ789',
//       description: 'Multiple failed SSH login attempts from external IP',
//       isProcessed: true,
//       isFixed: false
//     },
//     {
//       id: '3',
//       agentId: 'NET-005',
//       ip: '192.168.1.50',
//       os: 'pfSense 2.7.0',
//       severity: 'medium',
//       message: 'Suspicious network traffic pattern',
//       ruleMatched: 'RULE-078',
//       channel: 'firewall',
//       timeCreated: '2025-01-02T14:20:00Z',
//       level: 'Information',
//       eventId: '2001',
//       source: 'pfSense',
//       task: 'Network Monitoring',
//       computer: 'FIREWALL-001',
//       description: 'Unusual outbound connections detected',
//       isProcessed: true,
//       isFixed: true
//     }
//   ]);

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'border-red-500 bg-red-900/20';
//       case 'high': return 'border-orange-500 bg-orange-900/20';
//       case 'medium': return 'border-yellow-500 bg-yellow-900/20';
//       case 'low': return 'border-blue-500 bg-blue-900/20';
//       default: return 'border-gray-500 bg-gray-900/20';
//     }
//   };

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
//       case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
//       case 'medium': return <Shield className="h-5 w-5 text-yellow-500" />;
//       case 'low': return <Shield className="h-5 w-5 text-blue-500" />;
//       default: return <Shield className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const filteredThreats = threats.filter(threat => {
//     const matchesSearch = !searchTerm || 
//       threat.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       threat.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       threat.ip.includes(searchTerm);

//     const matchesFilters = 
//       (!filters.agentId || threat.agentId.includes(filters.agentId)) &&
//       (!filters.ip || threat.ip.includes(filters.ip)) &&
//       (!filters.os || threat.os.toLowerCase().includes(filters.os.toLowerCase())) &&
//       (!filters.severity || threat.severity === filters.severity) &&
//       (!filters.ruleMatched || threat.ruleMatched.includes(filters.ruleMatched)) &&
//       (!filters.channel || threat.channel.includes(filters.channel));

//     return matchesSearch && matchesFilters;
//   });

//   const handleViewLog = (threat: ThreatLog) => {
//     setSelectedThreat(threat);
//     setShowLogModal(true);
//   };

//   const handleCreateTicket = (log: ThreatLog) => {
//     setSelectedThreat(log);
//     setIsCreateTicketMode(true);
//     setShowTicketModal(true);
//     setShowLogModal(false);
//   };

//   const handleMarkFalsePositive = (logId: string) => {
//     // console.log(`Marking threat ${logId} as false positive`);
//     // In real app, this would call an API
//     // alert(`Threat ${logId} marked as false positive`);
//     setThreats(threats.map(t => t.id === logId ? { ...t, isFalsePositive: true } : t));
//     setShowLogModal(false);
//   };

//   // const handleSaveTicket = (ticketData: any) => {
//   //   console.log('Creating ticket:', ticketData);
//   //   // In real app, this would call an API
//   //   alert('Ticket created successfully!');
//   //   setShowTicketModal(false);
//   //   setIsCreateTicketMode(false);
//   // };

//   const handleSaveTicket = (ticketData: Partial<Ticket>) => {
//     // This logic now correctly updates the state that lives in App.tsx
//     const newTicket: Ticket = {
//       id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
//       title: ticketData.title || 'New Ticket from Threat',
//       description: ticketData.description || `Investigation for log ID ${selectedThreat && 'id' in selectedThreat ? selectedThreat.id : ''}`,
//       severity: ticketData.severity || 'medium',
//       status: 'open',
//       assignee: ticketData.assignee || 'Unassigned',
//       reporter: 'System',
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       relatedLogId: selectedThreat && 'id' in selectedThreat ? selectedThreat.id : undefined,
//     };
//     setTickets([newTicket, ...tickets]);
//     setShowTicketModal(false);
//   };
//   const formatTimestamp = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="px-4 py-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white mb-2">Threat Summary</h1>
//         <p className="text-gray-400">Monitor and analyze security threats detected across your infrastructure.</p>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="mb-6 space-y-4">
//         <div className="flex space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search threats..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
//           >
//             <Filter className="h-4 w-4" />
//             <span>Filters</span>
//           </button>
//         </div>

//         {showFilters && (
//           <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               <input
//                 type="text"
//                 placeholder="Agent ID"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.agentId}
//                 onChange={(e) => setFilters({ ...filters, agentId: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="IP Address"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.ip}
//                 onChange={(e) => setFilters({ ...filters, ip: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="OS"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.os}
//                 onChange={(e) => setFilters({ ...filters, os: e.target.value })}
//               />
//               <select
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.severity}
//                 onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
//               >
//                 <option value="">All Severities</option>
//                 <option value="critical">Critical</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Rule ID"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.ruleMatched}
//                 onChange={(e) => setFilters({ ...filters, ruleMatched: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Channel"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.channel}
//                 onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Threats Table */}
//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Severity
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Agent ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   IP Address
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   OS
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Message
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Rule ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {filteredThreats.map((threat) => (
//                 <tr key={threat.id} className="hover:bg-gray-700 transition-colors">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       {getSeverityIcon(threat.severity)}
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
//                         ${threat.severity === 'critical' ? 'bg-red-900 text-red-300' : ''}
//                         ${threat.severity === 'high' ? 'bg-orange-900 text-orange-300' : ''}
//                         ${threat.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' : ''}
//                         ${threat.severity === 'low' ? 'bg-blue-900 text-blue-300' : ''}
//                       `}>
//                         {threat.severity}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                     {threat.agentId}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {threat.ip}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {threat.os}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
//                     {threat.message}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                     {threat.ruleMatched}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleViewLog(threat)}
//                       className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
//                     >
//                       <Eye className="h-4 w-4" />
//                       <span>View Log</span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {filteredThreats.length === 0 && (
//         <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg mt-6">
//           <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-400 mb-2">No threats found</h3>
//           <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
//         </div>
//       )}

//       {/* Log View Modal */}
//       {showLogModal && selectedThreat && (
//         <LogViewModal
//           log={selectedThreat}
//           onClose={() => setShowLogModal(false)}
//           onCreateTicket={handleCreateTicket}
//           onMarkFalsePositive={handleMarkFalsePositive}
//         />
//       )}

//       {/* Ticket Modal */}
//       {showTicketModal && (
//         <TicketModal
//           ticket={null}
//           isCreateMode={isCreateTicketMode}
//           onSave={handleSaveTicket}
//           onClose={() => {
//             setShowTicketModal(false);
//             setIsCreateTicketMode(false);
//           }}
//           relatedLogId={selectedThreat?.id}
//         />
//       )}
//     </div>
//   );
// };

// export default ThreatSummaryPage;











import React, { useState } from 'react';
import { ThreatLog, Ticket, Log } from '../../types';
import { Search, Filter, Eye, AlertTriangle, Shield } from 'lucide-react';
import LogViewModal from '../Logs/LogViewModal';
import TicketModal from '../Tickets/TicketModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ThreatSummaryPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const ThreatSummaryPage: React.FC<ThreatSummaryPageProps> = ({ tickets, setTickets }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThreat, setSelectedThreat] = useState<ThreatLog | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isCreateTicketMode, setIsCreateTicketMode] = useState(false);
  const [filters, setFilters] = useState({
    agentId: '',
    ip: '',
    os: '',
    severity: '',
    ruleMatched: '',
    channel: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // This state is local to this component, representing only the threats.
  const [threats, setThreats] = useState<ThreatLog[]>([
    {
      id: '1',
      agentId: 'WIN-001',
      ip: '192.168.1.100',
      os: 'Windows 11',
      severity: 'critical',
      message: 'Malware detected: Trojan.Generic.KD.123456',
      ruleMatched: 'RULE-001',
      channel: 'sysmon',
      timeCreated: '2025-01-02T14:30:00Z',
      level: 'Error',
      eventId: '1',
      source: 'Microsoft-Windows-Sysmon',
      task: 'Process Create',
      computer: 'DESKTOP-ABC123',
      description: 'Process creation detected for suspicious executable',
      isProcessed: false,
      isFixed: false,
      isFalsePositive: false,
    },
    {
      id: '2',
      agentId: 'LIN-003',
      ip: '192.168.1.102',
      os: 'Ubuntu 22.04',
      severity: 'high',
      message: 'SSH brute force attack detected',
      ruleMatched: 'RULE-045',
      channel: 'auth',
      timeCreated: '2025-01-02T14:25:00Z',
      level: 'Warning',
      eventId: '4625',
      source: 'auth.log',
      task: 'Authentication',
      computer: 'SERVER-XYZ789',
      description: 'Multiple failed SSH login attempts from external IP',
      isProcessed: true,
      isFixed: false,
      isFalsePositive: false,
    },
    {
      id: '3',
      agentId: 'NET-005',
      ip: '192.168.1.50',
      os: 'pfSense 2.7.0',
      severity: 'medium',
      message: 'Suspicious network traffic pattern',
      ruleMatched: 'RULE-078',
      channel: 'firewall',
      timeCreated: '2025-01-02T14:20:00Z',
      level: 'Information',
      eventId: '2001',
      source: 'pfSense',
      task: 'Network Monitoring',
      computer: 'FIREWALL-001',
      description: 'Unusual outbound connections detected',
      isProcessed: true,
      isFixed: true,
      isFalsePositive: true,
    }
  ]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium': return <Shield className="h-5 w-5 text-yellow-500" />;
      case 'low': return <Shield className="h-5 w-5 text-blue-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = !searchTerm || 
      threat.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.ip.includes(searchTerm);

    const matchesFilters = 
      (!filters.agentId || threat.agentId.includes(filters.agentId)) &&
      (!filters.ip || threat.ip.includes(filters.ip)) &&
      (!filters.os || threat.os.toLowerCase().includes(filters.os.toLowerCase())) &&
      (!filters.severity || threat.severity === filters.severity) &&
      (!filters.ruleMatched || threat.ruleMatched.includes(filters.ruleMatched)) &&
      (!filters.channel || threat.channel.includes(filters.channel));

    return matchesSearch && matchesFilters;
  });

  const handleViewLog = (threat: ThreatLog) => {
    setSelectedThreat(threat);
    setShowLogModal(true);
  };
  
  const handleCreateTicket = (log: ThreatLog | Log) => {
    // Type guard to ensure we only handle ThreatLogs on this page
    if ('ruleMatched' in log && 'isProcessed' in log && 'isFixed' in log) {
        setSelectedThreat(log);
        setIsCreateTicketMode(true);
        setShowTicketModal(true);
        setShowLogModal(false);
    }
  };

  const handleMarkFalsePositive = (logId: string) => {
    setThreats(threats.map(t => t.id === logId ? { ...t, isFalsePositive: true } : t));
    setShowLogModal(false);
  };

  const handleSaveTicket = (ticketData: Partial<Ticket>) => {
    if (!selectedThreat) return;

    const newTicket: Ticket = {
        id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
        title: ticketData.title || `Threat Detected: ${selectedThreat.message}`,
        description: ticketData.description || `Investigation for log ID ${selectedThreat.id}`,
        severity: ticketData.severity || selectedThreat.severity,
        status: 'open',
        assignee: ticketData.assignee || 'SOC L1',
        reporter: user?.email || 'SIEM System',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        relatedLogId: selectedThreat.id,
        comments: [],
      };
      
      // This updates the central state in App.tsx
      setTickets([newTicket, ...tickets]);
      
      setShowTicketModal(false);
      setIsCreateTicketMode(false);
      
      // Navigate to the new ticket's detail page
      navigate(`/tickets/${newTicket.id}`);
    };

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Threat Summary</h1>
        <p className="text-gray-400">Monitor and analyze security threats detected across your infrastructure.</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search threats..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <input type="text" placeholder="Agent ID" className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.agentId} onChange={(e) => setFilters({ ...filters, agentId: e.target.value })} />
              <input type="text" placeholder="IP Address" className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.ip} onChange={(e) => setFilters({ ...filters, ip: e.target.value })} />
              <input type="text" placeholder="OS" className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.os} onChange={(e) => setFilters({ ...filters, os: e.target.value })} />
              <select className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.severity} onChange={(e) => setFilters({ ...filters, severity: e.target.value })}>
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input type="text" placeholder="Rule ID" className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.ruleMatched} onChange={(e) => setFilters({ ...filters, ruleMatched: e.target.value })} />
              <input type="text" placeholder="Channel" className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={filters.channel} onChange={(e) => setFilters({ ...filters, channel: e.target.value })} />
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Agent ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">OS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rule ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(threat.severity)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                        ${threat.severity === 'critical' ? 'bg-red-900 text-red-300' : ''}
                        ${threat.severity === 'high' ? 'bg-orange-900 text-orange-300' : ''}
                        ${threat.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' : ''}
                        ${threat.severity === 'low' ? 'bg-blue-900 text-blue-300' : ''}
                      `}>
                        {threat.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{threat.agentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.os}</td>
                  <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{threat.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.ruleMatched}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewLog(threat)}
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Log</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredThreats.length === 0 && (
        <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg mt-6">
          <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No threats found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {showLogModal && selectedThreat && (
        <LogViewModal
          log={selectedThreat}
          onClose={() => setShowLogModal(false)}
          onCreateTicket={handleCreateTicket}
          onMarkFalsePositive={handleMarkFalsePositive}
        />
      )}

      {showTicketModal && (
        <TicketModal
          ticket={null}
          isCreateMode={isCreateTicketMode}
          onSave={handleSaveTicket}
          onClose={() => {
            setShowTicketModal(false);
            setIsCreateTicketMode(false);
          }}
          relatedLogId={selectedThreat?.id}
        />
      )}
    </div>
  );
};

export default ThreatSummaryPage;