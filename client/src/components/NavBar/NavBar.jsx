import {React, useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getCountries, getCountryByName } from "../../redux/actions";
import style from './NavBar.module.css';

const NavBar = ({setCurrentPage}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const handleInputChange = (event) => {
        dispatch(getCountryByName(event))
        setCurrentPage(1)
    }

    return (
        <div className = {style.navbar}>
         

          <div className = {style.containerSearch}>
            <div className ={style.search}>
                <div className ={style.searchTitle}>Encuentra el destino para tu próximo viaje</div>
                    <input 
                    className = {style.searchInput}
                    value = {name}
                    type = 'text'
                    placeholder="Qué país deseas visitar..."
                    onChange = {(event) => {setName(event.target.value); handleInputChange(event.target.value)}} />

            </div>
            <div className ={style.containerActivities}>
                <Link to = '/activities'>
                    <button className ={style.buttActiv}>Crear Actividad</button>
                </Link>
            </div>

          </div>

        </div>
    )
}

export default NavBar;
