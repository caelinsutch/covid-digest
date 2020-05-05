import React, { Component } from 'react';
import styles from './about.module.scss';
import classNames from 'classnames';

const people = [
  {
    title: <>Caelin Sutch</>,
    imageUrl: '/img/caelin.png',
    description: (
      <>
        Caelin Sutch is a software developer and creative director out of
        Sacramento, California. He can be found on his{' '}
        <a href="https://caelinsutch.com">website</a> or on{' '}
        <a href="https://www.linkedin.com/in/caelin-sutch-602b6b135/">
          Linkedin
        </a>
        .
      </>
    ),
  },
  {
    title: <>Alden Parker</>,
    imageUrl: '/img/alden.png',
    description: <>Description...</>,
  },
];

class Person extends Component<{
  imageUrl: any;
  title: any;
  description: any;
}> {
  render(): JSX.Element {
    const { imageUrl, title, description } = this.props;
    return (
      <div className={classNames(styles.person, "col-12 col-md-6 col-lg-6 px-4")}>
        {imageUrl && (
          <div className="text-center mb-2">
            <img
              className={classNames("img-fluid", styles.center, styles.personImg)}
              src={imageUrl}
              alt={title}
            />
          </div>
        )}
        <h2 className={classNames("text-center", styles.personName)}>{title}</h2>
        <p className={classNames("text-center", styles.personDescription)}>{description}</p>
      </div>
    );
  }
}

function AboutPage(): JSX.Element {
  return (
    <>
      <div className={styles.headerBackground}>
        <div className="container">
          <h1 className={classNames("text-center", styles.headerText)}>About Us</h1>
        </div>
      </div>
      <section>
        <div className="container">
          <p className="text-center mt-5 pr-3 pl-3">
            We built this project to make a difference. We've seen how COVID can
            impact news cycles and create rising levels of hysteria, anxiety and
            stress. One of the downsides of today's always-on news cycle is the
            lack of time for your brain to relax, free from the stress of the
            world around. We created this project so you can free yourself from
            the chains of endless news, and get the essential information and
            updates you need on COVID19, while keeping your mind strain free.
          </p>
        </div>
      </section>
      {people && people.length && (
        <section className={styles.aboutWrapper}>
          <div className="container">
            <div className={classNames("row", styles.people)}>
              {people.map((props, idx) => (
                <Person key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AboutPage;
