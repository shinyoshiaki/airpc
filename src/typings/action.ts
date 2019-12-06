// prettier-ignore
type ActionFy<T> =
  T extends { [""]: boolean }
    ? Action<T>
    : T extends (...args: infer R1) => infer R2
        ? (...args: R1) => ActionFy<R2>
        : {type:string,args:any};

// prettier-ignore
export type Action<T> =
  (
    T extends (...args: infer R1) => infer R2
      ? (...args: R1) => ActionFy<R2>
      : unknown
  ) &
  (
    T extends Object
      ? { [K in keyof T]: Action<T[K]> }
      : unknown
  )
