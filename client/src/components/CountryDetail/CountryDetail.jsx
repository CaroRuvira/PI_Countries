import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCountriesDetail} from '../../redux/actions';
import style from './CountryDetail.module.css';

const CountryDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const country = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getCountriesDetail(id))
    }, [dispatch, id]);

    return (
        <div className ={style.container}>
            <div className={style.barra}>
                <Link to='/home'>
                    <button className={style.butthome}>Home</button>
                </Link>
            </div>

            <div className={style.card}>
                <div className={style.withcountry}>
                    <h2 className= {style.titulo}> Más información sobre el país </h2>
                    {
                        country ?
                        <div> 
                            <img className ={style.flag} src ={country.flag} alt ='No se pudo cargar la imagen'></img>
                            <h2 className={style.name}>{country.name}</h2>
                            <h4 className={style.continent}>{country.continent}</h4>
                            <h4 className={style.id}>{country.id}</h4>
                            <h4 className={style.detail}>Capital : {country.capital}</h4>
                            <h4 className={style.detail}>Sub Región : {country.subregion}</h4>
                            <h4 className={style.detail}>Área: {country.area}</h4>
                            <h4 className={style.detail}>Población : {country.population} habitantes</h4>

                        </div> : <p>Loading...</p>
                    }
                </div>

                <div className = {style.withactivities}>
                    <h3 className={style.titulo}>Actividades para realizar en el país</h3>
                    {
                        country.Activities && country.Activities.length ? 
                            country.Activities.map(e => {
                            return (
                                <div>
                                    <h4 className={style.nameact}>{e.name}</h4>
                                    <p className={style.detail}>Dificultad: {e.difficulty}</p>
                                    <p className={style.detail}>Duración: {e.duration}</p>
                                    <p className={style.detail}>Temporada: {e.season}</p>
                                </div>
                            )
                        
                        })
                        : <p> No existen actividades para este país</p>
                    }
                    {/* <Link to = "/activities"><button className={style.createact}>Crear Actividad</button></Link> */}


                </div>

            </div>
        </div>
    )
}
export default CountryDetail;