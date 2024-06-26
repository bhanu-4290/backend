import User from "../models/User.js";

export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res
            .status(200)
            .json({ success: true, message: 'successfully created', data: savedUser })
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'failed to craete try again ' })
    }
}
//update tour
export const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res
            .status(200)
            .json({ success: true, message: 'successfully created', data: updateUser});
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'failed to craete try again ' })
    }
};
//delete tour 
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
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
export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const User = await User.findById(id);
        res
            .status(202)
            .json({ success: true, message: 'successfully get the single tour data', data: User, });

    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ' })
    }
};

//getall tour
export const getAllUsers = async (req, res) => {

    try {

        const user = await User.find({})
            
        res
            .status(200)
            .json({ success: true, message: 'successfully ', data: user, });

    }
    catch (err) {
        res
            .status(404)
            .json({ success: false, message: 'not found ', });
    }
};
