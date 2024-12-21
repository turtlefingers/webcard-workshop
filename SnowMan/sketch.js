// 기록 변수
let faceType = 1;
let bodyType = 1;
let message = "Merry Christmas!"


// 눈사람 변수
let faceX = 200;
let faceY = 130;
let bodyX = 200;
let bodyY = 290;
let bottomX = 200;
let bottomY = 460;

let faceScale = 0.5;
let bodyScale = 0.6;
let bottomScale = 0.8;

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
  background("skyblue");
 
  
  fill(245);
  noStroke()
  arc(200,700,600,600,radians(180),radians(360));
  
  face(faceX,faceY,faceType);
  bottom(bottomX,bottomY);
  body(bodyX,bodyY,bodyType);

  snow();
  
  textStyle("bold");
  textSize(40);
  textAlign(CENTER,CENTER);
  fill("#22788c");
  text(message,200,550);
  
}

function snow(){
  snow1Y = (snow1Y+0.5)%height;
  snow2Y = (snow2Y+0.8)%height;

  image(snow1,0,snow1Y-height);
  image(snow1,0,snow1Y);

  image(snow2,0,snow2Y-height);
  image(snow2,0,snow2Y);
}

function mouseClicked(){
  
  if(dist(mouseX,mouseY,faceX,faceY)< 150*faceScale){
    faceType = faceType + 1;
    if(faceType > 3){
      faceType = 1;
    }
    setURLParam();
  }
  
  if(dist(mouseX,mouseY,bodyX,bodyY)< 150*bodyScale){
    bodyType = bodyType + 1;
    if(bodyType > 3){
      bodyType = 1;
    }
    setURLParam();
  }
}

function face(x,y,type){
  push();
    translate(x,y);
    scale(0.5);
    noStroke();
    fill(255);
    ellipse(0,0,300,300);
    
    if(type == 1){
      stroke("gray");
      ellipse(-60,0,100,100);
      ellipse(60,0,100,100);

      fill("gray");
      ellipse(-60,0,50,50);
      ellipse(60,0,50,50);
      
      noStroke()
      fill("orange");
      triangle(100,40,0,10,0,50);
      
      stroke("gray");
      strokeWeight(10);
      noFill();
      arc(0,40,100,100,radians(45),radians(135));
      
      strokeWeight(20);
      stroke("gray");
      line(-100,-50,-30,-50);
      line(100,-50,30,-50);
    }
  
    if(type == 2){
      fill(255);
      ellipse(-100,-120,120,120);
      ellipse(100,-120,120,120);
            
      stroke("gray");
      ellipse(-60,0,80,100);
      ellipse(60,0,80,100);

      fill("green");
      ellipse(-60+10,0,40,70);
      ellipse(60+10,0,40,70);
      
      noStroke()
      ellipse(0,40,30,20);
      
      stroke("gray");
      strokeWeight(10);
      noFill();
      ellipse(0,90,10,30);
      
      strokeWeight(30);
      stroke("green");
      line(-100,-50,-30,-60);
      line(100,-50,30,-60);
      
    }
  
    if(type == 3){
      fill(255);
      triangle(-130,-170,-40,-140,-140,-50);
      triangle(130,-170,40,-140,140,-50);
            
      stroke("gray");
      ellipse(-60,0,100,80);
      ellipse(60,0,100,80);

      fill("brown");
      ellipse(-60,0,40,70);
      ellipse(60,0,40,70);
      
      noStroke()
      rectMode(CENTER)
      rect(0,40,30,20,5);
      
      stroke("brown");
      strokeWeight(10);
      noFill();
      arc(0,40,100,100,radians(30),radians(110));
      
      strokeWeight(20);
      stroke("brown");
      line(-100,-50,-30,-40);
      line(100,-50,30,-40);
      
    }
    
    
  pop();
}

function body(x,y,type){
  push();
    translate(x,y);
    scale(0.6);

    stroke("brown");
    strokeWeight(20);
    line(-100,-100,-170,-140);
    line(100,-100,170,-140);

    push();
      translate(-170,-140);
      rotate(radians(-60))
      noStroke();
      rectMode(CENTER);
      fill("green");
      rect(0,-20,80,100,40,40,20,20);
      ellipse(45,5,50,40);
    pop();

    push();
      translate(170,-140);
      rotate(radians(60))
      noStroke();
      rectMode(CENTER);
      fill("green");
      rect(0,-20,80,100,40,40,20,20);
      ellipse(-45,5,50,40);
    pop();

    noStroke();
    fill(245);
    ellipse(0,0,300,300);
  
    if(type == 1){
      fill("gray");
      ellipse(0,-80,30,40);
      ellipse(0,-15,30,40);
      ellipse(0,50,30,40);
    }
  
    if(type == 2){
      rectMode(CENTER);
      fill("darkgreen");
      rect(-40,-70,40,150,10);
      fill("green");
      rect(0,-150,150,30,10);
    }
  
    if(type == 3){
      rectMode(CENTER);
      fill("red");
      ellipse(0,0,300,300);
      
      
      stroke("white");
      strokeWeight(5)
      line(10,-150,10,150);
      
      fill(240);
      stroke(200);
      strokeWeight(1);
      rect(0,130,270,45,15);
      
      fill(240);
      stroke(200);
      strokeWeight(1);
      rect(0,-150,150,30,10);
      
      fill("white");
      ellipse(-5,-100,15,15);
      ellipse(-5,-50,15,15);
      ellipse(-5,0,15,15);
      ellipse(-5,-100,15,15);
    }
  pop();
}

function bottom(x,y){
  push();
    translate(x,y);
    scale(0.8);
    noStroke();
    fill(235);
    ellipse(0,0,300,300);
  pop();
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
  faceType = searchParam.get("faceType");
  bodyType = searchParam.get("bodyType");
  message = searchParam.get("message");
  if(faceType == null){
    faceType = 1;
  }
  if(bodyType == null){
    bodyType = 1;
  }
  if(message == null){
    message = "Merry Christmas!";
  }
}

function setURLParam(){
  // 현재 URL 가져오기
  let currentUrl = new URL(location.href);

  // 새로운 파라미터 추가
  currentUrl.searchParams.set('faceType', faceType);
  currentUrl.searchParams.set('bodyType', bodyType);
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