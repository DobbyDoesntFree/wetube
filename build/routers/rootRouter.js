"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _videoControllers = require("../controllers/videoControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videoControllers.home);
rootRouter.route("/join").all(_middlewares.publicOnlyMiddleware).get(_userController.getJoin).post(_userController.postJoin);
rootRouter.route("/login").all(_middlewares.publicOnlyMiddleware).get(_userController.getLogin).post(_userController.postLogin);
rootRouter.get("/search", _videoControllers.search);
var _default = rootRouter; //다른 js에서 사용 위해 export 필히 해줘야
// default 사용 시 server.js같은 import 한 js에서 변수명 수정 가능(express 역시 default)

exports["default"] = _default;