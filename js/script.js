
//Определение номера элемента, на котором сработал click, в родителе
function getNumberChild(element, parent) {
    //parent = element.parentNode.children;
    for (var i = 0; i < parent.length; i++) {
        if (element == parent[i]) {
            return i;
        };
    }
}
//Menu
const SELECTOR_NAV_MINI = '.nav__mini';
const SELECTOR_NAV_LIST = '.nav__list';
const CLASS_NAV_ACTIVE = 'active';
const TAGNAME_MENU_ITEM = 'A';
const SELECTOR_NAV_ITEM = '.nav__item';
const SELECTOR_NAV_LINK = '.nav__link';
const CLASS_LINK_ACTIVE = 'nav__link_active';
const SELECTOR_NAVBAR = '.header__navbar';
const CLASS_NAVBAR_ACTIVE = 'scrolling';
const SELECTOR_ANCHORS_MENU = '.anchor-menu';
const SELECTOR_SECTIONS = ".scroll-block";
const CLASS_ANIMATION_SECTION_ON_SCROLL = 'animationScroll';
var navMini = document.querySelector(SELECTOR_NAV_MINI);
var navList = document.querySelector(SELECTOR_NAV_LIST);
var navItems = document.querySelectorAll(SELECTOR_NAV_ITEM);
var navbar = document.querySelector(SELECTOR_NAVBAR);
var navLink = document.querySelectorAll(SELECTOR_NAV_LINK);
var anchors = document.querySelectorAll(SELECTOR_ANCHORS_MENU);
var animItems = document.querySelectorAll(SELECTOR_SECTIONS);
var selectItemMenu = 0;
//Mini menu
if ((navMini != null) && (navList != null)) {
    navMini.addEventListener('click', clickMiniMenu);
}
function clickMiniMenu() {
    navMini.classList.toggle(CLASS_NAV_ACTIVE);
    navList.classList.toggle(CLASS_NAV_ACTIVE);
}

//Click on menu
if ((navList != null) && (navItems.length > 0)) {
    navList.addEventListener('click', function (event) {
        if (event.target.tagName != TAGNAME_MENU_ITEM) return;
        //Change class select menu
        navItems[selectItemMenu].children[0].classList.remove(CLASS_LINK_ACTIVE);
        selectItemMenu = getNumberChild(event.target.parentNode, navItems);
        //Scroll to section
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var coordY = anchors[selectItemMenu].getBoundingClientRect().top + scrollTop - navbar.offsetHeight;
        scrollToSection(coordY, 200, 0);
        event.preventDefault();
        //Change class select menu
        navItems[selectItemMenu].children[0].classList.add(CLASS_LINK_ACTIVE);
        if (window.matchMedia('(max-width: 865px)')) {
            clickMiniMenu();
        }

    })

    //Slowly scroll
    function scrollToSection(targetScroll, duration, durationI) {
        if (duration <= 0) return;
        var difference = targetScroll - Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var perTick = difference / duration * 10;
        setTimeout(function () {
            document.documentElement.scrollTop = document.documentElement.scrollTop + perTick;
            document.body.scrollTop = document.body.scrollTop + perTick;
            if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) === targetScroll) return;
            scrollToSection(targetScroll, duration - 10, 10);
        }, durationI);
    }

}

//Change menu on Scroll
if ((animItems.length > 0) && (navItems.length > 0) && (navbar != null)) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //Add color of menu on scroll
        if (scrollTop > 0) {
            navbar.classList.add(CLASS_NAVBAR_ACTIVE);
        } else {
            navbar.classList.remove(CLASS_NAVBAR_ACTIVE);
        }
        //Change menu item on Scroll
        for (var i = 0; i < animItems.length; i++) {
            var animItem = animItems[i];
            var animItemOffset = animItem.getBoundingClientRect().top + scrollTop;
            var windowHeight = window.innerHeight;
            var animStart = 0.83;
            var animItemPoint = windowHeight - windowHeight * animStart;
            if ((pageYOffset > animItemOffset - animItemPoint)) {
                navItems[selectItemMenu].children[0].classList.remove(CLASS_LINK_ACTIVE);
                selectItemMenu = i;
                navItems[selectItemMenu].children[0].classList.add(CLASS_LINK_ACTIVE);
            }
        }
    }
}

