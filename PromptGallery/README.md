# PromptGallery Documentation

## Objective

The purpose of the PromptGallery application is to allow users to upload their generated images and keep track of the prompts used to create each image.

## Entities and Their Relationships

### User
- `_id`: Unique identifier
- `name`: User's name
- `email`: User's email address
- `password`: User's password

### Media
- `_id`: Unique identifier
- `user`: The uploader of the media
- `file_name`: The name of the uploaded file
- `prompt`: The prompt used to generate the image

## Use Cases

### User
- Add image
- Delete image
- Modify image
- List images
- Logout

### Visitor
- Login
- Registration
- Forgot password

## Screens

1. **Login Screen**: Where users can log into the application.
2. **Register Screen**: Where new users can register.
3. **Forget Password Screen**: Where users can request a new password.
4. **Default Screen**
    - Listing images
    - Deleting or modifying an image
    - Uploading a new image
5. **Modification**

## Route



```
// Middleware to render a specific view
renderMW = (viewfile) => {
    return (req, res, next) => {
        res.render(viewfile, req.locals);
    }
}
```
```
// Middleware for inverse authentication
inverseAuthMW = {
    // Redirects to /images if already logged in
    if (req.session.user) {
        res.redirect('/images');
    } else {
        next();
    }
}
```
```
// Middleware for handling login
loginMW = {
    // Proceeds if no POST request is made
    if (!req.method === 'POST') {
        next();
    } else if (req.body.username && req.body.password) {
        // Checks if the database has the user with the provided password
        if (/* database query for user and password match */) {
            // If correct, store user in session and redirect
            req.session.user = /* user data */;
            res.redirect('/images');
        } else {
            // If incorrect, pass error to locals and call next middleware
            req.locals.error = 'Incorrect username or password';
            next();
        }
    }
}
```
```
// Middleware for handling registration
regMW = {
    // Proceeds if no POST request is made
    if (!req.method === 'POST') {
        next();
    } else if (req.body.username && req.body.password) {
        // Process registration logic here
        // Add user to database, etc.
        next();
    }
}
```
```
// Middleware for handling new password requests
newPwMW = {
    // Proceeds if no POST request is made
    if (!req.method === 'POST') {
        next();
    } else if (req.body.username && req.body.password) {
        // Overwrite password in database and log the action
        console.log('Password updated for user:', req.body.username);
        // Update database with new password
        next();
    }
}
```
```
// Middleware for authentication
authMW = {
    // Checks if the user is logged in
    if (!req.session.user) {
        // If not logged in, redirect to login page
        res.redirect('/login');
    } else {
        // If logged in, proceed to the next middleware
        next();
    }
}
```

**renderMW**

renderMW = (filename) =>{
    return (req,res,next) => {
        res.render(viewfile, req.locals);
    }
}
**inverseAuthMW**

inverseAuthMW: -redirect when logged in if() logged in
        - redirect to /images 
        -else next()
**loginMW**

loginMW:
    if there is no POST, 
        -call next()
    2 form field (req.bofy.username && req.body.password)
        if database hase user with password 
            same in the database
        -> correct
            store in sesion
            redirect to /images
        -> incorrect
            req.locals = {error: 'incorrect'}
            else next()

**regMW**

regMW:
    if there is no POST, (username pw)
        -call next()
    
**NewPwMW**

newPwMW:
    if there is no POST, (username pw)
        -call next()
    databaseb overwrite, console log


**authMW**

authMW:
    // Checks if the user is logged in
    If not logged in, redirect to login page
    // If logged in, proceed to the next middleware
    next();
    
**getImagesMW**

getImagesMW: getting loged in users data from db
    db.find(user_id: req.session.user_id),(err,data) =>{
        req.locals.image = data;
        return next();
    }

**saveImageMW**

saveImageMW:
    if there is no POST 
        - redirect (/images/new)
        save to database redirect to /images


**getImageMW()**

getImageMW(): - in url get the image id and from session userid with these data get image fro database 
    if there is no image redirect to /images
    -save a res.locals.image + next


**delImage**

delImageMW():



    (GET | POST)                           log sreen
        inverseAuthMW()
        loginMW()
        renderMW('login.html')

------------
    (GET | POST) /register                   register screen
        inverseAuthMW()
        regMW()
        renderMW('reg.html')
   
------------
    (GET | POST) /newpw                      im dumb forgetr pw
        inverseAuthMW()
        newPwMW()
        renderMW('newpw.html')

------------
    GET /images                     dashboard - session
        authMW()
        getImageMW()
        renderMW('images_list.html')
------------      
    
    GET  /images/new                 new image
        authMW()
        renderMW('new_image_page.html')
    POST /images/new                 new image
        authMW()
        saveImageMW()
------------    
    GET /image/edit/:image_id       edit image
        authMW()
        getImageMW()
        renderMW('edit_image_page.html')

    POST /image/edit/:image_id       edit image  
        authMW()
        getImageMW()
        saveImageMW()
        

------------
    GET /image/del/:image_id        del image (redirect)
        authMW()
        delImageMW()

------------
    GET /logout
        authMW()
        logoutMW()


## Data and Relationships

Navigation between pages will be ensured so that users can easily access different features. Following user interactions, the data stored in the database will be updated, enabling the display and management of dynamic content.
