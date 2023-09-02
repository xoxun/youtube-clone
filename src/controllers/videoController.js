let videos = [
    {
        title: "First Video",
        rating: 5,
        comments:2,
        createAt:"2 minuates ago",
        views:90,
        id: 1,
    },{
        title: "Second Video",
        rating: 5,
        comments:2,
        createAt:"2 minuates ago",
        views:90,
        id: 2,
    },{
        title: "Third Video",
        rating: 5,
        comments:2,
        createAt:"2 minuates ago",
        views:90,
        id: 3,
    },
];


export const trending = (req,res)=> {
    res.render("home",{pageTitle: "Home", videos})
};  //rendering 'home.pug' 

export const watch = (req,res)=> {
    //const id = req.params.id;
    const { id } = req.params;
    const video = videos[id-1];
    res.render("watch",{pageTitle: `Watching ${video.title}`, video});
};

export const getEdit = (req,res)=> {
    const { id } = req.params;
    const video = videos[id-1];
    res.render("edit",{pageTitle: `Editing: ${video.title}`, video})
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

export const postUpload = (req,res)=> {
    // here we will add a video to the videos array.
    console.log(req.body);
    const newVideo = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createAt:" 0 minuates ago",
        views:0,
        id: videos.length+1,
    };
    videos.push(newVideo);
    return res.redirect("/");
};
