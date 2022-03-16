import axios from "axios"

export const config = {
    api_url : "https://laundry-apiv1.herokuapp.com/"
}

export const service = {
    getData : async (path, token, data) => {
        return await axios({
            url : config.api_url+path,
            method : "GET",
            headers : {
                'x-sange-token' : token
            },
            params : data
        })
    },

    postData : async (path, token, data) => {
        return await axios({
            url : config.api_url+path,
            method : "POST",
            headers : {
                'Content-Type'  : 'application/json',
                'x-sange-token' : token
            },
            data : data
        })
    }
}