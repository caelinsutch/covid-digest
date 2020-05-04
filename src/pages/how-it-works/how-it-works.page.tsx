import React from 'react';
import './how-it-works.page.scss';

function HowItWorksPage(): JSX.Element {
  return (
    <>
      <div className="headerBanner" />
      <main>
        <section>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <div className="text--center">
                  <h2 className="works-title">
                    It works because we beat the computer into submission.
                  </h2>
                  <p className="worksText">
                    This is an actual picture of us coding. --->
                  </p>
                </div>
              </div>
              <div className="col col--6">
                <div className="text--center">
                  <img src="/img/code.jpg" alt="AH YES CODE" />
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
