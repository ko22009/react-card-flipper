import Form from "./Form";
import Modal from "./Modal";
import React from "react";

function Auth() {
  return (
    <Modal
      title={"Login"}
      content={(close) => (
        <Form
          onSubmit={() => {
            close();
          }}
        />
      )}
    />
  );
}

export default Auth;
