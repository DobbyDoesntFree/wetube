"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoControllers = require("../controllers/videoControllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/:id([0-9a-f]{24})", _videoControllers.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videoControllers.getEdit).post(_videoControllers.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(_middlewares.protectorMiddleware).get(_videoControllers.deleteVideo);
videoRouter.route("/upload").all(_middlewares.protectorMiddleware).get(_videoControllers.getUpload).post(_middlewares.videoUpload.fields([{
  name: "video",
  maxCount: 1
}, {
  name: "thumb",
  maxCount: 1
}]), _videoControllers.postUpload);
var _default = videoRouter;
exports["default"] = _default;