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
var switchContainer = document.querySelector("section");

for (let i = 0; i < switchTypes.length; i++) {

    // create a switch for each type
    let thisSwitch = document.createElement("div");
    thisSwitch.classList.add("switch");
    thisSwitch.innerText = switchTypes[i].type;

    thisSwitch.addEventListener("click", (target) => {
        // check for duplicate clicks
        if (target.srcElement.innerText == lastClickedType) return;

        // replace button content
        button.innerHTML = "<img src=" + switchTypes[i].icon + ">" + switchTypes[i].copy;

        // set button width
        button.style.width = switchTypes[i].width;

        // apply animations
        button.style.animationName = "colorAnimation";
        button.querySelector("img").style.animationName = "opacityAnimation";

        // remove animations upon completion
        setTimeout(() => {
            button.style.animationName = "none";
            button.querySelector("img").style.animationName = "none";
        }, 500)
        lastClickedType = switchTypes[i].type;
    })

    // add switch to the container
    switchContainer.appendChild(thisSwitch);
}