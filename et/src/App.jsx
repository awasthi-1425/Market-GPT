import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './Dashboard'; 
import PersonalDetails from './settings/PersonalDetails';
import ConnectedDemat from './settings/ConnectedDemat';
import AIPrivacy from './settings/AIPrivacy';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings/personal" element={<PersonalDetails />} />
        <Route path="/settings/demat" element={<ConnectedDemat />} />
        <Route path="/settings/privacy" element={<AIPrivacy />} />
      </Routes>
    </Router>
  );
};

export default App;