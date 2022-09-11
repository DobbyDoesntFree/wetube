import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const handleOpen = () => console.log("Connected to db");
const db = mongoose.connection;
db.on("error", (error) => console.log("DB Error", error)); //error 발생마다 console log. 여기서 error는 event 같은 기본제공 변수.
db.once("open", handleOpen); //시작 시 1회 동작
