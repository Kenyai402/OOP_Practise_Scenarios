interface Borrowable {
  checkOut(): void;
  returnItem(dueDate: Date): void;
}

abstract class LibraryItem {
  constructor(public tittle: string,public id: string,public isavailable: boolean = true ) {

  }

  availability(): boolean {
    return this.isavailable;
  }
}


class Book extends LibraryItem implements Borrowable {
  constructor(public ISBN: number, tittle: string, id: string) {
    super(tittle, id);
  }

  checkOut(): void {
    this.isavailable = false;
  }

  returnItem(dueDate: Date): void {
    this.isavailable = true;
  }
}

class UserAccount {
  constructor(public id: number,public username: string,private password: string, public borrowHistory: { borrowDate: Date; returnDate: Date; dueDate: Date }[] = []
  ) {}

  login(): boolean {
    return this.username === this.username && this.password === this.password;
  }

  history(borrowDate: Date, returnDate: Date, dueDate: Date): void {
    this.borrowHistory.push({ borrowDate, returnDate, dueDate });
  }

  fine(): number {
    const fineRatePerDay = 1;
    let totalFine = 0;

    for (const entry of this.borrowHistory) {
      if (entry.returnDate > entry.dueDate) {
        const lateDays = Math.ceil(
          (entry.returnDate.getTime() - entry.dueDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        totalFine += lateDays * fineRatePerDay;
      }
    }

    return totalFine;
  }
}

class Member extends UserAccount {
  constructor(id: number, username: string, password: string) {
    super(id, username, password);
  }

  borrow(item: Borrowable & LibraryItem): void {
    if (item.isavailable) {
      const borrowDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(borrowDate.getDate() + 14); 
      const returnDate = dueDate; 

      item.checkOut();
      this.borrowHistory.push({ borrowDate, returnDate, dueDate });

      console.log(`${item.tittle} borrowed successfully by ${this.username}`);
    } else {
      console.log(`${item.tittle} is currently not available.`);
    }
  }
}

const book1 = new Book(123456, "songs of bruno", "B001");


const member1 = new Member(1, "bruno", "password123");

member1.borrow(book1);

console.log("BORROW HISTORY");
member1.borrowHistory.forEach((entry, index) => {
  console.log(`Entry #${index + 1}`);
  console.log(`  Borrow Date: ${entry.borrowDate.toDateString()}`);
  console.log(`  Due Date:    ${entry.dueDate.toDateString()}`);
  console.log(`  Return Date: ${entry.returnDate.toDateString()}`);
}); 
