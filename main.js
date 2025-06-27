document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".header");
    const footerContainer = document.querySelector(".footer");

    fetch('./header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error("Ошибка при загрузке header:", error);
        });

    fetch('./footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
            attachFooterListeners(); // <--- Важно: подключаем обработчики после вставки футера
        })
        .catch(error => {
            console.error("Ошибка при загрузке footer:", error);
        });
});


// Функция отображения благодарности в footer
function attachFooterListeners() {
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('emailInput');
    const thanksMessage = document.getElementById('thanksMessage');

    if (submitBtn && emailInput && thanksMessage) {
        submitBtn.addEventListener('click', function () {
            const email = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailPattern.test(email)) {
                thanksMessage.classList.add('show');
            } else {
                alert("Пожалуйста, введите корректный email.");
            }
        });
    }
}



//Анимация на главной
document.addEventListener("DOMContentLoaded", () => {
  const mainPage = document.querySelector(".main-page");

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    const maxOffset = 30; // Максимальное смещение в px
    const percentX = (e.clientX / window.innerWidth - 0.5) * 2;
    const percentY = (e.clientY / window.innerHeight - 0.5) * 2;

    targetX = percentX * maxOffset;
    targetY = percentY * maxOffset;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    mainPage.style.backgroundPosition = `${50 + currentX}% ${50 + currentY}%`;

    requestAnimationFrame(animate);
  }

  animate();
});
document.addEventListener("DOMContentLoaded", () => {
  const leftBtns = [
    document.querySelector('.main-page__btn-container.pl-227 .main-page__btn'), // Магазин
    document.querySelector('.main-page__btn-container.pl-339 .main-page__btn')  // Галерея
  ];

  const rightBtns = [
    document.querySelector('.main-page__btn-container:nth-child(1) .main-page__btn'), // Онлайн терапия
    document.querySelector('.main-page__btn-container.pr-192 .main-page__btn'),      // Афиша
    document.querySelector('.main-page__btn-container.pr-389 .main-page__btn')       // О театре
  ];

  const mainPage = document.querySelector('.main-page');

  mainPage.addEventListener('mousemove', (e) => {
    const half = window.innerWidth / 2;

    if (e.clientX < half) {
      // Левая сторона
      leftBtns.forEach(btn => btn.classList.add('visible'));
    } else {
      // Правая сторона
      rightBtns.forEach(btn => btn.classList.add('visible'));
    }
  });
});
//burger-menu
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('sideMenu');

  if (burger && menu) {
    // Открытие/закрытие меню при клике
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
      const isClickInside = menu.contains(e.target) || burger.contains(e.target);
      if (!isClickInside) {
        menu.classList.remove('open');
      }
    });

    // Закрытие меню при изменении размеров экрана (например, поворот экрана)
    window.addEventListener('resize', () => {
      menu.classList.remove('open');
    });
  }
});



//Выравнивание текста второго стиха 
document.addEventListener("DOMContentLoaded", () => {
    const leftPoem = document.querySelector(".main-content__poem-unity .poem");
    const rightPoem = document.querySelector(".main-content__poems .poem--right");

    if (leftPoem && rightPoem) {
        const height = leftPoem.offsetHeight;
        const titleHeight = rightPoem.querySelector(".poem-title").offsetHeight;
        rightPoem.style.marginTop = (height - titleHeight) + "px";
    }
});

//открытие формы по кнопке купить билет
   document.addEventListener('DOMContentLoaded', function() {
        const buyTicketBtn = document.getElementById('buyTicketBtn');
        const preOrderOverlay = document.getElementById('preOrderOverlay');
        const preOrderForm = document.getElementById('preOrderForm');
        const preOrderContent = document.getElementById('preOrderContent');
        const form = document.querySelector('.pre-order-form-container');
        const submitArrow = document.querySelector('.submit-arrow');
        const inputs = document.querySelectorAll('.form-input');
        const skipFormText = document.querySelector('.skip-form-text');
        
        // Обработчик для кнопки предзаказа
        buyTicketBtn.addEventListener('click', function(e) {
            e.preventDefault();
            preOrderOverlay.style.display = 'flex';
        });
        
        // Обработчик для текста "пропустить"
        skipFormText.addEventListener('click', function(e) {
            e.preventDefault();
            closeForm();
        });
        
        // Создаём элемент для сообщения благодарности
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.textContent = 'Благодарим за обращение!';
        preOrderContent.appendChild(thankYouMessage);
        
        // Закрытие формы при клике вне инпутов
        preOrderOverlay.addEventListener('click', function(e) {
            let isInput = false;
            inputs.forEach(input => {
                if (input.contains(e.target)) isInput = true;
            });
            
            if (e.target === submitArrow || e.target.closest('.submit-arrow') || 
                e.target === skipFormText) {
                isInput = true;
            }
            
            if (!isInput) {
                closeForm();
            }
        });
        
        // Остальной код без изменений
        function showThankYou() {
            form.style.display = 'none';
            skipFormText.style.display = 'none';
            thankYouMessage.style.display = 'block';
            preOrderOverlay.style.filter = "brightness(0.85)";
            // setTimeout(closeForm, 3000);
        }
        
        function closeForm() {
            preOrderOverlay.style.display = 'none';
            form.style.display = 'flex';
            thankYouMessage.style.display = 'none';
            preOrderOverlay.style.filter = "";
            skipFormText.style.display = 'block';
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showThankYou();
        });
        
        submitArrow.addEventListener('click', function(e) {
            e.preventDefault();
            showThankYou();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && preOrderOverlay.style.display === 'flex') {
                closeForm();
            }
        });
    });



