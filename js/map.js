const mapNavBtn = document.querySelector('a[href="/map"]')
mapNavBtn.addEventListener('click', function() {
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [56.736344, 37.162185],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 13
        });

        var myPlacemark = new ymaps.Placemark([56.736344, 37.162185], {}, {
            iconLayout: 'default#image',
            iconImageHref: './img/pin.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-3, -42]
        });


        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark);
    }
})






 






