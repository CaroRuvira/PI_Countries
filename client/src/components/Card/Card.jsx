import React from 'react';
import {Link} from 'react-router-dom';
import style from './Card.module.css';

 const Card = ({flag, name, continent, id}) => {
    return (
        <div className={style.card}>
            <div><img className={style.flag} src={flag} alt='Imagen no disponible'/></div>
            <h3 className={style.nombre}>{name}</h3>
            <h5 className={style.continente}>{continent}</h5>
            <Link to = {`/countries/${id}`}><button className={style.boton}> Ver más </button></Link>

        </div>
    )
}

export default Card;
