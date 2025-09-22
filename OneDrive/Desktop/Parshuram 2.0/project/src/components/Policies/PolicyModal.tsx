// import React, { useState } from 'react'; // Corrected: Removed comma and added useState
// import { Policy } from '../../types';
// import { X, Save, Shield } from 'lucide-react';

// interface PolicyModalProps {
//   policy: Partial<Policy> | null;
//   onSave: (policy: Partial<Policy>) => void;
//   onClose: () => void;
// }

// const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onSave, onClose }) => {
//   // This will now work correctly because useState is properly imported.
//   const [formData, setFormData] = useState({
//     name: policy?.name || '',
//     description: policy?.description || '',
//     isActive: policy?.isActive === undefined ? true : policy.isActive,
//   });

//   const isCreateMode = !policy?.id;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.description) {
//       alert('Please fill out all fields.');
//       return;
//     }
//     onSave(formData);
//   };

//   const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-700">
//           <h2 className="text-xl font-bold text-white flex items-center space-x-2">
//             <Shield className="h-6 w-6 text-blue-500" />
//             <span>{isCreateMode ? 'Create New Policy' : `Edit Policy #${policy?.id}`}</span>
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Policy Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Policy Name <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="e.g., Critical Malware Detection"
//               value={formData.name}
//               onChange={(e) => handleInputChange('name', e.target.value)}
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Description <span className="text-red-400">*</span>
//             </label>
//             <textarea
//               required
//               rows={3}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Describe the purpose of this policy"
//               value={formData.description}
//               onChange={(e) => handleInputChange('description', e.target.value)}
//             />
//           </div>

//           {/* Status */}
//            <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Status
//               </label>
//               <div className="flex items-center space-x-4">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                     <input 
//                         type="radio" 
//                         name="isActive" 
//                         checked={formData.isActive === true}
//                         onChange={() => handleInputChange('isActive', true)}
//                         className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
//                     />
//                     <span className="text-white">Active</span>
//                 </label>
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                     <input 
//                         type="radio" 
//                         name="isActive"
//                         checked={formData.isActive === false}
//                         onChange={() => handleInputChange('isActive', false)}
//                         className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
//                     />
//                     <span className="text-white">Inactive</span>
//                 </label>
//               </div>
//           </div>


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
//               <span>{isCreateMode ? 'Create Policy' : 'Save Changes'}</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PolicyModal;


import React, { useState, useRef } from 'react';
import { Policy } from '../../types';
import { X, Save, Shield } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface PolicyModalProps {
  policy: Partial<Policy> | null;
  onSave: (policy: Partial<Policy>) => void;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: policy?.name || '',
    description: policy?.description || '',
    isActive: policy?.isActive === undefined ? true : policy.isActive,
  });

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  const isCreateMode = !policy?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Please fill out all fields.');
      return;
    }
    onSave(formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-500" />
            <span>{isCreateMode ? 'Create New Policy' : `Edit Policy #${policy?.id}`}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Policy Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Critical Malware Detection"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the purpose of this policy"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

           <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        name="isActive"
                        checked={formData.isActive === true}
                        onChange={() => handleInputChange('isActive', true)}
                        className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">Active</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        name="isActive"
                        checked={formData.isActive === false}
                        onChange={() => handleInputChange('isActive', false)}
                        className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                    />
                    <span className="text-white">Inactive</span>
                </label>
              </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isCreateMode ? 'Create Policy' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyModal;