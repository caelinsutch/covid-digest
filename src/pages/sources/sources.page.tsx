import React from 'react';
import styles from './sources.module.scss';
import classNames from 'classnames';
import { db } from '../../firebase';

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

class SourcesPage extends React.Component<{}, State> {
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

  SourceElement(source: Source): JSX.Element {
    const { title, inlineSummary, generatedSummary, link } = source;
    return (
      <div className="col-sm-12 col-md-12 col-lg-6">
        <div className="mr-2 ml-2">
          <h2 className="text-center">{title}</h2>
          <h3>Inline Summary</h3>
          <p className="text-center">{inlineSummary}</p>
          <h3>Generated Summary</h3>
          <p className="text-center">{generatedSummary}</p>
          <p>
            Link to source: <a href={link}>{link}</a>
          </p>
        </div>
      </div>
    );
  }

  SourcesList(): JSX.Element {
    if (this.state.sources) {
      return (
        <section className="sources">
          <div className="container">
            <div className="row">
              {this.state.sources.map((props, idx) => (
                <this.SourceElement key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }

  render(): JSX.Element {
    return (
      <>
        <div className={styles.headerBackground}>
          <h1 className={classNames(styles.headerText, 'text-center')}>
            Archived Sources
          </h1>
        </div>
        <section className={styles.sourcesWrapper}>
          {this.state?.sources ? this.SourcesList() : <h3>Loading</h3>}
        </section>
      </>
    );
  }
}

export default SourcesPage;
