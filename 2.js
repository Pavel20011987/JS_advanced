"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

 // Первоначальная загрузка данных
 const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

// Получаем список товаров
const productsList = document.getElementById("products-list");

// Генерируем отзывы для каждого товара
for (const data of initialData) {
  const productDiv = document.createElement("div");
  const productHeader = document.createElement("h2");
  productHeader.textContent = data.product;
  const reviewsList = document.createElement("ul");
  reviewsList.id = `reviews-list-${data.product}`;

  // Добавляем отзывы
  for (const review of data.reviews) {
    const reviewItem = document.createElement("li");
    reviewItem.textContent = review.text;
    reviewsList.appendChild(reviewItem);
  }

  // Добавляем форму для добавления отзыва
  const reviewsForm = document.createElement("form");
  reviewsForm.id = `reviews-form-${data.product}`;
  reviewsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const reviewInput = document.getElementById(`review-input-${data.product}`);
    const reviewText = reviewInput.value;
    if (reviewText.length < 50 || reviewText.length > 500) {
      // Если отзыв не соответствует ограничениям по длине, выводим ошибку
      const errorElement = document.createElement("p");
      errorElement.textContent = "Отзыв должен содержать от 50 до 500 символов.";
      productDiv.appendChild(errorElement);
    } else {
      // Создаем новый отзыв и добавляем его в список
      const reviewId = Math.max(...data.reviews.map(review => review.id)) + 1;
      const reviewItem = document.createElement("li");
      reviewItem.textContent = reviewText;
      reviewsList.appendChild(reviewItem);
      data.reviews.push({ id: reviewId, text: reviewText });

      // Очищаем поле ввода
      reviewInput.value = "";
    }
  });

  const reviewInput = document.createElement("input");
  reviewInput.type = "text";
  reviewInput.id = `review-input-${data.product}`;
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Добавить отзыв";
  reviewsForm.appendChild(reviewInput);
  reviewsForm.appendChild(submitButton);

  // Добавляем заголовок товара, список отзывов и форму на страницу
  productDiv.appendChild(productHeader);
  productDiv.appendChild(reviewsList);
  productDiv.appendChild(reviewsForm);
  productsList.appendChild(productDiv);
}