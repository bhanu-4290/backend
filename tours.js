import express from 'express'
import { createTour, deleteTour,  getAllTours, getFeaturedTours, getSingleTour, getTourBySearch, getTourCount, updateTour } from "./../controllers/tourController.js"
 const router = express.Router()
import { verifyAdmin } from '../utlis/verifyToken.js';

//create new tour
 router.post("/",verifyAdmin, createTour);
//update 
router.put("/:id",verifyAdmin, updateTour);
//delete tour
router.delete("/:id", verifyAdmin,deleteTour);
//get single tour
router.get("/:id", getSingleTour);
//cerate all tour 
router.get("/", getAllTours);

// get tour by serach
router.get("/search/getTourBySearch",getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTours);

// count
router.get("/search/getTourCount", getTourCount);


 export default router;