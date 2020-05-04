import React, { Component } from 'react';
import './home.page.scss';
import SignUpCard from '../../components/signupcard/sighup-card.component';
import { Button } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

const features = [
  {
    title: <>No More Clickbait Headlines</>,
    imageUrl: '/img/guy_on_mound.svg',
    description: (
      <>
        You only get the information that matters in this time of crisis, hard
        news about COVID, without the clickbait or politics. No more scrolling
        through news apps looking for information, it gets delivered to your
        inbox three times a week.
      </>
    ),
  },
  {
    title: <>Bite Size Segments</>,
    imageUrl: '/img/girl_with_notifications.svg',
    description: (
      <>
        We give you bite size pieces of news to prevent being mentally
        overwhelemed by the flow of information in todays news cycles. Our
        algorithm automatically summarizes the article’s key information, to
        make it easier for your eyes and your mind.
      </>
    ),
  },
  {
    title: <>Transparent Sources</>,
    imageUrl: '/img/computer.svg',
    description: (
      <>
        This whole project is open sourced, so you can see where the information
        is coming from and how it’s being sumarized.
      </>
    ),
  },
];

class Feature extends Component<{
  imageUrl: any;
  title: any;
  description: any;
}> {
  render(): JSX.Element {
    const { imageUrl, title, description } = this.props;
    return (
      <div className="col-sm-12 col-md-12 col-lg-4 feature pb-4">
        {imageUrl && (
          <div className="text-center">
            <img className="featureImage" src={imageUrl} alt={title} />
          </div>
        )}
        <h2 className="text--center featureTitle">{title}</h2>
        <p className="text--center featureText">{description}</p>
      </div>
    );
  }
}

function HomePage(): JSX.Element {
  return (
    <>
      <div className="headerBanner">
        <div className="container">
          <div className="row headerCenter">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <h1 className="headerText">
                COVID19 News Updates. <br />
                Delivered via SMS.
              </h1>
              <Button variant="outline-primary" className="signUpButton">
                  <Link to="/#signUp" className="signUpButtonHash">GET YOUR UPDATES</Link>
              </Button>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img className="iphone" src="/img/iphone.svg" alt="iPhone" />
            </div>
          </div>
        </div>
      </div>
      <div>
        {features && features.length && (
          <section className="features">
            <div className="container">
              <div className="row flex justify-center -align-center">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="signUpForm" id="signUp">
          <div className="container">
            <SignUpCard />
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
