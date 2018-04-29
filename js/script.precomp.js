document.addEventListener('DOMContentLoaded', () => {

const menu = document.getElementById('menu');
const navBg = document.getElementsByClassName('nav-bg')[0];
const nav = document.getElementsByClassName('nav')[0];
const menuContainer = document.querySelector('.menu-container');
const toggleActive = () => {
    if( menuContainer.classList.contains('active') ){
        menuContainer.classList.remove('active');
        navBg.classList.remove('active');
        nav.classList.remove('active');
    } else {
        menuContainer.classList.add('active');
        navBg.classList.add('active');
        nav.classList.add('active');
    }
};
menu.addEventListener('change', toggleActive);

});