import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// apollo
import ApolloProvider from "./ApolloProvider";

// provider
import { AuthProvider } from "./contextAuth";

// pages
import "./App.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DynamicRoute from './utils/DynamicRoute'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute exact path="/" component={Home} authenticated/>
              <DynamicRoute path="/register" component={Register} guest/>
              <DynamicRoute path="/login" component={Login} guest/>
            </Switch>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
