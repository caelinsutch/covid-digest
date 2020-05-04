import React, {Component} from 'react';
import './about.scss';

const people = [
    {
        title: <>Caelin Sutch</>,
        imageUrl: '/img/caelin.png',
        description: (
            <>
                Caelin Sutch is a software developer and creative director out of Sacramento, California. He can be found on his
                <a href="https://caelinsutch.com">website</a> or on <a href="https://www.linkedin.com/in/caelin-sutch-602b6b135/">Linkedin</a>
            </>
        ),
    },
    {
        title: <>Alden Parker</>,
        imageUrl: '/img/alden.png',
        description: (
            <>
                Description...
            </>
        ),
    },
];

class Person extends Component<{ imageUrl: any, title: any, description: any }> {
    render() {
        let {imageUrl, title, description} = this.props;
        return (
            <div className="person">
                {imageUrl && (
                    <div className="text--center mb-2">
                        <img className="personImage" src={process.env.PUBLIC_URL + imageUrl} alt={title}/>
                    </div>
                )}
                <h2 className="text-center personName">{title}</h2>
                <p className="text-center personDescription">{description}</p>
            </div>
        );
    }
}

function About() {
    return (
        <>
            <div className="headerBanner">
                <div className="container">
                    <div className="headerCenter">
                        <h1 className="headerTitle">About</h1>
                    </div>
                </div>
            </div>
            {people && people.length && (
                <section className="aboutWrapper">
                    <div className="container">
                        <div className="center text-center mb-3">
                            <h1 className="mx-auto sectionTitle">About Us</h1>
                            <p className="aboutSummary">
                                We built this project to make a difference. We've seen how COVID can impact news cycles and create rising levels of hysteria, anxiety and stress.
                                One of the downsides of today's always-on news cycle is the lack of time for your brain to relax, free from the stress of the world around.
                                We created this project so you can free yourself from the chains of endless news, and get the essential information and updates you need on COVID19,
                                while keeping your mind strain free.
                            </p>
                        </div>
                        <div className="people">
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

export default About;
