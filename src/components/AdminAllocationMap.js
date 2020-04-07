import React, { useState } from "react";
import { Layout, Button, Typography } from 'antd';
import MenuHeader from "./MenuHeader"
import { ROOT_URL } from "../utils";
import AuthIFrame from "react-auth-iframe";
import { runAllocation } from '../actions/requirementsActions'


const { Content  } = Layout;
const { Title } = Typography


function HomePage(){
    const token = localStorage.getItem("token");
    const [index, setIndex] = useState(0);

    const handleAllocation = () => {
        runAllocation();
        setIndex(index +1);
    }

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <AuthIFrame
                        src={ROOT_URL + "/maps/page"}
                        key={index}
                        token={token}
                        width="100%"
                        height="93.5%"
                        display="initial"
                        position="relative"
                    />
                    <div className="d-flex flex-row justify-content-between">
                        <div className='invisible-box'/>
                        <Button
                            htmlType="submit"
                            className="login-form-button mt-1"
                            shape="round"
                            size="large"
                            onClick={() => handleAllocation()}
                            type = "primary"
                        >
                            SEND EMAIL
                        </Button>
                        <Button
                            htmlType="submit"
                            className="login-form-button mt-1"
                            shape="round"
                            size="large"
                            onClick={() => handleAllocation()}
                            type = "primary"
                        >
                            RUN ALLOCATION
                        </Button>
                        <div className='invisible-box'/>
                    </div>
                    {/*<h6 className="d-flex justify-content-end mr-3">Capstone Allocation ©2020 Created by MadDev</h6>*/}
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;