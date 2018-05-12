'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    }, // end of removeClass
    loadScript: function loadScript(src, callback) {
        var script = document.createElement('script');
        var loaded = false;
        script.setAttribute('src', src);
        if (callback) {
            script.onreadystatechange = script.onload = function () {
                if (!loaded) {
                    callback();
                }
                loaded = true;
            };
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    } // end loadScript
    /*end of Utilities*/

};var Styles = {
    // cta a.k.a BEAN
    cta: "#b14d61",
    // bean darker
    ctaDarker: "#9e465b"
};

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
     * @class Map contains the logic needed to render
     *        a mapbox map
     *
     * @function setToken gets the token from the server
     *           and returns a promise with the token
     *
     * @function init initiates the map, should be called
     *           in the resolve of the above function
     */
    var Map = function () {
        function Map(container) {
            _classCallCheck(this, Map);

            this.container = container;
            this.init.bind(this);
            this.setToken.bind(this);
        }

        _createClass(Map, [{
            key: 'init',
            value: function init() {
                var map = new mapboxgl.Map({
                    container: this.container,
                    style: 'mapbox://styles/mapbox/streets-v10',
                    minZoom: 14,
                    maxZoom: 24,
                    center: [153.02138889, -27.47797222],
                    interactive: false
                });
                var marker = new mapboxgl.Marker();
                marker.setLngLat([153.02138889, -27.47797222]).addTo(map);
            }
        }, {
            key: 'setToken',
            value: function setToken() {
                return new Promise(function (resolve, reject) {
                    var http = new XMLHttpRequest();
                    var response = {};
                    http.open("GET", '/map', true);
                    http.setRequestHeader("Content-Type", "application/json");
                    http.onreadystatechange = function () {
                        if (http.readyState === 4 && http.status === 200) {
                            var _response = JSON.parse(http.response);
                            resolve(_response.token);
                        }if (http.status === 403) {
                            reject('403 Forbidden');
                        }
                    };
                    http.send();
                }); //  getToken()
            }
        }]);

        return Map;
    }(); // end Map

    var map = new Map('map');
    // to make sure mapboxgl is on the window element we'll append and load
    // it using JS, and then grab the token to set it, followed finally by
    // initiating the map
    Utilities.loadScript("https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js", function () {
        map.setToken().then(function (token) {
            return window.mapboxgl.accessToken = token;
        }).then(function () {
            return map.init();
        });
    });
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
        function Form(form, callback, rejectCallback) {
            _classCallCheck(this, Form);

            this.form = form;
            this.callback = callback;
            this.rejectCallback = rejectCallback;
            this.noValidate = false;
            this.inputs = {
                radio: [].concat(_toConsumableArray(form.elements)).filter(function (element) {
                    return element.type === 'radio';
                }),
                text: [].concat(_toConsumableArray(form.elements)).filter(function (element) {
                    return element.type === 'text' || element.type === 'textarea';
                }),
                checkbox: [].concat(_toConsumableArray(form.elements)).filter(function (element) {
                    return element.type === 'checkbox';
                })
            };
            this.init = this.init.bind(this);
            this.submit = this.submit.bind(this);
            this.reject = this.reject.bind(this);
            this.submitHandler = this.submitHandler.bind(this);
            this.isFormValid = this.isFormValid.bind(this);
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
                var elements = this.form.elements;
                var formStatus = this.isFormValid(elements);
                console.log(formStatus);
                // if orderStatus is all good, submit, otherwise reject and give reason
                formStatus ? this.submit(elements) : this.reject();
            }
        }, {
            key: 'isFormValid',
            value: function isFormValid() {
                // if noValidate === true just return true
                if (this.noValidate === true) return true;
                // name our inputs human friendly
                var radioInputs = this.inputs.radio,
                    textInputs = this.inputs.text,
                    checkboxInputs = this.inputs.checkbox;
                // check which types we need to validate
                // and run validation where its required
                // otherwise give us true
                var radioValid = radioInputs ? Form.checkRadioInputs(radioInputs) : true,
                    textValid = textInputs ? Form.checkTextInputs(textInputs) : true,
                    checkboxValid = checkboxInputs ? Form.checkCheckboxInputs(checkboxInputs) : true;
                // is the form valid? if all values are true–apparently so.
                return radioValid && textValid && checkboxValid;
            }
        }, {
            key: 'submit',
            value: function submit(elements) {
                this.callback && this.callback(elements);
            }
        }, {
            key: 'reject',
            value: function reject() {
                this.rejectCallback && this.rejectCallback();
            }
        }], [{
            key: 'checkRadioInputs',
            value: function checkRadioInputs(radioInputs) {
                // TODO: add required support
                // using the Set object by mapping over the names we can pick out the
                // unique values and immediately return the size of the Set to get our
                // number of radio groups
                var numberOfRadioGroups = new Set(radioInputs.map(function (input) {
                    return input.name;
                })).size;
                // similarly we can grab the checked values by filter(ing) through all the
                // radio inputs and grabbing the length of that array
                var numberOfCheckedInputs = radioInputs.filter(function (input) {
                    return input.checked;
                }).length;
                // these number should equal each other.
                return numberOfRadioGroups === numberOfCheckedInputs;
            }
        }, {
            key: 'checkTextInputs',
            value: function checkTextInputs(textInputs) {
                // map over text inputs, check if the input is required
                // if it is coerce it's value to a boolean,
                // if there are any falsey values
                // in the returned array, it means we have
                // an invalid input. Flip the return value
                // to bring the result inline with
                // the other validation functions
                return !textInputs.map(function (input) {
                    return input.required ? !!input.value : true;
                }).includes(false);
            }
        }, {
            key: 'checkCheckboxInputs',
            value: function checkCheckboxInputs(checkboxInputs) {
                // pretty much a copy pasta from above.. but here is how it works:
                // map over text inputs, check if the input is required
                // if it return it's input.checked value (i.e. true or false),
                // if there are any falsey values
                // in the returned array, it means we have
                // an invalid input. Flip the return value
                // to bring the result inline with
                // the other validation functions
                return !checkboxInputs.map(function (input) {
                    return input.required ? input.checked : true;
                }).includes(false);
            }
        }, {
            key: 'generateErrors',
            value: function generateErrors(elements) {

                // const nameValid = !!name,
                //       sizeValid = !!size,
                //       typeValid = !!type;
                // let errorReport = [];
                // if( !nameValid ){
                //     errorReport.push(`Name is required (so you can get your coffee)`);
                // }
                // if( !sizeValid ){
                //     errorReport.push('Size is required (i.e. how addicted are you?)');
                // }
                // if( !typeValid ){
                //     errorReport.push(`Type is required (some people like milk, some don't)`);
                // }
                // console.log(errorReport);
                // return errorReport;
            }
        }]);

        return Form;
    }();

    var submitCallback = function submitCallback(elements) {

        var name = elements.name.value,
            size = elements.size.value || '',
            type = elements.type.value || 'coffee';

        // populate the order summary
        var nameSpan = document.querySelector('[data-nameSpan]');
        var orderSummarySpan = document.querySelector('[data-orderSummarySpan]');

        nameSpan.textContent = name.toLowerCase();
        orderSummarySpan.textContent = 'Your ' + size + ' ' + type + ' will be ready for you. Until then, we chillin\'';

        // drop the order card and rise the summary card
        var containers = [].concat(_toConsumableArray(document.querySelectorAll("[class^='section__order-form-container--']")));
        containers.forEach(function (container) {
            return container.classList.add('submitted');
        });
    };

    var rejectCallback = function rejectCallback() {
        // get the container
        var errorContainer = document.getElementsByName('errors')[0];
        // set the error text in the container
        errorContainer.classList.contains('active') ? errorContainer.innerText = 'Oh no, the computer God\'s told us no for these reasons:' : errorContainer.classList.add('active');
        errorContainer.innerText = errorContainer.innerText += '\n ' + errors.map(function (error) {
            return '\u2022 ' + error;
        }).join('\n') + '  ';
    };

    var form = new Form(document.forms[0], submitCallback, rejectCallback).init();
    // const contactForm = new Form(document.forms[1],preventDefaultSubmission).init();
}); /*end of DOMContentLoaded*/

//# sourceMappingURL=script.js.map