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

// GUI
const gui = new dat.GUI({ autoPlace: false });
document.querySelector("#gui").append(gui.domElement);

var prototypeState = {
    icon: false,
    iconDuration: 500,
    // animateIconLowestOpacity: 40,

    text: false,
    textDuration: 500,

    container: true,
    containerDuration: 200
    // animateTextLowestOpacity: 40
};

gui.add(prototypeState, "icon")
gui.add(prototypeState, "iconDuration", 0, 2000)

gui.add(prototypeState, "text")
gui.add(prototypeState, "textDuration", 0, 2000)

// transition state for container
gui.add(prototypeState, "container").onChange((value) => {
    if (value == true) {
        button.style.transition = "width " + (Math.round(prototypeState.containerDuration * 10 / 1000) / 10) + "s ease-in-out";
    } else {
        button.style.transition = "none";
    }
})

// transition duration for container 
gui.add(prototypeState, "containerDuration", 0, 2000).onChange((value) => {
    button.style.transitionDuration = Math.round(value * 10 / 1000) / 10 + "s";
})

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


canvasContainer.addEventListener("scroll", (target) => {
    // function isScrolledIntoView(el) {
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

        // check for duplicate clicks
        if (target.srcElement.innerText == lastClickedType) return;

        changeButton(switchTypes[i], i);

        visibility(false);


        fixScroll(false, "instant");


    })

    // add switch to the container
    switchContainer.appendChild(thisSwitch);
}

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

    lastClickedType = type.type;
    lastClickedTypeID = i;
    // console.log(lastClickedType);
}

const toggle = document.querySelector("section#view-settings button.tertiary.icon");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
toggle.classList.add("thumbnail")
toggle.addEventListener("click", () => {
    // console.log("yes");
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

visibility(false);

function fixScroll(animate, scrollBehaviour) {
    // var scrollBehaviour;
    if (animate) {
        // scrollBehaviour = "smooth";
        value = 10;
    } else {
        // scrollBehaviour = "smooth"
        value = 24;
    }
    // console.log("bruh")
    var rect = document.querySelector("article").getBoundingClientRect();
    var elemHeight = rect.height;
    // console.log(lastClickedTypeID);
    // var elemBottom = rect.bottom;
    // if (lastClickedType == switchTypes.length - 1) {
    //     canvasContainer.scrollTo({
    //         top: (elemHeight*lastClickedTypeID + 500), 
    //         left: 0, 
    //         behavior: scrollBehaviour
    //     });
    // } else {
    canvasContainer.scrollTo({
        top: (elemHeight + value) * lastClickedTypeID,
        left: 0,
        behavior: scrollBehaviour
    });
    // }
}
// addEventListener("keypress", (event) => {});

window.addEventListener("keydown", (event) => {
    // var curren
    // alert(event.key);
    if (event.key == "ArrowRight") {
        if (lastClickedTypeID + 1 >= switchTypes.length) return;
        else changeButton(switchTypes[lastClickedTypeID + 1], lastClickedTypeID + 1); visibility(false); fixScroll(false, "instant");

    } else if (event.key == "ArrowLeft") {
        if (lastClickedTypeID <= 0) return;
        else changeButton(switchTypes[lastClickedTypeID - 1], lastClickedTypeID - 1); visibility(false); fixScroll(false, "instant");
    }
})

// initialise
changeButton(switchTypes[0], 0)

///// animation //////
