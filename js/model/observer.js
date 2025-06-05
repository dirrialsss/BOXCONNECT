// Шаблон Observer (спостерігач)
export class Observable {
  constructor() {
    this.observers = [];
  }

  // Підписка на зміни
  subscribe(fn) {
    this.observers.push(fn);
  }

  // Відписка
  unsubscribe(fn) {
    this.observers = this.observers.filter(obs => obs !== fn);
  }

  // Повідомити всіх підписників
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}
