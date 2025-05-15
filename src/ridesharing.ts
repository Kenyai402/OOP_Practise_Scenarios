class User {
  constructor(public id: number, public name: string) {}
}


class Driver extends User {
  constructor(id: number, name: string, public vehicle: Vehicle) {
    super(id, name);
  }
}


class Passenger extends User {}


class Vehicle {
  constructor(public type: string, public plate: string, public available: boolean = true) {}
}


interface PricingStrategy {
  calculateFare(distance: number): number;
}


class NormalPricing implements PricingStrategy {
  calculateFare(distance: number): number {
    return distance * 10; 
  }
}


class PeakPricing implements PricingStrategy {
  calculateFare(distance: number): number {
    return distance * 15; 
  }
}

class Ride {
  private fare: number = 0;
  private rating: number = 0;

  constructor(
    public driver: Driver,
    public passenger: Passenger,
    public pickup: string,
    public dropoff: string,
    public distance: number
  ) {}

  calculateFare(strategy: PricingStrategy) {
    this.fare = strategy.calculateFare(this.distance);
  }

  getFare() {
    return this.fare;
  }

  rateDriver(score: number) {
    this.rating = score;
  }

  getRating() {
    return this.rating;
  }
}


class RideFactory {
  static createRide(driver: Driver, passenger: Passenger, pickup: string, dropoff: string, distance: number, strategy: PricingStrategy): Ride {
    const ride = new Ride(driver, passenger, pickup, dropoff, distance);
    ride.calculateFare(strategy);
    return ride;
  }
}


const vehicle = new Vehicle("Sedan", "KDA123");
const driver = new Driver(1, "Alex", vehicle);
const passenger = new Passenger(2, "Bruno");


const pricingStrategy = new PeakPricing(); 

const ride = RideFactory.createRide(driver, passenger, "Town", "Airport", 12, pricingStrategy);


console.log(`Fare: ${ride.getFare()}`);
ride.rateDriver(4.8);
console.log(`Driver Rating: ${ride.getRating()}`);