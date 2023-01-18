import axios from "axios"

// const token = JSON.parse(localStorage.getItem('token'))
// export default axios.create({
//     baseURL: "https://geri.jarsys.com/v1/",
//     headers: {
//         "Authorization": `Bearer ${token !== null && token} `
//     }
// })

// const API_URL = process.env.REACT_APP_BASE_URL;
// const API_URL = "http://devapi.geribazaar.com/admin";
let API_URL;
switch (process.env.REACT_APP_ENV) {
    case "production":
        API_URL = "http://api.geribazaar.com/admin"
        break;
    case "development":
        API_URL = "http://devapi.geribazaar.com/admin"
        // API_URL = "http://api.geribazaar.com/admin"
        break;
    default:
        API_URL = "http://127.0.0.1:3000/admin"
        break;
}
// const API_URL = process.env === "production" ? "http://devapi.geribazaar.com/admin" : "http://127.0.0.1:3000/admin";


function getStoredToken() {
    const storedAuth = localStorage.getItem('authGeri');
    const authGeri = storedAuth !== null ? JSON.parse(storedAuth) : {};
    return authGeri
}

const baseInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

const apiInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
});

const requestHandler = request => {
    request.headers.Authorization = `Bearer ${getStoredToken()?.access_token}`;
    request.headers['Access-Control-Allow-Origin'] = "*";
    return request;
}

const responseHandler = response => {
    return response;
};

apiInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => {
        console.log('error:', error);
        if (error.code === 'ECONNABORTED') {
            alert(error.message)
        }
        else if (error.code === "ERR_NETWORK") {
            alert("Internet connection problem.");
        }
        else if (error?.response?.status >= 400 && error?.response?.status <= 499) {
            if (error.response.status === 401) {
                localStorage.removeItem('authGeri');
                window.location.href = '/login'
            }
            else if (error.response?.data?.message) {
                error.code = "RES_ERROR"
            }
        }
        return Promise.reject(error);
    }
);


// const errorHandler = async (error) => {
//     if (error.response && error.response?.status === 401) {
//         const originalRequest = error.config;
//         const authGeri = JSON.parse(localStorage.getItem("authGeri"));
//         if (authGeri.refresh_token && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const ref_resp = await baseInstance.post("clients/web/refresh", {
//                     refresh_token: authGeri.refresh_token
//                 });
//                 if (ref_resp.data.access_token) {
//                     localStorage.setItem('authGeri', JSON.stringify(ref_resp.data))
//                     localStorage.setItem("isAuthenticated", true);
//                     return apiInstance(originalRequest);
//                 }
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }
//     }
//     return Promise.reject(error);
// };

export default apiInstance;
export {
    baseInstance
};

