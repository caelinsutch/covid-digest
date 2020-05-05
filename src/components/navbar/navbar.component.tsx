import React, { useState } from 'react';
import styles from './navbar.module.scss';
import AboutPage from '../../pages/about/about.page';
import HomePage from '../../pages/home/home.page';
import SourcesPage from '../../pages/sources/sources.page';
import HowItWorksPage from '../../pages/how-it-works/how-it-works.page';
import ContactPage from '../../pages/contact/contact.page';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import { SidebarWrapper, Sidebar, Shadow } from "./navbar.styled";
import classNames from "classnames";

function stopScrolling(open: any): void {
    if (open === true) {
        document.body.style.overflow = "hidden";
    }

    if (open === false) {
        document.body.style.overflow = "visible";
    }
}

function NavCom(): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Shadow open={open}></Shadow>
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        <img className={styles.NavLogo} src="/img/logo.svg" alt="Logo"/>
                    </Navbar.Brand>
                    <Button variant="outline-secondary" className={styles.activatorButton} onClick={() => {
                        setOpen(!open);
                        stopScrolling(!open);
                    }}>
                        &#9776;
                    </Button>
                    <SidebarWrapper open={open}>
                        <Sidebar className={classNames("mr-auto", styles.sidebarSpacing)}>
                            <Nav.Link>
                                <Link to="/about" className={styles.navBarLink}>
                                    About
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/how-it-works" className={styles.navBarLink}>
                                    How it Works
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/sources" className={styles.navBarLink}>
                                    Sources
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/contact" className={styles.navBarLink}>
                                    Contact Us
                                </Link>
                            </Nav.Link>
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
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/how-it-works" component={HowItWorksPage}/>
                    <Route path="/sources" component={SourcesPage}/>
                    <Route path="/contact" component={ContactPage}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default NavCom;