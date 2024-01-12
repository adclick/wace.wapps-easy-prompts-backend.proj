import axios from 'axios';

const get = async (url: string, params: any) => {
    try {
        const { data } = await axios.get(url + "?" + new URLSearchParams(params));

        return data;
    } catch ({ message }: any) {
        throw new Error(message)
    }
}

export default {
    get
}