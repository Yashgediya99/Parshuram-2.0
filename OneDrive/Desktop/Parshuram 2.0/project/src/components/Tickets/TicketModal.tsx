// import React, { useState, useEffect } from 'react';
// import { Ticket } from '../../types';
// import { X, Save, User, Calendar, MessageSquare, AlertTriangle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// interface TicketModalProps {
//   ticket: Ticket | null;
//   isCreateMode: boolean;
//   onSave: (ticket: Partial<Ticket>) => void;
//   onClose: () => void;
//   relatedLogId?: string;
// }

// const TicketModal: React.FC<TicketModalProps> = ({ ticket, isCreateMode, onSave, onClose, relatedLogId }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     severity: 'medium' as Ticket['severity'],
//     status: 'open' as Ticket['status'],
//     assignee: '',
//     relatedLogId: ''
//   });

//   useEffect(() => {
//     if (ticket && !isCreateMode) {
//       setFormData({
//         title: ticket.title,
//         description: ticket.description,
//         severity: ticket.severity,
//         status: ticket.status,
//         assignee: ticket.assignee,
//         relatedLogId: ticket.relatedLogId || ''
//       });
//     } else if (relatedLogId) {
//       setFormData(prev => ({ ...prev, relatedLogId }));
//     }
//   }, [ticket, isCreateMode, relatedLogId]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'border-red-500 bg-red-900/20';
//       case 'high': return 'border-orange-500 bg-orange-900/20';
//       case 'medium': return 'border-yellow-500 bg-yellow-900/20';
//       case 'low': return 'border-blue-500 bg-blue-900/20';
//       default: return 'border-gray-500 bg-gray-900/20';
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-700">
//           <h2 className="text-xl font-bold text-white flex items-center space-x-2">
//             <MessageSquare className="h-6 w-6 text-blue-500" />
//             <span>{isCreateMode ? 'Create New Ticket' : `Edit Ticket #${ticket?.id}`}</span>
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Title <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter ticket title"
//               value={formData.title}
//               onChange={(e) => handleInputChange('title', e.target.value)}
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Description <span className="text-red-400">*</span>
//             </label>
//             <textarea
//               required
//               rows={4}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Describe the issue in detail"
//               value={formData.description}
//               onChange={(e) => handleInputChange('description', e.target.value)}
//             />
//           </div>

//           {/* Severity and Status */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Severity <span className="text-red-400">*</span>
//               </label>
//               <select
//                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.severity}
//                 onChange={(e) => handleInputChange('severity', e.target.value)}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//                 <option value="critical">Critical</option>
//               </select>
//             </div>

//             {!isCreateMode && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
//                 <select
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={formData.status}
//                   onChange={(e) => handleInputChange('status', e.target.value)}
//                 >
//                   <option value="open">Open</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="resolved">Resolved</option>
//                   <option value="closed">Closed</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* Assignee */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Assignee <span className="text-red-400">*</span>
//             </label>
//             <select
//               required
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.assignee}
//               onChange={(e) => handleInputChange('assignee', e.target.value)}
//             >
//               <option value="">Select assignee</option>
//               <option value="soc-l1">SOC L1 Analyst</option>
//               <option value="soc-l2">SOC L2 Analyst</option>
//               <option value="soc-l3">SOC L3 Analyst</option>
//               <option value="soc-l4">SOC L4 Analyst</option>
//             </select>
//           </div>

//           {!isCreateMode && user?.role !== 'soc-l4' && (
//             <div>
//               { <select
//                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     handleInputChange('elevatedTo', e.target.value);
//                   }
//                 }}
//               >
//                 <option value="">No elevation</option>
//                 <option value="soc-l2">Elevate to SOC L2</option>
//                 <option value="soc-l3">Elevate to SOC L3</option>
//                 <option value="soc-l4">Elevate to SOC L4</option>
//               </select>}
//             </div>
//           )}
//           {ticket?.elevatedBy && (
//             <p className="text-sm text-gray-400">Elevated by: {ticket.elevatedBy}</p>
//           )}


