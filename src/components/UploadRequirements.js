import React  from "react";
import { Layout } from 'antd';
import MenuHeader from "./MenuHeader"

const { Content, Footer } = Layout;

function HomePage(){
    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <div className="site-layout-content">Upload Requirements Page</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Capstone Allocation ©2020 Created by MadDev</Footer>
            </Layout>
        </Layout>
    );
}

export default HomePage;