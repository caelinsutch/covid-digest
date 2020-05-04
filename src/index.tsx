import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './home/home';
import About from './about/about';
// import HowItWorks from './how-it-works/how-it-works';
// import Sources from './sources/sources';
// import Contact from './contact/contact';
import * as serviceWorker from './serviceWorker';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/"><img className="NavLogo" src="/img/logo.svg" alt="Logo"/></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Nav.Link><Link to="/about" className="navBarLink">About</Link></Nav.Link>
                      <Nav.Link><Link to="/how-it-works" className="navBarLink">How it Works</Link></Nav.Link>
                      <Nav.Link><Link to="/sources" className="navBarLink">Sources</Link></Nav.Link>
                      <Nav.Link><Link to="/contact" className="navBarLink">Contact Us</Link></Nav.Link>
                  </Nav>
                  <Button variant="outline-success" href="https://github.com/caelinsutch/covid-digest">Github</Button>
              </Navbar.Collapse>
          </Navbar>

          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              {/*<Route path="/how-it-works" component={HowItWorks} />*/}
              {/*<Route path="/sources" component={Sources} />*/}
              {/*<Route path="/contact" component={Contact} />*/}
          </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