//Slider
const ID_SLIDER = 'slider';
const SELECTOR_SLIDER_BODY = '.slider__body';
const SELECTOR_SLIDER_ITEM = '.slider__item';
const SELECTOR_CLIDER_SCROLL = '.scroll';
const SELECTOR_SCROLL_ITEM = '.scroll span';
const TAGNAME_SCROLL_ITEM = 'SPAN';
const CLASS_SLIDER_ACTIVE = 'active';

var viewSlide = 0;
var sliderViewport = document.getElementById(ID_SLIDER);
var slider = document.querySelector(SELECTOR_SLIDER_BODY);
var sliderItem = document.querySelectorAll(SELECTOR_SLIDER_ITEM);
var scrollSlider = document.querySelector(SELECTOR_CLIDER_SCROLL);
var viewSliders = document.querySelectorAll(SELECTOR_SCROLL_ITEM);

if ((sliderViewport != null) && (slider != null) && (scrollSlider != null) && (sliderItem.length != 0) && (viewSliders.length != 0)) {
    var numberSlide = sliderItem.length;
    viewSliders[0].classList.add(CLASS_SLIDER_ACTIVE);
    function moveSlider() {
        viewSliders[viewSlide].classList.add(CLASS_SLIDER_ACTIVE);
        slider.style.left = -viewSlide * sliderViewport.offsetWidth + 'px';
        for (var i = 0; i < sliderItem.length; i++) {
            if (i == viewSlide) {
                sliderItem[i].style.opacity = '1';
            } else {
                sliderItem[i].style.opacity = '0';
            }
        }
    }
    scrollSlider.addEventListener('click', function (event) {
        if (event.target.tagName != TAGNAME_SCROLL_ITEM) return;
        viewSliders[viewSlide].classList.remove(CLASS_SLIDER_ACTIVE);
        viewSlide = getNumberChild(event.target, viewSliders);
        moveSlider();
    })

    setInterval(function () {
        viewSliders[viewSlide].classList.remove(CLASS_SLIDER_ACTIVE);
        sliderItem[viewSlide].style.opacity = '0';
        if (viewSlide < numberSlide - 1) {
            viewSlide++;
        } else {
            viewSlide = 0;
        }
        moveSlider();
    }, 5000);

    window.addEventListener('resize', function () {
        slider.style.left = -viewSlide * sliderViewport.offsetWidth + 'px';
    })
} // end Slider

//Carusel
const ID_CARUSEL_BUTTON_NEXT = 'carusel-back';
const ID_CARUSEL_BUTTON_PREV = 'carusel-forward';
const ID_CARUSEL = 'carusel';
const SELECTOR_CARUSEL_BODY = '.carusel__body';
const SELECTOR_CARUSEL_ITEM = '.carusel__item';
const SELECTOR_CARUSEL_NAV = '.nav-carusel';
const SELECTOR_CARUSEL_NAV_ITEM = '.nav-carusel__item';
const CLASS_CARUSEL_NAV_ITEM_ACTIVE = 'nav-carusel__item_active';
var btnNextCarusel = document.getElementById(ID_CARUSEL_BUTTON_NEXT);
var btnPrevCarusel = document.getElementById(ID_CARUSEL_BUTTON_PREV);
var caruselViewport = document.getElementById(ID_CARUSEL);
var carusel = document.querySelector(SELECTOR_CARUSEL_BODY);
var caruselItem = document.querySelectorAll(SELECTOR_CARUSEL_ITEM);
var navCarusel = document.querySelector(SELECTOR_CARUSEL_NAV);
var viewSlidersCarusel = document.querySelectorAll(SELECTOR_CARUSEL_NAV_ITEM);
var viewSlideCarusel = 0;
var classActiveSlide = CLASS_CARUSEL_NAV_ITEM_ACTIVE;


