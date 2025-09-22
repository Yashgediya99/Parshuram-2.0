// import React, { useState } from 'react';
// import { Ticket } from '../../types';
// import { 
//   Plus, 
//   Search, 
//   Filter, 
//   Clock, 
//   CheckCircle, 
//   AlertCircle, 
//   User,
//   Calendar,
//   MessageSquare,
//   Eye
// } from 'lucide-react';
// import TicketModal from './TicketModal';


// interface TicketingPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// // const TicketingPage: React.FC = () => {
// const TicketingPage: React.FC<TicketingPageProps> = ({ tickets, setTickets }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//   const [showTicketModal, setShowTicketModal] = useState(false);
//   const [isCreateMode, setIsCreateMode] = useState(false);
//   const [filters, setFilters] = useState({
//     status: '',
//     severity: '',
//     assignee: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   const getStatusIcon = (status: Ticket['status']) => {
//     switch (status) {
//       case 'open': return <AlertCircle className="h-4 w-4 text-red-500" />;
//       case 'in-progress': return <Clock className="h-4 w-4 text-yellow-500" />;
//       case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
//       case 'closed': return <CheckCircle className="h-4 w-4 text-gray-500" />;
//       default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status: Ticket['status']) => {
//     switch (status) {
//       case 'open': return 'bg-red-900 text-red-300 border-red-500';
//       case 'in-progress': return 'bg-yellow-900 text-yellow-300 border-yellow-500';
//       case 'resolved': return 'bg-green-900 text-green-300 border-green-500';
//       case 'closed': return 'bg-gray-900 text-gray-300 border-gray-500';
//       default: return 'bg-gray-900 text-gray-300 border-gray-500';
//     }
//   };

//   const getSeverityColor = (severity: Ticket['severity']) => {
//     switch (severity) {
//       case 'critical': return 'bg-red-900 text-red-300';
//       case 'high': return 'bg-orange-900 text-orange-300';
//       case 'medium': return 'bg-yellow-900 text-yellow-300';
//       case 'low': return 'bg-blue-900 text-blue-300';
//       default: return 'bg-gray-900 text-gray-300';
//     }
//   };

//   const filteredTickets = tickets.filter(ticket => {
//     const matchesSearch = !searchTerm || 
//       ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesFilters = 
//       (!filters.status || ticket.status === filters.status) &&
//       (!filters.severity || ticket.severity === filters.severity) &&
//       (!filters.assignee || ticket.assignee.toLowerCase().includes(filters.assignee.toLowerCase()));

//     return matchesSearch && matchesFilters;
//   });

//   const handleCreateTicket = () => {
//     setSelectedTicket(null);
//     setIsCreateMode(true);
//     setShowTicketModal(true);
//   };

//   const handleViewTicket = (ticket: Ticket) => {
//     setSelectedTicket(ticket);
//     setIsCreateMode(false);
//     setShowTicketModal(true);
//   };

//   const handleSaveTicket = (ticketData: Partial<Ticket>) => {
//     if (isCreateMode) {
//       const newTicket: Ticket = {
//         id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
//         title: ticketData.title || '',
//         description: ticketData.description || '',
//         severity: ticketData.severity || 'medium',
//         status: 'open',
//         assignee: ticketData.assignee || '',
//         reporter: 'Current User', // In real app, get from auth context
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         relatedLogId: ticketData.relatedLogId
//       };
//       setTickets([newTicket, ...tickets]);
//     } else if (selectedTicket) {
//       setTickets(tickets.map(t => 
//         t.id === selectedTicket.id 
//           ? { ...t, ...ticketData, updatedAt: new Date().toISOString() }
//           : t
//       ));
//     }
//     setShowTicketModal(false);
//   };

//   const formatTimestamp = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const getTimeAgo = (timestamp: string) => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes}m ago`;
//     } else if (diffInMinutes < 1440) {
//       return `${Math.floor(diffInMinutes / 60)}h ago`;
//     } else {
//       return `${Math.floor(diffInMinutes / 1440)}d ago`;
//     }
//   };

