"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _middlewares = require("./middlewares");

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); //json.stringify로 넘겨도 js object로 변환하는 장치

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;