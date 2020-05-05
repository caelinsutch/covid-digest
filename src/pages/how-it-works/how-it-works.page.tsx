import React from 'react';
import styles from './how-it-works.module.scss';
import classNames from 'classnames';

function HowItWorksPage(): JSX.Element {
  return (
    <>
      <div className={styles.headerBackground}>
        <h1 className={classNames("text-center", styles.headerText)}>How it Works</h1>
      </div>
      <main>
        <section className={styles.howworksWrapper}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <h2 className={styles.worksTitle}>
                  It works because we beat the computer into submission.
                </h2>
                <p>
                  This is an actual picture of us coding. --->
                </p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="text-center">
                  <img
                    className={styles.descriptorImg}
                    src="/img/code.jpg"
                    alt="AH YES CODE"
                  />
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
