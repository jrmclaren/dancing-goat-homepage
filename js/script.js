'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', function () {

    /*
    Menu functionality
     */
    // define all the elements
    // of the elements
    var menu = document.getElementById('menu');
    var navBg = document.getElementsByClassName('nav-bg')[0];
    var nav = document.getElementsByClassName('nav')[0];
    var menuContainer = document.querySelector('.menu-container');
    var menuArray = [menu, navBg, nav, menuContainer];

    // toggleMenu functions
    var toggleMenu = function toggleMenu() {
        // if the menuContainer contains active
        // remove the active class
        if (menuContainer.classList.contains('active')) {
            var menuArrayCopy = [].concat(menuArray);
            manipulateClasses('remove', 'active', menuArrayCopy);
        }
        // else add the active class
        else {
                var _menuArrayCopy = [].concat(menuArray);
                manipulateClasses('add', 'active', _menuArrayCopy);
            }
    };
    // If a selection is made the menu
    // should also toggle
    var handleSelection = function handleSelection() {
        menu.checked = false;
        toggleMenu();
    };
    // add handleSelection listener to allMenuLinks
    var allMenuLinks = [].concat(_toConsumableArray(document.querySelectorAll('.nav__link')));
    allMenuLinks.map(function (link) {
        link.addEventListener('click', handleSelection);
    });
    // add toggleMenu function to
    // change event of menu checkbox
    menu.addEventListener('change', toggleMenu);
});
// end of menu functionality


/*
UTILITY FUNCTIONS
 */
/*
@manipulateClasses function
    action = string of action to do i.e. add or remove
    className = string of className to be removed
    elements = array of elements to remove className from
                OR string name of className shared by elements
                want removed

    in edgecase where elements === className you want to remove,
    just pass in the string of the className
 */
var manipulateClasses = function manipulateClasses(action, className, elements) {
    // check if elements were passed
    // to function
    switch (action) {
        case 'add':
            // add code
            if (elements) {
                switch (elements.constructor) {
                    //  If elements type is Array, sweet go through
                    // add the className from the element.classList
                    case Array:
                        elements.map(function (element) {
                            return element.classList.add(className);
                        });
                        break;
                    //  If elements type is String, sweet go through
                    //  define an array of that String and add the
                    //  className from each element.classList
                    case String:
                        // make the array
                        var collection = [].concat(_toConsumableArray(document.getElementsByClassName(elements)));
                        // while the array has a length
                        while (collection.length) {
                            // take the last item off the array
                            var currentElement = collection.pop();
                            // manipulate it's class
                            currentElement.classList.add(className);
                        }
                        break;
                    default:
                        throw new Error('Could not add classNames from elements, check arguments');
                        break;
                }
            } else if (className) {
                var _elements = [].concat(_toConsumableArray(document.getElementsByClassName(className)));
                _elements.map(function (element) {
                    return element.classList.add(className);
                });
            } else {
                throw new Error('Could not manipulate classes, check arguments');
            }
            break;
        case 'remove':
            // remove code
            if (elements) {
                switch (elements.constructor) {
                    //  If elements type is Array, sweet go through
                    // remove the className from the element.classList
                    case Array:
                        elements.map(function (element) {
                            return element.classList.remove(className);
                        });
                        break;
                    //  If elements type is String, sweet go through
                    //  define an array of that String and remove the
                    //  className from each element.classList
                    case String:
                        // make the array
                        var _collection = [].concat(_toConsumableArray(document.getElementsByClassName(elements)));
                        // while the array has a length
                        while (_collection.length) {
                            // take the last item off the array
                            var _currentElement = _collection.pop();
                            // manipulate it's class
                            _currentElement.classList.remove(className);
                        }
                        break;
                    default:
                        throw new Error('Could not remove classNames from elements, check arguments');
                        break;
                }
            } else if (className) {
                var _elements2 = [].concat(_toConsumableArray(document.getElementsByClassName(className)));
                _elements2.map(function (element) {
                    return element.classList.remove(className);
                });
            } else {
                throw new Error('Could not manipulate classes, check arguments');
            }
            break;
        default:
            throw new Error('No action, please choose either add or remove.');
    }
};

//# sourceMappingURL=script.js.map