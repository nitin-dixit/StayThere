import { Outlet } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider';
import NavBar from '@/components/Navbar';

const App = () => {
  const { token } = useAuth();

  if (window.Cypress) {
    return (
      <>
        {token && <NavBar />}
        <Outlet />
      </>
    );
  }

  return (
    <>
      {token && <NavBar />}
      <Outlet />
    </>
  );
};

export default App;
