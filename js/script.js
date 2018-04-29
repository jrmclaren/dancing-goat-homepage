'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var menu = document.getElementById('menu');
    var navBg = document.getElementsByClassName('nav-bg')[0];
    var nav = document.getElementsByClassName('nav')[0];
    var menuContainer = document.querySelector('.menu-container');
    var toggleActive = function toggleActive() {
        if (menuContainer.classList.contains('active')) {
            menuContainer.classList.remove('active');
            navBg.classList.remove('active');
            nav.classList.remove('active');
        } else {
            menuContainer.classList.add('active');
            navBg.classList.add('active');
            nav.classList.add('active');
        }
    };
    menu.addEventListener('change', toggleActive);
});

//# sourceMappingURL=script.js.map