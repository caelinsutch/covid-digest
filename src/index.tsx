import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Footer from './components/footer/footer.component';
import NavCom from './components/navbar/navbar.component';

ReactDOM.render(
  <React.StrictMode>
    <NavCom />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
