import React from 'react';
import './footer.scss';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="container p-4">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <h3>Covid Digest</h3>
            <p>Made by Caelin Sutch and Alden Parker</p>
            <p>Copyright {new Date().getFullYear()}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <p>
              Questions, comments, or concerns? Email us at
              caelinsutch@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
