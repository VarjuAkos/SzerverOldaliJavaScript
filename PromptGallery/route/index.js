const renderMW = require('../middleware/renderMW');

const regMW = require('../middleware/user/regMW');
const newPwMW = require('../middleware/user/newPwMW');
const getUserMW = require('../middleware/user/getUserMW');

const getImagesMW = require('../middleware/image/getImagesMW');
const getImageMW = require('../middleware/image/getImageMW');
const delImageMW = require('../middleware/image/delImageMW');
const saveImageMW = require('../middleware/image/saveImageMW');
const editImageMW = require('../middleware/image/editImageMW');

const authMW = require('../middleware/auth/authMW');
const logoutMW = require('../middleware/auth/logoutMW');
const loginMW = require('../middleware/auth/loginMW');

const ImageModel = require('../model/image');
const UserModel = require('../model/user');

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + uniqueSuffix +".png")
    }
})

const upload = multer({ dest: 'uploads/',storage})

module.exports = function (app) {
    const objectRepository = {
        ImageModel: ImageModel,
        UserModel: UserModel
    };

    app.get('/dashboard/:userid/image/del/:imageid',
        getUserMW(objectRepository),
        delImageMW(objectRepository),
        renderMW(objectRepository,"dashboard")
    )

    app.get('/dashboard/:userid/image/edit/:imageid',
        getUserMW(objectRepository),
        getImageMW(objectRepository),
        renderMW(objectRepository,"edit")
    )

    app.post('/dashboard/:userid/image/edit/:imageid',
        getUserMW(objectRepository),
        getImageMW(objectRepository),
        editImageMW(objectRepository),
        renderMW(objectRepository,"dashboard")
    )

    app.get("/dashboard/:userid/image/new",
        getUserMW(objectRepository),
        renderMW(objectRepository,"new-image")
    )

    app.post("/dashboard/:userid/image/new",
        getUserMW(objectRepository),
        upload.single('image'),
        saveImageMW(objectRepository),
        renderMW(objectRepository,"dashboard")
    )

    app.get('/login',
        renderMW(objectRepository,"login")
    );

    app.post('/login',
        loginMW(objectRepository),
        renderMW(objectRepository,"dashboard")
    )

    app.get('/register',
        renderMW(objectRepository,'register')
    );

    app.post('/register',
        regMW(objectRepository),
        renderMW(objectRepository, 'register')
    );
    app.get('/forgotpw',
        renderMW(objectRepository,"forgotpw")
    );

    app.post('/forgotpw',
        newPwMW(objectRepository),
        renderMW(objectRepository, 'forgotpw')
    );

    app.use('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository, 'login')
    );

    app.get('/dashboard/:userid',
        getUserMW(objectRepository),
        getImagesMW(objectRepository),
        renderMW(objectRepository,'dashboard')
    );
};
