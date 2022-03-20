import { useEffect, useContext, useState } from 'react';
import { UserContext } from './UserContext';

function Dashboard() {
  // G E T  P A I D  O R D E R S
  const getPrevOrders = (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === true);
  };

  // G E T  C A R T (payment not done)
  const getCart = (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === false);
  };

  const [orders, setOrders] = useState([]);
  const userContext = useContext(UserContext);

  // executing on load of the page
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';

    // load orders data from database matching userId
    (async () => {
      const response = await fetch(
        `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
        { method: 'GET' }
      );
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
      }
    })();
  }, [userContext.user.currentUserId]);
  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          {/* get previous orders */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history"></i>Previous Orders
            </h4>
          </div>

          {/* get cart products */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i>Cart
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
