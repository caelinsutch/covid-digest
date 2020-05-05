import styled from 'styled-components';
export { default } from './navbar.component';

export const SidebarWrapper = styled.nav`
  width: 100%;
  transition: transform 0.3s ease-in-out;

  //Breakpoints

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    top: 0em;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-110%)')};
    left: 0;
    z-index: 1;
    position: absolute;
    background-color: white;
    height: 100vh;
    width: 70vw;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) and (max-width: 768px) {
    top: 0em;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-110%)')};
    left: 0;
    z-index: 1;
    position: absolute;
    background-color: white;
    height: 100vh;
    width: 60vw;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) and (max-width: 992px) {
    top: 0em;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-110%)')};
    left: 0;
    z-index: 1;
    position: absolute;
    background-color: white;
    height: 100vh;
    width: 50vw;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) and (max-width: 1200px) {
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
  }
`;

export const Sidebar = styled.nav`
  //Breakpoints

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
`;

export const Shadow = styled.div`
  background-color: rgba(0, 0, 0, 0.18);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;

  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
`;