if ((btnNextCarusel != null) && (btnPrevCarusel != null) && (carusel != null) && (caruselViewport != null) && (caruselItem.length != 0) && (viewSlidersCarusel.length != 0)) {
    var numberSlideCarusel = caruselItem.length;
    for (var i = 0; i < viewSlidersCarusel.length; i++) {
        viewSlidersCarusel[i].style.order = i;
        if (viewSlidersCarusel[i].classList.contains(classActiveSlide)) {
            viewSlideCarusel = i;
        }
    }
    moveCarusel();
    navCarusel.addEventListener('click', function (event) {
        if (event.target.closest('#' + ID_CARUSEL_BUTTON_PREV)) {
            viewSlidersCarusel[viewSlideCarusel].classList.remove(classActiveSlide);
            prevCarusel();
            viewSlidersCarusel[viewSlideCarusel].classList.add(classActiveSlide);
            moveCarusel();
        } else if (event.target.closest('#' + ID_CARUSEL_BUTTON_NEXT)) {
            viewSlidersCarusel[viewSlideCarusel].classList.remove(classActiveSlide);
            nextCarusel();
            viewSlidersCarusel[viewSlideCarusel].classList.add(classActiveSlide);
            moveCarusel();
        } else if (event.target.tagName = 'IMG') {
            /* viewSlidersCarusel[viewSlideCarusel].classList.remove(classActiveSlide);
            var selectItemMenu = getNumberChild(event.target.parentNode, viewSlidersCarusel);
            if (viewSlideCarusel < selectItemMenu) { moveViewSlider(selectItemMenu - viewSlideCarusel, -1); }
            if (viewSlideCarusel > selectItemMenu) { moveViewSlider(viewSlideCarusel - selectItemMenu, 1); }
            viewSlideCarusel = selectItemMenu;
            viewSlidersCarusel[viewSlideCarusel].classList.add(classActiveSlide);
            moveCarusel(); */
        } else return;
    })

    function nextCarusel() {
        if (viewSlideCarusel < numberSlideCarusel - 1) {
            viewSlideCarusel++;
        } else {
            viewSlideCarusel = 0;
        }
        for (var i = 0; i < viewSlidersCarusel.length; i++) {
            if (window.getComputedStyle(viewSlidersCarusel[i]).order > 0) {
                viewSlidersCarusel[i].style.order = window.getComputedStyle(viewSlidersCarusel[i]).order - 1;
            } else {
                viewSlidersCarusel[i].style.order = numberSlideCarusel - 1;
            }
        }

    }
    /* function moveViewSlider(count, dir) {
        if (count <= 0) { return; }
        for (var i = 0; i < viewSlidersCarusel.length; i++) {
            var per = +window.getComputedStyle(viewSlidersCarusel[i]).order;
            per = per + dir;
            if (per > numberSlideCarusel - 1) {
                per = 0;
            }
            if (per < 0) {
                per = numberSlideCarusel - 1;
            }
            viewSlidersCarusel[i].style.order = per;
        }
        count--;
        moveViewSlider(count, dir);
    } */

    function prevCarusel() {
        if (viewSlideCarusel > 0) {
            viewSlideCarusel--;
        } else {
            viewSlideCarusel = numberSlideCarusel - 1;

        }
        for (var i = 0; i < viewSlidersCarusel.length; i++) {
            if (window.getComputedStyle(viewSlidersCarusel[i]).order < numberSlideCarusel - 1) {
                viewSlidersCarusel[i].style.order = +window.getComputedStyle(viewSlidersCarusel[i]).order + 1;
            } else {
                viewSlidersCarusel[i].style.order = 0;
            }
        }

    }

    function moveCarusel() {
        carusel.style.left = -viewSlideCarusel * caruselViewport.offsetWidth + 'px';
        for (var i = 0; i < caruselItem.length; i++) {
            if (i == viewSlideCarusel) {
                caruselItem[i].style.opacity = '1';
            } else {
                caruselItem[i].style.opacity = '0';
            }
        }
    }
    window.addEventListener('resize', function () {
        carusel.style.left = -viewSlideCarusel * caruselViewport.offsetWidth + 'px';
    })
}  // end Carusel

//Accordeon About us block
const SELECTOR_ACCORDION = '.accord';
const SELECTOR_ACCORDION_TEXT = '.accord__text';
const SELECTOR_ACCORDION_BUTTON = '.accord__button';
const BUTTON_TEXT_ACCORDION_CLOSE = 'Collapse';
const CLASS_ACCORDION_ACTIVE = 'show';
var accordBlock = document.querySelector(SELECTOR_ACCORDION);
var accordBlockText = document.querySelectorAll(SELECTOR_ACCORDION_TEXT);
var accordButton = document.querySelector(SELECTOR_ACCORDION_BUTTON);

