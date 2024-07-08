const bntShow = document.querySelector(".profile");
const profile = document.querySelector(".content_dop--wrapper");
const body = document.querySelector('body')
const blurEl = document.querySelector('.blur')


bntShow.addEventListener("click", function () {
    bntShow.classList.toggle('profile--active')
    bntShow.classList.contains('profile--active') ? bntShow.innerText = "Close Profile" : bntShow.innerText = "Show Profile"
    blurEl.classList.toggle('hidden')
    profile.classList.toggle('hidden')
})

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('blur')) {
        bntShow.classList.toggle('profile--active')
        blurEl.classList.toggle('hidden')
        profile.classList.toggle('hidden')
    }
})

const navBtns = document.querySelectorAll('.nav__btn')
navBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        navBtns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')
        e.target.classList.contains('nav__btn-activity') ? bntShow.classList.remove('hidden') : bntShow.classList.add('hidden')
    })
})


/* ROUTER */
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/spa-webbee/": "./home.html",
    "/spa-webbee/map": "./map.html",
    "/spa-webbee/timer": "./timer.html"
};

const handleLocation = async () => {
    const path = window.location.pathname; //    /spa-webbee/map
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

/* ROUTER / */

