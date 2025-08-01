import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { Bookmarks } from './pages/Bookmarks';
import { Analytics } from './pages/Analytics';
import { CreateEmployee } from './pages/CreateEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="employee/:id" element={<EmployeeDetails />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="create-employee" element={<CreateEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
