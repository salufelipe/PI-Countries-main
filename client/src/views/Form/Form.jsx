import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector,  } from "react-redux";
import style from "./Form.module.css";
import { getActivities } from "../../redux/actions";

// import { useEffect } from "react";
// import 

const Form = () =>{

    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(getCountries());
    // },[dispatch])

    const paises = useSelector(state=>state.paises)
    const dispatch = useDispatch();

    
        

    const [form, setForm ]= useState({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        paises:[],
    })
    
    const [errors, setErrors ]= useState({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        paises:[],
    })

    

    const changeHandler = (event) =>{
        const property = event.target.name;
        const value = event.target.value;
        // validate({...form, 
        //     [property]: value});

        setForm({...form, 
                [property]: value})

    };
    
    const submitHandler = (event) =>{
            event.preventDefault();
            const {nombre, dificultad, duracion, temporada, paises} = form;
            if(!nombre.length || !dificultad || !duracion || !temporada || !paises.length){
                alert("Debe completar todos los campos")
            }else{
            console.log(form);
            axios.post("http://localhost:3001/activities/", form)
            .then(res=>alert("Actividad creada con éxito"))
            .catch(err=> alert(err))
            dispatch(getActivities());
    }}

    const dificultadesM = (a) => {
        switch(a){
            case "1": return "1, para todo público";
            case "2": return "2, actividad tranqui";
            case "3": return "3, dificultad normal";
            case "4": return "4, dificultad alta, cuidado";
            case "5": return "5, bajo tu propio riesgo";
            default: return "";

        }
    }

    const paisesHandler = (event) =>{
        if(form.paises.includes(event.target.value)){
            setErrors({...errors, paises: "País ya seleccionado"})
        }else{
        setForm({...form, paises:[...form.paises, event.target.value]})
        setErrors({...errors, paises:""})
    }}

    // const addCountry = () =>{

    // }
    
    const deleteForm = () =>{
        setForm({
            nombre:"",
            dificultad:"",
            duracion:"",
            temporada:"",
            paises:[],
        })
        setErrors({
            nombre:"",
            dificultad:"",
            duracion:"",
            temporada:"",
            paises:[],
        })
    }
    
    return(
        <form onSubmit={submitHandler} className={style.container}>
            <div className={style.label}>
            <label >Nombre: </label>
            <input className={style.input} name="nombre" type="text" value={form.nombre} onChange={changeHandler}/>
            {errors.nombre && <span>{errors.nombre}</span>}
            </div>
            

            
            <div className={style.label}>
            <label >Duración: </label>
            <input name="duracion" type="range" min="1" max="24" value={form.duracion} onChange={changeHandler}/>
            {form.duracion && <><br/><label>{form.duracion}:00 horas</label></>}
            {/* <input name="duracion" type="text" value={form.duracion} onChange={changeHandler}/> */}
            </div>

            <div  className={style.label}>
            <label>Dificultad: </label>
            <input name="dificultad" type="range" min="1" max="5" value={form.dificultad} onChange={changeHandler}/>
            {errors.dificultad && <span>{errors.dificultad}</span>}
            {form.dificultad && <><br/><label>{dificultadesM(form.dificultad)}</label></>}
            </div>

            <div>
            <label className={style.label}>Temporada: </label>
                <select className={style.select} name="temporada" value={form.temporada} onChange={(e)=>changeHandler(e)}>
                <option value="">Temporadas</option>
                <option value="Summer">Verano</option>
                <option value="Autumn">Otoño</option>
                <option value="Winter">Invierno</option>
                <option value="Spring">Primavera</option>
                </select>
                </div>


            <div className={style.label}>
            <label>Países: </label>
            <select  className={style.select} name="paises" onChange={(e)=>paisesHandler(e)}>
                <option value="">Elija país/es</option>
                {paises.map(pais=>{
                return <option value={pais.id} key={pais.id}>{pais.name}</option>
                })}
            </select>
            {errors.paises && <span>{errors.paises}</span>}
            </div>
            
            <button className={style.button} type="reset" onClick={deleteForm}>BORRAR TODO</button>
            <button className={style.button} type="submit">CREAR</button>
            
        </form>
    )
}

export default Form;