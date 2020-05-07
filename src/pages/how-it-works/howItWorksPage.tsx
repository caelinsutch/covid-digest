import React from 'react';
import styles from './sources.module.scss';
import classNames from 'classnames';
import { db } from '../../firebase';
import { Card, Col, Row, Statistic } from 'antd';
import Skeleton from 'antd/lib/skeleton';

interface Source {
  title: any;
  datePublished: string;
  generatedSummary: string;
  inlineSummary: string;
  link: string;
  sent: boolean;
}

interface State {
  sources: Source[] | null;
}

class HowItWorksPage extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      sources: null,
    };
  }

  async componentDidMount(): Promise<void> {
    const ref = db.collection('news-stories');
    try {
      ref.onSnapshot((snapshot) => {
        const sources: any[] = [];
        snapshot.docs.forEach((doc) => {
          sources.push(doc.data());
        });
        this.setState({
          sources: sources,
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  SourceCard(source: Source): JSX.Element {
    const { title, inlineSummary, generatedSummary, link } = source;
    return (
      <div className="col-sm-12 col-md-12 col-lg-6 p-3">
        <Card
          className={styles.card}
          title={title}
          extra={<a href={link}>See Original</a>}
        >
          {inlineSummary !== '' ? (
            <div>
              <p className="font-weight-bold">Inline Summary</p>
              <p>{inlineSummary}</p>
            </div>
          ) : (
            <div>
              <p className="font-weight-bold">Generated Summary</p>
              <p>{generatedSummary}</p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  loadingCard(): JSX.Element {
    return (
      <div className="col-sm-12 col-md-12 col-lg-6 p-3">
        <Card className={styles.card}>
          <Skeleton />
        </Card>
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <>
        <div className={styles.headerBackground}>
          <h1 className={classNames(styles.headerText, 'text-center')}>
            Where we Get our Information
          </h1>
        </div>
        <section className={styles.sourcesWrapper}>
          <section>
            <div className="container">
              <h3>Overview</h3>
              <p>
                We scrape all of our information from{' '}
                <a href="https://www.bbc.com/news/coronavirus">
                  BBC Covid Coverage
                </a>{' '}
                using a web scraper. Each article is passed through a Frequency
                based summarization algorithm from{' '}
                <a href="https://www.npmjs.com/package/node-summarizer#desc">
                  node-summarizer
                </a>{' '}
                described as described as This type of summary works best for
                text that is not too complicated.Split the given text into
                sentences. Preprocess the sentences by removing all punctuation
                and making all letters lowercase. Make a list of all the words
                that occur in the text and find the frequency of the words. Take
                the calculated frequencies of the words and calculate the total
                weight of the original sentences. and then stored in a database.
                Every day, we sent out a summarized article using the Twilio API
                to all the users who have signed up.
              </p>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Total Cached Stories"
                    value={this.state.sources?.length}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Stories with Built In Summaries"
                    value={
                      this.state.sources?.filter(
                        (story) => story.inlineSummary !== ''
                      ).length
                    }
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Stories with Generated Summaries"
                    value={
                      this.state.sources?.filter(
                        (story) => story.generatedSummary !== ''
                      ).length
                    }
                  />
                </Col>
              </Row>
            </div>
          </section>
          <section className="sources">
            <div className="container">
              {this.state.sources ? (
                <div className="row">
                  {this.state?.sources.map((props, idx) => (
                    <this.SourceCard key={idx} {...props} />
                  ))}
                </div>
              ) : (
                <div className="row">
                  <this.loadingCard key={1} />
                  <this.loadingCard key={2} />
                  <this.loadingCard key={3} />
                  <this.loadingCard key={4} />
                </div>
              )}
            </div>
          </section>
        </section>
      </>
    );
  }
}

export default HowItWorksPage;
