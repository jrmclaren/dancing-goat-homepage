'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', function () {

    /*
    Menu functionality
     */

    var menuIcon = document.getElementById('menu');
    var navigationBackground = document.getElementsByClassName('nav-bg')[0];
    var nav = document.getElementsByClassName('nav')[0];
    var menuContainer = document.querySelector('.menu-container');
    var navItems = [].concat(_toConsumableArray(document.querySelectorAll('.nav__link')));

    var menuElementsObject = {
        menuIcon: menuIcon,
        nav: nav,
        navItems: navItems,
        navigationBackground: navigationBackground,
        menuContainer: menuContainer
    };

    var Menu = function () {
        function Menu(menuItems) {
            _classCallCheck(this, Menu);

            this.menuIcon = menuItems.menuIcon;
            this.nav = menuItems.nav;
            this.navItems = menuItems.navItems;
            this.navigationBackground = menuItems.navigationBackground;
            this.menuContainer = menuItems.menuContainer;
            this.isOpen = false;
            // bind those functions up to 'this'
            this.getToggleElements = this.getToggleElements.bind(this);
            this.handleSelection = this.handleSelection.bind(this);
            this.toggleMenu = this.toggleMenu.bind(this);
            this.init = this.init.bind(this);
        }

        _createClass(Menu, [{
            key: 'init',
            value: function init() {
                var _this = this;

                // add handleSelection to each link
                this.navItems.map(function (link) {
                    link.addEventListener('click', _this.handleSelection);
                });
                // add toggleMenu to change event on menuIcon (i.e. checkbox)
                this.menuIcon.addEventListener('change', this.toggleMenu);
            }
        }, {
            key: 'getToggleElements',
            value: function getToggleElements() {
                return [this.menuIcon, this.nav, this.navigationBackground, this.menuContainer];
            }
        }, {
            key: 'handleSelection',
            value: function handleSelection() {
                this.menu.checked = false;
                this.toggleMenu();
            }
        }, {
            key: 'toggleMenu',
            value: function toggleMenu() {
                // if the menuContainer contains active
                // remove the active class
                var toggleElements = this.getToggleElements();
                if (this.isOpen) {
                    manipulateClasses('remove', 'active', toggleElements);
                    this.isOpen = false;
                }
                // else add the active class
                else {
                        manipulateClasses('add', 'active', toggleElements);
                        this.isOpen = true;
                    }
            }
        }]);

        return Menu;
    }();

    var menu = new Menu(menuElementsObject);
    menu.init();

    //     // toggleMenu functions
    //
    //     const toggleMenu = () => {
    //         // if the menuContainer contains active
    //         // remove the active class
    //         let menuArrayCopy = [...menuArray];
    //         if( menuContainer.classList.contains('active') ){
    //             manipulateClasses('remove', 'active', menuArrayCopy);
    //         }
    //         // else add the active class
    //         else {
    //             manipulateClasses('add', 'active', menuArrayCopy);
    //         }
    //     };
    //     // If a selection is made the menu
    //     // checkbox should also toggle
    //     const handleSelection = () => {
    //         menu.checked = false;
    //         toggleMenu();
    //     };
    //     // add handleSelection listener to allMenuLinks
    //     const allMenuLinks = [...document.querySelectorAll('.nav__link')];
    //     allMenuLinks.map( link => {
    //         link.addEventListener( 'click', handleSelection);
    //     });
    //     // add toggleMenu function to
    //     // change event of menu checkbox
    //     menu.addEventListener('change', toggleMenu);
    // });
    // end of menu functionality
    /*
    UTILITY FUNCTIONS
     */
    /*
    manipulateClasses function
     */
    /**
     ** ************** Main usage *******************************
     * @param action = string of action to perform i.e. add or remove
     * @param className = a string of the className you want to remove
     * @param elements = a string or Array of classNames to remove the classes from
     *
     * ************** Alternative usage *******************************
     *
     * @param action = string of action to perform i.e. add or remove
     * @param className = a string that you want to remove from an element
     *                    the same className you want to remove
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
});

//# sourceMappingURL=script.js.map