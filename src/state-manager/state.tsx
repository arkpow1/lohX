import React from "react";
import {
  LohXProps,
  createRecursiveContextSignature,
  createStoreSignature,
  timeoutsType,
  useLohXSignature,
} from "./types";

const contextsMap = new Map();
const storesMap = new Map();

export const useLohX: useLohXSignature = (storeName) =>
  React.useContext(contextsMap.get(storeName));

export const createStore: createStoreSignature = (name, store) => {
  if (!storesMap.has(name)) {
    storesMap.set(name, store);
    contextsMap.set(name, React.createContext(null));
  }
};

const createRecursiveContext: createRecursiveContextSignature = (
  contexts,
  children,
  index = 0
) => {
  if (contexts.length === 0) {
    return children;
  }
  const [key, Component] = contexts[index];

  return (
    <Component.Provider value={storesMap.get(key)}>
      {index === contexts.length - 1
        ? children
        : createRecursiveContext(contexts, children, index + 1)}
    </Component.Provider>
  );
};

export const LohX = ({ children }: LohXProps) => {
  const timeouts = React.useRef<timeoutsType>({});
  const isInitial = React.useRef(true);

  const [, setTrigger] = React.useState(false);

  [...storesMap.entries()].forEach(([itemKey, itemValue]) => {
    const makeProxy = (obj: { [key: string]: any }) => {
      return new Proxy(obj, {
        set: (target, key, value) => {
          const timeoutsKeys = Object.keys(timeouts.current);
          target[key as string] = value;

          clearTimeout(timeouts.current[itemKey]);
          timeouts.current[itemKey] = setTimeout(() => {
            timeoutsKeys.forEach((key) => delete timeouts.current[key]);
            storesMap.set(itemKey, makeProxy(itemValue));

            setTrigger((prev) => !prev);
            clearTimeout(timeouts.current[itemKey]);
          }, 0);
          return true;
        },
      });
    };

    if (isInitial.current) {
      storesMap.set(itemKey, makeProxy(itemValue));
    }
  });

  isInitial.current = false;

  return createRecursiveContext([...contextsMap.entries()], children);
};