//           {/* Related Log ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Related Log ID
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter related log ID (optional)"
//               value={formData.relatedLogId}
//               onChange={(e) => handleInputChange('relatedLogId', e.target.value)}
//             />
//           </div>

//           {/* Severity Preview */}
//           {formData.severity && (
//             <div className={`border-l-4 rounded-r-lg p-4 ${getSeverityColor(formData.severity)}`}>
//               <div className="flex items-center space-x-2">
//                 <AlertTriangle className={`h-5 w-5 
//                   ${formData.severity === 'critical' ? 'text-red-500' : ''}
//                   ${formData.severity === 'high' ? 'text-orange-500' : ''}
//                   ${formData.severity === 'medium' ? 'text-yellow-500' : ''}
//                   ${formData.severity === 'low' ? 'text-blue-500' : ''}
//                 `} />
//                 <span className="text-white font-medium">
//                   {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)} Severity Ticket
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Metadata (for existing tickets) */}
//           {!isCreateMode && ticket && (
//             <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
//               <h4 className="text-white font-medium mb-3">Ticket Information</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center space-x-2 text-gray-300">
//                   <User className="h-4 w-4" />
//                   <span>Reporter: {ticket.reporter}</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-gray-300">
//                   <Calendar className="h-4 w-4" />
//                   <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
//                 </div>
//                 {ticket.updatedAt !== ticket.createdAt && (
//                   <div className="flex items-center space-x-2 text-gray-300">
//                     <Calendar className="h-4 w-4" />
//                     <span>Updated: {new Date(ticket.updatedAt).toLocaleString()}</span>
//                   </div>
//                 )}
//                 {ticket.relatedLogId && (
//                   <div className="flex items-center space-x-2 text-gray-300">
//                     <span>Related Log: {ticket.relatedLogId}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//             >
//               <Save className="h-4 w-4" />
//               <span>{isCreateMode ? 'Create Ticket' : 'Save Changes'}</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TicketModal;

import React, { useState, useEffect } from 'react';
import { Ticket, Attachment } from '../../types'; // Import Attachment
import { X, Save, User, Calendar, MessageSquare, AlertTriangle, Paperclip } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TicketModalProps {
  ticket: Ticket | null;
  isCreateMode: boolean;
  onSave: (ticket: Partial<Ticket>) => void;
  onClose: () => void;
  relatedLogId?: string;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, isCreateMode, onSave, onClose, relatedLogId }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium' as Ticket['severity'],
    status: 'open' as Ticket['status'],
    assignee: 'SOC L1',
    relatedLogId: '',
    attachments: [] as Attachment[],
  });

  // Mock attachments for demonstration
  const mockAttachments: Attachment[] = [
      { id: 'att-1', fileName: 'screenshot-1.png', fileSize: '128 KB', fileType: 'image/png' },
      { id: 'att-2', fileName: 'network-log.txt', fileSize: '32 KB', fileType: 'text/plain' },
  ];
  
  useEffect(() => {
    // Simulate adding attachments when the modal opens
    if (isCreateMode) {
        setFormData(prev => ({...prev, attachments: mockAttachments}))
    }
  }, [isCreateMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof Omit<typeof formData, 'attachments'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-500" />
            <span>Create New Ticket</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><X className="h-6 w-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title <span className="text-red-400">*</span></label>
            <input type="text" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description <span className="text-red-400">*</span></label>
            <textarea required rows={4} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
          </div>

          {/* Attachments Section */}
          <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Attachments</label>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-3">
                  {formData.attachments.length > 0 ? (
                      <div className="space-y-2">
                          {formData.attachments.map(file => (
                              <div key={file.id} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-300">{file.fileName}</span>
                                  <span className="text-gray-400">{file.fileSize}</span>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-gray-400 text-sm text-center">No files attached.</p>
                  )}
                   <button type="button" className="mt-3 w-full px-3 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center space-x-2">
                      <Paperclip className="h-4 w-4" />
                      <span>Upload File</span>
                  </button>
              </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Create Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;