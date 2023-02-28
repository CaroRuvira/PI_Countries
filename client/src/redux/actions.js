import axios from 'axios';
import {
    GET_ACTIVITIES,
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    GET_COUNTRY_DETAIL, 
    ADD_ACTIVITY,
    FILTER_BY_ACTIVITIES,
    FILTER_COUNTRIES,
    ORDER_COUNTRIES_ALF,
    ORDER_COUNTRIES_POP,
    GET_COUNTRIES_QUERY
 
} from './action-types';

export const getCountries = () => {
    return async function (dispatch) {
        let info = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: info.data
        })
    }
};

 export const getCountriesDetail = (id) => {
    return async function(dispatch){
        try {
            let info = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch ({
                type: GET_COUNTRY_DETAIL,
                payload: info.data
            })
        } catch (error) {
            return {error: error.message}
        }
    }
 };


 export const getCountryByName = (name) =>{
    return{
        type: GET_COUNTRY_BY_NAME,
        payload: name
    }
 };

export function postActivity(payload) {
 return async function(dispatch){
    const response = await axios.post("http://localhost:3001/activities", payload)
    console.log(response);
    return response
 }
};

export const getActivities = () => {
    return (dispatch) => {
        try {
            axios.get("http://localhost:3001/activities")
            .then ((info) => {
                return dispatch ({
                    type: GET_ACTIVITIES,
                    payload:info.data
                })
            })
        } catch (error) {
            return {error: error.message}
        }
    }
};

export const filterByContinents = (payload) =>{
    return{
        type: FILTER_COUNTRIES,
        payload
    }
};

export const orderByName = (payload) => {
    return{
        type: ORDER_COUNTRIES_ALF,
        payload
    }
};

export const orderByPopulation = (payload) => {
    return {
        type : ORDER_COUNTRIES_POP,
        payload
    }
}


export const getCountriesQuery = (name) => {
    return async function (dispatch) {
        try {
            let info = await axios.get 
            ('http://localhost:3001/countries?name=' + name.charAt(0).toUpperCase() + name.slice(1));
            return dispatch ({
                type: GET_COUNTRIES_QUERY,
                payload: info.data
            })
        } catch (error) {
            return {error: error.message}
        }
    };
}

export const filterByActivity = (activity) => {
    return{
        type: FILTER_BY_ACTIVITIES,
        payload: activity
    }
}

    