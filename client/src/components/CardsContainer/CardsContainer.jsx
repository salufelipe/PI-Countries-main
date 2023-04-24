import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainter.module.css";
import Paginado from "./Paginado";
import { filterByContinent, orderByPoblacion, orderAlphabetically, filterByActivity } from "../../redux/actions";



const CardsContainer = () =>{
   
    const actividades = useSelector(state=>state.actividades);

	const paises = useSelector(state=>state.paises);
    const dispatch = useDispatch();
    
    
    const [orden, setOrden] = useState('');
    const [paginaActual, setPaginaActual]  = useState(1);
    const [paisesPagina, setPaisesPagina] = useState(10);
    const indexLastPais = paginaActual * paisesPagina;
    const indexPrimerPais = indexLastPais - paisesPagina;
    const paisesPActual = paises.slice(indexPrimerPais, indexLastPais);

    
    const paginado = (numeroPagina) =>{
        setPaginaActual(numeroPagina);
    }

    function handleFilterContinent(event){
        dispatch(filterByContinent(event.target.value))
        setPaginaActual(1);
    }
    function handleFilterActivities(event){
        dispatch(filterByActivity(event.target.value));
        setPaginaActual(1);
    }

    function handleSortPob(event){
        dispatch(orderByPoblacion(event.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${event.target.value}`);
    
    }
    function handleSortAlp(event){
        dispatch(orderAlphabetically(event.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${event.target.value}`);
    }

return(
        <div className={style.container} >
        <nav className={style.containerFilter}>
    {/* <span className={style.orden}>Ordenamiento:</span> */}

<select className={style.select} onChange={(e)=>handleFilterContinent(e)}>
    <option value="" >Continente</option>
    <option value="South America" >South America</option>
    <option value="North America" >North America</option>
    <option value="Antarctica" >Antarctica</option>
    <option value="Europe" >Europe</option>
    <option value="Oceania" >Oceania</option>
    <option value="Asia" >Asia</option>
    <option value="Africa" >Africa</option>
</select>

<select className={style.select} 
onChange={(e)=>handleFilterActivities(e)}
 >
            <option value="" >Actividades</option>
              {actividades.map(actividad=>{
                return <option value={actividad.id} key={actividad.id}>{actividad.nombre}</option>
                })}
</select>

<select className={style.select} onChange={(event)=>handleSortAlp(event)}>
    <option value="">Alfabético</option>
    <option value="asc">A-Z</option>
    <option value="desc">Z-A</option>
</select>


<select className={style.select} onChange={(event)=>handleSortPob(event)}>
    <option value="">Población</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
</select>
            </nav>
        
        {paisesPActual.map(pais=>{
            return <Card
            key={pais.id}
            id={pais.id}
            name={pais.name}
            continente={pais.continente}
            img={pais.img}
            />
        })}

        <Paginado
        paisesPagina={paisesPagina}
        paises={paises.length}
        paginado={paginado}
        
        className={style.paginado}/>

        </div>
    )
}
export default CardsContainer;