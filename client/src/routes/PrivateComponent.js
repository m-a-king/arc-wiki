import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Stores from '../stores';

function PrivateComponent() {
  const navigate = useNavigate();
  const { authStore }  = Stores();

  useEffect(() => {
    if (!authStore.isLoggedIn()) {
      navigate("/signin");
    }
  }, [authStore, navigate]);

  return <Outlet />;
}

export default PrivateComponent;