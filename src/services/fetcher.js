import axios from "axios";

import { storageKeys } from "@/constants";
import { getCookie } from "@/utils/cookie";

const instance = axios.create();

const fetcher = async (
    { method, url, headers,isAuth } = {},
    { data, params, pathParams, context = {}, signal, ...rest } = {},
) => {
    try {
        // update path params
        if (pathParams) {
            for (let key of Object.keys(pathParams)) {
                const keyCompare = `:${key}`;
                if (url.indexOf(keyCompare) !== -1) {
                    url = url.replace(keyCompare, pathParams[key]);
                }
            }
        }

        const token = getCookie(storageKeys.TOKEN); // Lấy token từ cookie

        if (token && isAuth) {
            headers.Authorization = `Bearer ${token}`;
        }

        if (headers["Content-Type"] === "multipart/form-data") {
            let formData = new FormData();
            Object.keys(data).forEach((item) => {
                if (Array.isArray(data[item])) {
                    data[item].forEach((file) => {
                        formData.append(`${item}[]`, file);
                    });
                } else {
                    formData.append(item, data[item]);
                }
            });
            data = formData;
        }
        return await instance.request({
            method,
            url,
            headers,
            data,
            params,
            signal,
            context,
            ...rest,
        });
    } catch (error) {
        console.log(error);

        // const { req, res } = context;

        // if (error?.response?.status === 401) {
        //     logout({ req, res });
        // } else if (error?.response?.status === 403) {
        //     redirect({ context, path: paths.forbidden });
        // }

        throw error;
    }
};
export default fetcher;