//   return (
//     <div className="px-4 py-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">Security Tickets</h1>
//           <p className="text-gray-400">Manage security incidents and investigation tasks.</p>
//         </div>
//         <button
//           onClick={handleCreateTicket}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Ticket</span>
//         </button>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="mb-6 space-y-4">
//         <div className="flex space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search tickets..."
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
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <select
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.status}
//                 onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               >
//                 <option value="">All Statuses</option>
//                 <option value="open">Open</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="resolved">Resolved</option>
//                 <option value="closed">Closed</option>
//               </select>
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
//                 placeholder="Filter by assignee"
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.assignee}
//                 onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Tickets Grid */}
//       <div className="space-y-4">
//         {filteredTickets.map((ticket) => (
//           <div
//             key={ticket.id}
//             className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
//                   <span className="text-sm font-medium text-gray-400">#{ticket.id}</span>
//                 </div>
//                 <p className="text-gray-300 text-sm mb-3 line-clamp-2">
//                   {ticket.description}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleViewTicket(ticket)}
//                 className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
//               >
//                 <Eye className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-1">
//                   {getStatusIcon(ticket.status)}
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(ticket.status)}`}>
//                     {ticket.status.replace('-', ' ')}
//                   </span>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(ticket.severity)}`}>
//                   {ticket.severity}
//                 </span>
//                 <div className="flex items-center space-x-1 text-gray-400">
//                   <User className="h-4 w-4" />
//                   <span className="text-sm">{ticket.assignee}</span>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4 text-sm text-gray-400">
//                 <div className="flex items-center space-x-1">
//                   <Calendar className="h-4 w-4" />
//                   <span>{getTimeAgo(ticket.updatedAt)}</span>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <MessageSquare className="h-4 w-4" />
//                   <span>0</span> {/* Comment count would come from API */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredTickets.length === 0 && (
//         <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg">
//           <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-400 mb-2">No tickets found</h3>
//           <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
//         </div>
//       )}

//       {/* Ticket Modal */}
//       {showTicketModal && (
//         <TicketModal
//           ticket={selectedTicket}
//           isCreateMode={isCreateMode}
//           onSave={handleSaveTicket}
//           onClose={() => setShowTicketModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TicketingPage;


// import React, { useState } from 'react';
// import { Ticket } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Plus,
//   Search,
//   Filter,
//   Eye
// } from 'lucide-react';

// interface TicketingPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketingPage: React.FC<TicketingPageProps> = ({ tickets, setTickets }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     status: '',
//     severity: '',
//     assignee: ''
//   });

//   const getSeverityColor = (severity: Ticket['severity']) => {
//     switch (severity) {
//       case 'critical': return 'bg-red-900 text-red-300';
//       case 'high': return 'bg-orange-900 text-orange-300';
//       case 'medium': return 'bg-yellow-900 text-yellow-300';
//       case 'low': return 'bg-blue-900 text-blue-300';
//       default: return 'bg-gray-900 text-gray-300';
//     }
//   };
  
//   const filteredTickets = tickets.filter(ticket => {
//       const userGroup = user?.role.toUpperCase();
//       // Show tickets assigned to the user's group, or all tickets if they are admin
//       const isAssignedToUser = user?.role === 'admin' || ticket.assignee === userGroup;
      
//       const matchesSearch = !searchTerm ||
//           ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (ticket.relatedAlertId && ticket.relatedAlertId.toLowerCase().includes(searchTerm.toLowerCase()));
          
//       const matchesFilters = 
//         (!filters.status || ticket.status === filters.status) &&
//         (!filters.severity || ticket.severity === filters.severity) &&
//         (!filters.assignee || ticket.assignee.toUpperCase() === filters.assignee.toUpperCase());
        
//       return isAssignedToUser && matchesSearch && matchesFilters;
//   });

