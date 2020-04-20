import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Form, Input, Typography, Button, Divider, Alert, Modal} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LinkContainer } from 'react-router-bootstrap';
import sutdLogo from '../images/sutdLogo.png';
import bgImage from '../images/backgroundImage.jpg';

import { signupUser } from "../actions/authActions";
import { CLEAR_AUTH_ERROR } from "../actions/types";

const { Title } = Typography;

function SignupPage(){
    let history = useHistory();
    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [clicked, setClicked] = useState();
    const [invalidSignup, setInvalidSignup] = useState();
    const [validSignup, setValidSignup] = useState();
    const [runEffect, setRunEffect ] = useState();
    

    let signupError = useSelector(state => state.auth.signupError);
    let signupSuccess = useSelector(state => state.auth.signupSuccess);
    const dispatch = useDispatch();

    useEffect(() => {
        if(runEffect){
            if(signupError){
                setInvalidSignup(true);
                setClicked(false);
                setRunEffect(false);
            } else if(signupSuccess){
                setValidSignup(true);
                setRunEffect(false);
                setTimeout(() => history.push('/home'), 4000);
            }
        }
    })


    const handleOnChange = (e) => {
        setInvalidSignup(false);
        const {name, value} = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "fullName"){
            setFullName(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSignup = (values) => {
        if (fullName && email && password && confirmPassword){
            setInvalidSignup(false);
            setClicked(true);
            setRunEffect(true);
            dispatch({type: CLEAR_AUTH_ERROR});
            signupUser( email, password, fullName, dispatch);
        }
    };

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.which === 13) {
            if (!clicked){
                handleSignup();
            }
        }
    }

    const handleModal = () => {
        const modal = Modal.success({
            title: "Signup success!",
            content: "Redirecting you to our home page shortly...",
            centered: true,
            closable: false,
            icon: null
        });
        setTimeout(() => {modal.destroy();}, 4000);
    }

    return(
        /*Wrap everything inside a div with background image*/
        <div className="d-flex flex-column align-items-center vh-100" style={{backgroundImage: `url(${bgImage})`, backgroundSize: "cover", overflow: 'auto'}}>
            
            {/*Upper part (contains SUTD logo)*/}
            <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-2 mt-5">
                <img
                    src={sutdLogo}
                    className="logo-container img-fluid mb-2 mt-4 pt-4"
                    alt=""
                />
            </div>


            {/*Lower part (card design, login interface)*/}
            <div className="d-flex flex-column align-items-center">
                <div className="content-container card mt-5 mb-5 p-5" style={{zIndex: '1'}}>
                    <Form
                        name='normal_signup'
                        className='signup-form'
                        initialValues={{remember: true}}
                        onFinish={handleSignup}
                    >
                        <div>
                            <div className="d-flex justify-content-center mt-3 mb-2 ml-5 mr-5">
                                <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>SIGNUP</Title>
                            </div>

                            <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                            {
                                invalidSignup ?
                                    <Alert
                                        className="mb-3"
                                        message = "Signup Failed"
                                        description = "User already exists"
                                        type = "error"
                                    />
                                    :
                                    null

                            }

                            {
                                validSignup ?
                                    handleModal()
                                    :
                                    null

                            }   


                            <div className="mt-3">
                                <Form.Item
                                    name = "fullName"
                                    rules ={
                                        [
                                        {required: true, message: "Please input your full name"},
                                        {max: 255, message: "Input exceeded maximum allowable length"}
                                        ]
                                    }
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        onChange={(e) => handleOnChange(e)}
                                        onKeyUp={(e) => handleKeyUp(e)}
                                        placeholder="Full Name"
                                        name='fullName'
                                        type = 'fullName'
                                        size='large'
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name = "email"
                                rules ={
                                    [
                                    {required: true, message: "Please input your email address"},
                                    {type: 'email', message: "Please enter a valid email address"},
                                    {max: 255, message: "Input exceeded maximum allowable length"}
                                    ]
                                }
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    onChange={(e) => handleOnChange(e)}
                                    onKeyUp={(e) => handleKeyUp(e)}
                                    placeholder="Email Address"
                                    name='email'
                                    size='large'
                                />
                            </Form.Item>
                        </div>

                        

                        <div className="mt-3">
                            <Form.Item
                                name = "password"
                                rules ={
                                    [
                                    {required: true, message: "Please input your password"}
                                    ]
                                }
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    onChange={(e) => handleOnChange(e)}
                                    onKeyUp={(e) => handleKeyUp(e)}
                                    placeholder="Password"
                                    name='password'
                                    type='password'
                                    size='large'
                                />
                            </Form.Item>
                        </div>

                        <div className="mt-3">
                            <Form.Item
                                name = "confirmPassword"
                                dependencies = {['password']}
                                hasFeedback
                                rules ={
                                    [
                                    {required: true, message: "Please input your password"},
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                          if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                          }
                            
                                          return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                      }),
                                    ]
                                }
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    onChange={(e) => handleOnChange(e)}
                                    onKeyUp={(e) => handleKeyUp(e)}
                                    placeholder="Confirm Password"
                                    name='confirmPassword'
                                    type='password'
                                    size='large'
                                />
                            </Form.Item>
                        </div>


                        <Form.Item>
                            <div className="d-flex justify-content-center">
                                {                           
                                    !clicked ? 
                                        <Button
                                            htmlType="submit"
                                            className="signup-form-button"
                                            shape="round"
                                            size="large"
                                            onClick={() => handleSignup()}
                                            style={fullName && email && password && confirmPassword ? {
                                                width: "50%", 
                                                height: "50px",
                                                borderColor: "#2552c2",
                                                backgroundColor: "#2552c2"
                                            } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                            type={fullName && email && password && confirmPassword ? 'primary' : 'ghost'}
                                        >
                                            SIGNUP
                                        </Button>
                                        :
                                        <Button
                                            htmlType="submit"
                                            className="signup-form-button"
                                            shape="round"
                                            size="large"
                                            type='primary'
                                            style={{width: "50%", backgroundColor: '#4673e3', borderColor: '#4673e3', height: '50px', color: "white"}}
                                            disabled
                                        >
                                        SIGNING UP
                                        </Button>
                                }
                            </div>
                        </Form.Item> 

                        <div className="mt-1 mb-2 d-flex justify-content-center">
                            {
                                !clicked ?
                                <LinkContainer to="/home" className="pointer">
                                    <div><h6 style={{cursor: "context-menu"}}><a href="/signup">Back to home</a></h6></div>
                                </LinkContainer> :
                                    <div><h6 className="pointer" style={{color: "gray"}}>Home</h6></div>
                            }

                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;