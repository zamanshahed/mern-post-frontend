import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApis";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      setUser(data.user);
      console.log("Logged in:", data);
      localStorage.setItem("token", data.token); // save JWT
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/app");
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6200EE]">
      <div className="text-2xl sm:max-w-[500px] w-full font-semibold space-grotesk bg-white p-12 rounded-xl">
        <img
          src="/images/login-logo.svg"
          alt="Newsx Logo"
          className=" mx-auto"
        />
        <h3 className="text-xl pt-4 text-center">
          Welcome Newsx, Please Log In
        </h3>

        <form className="pt-8 flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col space-y-2 text-base font-normal">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              placeholder="Email"
              className=" bg-[#E3E3E3] rounded-xl px-4 py-2 h-14"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 text-base font-normal">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Password"
              className=" bg-[#E3E3E3] rounded-xl px-4 py-2 h-14"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-[#6200EE] text-white text-base font-semibold px-4 py-2 h-14 rounded-xl cursor-pointer"
          >
            Log In
          </button>
        </form>

        <div className="pt-8">
          <p className="text-base font-normal text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 underline font-semibold text-sm"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
