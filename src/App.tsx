import React from "react";
import "./App.css";
import { LohX, createStore, useLohX } from "./state-manager";

const Test = () => {
  const store = useLohX("test");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using store "test" </h3>
      <p> count from LohX is {store.count}</p>
      <p> id from LohX is {store.id}</p>
      <button
        onClick={() => {
          store.count++;
        }}
      >
        count++
      </button>
      <p>Count of renders: {rendersCountRef.current}</p>
    </div>
  );
};

const Test2 = () => {
  const store = useLohX("test");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using store "test" </h3>
      <p> count from LohX is {store.count}</p>
      <p> id from LohX is {store.id}</p>
      <button
        onClick={() => {
          store.count++;
          store.count++;
          store.count++;
          store.count++;
          store.id = crypto.randomUUID();
        }}
      >
        (count++ 4 times and add id)
      </button>
      <p>Count of renders: {rendersCountRef.current}</p>
    </div>
  );
};

const Test3 = () => {
  const store = useLohX("kek");
  const rendersCountRef = React.useRef(0);

  rendersCountRef.current += 1;

  return (
    <div style={{ border: "2px solid white", padding: "12px 16px" }}>
      <h3>This component using store "kek" </h3>
      <p> count from LohX is {store.count}</p>
      <button
        onClick={() => {
          store.count++;
        }}
      >
        count++ in another store
      </button>
      <p>
        Count of renders: <h2>{rendersCountRef.current}</h2>
      </p>
    </div>
  );
};

createStore("test", { count: 0, id: null });
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
