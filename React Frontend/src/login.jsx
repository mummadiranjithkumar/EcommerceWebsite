import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await axios.post(
        "http://localhost:9090/auth/login",
        {
          email,
          password
        }
      );
      console.log(response.data);

      const token = response.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      console.log(response.data);

      alert("Login Successful");

      if (onLogin) {
        onLogin();
      }

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <br /><br />

      <button onClick={() => navigate("/register")}>
        Register
      </button>

    </div>
  );
}

export default Login;