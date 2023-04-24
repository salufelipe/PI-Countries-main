const { Router } = require('express');
const { createActivityHandler, getActivitiesHandler } = require("./handlers/activitiesHandlers"); 


const activitiesRouter = Router();




//? GET /activities
//*obtiene un array de objetos actividades

activitiesRouter.post("/", createActivityHandler);

activitiesRouter.get("/", getActivitiesHandler);




module.exports = activitiesRouter;