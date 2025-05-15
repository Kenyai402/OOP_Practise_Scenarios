//Multi-vendor e-commerce platform
interface ProductsInterface {
  calculateDiscount(discountPercentage: number): number;
  calculateTax(taxPercentage: number): number;
  calculateShippingCost(weight: number): number;
  calculateTotalCost(
    discountedPrice: number,
    taxAmount: number,
    shippingCost: number
  ): number;
}
abstract class Product implements ProductsInterface {
  public name: string;
  public category: string;
  private id: string;
  public price: number;
  public description: string;

  constructor(
    _name: string,
    _category: string,
    _id: string,
    _price: number,
    _description: string
  ) {
    this.name = _name;
    this.category = _category;
    this.id = _id;
    this.price = _price;
    this.description = _description;
  }
  calculateDiscount(discountPercentage: number): number {
    const discountedPrice = this.price - (this.price * discountPercentage) / 100;
    
    console.log(`The discounted price for ${this.name} is ${discountedPrice}`);
    return discountedPrice;
  }

  calculateTax(taxPercentage: number): number {
    const taxAmount = this.price * (taxPercentage / 100);
    console.log(`The tax for ${this.name} is ${taxAmount}`);
    return taxAmount;
  }
  calculateShippingCost(weight: number): number {
    const shippingCost = weight * 10;
    console.log(`The shipping cost for ${this.name} is ${shippingCost}`);
    return shippingCost;
  }
  calculateTotalCost(
    discountPercentage: number,
    taxPercentage: number,
    weight: number
  ): number {
    const discountedPrice = this.calculateDiscount(discountPercentage);
    const taxAmount = this.calculateTax(taxPercentage);
    const shippingCost = this.calculateShippingCost(weight);
    const totalCost = discountedPrice + taxAmount + shippingCost;
    console.log(`The total cost for ${this.name} is ${totalCost}`);
    return totalCost;
  }
  public getId(): string {
  return this.id;
}

}

class ElectronicProduct extends Product implements ProductsInterface {
  warranty: number;

  constructor(
    _name: string,
    _category: string,
    _id: string,
    _price: number,
    _description: string,
    _warranty: number
  ) {
    super(_name, "Electronics", _id, _price, _description);

    this.warranty = _warranty;
  }
}

class ClothingProduct extends Product implements ProductsInterface {
  size: number;
  material: string;

  constructor(
    _name: string,
    _category: string,
    _id: string,
    _price: number,
    _description: string,
    _warranty: number,
    _size: number,
    _material: string
  ) {
    super(_name, "Clothing", _id, _price, _description);
    this.size = _size;
    this.material = _material;
  }
}

class FurnitureProduct extends Product implements ProductsInterface {
  dimensions: string;

  constructor(
    _name: string,
    _category: string,
    _id: string,
    _price: number,
    _description: string,
    _dimensions: string
  ) {
    super(_name, _category, _id, _price, _description);
    this.dimensions = _dimensions;
  }
}

abstract class User {
  name: string;
  gender: string;
  email: string;
  private password: string;

  constructor(
    _name: string,
    _gender: string,
    _email: string,
    _password: string
  ) {
    this.name = _name;
    this.gender = _gender;
    this.email = _email;
    this.password = _password;
  }
}

class Admin extends User {
  manageUsers(): void {
    console.log(`${this.name} is managing users.`);
  }
}

class Seller extends User {
  listProduct(product: Product): void {
    console.log(`${this.name} listed product: ${product.name}`);
  }
}

class Customer extends User {
  addToCart(product: Product, cart: Cart, weight: number): void {
    cart.addProduct(product, weight);
  }
}

class Cart {
  private products: { product: Product; weight: number }[] = [];

  addProduct(product: Product, weight: number): void {
    this.products.push({ product, weight });
    console.log(`${product.name} added to cart.`);
  }
  removeProduct(Id: string): void {
    this.products = this.products.filter((item) => item.product.getId() !== Id);
    console.log(`Product with ID ${Id} removed from cart.`);
  }

updateQuantity(id: string, weight: number): void {
  const productItem = this.products.find(item => item.product.getId() === id);

  if (productItem) {
    productItem.weight = weight;
    console.log(`Updated weight for ${productItem.product.name} to ${weight}`);
  } else {
    console.log(`Product with ID ${id} not found in cart.`);
  }
}


  calculateTotalCost(
    taxPercentage: number,
    discountPercentage: number
  ): number {
    let total = 0;
    for (const item of this.products) {
      total += item.product.calculateTotalCost(
        discountPercentage,
        taxPercentage,
        item.weight
      );
    }
    console.log(`Cart Total: ${total}`);
    return total;
  }
}

interface Payment {
  payment(amount: number): void;
}
class CashPayment implements Payment {
  payment(amount: number): void {
    console.log(`Cash payment of ${amount} made`);
  }
}
class CreditCardPayment implements Payment {
  payment(amount: number): void {
    console.log(`Credit card payment of ${amount} made`);
  }
}
class WalletPayment implements Payment {
  payment(amount: number): void {
    console.log(`Wallet payment of ${amount} made`);
  }
}
//Checkout

class Order {
  orderId: string;
  customer: string;
  cart: Cart;
  payment: Payment;

  constructor(
    _orderId: string,
    _customer: string,
    _cart: Cart,
    _payment: Payment
  ) {
    this.orderId = _orderId;
    this.customer = _customer;
    this.cart = _cart;
    this.payment = _payment;
  }

  checkout(taxPercentage: number, discountPercentage: number): void {
    const totalAmount = this.cart.calculateTotalCost(
      taxPercentage,
      discountPercentage
    );
    this.payment.payment(totalAmount);
    console.log(`Order ${this.orderId} placed successfully!`);
  }
}
type ExtraProductDetails = {
  warranty: number;
  size: number;
  material: string;
  dimensions: string;
};

//Factory Pattern
class ProductFactory {
  static createProduct(
    name: string,
    category: string,
    id: string,
    price: number,
    description: string,
    extra: ExtraProductDetails
  ): Product {
    switch (category) {
      case "Electronics":
        return new ElectronicProduct(
          name,
          "Electronics",
          id,
          price,
          description,
          extra.warranty
        );
      case "Clothing":
        return new ClothingProduct(
          name,
          "Clothing",
          id,
          price,
          description,
          extra.warranty,
          extra.size,
          extra.material
        );
      case "Furniture":
        return new FurnitureProduct(
          name,
          "Furniture",
          id,
          price,
          description,
          extra.dimensions
        );
      default:
        throw new Error("Invalid product type");
    }
  }
}
