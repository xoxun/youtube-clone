import Video from "../models/Video";

export const home = async(req,res)=> {
    try{
        const videos = await Video.find({});
        return res.render("home",{pageTitle: "Home", videos});
        
    }catch{
        //database를 불러오는데 에러가 있다면 이 구문이 출력된다.
        return res.render("server-error");
    }
    
};  //rendering 'home.pug' 

export const watch = (req,res)=> {
    //const id = req.params.id;
    const { id } = req.params;
    res.render("watch",{pageTitle: `Watching`});
};

export const getEdit = (req,res)=> {
    const { id } = req.params;
    const video = videos[id-1];
    res.render("edit",{pageTitle: `Editing:`})
};

export const postEdit = (req,res)=> {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req,res)=> {
    return res.render("upload",{pageTitle: `Upload Video`});
};

export const postUpload = async(req,res)=> {
    const {title, description,hashtags } = req.body;
    //console.log(req.body);
    try{
        await Video.create({
        title: title,
        description:description,
        createdAt : Date.now(),
        hashtags: hashtags.split(",").map(word =>`#${word}`),
        });
        return res.redirect("/");
    } catch(error){
        return res.render("upload",{pageTitle: `Upload Video`,errorMessage: error._message});
    }
    
};
