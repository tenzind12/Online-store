import { useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function Dashboard() {
  const userContext = useContext(UserContext);
  console.log(userContext);

  // changing document title
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';
  }, []);
  return <div>Dashboard</div>;
}

export default Dashboard;
