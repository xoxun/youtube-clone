import Video from "../models/Video";

export const home = async(req,res)=> {
    try{
        const videos = await Video.find({}).sort({createdAt:"desc"});
        return res.render("home",{pageTitle: "Home", videos});
        
    }catch{
        //database를 불러오는데 에러가 있다면 이 구문이 출력된다.
        return res.render("server-error");
    }
    
};  //rendering 'home.pug' 

export const watch = async(req,res)=> {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video){
        return res.render("watch",{pageTitle: video.title, video});
    }
    return res.render("404",{pageTitle: "Video not found."});
};

export const getEdit = async(req,res)=> {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle: "Video not found."})
    }  //에러처리를 먼저 해줌
    return res.render("edit",{pageTitle: `Editing: ${video.title}`, video})
};

export const postEdit = async(req,res)=> {
    const { id } = req.params;
    const { title,description, hashtags } = req.body;
    const video = await Video.exists({ _id: id});
    if(!video){
        return res.render("404",{pageTitle: "Video not found."})
    } 
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req,res)=> {
    return res.render("upload",{pageTitle: `Upload Video`});
};

export const postUpload = async(req,res)=> {
    const {title, description,hashtags } = req.body;
    try{
        await Video.create({
        title: title,
        description:description,
        createdAt : Date.now(),
        hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error){
        return res.render("upload",{pageTitle: `Upload Video`,errorMessage: error._message});
    }
    
};

export const deleteVideo = async(req,res)=>{
    const { id } = req.params; console.log(id);
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async(req,res)=>{
    const { keyword } = req.query; console.log("Should search for->",keyword);
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title: {
                $regex:new RegExp(keyword,"i")
            },
        });
    }
    return res.render("search",{pageTitle: `Search Video`,videos});
};