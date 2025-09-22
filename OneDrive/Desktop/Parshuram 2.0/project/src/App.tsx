// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Layout from './components/Layout/Layout';
// import PrivateRoute from './components/PrivateRoute';
// import LoginPage from './components/Auth/LoginPage';
// import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
// import RegisterPage from './components/Auth/RegisterPage';
// import OTPPage from './components/Auth/OTPPage';
// import NewPasswordPage from './components/Auth/NewPasswordPage';
// import Dashboard from './components/Dashboard/Dashboard';
// import DeviceRequestsPage from './components/DeviceRequests/DeviceRequestsPage';
// import ThreatSummaryPage from './components/Threats/ThreatSummaryPage';
// import LogSummaryPage from './components/Logs/LogSummaryPage';
// import TicketingPage from './components/Tickets/TicketingPage';
// import AdminPage from './components/Admin/AdminPage';
// import AgentsPage from './components/Agents/AgentsPage';
// import GeolocationPage from './components/Geolocation/GeolocationPage';
// import AlertsPage from './components/Alerts/AlertsPage';
// import PoliciesPage from './components/Policies/PoliciesPage';
// import WaitingPage from './components/Auth/WaitingPage';
// import { Ticket } from './types'; // Import the Ticket type
// import TicketDetailsPage from './components/Tickets/TicketDetailsPage'; // Import new component
// import CreateTicketPage from './components/Tickets/CreateTicketPage'; // Import new component

// function App() {
//   const [tickets, setTickets] = useState<Ticket[]>([
//     {
//           id: 'T-001',
//           title: 'Investigation: Malware detected on DESKTOP-ABC123',
//           description: 'Critical malware detection requires immediate investigation and remediation.',
//           severity: 'critical',
//           status: 'open',
//           assignee: 'John Doe',
//           reporter: 'System Alert',
//           createdAt: '2025-01-02T14:30:00Z',
//           updatedAt: '2025-01-02T14:30:00Z',
//           relatedLogId: '1',
//           comments: [
//           {id: 'C-1', author: 'soc-l1@parshuram.com', timestamp: '2025-01-02T14:35:00Z', comment: 'Initial triage complete. IOCs identified.'}
//           ]
//         },
//         {
//           id: 'T-002',
//           title: 'SSH Brute Force Attack Analysis',
//           description: 'Multiple failed SSH attempts detected from external IP. Need to analyze attack patterns and implement blocking measures.',
//           severity: 'high',
//           status: 'in-progress',
//           assignee: 'Jane Smith',
//           reporter: 'Alice Johnson',
//           createdAt: '2025-01-02T13:15:00Z',
//           updatedAt: '2025-01-02T14:00:00Z',
//           relatedLogId: '2'
//         },
//         {
//           id: 'T-003',
//           title: 'Network Traffic Anomaly Review',
//           description: 'Unusual network traffic patterns detected. Investigate potential data exfiltration or command and control communications.',
//           severity: 'medium',
//           status: 'resolved',
//           assignee: 'Bob Wilson',
//           reporter: 'Network Monitor',
//           createdAt: '2025-01-01T16:45:00Z',
//           updatedAt: '2025-01-02T12:30:00Z',
//           relatedLogId: '4'
//         },
//         {
//           id: 'T-004',
//           title: 'False Positive Rule Tuning',
//           description: 'Review and tune detection rule RULE-089 that is generating excessive false positives for normal user behavior.',
//           severity: 'low',
//           status: 'open',
//           assignee: 'Sarah Davis',
//           reporter: 'Mike Chen',
//           createdAt: '2025-01-01T10:20:00Z',
//           updatedAt: '2025-01-01T10:20:00Z'
//         }
//   ]);
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-900">
//           <Routes>
//             {/* Auth Routes */}
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/otp" element={<OTPPage />} />
//             <Route path="/new-password" element={<NewPasswordPage />} />
//             <Route path="/waiting-for-approval" element={<WaitingPage />} />

//             {/* Protected Routes */}
//             <Route path="/threats" element={
//               <PrivateRoute>
//                 <Layout>
//                   <ThreatSummaryPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/tickets" element={
//               <PrivateRoute>
//                 <Layout>
//                   <TicketingPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/dashboard" element={
//               <PrivateRoute>
//                 <Layout>
//                   <Dashboard />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/agents" element={
//               <PrivateRoute>
//                 <Layout>
//                   <AgentsPage />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/device-requests" element={
//               <PrivateRoute>
//                 <Layout>
//                   <DeviceRequestsPage />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/geolocation" element={
//               <PrivateRoute>
//                 <Layout>
//                   <GeolocationPage />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/alerts" element={
//               <PrivateRoute>
//                 <Layout>
//                   <AlertsPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/threats" element={
//               <PrivateRoute>
//                 <Layout>
//                   <ThreatSummaryPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/logs" element={
//               <PrivateRoute>
//                 <Layout>
//                   <LogSummaryPage />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/tickets" element={
//               <PrivateRoute>
//                 <Layout>
//                   <TicketingPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/policies" element={
//               <PrivateRoute>
//                 <Layout>
//                   <PoliciesPage />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/admin" element={
//               <PrivateRoute>
//                 <Layout>
//                   <AdminPage />
//                 </Layout>
//               </PrivateRoute>
//             } />

