import Card from "./DetailCard/DetailCard";
import style from "./Detail.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { restartDetail, getCountry } from "../../redux/actions";
//!esto no está funcionando pero no puedo  mas
const Detail = () =>{

    const dispatch = useDispatch();
    // console.log(detailId);
    const {id} = useParams();

    useEffect(()=>{
        dispatch(restartDetail());
        dispatch(getCountry(id))
    }, [dispatch, id])
    
    
    return(
        <div className={style.container}>
            <h1>Esta es la vista del Detail</h1>
            <Card />
        
        
        
        
        
        
        </div>
    )
}

export default Detail;