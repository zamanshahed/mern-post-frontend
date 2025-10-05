const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#6200EE]">
      <div className="text-2xl sm:max-w-[500px] w-full font-semibold space-grotesk bg-white p-12 rounded-xl">
        <img
          src="/images/login-logo.svg"
          alt="Newsx Logo"
          className=" mx-auto"
        />
        <h3 className="text-xl pt-4">Welcome Newsx, Please Log In</h3>

        <form className="pt-8 flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col space-y-2 text-base font-normal">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              placeholder="Email"
              className=" bg-[#E3E3E3] rounded-xl px-4 py-2 h-14"
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
            />
          </div>

          <button
            type="submit"
            className="bg-[#6200EE] text-white text-base font-semibold px-4 py-2 h-14 rounded-xl cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
