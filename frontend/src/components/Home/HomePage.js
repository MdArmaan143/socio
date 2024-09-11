import React from 'react';
import mainImg from '../../assets/images/image1.png'

const HomePage = () => {
  return (
    <div className="h-screen text-indigo-700 pl-16" style={{
      backgroundImage:`url(${mainImg})`,
      backgroundSize: "cover",
    }}>
      <div className='py-60'>
      <h1 className="text-7xl font-bold text-left max-w-xl mb-4">Connect, Explore and Thrive</h1>
      <p className="text-xl mb-8 text-left max-w-xl ">
        Socio is the ultimate platform for students, colleges, and societies to connect, collaborate, and succeed. 
      </p>
      <div className='text-left'>
      <a href="/signup" className="bg-yellow-500 text-black text-2xl px-6 py-3 font-bold shadow-lg hover:rounded-full transition-all duration-300 ease-in-out">Get Started !</a>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
