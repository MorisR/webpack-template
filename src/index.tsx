import "./styles/style.global.link.css"
import svg from "./image.inj.svg"


const rootElement = document.getElementById("root")
rootElement.style.background = "red";
// rootElement.innerHTML = svg;
rootElement.textContent = "test"

console.log(process.env.globalENV)
console.log(process.env.devENV)