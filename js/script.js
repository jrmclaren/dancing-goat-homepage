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

/*
UTILITY FUNCTIONS

 */

var removeClasses = function removeClasses(className, elements) {
    switch (elements.constructor) {
        case Array:
            console.log('Array type');
            break;
        case String:
            console.log('String type');
            break;
        default:
            alert('Exit');
    }
};
removeClasses('active', 'someid');

//# sourceMappingURL=script.js.map