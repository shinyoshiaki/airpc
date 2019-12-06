export const proxyMarker = Symbol("Comlink.proxy");

// prettier-ignore
type Anyfy<T> =
  T extends { [proxyMarker]: boolean }
    ? Any<T>
    : T extends (...args: infer R1) => infer R2
        ? (...args: R1) => Anyfy<R2>
        : {type:string,args:any};

// prettier-ignore
export type Any<T> =
  (
    T extends (...args: infer R1) => infer R2
      ? (...args: R1) => Anyfy<R2>
      : unknown
  ) &
  (
    T extends Object
      ? { [K in keyof T]: Any<T[K]> }
      : unknown
  )