if ((accordBlock != null) && (accordBlockText.length > 0) && (accordButton != null)) {
    function resizeAccord() {
        for (var i = 1; i < accordBlockText.length; i++) {
            accordBlockText[i].style.height = 'auto';
        }
    }
    var accordbuttonTextOpen = accordButton.textContent;
    if (accordBlockText.length > 1) {
        accordButton.style.display = 'inline-block';
        var accordFlag = true;
        accordButton.addEventListener('click', function () {
            if (accordFlag == true) {
                accordButton.textContent = BUTTON_TEXT_ACCORDION_CLOSE;
                for (var i = 1; i < accordBlockText.length; i++) {
                    accordBlockText[i].style.height = accordBlockText[i].scrollHeight + 'px';
                    accordBlockText[i].classList.add(CLASS_ACCORDION_ACTIVE);
                }
                accordBlockText[0].style.marginBottom = getComputedStyle(document.querySelector('.' + CLASS_ACCORDION_ACTIVE)).marginBottom;
                window.addEventListener('resize', resizeAccord, onceSupport ? { once: true } : false);
                accordFlag = false;
            } else {
                window.removeEventListener('resize', resizeAccord, onceSupport ? { once: true } : false);
                accordButton.textContent = accordbuttonTextOpen;
                for (var i = 1; i < accordBlockText.length; i++) {
                    accordBlockText[i].style.height = null;
                    accordBlockText[i].classList.remove(CLASS_ACCORDION_ACTIVE);
                }
                accordBlockText[0].style.marginBottom = '0';
                accordFlag = true;
            }
        })
    } else {
        accordButton.style.display = 'none';
    }
}
//Проверка параметра once addEventListener
var onceSupport = false;
try {
    var options = Object.defineProperty({}, "once", {
        get: function () {
            onceSupport = true;
        }
    });
    window.addEventListener('test', null, options);
} catch (err) { }

//Load more work
const SELECTOR_WORK_ITEMS = '.work__item';
const ID_WORK_BUTTON = 'moreWork';
const WORK_BUTTON_TEXT_CLOSE = 'Collapse';
var workButton = document.getElementById(ID_WORK_BUTTON);
var workItems = document.querySelectorAll(SELECTOR_WORK_ITEMS);

if (workButton != null) {
    if (workItems.length > 0) {
        var countVisibleWork = workItems.length;
        for (var i = 0; i < workItems.length; i++) {
            if (window.getComputedStyle(workItems[i]).display == 'none') {
                countVisibleWork = i - 1;
                break;
            }
        }
    }
    if (workItems.length > countVisibleWork) {
        var flagMoreWork = false;
        var buttonTextOpen = workButton.textContent;
        workButton.addEventListener('click', function () {
            if (flagMoreWork == false) {
                for (var i = countVisibleWork + 1; i < workItems.length; i++) {
                    workItems[i].style.display = 'block';
                }
                workButton.textContent = WORK_BUTTON_TEXT_CLOSE;
                flagMoreWork = true;
            } else {
                for (var i = countVisibleWork + 1; i < workItems.length; i++) {
                    workItems[i].style.display = 'none';
                }
                workButton.textContent = buttonTextOpen;
                flagMoreWork = false;
            }
        })
    } else {
        moreWorkButton.style.display = 'none';
    }
}

//Video
var videoContent = document.getElementById('video');
var videoControl = document.querySelector('.video__control');
var videoButton = document.getElementById('videoButton');
const CLASS_VIDEO_HIDE = 'video__control_hide';
//svg
var playpause = document.getElementById('playpause');
var lefttopause = document.getElementById('lefttopause');
var lefttoplay = document.getElementById('lefttoplay');
var righttopause = document.getElementById('righttopause');
var righttoplay = document.getElementById('righttoplay');
var leftpause = document.getElementById('leftpause');
var rightpause = document.getElementById('rightpause');
var rightbar = document.getElementById('rightbar');
var leftbar = document.getElementById('leftbar');

if ((videoButton != null) && (videoContent != null) && (videoControl != null)) {
    videoContent.removeAttribute('controls');
    videoControl.style.display = "flex";
    videoButton.addEventListener('click', playVideo);
    function playVideo() {
        if (videoContent.paused) {
            videoContent.play();
            videoControl.classList.add(CLASS_VIDEO_HIDE);
            if ('beginElement' in lefttopause) {
                lefttopause.beginElement();
                righttopause.beginElement();
            }
            else {
                leftbar.style.display = "none";
                leftpause.style.display = "block";
                rightbar.style.display = "none";
                rightpause.style.display = "block";
            }
        } else {
            videoContent.pause();
            videoControl.classList.remove(CLASS_VIDEO_HIDE);
            if ('beginElement' in lefttoplay) {
                lefttoplay.beginElement();
                righttoplay.beginElement();
            }
            else {
                leftbar.style.display = "block";
                leftpause.style.display = "none";
                rightbar.style.display = "block";
                rightpause.style.display = "none";
            }
        }
    }
}