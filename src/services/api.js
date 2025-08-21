import axios from 'axios';
const axiosInstance = axios.create();
const sendRequest = (options, payload) => {
    let { params = {}, pathParams = {}, data = {}, disableHandleMultipart } = payload;
    let { method, baseURL, headers, responseType } = options;
   
    // update path params
    for (let key of Object.keys(pathParams)) {
        const keyCompare = `:${key}`;
        if (baseURL.indexOf(keyCompare) !== -1) {
            baseURL = baseURL.replace(keyCompare, pathParams[key]);
        }
    }

    // handle multipart
    if (!disableHandleMultipart) {
        if (options.headers['Content-Type'] === 'multipart/form-data') {
            let formData = new FormData();
            Object.keys(data).map((item) => {
                formData.append(item, data[item]);
            });

            data = formData;
        }
    }

    // ...
    return axiosInstance.request({
        method,
        baseURL,
        headers,
        params,
        data,
        responseType,
    });
};

export { sendRequest };
