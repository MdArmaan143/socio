import React from "react";
import mainImg from '../../assets/images/image2.png'


const Signup = () => {
  return (
    <div className="pt-24 px-10 h-screen" style={{
      backgroundImage:`url(${mainImg})`,
      backgroundSize: "cover",
    }}>
      <h2 className="text-4xl font-bold mb-10 text-center">Signup</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <a
          href="/signup/college"
          className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-110 transition-all duration-1000 ease-in-out text-center"
        >
          <h1 className="text-5xl font-bold mb-2">
            <i class="fa-solid fa-building-columns"></i>
          </h1>
          <h3 className="text-2xl font-semibold mb-8">
            Signup as <span className="text-indigo-700">College</span>
          </h3>
          <div className="mb-8">
          <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Add your college
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Accept or Reject society requests
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Display upcoming college events onto the calendar
            </p>
            <div className="border-t border-slate-400"></div>
          </div>
          <span className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-full hover:text-gray-200">Register Now!</span>
        </a>
        <a
          href="/signup/society"
          className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-110 transition-all duration-1000 ease-in-out text-center"
        >
          <h1 className="text-5xl font-bold mb-2">
            <i class="fa-solid fa-people-group"></i>
          </h1>
          <h3 className="text-2xl font-semibold mb-8">
            Signup as <span className="text-indigo-700">Society</span>
          </h3>
          <div className="mb-8">
          <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Add your society
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Flex your achievements
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Display past events
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Give info about upcoming events
            </p>
            <div className="border-t border-slate-400"></div>
          </div>
          <span className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-full hover:text-gray-200">Go Live Now!</span>
        </a>
        <a
          href="/signup/student"
          className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-110 transition-all duration-1000 ease-in-out text-center"
        >
          <h1 className="text-5xl font-bold mb-2">
            <i class="fa-solid fa-book"></i>
          </h1>
          <h3 className="text-2xl font-semibold mb-8">
            Signup as <span className="text-indigo-700">Student</span>
          </h3>
          <div className="mb-8">
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
             Join society by choice
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Check history of society
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Keep track of upcoming events
            </p>
            <div className="border-t border-slate-400"></div>
            <p className="text-left text-slate-700 font-medium my-2">
              Explore unlimited societies
            </p>
            <div className="border-t border-slate-400"></div>
          </div>
          <span className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-full hover:text-gray-200">Explore Now!</span>
        </a>
      </div>

      <p className="mt-32">Already have a account ? <a href="/Login" className="text-blue-500 underline">Log in</a></p>
    </div>
  );
};

export default Signup;
