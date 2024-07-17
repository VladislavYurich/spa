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
const nav = document.querySelectorAll(".nav__btn");
const contentBox = document.querySelector('#main-page')

const updateState = async (params) => {
    const paths = {
        'activity': {
            'html': './pages/home.html',
        },
        'map': {
            'html': './pages/map.html',
            'scripts': showWeather
        },
        'timer': {
            'html': './pages/timer.html',
            'scripts': searchTimer

        },

    }
    const content = await fetch(paths[params].html).then((data)=> data.text())
    contentBox.innerHTML = content
    if (paths[params].scripts) {
        paths[params].scripts()
    }
}

const navActive = (params) => {
    const currentBtn = document.querySelector(`a[href=${params}]`)
    console.log(currentBtn)
    navBtns.forEach(btn => btn.classList.remove('active'))
    currentBtn.classList.add('active')
}


const alertFunc = () => {
    const alertShow = alert('Такой страницы не существует. Вернуть на главную?')
    if (alertShow) {
        updateState('activity')
    }
}


const url = window.location.pathname
switch (url) {
    case '/spa-webbee/':
        updateState('activity')
        navActive('activity')
        break;
    case '/spa-webbee/activity':
        updateState('activity')
        navActive('activity')
        break;
    case '/spa-webbee/map':
        updateState('map')
        navActive('map')
        break;
    case '/spa-webbee/timer':
        updateState('timer')
        navActive('timer')
        break;
    default: alertFunc()
        break;
}



nav.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        const state = {page: e.target.getAttribute('href')}
        history.pushState(state, null, state.page)
        updateState(state.page)
    })
})

window.addEventListener('popstate', (e)=> updateState(e.state.page))
/* ROUTER / */



/* TIMER */
let seconds = 0;
let minutes = 0;
let hours = 0;
const openUserTime = Date.now()


function searchTimer() {
    return document.querySelector('#timer')
}


function updateTime() {
    const updateTime = Date.now()
    seconds = Math.floor((updateTime - openUserTime) / 1000) % 60
    minutes = Math.floor((updateTime - openUserTime) / (1000 * 60)) % 60;
    hours = Math.round((updateTime - openUserTime) / (1000 * 60 * 60));
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (searchTimer()) {
        searchTimer().textContent = time
    }
}

window.addEventListener('load', () => {
    setInterval(updateTime, 1000);
  });

/* / TIMER */



/* WEATHER */
function showWeather() {
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [56.736344, 37.162185],
            zoom: 13
        });

        var myPlacemark = new ymaps.Placemark([56.736344, 37.162185], {}, {
            iconLayout: 'default#image',
            iconImageHref: './img/pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });

        myMap.geoObjects.add(myPlacemark);
    }
}
/* / WEATHER */
