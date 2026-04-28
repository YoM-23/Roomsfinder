// GET /api/user/
export const getUserData = async (req, res)=>{
    try {
        if (!req.user) {
            return res.json({success: false, message: "User not found"})
        }
        const role = req.user.role;
<<<<<<< HEAD
        const recentSearchedCities = req.user.recentSearchedCities;
=======
        const recentSearchedCities = req.user.recentSearchCities;
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
        res.json({success: true, role, recentSearchedCities})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//Store User Recent Cities
export const storeRecentSearchedCities = async (req, res)=>{
    try {
<<<<<<< HEAD
        const {recentSearchedCity} = req.body;
        const user = await req.user;
=======
        const {recentSearchCity} = req.body;
        const user = req.user;

        if (!user) {
            return res.json({success: false, message: "User not found"})
        }
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save();
        res.json({success: true, message: "city added"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}