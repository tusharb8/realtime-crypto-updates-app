// A mock function to mimic making an async request for data

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000, // Timeout if necessary
    headers: {
        'ContentType': 'program/json',
        // Add all custom headers here
    },
});
export const fetchCoinHistory = async (coinName: string) => {
    try {
        const response = await axiosInstance(`/coins/rates/${coinName}`, {
            method: "GET",
        });
        const result = response.data
        console.log("fetchCoinHistory",result)

        return result;
    }
    catch (error) {

    }
};
