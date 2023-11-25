"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/



class Library {
  #books;

  constructor(initialBooks) {
    const uniqueBooks = new Set(initialBooks);

    if (uniqueBooks.size !== initialBooks.length) {
      throw new Error("Начальный список книг содержит дубликаты.");
    }

    this.#books = uniqueBooks;
  }

  get allBooks() {
    return Array.from(this.#books);
  }

  addBook(title) {
    if (this.#books.has(title)) {
      throw new Error(`Книга "${title}" уже существует в списке.`);
    }

    this.#books.add(title);
  }

  removeBook(title) {
    if (!this.#books.has(title)) {
      throw new Error(`Книги "${title}" нет в списке.`);
    }

    this.#books.delete(title);
  }

  hasBook(title) {
    return this.#books.has(title);
  }
}

// Пример использования класса Library
const library = new Library(["Книга 1", "Книга 2", "Книга 3"]);

console.log(library.allBooks); // ["Книга 1", "Книга 2", "Книга 3"]

library.addBook("Книга 4");
console.log(library.allBooks); // ["Книга 1", "Книга 2", "Книга 3", "Книга 4"]

library.removeBook("Книга 2");
console.log(library.allBooks); // ["Книга 1", "Книга 3", "Книга 4"]

console.log(library.hasBook("Книга 1")); // true
console.log(library.hasBook("Книга 2")); // false