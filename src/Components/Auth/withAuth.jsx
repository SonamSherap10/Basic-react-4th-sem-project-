import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent, requiredRole) => {
  const AuthComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || !role  || role !== requiredRole ) {
        alert('please sign in or use other account')
        navigate('/login');
      }
    }, []);

    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;
