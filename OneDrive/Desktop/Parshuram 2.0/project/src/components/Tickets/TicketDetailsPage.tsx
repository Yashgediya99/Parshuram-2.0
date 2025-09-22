// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Ticket, Alert } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import {
//   Shield,
//   AlertTriangle,
//   Clock,
//   User,
//   MessageSquare,
//   Paperclip,
//   ArrowUpCircle,
//   Send,
//   ArrowLeft
// } from 'lucide-react';

// // You would fetch this data from your state management or API
// const mockAlerts: Alert[] = [
//     { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
// ];

// interface TicketDetailsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const ticket = tickets.find(t => t.id === id);
//   const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

//   const [newComment, setNewComment] = useState('');

//   if (!ticket) {
//     return (
//       <div className="text-center py-12 text-white">
//         <h1 className="text-2xl font-bold">Ticket not found</h1>
//         <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">Back to Tickets</Link>
//       </div>
//     );
//   }

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;

//     const comment = {
//       id: `C-${Date.now()}`,
//       author: user?.email || 'Unknown User',
//       timestamp: new Date().toISOString(),
//       comment: newComment,
//     };

//     setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...(t.comments || []), comment], updatedAt: new Date().toISOString() } : t));
//     setNewComment('');
//   };
  
//   const handleEscalate = (newLevel: 'soc-l2' | 'soc-l3' | 'soc-l4') => {
//       setTickets(tickets.map(t => t.id === id ? {
//           ...t,
//           assignee: newLevel.toUpperCase(),
//           elevatedTo: newLevel,
//           elevatedBy: user?.email,
//           elevatedAt: new Date().toISOString(),
//           status: 'triaged',
//           updatedAt: new Date().toISOString()
//       } : t));
//   };


//   return (
//     <div className="px-4 py-6 text-white">
//         <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6">
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to Ticket Dashboard
//         </Link>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Ticket Details */}
//         <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="border-b border-gray-700 pb-4 mb-4">
//             <h1 className="text-2xl font-bold">{ticket.title}</h1>
//             <p className="text-gray-400">ID: {ticket.id}</p>
//           </div>
//           <p className="text-gray-300 mb-6">{ticket.description}</p>
          
//           {relatedAlert && (
//             <div className="bg-gray-700 p-4 rounded-lg mb-6">
//                 <h3 className="font-semibold mb-2 text-lg text-blue-300">Linked SIEM Alert</h3>
//                 <p><strong>Alert ID:</strong> <Link to={`/alerts`} className="text-blue-400 hover:underline">{relatedAlert.id}</Link></p>
//                 <p><strong>Message:</strong> {relatedAlert.message}</p>
//                 <p><strong>Source:</strong> {relatedAlert.agentName} ({relatedAlert.agentId})</p>
//             </div>
//           )}

//           {/* Analyst Updates */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg">Investigation Timeline</h3>
//             {ticket.comments?.map(comment => (
//                  <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
//                     <div className="flex justify-between items-center mb-1">
//                         <p className="font-semibold text-blue-400">{comment.author}</p>
//                         <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
//                     </div>
//                     <p className="text-gray-300">{comment.comment}</p>
//                 </div>
//             ))}
//              <div className="bg-gray-700 p-3 rounded-lg flex items-start space-x-3">
//                 <User className="h-6 w-6 text-gray-400 mt-2"/>
//                 <div className="flex-1">
//                     <textarea 
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full bg-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Add investigation notes..."
//                         rows={3}
//                     />
//                     <div className="flex justify-end mt-2">
//                         <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
//                             <Send className="h-4 w-4"/>
//                             <span>Add Note</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar with Actions */}
//         <div className="space-y-6">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Ticket Status</h3>
//                 <div className="space-y-3">
//                     <p><strong>Severity:</strong> <span className={`font-bold text-${ticket.severity === 'critical' ? 'red' : ticket.severity === 'high' ? 'orange' : 'yellow'}-400`}>{ticket.severity.toUpperCase()}</span></p>
//                     <p><strong>State:</strong> <span className="font-bold">{ticket.status.toUpperCase()}</span></p>
//                     <p><strong>Assigned Group:</strong> <span className="font-bold">{ticket.assignee}</span></p>
//                     <p><strong>Reporter:</strong> {ticket.reporter}</p>
//                 </div>
//             </div>
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Actions</h3>
//                 <div className="space-y-3">
//                     <button className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                         <Paperclip className="h-4 w-4"/>
//                         <span>Attach Evidence</span>
//                     </button>
//                     {user?.role === 'soc-l1' && <button onClick={() => handleEscalate('soc-l2')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L2</span></button>}
//                     {user?.role === 'soc-l2' && <button onClick={() => handleEscalate('soc-l3')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L3</span></button>}
//                     {user?.role === 'soc-l3' && <button onClick={() => handleEscalate('soc-l4')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L4</span></button>}
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsPage;

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ticket, Alert } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  User,
  Send,
  Paperclip,
  ArrowUpCircle,
  CheckCircle, // Import CheckCircle icon
} from 'lucide-react';

