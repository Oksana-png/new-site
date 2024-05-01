const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.burger-menu__button')) {
    document.querySelector('.burger-menu').classList.toggle('active');
  } else if (target.closest('.menu-list') && target.closest('a')) {
    document.querySelector('.burger-menu').classList.toggle('active');
  }
  
});

document.body.addEventListener('click', (e) => {
  const target = e.target;

  if (!target.closest('.burger-menu') && document.querySelector('.burger-menu').classList.contains('active')) {
    document.querySelector('.burger-menu').classList.remove('active');
  }
  if (target.closest('.price-list__header') && target.classList.contains('btn')) {
    if (target.classList.contains('active')) {
      return;
    } else {tabs(target);}
  }

  if (target.closest('.ral-wrapper__header') && target.classList.contains('btn')) {
    if (target.classList.contains('active')) {
      return;
    } else {tabsRal(target);}
  }
});


function sliders() {
  const swiperClients = new Swiper('.swiper-clients', {
    loop: true,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-clients .arrow-next',
      prevEl: '.swiper-clients .arrow-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      300: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      // when window width is >= 480px
      580: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      // when window width is >= 640px
      991: {
        slidesPerView: 6
      }
    }
  });


  const swiperProduction = new Swiper('.swiper-production', {
    loop: true,
    slidesPerView: 1,

    pagination: {
      el: '.production-navigation .swiper-pagination',
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.production-navigation .arrow-next',
      prevEl: '.production-navigation .arrow-prev',
    },
  });

  const swiperReviews = new Swiper('.reviews-swiper', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: `.reviews-swiper .arrow-next`,
      prevEl: `.reviews-swiper .arrow-prev`,
    },

    slidesPerView: 3,
    grid: {
      rows: 3,
    },
    spaceBetween: 40,
    breakpoints: {
      // when window width is >= 320px
      300: {
        slidesPerView: 1,
        grid: {
          rows: 1,
        },
        spaceBetween: 15,
        enabled: true
      },
      768: {
        slidesPerView: 2,
        grid: {
          rows: 3,
        },
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
        spaceBetween: 40,
      }
    }
  });
}

function tabs(btn) {
  const btns = document.querySelectorAll('.price-list__header .btn');
  const tabContents = document.querySelectorAll('.price-list__body .price-list__item');
  
  btns.forEach((item, i) => {
    if (item == btn) {
      item.classList.add('active');
      tabContents[i].classList.add('active');
    } else if (item.classList.contains('active')) {
      item.classList.remove('active');
      tabContents[i].classList.remove('active');
    }
  });
}

function tabsRal(btn) {
  const btns = document.querySelectorAll('.ral-wrapper__header .btn');
  const tabContents = document.querySelectorAll('.ral-wrapper__body .ral-wrapper__body-item');

  btns.forEach((item, i) => {
    if (item == btn) {
      item.classList.add('active');
      tabContents[i].classList.add('active');
      
    } else if (item.classList.contains('active')) {
      item.classList.remove('active');
      tabContents[i].classList.remove('active');
    }
  });

}


Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

function scroll() {
  // плавный скролл
  const btnUp = document.querySelector('.up');

  btnUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  });
  window.addEventListener('scroll', () => {
    if (window.innerHeight < window.scrollY) {
      btnUp.style.display = 'flex';
    } else {
      btnUp.style.display = 'none';
    }
  });

  // Плавный скролл якорные ссылки
  const anchors = document.querySelectorAll('a[href*="#"]')
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }
}

function inputOption() {
  const selectSingles = document.querySelectorAll('.__select');

  selectSingles.forEach((selectSingle, ind) => {
    const selectSingle_title = selectSingle.querySelector('.__select__title');
    const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

    // Toggle menu
    selectSingle_title.addEventListener('click', () => {
      if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
      } else {
        selectSingles.forEach((item) => {
          item.setAttribute('data-state', '');
        });
        selectSingle.setAttribute('data-state', 'active');
      }
    });

    // Close when click to option
    for (let i = 0; i < selectSingle_labels.length; i++) {
      selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
      });
    }
  });
}


function phoneMask() {
  const eventCalllback = (e) => {
    var el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "+_ (___) ___ __ __",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }


  var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
      }
  }
}

function modal() {
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.modal') && !target.closest('.modal__body') || target.closest('.modal-close')) {
      const modal = e.target.closest('.modal');

      modal.classList.remove('active');
      modal.querySelector('.modal__body').classList.remove('active');
      // document.querySelector('html').style.overflowY = 'hidden';
      document.querySelector('html').style.overflowY = 'scroll';
    }
  });

  const buttonOpenForm = document.querySelectorAll('.btn-open-form');
  buttonOpenForm.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalOpen('.modal__form');
    });
  });

  function modalOpen(selector) {
    const modal = document.querySelector(selector);
    const modalBody = modal.querySelector('.modal__body');

    modal.classList.add('active');
    modalBody.classList.add('active');
  }
}


const ralColors = () => {
  const ralPopap = document.querySelector(".ral_popAp");
  const overlay = document.querySelector(".overlay");
  let ralPopapTitle = document.createElement("h4");
  let ralPopapText = document.createElement("p");

  function addOverlay() {
    overlay.classList.add("active");
  }

  function removeOverlay() {
    overlay.classList.remove("active");
    ralPopapTitle.remove();
    ralPopapText.remove();
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      removeOverlay();
      ralPopap.classList.remove("active");
    });
  }

  document.querySelectorAll(".ral-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      ralPopap.classList.add("active");
      addOverlay();
      let ralColor = item.getAttribute("data-color");
      ralPopap.style.backgroundColor = ralColor;

      ralPopapTitle.textContent = item.querySelector(".ral-item__title").innerHTML;
      ralPopapText.textContent = item.querySelector(".ral-item__text").innerHTML;

      setTimeout(function () {
        ralPopap.append(ralPopapTitle);
        ralPopap.append(ralPopapText);
      }, 200);
    });
  });
}



  if (window.innerWidth <= 1000) {
    const swipers = document.querySelectorAll('.ral-wrapper__body-item');

    swipers.forEach((item, i) => {
      let swiper = new Swiper(item, {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        navigation: {
          nextEl: `.ral-wrapper__body-item-${i} .arrow-next`,
          prevEl: `.ral-wrapper__body-item-${i} .arrow-prev`,
        },

        enabled: true,

        slidesPerView: 3,
        grid: {
          rows: 4,
        },
        spaceBetween: 30,
        breakpoints: {
          // when window width is >= 320px
          300: {
            slidesPerView: 1,
            grid: {
              rows: 3,
            },
            spaceBetween: 15,
            enabled: true
          },
          // when window width is >= 480px
          530: {
            slidesPerView: 2,
            grid: {
              rows: 3,
            },
            spaceBetween: 20
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 3,
            grid: {
              rows: 4,
            },
          },
          1000: {
            enabled: false
          }
        }
      });
    });
  }



sliders();
scroll();
inputOption();
phoneMask();
modal();

ralColors();

// swiperTabs();





