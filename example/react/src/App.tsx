import React, { FC, useEffect } from "react";
import { exposeMock, Test } from "../../../__tests__/mock";
import { wrap } from "../../../src";
import { mockWrapper } from "../../../src/module/__mock__";

const App: FC = () => {
  useEffect(() => {
    exposeMock();
    const linked = wrap(Test, mockWrapper());
    const promise = async () => {
      const res = await linked.increment(777);
      console.log(res);
    };
    promise();
  }, []);

  return (
    <div>
      <button>button</button>
    </div>
  );
};

export default App;
