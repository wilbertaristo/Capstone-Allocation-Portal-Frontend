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
                    <div>Student Allocation Map</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Capstone Allocation ©2020 Created by MadDev</Footer>
            </Layout>
        </Layout>
    );
}

export default HomePage;