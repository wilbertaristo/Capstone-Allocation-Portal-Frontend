import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';

import {Table, InputNumber, Button, Form, Divider, Input} from 'antd';
import { Layout } from 'antd';

import MenuHeader from "./MenuHeader"
import { getAllRequirementsAdmin, getRequirementByFilterAdmin } from "../actions/requirementsActions";

const { Content} = Layout;

function AdminManageRequirements(){
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const layout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 10,
        },
    };

    const [fetchedRequirements, setFetchedRequirements] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [type, setType] = useState("");
    const [spaceX, setSpaceX] = useState("");
    const [spaceY, setSpaceY] = useState("");
    const [spaceZ, setSpaceZ] = useState("");
    const [prototypeX, setPrototypeX] = useState("");
    const [prototypeY, setPrototypeY] = useState("");
    const [prototypeZ, setPrototypeZ] = useState("");
    const [prototypeWeight, setPrototypeWeight] = useState("");
    const [powerPointsCount, setPowerPointsCount] = useState("");
    const [pedestalBigCount, setPedestalBigCount] = useState("");
    const [pedestalSmallCount, setPedestalSmallCount] = useState("");
    const [monitorCount, setMonitorCount] = useState("");
    const [tvCount, setTvCount] = useState("");
    const [tableCount, setTableCount] = useState("");
    const [chairCount, setChairCount] = useState("");
    const [hdmiToVgaAdapterCount, setHdmiToVgaAdapterCount] = useState("");
    const [hdmiCableCount, setHdmiCableCount] = useState("");
    const [remark, setRemark] = useState("");

    if (!fetchedRequirements){
        getAllRequirementsAdmin(dispatch);
        setFetchedRequirements(true);
    }

    const dataSource = useSelector(state => state.upload.dataSource);

    const fetchRequirements = () => {
        console.log("fetching");
        getRequirementByFilterAdmin(
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

    const debouncedFetch = _.debounce(() => fetchRequirements(), 1000);

    useEffect( () => {
        debouncedFetch();
    }, [groupName,
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
        monitorCount,
        tvCount,
        tableCount,
        chairCount,
        hdmiToVgaAdapterCount,
        hdmiCableCount,
        remark]);

    const handleKeyUp = e => {
        if (e.keyCode === 13 || e.which === 13) {
            fetchRequirements();
        }
    }

    const resetFilters = () => {
        form.resetFields();
    }

    const columns = [
        {
            title: "Group Name",
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            width: '30%',
        },
        {
            title: "Updated On",
            dataIndex: 'updated_on',
            key: 'updated_on',
            width: '30%',
        }
    ]

    return(
        <Layout className="vh-100">
            <MenuHeader/>
            <Layout>
                <Content style={{overflow: "auto"}}>
                        <div className="m-5">
                            <div className="d-flex flex-column pb-3 mb-3">
                                <Form
                                    {...layout}
                                    form= {form}
                                    layout="vertical"
                                    name='Normal_requirements'
                                    className="card"
                                    initialValues={{remember: true}}
                                >
                                    <div className="d-flex flex-column w-100 mt-5 mb-5">
                                        <div className="d-flex flex-row justify-content-around">
                                            <Form.Item
                                                label = "Group Name"
                                                name = "groupName"
                                                className = "inline-filter"
                                            >
                                                <Input
                                                    name='groupName'
                                                    placeholder="Group Name"
                                                    onChange={(e) => setGroupName(e.target.value)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Type"
                                                name = "typePrototype"
                                                className = "inline-filter"
                                            >
                                                <Input
                                                    name='typePrototype'
                                                    placeholder="Type of Prototype"
                                                    onChange={(e) => setType(e.target.value)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Tables"
                                                name="tableCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="tableCount"
                                                    className="w-100"
                                                    placeholder="No. of Tables"
                                                    onChange={(e) => setTableCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Chairs"
                                                name="chairCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="chairCount"
                                                    className="w-100"
                                                    placeholder="No. of Chairs"
                                                    onChange={(e) => setChairCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="d-flex flex-row justify-content-around">
                                            <Form.Item
                                                label = "Length"
                                                name = "spaceX"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='spaceX'
                                                    className="w-100"
                                                    placeholder = "Length"
                                                    onChange={(e) => setSpaceX(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Width"
                                                name="spaceY"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="spaceY"
                                                    className="w-100"
                                                    placeholder="Width"
                                                    onChange={(e) => setSpaceY(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Height"
                                                name = "spaceZ"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='spaceZ'
                                                    className="w-100"
                                                    placeholder = "Height"
                                                    onChange={(e) => setSpaceZ(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Power Points"
                                                name = "powerPointsCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='powerPointsCount'
                                                    className="w-100"
                                                    placeholder = "No. of Powerpoints"
                                                    onChange={(e) => setPowerPointsCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="d-flex flex-row justify-content-around">
                                            <Form.Item
                                                label = "Prototype Length"
                                                name = "prototypeX"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='prototypeX'
                                                    className="w-100"
                                                    placeholder = "Prototype Length"
                                                    onChange={(e) => setPrototypeX(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Prototype Width"
                                                name="prototypeY"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="prototypeY"
                                                    className="w-100"
                                                    placeholder="Prototype Width"
                                                    onChange={(e) => setPrototypeY(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Prototype Height"
                                                name = "prototypeZ"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='prototypeZ'
                                                    className="w-100"
                                                    placeholder= "Prototype Height"
                                                    onChange={(e) => setPrototypeZ(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Prototype Weight"
                                                name = "prototypeWeight"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='prototypeWeight'
                                                    className="w-100"
                                                    placeholder = "Prototype Weight"
                                                    onChange={(e) => setPrototypeWeight(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="d-flex flex-row justify-content-around">
                                            <Form.Item
                                                label = "Big Pedestals"
                                                name = "pedestalBigCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='pedestalBigCount'
                                                    className="w-100"
                                                    placeholder = "No. of Big Pedestals"
                                                    onChange={(e) => setPedestalBigCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Small Pedestals"
                                                name="pedestalSmallCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="pedestalSmallCount"
                                                    className="w-100"
                                                    placeholder="No. of Small Pedestals"
                                                    onChange={(e) => setPedestalSmallCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Monitors"
                                                name="monitorCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="monitorCount"
                                                    className="w-100"
                                                    placeholder="No. of Monitors"
                                                    onChange={(e) => setMonitorCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "TVs"
                                                name="tvCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="tvCount"
                                                    className="w-100"
                                                    placeholder="No. of TVs"
                                                    onChange={(e) => setTvCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className="d-flex flex-row justify-content-around">
                                            <Form.Item
                                                label = "HDMI to VGA Adapter"
                                                name = "hdmiToVgaAdapaterCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name='hdmiToVgaAdapterCount'
                                                    className="w-100"
                                                    placeholder = "No. of HDMI to VGA"
                                                    onChange={(e) => setHdmiToVgaAdapterCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "HDMI Cable"
                                                name="hdmiCableCount"
                                                className = "inline-filter"
                                            >
                                                <InputNumber
                                                    name="hdmiCableCount"
                                                    className="w-100"
                                                    placeholder="No. of HDMI cable"
                                                    onChange={(e) => setHdmiCableCount(e)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label = "Remark"
                                                name = "remark"
                                                className = "inline-filter"
                                            >
                                                <Input
                                                    name='remark'
                                                    placeholder = "Additional Remarks"
                                                    onChange={(e) => setRemark(e.target.value)}
                                                    onKeyUp={(e) => handleKeyUp(e)}
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name = "resetFilter"
                                                className = "inline-filter d-flex justify-content-center"
                                            >
                                                <Button
                                                    htmlType="submit"
                                                    className="login-form-button"
                                                    shape="round"
                                                    size="large"
                                                    type = "primary"
                                                    onClick = {() => resetFilters()}
                                                >
                                                    RESET FILTERS
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <Table columns={columns} dataSource={dataSource} size="middle" loading={!dataSource}/>
                        </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminManageRequirements;