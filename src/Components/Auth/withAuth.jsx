import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent, requiredRole) => {
  const AuthComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const isSignedIn = localStorage.getItem('isSignedIn');

      if (!token || !role || !isSignedIn || role !== requiredRole || isSignedIn !== 'true') {
        alert('please sign in or use other account')
        navigate('/login');
      }
    }, []);

    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;
