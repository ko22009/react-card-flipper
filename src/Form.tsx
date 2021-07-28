import React, { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  onSubmit?: Function;
}

function Form(props: Props) {
  let ref = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState("");
  const handleSubmit = props.onSubmit;

  const onClick = useCallback(() => {
    const event = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    ref.current?.dispatchEvent(event);
  }, []);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  useEffect(() => {
    const element = ref.current;

    function onSumbit(e: Event) {
      e.preventDefault();
      if (handleSubmit) {
        handleSubmit();
      }
    }

    element?.addEventListener("submit", onSumbit);
    return () => {
      element?.removeEventListener("submit", onSumbit);
    };
  }, [handleSubmit]);

  return (
    <div style={{ paddingBottom: "5px" }}>
      <form ref={ref} style={{ paddingBottom: "5px" }}>
        <input type="text" value={value} onChange={onChange} />
      </form>
      <button data-testid="onSubmit" onClick={onClick}>
        submit
      </button>
    </div>
  );
}

export default React.memo(Form);
