import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Input, Typography, Button, Divider, Alert, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
    import sutdLogo from '../images/sutdLogo.png';
import bgImage from '../images/backgroundImage.jpg';

const { Title } = Typography;

function ResetPassword(){
    let history = useHistory();
    const [email, setEmail] = useState();
    const [clicked, setClicked] = useState();
    const [invalidEmail, setInvalidEmail] = useState();
    const [validEmail, setValidEmail] = useState();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "email"){
            setEmail(value);
            setInvalidEmail(false);
        }
    }

    const handleValidation = (email) => {
        if (email === 'nonexistent@email.com'){
            setInvalidEmail(true);
            setClicked(false);
        } else {
            setValidEmail(true);
            setTimeout(() => history.push('/login'), 4000);
        }
    }

    const handleReset = (values) => {
        setClicked(true);
        setInvalidEmail(false);
        setTimeout(() => handleValidation(email), 4000);
    };

    const handleModal = () => {
        const modal = Modal.success({
            title: "Reset Password Email Sent!",
            content: "Redirecting you to our login page shortly...",
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
                        name='reset-password-form'
                        className='login-form'
                        initialValues={{remember: true}}
                        onFinish={handleReset}
                    >
                        <div>
                            <div className="d-flex justify-content-center mt-3 mb-2 ml-5 mr-5">
                                <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>RESET PASSWORD</Title>
                            </div>
                            <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                            {
                                invalidEmail ?
                                    <Alert
                                        className="mt-3 mb-3"
                                        message = "Email Verification Failed"
                                        description = "No such email has been registered!"
                                        type = "error"
                                    />
                                    :
                                    null

                            }

                            {
                                validEmail ?
                                    handleModal()
                                    :
                                    null

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
                                    onPressEnter={(() => handleReset())}
                                    placeholder="Email Address"
                                    name='email'
                                    size='large'
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <div className="d-flex justify-content-center mt-3">
                                {
                                    !clicked ?
                                        <Button
                                            htmlType="submit"
                                            className="login-form-button"
                                            shape="round"
                                            size="large"
                                            style={email ? {
                                                width: "50%",
                                                height: "50px",
                                                borderColor: "#2552c2",
                                                backgroundColor: "#2552c2"
                                            } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                            type={email ? 'primary' : 'ghost'}
                                        >
                                            RESET
                                        </Button>
                                        :
                                        <Button
                                            loading
                                            htmlType="submit"
                                            className="login-form-button"
                                            shape="round"
                                            size="large"
                                            type='primary'
                                            style={{width: "50%", backgroundColor: '#4673e3', borderColor: '#4673e3', height: '50px', color: "white"}}
                                            disabled
                                        >
                                            VALIDATING
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

export default ResetPassword;