import { Link } from "react-router-dom";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Registering...");
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
          Welcome Newsx, Please Register
        </h3>

        <form className="pt-8 flex flex-col gap-4" onSubmit={handleRegister}>
          <div className="flex flex-col space-y-2 text-base font-normal">
            <label htmlFor="name">Full Name</label>
            <input
              required
              type="text"
              id="name"
              placeholder="Full Name"
              className=" bg-[#E3E3E3] rounded-xl px-4 py-2 h-14"
            />
          </div>

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
            Register
          </button>
        </form>

        <div className="pt-8">
          <p className="text-base font-normal text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 underline font-semibold text-sm"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
