import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";
import style from "./Home.module.css";


const Home = () =>{

    // const actividades = useSelector(state=>state.actividades);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
         },[dispatch])
         return(
        <>
            
            <h1 className={style.titulo}>Países del mundo</h1>
            <CardsContainer/>
            
        </>
    )
}

export default Home;