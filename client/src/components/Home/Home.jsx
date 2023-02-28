import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import{
    getCountries,
    filterByContinents,
    orderByName,
    orderByPopulation,
    filterByActivity,
    getActivities
} from '../../redux/actions';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import NavBar from '../NavBar/NavBar';
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.allActivities);

    const [order, setOrder] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    let [countriesPerPage, setCountriesPerPage] = useState(10);

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirtsCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirtsCountry, indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const handleFilteredCountries = (event) => {
        dispatch(filterByContinents(event.target.value))
    }

    const handleSort = (event) => {
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    const handleSortPopulation = (event) => {
        dispatch(orderByPopulation(event.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${event.target.value}`)
    }

    const handleFilterActivity = (event) => {
        event.target.value === 'none'
        ? dispatch(getCountries())
        : dispatch(filterByActivity(event.target.value))
        setCurrentPage(1)
    }

    return (
        <div className = {style.prindiv}>
            <div>
                <NavBar setCurrentPage={setCurrentPage} />
            </div>

            <div className ={style.filters}>
                <div>
                    Orden Alfabético
                    <select className = {style.select} onChange={handleSort}>
                        <option></option>
                        <option value = 'asc'>Ascendente</option>
                        <option value = 'desc'>Descendente</option>
                    </select>
                </div>
                <div>
                    Número de habitantes
                    <select className ={style.select} onChange={handleSortPopulation}>
                        <option></option>
                        <option value='bigPop'>Menor a Mayor</option>
                        <option value = 'smallPop'>Mayor a Menor</option>
                    </select>
                </div>

                <div>
                    Buscar por Continentes
                    <select className = {style.select} onChange={handleFilteredCountries}>
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
                    : (<select className ={style.select} onChange={handleFilterActivity}>
                        <option value ='none'></option>
                        {activities.map((e) => (
                            <option value = {e.name} key = {e.id}>{e.name}</option>
                        ))}

                    </select>)}
                </div>
            </div>

            <div className={style.containerCards}>
                {currentCountries.length ? (
                    currentCountries.map((country) =>{
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
            />

        </div>
    </div>
    )
}
export default Home;