//   return (
//     <div className="px-4 py-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">Ticket Dashboard</h1>
//           <p className="text-gray-400">Manage security incidents and investigation tasks assigned to your group.</p>
//         </div>
//         <button
//           onClick={() => navigate('/tickets/create')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Manual Ticket</span>
//         </button>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
//          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by Ticket ID, Alert ID, or Title..."
//                   className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>
//              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Statuses</option>
//                 <option value="open">Open</option>
//                 <option value="triaged">Triaged</option>
//                 <option value="in-progress">In Progress</option>
//                 <option value="resolved">Resolved</option>
//                 <option value="closed">Closed</option>
//              </select>
//              <select value={filters.severity} onChange={(e) => setFilters({...filters, severity: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Severities</option>
//                 <option value="critical">Critical</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//              </select>
//              <select value={filters.assignee} onChange={(e) => setFilters({...filters, assignee: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Groups</option>
//                 <option value="SOC L1">SOC L1</option>
//                 <option value="SOC L2">SOC L2</option>
//                 <option value="SOC L3">SOC L3</option>
//                 <option value="SOC L4">SOC L4</option>
//              </select>
//          </div>
//       </div>
      
//       <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Ticket ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Alert ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Severity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">State</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Assigned Group</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Update</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//                 {filteredTickets.map(ticket => (
//                     <tr key={ticket.id} className="hover:bg-gray-700">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{ticket.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">{ticket.relatedAlertId ? <Link to="/alerts" className="hover:underline">{ticket.relatedAlertId}</Link> : 'N/A'}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ticket.title}</td>
//                         <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(ticket.severity)}`}>{ticket.severity}</span></td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">{ticket.status}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ticket.assignee}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(ticket.updatedAt).toLocaleString()}</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                             <button onClick={() => navigate(`/tickets/${ticket.id}`)} className="text-blue-400 hover:text-blue-300"><Eye /></button>
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketingPage;

import React, { useState } from 'react';
import { Ticket } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye } from 'lucide-react';

interface TicketingPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketingPage: React.FC<TicketingPageProps> = ({ tickets, setTickets }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    assignee: ''
  });

  const getSeverityColor = (severity: Ticket['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-300';
      case 'high': return 'bg-orange-900 text-orange-300';
      case 'medium': return 'bg-yellow-900 text-yellow-300';
      case 'low': return 'bg-blue-900 text-blue-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };
  
  const filteredTickets = tickets.filter(ticket => {
      const userGroup = user?.role?.toUpperCase().replace('-', ' ');
      const isAssignedToUser = user?.role === 'admin' || ticket.assignee === userGroup;
      
      const matchesSearch = !searchTerm ||
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (ticket.relatedLogId && ticket.relatedLogId.toLowerCase().includes(searchTerm.toLowerCase()));
          
      const matchesFilters = 
        (!filters.status || ticket.status === filters.status) &&
        (!filters.severity || ticket.severity === filters.severity) &&
        (!filters.assignee || ticket.assignee.toUpperCase() === filters.assignee.toUpperCase());
        
      return isAssignedToUser && matchesSearch && matchesFilters;
  });

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ticket Dashboard</h1>
          <p className="text-gray-400">Manage security incidents and investigation tasks.</p>
        </div>
        <button
          onClick={() => navigate('/tickets/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Ticket</span>
        </button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, Title, or Log ID..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
             <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="triaged">Triaged</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
             </select>
             <select value={filters.severity} onChange={(e) => setFilters({...filters, severity: e.target.value as Ticket['severity']})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
             </select>
             <select value={filters.assignee} onChange={(e) => setFilters({...filters, assignee: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Groups</option>
                <option value="SOC L1">SOC L1</option>
                <option value="SOC L2">SOC L2</option>
                <option value="SOC L3">SOC L3</option>
                <option value="SOC L4">SOC L4</option>
             </select>
         </div>
      </div>
      
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Log ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Update</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {filteredTickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ticket.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.relatedLogId || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(ticket.severity)}`}>{ticket.severity}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{ticket.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.assignee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(ticket.updatedAt).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => navigate(`/tickets/${ticket.id}`)} className="text-blue-400 hover:text-blue-300"><Eye /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketingPage;