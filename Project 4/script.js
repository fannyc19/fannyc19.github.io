const groceryList = ["Milk", "Eggs", "Bread", "Broccoli", "Steak", "Chicken", "Apples", "Banana", "Orange", "Chocolate"];
let sound = new Audio("click.wav");

function initialize(){
  groceryOutputBox = document.querySelector('#groceryOutput');
  input = document.querySelector('#inputform');
  log = "";
  
  previousIdx = -1;
  previousGrocery = "";
  previousGroceryDown = "";
  previousIdxDown = -1;
  tempIdx = 0;
  tempIdxDown = 0;
  
  document.getElementById("add").addEventListener("click", function(){addGrocery(input.groceryinput.value)}); 
  document.getElementById("add").addEventListener("click", function() {sound.play();});
  document.getElementById("delete").addEventListener("click", function(){deleteGrocery(input.groceryinput.value)});  
  document.getElementById("delete").addEventListener("click", function() {sound.play();});
  document.getElementById("moveUp").addEventListener("click", function(){moveUp(input.groceryinput.value)});  
  document.getElementById("moveUp").addEventListener("click", function() {sound.play();});
  document.getElementById("moveDown").addEventListener("click", function(){moveDown(input.groceryinput.value)}); 
  document.getElementById("moveDown").addEventListener("click", function() {sound.play();});
  display();
}

function display(){
  log = "";
  for(let i = 0; i < groceryList.length; i++){
      let numInList = i + 1;
      let grocery = groceryList[i];
      log += `${numInList}. ${grocery} <br />`;
  }
  groceryOutputBox.innerHTML = log;
}

const addGrocery = (grocery) => {
  groceryList.push(grocery);
  input.groceryinput.value = "";
  display();
}

const deleteGrocery = (idx) => {
  idx -= 1;
  if (idx > -1) { 
    groceryList.splice(idx, 1);
  }
  input.groceryinput.value = "";
  display();
}

function moveUp(idx){
  idx -= 1;
  if(tempIdx > 0){
    if(previousIdx === idx){
      groceryList.splice(tempIdx, 1);
      groceryList.splice(tempIdx-1, 0, previousGrocery);
      tempIdx--;
    }
    else{
      up(idx);
    }
  }
  else{
    if(tempIdx !== 0 || previousIdx !== idx){
      up(idx);
    }
  }
  display();
}
  
function moveDown(idx){
  idx -= 1;
  if(tempIdxDown < groceryList.length){
    if(previousIdxDown === idx){
      groceryList.splice(tempIdxDown, 1);
      groceryList.splice(tempIdxDown+1, 0, previousGroceryDown);
      tempIdxDown++;
    }
    else{
      down(idx);
    }
  }
  display();
}

function up(idx){
  let selectedGrocery = groceryList[idx];
  groceryList.splice(idx, 1);
  groceryList.splice(idx-1, 0, selectedGrocery);
  previousGrocery = selectedGrocery;
  previousIdx = idx;
  tempIdx = idx-1;
}

function down(idx){
  let selectedGrocery = groceryList[idx];
  groceryList.splice(idx, 1);
  groceryList.splice(idx+1, 0, selectedGrocery);
  previousGroceryDown = selectedGrocery;
  previousIdxDown = idx;
  tempIdxDown = idx+1;
}