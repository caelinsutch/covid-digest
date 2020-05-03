import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './home/home';
import * as serviceWorker from './serviceWorker';
import { Navbar, Nav, Button } from 'react-bootstrap';

ReactDOM.render(
  <React.StrictMode>
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href=""><img className="NavLogo" src="/img/logo.svg" alt="Logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href="about">About</Nav.Link>
                  <Nav.Link href="how-it-works">How it Works</Nav.Link>
                  <Nav.Link href="sources">Sources</Nav.Link>
                  <Nav.Link href="contact">Contact Us</Nav.Link>
              </Nav>
              <Button variant="outline-success" href="https://github.com/caelinsutch/covid-digest">Github</Button>
          </Navbar.Collapse>
      </Navbar>
      <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
