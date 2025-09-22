// import React, { useState } from 'react';
// import { Policy, Rule } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   Shield, 
//   Plus, 
//   Search, 
//   Filter, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   Settings,
//   AlertTriangle,
//   CheckCircle,
//   XCircle,
//   X
// } from 'lucide-react';

// const PoliciesPage: React.FC = () => {
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
//   const [showPolicyModal, setShowPolicyModal] = useState(false);
//   const [isCreateMode, setIsCreateMode] = useState(false);

//   // Only SOC L4 can access this page
//   if (!user || user.role !== 'soc-l4') {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full text-center">
//           <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
//           <p className="text-gray-300 mb-6">
//             Only SOC L4 analysts can manage policies and rules.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Mock data - replace with real API calls
//   const [policies, setPolicies] = useState<Policy[]>([
//     {
//       id: 'POL-001',
//       name: 'Malware Detection Policy',
//       description: 'Comprehensive malware detection and response policy',
//       rules: [
//         {
//           id: 'RULE-001',
//           name: 'Suspicious Process Detection',
//           description: 'Detect suspicious process creation',
//           condition: 'process.name matches suspicious_patterns',
//           action: 'alert_critical',
//           severity: 'critical',
//           isActive: true,
//           createdBy: 'soc-l4@parshuram.com',
//           createdAt: '2024-12-01T10:00:00Z'
//         }
//       ],
//       isActive: true,
//       createdBy: 'soc-l4@parshuram.com',
//       createdAt: '2024-12-01T10:00:00Z',
//       updatedAt: '2024-12-15T14:30:00Z'
//     },
//     {
//       id: 'POL-002',
//       name: 'Network Security Policy',
//       description: 'Network traffic monitoring and anomaly detection',
//       rules: [
//         {
//           id: 'RULE-045',
//           name: 'SSH Brute Force Detection',
//           description: 'Detect SSH brute force attacks',
//           condition: 'failed_ssh_attempts > 5 in 5_minutes',
//           action: 'alert_high',
//           severity: 'high',
//           isActive: true,
//           createdBy: 'soc-l4@parshuram.com',
//           createdAt: '2024-12-05T15:20:00Z'
//         }
//       ],
//       isActive: true,
//       createdBy: 'soc-l4@parshuram.com',
//       createdAt: '2024-12-05T15:20:00Z',
//       updatedAt: '2024-12-20T09:15:00Z'
//     }
//   ]);

//   const filteredPolicies = policies.filter(policy =>
//     !searchTerm || 
//     policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     policy.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleViewPolicy = (policy: Policy) => {
//     setSelectedPolicy(policy);
//     setIsCreateMode(false);
//     setShowPolicyModal(true);
//   };

//   const handleSavePolicy = (policyData: Partial<Policy>) => {
//     if (isCreateMode) {
//       const newPolicy: Policy = {
//         id: `POL-${String(policies.length + 1).padStart(3, '0')}`,
//         // ... (create new policy)
//       };
//       setPolicies([newPolicy, ...policies]);
//     } else if (selectedPolicy) {
//       setPolicies(policies.map(p => p.id === selectedPolicy.id ? { ...p, ...policyData } : p));
//     }
//     setShowPolicyModal(false);
//   };

//   const handleCreatePolicy = () => {
//     setSelectedPolicy(null);
//     setIsCreateMode(true);
//     setShowPolicyModal(true);
//   };

