//Create variables here
var dog,dogImage,happyDog,database,foodS,foodStock;
var feedDog,addFoodDog;
var fedTime,lastFed,feed,addfood;
var foodObj;
function preload(){
  //load images here
  
  this.dogImage = loadImage("images/dogImg.png");
  this.happyDog = loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(1000, 1000);
  database = firebase.database();
  dog = createSprite(250,300,40,40)
  dog.addImage(dogImage);
  dog.scale = 0.2;
  foodS = 20;
  foodObj = new Food()
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food for the Dog");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87) 
  drawSprites();
  textSize(25);
  fill("white")
  text("Amount of Food Remaining: " + foodS,100,200);
  foodObj.display()
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+lastFed + " AM",350,30)
  }
  //add styles here

}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
