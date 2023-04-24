import axios from 'axios';


export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const ORDER_BY_POBLACION = "ORDER_BY_POBLACION";
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY";
export const RESET = "RESET";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
// export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const getCountries = () =>{

    return async function(dispatch){
        const paisesDB = await axios.get("http://localhost:3001/countries/");
        console.log(paisesDB);
        const paises = await paisesDB.data;
        dispatch({ type: GET_COUNTRIES, payload: paises})
    }
}

export const getCountryByName =  (nombrePais) =>{
    return async function(dispatch){
        const paisesCrudo = await axios.get(`http://localhost:3001/countries?name=${nombrePais}`);
        const paisesBuscados = await paisesCrudo.data;
        dispatch({type: GET_COUNTRIES_BY_NAME,
                    payload: paisesBuscados});
}
}


export const getCountry = (id) =>{

    return async function(dispatch){
        const paisDB = await axios.get(`http://localhost:3001/countries/${id}`);
        const pais = await paisDB.data;
        dispatch({type : GET_COUNTRY, payload: pais})
    }
}

export const restartDetail = () =>{
    return {
        type: RESET
    }
}

export const filterByContinent = (continente) =>{
    return{
        type: FILTER_BY_CONTINENT,
        payload: continente,
    }
}
export const filterByActivity = (activity) =>{
    return{
        type: FILTER_BY_ACTIVITY,
        payload: activity
    }
}
export const orderByPoblacion = (payload) =>{
    return{
        type: ORDER_BY_POBLACION,
        payload
    }
}

export const orderAlphabetically = (payload) =>{
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export const getActivities = () =>{
    return async function(dispatch){
        const activitiesDB = await axios.get("http://localhost:3001/activities/");
        const activities = await activitiesDB.data;
        console.log(activities)
        dispatch({
            type: GET_ACTIVITIES,
            payload: activities
        })
    }
    
}
// export const getCountries = () =>{

//     return async function(dispatch){
//         const paisesDB = await axios.get("http://localhost:3001/countries/");
//         console.log(paisesDB);
//         const paises = await paisesDB.data;
//         dispatch({ type: GET_COUNTRIES, payload: paises})
//     }
// }