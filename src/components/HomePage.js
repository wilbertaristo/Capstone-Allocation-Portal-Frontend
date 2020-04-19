import React  from "react";
import ReactDOM from 'react-dom'
import { Layout, Carousel } from 'antd';
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
                <div className="d-flex site-layout-content flex-column container-fluid align-items-center justify-content-center">                                     
                    <Carousel autoplay>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                 </div>   
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;