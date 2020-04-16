import React  from "react";
import { Layout } from 'antd';
import MenuHeader from "./MenuHeader"
import { DESTROY_DATA_SOURCE } from "../actions/types";
import { useDispatch } from "react-redux";


const { Content } = Layout;

function HomePage(){
    const dispatch = useDispatch();
    dispatch({type: DESTROY_DATA_SOURCE});

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <div className="site-layout-content">Home Page</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;