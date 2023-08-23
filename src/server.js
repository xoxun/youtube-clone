import express from "express";
import morgan from "morgan"; //미들웨어 설치해 사용하기

const PORT = 7777;
const date = new Date();

const app = express(); //App 생성!
const logger = morgan("dev"); //

//App 설정 ------


const urlLogger = (req,res,next)=>{
  console.log(`Path: ${req.path}`);
  next();

};
const timeLogger = (req,res,next)=>{
  console.log(`Time: ${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
  next();
};

const securityLogger = (req,res,next)=>{
  const protocol = req.protocol;
  if(protocol ==='https'){
    console.log("Secure");
  }else{
    console.log("Insecure");
  }
  next();
};
const protectorMiddleware = (req,res,next)=>{
  const url = req.url;
  if(url==="/protected"){
    return res.send("<h1>Not Allowed!✖️</h1>");
  }
  next();
};

const home = (req,res)=>{
  return res.send("<h1>Home</h1>");
};
const privateHome = (req,res)=>{
  return res.send("<h1>Private Home</h1>");
}

app.use(urlLogger,timeLogger,securityLogger,protectorMiddleware);
app.get("/",home);
app.get("/protected",privateHome);

//App 보여주기 ! ------
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
