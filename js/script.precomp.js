document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('menu');
    const navBg = document.getElementsByClassName('nav-bg')[0];
    const nav = document.getElementsByClassName('nav')[0];
    const menuContainer = document.querySelector('.menu-container');
    const toggleActive = () => {
        if( menuContainer.classList.contains('active') ){
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
    const handleSelection = () => {
        toggleActive();
        };
    // add handleSelection listener to allMenuLinks
    const allMenuLinks = [...document.querySelectorAll('.nav__link')];
    allMenuLinks.map( link => {
        link.addEventListener( 'click', handleSelection);
    });
});



/*
UTILITY FUNCTIONS
WIP
 */

const removeClasses = ( className, elements ) => {
    switch(elements.constructor){
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