//   const formatTimestamp = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="px-4 py-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">Security Policies & Rules</h1>
//           <p className="text-gray-400">Manage security policies and detection rules.</p>
//         </div>
//         <button
//           onClick={handleCreatePolicy}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Policy</span>
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search policies..."
//             className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Policies Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {filteredPolicies.map((policy) => (
//           <div
//             key={policy.id}
//             className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <h3 className="text-lg font-semibold text-white">{policy.name}</h3>
//                   <span className="text-sm font-medium text-gray-400">#{policy.id}</span>
//                   {policy.isActive ? (
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   ) : (
//                     <XCircle className="h-5 w-5 text-red-500" />
//                   )}
//                 </div>
//                 <p className="text-gray-300 text-sm mb-3 line-clamp-2">
//                   {policy.description}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleViewPolicy(policy)}
//                 className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
//               >
//                 <Eye className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-1 text-blue-400">
//                   <Settings className="h-4 w-4" />
//                   <span>{policy.rules.length} rules</span>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   policy.isActive 
//                     ? 'bg-green-900 text-green-300' 
//                     : 'bg-red-900 text-red-300'
//                 }`}>
//                   {policy.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//               <div className="text-gray-400">
//                 Updated: {formatTimestamp(policy.updatedAt)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredPolicies.length === 0 && (
//         <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg">
//           <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-400 mb-2">No policies found</h3>
//           <p className="text-gray-500">Try adjusting your search criteria or create a new policy.</p>
//         </div>
//       )}

//       {/* Policy Detail Modal */}
//       {showPolicyModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-700">
//               <h2 className="text-xl font-bold text-white flex items-center space-x-2">
//                 <Shield className="h-6 w-6 text-blue-500" />
//                 <span>{isCreateMode ? 'Create New Policy' : `Policy Details - ${selectedPolicy?.name}`}</span>
//               </h2>
//               <button
//                 onClick={() => setShowPolicyModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="p-6">
//               {isCreateMode ? (
//                 <div className="text-center py-12">
//                   <Settings className="h-16 w-16 text-gray-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-medium text-gray-400 mb-2">Policy Creation Form</h3>
//                   <p className="text-gray-500">Policy creation interface would be implemented here.</p>
//                 </div>
//               ) : selectedPolicy && (
//                 <div className="space-y-6">
//                   {/* Policy Information */}
//                   <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
//                     <h4 className="text-white font-medium mb-3">Policy Information</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <p className="text-gray-400">Policy ID:</p>
//                         <p className="text-white">{selectedPolicy.id}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-400">Status:</p>
//                         <div className="flex items-center space-x-2">
//                           {selectedPolicy.isActive ? (
//                             <CheckCircle className="h-4 w-4 text-green-500" />
//                           ) : (
//                             <XCircle className="h-4 w-4 text-red-500" />
//                           )}
//                           <span className="text-white">{selectedPolicy.isActive ? 'Active' : 'Inactive'}</span>
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-gray-400">Created By:</p>
//                         <p className="text-white">{selectedPolicy.createdBy}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-400">Last Updated:</p>
//                         <p className="text-white">{formatTimestamp(selectedPolicy.updatedAt)}</p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <p className="text-gray-400">Description:</p>
//                         <p className="text-white">{selectedPolicy.description}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Rules */}
//                   <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
//                     <h4 className="text-white font-medium mb-3">Associated Rules ({selectedPolicy.rules.length})</h4>
//                     <div className="space-y-3">
//                       {selectedPolicy.rules.map((rule) => (
//                         <div key={rule.id} className="bg-gray-600 border border-gray-500 rounded-lg p-3">
//                           <div className="flex items-start justify-between mb-2">
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-2 mb-1">
//                                 <h5 className="text-white font-medium">{rule.name}</h5>
//                                 <span className="text-xs text-gray-400">#{rule.id}</span>
//                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                   rule.severity === 'critical' ? 'bg-red-900 text-red-300' :
//                                   rule.severity === 'high' ? 'bg-orange-900 text-orange-300' :
//                                   rule.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
//                                   'bg-blue-900 text-blue-300'
//                                 }`}>
//                                   {rule.severity}
//                                 </span>
//                               </div>
//                               <p className="text-gray-300 text-sm mb-2">{rule.description}</p>
//                               <div className="text-xs text-gray-400">
//                                 <p><strong>Condition:</strong> {rule.condition}</p>
//                                 <p><strong>Action:</strong> {rule.action}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               {rule.isActive ? (
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                               ) : (
//                                 <XCircle className="h-4 w-4 text-red-500" />
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
//                     <button
//                       onClick={() => setShowPolicyModal(false)}
//                       className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                     >
//                       Close
//                     </button>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
//                       <Edit className="h-4 w-4" />
//                       <span>Edit Policy</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PoliciesPage;

import React, { useState, useRef } from 'react';
import { Policy } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Shield,
  Plus,
  Search,
  Eye,
  Edit,
  Settings,
  CheckCircle,
  X,
  XCircle,
} from 'lucide-react';
import PolicyModal from './PolicyModal';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const PoliciesPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const detailsModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(detailsModalRef, () => setShowDetailsModal(false));

  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 'POL-001',
      name: 'Malware Detection Policy',
      description: 'Comprehensive malware detection and response policy',
      rules: [
        {
          id: 'RULE-001',
          name: 'Suspicious Process Detection',
          description: 'Detect suspicious process creation',
          condition: 'process.name matches suspicious_patterns',
          action: 'alert_critical',
          severity: 'critical',
          isActive: true,
          createdBy: 'soc-l4@parshuram.com',
          createdAt: '2024-12-01T10:00:00Z'
        }
      ],
      isActive: true,
      createdBy: 'soc-l4@parshuram.com',
      createdAt: '2024-12-01T10:00:00Z',
      updatedAt: '2024-12-15T14:30:00Z'
    },
    {
      id: 'POL-002',
      name: 'Network Security Policy',
      description: 'Network traffic monitoring and anomaly detection',
      rules: [],
      isActive: false,
      createdBy: 'soc-l4@parshuram.com',
      createdAt: '2024-12-05T15:20:00Z',
      updatedAt: '2024-12-20T09:15:00Z'
    }
  ]);
  
  if (!user || user.role !== 'soc-l4') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            Only SOC L4 analysts can manage policies and rules.
          </p>
        </div>
      </div>
    );
  }

  const filteredPolicies = policies.filter(policy =>
    !searchTerm ||
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPolicyDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowDetailsModal(true);
  };

  const handleCreatePolicy = () => {
    setSelectedPolicy(null);
    setIsCreateMode(true);
    setShowPolicyModal(true);
  };

  const handleEditPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsCreateMode(false);
    setShowDetailsModal(false);
    setShowPolicyModal(true);
  };

  const handleSavePolicy = (policyData: Partial<Policy>) => {
    if (isCreateMode) {
      const newPolicy: Policy = {
        id: `POL-${String(policies.length + 1).padStart(3, '0')}`,
        name: policyData.name || 'Untitled Policy',
        description: policyData.description || '',
        rules: [],
        isActive: policyData.isActive !== false,
        createdBy: user?.email || 'unknown',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPolicies([newPolicy, ...policies]);
    } else if (selectedPolicy) {
      setPolicies(policies.map(p =>
        p.id === selectedPolicy.id
          ? { ...p, ...policyData, updatedAt: new Date().toISOString() }
          : p
      ));
    }
    setShowPolicyModal(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Security Policies & Rules</h1>
          <p className="text-gray-400">Manage security policies and detection rules.</p>
        </div>
        <button
          onClick={handleCreatePolicy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Policy</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search policies..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{policy.name}</h3>
                  <span className="text-sm font-medium text-gray-400">#{policy.id}</span>
                  {policy.isActive ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {policy.description}
                </p>
              </div>
              <button
                onClick={() => handleViewPolicyDetails(policy)}
                className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-blue-400">
                  <Settings className="h-4 w-4" />
                  <span>{policy.rules.length} rules</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  policy.isActive
                    ? 'bg-green-900 text-green-300'
                    : 'bg-red-900 text-red-300'
                }`}>
                  {policy.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-gray-400">
                Updated: {formatTimestamp(policy.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPolicies.length === 0 && (
          <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg mt-6">
              <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">No policies found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or create a new policy.</p>
          </div>
      )}

      {showPolicyModal && (
        <PolicyModal
          policy={isCreateMode ? {} : selectedPolicy}
          onSave={handleSavePolicy}
          onClose={() => setShowPolicyModal(false)}
        />
      )}

      {showDetailsModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={detailsModalRef} className="bg-gray-800 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-500" />
                <span>Policy Details - {selectedPolicy.name}</span>
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Policy Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Policy ID:</p>
                      <p className="text-white">{selectedPolicy.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Status:</p>
                      <div className="flex items-center space-x-2">
                        {selectedPolicy.isActive ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-white">{selectedPolicy.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Created By:</p>
                      <p className="text-white">{selectedPolicy.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Last Updated:</p>
                      <p className="text-white">{formatTimestamp(selectedPolicy.updatedAt)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-400">Description:</p>
                      <p className="text-white">{selectedPolicy.description}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Associated Rules ({selectedPolicy.rules.length})</h4>
                  <div className="space-y-3">
                    {selectedPolicy.rules.length > 0 ? selectedPolicy.rules.map((rule) => (
                      <div key={rule.id} className="bg-gray-600 border border-gray-500 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h5 className="text-white font-medium">{rule.name}</h5>
                              <span className="text-xs text-gray-400">#{rule.id}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                rule.severity === 'critical' ? 'bg-red-900 text-red-300' :
                                rule.severity === 'high' ? 'bg-orange-900 text-orange-300' :
                                rule.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                                'bg-blue-900 text-blue-300'
                              }`}>
                                {rule.severity}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{rule.description}</p>
                            <div className="text-xs text-gray-400">
                              <p><strong>Condition:</strong> {rule.condition}</p>
                              <p><strong>Action:</strong> {rule.action}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {rule.isActive ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    )) : (
                        <p className="text-gray-400 text-center py-4">No rules associated with this policy.</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleEditPolicy(selectedPolicy)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Policy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliciesPage;