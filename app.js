const apiKey = "f11c891b22d675370f34d0cb577d0e47";

let greet = document.querySelector("#greeting");
let cityInput = document.querySelector("input");

function updateTime(){
    let now = new Date();
    let Time = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
    let dateStr = now.toDateString();
    
    document.querySelector("#date").textContent=dateStr;
    document.querySelector("#time").textContent=Time;
    
    if(now.getHours() >= 4 && now.getHours() < 12){
        greet.textContent = "Good Morning!";
    } 
    else if(now.getHours() >= 12 && now.getHours() < 16){
        greet.textContent = "Good Afternoon!";
    } 
    else if(now.getHours() >= 16 && now.getHours() <= 20){
        greet.textContent = "Good Evening!";
    }
    else {
        greet.textContent = "Good Night!";
    }
    
}

updateTime();
setInterval(updateTime, 1000);

let result; let bg;
document.querySelector("button").addEventListener("click", async (evt) => {
    evt.preventDefault();
    let city=cityInput.value;
    console.log("getting temprature...");
    let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    result=await data.json();
    document.querySelector("#city").textContent=result.name;
    document.querySelector("#temp").textContent=`${Math.round(result.main.temp)}˚C`;
    document.querySelector("#condition").textContent=result.weather[0].main;
    document.querySelector("#humidity").textContent=`Humidity: ${result.main.humidity}%`;
    changeBG(result.weather[0].main);
    console.log(result);
});

function changeBG(weather){
    if(weather.trim().toLowerCase() === "clear"){
        bg = "linear-gradient(to top right, #56ccf2, #2f80ed)";
    }
    else if(weather.trim().toLowerCase() === "clouds"){
        bg = "linear-gradient(to top right, #d7d2cc, #304352)";
    }
    else if(weather.trim().toLowerCase() === "rain"){
        bg = "linear-gradient(to top right, #4b79a1, #283e51)";
    }
    else if(weather.trim().toLowerCase() === "snow"){
        bg = "linear-gradient(to top right, #e6dada, #274046)";
    }
    else{
        bg = "linear-gradient(to top right, #a2c4ff, #cbdfff)";
    }
    document.body.style.background=bg;
}
