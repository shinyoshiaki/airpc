/// <reference types="node" />
import { Exposer, Wrapper } from "../main";
import { Worker } from "worker_threads";
export declare const workerThreadsWrapper: (worker: Worker) => Wrapper;
export declare const workerThreadsExposer: () => Exposer;
