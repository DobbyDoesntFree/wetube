import "regenerator-runtime";
import "dotenv/config";
import "./db"; //import 시 db 안의 내용들은 자동으로 실행됨
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server listening on port http://localhost:${PORT}`)
);
//2. 4000번 포트에 , 이하를 감지명령
//3. ()로 실행, =>로 실행 내용 설정
//4. terminal에 표시. 이때 자동으로 Server는 live 상태로 전환되며 console log 실행. Ctrl C로 끌 수 있음
// => 가 싫다면, 뒤에 함수명 설정 후 const 함수명 = () => 실행내용 (함수 자체를 const로 설정)
