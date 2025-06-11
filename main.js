// Загрузка header
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".header");

    fetch('./header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error("Ошибка при загрузке header:", error);
        });
});


//Анимация на главной

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
