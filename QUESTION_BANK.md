# COS 202 Question Bank (200 questions)

Java exam preparation for COS 202, University of Ibadan. Sections A to I, then the manifest, study order and six mock papers.

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

### Q101
- id: Q101
- section: A
- type: spot-error
- difficulty: easy
- topic: constructors
- points: 1
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 1 error (1 syntax, 0 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

The compiler reports that the constructor `Book(String)` cannot be found.

**Code:**
```java
public class Book {
    String title;
    public void Book(String t) {
        title = t;
    }
    public static void main(String[] args) {
        Book b = new Book("Java");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `public void Book(String t) {` | syntax | A constructor has no return type, not even `void`; with `void` it is an ordinary method, so no `Book(String)` constructor exists | `public Book(String t) {` |

**Reference solution:**
```java
public class Book {
    String title;
    public Book(String t) {
        title = t;
    }
    public static void main(String[] args) {
        Book b = new Book("Java");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Deleting the constructor and relying on the default one (then `new Book("Java")` still fails)
- Changing `new Book("Java")` instead of fixing the declaration

### Q102
- id: Q102
- section: A
- type: spot-error
- difficulty: easy
- topic: static vs instance
- points: 1
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 1 error (1 syntax, 0 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

Give two possible fixes (write one as the corrected code and describe the other).

**Code:**
```java
public class Desk {
    void announce(String name) {
        System.out.println("Welcome " + name);
    }
    public static void main(String[] args) {
        announce("Ngozi");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `announce("Ngozi");` | syntax | `announce` is an instance method and `main` is static, so it cannot be called without an object. Fix 1: create an object and call the method on it. Fix 2: declare the method `static void announce(String name)` and leave the call as it is | `new Desk().announce("Ngozi");` |

**Reference solution:**
```java
public class Desk {
    void announce(String name) {
        System.out.println("Welcome " + name);
    }
    public static void main(String[] args) {
        new Desk().announce("Ngozi");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making `main` non-static (the JVM then cannot start the program)
- Writing `Desk.announce("Ngozi")` without making the method static

### Q103
- id: Q103
- section: A
- type: spot-error
- difficulty: easy
- topic: methods
- points: 2
- time_minutes: 4
- source: original
- error_header: 2 errors (2 syntax, 0 semantic)

**Task:**
The snippet below contains 2 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Shelf {
    private int capacity;
    private int books;

    public Shelf(int capacity) {
        this.capacity = capacity;
    }

    public isFull() {
        return books >= capacity
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `public isFull() {` | syntax | Every method except a constructor needs a return type; `isFull` returns a condition, so `boolean` | `public boolean isFull() {` |
| 2 | 10 | `return books >= capacity` | syntax | Missing semicolon at the end of the statement | `return books >= capacity;` |

**Reference solution:**
```java
public class Shelf {
    private int capacity;
    private int books;

    public Shelf(int capacity) {
        this.capacity = capacity;
    }

    public boolean isFull() {
        return books >= capacity;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Using `void` as the return type (the method returns a value)
- Spotting the missing return type but not the semicolon

### Q104
- id: Q104
- section: A
- type: spot-error
- difficulty: easy
- topic: encapsulation
- points: 2
- time_minutes: 5
- source: variant-of-slides
- error_header: 2 errors (2 syntax, 0 semantic)

**Task:**
The snippet below contains 2 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Book {
    private String title;
    private double price;

    Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public double getPrice() {
        return price;
    }
}

public class Catalogue {
    public static void main(String[] args) {
        Book b = Book("Things Fall Apart", 3500.0);
        System.out.println(b.title + " costs " + b.price);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 21 | `Book b = Book("Things Fall Apart", 3500.0);` | syntax | Objects are created with the `new` keyword; without it Java looks for a method called `Book` | `Book b = new Book("Things Fall Apart", 3500.0);` |
| 2 | 22 | `System.out.println(b.title + " costs " + b.price);` | syntax | `title` and `price` are private, so another class must use the public getters | `System.out.println(b.getTitle() + " costs " + b.getPrice());` |

**Reference solution:**
```java
class Book {
    private String title;
    private double price;

    Book(String title, double price) {
        this.title = title;
        this.price = price;
    }

    public String getTitle() {
        return title;
    }

    public double getPrice() {
        return price;
    }
}

public class Catalogue {
    public static void main(String[] args) {
        Book b = new Book("Things Fall Apart", 3500.0);
        System.out.println(b.getTitle() + " costs " + b.getPrice());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making the fields `public` (breaks encapsulation; the getters already exist)
- Fixing only the `new` error

### Q105
- id: Q105
- section: A
- type: spot-error
- difficulty: easy
- topic: String comparison
- points: 1
- time_minutes: 4
- source: original
- error_header: 1 error (0 syntax, 1 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class LoginDesk {
    private String password;

    public LoginDesk(String password) {
        this.password = password;
    }

    // returns true when the typed password matches the stored one
    public boolean check(String attempt) {
        return attempt == password;
    }

    public static void main(String[] args) {
        LoginDesk d = new LoginDesk("lib123");
        String typed = new String("lib123");
        System.out.println(d.check(typed));
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `return attempt == password;` | semantic | `==` compares object references, not text. `typed` is a different String object, so the program prints `false` instead of `true`; use `equals` | `return attempt.equals(password);` |

**Reference solution:**
```java
public class LoginDesk {
    private String password;

    public LoginDesk(String password) {
        this.password = password;
    }

    // returns true when the typed password matches the stored one
    public boolean check(String attempt) {
        return attempt.equals(password);
    }

    public static void main(String[] args) {
        LoginDesk d = new LoginDesk("lib123");
        String typed = new String("lib123");
        System.out.println(d.check(typed));
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Calling it a syntax error (the code compiles and runs)
- Writing `password.equals(attempt)` is also fine; writing `attempt = password` is not

### Q106
- id: Q106
- section: A
- type: spot-error
- difficulty: medium
- topic: constructors
- points: 3
- time_minutes: 6
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Customer {
    private String fullName;

    public customer(String fullName) {
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
| 1 | 4 | `public customer(String fullName) {` | syntax | Constructor name must match the class name exactly, including capital letters | `public Customer(String fullName) {` |
| 2 | 9 | `return fullName` | syntax | Missing semicolon | `return fullName;` |
| 3 | 13 | `fullName = fullName;` | semantic | The parameter shadows the field, so the parameter is assigned to itself and the field is never changed; `this.` is needed | `this.fullName = fullName;` |

**Reference solution:**
```java
public class Customer {
    private String fullName;

    public Customer(String fullName) {
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
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Treating the constructor typo as a semantic error because the rest of the code looks fine
- Writing `fullName = this.fullName` (backwards)

### Q107
- id: Q107
- section: A
- type: spot-error
- difficulty: medium
- topic: inheritance
- points: 4
- time_minutes: 8
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Account {
    private String owner;
    public Account(String owner) {
        this.owner = owner;
    }
}

public class SavingsAccount extend Account {
    private double rate; // percentage, e.g. 5 means 5%
    private ArrayList<Double> history;

    public SavingsAccount(String owner, double rate) {
        this.rate = rate;
        super(owner);
    }

    public void record(double amount) {
        history.add(amount);
    }

    public double interest(double balance) {
        return balance * rate;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `public class SavingsAccount extend Account {` | syntax | The keyword is `extends`, not `extend` | `public class SavingsAccount extends Account {` |
| 2 | 10 | `private ArrayList<Double> history;` | semantic | The list is never created, so `record` throws a NullPointerException; initialise it | `private ArrayList<Double> history = new ArrayList<>();` |
| 3 | 13-14 | `this.rate = rate;`<br>`super(owner);` | syntax | `super(...)` must be the first statement in a constructor | `super(owner);`<br>`this.rate = rate;` |
| 4 | 22 | `return balance * rate;` | semantic | `rate` is a percentage (see the comment), so the interest must be divided by 100 | `return balance * rate / 100;` |

**Reference solution:**
```java
class Account {
    private String owner;
    public Account(String owner) {
        this.owner = owner;
    }
}

public class SavingsAccount extends Account {
    private double rate; // percentage, e.g. 5 means 5%
    private ArrayList<Double> history = new ArrayList<>();

    public SavingsAccount(String owner, double rate) {
        super(owner);
        this.rate = rate;
    }

    public void record(double amount) {
        history.add(amount);
    }

    public double interest(double balance) {
        return balance * rate / 100;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing `super` by deleting it (Account has no no-argument constructor)
- Declaring the list inside `record` as a local variable

### Q108
- id: Q108
- section: A
- type: spot-error
- difficulty: medium
- topic: encapsulation
- points: 3
- time_minutes: 6
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Transaction {
    private String reference;
    private Int amount;
    private String type;

    public Transaction(String reference, int amount, String type) {
        this.reference = reference;
        this.amount = amount;
        this.type = type
    }

    public int getAmount() {
        return amount;
    }

    public String getType() {
        return reference;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `private Int amount;` | syntax | `Int` is not a Java type; the primitive is `int` | `private int amount;` |
| 2 | 9 | `this.type = type` | syntax | Missing semicolon | `this.type = type;` |
| 3 | 17 | `return reference;` | semantic | `getType` returns the reference number instead of the transaction type | `return type;` |

**Reference solution:**
```java
public class Transaction {
    private String reference;
    private int amount;
    private String type;

    public Transaction(String reference, int amount, String type) {
        this.reference = reference;
        this.amount = amount;
        this.type = type;
    }

    public int getAmount() {
        return amount;
    }

    public String getType() {
        return type;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing `Int` to `Integer` and also changing the constructor
- Saying the getter is a syntax error because it compiles fine

### Q109
- id: Q109
- section: A
- type: spot-error
- difficulty: medium
- topic: multilevel inheritance
- points: 3
- time_minutes: 7
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Employee {
    protected String name;
    Employee(String name) {
        this.name = name;
    }
}

class Manager extends Employee {
    protected int teamSize;
    Manager(String name, int teamSize) {
        super(name);
        this.teamSize = 0;
    }
}

public class SeniorManager extends Employee {
    private double bonus;
    SeniorManager(String name, int teamSize, double bonus) {
        super(name, teamSize);
        this.bonus = bonus;
    }
    public String describe() {
        return name + " leads " + teamSize + " staff, bonus " + bonus
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `this.teamSize = 0;` | semantic | The constructor ignores its `teamSize` parameter and always stores 0 | `this.teamSize = teamSize;` |
| 2 | 16 | `public class SeniorManager extends Employee {` | syntax | Multilevel chain Employee, Manager, SeniorManager: `SeniorManager` must extend `Manager`, otherwise `super(name, teamSize)` and `teamSize` do not exist | `public class SeniorManager extends Manager {` |
| 3 | 23 | `return name + " leads " + teamSize + " staff, bonus " + bonus` | syntax | Missing semicolon | `return name + " leads " + teamSize + " staff, bonus " + bonus;` |

**Reference solution:**
```java
class Employee {
    protected String name;
    Employee(String name) {
        this.name = name;
    }
}

class Manager extends Employee {
    protected int teamSize;
    Manager(String name, int teamSize) {
        super(name);
        this.teamSize = teamSize;
    }
}

public class SeniorManager extends Manager {
    private double bonus;
    SeniorManager(String name, int teamSize, double bonus) {
        super(name, teamSize);
        this.bonus = bonus;
    }
    public String describe() {
        return name + " leads " + teamSize + " staff, bonus " + bonus;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing `super(name, teamSize)` to `super(name)` instead of fixing the extends clause
- Missing that `this.teamSize = 0` compiles but loses the data

### Q110
- id: Q110
- section: A
- type: spot-error
- difficulty: medium
- topic: constructors and methods
- points: 3
- time_minutes: 7
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Account {
    private double balance;

    public Account(double opening) {
        balance = opening;
    }

    public void deposit(double amount) {
        balance = amount;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) {
            return false;
        }
        balance -= amount;
    }
}

public class Branch {
    public static void main(String[] args) {
        Account a = new Account();
        a.deposit(500);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `balance = amount;` | semantic | A deposit must add to the balance, not replace it | `balance += amount;` |
| 2 | 17 | `}` | syntax | The method returns `boolean`, but the path that completes a withdrawal has no `return` (missing return statement) | `return true;`<br>`}` |
| 3 | 22 | `Account a = new Account();` | syntax | Once a parameterised constructor is written, Java no longer supplies the no-argument constructor; pass an opening balance (or add a no-argument constructor) | `Account a = new Account(0.0);` |

**Reference solution:**
```java
class Account {
    private double balance;

    public Account(double opening) {
        balance = opening;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) {
            return false;
        }
        balance -= amount;
        return true;
    }
}

public class Branch {
    public static void main(String[] args) {
        Account a = new Account(0.0);
        a.deposit(500);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Reporting the missing return on line 16 instead of at the end of the method
- Forgetting the default constructor disappears when another constructor exists

### Q111
- id: Q111
- section: A
- type: spot-error
- difficulty: medium
- topic: inheritance and encapsulation
- points: 3
- time_minutes: 7
- source: variant-of-assignment
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Person {
    private String name;
    public Person(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
public class Patient extends Person {
    private String ward;
    public Patient(String name, String ward) {
        this.ward = ward;
    }
    public String summary() {
        return name + " is in " + ward;
    }
    public void transfer(String newWard) {
        newWard = ward;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 13 | `this.ward = ward;` | syntax | `Person` has no no-argument constructor, so the `Patient` constructor must call `super(name)` explicitly (as its first statement) | `super(name);`<br>`this.ward = ward;` |
| 2 | 16 | `return name + " is in " + ward;` | syntax | `name` is private in `Person`; the subclass must use the public getter | `return getName() + " is in " + ward;` |
| 3 | 19 | `newWard = ward;` | semantic | The assignment is backwards: the field must receive the new ward, not the other way round | `ward = newWard;` |

**Reference solution:**
```java
class Person {
    private String name;
    public Person(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}
public class Patient extends Person {
    private String ward;
    public Patient(String name, String ward) {
        super(name);
        this.ward = ward;
    }
    public String summary() {
        return getName() + " is in " + ward;
    }
    public void transfer(String newWard) {
        ward = newWard;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making `name` protected in Person instead of using the getter (allowed, but the fix asked for is in Patient)
- Adding a no-argument constructor to Person, which loses the name

### Q112
- id: Q112
- section: A
- type: spot-error
- difficulty: medium
- topic: static and this
- points: 3
- time_minutes: 7
- source: original
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Ward {
    private int beds;
    private int occupied;
    private static int totalWards = 0;

    public Ward(int beds) {
        this.beds = beds;
        totalWards++;
    }

    public void admit() {
        int occupied = this.occupied + 1;
    }

    // a ward is full when no free bed remains
    public boolean isFull() {
        return occupied > beds;
    }

    public static int getTotalWards() {
        return this.totalWards;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `int occupied = this.occupied + 1;` | semantic | The local variable `occupied` shadows the field, so the field is never increased | `occupied++;` |
| 2 | 17 | `return occupied > beds;` | semantic | The ward is already full when `occupied` equals `beds`, so `>=` is needed | `return occupied >= beds;` |
| 3 | 21 | `return this.totalWards;` | syntax | `this` cannot be used in a static method; a static field is used by its name | `return totalWards;` |

**Reference solution:**
```java
public class Ward {
    private int beds;
    private int occupied;
    private static int totalWards = 0;

    public Ward(int beds) {
        this.beds = beds;
        totalWards++;
    }

    public void admit() {
        occupied++;
    }

    // a ward is full when no free bed remains
    public boolean isFull() {
        return occupied >= beds;
    }

    public static int getTotalWards() {
        return totalWards;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Writing `int occupied++` inside admit
- Removing `static` from getTotalWards (changes the design and breaks Ward.getTotalWards())

### Q113
- id: Q113
- section: A
- type: spot-error
- difficulty: medium
- topic: overriding
- points: 3
- time_minutes: 7
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Staff {
    protected String name;
    public Staff(String name) {
        this.name = name;
    }
    public String role() {
        return "Staff";
    }
    public double salary() {
        return 50000;
    }
}

public class Nurse extends Staff {
    public Nurse(String name) {
        super(name);
    }
    String role() {
        return super.role + " Nurse";
    }
    // a nurse earns 10% more than base staff
    public double salary() {
        return super.salary() * 0.1;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 18 | `String role() {` | syntax | An overriding method cannot have weaker access than the method it overrides (`public` in Staff, package-private here) | `public String role() {` |
| 2 | 19 | `return super.role + " Nurse";` | syntax | `role` is a method, so the call needs parentheses: `super.role()` | `return super.role() + " Nurse";` |
| 3 | 23 | `return super.salary() * 0.1;` | semantic | 10% more than the base is `* 1.1`; `* 0.1` returns only 10% of it | `return super.salary() * 1.1;` |

**Reference solution:**
```java
class Staff {
    protected String name;
    public Staff(String name) {
        this.name = name;
    }
    public String role() {
        return "Staff";
    }
    public double salary() {
        return 50000;
    }
}

public class Nurse extends Staff {
    public Nurse(String name) {
        super(name);
    }
    public String role() {
        return super.role() + " Nurse";
    }
    // a nurse earns 10% more than base staff
    public double salary() {
        return super.salary() * 1.1;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing Staff.role() to package-private instead of fixing the override
- Writing `super.role` without parentheses and calling it a semantic error

### Q114
- id: Q114
- section: A
- type: spot-error
- difficulty: hard
- topic: ArrayList field and loops
- points: 4
- time_minutes: 9
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Doctor {
    private String name;
    private ArrayList<String> patients;

    public Doctor(String name) {
        this.name = name;
    }

    public void assign(String patient) {
        return patients.add(patient);
    }

    public boolean handles(String patient) {
        for (int p : patients) {
            if (p.equals(patient)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `this.name = name;` | semantic | The `patients` list is never created, so `assign` throws a NullPointerException; create it in the constructor | `this.name = name;`<br>`patients = new ArrayList<>();` |
| 2 | 10 | `return patients.add(patient);` | syntax | A `void` method cannot return a value | `patients.add(patient);` |
| 3 | 14 | `for (int p : patients) {` | syntax | The list holds Strings, so the loop variable must be a `String`, not an `int` | `for (String p : patients) {` |
| 4 | 17-19 | `} else {`<br>`return false;`<br>`}` | semantic | The `else` returns `false` after checking only the first patient; the method should return `false` only after the whole list has been searched | `}` |

**Reference solution:**
```java
public class Doctor {
    private String name;
    private ArrayList<String> patients;

    public Doctor(String name) {
        this.name = name;
        patients = new ArrayList<>();
    }

    public void assign(String patient) {
        patients.add(patient);
    }

    public boolean handles(String patient) {
        for (String p : patients) {
            if (p.equals(patient)) {
                return true;
            }
        }
        return false;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Declaring the list again as a local variable inside the constructor
- Keeping the else-branch but moving the final return

### Q115
- id: Q115
- section: A
- type: spot-error
- difficulty: hard
- topic: constructor chaining
- points: 3
- time_minutes: 9
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Appointment {
    private String patient;
    private int slot;
    public Appointment(String patient, int slot) {
        this.patient = patient;
        this.slot = slot;
    }

    public Appointment(String patient) {
        System.out.println("Quick booking");
        this(patient, 1);
    }

    public boolean isFor(String name) {
        return patient = name;
    }

    // slots run from 1 to 24
    public void reschedule(int newSlot) {
        if (newSlot < 1 && newSlot > 24) {
            return;
        }
        slot = newSlot;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10-11 | `System.out.println("Quick booking");`<br>`this(patient, 1);` | syntax | `this(...)` must be the first statement in a constructor | `this(patient, 1);`<br>`System.out.println("Quick booking");` |
| 2 | 15 | `return patient = name;` | syntax | `=` assigns and gives a String, but the method must return a boolean; compare with `equals` | `return patient.equals(name);` |
| 3 | 20 | `if (newSlot < 1 && newSlot > 24) {` | semantic | No number is both below 1 and above 24, so the check never rejects anything; `\|\|` is needed | `if (newSlot < 1 \|\| newSlot > 24) {` |

**Reference solution:**
```java
public class Appointment {
    private String patient;
    private int slot;
    public Appointment(String patient, int slot) {
        this.patient = patient;
        this.slot = slot;
    }

    public Appointment(String patient) {
        this(patient, 1);
        System.out.println("Quick booking");
    }

    public boolean isFor(String name) {
        return patient.equals(name);
    }

    // slots run from 1 to 24
    public void reschedule(int newSlot) {
        if (newSlot < 1 || newSlot > 24) {
            return;
        }
        slot = newSlot;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Writing `patient == name` (compiles, but compares references)
- Using `&&` with `>= 1` and `<= 24` without flipping the branch

### Q116
- id: Q116
- section: A
- type: spot-error
- difficulty: hard
- topic: objects and encapsulation
- points: 3
- time_minutes: 8
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Car {
    private int speed = 0;
    private String plate;

    Car(String plate) {
        this.plate = plate;
    }

    void accelerate(int by) {
        speed =+ by;
    }

    int getSpeed() {
        return speed;
    }
}

public class Garage {
    public static void main(String[] args) {
        Car c = new car("KJA-123");
        c.accelerate(80);
        System.out.println(c.speed);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `speed =+ by;` | semantic | `=+` is read as `speed = +by`, which replaces the speed instead of increasing it | `speed += by;` |
| 2 | 20 | `Car c = new car("KJA-123");` | syntax | Java is case-sensitive: the class is `Car`, not `car` | `Car c = new Car("KJA-123");` |
| 3 | 22 | `System.out.println(c.speed);` | syntax | `speed` is private in `Car`; use the getter | `System.out.println(c.getSpeed());` |

**Reference solution:**
```java
class Car {
    private int speed = 0;
    private String plate;

    Car(String plate) {
        this.plate = plate;
    }

    void accelerate(int by) {
        speed += by;
    }

    int getSpeed() {
        return speed;
    }
}

public class Garage {
    public static void main(String[] args) {
        Car c = new Car("KJA-123");
        c.accelerate(80);
        System.out.println(c.getSpeed());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Treating `=+` as a syntax error (it compiles)
- Changing `speed` to public

### Q117
- id: Q117
- section: A
- type: spot-error
- difficulty: hard
- topic: overriding
- points: 3
- time_minutes: 9
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Product {
    protected double basePrice;
    public Product(double basePrice) {
        this.basePrice = basePrice;
    }
    public double price() {
        return basePrice;
    }
}

public class SaleProduct extends Product {
    private double discount; // percent, e.g. 10 means 10%

    public SaleProduct(double basePrice, double discount) {
        super(basePrice);
        this.discount = discount;
    }

    // price after discount
    @Overide
    public int price() {
        return basePrice * discount / 100;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 20 | `@Overide` | syntax | The annotation is spelled `@Override`; `@Overide` is an unknown symbol | `@Override` |
| 2 | 21 | `public int price() {` | syntax | An override must keep a compatible return type; `int` is not compatible with `double` | `public double price() {` |
| 3 | 22 | `return basePrice * discount / 100;` | semantic | That expression is the discount amount; the price after discount is the base price minus it | `return basePrice - basePrice * discount / 100;` |

**Reference solution:**
```java
class Product {
    protected double basePrice;
    public Product(double basePrice) {
        this.basePrice = basePrice;
    }
    public double price() {
        return basePrice;
    }
}

public class SaleProduct extends Product {
    private double discount; // percent, e.g. 10 means 10%

    public SaleProduct(double basePrice, double discount) {
        super(basePrice);
        this.discount = discount;
    }

    // price after discount
    @Override
    public double price() {
        return basePrice - basePrice * discount / 100;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Casting the result to int to keep `int price()`
- Fixing only the annotation

### Q118
- id: Q118
- section: A
- type: spot-error
- difficulty: hard
- topic: validation in setters
- points: 3
- time_minutes: 9
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Room {
    private int number;
    private int capacity;

    public Room(int number, int capacity) {
        this.number = number;
        setCapacity(capacity);
    }

    public Room(Room other) {
        number = other.number;
        capacity = other.capacity
    }

    // a hostel room holds 1 to 4 students
    public void setCapacity(int capacity) {
        if (capacity < 1 || capacity > 4) {
            this.capacity = capacity;
        }
    }

    public void getCapacity() {
        return capacity;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `capacity = other.capacity` | syntax | Missing semicolon | `capacity = other.capacity;` |
| 2 | 17 | `if (capacity < 1 \|\| capacity > 4) {` | semantic | The condition is inverted: it stores only the invalid values; valid means at least 1 and at most 4 | `if (capacity >= 1 && capacity <= 4) {` |
| 3 | 22 | `public void getCapacity() {` | syntax | A getter that returns a value cannot be `void` (the compiler reports it at line 23, `return capacity;`; accept either line as long as the fix is the return type) | `public int getCapacity() {` |

**Reference solution:**
```java
public class Room {
    private int number;
    private int capacity;

    public Room(int number, int capacity) {
        this.number = number;
        setCapacity(capacity);
    }

    public Room(Room other) {
        number = other.number;
        capacity = other.capacity;
    }

    // a hostel room holds 1 to 4 students
    public void setCapacity(int capacity) {
        if (capacity >= 1 && capacity <= 4) {
            this.capacity = capacity;
        }
    }

    public int getCapacity() {
        return capacity;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Deleting `return capacity;` instead of fixing the return type
- Writing `capacity > 1 && capacity < 4`, which wrongly rejects 1 and 4

### Q119
- id: Q119
- section: A
- type: spot-error
- difficulty: hard
- topic: inheritance and overriding
- points: 4
- time_minutes: 10
- source: original
- error_header: 4 errors (3 syntax, 1 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class Resident {
    protected String name;
    protected int roomNo;
    Resident(String name, int roomNo) {
        this.name = name;
        this.roomNo = roomNo;
    }
    String details() {
        return name + " in room " + roomNo;
    }
}
public class Fresher extends Resident {
    private boolean paid;
    Fresher(String name, int roomNo) {
        super(name, roomNo);
        paid == false;
    }
    String details() {
        return details() + " (fresher)";
    }
    public static void main(String[] args) {
        Resident r = new Fresher("Tola");
        System.out.println(r.details);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 16 | `paid == false;` | syntax | `==` is a comparison, and a comparison alone is not a statement; initialisation needs `=` | `paid = false;` |
| 2 | 19 | `return details() + " (fresher)";` | semantic | `details()` calls itself forever (StackOverflowError); call the parent version with `super` | `return super.details() + " (fresher)";` |
| 3 | 22 | `Resident r = new Fresher("Tola");` | syntax | The only `Fresher` constructor takes a name and a room number | `Resident r = new Fresher("Tola", 12);` |
| 4 | 23 | `System.out.println(r.details);` | syntax | `details` is a method; it needs parentheses | `System.out.println(r.details());` |

**Reference solution:**
```java
class Resident {
    protected String name;
    protected int roomNo;
    Resident(String name, int roomNo) {
        this.name = name;
        this.roomNo = roomNo;
    }
    String details() {
        return name + " in room " + roomNo;
    }
}
public class Fresher extends Resident {
    private boolean paid;
    Fresher(String name, int roomNo) {
        super(name, roomNo);
        paid = false;
    }
    String details() {
        return super.details() + " (fresher)";
    }
    public static void main(String[] args) {
        Resident r = new Fresher("Tola", 12);
        System.out.println(r.details());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Missing that line 19 compiles but recurses forever
- Adding a one-argument constructor instead of fixing the call

### Q120
- id: Q120
- section: A
- type: spot-error
- difficulty: hard
- topic: logic in methods
- points: 4
- time_minutes: 10
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Block {
    private String name;
    private int rooms;
    private int occupied;
    public Block(String name, int rooms) {
        this.name = name;
        this.rooms = rooms;
    }
    public String getName() {
        return this.Name;
    }
    // a block cannot hold more students than it has rooms
    public void occupy() {
        if (occupied <= rooms) {
            occupied++
        }
    }
    // percentage of rooms still free
    public double vacancy() {
        return (rooms - occupied) / rooms * 100;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `return this.Name;` | syntax | Field names are case-sensitive; the field is `name`, not `Name` | `return this.name;` |
| 2 | 14 | `if (occupied <= rooms) {` | semantic | With `<=` the block accepts one student too many; it must stop when `occupied` equals `rooms` | `if (occupied < rooms) {` |
| 3 | 15 | `occupied++` | syntax | Missing semicolon | `occupied++;` |
| 4 | 20 | `return (rooms - occupied) / rooms * 100;` | semantic | Integer division truncates `(rooms - occupied) / rooms` to 0 (or 1) before multiplying; force floating-point arithmetic | `return (rooms - occupied) * 100.0 / rooms;` |

**Reference solution:**
```java
public class Block {
    private String name;
    private int rooms;
    private int occupied;
    public Block(String name, int rooms) {
        this.name = name;
        this.rooms = rooms;
    }
    public String getName() {
        return this.name;
    }
    // a block cannot hold more students than it has rooms
    public void occupy() {
        if (occupied < rooms) {
            occupied++;
        }
    }
    // percentage of rooms still free
    public double vacancy() {
        return (rooms - occupied) * 100.0 / rooms;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Writing `(double)((rooms - occupied) / rooms) * 100`, which still divides integers first
- Counting `<=` as a syntax error

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

### Q121
- id: Q121
- section: B
- type: spot-error
- difficulty: easy
- topic: overriding and access
- points: 1
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 1 error (1 syntax, 0 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

The compiler reports that `switchOn()` in `Heater` cannot override `switchOn()` in `Appliance` because it attempts to assign weaker access privileges.

**Code:**
```java
class Appliance {
    public void switchOn() {
        System.out.println("Appliance on");
    }
}
class Heater extends Appliance {
    void switchOn() {
        System.out.println("Heater on");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `void switchOn() {` | syntax | An overriding method may not have weaker access than the method it overrides; `public` in `Appliance` means `public` in `Heater` | `public void switchOn() {` |

**Reference solution:**
```java
class Appliance {
    public void switchOn() {
        System.out.println("Appliance on");
    }
}
class Heater extends Appliance {
    public void switchOn() {
        System.out.println("Heater on");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing `Appliance.switchOn()` to package access instead of fixing the subclass
- Adding `@Override` and thinking that fixes the access problem

### Q122
- id: Q122
- section: B
- type: spot-error
- difficulty: easy
- topic: interfaces
- points: 1
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 1 error (1 syntax, 0 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
interface Billable {
    double bill();
}
class RoomCharge extends Billable {
    public double bill() {
        return 45000.0;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `class RoomCharge extends Billable {` | syntax | A class implements an interface; `extends` between a class and an interface is not allowed | `class RoomCharge implements Billable {` |

**Reference solution:**
```java
interface Billable {
    double bill();
}
class RoomCharge implements Billable {
    public double bill() {
        return 45000.0;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing `interface Billable` into a class
- Writing `implement` instead of `implements`

### Q123
- id: Q123
- section: B
- type: spot-error
- difficulty: easy
- topic: default methods
- points: 1
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 1 error (1 syntax, 0 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

The interface does not compile (JDK 8 or later).

**Code:**
```java
interface Lockable {
    void lock();
    void unlock() {
        System.out.println("Door unlocked");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `void unlock() {` | syntax | An interface method with a body must be declared `default` (or `static`); otherwise it must end with a semicolon and have no body | `default void unlock() {` |

**Reference solution:**
```java
interface Lockable {
    void lock();
    default void unlock() {
        System.out.println("Door unlocked");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making the interface `abstract`
- Adding `public` but not `default`

### Q124
- id: Q124
- section: B
- type: spot-error
- difficulty: medium
- topic: final and static
- points: 3
- time_minutes: 5
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`getCount()` must report how many `Item` objects have been created, an item's code must never change after creation, and `PerishableItem` must be allowed to inherit from `Item`.

**Code:**
```java
final class Item {
    private static int count = 0;
    private final String code = "N/A";
    public Item(String code) {
        this.code = code;
        count = 1;
    }
    public static int getCount() {
        return count;
    }
}
class PerishableItem extends Item {
    public PerishableItem(String code) {
        super(code);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `final class Item {` | syntax | A `final` class cannot be extended, but `PerishableItem extends Item` | `class Item {` |
| 2 | 3 | `private final String code = "N/A";` | syntax | A final field that is already initialised cannot be assigned again in the constructor; leave it blank so the constructor assigns it once | `private final String code;` |
| 3 | 6 | `count = 1;` | semantic | The counter is reset to 1 on every construction; it must increase by one each time an object is created | `count++;` |

**Reference solution:**
```java
class Item {
    private static int count = 0;
    private final String code;
    public Item(String code) {
        this.code = code;
        count++;
    }
    public static int getCount() {
        return count;
    }
}
class PerishableItem extends Item {
    public PerishableItem(String code) {
        super(code);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Removing `final` from the field instead of removing the initial value
- Writing `this.count++` and thinking the reset is fixed by `this`

### Q125
- id: Q125
- section: B
- type: spot-error
- difficulty: medium
- topic: abstract classes
- points: 3
- time_minutes: 5
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class StockMovement {
    protected int quantity;
    protected String status = "PENDING";

    public String printNote() {
        return "Movement: "
            + getClass().getSimpleName()
            + "\nQuantity: " + status
            + "\nStatus: " + quantity;
    }

    public abstract void apply(int qty) { }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `public class StockMovement {` | syntax | A class that declares an abstract method must itself be declared `abstract` | `public abstract class StockMovement {` |
| 2 | 8-9 | `+ "\nQuantity: " + status`<br>`+ "\nStatus: " + quantity;` | semantic | The values are swapped: the `Quantity` label prints the status and the `Status` label prints the quantity | `+ "\nQuantity: " + quantity`<br>`+ "\nStatus: " + status;` |
| 3 | 12 | `public abstract void apply(int qty) { }` | syntax | An abstract method has no body; it ends with a semicolon | `public abstract void apply(int qty);` |

**Reference solution:**
```java
public abstract class StockMovement {
    protected int quantity;
    protected String status = "PENDING";

    public String printNote() {
        return "Movement: "
            + getClass().getSimpleName()
            + "\nQuantity: " + quantity
            + "\nStatus: " + status;
    }

    public abstract void apply(int qty);
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Removing `abstract` from the method instead of declaring the class abstract
- Missing the swapped values because the code compiles

### Q126
- id: Q126
- section: B
- type: spot-error
- difficulty: medium
- topic: abstract classes and interfaces
- points: 3
- time_minutes: 6
- source: variant-of-test
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
abstract class StockMovement {
    protected int quantity;
    protected String status = "PENDING";
    public abstract void apply(int qty);
}
class Delivery extends StockMovement {
    @Override
    public void apply(int qty) {
        quantity = qty;
        status = "RECEIVED";
    }
}
class Dispatch implements StockMovement {
    @Override
    public void apply(double qty) {
        if (qty < 500) {
            throw new IllegalArgumentException("Cannot dispatch more than 500 units at once.");
        }
        quantity = qty;
        status = "SENT";
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 13 | `class Dispatch implements StockMovement {` | syntax | `StockMovement` is a class, so a subclass uses `extends`; `implements` is for interfaces | `class Dispatch extends StockMovement {` |
| 2 | 15 | `public void apply(double qty) {` | syntax | `@Override` requires the same parameter list as the abstract method `apply(int)`; `double` is an overload, so nothing is overridden (and `quantity = qty` would lose precision) | `public void apply(int qty) {` |
| 3 | 16 | `if (qty < 500) {` | semantic | The error message says more than 500 units is not allowed, so the exception must be thrown when `qty` is greater than 500 | `if (qty > 500) {` |

**Reference solution:**
```java
abstract class StockMovement {
    protected int quantity;
    protected String status = "PENDING";
    public abstract void apply(int qty);
}
class Delivery extends StockMovement {
    @Override
    public void apply(int qty) {
        quantity = qty;
        status = "RECEIVED";
    }
}
class Dispatch extends StockMovement {
    @Override
    public void apply(int qty) {
        if (qty > 500) {
            throw new IllegalArgumentException("Cannot dispatch more than 500 units at once.");
        }
        quantity = qty;
        status = "SENT";
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Keeping `double qty` and casting `quantity = (int) qty`
- Treating `<` versus `>` as a syntax error

### Q127
- id: Q127
- section: B
- type: spot-error
- difficulty: medium
- topic: abstract classes
- points: 3
- time_minutes: 6
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`calculateSalary()` returns the annual salary. A `FullTimeEmployee` is created with a monthly salary and a `PartTimeEmployee` with a weekly pay (52 weeks a year).

**Code:**
```java
abstract class Employee {
    public abstract double calculateSalary();
}
class FullTimeEmployee extends Employee {
    private double monthly;
    public FullTimeEmployee(double monthly) {
        this.monthly = monthly;
    }
    public double calculateSalary() {
        return monthly / 12;
    }
}
class PartTimeEmployee extends Employee {
    private double weekly;
    public PartTimeEmployee(double weekly) {
        this.weekly = weekly;
    }
}
public class Payroll {
    public static void main(String[] args) {
        Employee e = new Employee();
        System.out.println(e.calculateSalary());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `return monthly / 12;` | semantic | An annual salary is twelve monthly salaries, so multiply by 12; dividing gives a twelfth of one month | `return monthly * 12;` |
| 2 | 18 | `}` | syntax | A concrete subclass of an abstract class must implement every abstract method; `PartTimeEmployee` never implements `calculateSalary()` | `public double calculateSalary() {`<br>`return weekly * 52;`<br>`}`<br>`}` |
| 3 | 21 | `Employee e = new Employee();` | syntax | An abstract class cannot be instantiated with `new`; create a concrete subclass object (an `Employee` reference may hold it) | `Employee e = new FullTimeEmployee(300000);` |

**Reference solution:**
```java
abstract class Employee {
    public abstract double calculateSalary();
}
class FullTimeEmployee extends Employee {
    private double monthly;
    public FullTimeEmployee(double monthly) {
        this.monthly = monthly;
    }
    public double calculateSalary() {
        return monthly * 12;
    }
}
class PartTimeEmployee extends Employee {
    private double weekly;
    public PartTimeEmployee(double weekly) {
        this.weekly = weekly;
    }
    public double calculateSalary() {
        return weekly * 52;
    }
}
public class Payroll {
    public static void main(String[] args) {
        Employee e = new FullTimeEmployee(300000);
        System.out.println(e.calculateSalary());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making `PartTimeEmployee` abstract, which only moves the problem to the `new` call
- Declaring `Employee e = new PartTimeEmployee(...)` and forgetting it still needs the missing method

### Q128
- id: Q128
- section: B
- type: spot-error
- difficulty: medium
- topic: interfaces
- points: 3
- time_minutes: 6
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`amountDue()` must return the amount plus tax at `TAX_RATE`, for both classes.

**Code:**
```java
interface Payable {
    double TAX_RATE = 0.075;
    double amountDue();
}
class Invoice implements Payable {
    private double amount;
    public Invoice(double amount) {
        this.amount = amount;
    }
    double amountDue() {
        return amount + amount * TAX_RATE;
    }
}
class Subscription implements Payable {
    private double monthlyFee;
    private int months;
    public Subscription(double monthlyFee, int months) {
        this.monthlyFee = monthlyFee;
        this.months = months;
        TAX_RATE = 0.05;
    }
    public double amountDue() {
        return monthlyFee * months;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `double amountDue() {` | syntax | Interface methods are implicitly `public`; an implementation with default (package) access is weaker access and does not compile | `public double amountDue() {` |
| 2 | 20 | `TAX_RATE = 0.05;` | syntax | Interface fields are implicitly `public static final`; a constant cannot be reassigned | (delete) |
| 3 | 23 | `return monthlyFee * months;` | semantic | The tax is left out; `amountDue()` must be the amount plus tax, as in `Invoice` | `return monthlyFee * months * (1 + TAX_RATE);` |

**Reference solution:**
```java
interface Payable {
    double TAX_RATE = 0.075;
    double amountDue();
}
class Invoice implements Payable {
    private double amount;
    public Invoice(double amount) {
        this.amount = amount;
    }
    public double amountDue() {
        return amount + amount * TAX_RATE;
    }
}
class Subscription implements Payable {
    private double monthlyFee;
    private int months;
    public Subscription(double monthlyFee, int months) {
        this.monthlyFee = monthlyFee;
        this.months = months;
    }
    public double amountDue() {
        return monthlyFee * months * (1 + TAX_RATE);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Declaring `TAX_RATE` non-final in the interface (interface fields are always final)
- Fixing the access of `Subscription` (already public) instead of `Invoice`

### Q129
- id: Q129
- section: B
- type: spot-error
- difficulty: medium
- topic: default methods and upcasting
- points: 3
- time_minutes: 6
- source: variant-of-slides
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

Each interface's `move()` must print the action its name describes, and `Duck` must be able to fly and swim.

**Code:**
```java
interface Flyable {
    default void move() {
        System.out.println("Flying");
    }
}
interface Swimmable {
    default void move() {
        System.out.println("Flying");
    }
}
class Duck implements Flyable, Swimmable {
    public void describe() {
        System.out.println("Duck can fly and swim");
    }
}
public class Zoo {
    public static void main(String[] args) {
        Flyable f = new Duck();
        f.move();
        f.describe();
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `System.out.println("Flying");` | semantic | Copy-and-paste slip: the `Swimmable` version of `move()` must print `Swimming` | `System.out.println("Swimming");` |
| 2 | 15 | `}` | syntax | `Duck` inherits two unrelated default methods named `move()`, so it must override `move()` itself (it may delegate with `Flyable.super.move()`) | `public void move() {`<br>`Flyable.super.move();`<br>`}`<br>`}` |
| 3 | 20 | `f.describe();` | syntax | `f` has the static type `Flyable`, which has no `describe()`; cast the reference to `Duck` first | `((Duck) f).describe();` |

**Reference solution:**
```java
interface Flyable {
    default void move() {
        System.out.println("Flying");
    }
}
interface Swimmable {
    default void move() {
        System.out.println("Swimming");
    }
}
class Duck implements Flyable, Swimmable {
    public void describe() {
        System.out.println("Duck can fly and swim");
    }
    public void move() {
        Flyable.super.move();
    }
}
public class Zoo {
    public static void main(String[] args) {
        Flyable f = new Duck();
        f.move();
        ((Duck) f).describe();
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making one of the two default methods `abstract` instead of overriding in `Duck`
- Calling `describe()` through `Flyable` and changing the variable type to `Duck` without noticing it is a different fix

### Q130
- id: Q130
- section: B
- type: spot-error
- difficulty: medium
- topic: final and static
- points: 3
- time_minutes: 6
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

Exactly 3 `Animal` objects must be created and counted, and no animal may change how it breathes.

**Code:**
```java
class Animal {
    private static int total;
    public Animal() {
        total++;
    }
    public final void breathe() {
        System.out.println("Breathing");
    }
    public static int getTotal() {
        return total;
    }
}
class Lion extends Animal {
    public void breathe() {
        System.out.println("Lion breathing");
    }
}
public class Safari {
    public static void main(String[] args) {
        for (int i = 0; i <= 3; i++) {
            new Lion();
        }
        System.out.println(getTotal());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 14-16 | `public void breathe() {`<br>`System.out.println("Lion breathing");`<br>`}` | syntax | `breathe()` is `final` in `Animal`, so `Lion` cannot override it | (delete) |
| 2 | 20 | `for (int i = 0; i <= 3; i++) {` | semantic | `<=` runs the loop four times (0, 1, 2, 3); three objects need `< 3` | `for (int i = 0; i < 3; i++) {` |
| 3 | 23 | `System.out.println(getTotal());` | syntax | `getTotal()` is a static method of `Animal`; `Safari` is not a subclass, so it must be called as `Animal.getTotal()` | `System.out.println(Animal.getTotal());` |

**Reference solution:**
```java
class Animal {
    private static int total;
    public Animal() {
        total++;
    }
    public final void breathe() {
        System.out.println("Breathing");
    }
    public static int getTotal() {
        return total;
    }
}
class Lion extends Animal {
}
public class Safari {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            new Lion();
        }
        System.out.println(Animal.getTotal());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Removing `final` from `Animal.breathe()` (the task says no animal may change breathing)
- Calling `new Lion().getTotal()` after creating an extra object, which changes the count

### Q131
- id: Q131
- section: B
- type: spot-error
- difficulty: hard
- topic: abstract classes and casting
- points: 5
- time_minutes: 8
- source: original
- error_header: 5 errors (4 syntax, 1 semantic)

**Task:**
The snippet below contains 5 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

The program must print who operates and the doctor's monthly pay.

**Code:**
```java
abstract class Staff {
    protected String name;
    Staff(String name) {
        name = name;
    }
    abstract double pay();
}
class Doctor extends Staff {
    Doctor(String name) {
        this.name = name;
    }
    int pay() {
        return 900000;
    }
    void operate() {
        System.out.println(name + " operates");
    }
}
public class Ward {
    public static void main(String[] args) {
        Staff s = new Staff("Ade");
        s.operate();
        System.out.println(s.pay());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `name = name;` | semantic | Assigns the parameter to itself; the field `name` stays `null`, so the program prints `null operates` | `this.name = name;` |
| 2 | 10 | `this.name = name;` | syntax | `Staff` has no no-argument constructor, so `Doctor`'s constructor must start with `super(name)`; assigning the field is not enough | `super(name);` |
| 3 | 12 | `int pay() {` | syntax | An overriding method needs a compatible return type; the abstract method returns `double` | `double pay() {` |
| 4 | 21 | `Staff s = new Staff("Ade");` | syntax | `Staff` is abstract and cannot be instantiated; create a `Doctor` and keep the `Staff` reference | `Staff s = new Doctor("Ade");` |
| 5 | 22 | `s.operate();` | syntax | `operate()` exists only in `Doctor`; the `Staff` reference must be cast before calling it | `((Doctor) s).operate();` |

**Reference solution:**
```java
abstract class Staff {
    protected String name;
    Staff(String name) {
        this.name = name;
    }
    abstract double pay();
}
class Doctor extends Staff {
    Doctor(String name) {
        super(name);
    }
    double pay() {
        return 900000;
    }
    void operate() {
        System.out.println(name + " operates");
    }
}
public class Ward {
    public static void main(String[] args) {
        Staff s = new Doctor("Ade");
        ((Doctor) s).operate();
        System.out.println(s.pay());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Declaring `Staff s` as `Doctor s` and not noticing the abstract `new` is still wrong
- Seeing `super(name)` as optional because `Staff` has a constructor

### Q132
- id: Q132
- section: B
- type: spot-error
- difficulty: hard
- topic: interfaces, abstract and final
- points: 5
- time_minutes: 8
- source: original
- error_header: 5 errors (4 syntax, 1 semantic)

**Task:**
The snippet below contains 5 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`RATE` is the charge per day, so a ward bill is `RATE` for each day. No subclass may change how `setDays` stores the days.

**Code:**
```java
interface Billable {
    double RATE = 2500.0;
    double bill(int days);
}
abstract class Admission {
    protected int days;
    public final void setDays(int days) {
        this.days = days;
    }
    public abstract String ward();
}
class GeneralAdmission extends Admission, Billable {
    double bill(int days) {
        RATE = 3000.0;
        return RATE + days;
    }
    public void setDays(int days) {
        this.days = days + 1;
    }
    public String ward() {
        return "General";
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 12 | `class GeneralAdmission extends Admission, Billable {` | syntax | A class extends only one class; the interface goes after `implements` | `class GeneralAdmission extends Admission implements Billable {` |
| 2 | 13 | `double bill(int days) {` | syntax | An implementation of an interface method must be `public` | `public double bill(int days) {` |
| 3 | 14 | `RATE = 3000.0;` | syntax | `RATE` is an interface constant (`public static final`) and cannot be assigned | (delete) |
| 4 | 15 | `return RATE + days;` | semantic | The bill is `RATE` for each day, so multiply; adding gives 2500 plus the number of days | `return RATE * days;` |
| 5 | 17-19 | `public void setDays(int days) {`<br>`this.days = days + 1;`<br>`}` | syntax | `setDays` is `final` in `Admission`, so `GeneralAdmission` cannot override it | (delete) |

**Reference solution:**
```java
interface Billable {
    double RATE = 2500.0;
    double bill(int days);
}
abstract class Admission {
    protected int days;
    public final void setDays(int days) {
        this.days = days;
    }
    public abstract String ward();
}
class GeneralAdmission extends Admission implements Billable {
    public double bill(int days) {
        return RATE * days;
    }
    public String ward() {
        return "General";
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Removing `final` from `Admission.setDays`, which breaks the task rule
- Removing `implements Billable` instead of fixing the heading

### Q133
- id: Q133
- section: B
- type: spot-error
- difficulty: hard
- topic: static and final
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (3 syntax, 1 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`sell` must throw an `IllegalArgumentException` when the quantity asked for is more than the stock, and each pharmacy keeps its own stock.

**Code:**
```java
public class Pharmacy {
    private int stock = 100;
    private static final double VAT = 0.075;
    private static int sales = 0;

    public static void sell(int qty) {
        if (qty < stock) {
            throw new IllegalArgumentException("Not enough stock");
        }
        stock -= qty;
        sales++;
        VAT = 0.05;
    }

    public static double priceWithVat(double price) {
        return price + price * VAT;
    }

    public static void main(String[] args) {
        sell(10);
        Pharmacy p = new Pharmacy();
        System.out.println(p.priceWithVat(200) + " " + sales);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `public static void sell(int qty) {` | syntax | `sell` uses the instance field `stock`; a static method cannot, so `sell` must be an instance method | `public void sell(int qty) {` |
| 2 | 7 | `if (qty < stock) {` | semantic | The exception message says there is not enough stock, so it must be thrown when `qty` is greater than `stock` | `if (qty > stock) {` |
| 3 | 12 | `VAT = 0.05;` | syntax | `VAT` is `static final` and cannot be reassigned | (delete) |
| 4 | 20-21 | `sell(10);`<br>`Pharmacy p = new Pharmacy();` | syntax | `sell` is now an instance method, so `main` needs an object first and must call `p.sell(10)` | `Pharmacy p = new Pharmacy();`<br>`p.sell(10);` |

**Reference solution:**
```java
public class Pharmacy {
    private int stock = 100;
    private static final double VAT = 0.075;
    private static int sales = 0;

    public void sell(int qty) {
        if (qty > stock) {
            throw new IllegalArgumentException("Not enough stock");
        }
        stock -= qty;
        sales++;
    }

    public static double priceWithVat(double price) {
        return price + price * VAT;
    }

    public static void main(String[] args) {
        Pharmacy p = new Pharmacy();
        p.sell(10);
        System.out.println(p.priceWithVat(200) + " " + sales);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Making `stock` static instead (the task says each pharmacy keeps its own stock)
- Fixing `sell` but still calling `sell(10)` from `main` without an object

### Q134
- id: Q134
- section: B
- type: spot-error
- difficulty: hard
- topic: interface default and static methods
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (3 syntax, 1 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

`isValid` must be true only for a non-null, non-empty member id, and the loan period of 14 days must be printed, not changed.

**Code:**
```java
interface Borrowable {
    int MAX_DAYS = 14;
    void borrow(String member);
    default double fine(int daysLate) {
        return daysLate * 50;
    }
    static boolean isValid(String id) {
        return id != null || !id.isEmpty();
    }
}
class Book implements Borrowable {
    void borrow(String member) {
        if (Borrowable.isValid(member)) {
            System.out.println(member + " borrowed");
        }
    }
}
public class Desk {
    public static void main(String[] args) {
        Borrowable b = new Book();
        b.borrow("UI/CSC/001");
        System.out.println(b.isValid("x"));
        Borrowable.MAX_DAYS = 21;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `return id != null \|\| !id.isEmpty();` | semantic | With `\|\|` a null id still evaluates `id.isEmpty()` and throws `NullPointerException`; both conditions must hold, so use `&&` | `return id != null && !id.isEmpty();` |
| 2 | 12 | `void borrow(String member) {` | syntax | The implementation of an interface method must be `public` | `public void borrow(String member) {` |
| 3 | 22 | `System.out.println(b.isValid("x"));` | syntax | A static interface method is not inherited and can only be called through the interface name | `System.out.println(Borrowable.isValid("x"));` |
| 4 | 23 | `Borrowable.MAX_DAYS = 21;` | syntax | Interface fields are `public static final`; the constant cannot be assigned, only printed | `System.out.println(Borrowable.MAX_DAYS);` |

**Reference solution:**
```java
interface Borrowable {
    int MAX_DAYS = 14;
    void borrow(String member);
    default double fine(int daysLate) {
        return daysLate * 50;
    }
    static boolean isValid(String id) {
        return id != null && !id.isEmpty();
    }
}
class Book implements Borrowable {
    public void borrow(String member) {
        if (Borrowable.isValid(member)) {
            System.out.println(member + " borrowed");
        }
    }
}
public class Desk {
    public static void main(String[] args) {
        Borrowable b = new Book();
        b.borrow("UI/CSC/001");
        System.out.println(Borrowable.isValid("x"));
        System.out.println(Borrowable.MAX_DAYS);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Calling `((Book) b).isValid("x")`, which is still illegal for a static interface method
- Making `MAX_DAYS` a non-final variable inside the interface

### Q135
- id: Q135
- section: B
- type: spot-error
- difficulty: hard
- topic: abstract classes and interfaces
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (3 syntax, 1 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

A score of 50 or more is a pass. `main` must print the pass or fail result of a 65 score through a `Printable` reference.

**Code:**
```java
interface Printable {
    void print();
}
abstract class Result implements Printable {
    protected int score;
    public Result(int score) {
        this.score = score;
    }
    public abstract String grade();
}
class CourseResult extends Result {
    public CourseResult(int score) {
        super(score);
    }
    String grade() {
        return score < 50 ? "PASS" : "FAIL";
    }
}
public class Portal {
    public static void main(String[] args) {
        Printable p = new Result(65);
        p.print();
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 15 | `String grade() {` | syntax | The abstract method in `Result` is `public`; the override cannot have weaker access | `public String grade() {` |
| 2 | 16 | `return score < 50 ? "PASS" : "FAIL";` | semantic | The condition is reversed: 50 or more must give `PASS` | `return score >= 50 ? "PASS" : "FAIL";` |
| 3 | 18 | `}` | syntax | `CourseResult` is concrete but never implements `print()` from `Printable`; `Result` is abstract so it did not have to | `public void print() {`<br>`System.out.println(score + " " + grade());`<br>`}`<br>`}` |
| 4 | 21 | `Printable p = new Result(65);` | syntax | `Result` is abstract and cannot be instantiated; create a `CourseResult` | `Printable p = new CourseResult(65);` |

**Reference solution:**
```java
interface Printable {
    void print();
}
abstract class Result implements Printable {
    protected int score;
    public Result(int score) {
        this.score = score;
    }
    public abstract String grade();
}
class CourseResult extends Result {
    public CourseResult(int score) {
        super(score);
    }
    public String grade() {
        return score >= 50 ? "PASS" : "FAIL";
    }
    public void print() {
        System.out.println(score + " " + grade());
    }
}
public class Portal {
    public static void main(String[] args) {
        Printable p = new CourseResult(65);
        p.print();
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Adding `print()` to the abstract `Result` and not noticing the weaker-access `grade()`
- Declaring `CourseResult` abstract to silence the compiler

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

### Q136
- id: Q136
- section: C
- type: spot-error
- difficulty: easy
- topic: throw vs throws
- points: 2
- time_minutes: 3
- source: variant-of-tutorial
- error_header: 2 errors (2 syntax, 0 semantic)

**Task:**
The snippet below contains 2 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

This snippet contains two errors, and they are on different lines.

**Code:**
```java
public class ScoreChecker {
    public static void check(int score) throw IllegalArgumentException {
        if (score < 0 || score > 100) {
            throws new IllegalArgumentException("Score must be between 0 and 100");
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 2 | `public static void check(int score) throw IllegalArgumentException {` | syntax | `throw` is the statement keyword; a method signature declares exceptions with `throws` | `public static void check(int score) throws IllegalArgumentException {` |
| 2 | 4 | `throws new IllegalArgumentException("Score must be between 0 and 100");` | syntax | `throws` only appears in a method signature; to raise an exception inside the body use `throw new ...` | `throw new IllegalArgumentException("Score must be between 0 and 100");` |

**Reference solution:**
```java
public class ScoreChecker {
    public static void check(int score) throws IllegalArgumentException {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Score must be between 0 and 100");
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing only one of the two keywords
- Swapping both keywords the wrong way round

### Q137
- id: Q137
- section: C
- type: spot-error
- difficulty: easy
- topic: remove(int) vs remove(Object)
- points: 1
- time_minutes: 3
- source: original
- error_header: 1 error (0 syntax, 1 semantic)

**Task:**
The snippet below contains 1 deliberate error. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

The code compiles. Say what is wrong with the intended behaviour described by the comment.

**Code:**
```java
public class ScoreEditor {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(70);
        scores.add(40);
        scores.add(55);
        // remove the score 40 from the list
        scores.remove(40);
        System.out.println(scores);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `scores.remove(40);` | semantic | `remove(40)` is the `remove(int index)` overload, so it tries to delete the element at index 40 and throws IndexOutOfBoundsException; to delete the value 40 you must pass an Integer object | `scores.remove(Integer.valueOf(40));` |

**Reference solution:**
```java
public class ScoreEditor {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(70);
        scores.add(40);
        scores.add(55);
        // remove the score 40 from the list
        scores.remove(Integer.valueOf(40));
        System.out.println(scores);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Believing the code does not compile (it compiles, then fails at run time)
- Writing `scores.remove(1)`, which works only by luck of the current positions and is not a general fix

### Q138
- id: Q138
- section: C
- type: spot-error
- difficulty: medium
- topic: generics and size()
- points: 3
- time_minutes: 5
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class ScoreStats {
    public static void main(String[] args) {
        ArrayList<int> scores = new ArrayList<>();
        scores.add(70);
        scores.add(85);
        scores.add(62);
        int total = 0;
        for (int s : scores) {
            total += s;
        }
        int count = scores.length;
        double average = total / count;
        System.out.println("Average: " + average);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `ArrayList<int> scores = new ArrayList<>();` | syntax | A generic type argument must be a class, not a primitive; use the wrapper `Integer` | `ArrayList<Integer> scores = new ArrayList<>();` |
| 2 | 11 | `int count = scores.length;` | syntax | An ArrayList has no `length` field (that is for arrays); use `size()` | `int count = scores.size();` |
| 3 | 12 | `double average = total / count;` | semantic | `total / count` is integer division, so 217 / 3 gives 72.0 instead of 72.33; cast one operand to double | `double average = (double) total / count;` |

**Reference solution:**
```java
public class ScoreStats {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(70);
        scores.add(85);
        scores.add(62);
        int total = 0;
        for (int s : scores) {
            total += s;
        }
        int count = scores.size();
        double average = (double) total / count;
        System.out.println("Average: " + average);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing the `length` error with `scores.length()`
- Declaring `average` as double and thinking that alone fixes integer division

### Q139
- id: Q139
- section: C
- type: spot-error
- difficulty: medium
- topic: contains/equals, loop bounds
- points: 3
- time_minutes: 6
- source: original
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class ResultPortal {
    private ArrayList<String> matricNos = new ArrayList<String>;
    public void add(String matricNo) {
        matricNos.add(matricNo);
    }
    public boolean isRegistered(String matricNo) {
        for (int i = 0; i <= matricNos.size(); i++) {
            if (matricNos.get(i) == matricNo) {
                return true;
            }
        }
        return false;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 2 | `private ArrayList<String> matricNos = new ArrayList<String>;` | syntax | Creating an object needs the constructor call parentheses: `new ArrayList<String>()` | `private ArrayList<String> matricNos = new ArrayList<String>();` |
| 2 | 7 | `for (int i = 0; i <= matricNos.size(); i++) {` | semantic | `<=` makes the last pass use index `size()`, which is out of range (IndexOutOfBoundsException); the loop must stop at `i < size()` | `for (int i = 0; i < matricNos.size(); i++) {` |
| 3 | 8 | `if (matricNos.get(i) == matricNo) {` | semantic | `==` compares references, not text; two equal matric numbers typed by users are different String objects, so use `equals` | `if (matricNos.get(i).equals(matricNo)) {` |

**Reference solution:**
```java
public class ResultPortal {
    private ArrayList<String> matricNos = new ArrayList<String>();
    public void add(String matricNo) {
        matricNos.add(matricNo);
    }
    public boolean isRegistered(String matricNo) {
        for (int i = 0; i < matricNos.size(); i++) {
            if (matricNos.get(i).equals(matricNo)) {
                return true;
            }
        }
        return false;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing the loop bound but leaving `==`
- Using `matricNo.equals(...)` but forgetting `get(i)`

### Q140
- id: Q140
- section: C
- type: spot-error
- difficulty: medium
- topic: custom exception
- points: 3
- time_minutes: 6
- source: original
- error_header: 3 errors (1 syntax, 2 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
    }
}
public class Clinic {
    public static void register(int age) {
        if (age < 0 && age > 120) {
            throw new InvalidAgeException("Age must be between 0 and 120");
        }
        System.out.println("Registered patient aged " + age);
    }
    public static void main(String[] args) {
        try {
            register(-5);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 2 | `public InvalidAgeException(String message) {` | semantic | The constructor never passes the message to the superclass, so `e.getMessage()` returns null; call `super(message)` | `public InvalidAgeException(String message) {`<br>`super(message);` |
| 2 | 6 | `public static void register(int age) {` | syntax | InvalidAgeException is a checked exception that `register` throws but does not declare; add `throws InvalidAgeException` (the compiler reports it at line 8 and again at the catch) | `public static void register(int age) throws InvalidAgeException {` |
| 3 | 7 | `if (age < 0 && age > 120) {` | semantic | No age is both below 0 and above 120, so the test is never true; the invalid-age check needs `\|\|` | `if (age < 0 \|\| age > 120) {` |

**Reference solution:**
```java
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}
public class Clinic {
    public static void register(int age) throws InvalidAgeException {
        if (age < 0 || age > 120) {
            throw new InvalidAgeException("Age must be between 0 and 120");
        }
        System.out.println("Registered patient aged " + age);
    }
    public static void main(String[] args) {
        try {
            register(-5);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- For error 2, a line number of 6 or 8 is accepted
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Wrapping the `throw` in its own try/catch (then the catch in `main` becomes unreachable)
- Replacing `&&` with `||` but keeping the wrong comparison direction

### Q141
- id: Q141
- section: C
- type: spot-error
- difficulty: medium
- topic: catch order, loop bounds
- points: 3
- time_minutes: 7
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class PatientReader {
    public static void main(String[] args) {
        String[] entries = {"25", "abc", "41"};
        int total = 0;
        // add up the ages of ALL entries
        for (int i = 0; i < entries.length - 1; i++) {
            try {
                total += Integer.parseInt(entries[i]);
            } catch (Exception e) {
                System.out.println("Invalid entry: " + entries[i]);
            } catch (NumberFormatException e) {
                System.out.println("Not a number: " + entries[i]);
            }
        }
        System.out.println("Total age: " + total)
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `for (int i = 0; i < entries.length - 1; i++) {` | semantic | `length - 1` stops one entry early, so the last age (41) is never added although the comment says ALL entries | `for (int i = 0; i < entries.length; i++) {` |
| 2 | 9-12 | `} catch (Exception e) {`<br>`System.out.println("Invalid entry: " + entries[i]);`<br>`} catch (NumberFormatException e) {`<br>`System.out.println("Not a number: " + entries[i]);` | syntax | A catch for the superclass `Exception` placed first already catches everything, so the later `NumberFormatException` catch is unreachable (compile error); the specific catch must come first | `} catch (NumberFormatException e) {`<br>`System.out.println("Not a number: " + entries[i]);`<br>`} catch (Exception e) {`<br>`System.out.println("Invalid entry: " + entries[i]);` |
| 3 | 15 | `System.out.println("Total age: " + total)` | syntax | Missing semicolon at the end of the statement | `System.out.println("Total age: " + total);` |

**Reference solution:**
```java
public class PatientReader {
    public static void main(String[] args) {
        String[] entries = {"25", "abc", "41"};
        int total = 0;
        // add up the ages of ALL entries
        for (int i = 0; i < entries.length; i++) {
            try {
                total += Integer.parseInt(entries[i]);
            } catch (NumberFormatException e) {
                System.out.println("Not a number: " + entries[i]);
            } catch (Exception e) {
                System.out.println("Invalid entry: " + entries[i]);
            }
        }
        System.out.println("Total age: " + total);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- For error 2, any line from 9 to 12 is accepted if the reorder is correct
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Deleting the NumberFormatException catch instead of reordering
- Citing line 11 (where javac reports it) with a fix that still leaves `Exception` first

### Q142
- id: Q142
- section: C
- type: spot-error
- difficulty: medium
- topic: ArrayList index, method header
- points: 3
- time_minutes: 6
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The snippet below contains 3 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class WaitingList {
    private ArrayList<String> patients = new ArrayList<String>();
    public void addPatient(String name) {
        patients.add(name);
    }
    public callNext() {
        if (patients.isEmpty()) {
            return null;
        }
        // first come, first served
        String next = patients.get(1);
        patients.remove(next)
        return next;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `public callNext() {` | syntax | A method needs a return type; `callNext` returns a patient's name, so the type is String | `public String callNext() {` |
| 2 | 11 | `String next = patients.get(1);` | semantic | Index 1 is the second patient; the first patient in the queue is at index 0 | `String next = patients.get(0);` |
| 3 | 12 | `patients.remove(next)` | syntax | Missing semicolon at the end of the statement | `patients.remove(next);` |

**Reference solution:**
```java
public class WaitingList {
    private ArrayList<String> patients = new ArrayList<String>();
    public void addPatient(String name) {
        patients.add(name);
    }
    public String callNext() {
        if (patients.isEmpty()) {
            return null;
        }
        // first come, first served
        String next = patients.get(0);
        patients.remove(next);
        return next;
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Adding `void` as the return type (the method returns a value)
- Treating `get(1)` as a syntax error

### Q143
- id: Q143
- section: C
- type: spot-error
- difficulty: hard
- topic: validation, parseInt, catch type
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class PatientForm {
    public static int validate(String name, String ageText) {
        if (name.isEmpty() && ageText.isEmpty()) {
            throw new IllegalArgumentException("Name and age are required");
        }
        int age = Integer.parse(ageText);
        if (age < 0 || age > 120) {
            throw new IllegalArgumentException("Age must be between 0 and 120");
        }
        return age
    }
    public static void main(String[] args) {
        try {
            System.out.println(validate("Ada", "abc"));
        } catch (ArithmeticException e) {
            System.out.println("Please enter a valid number.");
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `if (name.isEmpty() && ageText.isEmpty()) {` | semantic | The message says BOTH fields are required, so an error is needed when EITHER is empty; `&&` should be `\|\|` | `if (name.isEmpty() \|\| ageText.isEmpty()) {` |
| 2 | 6 | `int age = Integer.parse(ageText);` | syntax | `Integer` has no method `parse`; the method is `parseInt` | `int age = Integer.parseInt(ageText);` |
| 3 | 10 | `return age` | syntax | Missing semicolon after `return age` | `return age;` |
| 4 | 15 | `} catch (ArithmeticException e) {` | semantic | `parseInt("abc")` throws NumberFormatException, not ArithmeticException, so the handler never runs and the program crashes; catch NumberFormatException | `} catch (NumberFormatException e) {` |

**Reference solution:**
```java
public class PatientForm {
    public static int validate(String name, String ageText) {
        if (name.isEmpty() || ageText.isEmpty()) {
            throw new IllegalArgumentException("Name and age are required");
        }
        int age = Integer.parseInt(ageText);
        if (age < 0 || age > 120) {
            throw new IllegalArgumentException("Age must be between 0 and 120");
        }
        return age;
    }
    public static void main(String[] args) {
        try {
            System.out.println(validate("Ada", "abc"));
        } catch (NumberFormatException e) {
            System.out.println("Please enter a valid number.");
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing `Integer.parse` as `Integer.parseInteger`
- Changing the catch to a generic Exception without noticing the original handler is the wrong type

### Q144
- id: Q144
- section: C
- type: spot-error
- difficulty: hard
- topic: calculateCGPA-style method
- points: 5
- time_minutes: 10
- source: variant-of-test
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
The snippet below contains 5 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Cart {
    private ArrayList<String> categories = new ArrayList<String>();
    public double averageDiscount() {
        if (categories.size() > 3) {
            throw new IllegalStateException("At least 3 items are needed before a discount applies");
        }
        int total = 0;
        for (String c in categories) {
            total += percentFor(c)
        }
        double average = total / categories.size();
        return average;
    }
    private int percentFor(String category) {
        // A=20, B=15, C=10, D=5 percent
        switch (category.toUpperCase()) {
            case "A": return 20;
            case "B": return 15;
            case "C": return 10;
            case "D": return 10;
            default:
                throw new IllegalArgumentException("Invalid category: " + category);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `if (categories.size() > 3) {` | semantic | The exception message says at least 3 items are needed, so the cart must be rejected when it has FEWER than 3 (`< 3`) | `if (categories.size() < 3) {` |
| 2 | 8 | `for (String c in categories) {` | syntax | A for-each loop uses a colon, not `in` | `for (String c : categories) {` |
| 3 | 9 | `total += percentFor(c)` | syntax | Missing semicolon at the end of the statement | `total += percentFor(c);` |
| 4 | 11 | `double average = total / categories.size();` | semantic | `total / categories.size()` is integer division, so the fractional part of the average is lost; cast to double | `double average = (double) total / categories.size();` |
| 5 | 20 | `case "D": return 10;` | semantic | The comment gives D = 5 percent, but the case returns 10 | `case "D": return 5;` |

**Reference solution:**
```java
public class Cart {
    private ArrayList<String> categories = new ArrayList<String>();
    public double averageDiscount() {
        if (categories.size() < 3) {
            throw new IllegalStateException("At least 3 items are needed before a discount applies");
        }
        int total = 0;
        for (String c : categories) {
            total += percentFor(c);
        }
        double average = (double) total / categories.size();
        return average;
    }
    private int percentFor(String category) {
        // A=20, B=15, C=10, D=5 percent
        switch (category.toUpperCase()) {
            case "A": return 20;
            case "B": return 15;
            case "C": return 10;
            case "D": return 5;
            default:
                throw new IllegalArgumentException("Invalid category: " + category);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing the `if` condition to `>= 3` instead of `< 3`
- Casting the whole result `(double) (total / size)`, which still divides as integers

### Q145
- id: Q145
- section: C
- type: spot-error
- difficulty: hard
- topic: checked exception, add vs set
- points: 4
- time_minutes: 9
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
class OutOfStockException extends Exception {
    public OutOfStockException(String message) {
        super(message);
    }
}
public class Store {
    private ArrayList<Integer> stock = new ArrayList<Integer>();
    public void sell(int index) throws OutOfStockException {
        if (stock.get(index) != 0) {
            throw OutOfStockException("Item " + index + " is out of stock");
        }
        stock.set(index, stock.get(index) - 1);
    }
    public void restock(int index, int qty) {
        // increase the quantity of the item at index by qty
        stock.add(index, qty);
    }
    public static void main(String[] args) {
        Store s = new Store();
        s.stock.add(0);
        s.sell(0);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `if (stock.get(index) != 0) {` | semantic | The exception says the item is out of stock, so it must be thrown when the quantity IS 0; `!= 0` throws exactly when stock is available | `if (stock.get(index) == 0) {` |
| 2 | 10 | `throw OutOfStockException("Item " + index + " is out of stock");` | syntax | An exception object must be created with `new` before it is thrown | `throw new OutOfStockException("Item " + index + " is out of stock");` |
| 3 | 16 | `stock.add(index, qty);` | semantic | `add(index, qty)` INSERTS a new element and shifts the others; to increase the existing quantity use `set` with the old value plus qty | `stock.set(index, stock.get(index) + qty);` |
| 4 | 21 | `s.sell(0);` | syntax | `sell` declares the checked OutOfStockException, so the caller must catch it or declare it; the compiler reports 'unreported exception' | `try {`<br>`s.sell(0);`<br>`} catch (OutOfStockException e) {`<br>`System.out.println(e.getMessage());`<br>`}` |

**Reference solution:**
```java
class OutOfStockException extends Exception {
    public OutOfStockException(String message) {
        super(message);
    }
}
public class Store {
    private ArrayList<Integer> stock = new ArrayList<Integer>();
    public void sell(int index) throws OutOfStockException {
        if (stock.get(index) == 0) {
            throw new OutOfStockException("Item " + index + " is out of stock");
        }
        stock.set(index, stock.get(index) - 1);
    }
    public void restock(int index, int qty) {
        // increase the quantity of the item at index by qty
        stock.set(index, stock.get(index) + qty);
    }
    public static void main(String[] args) {
        Store s = new Store();
        s.stock.add(0);
        try {
            s.sell(0);
        } catch (OutOfStockException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- For error 4, adding `throws OutOfStockException` to the signature of `main` is also accepted
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Fixing line 10 with `throw new OutOfStockException` but leaving `!= 0`
- Putting `throws` on `restock` instead of handling the exception in `main`

### Q146
- id: Q146
- section: C
- type: spot-error
- difficulty: hard
- topic: registerCourse-style validation
- points: 5
- time_minutes: 10
- source: variant-of-assignment
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
The snippet below contains 5 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class Member {
    private ArrayList<String> borrowed = new ArrayList<String>();
    public void borrowBook(String title) {
        if (title != null) {
            throw new IllegalArgumentException("Title cannot be null");
        }
        if (borrowed.size() < 3) {
            throw new IllegalStateException("A member can borrow at most 3 books");
        }
        borrowed.add(title)
    }
    public ArrayList<String> getBorrowed() {
        return borrowed.size();
    }
    public String lastBorrowed() {
        return borrowed.get(borrowed.size());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `if (title != null) {` | semantic | The null check is inverted: it rejects every real title and accepts null; it must be `== null` | `if (title == null) {` |
| 2 | 7 | `if (borrowed.size() < 3) {` | semantic | The message says at most 3 books, so the member is rejected when already holding 3 or more (`>= 3`); `< 3` blocks the first three borrows | `if (borrowed.size() >= 3) {` |
| 3 | 10 | `borrowed.add(title)` | syntax | Missing semicolon at the end of the statement | `borrowed.add(title);` |
| 4 | 13 | `return borrowed.size();` | syntax | The method returns ArrayList<String> but `size()` is an int; return the list itself | `return borrowed;` |
| 5 | 16 | `return borrowed.get(borrowed.size());` | semantic | The last valid index is `size() - 1`; `get(size())` throws IndexOutOfBoundsException | `return borrowed.get(borrowed.size() - 1);` |

**Reference solution:**
```java
public class Member {
    private ArrayList<String> borrowed = new ArrayList<String>();
    public void borrowBook(String title) {
        if (title == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }
        if (borrowed.size() >= 3) {
            throw new IllegalStateException("A member can borrow at most 3 books");
        }
        borrowed.add(title);
    }
    public ArrayList<String> getBorrowed() {
        return borrowed;
    }
    public String lastBorrowed() {
        return borrowed.get(borrowed.size() - 1);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Changing only `!=` to `==` and missing the `< 3` cap error
- Fixing `size()` as `borrowed.length`

### Q147
- id: Q147
- section: C
- type: spot-error
- difficulty: hard
- topic: remove(int) vs remove(Object), size()
- points: 4
- time_minutes: 9
- source: original
- error_header: 4 errors (1 syntax, 3 semantic)

**Task:**
The snippet below contains 4 deliberate errors. For every error: (1) give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all imports are present and any code not shown is correct.

*Syntax error:* breaks the rules of Java, so the code does not compile. *Semantic error:* the code compiles but does not do what it should.

**Code:**
```java
public class HoldQueue {
    private ArrayList<Integer> memberIds = new ArrayList<Integer>();
    public void cancel(int id) {
        memberIds.remove(id);
    }
    public int serveNext() {
        if (!memberIds.isEmpty()) {
            throw new IllegalStateException("No holds placed");
        }
        // first come, first served
        return memberIds.remove(1);
    }
    public int waiting() {
        return memberIds.size;
    }
    public static void main(String[] args) {
        HoldQueue q = new HoldQueue();
        q.memberIds.add(101);
        q.memberIds.add(205);
        q.cancel(205);
        System.out.println(q.serveNext() + " " + q.waiting());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 4 | `memberIds.remove(id);` | semantic | `remove(id)` with an int is `remove(int index)`, so `cancel(205)` deletes index 205 (IndexOutOfBoundsException); to delete the member with that id use `remove(Integer.valueOf(id))` | `memberIds.remove(Integer.valueOf(id));` |
| 2 | 7 | `if (!memberIds.isEmpty()) {` | semantic | The exception says there are no holds, so it must be thrown when the list IS empty; the condition is inverted | `if (memberIds.isEmpty()) {` |
| 3 | 11 | `return memberIds.remove(1);` | semantic | First come, first served means removing the first element, index 0, not index 1 | `return memberIds.remove(0);` |
| 4 | 14 | `return memberIds.size;` | syntax | `size` is a method of ArrayList and needs parentheses: `size()` | `return memberIds.size();` |

**Reference solution:**
```java
public class HoldQueue {
    private ArrayList<Integer> memberIds = new ArrayList<Integer>();
    public void cancel(int id) {
        memberIds.remove(Integer.valueOf(id));
    }
    public int serveNext() {
        if (memberIds.isEmpty()) {
            throw new IllegalStateException("No holds placed");
        }
        // first come, first served
        return memberIds.remove(0);
    }
    public int waiting() {
        return memberIds.size();
    }
    public static void main(String[] args) {
        HoldQueue q = new HoldQueue();
        q.memberIds.add(101);
        q.memberIds.add(205);
        q.cancel(205);
        System.out.println(q.serveNext() + " " + q.waiting());
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type + correct fix (0.5 if two of the three are right)
- A line number off by one is accepted if the quoted line or the described problem is right
- A fix that would not compile, or that breaks other behaviour, earns no credit for the fix part
- For error 1, `remove((Integer) id)` is also accepted
- Extra errors claimed by the student are not penalised unless their corrected code introduces new bugs

**Common mistakes:**
- Using `remove((Integer) id)` is also valid; using `remove(id)` unchanged is not
- Not noticing the inverted isEmpty test because the bug only shows when the list is non-empty

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

### Q148
- id: Q148
- section: D
- type: spot-error
- difficulty: easy
- topic: ActionListener wiring
- points: 2
- time_minutes: 4
- source: original
- error_header: 2 errors (1 syntax, 1 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hostel clearance form: the Clear button must empty the room field.

**Code:**
```java
class HostelForm {
    private JTextField roomField = new JTextField(10);
    private JButton clearButton = new JButton("Clear");
    private JFrame frame = new JFrame("Hostel Form");

    public void build() {
        frame.setLayout(new FlowLayout());
        frame.add(roomField);
        frame.add(clearButton);
        clearButton.addActionListener(this);
        frame.pack();
        frame.setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        roomField.setText(roomField.getText());
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `class HostelForm {` | syntax | `addActionListener(this)` needs `this` to be an ActionListener, so the class must declare `implements ActionListener` (the compiler reports it on line 10, the fix is on line 1) | `class HostelForm implements ActionListener {` |
| 2 | 16 | `roomField.setText(roomField.getText());` | semantic | The Clear button writes the current text back, so nothing is cleared; it must set an empty string | `roomField.setText("");` |

**Reference solution:**
```java
class HostelForm implements ActionListener {
    private JTextField roomField = new JTextField(10);
    private JButton clearButton = new JButton("Clear");
    private JFrame frame = new JFrame("Hostel Form");

    public void build() {
        frame.setLayout(new FlowLayout());
        frame.add(roomField);
        frame.add(clearButton);
        clearButton.addActionListener(this);
        frame.pack();
        frame.setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        roomField.setText("");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 2 points

**Common mistakes:**
- Fixing line 10 (removing `addActionListener`) instead of declaring `implements ActionListener`.
- Using `setText(null)` is acceptable, but `setText("")` is the usual form.

### Q149
- id: Q149
- section: D
- type: spot-error
- difficulty: medium
- topic: validation and output (Register button)
- points: 4
- time_minutes: 7
- source: variant-of-test
- error_header: 4 errors (1 syntax, 3 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hostel room allocation: the Allocate button validates the form and logs each allocation in the output area.

**Code:**
```java
class RoomRegistration implements ActionListener {
    private JTextField studentField = new JTextField(10);
    private JTextField roomField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(8, 30);   // running log of allocations
    private ArrayList<String> allocations = new ArrayList<String>();

    public void actionPerformed(ActionEvent e) {
        String student = studentField.getText().trim();
        String roomText = roomField.getText().trim();

        if (student.isEmpty() && roomText.isEmpty()) {
            JOptionPane.showMessageDialog(null, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        try {
            int room = Integer.parse(roomText);
            if (room <= 0) {
                JOptionPane.showMessageDialog(null, "Room number must be positive.", "Error", JOptionPane.ERROR_MESSAGE);
            }
            allocations.add(student + ":" + room);
            outputArea.setText(student + " -> Room " + room + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Room must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `if (student.isEmpty() && roomText.isEmpty()) {` | semantic | `&&` only complains when BOTH fields are empty; the message says all fields are required, so either empty field must be rejected (`\|\|`) | `if (student.isEmpty() \|\| roomText.isEmpty()) {` |
| 2 | 17 | `int room = Integer.parse(roomText);` | syntax | No method `Integer.parse`; the method is `Integer.parseInt` | `int room = Integer.parseInt(roomText);` |
| 3 | 20 | `}` | semantic | After showing the error the method carries on and still adds the allocation; a `return;` is missing before the closing brace of the `if` | `return;`<br>`}` |
| 4 | 22 | `outputArea.setText(student + " -> Room " + room + "\n");` | semantic | `setText` overwrites the log each time; the output area is a running log, so `append` is needed | `outputArea.append(student + " -> Room " + room + "\n");` |

**Reference solution:**
```java
class RoomRegistration implements ActionListener {
    private JTextField studentField = new JTextField(10);
    private JTextField roomField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(8, 30);   // running log of allocations
    private ArrayList<String> allocations = new ArrayList<String>();

    public void actionPerformed(ActionEvent e) {
        String student = studentField.getText().trim();
        String roomText = roomField.getText().trim();

        if (student.isEmpty() || roomText.isEmpty()) {
            JOptionPane.showMessageDialog(null, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        try {
            int room = Integer.parseInt(roomText);
            if (room <= 0) {
                JOptionPane.showMessageDialog(null, "Room number must be positive.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
            allocations.add(student + ":" + room);
            outputArea.append(student + " -> Room " + room + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Room must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 4 points

**Common mistakes:**
- Writing `Integer.parseint` or `Integer.valueOf` as the fix (valueOf returns Integer; parseInt is the expected answer).
- Missing the absent `return` because the code compiles and the message is shown anyway.

### Q150
- id: Q150
- section: D
- type: spot-error
- difficulty: medium
- topic: Process Payment button, catch order
- points: 4
- time_minutes: 7
- source: variant-of-test
- error_header: 4 errors (3 syntax, 1 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hostel fee payment: the combo box chooses Card or Cash and the output area shows the receipt line.

**Code:**
```java
class FeePayment implements ActionListener {
    private JTextField amountField = new JTextField(10);
    private JComboBox<String> methodBox = new JComboBox<String>(new String[]{"Card", "Cash"});
    private JTextArea outputArea = new JTextArea(6, 30);

    public actionPerformed(ActionEvent e) {
        String text = amountField.getText().trim();
        if (text.isEmpty) {
            JOptionPane.showMessageDialog(null, "Please enter an amount.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        try {
            double amount = Double.parseDouble(text);
            String method = (String) methodBox.getSelectedItem();
            String mode;
            if ("Cash".equals(method)) {
                mode = "CARD";
            } else {
                mode = "CASH";
            }
            outputArea.setText("Paid " + amount + " by " + mode);
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "Something went wrong.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 6 | `public actionPerformed(ActionEvent e) {` | syntax | A method needs a return type; `actionPerformed` returns `void` | `public void actionPerformed(ActionEvent e) {` |
| 2 | 8 | `if (text.isEmpty) {` | syntax | `isEmpty` is a method and needs parentheses | `if (text.isEmpty()) {` |
| 3 | 16 | `if ("Cash".equals(method)) {` | semantic | The mapping is inverted: choosing Card would produce CASH. (Swapping the two assigned strings is an equally valid fix.) | `if ("Card".equals(method)) {` |
| 4 | 22-25 | `} catch (Exception ex) {`<br>`JOptionPane.showMessageDialog(null, "Something went wrong.", "Error", JOptionPane.ERROR_MESSAGE);`<br>`} catch (NumberFormatException ex) {`<br>`JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);` | syntax | The general `Exception` catch comes first, so the specific `NumberFormatException` catch is unreachable (compile error: already been caught). Specific catch blocks must come before general ones | `} catch (NumberFormatException ex) {`<br>`JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);`<br>`} catch (Exception ex) {`<br>`JOptionPane.showMessageDialog(null, "Something went wrong.", "Error", JOptionPane.ERROR_MESSAGE);` |

**Reference solution:**
```java
class FeePayment implements ActionListener {
    private JTextField amountField = new JTextField(10);
    private JComboBox<String> methodBox = new JComboBox<String>(new String[]{"Card", "Cash"});
    private JTextArea outputArea = new JTextArea(6, 30);

    public void actionPerformed(ActionEvent e) {
        String text = amountField.getText().trim();
        if (text.isEmpty()) {
            JOptionPane.showMessageDialog(null, "Please enter an amount.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        try {
            double amount = Double.parseDouble(text);
            String method = (String) methodBox.getSelectedItem();
            String mode;
            if ("Card".equals(method)) {
                mode = "CARD";
            } else {
                mode = "CASH";
            }
            outputArea.setText("Paid " + amount + " by " + mode);
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "Something went wrong.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 4 points

**Common mistakes:**
- Reporting only the catch order and forgetting that `isEmpty` has no parentheses.
- Calling the inverted mapping a syntax error: the code compiles, so it is semantic.

### Q151
- id: Q151
- section: D
- type: spot-error
- difficulty: medium
- topic: JComboBox cast, JOptionPane, String.format
- points: 3
- time_minutes: 6
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Library loan form: the student picks a book and a number of days; the charge is NGN 50 per day.

**Code:**
```java
class BorrowPanel implements ActionListener {
    private JComboBox<String> bookBox = new JComboBox<String>(new String[]{"Java", "Networks", "Databases"});
    private JTextField daysField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(5, 25);

    public void actionPerformed(ActionEvent e) {
        String book = bookBox.getSelectedItem();
        int days = Integer.parseInt(daysField.getText().trim());
        if (days > 14) {
            JOptionPane.showMessageDialog("Maximum loan period is 14 days.");
            return;
        }
        double charge = days * 50;
        outputArea.setText(String.format("%s borrowed for %d days, charge %.2f", book, days));
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `String book = bookBox.getSelectedItem();` | syntax | `getSelectedItem()` returns `Object`; it must be cast to `String` | `String book = (String) bookBox.getSelectedItem();` |
| 2 | 10 | `JOptionPane.showMessageDialog("Maximum loan period is 14 days.");` | syntax | `showMessageDialog` needs a parent component (or `null`) as its first argument before the message | `JOptionPane.showMessageDialog(null, "Maximum loan period is 14 days.");` |
| 3 | 14 | `outputArea.setText(String.format("%s borrowed for %d days, charge %.2f", book, days));` | semantic | The format string has three placeholders but only two arguments, so it throws MissingFormatArgumentException at run time; `charge` is computed but never passed | `outputArea.setText(String.format("%s borrowed for %d days, charge %.2f", book, days, charge));` |

**Reference solution:**
```java
class BorrowPanel implements ActionListener {
    private JComboBox<String> bookBox = new JComboBox<String>(new String[]{"Java", "Networks", "Databases"});
    private JTextField daysField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(5, 25);

    public void actionPerformed(ActionEvent e) {
        String book = (String) bookBox.getSelectedItem();
        int days = Integer.parseInt(daysField.getText().trim());
        if (days > 14) {
            JOptionPane.showMessageDialog(null, "Maximum loan period is 14 days.");
            return;
        }
        double charge = days * 50;
        outputArea.setText(String.format("%s borrowed for %d days, charge %.2f", book, days, charge));
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 3 points

**Common mistakes:**
- Treating the missing format argument as a syntax error: it compiles and fails at run time.
- Forgetting the `null` parent argument and writing `showMessageDialog("Error", "Maximum...")`.

### Q152
- id: Q152
- section: D
- type: spot-error
- difficulty: medium
- topic: building the window (layout)
- points: 4
- time_minutes: 7
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Library catalogue window: the search bar sits at the top, the results fill the centre, and the window must appear when build is called.

**Code:**
```java
class LibraryWindow {
    private JFrame frame = JFrame("Library");
    private JTextField searchField = new JTextField(15);
    private JButton searchButton = new JButton("Search");
    private JTextArea resultArea = new JTextArea(10, 30);

    public void show() {
        frame.setLayout(new BorderLayout());
        JPanel top = new JPanel();
        top.add(searchField);
        top.add(searchButton);
        frame.add(top, BorderLayout.NORTH)
        frame.add(new JScrollPane(resultArea), "CENTER");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setVisible(false);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 2 | `private JFrame frame = JFrame("Library");` | syntax | Creating an object needs the `new` keyword | `private JFrame frame = new JFrame("Library");` |
| 2 | 12 | `frame.add(top, BorderLayout.NORTH)` | syntax | Missing semicolon | `frame.add(top, BorderLayout.NORTH);` |
| 3 | 13 | `frame.add(new JScrollPane(resultArea), "CENTER");` | semantic | BorderLayout region names are case-sensitive ("Center"); the string "CENTER" throws IllegalArgumentException at run time. Use the constant `BorderLayout.CENTER` | `frame.add(new JScrollPane(resultArea), BorderLayout.CENTER);` |
| 4 | 16 | `frame.setVisible(false);` | semantic | The window must appear, so visibility must be `true` | `frame.setVisible(true);` |

**Reference solution:**
```java
class LibraryWindow {
    private JFrame frame = new JFrame("Library");
    private JTextField searchField = new JTextField(15);
    private JButton searchButton = new JButton("Search");
    private JTextArea resultArea = new JTextArea(10, 30);

    public void show() {
        frame.setLayout(new BorderLayout());
        JPanel top = new JPanel();
        top.add(searchField);
        top.add(searchButton);
        frame.add(top, BorderLayout.NORTH);
        frame.add(new JScrollPane(resultArea), BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 300);
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 4 points

**Common mistakes:**
- Reporting the missing semicolon on the NEXT line (the compiler points at line 12/13 area).
- Thinking `"CENTER"` is a compile error: it compiles and fails at run time.

### Q153
- id: Q153
- section: D
- type: spot-error
- difficulty: medium
- topic: throw vs throws, overriding
- points: 3
- time_minutes: 7
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Library: the Add Book button records a title and the number of copies.

**Code:**
```java
class AddBookAction implements ActionListener {
    private JTextField titleField = new JTextField(15);
    private JTextField copiesField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(6, 30);
    private ArrayList<String> titles = new ArrayList<String>();

    public void actionPerformed(ActionEvent e) throws Exception {
        try {
            String title = titleField.getText().trim();
            int copies = Integer.parseInt(copiesField.getText().trim());
            if (title.isEmpty() && copies < 1) {
                throw IllegalArgumentException("Title and a positive number of copies are required.");
            }
            titles.add(title);
            outputArea.append(title + " x" + copies + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Copies must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 7 | `public void actionPerformed(ActionEvent e) throws Exception {` | syntax | An overriding method cannot declare a checked exception (`throws Exception`) that the interface method does not declare; nothing here throws a checked exception anyway | `public void actionPerformed(ActionEvent e) {` |
| 2 | 11 | `if (title.isEmpty() && copies < 1) {` | semantic | The message requires a title AND a positive count, so the form must be rejected when EITHER is bad (`\|\|`) | `if (title.isEmpty() \|\| copies < 1) {` |
| 3 | 12 | `throw IllegalArgumentException("Title and a positive number of copies are required.");` | syntax | Creating the exception object needs `new` | `throw new IllegalArgumentException("Title and a positive number of copies are required.");` |

**Reference solution:**
```java
class AddBookAction implements ActionListener {
    private JTextField titleField = new JTextField(15);
    private JTextField copiesField = new JTextField(5);
    private JTextArea outputArea = new JTextArea(6, 30);
    private ArrayList<String> titles = new ArrayList<String>();

    public void actionPerformed(ActionEvent e) {
        try {
            String title = titleField.getText().trim();
            int copies = Integer.parseInt(copiesField.getText().trim());
            if (title.isEmpty() || copies < 1) {
                throw new IllegalArgumentException("Title and a positive number of copies are required.");
            }
            titles.add(title);
            outputArea.append(title + " x" + copies + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Copies must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 3 points

**Common mistakes:**
- Replacing `throws Exception` with `throws IOException` (still not allowed).
- Mixing up `throw` (statement) and `throws` (method clause).

### Q154
- id: Q154
- section: D
- type: spot-error
- difficulty: medium
- topic: ArrayList profile display (assignment variant)
- points: 4
- time_minutes: 8
- source: variant-of-assignment
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hospital ward form modelled on the course-registration assignment: admit a patient (maximum 5 per ward) and display everyone admitted so far.

**Code:**
```java
class AdmitAction implements ActionListener {
    private JTextField nameField = new JTextField(12);
    private JComboBox<String> wardBox = new JComboBox<String>(new String[]{"Male", "Female", "Children"});
    private JTextArea profileArea = new JTextArea(8, 30);
    private ArrayList<String> admitted = new ArrayList<String>();
    private final int CAPACITY = 5;

    public void actionPerformed(ActionEvent e) {
        String name = nameField.getText().trim();
        String ward = (String) wardBox.getSelectedItem();
        if (admitted.size() > CAPACITY) {
            JOptionPane.showMessageDialog(null, "Ward is full.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        admitted.add(name);
        profileArea.setText("PATIENTS IN " + ward.toUppercase() + " WARD\n");
        for (String patient : admitted) {
            profileArea.setText(patient + "\n");
        }
        nameField.setText('');
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 11 | `if (admitted.size() > CAPACITY) {` | semantic | With `>` a sixth patient is still admitted (size 5 is not greater than 5); a full ward (5 patients) must be rejected, so `>=` | `if (admitted.size() >= CAPACITY) {` |
| 2 | 16 | `profileArea.setText("PATIENTS IN " + ward.toUppercase() + " WARD\n");` | syntax | The String method is `toUpperCase` (capital C) | `profileArea.setText("PATIENTS IN " + ward.toUpperCase() + " WARD\n");` |
| 3 | 18 | `profileArea.setText(patient + "\n");` | semantic | `setText` inside the loop overwrites the list, leaving only the last patient; each name must be appended | `profileArea.append(patient + "\n");` |
| 4 | 20 | `nameField.setText('');` | syntax | `''` is an empty character literal (not allowed); an empty String needs double quotes | `nameField.setText("");` |

**Reference solution:**
```java
class AdmitAction implements ActionListener {
    private JTextField nameField = new JTextField(12);
    private JComboBox<String> wardBox = new JComboBox<String>(new String[]{"Male", "Female", "Children"});
    private JTextArea profileArea = new JTextArea(8, 30);
    private ArrayList<String> admitted = new ArrayList<String>();
    private final int CAPACITY = 5;

    public void actionPerformed(ActionEvent e) {
        String name = nameField.getText().trim();
        String ward = (String) wardBox.getSelectedItem();
        if (admitted.size() >= CAPACITY) {
            JOptionPane.showMessageDialog(null, "Ward is full.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        admitted.add(name);
        profileArea.setText("PATIENTS IN " + ward.toUpperCase() + " WARD\n");
        for (String patient : admitted) {
                profileArea.append(patient + "\n");
        }
        nameField.setText("");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 4 points

**Common mistakes:**
- Changing `CAPACITY` to 6 instead of the comparison.
- Leaving `setText('')` because it 'looks like' an empty string.

### Q155
- id: Q155
- section: D
- type: spot-error
- difficulty: hard
- topic: building the window and listener
- points: 5
- time_minutes: 9
- source: variant-of-test
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hospital admission window: it must show a read-only log, react to the Admit button and appear on screen when build() is called.

**Code:**
```java
class WardWindow implements ActionListener {
    private JFrame frame = new JFrame("Ward Admission");
    private JComboBox wardBox = new JComboBox(new String[]{"Male", "Female", "Children"});
    private JButton admitButton = new JButton("Admit");
    private JTextArea outputArea = new JTextArea(8, 30);

    public void build() {
        String first = wardBox.getItemAt(0);
        outputArea.setText("Default ward: " + first + "\n");
        outputArea.setEditable(true);
        frame.setLayout(new FlowLayout());
        frame.add(wardBox);
        frame.add(admitButton);
        frame.add(new JScrollPane(outputArea));
        frame.setDefaultCloseOperation(EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(false);
    }

    public void actionPerformed(ActionEvent e) {
        outputArea.append("Admitted to " + wardBox.getSelectedItem() + "\n");
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 3 | `private JComboBox wardBox = new JComboBox(new String[]{"Male", "Female", "Children"});` | syntax | A raw `JComboBox` returns `Object` from `getItemAt`, so line 8 does not compile; declare it as `JComboBox<String>` (the error is reported on line 8, the fix is on line 3) | `private JComboBox<String> wardBox = new JComboBox<String>(new String[]{"Male", "Female", "Children"});` |
| 2 | 10 | `outputArea.setEditable(true);` | semantic | The output area is only for display, so it should be read-only | `outputArea.setEditable(false);` |
| 3 | 13 | `frame.add(admitButton);` | semantic | The listener is never registered, so clicking Admit does nothing; add `admitButton.addActionListener(this);` | `frame.add(admitButton);`<br>`admitButton.addActionListener(this);` |
| 4 | 15 | `frame.setDefaultCloseOperation(EXIT_ON_CLOSE);` | syntax | `EXIT_ON_CLOSE` must be qualified as `JFrame.EXIT_ON_CLOSE` here (this class does not extend JFrame) | `frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);` |
| 5 | 17 | `frame.setVisible(false);` | semantic | The window must appear, so `true` | `frame.setVisible(true);` |

**Reference solution:**
```java
class WardWindow implements ActionListener {
    private JFrame frame = new JFrame("Ward Admission");
    private JComboBox<String> wardBox = new JComboBox<String>(new String[]{"Male", "Female", "Children"});
    private JButton admitButton = new JButton("Admit");
    private JTextArea outputArea = new JTextArea(8, 30);

    public void build() {
        String first = wardBox.getItemAt(0);
        outputArea.setText("Default ward: " + first + "\n");
        outputArea.setEditable(false);
        frame.setLayout(new FlowLayout());
        frame.add(wardBox);
        frame.add(admitButton);
        admitButton.addActionListener(this);
        frame.add(new JScrollPane(outputArea));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        outputArea.append("Admitted to " + wardBox.getSelectedItem() + "\n");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 5 points

**Common mistakes:**
- Saying the raw-type problem is on line 8 only; the fix must change the declaration.
- Forgetting the missing `addActionListener` because nothing in the code looks wrong.

### Q156
- id: Q156
- section: D
- type: spot-error
- difficulty: hard
- topic: exception flow in actionPerformed
- points: 5
- time_minutes: 9
- source: original
- error_header: 5 errors (3 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Hospital bill payment: the patient owes a balance and each payment reduces it; invalid amounts must be reported with a dialog.

**Code:**
```java
class BillAction implements ActionListener {
    private JTextField amountField = new JTextField(10);
    private JTextArea receiptArea = new JTextArea(6, 30);
    private double balance = 50000.0;

    public void actionPerformed(ActionEvent e) {
        try {
            int amount = Double.parseDouble(amountField.getText().trim());
            if (amount < 0) {
                throw new IllegalArgumentException("Amount must be greater than zero.");
            }
            if (amount > balance) {
                throw new IllegalArgumentException("Insufficient balance.")
            }
            balance = balance + amount;
            receiptArea.append("Paid: " + amount + ", balance: " + balance + "\n");
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 8 | `int amount = Double.parseDouble(amountField.getText().trim());` | syntax | `parseDouble` returns a double; storing it in an `int` is a lossy conversion | `double amount = Double.parseDouble(amountField.getText().trim());` |
| 2 | 9 | `if (amount < 0) {` | semantic | The message says the amount must be GREATER than zero, so zero must also be rejected (`<= 0`) | `if (amount <= 0) {` |
| 3 | 13 | `throw new IllegalArgumentException("Insufficient balance.")` | syntax | Missing semicolon | `throw new IllegalArgumentException("Insufficient balance.");` |
| 4 | 15 | `balance = balance + amount;` | semantic | A payment reduces the outstanding balance (the code also rejects amounts above the balance), so it must subtract | `balance = balance - amount;` |
| 5 | 17-20 | `} catch (IllegalArgumentException ex) {`<br>`JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);`<br>`} catch (NumberFormatException ex) {`<br>`JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);` | syntax | NumberFormatException is a subclass of IllegalArgumentException, so catching the parent first makes the child catch unreachable (compile error). The subclass must be caught first | `} catch (NumberFormatException ex) {`<br>`JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);`<br>`} catch (IllegalArgumentException ex) {`<br>`JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);` |

**Reference solution:**
```java
class BillAction implements ActionListener {
    private JTextField amountField = new JTextField(10);
    private JTextArea receiptArea = new JTextArea(6, 30);
    private double balance = 50000.0;

    public void actionPerformed(ActionEvent e) {
        try {
            double amount = Double.parseDouble(amountField.getText().trim());
            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be greater than zero.");
            }
            if (amount > balance) {
                throw new IllegalArgumentException("Insufficient balance.");
            }
            balance = balance - amount;
            receiptArea.append("Paid: " + amount + ", balance: " + balance + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 5 points

**Common mistakes:**
- Fixing the catch order by deleting one catch block (loses the specific message).
- Writing `amount < 1` for the check (would reject 0.5): `<= 0` is the intended fix.

### Q157
- id: Q157
- section: D
- type: spot-error
- difficulty: hard
- topic: switch fall-through, integer division
- points: 4
- time_minutes: 8
- source: original
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Canteen order button: each click adds one meal order and shows the average bill so far.

**Code:**
```java
class OrderAction implements ActionListener {
    private JComboBox<String> mealBox = new JComboBox<String>(new String[]{"Rice", "Beans", "Yam"});
    private JTextField qtyField = new JTextField(5);
    private JTextArea billArea = new JTextArea(8, 30);
    private int totalCost = 0;
    private int orders = 0;

    public void actionPerformed(ActionEvent e) {
        String meal = (String) mealBox.getSelectedItem();
        int price;
        switch (meal) {
            case "Rice":
                price = 500;
            case "Beans":
                price = 400;
                break;
            case "Yam":
                price = 300;
                break;
        }
        int qty = Integer.parseInt(qtyField.getText().trim());
        totalCost += price * qty;
        orders++;
        double average = totalCost / orders;
        billArea.append(meal + " x" + qty + " = " + (price * qty) + "\n");
        billArea.append("Average bill: " + average + "\n")
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `int price;` | syntax | `price` may be unassigned when no case matches (no `default`), so the compiler reports 'might not have been initialized'; give it an initial value (or add a `default`) | `int price = 0;` |
| 2 | 13 | `price = 500;` | semantic | Missing `break`: Rice falls through into the Beans case and ends up priced at 400 | `price = 500;`<br>`break;` |
| 3 | 24 | `double average = totalCost / orders;` | semantic | Both operands are int, so integer division truncates before the result is stored in a double; cast one operand | `double average = (double) totalCost / orders;` |
| 4 | 26 | `billArea.append("Average bill: " + average + "\n")` | syntax | Missing semicolon | `billArea.append("Average bill: " + average + "\n");` |

**Reference solution:**
```java
class OrderAction implements ActionListener {
    private JComboBox<String> mealBox = new JComboBox<String>(new String[]{"Rice", "Beans", "Yam"});
    private JTextField qtyField = new JTextField(5);
    private JTextArea billArea = new JTextArea(8, 30);
    private int totalCost = 0;
    private int orders = 0;

    public void actionPerformed(ActionEvent e) {
        String meal = (String) mealBox.getSelectedItem();
        int price = 0;
        switch (meal) {
            case "Rice":
                price = 500;
                break;
            case "Beans":
                price = 400;
                break;
            case "Yam":
                price = 300;
                break;
        }
        int qty = Integer.parseInt(qtyField.getText().trim());
        totalCost += price * qty;
        orders++;
        double average = (double) totalCost / orders;
        billArea.append(meal + " x" + qty + " = " + (price * qty) + "\n");
        billArea.append("Average bill: " + average + "\n");
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 4 points

**Common mistakes:**
- Fixing `int price;` by adding a `default` that does not assign a value.
- Casting the whole expression `(double) (totalCost / orders)` which still divides as integers.

### Q158
- id: Q158
- section: D
- type: spot-error
- difficulty: hard
- topic: layouts, anonymous listener
- points: 5
- time_minutes: 9
- source: original
- error_header: 5 errors (3 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Canteen order window: a top panel holds the controls, the order list fills the centre, and the Clear button must empty the list.

**Code:**
```java
class CanteenWindow {
    private JFrame frame = new JFrame("Canteen");
    private JTextField itemField = new JTextField(10);
    private JButton addButton = new JButton("Add");
    private JButton clearButton = new JButton("Clear");
    private JTextArea orderArea = new JTextArea(8, 25);

    public void build() {
        JPanel form = new JPanel(new FlowLayout());
        form.add(new JLabel("Item:"));
        form.add(itemField);
        form.add(addButton);
        form.add(clearButton);
        clearButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                orderArea.append("");
            }
        });
        frame.setLayout(new BorderLayout());
        frame.add(form, BorderLayout.TOP);
        frame.add(new JScrollPane(orderArea, BorderLayout.CENTER));
        frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);   // closing the window must end the program
        frame.pack;
        frame.setVisible(true);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 16 | `orderArea.append("");` | semantic | Appending an empty string changes nothing; the Clear button must empty the area with `setText("")` | `orderArea.setText("");` |
| 2 | 20 | `frame.add(form, BorderLayout.TOP);` | syntax | BorderLayout has no `TOP`; the region is `NORTH` | `frame.add(form, BorderLayout.NORTH);` |
| 3 | 21 | `frame.add(new JScrollPane(orderArea, BorderLayout.CENTER));` | syntax | The region constant belongs to `frame.add(...)`, not to the `JScrollPane` constructor (wrong argument types) | `frame.add(new JScrollPane(orderArea), BorderLayout.CENTER);` |
| 4 | 22 | `frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);   // closing the window must end the program` | semantic | `DO_NOTHING_ON_CLOSE` ignores the close button; the comment says the program must end, so use `EXIT_ON_CLOSE` | `frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // closing the window must end the program` |
| 5 | 23 | `frame.pack;` | syntax | `pack` is a method call and needs parentheses | `frame.pack();` |

**Reference solution:**
```java
class CanteenWindow {
    private JFrame frame = new JFrame("Canteen");
    private JTextField itemField = new JTextField(10);
    private JButton addButton = new JButton("Add");
    private JButton clearButton = new JButton("Clear");
    private JTextArea orderArea = new JTextArea(8, 25);

    public void build() {
        JPanel form = new JPanel(new FlowLayout());
        form.add(new JLabel("Item:"));
        form.add(itemField);
        form.add(addButton);
        form.add(clearButton);
        clearButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                    orderArea.setText("");
            }
        });
        frame.setLayout(new BorderLayout());
        frame.add(form, BorderLayout.NORTH);
        frame.add(new JScrollPane(orderArea), BorderLayout.CENTER);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // closing the window must end the program
        frame.pack();
        frame.setVisible(true);
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 5 points

**Common mistakes:**
- Reporting the `JScrollPane` line as only a semantic problem: it does not compile.
- Choosing `DISPOSE_ON_CLOSE` (acceptable only if it is the last window; EXIT_ON_CLOSE is the intended answer).

### Q159
- id: Q159
- section: D
- type: spot-error
- difficulty: hard
- topic: CGPA calculation in a GUI (assignment variant)
- points: 5
- time_minutes: 10
- source: variant-of-assignment
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Result portal: each click adds one course (credit unit and grade) and shows the running CGPA on the 5-point scale.

**Code:**
```java
class ResultAction implements ActionListener {
    private JTextField unitField = new JTextField(5);
    private JComboBox<String> gradeBox = new JComboBox<String>(new String[]{"A", "B", "C", "D", "E", "F"});
    private JTextArea resultArea = new JTextArea(8, 30);
    private int totalPoints = 0;
    private int totalUnits = 0;

    private int gradePoint(String grade) {
        // 5-point scale: A = 5, B = 4, C = 3, D = 2, E = 1, F = 0
        return "ABCDEF".indexOf(grade);
    }

    public void actionPerformed(ActionEvent e) {
        try {
            int unit = Integer.parseInt(unitField.getText().trim());
            if (unit < 1) {
                JOptionPane.showMessageDialog(null, "Credit unit must be a positive number.", "Error", JOptionPane.ERROR_MESSAGE);
            }
            String grade = (String) gradeBox.getSelectedItem();
            totalPoints += gradePoint(grade) * unit;
            totalUnits += unit;
            double cgpa = totalPoints / totalUnits;
            resultArea.setText("Total units: " + totalUnits + "\n");
            resultArea.append("CGPA: " + String.format("%.2f" cgpa) + "\n");
        } catch (NumberFormatException) {
            JOptionPane.showMessageDialog(null, "Credit unit must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 10 | `return "ABCDEF".indexOf(grade);` | semantic | `indexOf` on "ABCDEF" gives A = 0 ... F = 5, the reverse of the scale in the comment; the string must be "FEDCBA" (F = 0 ... A = 5) | `return "FEDCBA".indexOf(grade);` |
| 2 | 18 | `}` | semantic | After the error dialog the method continues and adds the invalid unit; a `return;` is missing | `return;`<br>`}` |
| 3 | 22 | `double cgpa = totalPoints / totalUnits;` | semantic | int / int truncates before assignment to a double (for example 13/3 gives 4.00 instead of 4.33) | `double cgpa = (double) totalPoints / totalUnits;` |
| 4 | 24 | `resultArea.append("CGPA: " + String.format("%.2f" cgpa) + "\n");` | syntax | Missing comma between the format string and its argument | `resultArea.append("CGPA: " + String.format("%.2f", cgpa) + "\n");` |
| 5 | 25 | `} catch (NumberFormatException) {` | syntax | A catch parameter needs a variable name | `} catch (NumberFormatException ex) {` |

**Reference solution:**
```java
class ResultAction implements ActionListener {
    private JTextField unitField = new JTextField(5);
    private JComboBox<String> gradeBox = new JComboBox<String>(new String[]{"A", "B", "C", "D", "E", "F"});
    private JTextArea resultArea = new JTextArea(8, 30);
    private int totalPoints = 0;
    private int totalUnits = 0;

    private int gradePoint(String grade) {
        // 5-point scale: A = 5, B = 4, C = 3, D = 2, E = 1, F = 0
        return "FEDCBA".indexOf(grade);
    }

    public void actionPerformed(ActionEvent e) {
        try {
            int unit = Integer.parseInt(unitField.getText().trim());
            if (unit < 1) {
                JOptionPane.showMessageDialog(null, "Credit unit must be a positive number.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
            String grade = (String) gradeBox.getSelectedItem();
            totalPoints += gradePoint(grade) * unit;
            totalUnits += unit;
            double cgpa = (double) totalPoints / totalUnits;
            resultArea.setText("Total units: " + totalUnits + "\n");
            resultArea.append("CGPA: " + String.format("%.2f", cgpa) + "\n");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Credit unit must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 5 points

**Common mistakes:**
- Fixing the mapping by changing the comment instead of the code.
- Casting the result `(double) (totalPoints / totalUnits)` which is still integer division.

### Q160
- id: Q160
- section: D
- type: spot-error
- difficulty: hard
- topic: inner listener class, static main, validation
- points: 5
- time_minutes: 10
- source: original
- error_header: 5 errors (3 syntax, 2 semantic)

**Task:**
Each snippet below contains deliberate errors. For every error: (1) identify it and give its line number, (2) state whether it is a syntax or a semantic error, and (3) write the corrected code. Assume all import statements are present and that any code not shown is correct.

Result portal window: the student enters a 15-character matric number such as UI/CSC/2026/001 and presses View Result.

**Code:**
```java
class ResultPortal {
    private JFrame frame = new JFrame("Result Portal");
    private JTextField matricField = new JTextField(12);
    private JComboBox<String> levelBox = new JComboBox<String>(new String[]{"100", "200", "300"});
    private JTextArea displayArea = new JTextArea(10, 30);
    private JButton viewButton = new JButton("View Result");

    private class ViewHandler implements ActionListener {
        public void actionPerformed(ActionListener e) {
            String matric = matricField.getText().trim();
            if (matric.length() == 15) {
                JOptionPane.showMessageDialog("Invalid matric number.", frame);
                return;
            }
            displayArea.append("Results for " + matric + " (" + levelBox.getSelectedItem() + " level)\n");
        }
    }

    public void buildWindow() {
        JPanel top = new JPanel(new GridLayout(2, 2));
        top.add(new JLabel("Matric No:"));
        top.add(matricField);
        top.add(new JLabel("Level:"));
        top.add(levelBox);
        frame.add(top, BorderLayout.NORTH);
        frame.add(new JScrollPane(displayArea), BorderLayout.CENTER);
        frame.add(viewButton, BorderLayout.SOUTH);
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        buildWindow();
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 9 | `public void actionPerformed(ActionListener e) {` | syntax | The parameter must be `ActionEvent`; otherwise the method does not implement the interface method and the class does not compile | `public void actionPerformed(ActionEvent e) {` |
| 2 | 11 | `if (matric.length() == 15) {` | semantic | A valid matric number has 15 characters, so the error must be shown when the length is NOT 15 | `if (matric.length() != 15) {` |
| 3 | 12 | `JOptionPane.showMessageDialog("Invalid matric number.", frame);` | syntax | The parent component comes first, then the message (arguments are reversed) | `JOptionPane.showMessageDialog(frame, "Invalid matric number.");` |
| 4 | 27 | `frame.add(viewButton, BorderLayout.SOUTH);` | semantic | The handler is never registered on the button, so View Result does nothing | `frame.add(viewButton, BorderLayout.SOUTH);`<br>`viewButton.addActionListener(new ViewHandler());` |
| 5 | 33 | `buildWindow();` | syntax | `main` is static and `buildWindow` is an instance method; it must be called on an object | `new ResultPortal().buildWindow();` |

**Reference solution:**
```java
class ResultPortal {
    private JFrame frame = new JFrame("Result Portal");
    private JTextField matricField = new JTextField(12);
    private JComboBox<String> levelBox = new JComboBox<String>(new String[]{"100", "200", "300"});
    private JTextArea displayArea = new JTextArea(10, 30);
    private JButton viewButton = new JButton("View Result");

    private class ViewHandler implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String matric = matricField.getText().trim();
            if (matric.length() != 15) {
                JOptionPane.showMessageDialog(frame, "Invalid matric number.");
                return;
            }
            displayArea.append("Results for " + matric + " (" + levelBox.getSelectedItem() + " level)\n");
        }
    }

    public void buildWindow() {
        JPanel top = new JPanel(new GridLayout(2, 2));
        top.add(new JLabel("Matric No:"));
        top.add(matricField);
        top.add(new JLabel("Level:"));
        top.add(levelBox);
        frame.add(top, BorderLayout.NORTH);
        frame.add(new JScrollPane(displayArea), BorderLayout.CENTER);
        frame.add(viewButton, BorderLayout.SOUTH);
        viewButton.addActionListener(new ViewHandler());
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        new ResultPortal().buildWindow();
    }
}
```

**Rubric:**
- 1 pt per error: correct line + correct type (syntax or semantic) + correct fix (0.5 if two of the three are right)
- A fix that would not compile earns no credit for the fix part
- An equivalent correct fix is accepted (for example a different valid way of writing the same logic)
- No penalty for extra errors claimed unless the student's corrected code introduces new bugs
- Total: 5 points

**Common mistakes:**
- Not noticing that the handler class exists but is never attached.
- Calling `buildWindow()` as `ResultPortal.buildWindow()` (still an error: the method is not static).

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

### Q161
- id: Q161
- section: E
- type: write-code
- difficulty: easy
- topic: arrays min/max
- points: 8
- time_minutes: 10
- source: variant-of-slides

**Task:**
Write a Java program that finds the highest and lowest exam scores in an array.

(a) Create a class `MinMax` containing a `main` method. In `main`, declare an `int` array named `scores` with exactly these 8 values: `64, 78, 45, 91, 33, 87, 52, 70`.

(b) Write a method `static int findMax(int[] a)` that traverses the array and returns the largest value.

(c) Write a method `static int findMin(int[] a)` that traverses the array and returns the smallest value.

(d) Write a method `static int indexOf(int[] a, int value)` that returns the index of the first occurrence of `value`, or `-1` if it is absent.

(e) In `main`, print the scores on one line, then print the maximum and the minimum with their indexes, in the format shown below.

```
Scores: 64 78 45 91 33 87 52 70
Maximum score: 91 (index 3)
Minimum score: 33 (index 4)
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- Class `MinMax` with `public static void main(String[] args)`.
- `scores` is an `int[]` of the 8 given values.
- `static int findMax(int[] a)` returns the largest element (initialise with `a[0]`, not with `0`).
- `static int findMin(int[] a)` returns the smallest element.
- `static int indexOf(int[] a, int value)` returns the first index or `-1`.
- Output: `Maximum score: 91 (index 3)` and `Minimum score: 33 (index 4)`.

**Reference solution:**
```java
public class MinMax {
    static int findMax(int[] a) {
        int max = a[0];
        for (int i = 1; i < a.length; i++) {
            if (a[i] > max) {
                max = a[i];
            }
        }
        return max;
    }

    static int findMin(int[] a) {
        int min = a[0];
        for (int i = 1; i < a.length; i++) {
            if (a[i] < min) {
                min = a[i];
            }
        }
        return min;
    }

    static int indexOf(int[] a, int value) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == value) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] scores = {64, 78, 45, 91, 33, 87, 52, 70};
        System.out.print("Scores:");
        for (int s : scores) {
            System.out.print(" " + s);
        }
        System.out.println();
        int max = findMax(scores);
        int min = findMin(scores);
        System.out.println("Maximum score: " + max + " (index " + indexOf(scores, max) + ")");
        System.out.println("Minimum score: " + min + " (index " + indexOf(scores, min) + ")");
    }
}
```

**Rubric:**
- 1 pt: array declared with the 8 values in `main` (a)
- 2 pts: `findMax` correct (traverses, returns largest; a start value of `0` or `Integer.MIN_VALUE` is acceptable if the logic is right) (b)
- 2 pts: `findMin` correct (c)
- 1 pt: `indexOf` returns first index or `-1` (d)
- 2 pts: `main` prints both values with indexes as specified (e)

**Common mistakes:**
- Starting `min` at `0`, so the minimum is always `0`.
- Looping `i <= a.length` and getting `ArrayIndexOutOfBoundsException`.
- Printing the index in place of the value.

### Q162
- id: Q162
- section: E
- type: write-code
- difficulty: easy
- topic: 2D arrays
- points: 8
- time_minutes: 12
- source: variant-of-slides

**Task:**
Write a program that adds two 3 x 3 matrices.

(a) Create a class `MatrixSum` with a `main` method. In `main`, create two 3 x 3 `int` matrices:
`A = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}` and `B = {{2, 0, 1}, {1, 3, 2}, {0, 4, 5}}`.

(b) Write a method `static int[][] add(int[][] a, int[][] b)` that returns a new matrix `C` where each element is the sum of the matching elements of `a` and `b`.

(c) Write a method `static void print(int[][] m)` that prints a matrix in tabular form: one row per line, each value in a field of width 4 (use `printf("%4d", ...)`).

(d) In `main`, compute `C = A + B` and print it.

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- Class `MatrixSum` with `main`; `A` and `B` as `int[][]` with the given values.
- `static int[][] add(int[][] a, int[][] b)` creates a new array (size from `a.length` and `a[0].length`) and fills `c[i][j] = a[i][j] + b[i][j]` with nested loops.
- `static void print(int[][] m)` prints one row per line using `%4d`, with `println()` after each row.
- Result `C` is `{{3, 2, 4}, {5, 8, 8}, {7, 12, 14}}`.

**Reference solution:**
```java
public class MatrixSum {
    static int[][] add(int[][] a, int[][] b) {
        int[][] c = new int[a.length][a[0].length];
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                c[i][j] = a[i][j] + b[i][j];
            }
        }
        return c;
    }

    static void print(int[][] m) {
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                System.out.printf("%4d", m[i][j]);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] b = {{2, 0, 1}, {1, 3, 2}, {0, 4, 5}};
        int[][] c = add(a, b);
        print(c);
    }
}
```

**Rubric:**
- 1 pt: matrices `A` and `B` declared correctly (a)
- 3 pts: `add` allocates a result array and uses correct nested loops with `a[i][j] + b[i][j]` (b)
- 2 pts: `print` prints row by row with a newline after each row (c)
- 2 pts: `main` calls both methods and the printed result is correct (d)

**Common mistakes:**
- Not creating the result array (`NullPointerException`).
- Swapping row and column limits so the loop crashes on non-square input.
- Printing everything on one line (missing `println()` after each row).

### Q163
- id: Q163
- section: E
- type: write-code
- difficulty: easy
- topic: method overloading
- points: 8
- time_minutes: 12
- source: variant-of-slides

**Task:**
Write an overloaded method `area()` for a small geometry utility.

(a) Create a class `AreaCalculator`.

(b) Write `static int area(int side)` that returns the area of a square.

(c) Write `static double area(double length, double width)` that returns the area of a rectangle.

(d) Write `static double area(double radius)` that returns the area of a circle (use `Math.PI`).

(e) In `main`, call all three versions and print: the square with side `5`, the rectangle `4.0 x 2.5`, and the circle with radius `3.0` (circle area to 2 decimal places), as shown below.

```
Square (side 5): 25
Rectangle (4.0 x 2.5): 10.0
Circle (radius 3.0): 28.27
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- Three methods all named `area`, with different parameter lists: `(int)`, `(double, double)`, `(double)`.
- Square returns `int` (`side * side`), rectangle returns `double`, circle returns `Math.PI * radius * radius`.
- `area(5)` selects the `int` version (square); `area(3.0)` selects the `double` version (circle).
- Output exactly as in the task (circle printed with `%.2f`).

**Reference solution:**
```java
public class AreaCalculator {
    static int area(int side) {
        return side * side;
    }

    static double area(double length, double width) {
        return length * width;
    }

    static double area(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        System.out.println("Square (side 5): " + area(5));
        System.out.println("Rectangle (4.0 x 2.5): " + area(4.0, 2.5));
        System.out.printf("Circle (radius 3.0): %.2f%n", area(3.0));
    }
}
```

**Rubric:**
- 2 pts: three methods named `area` with valid, distinct signatures (b), (c), (d)
- 2 pts: square and rectangle formulas correct, with the right return types
- 2 pts: circle formula correct using `Math.PI` or `3.14159` (an approximate value of pi is acceptable)
- 2 pts: `main` calls each version with the right arguments and prints the required output (e)

**Common mistakes:**
- Declaring two methods that differ only in return type (not a valid overload).
- Calling `area(5.0)` for the square, which selects the circle version.
- Using `^` for squaring in Java (it is XOR).

### Q164
- id: Q164
- section: E
- type: write-code
- difficulty: easy
- topic: linear search
- points: 9
- time_minutes: 12
- source: original

**Task:**
Write a program that searches a list of lab attendance codes.

(a) Create a class `LinearSearchDemo`. In `main`, declare `int[] codes = {12, 7, 19, 7, 3, 7, 25}`.

(b) Write `static int indexOf(int[] a, int target)` that uses linear search and returns the index of the first match, or `-1` if the target is not in the array.

(c) Write `static int countOccurrences(int[] a, int target)` that returns how many times the target appears.

(d) Write `static boolean contains(int[] a, int target)` that returns `true` if the target is present. It must reuse `indexOf`.

(e) In `main`, print the results shown below.

```
Index of 19: 2
Index of 50: -1
Count of 7: 3
Contains 3? true
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- Class `LinearSearchDemo` with `main` and the given array.
- `static int indexOf(int[] a, int target)`: loop from `0` to `a.length - 1`, return `i` at the first match, return `-1` after the loop.
- `static int countOccurrences(int[] a, int target)`: counter incremented on every match, does not stop at the first.
- `static boolean contains(int[] a, int target)` returns `indexOf(a, target) != -1`.
- Output: `2`, `-1`, `3`, `true`.

**Reference solution:**
```java
public class LinearSearchDemo {
    static int indexOf(int[] a, int target) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == target) {
                return i;
            }
        }
        return -1;
    }

    static int countOccurrences(int[] a, int target) {
        int count = 0;
        for (int i = 0; i < a.length; i++) {
            if (a[i] == target) {
                count++;
            }
        }
        return count;
    }

    static boolean contains(int[] a, int target) {
        return indexOf(a, target) != -1;
    }

    public static void main(String[] args) {
        int[] codes = {12, 7, 19, 7, 3, 7, 25};
        System.out.println("Index of 19: " + indexOf(codes, 19));
        System.out.println("Index of 50: " + indexOf(codes, 50));
        System.out.println("Count of 7: " + countOccurrences(codes, 7));
        System.out.println("Contains 3? " + contains(codes, 3));
    }
}
```

**Rubric:**
- 3 pts: `indexOf` correct, including `-1` returned only after the whole loop (b)
- 2 pts: `countOccurrences` counts all matches (c)
- 2 pts: `contains` correct and built on `indexOf` (a separate correct loop earns 1 pt) (d)
- 2 pts: array declared and `main` output matches (a), (e)

**Common mistakes:**
- Returning `-1` inside the loop on the first non-match.
- Returning on the first match in `countOccurrences`.
- Comparing with `>` instead of `==`.

### Q165
- id: Q165
- section: E
- type: write-code
- difficulty: medium
- topic: recursion
- points: 10
- time_minutes: 15
- source: variant-of-slides

**Task:**
Write two recursive methods in a class `RecursionDemo`.

(a) `static long factorial(int n)` returns `n!`. If `n` is negative it must throw `IllegalArgumentException` with the message `n must not be negative`.

(b) `static int fibonacci(int n)` returns the n-th Fibonacci number, where `fibonacci(0) = 0` and `fibonacci(1) = 1`.

(c) Clearly mark the base case of each method with a comment. Neither method may use a loop.

(d) In `main`, print `factorial(1)` to `factorial(10)` on one line, then `fibonacci(0)` to `fibonacci(9)` on one line, then call `factorial(-3)` inside a `try`/`catch` and print the exception message.

```
Factorials: 1 2 6 24 120 720 5040 40320 362880 3628800
Fibonacci: 0 1 1 2 3 5 8 13 21 34
Error: n must not be negative
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `static long factorial(int n)`: negative check throws `IllegalArgumentException("n must not be negative")`; base case `n == 0` returns `1` (`n <= 1` also acceptable); recursive case `n * factorial(n - 1)`.
- `static int fibonacci(int n)`: base cases `0` and `1`; recursive case `fibonacci(n - 1) + fibonacci(n - 2)`.
- No loops inside the two recursive methods.
- `main` prints the three lines exactly as shown and catches `IllegalArgumentException`.

**Reference solution:**
```java
public class RecursionDemo {
    static long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must not be negative");
        }
        if (n == 0) {
            return 1; // base case
        }
        return n * factorial(n - 1);
    }

    static int fibonacci(int n) {
        if (n == 0) {
            return 0; // base case 1
        }
        if (n == 1) {
            return 1; // base case 2
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.print("Factorials:");
        for (int i = 1; i <= 10; i++) {
            System.out.print(" " + factorial(i));
        }
        System.out.println();
        System.out.print("Fibonacci:");
        for (int i = 0; i < 10; i++) {
            System.out.print(" " + fibonacci(i));
        }
        System.out.println();
        try {
            factorial(-3);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Rubric:**
- 3 pts: `factorial` has a correct base case and recursive call, and the negative check (a)
- 3 pts: `fibonacci` has both base cases and a correct double recursive call (b)
- 1 pt: base cases identified (comment or clearly separated) (c)
- 3 pts: `main` loops, prints and catches the exception with correct output (d); a loop in `main` is fine

**Common mistakes:**
- Missing base case, giving `StackOverflowError`.
- Using `int` for factorial and overflowing for larger values (`long` is expected).
- Only one Fibonacci base case, so `fibonacci(1)` recurses into negative numbers.

### Q166
- id: Q166
- section: E
- type: write-code
- difficulty: medium
- topic: recursion
- points: 11
- time_minutes: 15
- source: original

**Task:**
In a class `RecursiveTools`, write the following methods. **None of them may use a loop.**

(a) `static int sum(int n)` returns `1 + 2 + ... + n` (return `0` when `n <= 0`).

(b) `static long power(int base, int exp)` returns `base` raised to `exp`, where `exp >= 0`.

(c) `static String reverse(String s)` returns the string reversed, using `substring` and `charAt`.

(d) `static boolean isPalindrome(String s)` returns `true` if `s` reads the same forwards and backwards.

(e) In `main`, print the results shown below.

```
sum(10) = 55
power(2, 10) = 1024
reverse("Ibadan") = nadabI
isPalindrome("level") = true
isPalindrome("java") = false
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `sum(int n)`: base case `n <= 0` returns `0`, otherwise `n + sum(n - 1)`.
- `power(int base, int exp)`: base case `exp == 0` returns `1`, otherwise `base * power(base, exp - 1)` (halving recursion is also acceptable).
- `reverse(String s)`: base case empty (or length 1) string returns `s`, otherwise `reverse(s.substring(1)) + s.charAt(0)`.
- `isPalindrome(String s)`: base case length `<= 1` returns `true`; if first and last characters differ return `false`; otherwise recurse on `s.substring(1, s.length() - 1)`.
- Printed values: `55`, `1024`, `nadabI`, `true`, `false`.

**Reference solution:**
```java
public class RecursiveTools {
    static int sum(int n) {
        if (n <= 0) {
            return 0;
        }
        return n + sum(n - 1);
    }

    static long power(int base, int exp) {
        if (exp == 0) {
            return 1;
        }
        return base * power(base, exp - 1);
    }

    static String reverse(String s) {
        if (s.length() <= 1) {
            return s;
        }
        return reverse(s.substring(1)) + s.charAt(0);
    }

    static boolean isPalindrome(String s) {
        if (s.length() <= 1) {
            return true;
        }
        if (s.charAt(0) != s.charAt(s.length() - 1)) {
            return false;
        }
        return isPalindrome(s.substring(1, s.length() - 1));
    }

    public static void main(String[] args) {
        System.out.println("sum(10) = " + sum(10));
        System.out.println("power(2, 10) = " + power(2, 10));
        System.out.println("reverse(\"Ibadan\") = " + reverse("Ibadan"));
        System.out.println("isPalindrome(\"level\") = " + isPalindrome("level"));
        System.out.println("isPalindrome(\"java\") = " + isPalindrome("java"));
    }
}
```

**Rubric:**
- 2 pts: `sum` correct with a base case (a)
- 2 pts: `power` correct with base case `exp == 0` (b)
- 3 pts: `reverse` correct, recursive, no loop and no `StringBuilder.reverse()` (c)
- 3 pts: `isPalindrome` correct with base case and both outcomes (d)
- 1 pt: `main` output correct (e)

**Common mistakes:**
- Using a loop or `StringBuilder.reverse()` and so not using recursion.
- Missing the empty-string base case in `reverse` (`StringIndexOutOfBoundsException`).
- Comparing strings with `==` instead of characters.

### Q167
- id: Q167
- section: E
- type: write-code
- difficulty: medium
- topic: bubble sort
- points: 11
- time_minutes: 18
- source: original

**Task:**
Write a program that sorts an array using bubble sort with an early-exit flag.

(a) Create a class `BubbleDemo`.

(b) Write `static int bubbleSort(int[] a)` that sorts `a` in ascending order, in place. It returns the **number of passes** made. A pass is one sweep over the unsorted part of the array. The last pass, in which no swap happens, also counts.

(c) Use a `boolean swapped` flag so that the method stops as soon as a pass makes no swap.

(d) After every pass, print `Pass k: ` followed by the array (use `Arrays.toString`).

(e) In `main`, sort `{5, 1, 4, 2, 8}` and then `{1, 2, 3, 4}`, printing `Passes needed: ` with the returned value each time.

```
Pass 1: [1, 4, 2, 5, 8]
Pass 2: [1, 2, 4, 5, 8]
Pass 3: [1, 2, 4, 5, 8]
Passes needed: 3
Pass 1: [1, 2, 3, 4]
Passes needed: 1
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `static int bubbleSort(int[] a)` with an outer pass loop, an inner loop comparing `a[j]` and `a[j + 1]`, and a swap through a temporary variable.
- A `swapped` flag reset to `false` at the start of each pass and set to `true` on each swap; the method breaks out when it stays `false`.
- Pass counter incremented once per pass (including the final no-swap pass) and returned.
- Array printed after every pass in the format `Pass k: [..]`.
- Outputs exactly as in the task (`3` passes for the first array, `1` for the sorted array).

**Reference solution:**
```java
import java.util.Arrays;

public class BubbleDemo {
    static int bubbleSort(int[] a) {
        int passes = 0;
        for (int i = 0; i < a.length - 1; i++) {
            boolean swapped = false;
            passes++;
            for (int j = 0; j < a.length - 1 - i; j++) {
                if (a[j] > a[j + 1]) {
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                    swapped = true;
                }
            }
            System.out.println("Pass " + passes + ": " + Arrays.toString(a));
            if (!swapped) {
                break;
            }
        }
        return passes;
    }

    public static void main(String[] args) {
        int[] first = {5, 1, 4, 2, 8};
        int p1 = bubbleSort(first);
        System.out.println("Passes needed: " + p1);
        int[] second = {1, 2, 3, 4};
        int p2 = bubbleSort(second);
        System.out.println("Passes needed: " + p2);
    }
}
```

**Rubric:**
- 3 pts: correct bubble sort (compare adjacent, swap with a temporary variable, sorts correctly) (b)
- 3 pts: early-exit flag implemented correctly (c)
- 2 pts: pass count correct (3 and 1) (b)
- 2 pts: array printed after every pass in the required format (d)
- 1 pt: `main` uses both arrays and prints the counts (e)

**Common mistakes:**
- Setting `swapped = false` once outside the outer loop.
- Inner loop running to `a.length` and reading `a[j + 1]` out of bounds.
- Swapping with `a[j] = a[j + 1]; a[j + 1] = a[j];` (loses a value).

### Q168
- id: Q168
- section: E
- type: write-code
- difficulty: medium
- topic: 2D arrays
- points: 11
- time_minutes: 18
- source: original

**Task:**
A lecturer stores marks for 4 students in 3 courses in a 2D array: each row is a student and each column is a course. Use this table:

`int[][] marks = {{70, 65, 80}, {55, 60, 45}, {90, 85, 95}, {40, 50, 60}};`

(a) Create a class `MarksTable` with a `main` method that declares the array above.

(b) Write `static int rowTotal(int[][] m, int r)` that returns the total of row `r`.

(c) Write `static int columnTotal(int[][] m, int c)` that returns the total of column `c`.

(d) Write `static int bestStudent(int[][] m)` that returns the row index of the student with the highest total.

(e) In `main`, print each student's marks with their total, then the column totals, the column averages (2 decimal places) and the best student (numbered from 1), exactly as below.

```
Student 1: 70 65 80 | Total: 215
Student 2: 55 60 45 | Total: 160
Student 3: 90 85 95 | Total: 270
Student 4: 40 50 60 | Total: 150
Course totals: 255 260 280
Course averages: 63.75 65.00 70.00
Best student: Student 3 (270)
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `marks` is an `int[][]` with 4 rows and 3 columns as given.
- `rowTotal(int[][] m, int r)` sums `m[r][c]` over all columns.
- `columnTotal(int[][] m, int c)` sums `m[r][c]` over all rows.
- `bestStudent(int[][] m)` returns the index of the largest row total (index `2` here).
- Averages use floating-point division (`columnTotal / (double) m.length`), giving `63.75`, `65.00`, `70.00`.
- Output exactly as shown.

**Reference solution:**
```java
public class MarksTable {
    static int rowTotal(int[][] m, int r) {
        int total = 0;
        for (int c = 0; c < m[r].length; c++) {
            total += m[r][c];
        }
        return total;
    }

    static int columnTotal(int[][] m, int c) {
        int total = 0;
        for (int r = 0; r < m.length; r++) {
            total += m[r][c];
        }
        return total;
    }

    static int bestStudent(int[][] m) {
        int best = 0;
        for (int r = 1; r < m.length; r++) {
            if (rowTotal(m, r) > rowTotal(m, best)) {
                best = r;
            }
        }
        return best;
    }

    public static void main(String[] args) {
        int[][] marks = {{70, 65, 80}, {55, 60, 45}, {90, 85, 95}, {40, 50, 60}};
        for (int r = 0; r < marks.length; r++) {
            System.out.print("Student " + (r + 1) + ":");
            for (int c = 0; c < marks[r].length; c++) {
                System.out.print(" " + marks[r][c]);
            }
            System.out.println(" | Total: " + rowTotal(marks, r));
        }
        System.out.print("Course totals:");
        for (int c = 0; c < marks[0].length; c++) {
            System.out.print(" " + columnTotal(marks, c));
        }
        System.out.println();
        System.out.print("Course averages:");
        for (int c = 0; c < marks[0].length; c++) {
            System.out.printf(" %.2f", columnTotal(marks, c) / (double) marks.length);
        }
        System.out.println();
        int best = bestStudent(marks);
        System.out.println("Best student: Student " + (best + 1) + " (" + rowTotal(marks, best) + ")");
    }
}
```

**Rubric:**
- 2 pts: `rowTotal` correct (b)
- 2 pts: `columnTotal` correct, with the loop over rows and fixed column (c)
- 2 pts: `bestStudent` returns the correct index (d)
- 2 pts: averages computed with floating-point division and formatted to 2 decimals (e)
- 3 pts: `main` prints per-student lines, totals and best student correctly (a), (e)

**Common mistakes:**
- Integer division for the averages (`255 / 4` gives `63`).
- Swapping row and column indexes in `columnTotal`.
- Returning the best total instead of the best row index.

### Q169
- id: Q169
- section: E
- type: write-code
- difficulty: medium
- topic: insertion sort
- points: 10
- time_minutes: 18
- source: original

**Task:**
Write a class `InsertionDemo` that sorts with insertion sort.

(a) Write `static void insertionSort(int[] a)` that sorts the array in ascending order. For each index `i` from 1 to `a.length - 1`, it takes `a[i]` as the key and shifts larger elements one place to the right until the key's place is found.

(b) After each insertion, print `Step i: ` followed by the array (use `Arrays.toString`).

(c) Overload the method: `static void insertionSort(String[] a)` sorts names alphabetically using `compareTo`. It prints nothing.

(d) In `main`, sort `{9, 5, 1, 4, 3}` and then the names `{"Tunde", "Amina", "Chidi", "Bola"}`, and print the sorted names.

```
Step 1: [5, 9, 1, 4, 3]
Step 2: [1, 5, 9, 4, 3]
Step 3: [1, 4, 5, 9, 3]
Step 4: [1, 3, 4, 5, 9]
Sorted names: [Amina, Bola, Chidi, Tunde]
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `static void insertionSort(int[] a)`: outer loop `i` from `1`; save `key = a[i]`; inner `while (j >= 0 && a[j] > key)` shifts `a[j]` to `a[j + 1]`; place key at `a[j + 1]`.
- Array printed once after each insertion, labelled `Step i`.
- Overload `insertionSort(String[] a)` uses `a[j].compareTo(key) > 0` for the shift condition.
- Output exactly as shown.

**Reference solution:**
```java
import java.util.Arrays;

public class InsertionDemo {
    static void insertionSort(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
            System.out.println("Step " + i + ": " + Arrays.toString(a));
        }
    }

    static void insertionSort(String[] a) {
        for (int i = 1; i < a.length; i++) {
            String key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j].compareTo(key) > 0) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] nums = {9, 5, 1, 4, 3};
        insertionSort(nums);
        String[] names = {"Tunde", "Amina", "Chidi", "Bola"};
        insertionSort(names);
        System.out.println("Sorted names: " + Arrays.toString(names));
    }
}
```

**Rubric:**
- 4 pts: correct insertion sort for `int[]` (key saved, shifting, key placed, no lost elements) (a)
- 1 pt: the `j >= 0` check comes before `a[j]` (no out-of-bounds) (a)
- 2 pts: steps printed after each insertion (b)
- 2 pts: `String[]` overload correct, using `compareTo` and not `>` on strings (c)
- 1 pt: `main` output correct (d)

**Common mistakes:**
- Using `>` to compare `String` values (does not compile).
- Writing `a[j] > key && j >= 0` (out-of-bounds when `j` is `-1`).
- Forgetting to put the key back (`a[j + 1] = key`).

### Q170
- id: Q170
- section: E
- type: write-code
- difficulty: hard
- topic: binary search
- points: 13
- time_minutes: 25
- source: original

**Task:**
Write a class `BinarySearchDemo` that searches a sorted array of matriculation numbers.

(a) Write `static boolean isSorted(int[] a)` that returns `true` when the array is in ascending order.

(b) Write an **iterative** method `static int binarySearch(int[] a, int target)` that returns the index of `target` or `-1`. On every loop it must print `Checked index ` and the middle index it examined. Compute the middle as `low + (high - low) / 2`.

(c) Write a **recursive** method `static int binarySearchRecursive(int[] a, int target, int low, int high)` that returns the index or `-1`.

(d) Overload `binarySearchRecursive(int[] a, int target)` so callers do not need to pass `low` and `high`.

(e) In `main`, use `int[] ids = {3, 8, 15, 22, 31, 47, 56, 63, 78, 90}`. Print whether it is sorted, search iteratively for `47` and `10`, and recursively for `63`, `90` and `5`.

```
Array sorted: true
Checked index 4
Checked index 7
Checked index 5
Index of 47: 5
Checked index 4
Checked index 1
Checked index 2
Index of 10: -1
Recursive index of 63: 7
Recursive index of 90: 9
Recursive index of 5: -1
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `isSorted` loops comparing each element with its successor and returns `false` on the first descent.
- `binarySearch`: `low = 0`, `high = a.length - 1`, `while (low <= high)`, `mid = low + (high - low) / 2`, prints `Checked index mid`, returns `mid` on a match, `low = mid + 1` when `a[mid] < target`, otherwise `high = mid - 1`; returns `-1` after the loop.
- `binarySearchRecursive(int[], int, int, int)`: base case `low > high` returns `-1`; found returns `mid`; otherwise recurses on the correct half (`mid + 1, high` or `low, mid - 1`).
- The 2-argument overload calls the 4-argument one with `0` and `a.length - 1`.
- Output exactly as shown (middle indexes 4, 7, 5 for target 47, and 4, 1, 2 for target 10).

**Reference solution:**
```java
public class BinarySearchDemo {
    static boolean isSorted(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                return false;
            }
        }
        return true;
    }

    static int binarySearch(int[] a, int target) {
        int low = 0;
        int high = a.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            System.out.println("Checked index " + mid);
            if (a[mid] == target) {
                return mid;
            }
            if (a[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    static int binarySearchRecursive(int[] a, int target, int low, int high) {
        if (low > high) {
            return -1;
        }
        int mid = low + (high - low) / 2;
        if (a[mid] == target) {
            return mid;
        }
        if (a[mid] < target) {
            return binarySearchRecursive(a, target, mid + 1, high);
        }
        return binarySearchRecursive(a, target, low, mid - 1);
    }

    static int binarySearchRecursive(int[] a, int target) {
        return binarySearchRecursive(a, target, 0, a.length - 1);
    }

    public static void main(String[] args) {
        int[] ids = {3, 8, 15, 22, 31, 47, 56, 63, 78, 90};
        System.out.println("Array sorted: " + isSorted(ids));
        System.out.println("Index of 47: " + binarySearch(ids, 47));
        System.out.println("Index of 10: " + binarySearch(ids, 10));
        System.out.println("Recursive index of 63: " + binarySearchRecursive(ids, 63));
        System.out.println("Recursive index of 90: " + binarySearchRecursive(ids, 90));
        System.out.println("Recursive index of 5: " + binarySearchRecursive(ids, 5));
    }
}
```

**Rubric:**
- 2 pts: `isSorted` correct (a)
- 4 pts: iterative binary search correct (loop condition `low <= high`, midpoint, both halves, `-1`) and prints the checked index (b)
- 4 pts: recursive version correct with base case and correct sub-range arguments (c)
- 1 pt: overload delegates with `0` and `a.length - 1` (d)
- 2 pts: `main` output matches (e)

**Common mistakes:**
- Loop condition `low < high`, which misses the last candidate.
- Recursing with `mid` instead of `mid + 1` / `mid - 1` (infinite recursion).
- Forgetting to `return` the recursive call's value.

### Q171
- id: Q171
- section: E
- type: write-code
- difficulty: hard
- topic: selection sort
- points: 14
- time_minutes: 25
- source: variant-of-test

**Task:**
Selection sort is a simple but inefficient sorting algorithm. On the first pass it finds the smallest element of the array and swaps it with the first element. On the second pass it finds the smallest of the remaining elements and swaps it with the second element. This continues until the largest element is in the last position. After pass `i`, the `i` smallest elements are in increasing order in the first `i` positions.

Task: write a Java program that implements selection sort for a list of exam scores.

(a) Create a class `SelectionSort` with two private members: an `int` array named `data` and a `static Random` object (the reference solution seeds it with `new Random(42)` so that the sample output below is repeatable; an unseeded `Random` is also acceptable).

(b) Write a constructor that takes the array size, creates the array and fills it with random integers in the range 40 to 99.

(c) Write a method `sort()` that arranges `data` in increasing order using selection sort, and a private method `swap(int first, int second)` that exchanges two elements. After every pass, `sort()` must print `Pass k: ` followed by the array contents.

(d) Write a `toString()` method that returns the contents of the array as a string.

(e) In a `main` method, create a `SelectionSort` object with 10 elements, display the unsorted array, sort it (the passes are displayed by `sort()`), and display the final sorted array.

Submit the complete source code and a sample of the output from one run.

**Code:**
None.

**Answer key:**
- Class `SelectionSort` with `private int[] data` and `private static Random` field (name free).
- Constructor `SelectionSort(int size)` allocates `new int[size]` and fills each cell with `40 + random.nextInt(60)` (any expression giving 40..99 inclusive).
- `public void sort()` with an outer loop over `i = 0 .. n - 2`, an inner loop finding the index of the minimum of `data[i..n-1]`, then `swap(i, minIndex)`; prints the array after each pass.
- `private void swap(int first, int second)` exchanges `data[first]` and `data[second]` using a temporary variable.
- `public String toString()` returns the array contents (for example `Arrays.toString(data)`); `main` prints unsorted, sorts, prints sorted.
- With `new Random(42)` and 10 elements, the unsorted array is `[@@UNSORTED@@]`; the sorted array is `[@@SORTED@@]`. A student's own random values will differ.

**Reference solution:**
```java
import java.util.Arrays;
import java.util.Random;

public class SelectionSort {
    private int[] data;
    private static Random random = new Random(42);

    public SelectionSort(int size) {
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = 40 + random.nextInt(60);
        }
    }

    public void sort() {
        for (int i = 0; i < data.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < data.length; j++) {
                if (data[j] < data[minIndex]) {
                    minIndex = j;
                }
            }
            swap(i, minIndex);
            System.out.println("Pass " + (i + 1) + ": " + this);
        }
    }

    private void swap(int first, int second) {
        int temp = data[first];
        data[first] = data[second];
        data[second] = temp;
    }

    @Override
    public String toString() {
        return Arrays.toString(data);
    }

    public static void main(String[] args) {
        SelectionSort list = new SelectionSort(10);
        System.out.println("Unsorted: " + list);
        list.sort();
        System.out.println("Sorted:   " + list);
    }
}
```

**Rubric:**
- 2 pts: class design: private `data`, static `Random`, constructor fills 40..99 (a), (b)
- 5 pts: `sort()` is a correct selection sort (finds the minimum of the unsorted part and swaps it into place) (c)
- 2 pts: `swap(int, int)` is private and correct (c)
- 2 pts: array printed after every pass (c)
- 1 pt: `toString()` returns the array contents as a `String` (d)
- 2 pts: `main` creates a 10-element object, shows unsorted, sorts, shows sorted (e)

**Common mistakes:**
- Swapping inside the inner loop (that is bubble-like behaviour, not selection sort).
- `random.nextInt(99)` or `nextInt(100) + 10`, which gives the wrong range.
- A `toString()` that prints instead of returning a `String`.

### Q172
- id: Q172
- section: E
- type: write-code
- difficulty: hard
- topic: 2D arrays matrix operations
- points: 15
- time_minutes: 30
- source: original

**Task:**
Write a class `MatrixTools` that works on matrices stored as `int[][]`. The matrices need not be square.

(a) `static int[][] transpose(int[][] m)` returns a new matrix whose rows are the columns of `m` (a 2 x 3 matrix becomes 3 x 2).

(b) `static int[] rowSums(int[][] m)` returns an array holding the sum of each row.

(c) `static boolean isSymmetric(int[][] m)` returns `true` only if `m` is square and `m[i][j] == m[j][i]` for all `i`, `j`.

(d) `static int[][] multiply(int[][] a, int[][] b)` returns the matrix product. If the number of columns of `a` differs from the number of rows of `b`, throw `IllegalArgumentException` with the message `Dimension mismatch`.

(e) In `main`, let `A = {{1, 2, 3}, {4, 5, 6}}`. Print the transpose of `A` (one row per line, values separated by one space), the row sums of `A` with `Arrays.toString`, the product `A x Atranspose` and whether it is symmetric, whether `A` is symmetric, and finally catch the exception from `multiply(A, A)` and print its message.

```
Transpose:
1 4
2 5
3 6
Row sums: [6, 15]
A x At:
14 32
32 77
Symmetric(A x At): true
Symmetric(A): false
Error: Dimension mismatch
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `transpose`: result has dimensions `m[0].length` x `m.length`; `t[j][i] = m[i][j]`.
- `rowSums`: one `int` per row.
- `isSymmetric`: returns `false` when `m.length != m[0].length`; otherwise compares mirrored elements.
- `multiply`: dimension check first (message exactly `Dimension mismatch`), result `a.length` x `b[0].length`, triple nested loop `c[i][j] += a[i][k] * b[k][j]`.
- `A x At = {{14, 32}, {32, 77}}`; `Symmetric(A x At)` is `true`; `Symmetric(A)` is `false`.
- Output exactly as shown.

**Reference solution:**
```java
import java.util.Arrays;

public class MatrixTools {
    static int[][] transpose(int[][] m) {
        int[][] t = new int[m[0].length][m.length];
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                t[j][i] = m[i][j];
            }
        }
        return t;
    }

    static int[] rowSums(int[][] m) {
        int[] sums = new int[m.length];
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                sums[i] += m[i][j];
            }
        }
        return sums;
    }

    static boolean isSymmetric(int[][] m) {
        if (m.length != m[0].length) {
            return false;
        }
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < i; j++) {
                if (m[i][j] != m[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }

    static int[][] multiply(int[][] a, int[][] b) {
        if (a[0].length != b.length) {
            throw new IllegalArgumentException("Dimension mismatch");
        }
        int[][] c = new int[a.length][b[0].length];
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < b[0].length; j++) {
                for (int k = 0; k < b.length; k++) {
                    c[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return c;
    }

    static void print(int[][] m) {
        for (int i = 0; i < m.length; i++) {
            for (int j = 0; j < m[i].length; j++) {
                if (j > 0) {
                    System.out.print(" ");
                }
                System.out.print(m[i][j]);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] a = {{1, 2, 3}, {4, 5, 6}};
        int[][] at = transpose(a);
        System.out.println("Transpose:");
        print(at);
        System.out.println("Row sums: " + Arrays.toString(rowSums(a)));
        int[][] product = multiply(a, at);
        System.out.println("A x At:");
        print(product);
        System.out.println("Symmetric(A x At): " + isSymmetric(product));
        System.out.println("Symmetric(A): " + isSymmetric(a));
        try {
            multiply(a, a);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Rubric:**
- 3 pts: `transpose` allocates the swapped dimensions and copies correctly (a)
- 2 pts: `rowSums` correct (b)
- 3 pts: `isSymmetric` handles the non-square case and mirrored comparison (c)
- 4 pts: `multiply` has the dimension check, the right result size and a correct triple loop (d)
- 3 pts: `main` produces the required output including the caught exception (e)

**Common mistakes:**
- Allocating `new int[m.length][m[0].length]` for the transpose (fails for non-square input).
- Forgetting to reset or initialise the accumulator `c[i][j]` (it is `0` by default only if the array is new).
- Checking symmetry without first checking that the matrix is square.

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

### Q173
- id: Q173
- section: F
- type: write-code
- difficulty: easy
- topic: encapsulation final static
- points: 8
- time_minutes: 15
- source: variant-of-slides

**Task:**
Implement an encapsulated `BankAccount` class.

(a) Private fields: `String accountNumber` (never changes after creation) and `double balance`. Add a `public static final double INTEREST_RATE = 0.05;` shared by all accounts.

(b) A constructor `BankAccount(String accountNumber, double initialBalance)` that throws `IllegalArgumentException("Initial balance cannot be negative")` for a negative opening balance.

(c) Getters `getAccountNumber()` and `getBalance()`. There must be **no** setter for `balance`.

(d) `deposit(double amount)` throws `IllegalArgumentException("Deposit must be positive")` unless `amount > 0`. `withdraw(double amount)` throws `IllegalArgumentException("Withdrawal must be positive")` unless `amount > 0`, and `IllegalArgumentException("Insufficient funds")` if `amount` exceeds the balance. `double interestEarned()` returns `balance * INTEREST_RATE`.

(e) In a class `BankDemo` with `main`: open `ACC-001` with `10000`, deposit `2500`, withdraw `3000`, print the interest, then try `withdraw(20000)` and `deposit(-50)` in separate `try`/`catch` blocks, printing `Error: ` and the message. Print money with two decimals.

```
Account ACC-001 opened with 10000.00
After deposit: 12500.00
After withdrawal: 9500.00
Interest earned: 475.00
Error: Insufficient funds
Error: Deposit must be positive
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `balance` and `accountNumber` are `private`; `INTEREST_RATE` is `static final` (and shared, not per-object).
- Constructor validates the opening balance; `deposit` and `withdraw` validate as specified and use exactly the given messages.
- Getters exist; no `setBalance`.
- `interestEarned()` returns `balance * INTEREST_RATE` (`475.00` for `9500`).
- `main` produces the six output lines, catching `IllegalArgumentException` for the two failures.

**Reference solution:**
```java
class BankAccount {
    public static final double INTEREST_RATE = 0.05;
    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit must be positive");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal must be positive");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        balance -= amount;
    }

    public double interestEarned() {
        return balance * INTEREST_RATE;
    }
}

public class BankDemo {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-001", 10000);
        System.out.printf("Account %s opened with %.2f%n", acc.getAccountNumber(), acc.getBalance());
        acc.deposit(2500);
        System.out.printf("After deposit: %.2f%n", acc.getBalance());
        acc.withdraw(3000);
        System.out.printf("After withdrawal: %.2f%n", acc.getBalance());
        System.out.printf("Interest earned: %.2f%n", acc.interestEarned());
        try {
            acc.withdraw(20000);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
        try {
            acc.deposit(-50);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Rubric:**
- 2 pts: private fields, `static final` rate, no setter for balance (a), (c)
- 1 pt: constructor validation (b)
- 3 pts: `deposit`, `withdraw` and `interestEarned` correct with the required exceptions (d)
- 2 pts: `BankDemo` produces the required output (e)

**Common mistakes:**
- Declaring `balance` as `public`.
- Making the interest rate an ordinary (non-`static`) instance field, or leaving off `final`.
- Using `>=` in the insufficient-funds check, so an exact withdrawal of the whole balance is rejected.

### Q174
- id: Q174
- section: F
- type: write-code
- difficulty: medium
- topic: abstract class polymorphism
- points: 10
- time_minutes: 20
- source: variant-of-slides

**Task:**
Design a small shape hierarchy.

(a) An abstract class `Shape` with an abstract method `double area()` and a concrete `toString()` that returns the class name (use `getClass().getSimpleName()`), then ` area = ` and the area to 2 decimals.

(b) Subclasses `Circle(double radius)`, `Rectangle(double length, double width)` and `Triangle(double base, double height)`, each with private fields and an `area()` that overrides the abstract method.

(c) In a class `ShapeDemo` with `main`, store `Circle(2.0)`, `Rectangle(4, 5)`, `Triangle(6, 3)` and `Circle(1.5)` in a `Shape[]` array and print each one.

(d) Add `static Shape largest(Shape[] shapes)` that returns the shape with the biggest area, and print the total area and the largest shape.

```
Circle area = 12.57
Rectangle area = 20.00
Triangle area = 9.00
Circle area = 7.07
Total area = 48.63
Largest: Rectangle area = 20.00
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `abstract class Shape` with `abstract double area()` (a `public abstract` is also fine) and a `toString()` that uses the polymorphic `area()`.
- `Circle`, `Rectangle`, `Triangle` extend `Shape`, have private fields, a constructor, and override `area()` (`Math.PI * r * r`, `l * w`, `0.5 * b * h`). The overriding method must not have weaker access than the abstract method.
- `Shape[]` holds the four objects; the loop uses the `Shape` reference (runtime polymorphism).
- `largest` compares `area()` values and returns a `Shape`.
- Output exactly as shown (total `48.63`, largest is the rectangle).

**Reference solution:**
```java
abstract class Shape {
    public abstract double area();

    @Override
    public String toString() {
        return getClass().getSimpleName() + " area = " + String.format("%.2f", area());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    public double area() {
        return length * width;
    }
}

class Triangle extends Shape {
    private double base;
    private double height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public double area() {
        return 0.5 * base * height;
    }
}

public class ShapeDemo {
    static Shape largest(Shape[] shapes) {
        Shape best = shapes[0];
        for (int i = 1; i < shapes.length; i++) {
            if (shapes[i].area() > best.area()) {
                best = shapes[i];
            }
        }
        return best;
    }

    public static void main(String[] args) {
        Shape[] shapes = {new Circle(2.0), new Rectangle(4, 5), new Triangle(6, 3), new Circle(1.5)};
        double total = 0;
        for (Shape s : shapes) {
            System.out.println(s);
            total += s.area();
        }
        System.out.printf("Total area = %.2f%n", total);
        System.out.println("Largest: " + largest(shapes));
    }
}
```

**Rubric:**
- 2 pts: `Shape` is abstract with an abstract `area()` and a working `toString()` (a)
- 3 pts: three subclasses with correct formulas and `extends Shape` (b)
- 2 pts: `Shape[]` array and loop using polymorphism (c)
- 2 pts: `largest` correct (d)
- 1 pt: output matches

**Common mistakes:**
- Giving `area()` in the abstract class a body, or forgetting `abstract` on the class.
- Overriding `area()` without `public` (weaker access, compile error).
- Using `int` division in the triangle formula (`1 / 2`).

### Q175
- id: Q175
- section: F
- type: write-code
- difficulty: medium
- topic: abstract class
- points: 10
- time_minutes: 20
- source: variant-of-slides

**Task:**
Write a payroll program with an abstract `Employee`.

(a) An abstract class `Employee` with private fields `int id` and `String name`, a constructor, getters, an abstract method `double calculateSalary()` and a `toString()` that returns `id`, a space, `name`, then ` earns ` and the salary to 2 decimals.

(b) `FullTimeEmployee(int id, String name, double monthlyBasic)`: salary is the basic plus a 20% allowance on the basic.

(c) `PartTimeEmployee(int id, String name, int hoursWorked, double hourlyRate)`: salary is `hoursWorked * hourlyRate`.

(d) In `PayrollDemo`, store `FullTimeEmployee(101, "Ada Okafor", 150000)`, `PartTimeEmployee(102, "Tunde Bello", 80, 1500)` and `PartTimeEmployee(103, "Chioma Eze", 40, 2000)` in an `Employee[]`, print each, and print the total payroll.

```
101 Ada Okafor earns 180000.00
102 Tunde Bello earns 120000.00
103 Chioma Eze earns 80000.00
Total payroll: 380000.00
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `abstract class Employee` with private fields, constructor, getters and `abstract double calculateSalary()`.
- Subclasses call `super(id, name)` as the first statement of their constructors and override `calculateSalary()` as `public`.
- `FullTimeEmployee`: `monthlyBasic + 0.20 * monthlyBasic` (`180000`); `PartTimeEmployee`: `hoursWorked * hourlyRate`.
- `toString()` uses `calculateSalary()` (dynamic dispatch); `main` loops over `Employee[]` and sums salaries.
- Output exactly as shown.

**Reference solution:**
```java
abstract class Employee {
    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public abstract double calculateSalary();

    @Override
    public String toString() {
        return id + " " + name + " earns " + String.format("%.2f", calculateSalary());
    }
}

class FullTimeEmployee extends Employee {
    private double monthlyBasic;

    public FullTimeEmployee(int id, String name, double monthlyBasic) {
        super(id, name);
        this.monthlyBasic = monthlyBasic;
    }

    @Override
    public double calculateSalary() {
        return monthlyBasic + 0.20 * monthlyBasic;
    }
}

class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;

    public PartTimeEmployee(int id, String name, int hoursWorked, double hourlyRate) {
        super(id, name);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }

    @Override
    public double calculateSalary() {
        return hoursWorked * hourlyRate;
    }
}

public class PayrollDemo {
    public static void main(String[] args) {
        Employee[] staff = {
            new FullTimeEmployee(101, "Ada Okafor", 150000),
            new PartTimeEmployee(102, "Tunde Bello", 80, 1500),
            new PartTimeEmployee(103, "Chioma Eze", 40, 2000)
        };
        double total = 0;
        for (Employee e : staff) {
            System.out.println(e);
            total += e.calculateSalary();
        }
        System.out.printf("Total payroll: %.2f%n", total);
    }
}
```

**Rubric:**
- 2 pts: `Employee` is abstract with a correct abstract `calculateSalary()` and encapsulated fields (a)
- 2 pts: `FullTimeEmployee` correct, including `super(...)` first (b)
- 2 pts: `PartTimeEmployee` correct (c)
- 2 pts: `Employee[]` used polymorphically with a correct total (d)
- 2 pts: `toString()` and output format correct

**Common mistakes:**
- Calling `super(...)` after other statements.
- Making `name` and `id` `private` and then accessing them directly in the subclasses.
- Trying `new Employee(...)` in `main` (an abstract class cannot be instantiated).

### Q176
- id: Q176
- section: F
- type: write-code
- difficulty: medium
- topic: interfaces
- points: 10
- time_minutes: 20
- source: variant-of-slides

**Task:**
Model things a student must pay for using an interface.

(a) Define an interface `Payable` with a method `double amountDue()` and a **static** method `static double total(Payable[] items)` that returns the sum of `amountDue()` over the array.

(b) `Invoice(String number, double amount, double taxRate)` implements `Payable`; the amount due is the amount plus tax (`amount * taxRate`).

(c) `Subscription(String plan, double monthlyFee, int months)` implements `Payable`; the amount due is `monthlyFee * months`, reduced by 10% when `months` is 12 or more.

(d) In `PayableDemo`, create `Invoice("INV-7", 20000, 0.075)`, `Subscription("Premium", 3000, 12)` and `Subscription("Basic", 1000, 3)` in a `Payable[]`. Print each as `Item k due: ` and the amount (2 decimals), then the total using `Payable.total(...)`.

```
Item 1 due: 21500.00
Item 2 due: 32400.00
Item 3 due: 3000.00
Total due: 56900.00
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `interface Payable` declares `double amountDue();` and a `static double total(Payable[] items)` with a body (legal in Java 8).
- `Invoice` and `Subscription` use `implements Payable` (not `extends`) and declare `amountDue()` as `public`.
- `Invoice`: `amount + amount * taxRate`; `Subscription`: `monthlyFee * months`, times `0.9` when `months >= 12`.
- `main` stores both types in `Payable[]`, prints each amount, and calls `Payable.total(items)` through the interface name.
- Values: `21500.00`, `32400.00`, `3000.00`, total `56900.00`.

**Reference solution:**
```java
interface Payable {
    double amountDue();

    static double total(Payable[] items) {
        double sum = 0;
        for (Payable p : items) {
            sum += p.amountDue();
        }
        return sum;
    }
}

class Invoice implements Payable {
    private String number;
    private double amount;
    private double taxRate;

    public Invoice(String number, double amount, double taxRate) {
        this.number = number;
        this.amount = amount;
        this.taxRate = taxRate;
    }

    @Override
    public double amountDue() {
        return amount + amount * taxRate;
    }
}

class Subscription implements Payable {
    private String plan;
    private double monthlyFee;
    private int months;

    public Subscription(String plan, double monthlyFee, int months) {
        this.plan = plan;
        this.monthlyFee = monthlyFee;
        this.months = months;
    }

    @Override
    public double amountDue() {
        double due = monthlyFee * months;
        if (months >= 12) {
            due = due * 0.9;
        }
        return due;
    }
}

public class PayableDemo {
    public static void main(String[] args) {
        Payable[] items = {
            new Invoice("INV-7", 20000, 0.075),
            new Subscription("Premium", 3000, 12),
            new Subscription("Basic", 1000, 3)
        };
        for (int i = 0; i < items.length; i++) {
            System.out.printf("Item %d due: %.2f%n", i + 1, items[i].amountDue());
        }
        System.out.printf("Total due: %.2f%n", Payable.total(items));
    }
}
```

**Rubric:**
- 2 pts: `Payable` interface with the abstract method and a static method with a body (a)
- 2 pts: `Invoice` correct and `implements Payable` (b)
- 3 pts: `Subscription` correct including the 10% discount rule (c)
- 2 pts: `Payable[]` used polymorphically, total through `Payable.total` (d)
- 1 pt: output matches

**Common mistakes:**
- Writing `extends Payable` in a class.
- Implementing `amountDue()` without `public` (interface methods are public).
- Calling the static method as `items.total()` instead of `Payable.total(items)`.

### Q177
- id: Q177
- section: F
- type: write-code
- difficulty: medium
- topic: multilevel inheritance
- points: 11
- time_minutes: 20
- source: variant-of-slides

**Task:**
Implement multilevel inheritance `Employee` to `Manager` to `SeniorManager`, each class adding one new field.

(a) `Employee` has a private `String name`, a constructor `Employee(String name)` that prints `Employee constructor: ` and the name, a getter, and `String describe()` returning `Name: ` and the name.

(b) `Manager extends Employee` adds a private `int teamSize`. Its constructor takes `(String name, int teamSize)`, calls `super(name)` and prints `Manager constructor: team size ` and the value. It overrides `describe()` to add `, Team size: ` and the team size, reusing `super.describe()`.

(c) `SeniorManager extends Manager` adds a private `String region`. Its constructor takes `(String name, int teamSize, String region)` and prints `SeniorManager constructor: region ` and the region. Its `describe()` adds `, Region: ` and the region, reusing `super.describe()`.

(d) In `HierarchyDemo`, create `SeniorManager("Ngozi", 8, "South-West")`, print `describe()`, assign it to an `Employee` variable and print `describe()` again, print the result of `instanceof Employee`, then create `Manager("Kemi", 3)` and print its `describe()`.

```
Employee constructor: Ngozi
Manager constructor: team size 8
SeniorManager constructor: region South-West
Name: Ngozi, Team size: 8, Region: South-West
Name: Ngozi, Team size: 8, Region: South-West
sm instanceof Employee: true
Employee constructor: Kemi
Manager constructor: team size 3
Name: Kemi, Team size: 3
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- Three classes joined by `extends` (single chain, multilevel inheritance); all fields `private` with a constructor each.
- Each constructor's first statement is the `super(...)` call, so the messages print in the order `Employee`, `Manager`, `SeniorManager`.
- `describe()` is overridden in `Manager` and `SeniorManager`, each reusing `super.describe()`.
- The call through the `Employee` reference runs `SeniorManager.describe()` (dynamic dispatch).
- `sm instanceof Employee` prints `true`; the `Manager("Kemi", 3)` lines are as shown.

**Reference solution:**
```java
class Employee {
    private String name;

    public Employee(String name) {
        this.name = name;
        System.out.println("Employee constructor: " + name);
    }

    public String getName() {
        return name;
    }

    public String describe() {
        return "Name: " + name;
    }
}

class Manager extends Employee {
    private int teamSize;

    public Manager(String name, int teamSize) {
        super(name);
        this.teamSize = teamSize;
        System.out.println("Manager constructor: team size " + teamSize);
    }

    public int getTeamSize() {
        return teamSize;
    }

    @Override
    public String describe() {
        return super.describe() + ", Team size: " + teamSize;
    }
}

class SeniorManager extends Manager {
    private String region;

    public SeniorManager(String name, int teamSize, String region) {
        super(name, teamSize);
        this.region = region;
        System.out.println("SeniorManager constructor: region " + region);
    }

    public String getRegion() {
        return region;
    }

    @Override
    public String describe() {
        return super.describe() + ", Region: " + region;
    }
}

public class HierarchyDemo {
    public static void main(String[] args) {
        SeniorManager sm = new SeniorManager("Ngozi", 8, "South-West");
        System.out.println(sm.describe());
        Employee e = sm;
        System.out.println(e.describe());
        System.out.println("sm instanceof Employee: " + (sm instanceof Employee));
        Manager m = new Manager("Kemi", 3);
        System.out.println(m.describe());
    }
}
```

**Rubric:**
- 2 pts: three classes with correct `extends` chain and private fields (a), (b), (c)
- 3 pts: constructors use `super(...)` first and print the required messages (a), (b), (c)
- 3 pts: `describe()` overridden in both subclasses using `super.describe()` (b), (c)
- 2 pts: `Employee` reference calls the overridden method and `instanceof` is shown (d)
- 1 pt: output matches

**Common mistakes:**
- Not passing all inherited data up with `super(name, teamSize)`.
- Writing `describe()` in the subclass without `super.describe()`, so the name is lost.
- Leaving out the `Manager` constructor parameter that `SeniorManager` needs to pass up.

### Q178
- id: Q178
- section: F
- type: write-code
- difficulty: hard
- topic: abstract class payment
- points: 13
- time_minutes: 25
- source: variant-of-slides

**Task:**
Build a payment system around an abstract `PaymentMethod`.

(a) `abstract class PaymentMethod` with `protected double amountPaid`, `protected String status` (initially `"PENDING"`), a concrete `String printReceipt()` and an abstract `void processPayment(double amount)`. `printReceipt()` returns three lines: `Method: ` and the class simple name, `Amount paid: ` and the amount (2 decimals), `Status: ` and the status.

(b) `CardPayment`: `processPayment` throws `IllegalArgumentException("Amount must be positive")` unless `amount > 0`. Otherwise it sets `amountPaid` to the amount plus a 1.5% fee and `status` to `CARD APPROVED`.

(c) `CashPayment`: if `amount > 200000` throw `IllegalArgumentException("Cash payments above N200,000 are not allowed.")`. Otherwise set `amountPaid` to the amount and `status` to `CASH RECEIVED`.

(d) In `PaymentDemo`, write `static void attempt(PaymentMethod p, double amount)` that calls `processPayment` inside a `try`/`catch`; on failure it prints `Payment failed: ` and the message. In both cases it then prints the receipt followed by a line `---`.

(e) In `main`, call `attempt` with `CardPayment` 10000, `CashPayment` 50000 and `CashPayment` 250000, using a `PaymentMethod` reference each time.

```
Method: CardPayment
Amount paid: 10150.00
Status: CARD APPROVED
---
Method: CashPayment
Amount paid: 50000.00
Status: CASH RECEIVED
---
Payment failed: Cash payments above N200,000 are not allowed.
Method: CashPayment
Amount paid: 0.00
Status: PENDING
---
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `PaymentMethod` is `abstract`, has `protected` fields (initial status `PENDING`), a concrete `printReceipt()` and an abstract `processPayment(double)`.
- `CardPayment.processPayment`: validates `amount > 0`, `amountPaid = amount + amount * 0.015`, status `CARD APPROVED`. Method is `public` and marked `@Override`.
- `CashPayment.processPayment`: throws `IllegalArgumentException` with the exact message when `amount > 200000` (the limit check must not be reversed); otherwise sets amount and status.
- `attempt(PaymentMethod, double)` catches `IllegalArgumentException`, prints `Payment failed: ` + message, then always prints the receipt and `---`.
- `main` uses `PaymentMethod` references; the third payment leaves the amount `0.00` and status `PENDING`.

**Reference solution:**
```java
abstract class PaymentMethod {
    protected double amountPaid;
    protected String status = "PENDING";

    public String printReceipt() {
        return "Method: " + getClass().getSimpleName()
                + "\nAmount paid: " + String.format("%.2f", amountPaid)
                + "\nStatus: " + status;
    }

    public abstract void processPayment(double amount);
}

class CardPayment extends PaymentMethod {
    @Override
    public void processPayment(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        amountPaid = amount + amount * 0.015;
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

public class PaymentDemo {
    static void attempt(PaymentMethod p, double amount) {
        try {
            p.processPayment(amount);
        } catch (IllegalArgumentException e) {
            System.out.println("Payment failed: " + e.getMessage());
        }
        System.out.println(p.printReceipt());
        System.out.println("---");
    }

    public static void main(String[] args) {
        PaymentMethod card = new CardPayment();
        PaymentMethod cash = new CashPayment();
        PaymentMethod bigCash = new CashPayment();
        attempt(card, 10000);
        attempt(cash, 50000);
        attempt(bigCash, 250000);
    }
}
```

**Rubric:**
- 3 pts: `PaymentMethod` correct: abstract class, `protected` fields, concrete receipt, abstract method (a)
- 2 pts: `CardPayment` correct, including the fee and status (b)
- 3 pts: `CashPayment` correct, with the limit check in the right direction and the exact message (c)
- 3 pts: `attempt` catches the exception and always prints the receipt and separator (d)
- 2 pts: `main` uses `PaymentMethod` references and produces the required output (e)

**Common mistakes:**
- Writing the cash limit check backwards (`amount < 200000` throws).
- Overriding `processPayment` without `public`.
- Using `throw` in the method header instead of `throws`, or catching the exception in the wrong place so the receipt is not printed.

### Q179
- id: Q179
- section: F
- type: write-code
- difficulty: hard
- topic: interface default methods
- points: 13
- time_minutes: 25
- source: variant-of-slides

**Task:**
Practise interfaces with default methods and resolve a default-method conflict.

(a) Interface `Flyable` with an abstract method `int maxAltitude()` and a **default** method `String move()` that returns `"flies"`.

(b) Interface `Swimmable` with an abstract method `int maxDepth()` and a **default** method `String move()` that returns `"swims"`.

(c) Class `Duck implements Flyable, Swimmable` with a name. `maxAltitude()` returns `300` and `maxDepth()` returns `2`. Because both interfaces give `move()` a default, `Duck` must override `move()` and return the two results joined by `" and "`, by calling each interface's default through `Interface.super.move()`.

(d) Class `Fish implements Swimmable` (`maxDepth()` returns `50`, no override of `move()`) and class `Eagle implements Flyable` (`maxAltitude()` returns `3000`, no override of `move()`).

(e) In `AnimalDemo`, create `new Duck("Donald")`. Print the name and `move()`, then the altitude and depth. Put the duck and a `Fish` in a `Swimmable[]` and print `Swimmer ` + `move()` + ` to depth ` + `maxDepth()` for each. Finally print `Eagle ` + `move()` + ` up to ` + `maxAltitude()` using a `Flyable` reference.

```
Donald flies and swims
Max altitude: 300, max depth: 2
Swimmer flies and swims to depth 2
Swimmer swims to depth 50
Eagle flies up to 3000
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `Flyable` and `Swimmable` each declare one abstract method and a `default String move()` (the `default` keyword is required for a body).
- `Duck` uses `implements Flyable, Swimmable` and overrides `move()` as `public` using `Flyable.super.move()` and `Swimmable.super.move()`; without the override the class does not compile.
- `Fish` and `Eagle` inherit the default `move()` unchanged.
- The `Swimmable[]` call on the duck runs `Duck.move()` (dynamic dispatch through an interface reference).
- Output exactly as shown.

**Reference solution:**
```java
interface Flyable {
    int maxAltitude();

    default String move() {
        return "flies";
    }
}

interface Swimmable {
    int maxDepth();

    default String move() {
        return "swims";
    }
}

class Duck implements Flyable, Swimmable {
    private String name;

    public Duck(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public int maxAltitude() {
        return 300;
    }

    @Override
    public int maxDepth() {
        return 2;
    }

    @Override
    public String move() {
        return Flyable.super.move() + " and " + Swimmable.super.move();
    }
}

class Fish implements Swimmable {
    @Override
    public int maxDepth() {
        return 50;
    }
}

class Eagle implements Flyable {
    @Override
    public int maxAltitude() {
        return 3000;
    }
}

public class AnimalDemo {
    public static void main(String[] args) {
        Duck duck = new Duck("Donald");
        System.out.println(duck.getName() + " " + duck.move());
        System.out.println("Max altitude: " + duck.maxAltitude() + ", max depth: " + duck.maxDepth());
        Swimmable[] swimmers = {duck, new Fish()};
        for (Swimmable s : swimmers) {
            System.out.println("Swimmer " + s.move() + " to depth " + s.maxDepth());
        }
        Flyable f = new Eagle();
        System.out.println("Eagle " + f.move() + " up to " + f.maxAltitude());
    }
}
```

**Rubric:**
- 3 pts: both interfaces correct, with `default` methods and abstract methods (a), (b)
- 4 pts: `Duck` implements both and overrides `move()` using `Flyable.super.move()` and `Swimmable.super.move()` (c)
- 2 pts: `Fish` and `Eagle` correct (d)
- 2 pts: `main` uses interface references and arrays correctly (e)
- 2 pts: output matches

**Common mistakes:**
- Omitting the `default` keyword (an interface method body is then illegal).
- Not overriding `move()` in `Duck` (conflict compile error).
- Writing `super.move()` instead of `Flyable.super.move()`.

### Q180
- id: Q180
- section: F
- type: write-code
- difficulty: hard
- topic: inheritance constructor chaining
- points: 15
- time_minutes: 30
- source: variant-of-assignment

**Task:**
Write a small student-records model in the style of the course assignment.

(a) `Person` with a private `String name`, a constructor, `getName()` and `setName(String)`. `setName` (also used by the constructor) throws `IllegalArgumentException("Name cannot be empty")` if the name is `null` or blank, otherwise it stores the trimmed name. `toString()` returns `Name: ` and the name.

(b) `Course` with private `String code` and `int creditUnit`, a constructor, getters, and `toString()` returning the code.

(c) `Student extends Person` with private `String studentId`, `String department` and `ArrayList<Course> courses`. Its constructor `(String name, String studentId, String department)` uses `super(name)` and creates the empty list. `registerCourse(Course c)` throws `IllegalArgumentException("Course cannot be null")` for `null` and `IllegalArgumentException("Course already registered: " + code)` for a duplicate code. `int totalUnits()` sums credit units. `toString()` returns `super.toString()` followed by `, ID: `, `, Dept: ` and `, Courses: ` and the list.

(d) `GraduateStudent extends Student` with private `String thesisTitle`. Its constructor takes the three student values plus the thesis title. `toString()` returns `super.toString()` followed by `, Thesis: ` and the title.

(e) In `RecordsDemo`, create `Student("Chidi Eze", "UI/CSC/2026/014", "Computer Science")`, register `CSC201` (3 units) and `CSC203` (2 units), then attempt to register `CSC201` again and print the error. Create `GraduateStudent("Amina Yusuf", "UI/CSC/2025/007", "Computer Science", "Fraud Detection with XGBoost")`. Put both in a `Person[]` and print each. Print the first student's total units. Finally try `new Person("  ")` and print the error.

```
Error: Course already registered: CSC201
Name: Chidi Eze, ID: UI/CSC/2026/014, Dept: Computer Science, Courses: [CSC201, CSC203]
Name: Amina Yusuf, ID: UI/CSC/2025/007, Dept: Computer Science, Courses: [], Thesis: Fraud Detection with XGBoost
Total units: 5
Error: Name cannot be empty
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `Person`: private `name`; the constructor goes through validation (`setName`); blank or `null` names rejected with the exact message; `toString()` as specified.
- `Course`: private fields, constructor, getters, `toString()` returns the code.
- `Student`: `super(name)` is the first statement of the constructor; fields private; `courses` is an `ArrayList<Course>` created in the constructor; `registerCourse` rejects `null` and duplicates; `totalUnits()` sums units; `toString()` reuses `super.toString()`.
- `GraduateStudent`: passes the three values to `super(...)` and extends `toString()` using `super.toString()`.
- `main`: `Person[]` holds a `Student` and a `GraduateStudent`; printing uses dynamic dispatch; output exactly as shown (total units `5`).

**Reference solution:**
```java
import java.util.ArrayList;

class Person {
    private String name;

    public Person(String name) {
        setName(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        this.name = name.trim();
    }

    @Override
    public String toString() {
        return "Name: " + name;
    }
}

class Course {
    private String code;
    private int creditUnit;

    public Course(String code, int creditUnit) {
        this.code = code;
        this.creditUnit = creditUnit;
    }

    public String getCode() {
        return code;
    }

    public int getCreditUnit() {
        return creditUnit;
    }

    @Override
    public String toString() {
        return code;
    }
}

class Student extends Person {
    private String studentId;
    private String department;
    private ArrayList<Course> courses;

    public Student(String name, String studentId, String department) {
        super(name);
        this.studentId = studentId;
        this.department = department;
        this.courses = new ArrayList<Course>();
    }

    public void registerCourse(Course c) {
        if (c == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }
        for (Course existing : courses) {
            if (existing.getCode().equals(c.getCode())) {
                throw new IllegalArgumentException("Course already registered: " + c.getCode());
            }
        }
        courses.add(c);
    }

    public int totalUnits() {
        int total = 0;
        for (Course c : courses) {
            total += c.getCreditUnit();
        }
        return total;
    }

    @Override
    public String toString() {
        return super.toString() + ", ID: " + studentId + ", Dept: " + department + ", Courses: " + courses;
    }
}

class GraduateStudent extends Student {
    private String thesisTitle;

    public GraduateStudent(String name, String studentId, String department, String thesisTitle) {
        super(name, studentId, department);
        this.thesisTitle = thesisTitle;
    }

    @Override
    public String toString() {
        return super.toString() + ", Thesis: " + thesisTitle;
    }
}

public class RecordsDemo {
    public static void main(String[] args) {
        Student s = new Student("Chidi Eze", "UI/CSC/2026/014", "Computer Science");
        s.registerCourse(new Course("CSC201", 3));
        s.registerCourse(new Course("CSC203", 2));
        try {
            s.registerCourse(new Course("CSC201", 3));
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
        GraduateStudent g = new GraduateStudent("Amina Yusuf", "UI/CSC/2025/007",
                "Computer Science", "Fraud Detection with XGBoost");
        Person[] people = {s, g};
        for (Person p : people) {
            System.out.println(p);
        }
        System.out.println("Total units: " + s.totalUnits());
        try {
            new Person("  ");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

**Rubric:**
- 3 pts: `Person` correct, with validation applied in the constructor path (a)
- 1 pt: `Course` correct (b)
- 5 pts: `Student`: `super(name)` first, `ArrayList<Course>`, `registerCourse` with both exceptions, `totalUnits`, `toString` using `super.toString()` (c)
- 2 pts: `GraduateStudent` constructor chaining and `toString` (d)
- 4 pts: `RecordsDemo` produces the required output, using a `Person[]` (e)

**Common mistakes:**
- Assigning `this.name` in the `Person` constructor directly, which skips validation.
- Forgetting `new ArrayList<Course>()` (`NullPointerException` on the first registration).
- Accessing the private `name` from `Student.toString()` instead of using `super.toString()`.

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

### Q181
- id: Q181
- section: G
- type: write-code
- difficulty: medium
- topic: custom exception try-catch-finally
- points: 9
- time_minutes: 20
- source: original

**Task:**
A bank wants a withdrawal that refuses to overdraw an account. Write the following.

(a) A **checked** exception class `InsufficientFundsException` that extends `Exception`. It has a private `double shortfall` field, a constructor `InsufficientFundsException(String message, double shortfall)` that passes the message to `super`, and a getter `getShortfall()`.

(b) A class `BankAccount` with a private `String accountNumber` and a private `double balance`, a constructor taking both, and getters `getAccountNumber()` and `getBalance()`.

(c) In `BankAccount`, a method `public void withdraw(double amount) throws InsufficientFundsException`. If `amount <= 0` it throws `IllegalArgumentException("Amount must be positive")`. If `amount` is more than the balance it throws `InsufficientFundsException("Insufficient funds", amount - balance)`. Otherwise it reduces the balance.

(d) In a class `BankDemo` with `main`: create account `ACC-100` with `5000`, print its balance, then loop over the attempts `2000`, `4500` and `-100`. Each attempt uses its own `try` block with `catch` blocks for `InsufficientFundsException` and `IllegalArgumentException`, and a `finally` block that prints the current balance.

(e) Money is printed with two decimals. Your output must look like this:

```
Account ACC-100 balance 5000.00
Try 1: withdraw 2000.00
 Withdrawn 2000.00
 [finally] Balance now 3000.00
Try 2: withdraw 4500.00
 Error: Insufficient funds. Short by 1500.00
 [finally] Balance now 3000.00
Try 3: withdraw -100.00
 Error: Amount must be positive
 [finally] Balance now 3000.00
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `InsufficientFundsException extends Exception` (checked), with `shortfall`, a two-argument constructor calling `super(message)` and `getShortfall()`.
- `BankAccount` has private fields, a constructor, and getters.
- `withdraw` declares `throws InsufficientFundsException`, validates `amount <= 0` first, then the overdraw check, using the exact messages.
- `main` has one `try` per attempt with a `catch` for each exception type and a `finally` that always prints the balance.
- Output matches the sample, including that `finally` runs after both the success and the error cases.

**Reference solution:**
```java
class InsufficientFundsException extends Exception {
    private final double shortfall;

    public InsufficientFundsException(String message, double shortfall) {
        super(message);
        this.shortfall = shortfall;
    }

    public double getShortfall() {
        return shortfall;
    }
}

class BankAccount {
    private final String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds", amount - balance);
        }
        balance -= amount;
    }
}

public class BankDemo {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-100", 5000);
        System.out.printf("Account %s balance %.2f%n", acc.getAccountNumber(), acc.getBalance());
        double[] attempts = {2000, 4500, -100};
        for (int i = 0; i < attempts.length; i++) {
            System.out.printf("Try %d: withdraw %.2f%n", i + 1, attempts[i]);
            try {
                acc.withdraw(attempts[i]);
                System.out.printf(" Withdrawn %.2f%n", attempts[i]);
            } catch (InsufficientFundsException e) {
                System.out.printf(" Error: %s. Short by %.2f%n", e.getMessage(), e.getShortfall());
            } catch (IllegalArgumentException e) {
                System.out.println(" Error: " + e.getMessage());
            } finally {
                System.out.printf(" [finally] Balance now %.2f%n", acc.getBalance());
            }
        }
    }
}
```

**Rubric:**
- (a) 2 pts: checked exception extending `Exception`, `shortfall` field, constructor with `super(message)`, getter
- (b) 1 pt: encapsulated `BankAccount` with constructor and getters
- (c) 2 pts: `throws` in the signature, both checks in the right order with the exact messages, balance reduced only on success
- (d) 3 pts: separate `try` per attempt, a `catch` for each type, `finally` printing the balance
- (e) 1 pt: output matches the sample; any equivalent loop or three separate try blocks is accepted

**Common mistakes:**
- Writing `throw` instead of `throws` in the method header, or forgetting it so the code does not compile.
- Extending `RuntimeException`, which makes the exception unchecked, so the task's "checked" requirement is not met.
- Putting the `finally` printing inside `try`, so it is skipped when an exception is thrown.

### Q182
- id: Q182
- section: G
- type: write-code
- difficulty: medium
- topic: ArrayList remove sort search
- points: 10
- time_minutes: 25
- source: original

**Task:**
A department keeps a list of students in an `ArrayList<Student>`. Write the following.

(a) A class `Student` implementing `Comparable<Student>` with private fields `String name`, `String matricNo`, `int score`, a constructor taking them in that order, getters, and `toString()` returning `name + " (" + matricNo + ") - " + score`. Two students are equal when their `matricNo` values are equal (override `equals` and `hashCode`). `compareTo` orders students by `name` alphabetically.

(b) A class `StudentRegistry` holding a private `ArrayList<Student> students`, with methods `add(Student s)`, `Student removeAt(int index)` (returns the removed student), `boolean remove(Student s)`, `Student find(String matricNo)` (returns `null` when not found) and `void sortByName()` using `Collections.sort`.

(c) A method `void printAll()` that prints each student on its own line, prefixed by its index and `": "`.

(d) In a class `RegistryDemo` with `main`: add `Bello Musa` (`UI/MTH/2026/003`, 55), `Adeyemi Tola` (`UI/CSC/2026/014`, 68), `Okafor Ngozi` (`UI/PHY/2026/021`, 74) and `Chike Eze` (`UI/CSC/2026/030`, 49). Print all, remove the student at index `1`, remove the student with matric number `UI/PHY/2026/021` by passing a **new** `Student` object with that matric number, add `Akin Bode` (`UI/CSC/2026/008`, 80), sort by name, print all, then search for `UI/CSC/2026/030` and `UI/ZZZ/2026/999`.

(e) Also in `main`, create `ArrayList<Integer> nums` holding `10, 20, 30, 40`. Call `nums.remove(1)` and print the list, then call `nums.remove(Integer.valueOf(30))` and print the list.

Expected output:

```
0: Bello Musa (UI/MTH/2026/003) - 55
1: Adeyemi Tola (UI/CSC/2026/014) - 68
2: Okafor Ngozi (UI/PHY/2026/021) - 74
3: Chike Eze (UI/CSC/2026/030) - 49
Removed at index 1: Adeyemi Tola (UI/CSC/2026/014) - 68
Removed by object: true
0: Akin Bode (UI/CSC/2026/008) - 80
1: Bello Musa (UI/MTH/2026/003) - 55
2: Chike Eze (UI/CSC/2026/030) - 49
Found: Chike Eze (UI/CSC/2026/030) - 49
Not found
[10, 30, 40]
[10, 40]
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `Student implements Comparable<Student>`; `compareTo` compares `name`; `equals`/`hashCode` use `matricNo`.
- `StudentRegistry` wraps an `ArrayList<Student>` with `add`, `removeAt` (uses `remove(int)` and returns the element), `remove(Student)` (uses `remove(Object)`, which relies on `equals`), `find` (returns `null` if absent) and `sortByName` (`Collections.sort`).
- `printAll` prints `index: student`.
- `main` follows the steps in (d) and the output above is produced.
- Part (e): `nums.remove(1)` removes the element at index 1 (`20`), and `nums.remove(Integer.valueOf(30))` removes the value `30`.

**Reference solution:**
```java
import java.util.ArrayList;
import java.util.Collections;

class Student implements Comparable<Student> {
    private final String name;
    private final String matricNo;
    private final int score;

    public Student(String name, String matricNo, int score) {
        this.name = name;
        this.matricNo = matricNo;
        this.score = score;
    }

    public String getName() {
        return name;
    }

    public String getMatricNo() {
        return matricNo;
    }

    public int getScore() {
        return score;
    }

    @Override
    public int compareTo(Student other) {
        return name.compareTo(other.name);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return matricNo.equals(((Student) o).matricNo);
    }

    @Override
    public int hashCode() {
        return matricNo.hashCode();
    }

    @Override
    public String toString() {
        return name + " (" + matricNo + ") - " + score;
    }
}

class StudentRegistry {
    private ArrayList<Student> students = new ArrayList<>();

    public void add(Student s) {
        students.add(s);
    }

    public Student removeAt(int index) {
        return students.remove(index);
    }

    public boolean remove(Student s) {
        return students.remove(s);
    }

    public Student find(String matricNo) {
        for (Student s : students) {
            if (s.getMatricNo().equals(matricNo)) {
                return s;
            }
        }
        return null;
    }

    public void sortByName() {
        Collections.sort(students);
    }

    public void printAll() {
        for (int i = 0; i < students.size(); i++) {
            System.out.println(i + ": " + students.get(i));
        }
    }
}

public class RegistryDemo {
    public static void main(String[] args) {
        StudentRegistry reg = new StudentRegistry();
        reg.add(new Student("Bello Musa", "UI/MTH/2026/003", 55));
        reg.add(new Student("Adeyemi Tola", "UI/CSC/2026/014", 68));
        reg.add(new Student("Okafor Ngozi", "UI/PHY/2026/021", 74));
        reg.add(new Student("Chike Eze", "UI/CSC/2026/030", 49));
        reg.printAll();
        System.out.println("Removed at index 1: " + reg.removeAt(1));
        System.out.println("Removed by object: " + reg.remove(new Student("?", "UI/PHY/2026/021", 0)));
        reg.add(new Student("Akin Bode", "UI/CSC/2026/008", 80));
        reg.sortByName();
        reg.printAll();
        Student found = reg.find("UI/CSC/2026/030");
        System.out.println(found != null ? "Found: " + found : "Not found");
        Student missing = reg.find("UI/ZZZ/2026/999");
        System.out.println(missing != null ? "Found: " + missing : "Not found");

        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(10);
        nums.add(20);
        nums.add(30);
        nums.add(40);
        nums.remove(1);
        System.out.println(nums);
        nums.remove(Integer.valueOf(30));
        System.out.println(nums);
    }
}
```

**Rubric:**
- (a) 2 pts: `Comparable<Student>` with `compareTo` on name, `equals` and `hashCode` on `matricNo`, getters and `toString`
- (b) 3 pts: `add`, `removeAt` returning the element, `remove(Student)` returning boolean, `find` returning `null`, `sortByName` with `Collections.sort`
- (c) 1 pt: `printAll` prints `index: student`
- (d) 2 pts: `main` performs the steps in order, and removal by a new object works because `equals` is overridden
- (e) 2 pts: `remove(1)` removes by index and `remove(Integer.valueOf(30))` removes by value; a simple loop in `find` or `students.indexOf` is accepted

**Common mistakes:**
- Not overriding `equals`, so `remove(new Student(...))` returns `false`.
- Writing `nums.remove(30)`, which throws `IndexOutOfBoundsException` because it is read as an index.
- Using `==` to compare matric numbers (Strings) in `find`.

### Q183
- id: Q183
- section: G
- type: write-code
- difficulty: medium
- topic: Swing form validation
- points: 11
- time_minutes: 30
- source: variant-of-test

**Task:**
Write a small Swing window for a **Hostel Fee Payment** form, similar to the Process Payment window in the code test.

(a) A class `FeeForm` with these private fields: a `JTextField amountField` (10 columns), a `JComboBox<String> typeBox` holding `"Hostel"` and `"Tuition"`, a `JButton payButton` labelled `"Pay"`, and a `JTextArea outputArea` (8 rows, 30 columns, not editable) placed inside a `JScrollPane`.

(b) A method `void buildWindow()` that creates a `JFrame` titled `"Fee Payment"`, uses a `FlowLayout`, adds a `JLabel("Amount:")`, the amount field, the combo box, the button and the scroll pane, sets `EXIT_ON_CLOSE`, calls `pack()` and then makes it visible.

(c) The button's `ActionListener` (an anonymous inner class is fine) must: trim the text; if it is empty show `JOptionPane` error `"Please enter an amount."` and return; parse it with `Double.parseDouble`; if the value is zero or less show `"Amount must be greater than zero."` and return.

(d) On a valid amount, **append** (do not replace) the line `"Paid " + amount + " for " + selectedType` followed by a newline to `outputArea` and clear the amount field. Use a **specific** `catch (NumberFormatException ex)` that shows the error `"Please enter a valid number."`. Do not use `catch (Exception e)`.

(e) A class `FeeApp` with `main` that creates a `FeeForm` and calls `buildWindow()`.

Submit the complete source code.

**Code:**
None.

**Answer key:**
- `FeeForm` has the four components with the right types; `JComboBox<String>` uses the generic type; the text area is non-editable and wrapped in a `JScrollPane`.
- `buildWindow` builds the `JFrame`, `FlowLayout`, adds all components, sets `EXIT_ON_CLOSE`, calls `pack()`, then `setVisible(true)`.
- The listener is registered with `payButton.addActionListener(...)` and implements `actionPerformed(ActionEvent e)`.
- Validation: empty check, `parseDouble`, `<= 0` check; each failure shows a `JOptionPane` error with the stated text and returns.
- Success path uses `outputArea.append(...)` and clears the field; error handling uses `catch (NumberFormatException ex)`.
- `FeeApp.main` creates `FeeForm` and calls `buildWindow()`.

**Reference solution:**
```java
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

class FeeForm {
    private JTextField amountField = new JTextField(10);
    private JComboBox<String> typeBox = new JComboBox<>(new String[] {"Hostel", "Tuition"});
    private JButton payButton = new JButton("Pay");
    private JTextArea outputArea = new JTextArea(8, 30);

    public void buildWindow() {
        outputArea.setEditable(false);
        JFrame frame = new JFrame("Fee Payment");
        frame.setLayout(new FlowLayout());
        frame.add(new JLabel("Amount:"));
        frame.add(amountField);
        frame.add(typeBox);
        frame.add(payButton);
        frame.add(new JScrollPane(outputArea));

        payButton.addActionListener(new ActionListener() {
            @Override
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
                    String type = (String) typeBox.getSelectedItem();
                    outputArea.append("Paid " + amount + " for " + type + "\n");
                    amountField.setText("");
                } catch (NumberFormatException ex) {
                    JOptionPane.showMessageDialog(null, "Please enter a valid number.", "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}

public class FeeApp {
    public static void main(String[] args) {
        FeeForm form = new FeeForm();
        form.buildWindow();
    }
}
```

**Rubric:**
- (a) 2 pts: four fields with correct types, `JComboBox<String>`, non-editable `JTextArea` inside a `JScrollPane`
- (b) 2 pts: `buildWindow` creates and configures the frame in a valid order (`pack()` before `setVisible(true)`, `EXIT_ON_CLOSE`)
- (c) 3 pts: listener registered and `actionPerformed` correct; empty check and `<= 0` check each show an error and `return`
- (d) 3 pts: `append` (not `setText`), field cleared, specific `catch (NumberFormatException ex)` with the right message, no generic `catch (Exception e)`
- (e) 1 pt: `main` creates `FeeForm` and calls `buildWindow()`; a named listener class or `implements ActionListener` on `FeeForm` is also accepted

**Common mistakes:**
- Using `outputArea.setText(...)`, which erases earlier lines.
- Declaring `JComboBox` without `<String>` or forgetting the cast of `getSelectedItem()`.
- Never calling `payButton.addActionListener(...)`, so clicking does nothing.
- Calling `setVisible(true)` before adding the components.

### Q184
- id: Q184
- section: G
- type: write-code
- difficulty: hard
- topic: Person Student Course CGPA ArrayList
- points: 14
- time_minutes: 35
- source: variant-of-assignment

**Task:**
Build the model for a **Student Course Registration and CGPA Calculator**, as in the Java GUI assignment (no GUI is needed here).

(a) A class `Person` with a private `String name`, a constructor, a getter and a setter.

(b) A class `Course` with private `courseCode`, `courseTitle` (Strings), `creditUnit` (int) and `grade` (String), a constructor taking them in that order, and getters.

(c) A class `Student` that **extends** `Person`, with private `studentId` and `department` (Strings) and a private `ArrayList<Course> courses` created in the constructor `Student(String name, String studentId, String department)`. Add getters, and `getCourses()`.

(d) In `Student`: `void registerCourse(Course course)` throws `IllegalArgumentException("Course cannot be null")` for `null`, throws `IllegalArgumentException("Course already registered: " + code)` if a course with the same code is already in the list, otherwise adds it. `double calculateCGPA()` throws `IllegalStateException("A student must register at least 5 courses before CGPA can be calculated.")` when fewer than 5 courses are registered. Otherwise it returns the sum of (grade point x credit unit) divided by the sum of credit units, using the 5-point scale `A=5, B=4, C=3, D=2, E=1, F=0` (case-insensitive). An invalid grade throws `IllegalArgumentException("Invalid grade: " + grade)`. Beware of integer division.

(e) `String buildProfile()` returns the profile text in exactly the format below, using `String.format`. In a class `ProfileDemo` with `main`: create `Student("John Ade", "UI/CSC/2026/001", "Computer Science")` with the five courses `CSC201 Data Structures 3 A`, `CSC203 Computer Architecture 3 B`, `MTH201 Mathematics II 3 A`, `CSC205 Programming II 3 B`, `STA201 Statistics 2 C`, and print its profile. Then print the profile of `Student("Grace Obi", "UI/MTH/2026/007", "Mathematics")` with five courses of your choice. Finally create a student with only 3 courses, call `calculateCGPA()` inside a `try`/`catch (IllegalStateException e)` and print the message, and show that registering the same course twice is rejected, using a `catch (IllegalArgumentException e)`.

The profile format (the course rows use `%-15s%-25s%-9d%s`; the CGPA uses two decimals):

```
===============================================
UNIVERSITY OF IBADAN - FACULTY OF COMPUTING
STUDENT PROFILE
===============================================

Student ID : UI/CSC/2026/001
Name       : John Ade
Department : Computer Science

Courses Registered: 5

---------------------------------------------------------------
Course Code    Course Title             CU       Grade
---------------------------------------------------------------
CSC201         Data Structures          3        A
CSC203         Computer Architecture    3        B
MTH201         Mathematics II           3        A
CSC205         Programming II           3        B
STA201         Statistics               2        C
---------------------------------------------------------------

Total Credit Units : 14
CGPA               : 4.29

===============================================
```

Submit the complete source code and a sample of the output.

**Code:**
None.

**Answer key:**
- `Student extends Person`; `name` is private in `Person` and read through `getName()` in `Student`; every field is private.
- `courses` is an `ArrayList<Course>` initialised in the constructor.
- `registerCourse` rejects `null` and duplicate codes with the exact messages, else adds.
- `calculateCGPA` checks `courses.size() < 5` first and throws `IllegalStateException` with the exact message; uses the 5-point scale; uses `double` arithmetic (no integer division); invalid grade throws `IllegalArgumentException`.
- `buildProfile` reproduces the format, with total credit units `14` and CGPA `4.29` for John Ade (60 / 14).
- `main` prints two profiles and demonstrates both exceptions with specific `catch` blocks.

**Reference solution:**
```java
import java.util.ArrayList;

class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class Course {
    private String courseCode;
    private String courseTitle;
    private int creditUnit;
    private String grade;

    public Course(String courseCode, String courseTitle, int creditUnit, String grade) {
        this.courseCode = courseCode;
        this.courseTitle = courseTitle;
        this.creditUnit = creditUnit;
        this.grade = grade;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public int getCreditUnit() {
        return creditUnit;
    }

    public String getGrade() {
        return grade;
    }
}

class Student extends Person {
    private String studentId;
    private String department;
    private ArrayList<Course> courses;

    public Student(String name, String studentId, String department) {
        super(name);
        this.studentId = studentId;
        this.department = department;
        this.courses = new ArrayList<>();
    }

    public String getStudentId() {
        return studentId;
    }

    public String getDepartment() {
        return department;
    }

    public ArrayList<Course> getCourses() {
        return courses;
    }

    public void registerCourse(Course course) {
        if (course == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }
        for (Course c : courses) {
            if (c.getCourseCode().equals(course.getCourseCode())) {
                throw new IllegalArgumentException("Course already registered: " + course.getCourseCode());
            }
        }
        courses.add(course);
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

    private int totalUnits() {
        int total = 0;
        for (Course c : courses) {
            total += c.getCreditUnit();
        }
        return total;
    }

    public double calculateCGPA() {
        if (courses.size() < 5) {
            throw new IllegalStateException("A student must register at least 5 courses before CGPA can be calculated.");
        }
        int totalPoints = 0;
        for (Course c : courses) {
            totalPoints += gradePoint(c.getGrade()) * c.getCreditUnit();
        }
        return (double) totalPoints / totalUnits();
    }

    public String buildProfile() {
        String line = "===============================================";
        String dash = "---------------------------------------------------------------";
        StringBuilder sb = new StringBuilder();
        sb.append(line).append("\n");
        sb.append("UNIVERSITY OF IBADAN - FACULTY OF COMPUTING\n");
        sb.append("STUDENT PROFILE\n");
        sb.append(line).append("\n\n");
        sb.append("Student ID : ").append(studentId).append("\n");
        sb.append("Name       : ").append(getName()).append("\n");
        sb.append("Department : ").append(department).append("\n\n");
        sb.append("Courses Registered: ").append(courses.size()).append("\n\n");
        sb.append(dash).append("\n");
        sb.append("Course Code    Course Title             CU       Grade\n");
        sb.append(dash).append("\n");
        for (Course c : courses) {
            sb.append(String.format("%-15s%-25s%-9d%s%n", c.getCourseCode(), c.getCourseTitle(), c.getCreditUnit(), c.getGrade()));
        }
        sb.append(dash).append("\n\n");
        sb.append("Total Credit Units : ").append(totalUnits()).append("\n");
        sb.append(String.format("CGPA               : %.2f%n", calculateCGPA()));
        sb.append("\n").append(line).append("\n");
        return sb.toString();
    }
}

public class ProfileDemo {
    public static void main(String[] args) {
        Student john = new Student("John Ade", "UI/CSC/2026/001", "Computer Science");
        john.registerCourse(new Course("CSC201", "Data Structures", 3, "A"));
        john.registerCourse(new Course("CSC203", "Computer Architecture", 3, "B"));
        john.registerCourse(new Course("MTH201", "Mathematics II", 3, "A"));
        john.registerCourse(new Course("CSC205", "Programming II", 3, "B"));
        john.registerCourse(new Course("STA201", "Statistics", 2, "C"));
        System.out.println(john.buildProfile());

        Student grace = new Student("Grace Obi", "UI/MTH/2026/007", "Mathematics");
        grace.registerCourse(new Course("MTH201", "Mathematics II", 3, "B"));
        grace.registerCourse(new Course("MTH203", "Linear Algebra", 3, "A"));
        grace.registerCourse(new Course("MTH205", "Real Analysis", 3, "C"));
        grace.registerCourse(new Course("STA201", "Statistics", 2, "B"));
        grace.registerCourse(new Course("COS201", "Programming I", 2, "A"));
        System.out.println(grace.buildProfile());

        Student tunde = new Student("Tunde Bello", "UI/PHY/2026/012", "Physics");
        tunde.registerCourse(new Course("PHY201", "Mechanics", 3, "B"));
        tunde.registerCourse(new Course("PHY203", "Optics", 3, "C"));
        tunde.registerCourse(new Course("MTH201", "Mathematics II", 3, "A"));
        try {
            tunde.calculateCGPA();
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
        try {
            tunde.registerCourse(new Course("PHY201", "Mechanics", 3, "B"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}
```

**Rubric:**
- (a) and (b) 2 pts: `Person` and `Course` are fully encapsulated with the stated constructors and getters (setter on `Person`)
- (c) 2 pts: `Student extends Person`, private fields, `ArrayList<Course>` created in the constructor, `super(name)` first
- (d) registration 2 pts: `null` check and duplicate check with the exact messages (note: `== null`, not `!= null`)
- (d) CGPA 4 pts: `< 5` check with the exact message, correct grade-point mapping (case-insensitive, invalid grade exception), weighted by credit units, `double` division
- (e) 4 pts: `buildProfile` matches the format (`String.format`, CGPA 2 d.p., total units), `main` prints two profiles and demonstrates both exceptions with specific catch blocks; a `switch`, `if` chain or helper method for grade points are all accepted

**Common mistakes:**
- Integer division: `totalPoints / totalUnits` with two `int`s gives `4`, not `4.29`.
- Writing `courses.size() > 5` or `if (course != null) throw ...`, the inverted checks the lecturer likes to plant.
- Assigning `this.name = name` in `Student`, which does not compile because `name` is private in `Person`; use `super(name)`.
- Using a generic `catch (Exception e)` instead of the specific exception types.

### Q185
- id: Q185
- section: G
- type: write-code
- difficulty: hard
- topic: Swing registration CGPA app
- points: 15
- time_minutes: 35
- source: variant-of-assignment

**Task:**
Write the GUI of the **Student Course Registration and CGPA Calculator** from the assignment. The model classes below are already written and correct; **do not rewrite them**.

```java
class Course {
    public Course(String code, String title, int unit, String grade)
    public String getCourseCode()
    public String getCourseTitle()
    public int getCreditUnit()
    public String getGrade()
}
class Student {
    public Student(String name, String studentId, String department)
    public void registerCourse(Course c)       // throws IllegalArgumentException if null or duplicate
    public double calculateCGPA()              // throws IllegalStateException if fewer than 5 courses
    public String buildProfile()               // full formatted profile text (needs 5+ courses)
    public int getCourseCount()
}
```

Write a class `RegistrationApp` with the following.

(a) Private fields: `JTextField` for student ID, name, department, course code, course title and credit unit; `JComboBox<String> gradeBox` with `A` to `F`; `JButton` objects `registerButton`, `cgpaButton`, `clearButton`, `exitButton`; a `JTextArea profileArea` (15 rows, 45 columns, not editable) inside a `JScrollPane`; and a `Student student` field that starts as `null`.

(b) `void buildWindow()` creates a `JFrame` titled `"COS 202 Registration"`, uses a `GridLayout` for the form labels and fields followed by the buttons, adds the scroll pane, sets `EXIT_ON_CLOSE`, calls `pack()` and `setVisible(true)`.

(c) The **Register** button: if any of the student ID, name, department, course code, course title or unit fields is empty after trimming, show the JOptionPane error `"All fields are required."` and return. Parse the unit with `Integer.parseInt`; a value of zero or less shows `"Credit unit must be a positive whole number."` and returns. If `student` is `null`, create it from the ID, name and department fields. Register `new Course(...)` with the selected grade, then `append` a line `"Registered " + code + ". Total courses: " + student.getCourseCount()` to `profileArea`, and clear the course fields. Use specific catch blocks: `NumberFormatException` (message `"Credit unit must be a whole number."`) and `IllegalArgumentException` (show `ex.getMessage()`).

(d) The **CGPA** button: if `student` is `null` show `"Register at least one course first."`; otherwise call `student.buildProfile()` and **replace** the text of `profileArea` with it, catching `IllegalStateException` and showing its message in a JOptionPane warning (`WARNING_MESSAGE`).

(e) The **Clear** button empties every text field, sets `student = null` and clears `profileArea`. The **Exit** button calls `System.exit(0)`. A class `RegistrationMain` has `main` that builds the window.

Submit the complete source code. (Your code only needs to compile together with the model classes; you may include simple stub versions of them to test.)

**Code:**
None.

**Answer key:**
- All fields have the stated types; `JComboBox<String>`; `profileArea` is non-editable and wrapped in `JScrollPane`; `student` starts `null`.
- `buildWindow` uses a layout, adds form components, buttons and the scroll pane, `EXIT_ON_CLOSE`, `pack()`, `setVisible(true)`.
- Register: empty-field check with `||` (not `&&`), `Integer.parseInt`, positive check, lazy creation of `student` when `null`, `registerCourse(new Course(...))`, `append`, clears course fields, specific `catch (NumberFormatException)` and `catch (IllegalArgumentException)` (subclass `NumberFormatException` must come first or be in a separate try).
- CGPA: `null` check, `setText(student.buildProfile())`, `catch (IllegalStateException)` with a warning dialog.
- Clear resets fields, `student = null`, and clears the area; Exit calls `System.exit(0)`; each button has `addActionListener`.

**Reference solution:**
```java
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

class Course {
    private String code;
    private String title;
    private int unit;
    private String grade;

    public Course(String code, String title, int unit, String grade) {
        this.code = code;
        this.title = title;
        this.unit = unit;
        this.grade = grade;
    }

    public String getCourseCode() {
        return code;
    }

    public String getCourseTitle() {
        return title;
    }

    public int getCreditUnit() {
        return unit;
    }

    public String getGrade() {
        return grade;
    }
}

class Student {
    private String name;
    private String studentId;
    private String department;
    private ArrayList<Course> courses = new ArrayList<>();

    public Student(String name, String studentId, String department) {
        this.name = name;
        this.studentId = studentId;
        this.department = department;
    }

    public void registerCourse(Course c) {
        if (c == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }
        for (Course x : courses) {
            if (x.getCourseCode().equals(c.getCourseCode())) {
                throw new IllegalArgumentException("Course already registered: " + c.getCourseCode());
            }
        }
        courses.add(c);
    }

    public int getCourseCount() {
        return courses.size();
    }

    public double calculateCGPA() {
        if (courses.size() < 5) {
            throw new IllegalStateException("A student must register at least 5 courses before CGPA can be calculated.");
        }
        int points = 0;
        int units = 0;
        for (Course c : courses) {
            points += "ABCDEF".indexOf(c.getGrade()) >= 0 ? (5 - "ABCDEF".indexOf(c.getGrade())) * c.getCreditUnit() : 0;
            units += c.getCreditUnit();
        }
        return (double) points / units;
    }

    public String buildProfile() {
        return "Student ID : " + studentId + "\nName       : " + name + "\nDepartment : " + department
                + "\nCGPA               : " + String.format("%.2f", calculateCGPA()) + "\n";
    }
}

class RegistrationApp {
    private JTextField idField = new JTextField(15);
    private JTextField nameField = new JTextField(15);
    private JTextField deptField = new JTextField(15);
    private JTextField codeField = new JTextField(15);
    private JTextField titleField = new JTextField(15);
    private JTextField unitField = new JTextField(15);
    private JComboBox<String> gradeBox = new JComboBox<>(new String[] {"A", "B", "C", "D", "E", "F"});
    private JButton registerButton = new JButton("Register");
    private JButton cgpaButton = new JButton("CGPA");
    private JButton clearButton = new JButton("Clear");
    private JButton exitButton = new JButton("Exit");
    private JTextArea profileArea = new JTextArea(15, 45);
    private Student student = null;

    public void buildWindow() {
        profileArea.setEditable(false);
        JFrame frame = new JFrame("COS 202 Registration");
        frame.setLayout(new GridLayout(0, 2));
        frame.add(new JLabel("Student ID:"));
        frame.add(idField);
        frame.add(new JLabel("Name:"));
        frame.add(nameField);
        frame.add(new JLabel("Department:"));
        frame.add(deptField);
        frame.add(new JLabel("Course code:"));
        frame.add(codeField);
        frame.add(new JLabel("Course title:"));
        frame.add(titleField);
        frame.add(new JLabel("Credit unit:"));
        frame.add(unitField);
        frame.add(new JLabel("Grade:"));
        frame.add(gradeBox);
        frame.add(registerButton);
        frame.add(cgpaButton);
        frame.add(clearButton);
        frame.add(exitButton);
        frame.add(new JScrollPane(profileArea));

        registerButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                registerCourse();
            }
        });
        cgpaButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                showProfile();
            }
        });
        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                clearAll();
            }
        });
        exitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }

    private void registerCourse() {
        String id = idField.getText().trim();
        String name = nameField.getText().trim();
        String dept = deptField.getText().trim();
        String code = codeField.getText().trim();
        String title = titleField.getText().trim();
        String unitText = unitField.getText().trim();
        if (id.isEmpty() || name.isEmpty() || dept.isEmpty() || code.isEmpty() || title.isEmpty() || unitText.isEmpty()) {
            JOptionPane.showMessageDialog(null, "All fields are required.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        try {
            int unit = Integer.parseInt(unitText);
            if (unit <= 0) {
                JOptionPane.showMessageDialog(null, "Credit unit must be a positive whole number.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }
            if (student == null) {
                student = new Student(name, id, dept);
            }
            String grade = (String) gradeBox.getSelectedItem();
            student.registerCourse(new Course(code, title, unit, grade));
            profileArea.append("Registered " + code + ". Total courses: " + student.getCourseCount() + "\n");
            codeField.setText("");
            titleField.setText("");
            unitField.setText("");
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(null, "Credit unit must be a whole number.", "Error", JOptionPane.ERROR_MESSAGE);
        } catch (IllegalArgumentException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void showProfile() {
        if (student == null) {
            JOptionPane.showMessageDialog(null, "Register at least one course first.", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        try {
            profileArea.setText(student.buildProfile());
        } catch (IllegalStateException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage(), "Warning", JOptionPane.WARNING_MESSAGE);
        }
    }

    private void clearAll() {
        idField.setText("");
        nameField.setText("");
        deptField.setText("");
        codeField.setText("");
        titleField.setText("");
        unitField.setText("");
        profileArea.setText("");
        student = null;
    }
}

public class RegistrationMain {
    public static void main(String[] args) {
        new RegistrationApp().buildWindow();
    }
}
```

**Rubric:**
- (a) 2 pts: all components with correct types, `JComboBox<String>`, non-editable `JTextArea` in a `JScrollPane`, `student` initialised to `null`
- (b) 2 pts: `buildWindow` with layout, components, `EXIT_ON_CLOSE`, `pack()` then `setVisible(true)`
- (c) 5 pts: empty check using `||`, positive-unit check, lazy `student` creation, `registerCourse(new Course(...))` with the selected grade, `append` and field clearing, specific `catch` blocks for `NumberFormatException` and `IllegalArgumentException` in a valid order
- (d) 3 pts: `null` check, `setText(student.buildProfile())`, `catch (IllegalStateException)` with a `WARNING_MESSAGE` dialog
- (e) 3 pts: Clear resets every field, `student` and area; Exit uses `System.exit(0)`; all four buttons have listeners; `main` builds the window. Anonymous classes, a named listener class or one `implements ActionListener` class with `getSource()` checks are all accepted

**Common mistakes:**
- Using `&&` instead of `||` in the empty-field check, so the error only shows when every field is empty.
- Catching `IllegalArgumentException` before `NumberFormatException` (a subclass), which does not compile.
- Using `profileArea.setText` in the register handler, which erases the earlier registration lines.
- Never adding listeners to the buttons, so nothing happens when they are clicked.

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

### Q186
- id: Q186
- section: H
- type: predict-output
- difficulty: easy
- topic: string concatenation and equality
- points: 3
- time_minutes: 4
- source: original

**Task:**
Write the exact output of the program, line by line.

**Code:**
```java
public class Main {
    public static void main(String[] args) {
        System.out.println(1 + 2 + "a" + 1 + 2);
        System.out.println("a" + 1 + 2);
        System.out.println('a' + 1);
        System.out.println((char) ('a' + 1));
        System.out.println("" + 'a' + 1);
        String s = "java";
        s.toUpperCase();
        System.out.println(s);
        String t = new String("java");
        System.out.println(s == t);
        System.out.println(s.equals(t));
    }
}
```

**Answer key:**
```
3a12
a12
98
b
a1
java
false
true
```
Trap: `+` is evaluated left to right (numbers add until a String appears); `char + int` is numeric; Strings are immutable; `==` compares references.

**Reference solution:**
```java
// Line 1: 1 + 2 = 3 first, then "3" + "a" + "1" + "2" -> 3a12
// Line 2: "a" + 1 + 2 -> a12 (no arithmetic once a String is involved)
// Line 3: 'a' is 97, so 'a' + 1 = 98 (an int)
// Line 4: the cast turns 98 back into the char 'b'
// Line 5: "" + 'a' + 1 -> a1
// Line 6: toUpperCase() returns a new String; s is unchanged -> java
// Line 7: new String("java") is a different object -> false
// Line 8: equals compares contents -> true
```

**Rubric:**
- 3 pts total: 1 pt for the first two lines, 1 pt for lines 3-5, 1 pt for the last three lines
- Compare output exactly; a wrong value on a line loses that group's point

**Common mistakes:**
- Writing `12a12` or `3a3` for the first line
- Printing `A` or `JAVA` after `toUpperCase()`
- Saying `s == t` is true because the contents match

### Q187
- id: Q187
- section: H
- type: predict-output
- difficulty: easy
- topic: static counters
- points: 2
- time_minutes: 3
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
class Book {
    static int total = 0;
    int id;

    Book() {
        total++;
        id = total;
    }
}

public class Main {
    public static void main(String[] args) {
        Book a = new Book();
        Book b = new Book();
        Book c = new Book();
        System.out.println(a.id + " " + b.id + " " + c.id);
        System.out.println(Book.total);
        System.out.println(a.total);
    }
}
```

**Answer key:**
```
1 2 3
3
3
```
Trap: `total` is one shared static variable; `id` is a separate instance variable per object.

**Reference solution:**
```java
// Each constructor call increments the shared static total, then copies it into that object's own id.
// ids are 1, 2, 3. total ends at 3 and is the same whether read via Book.total or a.total.
```

**Rubric:**
- 1 pt for `1 2 3`
- 1 pt for the two lines `3` and `3`
- Exact match required

**Common mistakes:**
- Writing `3 3 3` for the ids (confusing `id` with the static `total`)
- Writing `1` for `a.total`

### Q188
- id: Q188
- section: H
- type: predict-output
- difficulty: easy
- topic: integer division and casting
- points: 2
- time_minutes: 3
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;
        System.out.println(a / b);
        System.out.println(a % b);
        System.out.println((double) a / b);
        System.out.println((double) (a / b));
        System.out.println(a / (double) b * 2);
        double avg = (a + b) / 2;
        System.out.println(avg);
    }
}
```

**Answer key:**
```
3
1
3.5
3.0
7.0
4.0
```
Trap: the cast applies to the nearest operand; integer division truncates before it is stored in a `double`.

**Reference solution:**
```java
// 7 / 2 = 3 (int division); 7 % 2 = 1
// (double) a / b -> 7.0 / 2 = 3.5
// (double) (a / b) -> (double) 3 = 3.0 (division already truncated)
// a / (double) b * 2 -> 3.5 * 2 = 7.0
// (a + b) / 2 = 9 / 2 = 4 (int), stored in a double -> 4.0
```

**Rubric:**
- 2 pts: 1 pt for the first four lines, 1 pt for the last two
- Exact match required (`3.0`, not `3`)

**Common mistakes:**
- Writing `3.5` for the fourth line
- Writing `4.5` for `avg`

### Q189
- id: Q189
- section: H
- type: predict-output
- difficulty: easy
- topic: constructor chaining
- points: 3
- time_minutes: 4
- source: variant-of-slides

**Task:**
Write the exact output of the program.

**Code:**
```java
class Vehicle {
    Vehicle() {
        System.out.println("This is a Vehicle");
    }
}

class FourWheeler extends Vehicle {
    FourWheeler() {
        System.out.println("4 Wheeler Vehicles");
    }
}

class Car extends FourWheeler {
    Car() {
        System.out.println("This 4 Wheeler Vehicle is a Car");
    }

    Car(String name) {
        this();
        System.out.println("Car name: " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        new Car("Golf");
        System.out.println("---");
        new FourWheeler();
    }
}
```

**Answer key:**
```
This is a Vehicle
4 Wheeler Vehicles
This 4 Wheeler Vehicle is a Car
Car name: Golf
---
This is a Vehicle
4 Wheeler Vehicles
```
Trap: the superclass constructor runs first (implicit `super()`), and `this()` runs the other constructor before the rest of the body.

**Reference solution:**
```java
// new Car("Golf"): Car(String) calls this() -> Car() -> implicit super() -> FourWheeler() -> implicit super() -> Vehicle().
// Vehicle prints first, then FourWheeler, then Car(), then the rest of Car(String).
// "---" is printed.
// new FourWheeler(): Vehicle() then FourWheeler(); Car is not involved.
```

**Rubric:**
- 3 pts: 2 pts for the first four lines in the right order, 1 pt for the last three lines
- Order matters; a correct set of lines in the wrong order earns at most 1 pt for that group

**Common mistakes:**
- Printing the subclass line before the superclass line
- Printing `Car name: Golf` before `This 4 Wheeler Vehicle is a Car`

### Q190
- id: Q190
- section: H
- type: predict-output
- difficulty: medium
- topic: overloading vs overriding
- points: 3
- time_minutes: 6
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
class Printer {
    void print(Object o) {
        System.out.println("Printer Object");
    }

    void print(String s) {
        System.out.println("Printer String");
    }
}

class FancyPrinter extends Printer {
    void print(Object o) {
        System.out.println("Fancy Object");
    }

    void print(Integer i) {
        System.out.println("Fancy Integer");
    }
}

public class Main {
    public static void main(String[] args) {
        Printer p = new FancyPrinter();
        Object o = "hello";
        p.print("hello");
        p.print(o);
        p.print(5);
        FancyPrinter f = new FancyPrinter();
        f.print(5);
        f.print((Object) 5);
    }
}
```

**Answer key:**
```
Printer String
Fancy Object
Fancy Object
Fancy Integer
Fancy Object
```
Trap: overloads are chosen at compile time from the reference type; only overridden methods are dispatched on the object type.

**Reference solution:**
```java
// p is a Printer reference: only print(Object) and print(String) are visible.
// p.print("hello"): print(String) chosen; FancyPrinter does not override it -> Printer String
// p.print(o): static type Object -> print(Object), overridden -> Fancy Object
// p.print(5): boxes to Integer, only print(Object) applies -> overridden -> Fancy Object
// f.print(5): FancyPrinter sees print(Integer), more specific than Object -> Fancy Integer
// f.print((Object) 5): static type Object -> print(Object) -> Fancy Object
```

**Rubric:**
- 3 pts: 0.5 pt for each of lines 1 and 2 and 5, 1 pt for line 3, 0.5 pt for line 4... total 3
- Award by line; exact text required

**Common mistakes:**
- Choosing `Fancy Integer` for `p.print(5)` (overload resolution uses the reference type)
- Choosing `Printer Object` for `p.print(o)`

### Q191
- id: Q191
- section: H
- type: predict-output
- difficulty: medium
- topic: upcasting and dynamic dispatch
- points: 3
- time_minutes: 6
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
class Staff {
    String role = "Staff";

    String title() {
        return "Staff member";
    }

    String describe() {
        return role + " / " + title();
    }
}

class Doctor extends Staff {
    String role = "Doctor";

    String title() {
        return "Medical doctor";
    }
}

public class Main {
    public static void main(String[] args) {
        Staff s = new Doctor();
        System.out.println(s.role);
        System.out.println(s.title());
        System.out.println(s.describe());
        System.out.println(((Doctor) s).role);
        Doctor d = (Doctor) s;
        System.out.println(d.describe());
    }
}
```

**Answer key:**
```
Staff
Medical doctor
Staff / Medical doctor
Doctor
Staff / Medical doctor
```
Trap: fields are not overridden (they are hidden and resolved by reference type); methods are dispatched by the real object type.

**Reference solution:**
```java
// s.role: field access uses the reference type Staff -> Staff
// s.title(): runtime object is Doctor -> Medical doctor
// s.describe(): runs in Staff, so 'role' is Staff's field, but title() dispatches to Doctor -> Staff / Medical doctor
// ((Doctor) s).role: reference type is now Doctor -> Doctor
// d.describe(): still the inherited Staff.describe() -> Staff / Medical doctor
```

**Rubric:**
- 3 pts: 0.5 pt for each of lines 1, 2 and 4; 0.75 pt for each of lines 3 and 5
- Exact text required

**Common mistakes:**
- Printing `Doctor` for `s.role`
- Printing `Doctor / Medical doctor` for `describe()`

### Q192
- id: Q192
- section: H
- type: predict-output
- difficulty: medium
- topic: arrays and pass-by-value
- points: 3
- time_minutes: 6
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
import java.util.Arrays;

public class Main {
    static void change(int[] arr, int x) {
        arr[0] = 99;
        x = 99;
        arr = new int[]{7, 7, 7};
    }

    public static void main(String[] args) {
        int[] scores = {10, 20, 30};
        int[] alias = scores;
        int[] copy = scores.clone();
        alias[1] = 55;
        int n = 5;
        change(scores, n);
        System.out.println(Arrays.toString(scores));
        System.out.println(Arrays.toString(copy));
        System.out.println(n);
        System.out.println(alias == scores);
        System.out.println(copy == scores);
    }
}
```

**Answer key:**
```
[99, 55, 30]
[10, 20, 30]
5
true
false
```
Trap: arrays are shared by reference, `clone()` makes an independent copy, and Java passes references by value (re-pointing a parameter does not affect the caller).

**Reference solution:**
```java
// alias and scores point to the same array, so alias[1] = 55 changes scores.
// copy is a separate array and keeps 10, 20, 30.
// change(): arr[0] = 99 modifies the shared array; x = 99 changes only the local int;
//           arr = new int[]{...} re-points the local parameter only.
// So scores = [99, 55, 30], n = 5, alias == scores is true, copy == scores is false.
```

**Rubric:**
- 3 pts: 1 pt for `[99, 55, 30]`, 0.5 pt for `[10, 20, 30]`, 0.5 pt for `5`, 1 pt for `true` and `false`
- Exact output including brackets and spaces

**Common mistakes:**
- Printing `[7, 7, 7]` for scores
- Printing `99` for n
- Thinking `copy` also changed

### Q193
- id: Q193
- section: H
- type: predict-output
- difficulty: medium
- topic: finally ordering and exception flow
- points: 4
- time_minutes: 7
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
public class Main {
    static int f() {
        int x = 1;
        try {
            x = 2;
            return x;
        } finally {
            x = 3;
            System.out.println("finally x=" + x);
        }
    }

    static String g(String s) {
        try {
            System.out.println("try " + s);
            int n = Integer.parseInt(s);
            return "ok " + (10 / n);
        } catch (NumberFormatException e) {
            System.out.println("NFE");
            return "bad";
        } catch (ArithmeticException e) {
            System.out.println("AE");
            return "zero";
        } finally {
            System.out.println("done " + s);
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
        System.out.println(g("5"));
        System.out.println(g("x"));
        System.out.println(g("0"));
    }
}
```

**Answer key:**
```
finally x=3
2
try 5
done 5
ok 2
try x
NFE
done x
bad
try 0
AE
done 0
zero
```
Trap: `finally` always runs before the method returns, but the returned value was already fixed; the returned String is printed only after the method finishes.

**Reference solution:**
```java
// f(): return x stores 2, finally runs (prints x=3) but cannot change the value already returned -> prints 2 afterwards.
// g("5"): try prints, parse ok, return "ok 2"; finally prints "done 5" BEFORE main prints "ok 2".
// g("x"): NumberFormatException -> NFE, finally -> done x, then "bad" is printed by main.
// g("0"): 10 / 0 throws ArithmeticException -> AE, finally -> done 0, then "zero".
```

**Rubric:**
- 4 pts: 1 pt for `f()` (two lines), 1 pt for each of the three `g` calls (all three lines correct and in order)
- Order of lines is part of the answer

**Common mistakes:**
- Printing `3` for `f()`
- Printing the returned value before the `done` line

### Q194
- id: Q194
- section: H
- type: predict-output
- difficulty: hard
- topic: ArrayList remove(int) vs remove(Object)
- points: 4
- time_minutes: 8
- source: original

**Task:**
Write the exact output of the program.

**Code:**
```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            list.add(i * 10);
        }
        list.remove(1);
        list.remove(Integer.valueOf(40));
        list.remove(Integer.valueOf(1));
        System.out.println(list);
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) > 25) {
                list.remove(i);
            }
        }
        System.out.println(list);
        list.add(1, 99);
        list.set(0, list.get(2) + 1);
        System.out.println(list);
        System.out.println(list.indexOf(99));
        System.out.println(list.contains(10));
    }
}
```

**Answer key:**
```
[10, 30, 50, 60]
[10, 50]
[51, 99, 50]
1
false
```
Trap: `remove(1)` removes by index, `remove(Integer.valueOf(40))` removes by value (and a missing value changes nothing); removing inside a forward loop shifts elements and skips one.

**Reference solution:**
```java
// Start: [10, 20, 30, 40, 50, 60]
// remove(1) -> index 1 removed (20): [10, 30, 40, 50, 60]
// remove(Integer 40) -> value 40 removed: [10, 30, 50, 60]; remove(Integer 1) finds nothing.
// Loop: i=0 (10) kept; i=1 (30 > 25) removed -> [10, 50, 60]; i=2 (60 > 25) removed -> [10, 50]; 50 was skipped.
// add(1, 99) -> [10, 99, 50]; set(0, 50 + 1) -> [51, 99, 50]
// indexOf(99) = 1; contains(10) = false (10 was overwritten)
```

**Rubric:**
- 4 pts: 1 pt each for the first three list lines, 0.5 pt each for `1` and `false`... total 4 (1 + 1 + 1 + 0.5 + 0.5)
- Exact list formatting `[a, b, c]` required

**Common mistakes:**
- Treating `remove(1)` as removing the value 1
- Thinking the loop removes 50 as well, giving `[10]`

### Q195
- id: Q195
- section: H
- type: predict-output
- difficulty: hard
- topic: initialisation order and uncaught exception
- points: 4
- time_minutes: 8
- source: original

**Task:**
State what happens when this program runs. Write the exact output printed before anything goes wrong, then name the exception that ends the program.

**Code:**
```java
class Hostel {
    static int rooms;

    static {
        System.out.println("static block");
        rooms = 3;
    }

    int id;

    {
        System.out.println("instance block");
    }

    Hostel() {
        System.out.println("ctor " + rooms);
        id = ++rooms;
    }
}

public class Main {
    static void checkIn(int[] beds, int index) {
        try {
            beds[index] = 1;
            System.out.println("checked in " + index);
        } finally {
            System.out.println("finally " + index);
        }
    }

    public static void main(String[] args) {
        System.out.println("start");
        Hostel h = new Hostel();
        System.out.println(h.id);
        int[] beds = new int[2];
        checkIn(beds, 1);
        checkIn(beds, 2);
        System.out.println("end");
    }
}
```

**Answer key:**
```
start
static block
instance block
ctor 3
4
checked in 1
finally 1
finally 2
```
Then the program ends with an uncaught `ArrayIndexOutOfBoundsException` (index 2 for length 2); `end` is never printed. Trap: static block runs once at first use of the class, then instance block, then constructor body; `finally` runs even when the exception escapes.

**Reference solution:**
```java
// "start" prints first: Hostel is not loaded until new Hostel().
// Class load: static block prints, rooms = 3. Then the instance block, then the constructor body ("ctor 3"), id = ++rooms = 4.
// checkIn(beds, 1): ok. checkIn(beds, 2): beds[2] throws ArrayIndexOutOfBoundsException; finally prints "finally 2".
// The exception is uncaught, so main stops; "end" is never printed.
```

**Rubric:**
- 1 pt for `start` then `static block` before `instance block`
- 1 pt for `ctor 3` and `4`
- 1 pt for `checked in 1`, `finally 1`, `finally 2` in order
- 1 pt for naming `ArrayIndexOutOfBoundsException` and saying `end` is not printed

**Common mistakes:**
- Printing `static block` before `start`
- Printing `ctor 4` or `5` for the id
- Forgetting `finally 2`

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

### Q196
- id: Q196
- section: I
- type: debug-extend
- difficulty: medium
- topic: custom exceptions
- points: 9
- time_minutes: 12
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The `Account` class below should let a customer deposit money and withdraw money. A withdrawal larger than the balance must fail with the checked exception `InsufficientFundsException`. Assume imports are present.

**Part 1 (3 marks):** Identify each error and give its line number, state whether it is a syntax or a semantic error, and write the corrected line.

**Part 2 (6 marks):** Add a method `transfer(Account to, double amount)` to the corrected class. It must move money from this account to `to` by withdrawing here and depositing there. It must throw `InsufficientFundsException` when the balance is too small (and then change neither account), and throw `IllegalArgumentException` when `to` is `null`.

**Code:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public double getBalance() {
        return balance
    }

    public void withdraw(double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }
        balance = balance + amount;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit must be positive");
        }
        balance += amount;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 17 | `return balance` | syntax | Missing semicolon | `return balance;` |
| 2 | 20 | `public void withdraw(double amount) {` | syntax | A checked exception is thrown but not declared | `public void withdraw(double amount) throws InsufficientFundsException {` |
| 3 | 24 | `balance = balance + amount;` | semantic | A withdrawal must reduce the balance, not increase it | `balance -= amount;` |

Part 2 must-haves:
- Signature `transfer(Account to, double amount) throws InsufficientFundsException`
- Null check for `to` throwing `IllegalArgumentException` before any money moves
- Calls `withdraw` first (so a failure stops before `deposit`), then `to.deposit(amount)`
- No money changes if `withdraw` throws

**Reference solution:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }
        balance -= amount;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit must be positive");
        }
        balance += amount;
    }

    public void transfer(Account to, double amount) throws InsufficientFundsException {
        if (to == null) {
            throw new IllegalArgumentException("Destination account cannot be null");
        }
        withdraw(amount);
        to.deposit(amount);
    }
}
```

**Rubric:**
- Part 1: 1 pt per error (line + type + correct fix; 0.5 if two of three are right), 3 pts total
- Part 2 (6 pts): 1 pt correct signature with `throws`; 1.5 pts null check throwing `IllegalArgumentException`; 1.5 pts withdraw before deposit; 1 pt no change on failure; 1 pt code compiles
- A fix or extension that would not compile loses the related marks

**Common mistakes:**
- Wrapping the `throw` in try/catch instead of declaring `throws`
- Depositing into `to` before withdrawing, leaving money created when withdraw fails

### Q197
- id: Q197
- section: I
- type: debug-extend
- difficulty: medium
- topic: ArrayList of objects
- points: 9
- time_minutes: 12
- source: original
- error_header: 3 errors (2 syntax, 1 semantic)

**Task:**
The `Library` class stores `Book` objects in an `ArrayList`. `removeByTitle` must remove the first book whose title equals the given title and return `true`, or return `false` if there is none. Assume imports are present.

**Part 1 (3 marks):** Identify each error and give its line number, state whether it is a syntax or a semantic error, and write the corrected line.

**Part 2 (6 marks):** Add a method `findByAuthor(String author)` to `Library`. It must return a **new** `ArrayList<Book>` containing every book whose author equals `author`, ignoring upper/lower case. It returns an empty list when nothing matches, and must not change the library's own list.

**Code:**
```java
class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public int getAuthor() {
        return author;
    }
}

public class Library {
    private ArrayList<Book> books = new ArrayList<>;

    public void addBook(Book book) {
        books.add(book);
    }

    public boolean removeByTitle(String title) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getTitle() == title) {
                books.remove(i);
                return true;
            }
        }
        return false;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 14 | `public int getAuthor() {` | syntax | Returns a String but declares `int` (incompatible types) | `public String getAuthor() {` |
| 2 | 20 | `private ArrayList<Book> books = new ArrayList<>;` | syntax | Constructor call needs parentheses | `private ArrayList<Book> books = new ArrayList<>();` |
| 3 | 28 | `if (books.get(i).getTitle() == title) {` | semantic | `==` compares String references; contents must be compared with `equals` | `if (books.get(i).getTitle().equals(title)) {` |

Part 2 must-haves:
- Method returns `ArrayList<Book>` and takes a `String` author
- Creates a new list, loops over `books`, adds matches using `equalsIgnoreCase` (or equivalent)
- Returns the new list, empty when there are no matches; `books` is not modified

**Reference solution:**
```java
class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }
}

public class Library {
    private ArrayList<Book> books = new ArrayList<>();

    public void addBook(Book book) {
        books.add(book);
    }

    public boolean removeByTitle(String title) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getTitle().equals(title)) {
                books.remove(i);
                return true;
            }
        }
        return false;
    }

    public ArrayList<Book> findByAuthor(String author) {
        ArrayList<Book> result = new ArrayList<>();
        for (Book b : books) {
            if (b.getAuthor().equalsIgnoreCase(author)) {
                result.add(b);
            }
        }
        return result;
    }
}
```

**Rubric:**
- Part 1: 1 pt per error (line + type + correct fix; 0.5 if two of three are right), 3 pts total
- Part 2 (6 pts): 1 pt correct signature; 1 pt new list created and returned; 2 pts correct loop and match test; 1 pt case-insensitive; 1 pt library list unchanged and empty list on no match
- A fix or extension that would not compile loses the related marks

**Common mistakes:**
- Using `==` again in the author comparison
- Removing non-matching books from `books` instead of building a new list

### Q198
- id: Q198
- section: I
- type: debug-extend
- difficulty: hard
- topic: abstract classes and inheritance
- points: 12
- time_minutes: 16
- source: variant-of-slides
- error_header: 5 errors (3 syntax, 2 semantic)

**Task:**
The snippet models shapes. Every shape has a name and an `area()` method; `Circle` and `Rectangle` extend `Shape`. Assume imports are present.

**Part 1 (5 marks):** Identify each error and give its line number (or line range), state whether it is a syntax or a semantic error, and write the corrected code.

**Part 2 (7 marks):** Add a class `Triangle` that extends `Shape` with `base` and `height` fields (private, set in the constructor), the correct `area()`, and a `toString()` that returns text containing the name, base, height and area. Then add a class `ShapeDemo` with a `main` method that stores one `Circle`, one `Rectangle` and one `Triangle` in a `Shape[]` array and prints the total area.

**Code:**
```java
class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public abstract double area();
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
        super("Circle");
    }

    public double area() {
        return Math.PI * radius * 2;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    double area() {
        return width + height;
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 1 | `class Shape {` | syntax | A class with an abstract method must itself be declared `abstract` | `abstract class Shape {` |
| 2 | 15-16 | `this.radius = radius;`<br>`super("Circle");` | syntax | `super(...)` must be the first statement in a constructor | `super("Circle");`<br>`this.radius = radius;` |
| 3 | 20 | `return Math.PI * radius * 2;` | semantic | Area of a circle is pi r squared, not pi r times 2 (that is half the circumference) | `return Math.PI * radius * radius;` |
| 4 | 34 | `double area() {` | syntax | Overriding a public method with weaker (package) access is not allowed | `public double area() {` |
| 5 | 35 | `return width + height;` | semantic | Area of a rectangle is width times height | `return width * height;` |

Part 2 must-haves:
- `class Triangle extends Shape` with private `base` and `height`
- Constructor calls `super("Triangle")` as its first statement, then sets both fields
- `public double area()` returning `0.5 * base * height`
- `toString()` includes name, base, height and area
- `ShapeDemo.main` builds a `Shape[]` of the three shapes, loops (using `< length`), sums `area()` and prints it

**Reference solution:**
```java
abstract class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public abstract double area();
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    public double area() {
        return width * height;
    }
}

class Triangle extends Shape {
    private double base;
    private double height;

    public Triangle(double base, double height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }

    public double area() {
        return 0.5 * base * height;
    }

    public String toString() {
        return name + "[base=" + base + ", height=" + height + ", area=" + area() + "]";
    }
}

public class ShapeDemo {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[3];
        shapes[0] = new Circle(2);
        shapes[1] = new Rectangle(3, 4);
        shapes[2] = new Triangle(6, 5);
        double total = 0;
        for (int i = 0; i < shapes.length; i++) {
            total += shapes[i].area();
        }
        System.out.println("Total area = " + total);
    }
}
```

**Rubric:**
- Part 1: 1 pt per error (line + type + correct fix; 0.5 if two of three are right), 5 pts total
- Part 2 (7 pts): 2 pts `Triangle` class, fields and constructor with `super` first; 1 pt correct `area()` as `public`; 1 pt `toString()`; 3 pts `ShapeDemo` (array of the three shapes, loop, total printed)
- A fix or extension that would not compile loses the related marks

**Common mistakes:**
- Fixing line 1 by deleting `abstract` from the method instead of adding it to the class
- Writing `area()` in `Triangle` without `public`
- Forgetting that `super("Circle")` fix also moves `this.radius = radius;` below it

### Q199
- id: Q199
- section: I
- type: debug-extend
- difficulty: hard
- topic: CGPA calculation with ArrayList
- points: 12
- time_minutes: 18
- source: variant-of-assignment
- error_header: 5 errors (2 syntax, 3 semantic)

**Task:**
`Student.calculateCGPA()` must follow the University 5-point scale (A=5, B=4, C=3, D=2, E=1, F=0), compute the sum of (grade point x credit unit) divided by the total credit units, and refuse to calculate when fewer than 5 courses are registered. Assume imports are present.

**Part 1 (5 marks):** Identify each error and give its line number, state whether it is a syntax or a semantic error, and write the corrected line.

**Part 2 (7 marks):** Add a method `classify()` to `Student` that returns a `String` based on `calculateCGPA()`: `"First Class"` for 4.5 and above, `"Second Class Upper"` for 3.5 and above, `"Second Class Lower"` for 2.4 and above, `"Third Class"` for 1.5 and above, otherwise `"Pass"`.

**Code:**
```java
class Course {
    private int creditUnit;
    private String grade;

    public Course(int creditUnit, String grade) {
        this.creditUnit = creditUnit;
        this.grade = grade;
    }

    public int getCreditUnit() { return creditUnit; }
    public String getGrade() { return grade; }
}

public class Student {
    private ArrayList<Course> courses = new ArrayList<>();

    public void register(Course course) {
        courses.add(course);
    }

    public double calculateCGPA() {
        if (courses.size() > 5) {
            throws new IllegalStateException("At least 5 courses required");
        }
        int points = 0;
        int units = 0;
        for (Course c in courses) {
            points += gradePoint(c.getGrade()) * c.getCreditUnit();
            units += c.getCreditUnit();
        }
        return points / units;
    }

    // Scale: A=5, B=4, C=3, D=2, E=1, F=0
    private int gradePoint(String grade) {
        return "ABCDEF".indexOf(grade);
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 22 | `if (courses.size() > 5) {` | semantic | The exception must be thrown when there are FEWER than 5 courses | `if (courses.size() < 5) {` |
| 2 | 23 | `throws new IllegalStateException("At least 5 courses required");` | syntax | A statement that raises an exception uses `throw`; `throws` is only for method declarations | `throw new IllegalStateException("At least 5 courses required");` |
| 3 | 27 | `for (Course c in courses) {` | syntax | Java's for-each uses a colon, not `in` | `for (Course c : courses) {` |
| 4 | 31 | `return points / units;` | semantic | Both operands are `int`, so the division truncates the CGPA | `return (double) points / units;` |
| 5 | 36 | `return "ABCDEF".indexOf(grade);` | semantic | Gives A=0 and F=5, the reverse of the scale; must map A to 5 and F to 0 | `return "FEDCBA".indexOf(grade);` |

Part 2 must-haves:
- Method `public String classify()` using the value from `calculateCGPA()`
- Thresholds checked from highest to lowest (4.5, 3.5, 2.4, 1.5) with the exact strings given
- Returns `"Pass"` as the default
- Calls `calculateCGPA()` once and stores it in a local variable (calling twice is acceptable)

**Reference solution:**
```java
class Course {
    private int creditUnit;
    private String grade;

    public Course(int creditUnit, String grade) {
        this.creditUnit = creditUnit;
        this.grade = grade;
    }

    public int getCreditUnit() { return creditUnit; }
    public String getGrade() { return grade; }
}

public class Student {
    private ArrayList<Course> courses = new ArrayList<>();

    public void register(Course course) {
        courses.add(course);
    }

    public double calculateCGPA() {
        if (courses.size() < 5) {
            throw new IllegalStateException("At least 5 courses required");
        }
        int points = 0;
        int units = 0;
        for (Course c : courses) {
            points += gradePoint(c.getGrade()) * c.getCreditUnit();
            units += c.getCreditUnit();
        }
        return (double) points / units;
    }

    // Scale: A=5, B=4, C=3, D=2, E=1, F=0
    private int gradePoint(String grade) {
        return "FEDCBA".indexOf(grade);
    }

    public String classify() {
        double cgpa = calculateCGPA();
        if (cgpa >= 4.5) {
            return "First Class";
        } else if (cgpa >= 3.5) {
            return "Second Class Upper";
        } else if (cgpa >= 2.4) {
            return "Second Class Lower";
        } else if (cgpa >= 1.5) {
            return "Third Class";
        }
        return "Pass";
    }
}
```

**Rubric:**
- Part 1: 1 pt per error (line + type + correct fix; 0.5 if two of three are right), 5 pts total
- Part 2 (7 pts): 1 pt correct signature and return type; 3 pts correct thresholds and strings; 1 pt correct order (highest first, or ranges that do not overlap wrongly); 1 pt `"Pass"` default; 1 pt compiles and returns on every path
- Equivalent fixes accepted for error 5 (for example `5 - "ABCDEF".indexOf(grade)`)

**Common mistakes:**
- Fixing line 31 with `return (double) (points / units);` (still truncates)
- Checking the lowest threshold first so every student is "Third Class" or better
- Leaving `throws new` and fixing only the condition

### Q200
- id: Q200
- section: I
- type: debug-extend
- difficulty: hard
- topic: Swing form and event handling
- points: 10
- time_minutes: 15
- source: variant-of-test
- error_header: 4 errors (2 syntax, 2 semantic)

**Task:**
The `RegisterForm` window should show a name field, a level drop-down, a Register button and a text area. Each time the button is clicked, one line `<name> registered at level <level>` is **added below** the earlier lines. The window must appear when the program starts. Assume imports are present.

**Part 1 (4 marks):** Identify each error and give its line number, state whether it is a syntax or a semantic error, and write the corrected line.

**Part 2 (6 marks):** Improve the button handler of the corrected code. If the name is empty, or contains a digit, show a `JOptionPane` error dialog and stop (no line is added). After a successful registration, clear the name field and reset the drop-down to its first item.

**Code:**
```java
public class RegisterForm extends JFrame {
    private JTextField nameField = new JTextField(15);
    private JComboBox<String> levelBox = new JComboBox<String>(new String[]{"100", "200", "300"});
    private JTextArea outputArea = new JTextArea(5, 20);
    private JButton registerButton = new JButton("Register");

    public RegisterForm() {
        setTitle("Registration");
        setLayout(new FlowLayout());
        add(new JLabel("Name:"));
        add(nameField);
        add(levelBox);
        add(registerButton);
        add(new JScrollpane(outputArea));
        registerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                String level = levelBox.getSelectedItem();
                outputArea.setText(name + " registered at level " + level + "\n");
            }
        });
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(false);
    }

    public static void main(String[] args) {
        new RegisterForm();
    }
}
```

**Answer key:**
| # | Line | Original line | Type | Why it is wrong | Corrected line |
|---|------|---------------|------|-----------------|----------------|
| 1 | 14 | `add(new JScrollpane(outputArea));` | syntax | Class name is `JScrollPane` (capital P); `JScrollpane` does not exist | `add(new JScrollPane(outputArea));` |
| 2 | 18 | `String level = levelBox.getSelectedItem();` | syntax | `getSelectedItem()` returns `Object`; a cast to `String` is required | `String level = (String) levelBox.getSelectedItem();` |
| 3 | 19 | `outputArea.setText(name + " registered at level " + level + "\n");` | semantic | `setText` replaces earlier lines; `append` adds below them | `outputArea.append(name + " registered at level " + level + "\n");` |
| 4 | 24 | `setVisible(false);` | semantic | The window would never appear; it must be made visible | `setVisible(true);` |

Part 2 must-haves:
- Empty-name check (after `trim()`) and a digit check (for example `name.matches(".*\\d.*")` or a character loop)
- `JOptionPane.showMessageDialog(...)` with an error message, followed by `return;` so nothing is appended
- After a successful `append`: `nameField.setText("")` and `levelBox.setSelectedIndex(0)`
- The changes are inside `actionPerformed`

**Reference solution:**
```java
public class RegisterForm extends JFrame {
    private JTextField nameField = new JTextField(15);
    private JComboBox<String> levelBox = new JComboBox<String>(new String[]{"100", "200", "300"});
    private JTextArea outputArea = new JTextArea(5, 20);
    private JButton registerButton = new JButton("Register");

    public RegisterForm() {
        setTitle("Registration");
        setLayout(new FlowLayout());
        add(new JLabel("Name:"));
        add(nameField);
        add(levelBox);
        add(registerButton);
        add(new JScrollPane(outputArea));
        registerButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText().trim();
                if (name.isEmpty() || name.matches(".*\\d.*")) {
                    JOptionPane.showMessageDialog(null, "Please enter a valid name (no digits).",
                            "Error", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                String level = (String) levelBox.getSelectedItem();
                outputArea.append(name + " registered at level " + level + "\n");
                nameField.setText("");
                levelBox.setSelectedIndex(0);
            }
        });
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        pack();
        setVisible(true);
    }

    public static void main(String[] args) {
        new RegisterForm();
    }
}
```

**Rubric:**
- Part 1: 1 pt per error (line + type + correct fix; 0.5 if two of three are right), 4 pts total
- Part 2 (6 pts): 2 pts empty and digit validation; 1.5 pts error dialog and `return`; 1.5 pts clears the name field and resets the combo box; 1 pt code compiles and stays inside `actionPerformed`
- Equivalent validation logic accepted (loop with `Character.isDigit`, separate `if` statements)

**Common mistakes:**
- Showing the dialog but forgetting `return`, so a line is still added
- Clearing the fields before appending, so an empty line is added
- Fixing `setText` but leaving the cast missing

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
| Q101 | A | spot-error | easy | 1 | constructors | variant-of-tutorial |
| Q102 | A | spot-error | easy | 1 | static vs instance | variant-of-tutorial |
| Q103 | A | spot-error | easy | 2 | methods | original |
| Q104 | A | spot-error | easy | 2 | encapsulation | variant-of-slides |
| Q105 | A | spot-error | easy | 1 | String comparison | original |
| Q106 | A | spot-error | medium | 3 | constructors | variant-of-test |
| Q107 | A | spot-error | medium | 4 | inheritance | variant-of-test |
| Q108 | A | spot-error | medium | 3 | encapsulation | variant-of-test |
| Q109 | A | spot-error | medium | 3 | multilevel inheritance | variant-of-slides |
| Q110 | A | spot-error | medium | 3 | constructors and methods | original |
| Q111 | A | spot-error | medium | 3 | inheritance and encapsulation | variant-of-assignment |
| Q112 | A | spot-error | medium | 3 | static and this | original |
| Q113 | A | spot-error | medium | 3 | overriding | original |
| Q114 | A | spot-error | hard | 4 | ArrayList field and loops | original |
| Q115 | A | spot-error | hard | 3 | constructor chaining | original |
| Q116 | A | spot-error | hard | 3 | objects and encapsulation | variant-of-slides |
| Q117 | A | spot-error | hard | 3 | overriding | original |
| Q118 | A | spot-error | hard | 3 | validation in setters | original |
| Q119 | A | spot-error | hard | 4 | inheritance and overriding | original |
| Q120 | A | spot-error | hard | 4 | logic in methods | original |
| Q121 | B | spot-error | easy | 1 | overriding and access | variant-of-tutorial |
| Q122 | B | spot-error | easy | 1 | interfaces | variant-of-tutorial |
| Q123 | B | spot-error | easy | 1 | default methods | variant-of-tutorial |
| Q124 | B | spot-error | medium | 3 | final and static | variant-of-slides |
| Q125 | B | spot-error | medium | 3 | abstract classes | variant-of-test |
| Q126 | B | spot-error | medium | 3 | abstract classes and interfaces | variant-of-test |
| Q127 | B | spot-error | medium | 3 | abstract classes | variant-of-slides |
| Q128 | B | spot-error | medium | 3 | interfaces | variant-of-slides |
| Q129 | B | spot-error | medium | 3 | default methods and upcasting | variant-of-slides |
| Q130 | B | spot-error | medium | 3 | final and static | original |
| Q131 | B | spot-error | hard | 5 | abstract classes and casting | original |
| Q132 | B | spot-error | hard | 5 | interfaces, abstract and final | original |
| Q133 | B | spot-error | hard | 4 | static and final | original |
| Q134 | B | spot-error | hard | 4 | interface default and static methods | original |
| Q135 | B | spot-error | hard | 4 | abstract classes and interfaces | original |
| Q136 | C | spot-error | easy | 2 | throw vs throws | variant-of-tutorial |
| Q137 | C | spot-error | easy | 1 | remove(int) vs remove(Object) | original |
| Q138 | C | spot-error | medium | 3 | generics and size() | original |
| Q139 | C | spot-error | medium | 3 | contains/equals, loop bounds | original |
| Q140 | C | spot-error | medium | 3 | custom exception | original |
| Q141 | C | spot-error | medium | 3 | catch order, loop bounds | original |
| Q142 | C | spot-error | medium | 3 | ArrayList index, method header | original |
| Q143 | C | spot-error | hard | 4 | validation, parseInt, catch type | original |
| Q144 | C | spot-error | hard | 5 | calculateCGPA-style method | variant-of-test |
| Q145 | C | spot-error | hard | 4 | checked exception, add vs set | original |
| Q146 | C | spot-error | hard | 5 | registerCourse-style validation | variant-of-assignment |
| Q147 | C | spot-error | hard | 4 | remove(int) vs remove(Object), size() | original |
| Q148 | D | spot-error | easy | 2 | ActionListener wiring | original |
| Q149 | D | spot-error | medium | 4 | validation and output (Register button) | variant-of-test |
| Q150 | D | spot-error | medium | 4 | Process Payment button, catch order | variant-of-test |
| Q151 | D | spot-error | medium | 3 | JComboBox cast, JOptionPane, String.format | original |
| Q152 | D | spot-error | medium | 4 | building the window (layout) | variant-of-test |
| Q153 | D | spot-error | medium | 3 | throw vs throws, overriding | original |
| Q154 | D | spot-error | medium | 4 | ArrayList profile display (assignment variant) | variant-of-assignment |
| Q155 | D | spot-error | hard | 5 | building the window and listener | variant-of-test |
| Q156 | D | spot-error | hard | 5 | exception flow in actionPerformed | original |
| Q157 | D | spot-error | hard | 4 | switch fall-through, integer division | original |
| Q158 | D | spot-error | hard | 5 | layouts, anonymous listener | original |
| Q159 | D | spot-error | hard | 5 | CGPA calculation in a GUI (assignment variant) | variant-of-assignment |
| Q160 | D | spot-error | hard | 5 | inner listener class, static main, validation | original |
| Q161 | E | write-code | easy | 8 | arrays min/max | variant-of-slides |
| Q162 | E | write-code | easy | 8 | 2D arrays | variant-of-slides |
| Q163 | E | write-code | easy | 8 | method overloading | variant-of-slides |
| Q164 | E | write-code | easy | 9 | linear search | original |
| Q165 | E | write-code | medium | 10 | recursion | variant-of-slides |
| Q166 | E | write-code | medium | 11 | recursion | original |
| Q167 | E | write-code | medium | 11 | bubble sort | original |
| Q168 | E | write-code | medium | 11 | 2D arrays | original |
| Q169 | E | write-code | medium | 10 | insertion sort | original |
| Q170 | E | write-code | hard | 13 | binary search | original |
| Q171 | E | write-code | hard | 14 | selection sort | variant-of-test |
| Q172 | E | write-code | hard | 15 | 2D arrays matrix operations | original |
| Q173 | F | write-code | easy | 8 | encapsulation final static | variant-of-slides |
| Q174 | F | write-code | medium | 10 | abstract class polymorphism | variant-of-slides |
| Q175 | F | write-code | medium | 10 | abstract class | variant-of-slides |
| Q176 | F | write-code | medium | 10 | interfaces | variant-of-slides |
| Q177 | F | write-code | medium | 11 | multilevel inheritance | variant-of-slides |
| Q178 | F | write-code | hard | 13 | abstract class payment | variant-of-slides |
| Q179 | F | write-code | hard | 13 | interface default methods | variant-of-slides |
| Q180 | F | write-code | hard | 15 | inheritance constructor chaining | variant-of-assignment |
| Q181 | G | write-code | medium | 9 | custom exception try-catch-finally | original |
| Q182 | G | write-code | medium | 10 | ArrayList remove sort search | original |
| Q183 | G | write-code | medium | 11 | Swing form validation | variant-of-test |
| Q184 | G | write-code | hard | 14 | Person Student Course CGPA ArrayList | variant-of-assignment |
| Q185 | G | write-code | hard | 15 | Swing registration CGPA app | variant-of-assignment |
| Q186 | H | predict-output | easy | 3 | string concatenation and equality | original |
| Q187 | H | predict-output | easy | 2 | static counters | original |
| Q188 | H | predict-output | easy | 2 | integer division and casting | original |
| Q189 | H | predict-output | easy | 3 | constructor chaining | variant-of-slides |
| Q190 | H | predict-output | medium | 3 | overloading vs overriding | original |
| Q191 | H | predict-output | medium | 3 | upcasting and dynamic dispatch | original |
| Q192 | H | predict-output | medium | 3 | arrays and pass-by-value | original |
| Q193 | H | predict-output | medium | 4 | finally ordering and exception flow | original |
| Q194 | H | predict-output | hard | 4 | ArrayList remove(int) vs remove(Object) | original |
| Q195 | H | predict-output | hard | 4 | initialisation order and uncaught exception | original |
| Q196 | I | debug-extend | medium | 9 | custom exceptions | original |
| Q197 | I | debug-extend | medium | 9 | ArrayList of objects | original |
| Q198 | I | debug-extend | hard | 12 | abstract classes and inheritance | variant-of-slides |
| Q199 | I | debug-extend | hard | 12 | CGPA calculation with ArrayList | variant-of-assignment |
| Q200 | I | debug-extend | hard | 10 | Swing form and event handling | variant-of-test |

## Study Order

Plan for a comprehensive exam push across all 200 questions. Questions inside each section run easy to hard, so always go in ID order.

**Day 1: foundation (about 5-6 hours)**

| Block | Section | IDs | Time | What to do |
|---|---|---|---|---|
| 1 | A: Classes, constructors, encapsulation, inheritance | Q001-Q020, Q101-Q120 | 120 min | Do all 40 questions. Part 1 style debugging. Write line number, type and fix. |
| 2 | B: Abstract classes, interfaces, polymorphism, modifiers | Q021-Q035, Q121-Q135 | 90 min | Do all 30 questions. Payment and class hierarchy contracts. |
| 3 | E: Arrays, recursion, sorting, searching | Q061-Q072, Q161-Q172 | 100 min | Write code by hand. Bubble, insertion, selection sort & recursion. |
| 4 | H (first half): trace the output | Q086-Q090, Q186-Q190 | 35 min | Trace on paper before checking output. |

**Day 2: exam style & synthesis (about 5-6 hours)**

| Block | Section | IDs | Time | What to do |
|---|---|---|---|---|
| 1 | C: ArrayList and exceptions | Q036-Q047, Q136-Q147 | 70 min | Custom exceptions, bounds checking & validation. |
| 2 | D: Swing GUI and events | Q048-Q060, Q148-Q160 | 80 min | ActionListeners, window layouts & JOptionPane validation. |
| 3 | F: OOP class design | Q073-Q080, Q173-Q180 | 50 min | Inheritance and abstract class implementations. |
| 4 | G: ArrayList, exception and Swing programs | Q081-Q085, Q181-Q185 | 50 min | Full comprehensive student registration apps. |
| 5 | I: Debug, then extend | Q096-Q100, Q196-Q200 | 40 min | Fix bugs first, then implement requested features. |
| 6 | H (second half): trace output | Q091-Q095, Q191-Q195 | 30 min | Dynamic dispatch, try-finally & remove(int). |
| 7 | Mock papers 1 to 6 | see Mock Papers | 6 timed papers | Complete mock papers under exam conditions. |

## Mock Papers

Six full papers built from bank questions (no new questions). Part 1 is five debugging snippets (A/B/C), Part 2 is four (B/C/D, with a Swing question), Part 3 is one program or debug-and-extend task. No ID is reused within a paper.

| mock | part | question ids | total points | suggested minutes |
|---|---|---|---|---|
| 1 | 1 | Q001, Q003, Q006, Q011, Q036 | 13 | 27 |
| 1 | 2 | Q021, Q023, Q038, Q048 | 14 | 26 |
| 1 | 3 | Q072 | 10 | 18 |
| 2 | 1 | Q002, Q007, Q012, Q026, Q041 | 16 | 33 |
| 2 | 2 | Q022, Q027, Q039, Q049 | 16 | 31 |
| 2 | 3 | Q080 | 9 | 12 |
| 3 | 1 | Q008, Q013, Q018, Q028, Q042 | 21 | 46 |
| 3 | 2 | Q031, Q032, Q045, Q060 | 18 | 35 |
| 3 | 3 | Q099 | 14 | 25 |
| 4 | 1 | Q105, Q106, Q110, Q124, Q138 | 13 | 27 |
| 4 | 2 | Q125, Q141, Q149, Q152 | 14 | 26 |
| 4 | 3 | Q169 | 10 | 18 |
| 5 | 1 | Q103, Q107, Q113, Q127, Q143 | 16 | 33 |
| 5 | 2 | Q128, Q145, Q150, Q156 | 16 | 31 |
| 5 | 3 | Q197 | 9 | 12 |
| 6 | 1 | Q117, Q114, Q119, Q131, Q144 | 21 | 46 |
| 6 | 2 | Q133, Q134, Q146, Q155 | 18 | 35 |
| 6 | 3 | Q171 | 14 | 25 |
