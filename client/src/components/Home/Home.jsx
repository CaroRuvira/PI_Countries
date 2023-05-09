import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import{
    getCountries,
    filterByContinents,
    orderByName,
    orderByPopulation,
    filterByActivity,
    getActivities,

} from '../../redux/actions';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch(); // para ir despachando mis acciones
    const allCountries = useSelector((state) => state.countries); // trae del reducer el state countries
    const activities = useSelector((state) => state.allActivities); //trae del reducer el state allActivities
    const [order, setOrder] = useState('');
    const[filters, setFilters] = useState({
        continent:"",
        population:"",
        name:"",
        activity:""
    })
    const[initialFilters, setInitialFilters] = useState({
        continent:"",
        population:"",
        name:"",
        activity:""
    })

    const [currentPage, setCurrentPage] = useState(1); // state con pag actual, y que me setea la pag actual
    const [countriesPerPage, setCountriesPerPage] = useState(10); // state cuántos por pág
    const indexOfLastCountry = currentPage * countriesPerPage; //const es el indice del ultimo country que tengo en la página
    const indexOfFirtsCountry = indexOfLastCountry - countriesPerPage; // indice del primer personaje 
    const currentCountries = allCountries.slice(indexOfFirtsCountry, indexOfLastCountry); // countries que estan en la current page, desde el 1 count hasta el ult count
                                                         
    const paginado = (pageNumber) => { //declaro una const paginado, le paso un numero de pagina, y
        setCurrentPage(pageNumber)     //seteo la pag actual con ese num de pag
    };

    useEffect(() => {
        dispatch(getCountries()); // despacho la action
        dispatch(getActivities());
    }, [dispatch])

    const handleContinentFilter = (event) => {
        
        dispatch(filterByContinents(event.target.value))
        setFilters(event.target.value);
      
    }

    const handleSort = (event) => {
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setFilters(event.target.value)
        
        setOrder(`Ordenado ${event.target.value}`)
    }

    const handleSortPopulation = (event) => {
        dispatch(orderByPopulation(event.target.value))
        setCurrentPage(1)
        setFilters(event.target.value)
        setOrder(`Ordenado ${event.target.value}`)
    }

    const handleFilterActivity = (event) => {
      dispatch(filterByActivity(event.target.value))
        setCurrentPage(1)
        setFilters(event.target.value)
    }

    const resetFilters = () => {
        setFilters(initialFilters)
        dispatch(getCountries());
        setFilters(initialFilters)
        setCurrentPage(1);
        setOrder('')
      
    }

    return (
        <div className = {style.prindiv}>
            <div>
                <NavBar setCurrentPage={setCurrentPage} />
            </div>

            <div className ={style.filters}>
                <div>
                    Orden Alfabético
                    <select className = {style.select} onChange={handleSort} value ={filters.name}>
                        <option value ='None'> </option>
                        <option value = 'asc'>A-Z</option>
                        <option value = 'desc'>Z-A</option>
                    </select>
                </div>
                <div>
                    Número de habitantes
                    <select className ={style.select} onChange={handleSortPopulation} value ={filters.population}>
                        <option></option>
                        <option value='bigPop'>Menor a Mayor</option>
                        <option value = 'smallPop'>Mayor a Menor</option>
                    </select>
                </div>

                <div>
                    Buscar por Continentes
                    <select className = {style.select} onChange={handleContinentFilter} value={filters.continent}>
                        <option value ='All'>Todos</option>
                        <option value ='South America'>América del Sur</option>
                        <option value ='North America'>América del Norte</option>
                        <option value = 'Africa'>África</option>
                        <option value='Asia'>Asia</option>
                        <option value ='Europe'>Europa</option>
                        <option value = 'Oceania'>Oceanía</option>
                        <option value = 'Antarctica'>Antártica</option>

                    </select>
                </div>

                <div>
                    Buscar por Actividad
                    {activities.length === 0 
                    ? (<p>No se han creado Actividades</p>)
                    : (<select
                     className ={style.select} 
                     onChange={handleFilterActivity}
                     value={filters.activity}>
                        <option value ='All'></option>
                        {activities.map((activity) => (
                            <option value = {activity.name} key = {activity.id}>{activity.name}</option>
                        ))}

                    </select>
                    )}
                </div>
                <div className={style.reset}>
                    
                    <button className={style.buttRes} onClick = {resetFilters}>Clear Filters</button>
                 
                </div>
            </div>

            <div className={style.containerCards}>
                {currentCountries.length ? (       // si hay paises 
                    currentCountries.map((country) =>{   //les hago un map para recorrer el array
                        return (
                            <div className ={style.card}>
                                <Card 
                                flag ={country.flag}
                                name = {country.name}
                                continent = {country.continent}
                                key ={country.id}
                                id ={country.id}
                                />
                                </div>
                        )
                    })
                ) : (
                    <h1>No hay países</h1>
                )}            

        </div>

        <div className ={style.paginado}>
            <Paginado 
            countriesPerPage={countriesPerPage}
            allCountries={allCountries.length}
            paginado = {paginado}
            currentPage={currentPage}
            />

        </div>
    </div>
    )
}
export default Home;

