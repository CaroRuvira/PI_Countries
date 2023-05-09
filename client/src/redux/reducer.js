import {
    GET_ACTIVITIES,
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_NAME,
    GET_COUNTRY_DETAIL,
    ADD_ACTIVITY,
    FILTER_BY_CONTINENTS,
    ORDER_COUNTRIES_ALF,
    ORDER_COUNTRIES_POP,
    FILTER_BY_ACTIVITIES,
    GET_COUNTRIES_QUERY,


} from './action-types'


const initialState = {
    countries : [],  // se va modificando
    allCountries : [], // no se modifica
    allActivities: [], // no se modifica
    activities:[], // se va modificando
    detail:{},
    filterActivity:'All',
    filterContinent: 'All'
   
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };

            case GET_COUNTRY_DETAIL:
                return {
                    ...state,
                    detail: action.payload
                }
            case GET_COUNTRY_BY_NAME:
                let country = action.payload === "" 
                ? state.allCountries 
                : state.countries.filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()));
                return{
                    ...state,
                    countries: country
                };
            case GET_ACTIVITIES:
                return{
                    ...state,
                    activities:action.payload,
                    allActivities: action.payload
                };

            case ADD_ACTIVITY:
                return{
                    ...state
                };

            case FILTER_BY_CONTINENTS:
           
                const allCountries = state.allCountries;
                let continentFiltered = action.payload === 'All' 
                ? allCountries 
                : allCountries.filter((e) => e.continent === action.payload)

                if(state.filterActivity !== 'All'){
                    continentFiltered= continentFiltered.filter((e) => 
                    e.Activities.find(a => a.name === state.filterActivity))
                }
                return{
                    ...state,
                    countries: continentFiltered,
                    filterContinent : action.payload
                };

            case ORDER_COUNTRIES_ALF :
                let sortedArr = action.payload === 'asc'
                ? state.countries.sort(function (a, b) {
                    if (a.name > b.name){
                        return 1
                    }
                    if (b.name > a.name){
                        return -1
                    }
                    return 0;
                })
                : state.countries.sort (function(a, b ) {
                    if (a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    countries : sortedArr
                };

            case ORDER_COUNTRIES_POP :
                let sortedArrPop = action.payload === 'bigPop'
                ? state.countries.sort(function(a, b) {
                    if(a.population > b.population){
                        return 1;
                    }
                    if (b.population > a.population){
                        return -1;
                    }
                    return 0;
                })
                : state.countries.sort(function(a, b) {
                    if(a.population > b.population){
                        return -1;
                    }
                    if (b.population > a.population){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries : sortedArrPop
                };

            case FILTER_BY_ACTIVITIES:                   

                let countriesActivities = state.allCountries;

                if(state.filterContinent !== 'All'){
                    countriesActivities = countriesActivities.filter(e => e.continent === state.filterContinent)
                }

                const activityFiltered = action.payload === 'All'
                ? countriesActivities
                : countriesActivities.filter((e) => e.Activities && e.Activities.find(a => a.name === action.payload))
                
                return{
                    ...state,
                    countries:activityFiltered,
                    filterActivity:action.payload 
                }

            case GET_COUNTRIES_QUERY :
                return {
                    ...state,
                    countries : action.payload
                }

                

        default:
            return {...state}
    }
}

export default reducer;