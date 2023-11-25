"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.


// Повара и их специализации
const chefs = new Map([
  ["Олег", "Пицца"],
  ["Андрей", "Суши"],
  ["Анна", "Десерт"]
]);

// Блюда, которые могут заказать посетители
const dishes = new Set([
  "Пицца Маргарита",
  "Пицца Пепперони",
  "Пицца Три сыра",
  "Суши Филадельфия",
  "Суши Калифорния",
  "Суши Чизмаки",
  "Суши Сеякемаки",
  "Десерт Тирамису",
  "Десерт Чизкейк"
]);

// Посетитель ресторана
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами
class Manager {
  constructor() {
    this.orders = new Map();
  }

  newOrder(client, ...items) {
    const orderItems = [];

    for (const item of items) {
      if (!dishes.has(item.name)) {
        throw new Error(`Блюдо "${item.name}" не существует.`);
      }

      orderItems.push({
        name: item.name,
        quantity: item.quantity,
        chef: this.getChefBySpecialization(item.type)
      });
    }

    this.orders.set(client, orderItems);
    this.printOrder(client);
  }

  getChefBySpecialization(specialization) {
    for (const [chef, spec] of chefs) {
      if (spec === specialization) {
        return chef;
      }
    }
    return null;
  }

  printOrder(client) {
    const orderItems = this.orders.get(client);

    console.log(`Клиент ${client.firstname} заказал:`);

    for (const item of orderItems) {
      console.log(`${item.name} - ${item.quantity}; готовит повар ${item.chef}`);
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Пицца Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пицца Пепперони", quantity: 2, type: "Пицца" },
  { name: "Десерт Чизкейк", quantity: 1, type: "Десерт" }
);

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Суши Филадельфия", quantity: 5, type: "Суши" },
  { name: "Суши Калифорния", quantity: 3, type: "Суши" }
);

manager.newOrder(
  clientPavel, 
  { name: "Суши Калифорния", quantity: 1, type: "Суши" },
  { name: "Десерт Тирамису", quantity: 2, type: "Десерт" }
);

manager.newOrder(
  clientPavel, 
  { name: "Суши Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
);


