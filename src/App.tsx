import Form from "./Form";
import Counter from "./Counter";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Modal from "./Modal";

class Home extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/modal">Modal</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function App() {
  return (
    <Router>
      <Home />
      <Switch>
        <Route path="/form">
          <Form />
        </Route>
        <Route path="/counter">
          <Counter />
        </Route>
        <Route path="/modal">
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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
