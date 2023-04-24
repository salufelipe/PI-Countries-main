import { GET_COUNTRIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, ORDER_BY_POBLACION, ORDER_ALPHABETICALLY, GET_ACTIVITIES, RESET, GET_COUNTRY, GET_COUNTRIES_BY_NAME } from "./actions";

const initialState  = {
    // paises: [
    //     {
    //         "id": "BRA",
    //         "name": "Brazil",
    //         "img": "https://flagcdn.com/br.svg",
    //         "continente": "South America",
    //         "capital": "Brasília",
    //         "subregion": "South America",
    //         "area": "8515767",
    //         "poblacion": "212559409"
    //     },
    //     {
    //         "id": "ALA",
    //         "name": "Åland Islands",
    //         "img": "https://flagcdn.com/ax.svg",
    //         "continente": "Europe",
    //         "capital": "Mariehamn",
    //         "subregion": "Northern Europe",
    //         "area": "1580",
    //         "poblacion": "29458"
    //     },
    //     {
    //         "id": "ATA",
    //         "name": "Antarctica",
    //         "img": "https://flagcdn.com/aq.svg",
    //         "continente": "Antarctica",
    //         "capital": "Not Found",
    //         "subregion": null,
    //         "area": "14000000",
    //         "poblacion": "1000"
    //     },
    //     {
    //         "id": "SLB",
    //         "name": "Solomon Islands",
    //         "img": "https://flagcdn.com/sb.svg",
    //         "continente": "Oceania",
    //         "capital": "Honiara",
    //         "subregion": "Melanesia",
    //         "area": "28896",
    //         "poblacion": "686878"
    //     },
    //     {
    //         "id": "AGO",
    //         "name": "Angola",
    //         "img": "https://flagcdn.com/ao.svg",
    //         "continente": "Africa",
    //         "capital": "Luanda",
    //         "subregion": "Middle Africa",
    //         "area": "1246700",
    //         "poblacion": "32866268"
    //     },
    //     {
    //         "id": "ZAF",
    //         "name": "South Africa",
    //         "img": "https://flagcdn.com/za.svg",
    //         "continente": "Africa",
    //         "capital": "Pretoria",
    //         "subregion": "Southern Africa",
    //         "area": "1221037",
    //         "poblacion": "59308690"
    //     },
    //     {
    //         "id": "SVK",
    //         "name": "Slovakia",
    //         "img": "https://flagcdn.com/sk.svg",
    //         "continente": "Europe",
    //         "capital": "Bratislava",
    //         "subregion": "Central Europe",
    //         "area": "49037",
    //         "poblacion": "5458827"
    //     },
    //     {
    //         "id": "KAZ",
    //         "name": "Kazakhstan",
    //         "img": "https://flagcdn.com/kz.svg",
    //         "continente": "Asia",
    //         "capital": "Nur-Sultan",
    //         "subregion": "Central Asia",
    //         "area": "2724900",
    //         "poblacion": "18754440"
    //     },
    //     {
    //         "id": "SPM",
    //         "name": "Saint Pierre and Miquelon",
    //         "img": "https://flagcdn.com/pm.svg",
    //         "continente": "North America",
    //         "capital": "Saint-Pierre",
    //         "subregion": "North America",
    //         "area": "242",
    //         "poblacion": "6069"
    //     },
    //     {
    //         "id": "THA",
    //         "name": "Thailand",
    //         "img": "https://flagcdn.com/th.svg",
    //         "continente": "Asia",
    //         "capital": "Bangkok",
    //         "subregion": "South-Eastern Asia",
    //         "area": "513120",
    //         "poblacion": "69799978"
    //     }
    //     ],
    paises : [],
    paisesAll: [],
    actividades : [{
        "nombre":"Tomar mate",
        "dificultad":"2",
        "duracion":"1",
        "temporada":"Autumn",
        "idPais":["URY", "PRY", "ARG", "SYR", "CHL"]
    },
    {
        "nombre":"Ciclismo",
        "dificultad":"5",
        "duracion":"6",
        "temporada":"Summer",
        "idPais":["FRA", "UNI", "DNK", "KHM", "NOR", "ECU", "PRT", "NLD", "AUT"]
    },
    {
        "nombre":"Parapente",
        "dificultad":"4",
        "duracion":"8",
        "temporada":"Spring",
        "idPais":["ARG", "NPL", "TUR", "NZL", "ESP"]
    },
    {
        "nombre":"Ski",
        "dificultad":"4",
        "duracion":"6",
        "temporada":"Winter",
        "idPais":["CHE", "UNI", "CAN", "ARG", "FRA", "JPN", "CHL", "NZL"]
    },
    {
        "nombre":"Budismo",
        "dificultad":"5",
        "duracion":"2",
        "temporada":"Winter",
        "idPais":["JPN", "URY", "IND", "IOT"]
    }],
    detail: {}
};

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
    case GET_COUNTRIES:
        return {...state, 
            paises: action.payload,
            paisesAll: action.payload};
    case GET_ACTIVITIES: 
    return {...state, 
                actividades: [...state.actividades, action.payload]}
        ;
    case GET_COUNTRIES_BY_NAME:
        return {...state,
                paises: action.payload};
    case GET_COUNTRY:
        return {...state, detail: action.payload};
        
    case FILTER_BY_ACTIVITY:
        const losPaise = state.paisesAll;
        const lasactividades = state.actividades;
        const lactividad = lasactividades.find((actividad)=> actividad.nombre===action.payload);
        const ids = lactividad.idPais;
        
        const paisesPorActividad = action.payload === "" ? state.paisesAll : losPaise.filter((pais)=>{return ids.includes(pais.id)})
            
    return{
        ...state, paises: paisesPorActividad
    };

    case FILTER_BY_CONTINENT:
        const paises = state.paisesAll;
        const paisesFiltered = action.payload === "" ? state.paisesAll : paises.filter(pa => pa.continente === action.payload );
        return{
            ...state, paises: paisesFiltered
    };
    case ORDER_ALPHABETICALLY:
        let orderCountriesByName = action.payload === "asc" ? state.paises.sort((a, b)=>{
            if(a.name < b.name){
                return -1;
            }
            if(a.name > b.name){
                return 1;
            }
            return 0;
        }) :
        state.paises.sort((a, b)=>{
            if(a.name < b.name){
                return 1;
            }
            if(a.name > b.name){
                return -1;
            }
            return 0;
        })
        return {...state,
                    paises: orderCountriesByName};

    case ORDER_BY_POBLACION:
        let orderByPoblacion = action.payload === "asc" ? state.paises.sort((a, b)=>{
            if(Number(a.poblacion) < Number(b.poblacion)){
                return -1;
            }
            if(Number(a.poblacion) > Number(b.poblacion)){
                return 1;
            }
            return 0;
        }) :
        state.paises.sort((a, b)=>{
            if(Number(a.poblacion) < Number(b.poblacion)){
                return 1;
            }
            if(Number(a.poblacion) > Number(b.poblacion)){
                return -1;
            }
            return 0;
        });
        return {...state, paises: orderByPoblacion};
        case RESET:
            return {...state, detail: []}
    default:
        return {...state};
        }

};


export default rootReducer;