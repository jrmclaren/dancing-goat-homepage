// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', () => {

    /*
    Menu functionality
     */

    const menuIcon = document.getElementById('menu');
    const navigationBackground = document.getElementsByClassName('nav-bg')[0];
    const nav = document.getElementsByClassName('nav')[0];
    const menuContainer = document.querySelector('.menu-container');
    const navItems = [...document.querySelectorAll('.nav__link')];

    const menuElementsObject = {
        menuIcon,
        nav,
        navItems,
        navigationBackground,
        menuContainer
    };

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
            this.menu.checked = false;
            this.toggleMenu();
        };

        toggleMenu() {
            // if the menuContainer contains active
            // remove the active class
            let toggleElements = this.getToggleElements();
            if( this.isOpen ){
                manipulateClasses('remove', 'active', toggleElements);
                this.isOpen = false;
            }
            // else add the active class
            else {
                manipulateClasses('add', 'active', toggleElements);
                this.isOpen = true;
            }
        };
    }

    const menu = new Menu(menuElementsObject);
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
const manipulateClasses = (action,className, elements) => {
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
            } else if (className) {
                const elements = [...document.getElementsByClassName(className)];
                elements.map(element => (element.classList.add(className)));
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
                            // manipulate it's class
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
            break;
        default:
            throw new Error('No action, please choose either add or remove.');
    }
}
});
