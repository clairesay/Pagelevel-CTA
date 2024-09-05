// add more CTA types here
var switchTypes = [
    {
        type: "Print",
        copy: "Print with Canva",
        icon: "assets/truck.svg",
        width: "169.56px",
        actions: [
            "Design",
            "Elements",
            "Text",
            "Brand",
            "Uploads",
            "Draw",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Notes"
        ]
    },
    {
        type: "Websites",
        copy: "Publish Website",
        icon: "assets/website.svg",
        width: "166.5px",
        actions: [
            "Design",
            "Elements",
            "Text",
            "Brand",
            "Uploads",
            "Draw",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Notes",
            "Duration",
            "Timer"
        ]
    },
    {
        type: "Presentations",
        copy: "Present",
        icon: "assets/present.svg",
        width: "110.32px",
        actions: [
            "Design",
            "Elements",
            "Text",
            "Brand",
            "Uploads",
            "Draw",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Notes",
            "Duration",
            "Timer"
        ]
    },
    {
        type: "Brand Admin",
        copy: "Publish as Brand Template",
        icon: "assets/brand.svg",
        width: "237.65px",
        actions: [
            "Design",
            "Elements",
            "Text",
            "Brand",
            "Uploads",
            "Draw",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Notes",
            "Duration",
            "Timer"
        ]
    },
    {
        type: "Preview",
        copy: "Preview",
        icon: "assets/eye.svg",
        width: "111.81px",
        actions: [
            "Design",
            "Elements",
            "Text",
            "Brand",
            "Uploads",
            "Draw",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Notes",
            "Duration",
            "Timer"
        ]
    },
    {
        type: "Docs",
        copy: "",
        icon: "assets/blank.svg",
        width: "0px",
        actions: [
            "Design",
            "Elements",
            "Brand",
            "Uploads",
            "Projects",
            "Apps"
        ],
        viewSettings: [
            "Outline"
        ]
    }
];

var actionTypes = {
    "Design": "assets/object-panel/design.svg",
    "Elements": "assets/object-panel/elements.svg",
    "Text": "assets/object-panel/text.svg",
    "Brand": "assets/object-panel/brand.svg",
    "Uploads": "assets/object-panel/uploads.svg",
    "Draw": "assets/object-panel/draw.svg",
    "Projects": "assets/object-panel/projects.svg",
    "Apps": "assets/object-panel/apps.svg"
}

var viewSettings = {
    "Notes": "assets/object-panel/design.svg",
    "Outline": "assets/object-panel/elements.svg",
    "Duration": "assets/object-panel/text.svg",
    "Timer": "assets/object-panel/brand.svg"
}

var viewSettingsX = [
    {
        type: "Notes",
        width: "80.32px",
        icon: "assets/view-settings/notes.svg"
    },
    {
        type: "Outline",
        width: "90.38px",
        icon: "assets/view-settings/outline.svg"
    },
    {
        type: "Duration",
        width: "99.99px",
        icon: "assets/view-settings/duration.svg"
    },
    {
        type: "Timer",
        width: "78.9px",
        icon: "assets/view-settings/timer.svg"
    },
]

var lastActionTypes = switchTypes[0].actions;
var lastViewSettingTypes = switchTypes[0].viewSettings;

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

// the object panel
var objectPanel = document.querySelector("aside#object-panel");

//////// GUI CONTROLS //////////
const gui = new dat.GUI({ autoPlace: false });
document.querySelector("#gui").append(gui.domElement);

// GUI variables
// cta
var buttonState = {
    // icon opacity
    animateIcon: false,
    iconDuration: 500,

    // text opacity
    animateText: false,
    textDuration: 500,

    // container
    animateContainer: false,
    containerDuration: 200
};

// object panel
var objectPanelState = {
    // animateTabs: false,
    tabAnimateStyle: "None",
    tabsDuration: 200
}

// view settings
var viewSettingsState = {
    // animateTabs: false,
    toolbarAnimateStyle: "None",
    toolbarDuration: 200
}

// icon animation
const guiCTAAnimationSettings = gui.addFolder("CTA");
guiCTAAnimationSettings.open();
var guiIconAnimation = guiCTAAnimationSettings.add(buttonState, "animateIcon")
var guiIconAnimationDuration = guiCTAAnimationSettings.add(buttonState, "iconDuration", 0, 2000)

// text animation
var guiTextAnimation = guiCTAAnimationSettings.add(buttonState, "animateText")
var guiTextAnimationDuration = guiCTAAnimationSettings.add(buttonState, "textDuration", 0, 2000)

