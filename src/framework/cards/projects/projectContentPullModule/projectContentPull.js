import axios from 'axios';

export class Project {
    constructor(type) {
        this.projectType = type;
    }

    set URLTransformer (transformerMethod=()=>{}) {
        this.#transformToBackendURL = transformerMethod;
    }

    #transformToBackendURL = (url) => {
        return url;
    }

    getData (url, callback) {
        const requestURL = this.#transformToBackendURL(url);
        axios.get(requestURL).then((response)=>{
            const projectInfo = response.data;
            callback(false, projectInfo);
        }).catch((err)=>{
            callback(err, false);
        });
    }
}