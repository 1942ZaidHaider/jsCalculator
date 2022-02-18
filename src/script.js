let numbers = document.getElementsByClassName("number");
let operators = document.getElementsByClassName("operator");
screen = document.getElementById("screen").getElementsByTagName("p")[0];
function getElements() {
  numbers = document.getElementsByClassName("number");
  operators = document.getElementsByClassName("operator");
}

onload = bindEvents;

function bindEvents() {
  getElements();
  for (let i of numbers) {
    i.getElementsByTagName("span")[0].addEventListener("click", getNumber);
  }
  for (let i of operators) {
    i.addEventListener("click", getOperator);
  }
  document.getElementById("clear").addEventListener("click",function(){
    window.location.href="";
  });
  document.getElementById("bksp").addEventListener("click",function(){
    x=Number(screen.innerHTML.slice(0,-1));
    screen.innerHTML=(!isNaN(x))?x:0;
  });

}
// The number to be displayed
// The operator to operate with
currentOperator = "=";
result = 0;
function setResult(a) {
  result = Number(a) == NaN ? 0 : Number(a);
}
reset = false;

function getNumber(e) {
  got = e.target.innerHTML;
  while (got.includes("span")) {
    got = got.replace("/", "").replace("<span>", "");
  }
  if (screen.innerHTML == "0" || reset) {
    screen.innerHTML = got;
    reset = false;
  } else {
    screen.innerHTML += got;
  }
}

function getOperator(e) {
  got = e.target.innerHTML;
  while (got.includes("span")) {
    got = got.replace("/", "").replace("<span>", "");
  }
  cNum = screen.innerHTML;
  console.log(cNum);
  if (currentOperator != "=") {
    setResult(operate(Number(result), Number(cNum), currentOperator));
  } else {
    setResult(screen.innerHTML);
  }
  screen.innerHTML = result;
  currentOperator = got;
  reset = true;
}

function operate(a, b, op) {
  console.log(a, b, currentOperator, result);
  switch (op) {
    case "+":
      return a + b;
      break;
    case "-":
      return a - b;
      break;
    case "×":
      return a * b;
      break;
    case "÷":
      return a / b;
      break;
    case "%":
      return a % b;
      break;
    case "=":
      return result;
      break;
    default:
      return "ERR";
  }
}
