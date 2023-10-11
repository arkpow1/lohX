export type createStoreSignature = (
  name: string,
  store: { [a: string]: any }
) => void;

export type useLohXSignature = (storeName: string | string[]) =>
  | {
      [a: string]: any;
    }
  | {
      [a: string]: any;
    }[];

export type createRecursiveContextSignature = (
  contexts: [string, any][],
  children: React.ReactNode,
  index?: number
) => React.ReactNode;

export type timeoutsType = { [key: string]: number };

export type LohXProps = { children: React.ReactNode };
