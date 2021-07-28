import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./store/counterReducer";
import { RootState } from "./store/rootReducer";

function Counter() {
  const count = useSelector((state: RootState) => {
    return state.Counter.value;
  });
  const dispatch = useDispatch();
  return (
    <div>
      <button data-testid="button" onClick={() => dispatch(increment())}>
        +
      </button>{" "}
      | <span data-testid="count">{count}</span> |{" "}
      <button data-testid="button" onClick={() => dispatch(decrement())}>
        -
      </button>
    </div>
  );
}

export default memo(Counter);
