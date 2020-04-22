import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import {Form, Input, Typography, Button, Divider, Alert, Modal, Layout, InputNumber, Spin } from 'antd';
import MenuHeader from "./MenuHeader"
import {getAllRequirementsUser, uploadRequirementsStudent, getSpecificProjectAdmin, updateRequirementsStudent } from "../actions/requirementsActions";

const { Content } = Layout;
const { Title } = Typography;

function StudentManageRequirements(){
    const dispatch = useDispatch();
    const admin = localStorage.getItem("admin");

    const layout = {
        labelCol: {
          span: 100,
        },
        wrapperCol: {
          span: 400,
        },
      };

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');

    let history = useHistory();

    const [projectIdUpdate, setProjectIdUpdate] = useState();
    const [groupName, setGroupName] = useState();
    const [typePrototype, setTypePrototype] = useState();
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

    const [fetchedRequirements, setFetchedRequirements] = useState(false);
    const [filledForms, setFilledForms] = useState(false);
    const [buttonUpdate, setButtonUpdate] = useState(false);

    const [stopSpin, setStopSpin] = useState(false);

    // Get ID (if coming from admin)
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let projectId = params.get('id');

    if (projectId && !fetchedRequirements && admin){
        getSpecificProjectAdmin(projectId, dispatch);
        setFetchedRequirements(true);
        setProjectIdUpdate(projectId);
    }

    if (!fetchedRequirements && admin === "false"){
        getAllRequirementsUser(dispatch);
        setFetchedRequirements(true);
    }

    const dataSource = useSelector(state => state.upload.dataSource);
    let uploadError = useSelector(state => state.upload.uploadError);
    let uploadSuccess = useSelector(state => state.upload.uploadSuccess);

    useEffect(() => {
        if(runEffect){
            if(uploadError){
                setInvalidUpload(true);
                setClicked(false);
                setRunEffect(false);
            } else if (uploadSuccess){
                setValidUpload(true);
                setRunEffect(false);
                setTimeout(() => history.push('/home'), 2800);
            }
        }

        if (dataSource && !filledForms){
            let source = null;
            if (admin === "true"){
                source = dataSource;
                setButtonUpdate(true);
            } else if (admin === "false"){
                if (dataSource.length === 0){
                    setStopSpin(true);
                    return;
                } else if (dataSource.length === 1){
                    source = dataSource[0];
                    setButtonUpdate(true);
                }
            }

            setProjectIdUpdate(source.id);
            setGroupName(source.name);
            setTypePrototype(source.type);
            setSpaceX(source.space_x.toString());
            setSpaceY(source.space_y.toString());
            setSpaceZ(source.space_z.toString());
            setPrototypeX(source.prototype_x.toString());
            setPrototypeY(source.prototype_y.toString());
            setPrototypeZ(source.prototype_z.toString());
            setPrototypeWeight(source.prototype_weight.toString());
            setPowerPointsCount(source.power_points_count.toString());
            setPedestalBigCount(source.pedestal_big_count.toString());
            setPedestalSmallCount(source.pedestal_small_count.toString());
            setPedestalDescription(source.pedestal_description);
            setMonitorCount(source.monitor_count.toString());
            setTvCount(source.tv_count.toString());
            setTableCount(source.table_count.toString());
            setChairCount(source.chair_count.toString());
            setHdmiToVgaAdapterCount(source.hdmi_to_vga_adapter_count.toString());
            setHdmiCableCount(source.hdmi_cable_count.toString());
            setRemark(source.remark);

            form.setFieldsValue({
                groupName: source.name,
                typePrototype: source.type,
                spaceX: source.space_x.toString(),
                spaceY: source.space_y.toString(),
                spaceZ: source.space_z.toString(),
                prototypeX: source.prototype_x.toString(),
                prototypeY: source.prototype_y.toString(),
                prototypeZ: source.prototype_z.toString(),
                prototypeWeight: source.prototype_weight.toString(),
                powerPointsCount: source.power_points_count.toString(),
                pedestalBigCount: source.pedestal_big_count.toString(),
                pedestalSmallCount: source.pedestal_small_count.toString(),
                pedestalDescription: source.pedestal_description,
                monitorCount: source.monitor_count.toString(),
                tvCount: source.tv_count.toString(),
                tableCount: source.table_count.toString(),
                chairCount: source.chair_count.toString(),
                hdmiToVgaAdapterCount: source.hdmi_to_vga_adapter_count.toString(),
                hdmiCableCount: source.hdmi_cable_count.toString(),
                remark: source.remark
            });

            setFilledForms(true);
            setStopSpin(true);
        }
    })

    const handleOnChange = (e) => {
        setInvalidUpload(false);
        const {name, value} = e.target;
        if (name === "groupName") {
            setGroupName(value);
        } else if (name === "typePrototype"){
            setTypePrototype(value);
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
    };

    const handleUpload = () => {
        if (groupName && typePrototype && spaceX && spaceY && spaceZ && prototypeX && prototypeY && prototypeZ &&
            prototypeWeight && powerPointsCount && pedestalBigCount && pedestalSmallCount && monitorCount &&
            tvCount && tableCount && chairCount && hdmiToVgaAdapterCount && hdmiCableCount){
            setInvalidUpload(false);
            setClicked(true);
            setRunEffect(true);
            uploadRequirementsStudent(
                groupName,
                typePrototype,
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
        }
    };

    const handleUpdate = () => {
        if (groupName && typePrototype && spaceX && spaceY && spaceZ && prototypeX && prototypeY && prototypeZ &&
            prototypeWeight && powerPointsCount && pedestalBigCount && pedestalSmallCount && monitorCount &&
            tvCount && tableCount && chairCount && hdmiToVgaAdapterCount && hdmiCableCount){
            setInvalidUpload(false);
            setClicked(true);
            setRunEffect(true);
            updateRequirementsStudent(
                projectIdUpdate,
                groupName,
                typePrototype,
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
        }
    }

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.which === 13) {
            if (!clicked){
                handleUpload();
            }
        }
    };

    const handleModal = () => {
        const modal = Modal.success({
            title: "Upload success!",
            content: "Redirecting you to our home page shortly...",
            centered: true,
            closable: false,
            footer: null,
            okButtonProps: {disabled: true},
            icon: null
        });
        setTimeout(() => {modal.destroy();}, 2800);
    };

    return(
        !stopSpin ?
            <div className="d-flex justify-content-center align-items-center mt-5 w-100 vh-100">
                <Spin size="large"/>
            </div>
            :
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content>
                        <div className="d-flex site-layout-content flex-column container-fluid align-items-center justify-content-center">
                                <Form
                                    {...layout}
                                    layout = {formLayout}
                                    form={form}
                                    name='normal_requirements'
                                    className="d-flex flex-column container-fluid"
                                    initialValues={{remember: true}}
                                >
                                    <div className="d-flex justify-content-center ml-2 mt-3 mb-2">
                                        <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>SPACE ALLOCATION REQUIREMENTS</Title>
                                    </div>

                                    <Divider className="bg-secondary" style={{marginTop: "1px", marginBottom: "20px"}}/>

                                    {
                                        invalidUpload ?
                                            <Alert
                                                className="mb-3"
                                                message = "Upload Failed"
                                                description = "Each group can only upload once!"
                                                type = "error"
                                            />
                                            :
                                            null

                                    }

                                    {
                                        validUpload?
                                            handleModal()
                                            :
                                            null
                                    }

                                    <div className="d-flex flex-column justify-content-center mt-3">

                                    <Form.Item
                                                label = "Group Name:"
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
                                            label = "Type of Prototype / Description:"
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

                                        <Title level={4} className="d-flex justify-content-center mb-3">Showcase space needed (in metres):</Title>                             

                                        <Form.Item
                                            label = "Length:"
                                            name = "spaceX"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your length of showcase space needed"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                className = "w-100"
                                                name='spaceX'
                                                placeholder = "Length"
                                                onChange={(e) => setSpaceX(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Width:"
                                            name="spaceY"
                                            className="d-flex justify-content-center"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your width of showcase space needed!',
                                                }
                                            ]}
                                        >
                                            <InputNumber
                                                className = "w-100"
                                                name="spaceY"
                                                placeholder="Width"
                                                onChange={(e) => setSpaceY(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Height:"
                                            name = "spaceZ"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your height of showcase space needed"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='spaceZ'
                                                className = "w-100"
                                                placeholder = "Height"
                                                onChange={(e) => setSpaceZ(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                    </div>


                                    <div className="mt-3">
                                        <Title level={4} className="d-flex justify-content-center mb-3">Prototype details (in metres/kg):</Title>

                                        <Form.Item
                                            label = "Length:"
                                            name = "prototypeX"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your length of prototype!"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='prototypeX'
                                                className = "w-100"
                                                placeholder = "Prototype Length"
                                                onChange={(e) => setPrototypeX(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Width:"
                                            name="prototypeY"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input your width of prototype!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="prototypeY"
                                                className = "w-100"
                                                placeholder="Prototype Width"
                                                onChange={(e) => setPrototypeY(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Height:"
                                            name = "prototypeZ"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your height of prototype"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='prototypeZ'
                                                className = "w-100"
                                                placeholder= "Prototype Height"
                                                onChange={(e) => setPrototypeZ(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Weight:"
                                            name = "prototypeWeight"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input your weight of prototype"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='prototypeWeight'
                                                className = "w-100"
                                                placeholder = "Prototype Weight"
                                                onChange={(e) => setPrototypeWeight(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="mt-3">
                                        <Title level={4} className="d-flex justify-content-center mb-3">Logistics needed (If none required, put 0):</Title>

                                        <Form.Item
                                            label = "Number of PowerPoints:"
                                            name = "powerPointsCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of powerpoints needed!"},
                                                
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='powerPointsCount'
                                                className = "w-100"
                                                placeholder = "Number of Powerpoints"
                                                onChange={(e) => setPowerPointsCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of Big Pedestals:"
                                            name = "pedestalBigCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of big p`edestals needed!"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='pedestalBigCount'
                                                className = "w-100"
                                                placeholder = "Number of Big Pedestals"
                                                onChange={(e) => setPedestalBigCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of Small Pedestals:"
                                            name="pedestalSmallCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of small pedestals needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="pedestalSmallCount"
                                                className = "w-100"
                                                placeholder="Number of Small Pedestals"
                                                onChange={(e) => setPedestalSmallCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Pedestal Description:"
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

                                        <Form.Item
                                            label = "Number of Monitors:"
                                            name="monitorCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of monitors needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="monitorCount"
                                                className = "w-100"
                                                placeholder="Number of Monitors"
                                                onChange={(e) => setMonitorCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of TVs:"
                                            name="tvCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of TVs needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="tvCount"
                                                className = "w-100"
                                                placeholder="Number of TVs"
                                                onChange={(e) => setTvCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of Tables:"
                                            name="tableCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of tables needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="tableCount"
                                                className = "w-100"
                                                placeholder="Number of Tables"
                                                onChange={(e) => setTableCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of Chairs:"
                                            name="chairCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of chairs needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="chairCount"
                                                className = "w-100"
                                                placeholder="Number of Chairs"
                                                onChange={(e) => setChairCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of HDMI to VGA Adapters:"
                                            name = "hdmiToVgaAdapterCount"
                                            className="d-flex justify-content-center"
                                            rules ={
                                                [
                                                {required: true, message: "Please input number of HDMI to VGA adapter needed!"},
                                                ]
                                            }
                                        >
                                            <InputNumber
                                                name='hdmiToVgaAdapterCount'
                                                className = "w-100"
                                                placeholder = "Number of HDMI to VGA adapter"
                                                onChange={(e) => setHdmiToVgaAdapterCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label = "Number of HDMI Cables:"
                                            name="hdmiCableCount"
                                            className="d-flex justify-content-center"
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please input number of HDMI cables needed!',
                                            },
                                            ]}
                                        >
                                            <InputNumber
                                                name="hdmiCableCount"
                                                className = "w-100"
                                                placeholder="Number of HDMI cable"
                                                onChange={(e) => setHdmiCableCount(e)}
                                                onKeyUp={(e) => handleKeyUp(e)}
                                                size='large'
                                            />
                                        </Form.Item>
                                    </div>


                                    <div className="mt-3">
                                        <Form.Item
                                            label = "Additional remarks:"
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
                                                        onClick={ buttonUpdate ? () => handleUpdate() : () => handleUpload()}
                                                        style={groupName && typePrototype  ? {
                                                            width: "50%",
                                                            height: "50px",
                                                            borderColor: "#2552c2",
                                                            backgroundColor: "#2552c2"
                                                        } : {width: "50%", height: "50px", borderColor: "#2552c2", color: "#2552c2"}}
                                                        type={groupName ? 'primary' : 'ghost'}
                                                    >
                                                        { buttonUpdate ? "UPDATE" : "SUBMIT"}
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
                                                        { buttonUpdate ? "UPDATING" : "SUBMITTING" }
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

export default StudentManageRequirements;
// type under content dont touch header and footer