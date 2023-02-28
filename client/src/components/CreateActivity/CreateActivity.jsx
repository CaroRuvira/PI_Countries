import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, postActivity} from '../../redux/actions';
import style from './CreateActivity.module.css';


const validate = (input) => {
    let errors = {};
    let difficulty = Number(input.difficulty);
    let duration = Number(input.duration);

    if(!input.name) errors.name = 'Es necesario el nombre';
    else if(/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'El nombre no puede contener caracteres especiales ni tildes' // may, min,num,  no carac.espec, tildes 
     
    if (!input.difficulty) errors.difficulty = 'Campo necesario'
    else if (difficulty <= 0 || difficulty > 5) errors.difficulty = 'La dificultad debe ser un número entre 1 y 5';

    if (!input.duration) errors.duration = 'Campo necesario'
    else if(duration <= 0 || duration > 24) errors.duration = 'La duración debe ser un número entre 1 y 24';

    if(!input.season || input.season === 'vacio') errors.season = 'Campo necesario';


    if (!input.countries || input.countries.length === 0) errors.countries = 'Campo necesario';


    return errors;  

}

 const CreateActivity = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    });

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])


    const handleChange = (event) =>{
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
        setErrors(
            validate({
                ...input,
                [event.target.name] : event.targent.value
            })
        );
        console.log(input)
    }


    const handleSelect = (event) => {
        setInput((estado) => {
          if(event.target.name === 'countries'){
            if(!input.countries.includes(event.target.value)){
                return {
                    ...estado, 
                    countries: [...estado.countries, event.target.value]
                };

            } else {
                alert('No se puede agregar un país dos veces');
                return{
                    ...estado,
                    countries: [...estado.countries]
                }
            }
          } else {
            return {
                ...estado,
                [event.target.name] : event.target.value
            }
          }
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
            return alert ('Por favor complete el formulario antes de enviarlo')
        }

        dispatch(postActivity(input));
        alert ('Actividad creada');
        setInput({
            name: '',
            difficulty : '',
            duration:'',
            season : '',
            countries :[]
        })
    }


    const handleDelete = (event) => {
        setInput({
            ...input,
            countries : input.countries.filter((el) => el !== event)
        })
    }


    return (
        <div className ={style.container}>
            <div className={style.bar}>
                <Link to= '/home'>
                    <button className={style.bothome}> Home </button>
                </Link>
            </div>
            <div className = {style.form}>
                <h2 classNamw ={style.titleform}>Agrega una actividad</h2>
                <form onSubmit = {handleSubmit}>
                    <div>               
                        <label className={style.campos}>Nombre: </label>
                        <input className={style.inputs} type='text' value={input.name} name ='name' onChange={handleChange}/>
                        {errors.name&& <p className={style.errors}>{errors.name}</p>}
                    </div> 

                    <div>
                        <label className={style.campos}>País</label>
                        <select 
                        className={style.inputs} 
                        name='countries' 
                        id='countries' 
                        onChange={handleSelect}>
                        <option></option>
                        {countries.map((el) => (
                            <option value={el.id}>{el.name}</option>
                        ))}
                        </select>
                        {errors.countries && <p className ={style.errors}>{errors.countries}</p>}

                    </div>

                    <div>
                        <label className ={style.campos}>Temporada: </label>
                        <select
                        className = {style.inputs}
                        name = 'season'
                        id = 'season'
                        onChange = {handleSelect}>
                            <option value= 'vacio'></option>
                            <option value= {'Summer'}>Verano</option>
                            <option value = {'Winter'}>Invierno</option>
                            <option value = {'Autumn'}>Otoño</option>
                            <option value = {'Spring'}>Primavera</option>
                        </select>
                        {errors.season && <p className={style.errors}>{errors.season}</p>}
                    </div>

                    <div>
                        <label className = {style.campos}>Dificultad: </label>
                        <input
                        className={style.inputs}
                        type = 'number'
                        value={input.duration}
                        name='duration'
                        onChange={handleChange} />
                        {errors.difficulty && <p className={style.errors}>{errors.difficulty}</p>}
                       
                    </div>

                    <div>
                        <label className={style.campos}>Duración: </label>
                        <input
                        className={style.inputs}
                        type = 'number'
                        value = {input.duration}
                        name = 'duration'
                        onChange={handleChange}
                        />
                        <label className={style.campos}> horas</label>
                        {errors.duration && <p className={style.errors}>{errors.duration}</p>}
                    </div>

                    <div>
                        <button
                        className ={style.buttonSubmit}
                        type= 'submit'
                        disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                    </div>                  

                </form>

                {input.countries.map((e)=> (
                    <div className={style.conpais}>
                        <p className={style.mpais}>{e}</p>
                        <button 
                        classNAme={style.buttonDelete}
                        onClick= {handleDelete}> X {''}</button>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default CreateActivity;



