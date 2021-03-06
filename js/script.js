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
                    return element.type === 'text' || element.type === 'textarea' || element.type === 'email';
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
            this.generateErrors = this.generateErrors.bind(this);
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
                formStatus ? this.submit(elements) : this.reject(this.generateErrors());
                return false;
            }
        }, {
            key: 'isFormValid',
            value: function isFormValid() {
                // if noValidate === true just return true
                // because we don't need to validate anything
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
            key: 'generateErrors',
            value: function generateErrors(elements) {
                var _this2 = this;

                // let errorReport = [];
                /*
                ******* Text Inputs
                */
                // checking for the false text inputs is
                // fairly easy. We can leverage our checkTextInputs function
                // to assist in constructing an object for each input that
                // holds is valid status.
                var textInputs = this.inputs.text.map(function (input) {
                    return {
                        name: input.name,
                        valid: Form.checkTextInputs([input]),
                        type: 'text'
                    };
                });
                // After returning this array
                // filter through it and remove the items that are valid
                textInputs = textInputs.filter(function (item) {
                    return !item.valid;
                });

                // radio inputs are a bit more tricky, as they'll only
                // basically we need to grab the unique names to determined
                // the radio groups, then we need to test that each name
                // has a value, if it does they're all answered
                var uniqueNames = [].concat(_toConsumableArray(new Set(this.inputs.radio.map(function (input) {
                    return input.name;
                }))));
                /*
                ******* Radio Groups
                 */
                // now get the NodeRadioList for each radioGroup
                var radioGroups = uniqueNames.map(function (name) {
                    return _this2.form[name];
                });
                // turn it into and array to inherit
                // Array.prototype methods
                radioGroups = [].concat(_toConsumableArray(radioGroups));
                // filter radioGroups and get the groups
                // with no value, i.e. no selection made.
                radioGroups = radioGroups.filter(function (group) {
                    return !group.value;
                });
                // prepare the errors object for each group
                radioGroups = radioGroups.map(function (group) {
                    return {
                        // we have to grab the name of one
                        // of the radio inputs inside the group
                        // just grab the first one.
                        // Arrays start at zero. ;)
                        name: group[0].name,
                        // the value of the group should be "" so
                        // lets just turn that into a false value
                        // if for some reason it's not "" we won't
                        // be lying.
                        valid: !!group.value,
                        type: 'radio'
                    };
                });
                /*
                ******* Checkboxes
                */
                // lets filter all the checkboxes in the form
                // grab those that are not checked, and are required
                // put them into the pretty object.
                var checkboxInputs = this.inputs.checkbox.filter(function (checkbox) {
                    return !checkbox.checked && checkbox.required;
                });
                checkboxInputs = checkboxInputs.map(function (input) {
                    return {
                        name: input.name,
                        valid: input.checked,
                        type: 'checkbox'
                    };
                });
                /*
                ******* Concat the errors
                */
                var errorReport = textInputs.concat(radioGroups, checkboxInputs);

                console.error(errorReport);
                return errorReport;
            }
        }, {
            key: 'submit',
            value: function submit(elements) {
                console.log('submit callback');
                this.callback && this.callback(elements);
            }
        }, {
            key: 'reject',
            value: function reject(errors) {
                console.error('reject callback');
                this.rejectCallback ? this.rejectCallback(errors) : console.error(errors);
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
            key: 'checkEmailInput',
            value: function checkEmailInput(emailInputs) {}
        }]);

        return Form;
    }();

    var orderSubmitCallback = function orderSubmitCallback(elements) {

        var name = elements.name.value,
            size = elements.size.value || '',
            type = elements.type.value || 'coffee';

        // populate the order summary
        var nameSpan = document.querySelector('[data-nameSpan]');
        var orderSummarySpan = document.querySelector('[data-orderSummarySpan]');

        var replayAnimation = function replayAnimation() {
            var element = document.getElementsByTagName('html')[0];
            element.classList.remove('reveal-slider');
            void element.offsetWidth;
            element.classList.add('reveal-slider');
            window.location.hash = '#order';
        };
        replayAnimation();

        nameSpan.textContent = name.toLowerCase();
        orderSummarySpan.textContent = 'Your ' + size + ' ' + type + ' will be ready for you. Until then, we chillin\'';

        // drop the order card and rise the summary card
        var containers = [].concat(_toConsumableArray(document.querySelectorAll("[class^='section__order-form-container--']")));
        containers.forEach(function (container) {
            return container.classList.add('submitted');
        });
    };

    var orderRejectCallback = function orderRejectCallback(errors) {
        // get the container
        var errorContainer = document.querySelectorAll('[data-name="errors"]')[0];
        // set the error text in the container
        !errorContainer.classList.contains('active') && errorContainer.classList.add('active');
        var list = errorContainer.querySelector('ul');
        list.innerHTML = errors.map(function (error) {
            return '<li>' + error.name + ': ' + error.name + ' is required.</li>';
        }).join(' ');
    };

    var preventDefaultSubmission = function preventDefaultSubmission(e) {
        return e.preventDefault && e.preventDefault();
    };

    var contactCallback = function contactCallback(elements) {
        var form = document.forms[1];
        var confirmation = document.querySelector('[data-name="contact-body"]');
        var button = document.getElementsByName('contact_submit')[0];
        var errorContainer = document.querySelectorAll('[data-name="errors"]')[1];
        button.classList.add('btn--submitted');
        button.classList.add('response');
        errorContainer.classList.contains('active') && errorContainer.classList.remove('active');
        [].concat(_toConsumableArray(form.elements)).forEach(function (el) {
            return el.setAttribute('disabled', true);
        });
    };

    var contactRejectCallback = function contactRejectCallback(errors) {
        var errorContainer = document.querySelectorAll('[data-name="errors"]')[1];
        // set the error text in the container
        !errorContainer.classList.contains('active') && errorContainer.classList.add('active');
        var list = errorContainer.querySelector('ul');
        list.innerHTML = errors.map(function (error) {
            return '<li>' + error.name + ': ' + error.name.split('_').join(' ') + ' is required.</li>';
        }).join(' ');
    };

    var orderForm = new Form(document.forms[0], orderSubmitCallback, orderRejectCallback).init();
    var contactForm = new Form(document.forms[1], contactCallback, contactRejectCallback).init();
}); /*end of DOMContentLoaded*/

//# sourceMappingURL=script.js.map