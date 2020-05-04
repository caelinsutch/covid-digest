import React, { ReactNode } from 'react';
import './signup-card.component.scss';
import { Button, Form, Input, message, notification } from 'antd';
import firebase from '../../firebase';
import { FirebaseError } from 'firebase';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const window = require('global/window');

interface State {
  submitted: boolean;
  userDataSubmitted: boolean;
  phoneVerified: boolean;
  user: {
    phoneNumber: string | null;
    name: string | null;
  };
}

class SighupCardComponent extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitted: false,
      userDataSubmitted: false,
      phoneVerified: false,
      user: {
        phoneNumber: null,
        name: null,
      },
    };

    this.onSubmitUserData = this.onSubmitUserData.bind(this);
    this.onSubmitVerificationCode = this.onSubmitVerificationCode.bind(this);
    this.userForm = this.userForm.bind(this);
    this.phoneVerification = this.phoneVerification.bind(this);
  }

  componentDidMount(): void {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha',
      {
        size: 'small',
      }
    );
  }

  onSubmitUserData(values: any): void {
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(values.phoneNumber, appVerifier)
      .then((confirmationResult: any) => {
        window.confirmationResult = confirmationResult;
        this.setState({
          userDataSubmitted: true,
          user: {
            phoneNumber: values.phoneNumber,
            name: values.name,
          },
        });
        return;
      })
      .catch(function (error) {
        message.error({
          message: 'Error!',
          description: error,
        });
      });
  }

  onSubmitVerificationCode(values: any): void {
    window.confirmationResult
      .confirm(values.code)
      .then((result: any) => {
        const user = result.user;
        firebase
          .firestore()
          .collection('users')
          .doc(user?.uid)
          .set({
            name: this.state.user.name,
            phoneNumber: this.state.user.phoneNumber,
          })
          .then(() => {
            this.setState({
              phoneVerified: true,
            });
            notification.success({
              message: "You've been added to our list!",
              description: "You'll be receiving updates now!",
            });
          });
      })
      .catch((error: FirebaseError) => {
        notification.error({
          message: 'Error submitting code!',
          description: error,
        });
      });
  }

  userForm(): JSX.Element {
    return (
      <div className="p-4">
        <h2 className="text-center font-weight-bold mx-auto">
          Get Your Updates
        </h2>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={this.onSubmitUserData}
        >
          <Form.Item
            name="name"
            label="Full Name"
            className="input"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="11 Digit Phone Number - ex. +19101231232"
            rules={[
              { required: true, message: 'Please input your phone!' },
              {
                validator: (_, value): Promise<any> =>
                  /^\+\d?[1-9]\d{1,14}$/.test(value) && value.length >= 11
                    ? Promise.resolve()
                    : Promise.reject(' Must be this format! +19101231232'),
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <div id="recaptcha" />
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="button"
              id="sign-in-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  phoneVerification(): JSX.Element {
    return (
      <div className="p-4">
        <h2 className="text-center font-weight-bold mx-auto">
          Get Your Updates
        </h2>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={this.onSubmitVerificationCode}
        >
          <Form.Item
            id="code"
            name="code"
            label="The Number that was Texted to You"
            rules={[{ required: true, message: 'Please input the code!' }]}
          >
            <Input placeholder="123456" />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  submitSuccess(): JSX.Element {
    return (
      <div className="form-wrapper center p-4">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h2 className="success">Success! You'll be hearing from us soon!</h2>
      </div>
    );
  }

  render(): ReactNode {
    return (
      <div className="card max-width-2 mx-auto p3">
        {this.state.userDataSubmitted
          ? this.state.phoneVerified
            ? this.submitSuccess()
            : this.phoneVerification()
          : this.userForm()}
      </div>
    );
  }
}

export default SighupCardComponent;
