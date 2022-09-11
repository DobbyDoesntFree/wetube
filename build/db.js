"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var handleOpen = function handleOpen() {
  return console.log("Connected to db");
};

var db = _mongoose["default"].connection;
db.on("error", function (error) {
  return console.log("DB Error", error);
}); //error 발생마다 console log. 여기서 error는 event 같은 기본제공 변수.

db.once("open", handleOpen); //시작 시 1회 동작