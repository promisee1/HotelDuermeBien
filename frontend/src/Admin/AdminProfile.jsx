import React, { useState, useEffect } from 'react';
import './admin.css';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';

const AdminProfile = ({onLogout}) => {

  const handleLogout = () => {
    onLogout();
    window.location.href = '/login';
  };

  return (
    <div>
      <Sidebar onLogout={handleLogout}/>
    </div>
  );
};

export default AdminProfile;
