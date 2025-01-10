import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Order ID: {order.id}</h5>
          <p className="card-text">Total Bill: ${order.bill}</p>
          <p className="card-text">Order Date: {new Date(order.currentDate).toLocaleString()}</p>
          <ul className="list-group list-group-flush">
            {order.inventory.map(item => (
              <li key={item.id} className="list-group-item">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;