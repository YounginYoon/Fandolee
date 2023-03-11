import logo from "./logo.svg";
import "./App.css";
import { db } from "./config/firebase";
import { useEffect } from "react";

function App() {
  const test = async () => {
    const product = db.collection("product");

    const ret = await product.doc("6PK3dqb4N85M7LloAYNA").get();

    console.log("ret: ", ret.data());
  };

  useEffect(() => {
    test();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
