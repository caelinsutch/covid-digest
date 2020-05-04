import React from 'react';
import './how-it-works.page.scss';

function HowItWorksPage(): JSX.Element {
  return (
    <>
      <div className="headerBackground" >
        <h1 className="text-center headerText">How it Works</h1>
      </div>
      <main>
        <section className="howworksWrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="text--center">
                  <h2 className="works-title">
                    It works because we beat the computer into submission.
                  </h2>
                  <p className="worksText">
                    This is an actual picture of us coding. --->
                  </p>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="text--center">
                  <img className="descriptorImg" src="/img/code.jpg" alt="AH YES CODE" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default HowItWorksPage;
