// ここからJavaScriptを記述してください。
const config = {
    startPage: document.getElementById("startPage"),
    mainPage: document.getElementById("mainPage")
}

class Player{
    constructor(name,age,days,money,items,click){
        this.name = name;
        this.age = age;
        this.days = days;
        this.money = money;
        this.items = items;
        this.click = click;
        this.timer = null;
    }
    increaseMoney(item){
        if(item == this.items[0]){
            this.money += 25 + item.howManyPurchased * item.makeMoney;
        }
        else if(item == this.items[1]){
            this.money += (1.001 * item.howManyPurchased * item.price);
        }
        else if (item == this.items[2]){
            this.money += (1.007 * item.howManyPurchased * item.price);
        }
        else{
            this.money += item.howManyPurchased * item.makeMoney;
        }
    }
    purchaseItem(item){
        this.money -= item.price;
        item.howManyPurchased ++;
        if(item == this.items[1]){
            item.price *= 1.1;
        }
    }

}

class Item{
    constructor(name,img,price,maxPurchase,howManyPurchased,makeMoney,type){
        this.name = name;
        this.img = img;
        this.price = price;
        this.maxPurchase = maxPurchase;
        this.howManyPurchased = howManyPurchased;
        this.makeMoney = makeMoney;
        this.type = type;
    }
}

//select "New game" or "Load game" 
/*
function selectGameType(){
    let newBtn = config.startPage.querySelectorAll("#newBtn")[0]
    newBtn.addEventListener("click",function(){
        newGame();
    });

    let loginBtn = config.startPage.querySelectorAll("#loginBtn")[0]
    loginBtn.addEventListener("click",function(){
        loginGame();
    });
}
*/

//if you push "New"
function newGame(){
    let playerName = config.startPage.querySelectorAll(`input[name="playerName"]`)[0].value;
    if(playerName == ""){
        alert("名前を入力してください");
        return false;
    }
    let playerAccount = createNewPlayer(playerName);
    startGame(playerAccount);
}

//if you push "Login"
function loginGame(){
    let playerName = config.startPage.querySelectorAll(`input[name="playerName"]`)[0].value;
    if(playerName == ""){
        alert("名前を入力してください");
        return false;
    }
    else if(localStorage.getItem(playerName) == null){
        alert("セーブデータがありません");
        return false;
    }
    let playerAccount = JSON.parse(localStorage.getItem(playerName));
    // ★★★ playerAccountには名前しか入ってないデータが保存されてない ★★★
    console.log(playerAccount)
    startGame(playerAccount);
}

//create new player
function createNewPlayer(playerName){
    let items = [
        new Item("Flip machine","https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png",15000,500, 0,25,"ability"),
            new Item("ETF Stock","https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png", 300000,-1, 0,0.1,"investment"),
            new Item("ETF Bonds","https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png",300000,-1, 0, 0.07,"investment"),
            new Item("Lemonade Stand","https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png",30000,1000,0, 30,"realState"),
            new Item("Ice Cream Truck","https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png", 100000,500,0,120,"realState"),
            new Item("House","https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png",20000000,100,0, 32000,"realState"),
            new Item("TownHouse","https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png",40000000,100,0,64000,"realState"),
            new Item("Mansion","https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png", 250000000,20,0,500000,"realState"),
            new Item("Industrial Space","https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png",1000000000,10,0,2200000,"realState"),
            new Item("Hotel Skyscraper","https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png",10000000000,5,0,25000000,"realState"),
            new Item("Bullet-Speed Sky Railway","https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png",10000000000000,1,0,30000000000,"realState")   
    ];
    let player = new Player(playerName,20,1,50000,items,0);
    return player;
}

//start Game
function startGame(playerAccount){
    config.startPage.classList.add("d-none");
    config.startPage.querySelectorAll(`input[name="playerName"]`)[0].value = null;
    config.mainPage.append(createMainPage(playerAccount))
    startTimer(playerAccount);
}

//start timer
function startTimer(playerAccount){
    playerAccount.timer = setInterval(function(){
        playerAccount.days ++;
        config.mainPage.querySelectorAll("#days")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#days")[0].innerHTML = playerAccount.days + " days";
        if(playerAccount.days % 365 == 0){
        playerAccount.age ++;
        config.mainPage.querySelectorAll("#age")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#age")[0].innerHTML = playerAccount.age + " years old";
    }
    },1000);
}

