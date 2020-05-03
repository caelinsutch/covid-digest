// import React from 'react';
// import './signupcard.scss'
// import {Button, Form, Input, notification} from "antd";
// import firebase from "../../firebase";
//
// class SignupCard extends React.Component {
//
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             submitted: false,
//             userDataSubmitted: false,
//             phoneVerified: false,
//             user: {
//                 phoneNumber: null,
//                 name: null,
//             }
//         }
//
//         this.onSubmitUserData = this.onSubmitUserData.bind(this);
//         this.onSubmitVerificationCode = this.onSubmitVerificationCode.bind(this);
//         this.userForm = this.userForm.bind(this);
//         this.phoneVerification = this.phoneVerification.bind(this);
//     }
//
//     componentDidMount() {
//         this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
//             'size': 'small'
//         });
//     }
//
//     onSubmitUserData(values: any) {
//         const appVerifier = window.recaptchaVerifier;
//         const that = this;
//         firebase.auth().signInWithPhoneNumber(values.phoneNumber, appVerifier)
//             .then( (confirmationResult) => {
//                 window.confirmationResult = confirmationResult;
//                 that.setState({
//                     userDataSubmitted: true,
//                     user: {
//                         phoneNumber: values.phoneNumber,
//                         name: values.name,
//                     }
//                 })
//                 return;
//             }).catch(function (error) {
//             message.error({
//                 message: "Error!",
//                 description: error
//             })
//         });
//     };
//
//     onSubmitVerificationCode(values: any) {
//         const that = this;
//         window.confirmationResult.confirm(values.code).then((result) => {
//             const user = result.user;
//             firebase.firestore().collection('users').doc(user.uid).set({
//                 name: that.state.user.name,
//                 phoneNumber: that.state.user.phoneNumber
//             }).then(r => {
//                 that.setState({
//                     phoneVerified: true
//                 })
//                 notification.success({
//                     message: "You've been added to our list!",
//                     description: "You'll be recieiving updates now!"
//                 })
//             });
//         }).catch((error: any) => {
//             notification.error({
//                 message: "Error submitting code!",
//                 description: error
//             })
//         })
//     }
//
//     userForm() {
//         return (
//             <div className='form-wrapper center'>
//                 <h2 className="center bold">Get Your Updates</h2>
//                 <Form
//                     name="basic"
//                     layout='vertical'
//                     initialValues={{ remember: true }}
//                     onFinish={this.onSubmitUserData}
//                 >
//                     <Form.Item
//                         name="name"
//                         label='Full Name'
//                         className="input"
//                         rules={
//                             [{ required: true, message: 'Please input your name!' }]
//                         }
//                     >
//                         <Input placeholder='Full Name'/>
//                     </Form.Item>
//                     <Form.Item
//                         name="phoneNumber"
//                         label='11 Digit Phone Number - ex. +19101231232'
//                         rules={
//                             [
//                                 { required: true, message: 'Please input your phone!' },
//                                 { validator:(_, value) => (/^\+\d?[1-9]\d{1,14}$/.test(value) && value.length >= 11 )? Promise.resolve() : Promise.reject(' Must be this format! +19101231232') },
//
//                             ]
//                         }
//                     >
//                         <Input placeholder='Phone Number'/>
//                     </Form.Item>
//                     <div id="recaptcha" />
//                     <Form.Item className="mb0">
//                         <Button type="primary" htmlType="submit" className="button" id='sign-in-button'>
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         )
//     }
//
//     phoneVerification() {
//         return (
//             <div className='form-wrapper center'>
//                 <h2 className="center bold">Get Your Updates</h2>
//                 <Form
//                     name="basic"
//                     layout='vertical'
//                     initialValues={{ remember: true }}
//                     onFinish={this.onSubmitVerificationCode}
//                 >
//                     <Form.Item
//                         name="code"
//                         label='The Number that was Texted to You'
//                         rules={
//                             [
//                                 { required: true, message: 'Please input the code!' },
//                             ]
//                         }
//                     >
//                         <Input placeholder='123456'/>
//                     </Form.Item>
//                     <Form.Item className="mb0">
//                         <Button type="primary" htmlType="submit" className="button">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </div>
//         )
//     }
//
//     submitSuccess() {
//         return (
//             <div className="form-wrapper center">
//                 <h2 className="success">Success! You'll be hearing from us soon!</h2>
//             </div>
//         )
//     }
//
//     render() {
//         return (
//             <div className='card max-width-2 mx-auto p3'>
//                 {
//                     this.state.userDataSubmitted ?
//                         (
//                             this.state.phoneVerified ?
//                                 this.submitSuccess()
//                                 : this.phoneVerification()
//                         )
//                         : this.userForm()
//                 }
//
//             </div>
//         )
//     }
// }
//
// export default SignupCard;
