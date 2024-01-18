import axios from 'axios';

const get = async (url: string, params: any) => {
    try {
        const { data } = await axios.get(url + "?" + new URLSearchParams(params));

        return data;
    } catch (error) {
        throw error
    }
}

const post = async (url: string, params: any) => {
    try {
        const { data } = await axios.post(url, params);

        return data;
    } catch (error) {
        throw error;
    }
}


export default {
    get,
    post
}