import React from 'react'



function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the To Do Application</h1>
      <div className=" container d-flex justify-content-center mt-4">
        <pre>
          This is a Simple To Do Application with working Frontend and Backend
        </pre>
      </div>
      <div className="buttons d-flex justify-content-center mt-4">
        <button className=" bg-primary p-3 border-0 rounded">
          <a href="/Register" className="text-decoration-none text-white px-3">
            Register
          </a>
        </button>
        <button className="ms-3 bg-primary border-0 rounded">
          <a href="/Login" className="text-decoration-none text-white px-3">
            Login
          </a>
        </button>
      </div>
    </div>
  );
}

export default Home
