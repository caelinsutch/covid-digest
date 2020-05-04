import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import HomePage from './pages/home/home.page';
import { Navbar, Nav, Button } from 'react-bootstrap';

ReactDOM.render(
  <React.StrictMode>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="">
        <img className="NavLogo" src="/img/logo.svg" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="about">About</Nav.Link>
          <Nav.Link href="how-it-works">How it Works</Nav.Link>
          <Nav.Link href="sources">Sources</Nav.Link>
          <Nav.Link href="contact">Contact Us</Nav.Link>
        </Nav>
        <Button
          variant="outline-success"
          href="https://github.com/caelinsutch/covid-digest"
        >
          Github
        </Button>
      </Navbar.Collapse>
    </Navbar>
    <HomePage />
  </React.StrictMode>,
  document.getElementById('root')
);
