class Player{
    constructor(number,name,height,weight,cap,img){
        this.number = number
        this.name = name
        this.height = height
        this.weight = weight
        this.cap = cap
        this.img = img
    }
}

let playerList = [
    new Player(1,"Keita Inagaki",186,116,44,"https://the-ans.jp/wp-content/uploads/2019/10/20191025_inagaki_gc2-650x433.jpg"),
    new Player(2,"Atsushi Sakate",180,104,32,"https://www.jsports.co.jp/img/web/page/rugby/japan/team/atsushi_sakate/atsushi_sakate_220625_04.jpg"),
    new Player(3,"Jiwon Gu",184,122,20,"https://catch-up-net.com/wp-content/uploads/2019/10/11a0b61e2b435cedc2bf0f7d6283a420.jpg"),
    new Player(4,"Warner Dearns",201,117,6,"https://www.jsports.co.jp/img/web/page/rugby/japan/team/warner_dearns/warner_dearns_220709_01.jpg"),
    new Player(5,"Jack Cornelsen",195,110,11,"https://www.jsports.co.jp/img/web/page/rugby/japan/team/jack_cornelsen/jack_cornelsen_220625_02.jpg"),
    new Player(6,"Michael Leitch",189,113,77,"https://i.dailymail.co.uk/1s/2019/10/13/14/19655876-0-image-m-19_1570973888717.jpg"),
    new Player(7,"Pieter Labuschagne",189,106,14,"https://www.sarugbymag.co.za/wp-content/uploads/2019/09/Screen-Shot-2019-09-26-at-9.03.30-AM.png"),
    new Player(8,"Kazuki Himeno",187,108,24,"https://d3gbf3ykm8gp5c.cloudfront.net/content/uploads/2020/10/12095559/Kazuki-Himeno-for-Japan-in-World-Cup-PA.jpg"),
    new Player(9,"Naoto Saito",165,73,10,"https://www.jsports.co.jp/img/web/page/rugby/japan/team/naoto_saito/naoto_saito_220625_03.jpg"),
    new Player(10,"Seungsin Lee",176,85,5,"https://p.potaufeu.asahi.com/33d2-p/picture/26940759/8f9c29e9d1c938f8c637b54f8e967a1a.jpg"),
    new Player(11,"Siosaia Fifita",187,105,11,"https://m.psecn.photoshelter.com/img-get/I00002cXqTsF71Co/s/500/aflo-162390950.jpg"),
    new Player(12,"Ryoto Nakamura",182,92,32,"https://e2.365dm.com/18/11/2048x1152/skysports-ryoto-nakamura-japan_4492129.jpg"),
    new Player(13,"Shogo Nakano",186,98,5,"https://www.suntory.co.jp/culture-sports/sungoliath/member/img/play/nakano_s.jpg"),
    new Player(14,"Dylan Riley",187,102,9,"https://www.jsports.co.jp/img/web/page/rugby/japan/team/dylan_riely/dylan_riely_220625_03.jpg"),
    new Player(15,"Ryohei Yamanaka",188,98,26,"https://img.kyodonews.net/english/public/images/posts/cdd4801568280037d79417a096ac4a38/photo_l.jpg")
];

const target = document.getElementById("target");

//タイトル
let title = document.createElement("div");
title.classList.add("col-12","text-center","text-danger","p-3","container");
let mainTitle = document.createElement("h1");
mainTitle.innerHTML = "Japan's starting member against France";
subTitle = document.createElement("h3");
subTitle.classList.add("text-right");
subTitle.innerHTML = "2022.11.20";

title.append(mainTitle);
title.append(subTitle);
target.append(title);

//出力部分
let output = document.createElement("div");
output.classList.add("row");

title.append(output);

//画像部分（左側）
let leftDiv = document.createElement("div");
leftDiv.classList.add("col-md-7","col-12","p-2","d-flex","justify-content-center","align-items-center");
let playerImg = document.createElement("img");
playerImg.classList.add("imgFit","p-2");
let defaultImg = "https://i.guim.co.uk/img/media/78b4427f88ba8c5ba3c046f03950cdad738a9e00/0_20_4680_2808/master/4680.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2b965aec8383bd1ace9af9b2786618ba"
playerImg.src = defaultImg

leftDiv.append(playerImg);
output.append(leftDiv);

//ボタン＆選手の情報部分（右側）
let rightDiv = document.createElement("div");
rightDiv.classList.add("col-md-5","col-12","py-3");
let info = document.createElement("h5");
info.classList.add("text-left","col-12","py-3")
info.innerHTML = ""
let detailInfo = document.createElement("h5");
detailInfo.innerHTML = ""
detailInfo.classList.add("text-left","col-12","py-3")

rightDiv.append(info);
rightDiv.append(detailInfo);
output.append(rightDiv);

//slide部分
let sliderShow = document.createElement("div");
sliderShow.classList.add("col-12","d-flex","flex-nowrap","overflow-hiddens");

let mainImg = document.createElement("img");
mainImg.classList.add("main","full-width");
mainImg.setAttribute("data-index",0);

let extraImg = document.createElement("img");
extraImg.classList.add("extra","full-width");

sliderShow.append(mainImg);
sliderShow.append(extraImg);
playerImg.append(sliderShow);

//ボタン作成
for(let i=0; i < playerList.length; i++){
    let button = document.createElement("button");
    button.classList.add("btn","bg-white","m-2","col-3");
    button.innerHTML = (i+1).toString();

    button.addEventListener("click",function(){
        info.innerHTML = playerList[i].name;
        detailInfo.innerHTML = playerList[i].height + "cm, " + playerList[i].weight + "kg, " + playerList[i].cap + "cap";
        slideJump(i)
        //playerImg.src = playerList[i].img

    })
    rightDiv.append(button);
}

console.log(title)


//関数作成
function slideJump(input){
    console.log(input)
    let index = parseInt(mainImg.getAttribute("data-index"));
    console.log(mainImg)
    let currentElement = playerList[index];

    let nextElemnt = playerList[input];

    //main.setAttribute("data-index",input);

    let animationType = index < input ? "right" : "left";
    console.log(index) // ここがずっと0

    animationMain(currentElement,nextElemnt,animationType); //括弧の位置修正
}

function animationMain(currentElement,nextElemnt,animationType){
    // console.log(currentElement)
    // console.log(nextElemnt)
    mainImg.src = nextElemnt.img;
    extraImg.src = currentElement.img;


    mainImg.classList.add("expand-animation");
    extraImg.classList.add("deplete-animation");

    if(animationType === "right"){
        console.log(sliderShow)
        // sliderShow.innerHTML = "";
        sliderShow.append(mainImg);
        sliderShow.append(extraImg);
        leftDiv.append(sliderShow) // sliderShowをappendしてないから表示されない ただ、data-indexを更新していないのでずっとmainは同じ人。data-indexは0のままなので必ずright
        console.log(playerImg)
    }
    else if(animationType === "left"){
        sliderShow.innerHTML = "";
        sliderShow.append(extraImg);
        sliderShow.append(mainImg);
    }
}