// local storage
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty ("--main-color", mainColors)

    document.querySelectorAll(".colors-list li ").forEach(element => {
        element.classList.remove("active")


        if (element.dataset.color === mainColors ) {
            element.classList.add("active");
        }
    }) 

}

let backgroundOption = true
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option")

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active")
    })
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
}

// toggle settings
document.querySelector(".toggle-settings i ").onclick = function (){

    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");

};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li")

colorsLi.forEach(li => {
    li.addEventListener("click" , (e) => {
        document.documentElement.style.setProperty ("--main-color", e.target.dataset.color)

        localStorage.setItem("color_option" , e.target.dataset.color);

        handleActive(e)
    })
})


// switch background
const randomBackEl = document.querySelectorAll(".random-backgrounds span")

randomBackEl.forEach(span => {
    span.addEventListener("click" , (e) => {

        handleActive(e)

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option" , true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option" , false)
        }
    })
})

// Random imgs
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]


function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("imgs3/' + imgsArray[randomNumber] + '")';
            },1000);
    }
}

randomizeImgs();


// Data progress

let ourSkills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills span")

window.onscroll = function () {
    if (window.scrollY >= ourSkills.offsetTop - 300) {
        spans.forEach((span) => {
            span.style.width = span.dataset.progress
        })
    }
    
}


// popUP

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach( img => {
    img.addEventListener("click" , (e) => {
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)

        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3")
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
        }

        let popupImage = document.createElement("img")
        popupImage.src = img.src

        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)

        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("X")

        closeButton.appendChild(closeButtonText)

        closeButton.className = "close-button"

        popupBox.appendChild(closeButton)
    })
})

document.addEventListener("click" , function (e) {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove()

        document.querySelector(".popup-overlay").remove()
    }

})

// bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets")

allBullets.forEach(bullets => {
    bullets.addEventListener("click" , (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
    })
})

//links
const allLinks = document.querySelectorAll(".links a")

allLinks.forEach(link => {
    link.addEventListener("click" , (e) => {

        e.preventDefault()
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth" 
        })
    })
})

function ScrolltoSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) => {
    
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}

ScrolltoSomewhere(allLinks);
ScrolltoSomewhere(allBullets);

function handleActive (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    }) 
    ev.target.classList.add("active")
}

let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets_option")

if (bulletLocalItem !== null) {
    bulletsSpan.forEach( span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block"

        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.display = "none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener( "click" , (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block"

            localStorage.setItem("bullets_option" , "block")
        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option" , "none")
        }
        handleActive(e) 
    })
})

//reset button 
document.querySelector(".reset-options").onclick = function () {

    //localStorage.clear()
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("bullets_option")

    window.location.reload()
}

// toggle menu 

let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")


toggleBtn.onclick = function (e) {

    e.stopPropagation()

    this.classList.toggle("menu-active")

    tLinks.classList.toggle("open")
}

// close menu outside click 

document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active")

            tLinks.classList.toggle("open")
        }
    }
} )

tLinks.onclick = function (e) {
    e.stopPropagation()
} 