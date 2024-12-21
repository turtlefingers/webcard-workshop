// 기록 변수
let message = "행복한새해가되시길바래요"

// 눈내리기 변수
let snow1;
let snow2;
let snow1Y = 0;
let snow2Y = 0;

function preload(){
  snow1 = loadImage("snow1.png");
  snow2 = loadImage("snow2.png");
}

function setup() {
  createCanvas(400, 600);
  settingUI();
  getURLParam();

  textFont("Bagel Fat One");
}

function draw() {
  background("#0A69B4");
  snake();
  snow();
}

function snake(){
  noStroke();
  rectMode(CENTER);
  
  stroke("#45AAFA");
  strokeWeight(3);
  
  let tongueMove = frameCount%60>30?0:10;
  // 혀
  fill("rgb(255,125,148)");
  rect(70+tongueMove,120,40,10);
  
  // 머리
  fill("#2196F3");
  arc(125,125,100,100,radians(180),radians(270), PIE);
  
  // 눈
  noStroke();
  fill("white");
  ellipse(110,105,20,20);
  fill("black");
  ellipse(110,105,10,10);
  
  // 1번줄
  stroke("#45AAFA");
  fill("#2196F3");
  rect(150,100,50,50);
  rect(200,100,50,50);
  rect(250,100,50,50);
  arc(275,125,100,100,radians(-90),radians(0), PIE);
  
  
  textAlign(CENTER,CENTER);
  textSize(40);
  
  fill("white");
  noStroke();
  text(message[0],150,100);
  text(message[1],200,100);
  text(message[2],250,100);
  
  // 허리
  fill("#2196F3");
  stroke("#45AAFA");
  rect(300,150,50,50);
  
  
  // 2번줄
  
  fill("#2196F3");
  stroke("#45AAFA");
  arc(125,225,100,100,radians(180),radians(270), PIE);
  rect(150,200,50,50);
  rect(200,200,50,50);
  rect(250,200,50,50);
  arc(275,175,100,100,radians(0),radians(90), PIE);
  
  fill("white");
  noStroke();
  text(message[3],150,200);
  text(message[4],200,200);
  text(message[5],250,200);
  
  // 허리
  fill("#2196F3");
  stroke("#45AAFA");
  rect(100,250,50,50);
  
  
   // 3번줄
  fill("#2196F3");
  stroke("#45AAFA");
  arc(125,275,100,100,radians(90),radians(180), PIE);
  rect(150,300,50,50);
  rect(200,300,50,50);
  rect(250,300,50,50);
  arc(275,325,100,100,radians(-90),radians(0), PIE);
  
  fill("white");
  noStroke();
  text(message[6],150,300);
  text(message[7],200,300);
  text(message[8],250,300);
  
  // 허리
  fill("#2196F3");
  stroke("#45AAFA");
  rect(300,350,50,50);
  
   // 4번줄
  fill("#2196F3");
  stroke("#45AAFA");
  arc(125,425,100,100,radians(180),radians(270), PIE);
  rect(150,400,50,50);
  rect(200,400,50,50);
  rect(250,400,50,50);
  arc(275,375,100,100,radians(0),radians(90), PIE);
  
  fill("white");
  noStroke();
  text(message[9],150,400);
  text(message[10],200,400);
  text(message[11],250,400);
  
  textSize(120);
  text(2025,200,520);
}


function snow(){
  snow1Y = (snow1Y+0.5)%height;
  snow2Y = (snow2Y+0.8)%height;

  image(snow1,0,snow1Y-height);
  image(snow1,0,snow1Y);

  image(snow2,0,snow2Y-height);
  image(snow2,0,snow2Y);
}





///// UI
let input;
let button;
let closeButton;
let popup;
let url;
let inner;

function settingUI(){
  input = createInput("");
  input.input(keyPressed);
  button = createButton("공유하기");
  button.mousePressed(share);

  closeButton = createButton("닫기");
  closeButton.mousePressed(closePopup);
  popup = createDiv();
  inner = createDiv("아래 주소로 카드를 공유할 수 있어요");
  popup.hide();
  popup.addClass("popup");
  inner.addClass("inner");
  url = createInput();

  popup.child(inner);
  inner.child(url);
  inner.child(closeButton);
}

function keyPressed(){
  message = input.value();
  setURLParam();
}

function getURLParam(){
  let searchParam = new URLSearchParams(location.search);
  message = searchParam.get("message");
  if(message == null){
    message = "행복한새해가되시길바래요";
  }
}

function setURLParam(){
  // 현재 URL 가져오기
  let currentUrl = new URL(location.href);

  // 새로운 파라미터 추가
  currentUrl.searchParams.set('message', message);

  // URL 업데이트
  history.pushState({}, '', currentUrl);
}

function share(){
  let currentUrl = new URL(location.href);
  url.value(currentUrl);
  popup.show();
}

function closePopup(){
  popup.hide();
}