export const localsMiddleware = (req,res,next) => {
    
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Utube";
    res.locals.loggedInUser = req.session.user;
    console.log("Session-> "+req.session);
    //console.log(res.locals);
    next();
}