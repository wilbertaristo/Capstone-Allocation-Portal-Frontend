import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {Layout, Button, Modal, Spin} from 'antd';
import MenuHeader from "./MenuHeader"
import { ROOT_URL } from "../utils";
import AuthIFrame from "react-auth-iframe";
import { runAllocation } from '../actions/requirementsActions'
import {CLEAR_SKIPPED_PROJECTS} from "../actions/types";

const { Content  } = Layout;

function HomePage(){
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [index, setIndex] = useState(0);
    const [openSkippedProjects, setOpenSkippedProject] = useState(false);

    const [stopSpin, setStopSpin] = useState(false);
    const [skip, setSkip] = useState(0);

    const skippedProjects = useSelector(state => state.upload.skippedProjects);
    const skippedProjectsCount = useSelector(state => state.upload.skippedProjectsCount);

    useEffect(() => {
        if (skippedProjects){
            setOpenSkippedProject(true);
        }
    }, [skippedProjects])

    const handleAllocation = () => {
        runAllocation(dispatch);
        setIndex(index +1);
        setStopSpin(false);
    }

    const handleCloseSkippedProjects = () => {
        setOpenSkippedProject(false);
        dispatch({type: CLEAR_SKIPPED_PROJECTS})
    }

    const handleOnLoad = () => {
        if (skip === 0){
            setSkip(1);
        } else if (skip === 1){
            setStopSpin(true);
            setSkip(0);
        }
    }

    const renderModalContent = () => {
        if (skippedProjects){
            return <div>
                <h6 className="mb-4">{`Unable to allocate ${skippedProjectsCount} projects. Please allocate them manually:`}</h6>
                {
                    skippedProjects.map(project => <ul><li>{project.name}</li></ul>)
                }
            </div>
        } else {
            return <div>
                <h6> Allocated all projects successfully! </h6>
            </div>
        }
    }

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                    <Modal
                        title="Run Allocation Complete!"
                        visible={openSkippedProjects}
                        onCancel={() => handleCloseSkippedProjects()}
                        footer={[
                            <Button key="submit" type="primary" onClick={() => handleCloseSkippedProjects()}>
                                OK
                            </Button>,
                        ]}
                    >
                        {renderModalContent()}
                    </Modal>
                    {
                        !stopSpin?
                            <div className= "d-flex justify-content-center align-items-center w-100 vh-100">
                                <Spin size="large"/>
                            </div>
                            :null
                    }
                    <AuthIFrame
                        src={ROOT_URL + "/maps/page"}
                        onLoad={() => handleOnLoad()}
                        key={index}
                        token={token}
                        width="100%"
                        height="93%"
                        display="initial"
                        position="relative"
                    />
                    <div className="d-flex flex-row justify-content-between">
                        <div className='invisible-box'/>
                        <Button
                            htmlType="submit"
                            className="login-form-button mt-1"
                            shape="round"
                            size="large"
                            onClick={() => handleAllocation()}
                            type = "primary"
                        >
                            SEND EMAIL
                        </Button>
                        <Button
                            htmlType="submit"
                            className="login-form-button mt-1"
                            shape="round"
                            size="large"
                            onClick={() => handleAllocation()}
                            type = "primary"
                        >
                            RUN ALLOCATION
                        </Button>
                        <div className='invisible-box'/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;