//create mainPage
function createMainPage(playerAccount){
    let container = document.createElement("div");
    container.classList.add("d-flex","justify-content-center","p-md-5","pb-5","vh-100");
    container.innerHTML =
    `
        <div class="bg-blue p-2 d-flex col-md-11 col-lg-10">
            <div class="bg-dark p-2 col-4" id="leftPart">
                <div class="p-1 text-center bg-blue text-light" id="bugerInfo">
                    <h5 id="amountBurger">${playerAccount.click} Burgers</h5>
                    <h5>one click ￥${(playerAccount.items[0].howManyPurchased+ 1)*25}</h5>
                </div>
                <div class="p-2 pt-5 d-flex justify-content-center">
                    <img id="bugerImg" width=70% src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" class="img-fuid hover">
                </div>
            </div>

            <div class= "col-8" id="rightPart">
                <div class= "p-1 bg-dark" id="playerInfo">  
                    <div class="d-flex flex-wrap p-1">
                        <div class="bg-blue text-white text-center col-12 col-sm-6 playerInfoBorder">
                            <h5>${playerAccount.name}</h5>
                        </div>
                        <div class="bg-blue text-white text-center col-12 col-sm-6 playerInfoBorder">
                            <h5 id="age">${playerAccount.age} years old</h5>
                        </div>
                        <div class="bg-blue text-white text-center col-12 col-sm-6 playerInfoBorder">
                            <h5 id="days">${playerAccount.days} days</h5>
                        </div>
                        <div class="bg-blue text-white text-center col-12 col-sm-6 playerInfoBorder">
                            <h5 id="totalMoney">￥${playerAccount.money}</h5>
                        </div>
                    </div> 
                </div>
                <div class="bg-dark pb-1 p-2 m-1 overflow-auto flowHeight" id="itemsList">
                </div>
                <div class="d-flex jusitfy-content-between p-2">
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary col-12" id="saveBtn">Save</button>
                    </div>
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary col-12" id="resetBtn">Reset</button>
                    </div>
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary col-12" id="backHomeBtn">Back Home</button>
                    </div>
                </div>    
            </div>
        </div>
    `;
    container.querySelectorAll("#itemsList")[0].append(createItemsPart(playerAccount));

    //if you click "burger img"
    container.querySelectorAll("#bugerImg")[0].addEventListener("click",function(){
        //increase buger count
        container.querySelectorAll("#amountBurger")[0].innerHTML = "";
        playerAccount.click ++;
        container.querySelectorAll("#amountBurger")[0].innerHTML = playerAccount.click + " Burgers";
        //increase player's money
        playerAccount.increaseMoney(playerAccount.items[0]);
        container.querySelectorAll("#totalMoney")[0].innerHTML = "";
        container.querySelectorAll("#totalMoney")[0].innerHTML = "￥" + playerAccount.money;
    })

    //if you click "Save" button
    container.querySelectorAll("#saveBtn")[0].addEventListener("click",function(){
        saveGame(playerAccount);
    });

    //if you click "Reset" button
    container.querySelectorAll("#resetBtn")[0].addEventListener("click",function(){
        resetGame(playerAccount);
    })

    //if you click "Back Home" button
    container.querySelectorAll("#backHomeBtn")[0].addEventListener("click",function(){
        backHomeGame(playerAccount);
    });

    return container;   
}

//save game
function saveGame(playerAccount){
    let playerName = playerAccount.name;
    // let jsonPlayerName = JSON.stringify(playerName);
    // ★★★ jsonPlayerName？？名前じゃなくてデータを保存するべき
    // ★★★ playerAccount全体をJSONで保存 ★★★
    let jsonPlayerName = JSON.stringify(playerAccount);
    localStorage.setItem(playerName,jsonPlayerName);
    alert("セーブしました");
    console.log(jsonPlayerName)
    clearInterval(playerAccount.timer);
    config.mainPage.innerHTML = "";
    config.startPage.classList.remove("d-none");
}

