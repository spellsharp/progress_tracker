import {useEffect, useState} from "react";
import axios from "axios";

export const Logout = () => {

    useEffect(() => {
        (async () => {
            try {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                const {data} = await axios.post('http://localhost:8000/logout/',{
                    refresh_token:localStorage.getItem('refresh_token')
                } ,{headers: {
                    'Content-Type': 'application/json'
                }}, {withCredentials: true});

                console.log('logout exit');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login'
            } catch (e) {
                console.log('logout not working')
                console.log(e);
            }
        })();
    }, []);


    return (
        <div></div>
    )
}