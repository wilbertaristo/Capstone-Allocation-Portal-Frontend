import React, { useState } from "react";
import { Layout, Menu, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    CompassOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import sutdLogo from "../images/sutdLogoWhite.png";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function HomePage(){
    const [collapsed, setCollapsed] = useState();

    const handleToggle = () => {
        setCollapsed(!collapsed);
    };

    return(
        <Layout className = "vh-100">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="p-3">
                    <img
                        src={sutdLogo}
                        className="img-fluid"
                        alt=""
                    />
                </div>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <SubMenu
                        key="account"
                        title={
                            <div className="d-flex flex-row align-items-center">
                                <UserOutlined className="mr-2"/>
                                <span>Account</span>
                            </div>
                        }
                    >
                        <Menu.Item key="settings">Settings</Menu.Item>
                        <Menu.Item key="signout">Sign Out</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2">
                        <div className="d-flex flex-row align-items-center">
                            <UploadOutlined className="mr-2"/>
                            <span>Upload Requirements</span>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <div className="d-flex flex-row align-items-center">
                            <CompassOutlined className="mr-2"/>
                            <span>Allocation Map</span>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <Header className="d-flex pl-2 align-items-center" style={{ background: "#fff" }}>
                    <div className="d-flex flex-row align-items-center">
                        <div className="d-flex flex-row align-items-center">
                            {
                                collapsed?
                                    <MenuUnfoldOutlined
                                        className = 'menu-trigger'
                                        onClick = {() => handleToggle()}
                                    />
                                    :
                                    <MenuFoldOutlined
                                        className = 'menu-trigger'
                                        onClick = {() => handleToggle()}
                                    />
                            }
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <Text className="pl-2" type="secondary">Menu</Text>
                        </div>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;

// .menu-logo {
//     height: 32px;
//     background: rgba(255,255,255,0.3);
//     margin: 16px;
// }
//
// .menu-trigger {
//     padding: 0 0 0 24px;
//     cursor: pointer;
//     transition: color 0.3s;
// }
//
// .menu-trigger:hover {
//     color: #1890ff;
// }