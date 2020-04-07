import axios from 'axios';
import { ROOT_URL } from "../utils";
import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR,
    ADMIN_GET_REQUIREMENTS,
    ADMIN_GET_REQUIREMENTS_ERROR
} from "./types";

const defaultToken = localStorage.getItem('token');
if (defaultToken) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + defaultToken;
}


export function uploadRequirementsStudent(
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
    ) {
    axios.post(`${ROOT_URL}/projects`, null,
        {
            params: {
                "name": groupName,
                "type": type,
                "space_x": spaceX,
                "space_y": spaceY,
                "space_z": spaceZ,
                "prototype_x": prototypeX,
                "prototype_y": prototypeY,
                "prototype_z": prototypeZ,
                "prototype_weight": prototypeWeight,
                "power_points_count": powerPointsCount,
                "pedestal_big_count": pedestalBigCount,
                "pedestal_small_count": pedestalSmallCount,
                "pedestal_description": pedestalDescription,
                "monitor_count": monitorCount,
                "tv_count": tvCount,
                "table_count": tableCount,
                "chair_count": chairCount,
                "hdmi_to_vga_adapter_count": hdmiToVgaAdapterCount,
                "hdmi_cable_count": hdmiCableCount,
                'remark': remark        
            }
        })
        .then(uploadResponse => {
            dispatch({
                type: UPLOAD_REQUIREMENTS
            })
        })
        .catch((uploadError) => {
            console.log(uploadError.message)
            dispatch ({
                type: UPLOAD_ERROR
            })
        })
}

export function getAllRequirementsAdmin(dispatch){
    axios.get(`${ROOT_URL}/projects`)
        .then(response => {
            dispatch({
                type: ADMIN_GET_REQUIREMENTS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.message)
            dispatch({
                type: ADMIN_GET_REQUIREMENTS_ERROR
            })
        })
}

export function getRequirementByFilterAdmin(
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
    ){
    axios.get(`${ROOT_URL}/projects`,
        {
            params: {
                "name": groupName,
                "type": type,
                "space_x": spaceX,
                "space_y": spaceY,
                "space_z": spaceZ,
                "prototype_x": prototypeX,
                "prototype_y": prototypeY,
                "prototype_z": prototypeZ,
                "prototype_weight": prototypeWeight,
                "power_points_count": powerPointsCount,
                "pedestal_big_count": pedestalBigCount,
                "pedestal_small_count": pedestalSmallCount,
                "pedestal_description": '',
                "monitor_count": monitorCount,
                "tv_count": tvCount,
                "table_count": tableCount,
                "chair_count": chairCount,
                "hdmi_to_vga_adapter_count": hdmiToVgaAdapterCount,
                "hdmi_cable_count": hdmiCableCount,
                'remark': remark
            }
        })
        .then(response => {
            dispatch({
                type: ADMIN_GET_REQUIREMENTS,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error.message)
            dispatch({
                type: ADMIN_GET_REQUIREMENTS_ERROR
            })
        })
}

export function runAllocation() {
    axios.post(`${ROOT_URL}/admin/run_allocation`)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        })
}
