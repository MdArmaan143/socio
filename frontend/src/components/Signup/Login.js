import React from "react";
import image from '../../assets/images/image3.png'

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{
      backgroundImage:`url(${image})`,
      backgroundSize: "cover",
    }}>
      <div className="bg-gray-100 mb-8 rounded-md shadow-lg">
        <div className="grid grid-cols-2">

          <div className="bg-gradient-to-r from-indigo-500 to-yellow-500 text-white p-8 rounded-md">
            <h2 className="text-5xl font-bold mb-8">Socio</h2>

            <p className="text-4xl font-bold mb-4"><i class="fa-solid fa-graduation-cap mx-4"></i><i class="fa-solid fa-people-group"></i><i class="fa-solid fa-building mx-4"></i></p>
            <p className="text-xl font-medium mb-6">Your all-in-one platform for campus life</p>

            <ul>
              <li className="mb-1"><i class="fa-solid fa-circle text-[8px] -translate-y-1"></i> Connect with student, socities, and colleges</li>
              <li className="mb-1"><i class="fa-solid fa-circle text-[8px] -translate-y-1"></i> Stay update on campus events and news</li>
              <li className="mb-1"><i class="fa-solid fa-circle text-[8px] -translate-y-1"></i> Access academic resources and support</li>
              <li className="mb-1"><i class="fa-solid fa-circle text-[8px] -translate-y-1"></i> Collaborate on the project and initiative</li>
            </ul>
          </div>

          <div className="p-8">
          <h2 className="text-3xl font-bold text-center">Welcome to <span className="text-indigo-800">Socio</span></h2>
          <p className="text-slate-700 mb-16">Sign in to access your campus community</p>
        <button
          onClick={handleLogin}
          className="border-2 px-6 py-3 hover:scale-105 transition-all duration-1000 mb-16"
        >
          <i class="fa-brands fa-google"></i> &nbsp;&nbsp;Sign in with Google
        </button> 
          <p className="text-slate-600">By signing in, you agree to</p>
          <p className="text-slate-600">Socio's Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>

      <p>
        Didn't Signup Earlier?{" "}
        <a href="/Signup" className="text-blue-500 underline">
          Signup
        </a>
      </p>
    </div>
  );
};

export default Login;
