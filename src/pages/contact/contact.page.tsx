import React from 'react';
import styles from './contact.module.scss';
import { Button, Form } from 'react-bootstrap';
import * as emailjs from 'emailjs-com';
import classNames from 'classnames';

class ContactPage extends React.Component {

    state = {
        name: '',
        email: '',
        message: '',
        isSubmitting: false,
    };

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
    }

    handleSubmit(e: any) {
        e.preventDefault();
        const { name, email, message } = this.state;
        let templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'ajparker1401@gmail.com',
            message_html: message,
        };
        emailjs.send(
            'gmail',
            'template_aWbolr23',
            templateParams,
            'user_D9Uu5GaHTCG6F3ZEvSfty'
        );
        this.setState({
            isSubmitting: true,
        });
        this.resetForm()
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: '',
        })
        this.delay(2000).then(any=>{
            this.setState({
                isSubmitting: false,
            });
        });
    }

    handleChange = (param: any, e: any) => {
        this.setState({ [param]: e.target.value })
    };

    render() {
        return (
            <>
                <div className={styles.headerBackground}>
                    <h1 className={classNames(styles.headerText, "text-center")}>Contact Us</h1>
                </div>
                <div className="container mt-5">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={this.state.email} onChange={this.handleChange.bind(this, 'email')} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={this.state.name} onChange={this.handleChange.bind(this, 'name')} placeholder="Name" />
                        </Form.Group>

                        <Form.Group controlId="formName">
                            <Form.Label>Message</Form.Label>
                            <Form.Control value={this.state.message} onChange={this.handleChange.bind(this, 'message')} as="textarea" rows={3} placeholder="Message" />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            {this.state.isSubmitting ? `Submitting...` : `Submit`}
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default ContactPage;
