import User from "../models/User";
import bcrytp from "bcrypt";


export const getJoin = (req,res)=> {

    return res.render("join", {pageTitle: "Join "});
};
export const postJoin = async(req,res)=> {
    const { name, username, email, password, password2, location } = req.body;
    const exists = await User.exists({ $or: [{username},{email}] });
    const pageTitle = "Join";
    
    if(password !== password2){
        return res.status(400).render("join", {pageTitle, errorMessage: "Password confirmation dose not match."});
    }
    if(exists) {
        return res.status(400).render("join", {pageTitle, errorMessage: "This username/email is already taken."});
    }
    try{
        await User.create({
            name, 
            username, 
            email, 
            password, 
            location
        });
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join", {pageTitle: "Join", errorMessage: error._message});
    }
    
};
export const edit = (req,res)=> res.send("Edit User");
export const remove = (req,res)=> res.send("Remove User");

export const getLogin = (req,res)=>{
    
    return res.render("login", { pageTitle:"Login", });
};
export const postLogin = async(req,res)=>{
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login", { 
            pageTitle, 
            errorMessage:"An account with this username does not exists."
        });
    }
    const ok = await bcrytp.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", { 
            pageTitle, 
            errorMessage:"Wrong password."
        });
    }
    console.log("Log User In!");

    //세션에 정보 추가하기
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const startGithubLogin = (req,res)=>{
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = {
        client_id : "860d3fb2d3ce76b2dc76",
        allow_signup : false,
        scope : "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const finishGithubLogin = (req,res)=> {
    
};

export const logout = (req,res)=>res.send("Log Out");
export const see = (req,res)=>res.send("See");

