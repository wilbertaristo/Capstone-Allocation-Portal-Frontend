import React from "react";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    CompassOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { isMobile } from "react-device-detect";
import sutdLogo from "../images/sutdLogoWhite.png";
import {LinkContainer} from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signoutUser } from "../actions/authActions";


const { Header } = Layout;
const { SubMenu } = Menu;

function MenuHeader(){
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        signoutUser(history, dispatch);
    }

    return(
        <div>
            {
                isMobile ?
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        className="d-flex justify-content-end"
                    >
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
                    :
                    <Header className="d-flex align-items-center">
                        <LinkContainer to="/home" className="pointer">
                            <img
                                src={sutdLogo}
                                className="menu-logo p-1"
                            />
                        </LinkContainer>
                        <div style={{width: "90vw"}}/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            className="d-flex justify-content-end"
                        >
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
                                <Menu.Item
                                    key="signout"
                                    onClick={() => handleLogout()}
                                >
                                    Sign Out
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Header>
            }
        </div>
    )
}

export default MenuHeader;