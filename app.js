/*Навбар*/

//Скрытие и появление навигационной панели 
function setupNavbarScrollBehavior() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const scrollThreshold = 100; 
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
     
      if (currentScroll <= navbarHeight) {
        navbar.classList.remove('navbar-hide');
        return;
      }
      
    
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.classList.add('navbar-hide');
      } 
   
      else if (currentScroll < lastScroll && navbar.classList.contains('navbar-hide')) {
        navbar.classList.remove('navbar-hide');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupNavbarScrollBehavior();
  });


/*____________________________________________Крутилка меню_________________________________________________*/
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const selectedItemDiv = document.getElementById('selected-item');
    const selectedImage = document.getElementById('selected-image');
    const itemName = document.getElementById('item-name');
    const itemPrice = document.getElementById('item-price');
    const itemDesc = document.getElementById('item-desc');
    const box = document.querySelector('.box');

    const firstItem = menuItems[0];
    selectedImage.src = firstItem.src;
    selectedImage.alt = firstItem.alt;
    itemName.textContent = firstItem.dataset.name;
    itemPrice.textContent = `Цена: ${firstItem.dataset.price}₽`;
    itemDesc.textContent = firstItem.dataset.desc;

  
    setTimeout(() => {
        box.classList.add('loaded');
    }, 100);

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            
            selectedItemDiv.classList.remove('show');
            
            
            setTimeout(() => {
                selectedImage.src = item.src;
                selectedImage.alt = item.alt;
                itemName.textContent = item.dataset.name;
                itemPrice.textContent = `Цена: ${item.dataset.price}₽`;
                itemDesc.textContent = item.dataset.desc;

                
                setTimeout(() => {
                    selectedItemDiv.classList.add('show');
                }, 50);
            }, 300);
        });
    });
      
   
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item') && 
            !e.target.closest('.selected-item') && 
            selectedItemDiv.classList.contains('show')) {
            selectedItemDiv.classList.remove('show');
        }
    });
});

/*__________________________________________OSnova_________________________________________________________________*/
const questions = [
    { question: "Какой кофе содержит молоко?", answers: ["Эспрессо", "Капучино", "Американо"], correct: 1 },
    { question: "Кофе, на основе сливок?", answers: ["Латте", "Раф", "Эспрессо"], correct: 1 },
    { question: "Какой кофе имеет крепкий вкус?", answers: ["Латте", "Эспрессо", "Капучино"], correct: 1 },
    { question: "Что из этого является напитоком?", answers: ["Личи", "Мокко", "Мандарин"], correct: 1 },
    { question: "Какой крепкий кофе разбавлен водой ?", answers: ["Американо", "Латте", "Эспрессо"], correct: 0 }
];

let timer;
let timeLeft = 60;
let currentQuestionIndex = 0;
let gameCompleted = false;


document.addEventListener('DOMContentLoaded', function() {
    
    if(localStorage.getItem('gameCompleted') === 'true') {
        disableGame();
    }
    
    
    document.getElementById('show-discount').addEventListener('click', showDiscountModal);
    document.getElementById('close-modal-btn').addEventListener('click', closeDiscountModal);
    document.querySelector('.close-modal').addEventListener('click', closeDiscountModal);
});

function startGame() {
    if(gameCompleted) return;
    
    document.getElementById("game").style.display = "block";
    document.getElementById("loss").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.querySelector(".igra").style.display = "none";
    document.querySelector(".start").style.display = "none";
    currentQuestionIndex = 0;
    timeLeft = 60;
    loadQuestion();
    startTimer();
}

