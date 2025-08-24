
const hamburager = document.getElementById('hamburager');
const navMenu = document.getElementById('nav-menu');
const closeIcon = document.getElementById('nav-close');
const navLink = document.querySelectorAll('.nav__link');

navLink.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.add('hidden');
    });
});
closeIcon.addEventListener("click", () => {
    navMenu.classList.add('hidden');
});
hamburager.addEventListener("click", () => {
    navMenu.classList.remove('hidden');
});
/*--------------------tabs----------------------*/

const tabs = document.querySelectorAll(".tabs-wrap ul li");
const all = document.querySelectorAll(".item_wrap");
const foods = document.querySelectorAll(".food");
const snacks = document.querySelectorAll(".snack");
const beverages = document.querySelectorAll(".beverage");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(tab => {
            tab.classList.remove("active");
        })
        tab.classList.add("active");

        const tabval = tab.getAttribute('data-tabs');

        all.forEach(item => {
            item.style.display = 'none';
        });
        if (tabval == 'food') {
            foods.forEach(item => {
                item.style.display = 'block';
            });
        }
        else if (tabval == 'snack') {
            snacks.forEach(item => {
                item.style.display = 'block';
            });
        }
        else if (tabval == 'beverage') {
            beverages.forEach(item => {
                item.style.display = 'block';
            });
        }
        else {
            all.forEach(item => {
                item.style.display = 'block';
            });
        }
    });
});
/*--------------------dark light theme----------------------*/
const html = document.querySelector("html");
const themeBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("mode") == "dark") {
    darkMode();
} else {
    lightMode();
}

themeBtn.addEventListener('click', (e) => {
    if (localStorage.getItem("mode") == "light") {
        darkMode();
    } else {
        lightMode();
    }
})

function darkMode() {
    html.classList.add("dark");
    themeBtn.classList.replace("ri-moon-line", "ri-sun-line");
    localStorage.setItem("mode", "dark");
}

function lightMode() {
    html.classList.remove("dark");
    themeBtn.classList.replace("ri-sun-line", "ri-moon-line");
    localStorage.setItem("mode", "light");
}
/*--------------------show scroll up----------------------*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById("scroll-up");
    if (this.scrollY >= 250) {
        scrollUpBtn.classList.remove("-bottom-1/2");
        scrollUpBtn.classList.add("bottom-4");
    } else {
        scrollUpBtn.classList.add("-bottom-1/2");
        scrollUpBtn.classList.remove("bottom-4");
    }
}

window.addEventListener('scroll', scrollUp)

/*--------------------change background header ----------------------*/
const scrollHeader = () => {
    const header = document.getElementById("header");

    if (this.scrollY >= 50) {
        header.classList.add("border-b", "border-secondaryColor");
    } else {
        header.classList.remove("border-b", "border-secondaryColor");
    }
}

window.addEventListener('scroll', scrollHeader)

/*--------------------scroll section active link ----------------------*/
const activeLink = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav__link");

    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (this.scrollY >= sectionTop - 62) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(item => {
        item.classList.remove('text-secondaryColor');
        if (item.href.includes(current)) {
            item.classList.add('text-secondaryColor');
        }
    });
};

window.addEventListener('scroll', activeLink)
