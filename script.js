var switchTypes = [
    {
        type: "Print",
        copy: "Print with Canva",
        icon: "assets/truck.svg",
        width: "169.56px"
    },
    {
        type: "Websites",
        copy: "Publish Website",
        icon: "assets/website.svg",
        width: "166.5px"
    },
    {
        type: "Presentations",
        copy: "Present",
        icon: "assets/present.svg",
        width: "110.32px"
    },
    {
        type: "Brand Admin",
        copy: "Publish as Brand Template",
        icon: "assets/brand.svg",
        width: "237.65px"
    },
    {
        type: "Preview",
        copy: "Preview",
        icon: "assets/eye.svg",
        width: "111.81px"
    }
];

// store the last clicked button type
var lastClickedType;

// the button in question
var button = document.querySelector("#target");

// the container of all switches
var switchContainer = document.querySelector("section#switches");

// the container for canvases
var canvasContainer = document.querySelector("main");

canvasContainer.addEventListener("scroll", (target) => {
    let canvases = document.querySelectorAll("article");
    // function isScrolledIntoView(el) {
    for (let i = 0; i < canvases.length; i ++) {
        var rect = canvases[i].getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        // console.log(i);
        var type = switchTypes[i];
        // console.log(canvases[i].innerText)
        // if (canvases[i].innerText == lastClickedType) return;

        if (isVisible && type.type != lastClickedType) {
            // console.log(type.type);
            // if (type.type)
            changeButton(type);
            // setTimeout(() => changeButton(type), 500);
        };
    }

    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    // console.log(thisCanvas);
    // return isVisible;
    // }

})

for (let i = 0; i < switchTypes.length; i++) {

    // create a page for each type
    ////////
    let thisCanvas = document.createElement("article");
    canvasContainer.appendChild(thisCanvas);
    thisCanvas.innerText = switchTypes[i].type;



    ////////
    // create a switch for each type
    let thisSwitch = document.createElement("div");
    thisSwitch.classList.add("switch");
    thisSwitch.innerText = switchTypes[i].type;

    thisSwitch.addEventListener("click", (target) => {
        let allTypes = document.querySelectorAll("section#switches div.switch");
        for (let n = 0; n < allTypes.length; n ++) {
            allTypes[n].classList.remove("selected");
        }

        thisSwitch.classList.add("selected");
        changeButton(switchTypes[i]);
        // check for duplicate clicks
        if (target.srcElement.innerText == lastClickedType) return;
    })

    // add switch to the container
    switchContainer.appendChild(thisSwitch);
}

function changeButton(type) {
    // replace button content
    button.innerHTML = "<img src=" + type.icon + ">" + type.copy;

    // set button width
    button.style.width = type.width;

    // apply animations
    button.style.animationName = "colorAnimation";
    button.querySelector("img").style.animationName = "opacityAnimation";

    // remove animations upon completion
    setTimeout(() => {
        button.style.animationName = "none";
        button.querySelector("img").style.animationName = "none";
    }, 500)
    
    lastClickedType = type.type;
    // console.log(lastClickedType);
}