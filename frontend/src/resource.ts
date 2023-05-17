// Simple abstractions for fetching/saving resources which attempts to represent all of the valid
// states associated with fetching or saving a resource (and none of the invalid ones!).

export interface ReadResourceIdle {
    readonly status: "idle";
  }
  export interface ReadResourceFetching {
    readonly status: "fetching";
  }
  export interface ReadResourceSuccess<T> {
    readonly status: "success";
    readonly result: T;
  }
  export interface ReadResourceFailure<E = string> {
    readonly status: "error";
    readonly errorMessage: E;
  }
  
  export interface WriteResourceIdle<D> {
    readonly status: "idle";
    readonly data: D;
  }
  export interface WriteResourceFetching<D> {
    readonly status: "fetching";
    readonly data: D;
  }
  export interface WriteResourceSaving<D> {
    readonly status: "saving";
    readonly data: D;
  }
  export interface WriteResourceSuccess<D, T> {
    readonly status: "success";
    readonly data: D;
    readonly result: T;
  }
  export interface WriteResourceFailure<D, E = string> {
    readonly status: "error";
    readonly data: D;
    readonly errorMessage: E;
  }
  
  // For fetching resources (read-only)
  export type ReadResource<T> =
    | ReadResourceIdle
    | ReadResourceFetching
    | ReadResourceSuccess<T>
    | ReadResourceFailure;
  
  // For saving (create) or fetching and saving (update)
  export type WriteResource<D, T> =
    | WriteResourceIdle<D>
    | WriteResourceFetching<D>
    | WriteResourceSaving<D>
    | WriteResourceSuccess<D, T>
    | WriteResourceFailure<D>;