//открытие формы по кнопке предзаказ
   document.addEventListener('DOMContentLoaded', function() {
        const preOrderBtn = document.getElementById('preOrderBtn');
        const buyTicketBtn = document.getElementById('buyTicketBtn');
        const preOrderOverlay = document.getElementById('preOrderOverlay');
        const preOrderForm = document.getElementById('preOrderForm');
        const preOrderContent = document.getElementById('preOrderContent');
        const form = document.querySelector('.pre-order-form-container');
        const submitArrow = document.querySelector('.submit-arrow');
        const inputs = document.querySelectorAll('.form-input');
        const skipFormText = document.querySelector('.skip-form-text');
        
        // Обработчик для кнопки предзаказа
        preOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            preOrderOverlay.style.display = 'flex';
        });
        
        // Обработчик для текста "пропустить"
        skipFormText.addEventListener('click', function(e) {
            e.preventDefault();
            closeForm();
        });
        
        // Создаём элемент для сообщения благодарности
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.textContent = 'Благодарим за обращение!';
        preOrderContent.appendChild(thankYouMessage);
        
        // Закрытие формы при клике вне инпутов
        preOrderOverlay.addEventListener('click', function(e) {
            let isInput = false;
            inputs.forEach(input => {
                if (input.contains(e.target)) isInput = true;
            });
            
            if (e.target === submitArrow || e.target.closest('.submit-arrow') || 
                e.target === skipFormText) {
                isInput = true;
            }
            
            if (!isInput) {
                closeForm();
            }
        });
        
        // Остальной код без изменений
        function showThankYou() {
            form.style.display = 'none';
            skipFormText.style.display = 'none';
            thankYouMessage.style.display = 'block';
            preOrderOverlay.style.filter = "brightness(0.85)";
            // setTimeout(closeForm, 3000);
        }
        
        function closeForm() {
            preOrderOverlay.style.display = 'none';
            form.style.display = 'flex';
            thankYouMessage.style.display = 'none';
            preOrderOverlay.style.filter = "";
            skipFormText.style.display = 'block';
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showThankYou();
        });
        
        submitArrow.addEventListener('click', function(e) {
            e.preventDefault();
            showThankYou();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && preOrderOverlay.style.display === 'flex') {
                closeForm();
            }
        });
    });
    
    //Окрытие информации на странице каталог
// Работа модального окна
document.addEventListener('DOMContentLoaded', () => {
  const infoBtn = document.querySelector('.info-button');
  const infoModal = document.querySelector('.info-modal');
  const closeBtn = document.querySelector('.info-modal__close');

  // Открытие модального окна
  infoBtn.addEventListener('click', () => {
    infoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // Закрытие по тексту "Закрыть"
  closeBtn.addEventListener('click', () => {
    infoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Закрытие по клику вне контента
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      infoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Закрытие по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      infoModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const bookBlocks = document.querySelectorAll('.book-block');
  let activeBook = null;

  bookBlocks.forEach(block => {
    block.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = block.classList.contains('active');

      bookBlocks.forEach(b => b.classList.remove('active'));

      if (!isActive) {
        block.classList.add('active');
        activeBook = block;
      } else {
        activeBook = null;
      }
    });
  });

  document.addEventListener('click', () => {
    if (activeBook) {
      bookBlocks.forEach(b => b.classList.remove('active'));
      activeBook = null;
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.afisha-page__wrapper');
  const swiper = document.querySelector('.afisha-page__swiper');
  const menu = document.querySelector('.afisha-page__menu');
  
  // Открытие/закрытие по клику
  swiper.addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.classList.toggle('active');
  });
  
  // Закрытие при уходе курсора с меню
  wrapper.addEventListener('mouseleave', (e) => {
    if (wrapper.classList.contains('active') && 
        !menu.contains(e.relatedTarget) && 
        e.relatedTarget !== swiper) {
      wrapper.classList.remove('active');
    }
  });
  
  // Закрытие при клике вне области
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove('active');
    }
  });
});



