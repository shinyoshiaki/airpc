import { wrap } from "../src";
import { mockWrapper } from "../src/module/__mock__";
import { Test, exposeMock } from "./mock";

test(
  "mock",
  async () => {
    exposeMock();
    const linked = wrap(Test, mockWrapper());

    expect(await linked.increment(777)).toBe(778);
    expect(await linked.decrement(777)).toBe(776);
    let json = await linked.getJson();
    expect(json.a.b.c).toBe("d");
    json = await linked.getAsync();
    expect(json.a.b.c).toBe("d");
  },
  60_000 * 60
);
