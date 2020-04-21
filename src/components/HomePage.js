import React  from "react";
import ReactDOM from 'react-dom'
import { Layout, Card, Col, Row, Descriptions, Carousel } from 'antd';
import MenuHeader from "./MenuHeader"
import { DESTROY_DATA_SOURCE } from "../actions/types";
import { useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import img1 from '../images/IMG_2350.JPG';
import img2 from '../images/IMG_2351.JPG';
import img3 from '../images/IMG_2352.JPG';
import img4 from '../images/IMG_2353.JPG';



const { Content } = Layout;

function HomePage(){
    const dispatch = useDispatch();
    dispatch({type: DESTROY_DATA_SOURCE});
    const admin = localStorage.getItem("admin");

    const renderCards = () => {
        if (admin === "true"){
            return <div className="site-card-wrapper">
            <Row gutter={16}>
            <Col span={8}>
                    <LinkContainer to="/manage-requirements/admin" className="pointer">
                        <Card title="Manage Requirements" bordered={false} hoverable={true}>
                        Search, filter, and edit capstone showcase space requirements of each group.
                        </Card>
                    </LinkContainer>                
            </Col>
            <Col span={8}>
                <LinkContainer to="/allocation-map/admin" className="pointer">
                    <Card title="Allocation Map" bordered={false} hoverable={true}>
                    Run allocation alogorithm and assign capstone showcase space to groups.
                    </Card>
                </LinkContainer>                
            </Col>
            <Col span={8}>
                <LinkContainer to="/user-settings" className="pointer">
                    <Card title="User Settings" bordered={false} hoverable={true}>
                    Change your password to keep your account safe.
                    </Card>
                </LinkContainer>  
            </Col>
            <Col span={8} className="mt-3">
                <LinkContainer to="/signup" className="pointer">
                    <Card title="Signup" bordered={false} hoverable={true}>
                    Create an account for a capstone group.
                    </Card>
                </LinkContainer>  
            </Col>
            </Row>
            </div>
        } else {
            return <div className="site-card-wrapper">
            <Row gutter={16}>
            <Col span={8}>
                    <LinkContainer to="/manage-requirements/student" className="pointer">
                        <Card title="Manage Requirements" bordered={false} hoverable={true}>
                        Upload / Update the space requirements for your group's capstone showcase by 20 July 2020.
                        </Card>
                    </LinkContainer>           
            </Col>
            <Col span={8}>
                <LinkContainer to="/allocation-map/student" className="pointer">
                    <Card title="Allocation Map" bordered={false} hoverable={true}>
                    Check your allocated space for your group's capstone showcase.
                    </Card>
                </LinkContainer>                
            </Col>
            <Col span={8}>
                <LinkContainer to="/user-settings" className="pointer">
                    <Card title="User Settings" bordered={false} hoverable={true}>
                    Change your password to keep your account safe.
                    </Card>
                </LinkContainer>  
            </Col>
            </Row>
            </div>
        }
    }


    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                <div className=""> 
                <Descriptions title="Capstone Showcase" className="mt-5 ml-5">
                    <Descriptions.Item label="Date">04 August, 2020</Descriptions.Item>
                    <Descriptions.Item label="Time">10.00am - 5.00pm</Descriptions.Item>
                    <Descriptions.Item label="Location">SUTD, Campus Center Levels 1 and 2</Descriptions.Item>
                    <Descriptions.Item >All groups to set up their booth by 03 August 2020.</Descriptions.Item>
                </Descriptions>                                    
                    {renderCards()}
                 </div>   
                 <div>
                 <Carousel autoplay>
                    <div>
                    <img
                    src={img2}
                    className="img-fluid"
                    alt=""
                    />
                    </div>
                    <div>
                    <img
                    src={img1}
                    className="img-fluid"
                    alt=""
                    />
                    </div>
                    <div>
                    <img
                    src={img3}
                    className="img-fluid"
                    alt=""
                    />
                    </div>
                    <div>
                    <img
                    src={img4}
                    className="img-fluid"
                    alt=""
                    />
                    </div>
                </Carousel>
                 </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;