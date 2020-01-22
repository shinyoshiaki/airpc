import { wrap, udpWrapper } from "../src";
import { createSocket } from "dgram";
import { Test, exposeUdp } from "./udp";
import getPort from "get-port";

test(
  "udp",
  async () => {
    const socketA = createSocket("udp4");
    const portA = await getPort();
    socketA.bind(portA, "127.0.0.1");

    const socketB = createSocket("udp4");
    const portB = await getPort();
    socketB.bind(portB, "127.0.0.1");

    exposeUdp(socketB, portA, "127.0.0.1");
    const linked = wrap(Test, udpWrapper(socketA, portB, "127.0.0.1"));

    expect(await linked.increment(777)).toBe(778);
    expect(await linked.decrement(777)).toBe(776);
    let json = await linked.getJson();
    expect(json.a.b.c).toBe("d");
    json = await linked.getAsync();
    expect(json.a.b.c).toBe("d");
  },
  60_000 * 60
);
