import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const loadProducts = () => {

    axios.get(
      "http://localhost:9090/products",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {

    if (isLoggedIn) {
      loadProducts();
    }

  }, [isLoggedIn]);

  const addProduct = async () => {

    try {

      if (editId) {

        await axios.put(
          `http://localhost:9090/products/${editId}`,
          {
            name,
            description,
            price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setEditId(null);

      } else {

        await axios.post(
          "http://localhost:9090/products",
          {
            name,
            description,
            price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      setName("");
      setDescription("");
      setPrice("");

      loadProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:9090/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {

    try {

      await axios.post(
        "http://localhost:9090/cart",
        {
          productId: productId,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added To Cart");

    } catch (error) {

      console.log(error);

      alert("Failed To Add Cart");
    }
  };

  const editProduct = (product) => {

    setEditId(product.id);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  };

  const logout = () => {

    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {

    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <div style={{ textAlign: "center" }}>

      <button onClick={logout}>
        Logout
      </button>

      <h1>
        {editId ? "Update Product" : "Add Product"}
      </h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <button onClick={addProduct}>
        {editId ? "Update Product" : "Add Product"}
      </button>

      <hr />

      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {products
        .filter((product) =>
          product.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((product) => (
          <div key={product.id}>

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>

            <button
              onClick={() => editProduct(product)}
            >
              Edit
            </button>

            &nbsp;

            <button
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>

            &nbsp;

            <button
              onClick={() => addToCart(product.id)}
            >
              Add To Cart
            </button>

            <hr />

          </div>
        ))}

    </div>
  );
}

export default App;