//             {/* NEW ROUTES */}
//             <Route path="/tickets/create" element={
//               <PrivateRoute>
//                 <Layout>
//                   <CreateTicketPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />
//             <Route path="/tickets/:id" element={
//               <PrivateRoute>
//                 <Layout>
//                   <TicketDetailsPage tickets={tickets} setTickets={setTickets} />
//                 </Layout>
//               </PrivateRoute>
//             } />

//             {/* Default redirect */}
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/Auth/LoginPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import RegisterPage from './components/Auth/RegisterPage';
import OTPPage from './components/Auth/OTPPage';
import NewPasswordPage from './components/Auth/NewPasswordPage';
import Dashboard from './components/Dashboard/Dashboard';
import DeviceRequestsPage from './components/DeviceRequests/DeviceRequestsPage';
import ThreatSummaryPage from './components/Threats/ThreatSummaryPage';
import LogSummaryPage from './components/Logs/LogSummaryPage';
import TicketingPage from './components/Tickets/TicketingPage';
import AdminPage from './components/Admin/AdminPage';
import AgentsPage from './components/Agents/AgentsPage';
import GeolocationPage from './components/Geolocation/GeolocationPage';
import AlertsPage from './components/Alerts/AlertsPage';
import PoliciesPage from './components/Policies/PoliciesPage';
import { Ticket } from './types';
import CreateTicketPage from './components/Tickets/CreateTicketPage';
import TicketDetailsPage from './components/Tickets/TicketDetailsPage';
import WaitingPage from './components/Auth/WaitingPage';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'T-001',
      title: 'Investigation: Malware detected on DESKTOP-ABC123',
      description: 'Critical malware detection requires immediate investigation and remediation.',
      severity: 'critical',
      status: 'open',
      assignee: 'SOC L2',
      reporter: 'SIEM System',
      createdAt: '2025-09-20T10:30:00Z',
      updatedAt: '2025-09-21T11:00:00Z',
      relatedLogId: '1',
      relatedAlertId: 'ALT-002',
      comments: [
        {id: 'C-1', author: 'soc-l1@parshuram.com', timestamp: '2025-01-02T14:35:00Z', comment: 'Initial triage complete. IOCs identified.'}
      ]
    },
    {
      id: 'T-002',
      title: 'SSH Brute Force Attack Analysis',
      description: 'Multiple failed SSH attempts detected from external IP. Need to analyze attack patterns and implement blocking measures.',
      severity: 'high',
      status: 'in-progress',
      assignee: 'SOC L1',
      reporter: 'SIEM System',
      createdAt: '2025-09-21T09:15:00Z',
      updatedAt: '2025-09-21T13:45:00Z',
      relatedLogId: '2'
    },
    {
      id: 'T-003',
      title: 'False Positive Rule Tuning',
      description: 'Review and tune detection rule RULE-089 that is generating excessive false positives for normal user behavior.',
      severity: 'low',
      status: 'triaged',
      assignee: 'SOC L1',
      reporter: 'Mike Chen',
      createdAt: '2025-09-19T11:20:00Z',
      updatedAt: '2025-09-20T16:20:00Z',
    }
  ]);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/waiting-for-approval" element={<WaitingPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
            <Route path="/agents" element={<PrivateRoute><Layout><AgentsPage /></Layout></PrivateRoute>} />
            <Route path="/device-requests" element={<PrivateRoute><Layout><DeviceRequestsPage /></Layout></PrivateRoute>} />
            <Route path="/geolocation" element={<PrivateRoute><Layout><GeolocationPage /></Layout></PrivateRoute>} />
            <Route path="/logs" element={<PrivateRoute><Layout><LogSummaryPage /></Layout></PrivateRoute>} />
            <Route path="/policies" element={<PrivateRoute><Layout><PoliciesPage /></Layout></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><Layout><AdminPage /></Layout></PrivateRoute>} />

            {/* Ticket, Threat, and Alert Routes with shared state */}
            <Route path="/threats" element={
              <PrivateRoute>
                <Layout>
                  <ThreatSummaryPage tickets={tickets} setTickets={setTickets} />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/alerts" element={
              <PrivateRoute>
                <Layout>
                  <AlertsPage tickets={tickets} setTickets={setTickets} />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/tickets" element={
              <PrivateRoute>
                <Layout>
                  <TicketingPage tickets={tickets} setTickets={setTickets} />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/tickets/create" element={
              <PrivateRoute>
                <Layout>
                  <CreateTicketPage tickets={tickets} setTickets={setTickets} />
                </Layout>
              </PrivateRoute>
            } />
            {/* THIS IS THE MISSING ROUTE THAT CAUSED THE BLANK PAGE */}
            <Route path="/tickets/:id" element={
              <PrivateRoute>
                <Layout>
                  <TicketDetailsPage tickets={tickets} setTickets={setTickets} />
                </Layout>
              </PrivateRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;