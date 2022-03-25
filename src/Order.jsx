import React from 'react';

function Order({ order, buyHandler, deleteHandler }) {
  console.log('order rendered:', order);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i>
          {order.product.productName}

          {/* display buy button only when payment is not done */}
          {order.isPaymentCompleted || (
            <div className="float-end">
              <button
                className="btn btn-sm btn-info"
                onClick={() => {
                  buyHandler(order.id, order.userId, order.productId, order.quantity);
                }}
              >
                <i className="fa fa-truck"></i> Buy now
              </button>
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={() => deleteHandler(order.id)}
              >
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
          )}
        </h6>

        <table className="table table-sm table-borderless mt-1">
          <tbody>
            <tr>
              <td style={{ width: '100px' }}>Quantity:</td>
              <td>{order.quantity}</td>
            </tr>
            <tr>
              <td style={{ width: '100px' }}>Price:</td>
              <td>€ {order.product.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(Order);
