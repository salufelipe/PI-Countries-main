const {createActivity, getActivities} = require("../controllers/activitiesControllers");

const createActivityHandler = async (req, res)=>{
    
    const {nombre, dificultad, duracion, temporada, idPais } = req.body;
    try {
        const newActivity = await createActivity(nombre, dificultad, duracion, temporada, idPais);
        res.status(201).json("Actividad creada con éxito");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getActivitiesHandler = async (req, res)=>{
    try {
        const results = await getActivities();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createActivityHandler,
    getActivitiesHandler
}