import React  from "react";
import { Layout } from 'antd';
import MenuHeader from "./MenuHeader"
import {ROOT_URL} from "../utils";
import AuthIFrame from "react-auth-iframe";

const { Content } = Layout;


function HomePage(){
    const token = localStorage.getItem("token");

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <AuthIFrame
                        src={ROOT_URL + "/maps/page"}
                        token={token}
                        width="100%"
                        height="100%"
                        display="initial"
                        position="relative"
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;