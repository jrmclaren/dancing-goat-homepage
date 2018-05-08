'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
Class autobind function

Inspired heavily by react-autobind which I <3.

I wanted to see how it works under the hood and replicate
it and change things to ES6 where I can, but mostly
to learn something! I don't claim any of this work
'as my own' The genius lies with the original
authors.

Check out react-autobind here:
https://github.com/cassiozen/React-autobind/blob/master/src/autoBind.js

// */
var bindAll = function bindAll(context) {

    var dontBind = ['constructor'];

    var toBind = [];

    /**
     * From autobind-decorator (https://github.com/andreypopp/autobind-decorator/tree/master)
     * Rewritten in an arrow function
     * Return a descriptor removing the value and returning a getter
     * The getter will return a .bind version of the function
     * and memoize the result against a symbol on the instance
     */
    var getBoundMethod = function getBoundMethod(objectPrototype, method, descriptor) {

        var func = descriptor.value;

        return {
            configurable: true,
            get: function get() {
                if (this === objectPrototype || this.hasOwnProperty(method)) {
                    return func;
                }
                var boundFunc = func.bind(this);
                Object.defineProperty(this, method, {
                    value: boundFunc,
                    configurable: true,
                    writable: true
                });
                return boundFunc;
            }
        };
    };
    // Onto binding them all

    if (context === undefined) {
        throw new Error('bindAll Error: No context provided');
    }

    // get Object Prototype
    var objectPrototype = Object.getPrototypeOf(context);
    // prepare to bind all methods on the class
    toBind = Object.getOwnPropertyNames(objectPrototype);

    toBind.forEach(function (method) {
        var descriptor = Object.getOwnPropertyDescriptor(objectPrototype, method);
        // if the method doesn't exist, warn user
        if (descriptor === undefined) {
            console.warn('bindAll Error: "' + method + '" not found in class');
            // then return;
            return;
        }
        // if it isn't a function or is a abnormal function return
        if (dontBind.indexOf(method) !== -1 || typeof descriptor.value !== 'function') {
            return;
        }
        Object.defineProperty(objectPrototype, method, getBoundMethod(objectPrototype, method, descriptor));
    });
};
// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', function () {
    /**
     * @class Menu contains all logic and functionality for
     * the menu.
     * Call function Menu.init() to operate.
     *
     * Pass in an Object {} containing
     * menuIcon - Icon being used for the menu (usually
     * the label in the 'checkbox' hack.
     *
     * nav – the high container element that
     * has all the menu items in it. Usually
     * a <nav> element.
     *
     * navItems – Array of all the links in the
     * navigation.
     *
     * navigationBackground – The element to put up
     * when the menu is active.
     *
     * menuContainer – the parent container element of
     * all the elements that pertain to navigation
     *
     */
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
            bindAll(this);
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
                this.menuIcon.checked = false;
                this.toggleMenu();
            }
        }, {
            key: 'toggleMenu',
            value: function toggleMenu() {
                // get the toggleElements;
                var toggleElements = this.getToggleElements();
                this.isOpen
                // if isOpen == true remove classes
                ? Utilities.removeClass('active', toggleElements)
                // else if isOpen == false add classes
                : Utilities.addClass('active', toggleElements);
                // toggle state
                this.isOpen = !this.isOpen;
            }
        }]);

        return Menu;
    }(); // end of class Menu
    /*
    Menu elements
    */


    var menuElements = {
        menuIcon: document.getElementById('menu'),
        nav: document.getElementsByClassName('nav')[0],
        navItems: [].concat(_toConsumableArray(document.querySelectorAll('.nav__link'))),
        navigationBackground: document.getElementsByClassName('nav-bg')[0],
        menuContainer: document.querySelector('.menu-container')
    };
    var menu = new Menu(menuElements).init();

    /**
     * FORM FUNCTIONALITY
     */
    //

    var Form = function () {
        function Form(form, callback) {
            _classCallCheck(this, Form);

            this.form = form;
            this.callback = callback;
            this.init = this.init.bind(this);
            this.reject = this.reject.bind(this);
            this.submit = this.submit.bind(this);
            this.submitHandler = this.submitHandler.bind(this);
        }

        _createClass(Form, [{
            key: 'init',
            value: function init() {
                this.form.addEventListener('submit', this.submitHandler);
            }
        }, {
            key: 'submitHandler',
            value: function submitHandler(e) {
                e.preventDefault();

                var order = {
                    name: this.form.name.value,
                    size: this.form.size.value,
                    type: this.form.type.value,
                    comments: this.form.comments.value
                };

                var orderStatus = Form.isOrderValid({ name: order.name, size: order.size, type: order.type });
                // if orderStatus is all good, submit, otherwise reject and give reason
                orderStatus ? this.submit(order) : this.reject(Form.generateErrors({ name: order.name, size: order.size, type: order.type }));
            }
        }, {
            key: 'submit',
            value: function submit(order) {
                console.log('submit', order);
                this.callback(order);
            }
        }, {
            key: 'reject',
            value: function reject(errors) {
                // get the container
                var errorContainer = document.getElementsByName('errors')[0];
                // set the error text in the container
                errorContainer.classList.contains('active') ? errorContainer.innerText = 'Oh no, the computer God\'s told us no for these reasons:' : errorContainer.classList.add('active');
                errorContainer.innerText = errorContainer.innerText += '\n ' + errors.map(function (error) {
                    return '\u2022 ' + error;
                }).join('\n') + '  ';
            }
        }], [{
            key: 'isOrderValid',
            value: function isOrderValid(_ref) {
                var name = _ref.name,
                    size = _ref.size,
                    type = _ref.type;

                return !!name && !!size && !!type;
            }
        }, {
            key: 'generateErrors',
            value: function generateErrors(_ref2) {
                var name = _ref2.name,
                    size = _ref2.size,
                    type = _ref2.type;

                var nameValid = !!name,
                    sizeValid = !!size,
                    typeValid = !!type;
                var errorReport = [];
                if (!nameValid) {
                    errorReport.push('Name is required (so you can get your coffee)');
                }
                if (!sizeValid) {
                    errorReport.push('Size is required (i.e. how addicted are you?)');
                }
                if (!typeValid) {
                    errorReport.push('Type is required (some people like milk, some don\'t)');
                }
                console.log(errorReport);
                return errorReport;
            }
        }]);

        return Form;
    }();

    var submitCallback = function submitCallback(_ref3) {
        var name = _ref3.name,
            type = _ref3.type,
            size = _ref3.size;


        // populate the order summary
        var nameSpan = document.querySelector('[data-nameSpan]');
        var orderSummarySpan = document.querySelector('[data-orderSummarySpan]');

        nameSpan.textContent = name;
        orderSummarySpan.textContent = 'Your ' + size + ' ' + type + ' will be ready for you. Until then, we chillin\'';

        // flip the order card
        var containers = [].concat(_toConsumableArray(document.getElementsByClassName('section__order-form-container')));
        containers.forEach(function (container) {
            return container.classList.add('submitted');
        });
    };

    var form = new Form(document.forms[0], submitCallback).init();

    /*
    UTILITY FUNCTIONS
     */
    var Utilities = {
        /**
         *  addClass method
         * @param className = className to add
         * @param elements  = elements to add className to
         *
         */
        addClass: function addClass(className, elements) {
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
                }
            } else {
                throw new Error('Could not add classes, check arguments');
            }
        }, // end of addClass() function
        /**
         *
         * @param className = className to remove
         * @param elements (option) = Array or String of element(s)
         *                            to remove from
         *
         * If no elements are provided, the elements
         * containing the class to remove will targeted.
         *
         */
        removeClass: function removeClass(className, elements) {
            if (elements) {
                switch (elements.constructor) {
                    //  If elements type is Array, sweet go through
                    // remove the className from the element.classList
                    case Array:
                        /*$FlowFixMe*/
                        elements.map(function (element) {
                            return element.classList.remove(className);
                        });
                        break;
                    //  If elements type is String, sweet go through
                    //  define an array of that String and remove the
                    //  className from each element.classList
                    case String:
                        // make the array
                        console.log(elements);
                        /*$FlowFixMe*/
                        var collection = [].concat(_toConsumableArray(document.getElementsByClassName(elements)));
                        // while the array has a length
                        while (collection.length) {
                            // take the last item off the array
                            var currentElement = collection.pop();
                            // manipulate it's classes
                            currentElement.classList.remove(className);
                        }
                        break;
                    default:
                        throw new Error('Could not remove classNames from elements, check arguments');
                }
            } else if (className) {
                var _elements = [].concat(_toConsumableArray(document.getElementsByClassName(className)));
                _elements.map(function (element) {
                    return element.classList.remove(className);
                });
            } else {
                throw new Error('Could not manipulate classes, check arguments');
            }
        } /*end of Utilities*/
    };
}); /*end of DOMContentLoaded*/

//# sourceMappingURL=script.js.map