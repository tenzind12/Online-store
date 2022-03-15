import { useEffect } from 'react';

function Dashboard() {
  // changing document title
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';
  }, []);
  return <div>Dashboard</div>;
}

export default Dashboard;
