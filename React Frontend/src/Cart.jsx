import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const loadCart = async () => {

    try {

      const cartResponse = await axios.get(
        "http://localhost:9090/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const productResponse = await axios.get(
        "http://localhost:9090/products",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems(cartResponse.data);
      setProducts(productResponse.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    loadCart();

  }, []);

  const removeItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:9090/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadCart();

    } catch (error) {

      console.log(error);
    }
  };

  const getProduct = (productId) => {

    return products.find(
      (p) => p.id === productId
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => {

      const product = getProduct(
        item.productId
      );

      return total +
        (product
          ? product.price * item.quantity
          : 0);

    },
    0
  );

  const placeOrder = async () => {

    try {

      await axios.post(
        "http://localhost:9090/orders",
        {
          totalAmount: totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order Placed Successfully");

      navigate("/orders");

    } catch (error) {

      console.log(error);

      alert("Failed To Place Order");
    }
  };

  return (

    <div style={{ textAlign: "center" }}>

      <h1>Shopping Cart</h1>

      {cartItems.map((item) => {

        const product = getProduct(
          item.productId
        );

        if (!product) return null;

        return (

          <div key={item.id}>

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>
              ₹ {product.price}
            </h3>

            <p>
              Quantity : {item.quantity}
            </p>

            <button
              onClick={() =>
                removeItem(item.id)
              }
            >
              Remove
            </button>

            <hr />

          </div>
        );
      })}

      <h2>
        Total : ₹ {totalPrice}
      </h2>

      <br />

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>
  );
}

export default Cart;