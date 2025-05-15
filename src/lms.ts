
class Person {
    constructor(public id: string, public name: string) {}
  }
  
  class Student extends Person {
    courses: string[] = [];
    getRole(): string { return "Student"; }
  }
  
  class Professor extends Person {
    getRole(): string { return "Professor"; }
  }
  
  class Adminn extends Person {
    getRole(): string { return "Admin"; }
  }
  
  class Course {
    students: string[] = [];
  
    constructor(public name: string, public professor: string) {}
  }
  
  interface Assessment {
    name: string;
    maxScore: number;
    calculateGrade(score: number): number;
  }
  
  class Quiz implements Assessment {
    constructor(public name: string, public maxScore: number) {}
    calculateGrade(score: number): number {
      return (score / this.maxScore) * 100;
    }
  }
  
  class Assignment implements Assessment {
    constructor(public name: string, public maxScore: number) {}
    calculateGrade(score: number): number {
      return (score / this.maxScore) * 100;
    }
  }
  
  class Project implements Assessment {
    constructor(public name: string, public maxScore: number) {}
    calculateGrade(score: number): number {
      return (score / this.maxScore) * 100;
    }
  }
  
  class Enrollment {
    private grade: number = 0;
  
    constructor(public student: Student, public course: Course) {
      student.courses.push(course.name);
      course.students.push(student.id);
    }
  
    setGrade(assessment: Assessment, score: number) {
      this.grade = assessment.calculateGrade(score);
    }
  
    getGrade(): number {
      return this.grade;
    }
  }
  
  class Enroll {
    createEnrollment(student: Student, course: Course, assessment: Assessment, score: number): Enrollment {
      const enrollment = new Enrollment(student, course);
      enrollment.setGrade(assessment, score);
      return enrollment;
    }
  }
  
  class NotificationSystem {
    notify(user: Person, message: string): void {
      console.log(`To ${user.name}: ${message}`);
    }
  }
  
  
  const professor = new Professor("P1", "steve");
  const student = new Student("A1", "Mike");
  const course = new Course("Computer Science", professor.id);
  const quiz = new Quiz("Calculus", 70);
  const create = new Enroll();
  const enrollment = create.createEnrollment(student, course, quiz, 40);
  const notifier = new NotificationSystem();
  
  console.log(`Grade: ${enrollment.getGrade()}`); 
  notifier.notify(student, "Enrolled"); 