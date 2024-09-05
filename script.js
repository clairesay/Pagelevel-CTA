// add more CTA types here
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
    },
    {
        type: "None",
        copy: "",
        icon: "assets/blank.svg",
        width: "0px"
    }
];

//////// Global variables //////////

// store the last clicked button type
var lastClickedType = "Print";
var lastClickedTypeID = 0;

// the button in question
var button = document.querySelector("#target");

// the container of all switches
var switchContainer = document.querySelector("section#switches");

// the container for canvases
var canvasContainer = document.querySelector("main");

// seconds since last loaded
var timeCount = 0;
var lastType = "Print";

// the footer
const toggle = document.querySelector("section#view-settings button.tertiary.icon");
const footer = document.querySelector("footer");
const main = document.querySelector("main");

//////// GUI CONTROLS //////////
const gui = new dat.GUI({ autoPlace: false });
document.querySelector("#gui").append(gui.domElement);

// GUI variables
var prototypeState = {
    // icon opacity
    icon: false,
    iconDuration: 500,

    // text opacity
    text: false,
    textDuration: 500,

    // container
    container: true,
    containerDuration: 200
};

// icon animation
var guiIconAnimation = gui.add(prototypeState, "icon")
var guiIconAnimationDuration = gui.add(prototypeState, "iconDuration", 0, 2000)

// text animation
var guiTextAnimation = gui.add(prototypeState, "text")
var guiTextAnimationDuration = gui.add(prototypeState, "textDuration", 0, 2000)

// transition state for container
var guiContainerAnimation = gui.add(prototypeState, "container").onChange((value) => {
    if (value == true) {
        button.style.transition = "width " + (Math.round(prototypeState.containerDuration * 10 / 1000) / 10) + "s ease-in-out";
    } else {
        button.style.transition = "none";
    }
})

// transition duration for container 
var guiContainerAnimationDuration = gui.add(prototypeState, "containerDuration", 0, 2000).onChange((value) => {
    button.style.transitionDuration = Math.round(value * 10 / 1000) / 10 + "s";
})





canvasContainer.addEventListener("scroll", (target) => {
    var canvases = document.querySelectorAll("article");

    for (let i = 0; i < canvases.length; i++) {
        var rect = canvases[i].getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        var type = switchTypes[i];


        if (isVisible && type.type != lastClickedType) {

            if (lastType == type.type) {
                timeCount = timeCount + 1;
            } else {
                lastType = type.type;
                timeCount = 0;
            }

            if (timeCount > 1) {
                changeButton(type, i);
            }

        };
    }
})

for (let i = 0; i < switchTypes.length; i++) {

    // create a canvas page for each type and append to container
    let thisCanvas = document.createElement("article");
    canvasContainer.appendChild(thisCanvas);
    thisCanvas.innerText = switchTypes[i].type;

    // create a switch for each type
    let thisSwitch = document.createElement("div");
    thisSwitch.classList.add("switch");
    thisSwitch.innerText = switchTypes[i].type;

    thisSwitch.addEventListener("click", (target) => {

        // check for duplicate clicks
        if (target.srcElement.innerText == lastClickedType) return;

        // call relevant functions
        changeButton(switchTypes[i], i);
        visibility(false);
        fixScroll(false, "instant");
    })

    // add switch to the container
    switchContainer.appendChild(thisSwitch);
}


toggle.classList.add("thumbnail")
toggle.addEventListener("click", () => {
    if (toggle.classList.contains("thumbnail")) {

        toggle.classList.remove("thumbnail");
        toggle.classList.add("scroll");
        toggle.querySelector("img").src = "assets/scroll.svg";

        footer.style.height = "32px"

        switchContainer.style.display = "none";

        visibility(true);

        main.style.overflow = "scroll";
        main.style.height = "calc(100vh - 6px - 58px - 76px - 16px)"
        fixScroll(true, "smooth");
    } else {
        toggle.classList.remove("scroll");
        toggle.classList.add("thumbnail");
        toggle.querySelector("img").src = "assets/thumbnail.svg";

        footer.style.height = "140px";

        switchContainer.style.display = "flex";

        visibility(false);

        main.style.overflow = "hidden";
        main.style.height = "calc(100vh - 6px - 58px - 184px - 16px)"
        fixScroll(true, "instant");
    }
})

// function to update the CTA
function changeButton(type, i) {
    // replace selected tile
    let allTypes = document.querySelectorAll("section#switches div.switch");
    for (let n = 0; n < allTypes.length; n++) {
        allTypes[n].classList.remove("selected");
    }
    allTypes[i].classList.add("selected");

    // replace button content
    button.innerHTML = "<img src=" + type.icon + ">" + type.copy;

    // set button width
    button.style.width = type.width;

    // checking for the none case
    if (type.type == "None") {
        button.style.padding = "0px";
        button.style.opacity = "0%";
        button.style.marginLeft = "0px";
    } else {
        button.style.padding = "8px";
        button.style.opacity = "100%";
        button.style.marginLeft = "8px";
    }

    // check if we should apply animations based on GUI variables
    if (prototypeState.icon == true) {
        // apply animations
        button.querySelector("img").style.animationName = "opacityAnimation";

        // remove animations upon completion
        setTimeout(() => {
            button.querySelector("img").style.animationName = "none";
        }, prototypeState.iconDuration)
    }

    if (prototypeState.text == true) {
        // apply animations
        button.style.animationName = "colorAnimation";

        // remove animations upon completion
        setTimeout(() => {
            button.style.animationName = "none";
        }, prototypeState.textDuration)
    }

    // update global values
    lastClickedType = type.type;
    lastClickedTypeID = i;
}

// Function to adjust visibility of non-focused canvases
function visibility(makeAllVisible) {
    if (makeAllVisible) {
        for (let i = 0; i < switchContainer.children.length; i++) {
            document.querySelectorAll("article")[i].style.visibility = "visible";
        }
    } else {
        for (let i = 0; i < switchContainer.children.length; i++) {
            if (i == lastClickedTypeID) {
                document.querySelectorAll("article")[i].style.visibility = "visible";
            } else {
                document.querySelectorAll("article")[i].style.visibility = "hidden";
            }
        }
    }
}

// Function to adjust scroll position
function fixScroll(animate, scrollBehaviour) {
    if (animate) {
        value = 10;
    } else {
        value = 24;
    }

    var rect = document.querySelector("article").getBoundingClientRect();
    var elemHeight = rect.height;

    canvasContainer.scrollTo({
        top: (elemHeight + value) * lastClickedTypeID,
        left: 0,
        behavior: scrollBehaviour
    });
}

// Checking arrow keys
window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        if (lastClickedTypeID + 1 >= switchTypes.length) return;
        else changeButton(switchTypes[lastClickedTypeID + 1], lastClickedTypeID + 1); visibility(false); fixScroll(false, "instant");

    } else if (event.key == "ArrowLeft") {
        if (lastClickedTypeID <= 0) return;
        else changeButton(switchTypes[lastClickedTypeID - 1], lastClickedTypeID - 1); visibility(false); fixScroll(false, "instant");
    }
})

// Initialise
visibility(false);
changeButton(switchTypes[0], 0)
