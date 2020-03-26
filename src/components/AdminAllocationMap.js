import React  from "react";
import { Layout } from 'antd';
import MenuHeader from "./MenuHeader"
import Iframe from 'react-iframe'

const { Content, Footer } = Layout;


function HomePage(){
    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <Iframe
                        url="http://localhost:8080/map_demo.html"
                        width="1920px"
                        height="1080px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Capstone Allocation ©2020 Created by MadDev</Footer>
            </Layout>
        </Layout>
    );
}

export default HomePage;