function startTimer() {
    document.getElementById("timer-cup").textContent = timeLeft ;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-cup").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        document.getElementById("question-container").innerHTML = `
            <p>${q.question}</p>
            <div class='knopki'>
            <button onclick="checkAnswer(0)">${q.answers[0]}</button>
            <button onclick="checkAnswer(1)">${q.answers[1]}</button>
            <button onclick="checkAnswer(2)">${q.answers[2]}</button>
            </div>
        `;
    } else {
        clearInterval(timer); 
        winGame();
    }
}

function checkAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestionIndex].correct) {
        currentQuestionIndex++;
        loadQuestion(); 
    } else {
        clearInterval(timer);
        gameOver();
    }
}

function gameOver() {
    document.getElementById("game").style.display = "none";
    document.getElementById("loss").style.display = "block";
}

function winGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("win").style.display = "block";
    gameCompleted = true;
    localStorage.setItem('gameCompleted', 'true');
}

function showDiscountModal() {
    document.getElementById('discountModal').style.display = 'flex';
}

function closeDiscountModal() {
    document.getElementById('discountModal').style.display = 'none';
}

function disableGame() {
    gameCompleted = true;
    document.querySelector(".start").style.display = "none";
    document.querySelector(".igra").textContent = "Вы уже завершили игру";
    document.querySelector(".zanovo").style.display = "none";
}

/*________________________________________Otzivi_____________________________________________________*/
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущей даты в модальном окне
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ru-RU');
    document.getElementById('reviewDate').value = formattedDate;
    
    // Обработчики для кнопок "Подробнее"
    function setupDetailButtons() {
        const detailButtons = document.querySelectorAll('.details-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.review-card');
                card.classList.toggle('flipped');
            });
        });
    }
    
    // Инициализация кнопок "Подробнее"
    setupDetailButtons();
    
    // Обработчики для лайков (чашек кофе)
    function setupCoffeeIcons() {
        const coffeeIcons = document.querySelectorAll('.coffee-icon');
        coffeeIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                const likesCount = this.nextElementSibling;
                
                if (isActive) {
                    this.classList.remove('active');
                    likesCount.textContent = parseInt(likesCount.textContent) - 1;
                } else {
                    this.classList.add('active');
                    likesCount.textContent = parseInt(likesCount.textContent) + 1;
                }
            });
        });
    }
    
    // Инициализация иконок кофе
    setupCoffeeIcons();
    
    // Обработчик для отправки отзыва
    document.getElementById('submitReview').addEventListener('click', function() {
        const name = document.getElementById('reviewerName').value;
        const text = document.getElementById('reviewText').value;
        const date = document.getElementById('reviewDate').value;
        
        if (!name || !text) {
            return;
        }
        
        // Создаем новый отзыв
        const newReview = createReviewCard(name, text, date);
        
        // Добавляем новый отзыв в слайдер
        addReviewToSlider(newReview);
        
        // Закрываем модальное окно
        const modal = bootstrap.Modal.getInstance(document.getElementById('addReviewModal'));
        modal.hide();
        
        // Очищаем форму
        document.getElementById('reviewForm').reset();
        
        // Прокручиваем к новому отзыву
        scrollToNewReview(newReview);
    });
    
    // Функция для создания карточки отзыва
    function createReviewCard(name, text, date) {
        // Создаем элементы карточки
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        const cardInner = document.createElement('div');
        cardInner.className = 'review-card-inner';
        
        // Лицевая сторона карточки
        const cardFront = document.createElement('div');
        cardFront.className = 'review-card-front';
        
        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'btn  details-btn';
        detailsBtn.textContent = 'Подробнее';
        
        cardFront.appendChild(detailsBtn);
        
        // Обратная сторона карточки
        const cardBack = document.createElement('div');
        cardBack.className = 'review-card-back';
        
        const nameElement = document.createElement('h3');
        nameElement.className = 'review-name';
        nameElement.textContent = name;
        
        const textElement = document.createElement('div');
        textElement.className = 'review-text';
        textElement.textContent = text;
        
        const footerElement = document.createElement('div');
        footerElement.className = 'review-footer';
        
        const likesContainer = document.createElement('div');
        likesContainer.className = 'coffee-likes';
        
        const coffeeIcon = document.createElement('i');
        coffeeIcon.className = 'fas fa-coffee coffee-icon';
        
        const likesCount = document.createElement('span');
        likesCount.className = 'likes-count';
        likesCount.textContent = '☕ 4';
        
        const dateElement = document.createElement('div');
        dateElement.className = 'review-date';
        dateElement.textContent = date;
        
        likesContainer.appendChild(coffeeIcon);
        likesContainer.appendChild(likesCount);
        footerElement.appendChild(likesContainer);
        footerElement.appendChild(dateElement);
        
        cardBack.appendChild(nameElement);
        cardBack.appendChild(textElement);
        cardBack.appendChild(footerElement);
        
        // Собираем карточку
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        reviewCard.appendChild(cardInner);
        
        return reviewCard;
    }
    
    // Функция для добавления отзыва в слайдер
    function addReviewToSlider(reviewElement) {
        const reviewsSlider = document.getElementById('reviewsSlider');
        reviewsSlider.appendChild(reviewElement);
        
        // Настраиваем обработчики для новой карточки
        setupDetailButtons();
        setupCoffeeIcons();
    }
    
    // Функция для прокрутки к новому отзыву
    function scrollToNewReview(reviewElement) {
        reviewElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    
    // Обработчики для стрелок слайдера
    const slider = document.getElementById('reviewsSlider');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    prevBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        slider.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
});