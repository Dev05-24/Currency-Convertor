const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//this is a loop to set defautl flags
for (let select of dropdowns) {
  // console.log(code, countryList[code]);
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    //whenever we the site reloaded we see the usd to inr
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  //added an event listener by clicking on which we change the flag
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//code to update the flag image
const updateFlag = (element) => {
  let currCode = element.value; //storing the currency code
  let countryCode = countryList[currCode]; //using currency code to store countrycode
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //this is an api which bring flag image in the place of flag image we put countrycode so the image will generate accordingly
  let img = element.parentElement.querySelector("img"); //using js adding the image in html tag
  img.src = newSrc;
};

//this is an async await function becuase we are using api which might take time to bring the data
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); //the amount we will enter will be stored here
  let amtVal = amount.value; //storing it in amtval variable
  //loop to check if the amt is not given or the amount is in negative then set the amount to 1
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = 1;
  }

  //update url structure
  // console.log(fromCurr.value, toCurr.value);
  //in variable url we are storing the api in base url the part of api will come from above as we have mentioned then the country code selected in fromCurrency is added in it so it url will be completed
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  // let rate = data(toCurr.value.toLowerCase());
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  // console.log(rate);

  //multiplying the amount value to rate given by the user to get the correct amount
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; //displaying the value in html tag using dom manipulation
};

//notify the site to not clculate the default values
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

//event listener to call the updateExchangeRate function
window.addEventListener("load", () => {
  updateExchangeRate();
});
