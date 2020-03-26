import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Form, Input, Typography, Button, Divider, Alert, Modal, Layout} from 'antd';
import MenuHeader from "./MenuHeader"
import { uploadRequirementsStudent } from "../actions/requirementsActions";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

function HomePage(){

    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 10,
        },
      };

    const [form] = Form.useForm();

    const [groupName, setGroupName] = useState();
    const [typePrototype, setTypePrototype] = useState();
    const [typeDescription, setTypeDescription] = useState();
    const [type, setType] = useState();
    const [spaceX, setSpaceX] = useState();
    const [spaceY, setSpaceY] = useState();
    const [spaceZ, setSpaceZ] = useState();
    const [prototypeX, setPrototypeX] = useState();
    const [prototypeY, setPrototypeY] = useState();
    const [prototypeZ, setPrototypeZ] = useState();
    const [prototypeWeight, setPrototypeWeight] = useState();
    const [powerPointsCount, setPowerPointsCount] = useState();
    const [pedestalBigCount, setPedestalBigCount] = useState();
    const [pedestalSmallCount, setPedestalSmallCount] = useState();
    const [pedestalDescription, setPedestalDescription] = useState();
    const [monitorCount, setMonitorCount] = useState();
    const [tvCount, setTvCount] = useState();
    const [tableCount, setTableCount] = useState();
    const [chairCount, setChairCount] = useState();
    const [hdmiToVgaAdapterCount, setHdmiToVgaAdapterCount] = useState();
    const [hdmiCableCount, setHdmiCableCount] = useState();
    const [remark, setRemark] = useState();
    const [clicked, setClicked] = useState();
    const [invalidUpload, setInvalidUpload] = useState();
    const [validUpload, setValidUpload] = useState();
    const [runEffect, setRunEffect ] = useState();

    let uploadError = useSelector(state => state.upload.uploadError);
    let uploadSuccess = useSelector(state => state.upload.uploadSuccess);
    const dispatch = useDispatch();

    useEffect(() => {
        if(runEffect){
            if(uploadError){
                setInvalidUpload(true);
                setClicked(false);
                setRunEffect(false);
            } else if (uploadSuccess){
                setValidUpload(true);
                setRunEffect(false);
            }
        }
    })

    const handleOnChange = (e) => {
        setInvalidUpload(false);
        const {name, value} = e.target;
        console.log(value);
        if (name === "groupName") {
            setGroupName(value);
        } else if (name === "typePrototype"){
            setTypePrototype(value);
        } else if (name === "typeDescription") {
            setTypeDescription(value);
        } else if (name === "spaceX") {
            setSpaceX(value);
        } else if (name === "spaceY") {
            setSpaceY(value);
        } else if (name === "spaceZ") {
            setSpaceZ(value);
        } else if (name === "prototypeX") {
            setPrototypeX(value);
        } else if (name === "prototypeY") {
            setPrototypeY(value);
        } else if (name === "prototypeZ") {
            setPrototypeZ(value);
        } else if (name === "prototypeWeight") {
            setPrototypeWeight(value);
        } else if (name === "powerPointsCount") {
            setPowerPointsCount(value);
        } else if (name === "pedestalBigCount") {
            setPedestalBigCount(value);
        } else if (name === "pedestalSmallCount") {
            setPedestalSmallCount(value);
        } else if (name === "pedestalDescription") {
            setPedestalDescription(value);
        } else if (name === "monitorCount") {
            setMonitorCount(value);
        } else if (name === "tvCount") {
            setTvCount(value);
        } else if (name === "tableCount") {
            setTableCount(value);
        } else if (name === "chairCount") {
            setChairCount(value);
        } else if (name === "hdmiToVgaAdapterCount") {
            setHdmiToVgaAdapterCount(value);
        } else if (name === "hdmiCableCount") {
            setHdmiCableCount(value);
        } else if (name === "remark") {
            setRemark(value);
        }
        setType(typePrototype+typeDescription);
    };

    const handleUpload = (values) => {
        setInvalidUpload(false);
        setClicked(true);
        setRunEffect(true);
        uploadRequirementsStudent(
            groupName,
            type,
            spaceX,
            spaceY,
            spaceZ,
            prototypeX,
            prototypeY,
            prototypeZ,
            prototypeWeight,
            powerPointsCount,
            pedestalBigCount,
            pedestalSmallCount,
            pedestalDescription,
            monitorCount,
            tvCount,
            tableCount,
            chairCount,
            hdmiToVgaAdapterCount,
            hdmiCableCount,
            remark,
            dispatch
        );
    };

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.which === 13) {
            if (!clicked){
                handleUpload();
            }
        }
    }

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                        <div className="d-flex site-layout-content flex-column container-fluid align-items-center justify-content-center">
                                <Form
                                    {...layout}
                                    name='normal_requirements'
                                    className="d-flex flex-column container-fluid"
                                    initialValues={{remember: true}}
                                >

                                    <div className="d-flex justify-content-center mt-3 mb-2 ml-5 mr-5">
                                        <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>SPACE ALLOCATION REQUIREMENTS</Title>
                                    </div>

                                    <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                                    <div className="d-flex flex-column justify-content-center mt-3">
                                        <Form.Item
                                            name = "groupName"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your group name"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='groupName'
                                                placeholder="Group Name"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "typePrototype"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your type of prototype"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='typePrototype'
                                                placeholder="Type of Prototype"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            className="d-flex justify-content-center"
                                            name = "typeDescription"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your prototype description"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='typeDescription'
                                                placeholder="Prototype Description"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Title level={4} className="d-flex justify-content-center mb-3">Showcase space needed (in metres):</Title>

                                        <Form.Item
                                            name = "spaceX"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your length of showcase space needed"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='spaceX'
                                                placeholder = "Length"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="spaceY"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input your width of showcase space needed!',
                                            },
                                            ]}
                                        >
                                            <Input
                                                name="spaceY"
                                                placeholder="Width"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "spaceZ"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your height of showcase space needed"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='spaceZ'
                                                placeholder = "Height"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>
                                    

                                    <div className="mt-3">
                                        <Title level={4} className="d-flex justify-content-center mb-3">Prototype details (in metres/kg):</Title>

                                        <Form.Item
                                            name = "prototypeX"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your length of prototype!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeX'
                                                placeholder = "Prototype Length"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="prototypeY"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input your width of prototype!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="prototypeY"
                                                placeholder="Prototype Width"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "prototypeZ"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your height of prototype"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeZ'
                                                placeholder= "Prototype Height"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "prototypeWeight"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your weight of prototype"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeWeight'
                                                placeholder = "Prototype Weight"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="mt-3">
                                        <Title level={4} className="d-flex justify-content-center mb-3">Logistics needed (If none required, put 0):</Title>

                                        <Form.Item
                                            name = "powerPointsCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of powerpoints needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='powerPointsCount'
                                                placeholder = "Number of Powerpoints"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "pedestalBigCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of big pedestals needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='pedestalBigCount'
                                                placeholder = "Number of Big Pedestals"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="pedestalSmallCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of small pedestals needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="pedestalSmallCount"
                                                placeholder="Number of Small Pedestals"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}   
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "pedestalDescription"
                                            className="d-flex justify-content-center"
                                        >
                                            <Input
                                                name='pedestalDescription'
                                                placeholder = "Pedestal description"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="mt-3">
                                        <Form.Item
                                            name="monitorCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of monitors needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="monitorCount"
                                                placeholder="Number of Monitors"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="tvCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of TVs needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="tvCount"
                                                placeholder="Number of TVs"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}   
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="tableCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of tables needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="tableCount"
                                                placeholder="Number of Tables"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)} 
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="chairCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of chairs needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="chairCount"
                                                placeholder="Number of Chairs"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}  
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name = "hdmiToVgaAdapaterCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of HDMI to VGA adapter needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='hdmiToVgaAdapterCount'
                                                placeholder = "Number of HDMI to VGA adapter"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="hdmiCableCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of HDMI cables needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="hdmiCableCount"
                                                placeholder="Number of HDMI cable"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="mt-3">
                                        <Form.Item
                                            name = "remark"
                                            className="d-flex justify-content-center"
                                        >
                                            <Input
                                                name='remark'
                                                placeholder = "Additional Remarks"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item
                                        className="d-flex justify-content-center"
                                    >
                                        <div className="d-flex justify-content-center">
                                            {                           
                                                !clicked ? 
                                                    <Button
                                                        htmlType="submit"
                                                        className="submit-requirements-button"
                                                        shape="round"
                                                        size="large"
                                                        onClick={() => handleUpload()}
                                                        style={groupName && type  ? {
                                                            width: "50%", 
                                                            height: "50px",
                                                            borderColor: "#2552c2",
                                                            backgroundColor: "#2552c2"
                                                        } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                                        type={groupName ? 'primary' : 'ghost'}
                                                    >
                                                        SUBMIT
                                                    </Button>
                                                    :
                                                    <Button
                                                        htmlType="submit"
                                                        className="submit-requirements-button"
                                                        shape="round"
                                                        size="large"
                                                        type='primary'
                                                        style={{width: "50%", backgroundColor: '#4673e3', borderColor: '#4673e3', height: '50px', color: "white"}}
                                                        disabled
                                                    >
                                                    SUBMITTING
                                                    </Button>
                                            }
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default HomePage;

// type under content dont touch header and footer