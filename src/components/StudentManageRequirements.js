import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Form, Input, Typography, Button, Divider, Alert, Modal, Layout} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LinkContainer } from 'react-router-bootstrap';
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

    let history = useHistory();
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
            } else if(uploadSuccess){
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
        uploadRequirementsStudent(groupName, type, spaceX, spaceY, spaceZ, prototypeX, prototypeY, prototypeZ, prototypeWeight, powerPointsCount, pedestalBigCount, pedestalSmallCount, pedestalDescription, monitorCount, tvCount, tableCount, chairCount, hdmiToVgaAdapterCount, hdmiCableCount, remark,  dispatch);
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
                        <div className="d-flex flex-column align-items-center">
                            <div className="container-fluid card mt-2 mb-5 ml-2 mr-10 p-5" style={{zIndex: '1'}}>
                                <Form
                                    {...layout}
                                    name='normal_requirements'
                                    className='requirements-form'
                                    initialValues={{remember: true}}
                                >
                                    <div>
                                        <div className="d-flex justify-content-center mt-3 mb-2 ml-5 mr-5">
                                            <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>SPACE ALLOCATION REQUIREMENTS</Title>
                                        </div>

                                        <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                                        <div className="mt-3">
                                            <Form.Item
                                                label = "Group name"
                                                name = "groupName"
                                                rules ={
                                                    [
                                                    {required: true, message: "Please input your group name"}
                                                    ]
                                                }
                                            >
                                                <Input
                                                    name='groupName'
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='large'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Type of prototype"
                                                name = "typePrototype"
                                                rules ={
                                                    [
                                                    {required: true, message: "Please input your type of prototype"}
                                                    ]
                                                }
                                            >
                                                <Input
                                                    name='typePrototype'
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='large'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Prototype description"
                                                name = "typeDescription"
                                                rules ={
                                                    [
                                                    {required: true, message: "Please input your prototype description"}
                                                    ]
                                                }
                                            >
                                                <Input
                                                    name='typeDescription'
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='large'
                                                />
                                            </Form.Item>

                                            <Title level={4}>Showcase space needed (in metres):</Title>                                                                              

                                            <Form form={form} name="horizontal_login" layout="inline">

                                            <Form.Item
                                                label = "Length"
                                                name = "spaceX"
                                                rules ={
                                                    [
                                                    {required: true, message: "Please input your length of showcase space needed"}
                                                    ]
                                                }
                                            >
                                                <Input
                                                    name='spaceX'
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='large'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Width"
                                                name="spaceY"
                                                rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your width of showcase space needed!',
                                                },
                                                ]}
                                            >
                                                <Input                                               
                                                    name="spaceY" 
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}  
                                                    size='large'                       
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Height"
                                                name = "spaceZ"
                                                rules ={
                                                    [
                                                    {required: true, message: "Please input your height of showcase space needed"}
                                                    ]
                                                }
                                            >
                                                <Input
                                                    name='spaceZ'
                                                    onChange={(e) => handleOnChange(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='large'
                                                />
                                            </Form.Item>
                                            
                                            </Form>                                   
                                        </div>                                       
                                    </div>

                                    

                                    <div className="mt-3">
                                        <Title level={4}>Prototype details (in metres/kg):</Title> 

                                        <Form form={form} name="horizontal_login" layout="inline">

                                        <Form.Item
                                            label = "Length"
                                            name = "prototypeX"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your length of prototype!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeX'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Width"
                                            name="prototypeY"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input your width of prototype!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="prototypeY"   
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Height"
                                            name = "prototypeZ"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your height of prototype"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeZ'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Weight"
                                            name = "prototypeWeight"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your weight of prototype"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='prototypeWeight'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        </Form>
                                    </div>

                                    <div className="mt-3">
                                        <Title level={4}>Logistics needed (If none required, put 0):</Title> 

                                        <Form.Item
                                            label = "Number of powerpoints"
                                            name = "powerPointsCount"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of powerpoints needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='powerPointsCount'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form form={form} name="horizontal_login" layout="inline">

                                        <Form.Item
                                            label = "Number of big pedestals"
                                            name = "pedestalBigCount"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of big pedestals needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='pedestalBigCount'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Number of small pedestals"
                                            name="pedestalSmallCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of small pedestals needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="pedestalSmallCount"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}   
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Pedestal description"
                                            name = "pedestalDescription"
                                        >
                                            <Input
                                                name='pedestalDescription'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        </Form>
                                    </div>

                                    <div className="mt-3">
                                        <Form.Item
                                            label="Number of monitors"
                                            name="monitorCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of monitors needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="monitorCount"   
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Number of TVs"
                                            name="tvCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of TVs needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="tvCount"
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}   
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Number of tables"
                                            name="tableCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of tables needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="tableCount"  
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)} 
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Number of chairs"
                                            name="chairCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of chairs needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="chairCount" 
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}  
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        <Form form={form} name="horizontal_login" layout="inline">

                                        <Form.Item
                                            label = "Number of HDMI to VGA adapter"
                                            name = "hdmiToVgaAdapaterCount"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of HDMI to VGA adapter needed!"}
                                                ]
                                            }
                                        >
                                            <Input
                                                name='hdmiToVgaAdapterCount'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Number of HDMI cable"
                                            name="hdmiCableCount"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of HDMI cables needed!',
                                            },
                                            ]}
                                        >
                                            <Input                                               
                                                name="hdmiCableCount"   
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'                       
                                            />
                                        </Form.Item>

                                        </Form>

                                        


                                    </div>

                                    <div className="mt-3">
                                        <Form.Item
                                            label = "Additional remarks"
                                            name = "remark"
                                        >
                                            <Input
                                                name='remark'
                                                onChange={(e) => handleOnChange(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>

                                    <Form.Item>
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
                        </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Capstone Allocation ©2020 Created by MadDev</Footer>
            </Layout>
        </Layout>
    );
}

export default HomePage;

// type under content dont touch header and footer