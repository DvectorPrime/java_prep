# COS 202 Java Exam-Prep Master Question Bank (100 Questions)
Faculty of Computing, University of Ibadan
Course: C-COS 202 — Advanced Object-Oriented Programming (Java)

This document contains exactly 100 preset, exam-style practical questions designed to match the 2025/2026 Session Java Code Test and Semester Examinations set by Dr. Babatunde I. Ayinla.

---

## Section A: Classes, Constructors, Encapsulation and Inheritance
Scope: Class definitions, instance vs static fields, constructors (default, parameterized, copy), constructor chaining with this() and super(), encapsulation (private fields, public getters/setters), single/multilevel/hierarchical inheritance, and method overriding.

### Q001
- id: Q001
- section: A
- type: spot-error
- difficulty: easy
- topic: constructors
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Book {
    private String title;
    private double price;

    public book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setPrice(double price) {
        price = price;
    }

    public double getPrice() {
        return price
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `public book(String title, double price) {` | syntax | Constructor name must match the class name casing | `public Book(String title, double price) {` |
| 2 | 15 | `price = price;` | semantic | Parameter shadows instance variable; assigns parameter to itself leaving instance variable unchanged | `this.price = price;` |
| 3 | 19 | `return price` | syntax | Missing semicolon at the end of return statement | `return price;` |

**Reference solution:**
```java
public class Book {
    private String title;
    private double price;

    public Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A fix that fails to compile receives no credit for the fix portion

**Common mistakes:**
- Claiming `getTitle()` needs `this.title` (optional, not an error)
- Stating `price = price;` is a syntax error (it compiles cleanly as self-assignment)

### Q002
- id: Q002
- section: A
- type: spot-error
- difficulty: easy
- topic: constructors
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Member {
    private String memberId;
    private int booksIssued;

    public void Member(String memberId) {
        this.memberId = memberId;
        this.booksIssued = 0;
    }

    public void borrowBook() {
        booksIssued--;
    }

    public int getBooksIssued() {
        return this.booksIssued;
    }

    public String getMemberId() {
        return memberId
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `public void Member(String memberId) {` | syntax | Constructors cannot declare any return type, not even void | `public Member(String memberId) {` |
| 2 | 11 | `booksIssued--;` | semantic | Borrowing a book must increment the borrowed count, not decrement it | `booksIssued++;` |
| 3 | 19 | `return memberId` | syntax | Statement is missing a closing semicolon | `return memberId;` |

**Reference solution:**
```java
public class Member {
    private String memberId;
    private int booksIssued;

    public Member(String memberId) {
        this.memberId = memberId;
        this.booksIssued = 0;
    }

    public void borrowBook() {
        booksIssued++;
    }

    public int getBooksIssued() {
        return this.booksIssued;
    }

    public String getMemberId() {
        return memberId;
    }
}
```

**Rubric:**
- 1 pt per error: line number + error type + corrected line (0.5 if two are correct)
- Zero credit for invalid syntax in fix

**Common mistakes:**
- Failing to recognize that `void Member(...)` makes it a regular method, leaving the class with no explicit constructor

### Q003
- id: Q003
- section: A
- type: spot-error
- difficulty: easy
- topic: static-vs-instance
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class LibraryCard {
    private int cardNumber;
    private boolean isActive;

    public LibraryCard(int cardNumber) {
        this.cardNumber = cardNumber;
        this.isActive = true;
    }

    public void deactivate() {
        isActive = true;
    }

    public static void main(String[] args) {
        Int num = 101;
        LibraryCard card = new LibraryCard(num);
        deactivate();
        System.out.println(card.isActive);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `isActive = true;` | semantic | Deactivating a card should set isActive to false | `isActive = false;` |
| 2 | 15 | `Int num = 101;` | syntax | 'Int' is not a valid Java keyword; primitive integer type is 'int' | `int num = 101;` |
| 3 | 17 | `deactivate();` | syntax | Non-static method cannot be referenced directly from a static context | `card.deactivate();` |

**Reference solution:**
```java
public class LibraryCard {
    private int cardNumber;
    private boolean isActive;

    public LibraryCard(int cardNumber) {
        this.cardNumber = cardNumber;
        this.isActive = true;
    }

    public void deactivate() {
        isActive = false;
    }

    public static void main(String[] args) {
        int num = 101;
        LibraryCard card = new LibraryCard(num);
        card.deactivate();
        System.out.println(card.isActive);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `Integer num = 101;` as an alternative fix for line 15

**Common mistakes:**
- Classifying line 11 as syntax (it compiles cleanly, but logic is wrong)
- Thinking `card.isActive` in `main` is illegal (it is inside the same class, so private access is legal)

### Q004
- id: Q004
- section: A
- type: spot-error
- difficulty: easy
- topic: inheritance
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class BookLoan extend Loan {
    private int daysOverdue;

    public BookLoan(String loanId, int daysOverdue) {
        super(loanId);
        this.daysOverdue = daysOverdue;
    }

    public double calculateFine() {
        if (daysOverdue < 0) {
            return daysOverdue * 50.0;
        }
        return 0.0;
    }

    public int getDaysOverdue() {
        return daysOverdue
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class BookLoan extend Loan {` | syntax | The inheritance keyword is 'extends', not 'extend' | `public class BookLoan extends Loan {` |
| 2 | 10 | `if (daysOverdue < 0) {` | semantic | Fine must be calculated when overdue days are greater than 0 | `if (daysOverdue > 0) {` |
| 3 | 17 | `return daysOverdue` | syntax | Return statement is missing a terminating semicolon | `return daysOverdue;` |

**Reference solution:**
```java
public class BookLoan extends Loan {
    private int daysOverdue;

    public BookLoan(String loanId, int daysOverdue) {
        super(loanId);
        this.daysOverdue = daysOverdue;
    }

    public double calculateFine() {
        if (daysOverdue > 0) {
            return daysOverdue * 50.0;
        }
        return 0.0;
    }

    public int getDaysOverdue() {
        return daysOverdue;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `daysOverdue >= 1` for line 10

**Common mistakes:**
- Calling line 1 a semantic error

### Q005
- id: Q005
- section: A
- type: spot-error
- difficulty: easy
- topic: constructors
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CatalogItem extends Item {
    private String callNumber;

    public CatalogItem(String itemId, String callNumber) {
        this.callNumber = callNumber;
        super(itemId);
    }

    public boolean isReferenceOnly() {
        if (callNumber.startsWith("REF")) {
            return false;
        }
        return true;
    }

    public String getCallNumber() {
        return this.callNumber
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `super(itemId);` | syntax | Call to super() constructor must be the first statement in a constructor | Move `super(itemId);` before `this.callNumber = callNumber;` |
| 2 | 11 | `return false;` | semantic | Items with 'REF' call numbers are reference-only; should return true | `return true;` |
| 3 | 17 | `return this.callNumber` | syntax | Statement is missing a terminating semicolon | `return this.callNumber;` |

**Reference solution:**
```java
public class CatalogItem extends Item {
    private String callNumber;

    public CatalogItem(String itemId, String callNumber) {
        super(itemId);
        this.callNumber = callNumber;
    }

    public boolean isReferenceOnly() {
        if (callNumber.startsWith("REF")) {
            return true;
        }
        return false;
    }

    public String getCallNumber() {
        return this.callNumber;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- On line 10-13, accept `return callNumber.startsWith("REF");` as a full-credit fix

**Common mistakes:**
- Missing the requirement that `super()` must appear on line 5 as the first statement

### Q006
- id: Q006
- section: A
- type: spot-error
- difficulty: easy
- topic: encapsulation
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class UniversityMember {
    private String fullName;

    public universityMember(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName
    }

    public void setFullName(String fullName) {
        fullName = fullName;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `public universityMember(String fullName) {` | syntax | Constructor name is case-sensitive and must match class name exactly | `public UniversityMember(String fullName) {` |
| 2 | 9 | `return fullName` | syntax | Missing terminating semicolon | `return fullName;` |
| 3 | 13 | `fullName = fullName;` | semantic | Parameter assigned to itself; must qualify instance variable with 'this' | `this.fullName = fullName;` |

**Reference solution:**
```java
public class UniversityMember {
    private String fullName;

    public UniversityMember(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Confusing syntax and semantic on `fullName = fullName;`

### Q007
- id: Q007
- section: A
- type: spot-error
- difficulty: medium
- topic: inheritance
- points: 4
- time_minutes: 7
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Undergraduate extend UniversityMember {
    private String matricNumber;
    private String faculty;

    public Undergraduate(String fullName, String matricNumber, String faculty) {
        this.matricNumber = matricNumber;
        super(fullName);
        this.faculty = faculty;
    }

    public void updateFaculty(String newFaculty) {
        if (newFaculty != null) {
            throw new IllegalArgumentException("Faculty cannot be null");
        }
        this.faculty = newFaculty;
    }

    public String getMatricNumber() {
        return matricNumber;
    }

    public String getFaculty() {
        return matricNumber;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class Undergraduate extend UniversityMember {` | syntax | Keyword must be 'extends', not 'extend' | `public class Undergraduate extends UniversityMember {` |
| 2 | 7 | `super(fullName);` | syntax | super() invocation must be the first statement in the constructor body | Place `super(fullName);` on line 6 before `this.matricNumber = matricNumber;` |
| 3 | 12 | `if (newFaculty != null) {` | semantic | Should throw exception when newFaculty is null, not when it is non-null | `if (newFaculty == null) {` |
| 4 | 23 | `return matricNumber;` | semantic | getFaculty() should return the faculty attribute, not matricNumber | `return faculty;` |

**Reference solution:**
```java
public class Undergraduate extends UniversityMember {
    private String matricNumber;
    private String faculty;

    public Undergraduate(String fullName, String matricNumber, String faculty) {
        super(fullName);
        this.matricNumber = matricNumber;
        this.faculty = faculty;
    }

    public void updateFaculty(String newFaculty) {
        if (newFaculty == null) {
            throw new IllegalArgumentException("Faculty cannot be null");
        }
        this.faculty = newFaculty;
    }

    public String getMatricNumber() {
        return matricNumber;
    }

    public String getFaculty() {
        return faculty;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Calling the null-check on line 12 syntax (it compiles cleanly, so it is semantic)

### Q008
- id: Q008
- section: A
- type: spot-error
- difficulty: medium
- topic: encapsulation
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CourseRegistration {
    private String courseCode;
    private int creditUnits;

    public CourseRegistration(String courseCode, int creditUnits) {
        this.courseCode = courseCode;
        creditUnits = creditUnits;
    }

    public boolean isValidCredit() {
        if (creditUnits >= 1 && creditUnits <= 6) {
            return false;
        }
        return true;
    }

    public String getCourseCode() {
        return this.courseCode
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `creditUnits = creditUnits;` | semantic | Parameter assignment shadows instance field, leaving this.creditUnits as 0 | `this.creditUnits = creditUnits;` |
| 2 | 12 | `return false;` | semantic | Inverted logic: 1 to 6 credit units is the valid range, so it must return true | `return true;` |
| 3 | 18 | `return this.courseCode` | syntax | Missing terminating semicolon | `return this.courseCode;` |

**Reference solution:**
```java
public class CourseRegistration {
    private String courseCode;
    private int creditUnits;

    public CourseRegistration(String courseCode, int creditUnits) {
        this.courseCode = courseCode;
        this.creditUnits = creditUnits;
    }

    public boolean isValidCredit() {
        if (creditUnits >= 1 && creditUnits <= 6) {
            return true;
        }
        return false;
    }

    public String getCourseCode() {
        return this.courseCode;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `return creditUnits >= 1 && creditUnits <= 6;` for isValidCredit()

**Common mistakes:**
- Thinking `this.courseCode` on line 18 is an error (it is valid Java)

### Q009
- id: Q009
- section: A
- type: spot-error
- difficulty: medium
- topic: inheritance
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Lecturer extends UniversityMember {
    private String rank;

    public Lecturer(String fullName, String rank) {
        super(fullName);
        this.rank = rank;
    }

    @Override
    String getFullName() {
        return "Lecturer: " + this.rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getRank() {
        return this.rank
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `String getFullName() {` | syntax | Cannot assign weaker access privileges; superclass method is public, so overriding method must be public | `public String getFullName() {` |
| 2 | 11 | `return "Lecturer: " + this.rank;` | semantic | Should append the member's full name via super.getFullName(), not the rank | `return "Lecturer: " + super.getFullName();` |
| 3 | 19 | `return this.rank` | syntax | Missing semicolon at end of statement | `return this.rank;` |

**Reference solution:**
```java
public class Lecturer extends UniversityMember {
    private String rank;

    public Lecturer(String fullName, String rank) {
        super(fullName);
        this.rank = rank;
    }

    @Override
    public String getFullName() {
        return "Lecturer: " + super.getFullName();
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getRank() {
        return this.rank;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Overlooking visibility reduction as a syntax/compile error

### Q010
- id: Q010
- section: A
- type: spot-error
- difficulty: medium
- topic: constructors
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Department {
    private String deptName;
    private int maxCapacity;

    public Department(String deptName, int maxCapacity) {
        this.deptName = deptName;
        this.maxCapacity = maxCapacity;
    }

    public Department(Department other) {
        this.deptName = other.deptName;
        this.maxCapacity = 0;
    }

    public department getCopy() {
        return new Department(this);
    }

    public String getDeptName() {
        return deptName
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `this.maxCapacity = 0;` | semantic | Copy constructor should copy the capacity from 'other', not set it to 0 | `this.maxCapacity = other.maxCapacity;` |
| 2 | 15 | `public department getCopy() {` | syntax | Return type 'department' is lowercase; must match class name 'Department' | `public Department getCopy() {` |
| 3 | 20 | `return deptName` | syntax | Missing terminating semicolon | `return deptName;` |

**Reference solution:**
```java
public class Department {
    private String deptName;
    private int maxCapacity;

    public Department(String deptName, int maxCapacity) {
        this.deptName = deptName;
        this.maxCapacity = maxCapacity;
    }

    public Department(Department other) {
        this.deptName = other.deptName;
        this.maxCapacity = other.maxCapacity;
    }

    public Department getCopy() {
        return new Department(this);
    }

    public String getDeptName() {
        return deptName;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `other.deptName` is illegal because it's private (private members are accessible inside the same class)

### Q011
- id: Q011
- section: A
- type: spot-error
- difficulty: medium
- topic: encapsulation
- points: 4
- time_minutes: 7
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class BankAccount {
    private String accountNumber;
    private double balance;

    public bankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid deposit");
            return;
        }
        balance -= amount;
    }

    public void withdraw(double amount) {
        if (amount < balance) {
            System.out.println("Insufficient balance");
            return;
        }
        balance -= amount
    }

    public double getBalance() {
        return balance;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `public bankAccount(String accountNumber, double balance) {` | syntax | Constructor name 'bankAccount' must match class name 'BankAccount' | `public BankAccount(String accountNumber, double balance) {` |
| 2 | 15 | `balance -= amount;` | semantic | Deposit should add to balance, not subtract | `balance += amount;` |
| 3 | 19 | `if (amount < balance) {` | semantic | Insufficient balance occurs when withdrawal amount is greater than balance | `if (amount > balance) {` |
| 4 | 23 | `balance -= amount` | syntax | Missing terminating semicolon | `balance -= amount;` |

**Reference solution:**
```java
public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid deposit");
            return;
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Insufficient balance");
            return;
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the inverted condition `<` vs `>` on line 20

### Q012
- id: Q012
- section: A
- type: spot-error
- difficulty: medium
- topic: inheritance
- points: 4
- time_minutes: 7
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String accountNumber, double balance, double interestRate) {
        this.interestRate = balance;
        super(accountNumber, balance);
    }

    public void applyInterest() {
        double interest = getBalance() * interestRate / 100.0;
        deposit(interest * -1);
    }

    public double getInterestRate() {
        return interestRate
    }

    public void setInterestRate(double rate) {
        interestRate = rate;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `this.interestRate = balance;` | semantic | Constructor assigns balance to interestRate instead of parameter interestRate | `this.interestRate = interestRate;` |
| 2 | 6 | `super(accountNumber, balance);` | syntax | super() must be the first statement in the constructor | Move `super(accountNumber, balance);` to line 5 |
| 3 | 11 | `deposit(interest * -1);` | semantic | Earned interest must be deposited as a positive amount, not multiplied by -1 | `deposit(interest);` |
| 4 | 15 | `return interestRate` | syntax | Statement lacks closing semicolon | `return interestRate;` |

**Reference solution:**
```java
public class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String accountNumber, double balance, double interestRate) {
        super(accountNumber, balance);
        this.interestRate = interestRate;
    }

    public void applyInterest() {
        double interest = getBalance() * interestRate / 100.0;
        deposit(interest);
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double rate) {
        this.interestRate = rate;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the swapped variable on line 5

### Q013
- id: Q013
- section: A
- type: spot-error
- difficulty: medium
- topic: constructors
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Customer {
    private String bvn;
    private String customerName;

    public Customer(String bvn) {
        this(bvn, "Unknown");
    }

    public Customer(String bvn, String customerName) {
        this.bvn = bvn;
        customerName = customerName;
    }

    public String getBvn() {
        Return bvn;
    }

    public String getCustomerName() {
        return customerName
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `customerName = customerName;` | semantic | Shadows instance field; assigns parameter to itself leaving customerName null | `this.customerName = customerName;` |
| 2 | 15 | `Return bvn;` | syntax | Keyword 'return' must be all lowercase | `return bvn;` |
| 3 | 19 | `return customerName` | syntax | Missing terminating semicolon | `return customerName;` |

**Reference solution:**
```java
public class Customer {
    private String bvn;
    private String customerName;

    public Customer(String bvn) {
        this(bvn, "Unknown");
    }

    public Customer(String bvn, String customerName) {
        this.bvn = bvn;
        this.customerName = customerName;
    }

    public String getBvn() {
        return bvn;
    }

    public String getCustomerName() {
        return customerName;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `this(bvn, "Unknown");` is syntax error (valid constructor chaining)

### Q014
- id: Q014
- section: A
- type: spot-error
- difficulty: medium
- topic: modifiers
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class FixedDepositAccount extend BankAccount {
    private final int tenureMonths;

    public FixedDepositAccount(String accountNumber, double balance, int tenureMonths) {
        super(accountNumber, balance);
        this.tenureMonths = tenureMonths;
    }

    public void extendTenure(int extraMonths) {
        this.tenureMonths += extraMonths;
    }

    public boolean isMature(int elapsedMonths) {
        if (elapsedMonths < tenureMonths) {
            return true;
        }
        return false;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class FixedDepositAccount extend BankAccount {` | syntax | Keyword must be 'extends', not 'extend' | `public class FixedDepositAccount extends BankAccount {` |
| 2 | 10 | `this.tenureMonths += extraMonths;` | syntax | Cannot modify or assign a value to a final variable once initialized | Remove method or remove 'final' from tenureMonths declaration |
| 3 | 14 | `if (elapsedMonths < tenureMonths) {` | semantic | Account is mature when elapsed months are greater than or equal to tenure, not less | `if (elapsedMonths >= tenureMonths) {` |

**Reference solution:**
```java
public class FixedDepositAccount extends BankAccount {
    private int tenureMonths;

    public FixedDepositAccount(String accountNumber, double balance, int tenureMonths) {
        super(accountNumber, balance);
        this.tenureMonths = tenureMonths;
    }

    public void extendTenure(int extraMonths) {
        this.tenureMonths += extraMonths;
    }

    public boolean isMature(int elapsedMonths) {
        if (elapsedMonths >= tenureMonths) {
            return true;
        }
        return false;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `private int tenureMonths;` on line 2 as the fix for final mutability

**Common mistakes:**
- Calling modification of final variable a semantic error (it fails at compile time)

### Q015
- id: Q015
- section: A
- type: spot-error
- difficulty: medium
- topic: static-vs-instance
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class TransactionLogger {
    private static int totalTransactions = 0;
    private String transactionId;

    public TransactionLogger(String transactionId) {
        this.transactionId = transactionId;
        totalTransactions--;
    }

    public static int getTotalTransactions() {
        return totalTransactions;
    }

    public static String getDetails() {
        return "Transaction: " + transactionId;
    }

    public String getTransactionId() {
        return transactionId
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `totalTransactions--;` | semantic | New transaction logger instantiation should increment the static counter, not decrement | `totalTransactions++;` |
| 2 | 15 | `return "Transaction: " + transactionId;` | syntax | Non-static field 'transactionId' cannot be referenced from static method 'getDetails()' | Make getDetails() non-static: `public String getDetails() {` |
| 3 | 19 | `return transactionId` | syntax | Missing terminating semicolon | `return transactionId;` |

**Reference solution:**
```java
public class TransactionLogger {
    private static int totalTransactions = 0;
    private String transactionId;

    public TransactionLogger(String transactionId) {
        this.transactionId = transactionId;
        totalTransactions++;
    }

    public static int getTotalTransactions() {
        return totalTransactions;
    }

    public String getDetails() {
        return "Transaction: " + transactionId;
    }

    public String getTransactionId() {
        return transactionId;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the static method accessing instance field violation on line 15

### Q016
- id: Q016
- section: A
- type: spot-error
- difficulty: hard
- topic: constructors
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Vehicle {
    private String brand;
    private int speed;
    private double fuelCapacity;

    public vehicle(String brand, int speed, double fuelCapacity) {
        this.brand = brand;
        this.speed = speed;
        this.fuelCapacity = fuelCapacity;
    }

    public double calculateFuelConsumption(int distance, int fuelUsed) {
        double rate = fuelUsed / distance;
        return rate;
    }

    public void accelerate(int increment) {
        if (increment > 0) {
            return;
        }
        speed += increment
    }

    public int getSpeed() {
        return speed;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `public vehicle(String brand, int speed, double fuelCapacity) {` | syntax | Constructor name must match class name exactly (Vehicle, not vehicle) | `public Vehicle(String brand, int speed, double fuelCapacity) {` |
| 2 | 13 | `double rate = fuelUsed / distance;` | semantic | Integer division truncates decimal values before widening to double | `double rate = (double) fuelUsed / distance;` |
| 3 | 18 | `if (increment > 0) {` | semantic | Method returns early when increment is positive, refusing valid acceleration | `if (increment <= 0) {` |
| 4 | 21 | `speed += increment` | syntax | Missing terminating semicolon | `speed += increment;` |

**Reference solution:**
```java
public class Vehicle {
    private String brand;
    private int speed;
    private double fuelCapacity;

    public Vehicle(String brand, int speed, double fuelCapacity) {
        this.brand = brand;
        this.speed = speed;
        this.fuelCapacity = fuelCapacity;
    }

    public double calculateFuelConsumption(int distance, int fuelUsed) {
        double rate = (double) fuelUsed / distance;
        return rate;
    }

    public void accelerate(int increment) {
        if (increment <= 0) {
            return;
        }
        speed += increment;
    }

    public int getSpeed() {
        return speed;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `(fuelUsed * 1.0) / distance` on line 13

**Common mistakes:**
- Failing to spot integer division truncation as a semantic defect

### Q017
- id: Q017
- section: A
- type: spot-error
- difficulty: hard
- topic: inheritance
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class MotorCar extends Vehicle {
    private int numberOfDoors;

    public MotorCar(String brand, int speed, double fuelCapacity, int doors) {
        this.numberOfDoors = doors;
        super(brand, speed, fuelCapacity);
    }

    public boolean isFamilyCar() {
        if (numberOfDoors == 4) {
            return false;
        }
        return true;
    }

    public void setDoors(int doors) {
        doors = doors;
    }

    public int getDoors() {
        Return numberOfDoors;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `super(brand, speed, fuelCapacity);` | syntax | super() constructor call must be the first statement in the constructor | Move `super(brand, speed, fuelCapacity);` to line 5 before `this.numberOfDoors = doors;` |
| 2 | 11 | `return false;` | semantic | A 4-door vehicle is a family car; method should return true | `return true;` |
| 3 | 17 | `doors = doors;` | semantic | Parameter assigned to itself; must qualify with 'this' to update field | `this.numberOfDoors = doors;` |
| 4 | 21 | `Return numberOfDoors;` | syntax | Java keywords are lowercase; 'Return' is invalid syntax | `return numberOfDoors;` |

**Reference solution:**
```java
public class MotorCar extends Vehicle {
    private int numberOfDoors;

    public MotorCar(String brand, int speed, double fuelCapacity, int doors) {
        super(brand, speed, fuelCapacity);
        this.numberOfDoors = doors;
    }

    public boolean isFamilyCar() {
        if (numberOfDoors == 4) {
            return true;
        }
        return false;
    }

    public void setDoors(int doors) {
        this.numberOfDoors = doors;
    }

    public int getDoors() {
        return numberOfDoors;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Calling `Return` on line 21 a semantic typo (it's a syntax compile error)

### Q018
- id: Q018
- section: A
- type: spot-error
- difficulty: hard
- topic: encapsulation
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ElectricCar extends Vehicle {
    private int batteryLevel;

    public ElectricCar(String brand, int speed, double fuelCapacity, int batteryLevel) {
        super(brand, speed, fuelCapacity);
        this.batteryLevel = batteryLevel;
    }

    public void charge(int amount) {
        if (amount < 0) {
            batteryLevel -= amount;
        }
    }

    public void displayStatus() {
        System.out.println("Brand: " + brand);
        System.out.println("Battery: " + batteryLevel + "%");
    }

    public int getBatteryLevel() {
        return batteryLevel
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `if (amount < 0) {` | semantic | Charging must only occur when amount is positive (> 0) | `if (amount > 0) {` |
| 2 | 11 | `batteryLevel -= amount;` | semantic | Charging increases battery level, so amount must be added, not subtracted | `batteryLevel += amount;` |
| 3 | 16 | `System.out.println("Brand: " + brand);` | syntax | Field 'brand' is private in Vehicle; cannot be accessed directly in subclass | `System.out.println("Brand: " + getBrand());` |
| 4 | 21 | `return batteryLevel` | syntax | Statement is missing closing semicolon | `return batteryLevel;` |

**Reference solution:**
```java
public class ElectricCar extends Vehicle {
    private int batteryLevel;

    public ElectricCar(String brand, int speed, double fuelCapacity, int batteryLevel) {
        super(brand, speed, fuelCapacity);
        this.batteryLevel = batteryLevel;
    }

    public void charge(int amount) {
        if (amount > 0) {
            batteryLevel += amount;
        }
    }

    public void displayStatus() {
        System.out.println("Speed: " + getSpeed());
        System.out.println("Battery: " + batteryLevel + "%");
    }

    public int getBatteryLevel() {
        return batteryLevel;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept protected modifier or public getter fix for line 16

**Common mistakes:**
- Thinking private superclass attributes are inherited with direct visibility in subclasses

### Q019
- id: Q019
- section: A
- type: spot-error
- difficulty: hard
- topic: array-of-objects
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class FleetManager {
    private Vehicle[] fleet;
    private int count;

    public FleetManager(int capacity) {
        fleet = new Vehicle[capacity];
        count = 0;
    }

    public void addVehicle(Vehicle v) {
        Throw new IllegalArgumentException("Vehicle cannot be null");
        if (count >= fleet.length) {
            return;
        }
        fleet[count] = v;
        count--;
    }

    public int getTotalVehicles() {
        return count
    }

    public Vehicle getFastestVehicle() {
        if (count == 0) return null;
        Vehicle fastest = fleet[0];
        for (int i = 1; i <= count; i++) {
            if (fleet[i].getSpeed() > fastest.getSpeed()) {
                fastest = fleet[i];
            }
        }
        return fastest;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `Throw new IllegalArgumentException("Vehicle cannot be null");` | syntax | Keyword 'throw' must be lowercase, and unconditional throw makes subsequent code unreachable | `if (v == null) { throw new IllegalArgumentException("Vehicle cannot be null"); }` |
| 2 | 16 | `count--;` | semantic | Adding a vehicle must increment the fleet count, not decrement | `count++;` |
| 3 | 20 | `return count` | syntax | Missing terminating semicolon | `return count;` |
| 4 | 26 | `for (int i = 1; i <= count; i++) {` | semantic | Off-by-one condition i <= count causes ArrayIndexOutOfBoundsException / NullPointerException | `for (int i = 1; i < count; i++) {` |

**Reference solution:**
```java
public class FleetManager {
    private Vehicle[] fleet;
    private int count;

    public FleetManager(int capacity) {
        fleet = new Vehicle[capacity];
        count = 0;
    }

    public void addVehicle(Vehicle v) {
        if (v == null) {
            throw new IllegalArgumentException("Vehicle cannot be null");
        }
        if (count >= fleet.length) {
            return;
        }
        fleet[count] = v;
        count++;
    }

    public int getTotalVehicles() {
        return count;
    }

    public Vehicle getFastestVehicle() {
        if (count == 0) return null;
        Vehicle fastest = fleet[0];
        for (int i = 1; i < count; i++) {
            if (fleet[i].getSpeed() > fastest.getSpeed()) {
                fastest = fleet[i];
            }
        }
        return fastest;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the off-by-one `<=` index loop boundary on line 26

### Q020
- id: Q020
- section: A
- type: spot-error
- difficulty: hard
- topic: inheritance
- points: 4
- time_minutes: 8
- source: variant-of-tutorial
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class HeavyTruck extends Vehicle {
    private double payloadCapacity;
    private double currentLoad;

    public HeavyTruck(String brand, int speed, double fuelCapacity, double payloadCapacity) {
        super(brand, speed, fuelCapacity);
        this.payloadCapacity = payloadCapacity;
        this.currentLoad = 0.0;
    }

    public void loadCargo(double weight) {
        if (currentLoad + weight > payloadCapacity) {
            System.out.println("Overload prevented");
            return;
        }
        currentLoad -= weight;
    }

    @Override
    void accelerate(int increment) {
        super.accelerate(increment / 2);
    }

    public double getAvailableCapacity() {
        return payloadCapacity + currentLoad;
    }

    public double getCurrentLoad() {
        return currentLoad
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 16 | `currentLoad -= weight;` | semantic | Loading cargo must add weight to the current load, not subtract | `currentLoad += weight;` |
| 2 | 20 | `void accelerate(int increment) {` | syntax | Cannot reduce visibility of overridden method; superclass method accelerate() is public | `public void accelerate(int increment) {` |
| 3 | 25 | `return payloadCapacity + currentLoad;` | semantic | Available capacity is payloadCapacity minus currentLoad, not sum | `return payloadCapacity - currentLoad;` |
| 4 | 29 | `return currentLoad` | syntax | Missing terminating semicolon | `return currentLoad;` |

**Reference solution:**
```java
public class HeavyTruck extends Vehicle {
    private double payloadCapacity;
    private double currentLoad;

    public HeavyTruck(String brand, int speed, double fuelCapacity, double payloadCapacity) {
        super(brand, speed, fuelCapacity);
        this.payloadCapacity = payloadCapacity;
        this.currentLoad = 0.0;
    }

    public void loadCargo(double weight) {
        if (currentLoad + weight > payloadCapacity) {
            System.out.println("Overload prevented");
            return;
        }
        currentLoad += weight;
    }

    @Override
    public void accelerate(int increment) {
        super.accelerate(increment / 2);
    }

    public double getAvailableCapacity() {
        return payloadCapacity - currentLoad;
    }

    public double getCurrentLoad() {
        return currentLoad;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Failing to spot the missing 'public' on line 20 as an access modifier weakening violation

## Section B: Abstract Classes, Interfaces, Polymorphism and Modifiers (final, static, abstract)
Scope: Abstract classes and methods, interface definitions, implements keyword, multiple interface implementation, default and static interface methods (JDK 8), runtime polymorphism (dynamic method dispatch), and modifier rules (final classes/variables/methods, static methods and fields).

### Q021
- id: Q021
- section: B
- type: spot-error
- difficulty: easy
- topic: abstract-classes
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public abstract class MedicalStaff {
    private final String staffId;
    private String department;

    public MedicalStaff(String staffId, String department) {
        this.staffId = staffId;
        this.department = department;
    }

    public abstract void performDuties();

    public void updateStaffId(String newId) {
        this.staffId = newId;
    }

    public boolean isInEmergencyDept() {
        if (department.equals("Emergency")) {
            return false;
        }
        return true;
    }

    public String getDepartment() {
        return department
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 13 | `this.staffId = newId;` | syntax | Cannot assign a new value to a final field once initialized | Remove 'final' modifier from staffId declaration or remove setter |
| 2 | 18 | `return false;` | semantic | Should return true when the department is 'Emergency', not false | `return true;` |
| 3 | 24 | `return department` | syntax | Missing terminating semicolon | `return department;` |

**Reference solution:**
```java
public abstract class MedicalStaff {
    private String staffId;
    private String department;

    public MedicalStaff(String staffId, String department) {
        this.staffId = staffId;
        this.department = department;
    }

    public abstract void performDuties();

    public void updateStaffId(String newId) {
        this.staffId = newId;
    }

    public boolean isInEmergencyDept() {
        if (department.equals("Emergency")) {
            return true;
        }
        return false;
    }

    public String getDepartment() {
        return department;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `return department.equals("Emergency");` on line 17-20

**Common mistakes:**
- Thinking line 10 needs a method body (it is abstract, so it correctly terminates with a semicolon)

### Q022
- id: Q022
- section: B
- type: spot-error
- difficulty: easy
- topic: abstract-classes
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Doctor extend MedicalStaff {
    private int surgeriesConducted;

    public Doctor(String staffId, String department) {
        super(staffId, department);
        this.surgeriesConducted = 0;
    }

    public void recordSurgery() {
        surgeriesConducted--;
    }

    public int getSurgeriesConducted() {
        return surgeriesConducted;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class Doctor extend MedicalStaff {` | syntax | Inheritance keyword must be 'extends', not 'extend' | `public class Doctor extends MedicalStaff {` |
| 2 | 1 | `public class Doctor extend MedicalStaff {` | syntax | Doctor is not abstract and fails to override abstract method performDuties() inherited from MedicalStaff | Implement performDuties(): `@Override public void performDuties() { System.out.println("Treating patients"); }` |
| 3 | 10 | `surgeriesConducted--;` | semantic | Recording a completed surgery must increment the counter, not decrement | `surgeriesConducted++;` |

**Reference solution:**
```java
public class Doctor extends MedicalStaff {
    private int surgeriesConducted;

    public Doctor(String staffId, String department) {
        super(staffId, department);
        this.surgeriesConducted = 0;
    }

    @Override
    public void performDuties() {
        System.out.println("Conducting medical consultations and surgeries");
    }

    public void recordSurgery() {
        surgeriesConducted++;
    }

    public int getSurgeriesConducted() {
        return surgeriesConducted;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Declaring class Doctor abstract is also acceptable for error 2

**Common mistakes:**
- Missing the unfulfilled abstract method obligation in the subclass

### Q023
- id: Q023
- section: B
- type: spot-error
- difficulty: easy
- topic: interfaces
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Nurse extends MedicalStaff extends Certifiable {
    private int shiftHours;

    public Nurse(String staffId, String department, int shiftHours) {
        super(staffId, department);
        this.shiftHours = shiftHours;
    }

    @Override
    public void performDuties() {
        System.out.println("Administering patient medication");
    }

    public boolean isOvertime() {
        if (shiftHours > 8) {
            return false;
        }
        return true;
    }

    public int getShiftHours() {
        return shiftHours
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class Nurse extends MedicalStaff extends Certifiable {` | syntax | Java does not permit multiple extends; interfaces must be implemented with 'implements' | `public class Nurse extends MedicalStaff implements Certifiable {` |
| 2 | 16 | `return false;` | semantic | Overtime occurs when shift hours exceed 8; should return true | `return true;` |
| 3 | 22 | `return shiftHours` | syntax | Missing terminating semicolon | `return shiftHours;` |

**Reference solution:**
```java
public class Nurse extends MedicalStaff implements Certifiable {
    private int shiftHours;

    public Nurse(String staffId, String department, int shiftHours) {
        super(staffId, department);
        this.shiftHours = shiftHours;
    }

    @Override
    public void performDuties() {
        System.out.println("Administering patient medication");
    }

    public boolean isOvertime() {
        if (shiftHours > 8) {
            return true;
        }
        return false;
    }

    public int getShiftHours() {
        return shiftHours;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking Java allows `extends A, B` for classes

### Q024
- id: Q024
- section: B
- type: spot-error
- difficulty: easy
- topic: interfaces
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public Interface PatientBillable {
    double BASE_RATE = 2000.0;

    double calculateBill();

    void printHeader() {
        System.out.println("--- Patient Bill ---");
    }

    default double calculateDiscount(double amount, double rate) {
        return amount + (amount * rate / 100.0);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public Interface PatientBillable {` | syntax | Keyword 'interface' must be completely lowercase | `public interface PatientBillable {` |
| 2 | 6 | `void printHeader() {` | syntax | Interface method with a body must be declared with the 'default' or 'static' modifier | `default void printHeader() {` |
| 3 | 11 | `return amount + (amount * rate / 100.0);` | semantic | Discount must reduce the payable amount, not increase it | `return amount - (amount * rate / 100.0);` |

**Reference solution:**
```java
public interface PatientBillable {
    double BASE_RATE = 2000.0;

    double calculateBill();

    default void printHeader() {
        System.out.println("--- Patient Bill ---");
    }

    default double calculateDiscount(double amount, double rate) {
        return amount - (amount * rate / 100.0);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Claiming `BASE_RATE` must explicitly specify `public static final` (constants in interfaces are implicitly public static final)

### Q025
- id: Q025
- section: B
- type: spot-error
- difficulty: medium
- topic: static-vs-instance
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Prescription {
    private String medicineName;
    private int dosageMg;
    private static int totalPrescriptions = 0;

    public Prescription(String medicineName, int dosageMg) {
        this.medicineName = medicineName;
        this.dosageMg = dosageMg;
        totalPrescriptions++;
    }

    public static String getPrescriptionInfo() {
        return medicineName + " (" + dosageMg + "mg)";
    }

    public boolean isHighDosage() {
        if (dosageMg > 500) {
            return false;
        }
        return true;
    }

    public static int getTotalPrescriptions() {
        return totalPrescriptions
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 13 | `return medicineName + " (" + dosageMg + "mg)";` | syntax | Static method cannot access non-static instance fields 'medicineName' and 'dosageMg' | Make method non-static: `public String getPrescriptionInfo() {` |
| 2 | 18 | `return false;` | semantic | Dosage over 500mg is high dosage; should return true, not false | `return true;` |
| 3 | 24 | `return totalPrescriptions` | syntax | Missing terminating semicolon | `return totalPrescriptions;` |

**Reference solution:**
```java
public class Prescription {
    private String medicineName;
    private int dosageMg;
    private static int totalPrescriptions = 0;

    public Prescription(String medicineName, int dosageMg) {
        this.medicineName = medicineName;
        this.dosageMg = dosageMg;
        totalPrescriptions++;
    }

    public String getPrescriptionInfo() {
        return medicineName + " (" + dosageMg + "mg)";
    }

    public boolean isHighDosage() {
        if (dosageMg > 500) {
            return true;
        }
        return false;
    }

    public static int getTotalPrescriptions() {
        return totalPrescriptions;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Trying to make medicineName and dosageMg static instead of removing static from getPrescriptionInfo()

### Q026
- id: Q026
- section: B
- type: spot-error
- difficulty: medium
- topic: abstract-classes
- points: 3
- time_minutes: 6
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Remittance {
    protected double amountSent;
    protected String transactionStatus = "INITIALIZED";

    public String generateSummary() {
        return "Channel: " + getClass().getSimpleName() + " [Amount: " + transactionStatus + ", Status: " + amountSent + "]";
    }

    public abstract void executeTransfer(double amount) { }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class Remittance {` | syntax | A class containing an abstract method must be declared abstract | `public abstract class Remittance {` |
| 2 | 6 | `return "Channel: " + getClass().getSimpleName() + " [Amount: " + transactionStatus + ", Status: " + amountSent + "]";` | semantic | Inverted values: transactionStatus printed for Amount and amountSent for Status | `return "Channel: " + getClass().getSimpleName() + " [Amount: " + amountSent + ", Status: " + transactionStatus + "]";` |
| 3 | 9 | `public abstract void executeTransfer(double amount) { }` | syntax | Abstract methods cannot have a body; must terminate with a semicolon | `public abstract void executeTransfer(double amount);` |

**Reference solution:**
```java
public abstract class Remittance {
    protected double amountSent;
    protected String transactionStatus = "INITIALIZED";

    public String generateSummary() {
        return "Channel: " + getClass().getSimpleName() + " [Amount: " + amountSent + ", Status: " + transactionStatus + "]";
    }

    public abstract void executeTransfer(double amount);
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the curly braces `{ }` body on line 11 as a syntax violation

### Q027
- id: Q027
- section: B
- type: spot-error
- difficulty: medium
- topic: abstract-classes
- points: 4
- time_minutes: 7
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CardRemittance extends Remittance {
    @Override
    public void executeTransfer(double amount) {
        amountSent = amount * 0.02;
        transactionStatus = SUCCESS;
    }
}

public class CashRemittance implements Remittance {
    @Override
    public void executeTransfer(double amount) {
        if (amount < 500000) {
            throw new IllegalArgumentException("Cash transfers above N500,000 are not allowed");
        }
        amountSent = amount;
        transactionStatus = "COMPLETED";
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `amountSent = amount * 0.02;` | semantic | amountSent only stores the 2% fee rather than the total amount plus fee | `amountSent = amount + (amount * 0.02);` |
| 2 | 5 | `transactionStatus = SUCCESS;` | syntax | 'SUCCESS' is an unresolved symbol; string literal must be enclosed in double quotes | `transactionStatus = "SUCCESS";` |
| 3 | 9 | `public class CashRemittance implements Remittance {` | syntax | Remittance is an abstract class, not an interface; must use 'extends' | `class CashRemittance extends Remittance {` |
| 4 | 12 | `if (amount < 500000) {` | semantic | Should throw exception when amount exceeds N500,000, not when less | `if (amount > 500000) {` |

**Reference solution:**
```java
public class CardRemittance extends Remittance {
    @Override
    public void executeTransfer(double amount) {
        amountSent = amount + (amount * 0.02);
        transactionStatus = "SUCCESS";
    }
}

class CashRemittance extends Remittance {
    @Override
    public void executeTransfer(double amount) {
        if (amount > 500000) {
            throw new IllegalArgumentException("Cash transfers above N500,000 are not allowed");
        }
        amountSent = amount;
        transactionStatus = "COMPLETED";
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `amountSent = amount * 1.02;` on line 4

**Common mistakes:**
- Failing to distinguish between 'extends' for abstract class and 'implements' for interface

### Q028
- id: Q028
- section: B
- type: spot-error
- difficulty: medium
- topic: polymorphism
- points: 4
- time_minutes: 7
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class InvoiceProcessor {
    private Payable payable;

    public void InvoiceProcessor(Payable payable) {
        this.payable = payable;
    }

    public double computeTax(double rate) {
        if (rate > 0) {
            throw new IllegalArgumentException("Tax rate must be positive");
        }
        return payable.amountDue() * rate / 100.0;
    }

    public boolean canProcess() {
        if (payable == null) {
            return true;
        }
        return false;
    }

    public void updatePayable(Payable newPayable) {
        payable = newPayable
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `public void InvoiceProcessor(Payable payable) {` | syntax | Constructors cannot declare a return type 'void' | `public InvoiceProcessor(Payable payable) {` |
| 2 | 9 | `if (rate > 0) {` | semantic | Throws exception when tax rate is positive; should throw when rate is non-positive (<= 0) | `if (rate <= 0) {` |
| 3 | 17 | `return true;` | semantic | An invoice cannot be processed when payable is null; should return false | `return false;` |
| 4 | 23 | `payable = newPayable` | syntax | Missing terminating semicolon | `payable = newPayable;` |

**Reference solution:**
```java
public class InvoiceProcessor {
    private Payable payable;

    public InvoiceProcessor(Payable payable) {
        this.payable = payable;
    }

    public double computeTax(double rate) {
        if (rate <= 0) {
            throw new IllegalArgumentException("Tax rate must be positive");
        }
        return payable.amountDue() * rate / 100.0;
    }

    public boolean canProcess() {
        if (payable == null) {
            return false;
        }
        return true;
    }

    public void updatePayable(Payable newPayable) {
        this.payable = newPayable;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- On line 16-19, accept `return payable != null;`

**Common mistakes:**
- Missing the constructor void return type error on line 4

### Q029
- id: Q029
- section: B
- type: spot-error
- difficulty: medium
- topic: interfaces
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public final interface Discountable {
    double applyDiscount(double price);

    static double calculateVat(double amount) {
        return amount * 0.075;
    }

    default double applySeasonalPromo(double price) {
        return price + (price * 0.10);
    }

    static void logDiscount(String note) {
        System.out.println("LOG: " + note)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public final interface Discountable {` | syntax | Illegal modifier combination; an interface cannot be declared 'final' | `public interface Discountable {` |
| 2 | 9 | `return price + (price * 0.10);` | semantic | Discount must decrease the price, not increase it | `return price - (price * 0.10);` |
| 3 | 13 | `System.out.println("LOG: " + note)` | syntax | Missing terminating semicolon | `System.out.println("LOG: " + note);` |

**Reference solution:**
```java
public interface Discountable {
    double applyDiscount(double price);

    static double calculateVat(double amount) {
        return amount * 0.075;
    }

    default double applySeasonalPromo(double price) {
        return price - (price * 0.10);
    }

    static void logDiscount(String note) {
        System.out.println("LOG: " + note);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `default` or `static` methods in interfaces are invalid (they are legal in Java 8+)

### Q030
- id: Q030
- section: B
- type: spot-error
- difficulty: medium
- topic: interfaces
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class PaymentValidator implements Verifiable, Authorizable {
    private double threshold;

    public PaymentValidator(double threshold) {
        this.threshold = threshold;
    }

    @Override
    public boolean verify(String token) {
        if (token == null || token.isEmpty()) {
            return true;
        }
        return false;
    }

    @Override
    boolean authorize(double amount) {
        return amount <= threshold;
    }

    public double getThreshold() {
        return this.threshold
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `return true;` | semantic | An empty or null verification token is invalid; should return false | `return false;` |
| 2 | 17 | `boolean authorize(double amount) {` | syntax | Interface methods are implicitly public; implementing method cannot reduce visibility | `public boolean authorize(double amount) {` |
| 3 | 22 | `return this.threshold` | syntax | Missing terminating semicolon | `return this.threshold;` |

**Reference solution:**
```java
public class PaymentValidator implements Verifiable, Authorizable {
    private double threshold;

    public PaymentValidator(double threshold) {
        this.threshold = threshold;
    }

    @Override
    public boolean verify(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        return true;
    }

    @Override
    public boolean authorize(double amount) {
        return amount <= threshold;
    }

    public double getThreshold() {
        return this.threshold;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Forgetting that all interface methods are implicitly public, requiring the public keyword upon implementation

### Q031
- id: Q031
- section: B
- type: spot-error
- difficulty: hard
- topic: abstract-classes
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public abstract class Shape2D {
    protected String color;

    public Shape2D(String color) {
        this.color = "Black";
    }

    public abstract double area();

    public final String getColor() {
        return color;
    }

    public static double getRatio() {
        return area() / 2.0;
    }

    public boolean hasColor() {
        if (color == null || color.isEmpty()) {
            return true;
        }
        return false;
    }

    public abstract double perimeter()
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `this.color = "Black";` | semantic | Constructor hardcodes "Black", ignoring the incoming color parameter | `this.color = color;` |
| 2 | 15 | `return area() / 2.0;` | syntax | Cannot invoke non-static method area() from a static method | Remove static from getRatio(): `public double getRatio() {` |
| 3 | 20 | `return true;` | semantic | If color is null or empty, shape does not have a color; should return false | `return false;` |
| 4 | 25 | `public abstract double perimeter()` | syntax | Abstract method declaration must terminate with a semicolon | `public abstract double perimeter();` |

**Reference solution:**
```java
public abstract class Shape2D {
    protected String color;

    public Shape2D(String color) {
        this.color = color;
    }

    public abstract double area();

    public final String getColor() {
        return color;
    }

    public double getRatio() {
        return area() / 2.0;
    }

    public boolean hasColor() {
        if (color == null || color.isEmpty()) {
            return false;
        }
        return true;
    }

    public abstract double perimeter();
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `public final String getColor()` is invalid (final methods are completely valid in abstract classes)

### Q032
- id: Q032
- section: B
- type: spot-error
- difficulty: hard
- topic: abstract-classes
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Circle2D extends Shape2D {
    private double radius;

    public Circle2D(String color, double radius) {
        this.radius = radius;
        super(color);
    }

    @Override
    public double area() {
        return 2 * Math.PI * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }

    public void setRadius(double radius) {
        if (radius > 0) {
            return;
        }
        this.radius = radius
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `super(color);` | syntax | super() constructor invocation must be the first statement in the constructor | Move `super(color);` to line 5 before `this.radius = radius;` |
| 2 | 11 | `return 2 * Math.PI * radius;` | semantic | Formula calculates circumference, not area; area is PI * r^2 | `return Math.PI * radius * radius;` |
| 3 | 20 | `if (radius > 0) {` | semantic | Method returns early when radius is positive, preventing valid updates | `if (radius <= 0) {` |
| 4 | 23 | `this.radius = radius` | syntax | Missing terminating semicolon | `this.radius = radius;` |

**Reference solution:**
```java
public class Circle2D extends Shape2D {
    private double radius;

    public Circle2D(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }

    public void setRadius(double radius) {
        if (radius <= 0) {
            return;
        }
        this.radius = radius;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `Math.PI * Math.pow(radius, 2)` on line 11

**Common mistakes:**
- Failing to notice that area() was assigned the circumference formula

### Q033
- id: Q033
- section: B
- type: spot-error
- difficulty: hard
- topic: abstract-classes
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Rectangle2D extends Shape2D {
    private double length;
    private double width;

    public Rectangle2D(String color, double length, double width) {
        super(color);
        length = length;
        this.width = width;
    }

    @Override
    public double area() {
        return length + width;
    }

    @Override
    double perimeter() {
        return 2 * (length + width);
    }

    public double getLength() {
        Return length;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `length = length;` | semantic | Shadows instance field; assigns parameter to itself leaving this.length as 0.0 | `this.length = length;` |
| 2 | 13 | `return length + width;` | semantic | Rectangle area is length multiplied by width, not addition | `return length * width;` |
| 3 | 17 | `double perimeter() {` | syntax | Cannot assign weaker access privileges; superclass perimeter() is public | `public double perimeter() {` |
| 4 | 22 | `Return length;` | syntax | Keyword 'return' must be lowercase | `return length;` |

**Reference solution:**
```java
public class Rectangle2D extends Shape2D {
    private double length;
    private double width;

    public Rectangle2D(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    public double area() {
        return length * width;
    }

    @Override
    public double perimeter() {
        return 2 * (length + width);
    }

    public double getLength() {
        return length;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Failing to spot the package-private visibility reduction on line 17

### Q034
- id: Q034
- section: B
- type: spot-error
- difficulty: hard
- topic: interfaces
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class Triangle2D extends Shape2D extends Polygon {
    private double a;
    private double b;
    private double c;

    public Triangle2D(String color, double a, double b, double c) {
        super(color);
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public double perimeter() {
        return a + b - c;
    }

    @Override
    public double area() {
        double s = perimeter() * 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    public int getSideCount() {
        return 3
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class Triangle2D extends Shape2D extends Polygon {` | syntax | Java does not support multiple extends; Polygon interface must be implemented | `public class Triangle2D extends Shape2D implements Polygon {` |
| 2 | 15 | `return a + b - c;` | semantic | Perimeter of triangle is sum of all three sides (a + b + c) | `return a + b + c;` |
| 3 | 20 | `double s = perimeter() * 2;` | semantic | Semi-perimeter in Heron's formula is perimeter divided by 2, not multiplied by 2 | `double s = perimeter() / 2.0;` |
| 4 | 25 | `return 3` | syntax | Missing terminating semicolon | `return 3;` |

**Reference solution:**
```java
public class Triangle2D extends Shape2D implements Polygon {
    private double a;
    private double b;
    private double c;

    public Triangle2D(String color, double a, double b, double c) {
        super(color);
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public double perimeter() {
        return a + b + c;
    }

    @Override
    public double area() {
        double s = perimeter() / 2.0;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    public int getSideCount() {
        return 3;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the Heron's formula semi-perimeter calculation error on line 20

### Q035
- id: Q035
- section: B
- type: spot-error
- difficulty: hard
- topic: polymorphism
- points: 4
- time_minutes: 8
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ShapeRenderer {
    public static void main(String[] args) {
        Shape2D[] shapes = new Shape2D[2];
        shapes[0] = new Circle2D("Red", 5.0);
        shapes[1] = new Rectangle2D("Blue", 4.0, 6.0);

        Double totalArea = 0.0;
        for (int i = 0; i <= shapes.length; i++) {
            totalArea -= shapes[i].area();
        }

        System.out.println("Total area: " + totalArea)
    }

    public static Shape2D createDefaultShape() {
        return new Shape2D("Gray");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `for (int i = 0; i <= shapes.length; i++) {` | semantic | Off-by-one error (i <= shapes.length) causes ArrayIndexOutOfBoundsException at runtime | `for (int i = 0; i < shapes.length; i++) {` |
| 2 | 9 | `totalArea -= shapes[i].area();` | semantic | Total accumulated area must be added, not subtracted | `totalArea += shapes[i].area();` |
| 3 | 12 | `System.out.println("Total area: " + totalArea)` | syntax | Missing terminating semicolon | `System.out.println("Total area: " + totalArea);` |
| 4 | 16 | `return new Shape2D("Gray");` | syntax | Abstract class 'Shape2D' cannot be directly instantiated | Return a concrete subclass instance: `return new Circle2D("Gray", 1.0);` |

**Reference solution:**
```java
public class ShapeRenderer {
    public static void main(String[] args) {
        Shape2D[] shapes = new Shape2D[2];
        shapes[0] = new Circle2D("Red", 5.0);
        shapes[1] = new Rectangle2D("Blue", 4.0, 6.0);

        double totalArea = 0.0;
        for (int i = 0; i < shapes.length; i++) {
            totalArea += shapes[i].area();
        }

        System.out.println("Total area: " + totalArea);
    }

    public static Shape2D createDefaultShape() {
        return new Circle2D("Gray", 1.0);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- On line 16, accept returning null or any concrete subclass

**Common mistakes:**
- Claiming `new Shape2D[2]` on line 3 is a syntax error (allocating an array of abstract references is legal; only instantiating an individual abstract object is illegal)

## Section C: ArrayList and Exception Handling
Scope: ArrayList operations (add, get, set, remove by index vs object, size, contains, isEmpty, generics), custom exceptions, checked vs unchecked exceptions, try-catch-finally control flow, multiple catch block hierarchy, and throw vs throws keywords.

### Q036
- id: Q036
- section: C
- type: spot-error
- difficulty: easy
- topic: arraylist-operations
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ProductCatalog {
    private ArrayList<String> products;

    public ProductCatalog() {
        products = new ArrayList<String>();
    }

    public void addProduct(String item) {
        if (products.contains(item)) {
            products.add(item);
        }
    }

    public String getProduct(int index) {
        return products.get[index];
    }

    public int getCount() {
        return products.size()
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `if (products.contains(item)) {` | semantic | Inverted condition: should add the product if it is not already in the list | `if (!products.contains(item)) {` |
| 2 | 15 | `return products.get[index];` | syntax | ArrayList element retrieval uses method syntax get(index), not array bracket syntax get[index] | `return products.get(index);` |
| 3 | 19 | `return products.size()` | syntax | Missing terminating semicolon | `return products.size();` |

**Reference solution:**
```java
import java.util.ArrayList;

public class ProductCatalog {
    private ArrayList<String> products;

    public ProductCatalog() {
        products = new ArrayList<String>();
    }

    public void addProduct(String item) {
        if (!products.contains(item)) {
            products.add(item);
        }
    }

    public String getProduct(int index) {
        return products.get(index);
    }

    public int getCount() {
        return products.size();
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `new ArrayList<String>()` on line 5 requires the diamond operator `<>` (explicit type argument is valid Java)

### Q037
- id: Q037
- section: C
- type: spot-error
- difficulty: easy
- topic: arraylist-operations
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class StockPriceManager {
    private ArrayList<Integer> prices;

    public StockPriceManager() {
        prices = new ArrayList<int>();
    }

    public void removePrice(int value) {
        prices.remove(value);
    }

    public int getTotalPrices() {
        return prices.size()
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `prices = new ArrayList<int>();` | syntax | Generics in Java cannot accept primitive types like 'int'; must use wrapper 'Integer' | `prices = new ArrayList<Integer>();` |
| 2 | 9 | `prices.remove(value);` | semantic | Passing primitive int invokes remove(int index) instead of remove(Object), removing by index rather than value | `prices.remove(Integer.valueOf(value));` |
| 3 | 13 | `return prices.size()` | syntax | Missing terminating semicolon | `return prices.size();` |

**Reference solution:**
```java
import java.util.ArrayList;

public class StockPriceManager {
    private ArrayList<Integer> prices;

    public StockPriceManager() {
        prices = new ArrayList<Integer>();
    }

    public void removePrice(int value) {
        prices.remove(Integer.valueOf(value));
    }

    public int getTotalPrices() {
        return prices.size();
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `prices = new ArrayList<>();` for line 5

**Common mistakes:**
- Missing the classic ArrayList remove(int) vs remove(Object) overload trap on line 9

### Q038
- id: Q038
- section: C
- type: spot-error
- difficulty: easy
- topic: exception-handling
- points: 3
- time_minutes: 5
- source: variant-of-tutorial
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class InventoryReport {
    public static int parseQuantity(String text) throw NumberFormatException {
        if (text == null) {
            throws new IllegalArgumentException("Text cannot be null");
        }
        int qty = Integer.parseInt(text);
        if (qty < 0) {
            return qty * -1;
        }
        return qty;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 2 | `public static int parseQuantity(String text) throw NumberFormatException {` | syntax | Method declaration must use the 'throws' keyword, not 'throw' | `public static int parseQuantity(String text) throws NumberFormatException {` |
| 2 | 4 | `throws new IllegalArgumentException("Text cannot be null");` | syntax | Throwing an exception in a code block requires 'throw', not 'throws' | `throw new IllegalArgumentException("Text cannot be null");` |
| 3 | 8 | `return qty * -1;` | semantic | Silently negating a negative quantity masks invalid stock data instead of raising an error | `throw new IllegalArgumentException("Quantity cannot be negative");` |

**Reference solution:**
```java
public class InventoryReport {
    public static int parseQuantity(String text) throws NumberFormatException {
        if (text == null) {
            throw new IllegalArgumentException("Text cannot be null");
        }
        int qty = Integer.parseInt(text);
        if (qty < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        return qty;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Confusing 'throw' (statement in body) and 'throws' (clause in method signature)

### Q039
- id: Q039
- section: C
- type: spot-error
- difficulty: easy
- topic: exception-handling
- points: 4
- time_minutes: 6
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class StockAuditor {
    public static int parseThreshold(String input) {
        int threshold = 0;
        try {
            threshold = Integer.parseInt(input);
        } catch (NumberFormatException e) {
            threshold = -1;
        } finally {
            threshold = 100;
        }
        Return threshold;
    }

    public static boolean isLowStock(int currentStock, int threshold) {
        if (currentStock < threshold) {
            return false;
        }
        return true
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `threshold = 100;` | semantic | The finally block executes unconditionally, permanently overwriting any parsed value or error flag | Remove `threshold = 100;` from finally block |
| 2 | 11 | `Return threshold;` | syntax | Keyword 'return' must be lowercase | `return threshold;` |
| 3 | 16 | `return false;` | semantic | Low stock condition is true when currentStock is strictly less than threshold | `return true;` |
| 4 | 18 | `return true` | syntax | Missing terminating semicolon | `return false;` |

**Reference solution:**
```java
public class StockAuditor {
    public static int parseThreshold(String input) {
        int threshold = 0;
        try {
            threshold = Integer.parseInt(input);
        } catch (NumberFormatException e) {
            threshold = -1;
        }
        return threshold;
    }

    public static boolean isLowStock(int currentStock, int threshold) {
        if (currentStock < threshold) {
            return true;
        }
        return false;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- On line 15-18, accept `return currentStock < threshold;`

**Common mistakes:**
- Failing to recognize that finally blocks always execute before the method returns

### Q040
- id: Q040
- section: C
- type: spot-error
- difficulty: medium
- topic: arraylist-operations
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CourseRegistrationList {
    private ArrayList<String> courseList;

    public CourseRegistrationList() {
        courseList = new ArrayList<>();
    }

    public void enroll(String courseCode) {
        if (courseCode == null) {
            throw new IllegalArgumentException("Course code cannot be null");
        }
        courseList.add(courseCode);
    }

    public void removeCourse(String code) {
        int index = courseList.indexOf(code);
        if (index == -1) {
            courseList.remove(index);
        }
    }

    public int getCourseCount() {
        return courseList.length;
    }

    public boolean hasCourse(String code) {
        return courseList.contains(code)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 17 | `if (index == -1) {` | semantic | Inverted condition: indexOf returns -1 when item is absent; removal must only occur when index != -1 | `if (index != -1) {` |
| 2 | 23 | `return courseList.length;` | syntax | ArrayList size is obtained via size() method, not .length property | `return courseList.size();` |
| 3 | 27 | `return courseList.contains(code)` | syntax | Missing terminating semicolon | `return courseList.contains(code);` |

**Reference solution:**
```java
import java.util.ArrayList;

public class CourseRegistrationList {
    private ArrayList<String> courseList;

    public CourseRegistrationList() {
        courseList = new ArrayList<>();
    }

    public void enroll(String courseCode) {
        if (courseCode == null) {
            throw new IllegalArgumentException("Course code cannot be null");
        }
        courseList.add(courseCode);
    }

    public void removeCourse(String code) {
        int index = courseList.indexOf(code);
        if (index != -1) {
            courseList.remove(index);
        }
    }

    public int getCourseCount() {
        return courseList.size();
    }

    public boolean hasCourse(String code) {
        return courseList.contains(code);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `courseList.remove(code);` directly for line 18

**Common mistakes:**
- Confusing array `.length` with collection `.size()`

### Q041
- id: Q041
- section: C
- type: spot-error
- difficulty: medium
- topic: encapsulation
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class AcademicCourse {
    private String courseCode;
    private String courseTitle;
    private Int creditUnit;
    private String letterGrade;

    public AcademicCourse(String courseCode, String courseTitle, int creditUnit, String letterGrade) {
        this.courseCode = courseCode;
        this.courseTitle = courseCode;
        this.creditUnit = creditUnit;
        this.letterGrade = letterGrade;
    }

    public String getCourseCode() { return courseCode; }
    public String getCourseTitle() { return courseTitle; }
    public int getCreditUnit() { return creditUnit; }
    public getLetterGrade() { return letterGrade; }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `private Int creditUnit;` | syntax | 'Int' is not a valid Java primitive type; must be 'int' | `private int creditUnit;` |
| 2 | 9 | `this.courseTitle = courseCode;` | semantic | Field courseTitle is mistakenly assigned courseCode instead of parameter courseTitle | `this.courseTitle = courseTitle;` |
| 3 | 17 | `public getLetterGrade() { return letterGrade; }` | syntax | Method declaration lacks a return type; must specify 'String' | `public String getLetterGrade() { return letterGrade; }` |

**Reference solution:**
```java
public class AcademicCourse {
    private String courseCode;
    private String courseTitle;
    private int creditUnit;
    private String letterGrade;

    public AcademicCourse(String courseCode, String courseTitle, int creditUnit, String letterGrade) {
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.creditUnit = creditUnit;
        this.letterGrade = letterGrade;
    }

    public String getCourseCode() { return courseCode; }
    public String getCourseTitle() { return courseTitle; }
    public int getCreditUnit() { return creditUnit; }
    public String getLetterGrade() { return letterGrade; }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the parameter assignment typo on line 8

### Q042
- id: Q042
- section: C
- type: spot-error
- difficulty: medium
- topic: exception-handling
- points: 5
- time_minutes: 8
- source: variant-of-test
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CGPACalculator {
    public double calculateCGPA(ArrayList<AcademicCourse> courses) {
        if (courses.size() > 5) {
            throw new IllegalStateException("A student must register at least 5 courses before CGPA can be calculated.");
        }
        int totalPoints = 0;
        int totalUnits = 0;
        for (AcademicCourse c in courses) {
            totalPoints += gradePoint(c.getLetterGrade()) * c.getCreditUnit();
            totalUnits += c.getCreditUnit();
        }
        double cgpa = totalPoints / totalUnits;
        return cgpa
    }

    private int gradePoint(String grade) {
        switch (grade.toUpperCase()) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            case "D": return 1;
            case "E": return 2;
            case "F": return 0;
            default:
                throw new IllegalArgumentException("Invalid grade: " + grade);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `if (courses.size() > 5) {` | semantic | Requirement states at least 5 courses are required; exception must be thrown when size is less than 5 | `if (courses.size() < 5) {` |
| 2 | 8 | `for (AcademicCourse c in courses) {` | syntax | Java enhanced for loop uses colon syntax ':', not 'in' | `for (AcademicCourse c : courses) {` |
| 3 | 12 | `double cgpa = totalPoints / totalUnits;` | semantic | Integer division truncates fractional CGPA before assignment to double | `double cgpa = (double) totalPoints / totalUnits;` |
| 4 | 13 | `return cgpa` | syntax | Missing terminating semicolon | `return cgpa;` |
| 5 | 21 | `case "D": return 1;` | semantic | Inverted grade points on UI 5-point scale: Grade D earns 2 points, while Grade E earns 1 point | `case "D": return 2;` and line 22 `case "E": return 1;` |

**Reference solution:**
```java
import java.util.ArrayList;

public class CGPACalculator {
    public double calculateCGPA(ArrayList<AcademicCourse> courses) {
        if (courses.size() < 5) {
            throw new IllegalStateException("A student must register at least 5 courses before CGPA can be calculated.");
        }
        int totalPoints = 0;
        int totalUnits = 0;
        for (AcademicCourse c : courses) {
            totalPoints += gradePoint(c.getLetterGrade()) * c.getCreditUnit();
            totalUnits += c.getCreditUnit();
        }
        double cgpa = (double) totalPoints / totalUnits;
        return cgpa;
    }

    private int gradePoint(String grade) {
        switch (grade.toUpperCase()) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            case "D": return 2;
            case "E": return 1;
            case "F": return 0;
            default:
                throw new IllegalArgumentException("Invalid grade: " + grade);
        }
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Award full point for spotting swapped D and E grade points

**Common mistakes:**
- Failing to detect integer division truncation on line 12

### Q043
- id: Q043
- section: C
- type: spot-error
- difficulty: medium
- topic: custom-exceptions
- points: 4
- time_minutes: 7
- source: variant-of-slides
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CourseGradeTracker {
    private ArrayList<Integer> scores;

    public CourseGradeTracker() {
        scores = new ArrayList<>();
    }

    public void recordScore(int score) throws InvalidScoreException {
        if (score < 0 || score > 100) {
            Throw new InvalidScoreException("Score must be between 0 and 100");
        }
        scores.add(score);
    }

    public double calculateMean() {
        if (scores.isEmpty()) {
            return 0.0;
        }
        int sum = 0;
        for (int s : scores) {
            sum += s;
        }
        return sum / scores.size();
    }

    public int getLatestScore() {
        return scores.get(scores.size())
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `Throw new InvalidScoreException("Score must be between 0 and 100");` | syntax | Keyword 'throw' must be lowercase | `throw new InvalidScoreException("Score must be between 0 and 100");` |
| 2 | 23 | `return sum / scores.size();` | semantic | Integer division truncates mean value; must cast sum to double | `return (double) sum / scores.size();` |
| 3 | 27 | `return scores.get(scores.size())` | semantic | Off-by-one: index scores.size() causes IndexOutOfBoundsException; last element is at scores.size() - 1 | `return scores.get(scores.size() - 1);` |
| 4 | 27 | `return scores.get(scores.size())` | syntax | Missing terminating semicolon | `return scores.get(scores.size() - 1);` |

**Reference solution:**
```java
import java.util.ArrayList;

class InvalidScoreException extends Exception {
    public InvalidScoreException(String message) {
        super(message);
    }
}

public class CourseGradeTracker {
    private ArrayList<Integer> scores;

    public CourseGradeTracker() {
        scores = new ArrayList<>();
    }

    public void recordScore(int score) throws InvalidScoreException {
        if (score < 0 || score > 100) {
            throw new InvalidScoreException("Score must be between 0 and 100");
        }
        scores.add(score);
    }

    public double calculateMean() {
        if (scores.isEmpty()) {
            return 0.0;
        }
        int sum = 0;
        for (int s : scores) {
            sum += s;
        }
        return (double) sum / scores.size();
    }

    public int getLatestScore() {
        return scores.get(scores.size() - 1);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Overlooking the off-by-one error when indexing ArrayList elements

### Q044
- id: Q044
- section: C
- type: spot-error
- difficulty: medium
- topic: exception-handling
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ExceptionHierarchySorter {
    public static int processInput(String input) {
        int result = 0;
        try {
            result = Integer.parseInt(input);
        } catch (Exception e) {
            System.out.println("General error: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Number format error");
        }
        if (result < 0) {
            return result * -1;
        }
        return result
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `} catch (NumberFormatException e) {` | syntax | Unreachable catch block; NumberFormatException is a subclass of Exception and is already caught above | Place `catch (NumberFormatException e)` before `catch (Exception e)` |
| 2 | 12 | `return result * -1;` | semantic | Silently inverting negative results masks error states instead of preserving sign or raising an error | `throw new IllegalArgumentException("Negative input not allowed");` |
| 3 | 14 | `return result` | syntax | Missing terminating semicolon | `return result;` |

**Reference solution:**
```java
public class ExceptionHierarchySorter {
    public static int processInput(String input) {
        int result = 0;
        try {
            result = Integer.parseInt(input);
        } catch (NumberFormatException e) {
            System.out.println("Number format error");
        } catch (Exception e) {
            System.out.println("General error: " + e.getMessage());
        }
        if (result < 0) {
            throw new IllegalArgumentException("Negative input not allowed");
        }
        return result;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Forgetting that specific exceptions must precede generalized superclass exceptions in catch blocks

### Q045
- id: Q045
- section: C
- type: spot-error
- difficulty: hard
- topic: custom-exceptions
- points: 4
- time_minutes: 7
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class AccountManager {
    private double balance;

    public AccountManager(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throw InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Amount exceeds balance");
        }
        balance += amount;
    }

    public boolean canWithdraw(double amount) {
        if (amount <= balance) {
            return false;
        }
        return true;
    }

    public double getBalance() {
        return balance
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `public void withdraw(double amount) throw InsufficientFundsException {` | syntax | Method header requires 'throws', not 'throw' | `public void withdraw(double amount) throws InsufficientFundsException {` |
| 2 | 12 | `balance += amount;` | semantic | Withdrawal must decrease account balance, not increase it | `balance -= amount;` |
| 3 | 17 | `return false;` | semantic | When withdrawal amount is less than or equal to balance, transaction is possible; should return true | `return true;` |
| 4 | 23 | `return balance` | syntax | Missing terminating semicolon | `return balance;` |

**Reference solution:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String msg) {
        super(msg);
    }
}

public class AccountManager {
    private double balance;

    public AccountManager(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Amount exceeds balance");
        }
        balance -= amount;
    }

    public boolean canWithdraw(double amount) {
        if (amount <= balance) {
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept `return amount <= balance;` on lines 16-19

**Common mistakes:**
- Confusing 'throw' in the method declaration with 'throws'

### Q046
- id: Q046
- section: C
- type: spot-error
- difficulty: hard
- topic: arraylist-operations
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class TransactionBatchProcessor {
    private ArrayList<Double> transactions;

    public TransactionBatchProcessor() {
        transactions = new ArrayList<>();
    }

    public void addTransaction(Double amount) {
        if (amount != null && amount > 0) {
            transactions.add(amount);
        }
    }

    public double computeNetTotal() {
        double total = 0.0;
        for (int i = 0; i <= transactions.size(); i++) {
            total -= transactions.get(i);
        }
        return total;
    }

    public void sortTransactions() {
        Collections.Sort(transactions)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 16 | `for (int i = 0; i <= transactions.size(); i++) {` | semantic | Off-by-one condition i <= transactions.size() throws IndexOutOfBoundsException | `for (int i = 0; i < transactions.size(); i++) {` |
| 2 | 17 | `total -= transactions.get(i);` | semantic | Net total should accumulate transaction values with addition, not subtraction | `total += transactions.get(i);` |
| 3 | 23 | `Collections.Sort(transactions)` | syntax | Method name is case-sensitive; Collections.sort is lowercase | `Collections.sort(transactions);` |
| 4 | 23 | `Collections.Sort(transactions)` | syntax | Missing terminating semicolon | `Collections.sort(transactions);` |

**Reference solution:**
```java
import java.util.ArrayList;
import java.util.Collections;

public class TransactionBatchProcessor {
    private ArrayList<Double> transactions;

    public TransactionBatchProcessor() {
        transactions = new ArrayList<>();
    }

    public void addTransaction(Double amount) {
        if (amount != null && amount > 0) {
            transactions.add(amount);
        }
    }

    public double computeNetTotal() {
        double total = 0.0;
        for (int i = 0; i < transactions.size(); i++) {
            total += transactions.get(i);
        }
        return total;
    }

    public void sortTransactions() {
        Collections.sort(transactions);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the off-by-one `<=` index loop boundary on line 16

### Q047
- id: Q047
- section: C
- type: spot-error
- difficulty: hard
- topic: exception-handling
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public Class SafeBankTransfer {
    public static void transfer(AccountManager from, AccountManager to, double amount) throws IllegalArgumentException {
        if (from == null && to == null) {
            throw new IllegalArgumentException("Accounts cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        try {
            from.withdraw(amount);
            to.withdraw(amount * -1);
        } catch (Exception e) {
            System.out.println("Transfer failed: " + e.getMessage())
        } finally {
            from.withdraw(amount * -1);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public Class SafeBankTransfer {` | syntax | Keyword 'class' must be lowercase | `public class SafeBankTransfer {` |
| 2 | 3 | `if (from == null && to == null) {` | semantic | Validation must reject transfer if either account is null (using ||, not &&) | `if (from == null || to == null) {` |
| 3 | 13 | `System.out.println("Transfer failed: " + e.getMessage())` | syntax | Missing terminating semicolon | `System.out.println("Transfer failed: " + e.getMessage());` |
| 4 | 15 | `from.withdraw(amount * -1);` | semantic | The finally block runs unconditionally on every execution, refunding the sender even when the transfer was completely successful | Remove unconditional refund from finally block |

**Reference solution:**
```java
public class SafeBankTransfer {
    public static void transfer(AccountManager from, AccountManager to, double amount) throws IllegalArgumentException {
        if (from == null || to == null) {
            throw new IllegalArgumentException("Accounts cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        try {
            from.withdraw(amount);
        } catch (Exception e) {
            System.out.println("Transfer failed: " + e.getMessage());
        }
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `&&` correctly checks both objects (if one is null, `&&` evaluates to false and fails to catch it)

## Section D: Swing GUI and Event Handling
Scope: Java Swing components (JFrame, JLabel, JTextField, JComboBox, JButton, JTextArea, JScrollPane, JOptionPane), Layout Managers (FlowLayout, BorderLayout, GridLayout), ActionListener interface and actionPerformed implementation, component registration with addActionListener, window lifecycle (setDefaultCloseOperation, pack, setVisible), input validation in GUI, and error dialogs.

### Q048
- id: Q048
- section: D
- type: spot-error
- difficulty: easy
- topic: swing-components
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class GreetingDialog {
    public static void main(String[] args) {
        Jframe frame = new JFrame("Greeting App");
        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JLabel label = new JLabel("Enter your name:");
        JTextField nameField = new JTextField(15);
        JButton btn = new JButton("Greet");

        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, "Please enter your name", "Warning", JOptionPane.WARNING_MESSAGE);
                    return;
                }
                JOptionPane.showMessageDialog(frame, "Hello, " + name, "Welcome", JOptionPane.INFORMATION_MESSAGE)
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(label);
        frame.add(nameField);
        frame.add(btn);
        frame.setVisible(false);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `Jframe frame = new JFrame("Greeting App");` | syntax | Class name is case-sensitive; 'Jframe' must be 'JFrame' | `JFrame frame = new JFrame("Greeting App");` |
| 2 | 18 | `JOptionPane.showMessageDialog(frame, "Hello, " + name, "Welcome", JOptionPane.INFORMATION_MESSAGE)` | syntax | Missing terminating semicolon | `JOptionPane.showMessageDialog(frame, "Hello, " + name, "Welcome", JOptionPane.INFORMATION_MESSAGE);` |
| 3 | 26 | `frame.setVisible(false);` | semantic | Passing false makes the GUI window completely invisible; must pass true to display it | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class GreetingDialog {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Greeting App");
        frame.setSize(300, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JLabel label = new JLabel("Enter your name:");
        JTextField nameField = new JTextField(15);
        JButton btn = new JButton("Greet");

        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, "Please enter your name", "Warning", JOptionPane.WARNING_MESSAGE);
                    return;
                }
                JOptionPane.showMessageDialog(frame, "Hello, " + name, "Welcome", JOptionPane.INFORMATION_MESSAGE);
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(label);
        frame.add(nameField);
        frame.add(btn);
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Calling `frame.setVisible(false)` a syntax error (it compiles cleanly, but hides the window)

### Q049
- id: Q049
- section: D
- type: spot-error
- difficulty: easy
- topic: event-handling
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class SimpleCalculatorWindow {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Adder");
        JTextField num1Field = new JTextField(5);
        JTextField num2Field = new JTextField(5);
        JButton addBtn = new JButton("Add");
        JLabel resultLabel = new JLabel("Result: ");

        addBtn.addActionListener(new ActionListener() {
            public Void actionPerformed(ActionEvent e) {
                try {
                    int n1 = Integer.parseInt(num1Field.getText().trim());
                    int n2 = Integer.parseInt(num2Field.getText().trim());
                    resultLabel.setText("Result: " + (n1 - n2));
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(frame, "Invalid input");
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(num1Field);
        frame.add(num2Field);
        frame.add(addBtn);
        frame.add(resultLabel);
        frame.pack();
        frame.setVisible(true)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `public Void actionPerformed(ActionEvent e) {` | syntax | actionPerformed method in ActionListener interface has void return type; wrapper 'Void' causes return type incompatibility | `public void actionPerformed(ActionEvent e) {` |
| 2 | 14 | `resultLabel.setText("Result: " + (n1 - n2));` | semantic | Adder button subtracts n2 from n1 instead of calculating sum | `resultLabel.setText("Result: " + (n1 + n2));` |
| 3 | 27 | `frame.setVisible(true)` | syntax | Missing terminating semicolon | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SimpleCalculatorWindow {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Adder");
        JTextField num1Field = new JTextField(5);
        JTextField num2Field = new JTextField(5);
        JButton addBtn = new JButton("Add");
        JLabel resultLabel = new JLabel("Result: ");

        addBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    int n1 = Integer.parseInt(num1Field.getText().trim());
                    int n2 = Integer.parseInt(num2Field.getText().trim());
                    resultLabel.setText("Result: " + (n1 + n2));
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(frame, "Invalid input");
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(num1Field);
        frame.add(num2Field);
        frame.add(addBtn);
        frame.add(resultLabel);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the 'Void' vs 'void' return type mismatch on line 10

### Q050
- id: Q050
- section: D
- type: spot-error
- difficulty: easy
- topic: swing-components
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class FeedbackForm {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Feedback");
        JTextArea feedbackArea = new JTextArea(5, 20);
        JScrollPane scrollPane = new JScrollPane(feedbackArea);
        JButton clearBtn = new JButton("Clear");

        feedbackArea.setEditable(false);

        clearBtn.addActionListener(new actionListener() {
            public void actionPerformed(ActionEvent e) {
                feedbackArea.setText("");
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(scrollPane);
        frame.add(clearBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `feedbackArea.setEditable(false);` | semantic | Setting editable to false prevents users from typing into an input feedback text area | `feedbackArea.setEditable(true);` |
| 2 | 10 | `clearBtn.addActionListener(new actionListener() {` | syntax | Interface name is case-sensitive; 'actionListener' must be 'ActionListener' | `clearBtn.addActionListener(new ActionListener() {` |
| 3 | 19 | `frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)` | syntax | Missing terminating semicolon | `frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class FeedbackForm {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Feedback");
        JTextArea feedbackArea = new JTextArea(5, 20);
        JScrollPane scrollPane = new JScrollPane(feedbackArea);
        JButton clearBtn = new JButton("Clear");

        feedbackArea.setEditable(true);

        clearBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                feedbackArea.setText("");
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(scrollPane);
        frame.add(clearBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `feedbackArea.setEditable(false)` causes a compile error (it compiles cleanly)

### Q051
- id: Q051
- section: D
- type: spot-error
- difficulty: easy
- topic: event-handling
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class NumberGuessGUI {
    private static int target = 7;

    public static void main(String[] args) {
        JFrame frame = new JFrame("Guess Number");
        JTextField guessField = new JTextField(5);
        JButton guessBtn = new JButton("Guess");

        guessBtn.addActionListener(new ActionListener() {
            public void ActionPerformed(ActionEvent e) {
                int guess = Integer.parseInt(guessField.getText().trim());
                if (guess == target) {
                    JOptionPane.showMessageDialog(frame, "Wrong guess!", "Result", JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(frame, "Correct!", "Result", JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(guessField);
        frame.add(guessBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `public void ActionPerformed(ActionEvent e) {` | syntax | Method name in ActionListener interface is case-sensitive and must be 'actionPerformed' | `public void actionPerformed(ActionEvent e) {` |
| 2 | 13 | `JOptionPane.showMessageDialog(frame, "Wrong guess!", "Result", JOptionPane.INFORMATION_MESSAGE);` | semantic | Inverted feedback messages: shows 'Wrong guess!' when guess matches target | Swap dialog text with line 15: `JOptionPane.showMessageDialog(frame, "Correct!", "Result", JOptionPane.INFORMATION_MESSAGE);` |
| 3 | 25 | `frame.setVisible(true)` | syntax | Missing terminating semicolon | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class NumberGuessGUI {
    private static int target = 7;

    public static void main(String[] args) {
        JFrame frame = new JFrame("Guess Number");
        JTextField guessField = new JTextField(5);
        JButton guessBtn = new JButton("Guess");

        guessBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                int guess = Integer.parseInt(guessField.getText().trim());
                if (guess == target) {
                    JOptionPane.showMessageDialog(frame, "Correct!", "Result", JOptionPane.INFORMATION_MESSAGE);
                } else {
                    JOptionPane.showMessageDialog(frame, "Wrong guess!", "Result", JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(guessField);
        frame.add(guessBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Failing to notice the capital 'A' on line 10 in ActionPerformed

### Q052
- id: Q052
- section: D
- type: spot-error
- difficulty: medium
- topic: event-handling
- points: 4
- time_minutes: 8
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CourseRegistrationButton {
    public void attach(JButton btn, JTextField codeField, JTextField titleField, JTextField unitField, JComboBox<String> gradeBox, CourseRegistrationList student, JTextArea outputArea) {
        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String code = codeField.getText().trim();
                String title = titleField.getText().trim();
                String unitText = unitField.getText().trim();

                if (code.isEmpty() && title.isEmpty() && unitText.isEmpty()) {
                    JOptionPane.showMessageDialog(null, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                try {
                    int unit = Integer.parseInt(unitText);
                    if (unit <= 0) {
                        JOptionPane.showMessageDialog(null, "Credit unit must be positive.", "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    String grade = (String) gradeBox.getSelectedItem();
                    student.enroll(code);
                    outputArea.setText("Course " + code + " registered. Total: " + student.getCourseCount());
                    codeField.setText("");
                    titleField.setText("");
                    unitField.setText("")
                } catch (NumberFormatException ex {
                    JOptionPane.showMessageDialog(null, "Credit unit must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `if (code.isEmpty() && title.isEmpty() && unitText.isEmpty()) {` | semantic | Required fields check must trigger if any field is empty (using ||, not &&) | `if (code.isEmpty() || title.isEmpty() || unitText.isEmpty()) {` |
| 2 | 22 | `outputArea.setText("Course " + code + " registered. Total: " + student.getCourseCount());` | semantic | Using setText overwrites existing text area content; must use append | `outputArea.append("Course " + code + " registered. Total: " + student.getCourseCount());` |
| 3 | 25 | `unitField.setText("")` | syntax | Missing terminating semicolon | `unitField.setText("");` |
| 4 | 26 | `} catch (NumberFormatException ex {` | syntax | Missing closing parenthesis ')' in catch parameter list | `} catch (NumberFormatException ex) {` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.event.*;

public class CourseRegistrationButton {
    public void attach(JButton btn, JTextField codeField, JTextField titleField, JTextField unitField, JComboBox<String> gradeBox, CourseRegistrationList student, JTextArea outputArea) {
        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String code = codeField.getText().trim();
                String title = titleField.getText().trim();
                String unitText = unitField.getText().trim();

                if (code.isEmpty() || title.isEmpty() || unitText.isEmpty()) {
                    JOptionPane.showMessageDialog(null, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                try {
                    int unit = Integer.parseInt(unitText);
                    if (unit <= 0) {
                        JOptionPane.showMessageDialog(null, "Credit unit must be positive.", "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    String grade = (String) gradeBox.getSelectedItem();
                    student.enroll(code);
                    outputArea.append("Course " + code + " registered. Total: " + student.getCourseCount());
                    codeField.setText("");
                    titleField.setText("");
                    unitField.setText("");
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Credit unit must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the && vs || validation bug on line 9

### Q053
- id: Q053
- section: D
- type: spot-error
- difficulty: medium
- topic: swing-components
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public Class GradeComboBoxPanel {
    private JComboBox<String> gradeBox;

    public GradeComboBoxPanel() {
        String[] grades = {"A", "B", "C", "D", "E", "F"};
        gradeBox = new JComboBox<String>(grades);
    }

    public int getSelectedGradePoint() {
        String selected = (String) gradeBox.getSelectedItem();
        if (selected.equals("A")) return 5;
        if (selected.equals("B")) return 4;
        if (selected.equals("C")) return 3;
        if (selected.equals("D")) return 1;
        if (selected.equals("E")) return 2;
        if (selected.equals("F")) return 0;
        return -1;
    }

    public void resetSelection() {
        gradeBox.setSelectedIndex(-1)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public Class GradeComboBoxPanel {` | syntax | Keyword 'class' must be lowercase | `public class GradeComboBoxPanel {` |
| 2 | 14 | `if (selected.equals("D")) return 1;` | semantic | Swapped points on 5-point scale: Grade D earns 2 points and Grade E earns 1 point | `if (selected.equals("D")) return 2;` and line 15 `return 1;` |
| 3 | 21 | `gradeBox.setSelectedIndex(-1)` | syntax | Missing terminating semicolon | `gradeBox.setSelectedIndex(-1);` |

**Reference solution:**
```java
import javax.swing.*;

public class GradeComboBoxPanel {
    private JComboBox<String> gradeBox;

    public GradeComboBoxPanel() {
        String[] grades = {"A", "B", "C", "D", "E", "F"};
        gradeBox = new JComboBox<String>(grades);
    }

    public int getSelectedGradePoint() {
        String selected = (String) gradeBox.getSelectedItem();
        if (selected.equals("A")) return 5;
        if (selected.equals("B")) return 4;
        if (selected.equals("C")) return 3;
        if (selected.equals("D")) return 2;
        if (selected.equals("E")) return 1;
        if (selected.equals("F")) return 0;
        return -1;
    }

    public void resetSelection() {
        gradeBox.setSelectedIndex(-1);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Overlooking the inverted D and E grade points

### Q054
- id: Q054
- section: D
- type: spot-error
- difficulty: medium
- topic: swing-components
- points: 3
- time_minutes: 5
- source: variant-of-assignment
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class StudentProfileDisplay {
    private JTextArea profileArea;

    public StudentProfileDisplay() {
        profileArea = new JTextArea(15, 40);
        profileArea.setEditable(true);
    }

    public void displayStudent(String studentId, String name, double cgpa) {
        profileArea.setText("===============================================");
        profileArea.append("UNIVERSITY OF IBADAN - FACULTY OF COMPUTING");
        profileArea.append("STUDENT PROFILE");
        profileArea.append("===============================================");
        profileArea.append("Student ID : " + studentId);
        profileArea.append("Name       : " + name);
        profileArea.append("CGPA       : " + cgpa)
    }

    public JTextArea getProfileArea() {
        Return profileArea;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `profileArea.setEditable(true);` | semantic | Formatted student report displays must be read-only (setEditable(false)) to prevent modification | `profileArea.setEditable(false);` |
| 2 | 16 | `profileArea.append("CGPA       : " + cgpa)` | syntax | Missing terminating semicolon | `profileArea.append("CGPA       : " + cgpa);` |
| 3 | 20 | `Return profileArea;` | syntax | Keyword 'return' must be completely lowercase | `return profileArea;` |

**Reference solution:**
```java
import javax.swing.JTextArea;

public class StudentProfileDisplay {
    private JTextArea profileArea;

    public StudentProfileDisplay() {
        profileArea = new JTextArea(15, 40);
        profileArea.setEditable(false);
    }

    public void displayStudent(String studentId, String name, double cgpa) {
        profileArea.setText("===============================================");
        profileArea.append("UNIVERSITY OF IBADAN - FACULTY OF COMPUTING");
        profileArea.append("STUDENT PROFILE");
        profileArea.append("===============================================");
        profileArea.append("Student ID : " + studentId);
        profileArea.append("Name       : " + name);
        profileArea.append("CGPA       : " + cgpa);
    }

    public JTextArea getProfileArea() {
        return profileArea;
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the capitalization error on `Return`

### Q055
- id: Q055
- section: D
- type: spot-error
- difficulty: medium
- topic: event-handling
- points: 4
- time_minutes: 7
- source: variant-of-assignment
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CGPACalculatorButton {
    public static void attach(JButton btn, CGPACalculator calc, ArrayList<AcademicCourse> courses, JTextArea displayArea) {
        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (courses.size() > 5) {
                    JOptionPane.showMessageDialog(null, "At least 5 courses required.", "Warning", JOptionPane.WARNING_MESSAGE);
                    return;
                }
                double cgpa = calc.calculateCGPA(courses);
                displayArea.setText("Calculated CGPA: " + cgpa)
                JOptionPane.showMessageDialog(null, "CGPA Calculated Successfully", "Success", JOptionPane.INFORMATION_MESSAGE);
            }
        })
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 5 | `if (courses.size() > 5) {` | semantic | Prevent calculation when fewer than 5 courses are registered, not when greater | `if (courses.size() < 5) {` |
| 2 | 10 | `displayArea.setText("Calculated CGPA: " + cgpa)` | syntax | Missing terminating semicolon | `displayArea.setText("Calculated CGPA: " + cgpa);` |
| 3 | 10 | `displayArea.setText("Calculated CGPA: " + cgpa)` | semantic | setText overwrites previously rendered course details and header instead of appending | `displayArea.append("Calculated CGPA: " + cgpa);` |
| 4 | 13 | `})` | syntax | Statement must end with a semicolon | `});` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.event.*;
import java.util.ArrayList;

public class CGPACalculatorButton {
    public static void attach(JButton btn, CGPACalculator calc, ArrayList<AcademicCourse> courses, JTextArea displayArea) {
        btn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (courses.size() < 5) {
                    JOptionPane.showMessageDialog(null, "At least 5 courses required.", "Warning", JOptionPane.WARNING_MESSAGE);
                    return;
                }
                double cgpa = calc.calculateCGPA(courses);
                displayArea.append("Calculated CGPA: " + cgpa);
                JOptionPane.showMessageDialog(null, "CGPA Calculated Successfully", "Success", JOptionPane.INFORMATION_MESSAGE);
            }
        });
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the closing statement semicolon on `});` on line 13

### Q056
- id: Q056
- section: D
- type: spot-error
- difficulty: medium
- topic: event-handling
- points: 3
- time_minutes: 5
- source: variant-of-assignment
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ClearFormButton {
    public static void setup(JButton clearBtn, JTextField codeF, JTextField titleF, JTextField unitF, JComboBox<String> gradeB) {
        clearBtn.addActionListener(new ActionListener() {
            public void ActionPerformed(ActionEvent e) {
                codeF.setText("");
                titleF.setText("");
                unitF.setText("0");
                gradeB.setSelectedIndex(0)
            }
        });
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `public void ActionPerformed(ActionEvent e) {` | syntax | Method name in ActionListener interface is case-sensitive: 'actionPerformed' | `public void actionPerformed(ActionEvent e) {` |
| 2 | 7 | `unitF.setText("0");` | semantic | Clearing form fields should empty the field (""), not populate with 0 | `unitF.setText("");` |
| 3 | 8 | `gradeB.setSelectedIndex(0)` | syntax | Missing terminating semicolon | `gradeB.setSelectedIndex(0);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.event.*;

public class ClearFormButton {
    public static void setup(JButton clearBtn, JTextField codeF, JTextField titleF, JTextField unitF, JComboBox<String> gradeB) {
        clearBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                codeF.setText("");
                titleF.setText("");
                unitF.setText("");
                gradeB.setSelectedIndex(0);
            }
        });
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Thinking `gradeB.setSelectedIndex(0)` is invalid (index 0 selects the first item)

### Q057
- id: Q057
- section: D
- type: spot-error
- difficulty: hard
- topic: event-handling
- points: 5
- time_minutes: 9
- source: variant-of-test
- error_header: 5 errors (3 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class ProcessPaymentButton {
    public void attach(JButton payButton, JTextField amountField, JComboBox<String> methodBox, JTextArea outputArea) {
        payButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String text = amountField.getText().trim();
                if (text.isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Please enter an amount.", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                try {
                    double amount = Double.parseDouble(text);
                    if (amount < 0) {
                        JOptionPane.showMessageDialog(null, "Amount must be greater than zero.", "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    CardRemittance payment;
                    if ("Cash".equals(methodBox.getSelectedItem())) {
                        payment = new CardRemittance();
                    } else {
                        payment = new CashRemittance();
                    }
                    payment.executeTransfer(amount);
                    outputArea.setText("Amount: " + amount + " " + payment.generateSummary());
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
                } catch (IllegalArgumentException ex) {
                    JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `if (amount < 0) {` | semantic | Requirement states amount must be strictly greater than zero; should reject non-positive amounts (<= 0) | `if (amount <= 0) {` |
| 2 | 16 | `CardRemittance payment;` | syntax | Variable is typed as CardRemittance, so assigning CashRemittance on line 20 fails compilation; must use superclass Remittance | `Remittance payment;` |
| 3 | 18 | `payment = new CardRemittance();` | semantic | Inverted logic: instantiates CardRemittance when user selects 'Cash' | `payment = new CashRemittance();` (and line 20 `new CardRemittance();`) |
| 4 | 20 | `payment = new CashRemittance();` | syntax | Type mismatch: CashRemittance cannot be assigned to CardRemittance variable | Resolved by declaring `Remittance payment;` on line 16 |
| 5 | 23 | `outputArea.setText("Amount: " + amount + " " + payment.generateSummary());` | syntax | Missing terminating semicolon | `outputArea.setText("Amount: " + amount + " " + payment.generateSummary());;` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.event.*;

public class ProcessPaymentButton {
    public void attach(JButton payButton, JTextField amountField, JComboBox<String> methodBox, JTextArea outputArea) {
        payButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String text = amountField.getText().trim();
                if (text.isEmpty()) {
                    JOptionPane.showMessageDialog(null, "Please enter an amount.", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                try {
                    double amount = Double.parseDouble(text);
                    if (amount <= 0) {
                        JOptionPane.showMessageDialog(null, "Amount must be greater than zero.", "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    Remittance payment;
                    if ("Cash".equals(methodBox.getSelectedItem())) {
                        payment = new CashRemittance();
                    } else {
                        payment = new CardRemittance();
                    }
                    payment.executeTransfer(amount);
                    outputArea.append("Amount: " + amount + " " + payment.generateSummary());
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
                } catch (IllegalArgumentException ex) {
                    JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)
- Accept either setText with semicolon or append on line 23

**Common mistakes:**
- Missing the subtype polymorphism requirement on line 16

### Q058
- id: Q058
- section: D
- type: spot-error
- difficulty: hard
- topic: swing-components
- points: 4
- time_minutes: 8
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class PaymentWindowBuilder {
    public static void buildWindow() {
        JFrame frame = new JFrame("Payment Processing System");
        JTextField amountField = new JTextField(10);
        JComboBox<String> methodBox = new JComboBox<String>(new String[]{"Card", "Cash"});
        JButton payButton = new JButton("Process Payment");
        JTextArea outputArea = new JTextArea(8, 30);

        outputArea.setEditable(true);
        frame.setLayout(new FlowLayout());
        frame.add(new JLabel("Amount:"));
        frame.add(amountField);
        frame.add(methodBox);
        frame.add(payButton);
        frame.add(new JScrollPane(outputArea));

        payButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                outputArea.append("Payment processing initialized...");
            }
        }
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack()
        frame.setVisible(false);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `outputArea.setEditable(true);` | semantic | Output receipt area must be non-editable (setEditable(false)) | `outputArea.setEditable(false);` |
| 2 | 21 | `}` | syntax | Anonymous ActionListener registration is missing closing parenthesis and semicolon | `});` |
| 3 | 23 | `frame.pack()` | syntax | Missing terminating semicolon | `frame.pack();` |
| 4 | 24 | `frame.setVisible(false);` | semantic | Frame visibility must be set to true to display the window to the user | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class PaymentWindowBuilder {
    public static void buildWindow() {
        JFrame frame = new JFrame("Payment Processing System");
        JTextField amountField = new JTextField(10);
        JComboBox<String> methodBox = new JComboBox<String>(new String[]{"Card", "Cash"});
        JButton payButton = new JButton("Process Payment");
        JTextArea outputArea = new JTextArea(8, 30);

        outputArea.setEditable(false);
        frame.setLayout(new FlowLayout());
        frame.add(new JLabel("Amount:"));
        frame.add(amountField);
        frame.add(methodBox);
        frame.add(payButton);
        frame.add(new JScrollPane(outputArea));

        payButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                outputArea.append("Payment processing initialized...");
            }
        });
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Missing the unclosed `addActionListener` anonymous class block on line 21

### Q059
- id: Q059
- section: D
- type: spot-error
- difficulty: hard
- topic: swing-components
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class TransactionAuditGUI {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Audit Log");
        JTextArea logArea = new JTextArea(10, 25);
        JButton auditBtn = new JButton("Run Audit");

        logArea.setEditable(true);

        auditBtn.addActionListener(new ActionListener() {
            public void ActionPerformed(ActionEvent e) {
                logArea.setText("Starting audit...");
                for (int i = 1; i <= 3; i++) {
                    logArea.setText("Audit step " + i + " completed");
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(new JScrollPane(logArea));
        frame.add(auditBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `logArea.setEditable(true);` | semantic | Audit log display area should be non-editable (setEditable(false)) | `logArea.setEditable(false);` |
| 2 | 10 | `public void ActionPerformed(ActionEvent e) {` | syntax | Overriding method name must match ActionListener interface exactly: 'actionPerformed' | `public void actionPerformed(ActionEvent e) {` |
| 3 | 13 | `logArea.setText("Audit step " + i + " completed");` | semantic | Using setText in a loop overwrites all prior lines, displaying only the final step; must use append | `logArea.append("Audit step " + i + " completed");` |
| 4 | 23 | `frame.setVisible(true)` | syntax | Missing terminating semicolon | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class TransactionAuditGUI {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Audit Log");
        JTextArea logArea = new JTextArea(10, 25);
        JButton auditBtn = new JButton("Run Audit");

        logArea.setEditable(false);

        auditBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                logArea.setText("Starting audit...");
                for (int i = 1; i <= 3; i++) {
                    logArea.append("Audit step " + i + " completed");
                }
            }
        });

        frame.setLayout(new FlowLayout());
        frame.add(new JScrollPane(logArea));
        frame.add(auditBtn);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Confusing setText and append inside iterative loops

### Q060
- id: Q060
- section: D
- type: spot-error
- difficulty: hard
- topic: swing-components
- points: 4
- time_minutes: 8
- source: variant-of-assignment
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Identify each error, give its line number, state whether it is a syntax or a semantic error, and write the corrected code.

**Code:**
```java
public class CompleteRegistrationApp {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Student Portal");
        frame.setLayout(new GridLayout(4, 2));

        JLabel nameLabel = new JLabel("Student Name:");
        JTextField nameField = new JTextField();
        JLabel deptLabel = new JLabel("Department:");
        JComboBox<String> deptBox = new JComboBox<>(new String[]{"Computer Science", "Mathematics", "Physics"});
        JButton submitBtn = new JButton("Register");
        JTextArea summaryArea = new JTextArea(6, 20);

        summaryArea.setEditable(true);

        submitBtn.addActionListener(new actionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, "Name is required", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                summaryArea.setText("Registered: " + name + " (" + deptBox.getSelectedItem() + ")");
            }
        });

        frame.add(nameLabel);
        frame.add(nameField);
        frame.add(deptLabel);
        frame.add(deptBox);
        frame.add(summaryArea);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 13 | `summaryArea.setEditable(true);` | semantic | Summary output area should be read-only (setEditable(false)) | `summaryArea.setEditable(false);` |
| 2 | 15 | `submitBtn.addActionListener(new actionListener() {` | syntax | Interface name is case-sensitive; 'actionListener' must be 'ActionListener' | `submitBtn.addActionListener(new ActionListener() {` |
| 3 | 30 | `frame.add(summaryArea);` | semantic | Submit button was never added to the container, making registration inaccessible to the user | Add submitBtn to frame: `frame.add(submitBtn);` |
| 4 | 33 | `frame.setVisible(true)` | syntax | Missing terminating semicolon | `frame.setVisible(true);` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CompleteRegistrationApp {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Student Portal");
        frame.setLayout(new GridLayout(4, 2));

        JLabel nameLabel = new JLabel("Student Name:");
        JTextField nameField = new JTextField();
        JLabel deptLabel = new JLabel("Department:");
        JComboBox<String> deptBox = new JComboBox<>(new String[]{"Computer Science", "Mathematics", "Physics"});
        JButton submitBtn = new JButton("Register");
        JTextArea summaryArea = new JTextArea(6, 20);

        summaryArea.setEditable(false);

        submitBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, "Name is required", "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                summaryArea.setText("Registered: " + name + " (" + deptBox.getSelectedItem() + ")");
            }
        });

        frame.add(nameLabel);
        frame.add(nameField);
        frame.add(deptLabel);
        frame.add(deptBox);
        frame.add(submitBtn);
        frame.add(summaryArea);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: line + type + fix (0.5 for two elements)

**Common mistakes:**
- Failing to notice that the primary action button (`submitBtn`) is never added to the container


## Section E: Arrays, 2D Arrays, Methods, Overloading, Recursion, Sorting and Searching
Scope: 1D and 2D arrays, matrix operations, static and instance methods, method overloading, recursion (base cases, call stack unwinding), linear and binary search algorithms, and iterative sorting (bubble, insertion, selection sort).

### Q061
- id: Q061
- section: E
- type: write-code
- difficulty: easy
- topic: arrays
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
Write a complete Java program in a class named `ArrayMinMax` that:
(a) Declares and initializes an integer array containing at least 8 numbers: `{34, 12, 89, 5, 78, 23, 91, 44}`.
(b) Traverses the array using a loop to find both the minimum and maximum values without using any built-in sorting methods.
(c) Prints both the minimum and maximum values along with descriptive messages.

**Answer key:**
- Correct array initialization with at least 8 elements
- Initial min and max set to `array[0]`
- Traversal loop from index 1 to `length - 1`
- Proper conditional comparison updating `min` and `max`
- Formatted output printing min and max values

**Reference solution:**
```java
public class ArrayMinMax {
    public static void main(String[] args) {
        int[] numbers = {34, 12, 89, 5, 78, 23, 91, 44};
        int min = numbers[0];
        int max = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] < min) {
                min = numbers[i];
            }
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }

        System.out.println("Minimum value: " + min);
        System.out.println("Maximum value: " + max);
    }
}
```

**Rubric:**
- 2 pts: Valid array declaration and initialization
- 4 pts: Correct traversal and min/max conditional comparison logic
- 2 pts: Clear, formatted console output

**Common mistakes:**
- Initializing min/max to 0 instead of `numbers[0]` (fails when numbers are all negative)
- Off-by-one errors in array loop bounds (`i <= numbers.length`)

### Q062
- id: Q062
- section: E
- type: write-code
- difficulty: easy
- topic: overloading
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
Write a class named `AreaCalculator` that contains three overloaded static methods named `area`:
(a) `public static int area(int side)`: returns the area of a square (`side * side`).
(b) `public static double area(double length, double width)`: returns the area of a rectangle (`length * width`).
(c) `public static double area(double radius)`: returns the area of a circle (`Math.PI * radius * radius`).
(d) Include a `main` method that invokes all three overloaded versions with sample inputs and prints the calculated areas.

**Answer key:**
- Method overloading with exact signatures matching specifications
- Correct mathematical formula for square (`side * side`)
- Correct formula for rectangle (`length * width`)
- Correct formula for circle (`Math.PI * radius * radius`)
- Demonstration in main printing each result

**Reference solution:**
```java
public class AreaCalculator {
    public static int area(int side) {
        return side * side;
    }

    public static double area(double length, double width) {
        return length * width;
    }

    public static double area(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        int squareArea = area(6);
        double rectArea = area(5.5, 4.0);
        double circleArea = area(3.5);

        System.out.println("Square area: " + squareArea);
        System.out.println("Rectangle area: " + rectArea);
        System.out.println("Circle area: " + circleArea);
    }
}
```

**Rubric:**
- 2 pts each: Correct signature and return value for the 3 overloaded methods (6 pts total)
- 2 pts: Main method demonstrating all three methods with printed results

**Common mistakes:**
- Differentiating methods only by return type (which is invalid in Java; parameter types must differ)

### Q063
- id: Q063
- section: E
- type: write-code
- difficulty: easy
- topic: recursion
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
Write a class named `RecursiveSum` containing:
(a) A recursive method `public static int sum(int k)` that returns the sum of all integers from `k` down to `1`. If `k <= 0`, it returns `0` (base case).
(b) A `main` method that computes and prints the sum for `k = 10` (expected output: 55).

**Answer key:**
- Explicit base case: `if (k <= 0) return 0;`
- Recursive step: `return k + sum(k - 1);`
- Main method invoking `sum(10)` and printing 55

**Reference solution:**
```java
public class RecursiveSum {
    public static int sum(int k) {
        if (k > 0) {
            return k + sum(k - 1);
        } else {
            return 0;
        }
    }

    public static void main(String[] args) {
        int result = sum(10);
        System.out.println("Sum of 1 to 10: " + result);
    }
}
```

**Rubric:**
- 3 pts: Correct base case preventing infinite recursion
- 3 pts: Correct recursive reduction step (`k + sum(k - 1)`)
- 2 pts: Main execution verifying `sum(10) == 55`

**Common mistakes:**
- Omitting the base case, causing `StackOverflowError`

### Q064
- id: Q064
- section: E
- type: write-code
- difficulty: easy
- topic: recursion
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
Write a class named `RecursiveFactorial` containing:
(a) A recursive method `public static long factorial(int n)` that computes $n!$.
    - Base case: if $n \le 1$, return $1$.
    - Recursive case: return $n \times \text{factorial}(n - 1)$.
    - Throw an `IllegalArgumentException` if $n < 0$.
(b) A `main` method that prints the factorials of numbers from 1 to 6.

**Answer key:**
- Input validation throwing `IllegalArgumentException` for negative inputs
- Base case returning 1 for `n <= 1`
- Recursive call `n * factorial(n - 1)`
- Return type `long` to avoid integer overflow
- Main loop printing values from 1 to 6

**Reference solution:**
```java
public class RecursiveFactorial {
    public static long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Factorial is undefined for negative integers");
        }
        if (n <= 1) {
            return 1L;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 6; i++) {
            System.out.println(i + "! = " + factorial(i));
        }
    }
}
```

**Rubric:**
- 2 pts: Negative input check and exception throw
- 3 pts: Base case and recursive decomposition
- 3 pts: Long return type and main demonstration

**Common mistakes:**
- Missing base case for `n == 0` (0! is defined as 1)

### Q065
- id: Q065
- section: E
- type: write-code
- difficulty: medium
- topic: recursion
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
Write a class named `RecursiveFibonacci` containing:
(a) A recursive method `public static int fibonacci(int n)` that returns the $n$-th Fibonacci term where:
    - $\text{fibonacci}(0) = 0$
    - $\text{fibonacci}(1) = 1$
    - $\text{fibonacci}(n) = \text{fibonacci}(n - 1) + \text{fibonacci}(n - 2)$ for $n \ge 2$.
(b) A `main` method that prints the first 10 Fibonacci terms (terms $n = 0$ to $9$) separated by a space on a single line.

**Answer key:**
- Dual base cases for $n = 0$ and $n = 1$
- Recursive expression `fibonacci(n - 1) + fibonacci(n - 2)`
- Main loop iterating from 0 to 9 printing the sequence

**Reference solution:**
```java
public class RecursiveFibonacci {
    public static int fibonacci(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Index must be non-negative");
        }
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.print("First 10 Fibonacci terms: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
    }
}
```

**Rubric:**
- 4 pts: Dual base cases ($n=0$ returns 0, $n=1$ returns 1)
- 4 pts: Correct recursive formula
- 2 pts: Main loop printing first 10 terms

**Common mistakes:**
- Combining base cases incorrectly into `if (n <= 2) return n;` (which fails for 2 since fib(2) is 1, not 2)

### Q066
- id: Q066
- section: E
- type: write-code
- difficulty: medium
- topic: recursion
- points: 10
- time_minutes: 12
- source: original

**Task:**
Write a class named `RecursivePower` that calculates $base^{exponent}$ using recursion:
(a) Write method `public static double power(double base, int exp)`:
    - Base case: any number raised to power 0 is 1.0 (`power(base, 0) == 1.0`).
    - Positive exponent: `base * power(base, exp - 1)`.
    - Negative exponent: `1.0 / power(base, -exp)`.
(b) Include a `main` method testing `power(2.0, 4)` (16.0), `power(5.0, 0)` (1.0), and `power(2.0, -2)` (0.25).

**Answer key:**
- Base case checking `exp == 0` returning 1.0
- Positive recursive branch `base * power(base, exp - 1)`
- Negative recursive branch `1.0 / power(base, -exp)`
- Main method validating all test cases

**Reference solution:**
```java
public class RecursivePower {
    public static double power(double base, int exp) {
        if (exp == 0) {
            return 1.0;
        }
        if (exp > 0) {
            return base * power(base, exp - 1);
        }
        return 1.0 / power(base, -exp);
    }

    public static void main(String[] args) {
        System.out.println("2^4 = " + power(2.0, 4));
        System.out.println("5^0 = " + power(5.0, 0));
        System.out.println("2^-2 = " + power(2.0, -2));
    }
}
```

**Rubric:**
- 3 pts: Base case `exp == 0`
- 3 pts: Positive exponent recursion
- 2 pts: Negative exponent inversion logic
- 2 pts: Main testing

**Common mistakes:**
- Failing to handle negative exponents, leading to infinite recursion

### Q067
- id: Q067
- section: E
- type: write-code
- difficulty: medium
- topic: arrays
- points: 10
- time_minutes: 12
- source: original

**Task:**
Write a class named `ArrayReverser` that reverses an array of integers in-place:
(a) Implement `public static void reverseInPlace(int[] arr)`:
    - Uses two pointer indices (`start` at 0, `end` at `arr.length - 1`).
    - Swaps elements at `start` and `end`, then increments `start` and decrements `end` until they meet.
    - Does not allocate a secondary array.
(b) Implement `public static void printArray(int[] arr)` to display elements on a single line.
(c) In `main`, reverse `{10, 20, 30, 40, 50}` and print the array before and after reversal.

**Answer key:**
- In-place swap using a temporary variable
- Two pointers moving inward (`start < end`)
- No secondary array allocation
- Array printing helper method
- Main testing demonstration

**Reference solution:**
```java
public class ArrayReverser {
    public static void reverseInPlace(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }
        int start = 0;
        int end = arr.length - 1;
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};
        System.out.print("Original: ");
        printArray(data);

        reverseInPlace(data);

        System.out.print("Reversed: ");
        printArray(data);
    }
}
```

**Rubric:**
- 4 pts: In-place two-pointer swap logic
- 2 pts: Loop condition (`start < end`) preventing double swap
- 2 pts: printArray helper implementation
- 2 pts: Main execution demonstration

**Common mistakes:**
- Looping from `0` to `arr.length - 1` swapping every element (which reverses the array and then reverses it back to original)

### Q068
- id: Q068
- section: E
- type: write-code
- difficulty: medium
- topic: 2d-arrays
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
Write a class named `MatrixAddition` that performs element-wise addition of two $3 \times 3$ matrices:
(a) Implement `public static int[][] addMatrices(int[][] a, int[][] b)`:
    - Returns a new $3 \times 3$ matrix `C` where `C[i][j] = a[i][j] + b[i][j]`.
(b) Implement `public static void printMatrix(int[][] matrix)` that displays the matrix in tabular row-column format.
(c) In `main`, initialize two sample $3 \times 3$ matrices, compute their sum, and print the resulting matrix.

**Answer key:**
- Allocation of result matrix $3 \times 3$
- Nested loops over rows (`i < 3`) and columns (`j < 3`)
- Correct element-wise addition `a[i][j] + b[i][j]`
- Nested loop printing with newline after each row
- Main method demonstrating the operation

**Reference solution:**
```java
public class MatrixAddition {
    public static int[][] addMatrices(int[][] a, int[][] b) {
        int rows = a.length;
        int cols = a[0].length;
        int[][] c = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                c[i][j] = a[i][j] + b[i][j];
            }
        }
        return c;
    }

    public static void printMatrix(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + "\t");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] a = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int[][] b = {
            {9, 8, 7},
            {6, 5, 4},
            {3, 2, 1}
        };

        int[][] result = addMatrices(a, b);
        System.out.println("Resultant Matrix C (A + B):");
        printMatrix(result);
    }
}
```

**Rubric:**
- 4 pts: Nested loops correctly computing element-wise sum
- 3 pts: Tabular print format with row line breaks
- 3 pts: Main setup and matrix initialization

**Common mistakes:**
- Swapping row and column indices (`matrix[j][i]`) causing out of bounds on non-square matrices

### Q069
- id: Q069
- section: E
- type: write-code
- difficulty: medium
- topic: searching
- points: 10
- time_minutes: 12
- source: original

**Task:**
Write a class named `SearchAlgorithms` containing:
(a) `public static int linearSearch(int[] arr, int target)`: scans the array from index 0 and returns the index of the first occurrence of `target`, or `-1` if not found.
(b) `public static int binarySearch(int[] sortedArr, int target)`: implements iterative binary search on a sorted array using `low`, `high`, and `mid` pointers. Returns index of `target`, or `-1` if not found.
(c) In `main`, demonstrate `linearSearch` on `{15, 42, 8, 23, 99}` searching for `23`, and `binarySearch` on `{3, 9, 14, 27, 45, 62}` searching for `45`.

**Answer key:**
- Linear search sequential loop returning index or -1
- Binary search `while (low <= high)` condition
- Correct `mid = low + (high - low) / 2` calculation
- Correct boundary adjustments (`low = mid + 1`, `high = mid - 1`)
- Main method demonstrating both searches

**Reference solution:**
```java
public class SearchAlgorithms {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    public static int binarySearch(int[] sortedArr, int target) {
        int low = 0;
        int high = sortedArr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sortedArr[mid] == target) {
                return mid;
            } else if (sortedArr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] unsorted = {15, 42, 8, 23, 99};
        int[] sorted = {3, 9, 14, 27, 45, 62};

        System.out.println("Linear search for 23: index " + linearSearch(unsorted, 23));
        System.out.println("Binary search for 45: index " + binarySearch(sorted, 45));
    }
}
```

**Rubric:**
- 3 pts: Correct linear search logic
- 5 pts: Correct binary search pointers, loop condition (`low <= high`), and division
- 2 pts: Main demonstration

**Common mistakes:**
- Using `low < high` instead of `low <= high` in binary search (misses target if located at boundary)

### Q070
- id: Q070
- section: E
- type: write-code
- difficulty: medium
- topic: sorting
- points: 10
- time_minutes: 12
- source: original

**Task:**
Write a class named `BubbleSort` that implements the bubble sort algorithm:
(a) Implement `public static void bubbleSort(int[] arr)`:
    - Sorts the array in ascending order.
    - Uses an outer loop for passes ($0$ to $n - 2$) and an inner loop for adjacent comparisons ($0$ to $n - 2 - i$).
    - Swaps adjacent elements if `arr[j] > arr[j + 1]`.
    - Includes an early termination flag `swapped`: if no swaps occurred during a pass, the loop breaks early.
(b) In `main`, sort `{64, 34, 25, 12, 22, 11, 90}` and print the array before and after sorting.

**Answer key:**
- Outer loop running $n - 1$ passes
- Inner loop comparing `arr[j]` and `arr[j + 1]` up to `n - 1 - i`
- Correct swap using temporary variable
- Boolean `swapped` flag optimization breaking when already sorted
- Main method demonstrating sort

**Reference solution:**
```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Before sorting: ");
        printArray(data);

        bubbleSort(data);

        System.out.print("After sorting: ");
        printArray(data);
    }
}
```

**Rubric:**
- 4 pts: Nested loops with proper comparison bounds
- 3 pts: Adjacent element swap
- 2 pts: Boolean `swapped` optimization
- 1 pt: Main demonstration

**Common mistakes:**
- Forgetting `- i` in inner loop condition, leading to redundant comparisons of already sorted trailing elements

### Q071
- id: Q071
- section: E
- type: write-code
- difficulty: hard
- topic: sorting
- points: 12
- time_minutes: 15
- source: original

**Task:**
Write a class named `InsertionSort` that implements the insertion sort algorithm:
(a) Implement `public static void insertionSort(int[] arr)`:
    - Iterates from index $1$ to `arr.length - 1`.
    - Stores the current element as `key`.
    - Shifts elements of the sorted subarray that are greater than `key` one position to the right.
    - Inserts `key` into its correct sorted position.
(b) Include a helper method `public static void printArray(int[] arr)`.
(c) In `main`, trace and sort `{12, 11, 13, 5, 6}`, printing the state of the array after every pass of the outer loop.

**Answer key:**
- Outer loop starting at index 1
- Key element preservation
- While loop shifting larger elements to the right (`arr[j] > key`)
- Insertion of key at `arr[j + 1]`
- Per-pass array printing in main

**Reference solution:**
```java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;

            System.out.print("Pass " + i + ": ");
            printArray(arr);
        }
    }

    public static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] data = {12, 11, 13, 5, 6};
        System.out.print("Start: ");
        printArray(data);

        insertionSort(data);

        System.out.print("Final Sorted: ");
        printArray(data);
    }
}
```

**Rubric:**
- 4 pts: Key preservation and while loop shifting logic
- 3 pts: Correct placement of `key` at `arr[j + 1]`
- 3 pts: Printing array state after each pass
- 2 pts: Main method execution

**Common mistakes:**
- Shifting elements in the wrong direction, overwriting unexamined data

### Q072
- id: Q072
- section: E
- type: write-code
- difficulty: hard
- topic: sorting
- points: 15
- time_minutes: 20
- source: variant-of-test

**Task:**
*(Direct variant of University of Ibadan 05 October 2026 Java Code Test Part 3 Question 3.1)*
Write a Java program that implements Selection Sort. Selection sort finds the smallest element of the array and swaps it with the first element, then finds the smallest of the remaining elements and swaps it with the second element, continuing until the array is fully sorted.

Write a complete Java program satisfying all sub-parts:
(a) Create a class `SelectionSort` with two private members: an `int[]` array named `data` and a `static Random random` object.
(b) Write a constructor `public SelectionSort(int size)` that creates the array of length `size` and fills it with random integers in the range 10 to 99.
(c) Write a method `public void sort()` that arranges `data` in increasing order using selection sort, and a private method `private void swap(int first, int second)` that exchanges two elements in `data`.
(d) Write a `public String toString()` method that returns the contents of the array as a space-separated string.
(e) In a `main` method, create a `SelectionSort` object with 10 elements, display the unsorted array, sort it while displaying the array after every pass, and display the final sorted array.

**Answer key:**
- Private members `int[] data` and `static Random random`
- Parameterized constructor allocating array and populating with random integers 10 to 99 (`random.nextInt(90) + 10`)
- Private `swap(int first, int second)` exchanging `data[first]` and `data[second]`
- Method `sort()` with outer loop from 0 to length - 2, finding minimum index, calling swap, and printing pass state
- Clean `toString()` method returning formatted array string
- Main method instantiating with size 10, executing sort, and printing output

**Reference solution:**
```java
import java.util.Random;

public class SelectionSort {
    private int[] data;
    private static Random random = new Random();

    public SelectionSort(int size) {
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = 10 + random.nextInt(90); // range 10 to 99
        }
    }

    private void swap(int first, int second) {
        int temp = data[first];
        data[first] = data[second];
        data[second] = temp;
    }

    public void sort() {
        for (int i = 0; i < data.length - 1; i++) {
            int smallest = i;
            for (int index = i + 1; index < data.length; index++) {
                if (data[index] < data[smallest]) {
                    smallest = index;
                }
            }
            if (smallest != i) {
                swap(i, smallest);
            }
            System.out.println("Pass " + (i + 1) + ": " + this.toString());
        }
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int val : data) {
            sb.append(val).append(" ");
        }
        return sb.toString().trim();
    }

    public static void main(String[] args) {
        SelectionSort sorter = new SelectionSort(10);
        System.out.println("Start:  " + sorter.toString());
        sorter.sort();
        System.out.println("Final:  " + sorter.toString());
    }
}
```

**Rubric:**
- 3 pts: Class definition and constructor populating random integers in range 10-99
- 2 pts: Private swap method implementation
- 5 pts: Selection sort logic finding minimum index in unsorted partition and swapping
- 2 pts: toString implementation formatting array
- 3 pts: Main method demonstrating unsorted array, per-pass updates, and final output

**Common mistakes:**
- Generating random numbers outside 10-99 (e.g. `random.nextInt(100)` produces 0-99)
- Forgetting to print the array after each pass as explicitly required by sub-part (e)

## Section F: OOP Class Design (Inheritance, Abstract Classes, Interfaces, Encapsulation)
Scope: Complete object-oriented program design covering encapsulation, single/multilevel/hierarchical/multiple/hybrid inheritance, abstract classes with abstract and concrete methods, interfaces with default methods, and dynamic method dispatch.

### Q073
- id: Q073
- section: F
- type: write-code
- difficulty: easy
- topic: encapsulation
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
*(Based on Week 5 Assignment 5: Employee Object Array)*
Design an encapsulated Java class named `StaffRecord`:
(a) Declare four private fields: `id` (int), `name` (String), `department` (String), and `salary` (double).
(b) Provide a parameterized constructor `public StaffRecord(int id, String name, String department, double salary)`.
(c) Provide public getters for all four fields, and a public setter for `salary` with validation (rejects negative salaries).
(d) Include a `main` method that creates an array of three `StaffRecord` objects, populates them with sample data, and prints their details in a formatted table.

**Answer key:**
- Four private attributes enforcing encapsulation
- Parameterized constructor initializing all fields
- Public getters for all attributes
- Setter for `salary` checking `salary >= 0`
- Array of objects instantiated and displayed in tabular format in main

**Reference solution:**
```java
public class StaffRecord {
    private int id;
    private String name;
    private String department;
    private double salary;

    public StaffRecord(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        setSalary(salary);
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            System.out.println("Invalid salary: cannot be negative");
        }
    }

    public static void main(String[] args) {
        StaffRecord[] staff = new StaffRecord[3];
        staff[0] = new StaffRecord(101, "Alice Ade", "Computing", 450000.0);
        staff[1] = new StaffRecord(102, "Bob Bello", "Mathematics", 380000.0);
        staff[2] = new StaffRecord(103, "Charlie Chukwu", "Physics", 410000.0);

        System.out.printf("%-6s %-16s %-15s %-10s%n", "ID", "Name", "Department", "Salary");
        System.out.println("--------------------------------------------------");
        for (StaffRecord s : staff) {
            System.out.printf("%-6d %-16s %-15s N%,.2f%n", s.getId(), s.getName(), s.getDepartment(), s.getSalary());
        }
    }
}
```

**Rubric:**
- 3 pts: Private fields, constructor, and getters
- 2 pts: Salary setter with validation
- 3 pts: Array allocation, initialization, and formatted table printing

**Common mistakes:**
- Leaving fields public or package-private instead of private
- Failing to validate salary input

### Q074
- id: Q074
- section: F
- type: write-code
- difficulty: medium
- topic: inheritance
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Week 7 Exercise 2: Multilevel Inheritance)*
Implement a multilevel inheritance hierarchy in Java:
(a) Base class `Employee`: contains `name` (String) and `baseSalary` (double), a constructor, and method `public double calculateEarnings()` that returns `baseSalary`.
(b) Subclass `Manager` extending `Employee`: adds a field `bonus` (double), a constructor calling `super`, and overrides `calculateEarnings()` to return `baseSalary + bonus`.
(c) Subclass `SeniorManager` extending `Manager`: adds a field `stockOptions` (double), a constructor calling `super`, and overrides `calculateEarnings()` to return `super.calculateEarnings() + stockOptions`.
(d) Include a `main` method that creates an instance of each of the three classes and prints their earnings.

**Answer key:**
- Base class with fields and initial `calculateEarnings()`
- `Manager` subclass calling `super` and adding `bonus`
- `SeniorManager` subclass calling `super` and adding `stockOptions`
- Demonstration of constructor chaining and multilevel method overriding in `main`

**Reference solution:**
```java
class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public double calculateEarnings() {
        return baseSalary;
    }
}

class Manager extends Employee {
    protected double bonus;

    public Manager(String name, double baseSalary, double bonus) {
        super(name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculateEarnings() {
        return super.calculateEarnings() + bonus;
    }
}

class SeniorManager extends Manager {
    private double stockOptions;

    public SeniorManager(String name, double baseSalary, double bonus, double stockOptions) {
        super(name, baseSalary, bonus);
        this.stockOptions = stockOptions;
    }

    @Override
    public double calculateEarnings() {
        return super.calculateEarnings() + stockOptions;
    }
}

public class MultilevelDemo {
    public static void main(String[] args) {
        Employee emp = new Employee("John", 200000.0);
        Manager mgr = new Manager("Sarah", 350000.0, 50000.0);
        SeniorManager smgr = new SeniorManager("David", 500000.0, 100000.0, 75000.0);

        System.out.println(emp.name + " Earnings: N" + emp.calculateEarnings());
        System.out.println(mgr.name + " Earnings: N" + mgr.calculateEarnings());
        System.out.println(smgr.name + " Earnings: N" + smgr.calculateEarnings());
    }
}
```

**Rubric:**
- 3 pts: Base Employee class definition
- 3 pts: Manager class with super() call and bonus
- 3 pts: SeniorManager class with super() call and stock options
- 1 pt: Main execution

**Common mistakes:**
- Forgetting to call `super(...)` in child constructors

### Q075
- id: Q075
- section: F
- type: write-code
- difficulty: medium
- topic: inheritance
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Week 7 Exercise 3: Hierarchical Inheritance)*
Implement a hierarchical inheritance structure in Java:
(a) Superclass `GeometricFigure`: has a `name` (String) and a method `public void displayFigureInfo()` printing the figure's name.
(b) Three distinct subclasses derived from `GeometricFigure`:
    - `TriangleFigure`: has `double base, height` and method `public double getArea()` returning `0.5 * base * height`.
    - `SquareFigure`: has `double side` and method `public double getArea()` returning `side * side`.
    - `PentagonFigure`: has `double side, apothem` and method `public double getArea()` returning `2.5 * side * apothem`.
(c) In `main`, create an instance of each subclass and print their names and computed areas.

**Answer key:**
- Superclass with common `name` attribute and display method
- Subclasses `TriangleFigure`, `SquareFigure`, and `PentagonFigure` each inheriting from `GeometricFigure`
- Correct mathematical area formulas for each geometric figure
- Main method demonstrating hierarchical inheritance

**Reference solution:**
```java
class GeometricFigure {
    protected String name;

    public GeometricFigure(String name) {
        this.name = name;
    }

    public void displayFigureInfo() {
        System.out.println("Figure: " + name);
    }
}

class TriangleFigure extends GeometricFigure {
    private double base;
    private double height;

    public TriangleFigure(double base, double height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    public double getArea() {
        return 0.5 * base * height;
    }
}

class SquareFigure extends GeometricFigure {
    private double side;

    public SquareFigure(double side) {
        super("Square");
        this.side = side;
    }

    public double getArea() {
        return side * side;
    }
}

class PentagonFigure extends GeometricFigure {
    private double side;
    private double apothem;

    public PentagonFigure(double side, double apothem) {
        super("Pentagon");
        this.side = side;
        this.apothem = apothem;
    }

    public double getArea() {
        return 2.5 * side * apothem;
    }
}

public class HierarchicalDemo {
    public static void main(String[] args) {
        TriangleFigure t = new TriangleFigure(6.0, 4.0);
        SquareFigure s = new SquareFigure(5.0);
        PentagonFigure p = new PentagonFigure(4.0, 3.0);

        t.displayFigureInfo();
        System.out.println("Area: " + t.getArea());

        s.displayFigureInfo();
        System.out.println("Area: " + s.getArea());

        p.displayFigureInfo();
        System.out.println("Area: " + p.getArea());
    }
}
```

**Rubric:**
- 3 pts: Common superclass with constructor and info method
- 4 pts: Three subclasses correctly extending superclass and implementing area formulas
- 3 pts: Main execution demonstrating hierarchical dispatch

**Common mistakes:**
- Declaring separate independent classes instead of having all three inherit from `GeometricFigure`

### Q076
- id: Q076
- section: F
- type: write-code
- difficulty: medium
- topic: interfaces
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Week 7 Exercise 4: Multiple Inheritance via Interfaces)*
Demonstrate multiple inheritance in Java using interfaces:
(a) Interface `Flyable`: declares a default method `default void fly()` printing `"Flying high in the sky"`.
(b) Interface `Swimmable`: declares a default method `default void swim()` printing `"Swimming in the pond"`.
(c) Class `Duck`: implements both `Flyable` and `Swimmable`, has a field `species` (String), and adds its own method `public void quack()` printing `"Quack! Quack!"`.
(d) In `main`, create a `Duck` object and call `fly()`, `swim()`, and `quack()`.

**Answer key:**
- `Flyable` interface with default `fly()`
- `Swimmable` interface with default `swim()`
- `Duck` class implementing both interfaces with comma-separated syntax (`implements Flyable, Swimmable`)
- Main method invoking methods from both interfaces and class

**Reference solution:**
```java
interface Flyable {
    default void fly() {
        System.out.println("Flying high in the sky");
    }
}

interface Swimmable {
    default void swim() {
        System.out.println("Swimming in the pond");
    }
}

class Duck implements Flyable, Swimmable {
    private String species;

    public Duck(String species) {
        this.species = species;
    }

    public void quack() {
        System.out.println(species + " says: Quack! Quack!");
    }
}

public class MultipleInheritanceDemo {
    public static void main(String[] args) {
        Duck mallard = new Duck("Mallard Duck");
        mallard.fly();
        mallard.swim();
        mallard.quack();
    }
}
```

**Rubric:**
- 3 pts: `Flyable` and `Swimmable` interfaces with default methods
- 4 pts: `Duck` class implementing both interfaces
- 3 pts: Main execution verifying interface and class methods

**Common mistakes:**
- Trying to extend multiple interfaces with `extends` instead of `implements`

### Q077
- id: Q077
- section: F
- type: write-code
- difficulty: medium
- topic: hybrid-inheritance
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Week 7 slides 34-36: Hybrid Inheritance)*
Implement a hybrid inheritance model combining class inheritance and interface implementation:
(a) Base class `TransitVehicle`: has a field `vehicleId` (String) and method `public void vehicleInfo()` printing the ID.
(b) Interface `FareChargeable`: defines a default method `default void printFareNotice()` printing `"Standard fare rules apply"`, and an abstract method `double computeFare(double distanceKm)`.
(c) Subclass `CommercialBus`: extends `TransitVehicle` and implements `FareChargeable`.
    - Constructor calls `super(vehicleId)`.
    - Implements `computeFare(distanceKm)` returning `distanceKm * 50.0`.
(d) Subclass `PrivateCar`: extends `TransitVehicle` without implementing `FareChargeable`.
(e) In `main`, instantiate both vehicles, call `vehicleInfo()` on both, and compute fare for the bus.

**Answer key:**
- Base class `TransitVehicle`
- Interface `FareChargeable` with default and abstract methods
- Class `CommercialBus` combining single inheritance and interface implementation
- Class `PrivateCar` extending base class only
- Main demonstration of hybrid structure

**Reference solution:**
```java
class TransitVehicle {
    protected String vehicleId;

    public TransitVehicle(String vehicleId) {
        this.vehicleId = vehicleId;
    }

    public void vehicleInfo() {
        System.out.println("Vehicle ID: " + vehicleId);
    }
}

interface FareChargeable {
    default void printFareNotice() {
        System.out.println("Standard fare rules apply");
    }

    double computeFare(double distanceKm);
}

class CommercialBus extends TransitVehicle implements FareChargeable {
    public CommercialBus(String vehicleId) {
        super(vehicleId);
    }

    @Override
    public double computeFare(double distanceKm) {
        return distanceKm * 50.0;
    }
}

class PrivateCar extends TransitVehicle {
    public PrivateCar(String vehicleId) {
        super(vehicleId);
    }
}

public class HybridInheritanceDemo {
    public static void main(String[] args) {
        CommercialBus bus = new CommercialBus("BUS-UI-01");
        PrivateCar car = new PrivateCar("CAR-UI-99");

        bus.vehicleInfo();
        bus.printFareNotice();
        System.out.println("Bus Fare for 12 km: N" + bus.computeFare(12.0));

        car.vehicleInfo();
    }
}
```

**Rubric:**
- 3 pts: Base class `TransitVehicle` definition
- 3 pts: Interface `FareChargeable` with default and abstract method
- 3 pts: Subclasses `CommercialBus` and `PrivateCar` implementing hybrid structure
- 1 pt: Main demonstration

**Common mistakes:**
- Putting `implements` before `extends` (Java syntax requires `extends BaseClass implements Interface`)

### Q078
- id: Q078
- section: F
- type: write-code
- difficulty: hard
- topic: abstract-classes
- points: 12
- time_minutes: 15
- source: variant-of-slides

**Task:**
*(Based on Week 5 Exercise 5 & Week 8 Shape Hierarchy)*
Design an abstract Shape system demonstrating runtime polymorphism:
(a) Abstract class `Shape`:
    - Protected field `color` (String).
    - Constructor `public Shape(String color)`.
    - Concrete method `public String getColor()` returning `color`.
    - Abstract methods `public abstract double area()` and `public abstract double perimeter()`.
(b) Subclasses `Circle`, `Rectangle`, and `Triangle`:
    - Each calls `super(color)`.
    - `Circle(String color, double radius)`: computes area ($\pi r^2$) and perimeter ($2 \pi r$).
    - `Rectangle(String color, double length, double width)`: computes area ($l \times w$) and perimeter ($2(l + w)$).
    - `Triangle(String color, double a, double b, double c)`: computes perimeter ($a + b + c$) and area using Heron's formula with semi-perimeter $s = \frac{a+b+c}{2}$: $\sqrt{s(s-a)(s-b)(s-c)}$.
(c) In `main`, create an array `Shape[] shapes` storing one Circle, one Rectangle, and one Triangle. Traverse the array and print each shape's color, area, and perimeter (runtime polymorphism).

**Answer key:**
- Abstract class with mixed concrete and abstract methods
- Subclasses implementing `area()` and `perimeter()` formulas accurately
- Triangle using Heron's formula
- Polymorphic array traversal `for (Shape s : shapes)` calling overridden methods

**Reference solution:**
```java
abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public abstract double area();
    public abstract double perimeter();
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    public double area() {
        return length * width;
    }

    @Override
    public double perimeter() {
        return 2 * (length + width);
    }
}

class Triangle extends Shape {
    private double a, b, c;

    public Triangle(String color, double a, double b, double c) {
        super(color);
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public double perimeter() {
        return a + b + c;
    }

    @Override
    public double area() {
        double s = perimeter() / 2.0;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}

public class ShapePolymorphismDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle("Red", 4.0);
        shapes[1] = new Rectangle("Blue", 5.0, 3.0);
        shapes[2] = new Triangle("Green", 3.0, 4.0, 5.0);

        for (Shape s : shapes) {
            System.out.println(s.getClass().getSimpleName() + " [" + s.getColor() + "]");
            System.out.printf("  Area: %.2f%n", s.area());
            System.out.printf("  Perimeter: %.2f%n", s.perimeter());
        }
    }
}
```

**Rubric:**
- 3 pts: Abstract class with constructor, concrete getter, and abstract methods
- 4 pts: Three concrete subclasses implementing area and perimeter
- 2 pts: Heron's formula implementation for triangle
- 3 pts: Polymorphic array processing in main

**Common mistakes:**
- Trying to instantiate `Shape` directly (`new Shape(...)` fails compilation)

### Q079
- id: Q079
- section: F
- type: write-code
- difficulty: hard
- topic: abstract-classes
- points: 12
- time_minutes: 15
- source: variant-of-slides

**Task:**
*(Based on Week 8 Exercise 2: Abstract Employee Hierarchy)*
Design an payroll abstraction hierarchy in Java:
(a) Abstract class `AbstractEmployee`:
    - Fields: `name` (String), `employeeId` (String).
    - Constructor initializing both fields.
    - Concrete method `public void printDetails()` printing name and ID.
    - Abstract method `public abstract double calculateSalary()`.
(b) Subclass `FullTimeEmployee`:
    - Additional fields: `monthlySalary` (double), `allowances` (double).
    - Overrides `calculateSalary()` returning `monthlySalary + allowances`.
(c) Subclass `PartTimeEmployee`:
    - Additional fields: `hoursWorked` (int), `hourlyRate` (double).
    - Overrides `calculateSalary()` returning `hoursWorked * hourlyRate`.
(d) In `main`, store a `FullTimeEmployee` and a `PartTimeEmployee` in an `AbstractEmployee[]` array, calculate their salaries, and print a formatted payroll summary.

**Answer key:**
- Abstract superclass with name, ID, and abstract `calculateSalary()`
- `FullTimeEmployee` with monthly salary and allowances
- `PartTimeEmployee` with hourly wage formula
- Polymorphic array traversal calculating total payroll

**Reference solution:**
```java
abstract class AbstractEmployee {
    protected String name;
    protected String employeeId;

    public AbstractEmployee(String name, String employeeId) {
        this.name = name;
        this.employeeId = employeeId;
    }

    public void printDetails() {
        System.out.println("ID: " + employeeId + " | Name: " + name);
    }

    public abstract double calculateSalary();
}

class FullTimeEmployee extends AbstractEmployee {
    private double monthlySalary;
    private double allowances;

    public FullTimeEmployee(String name, String employeeId, double monthlySalary, double allowances) {
        super(name, employeeId);
        this.monthlySalary = monthlySalary;
        this.allowances = allowances;
    }

    @Override
    public double calculateSalary() {
        return monthlySalary + allowances;
    }
}

class PartTimeEmployee extends AbstractEmployee {
    private int hoursWorked;
    private double hourlyRate;

    public PartTimeEmployee(String name, String employeeId, int hoursWorked, double hourlyRate) {
        super(name, employeeId);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }

    @Override
    public double calculateSalary() {
        return hoursWorked * hourlyRate;
    }
}

public class EmployeeHierarchyDemo {
    public static void main(String[] args) {
        AbstractEmployee[] staff = new AbstractEmployee[2];
        staff[0] = new FullTimeEmployee("Dr. Ayinla", "STF-001", 600000.0, 120000.0);
        staff[1] = new PartTimeEmployee("Mr. Ayetuoma", "STF-002", 45, 8000.0);

        double totalPayroll = 0.0;
        for (AbstractEmployee e : staff) {
            e.printDetails();
            double salary = e.calculateSalary();
            System.out.printf("  Salary: N%,.2f%n", salary);
            totalPayroll += salary;
        }
        System.out.printf("Total Department Payroll: N%,.2f%n", totalPayroll);
    }
}
```

**Rubric:**
- 3 pts: Abstract class with constructor and abstract method
- 3 pts: FullTimeEmployee implementation
- 3 pts: PartTimeEmployee implementation
- 3 pts: Polymorphic array processing and payroll total in main

**Common mistakes:**
- Forgetting to call `super(name, employeeId)` in subclass constructors

### Q080
- id: Q080
- section: F
- type: write-code
- difficulty: hard
- topic: abstract-classes
- points: 12
- time_minutes: 15
- source: variant-of-test

**Task:**
*(Based on Week 8 Exercise 4 & 05 October 2026 Test Part 2: Payment Hierarchy)*
Design an end-to-end payment processing hierarchy in Java:
(a) Abstract class `PaymentMethod`:
    - Fields: `protected double amountPaid` and `protected String status` (initialized to `"PENDING"`).
    - Concrete method `public String printReceipt()` returning a formatted receipt string displaying the payment class name, amount paid, and status.
    - Abstract method `public abstract void processPayment(double amount)`.
(b) Subclass `CardPayment`:
    - Applies a $1.5\%$ processing surcharge: `amountPaid = amount + (amount * 0.015)`.
    - Updates `status` to `"CARD APPROVED"`.
(c) Subclass `CashPayment`:
    - Validates that cash amount does not exceed N$200,000$. If `amount > 200000`, throws an `IllegalArgumentException("Cash payments above N200,000 are not allowed.")`.
    - If valid, sets `amountPaid = amount` and `status = "CASH RECEIVED"`.
(d) In `main`, demonstrate processing a valid card payment of N$50,000$, a valid cash payment of N$80,000$, and catching the exception from an invalid cash payment of N$250,000$.

**Answer key:**
- Abstract superclass `PaymentMethod` with `printReceipt()` and abstract `processPayment(double)`
- `CardPayment` subclass with 1.5% fee calculation and status update
- `CashPayment` subclass with upper bound validation (> 200,000) and exception throw
- Main method demonstrating both payments and try-catch for exception

**Reference solution:**
```java
abstract class PaymentMethod {
    protected double amountPaid;
    protected String status = "PENDING";

    public String printReceipt() {
        return "Method: " + getClass().getSimpleName()
            + "\nAmount paid: N" + String.format("%,.2f", amountPaid)
            + "\nStatus: " + status;
    }

    public abstract void processPayment(double amount);
}

class CardPayment extends PaymentMethod {
    @Override
    public void processPayment(double amount) {
        amountPaid = amount + (amount * 0.015); // 1.5% surcharge
        status = "CARD APPROVED";
    }
}

class CashPayment extends PaymentMethod {
    @Override
    public void processPayment(double amount) {
        if (amount > 200000) {
            throw new IllegalArgumentException("Cash payments above N200,000 are not allowed.");
        }
        amountPaid = amount;
        status = "CASH RECEIVED";
    }
}

public class PaymentSystemDemo {
    public static void main(String[] args) {
        PaymentMethod card = new CardPayment();
        card.processPayment(50000.0);
        System.out.println(card.printReceipt());
        System.out.println("-------------------------");

        PaymentMethod cash = new CashPayment();
        cash.processPayment(80000.0);
        System.out.println(cash.printReceipt());
        System.out.println("-------------------------");

        try {
            PaymentMethod excessCash = new CashPayment();
            excessCash.processPayment(250000.0);
        } catch (IllegalArgumentException ex) {
            System.out.println("Rejected: " + ex.getMessage());
        }
    }
}
```

**Rubric:**
- 3 pts: Abstract PaymentMethod class with printReceipt and abstract processPayment
- 3 pts: CardPayment with 1.5% surcharge
- 3 pts: CashPayment with > 200,000 exception check
- 3 pts: Main method demonstrating payments and exception handling

**Common mistakes:**
- Calculating `amountPaid = amount * 0.015` (surcharge only, instead of amount plus surcharge)


## Section G: Collections Framework, Custom Exceptions, and Advanced GUI Integration
Scope: Comprehensive practical programming questions on the Java Collections Framework (ArrayList, generics, custom comparators), hierarchical custom exception handling with file logging, and event-driven Swing graphical user interfaces with input validation.

### Q081
- id: Q081
- section: G
- type: write-code
- difficulty: medium
- topic: collections
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Week 6 Collections & Academic Records)*
Implement a student course tracking system using `ArrayList`:
(a) Create a class `CourseRecord` with private fields: `code` (String), `title` (String), `units` (int), and `grade` (char: 'A', 'B', 'C', 'D', 'E', 'F'). Provide a constructor, getters for all fields, and a method `public int getGradePoint()` that returns:
    - 5 for 'A', 4 for 'B', 3 for 'C', 2 for D, 1 for E, and 0 for 'F'.
(b) Create a class `AcademicTracker`:
    - Private field `private ArrayList<CourseRecord> courseList = new ArrayList<>();`
    - Method `public void addCourse(CourseRecord course)` that validates `course != null` and `units > 0` before adding to the list.
    - Method `public double calculateCGPA()` that computes total quality points ($\sum \text{units} \times \text{gradePoint}$) divided by total registered units. If total units is 0, returns $0.0$.
(c) In `main`, register at least 3 courses (e.g., COS201, COS202, MAT201), iterate through the courses displaying code and units, and print the calculated CGPA formatted to 2 decimal places.

**Answer key:**
- Properly encapsulated `CourseRecord` with fields, constructor, getters, and `getGradePoint()` switch/if
- `AcademicTracker` holding `ArrayList<CourseRecord>`
- `addCourse` validation check
- Correct CGPA calculation logic dividing total points by total units
- Main method demonstrating instantiation, course registration, and output display

**Reference solution:**
```java
import java.util.ArrayList;

class CourseRecord {
    private String code;
    private String title;
    private int units;
    private char grade;

    public CourseRecord(String code, String title, int units, char grade) {
        this.code = code;
        this.title = title;
        this.units = units;
        this.grade = Character.toUpperCase(grade);
    }

    public String getCode() { return code; }
    public String getTitle() { return title; }
    public int getUnits() { return units; }
    public char getGrade() { return grade; }

    public int getGradePoint() {
        switch (grade) {
            case 'A': return 5;
            case 'B': return 4;
            case 'C': return 3;
            case 'D': return 2;
            case 'E': return 1;
            case 'F': return 0;
            default: return 0;
        }
    }
}

public class AcademicTracker {
    private ArrayList<CourseRecord> courseList = new ArrayList<>();

    public void addCourse(CourseRecord course) {
        if (course == null) {
            throw new IllegalArgumentException("Course cannot be null.");
        }
        if (course.getUnits() <= 0) {
            throw new IllegalArgumentException("Course units must be positive.");
        }
        courseList.add(course);
    }

    public double calculateCGPA() {
        int totalUnits = 0;
        int totalPoints = 0;
        for (CourseRecord c : courseList) {
            totalUnits += c.getUnits();
            totalPoints += (c.getUnits() * c.getGradePoint());
        }
        if (totalUnits == 0) return 0.0;
        return (double) totalPoints / totalUnits;
    }

    public static void main(String[] args) {
        AcademicTracker tracker = new AcademicTracker();
        tracker.addCourse(new CourseRecord("COS201", "Computer Programming II", 3, 'A'));
        tracker.addCourse(new CourseRecord("COS202", "Advanced Java Programming", 3, 'B'));
        tracker.addCourse(new CourseRecord("MAT201", "Linear Algebra", 4, 'A'));

        System.out.printf("Total Courses Registered: %d%n", tracker.courseList.size());
        for (CourseRecord c : tracker.courseList) {
            System.out.printf("- %s: %s (%d units, Grade %c)%n", c.getCode(), c.getTitle(), c.getUnits(), c.getGrade());
        }
        System.out.printf("Calculated CGPA: %.2f%n", tracker.calculateCGPA());
    }
}
```

**Rubric:**
- 3 pts: `CourseRecord` implementation with grade point mapping
- 3 pts: `AcademicTracker` with `ArrayList` and validation
- 2 pts: Correct CGPA calculation (avoiding integer division truncation)
- 2 pts: Complete `main` execution and formatted printing

**Common mistakes:**
- Integer division truncation (`totalPoints / totalUnits` without cast to `double`)
- Omitting null checks or zero unit checks

### Q082
- id: Q082
- section: G
- type: write-code
- difficulty: hard
- topic: custom-exceptions
- points: 12
- time_minutes: 15
- source: variant-of-slides

**Task:**
*(Based on Week 9 Custom Exception Handling & Hierarchy)*
Design an academic course registration exception handling architecture:
(a) Create a base checked exception `EnrollmentException` extending `Exception` with a parameterized constructor accepting `String message`.
(b) Create two specific subclasses of `EnrollmentException`:
    - `DuplicateCourseException` with message constructor.
    - `CreditLimitExceededException` with message constructor.
(c) Create a class `CourseRegistrationController`:
    - Fields: `private ArrayList<String> registeredCodes = new ArrayList<>();`, `private int currentTotalCredits = 0;`, and `public static final int MAX_CREDITS = 24;`.
    - Method `public void register(String courseCode, int credits) throws EnrollmentException`:
        - If `registeredCodes.contains(courseCode)`, throws `DuplicateCourseException("Course " + courseCode + " is already registered.")`.
        - If `currentTotalCredits + credits > MAX_CREDITS`, throws `CreditLimitExceededException("Registering " + credits + " credits exceeds the semester limit of " + MAX_CREDITS)`.
        - Otherwise, adds `courseCode` to the list and updates `currentTotalCredits += credits`.
(d) In `main`, demonstrate:
    - Successfully registering two courses.
    - Attempting to register a duplicate course, catching `EnrollmentException`, and printing the message.
    - Attempting to exceed 24 credits, catching `EnrollmentException`, and printing the message.

**Answer key:**
- Checked exception hierarchy with base `EnrollmentException` and two distinct subclasses
- Proper constructor chaining (`super(message)`) in custom exceptions
- Controller enforcing duplicate check and credit limit check
- `register` method properly declaring `throws EnrollmentException`
- `main` method with `try-catch` blocks demonstrating robust recovery

**Reference solution:**
```java
import java.util.ArrayList;

class EnrollmentException extends Exception {
    public EnrollmentException(String message) {
        super(message);
    }
}

class DuplicateCourseException extends EnrollmentException {
    public DuplicateCourseException(String message) {
        super(message);
    }
}

class CreditLimitExceededException extends EnrollmentException {
    public CreditLimitExceededException(String message) {
        super(message);
    }
}

public class CourseRegistrationController {
    private ArrayList<String> registeredCodes = new ArrayList<>();
    private int currentTotalCredits = 0;
    public static final int MAX_CREDITS = 24;

    public void register(String courseCode, int credits) throws EnrollmentException {
        if (registeredCodes.contains(courseCode)) {
            throw new DuplicateCourseException("Course " + courseCode + " is already registered.");
        }
        if (currentTotalCredits + credits > MAX_CREDITS) {
            throw new CreditLimitExceededException("Registering " + credits + " credits exceeds the semester limit of " + MAX_CREDITS);
        }
        registeredCodes.add(courseCode);
        currentTotalCredits += credits;
        System.out.printf("Successfully registered %s (%d credits). Total credits: %d%n", courseCode, credits, currentTotalCredits);
    }

    public static void main(String[] args) {
        CourseRegistrationController controller = new CourseRegistrationController();

        try {
            controller.register("COS201", 3);
            controller.register("COS202", 3);
            controller.register("COS201", 3); // duplicate
        } catch (EnrollmentException ex) {
            System.err.println("Registration Error: " + ex.getMessage());
        }

        try {
            controller.register("GST201", 20); // exceeds limit (3+3+20 = 26 > 24)
        } catch (EnrollmentException ex) {
            System.err.println("Registration Error: " + ex.getMessage());
        }
    }
}
```

**Rubric:**
- 4 pts: Correct custom exception inheritance hierarchy and constructors
- 4 pts: `register` logic with duplicate and upper-bound credit checks
- 2 pts: Correct `throws` clause on method signature
- 2 pts: Comprehensive `try-catch` handling in `main`

**Common mistakes:**
- Extending `RuntimeException` instead of `Exception` when checked behavior is required
- Forgetting to invoke `super(message)` in the exception constructor

### Q083
- id: Q083
- section: G
- type: write-code
- difficulty: medium
- topic: gui
- points: 12
- time_minutes: 15
- source: variant-of-slides

**Task:**
*(Based on Week 10 Swing Form Input & Validation)*
Develop an event-driven course enrollment GUI application in a class named `CourseEnrollmentForm` extending `JFrame`:
(a) Declare GUI components:
    - Text fields: `JTextField codeField` (columns 8), `JTextField unitsField` (columns 4)
    - Dropdown: `JComboBox<String> gradeBox` populated with `{"A", "B", "C", "D", "E", "F"}`
    - Button: `JButton addButton` with label `"Add Course"`
    - Text area: `JTextArea logArea` (rows 6, columns 30), wrapped in a `JScrollPane` and marked uneditable.
(b) Frame setup:
    - Use `FlowLayout` or nested panels to arrange the input labels, fields, button, and scroll pane.
    - Set title to `"Course Enrollment Form"`, close operation to `EXIT_ON_CLOSE`, pack, and make visible.
(c) Action Listener on `addButton`:
    - Checks that `codeField.getText().trim()` is not empty. If empty, displays an error message using `JOptionPane.showMessageDialog`.
    - Parses `unitsField.getText().trim()` into an integer. If the unit is $\le 0$, or if `NumberFormatException` occurs, displays an error message dialog.
    - If valid, appends a line to `logArea`: `"Added: <codeField> | <units> units | Grade: <gradeBox selection>\n"`.
    - Clears `codeField` and `unitsField` for the next entry.

**Answer key:**
- Extends `JFrame` and instantiates required components
- Uses `JScrollPane` for text area
- `ActionListener` on `addButton` with proper validation
- Try-catch block handling `NumberFormatException`
- `JOptionPane` dialogs for error feedback
- Proper clearing of input text fields after successful submission

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CourseEnrollmentForm extends JFrame {
    private JTextField codeField = new JTextField(8);
    private JTextField unitsField = new JTextField(4);
    private JComboBox<String> gradeBox = new JComboBox<>(new String[]{"A", "B", "C", "D", "E", "F"});
    private JButton addButton = new JButton("Add Course");
    private JTextArea logArea = new JTextArea(6, 30);

    public CourseEnrollmentForm() {
        super("Course Enrollment Form");
        setLayout(new FlowLayout());

        logArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(logArea);

        add(new JLabel("Course Code:"));
        add(codeField);
        add(new JLabel("Units:"));
        add(unitsField);
        add(new JLabel("Grade:"));
        add(gradeBox);
        add(addButton);
        add(scrollPane);

        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String code = codeField.getText().trim();
                String unitText = unitsField.getText().trim();

                if (code.isEmpty()) {
                    JOptionPane.showMessageDialog(CourseEnrollmentForm.this,
                            "Course code cannot be empty.",
                            "Input Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                int units;
                try {
                    units = Integer.parseInt(unitText);
                    if (units <= 0) {
                        JOptionPane.showMessageDialog(CourseEnrollmentForm.this,
                                "Units must be greater than zero.",
                                "Input Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(CourseEnrollmentForm.this,
                            "Units must be a valid integer.",
                            "Input Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                String grade = (String) gradeBox.getSelectedItem();
                logArea.append(String.format("Added: %s | %d units | Grade: %s%n", code, units, grade));

                codeField.setText("");
                unitsField.setText("");
            }
        });

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new CourseEnrollmentForm();
            }
        });
    }
}
```

**Rubric:**
- 3 pts: Component instantiation and layout setup
- 4 pts: `ActionListener` implementation and text area updating
- 3 pts: Validation checks (empty string and `NumberFormatException`)
- 2 pts: Dialog feedback with `JOptionPane` and text field clearing

**Common mistakes:**
- Forgetting `JScrollPane` or forgetting to add components to the frame
- Omitting `try-catch` around `Integer.parseInt`

### Q084
- id: Q084
- section: G
- type: write-code
- difficulty: medium
- topic: collections
- points: 10
- time_minutes: 12
- source: variant-of-slides

**Task:**
*(Based on Banking Transactions & Custom Runtime Exceptions)*
Create a banking transaction audit ledger in Java:
(a) Define a custom unchecked exception `OverdraftException` extending `RuntimeException`.
(b) Create a class `AccountLedger`:
    - Private fields: `private double balance;` and `private ArrayList<String> statementLog;`.
    - Constructor initializing `balance` to an opening amount (must be $\ge 0$, otherwise throw `IllegalArgumentException`) and initializing `statementLog`.
    - Method `public void deposit(double amount)`: throws `IllegalArgumentException` if `amount <= 0`, adds to `balance`, and adds `"DEPOSIT: +N" + amount` to `statementLog`.
    - Method `public void withdraw(double amount)`: throws `IllegalArgumentException` if `amount <= 0`, throws `OverdraftException` if `amount > balance`, deducts from `balance`, and adds `"WITHDRAWAL: -N" + amount` to `statementLog`.
    - Method `public void printStatement()`: prints each entry in `statementLog` followed by `"Current Balance: N" + balance`.
(c) In `main`, create an account with N$50,000$, deposit N$25,000$, withdraw N$40,000$, attempt an overdraft withdrawal of N$50,000$ (catching and handling `OverdraftException`), and print the statement.

**Answer key:**
- Custom unchecked exception `OverdraftException` extending `RuntimeException`
- `AccountLedger` properly managing state and `ArrayList<String>` log
- Proper validation and exception throws in `deposit` and `withdraw`
- Main method demonstrating deposits, withdrawals, exception catching, and statement output

**Reference solution:**
```java
import java.util.ArrayList;

class OverdraftException extends RuntimeException {
    public OverdraftException(String message) {
        super(message);
    }
}

public class AccountLedger {
    private double balance;
    private ArrayList<String> statementLog;

    public AccountLedger(double openingBalance) {
        if (openingBalance < 0) {
            throw new IllegalArgumentException("Opening balance cannot be negative.");
        }
        this.balance = openingBalance;
        this.statementLog = new ArrayList<>();
        this.statementLog.add(String.format("OPENING: N%,.2f", openingBalance));
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive.");
        }
        balance += amount;
        statementLog.add(String.format("DEPOSIT: +N%,.2f", amount));
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive.");
        }
        if (amount > balance) {
            throw new OverdraftException(String.format("Insufficient funds: requested N%,.2f, available N%,.2f", amount, balance));
        }
        balance -= amount;
        statementLog.add(String.format("WITHDRAWAL: -N%,.2f", amount));
    }

    public void printStatement() {
        System.out.println("====== ACCOUNT STATEMENT ======");
        for (String entry : statementLog) {
            System.out.println(entry);
        }
        System.out.printf("Current Balance: N%,.2f%n", balance);
        System.out.println("===============================");
    }

    public static void main(String[] args) {
        AccountLedger account = new AccountLedger(50000.0);
        account.deposit(25000.0);
        account.withdraw(40000.0);

        try {
            account.withdraw(50000.0); // should trigger OverdraftException
        } catch (OverdraftException ex) {
            System.err.println("Transaction Failed: " + ex.getMessage());
        }

        account.printStatement();
    }
}
```

**Rubric:**
- 2 pts: Custom unchecked exception declaration
- 3 pts: Constructor and field encapsulation
- 3 pts: Validation logic and exception throwing in `deposit` and `withdraw`
- 2 pts: Formatted statement output and test in `main`

**Common mistakes:**
- Allowing negative amounts to be deposited or withdrawn
- Deducting balance before checking overdraft condition

### Q085
- id: Q085
- section: G
- type: write-code
- difficulty: hard
- topic: gui
- points: 14
- time_minutes: 18
- source: variant-of-test

**Task:**
*(Based on 05 October 2026 Practical Test Part 1 & 2: Student CGPA Calculation Window)*
Build a comprehensive GUI application in class `StudentCGPAWindow` extending `JFrame` that integrates student data entry, grade calculation, and exception handling:
(a) GUI Components:
    - Text fields: `studentNameField` (12 columns), `totalQualityPointsField` (8 columns), `totalUnitsField` (6 columns)
    - Labels: Descriptive labels for each input field
    - Buttons: `JButton calculateButton` with label `"Compute CGPA"`, `JButton clearButton` with label `"Reset"`
    - Output label: `JLabel statusLabel` initialized to `"Status: Ready"`.
(b) Frame Layout & Initialization:
    - Use `FlowLayout` or `GridLayout` to organize input controls cleanly.
    - Set title to `"University CGPA Calculator"`, close operation to `EXIT_ON_CLOSE`, pack, and set visible.
(c) Event Handling for `calculateButton`:
    - Checks that `studentNameField` is not empty. If empty, shows an error dialog: `"Student name is required."`.
    - Parses quality points as double and total units as integer.
    - Validates that total units $\ge 1$ and quality points $\ge 0$. If invalid, shows an error dialog: `"Total units must be at least 1 and points cannot be negative."`.
    - Handles `NumberFormatException` with an error dialog: `"Please enter valid numeric values for points and units."`.
    - If valid, calculates $\text{CGPA} = \text{qualityPoints} / \text{units}$, and updates `statusLabel` with text: `String.format("Student: %s | CGPA: %.2f", name, cgpa)`.
(d) Event Handling for `clearButton`:
    - Resets all text fields to empty strings and resets `statusLabel` to `"Status: Ready"`.

**Answer key:**
- Proper Swing component hierarchy extending `JFrame`
- Robust input parsing with `Double.parseDouble` and `Integer.parseInt`
- Multi-tier validation with clear `JOptionPane` alerts
- Reset button logic restoring initial state
- Main method invoking GUI safely on the Event Dispatch Thread

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class StudentCGPAWindow extends JFrame {
    private JTextField studentNameField = new JTextField(12);
    private JTextField totalQualityPointsField = new JTextField(8);
    private JTextField totalUnitsField = new JTextField(6);
    private JButton calculateButton = new JButton("Compute CGPA");
    private JButton clearButton = new JButton("Reset");
    private JLabel statusLabel = new JLabel("Status: Ready");

    public StudentCGPAWindow() {
        super("University CGPA Calculator");
        setLayout(new FlowLayout());

        add(new JLabel("Student Name:"));
        add(studentNameField);
        add(new JLabel("Quality Points:"));
        add(totalQualityPointsField);
        add(new JLabel("Total Units:"));
        add(totalUnitsField);
        add(calculateButton);
        add(clearButton);
        add(statusLabel);

        calculateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String name = studentNameField.getText().trim();
                if (name.isEmpty()) {
                    JOptionPane.showMessageDialog(StudentCGPAWindow.this,
                            "Student name is required.", "Validation Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                double points;
                int units;
                try {
                    points = Double.parseDouble(totalQualityPointsField.getText().trim());
                    units = Integer.parseInt(totalUnitsField.getText().trim());
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(StudentCGPAWindow.this,
                            "Please enter valid numeric values for points and units.",
                            "Format Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }

                if (units < 1 || points < 0) {
                    JOptionPane.showMessageDialog(StudentCGPAWindow.this,
                            "Total units must be at least 1 and points cannot be negative.",
                            "Range Error", JOptionPane.ERROR_MESSAGE);
                            return;
                }

                double cgpa = points / units;
                statusLabel.setText(String.format("Student: %s | CGPA: %.2f", name, cgpa));
            }
        });

        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                studentNameField.setText("");
                totalQualityPointsField.setText("");
                totalUnitsField.setText("");
                statusLabel.setText("Status: Ready");
            }
        });

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new StudentCGPAWindow();
            }
        });
    }
}
```

**Rubric:**
- 4 pts: Component creation, layout setup, and frame lifecycle
- 5 pts: Calculate action listener with full input validation and division logic
- 2 pts: Clear action listener implementation
- 3 pts: Accurate `JOptionPane` dialog alerts and formatted status label

**Common mistakes:**
- Performing integer division when calculating CGPA
- Allowing zero or negative total units causing divide-by-zero


## Section H: Predict-the-Output Code Tracing
Scope: Precise console output prediction for challenging Java code snippets testing initialization order, dynamic dispatch vs field hiding, compile-time overload resolution, String pool equality, try-catch-finally control flow, widening vs autoboxing, reference passing semantics, ArrayList removal variants, ragged arrays, and operator precedence.

### Q086
- id: Q086
- section: H
- type: predict-output
- difficulty: medium
- topic: inheritance
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Constructor Chaining and Initialization Order)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
class SuperBase {
    static {
        System.out.println("1. SuperBase Static Block");
    }
    {
        System.out.println("3. SuperBase Instance Block");
    }
    public SuperBase() {
        System.out.println("4. SuperBase Constructor");
    }
}

class SubDerived extends SuperBase {
    static {
        System.out.println("2. SubDerived Static Block");
    }
    {
        System.out.println("5. SubDerived Instance Block");
    }
    public SubDerived() {
        super();
        System.out.println("6. SubDerived Constructor");
    }
}

public class InitOrderDemo {
    public static void main(String[] args) {
        System.out.println("Main Start");
        new SubDerived();
        System.out.println("Main End");
    }
}
```

**Answer key:**
```text
Main Start
1. SuperBase Static Block
2. SubDerived Static Block
3. SuperBase Instance Block
4. SuperBase Constructor
5. SubDerived Instance Block
6. SubDerived Constructor
Main End
```

**Trace and Explanation:**
1. When `InitOrderDemo.main()` executes, `SubDerived` class must be loaded before instantiation.
2. Loading `SubDerived` triggers superclass `SuperBase` loading first:
   - `SuperBase` static block runs: `"1. SuperBase Static Block"`
   - `SubDerived` static block runs: `"2. SubDerived Static Block"`
3. `"Main Start"` is printed by the first statement in `main()`.
4. `new SubDerived()` triggers instance creation:
   - Superclass instance block runs: `"3. SuperBase Instance Block"`
   - Superclass constructor runs: `"4. SuperBase Constructor"`
   - Subclass instance block runs: `"5. SubDerived Instance Block"`
   - Subclass constructor runs: `"6. SubDerived Constructor"`
5. Control returns to `main()`, printing `"Main End"`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Assuming instance blocks run before superclass constructors, or forgetting that static blocks run only once upon class loading before any instance creation.

### Q087
- id: Q087
- section: H
- type: predict-output
- difficulty: medium
- topic: polymorphism
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Field Hiding vs Dynamic Method Dispatch)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
class BaseEntity {
    public int score = 100;
    public void display() {
        System.out.println("Base display: score=" + score);
    }
}

class DerivedEntity extends BaseEntity {
    public int score = 200; // Hides BaseEntity.score
    @Override
    public void display() {
        System.out.println("Derived display: score=" + score + ", super.score=" + super.score);
    }
}

public class FieldHidingDemo {
    public static void main(String[] args) {
        BaseEntity ref = new DerivedEntity();
        System.out.println("Direct field access: " + ref.score);
        ref.display();
    }
}
```

**Answer key:**
```text
Direct field access: 100
Derived display: score=200, super.score=100
```

**Trace and Explanation:**
1. In Java, methods are dynamically dispatched based on the runtime type of the object, but fields are resolved statically based on the compile-time type of the reference.
2. `ref` has compile-time type `BaseEntity` and runtime type `DerivedEntity`.
3. `ref.score` resolves to `BaseEntity.score`, printing `Direct field access: 100`.
4. `ref.display()` dynamically invokes `DerivedEntity.display()`.
5. Inside `DerivedEntity.display()`, `score` refers to `this.score` (200) and `super.score` refers to 100, printing `Derived display: score=200, super.score=100`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Expecting `ref.score` to be polymorphic and print 200. In Java, attributes/fields are not overridden; they are shadowed/hidden.

### Q088
- id: Q088
- section: H
- type: predict-output
- difficulty: hard
- topic: methods
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Overload Resolution and Most Specific Parameter)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class OverloadResolutionDemo {
    public static void printType(Object o) {
        System.out.println("Object overload: " + o);
    }

    public static void printType(String s) {
        System.out.println("String overload: " + s);
    }

    public static void printType(Integer i) {
        System.out.println("Integer overload: " + i);
    }

    public static void main(String[] args) {
        printType("University of Ibadan");
        Object strObj = "Computer Science";
        printType(strObj);
        printType(Integer.valueOf(202));
    }
}
```

**Answer key:**
```text
String overload: University of Ibadan
Object overload: Computer Science
Integer overload: 202
```

**Trace and Explanation:**
1. Overloaded method calls are resolved at compile time based on the static (declared) type of arguments, selecting the most specific applicable parameter type.
2. `printType("University of Ibadan")`: argument type is `String`. The `String` overload is more specific than `Object`, so `String overload: University of Ibadan` is printed.
3. `printType(strObj)`: the reference `strObj` has declared type `Object`. Despite pointing to a `String` at runtime, overloading is resolved at compile time using the static type `Object`. Thus `Object overload: Computer Science` is printed.
4. `printType(Integer.valueOf(202))`: argument type is `Integer`. `Integer` overload is chosen over `Object`, printing `Integer overload: 202`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Confusing compile-time overload resolution with runtime polymorphic overriding. Overloading is always decided at compile time by the declared reference type.

### Q089
- id: Q089
- section: H
- type: predict-output
- difficulty: easy
- topic: methods
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on String Immutability and Reference Equality)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class StringEqualityDemo {
    public static void main(String[] args) {
        String s1 = "COS202";
        String s2 = "COS" + 202;
        String s3 = new String("COS202");
        String s4 = s3.intern();

        System.out.println("s1 == s2: " + (s1 == s2));
        System.out.println("s1 == s3: " + (s1 == s3));
        System.out.println("s1 == s4: " + (s1 == s4));
        System.out.println("s1.equals(s3): " + s1.equals(s3));

        s1.concat(" Java");
        System.out.println("s1 after concat: " + s1);
    }
}
```

**Answer key:**
```text
s1 == s2: true
s1 == s3: false
s1 == s4: true
s1.equals(s3): true
s1 after concat: COS202
```

**Trace and Explanation:**
1. `s1` is a string literal created in the string pool: `"COS202"`.
2. `s2 = "COS" + 202` is evaluated at compile time as constant expression folding into the string literal `"COS202"`, resolving to the exact same pooled reference as `s1`. Hence `s1 == s2` is `true`.
3. `s3 = new String("COS202")` creates an explicit new heap object outside the pool. Hence `s1 == s3` is `false`.
4. `s4 = s3.intern()` returns the canonical pooled reference, which is identical to `s1`. Hence `s1 == s4` is `true`.
5. `s1.equals(s3)` compares the character content `"COS202"` == `"COS202"`, returning `true`.
6. `s1.concat(" Java")` returns a new String object, but since String is immutable and the return value is ignored, `s1` remains `"COS202"`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Believing that `s1.concat()` mutates `s1` in place, or that `"COS" + 202` creates a new heap object at runtime.

### Q090
- id: Q090
- section: H
- type: predict-output
- difficulty: hard
- topic: exceptions
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Exception Handling with Finally Block Value Preservation)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class FinallyFlowDemo {
    public static int testReturn() {
        int x = 10;
        try {
            x = 20;
            return x;
        } finally {
            x = 30;
            System.out.println("Finally block executed: x=" + x);
        }
    }

    public static int testOverrideReturn() {
        try {
            return 100;
        } finally {
            return 200; // Overrides the try return value
        }
    }

    public static void main(String[] args) {
        int result1 = testReturn();
        System.out.println("testReturn() returned: " + result1);

        int result2 = testOverrideReturn();
        System.out.println("testOverrideReturn() returned: " + result2);
    }
}
```

**Answer key:**
```text
Finally block executed: x=30
testReturn() returned: 20
testOverrideReturn() returned: 200
```

**Trace and Explanation:**
1. In `testReturn()`, `x = 20` is evaluated and saved into a temporary return slot.
2. Before returning, the `finally` block executes unconditionally: `x = 30` is executed and `"Finally block executed: x=30"` is printed.
3. However, since the `finally` block does not execute a `return` statement, the previously saved return value (20) is returned. Thus `testReturn() returned: 20`.
4. In `testOverrideReturn()`, `return 100` prepares value 100. Then `finally` executes `return 200`. A `return` in `finally` abruptly discards any pending return value from `try`, returning 200. Thus `testOverrideReturn() returned: 200`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Thinking that modifying primitive `x` in the `finally` block changes the value already prepared for return by the `try` block.

### Q091
- id: Q091
- section: H
- type: predict-output
- difficulty: medium
- topic: methods
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Widening vs Autoboxing in Overload Selection)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class WideningBoxingDemo {
    public static void compute(long val) {
        System.out.println("Widening to long: " + val);
    }

    public static void compute(Integer val) {
        System.out.println("Autoboxing to Integer: " + val);
    }

    public static void compute(int... vals) {
        System.out.println("Varargs int...: count=" + vals.length);
    }

    public static void main(String[] args) {
        int x = 42;
        compute(x);
        compute(Integer.valueOf(99));
        compute(1, 2, 3);
    }
}
```

**Answer key:**
```text
Widening to long: 42
Autoboxing to Integer: 99
Varargs int...: count=3
```

**Trace and Explanation:**
1. Java language specification defines three phases of method overload resolution:
   - Phase 1: Subtyping and primitive widening without boxing or varargs.
   - Phase 2: Boxing/unboxing conversions without varargs.
   - Phase 3: Varargs with or without boxing.
2. For `compute(x)` where `x` is `int`:
   - Phase 1 checks primitive widening: `int` can widen to `long`. Phase 1 succeeds!
   - Therefore, `compute(long)` is invoked BEFORE autoboxing to `Integer`. Output: `Widening to long: 42`.
3. For `compute(Integer.valueOf(99))`: argument is already `Integer`, matching `compute(Integer)` directly. Output: `Autoboxing to Integer: 99`.
4. For `compute(1, 2, 3)`: only `compute(int...)` matches three arguments. Output: `Varargs int...: count=3`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Assuming Java autoboxes an `int` to `Integer` before widening to `long`. Widening always takes precedence over autoboxing.

### Q092
- id: Q092
- section: H
- type: predict-output
- difficulty: medium
- topic: methods
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Pass-by-Value Mechanics with Object References)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
class StudentScore {
    public int mark;
    public StudentScore(int m) { this.mark = m; }
}

public class PassByValueDemo {
    public static void modifyValues(int val, StudentScore s, int[] arr) {
        val = 999;
        s.mark = 85;
        s = new StudentScore(100);
        arr[0] = 77;
        arr = new int[]{1, 2, 3};
    }

    public static void main(String[] args) {
        int num = 50;
        StudentScore student = new StudentScore(60);
        int[] scores = {10, 20, 30};

        modifyValues(num, student, scores);

        System.out.println("num: " + num);
        System.out.println("student.mark: " + student.mark);
        System.out.println("scores[0]: " + scores[0]);
    }
}
```

**Answer key:**
```text
num: 50
student.mark: 85
scores[0]: 77
```

**Trace and Explanation:**
1. Java passes EVERYTHING by value. For primitives, the raw bit value is copied. For objects and arrays, the reference value (memory address pointer) is copied.
2. `val = 999`: modifies local copy only; `num` remains 50.
3. `s.mark = 85`: dereferences the shared object pointer, mutating the original `student` object's mark from 60 to 85.
4. `s = new StudentScore(100)`: reassigns the local parameter pointer `s` to a new object. The original `student` reference in `main` remains unchanged.
5. `arr[0] = 77`: dereferences the shared array pointer, mutating index 0 to 77.
6. `arr = new int[]{1, 2, 3}`: reassigns the local array parameter pointer. The original `scores` array in `main` is unaffected.
7. Output: `num: 50`, `student.mark: 85`, `scores[0]: 77`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Believing `s = new StudentScore(100)` changes the caller's reference to point to the new object.

### Q093
- id: Q093
- section: H
- type: predict-output
- difficulty: hard
- topic: collections
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on List.remove(int index) vs List.remove(Object element))*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
import java.util.ArrayList;

public class ListRemoveDemo {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(40);

        // Call 1: passes primitive int
        list.remove(1);
        System.out.println("After remove(1): " + list);

        // Call 2: passes Integer object
        list.remove(Integer.valueOf(10));
        System.out.println("After remove(Integer.valueOf(10)): " + list);

        // Call 3: passes Integer object not in list
        boolean removed = list.remove(Integer.valueOf(99));
        System.out.println("Removed 99? " + removed);
        System.out.println("Final list: " + list);
    }
}
```

**Answer key:**
```text
After remove(1): [10, 30, 40]
After remove(Integer.valueOf(10)): [30, 40]
Removed 99? false
Final list: [30, 40]
```

**Trace and Explanation:**
1. `ArrayList` has two overloaded `remove` methods:
   - `public E remove(int index)` removes element at the given 0-based index.
   - `public boolean remove(Object o)` removes the first occurrence of the matching element by equality.
2. `list.remove(1)` passes primitive `int 1`. It matches `remove(int index)`. Element at index 1 (`20`) is removed. List becomes `[10, 30, 40]`.
3. `list.remove(Integer.valueOf(10))` passes an `Integer` object. It matches `remove(Object o)`. Value 10 is found and removed. List becomes `[30, 40]`.
4. `list.remove(Integer.valueOf(99))` searches for 99, which does not exist; returns `false`. List remains `[30, 40]`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Expecting `list.remove(1)` to remove the number 1 from the list instead of removing the element at index 1.

### Q094
- id: Q094
- section: H
- type: predict-output
- difficulty: medium
- topic: arrays
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Ragged 2D Array Dimensions and Row Aliasing)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class RaggedArrayDemo {
    public static void main(String[] args) {
        int[][] matrix = new int[3][];
        matrix[0] = new int[]{1, 2};
        matrix[1] = new int[]{3, 4, 5};
        matrix[2] = matrix[0]; // Row 2 aliases Row 0!

        matrix[2][0] = 99;

        System.out.println("Row 0 length: " + matrix[0].length);
        System.out.println("Row 1 length: " + matrix[1].length);
        System.out.println("matrix[0][0]: " + matrix[0][0]);
        System.out.println("matrix[2][0]: " + matrix[2][0]);
    }
}
```

**Answer key:**
```text
Row 0 length: 2
Row 1 length: 3
matrix[0][0]: 99
matrix[2][0]: 99
```

**Trace and Explanation:**
1. `int[][] matrix = new int[3][]` allocates an array of 3 row pointers initialized to null.
2. `matrix[0]` is assigned a new array of length 2 `{1, 2}`.
3. `matrix[1]` is assigned a new array of length 3 `{3, 4, 5}`.
4. `matrix[2] = matrix[0]` copies the reference pointer of `matrix[0]` into `matrix[2]`. Both rows now point to the exact same 1D array in memory.
5. Modifying `matrix[2][0] = 99` mutates the shared underlying array.
6. Therefore, both `matrix[0][0]` and `matrix[2][0]` evaluate to 99.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Thinking `matrix[2] = matrix[0]` clones the array elements, and expecting `matrix[0][0]` to remain 1.

### Q095
- id: Q095
- section: H
- type: predict-output
- difficulty: easy
- topic: methods
- points: 6
- time_minutes: 8
- source: variant-of-slides

**Task:**
*(Based on Integer Division Truncation and Post/Pre-Increment Evaluation)*
Predict the exact terminal output produced when the `main` method of the following program is executed. Provide a detailed step-by-step trace explaining the order of execution.

```java
public class IncrementDivisionDemo {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;
        double result1 = a / b;
        double result2 = (double) a / b;

        System.out.println("result1: " + result1);
        System.out.println("result2: " + result2);

        int count = 5;
        int x = count++ * 2;
        int y = ++count * 2;

        System.out.println("x: " + x);
        System.out.println("y: " + y);
        System.out.println("final count: " + count);
    }
}
```

**Answer key:**
```text
result1: 3.0
result2: 3.5
x: 10
y: 14
final count: 7
```

**Trace and Explanation:**
1. `a / b` where both are `int` performs integer division: `7 / 2` yields `3`. Assigning to `double result1` performs widening to `3.0`.
2. `(double) a / b` casts `a` to `7.0` first, so `7.0 / 2` performs floating-point division yielding `3.5`.
3. `count++ * 2`: post-increment uses current value `5` in multiplication ($5 	imes 2 = 10$), then increments `count` to `6`. So `x = 10`.
4. `++count * 2`: pre-increment increments `count` from 6 to `7` first, then multiplies ($7 	imes 2 = 14$). So `y = 14`.
5. Final value of `count` is `7`.

**Rubric:**
- 3 pts: Exact match of printed output lines
- 3 pts: Accurate step-by-step trace and justification

**Common pitfalls:**
- Expecting `a / b` to produce 3.5 simply because `result1` is declared as double, or mixing up pre-increment and post-increment timings.


## Section I: Debug & Extend Real-World Exam Scenarios
Scope: Multi-part capstone questions mirroring university exam debugging and programming problems. In Part 1, students analyze a buggy Java program, identifying exact line numbers, error types (syntax vs semantic), and specific fixes. In Part 2, students extend the corrected architecture with additional robust object-oriented capabilities, exception handling, and graphical user interface controls.

### Q096
- id: Q096
- section: I
- type: debug-extend
- difficulty: hard
- topic: arrays
- points: 14
- time_minutes: 18
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
This question consists of two parts:
**Part 1: Debugging (6 marks)**
Examine the following `StudentGradeTracker` class which has 3 deliberate errors (2 syntax, 1 semantic). Identify each error, state its line number, classify it, explain why it is an error, and provide the exact correction.

**Code:**
```java
public class StudentGradeTracker {
    private String studentName;
    private double[] scores

    public studentGradeTracker(String studentName, double[] scores) {
        this.studentName = studentName;
        this.scores = scores;
    }

    public double calculateAverage() {
        if (scores.length == 0) return 0.0;
        double sum = 0.0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        return sum / (scores.length - 1);
    }
}
```

**Part 2: Extension (8 marks)**
Extend `StudentGradeTracker` with two new methods:
(a) `public int countPassed(double passMark)`: returns the number of scores in the array greater than or equal to `passMark`.
(b) `public double getHighestScore()`: returns the highest score in the array. If the array is empty, throws an `IllegalStateException("No scores available.")`.
Include a `main` method demonstrating the instantiation of the tracker with sample scores `{65.5, 82.0, 45.0, 91.5, 74.0}`, displaying the average, highest score, and number of passes at passMark 50.0.

**Answer key:**
| # | Line | Original code | Error type | Why it is an error | Corrected code |
|---|---|---|---|---|---|
| 1 | 3 | `private double[] scores` | syntax | Missing terminating semicolon `;` at the end of field declaration | `private double[] scores;` |
| 2 | 5 | `public studentGradeTracker(String studentName, double[] scores) {` | syntax | Constructors in Java must match the class name exactly (case-sensitive); otherwise the compiler treats it as a method with a missing return type | `public StudentGradeTracker(String studentName, double[] scores) {` |
| 3 | 16 | `return sum / (scores.length - 1);` | semantic | Dividing total sum by `scores.length - 1` computes an incorrect inflated average instead of dividing by `scores.length` | `return sum / scores.length;` |

**Reference solution:**
```java
public class StudentGradeTracker {
    private String studentName;
    private double[] scores;

    public StudentGradeTracker(String studentName, double[] scores) {
        this.studentName = studentName;
        this.scores = (scores != null) ? scores.clone() : new double[0];
    }

    public double calculateAverage() {
        if (scores == null || scores.length == 0) return 0.0;
        double sum = 0.0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }
        return sum / scores.length;
    }

    public int countPassed(double passMark) {
        int count = 0;
        for (double s : scores) {
            if (s >= passMark) {
                count++;
            }
        }
        return count;
    }

    public double getHighestScore() {
        if (scores.length == 0) {
            throw new IllegalStateException("No scores available.");
        }
        double max = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                max = scores[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        double[] sampleScores = {65.5, 82.0, 45.0, 91.5, 74.0};
        StudentGradeTracker tracker = new StudentGradeTracker("Adeola Adeyemi", sampleScores);

        System.out.println("Student: Adeola Adeyemi");
        System.out.printf("Average Score: %.2f%n", tracker.calculateAverage());
        System.out.printf("Highest Score: %.2f%n", tracker.getHighestScore());
        System.out.printf("Passes (>= 50.0): %d out of %d%n", tracker.countPassed(50.0), sampleScores.length);
    }
}
```

**Rubric:**
- Part 1 (6 pts): 2 pts per spotted error with accurate line, type, explanation, and fix
- Part 2 (8 pts):
  - 3 pts: `countPassed` method implementation
  - 3 pts: `getHighestScore` with empty array check and exception throw
  - 2 pts: Complete `main` demonstration with formatted output

**Common mistakes:**
- Missing case sensitivity in Java constructor names
- Dividing by `length - 1` instead of `length` in average calculation

### Q097
- id: Q097
- section: I
- type: debug-extend
- difficulty: hard
- topic: encapsulation
- points: 14
- time_minutes: 18
- source: variant-of-test
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
This question consists of two parts:
**Part 1: Debugging (6 marks)**
Examine the following `BankTransferService` class which contains 3 deliberate errors (1 syntax, 2 semantic). Identify each error, state its line number, classify it, explain why it is an error, and provide the exact correction.

**Code:**
```java
public class BankTransferService {
    private double balance;
    private static final double FEE_RATE = 0.015;

    public BankTransferService(double openingBalance) {
        this.balance = openingBalance;
    }

    public void transfer(double amount) throws
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds.");
        }
        double fee = amount * 0.15;
        balance -= (amount + fee);
    }
}
```

**Part 2: Extension (8 marks)**
Extend `BankTransferService` to enforce a daily cumulative transfer limit:
(a) Add private field `private double dailyTransferred = 0.0;` and a constant `public static final double DAILY_LIMIT = 500000.0;`.
(b) Update `transfer(double amount)`:
    - If `dailyTransferred + amount > DAILY_LIMIT`, throw an `IllegalStateException("Daily transfer limit of N500,000 exceeded.")`.
    - If valid, add `amount` to `dailyTransferred`.
(c) Add a method `public void resetDailyTransferred()` to reset the counter for a new business day.
(d) Include a `main` method demonstrating successful transfers, attempting a transfer exceeding the daily limit (handling the exception), and printing the final balance and daily total.

**Answer key:**
| # | Line | Original code | Error type | Why it is an error | Corrected code |
|---|---|---|---|---|---|
| 1 | 9 | `public void transfer(double amount) throws` | syntax | The `throws` clause is incomplete; since `IllegalArgumentException` is an unchecked exception, either omit `throws` or specify the exception class followed by opening brace `{` | `public void transfer(double amount) {` |
| 2 | 10 | `if (amount > balance) {` | semantic | The total required deduction includes the transfer fee (`amount + fee`); checking only `amount > balance` allows the fee to overdraw the balance | `double fee = amount * FEE_RATE; if (amount + fee > balance) {` |
| 3 | 13 | `double fee = amount * 0.15;` | semantic | Hardcoded factor `0.15` charges 15% instead of the defined class constant `FEE_RATE` (0.015 / 1.5%) | `double fee = amount * FEE_RATE;` |

**Reference solution:**
```java
public class BankTransferService {
    private double balance;
    private double dailyTransferred = 0.0;
    public static final double FEE_RATE = 0.015;
    public static final double DAILY_LIMIT = 500000.0;

    public BankTransferService(double openingBalance) {
        if (openingBalance < 0) {
            throw new IllegalArgumentException("Opening balance cannot be negative.");
        }
        this.balance = openingBalance;
    }

    public void transfer(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be positive.");
        }
        double fee = amount * FEE_RATE;
        if (amount + fee > balance) {
            throw new IllegalArgumentException("Insufficient funds: transfer and fee exceed available balance.");
        }
        if (dailyTransferred + amount > DAILY_LIMIT) {
            throw new IllegalStateException("Daily transfer limit of N500,000 exceeded.");
        }
        balance -= (amount + fee);
        dailyTransferred += amount;
        System.out.printf("Transferred N%,.2f (Fee: N%,.2f). Remaining Balance: N%,.2f%n", amount, fee, balance);
    }

    public void resetDailyTransferred() {
        this.dailyTransferred = 0.0;
        System.out.println("Daily transfer total reset to N0.00.");
    }

    public double getBalance() { return balance; }
    public double getDailyTransferred() { return dailyTransferred; }

    public static void main(String[] args) {
        BankTransferService service = new BankTransferService(750000.0);

        try {
            service.transfer(200000.0);
            service.transfer(250000.0);
            // This transfer would make dailyTransferred = 550,000 > 500,000
            service.transfer(100000.0);
        } catch (Exception ex) {
            System.err.println("Transfer Error: " + ex.getMessage());
        }

        System.out.printf("End of Day Balance: N%,.2f%n", service.getBalance());
        System.out.printf("Total Daily Transfers: N%,.2f%n", service.getDailyTransferred());
    }
}
```

**Rubric:**
- Part 1 (6 pts): 2 pts per spotted error with accurate line, type, explanation, and fix
- Part 2 (8 pts):
  - 3 pts: Daily limit tracking fields and validation logic
  - 2 pts: Daily reset method
  - 3 pts: Complete `main` driver handling exceptions and printing summary

**Common mistakes:**
- Forgetting to factor in the transfer fee when checking for sufficient balance
- Incomplete method signature with trailing `throws` keyword

### Q098
- id: Q098
- section: I
- type: debug-extend
- difficulty: hard
- topic: polymorphism
- points: 15
- time_minutes: 20
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
This question consists of two parts:
**Part 1: Debugging (6 marks)**
Examine the following geometry inheritance program which contains 3 deliberate errors (2 syntax, 1 semantic). Identify each error, state its line number, classify it, explain why it is an error, and provide the exact correction.

**Code:**
```java
abstract class Shape2D {
    protected String color;
    public Shape2D(String color) { this.color = color; }
    public abstract double getArea();
    public abstract void render() {
        System.out.println("Rendering shape");
    }
}

class Circle2D extends Shape2D {
    private double radius;
    public Circle2D(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override
    protected double getArea() {
        return Math.PI * radius * radius;
    }
}

class Triangle2D extends Shape2D {
    private double base;
    private double height;
    public Triangle2D(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }
    @Override
    public double getArea() {
        return (1 / 2) * base * height;
    }
}
```

**Part 2: Extension (9 marks)**
Extend this hierarchy:
(a) Define an interface `Scalable2D` with method `void scale(double factor)`.
(b) Make both `Circle2D` and `Triangle2D` implement `Scalable2D`:
    - `Circle2D.scale(factor)` scales `radius = radius * factor`.
    - `Triangle2D.scale(factor)` scales both `base = base * factor` and `height = height * factor`.
(c) In a driver class `ShapeScaleDemo`, write a polymorphic method `public static void displayAndScale(Shape2D[] shapes, double factor)` that iterates through an array of `Shape2D`, prints each shape's area before and after applying scaling.

**Answer key:**
| # | Line | Original code | Error type | Why it is an error | Corrected code |
|---|---|---|---|---|---|
| 1 | 5 | `public abstract void render() {` | syntax | Abstract methods cannot specify a body `{ ... }`; they must terminate with a semicolon `;` | `public abstract void render();` (or remove `abstract`) |
| 2 | 17 | `protected double getArea() {` | syntax | Cannot reduce the visibility of an inherited method from `public` in superclass `Shape2D` to `protected` in subclass `Circle2D` | `public double getArea() {` |
| 3 | 32 | `return (1 / 2) * base * height;` | semantic | `(1 / 2)` performs integer division which evaluates to `0`, causing `getArea()` to always return `0.0` | `return 0.5 * base * height;` |

**Reference solution:**
```java
abstract class Shape2D {
    protected String color;
    public Shape2D(String color) { this.color = color; }
    public abstract double getArea();
    public void render() {
        System.out.println("Rendering " + color + " shape of area: " + String.format("%.2f", getArea()));
    }
}

interface Scalable2D {
    void scale(double factor);
}

class Circle2D extends Shape2D implements Scalable2D {
    private double radius;
    public Circle2D(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    @Override
    public void scale(double factor) {
        this.radius *= factor;
    }
}

class Triangle2D extends Shape2D implements Scalable2D {
    private double base;
    private double height;
    public Triangle2D(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }
    @Override
    public double getArea() {
        return 0.5 * base * height;
    }
    @Override
    public void scale(double factor) {
        this.base *= factor;
        this.height *= factor;
    }
}

public class ShapeScaleDemo {
    public static void displayAndScale(Shape2D[] shapes, double factor) {
        for (Shape2D s : shapes) {
            System.out.printf("Before scale: Area = %.2f%n", s.getArea());
            if (s instanceof Scalable2D) {
                ((Scalable2D) s).scale(factor);
                System.out.printf("After scale (factor %.1fx): Area = %.2f%n", factor, s.getArea());
            }
            s.render();
            System.out.println("------------------------------------");
        }
    }

    public static void main(String[] args) {
        Shape2D[] shapes = {
            new Circle2D("Red", 5.0),
            new Triangle2D("Blue", 4.0, 6.0)
        };
        displayAndScale(shapes, 2.0);
    }
}
```

**Rubric:**
- Part 1 (6 pts): 2 pts per spotted error with accurate line, type, explanation, and fix
- Part 2 (9 pts):
  - 2 pts: `Scalable2D` interface declaration
  - 4 pts: `scale` implementations in `Circle2D` and `Triangle2D`
  - 3 pts: Polymorphic `displayAndScale` method using `instanceof` and casting

**Common mistakes:**
- Integer division in `(1/2) * b * h` evaluating to zero
- Reducing method visibility on override (`protected` instead of `public`)

### Q099
- id: Q099
- section: I
- type: debug-extend
- difficulty: hard
- topic: gui
- points: 15
- time_minutes: 20
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
This question consists of two parts:
**Part 1: Debugging (8 marks)**
Examine the following Swing GUI registration dialog which contains 4 deliberate errors (2 syntax, 2 semantic). Identify each error, state its line number, classify it, explain why it is an error, and provide the exact correction.

**Code:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CourseRegDialog extends JFrame {
    private JTextField codeField = new JTextField(10);
    private JTextField unitsField = new JTextField(5);
    private JButton submitBtn = new JButton("Register";
    private JLabel statusLabel = new JLabel("Status: Awaiting input");

    public CourseRegDialog() {
        setLayout(new FlowLayout());
        add(new JLabel("Course Code:"));
        add(codeField);
        add(new JLabel("Units:"));
        add(unitsField);
        add(submitBtn);
        add(statusLabel);

        submitBtn.addActionListener(new ActionListener() {
            public void actionPerformed(Event e) {
                String code = codeField.getText().trim();
                String unitStr = unitsField.getText().trim();
                if (code == "") {
                    statusLabel.setText("Error: code cannot be empty");
                    return;
                }
                int units = Integer.parseInt(unitStr);
                statusLabel.setText("Registered: " + code);
            }
        });
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }
}
```

**Part 2: Extension (7 marks)**
Extend `CourseRegDialog`:
(a) Add a `"Reset"` button (`JButton resetBtn`) next to `submitBtn`.
(b) Add an `ActionListener` to `resetBtn` that asks for user confirmation via `JOptionPane.showConfirmDialog(CourseRegDialog.this, "Are you sure you want to clear the form?", "Confirm Reset", JOptionPane.YES_NO_OPTION)`.
(c) If the user clicks Yes (`JOptionPane.YES_OPTION`), clear `codeField`, `unitsField`, and reset `statusLabel` to `"Status: Awaiting input"`.
(d) In `actionPerformed` of `submitBtn`, wrap `Integer.parseInt` in a `try-catch` block catching `NumberFormatException` to prevent unhandled runtime crashes, showing an error dialog if invalid.

**Answer key:**
| # | Line | Original code | Error type | Why it is an error | Corrected code |
|---|---|---|---|---|---|
| 1 | 8 | `private JButton submitBtn = new JButton("Register";` | syntax | Missing closing parenthesis `)` before the semicolon in component instantiation | `private JButton submitBtn = new JButton("Register");` |
| 2 | 21 | `public void actionPerformed(Event e) {` | syntax | `ActionListener.actionPerformed` takes parameter of type `ActionEvent`, not legacy AWT `Event` | `public void actionPerformed(ActionEvent e) {` |
| 3 | 24 | `if (code == "") {` | semantic | String content equality must be evaluated using `.isEmpty()` or `.equals("")`, not reference equality `==` | `if (code.isEmpty()) {` |
| 4 | 28 | `int units = Integer.parseInt(unitStr);` | semantic | Parsing user text without `try-catch` throws unhandled `NumberFormatException` if `unitStr` is non-numeric or empty | `try { int units = Integer.parseInt(unitStr); ... } catch (NumberFormatException ex) { ... }` |

**Reference solution:**
```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CourseRegDialog extends JFrame {
    private JTextField codeField = new JTextField(10);
    private JTextField unitsField = new JTextField(5);
    private JButton submitBtn = new JButton("Register");
    private JButton resetBtn = new JButton("Reset");
    private JLabel statusLabel = new JLabel("Status: Awaiting input");

    public CourseRegDialog() {
        super("Course Registration Dialog");
        setLayout(new FlowLayout());
        add(new JLabel("Course Code:"));
        add(codeField);
        add(new JLabel("Units:"));
        add(unitsField);
        add(submitBtn);
        add(resetBtn);
        add(statusLabel);

        submitBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String code = codeField.getText().trim();
                String unitStr = unitsField.getText().trim();

                if (code.isEmpty()) {
                    JOptionPane.showMessageDialog(CourseRegDialog.this,
                            "Course code cannot be empty.", "Validation Error", JOptionPane.ERROR_MESSAGE);
                    statusLabel.setText("Error: code cannot be empty");
                    return;
                }

                try {
                    int units = Integer.parseInt(unitStr);
                    if (units <= 0) {
                        JOptionPane.showMessageDialog(CourseRegDialog.this,
                                "Units must be greater than zero.", "Validation Error", JOptionPane.ERROR_MESSAGE);
                        statusLabel.setText("Error: invalid units");
                        return;
                    }
                    statusLabel.setText(String.format("Registered: %s (%d units)", code, units));
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(CourseRegDialog.this,
                            "Units must be a valid number.", "Format Error", JOptionPane.ERROR_MESSAGE);
                    statusLabel.setText("Error: numeric units required");
                }
            }
        });

        resetBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int confirm = JOptionPane.showConfirmDialog(CourseRegDialog.this,
                        "Are you sure you want to clear the form?", "Confirm Reset", JOptionPane.YES_NO_OPTION);
                if (confirm == JOptionPane.YES_OPTION) {
                    codeField.setText("");
                    unitsField.setText("");
                    statusLabel.setText("Status: Awaiting input");
                }
            }
        });

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new CourseRegDialog();
            }
        });
    }
}
```

**Rubric:**
- Part 1 (8 pts): 2 pts per spotted error with accurate line, type, explanation, and fix
- Part 2 (7 pts):
  - 2 pts: Adding Reset button to layout
  - 3 pts: Reset confirmation dialog handling (`YES_OPTION`)
  - 2 pts: Safe integer parsing with `try-catch` and error reporting

**Common mistakes:**
- Comparing Strings with `==` instead of `.equals()` or `.isEmpty()`
- Using `Event` instead of `ActionEvent` in `actionPerformed` parameter list

### Q100
- id: Q100
- section: I
- type: debug-extend
- difficulty: hard
- topic: custom-exceptions
- points: 15
- time_minutes: 20
- source: variant-of-test
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
This question consists of two parts:
**Part 1: Debugging (6 marks)**
Examine the following remittance batch audit engine which contains 3 deliberate errors (1 syntax, 2 semantic). Identify each error, state its line number, classify it, explain why it is an error, and provide the exact correction.

**Code:**
```java
public class RemittanceBatchEngine {
    private double totalDisbursed = 0.0;
    private double totalFees = 0.0;

    public void processBatch(double[] amounts) {
        for (int i = 0; i <= amounts.length; i++) {
            double amt = amounts[i]
            if (amt <= 0) {
                continue;
            }
            double fee = amt * 0.02;
            totalDisbursed += amt;
            totalFees = fee;
        }
    }
}
```

**Part 2: Extension (9 marks)**
Extend `RemittanceBatchEngine` with a custom audit export capability:
(a) Define a custom checked exception `AuditProcessingException` extending `Exception`.
(b) Add method `public String generateAuditSummary(String batchId) throws AuditProcessingException`:
    - If `batchId` is null or empty, throw `AuditProcessingException("Batch ID cannot be null or empty.")`.
    - If `totalDisbursed == 0.0`, throw `AuditProcessingException("No disbursements recorded for batch " + batchId)`.
    - Return a formatted multi-line summary string:
      ```text
      BATCH AUDIT REPORT [ID: <batchId>]
      Total Disbursed: N<totalDisbursed>
      Total Fees Collected: N<totalFees>
      Net Payout: N<totalDisbursed - totalFees>
      ```
(c) In `main`, process a batch with `{150000.0, 320000.0, -5000.0, 80000.0}`, generate and print the audit summary, and demonstrate handling `AuditProcessingException` with an invalid batch ID.

**Answer key:**
| # | Line | Original code | Error type | Why it is an error | Corrected code |
|---|---|---|---|---|---|
| 1 | 6 | `for (int i = 0; i <= amounts.length; i++) {` | semantic | Loop condition `i <= amounts.length` accesses index equal to length, causing runtime `ArrayIndexOutOfBoundsException` | `for (int i = 0; i < amounts.length; i++) {` |
| 2 | 7 | `double amt = amounts[i]` | syntax | Missing terminating semicolon `;` at the end of statement | `double amt = amounts[i];` |
| 3 | 13 | `totalFees = fee;` | semantic | Assignment `=` overwrites total fees with the fee of the last processed item instead of accumulating with `+=` | `totalFees += fee;` |

**Reference solution:**
```java
class AuditProcessingException extends Exception {
    public AuditProcessingException(String message) {
        super(message);
    }
}

public class RemittanceBatchEngine {
    private double totalDisbursed = 0.0;
    private double totalFees = 0.0;

    public void processBatch(double[] amounts) {
        if (amounts == null) return;
        for (int i = 0; i < amounts.length; i++) {
            double amt = amounts[i];
            if (amt <= 0) {
                continue;
            }
            double fee = amt * 0.02;
            totalDisbursed += amt;
            totalFees += fee;
        }
    }

    public String generateAuditSummary(String batchId) throws AuditProcessingException {
        if (batchId == null || batchId.trim().isEmpty()) {
            throw new AuditProcessingException("Batch ID cannot be null or empty.");
        }
        if (totalDisbursed == 0.0) {
            throw new AuditProcessingException("No disbursements recorded for batch " + batchId);
        }
        return String.format("BATCH AUDIT REPORT [ID: %s]%n"
                + "Total Disbursed: N%,.2f%n"
                + "Total Fees Collected: N%,.2f%n"
                + "Net Payout: N%,.2f",
                batchId, totalDisbursed, totalFees, (totalDisbursed - totalFees));
    }

    public double getTotalDisbursed() { return totalDisbursed; }
    public double getTotalFees() { return totalFees; }

    public static void main(String[] args) {
        RemittanceBatchEngine engine = new RemittanceBatchEngine();
        double[] batchData = {150000.0, 320000.0, -5000.0, 80000.0};
        engine.processBatch(batchData);

        try {
            String report = engine.generateAuditSummary("BATCH-2026-UI-01");
            System.out.println(report);
            System.out.println("------------------------------------");

            // Intentionally trigger exception
            engine.generateAuditSummary("");
        } catch (AuditProcessingException ex) {
            System.err.println("Audit Exception Caught: " + ex.getMessage());
        }
    }
}
```

**Rubric:**
- Part 1 (6 pts): 2 pts per spotted error with accurate line, type, explanation, and fix
- Part 2 (9 pts):
  - 2 pts: Custom checked exception `AuditProcessingException`
  - 4 pts: `generateAuditSummary` with validation checks and formatted report
  - 3 pts: Complete `main` driver handling exceptions and printing report

**Common mistakes:**
- Using `=` instead of `+=` for total accumulator
- Off-by-one loop bound `i <= array.length`


## Manifest

| id | section | type | difficulty | points | topic | source |
|---|---|---|---|---|---|---|
| Q001 | A | spot-error | easy | 3 | constructors | original |
| Q002 | A | spot-error | easy | 3 | constructors | variant-of-tutorial |
| Q003 | A | spot-error | easy | 3 | static-vs-instance | variant-of-tutorial |
| Q004 | A | spot-error | easy | 3 | inheritance | variant-of-test |
| Q005 | A | spot-error | easy | 3 | constructors | variant-of-test |
| Q006 | A | spot-error | easy | 3 | encapsulation | variant-of-test |
| Q007 | A | spot-error | medium | 4 | inheritance | variant-of-test |
| Q008 | A | spot-error | medium | 3 | encapsulation | original |
| Q009 | A | spot-error | medium | 3 | inheritance | variant-of-tutorial |
| Q010 | A | spot-error | medium | 3 | constructors | variant-of-slides |
| Q011 | A | spot-error | medium | 4 | encapsulation | original |
| Q012 | A | spot-error | medium | 4 | inheritance | variant-of-slides |
| Q013 | A | spot-error | medium | 3 | constructors | original |
| Q014 | A | spot-error | medium | 3 | modifiers | variant-of-slides |
| Q015 | A | spot-error | medium | 3 | static-vs-instance | variant-of-slides |
| Q016 | A | spot-error | hard | 4 | constructors | variant-of-slides |
| Q017 | A | spot-error | hard | 4 | inheritance | variant-of-slides |
| Q018 | A | spot-error | hard | 4 | encapsulation | variant-of-slides |
| Q019 | A | spot-error | hard | 4 | array-of-objects | variant-of-slides |
| Q020 | A | spot-error | hard | 4 | inheritance | variant-of-tutorial |
| Q021 | B | spot-error | easy | 3 | abstract-classes | variant-of-slides |
| Q022 | B | spot-error | easy | 3 | abstract-classes | variant-of-slides |
| Q023 | B | spot-error | easy | 3 | interfaces | variant-of-tutorial |
| Q024 | B | spot-error | easy | 3 | interfaces | variant-of-tutorial |
| Q025 | B | spot-error | medium | 3 | static-vs-instance | variant-of-slides |
| Q026 | B | spot-error | medium | 3 | abstract-classes | variant-of-test |
| Q027 | B | spot-error | medium | 4 | abstract-classes | variant-of-test |
| Q028 | B | spot-error | medium | 4 | polymorphism | original |
| Q029 | B | spot-error | medium | 3 | interfaces | variant-of-slides |
| Q030 | B | spot-error | medium | 3 | interfaces | variant-of-slides |
| Q031 | B | spot-error | hard | 4 | abstract-classes | variant-of-slides |
| Q032 | B | spot-error | hard | 4 | abstract-classes | variant-of-slides |
| Q033 | B | spot-error | hard | 4 | abstract-classes | variant-of-slides |
| Q034 | B | spot-error | hard | 4 | interfaces | variant-of-slides |
| Q035 | B | spot-error | hard | 4 | polymorphism | variant-of-slides |
| Q036 | C | spot-error | easy | 3 | arraylist-operations | original |
| Q037 | C | spot-error | easy | 3 | arraylist-operations | original |
| Q038 | C | spot-error | easy | 3 | exception-handling | variant-of-tutorial |
| Q039 | C | spot-error | easy | 4 | exception-handling | original |
| Q040 | C | spot-error | medium | 3 | arraylist-operations | variant-of-test |
| Q041 | C | spot-error | medium | 3 | encapsulation | variant-of-test |
| Q042 | C | spot-error | medium | 5 | exception-handling | variant-of-test |
| Q043 | C | spot-error | medium | 4 | custom-exceptions | variant-of-slides |
| Q044 | C | spot-error | medium | 3 | exception-handling | variant-of-slides |
| Q045 | C | spot-error | hard | 4 | custom-exceptions | original |
| Q046 | C | spot-error | hard | 4 | arraylist-operations | original |
| Q047 | C | spot-error | hard | 4 | exception-handling | original |
| Q048 | D | spot-error | easy | 3 | swing-components | original |
| Q049 | D | spot-error | easy | 3 | event-handling | original |
| Q050 | D | spot-error | easy | 3 | swing-components | original |
| Q051 | D | spot-error | easy | 3 | event-handling | original |
| Q052 | D | spot-error | medium | 4 | event-handling | variant-of-test |
| Q053 | D | spot-error | medium | 3 | swing-components | variant-of-slides |
| Q054 | D | spot-error | medium | 3 | swing-components | variant-of-assignment |
| Q055 | D | spot-error | medium | 4 | event-handling | variant-of-assignment |
| Q056 | D | spot-error | medium | 3 | event-handling | variant-of-assignment |
| Q057 | D | spot-error | hard | 5 | event-handling | variant-of-test |
| Q058 | D | spot-error | hard | 4 | swing-components | variant-of-test |
| Q059 | D | spot-error | hard | 4 | swing-components | original |
| Q060 | D | spot-error | hard | 4 | swing-components | variant-of-assignment |
| Q061 | E | write-code | easy | 8 | arrays | variant-of-slides |
| Q062 | E | write-code | easy | 8 | overloading | variant-of-slides |
| Q063 | E | write-code | easy | 8 | recursion | variant-of-slides |
| Q064 | E | write-code | easy | 8 | recursion | variant-of-slides |
| Q065 | E | write-code | medium | 10 | recursion | variant-of-slides |
| Q066 | E | write-code | medium | 10 | recursion | original |
| Q067 | E | write-code | medium | 10 | arrays | original |
| Q068 | E | write-code | medium | 10 | 2d-arrays | variant-of-slides |
| Q069 | E | write-code | medium | 10 | searching | original |
| Q070 | E | write-code | medium | 10 | sorting | original |
| Q071 | E | write-code | hard | 12 | sorting | original |
| Q072 | E | write-code | hard | 15 | sorting | variant-of-test |
| Q073 | F | write-code | easy | 8 | encapsulation | variant-of-slides |
| Q074 | F | write-code | medium | 10 | inheritance | variant-of-slides |
| Q075 | F | write-code | medium | 10 | inheritance | variant-of-slides |
| Q076 | F | write-code | medium | 10 | interfaces | variant-of-slides |
| Q077 | F | write-code | medium | 10 | hybrid-inheritance | variant-of-slides |
| Q078 | F | write-code | hard | 12 | abstract-classes | variant-of-slides |
| Q079 | F | write-code | hard | 12 | abstract-classes | variant-of-slides |
| Q080 | F | write-code | hard | 12 | abstract-classes | variant-of-test |
| Q081 | G | write-code | medium | 10 | collections | variant-of-slides |
| Q082 | G | write-code | hard | 12 | custom-exceptions | variant-of-slides |
| Q083 | G | write-code | medium | 12 | gui | variant-of-slides |
| Q084 | G | write-code | medium | 10 | collections | variant-of-slides |
| Q085 | G | write-code | hard | 14 | gui | variant-of-test |
| Q086 | H | predict-output | medium | 6 | inheritance | variant-of-slides |
| Q087 | H | predict-output | medium | 6 | polymorphism | variant-of-slides |
| Q088 | H | predict-output | hard | 6 | methods | variant-of-slides |
| Q089 | H | predict-output | easy | 6 | methods | variant-of-slides |
| Q090 | H | predict-output | hard | 6 | exceptions | variant-of-slides |
| Q091 | H | predict-output | medium | 6 | methods | variant-of-slides |
| Q092 | H | predict-output | medium | 6 | methods | variant-of-slides |
| Q093 | H | predict-output | hard | 6 | collections | variant-of-slides |
| Q094 | H | predict-output | medium | 6 | arrays | variant-of-slides |
| Q095 | H | predict-output | easy | 6 | methods | variant-of-slides |
| Q096 | I | debug-extend | hard | 14 | arrays | variant-of-test |
| Q097 | I | debug-extend | hard | 14 | encapsulation | variant-of-test |
| Q098 | I | debug-extend | hard | 15 | polymorphism | variant-of-test |
| Q099 | I | debug-extend | hard | 15 | gui | variant-of-test |
| Q100 | I | debug-extend | hard | 15 | custom-exceptions | variant-of-test |


## Study Order

This 2-day study plan is calibrated specifically for the University of Ibadan COS 202 (Advanced OOP in Java) practical exam. It balances syntax recognition, bug hunting, rigorous code writing, and timed mock simulation.

### Day 1: Foundations & Core Mechanics (Estimated: 7 hours)
The goal of Day 1 is mastering Java compiler syntax rules, constructor mechanics, basic inheritance, arrays, iterative sorting, and execution tracing.

- **Block 1 (08:00 – 10:15 | 2h 15m): Section A (Q001 – Q020)**
  - *Topic:* Student Records — Constructors, inheritance, getters/setters, basic arrays, `super()`, and method overriding.
  - *Focus:* Spotting missing return types, case-sensitive constructor spelling, semicolon omissions, and loop boundary errors.
- **Break (10:15 – 10:30 | 15m)**
- **Block 2 (10:30 – 12:15 | 1h 45m): Section B (Q021 – Q035)**
  - *Topic:* Payment Processing — Abstract classes vs interfaces, visibility reduction errors, and polymorphic references.
  - *Focus:* Enforcing abstract method signatures (no body `{}`), public interface methods, and surcharge/discount calculations.
- **Lunch & Rest (12:15 – 13:30 | 1h 15m)**
- **Block 3 (13:30 – 16:00 | 2h 30m): Section E (Q061 – Q072)**
  - *Topic:* Core Practical Programming — Arrays, 2D matrix multiplication, recursion (factorial, Fibonacci, powers), binary search, bubble sort, insertion sort, and selection sort.
  - *Focus:* Writing clean, compilable Java classes from scratch without IDE assistance. Pay special attention to Q072 (Selection Sort).
- **Break (16:00 – 16:30 | 30m)**
- **Block 4 (16:30 – 17:30 | 1h 00m): Section H Part 1 (Q086 – Q090)**
  - *Topic:* Mental Execution & Tracing — Constructor chaining order, static/instance block initialization sequence, field hiding vs overriding, string pool equality (`==` vs `.equals()`), and `try-catch-finally` return value flow.
  - *Focus:* Stepping through code line-by-line before running the JVM.

---

### Day 2: Advanced OOP, GUI Integration & Timed Mocks (Estimated: 8 hours)
The goal of Day 2 is mastering complex class hierarchies, custom exception hierarchies, event-driven Swing interfaces, multi-part debug/extend questions, and completing 3 full mock exams.

- **Block 5 (08:00 – 09:30 | 1h 30m): Section C (Q036 – Q047) & Section D (Q048 – Q060)**
  - *Topic:* University Members, Library System & Banking GUI — Checked vs unchecked exceptions, `ArrayList` manipulation, Swing components (`JFrame`, `JButton`, `JTextField`, `JTextArea`, `JScrollPane`), and `ActionListener` event dispatch.
  - *Focus:* Diagnosing missing UI additions (`frame.add()`), unparsed numeric fields, and misplaced catch blocks.
- **Break (09:30 – 09:45 | 15m)**
- **Block 6 (09:45 – 11:30 | 1h 45m): Section F (Q073 – Q080) & Section G (Q081 – Q085)**
  - *Topic:* OOP Design & Swing Forms — Multi-level inheritance, abstract class hierarchies, custom exception throwing, and writing complete GUI windows with validation dialogs.
  - *Focus:* Implementing `PaymentMethod` (Q080) and interactive course registration forms (Q083, Q085).
- **Block 7 (11:30 – 12:30 | 1h 00m): Section I (Q096 – Q100) & Section H Part 2 (Q091 – Q095)**
  - *Topic:* Capstone Debug & Extend — 2-part exam questions (error spotting followed by architectural extension) and advanced output prediction (widening vs boxing, object reference mutation, `List.remove(int)` vs `remove(Object)`).
- **Lunch & Rest (12:30 – 13:45 | 1h 15m)**
- **Block 8 (13:45 – 17:15 | 3h 30m): Full Mock Exam Simulation**
  - *13:45 – 14:55 (70m):* **Mock Paper 1** (Standard UI Exam Parity — 43 pts). Followed by 10m self-grading.
  - *15:05 – 16:15 (70m):* **Mock Paper 2** (Medium-Hard Variant — 43 pts). Followed by 10m self-grading.
  - *16:25 – 17:45 (80m):* **Mock Paper 3** (High-Difficulty Mastery — 50 pts). Followed by 10m self-grading.

---

### Last-Hour Rapid Review (60 Minutes Before the Exam)
1. **Review High-Frequency Syntax Traps:**
   - Case sensitivity in constructor names (e.g., `public student(...)` fails to compile because Java expects a return type).
   - Abstract methods terminating with a body `{ ... }` instead of a semicolon `;`.
   - Reducing visibility in overridden methods (e.g., `protected` overriding `public` triggers compile error).
   - Missing semicolons at the end of variable declarations or object instantiations.
2. **Review High-Frequency Semantic Traps:**
   - Integer division truncation: `(1 / 2) * base * height` evaluates to `0.0`; always write `0.5 * base * height`.
   - String equality using `==` instead of `.equals()` or `.isEmpty()`.
   - Off-by-one loop conditions: `for (int i = 0; i <= arr.length; i++)` triggers `ArrayIndexOutOfBoundsException`.
   - Forgetting to add Swing components to container: `frame.add(button)` or `frame.add(new JScrollPane(textArea))`.
3. **Review Your Personal Error Log:**
   - Open your local browser app, filter by "Incorrect / Needs Review", and re-solve the top 5 questions you missed during Day 1 and Day 2.

---

### Emergency Triage Protocol (If You Only Have 4 Hours)
If your exam is today or tomorrow morning and you only have 4 hours to prepare, follow this prioritized triage:
1. **Hour 1:** Solve **Mock Paper 1** under strict 60-minute time conditions. This exposes you to all three real test sections.
2. **Hour 2:** Study **Section A (Q001 – Q010)** and **Section B (Q021 – Q030)** answer keys. These represent 60% of all spot-error question formats.
3. **Hour 3:** Hand-write the code for **Q072 (SelectionSort)** and **Q080 (PaymentMethod Hierarchy)**. These two questions directly reflect the written programming questions on the University of Ibadan exam paper.
4. **Hour 4:** Walk through **Section H (Q086 – Q095)** to ensure you do not lose easy marks on output tracing and tricky Java corner cases.


## Mock Papers

The following three mock papers replicate the structure, timing, mark scheme, and question distribution of the official **University of Ibadan COS 202 Java Practical Code Test (05 October 2026 Session)**.

### Mock Paper Summary Schedule

| Mock | Part | Question IDs | Focus & Topics | Total Points | Suggested Minutes |
|---|---|---|---|---|---|
| **Mock 1** | Part 1 | Q001, Q003, Q006, Q011, Q036 | Student Records & Inheritance (Easy → Medium) | 16 pts | 27 min |
| **Mock 1** | Part 2 | Q021, Q023, Q038, Q048 | Payment Processing & Swing Button Window | 12 pts | 20 min |
| **Mock 1** | Part 3 | Q072 | Complete Program: Selection Sort Array | 15 pts | 20 min |
| *Mock 1 Total* | | *10 questions* | *Standard Exam Parity (Leans Medium)* | *43 pts* | *67 min* |
| **Mock 2** | Part 1 | Q002, Q007, Q012, Q026, Q041 | Student Hierarchies & Library Catalog (Medium) | 17 pts | 30 min |
| **Mock 2** | Part 2 | Q022, Q027, Q039, Q049 | Payment Surcharge & Event Handling Action Listener | 14 pts | 23 min |
| **Mock 2** | Part 3 | Q080 | Complete Program: PaymentMethod Class Hierarchy | 12 pts | 15 min |
| *Mock 2 Total* | | *10 questions* | *Challenging Practical (Leans Medium-Hard)* | *43 pts* | *68 min* |
| **Mock 3** | Part 1 | Q008, Q013, Q018, Q028, Q042 | Advanced OOP & Exception Handling (Hard) | 19 pts | 33 min |
| **Mock 3** | Part 2 | Q031, Q032, Q045, Q060 | Polymorphic Surcharges & ATM GUI Window | 16 pts | 31 min |
| **Mock 3** | Part 3 | Q099 | Debug & Extend: Course Registration Dialog with Reset | 15 pts | 20 min |
| *Mock 3 Total* | | *10 questions* | *Capstone Mastery (Leans Hard)* | *50 pts* | *84 min* |

---

### Mock Paper 1: Standard Exam Parity (Leans Medium)
*Target Time: 67 minutes | Total Marks: 43 points*

#### Instructions:
- **Parts 1 and 2:** Each code snippet contains deliberate errors. For every snippet: (1) identify each error and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code.
  - *Syntax error:* breaks the rules of Java so the code does not compile.
  - *Semantic error:* the code compiles but does not do what it should because the logic or meaning is wrong.
  - Assume all import statements are present and that any code not shown is correct.
- **Part 3:** Write a complete, compilable Java program as instructed.

#### Part 1: Student Records & Inheritance
- **Question 1.1:** [Q001](#q001) — `Person` class (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 1.2:** [Q003](#q003) — `Course` class attributes & getters (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 1.3:** [Q006](#q006) — `Person` class constructor chaining variant (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 1.4:** [Q011](#q011) — `Person` constructor parameter mapping (3 errors: 2 syntax, 1 semantic | 3 pts | 6 min)
- **Question 1.5:** [Q036](#q036) — `UniversityMember` base class hierarchy (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)

#### Part 2: Payment Processing & Windows
- **Question 2.1:** [Q021](#q021) — `PaymentMethod` abstract class (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 2.2:** [Q023](#q023) — `ProcessPayment` button action listener (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 2.3:** [Q038](#q038) — `StaffMember` constructor & inheritance (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 2.4:** [Q048](#q048) — `AccountInquiryWindow` Swing frame construction (3 errors: 1 syntax, 2 semantic | 2 pts | 4 min)

#### Part 3: Writing a Program
- **Question 3.1:** [Q072](#q072) — Selection Sort Complete Program (`SelectionSort` class with array allocation, random generation 10–99, sort method with swap, toString, and main pass tracer | 15 pts | 20 min)

---

### Mock Paper 2: Real Exam Parity (Leans Medium-Hard)
*Target Time: 68 minutes | Total Marks: 43 points*

#### Part 1: Student Hierarchies & Library Catalog
- **Question 1.1:** [Q002](#q002) — `Student` extends `Person` (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 1.2:** [Q007](#q007) — `Student` inheritance & department fields (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 1.3:** [Q012](#q012) — `Student` super constructor call (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 1.4:** [Q026](#q026) — `PaymentMethod` abstract class variant (3 errors: 2 syntax, 1 semantic | 2 pts | 5 min)
- **Question 1.5:** [Q041](#q041) — `LibraryCatalog` book search & exception throwing (3 errors: 1 syntax, 2 semantic | 3 pts | 7 min)

#### Part 2: Payment Surcharge & Event Handling
- **Question 2.1:** [Q022](#q022) — `CardPayment` and `CashPayment` subclasses (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 2.2:** [Q027](#q027) — `CardPayment` fee calculation and upper bounds (4 errors: 2 syntax, 2 semantic | 4 pts | 6 min)
- **Question 2.3:** [Q039](#q039) — `StudentMember` loan limit validation (3 errors: 1 syntax, 2 semantic | 3 pts | 5 min)
- **Question 2.4:** [Q049](#q049) — Transaction audit GUI action listener (3 errors: 1 syntax, 2 semantic | 3 pts | 6 min)

#### Part 3: Writing a Program
- **Question 3.1:** [Q080](#q080) — Complete OOP Hierarchy: `PaymentMethod`, `CardPayment`, `CashPayment` with upper bound validation, receipt generation, and polymorphic exception driver (12 pts | 15 min)

---

### Mock Paper 3: High-Difficulty Mastery (Leans Hard)
*Target Time: 84 minutes | Total Marks: 50 points*

#### Part 1: Advanced OOP & Exception Handling
- **Question 1.1:** [Q008](#q008) — `Course` class credit unit encapsulation (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 1.2:** [Q013](#q013) — `Course` class units validation (3 errors: 2 syntax, 1 semantic | 3 pts | 5 min)
- **Question 1.3:** [Q018](#q018) — `Person` & `Student` hierarchy with array copy (5 errors: 3 syntax, 2 semantic | 5 pts | 8 min)
- **Question 1.4:** [Q028](#q028) — `PaymentAuditService` polymorphic processing (4 errors: 2 syntax, 2 semantic | 4 pts | 7 min)
- **Question 1.5:** [Q042](#q042) — `BookLoan` return date calculation & overdue penalties (4 errors: 2 syntax, 2 semantic | 4 pts | 8 min)

#### Part 2: Polymorphic Surcharges & ATM GUI Window
- **Question 2.1:** [Q031](#q031) — `OnlineRemittance` abstract class with interface implementation (4 errors: 2 syntax, 2 semantic | 4 pts | 7 min)
- **Question 2.2:** [Q032](#q032) — `WireTransfer` & `MobileMoney` fee calculations (4 errors: 2 syntax, 2 semantic | 4 pts | 8 min)
- **Question 2.3:** [Q045](#q045) — `PatronRecord` fine calculation & book reservation limits (4 errors: 2 syntax, 2 semantic | 4 pts | 8 min)
- **Question 2.4:** [Q060](#q060) — `ATMWithdrawalWindow` with nested panels & balance verification (4 errors: 2 syntax, 2 semantic | 4 pts | 8 min)

#### Part 3: Debug & Extend Capstone
- **Question 3.1:** [Q099](#q099) — Debug & Extend: `CourseRegDialog` Swing GUI (Part 1: Spot & fix 4 errors in button creation, action listener, and String comparison; Part 2: Extend with confirmation Reset button and robust numeric validation | 15 pts | 20 min)
