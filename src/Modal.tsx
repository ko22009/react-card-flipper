import React, { CSSProperties, ReactNode, useRef, useState } from "react";

const styleModal: CSSProperties = {
  zIndex: 1,
  paddingTop: "100px",
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
  cursor: "pointer",
};

const styleBodyModal: CSSProperties = {
  margin: "auto",
  position: "relative",
  width: "600px",
  minHeight: "200px",
  border: "1px solid black",
  backgroundColor: "#fff",
  cursor: "initial",
};

const styleHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid black",
  alignItems: "baseline",
};

const styleContentModal: CSSProperties = {
  padding: "10px",
};

type FunctionWithClose = (close: Function) => void;

type Props = {
  title?: string;
  content?: string | ReactNode | FunctionWithClose;
  actionName?: string | ReactNode;
};

function Modal(props: Props) {
  const refBody = useRef<HTMLDivElement>(null);
  const [modal, showModal] = useState(false);
  function onClick(event: React.MouseEvent<HTMLDivElement>) {
    const node = event.target as Node;
    if (refBody.current && !refBody.current.contains(node)) {
      console.log("ouside");
      showModal(false);
    }
  }
  const action = (
    <button onClick={() => showModal(true)}>{props.actionName}</button>
  );
  return (
    <div>
      {action}
      {modal && (
        <div data-testid="modal" onClick={onClick} style={styleModal}>
          <div data-testid="body" ref={refBody} style={styleBodyModal}>
            <div style={styleHeader}>
              <span>{props.title}</span>
              <button
                data-testid="close"
                style={{ cursor: "pointer" }}
                onClick={() => showModal(false)}
              >
                x
              </button>
            </div>
            <div style={styleContentModal}>
              {typeof props.content === "function"
                ? props.content(() => showModal(false))
                : props.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Modal.defaultProps = {
  title: "Header",
  content: "Content",
  actionName: "Show Modal",
};

export default Modal;
