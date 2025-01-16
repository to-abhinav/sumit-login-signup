import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {


  return (
    <div className=" justify-center items-center ">
      <h1 className="text-4xl font-bold text-center ">
        Welcome login and signup app.
      </h1>
      <div className="flex justify-center">
        <button herf="/login">Login</button>
        <button herf="/signup">signup</button>
      </div>
      <p className="text-lg text-center">Let&apos;s get started</p>
    </div>
  );
}

export default App;
