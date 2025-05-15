interface Observer {
  update(animal: Animal): void;
}

interface Subject {
  attach(observer: Observer): void;
  notify(): void;
}

interface FeedingStrategy {
  feed(animal: Animal): void;
}

interface Flyable {
  fly(): void;
}
interface Swimmable {
  swim(): void;
}
interface Hibernateable {
  hibernate(): void;
}

abstract class Animal implements Subject {
  private observers: Observer[] = [];
  private health: number;

  constructor(
    public readonly name: string,
    public age: number,
    initialHealth: number,
    public feedingStrategy: FeedingStrategy
  ) {
    this.health = initialHealth;
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(): void {
    for (const observer of this.observers) observer.update(this);
  }

  setHealth(newHealth: number): void {
    this.health = Math.max(0, Math.min(100, newHealth));
    if (this.health < 50) this.notify();
  }

  getHealth(): number {
    return this.health;
  }
  abstract performDailyAction(): void;
}

class Bird extends Animal implements Flyable {
  fly() {
    console.log(`${this.name} flying`);
  }
  performDailyAction() {
    this.fly();
  }
}

class Mammal extends Animal implements Hibernateable {
  hibernate() {
    console.log(`${this.name} hibernating`);
  }
  performDailyAction() {
    this.hibernate();
  }
}

class Reptile extends Animal implements Swimmable {
  swim() {
    console.log(`${this.name} swimming`);
  }
  performDailyAction() {
    this.swim();
  }
}

class Habitat {
  private animals: Animal[] = [];

  constructor(
    private temperature: number,
    private feedingSchedule: string,
    private cleanliness: number
  ) {}

  addAnimal(animal: Animal) {
    this.animals.push(animal);
  }

  monitor() {
    if (this.cleanliness < 50) {
      this.animals.forEach((a) => a.setHealth(a.getHealth() - 10));
    }
  }
}

class HerbivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} plants`);
  }
}

class CarnivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} meat`);
  }
}

class OmnivoreFeeding implements FeedingStrategy {
  feed(animal: Animal) {
    console.log(`Feeding ${animal.name} mixed diet`);
  }
}

class Zookeeper implements Observer {
  update(animal: Animal) {
    console.log(`[Zookeeper] ${animal.name} needs care!`);
  }
}

class Vet implements Observer {
  update(animal: Animal) {
    console.log(`[Vet] ${animal.name} needs medical attention!`);
  }
}

// Usage
const lion = new Mammal("Leo", 5, 60, new CarnivoreFeeding());
const parrot = new Bird("Polly", 2, 70, new HerbivoreFeeding());
const crocodile = new Reptile("Snappy", 10, 55, new CarnivoreFeeding());

const zooKeeper = new Zookeeper();
const vet = new Vet();

[lion, parrot, crocodile].forEach((animal) => {
  animal.attach(zooKeeper);
  animal.attach(vet);
});

const habitat = new Habitat(28, "9:00 AM", 40);
habitat.addAnimal(lion);
habitat.addAnimal(parrot);
habitat.addAnimal(crocodile);

habitat.monitor(); 
lion.feedingStrategy.feed(lion);
parrot.performDailyAction();