// transition state for container
var guiContainerAnimation = guiCTAAnimationSettings.add(buttonState, "animateContainer").onChange((value) => {
    if (value == true) {
        button.style.transition = "width " + (Math.round(buttonState.containerDuration * 10 / 1000) / 10) + "s ease-in-out";
    } else {
        button.style.transition = "none";
    }
})

// transition duration for container 
var guiContainerAnimationDuration = guiCTAAnimationSettings.add(buttonState, "containerDuration", 0, 2000).onChange((value) => {
    button.style.transitionDuration = Math.round(value * 10 / 1000) / 10 + "s";
})

// object panel animation
const guiOPAnimationSettings = gui.addFolder("Object Panel");
guiOPAnimationSettings.open();

var guiObjectPanelStyle = guiOPAnimationSettings.add(objectPanelState, 'tabAnimateStyle', ['None', 'Animate', 'Disable']).onChange((value) => {
    updateObjectPanel(switchTypes[lastClickedTypeID]);
})

var guiObjectPanelAnimationDuration = guiOPAnimationSettings.add(objectPanelState, "tabsDuration", 0, 2000);

// view settings animation
const guiViewSettingsAnimationSettings = gui.addFolder("Toolbar");
guiViewSettingsAnimationSettings.open();

var guiObjectPanelStyle = guiViewSettingsAnimationSettings.add(viewSettingsState, 'toolbarAnimateStyle', ['None', 'Animate', 'Disable']).onChange((value) => {
    updateFooter(switchTypes[lastClickedTypeID]);
})

var guiObjectPanelAnimationDuration = guiViewSettingsAnimationSettings.add(viewSettingsState, "toolbarDuration", 0, 2000);

//////// ACTUAL ACTION ///////
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

// populate the object panel for each type
for (const [key, value] of Object.entries(actionTypes)) {
    let action = document.createElement("div");
    action.classList.add("action");

    objectPanel.appendChild(action);

    let actionIcon = document.createElement("img");
    actionIcon.src = value;

    let actionLabel = document.createElement("label");
    actionLabel.innerText = key;

    action.appendChild(actionIcon);
    action.appendChild(actionLabel);
}

// populate footer with buttons
var viewSettingContainer = document.querySelector("section#view-settings > div")
for (let i = 0; i < viewSettingsX.length; i ++) {
    // let thisViewSetting = viewSettingX[i];
    let viewSetting = document.createElement("button");
    viewSetting.classList.add("view-setting");
    viewSetting.classList.add("tertiary");
    viewSetting.classList.add("full");

    let viewSettingIcon = document.createElement("img");
    viewSettingIcon.src = viewSettingsX[i].icon;

    let viewSettingLabel = document.createElement("label");
    viewSettingLabel.innerText = viewSettingsX[i].type;


    viewSetting.appendChild(viewSettingIcon);
    viewSetting.appendChild(viewSettingLabel);
    viewSettingContainer.appendChild(viewSetting);

}


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
    if (type.type == "Docs") {
        button.style.padding = "0px";
        button.style.opacity = "0%";
        button.style.marginLeft = "0px";
    } else {
        button.style.padding = "8px";
        button.style.opacity = "100%";
        button.style.marginLeft = "8px";
    }

    // check if we should apply animations based on GUI variables
    if (buttonState.animateIcon == true) {
        // apply animations
        button.querySelector("img").style.animationName = "opacityAnimation";

        // remove animations upon completion
        setTimeout(() => {
            button.querySelector("img").style.animationName = "none";
        }, buttonState.iconDuration)
    }

    if (buttonState.animateText == true) {
        // apply animations
        button.style.animationName = "colorAnimation";

        // remove animations upon completion
        setTimeout(() => {
            button.style.animationName = "none";
        }, buttonState.textDuration)
    }

    updateObjectPanel(type)
    updateFooter(type)
    lastActionTypes = type.actions;
    lastViewSettingTypes = type.viewSettings;
    // update global values
    lastClickedType = type.type;
    lastClickedTypeID = i;
}

