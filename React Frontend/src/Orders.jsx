import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(
      "http://localhost:9090/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      setOrders(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <div style={{ textAlign: "center" }}>

      <h1>My Orders</h1>

      {orders.map((order) => (

        <div key={order.id}>

          <h3>Order ID : {order.id}</h3>

          <h3>Total Amount : ₹ {order.totalAmount}</h3>

          <h4>
            Order Date :{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"}
          </h4>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Orders;