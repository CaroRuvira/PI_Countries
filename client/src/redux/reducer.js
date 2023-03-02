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
    countries : [],
    allCountries : [],
    allActivities: [],
    activities:[],
    detail:{},
    countriesByActivity:[]
   
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
                    allActivities: action.payload
                };

            case ADD_ACTIVITY:
                return{
                    ...state
                };

            case FILTER_BY_CONTINENTS:
           
                const allCountries = state.allCountries;
                const continentFiltered = action.payload === 'All' 
                ? allCountries 
                : allCountries.filter((e) => e.continent === action.payload)
                return{
                    ...state,
                    countries: continentFiltered
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

                const allCountries2 = state.allCountries;

                const alone = allCountries2.filter((country) => {
                    return country.Activities.length > 0;
                });

                let array = [];

                for (let i = 0; i < alone.length ; i++){
                    for(let j = 0; j < alone[i].Activities.length; j++){
                        if (alone[i].Activities[j].name === action.payload){
                            array.push(alone[i])
                        }
                    }
                }

                const filter = action.payload === 'All' ? allCountries2 : array;

                return {
                    ...state, 
                    countries : filter
                };

            case GET_COUNTRIES_QUERY :
                return {
                    ...state,
                    countries : action.payload
                }

                // case FILTER_COUNTRIES:
                //     return {
                //         ...state,
                //         countries:action.payload
                //     }
                    
                    
                    
                    
                    
                    
                    // const {activity, continent} = action.payload;
                    // let filteredCountries= state.allCountries;
                    // if(activity){
                    //     filteredCountries=filteredCountries.filter(country => 
                    //         country.Activities.some(act => act.name === activity)
                    //     );
                    // }
                    // if(continent){
                    //     filteredCountries=filteredCountries.filter(country => 
                    //         country.continent === continent)
                    // }

                    // return{
                    //     ...state,
                    //     filteredCountries
                    // }


                


        default:
            return {...state}
    }
}

export default reducer;