function updateObjectPanel(type) {
    let tabs = document.querySelectorAll("div.action");
    let tabLabels = document.querySelectorAll("div.action label");
    // getting the differences
    let remnants = lastActionTypes.filter(function (obj) { return type.actions.indexOf(obj) == -1; }).concat(type.actions.filter(function (obj) { return lastActionTypes.indexOf(obj) == -1; }))

    for (let i = 0; i < tabs.length; i++) {
        if (objectPanelState.tabAnimateStyle == "Animate") {
            if (remnants.includes(tabLabels[i].innerText)) {
                tabs[i].style.transition = "height " + (Math.round(objectPanelState.tabsDuration * 10 / 1000) / 10) + "s ease-in-out";
            } else {
                tabs[i].style.transition = "none";
            }

            for (let j = 0; j < type.actions.length; j++) {
                if (type.actions[j] == tabLabels[i].innerText) {
                    tabs[i].style.height = "52px";
                    tabs[i].style.opacity = "100%";
                    tabs[i].style.marginBottom = "16px";

                    break;
                }
                tabs[i].style.height = "0px";
                tabs[i].style.opacity = "0%";
                tabs[i].style.marginBottom = "0px";
            }

        } else if (objectPanelState.tabAnimateStyle == "Disable") {
            tabs[i].style.transition = "none";
            for (let j = 0; j < type.actions.length; j++) {
                if (type.actions[j] == tabLabels[i].innerText) {
                    tabs[i].style.height = "52px";
                    tabs[i].style.opacity = "100%";
                    tabs[i].style.marginBottom = "16px";

                    break;
                }
                tabs[i].style.height = "52px";
                tabs[i].style.opacity = "50%";
                tabs[i].style.marginBottom = "16px";
            }

        } else {
            tabs[i].style.transition = "none";
            for (let j = 0; j < type.actions.length; j++) {
                if (type.actions[j] == tabLabels[i].innerText) {
                    tabs[i].style.height = "52px";
                    tabs[i].style.opacity = "100%";
                    tabs[i].style.marginBottom = "16px";

                    break;
                }
                tabs[i].style.height = "0px";
                tabs[i].style.opacity = "0%";
                tabs[i].style.marginBottom = "0px";
            }
        }
    }
}

function updateFooter(type) {
    let viewSettingButtons = document.querySelectorAll("section#view-settings div button.view-setting");
    let viewSettingButtonLabels = document.querySelectorAll("section#view-settings div button.view-setting label");
    let remnants = lastViewSettingTypes.filter(function (obj) { return type.viewSettings.indexOf(obj) == -1; }).concat(type.viewSettings.filter(function (obj) { return lastViewSettingTypes.indexOf(obj) == -1; }))
    // let viewSettingButtonLabels = document.querySelectorAll("div.action label");
    for (let i = 0; i < viewSettingButtons.length; i++) {

        if (viewSettingsState.toolbarAnimateStyle == "Animate") {

            if (remnants.includes(viewSettingButtonLabels[i].innerText)) {
                viewSettingButtons[i].style.transition = "all " + (Math.round(viewSettingsState.toolbarDuration * 10 / 1000) / 10) + "s ease-in-out";
            }
            for (let j = 0; j < type.viewSettings.length; j++) {
                if (type.viewSettings[j] == viewSettingButtonLabels[i].innerText) {
                    viewSettingButtons[i].style.width = viewSettingsX[i].width
                    viewSettingButtons[i].style.opacity = "100%";
                    viewSettingButtons[i].style.marginRight = "8px";
                    viewSettingButtons[i].style.padding = "8px";

                    break;
                }
                viewSettingButtons[i].style.width = "0px"
                viewSettingButtons[i].style.opacity = "0%";
                viewSettingButtons[i].style.marginRight = "0px";
                viewSettingButtons[i].style.padding = "0px";
            }

        } else if (viewSettingsState.toolbarAnimateStyle == "Disable") {
            for (let j = 0; j < type.viewSettings.length; j++) {
                if (type.viewSettings[j] == viewSettingButtonLabels[i].innerText) {
                    viewSettingButtons[i].style.width = viewSettingsX[i].width
                    viewSettingButtons[i].style.opacity = "100%";
                    viewSettingButtons[i].style.marginRight = "8px";
                    viewSettingButtons[i].style.padding = "8px";

                    break;
                }
                viewSettingButtons[i].style.width = viewSettingsX[i].width
                viewSettingButtons[i].style.opacity = "40%";
                viewSettingButtons[i].style.marginRight = "8px";
                viewSettingButtons[i].style.padding = "8px";
            }
        } else {
            viewSettingButtons[i].style.transition = "none";
            for (let j = 0; j < type.viewSettings.length; j++) {
                if (type.viewSettings[j] == viewSettingButtonLabels[i].innerText) {
                    viewSettingButtons[i].style.width = viewSettingsX[i].width
                    viewSettingButtons[i].style.opacity = "100%";
                    viewSettingButtons[i].style.marginRight = "8px";
                    viewSettingButtons[i].style.padding = "8px";

                    break;
                }
                viewSettingButtons[i].style.width = "0px"
                viewSettingButtons[i].style.opacity = "0%";
                viewSettingButtons[i].style.marginRight = "0px";
                viewSettingButtons[i].style.padding = "0px";
            }
        }
    }
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
