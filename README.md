# Wetube clone

First Fullstack

//

1. babel.config.json 생성 및 preset 저장
2. --exec babel-node << --exec 이하의 명령 시행
3. nodemon --exec babel-node << nodemon이 있다면 내용 변경감지(저장 시)마다 자동으로 console 갱신
   //

//

1. import express from "express";
2. const app = express();
3. import logger from "morgan";
4. app.use(logger("dev"));
   //

//
const ### = (req, res, next) => {
console.log(`Path: ${req.url}`);
next();
};
단, return 처리 시 return에서 함수 끝나버림
//

//
app.use(logger("dev"));
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
get은 특정 조건 하에서 동작, use는 상시 동작
//

//
Router
/video/watch
/video/delete
/video/comment
.
.
간단히 말해 경로 그룹화.
/ 하나만 달려있거나 /##(단독) 같은건 global router
//

// 이걸 정리해보자

1. 폴더 만들어서 router 분리
   const videoRouter = express.Router();
   const handleWatchVideo = (req, res) => res.send("Watch video");
   videoRouter.get("/watch", handleWatchVideo);

2. 새 페이지에서 export default(1개 변수만 export 시)
   export default ##
3. 새 페이지에서 exoport const로 여러개 생성 (다변수 export 시)
   export const join = (req, res) => res.send("Join");

4. 본 페이지에서 import 후 변수 사용
   (default로 export 시 변수명 변경 가능, export const로 export 시 변수명 변경 불가)
   import express from "express"; (default로 호출 시)
   import { edit, watch } from "../controllers/videoControllers";
   //

/ - home
/join - join
/login - login
/search - search

/user/:id - See user
/user/logout - log out
/user/edit - Edit My Profile
/user/delete - Delete My Profile

/videos/:id - See video
/videos/:id/edit - Edit video
/videos/:id/delete - Delete Video
/videos/upload - Upload Video

:id 이게 뭐냐? :는 변수선언, : 이하(여기선 id)는 변수명. edit 함수에 console.log(req.params) 호출 시 id:'userinput' 반환.
Ex) /:id로 함수 만들고 /4444면 {id:4444} 반환

//
pug? html render. npm i pug로 설치 후 사용

1. app.set("view engine", "pug"); //이렇게 express에 pug 사용 선언
2. package.json(cwd - server 호출) 있는 경로에 views 폴더 생성 후 pug 생성
   기본경로 변경 원하면
   app.set("views", process.cwd() + "/src/views"); 같이 원하는 경로 추가해주면 됨

3.

- pug 사용법은 파이썬과 유사. Tab으로 종속상태 구분.
- #{@@} 사용하면 js 사용 가능

- partial? 재활용 가능한 html 조각. 별도 폴더 생성 후 include partials/footer.pug 같이 불러올 수 있음

- block? 개별적으로 채워넣을 수 있는 공간
  별도 pug에서 block 같은 공란 만들어 두면 해당 block을 별도 작성 가능
  head
  block head << extends pug 만들 때 이렇게 만들어 두고

  block head
  title Edit | Videos <<사용할 pug에서 이렇게 customizing 가능함

- #{}? block 내용 중 일부만 변경 원할 때 사용
  block 없이 pug 작성 후 자주 갈아끼울 공간을 #{variable}로 선언

  head
  title #{pageTitle} | Wetube

  이후 res.render 하는 곳 (주로 controller)에
  res.render("home", { variable: "원하는 값" }) 이렇게 사용 가능
  단, variable은 같아야됨

- if ####
  div @@@
  이런 식으로 조건문 연결해서 작성 가능. ###은 bullean, bullean은 controller에 넣어주면 됨

- #{}, `${}`
  attribute 안에서 변수 호출 위해선 `${}` 사용해야됨
  const id = req.params.id; (여기서 params.id는controllers 에:id)
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watch ${video.title}` });
  id가 title에 대응되게 데이터 만들었다면 이런 식으로 활용 가능.

- iteration? 변수를 Array로 할당하는 것
- mixin? 변수 부여 가능한 partial
  사용법은 아래와 같음.

  0. controller에 @@변수를 {} 형태로 생성 후 호출.
     const @@ = [{title: "No.1", rating: 5}, {title: "No.2", rating: 5}];
     return res.render("home", { pageTitle: "Home", @@ });
     ※ @@:@@로 보내도 되지만 @@만 보내도 알아서 이해함.
  1. views 아래 폴더 생성 예시(mixins/$$.pug)
  2. mixins 아래 pug는 다음과 같이 작성.
     mixin ##(info)
     h4=info.title
     (위 경우 h4는 각 No.1 No.2이 됨. 아래 들여쓰기 해야됨)
  3. 위 mixins 쓸 pug 상단에
     include (불러올 pug 경로)
     첨부
  4. 위 mixins 쓸 pug 내용에
     each videoObj in @@
     +##(videoObj)
     호출 후 사용하면 됨. 여기서 videoObj가 mixin pug 안의 info로 치환돼 작동함
     ※ 단 videoObj 전체가 mixins에 대응될 필요는 없음(역도 마찬가지. 없으면 없는것은 실행되지 않음)
     ※ ##는 mixins pug 안에 작성된 변수명으로 + 뒤에 오는 변수와 반드시 같아야됨
     ※ @@는 controllers에 작성된 const 변수 명으로 each obj in @@에서 @@ 과 반드시 같아야됨
     (애초에 controllers에서 @@ 변수 할당된 상태로 pug 열람 중임)
     ※ 이때 each 아래 단순히 li=videoObj.key로 호출하면 이게 iteration, +##로 preset 호출하면 mixins

  5. res.render("pug파일명") 선언하면 호출 가능

- 복수형?
  h2=`${video.views} ${video.views === 1? "view" : "views"}`
  이렇게 조건절 표기로 표현 가능

- url relative, absolute?
  a(href="")에서 ""가 /로 시작하면 기존 상태 무시하고 /붙은 대로 보냄 (absolute)
  ""가 /로 시작하지 않으면 현 위치에서 /""가 추가된 곳으로 보내줌
  //

/action?name=inputvalue
