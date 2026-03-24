import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const email = localStorage.getItem("email");
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/order/fetch", {
        params: { userId: email },
      })
      .then((res) => setOrders(res.data.info));
  }, []);

  return (
    <div className="orders">
      <h1>My Orders</h1>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <img src={`../../public/assets/uploads/caticons/${order.image}`} />

            <div className="order-content">
              <h3>{order.productName}</h3>

              <p className="order-price">₹ {order.price}</p>

              <p className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <span className="order-status">SUCCESS</span>
            </div>

            <button onClick={() => setSelectedOrder(order)}>
              View Invoice
            </button>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <div className="invoice-overlay">
          <div className="invoice-modal">
            <h1>Invoice</h1>

            <p>
              <b>Order ID:</b> {selectedOrder.orderId}
            </p>
            <p>
              <b>Payment ID:</b> {selectedOrder.paymentId}
            </p>

            <hr />

            <p>
              <b>Name:</b> {selectedOrder.name}
            </p>
            <p>
              <b>Email:</b> {selectedOrder.email}
            </p>
            <p>
              <b>Mobile:</b> {selectedOrder.mobile}
            </p>

            <hr />

            <h3>{selectedOrder.productName}</h3>
            <p>Price: ₹ {selectedOrder.price}</p>

            <hr />

            <h2>Total: ₹ {selectedOrder.price}</h2>

            <div className="invoice-actions">
              <button onClick={() => window.print()}>🖨 Print</button>
              <button onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
