const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

for(let select of dropdown){
    for (Currcode in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = Currcode;
        newoption.value = Currcode;
        if(select.name === "from" && Currcode === "USD"){
            newoption.selected = "selected";
        } else  if(select.name === "to" && Currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
        
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);

    });
};

const updateflag = (element) =>{
    let Currcode = element.value;
    let countrycode = countryList[Currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
};

btn.addEventListener("click",  async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    

    console.log(fromcurr.value, tocurr.value);
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
})