import React from "react";

function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tighter mb-8">
          Hello, this is the login and signup page
        </h1>
        <div className="flex gap-4 justify-center">
          <a 
            href="/login" 
            className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </a>
          <a 
            href="/signup" 
            className="p-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
