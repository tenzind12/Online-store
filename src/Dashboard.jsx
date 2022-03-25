import { useEffect, useContext, useState, useCallback } from 'react';
import { UserContext } from './UserContext';
import Order from './Order';
import { OrderService, ProductService } from './Service';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const userContext = useContext(UserContext);

  // FETCH DATA FROM "order's" ARRAY
  const loadDataFromDatabase = useCallback(async () => {
    /* load orders data from database matching userId */
    const orderResponse = await fetch(
      `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
      { method: 'GET' }
    );
    if (orderResponse.ok) {
      const ordersResponseBody = await orderResponse.json();

      /* fetch req for products data to find the products name corresponding to the order.productId */
      const productsResponse = await ProductService.fetchProducts();

      if (productsResponse.ok) {
        const productsResponseBody = await productsResponse.json();

        /* reading all orders data & inserting object of product's details in order's object */
        ordersResponseBody.forEach((order) => {
          // console.log(productsResponseBody[0].id === order.productId);
          order.product = ProductService.getProductByProductId(
            productsResponseBody,
            order.productId
          );
        });
      }
      // console.log(ordersResponseBody);
      setOrders(ordersResponseBody);
    }
  }, [userContext.user.currentUserId]);

  // U S E   E F F E C T on page load
  useEffect(() => {
    document.title = 'Dashboard - eCommerce';

    loadDataFromDatabase();
  }, [userContext.user.currentUserId, loadDataFromDatabase]);

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard{' '}
          <button className="btn btn-sm btn-info text-light" onClick={loadDataFromDatabase}>
            <i className="fa fa-refresh"> Refresh</i>
          </button>
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          {/* get previous orders */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history"></i>Previous Orders{' '}
              <span className="badge bg-info">{OrderService.getPrevOrders(orders).length}</span>
            </h4>
            {OrderService.getPrevOrders(orders).length === 0 && (
              <div className="text-danger">No Orders</div>
            )}
            {OrderService.getPrevOrders(orders).map((order) => {
              return <Order key={order.id} order={order} />;
            })}
          </div>

          {/* get cart products */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i>Cart{' '}
              <span className="badge bg-primary">{OrderService.getCart(orders).length}</span>
            </h4>
            {OrderService.getCart(orders).length === 0 && (
              <div className="text-danger">Cart is empty</div>
            )}
            {OrderService.getCart(orders).map((order) => {
              return <Order key={order.id} order={order} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
