"use strict";

require("regenerator-runtime");

require("dotenv/config");

require("./db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import 시 db 안의 내용들은 자동으로 실행됨
var PORT = 4000;

_server["default"].listen(PORT, function () {
  return console.log("Server listening on port http://localhost:".concat(PORT));
}); //2. 4000번 포트에 , 이하를 감지명령
//3. ()로 실행, =>로 실행 내용 설정
//4. terminal에 표시. 이때 자동으로 Server는 live 상태로 전환되며 console log 실행. Ctrl C로 끌 수 있음
// => 가 싫다면, 뒤에 함수명 설정 후 const 함수명 = () => 실행내용 (함수 자체를 const로 설정)