import { expose } from "../src";
import { Socket } from "dgram";
import { udpExposer } from "../src/module/udp";

export class Test {
  increment(n: number) {
    return n + 1;
  }

  decrement(n: number) {
    return n - 1;
  }

  getJson() {
    return { a: { b: { c: "d", n: 0 } } };
  }

  async getAsync() {
    await new Promise(r => setTimeout(r, 10));
    return { a: { b: { c: "d", n: 0 } } };
  }
}

export const exposeUdp = (socket: Socket, port: number, address: string) =>
  expose(new Test(), udpExposer(socket, port, address));
