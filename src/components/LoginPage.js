import React, { useState } from "react";
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import {Form, Input, Typography, Button, Divider, Alert} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LinkContainer, Redirect } from 'react-router-bootstrap';
import sutdLogo from '../images/sutdLogo.png';
import bgImage from '../images/backgroundImage.jpg';

import signinUser from "../utils/authUtils";

const { Title } = Typography;

function LoginPage(){
    let history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [clicked, setClicked] = useState();
    const [invalidLogin, setInvalidLogin] = useState();

    const handleOnChange = (e) => {
        setInvalidLogin(false);
        const {name, value} = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleLogin = (values) => {
        setInvalidLogin(false);
        setClicked(true);
        console.log(email, password);
        console.log("Received values of form: ", values);
        if (email !== 'valid@email.com' || password !== "testing123"){
            setTimeout(() => setInvalidLogin(true), 4000);
            setClicked(false);
        } else {
            setTimeout(() => signinUser(email, password, history), 4000);
        }
    };

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
                        name='normal_login'
                        className='login-form'
                        initialValues={{remember: true}} 
                        onFinish={handleLogin}
                    >
                        <div>
                            <div className="d-flex justify-content-center mt-3 mb-2 ml-5 mr-5">
                                <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>LOGIN</Title>
                            </div>

                            <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                            {
                                invalidLogin ?
                                    <Alert
                                        className="mb-3"
                                        message = "Login Failed"
                                        description = "Incorrect email or password!"
                                        type = "error"
                                    />
                                    :
                                    <div></div>

                            }

                            <Form.Item
                                name = "email"
                                rules ={
                                    [
                                    {required: true, message: "Please input your email address"},
                                    {type: 'email', message: "Please enter a valid email address"}
                                    ]
                                }
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    onChange={(e) => handleOnChange(e)}
                                    onPressEnter={(() => handleLogin())}
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
                                    onPressEnter={(() => handleLogin())}
                                    placeholder="Password"
                                    name='password'
                                    type='password'
                                    size='large'
                                />
                            </Form.Item>
                        </div>

                        <div className="mt-1 mb-4 d-flex justify-content-end">
                            {
                                !clicked ?
                                <LinkContainer to="/reset-password" className="pointer">
                                    <div><h6 style={{color: "gray"}}>Forgot password?</h6></div>
                                </LinkContainer> :
                                    <div><h6 className="pointer" style={{color: "gray"}}>Forgot password?</h6></div>
                            }

                        </div>

                        <Form.Item>
                            <div className="d-flex justify-content-center">
                                {                           
                                    !clicked ? 
                                        <Button
                                            htmlType="submit"
                                            className="login-form-button"
                                            shape="round"
                                            size="large"
                                            style={email && password ? {
                                                width: "50%", 
                                                height: "50px",
                                                borderColor: "#2552c2",
                                                backgroundColor: "#2552c2"
                                            } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                            type={email && password ? 'primary' : 'ghost'}
                                        >
                                            LOGIN
                                        </Button>
                                        :
                                        <Button
                                            htmlType="submit"
                                            className="login-form-button"
                                            shape="round"
                                            size="large"
                                            type='primary'
                                            style={{width: "50%", backgroundColor: '#4673e3', borderColor: '#4673e3', height: '50px', color: "white"}}
                                            disabled
                                        >
                                        LOGGING IN
                                        </Button>
                                }
                            </div>
                        </Form.Item>                    
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;