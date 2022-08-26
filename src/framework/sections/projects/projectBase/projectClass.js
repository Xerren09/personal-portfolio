export class Project {

    constructor(originURL, backendURL) {
        this.OriginURL = originURL;
        this.BackendURL = backendURL;
    }

    GetData (url="") {
        const requestURL = url.replace(this.OriginURL, this.BackendURL);
        return fetch(requestURL).then(response => response.json());
    }
}