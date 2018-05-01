/*jshint esversion: 6 */
/*jshint strict:false */

// Wait for the DOM Content to finish loading
document.addEventListener('DOMContentLoaded', () => {

    /*
    Menu functionality
     */
    // define all the elements
    // of the elements
    const menu = document.getElementById('menu');
    const navBg = document.getElementsByClassName('nav-bg')[0];
    const nav = document.getElementsByClassName('nav')[0];
    const menuContainer = document.querySelector('.menu-container');
    const menuArray = [menu,navBg, nav, menuContainer];

    // toggleMenu functions
    const toggleMenu = () => {
        // if the menuContainer contains active
        // remove the active class
        if( menuContainer.classList.contains('active') ){
            let menuArrayCopy = [...menuArray];
            manipulateClasses('remove', 'active', menuArrayCopy);
        }
        // else add the active class
        else {
            let menuArrayCopy = [...menuArray];
            manipulateClasses('add', 'active', menuArrayCopy);
        }
    };
    // If a selection is made the menu
    // should also toggle
    const handleSelection = () => {
        menu.checked = false;
        toggleMenu();
    };
    // add handleSelection listener to allMenuLinks
    const allMenuLinks = [...document.querySelectorAll('.nav__link')];
    allMenuLinks.map( link => {
        link.addEventListener( 'click', handleSelection);
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

const manipulateClasses = (action,className, elements) => {
    // check if elements were passed
    // to function
    switch(action){
        case 'add':
            // add code
            if(elements){
                switch(elements.constructor) {
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
            } else if(className) {
                const elements = [...document.getElementsByClassName(className)];
                elements.map( element => ( element.classList.add(className) ) );
            } else {
                throw new Error('Could not manipulate classes, check arguments');
            }
            break;
        case 'remove':
                // remove code
                if(elements){
                    switch(elements.constructor) {
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
                            break;
                    }
                } else if(className) {
                    const elements = [...document.getElementsByClassName(className)];
                    elements.map( element => ( element.classList.remove(className) ) );
                } else {
                    throw new Error('Could not manipulate classes, check arguments');
                }
                break;
            default:
                throw new Error('No action, please choose either add or remove.');
        }
};
