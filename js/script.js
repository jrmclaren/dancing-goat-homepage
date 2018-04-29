'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('menu');
    var navBg = document.getElementsByClassName('nav-bg')[0];
    var nav = document.getElementsByClassName('nav')[0];
    var menuContainer = document.querySelector('.menu-container');
    var toggleActive = function toggleActive() {
        if (menuContainer.classList.contains('active')) {
            alert('unmounting menu');
            menuContainer.classList.remove('active');
            navBg.classList.remove('active');
            nav.classList.remove('active');
        } else {
            alert('mounting menu');
            menuContainer.classList.add('active');
            navBg.classList.add('active');
            nav.classList.add('active');
        }
    };
    menu.addEventListener('change', toggleActive);

    // If a selction is made the menu
    // should also toggle
    var handleSelection = function handleSelection() {
        toggleActive();
    };
    // add handleSelection listener to allMenuLinks
    var allMenuLinks = [].concat(_toConsumableArray(document.querySelectorAll('.nav__link')));
    allMenuLinks.map(function (link) {
        link.addEventListener('click', handleSelection);
    });
});

/*
UTILITY FUNCTIONS
WIP
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

//# sourceMappingURL=script.js.map