//reset game
function resetGame(playerAccount){
    if(window.confirm("1日目からゲームをやり直しますか？")){
        clearTimeout(playerAccount.timer);
        let playerName = playerAccount.name;
        let newPlayerAccount = createNewPlayer(playerName);
        config.mainPage.innerHTML = "";
        config.mainPage.append(createMainPage(newPlayerAccount));
        startTimer(newPlayerAccount);
    }
}

//back to start page
function backHomeGame(playerAccount){
    if(window.confirm("ゲームを止め、スタート画面に戻りますか？")){
        clearTimeout(playerAccount.timer);
        config.mainPage.innerHTML = "";
        config.startPage.classList.remove("d-none");
    }

}

//create item part
function createItemsPart(playerAccount){
    let container = document.createElement("div");
    for(let i=0;i<playerAccount.items.length;i++){
        let itemDiv = document.createElement("div")
        itemDiv.classList.add("text-white","d-sm-flex","align-items-center","m-1","p-1","bg-silver","hover")
        itemDiv.innerHTML += 
        `
            <div class="d-none d-sm-block p-1 col-sm-3">
                <img src="${playerAccount.items[i].img}" class="img-fluid">
            </div>
            <div class="col-sm-9">
                <div class="d-flex justify-content-between">
                    <h4>${playerAccount.items[i].name}</h4>
                    <h4>${playerAccount.items[i].howManyPurchased}</h4>
                </div>
                <div class="d-flex justify-content-between">
                    <p>￥${playerAccount.items[i].price}</p>
                    <p class="text-success">￥${playerAccount.items[i].makeMoney} ${itemsTypeSelect(playerAccount.items[i].type)}</p>
                </div>
            </div>
        `;
        container.append(itemDiv);
        //if you click item 
        itemDiv.addEventListener("click", function(){
            //move purchase part
            config.mainPage.querySelectorAll("#itemsList")[0].innerHTML = "";
            config.mainPage.querySelectorAll("#itemsList")[0].append(createPurchasePart(playerAccount,i))
        });
    }
    return container;
}

//select item's type
function itemsTypeSelect(type){
    if(type == "ability") return "/click";
    else if(type == "investment") return "/sec";
    else return "/sec";
}

//create purchase part
function createPurchasePart(playerAccount,index){
    let container = document.createElement("div");
    container.innerHTML = 
    `
    <div class="bg-silver p-2 m-1 text-white">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5>${playerAccount.items[index].name}</h5>
                <p>Max purchases: ${selectMaxPurchase(playerAccount.items[index].maxPurchase)}</p>
                <p>Price: ￥${playerAccount.items[index].price}</p>
                <p>Get ￥${playerAccount.items[index].makeMoney} ${itemsTypeSelect(playerAccount.items[index].type)}</p>
            </div>
            <div class="p-2 d-sm-block col-sm-5">
                <img src="${playerAccount.items[index].img}" class="img-fluid">
            </div>
        </div>
        <div>
            <p>How many ould you like to buy?</p>
            <input type="number" placeholder="0" class="col-12 form-control">
            <p class="text-right" id="howMuch">total: ￥0</p>
        </div>
        <div class="d-flex justify-content-between pb-3">
            <button class="btn btn-outline-primary bg-light col-5" id="goBackBtn">Go Back</buttone>
            <button class="btn btn-primary col-5" id="purchaseBtn">Purchase</buttone>
        </div>
    </div>
    `
    let goBackBtn = container.querySelectorAll("#goBackBtn")[0];
    //if you click "Co back" button
    goBackBtn.addEventListener("click",function(){
        config.mainPage.querySelectorAll("#itemsList")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#itemsList")[0].append(createItemsPart(playerAccount))
    })

    let purchaseBtn = container.querySelectorAll("#purchaseBtn")[0];
    //if you click "Purchase" button
    purchaseBtn.addEventListener("click",function(){
        config.mainPage.querySelectorAll("#itemsList")[0].innerHTML = "";
        config.mainPage.querySelectorAll("#itemsList")[0].append(createItemsPart(playerAccount));
    })
    return container;
}

//show ∞
function selectMaxPurchase(maxPurchase){
    if(maxPurchase == -1) return "∞";
    else return maxPurchase;
}