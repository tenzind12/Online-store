import { useEffect, useContext, useState, useCallback } from 'react';
import { UserContext } from './UserContext';
import Order from './Order';
import { OrderService, ProductService } from './Service';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [deleteMsgAlert, setDeleteMsgAlert] = useState(false);
  const [orderPlacedAlert, setOrderPlacedAlert] = useState(false);

  // useContext object is set in login.jsx
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

  // B U Y   H A N D L E R
  const buyHandler = useCallback(
    async (orderId, userId, productId, quantity) => {
      if (window.confirm('Do you want to place the order?')) {
        // CREATE UPDATED ORDER'S OBJECT
        let updateOrder = {
          id: orderId,
          userId: userId,
          productId: productId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        // UPDATE WITH NEW OBJECT IN DATABASE
        const orderResponse = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: 'PUT',
          body: JSON.stringify(updateOrder),
          headers: { 'Content-type': 'application/json' },
        });

        if (orderResponse.ok) {
          const orderResponseBody = await orderResponse.json();
          console.log(orderResponseBody);
          loadDataFromDatabase();
          setOrderPlacedAlert(true);
        }
      }
    },
    [loadDataFromDatabase]
  );

  // D E L E T E   H A N D L E R
  const deleteHandler = useCallback(
    async (orderId) => {
      if (window.confirm('Are you sure to delete this item from cart?')) {
        const orderResponse = await fetch(`http://localhost:5000/orders/${orderId}`, {
          method: 'DELETE',
        });

        if (orderResponse.ok) {
          const orderResponseBody = await orderResponse.json();
          console.log(orderResponseBody);
          loadDataFromDatabase();
          setDeleteMsgAlert(true);
        }
      }
    },
    [loadDataFromDatabase]
  );

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

          {/* cart products */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i>Cart{' '}
              <span className="badge bg-primary">{OrderService.getCart(orders).length}</span>
            </h4>

            {orderPlacedAlert && (
              <div className="alert alert-success alert-dismissible fade show mt-1" role="alert">
                Your order has been placed.
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="alert"
                  onClick={() => setOrderPlacedAlert(false)}
                ></button>
              </div>
            )}

            {deleteMsgAlert && (
              <div className="alert alert-danger alert-dismissible fade show mt-1" role="alert">
                The product has been deleted from the cart.
                <button
                  className="btn-close"
                  type="button"
                  data-bs-dismiss="alert"
                  onClick={() => setDeleteMsgAlert(false)}
                ></button>
              </div>
            )}

            {OrderService.getCart(orders).length === 0 && (
              <div className="text-danger">Cart is empty</div>
            )}
            {OrderService.getCart(orders).map((order) => {
              return (
                <Order
                  key={order.id}
                  order={order}
                  buyHandler={buyHandler}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
