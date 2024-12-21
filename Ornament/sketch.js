// 기록 변수
let type = 1;
let message = "Merray Christmas!"

// 오너먼트
let ornamentX = 200;
let ornamentY = 250;

// 이미지 변수
let img1;
let img2;
let img3;
let img4;
let wave;
let ball;

// 눈내리기 변수
let snow1;
let snow2;
let snow1Y = 0;
let snow2Y = 0;


function preload(){
  img1 = loadImage("tree.png");
  img2 = loadImage("gift.png");
  img3 = loadImage("santa.png");
  img4 = loadImage("rudolf.png");
  wave = loadImage("wave.png");
  ball = loadImage("ball.png");

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
  background("#0e8455");
  imageMode(CENTER);
  image(img1,100,height-50,100,100);
  image(img1,200,height-50,100,100);
  image(img1,300,height-50,100,100);
  ornament(ornamentX,ornamentY);

  snow();

  textStyle("bold");
  textSize(35);
  textAlign(CENTER,CENTER);
  fill("#f4c542");
  text(message,200,450);
}

function snow(){
  snow1Y = (snow1Y+0.5)%height;
  snow2Y = (snow2Y+0.8)%height;

  imageMode(CORNER);
  image(snow1,0,snow1Y-height);
  image(snow1,0,snow1Y);

  image(snow2,0,snow2Y-height);
  image(snow2,0,snow2Y);
}

function ornament(x,y){
  if(type == 1)img = img1;
  if(type == 2)img = img2;
  if(type == 3)img = img3;
  if(type == 4)img = img4;
  push();
    translate(x,y);
    noStroke();
    fill("#e8d7bd");
    ellipse(0,0,250,250);
  
    push();
      beginClip();
        ellipse(0,0,250,250);
      endClip();

      imageMode(CENTER);
      
      push();
        translate(-(frameCount%250),0);
        push();
          image(img,-60,0,70,70);
          image(img,60,0,70,70);
          image(wave,0,-80,250,20);
          image(wave,0,80,250,20);
        pop();
        push();
          translate(250,0);
          image(img,-60,0,70,70);
          image(img,60,0,70,70);
          image(wave,0,-80,250,20);
          image(wave,0,80,250,20);
        pop();
      pop();
    pop();
    image(ball,0,0);
  
    noStroke();
    fill("#ffd700",);
    rectMode(CENTER);
    rect(0,-130,100,40,8);
    noFill();
    strokeWeight(8);
    stroke("#ffd700",);
    ellipse(0,-170,40,40);
  pop();
  
  stroke("white");
  strokeWeight(5);
  line(x,0,x,y-180)
}

function mouseClicked(){
  if(dist(mouseX,mouseY,ornamentX,ornamentY)<125){
    type = type + 1;
    if(type>4){
      type = 1;
    }
    setURLParam();
  }
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
  if(key === "Enter"){
    message = input.value();
    input.value("");
    setURLParam();
  }
}

function getURLParam(){
  let searchParam = new URLSearchParams(location.search);
  type = searchParam.get("type");
  message = searchParam.get("message");
  if(type == null){
    type = 1;
  }
  if(message == null){
    message = "Merry Christmas!";
  }
}

function setURLParam(){
  // 현재 URL 가져오기
  let currentUrl = new URL(location.href);

  // 새로운 파라미터 추가
  currentUrl.searchParams.set('type', type);
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