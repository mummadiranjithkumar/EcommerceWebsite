import App from "./App";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >

        <h2>
          Welcome {email}
        </h2>

        <button
          onClick={() => navigate("/cart")}
        >
          Cart
        </button>

        &nbsp;&nbsp;

        <button
          onClick={() => navigate("/orders")}
        >
          Orders
        </button>

        &nbsp;&nbsp;

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <App />

    </div>
  );
}

export default Dashboard;