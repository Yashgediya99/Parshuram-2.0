// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   register: (employeeId: string, email: string, role: string, department: string) => Promise<{ success: boolean; credentials?: { username: string; password: string } }>;
//   resetPassword: (email: string) => Promise<boolean>;
//   verifyOTP: (otp: string) => Promise<boolean>;
//   setNewPassword: (password: string) => Promise<boolean>;
//   requestDeviceAccess: (email: string, a:string) => Promise<'approved' | 'pending' | 'rejected'>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const requestDeviceAccess = async (email: string,password: string): Promise<'approved' | 'pending' | 'rejected'> => {
//     // Mock device access request
//     if (email === 'user@parshuram.com' && password === "user@123") {
//       return 'pending'; // Simulate a new user
//     }
//     return 'approved'; // Simulate an existing, approved user
//   };

//   const login = async (email: string, password: string): Promise<boolean> => {
//     const deviceStatus = await requestDeviceAccess(email, password);

//     if (deviceStatus === 'pending') {
//       // navigate('/waiting-for-approval'); // This should be handled in LoginPage
//       return false; // Indicate that the login is not complete
//     }
    
//     if (deviceStatus === 'rejected') {
//       return false;
//     }
    
//     // ... (rest of the login logic)
//     return true
    
//     // Mock login - replace with actual API call
//     if (email && password) {
//       let role: User['role'] = 'soc-l1';
//       let department = 'Security Operations';
      
//       // Admin credentials
//       if (email === 'admin@parshuram.com' && password === 'admin@123') {
//         role = 'admin';
//         department = 'Administration';
//       } else if (email === 'soc-l1@parshuram.com' && password === 'socl1@123') {
//         role = 'soc-l1';
//       } else if (email === 'soc-l2@parshuram.com' && password === 'socl2@123') {
//         role = 'soc-l2';
//       } else if (email === 'soc-l3@parshuram.com' && password === 'socl3@123') {
//         role = 'soc-l3';
//       } else if (email === 'soc-l4@parshuram.com' && password === 'socl4@123') {
//         role = 'soc-l4';
//       } else {
//         return false;
//       }
      
//       const mockUser: User = {
//         id: '1',
//         email,
//         role,
//         employeeId: 'EMP001',
//         department
//       };
//       setUser(mockUser);
//       setIsAuthenticated(true);
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   // const register = async (employeeId: string, role: string, department: string): Promise<{ success: boolean; credentials?: { username: string; password: string } }> => {
//   //   // Mock registration - replace with actual API call
//   //   const username = employeeId.toLowerCase();
//   //   const password = Math.random().toString(36).slice(-8);
    
//   //   console.log(`Registering employee: ${employeeId}, Role: ${role}, Department: ${department}`);
//   //   return { 
//   //     success: true, 
//   //     credentials: { username, password } 
//   //   };
//   // };

//   const register = async (employeeId: string, email: string, role: string, department: string): Promise<{ success: boolean; credentials?: { username: string; password: string } }> => {
//     // Mock registration - replace with actual API call
//     const username = email;
//     const password = Math.random().toString(36).slice(-8);
    
//     console.log(`Registering employee: ${employeeId}, Email: ${email}, Role: ${role}, Department: ${department}`);
//     // Here you would typically make an API call to your backend to store the new user.
    
//     return { 
//       success: true, 
//       credentials: { username, password } 
//     };
//   };

//   const resetPassword = async (email: string): Promise<boolean> => {
//     try {
//       // In a real application, you would call your backend API here
//       // For demonstration, we'll simulate sending an email
//       const response = await fetch('/api/auth/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         // Email sent successfully
//         console.log(`Password reset email sent to: ${email}`);
//         return true;
//       } else {
//         // Handle error response
//         const errorData = await response.json();
//         console.error('Password reset failed:', errorData.message);
//         return false;
//       }
//     } catch (error) {
//       // For demo purposes, we'll simulate success and log the email
//       console.log(`[DEMO] Password reset email would be sent to: ${email}`);
//       console.log(`[DEMO] Reset code: 123456`);
      
//       // In a real app, you might want to show a toast notification here
//       alert(`Demo Mode: Password reset email sent to ${email}\nReset code: 123456`);
      
//       return true;
//     }
//   };

//   const verifyOTP = async (otp: string): Promise<boolean> => {
//     // Mock OTP verification - replace with actual API call
//     return otp === '123456';
//   };

//   const setNewPassword = async (password: string): Promise<boolean> => {
//     // Mock new password - replace with actual API call
//     return true;
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated,
//       login,
//       logout,
//       register,
//       resetPassword,
//       verifyOTP,
//       setNewPassword,
//       requestDeviceAccess
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (employeeId: string, email: string, role: string, department: string) => Promise<{ success: boolean; credentials?: { username: string; password: string } }>;
  resetPassword: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  setNewPassword: (password: string) => Promise<boolean>;
  requestDeviceAccess: (email: string, password: string) => Promise<'approved' | 'pending' | 'rejected'>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const requestDeviceAccess = async (email: string, password: string): Promise<'approved' | 'pending' | 'rejected'> => {
    // Mock device access request
    if (email === 'user@parshuram.com' && password === "user@123") {
      return 'pending'; // Simulate a new user
    }
    if (email === 'rejected@parshuram.com' && password === 'rejected') {
        return 'rejected';
    }
    return 'approved'; // Simulate an existing, approved user
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock database of users. In a real application, this would be an API call.
    type MockUser = Omit<User, 'id'> & { password: string };
    const users: MockUser[] = [
      { email: 'admin@parshuram.com', password: 'admin@123', role: 'admin', department: 'Administration', employeeId: 'EMP001' },
      { email: 'soc-l1@parshuram.com', password: 'socl1@123', role: 'soc-l1', department: 'Security Operations', employeeId: 'EMP002' },
      { email: 'soc-l2@parshuram.com', password: 'socl2@123', role: 'soc-l2', department: 'Security Operations', employeeId: 'EMP003' },
      { email: 'soc-l3@parshuram.com', password: 'socl3@123', role: 'soc-l3', department: 'Security Operations', employeeId: 'EMP004' },
      { email: 'soc-l4@parshuram.com', password: 'socl4@123', role: 'soc-l4', department: 'Security Operations', employeeId: 'EMP005' },
    ];

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const mockUser: User = {
        id: String(Math.random()), // Generate a random ID for the session
        ...foundUser,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }

    // If no user is found with the matching credentials, fail the login.
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (employeeId: string, email: string, role: string, department: string): Promise<{ success: boolean; credentials?: { username: string; password: string } }> => {
    const username = email;
    const password = Math.random().toString(36).slice(-8);
    console.log(`Registering employee: ${employeeId}, Email: ${email}, Role: ${role}, Department: ${department}`);
    return { 
      success: true, 
      credentials: { username, password } 
    };
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    console.log(`[DEMO] Password reset email would be sent to: ${email}`);
    console.log(`[DEMO] Reset code: 123456`);
    alert(`Demo Mode: Password reset email sent to ${email}\nReset code: 123456`);
    return true;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    return otp === '123456';
  };

  const setNewPassword = async (password: string): Promise<boolean> => {
    console.log('New password set:', password);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register,
      resetPassword,
      verifyOTP,
      setNewPassword,
      requestDeviceAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};