//онлайн терапия слайдер
document.addEventListener('DOMContentLoaded', () => {
  const arrowBtn = document.getElementById('arrowBtn');
  const pair1 = document.getElementById('pair1');
  const pair2 = document.getElementById('pair2');

  let showingFirst = true;
  let isAnimating = false;

  arrowBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const current = showingFirst ? pair1 : pair2;
    const next = showingFirst ? pair2 : pair1;

    current.classList.remove('active');
    current.classList.add('exit');

    next.classList.add('active');

    setTimeout(() => {
      current.classList.remove('exit');
      isAnimating = false;
      showingFirst = !showingFirst;
    }, 800); // Match with CSS transition
  });
});
//онлайн терапия о проекте
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("projectOverlay");
  const closeBtn = document.getElementById("closeOverlay");
  const projectButtons = document.querySelectorAll(".project-text");

  projectButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      overlay.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});

// slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const slides = Array.from(track.children);
  const visibleSlides = 3;
  const slideCount = slides.length;

  let index = visibleSlides; // начинаем с первого "реального" слайда

  // 1. Клонируем первые и последние слайды
  for (let i = 0; i < visibleSlides; i++) {
    const firstClone = slides[i].cloneNode(true);
    const lastClone = slides[slideCount - 1 - i].cloneNode(true);
    track.appendChild(firstClone); // конец
    track.insertBefore(lastClone, track.firstChild); // начало
  }

  const updatedSlides = Array.from(track.children);
  const totalSlides = updatedSlides.length;

  function updateSlider(animate = true) {
    const slideWidth = track.clientWidth / visibleSlides;
    if (!animate) track.style.transition = "none";
    else track.style.transition = "transform 0.5s ease-in-out";

    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function goToNext() {
    index++;
    updateSlider();
    if (index === totalSlides - visibleSlides) {
      // Дошли до клонированных первых -> вернёмся к оригиналу
      setTimeout(() => {
        index = visibleSlides;
        updateSlider(false);
      }, 500);
    }
  }

  function goToPrev() {
    index--;
    updateSlider();
    if (index === 0) {
      // Дошли до клонированных последних -> вернёмся к оригиналу
      setTimeout(() => {
        index = totalSlides - visibleSlides * 2;
        updateSlider(false);
      }, 500);
    }
  }

  nextBtn.addEventListener("click", goToNext);
  prevBtn.addEventListener("click", goToPrev);

  window.addEventListener("resize", () => updateSlider(false));
  updateSlider(false); // первый запуск без анимации
});
//галерея
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  const images = [
    "./images/gallery1.png",
    "./images/gallery2.png",
    "./images/gallery3.png",
    "./images/gallery4.png",
    "./images/gallery5.png",
    "./images/gallery6.png",
    "./images/gallery7.png",
    "./images/gallery8.png",
    "./images/gallery9.png",
    "./images/gallery10.png",
    "./images/gallery11.png",
    "./images/gallery12.png",
  ];

  let current = 0;
  let interval = null;

  const overlay = document.createElement("div");
  overlay.id = "overlay";

  const fullImg = document.createElement("img");
  overlay.appendChild(fullImg);
  document.body.appendChild(overlay);

  function startSlideshow() {
    if (interval) return; // уже запущено
    interval = setInterval(() => {
      gallery.style.backgroundImage = `url(${images[current]})`;
      current = (current + 1) % images.length;
    }, 150); // скорость смены
  }

  function stopSlideshow() {
    clearInterval(interval);
    interval = null;
  }

  gallery.addEventListener("click", (e) => {
    if (e.target.closest('a')) return;

    stopSlideshow();

    const currentImage = images[(current - 1 + images.length) % images.length];
    fullImg.src = currentImage;
    overlay.classList.add("visible");
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("visible");
    fullImg.src = "";
    startSlideshow();
  });

  startSlideshow();
});

//404
document.addEventListener("DOMContentLoaded", () => {
  // Находим все ссылки
  const links = document.querySelectorAll("a[href$='.html']");

  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");

      try {
        // Пробуем запросить файл
        const response = await fetch(href, { method: "HEAD" });
        if (response.ok) {
          window.location.href = href;
        } else {
          window.location.href = "./404.html"; 
        }
      } catch (error) {
        window.location.href = "./404.html";
      }
    });
  });
});



