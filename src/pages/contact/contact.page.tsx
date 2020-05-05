import React from 'react';
import styles from './contact.module.scss';
import { Button, Form } from 'react-bootstrap';
import * as emailjs from 'emailjs-com';
import classNames from 'classnames';
import { notification } from 'antd';

interface State {
  name: string;
  email: string;
  message: string;
  isSubmitting: boolean;
  sent: boolean;
}

class ContactPage extends React.Component {
  state: State = {
    name: '',
    email: '',
    message: '',
    isSubmitting: false,
    sent: false,
  };

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }

  handleSubmit(e: any): void {
    e.preventDefault();
    const { name, email, message } = this.state;
    const templateParams = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      from_name: name,
      // eslint-disable-next-line @typescript-eslint/camelcase
      from_email: email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      to_name: 'ajparker1401@gmail.com',
      // eslint-disable-next-line @typescript-eslint/camelcase
      message_html: message,
    };
    emailjs.send(
      'gmail',
      'template_aWbolr23',
      templateParams,
      'user_D9Uu5GaHTCG6F3ZEvSfty'
    );
    this.setState({
      sent: true,
    });
    notification.success({
      message: "We've recieved your message!",
      description: 'Expect to hear back from us soon :)',
    });
    this.resetForm();
  }

  resetForm(): void {
    this.setState({
      name: '',
      email: '',
      message: '',
    });
    this.delay(2000).then(() => {
      this.setState({
        isSubmitting: false,
      });
    });
  }

  handleChange = (param: any, e: any): any => {
    this.setState({ [param]: e.target.value });
  };

  render(): JSX.Element {
    return (
      <>
        <div className={styles.headerBackground}>
          <h1 className={classNames(styles.headerText, 'text-center')}>
            Contact Us
          </h1>
        </div>
        <div className="container mt-5">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.handleChange.bind(this, 'email')}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={this.state.name}
                onChange={this.handleChange.bind(this, 'name')}
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Message</Form.Label>
              <Form.Control
                value={this.state.message}
                onChange={this.handleChange.bind(this, 'message')}
                as="textarea"
                rows={3}
                placeholder="Message"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {this.state.isSubmitting ? `Submitting...` : `Submit`}
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default ContactPage;
