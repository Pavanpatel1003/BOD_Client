import axios from 'axios';
import { trimStart } from 'lodash';
import querystring from 'querystring';

// Get method
const api_version = 'api/v1';
const endPoint = `https://apidev.benchondemand.com/${api_version}/`;

export const get = async (url, params, headers = {}) => {
    const queryParams = querystring.stringify(params);
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(`${endPoint}${url}`, '/');
    return axios.get(`${url}?${queryParams}`, {
        headers: { ...getHeaders().headers, Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

export const getBYID = async (url, params, headers = {}) => {
    const queryParams = querystring.stringify(params);
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(`${endPoint}${url}`, '/');
    return axios.get(`${url}${params}`, {
        headers: { ...getHeaders().headers, Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

// Get blob method
export const getBlob = async (url, params, headers = {}) => {
    const queryParams = querystring.stringify(params);
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(url, '/');
    return axios.get(`${url}?${queryParams}`, {
        responseType: 'blob',
        headers: { ...getHeaders().headers, Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

// Post method
export const post = async (url, data) => {
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(`${endPoint}${url}`, '/');
    return axios.post(`${url}`, data, {
        headers: getHeaders().headers
    });
};

// Post partner method
export const postPartner = async (url, params, data) => {
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(`${url}`, '/');
    return axios.post(`${endPoint}${url}${params}`, data, {
        headers: getHeaders().headers
    });
};

// Patch method
export const updateByID = async (url, params, data) => {
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(url, '/');
    return axios.patch(`${endPoint}${url}${params}`, data, {
        headers: getHeaders().headers
    });
};

// Put method
export const put = async (url, data) => {
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(url, '/');
    return axios.put(`${endPoint}${url}`, data, {
        headers: getHeaders().headers
    });
};

// Delete method
export const Delete = async (url, params) => {
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(url, '/');
    return axios.patch(`${endPoint}${url}${params}`, {
        headers: getHeaders().headers
    });
};

// Get Headers method
export const getHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    };
};

//get single product method
export const getDetails = async (url, params, headers = {}) => {
    const queryParams = querystring.stringify(params);
    const HOST_URL = process.env.REACT_APP_API_HOST;
    url = trimStart(`${endPoint}${url}`, '/');
    return axios.get(`${url}?${queryParams}`, {
        headers: { ...getHeaders().headers, Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
};

