import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AboutPage from './pages/about/about.page';
// import HowItWorksPage from './how-it-works/how-it-works.page';
// import SourcesPage from './sources/sources.page';
// import ContactPage from './contact/contact.page';
import HomePage from './pages/home/home.page';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Footer from './components/footer/footer.component';

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
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              {/*<Route path="/how-it-works" component={HowItWorksPage} />*/}
              {/*<Route path="/sources" component={SourcesPage} />*/}
              {/*<Route path="/contact" component={ContactPage} />*/}
          </Switch>
      </HashRouter>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
