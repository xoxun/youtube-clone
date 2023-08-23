import express from "express";

const PORT = 7777;

const app = express(); //App 생성!

//App 설정 ------

app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/about", (req, res) => res.send("<h1>About</h1>"));
app.get("/contact", (req, res) => res.send("<h1>Contact</h1>"));
app.get("/login", (req, res) => res.send("<h1>Login</h1>"));

//App 보여주기 ! ------
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
