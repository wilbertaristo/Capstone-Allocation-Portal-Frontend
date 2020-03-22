import React from "react";
import { Layout, Menu, Typography } from 'antd';
import {
    UserOutlined,
    CompassOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import sutdLogo from "../images/sutdLogoWhite.png";
import {LinkContainer} from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {signoutUser} from "../actions/authActions";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

function MobileSider(){
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        signoutUser(history, dispatch);
    }

    return(
        <Layout className = "vh-100">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="p-3">
                    <img
                        src={sutdLogo}
                        className="img-fluid"
                        alt=""
                    />
                </div>

                <Menu theme="dark" mode="inline">
                    <Menu.Item key="req">
                        <LinkContainer to="/upload-requirements" className="pointer">
                            <div className="d-flex flex-row align-items-center">
                                <UploadOutlined className="mr-2"/>
                                Upload Requirements
                            </div>
                        </LinkContainer>
                    </Menu.Item>
                    <Menu.Item key="map">
                        <LinkContainer to="/allocation-map" className="pointer">
                            <div className="d-flex flex-row align-items-center">
                                <CompassOutlined className="mr-2"/>
                                Allocation Map
                            </div>
                        </LinkContainer>
                    </Menu.Item>
                    <SubMenu
                        key="account"
                        title={
                            <div className="d-flex flex-row align-items-center">
                                <UserOutlined className="mr-2"/>
                                Account
                            </div>
                        }
                    >
                        <Menu.Item key="settings">
                            <LinkContainer to="/user-settings" className="pointer">
                                <div>
                                    Settings
                                </div>
                            </LinkContainer>
                        </Menu.Item>
                        <Menu.Item key="signout" onClick={() => handleLogout()}>Sign Out</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </Layout>
    );
}

export default MobileSider;

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