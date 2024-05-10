const requireOption = require('../requireOptions');

module.exports = function (objectRepository) {
    const UserModel = requireOption(objectRepository, 'UserModel');
    return async function regMW(req, res, next) {

        const {username, email, password, confirmPassword} = req.body;

        const user = await UserModel.findOne({
            username: username
        })
        console.log(user)
        if (user != null) {
            console.log("hékás van már iylen felhasznaló nem kene regisztrálni megegyszer, probálj belépni")
            return res.redirect("/login")
        } else {
            res.locals.user = new UserModel();
            res.locals.user.username = username
            res.locals.user.password = password
            res.locals.user.email = email

            try {
                await res.locals.user.save();
                console.log(`/dashboard/${res.locals.user._id}`);
                return res.redirect(`/dashboard/${res.locals.user._id}`);
            } catch (err) {
                return next(err);
            }
        }
    };
};