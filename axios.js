import axios from "axios"
// import { config } from "vue/types/umd"

axios.interceptors.request.use(config => {
    return config;
})

// axios.interceptors.request.use(Response => {
//     let res = Response.data;
//     console.log("…………………………");
//     console.log(res);
//     console.log("…………………………");
// })