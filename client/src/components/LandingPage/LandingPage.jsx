import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className ={style.containerPrin}>
            <div className={style.landing}>
                <h1 className={style.text}>Bienvenido! Encuentra tu próximo destino!</h1>

                <div className ={style.welcome}>
                    <Link to = '/home'>
                        <button className={style.button}>INGRESAR</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default LandingPage;