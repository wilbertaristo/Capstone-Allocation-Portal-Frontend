import React, {useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDebounce } from "use-lodash-debounce";

import {Table, InputNumber, Button, Form, Input, Modal, Alert, Typography, Popconfirm} from 'antd';
import { Layout } from 'antd';

import Dropzone from "react-dropzone"
import { useDropzone } from "react-dropzone";

import MenuHeader from "./MenuHeader"
import {
    deleteRequirementAdmin,
    getAllRequirementsUser,
    getRequirementByFilterAdmin,
    uploadRequirementsStudentByCsv
} from "../actions/requirementsActions";
import {TABLE_LOADING} from "../actions/types";

const { Content} = Layout;
const { Title, Text } = Typography;

// ============== DROPZONE STYLING ====================== //
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
// ======================================================== //

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

    const debounceWait = 1000;
    const debouncedGroupName = useDebounce(groupName, debounceWait);
    const debouncedType = useDebounce(type, debounceWait);
    const debouncedSpaceX = useDebounce(spaceX, debounceWait);
    const debouncedSpaceY = useDebounce(spaceY, debounceWait);
    const debouncedSpaceZ = useDebounce(spaceZ, debounceWait);
    const debouncedPrototypeX = useDebounce(prototypeX, debounceWait);
    const debouncedPrototypeY = useDebounce(prototypeY, debounceWait);
    const debouncedPrototypeZ = useDebounce(prototypeZ, debounceWait);
    const debouncedPrototypeWeight = useDebounce(prototypeWeight, debounceWait);
    const debouncedPowerPointsCount = useDebounce(powerPointsCount, debounceWait);
    const debouncedPedestalBigCount = useDebounce(pedestalBigCount, debounceWait);
    const debouncedPedestalSmallCount = useDebounce(pedestalSmallCount, debounceWait);
    const debouncedMonitorCount = useDebounce(monitorCount, debounceWait);
    const debouncedTvCount = useDebounce(tvCount, debounceWait);
    const debouncedTableCount = useDebounce(tableCount, debounceWait);
    const debouncedChairCount = useDebounce(chairCount, debounceWait);
    const debouncedHdmiToVgaAdapterCount = useDebounce(hdmiToVgaAdapterCount, debounceWait);
    const debouncedHdmiCableCount = useDebounce(hdmiCableCount, debounceWait);
    const debouncedRemark = useDebounce(remark, debounceWait);

    const [runEffect, setRunEffect ] = useState(false);
    const [openUploadCsv, setOpenUploadCsv] = useState(false);
    const [csvNotUploaded, setCsvNotUploaded] = useState(true);
    const [csvUploadError, setCsvUploadError] = useState(false);
    const [csvUploadSuccess, setCsvUploadSuccess] = useState(false);
    const [csvResult, setCsvResult] = useState(null);
    const [uploadingCSV, setUploadingCSV] = useState(false);
    const [filename, setFilename] = useState('');

    if (!fetchedRequirements){
        getAllRequirementsUser(dispatch);
        setFetchedRequirements(true);
    }

    const dataSource = useSelector(state => state.upload.dataSource);
    const loading = useSelector(state => state.upload.loading);
    let serverCsvUploadError = useSelector(state => state.upload.csvUploadError);
    let serverCsvUploadSuccess = useSelector(state => state.upload.csvUploadSuccess);

    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args);
            }, wait);
        };
    };

    const fetchRequirements = () => {
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
        dispatch({type: TABLE_LOADING});
    };

    const debouncedFetch = debounce(() => fetchRequirements(), 1000);

    useEffect( () => {
        console.log(groupName);
        if (runEffect) {
            console.log("trying to get CSV Upload status");
            if (serverCsvUploadError){
                setUploadingCSV(false);
                setRunEffect(false);
            } else if (serverCsvUploadSuccess){
                console.log("CSV upload success");
                setUploadingCSV(false);
                setCsvUploadSuccess(true);
                setRunEffect(false);
            }
        }
        fetchRequirements();
    },[
        debouncedGroupName,
        debouncedType,
        debouncedSpaceX,
        debouncedSpaceY,
        debouncedSpaceZ,
        debouncedPrototypeX,
        debouncedPrototypeY,
        debouncedPrototypeZ,
        debouncedPrototypeWeight,
        debouncedPowerPointsCount,
        debouncedPedestalBigCount,
        debouncedPedestalSmallCount,
        debouncedMonitorCount,
        debouncedTvCount,
        debouncedTableCount,
        debouncedChairCount,
        debouncedHdmiToVgaAdapterCount,
        debouncedHdmiCableCount,
        debouncedRemark,
        runEffect,
        serverCsvUploadSuccess,
        serverCsvUploadError
    ]);

    const handleDeleteRequirement = (projectId) => {
        deleteRequirementAdmin(projectId);
        debouncedFetch();
    }

    const handleEditRequirement = (projectId) => {
        window.open(`student?id=${projectId}`)
    }

    const resetFilters = () => {
        form.resetFields();
        setGroupName("");
        setType("");
        setSpaceX("");
        setSpaceY("");
        setSpaceZ("");
        setPrototypeX("");
        setPrototypeY("");
        setPrototypeZ("");
        setPrototypeWeight("");
        setPowerPointsCount("");
        setPedestalBigCount("");
        setPedestalSmallCount("");
        setMonitorCount("");
        setTvCount("");
        setChairCount("");
        setHdmiToVgaAdapterCount("");
        setHdmiCableCount("");
        setRemark("");
        getAllRequirementsUser(dispatch);
        dispatch({type: TABLE_LOADING});
    }

    const handleFiles = (files) => {
        setCsvResult(files);
        setCsvNotUploaded(false);
        setCsvUploadError(false);
        files.map(file => (
            setFilename(
                <li key={file.path}>
                    {file.path}
                </li>
            ))
        );
    };

    const handleDownloadCSVTemplate = () => {
        window.open('https://google.com');
    };

    const handleCSVUpload = () => {
        setCsvUploadSuccess(false);
        setUploadingCSV(true);
        const data = new FormData();
        data.append('file', csvResult[0]);
        uploadRequirementsStudentByCsv(data, dispatch);
        setRunEffect(true);
    };

    const { isDragAccept, isDragActive, isDragReject } = useDropzone({accept: '.csv'});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const handleCloseCsvUpload = () => {
        setCsvUploadSuccess(false);
        setOpenUploadCsv(false);
        setUploadingCSV(false);
        setCsvNotUploaded(true);
        setCsvResult(null);
        setFilename('');
        serverCsvUploadError = false;
        serverCsvUploadSuccess = false;
    };

    const columns = [
        {
            title: "Group Name",
            dataIndex: 'name',
            key: 'name',
            width: '8%',
            fixed: 'left',
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            width: '10%',
        },
        {
            title: "Showcase Length",
            dataIndex: 'space_x',
            key: 'space_x',
            width: '4%',
        },
        {
            title: "Showcase Width",
            dataIndex: 'space_y',
            key: 'space_y',
            width: '4%',
        },
        {
            title: "Showcase Height",
            dataIndex: 'space_z',
            key: 'space_z',
            width: '3%',
        },
        {
            title: "Prototype Length",
            dataIndex: 'prototype_x',
            key: 'prototype_x',
            width: '4%',
        },
        {
            title: "Prototype Width",
            dataIndex: 'prototype_y',
            key: 'prototype_y',
            width: '4%',
        },
        {
            title: "Prototype Height",
            dataIndex: 'prototype_z',
            key: 'prototype_z',
            width: '4%',
        },
        {
            title: "Prototype Weight",
            dataIndex: 'prototype_weight',
            key: 'prototype_weight',
            width: '4%',
        },
        {
            title: "Power Points",
            dataIndex: 'power_points_count',
            key: 'power_points_count',
            width: '4%',
        },
        {
            title: "Big Pedestal",
            dataIndex: 'pedestal_big_count',
            key: 'pedestal_big_count',
            width: '4%',
        },
        {
            title: "Small Pedestal",
            dataIndex: 'pedestal_small_count',
            key: 'pedestal_small_count',
            width: '4%',
        },
        {
            title: "Monitor Count",
            dataIndex: 'monitor_count',
            key: 'monitor_count',
            width: '4%',
        },
        {
            title: "TV Count",
            dataIndex: 'tv_count',
            key: 'tv_count',
            width: '4%',
        },
        {
            title: "Table Count",
            dataIndex: 'table_count',
            key: 'table_count',
            width: '4%',
        },
        {
            title: "Chair Count",
            dataIndex: 'chair_count',
            key: 'chair_count',
            width: '4%',
        },
        {
            title: "HDMI to VGA",
            dataIndex: 'hdmi_to_vga_adapter_count',
            key: 'hdmi_to_vga_adapter_count',
            width: '4%',
        },
        {
            title: "HDMI Cables",
            dataIndex: 'hdmi_cable_count',
            key: 'hdmi_cable_count',
            width: '4%',
        },
        {
            title: "Remarks",
            dataIndex: 'remark',
            key: 'remark',
            width: '6%',
        },
        {
            title: "Updated On",
            dataIndex: 'updated_on',
            key: 'updated_on',
            width: '6%',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: '5%',
            render: (text, record) =>
                dataSource.length >= 1 ? (
                    <div>
                        <Button type="link" style={{ marginRight: 16 }} onClick={() => handleEditRequirement(record.id)}>Edit</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteRequirement(record.id)}>
                            <Button type="link">Delete</Button>
                        </Popconfirm>
                    </div>
                ) : null,
        },
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
                                    layout="vertical"
                                    form={form}
                                    onFinish={debouncedFetch}
                                    name='control-hooks'
                                    className="card"
                                    initialValues={{remember: true}}
                                >
                                    <Modal
                                        title="Upload Project Requirements CSV"
                                        visible={openUploadCsv}
                                        onCancel={() => handleCloseCsvUpload()}
                                        footer={[
                                            <Button key="back" onClick={() => handleCloseCsvUpload()}>
                                                Cancel
                                            </Button>,
                                            <Button key="submit" type="primary" disabled={csvNotUploaded} loading={uploadingCSV} onClick={() => handleCSVUpload()}>
                                                Upload
                                            </Button>,
                                        ]}
                                    >
                                        {
                                            csvUploadSuccess ?
                                                <Alert
                                                    className="m-3"
                                                    message="Upload CSV Success!"
                                                    description="Your project's requirement has been successfully uploaded"
                                                    type="success"
                                                />:
                                                <div></div>
                                        }
                                        {
                                            csvUploadError || serverCsvUploadError ?
                                                <Alert
                                                    className="m-3"
                                                    message="Upload CSV Error!"
                                                    description="Please upload a valid CSV file"
                                                    type="error"
                                                /> :
                                                <div></div>
                                        }
                                        <Dropzone accept=".csv" onDropAccepted={acceptedFiles => handleFiles(acceptedFiles)} onDropRejected={() => setCsvUploadError(true)} >
                                            {({getRootProps, getInputProps}) => (
                                                <section className="container">
                                                    <div {...getRootProps({style})}>
                                                        <input {...getInputProps()} />
                                                        {!isDragActive && csvNotUploaded && (<p className="mt-3">Drag & Drop your CSV file here...</p>)}
                                                        {!isDragActive && !csvNotUploaded && (<p className="mt-3">Change Attached CSV file...</p>)}
                                                    </div>
                                                    <aside className="mt-3">
                                                        <h6>Files Attached Successfully:</h6>
                                                        <ul>{filename}</ul>
                                                    </aside>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </Modal>

                                    <div className="d-flex justify-content-between mt-5 mb-2 ml-5">
                                        <div style={{width: "18%"}}/>
                                        <Title level={3} style={{color: "dimgray", letterSpacing: "2px"}}>MANAGE ALLOCATION REQUIREMENTS</Title>
                                        <div className="mr-5">
                                            <Button
                                                className="login-form-button mr-3"
                                                shape="round"
                                                size="large"
                                                onClick={() => setOpenUploadCsv(true)}
                                                type="primary"
                                            >
                                                Upload CSV
                                            </Button>
                                            <Button
                                                className="login-form-button"
                                                shape="round"
                                                size="large"
                                                onClick={() => handleDownloadCSVTemplate()}
                                                type="primary"
                                            >
                                                Download CSV Template
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column w-100 mt-3 mb-4">
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
                                                    size='default'
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                name = "resetFilter"
                                                className = "inline-filter d-flex justify-content-center"
                                            >
                                                <Button
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

                            <div className="d-flex justify-content-between mr-4 mb-2">
                                <Text className="ml-2">
                                    {dataSource ? `Showing ${dataSource.length} results` : ""}
                                </Text>
                                <Button
                                    onClick={() => debouncedFetch()}
                                    type="default"
                                    shape="round"
                                >
                                    Refresh Table
                                </Button>
                            </div>

                            <Table columns={columns} dataSource={dataSource} size="middle" loading={loading} scroll={{ x: 3500, y: 1000 }} bordered/>
                        </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminManageRequirements;