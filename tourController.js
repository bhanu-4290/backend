import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res
            .status(200)
            .json({ success: true, message: 'successfully created', data: savedTour })
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'failed to craete try again ' })
    }
}
//update tour
export const updateTour = async (req, res) => {
    const id = req.params.id
    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res
            .status(200)
            .json({ success: true, message: 'successfully created', data: updateTour });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'failed to craete try again ' })
    }
};
//delete tour 
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        await Tour.findByIdAndDelete(id);
        res
            .status(200)
            .json({ success: true, message: 'successfully deleted', });

    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'failed to craete try again ' })
    }
};

//getSingle tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id)  .populate('review');
        res
            .status(202)
            .json({ success: true, message: 'successfully get the single tour data', data: tour, });

    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ' })
    }
};

//getall tour
export const getAllTours = async (req, res) => {
    const page = parseInt(req.query.page);

    try {

        const tours = await Tour.find({})
            .populate('review')
            .skip(page * 8)
            .limit(8)
        res
            .status(200)
            .json({ success: true, count: tours.length, message: 'successfully ', data: tours, });

    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ', });
    }
};

//get tours by search 

export const getTourBySearch = async (req, res) => {

    const city = new new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
    try {
        const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } })
        .populate('review')
        res
            .status(200)
            .json({ success: true, message: 'successfully ', data: tours, });
    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ', });
    }
};

// get featured tours
export const getFeaturedTours = async (req, res) => {
const page = parseInt(req.query.page);
    try {

        const tours = await Tour.find({ featured: true })  .populate('review') .limit(8);

        res
            .status(200)
            .json({ success: true, message: 'successfully ', data: tours, });

    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ', });
    }
};

//get tourscount 
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({ success: true, data: tourCount })
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'failed to fetch' })
    }
}