const mockAlerts: Alert[] = [
    { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
];

interface TicketDetailsPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const ticket = tickets.find(t => t.id === id);
  const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

  const [newComment, setNewComment] = useState('');

  if (!ticket) {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold">Ticket Not Found</h1>
        <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">
          <ArrowLeft className="inline-block h-4 w-4 mr-2" />
          Back to Ticket Dashboard
        </Link>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: `C-${Date.now()}`,
      author: user?.email || 'Unknown User',
      timestamp: new Date().toISOString(),
      comment: newComment,
    };

    setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...(t.comments || []), comment], updatedAt: new Date().toISOString() } : t));
    setNewComment('');
  };

  const handleEscalate = (newLevel: 'soc-l2' | 'soc-l3' | 'soc-l4') => {
      setTickets(tickets.map(t => t.id === id ? {
          ...t,
          assignee: newLevel.toUpperCase().replace('-', ' '),
          elevatedTo: newLevel,
          elevatedBy: user?.email,
          elevatedAt: new Date().toISOString(),
          status: 'triaged',
          updatedAt: new Date().toISOString()
      } : t));
  };

  const handleResolveTicket = () => {
    setTickets(tickets.map(t => t.id === id ? {
        ...t,
        status: 'resolved',
        updatedAt: new Date().toISOString(),
    } : t));
  };

  return (
    <div className="px-4 py-6 text-white">
        <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Ticket Dashboard
        </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <h1 className="text-2xl font-bold">{ticket.title}</h1>
            <p className="text-gray-400">ID: {ticket.id}</p>
          </div>
          <p className="text-gray-300 mb-6 whitespace-pre-wrap">{ticket.description}</p>
          
          {relatedAlert && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 text-lg text-blue-300">Linked SIEM Alert</h3>
                <p><strong>Alert ID:</strong> <Link to={`/alerts`} className="text-blue-400 hover:underline">{relatedAlert.id}</Link></p>
                <p><strong>Message:</strong> {relatedAlert.message}</p>
                <p><strong>Source:</strong> {relatedAlert.agentName} ({relatedAlert.agentId})</p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Investigation Timeline</h3>
            {ticket.comments?.map(comment => (
                 <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-blue-400">{comment.author}</p>
                        <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                    <p className="text-gray-300">{comment.comment}</p>
                </div>
            ))}
             <div className="bg-gray-700 p-3 rounded-lg flex items-start space-x-3">
                <User className="h-6 w-6 text-gray-400 mt-2"/>
                <div className="flex-1">
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add investigation notes..."
                        rows={3}
                    />
                    <div className="flex justify-end mt-2">
                        <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <Send className="h-4 w-4"/>
                            <span>Add Note</span>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-lg">Ticket Status</h3>
                <div className="space-y-3">
                    <p><strong>Severity:</strong> <span className={`font-bold text-${ticket.severity === 'critical' ? 'red' : ticket.severity === 'high' ? 'orange' : 'yellow'}-400`}>{ticket.severity.toUpperCase()}</span></p>
                    <p><strong>State:</strong> <span className="font-bold">{ticket.status.toUpperCase()}</span></p>
                    <p><strong>Assigned Group:</strong> <span className="font-bold">{ticket.assignee}</span></p>
                    <p><strong>Reporter:</strong> {ticket.reporter}</p>
                </div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-lg">Actions</h3>
                <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Paperclip className="h-4 w-4"/>
                        <span>Attach Evidence</span>
                    </button>
                    {user?.role === 'soc-l1' && <button onClick={() => handleEscalate('soc-l2')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L2</span></button>}
                    {user?.role === 'soc-l2' && <button onClick={() => handleEscalate('soc-l3')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L3</span></button>}
                    {user?.role === 'soc-l3' && <button onClick={() => handleEscalate('soc-l4')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L4</span></button>}
                    
                    {/* NEW BUTTON to resolve ticket */}
                    {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                        <button 
                            onClick={handleResolveTicket}
                            className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <CheckCircle className="h-4 w-4"/>
                            <span>Resolve Ticket</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;