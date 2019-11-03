var body = document.querySelector('body');
var nav = document.querySelector('.main-header__nav');
var navBlock = document.querySelector('.main-header__block');
var navBtn = document.querySelector('.main-header__nav-btn');
var navLi = document.querySelectorAll('.main-header__nav li');
var section = document.querySelectorAll('.section');
var prevScrollpos = window.pageYOffset;
var linkScroll = document.querySelectorAll('[data-link-scroll]');




body.classList.remove('no-js');
body.style.paddingTop = navBlock.offsetHeight.toString() + 'px';


window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if(currentScrollPos > (navBlock.offsetTop + navBlock.offsetHeight)) {

        if (prevScrollpos > currentScrollPos) {
            navBlock.style.top = "0px";
        } else {
            navBlock.style.top = -navBlock.offsetHeight.toString() + 'px';
            nav.classList.remove('active');
            navBtn.classList.remove('active');
        }

        prevScrollpos = currentScrollPos;
    }
}



navBtn.addEventListener('click', function(e) {
    e.preventDefault();

    if(this.classList.contains('active')) {
        this.classList.remove('active');
        nav.classList.remove('active');
    } else {
        this.classList.add('active');
        nav.classList.add('active');
    }
});


if (document.body.scrollIntoView) {
    for (var i = 0; i < linkScroll.length; i++) {
        linkScroll[i].addEventListener('click', function(e) {
            var linkHref = this.getAttribute("href").substring(1);
            e.preventDefault();

            document.getElementById(linkHref).scrollIntoView({
                behavior: 'smooth'
            });
        });
    };
};
