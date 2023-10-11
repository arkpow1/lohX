import React from "react";
import "./App.css";
import { LohX, createStore, useLohX } from "./state-manager";

const Test = () => {
  const store = useLohX("test");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using state "test" </h3>
      count from LohX is {store.count}
      <button
        onClick={() => {
          store.count++;
        }}
      >
        click
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

const Test2 = () => {
  const store = useLohX("test");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using state "test" </h3>
      count from LohX is {store.count}
      <button
        onClick={() => {
          store.count++;
        }}
      >
        click
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

const Test3 = () => {
  const store = useLohX("kek");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using state "kek" </h3>
      count from LohX is {store.count}
      <button
        onClick={() => {
          store.count++;
        }}
      >
        click
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

createStore("test", { count: 0 });
createStore("kek", { count: 10000 });

function App() {
  return (
    <LohX>
      <Test />
      <Test2 />
      <Test3 />
    </LohX>
  );
}

export default App;
