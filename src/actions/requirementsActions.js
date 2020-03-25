import axios from 'axios';
import { ROOT_URL } from "../utils";
import {
    UPLOAD_REQUIREMENTS,
    UPLOAD_ERROR
} from "./types";

const defaultToken = localStorage.getItem('token');
if (defaultToken) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + defaultToken;
}


export function uploadRequirementsStudent(groupName, type, spaceX, spaceY, spaceZ, prototypeX, prototypeY, prototypeZ, prototypeWeight, powerPointsCount, pedestalBigCount, pedestalSmallCount, pedestalDescription, monitorCount, tvCount, tableCount, chairCount, hdmiToVgaAdapterCount, hdmiCableCount, remark,  dispatch) {
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

