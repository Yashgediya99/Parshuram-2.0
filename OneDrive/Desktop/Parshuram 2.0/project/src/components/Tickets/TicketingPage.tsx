// import React, { useState } from 'react';
// import { Ticket } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { Plus, Search, Filter, Eye } from 'lucide-react';

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
//       const userGroup = user?.role?.toUpperCase().replace('-', ' ');
//       const isAssignedToUser = user?.role === 'admin' || ticket.assignee === userGroup;
      
//       const matchesSearch = !searchTerm ||
//           ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (ticket.relatedLogId && ticket.relatedLogId.toLowerCase().includes(searchTerm.toLowerCase()));
          
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
//           <p className="text-gray-400">Manage security incidents and investigation tasks.</p>
//         </div>
//         <button
//           onClick={() => navigate('/tickets/create')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Ticket</span>
//         </button>
//       </div>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
//          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by ID, Title, or Log ID..."
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
//              <select value={filters.severity} onChange={(e) => setFilters({...filters, severity: e.target.value as Ticket['severity']})} className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">All Severities</option>
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//                 <option value="critical">Critical</option>
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
//           <table className="w-full text-white">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Ticket ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Log ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Title</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Severity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Assigned To</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Update</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//                 {filteredTickets.map(ticket => (
//                     <tr key={ticket.id} className="hover:bg-gray-700">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ticket.id}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.relatedLogId || 'N/A'}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.title}</td>
//                         <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(ticket.severity)}`}>{ticket.severity}</span></td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{ticket.status}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">{ticket.assignee}</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(ticket.updatedAt).toLocaleString()}</td>
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
import { Search, Eye } from 'lucide-react';

interface TicketingPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketingPage: React.FC<TicketingPageProps> = ({ tickets, setTickets }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: '',
    createdBy: '',
    log_refs: '',
    contributors: '',
    status: [],
    severity: [],
    startDate: '',
    endDate: ''
  });

  const handleMultiSelectChange = (field: 'status' | 'severity', value: string) => {
    const currentValues = filters[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFilters({ ...filters, [field]: newValues });
  };

  const filteredTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.createdAt);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    if (startDate && ticketDate < startDate) return false;
    if (endDate && ticketDate > endDate) return false;
    
    return (
        (filters.title ? ticket.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.createdBy ? ticket.reporter.toLowerCase().includes(filters.createdBy.toLowerCase()) : true) &&
        (filters.log_refs ? ticket.relatedLogId?.includes(filters.log_refs) : true) &&
        (filters.contributors ? ticket.contributors?.some(c => c.toLowerCase().includes(filters.contributors.toLowerCase())) : true) &&
        (filters.status.length > 0 ? filters.status.includes(ticket.status) : true) &&
        (filters.severity.length > 0 ? filters.severity.includes(ticket.severity) : true)
    );
  });

  return (
    <div className="px-4 py-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Ticket Dashboard</h1>
        <p className="text-gray-400 mb-8">Search, filter, and manage all security tickets.</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-4 h-fit">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="Search by Title..." value={filters.title} onChange={e => setFilters({...filters, title: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                    <input type="text" placeholder="Created By..." value={filters.createdBy} onChange={e => setFilters({...filters, createdBy: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                    <input type="text" placeholder="Log Reference..." value={filters.log_refs} onChange={e => setFilters({...filters, log_refs: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                    <input type="text" placeholder="Contributors..." value={filters.contributors} onChange={e => setFilters({...filters, contributors: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                    
                    <div>
                        <label className="text-sm text-gray-400">Date Range</label>
                        <div className="flex space-x-2 mt-1">
                            <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                            <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"/>
                        </div>
                    </div>
                    {/* Status and Severity filters would be implemented with multi-select components */}
                </div>
            </div>

            {/* Tickets List */}
            <div className="lg:col-span-3 space-y-4">
                 {filteredTickets.map(ticket => (
                    <div key={ticket.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <Link to={`/tickets/${ticket.id}`} className="font-semibold text-lg text-blue-400 hover:underline">{ticket.title}</Link>
                                <p className="text-sm text-gray-400">#{ticket.id} opened by {ticket.reporter}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full bg-${ticket.severity === 'critical' ? 'red' : 'yellow'}-900 text-${ticket.severity === 'critical' ? 'red' : 'yellow'}-300`}>
                                {ticket.severity.toUpperCase()}
                            </span>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
    </div>
  );
};

export default TicketingPage;