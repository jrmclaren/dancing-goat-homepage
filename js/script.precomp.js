// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', () => {
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
    class Menu {
        constructor( menuItems ){
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
        init(){
            // add handleSelection to each link
            this.navItems.map( link => {
                link.addEventListener( 'click', this.handleSelection);
            });
            // add toggleMenu to change event on menuIcon (i.e. checkbox)
            this.menuIcon.addEventListener('change', this.toggleMenu);
        }

        getToggleElements() {
            return [this.menuIcon, this.nav, this.navigationBackground, this.menuContainer];
        }

        handleSelection() {
            this.menuIcon.checked = false;
            this.toggleMenu();
        };

        toggleMenu() {
            // get the toggleElements;
            let toggleElements = this.getToggleElements();
            this.isOpen
                // if isOpen == true remove classes
                ? Utilities.removeClass('active', toggleElements)
                // else if isOpen == false add classes
                : Utilities.addClass('active', toggleElements);
            // toggle state
            this.isOpen = !this.isOpen;
        };
    } // end of class Menu
    /*
   Menu elements
    */
    const menuElements = {
        menuIcon: document.getElementById('menu'),
        nav: document.getElementsByClassName('nav')[0],
        navItems: [...document.querySelectorAll('.nav__link')],
        navigationBackground: document.getElementsByClassName('nav-bg')[0],
        menuContainer: document.querySelector('.menu-container')
    };
    const menu = new Menu(menuElements);
    menu.init();
/*
UTILITY FUNCTIONS
 */
const Utilities = {
    /**
     *
     * @param className = className to add
     * @param elements  = elements to add to
     *
     */
    addClass: (className, elements) => {
            if (elements) {
                switch (elements.constructor) {
                    //  If elements type is Array, sweet go through
                    // add the className from the element.classList
                    case Array:
                        elements.map(element => (element.classList.add(className)));
                        break;
                    //  If elements type is String, sweet go through
                    //  define an array of that String and add the
                    //  className from each element.classList
                    case String:
                        // make the array
                        const collection = [...document.getElementsByClassName(elements)];
                        // while the array has a length
                        while (collection.length) {
                            // take the last item off the array
                            let currentElement = collection.pop();
                            // manipulate it's class
                            currentElement.classList.add(className);
                        }
                        break;
                    default:
                        throw new Error(`Could not add classNames from elements, check arguments`);
                        break;
                }
            }  else {
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
    removeClass: ( className, elements ) => {
            if (elements) {
                switch (elements.constructor) {
                    //  If elements type is Array, sweet go through
                    // remove the className from the element.classList
                    case Array:
                        elements.map(element => (element.classList.remove(className)));
                        break;
                    //  If elements type is String, sweet go through
                    //  define an array of that String and remove the
                    //  className from each element.classList
                    case String:
                        // make the array
                        const collection = [...document.getElementsByClassName(elements)];
                        // while the array has a length
                        while (collection.length) {
                            // take the last item off the array
                            let currentElement = collection.pop();
                            // manipulate it's classes
                            currentElement.classList.remove(className);
                        }
                        break;
                    default:
                        throw new Error(`Could not remove classNames from elements, check arguments`);
                }
            } else if (className) {
                const elements = [...document.getElementsByClassName(className)];
                elements.map(element => (element.classList.remove(className)));
            } else {
                throw new Error('Could not manipulate classes, check arguments');
            }
        } // end of removeClass() function
    }
});
