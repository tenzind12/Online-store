import React from 'react';

function Order({ order }) {
  console.log('order rendered:', order);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <h6>
          <i className="fa fa-arrow-right"></i>
          {order.product.productName}
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
