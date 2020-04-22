import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Form, Input, Typography, Button, Divider, Modal, Layout, Spin } from 'antd';
import {getUserDetails, updateUserDetails} from "../actions/authActions";
import MenuHeader from "./MenuHeader"

const { Content, Footer } = Layout;
const {Title} = Typography;

function HomePage(){

    let history = useHistory();
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const layout = {
        labelCol: {
          span: 100,
        },
        wrapperCol: {
          span: 400,
        },
      };
    const [formLayout] = useState('vertical');

    const [email, setEmail] = useState();
    const [fullName, setFullName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState(); 
    const [clicked, setClicked] = useState();
    const [invalidUpdateDetails, setInvalidUpdateDetails] = useState();
    const [validUpdateDetails, setValidUpdateDetails] = useState();
    const [runEffect, setRunEffect ] = useState();
    const [fetchedDetails, setFetchedDetails] = useState(false);
    const [stopSpin, setStopSpin] = useState(false);

    if (!fetchedDetails) {
        getUserDetails(dispatch);
        setFetchedDetails(true);
    }

    const userDetails = useSelector(state => state.auth.userDetails);
    let updateDetailsError = useSelector(state => state.auth.updateDetailsError);
    let updateDetailsSuccess = useSelector(state => state.auth.updateDetailsSuccess);

    useEffect(() => {

        if(runEffect){
            console.log("running")
            console.log(updateDetailsSuccess)
            
            if(updateDetailsError){
                setInvalidUpdateDetails(true);
                setClicked(false);
                setRunEffect(false);
            } else if (updateDetailsSuccess){
                console.log("IM HERE")
                setValidUpdateDetails(true);
                setRunEffect(false);
                setTimeout(() => history.push('/home'), 2800);
            }
        }


        if (userDetails) {
            let details = userDetails;
            setEmail(details.email);
            setFullName(details.full_name);
            form.setFieldsValue({
                fullName: userDetails.full_name
            });
            setStopSpin(true);
        }       
    }, [runEffect, updateDetailsError, updateDetailsSuccess, userDetails]) 

    const handleOnChange = (e) => {
        setInvalidUpdateDetails(false);
        const {name, value} = e.target;
        if (name === "fullName"){
            setFullName(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleUpdateDetails = (values) => {
        if (fullName && email && password && confirmPassword){
            setInvalidUpdateDetails(false);
            setClicked(true);
            setRunEffect(true);
            //dispatch({type: CLEAR_AUTH_ERROR});
            updateUserDetails( email, password, fullName, history, dispatch);
        }
    };

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.which === 13) {
            if (!clicked){
                handleUpdateDetails();
            }
        }
    }

    const handleModal = () => {
        const modal = Modal.success({
            title: "Update success!",
            content: "Redirecting you to our home page shortly...",
            centered: true,
            closable: false,
            footer: null,
            okButtonProps: {disabled: true},
            icon: null
        });
        setTimeout(() => {modal.destroy();}, 2800);
    };



    return(
        !stopSpin ?
            <div className="d-flex justify-content-center align-items-center mt-5 w-100 vh-100">
                <Spin size="large"/>
            </div>
            :
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content style={{backgroundColor:"#FFFFFF"}}>
                    <div className="d-flex site-layout-content flex-column container-fluid align-items-center justify-content-center">
                        <Form
                            {...layout}
                            layout = {formLayout}
                            form={form}
                            name='settings-form'
                            className="d-flex flex-column container-fluid"
                            initialValues={{remember: true}}
                            onFinish={handleUpdateDetails}
                        >
                        <div className="d-flex justify-content-center mt-3 mb-2 ">
                                <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>USER SETTINGS</Title>                               
                            </div>

                            <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                            {
                                        validUpdateDetails?
                                            handleModal()
                                            :
                                            <div></div>
                                    }

                        <div className="mt-3">
                                <Form.Item label="Email:">
                                    <span className="ant-form-text">{email}</span>
                                </Form.Item>

                                <Form.Item
                                    label = "Full Name:"
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
                                        className = "w-100"
                                        placeholder="Full Name"
                                        name='fullName'
                                        type = 'fullName'
                                        size='large'
                                    />
                                </Form.Item>
                            </div>                       

                            <div className="mt-3">
                            <Form.Item
                                label = "New Password:"
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
                                label = "Confirm New Password:"
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

                            <Form.Item>
                            <div className="d-flex justify-content-center mt-4">
                                {                           
                                    !clicked ? 
                                        <Button
                                            htmlType="submit"
                                            className="update-details-button"
                                            shape="round"
                                            size="large"
                                            onClick={() => handleUpdateDetails()}
                                            style={fullName && password && confirmPassword ? {
                                                width: "50%", 
                                                height: "50px",
                                                borderColor: "#2552c2",
                                                backgroundColor: "#2552c2"
                                            } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                            type={fullName && password && confirmPassword ? 'primary' : 'ghost'}
                                        >
                                            UPDATE DETAILS
                                        </Button>
                                        :
                                        <Button
                                            htmlType="submit"
                                            className="update-details-button"
                                            shape="round"
                                            size="large"
                                            type='primary'
                                            style={{width: "50%", backgroundColor: '#4673e3', borderColor: '#4673e3', height: '50px', color: "white"}}
                                            disabled
                                        >
                                        UPDATING DETAILS
                                        </Button>
                                }
                            </div>
                        </Form.Item> 
                        </div>
                    </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Capston Allocation Project ©2020 Created by Mad Dev C3G13</Footer>
            </Layout>
        </Layout>
    );
}

export default HomePage;