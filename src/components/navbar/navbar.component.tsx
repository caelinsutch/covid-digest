import React, { useState } from 'react';
import styles from './navbar.module.scss';
import AboutPage from '../../pages/about/about.page';
import HomePage from '../../pages/home/home.page';
import HowItWorksPage from '../../pages/how-it-works/howItWorksPage';
import ContactPage from '../../pages/contact/contact.page';
import { Navbar, Button } from 'react-bootstrap';
import { Route, Switch, BrowserRouter, NavLink, Link } from 'react-router-dom';
import { SidebarWrapper, Sidebar, Shadow } from './navbar.styled';
import classNames from 'classnames';

function stopScrolling(open: any): void {
  if (open === true) {
    document.body.style.overflow = 'hidden';
  }

  if (open === false) {
    document.body.style.overflow = 'visible';
  }
}

function NavCom(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Shadow open={open} />
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to={'/'}>
              <img className={styles.NavLogo} src="/img/logo.svg" alt="Logo" />
            </Link>
          </Navbar.Brand>
          <Button
            variant="outline-secondary"
            className={styles.activatorButton}
            onClick={(): void => {
              setOpen(!open);
              stopScrolling(!open);
            }}
          >
            &#9776;
          </Button>
          <SidebarWrapper open={open}>
            <Sidebar className={classNames('mr-auto', styles.sidebarSpacing)}>
              <div className={styles.spacing} />
              <NavLink
                to="/about"
                className={styles.navBarLink}
                activeClassName={styles.active}
              >
                About
              </NavLink>
              <br />
              <div className={styles.spacing} />
              <NavLink
                to="/how-it-works"
                className={styles.navBarLink}
                activeClassName={styles.active}
              >
                How it Works
              </NavLink>
              <br />
              <div className={styles.spacing} />
              <NavLink
                to="/contact"
                className={styles.navBarLink}
                activeClassName={styles.active}
              >
                Contact Us
              </NavLink>
              <div className={styles.spacing} />
            </Sidebar>
            <Button
              variant="outline-success"
              href="https://github.com/caelinsutch/covid-digest"
              className={styles.githubButton}
            >
              Github
            </Button>
          </SidebarWrapper>
        </Navbar>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/how-it-works" component={HowItWorksPage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default NavCom;
