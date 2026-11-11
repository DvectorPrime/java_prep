# COS 202 Question Bank (100 questions)

Java exam preparation for COS 202, University of Ibadan. Sections A to I, then the manifest, study order and three mock papers.

## Section A: Classes, Constructors, Encapsulation and Inheritance
Scope: spot the planted syntax and semantic errors in classes, constructors, encapsulation, access, overriding and inheritance (Library, Bank, Hospital, Dealership/Shop, Hostel).

### Q001
- id: Q001
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

### Q002
- id: Q002
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

### Q003
- id: Q003
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

### Q004
- id: Q004
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

### Q005
- id: Q005
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

### Q006
- id: Q006
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

### Q007
- id: Q007
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

### Q008
- id: Q008
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

### Q009
- id: Q009
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

### Q010
- id: Q010
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

### Q011
- id: Q011
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

### Q012
- id: Q012
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

### Q013
- id: Q013
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

### Q014
- id: Q014
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

### Q015
- id: Q015
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

### Q016
- id: Q016
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

### Q017
- id: Q017
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

### Q018
- id: Q018
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

### Q019
- id: Q019
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

### Q020
- id: Q020
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
Scope: spot the planted syntax and semantic errors in abstract classes, interfaces (default and static methods), overriding and polymorphism, and the `final`, `static` and `abstract` modifiers (Hostel, Inventory, Payroll, Zoo, Hospital, Library, Result Portal).

### Q021
- id: Q021
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

### Q022
- id: Q022
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

### Q023
- id: Q023
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

### Q024
- id: Q024
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

### Q025
- id: Q025
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

### Q026
- id: Q026
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

### Q027
- id: Q027
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

### Q028
- id: Q028
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

### Q029
- id: Q029
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

### Q030
- id: Q030
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

### Q031
- id: Q031
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

### Q032
- id: Q032
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

### Q033
- id: Q033
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

### Q034
- id: Q034
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

### Q035
- id: Q035
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
Scope: spot the planted syntax and semantic errors in ArrayList use (generics, `size()`, `get`, `remove(int)` vs `remove(Object)`, index bounds) and in exception handling (`throw`/`throws`, catch order, checked exceptions, custom exceptions, validation) across Result Portal, Clinic, Store and Library snippets.

### Q036
- id: Q036
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

### Q037
- id: Q037
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

### Q038
- id: Q038
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

### Q039
- id: Q039
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

### Q040
- id: Q040
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

### Q041
- id: Q041
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

### Q042
- id: Q042
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

### Q043
- id: Q043
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

### Q044
- id: Q044
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

### Q045
- id: Q045
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

### Q046
- id: Q046
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

### Q047
- id: Q047
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
Scope: Swing components and layouts, ActionListener wiring, actionPerformed bodies (validation, JOptionPane, JTextArea output), exception handling inside listeners, and building the JFrame window.

### Q048
- id: Q048
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

### Q049
- id: Q049
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

### Q050
- id: Q050
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

### Q051
- id: Q051
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

### Q052
- id: Q052
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

### Q053
- id: Q053
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

### Q054
- id: Q054
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

### Q055
- id: Q055
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

### Q056
- id: Q056
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

### Q057
- id: Q057
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

### Q058
- id: Q058
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

### Q059
- id: Q059
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

### Q060
- id: Q060
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
Write-code questions on one-dimensional and two-dimensional arrays, overloaded methods, recursion, sorting and searching.

### Q061
- id: Q061
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

### Q062
- id: Q062
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

### Q063
- id: Q063
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

### Q064
- id: Q064
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

### Q065
- id: Q065
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

### Q066
- id: Q066
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

### Q067
- id: Q067
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

### Q068
- id: Q068
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

### Q069
- id: Q069
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

### Q070
- id: Q070
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

### Q071
- id: Q071
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

### Q072
- id: Q072
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

## Section F: OOP Class Design (inheritance, abstract classes, interfaces, encapsulation)
Write-code questions on designing classes: encapsulation, abstract classes, interfaces with default methods, multilevel inheritance and constructor chaining.

### Q073
- id: Q073
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

### Q074
- id: Q074
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

### Q075
- id: Q075
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

### Q076
- id: Q076
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

### Q077
- id: Q077
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

### Q078
- id: Q078
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

### Q079
- id: Q079
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

### Q080
- id: Q080
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

## Section G: ArrayList, Exceptions and Swing GUI programs
Write-code questions that combine ArrayList, custom and built-in exceptions, and small Swing forms, in the style of the lecturer's GUI assignment and the Part 3 programming question.

### Q081
- id: Q081
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

### Q082
- id: Q082
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

### Q083
- id: Q083
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

### Q084
- id: Q084
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

### Q085
- id: Q085
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

## Section H: Trace the Output

Predict the exact output of short, deterministic programs. Traps: concatenation, static state, constructor order, overloading vs overriding, references, `finally`, `ArrayList.remove`.

### Q086
- id: Q086
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

### Q087
- id: Q087
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

### Q088
- id: Q088
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

### Q089
- id: Q089
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

### Q090
- id: Q090
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

### Q091
- id: Q091
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

### Q092
- id: Q092
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

### Q093
- id: Q093
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

### Q094
- id: Q094
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

### Q095
- id: Q095
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

## Section I: Debug, then Extend (fix a snippet, then add a requested feature)

Two-part questions: Part 1 fix the planted errors; Part 2 extend the corrected code with a small feature.

### Q096
- id: Q096
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

### Q097
- id: Q097
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

### Q098
- id: Q098
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

### Q099
- id: Q099
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

### Q100
- id: Q100
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
| Q001 | A | spot-error | easy | 1 | constructors | variant-of-tutorial |
| Q002 | A | spot-error | easy | 1 | static vs instance | variant-of-tutorial |
| Q003 | A | spot-error | easy | 2 | methods | original |
| Q004 | A | spot-error | easy | 2 | encapsulation | variant-of-slides |
| Q005 | A | spot-error | easy | 1 | String comparison | original |
| Q006 | A | spot-error | medium | 3 | constructors | variant-of-test |
| Q007 | A | spot-error | medium | 4 | inheritance | variant-of-test |
| Q008 | A | spot-error | medium | 3 | encapsulation | variant-of-test |
| Q009 | A | spot-error | medium | 3 | multilevel inheritance | variant-of-slides |
| Q010 | A | spot-error | medium | 3 | constructors and methods | original |
| Q011 | A | spot-error | medium | 3 | inheritance and encapsulation | variant-of-assignment |
| Q012 | A | spot-error | medium | 3 | static and this | original |
| Q013 | A | spot-error | medium | 3 | overriding | original |
| Q014 | A | spot-error | hard | 4 | ArrayList field and loops | original |
| Q015 | A | spot-error | hard | 3 | constructor chaining | original |
| Q016 | A | spot-error | hard | 3 | objects and encapsulation | variant-of-slides |
| Q017 | A | spot-error | hard | 3 | overriding | original |
| Q018 | A | spot-error | hard | 3 | validation in setters | original |
| Q019 | A | spot-error | hard | 4 | inheritance and overriding | original |
| Q020 | A | spot-error | hard | 4 | logic in methods | original |
| Q021 | B | spot-error | easy | 1 | overriding and access | variant-of-tutorial |
| Q022 | B | spot-error | easy | 1 | interfaces | variant-of-tutorial |
| Q023 | B | spot-error | easy | 1 | default methods | variant-of-tutorial |
| Q024 | B | spot-error | medium | 3 | final and static | variant-of-slides |
| Q025 | B | spot-error | medium | 3 | abstract classes | variant-of-test |
| Q026 | B | spot-error | medium | 3 | abstract classes and interfaces | variant-of-test |
| Q027 | B | spot-error | medium | 3 | abstract classes | variant-of-slides |
| Q028 | B | spot-error | medium | 3 | interfaces | variant-of-slides |
| Q029 | B | spot-error | medium | 3 | default methods and upcasting | variant-of-slides |
| Q030 | B | spot-error | medium | 3 | final and static | original |
| Q031 | B | spot-error | hard | 5 | abstract classes and casting | original |
| Q032 | B | spot-error | hard | 5 | interfaces, abstract and final | original |
| Q033 | B | spot-error | hard | 4 | static and final | original |
| Q034 | B | spot-error | hard | 4 | interface default and static methods | original |
| Q035 | B | spot-error | hard | 4 | abstract classes and interfaces | original |
| Q036 | C | spot-error | easy | 2 | throw vs throws | variant-of-tutorial |
| Q037 | C | spot-error | easy | 1 | remove(int) vs remove(Object) | original |
| Q038 | C | spot-error | medium | 3 | generics and size() | original |
| Q039 | C | spot-error | medium | 3 | contains/equals, loop bounds | original |
| Q040 | C | spot-error | medium | 3 | custom exception | original |
| Q041 | C | spot-error | medium | 3 | catch order, loop bounds | original |
| Q042 | C | spot-error | medium | 3 | ArrayList index, method header | original |
| Q043 | C | spot-error | hard | 4 | validation, parseInt, catch type | original |
| Q044 | C | spot-error | hard | 5 | calculateCGPA-style method | variant-of-test |
| Q045 | C | spot-error | hard | 4 | checked exception, add vs set | original |
| Q046 | C | spot-error | hard | 5 | registerCourse-style validation | variant-of-assignment |
| Q047 | C | spot-error | hard | 4 | remove(int) vs remove(Object), size() | original |
| Q048 | D | spot-error | easy | 2 | ActionListener wiring | original |
| Q049 | D | spot-error | medium | 4 | validation and output (Register button) | variant-of-test |
| Q050 | D | spot-error | medium | 4 | Process Payment button, catch order | variant-of-test |
| Q051 | D | spot-error | medium | 3 | JComboBox cast, JOptionPane, String.format | original |
| Q052 | D | spot-error | medium | 4 | building the window (layout) | variant-of-test |
| Q053 | D | spot-error | medium | 3 | throw vs throws, overriding | original |
| Q054 | D | spot-error | medium | 4 | ArrayList profile display (assignment variant) | variant-of-assignment |
| Q055 | D | spot-error | hard | 5 | building the window and listener | variant-of-test |
| Q056 | D | spot-error | hard | 5 | exception flow in actionPerformed | original |
| Q057 | D | spot-error | hard | 4 | switch fall-through, integer division | original |
| Q058 | D | spot-error | hard | 5 | layouts, anonymous listener | original |
| Q059 | D | spot-error | hard | 5 | CGPA calculation in a GUI (assignment variant) | variant-of-assignment |
| Q060 | D | spot-error | hard | 5 | inner listener class, static main, validation | original |
| Q061 | E | write-code | easy | 8 | arrays min/max | variant-of-slides |
| Q062 | E | write-code | easy | 8 | 2D arrays | variant-of-slides |
| Q063 | E | write-code | easy | 8 | method overloading | variant-of-slides |
| Q064 | E | write-code | easy | 9 | linear search | original |
| Q065 | E | write-code | medium | 10 | recursion | variant-of-slides |
| Q066 | E | write-code | medium | 11 | recursion | original |
| Q067 | E | write-code | medium | 11 | bubble sort | original |
| Q068 | E | write-code | medium | 11 | 2D arrays | original |
| Q069 | E | write-code | medium | 10 | insertion sort | original |
| Q070 | E | write-code | hard | 13 | binary search | original |
| Q071 | E | write-code | hard | 14 | selection sort | variant-of-test |
| Q072 | E | write-code | hard | 15 | 2D arrays matrix operations | original |
| Q073 | F | write-code | easy | 8 | encapsulation final static | variant-of-slides |
| Q074 | F | write-code | medium | 10 | abstract class polymorphism | variant-of-slides |
| Q075 | F | write-code | medium | 10 | abstract class | variant-of-slides |
| Q076 | F | write-code | medium | 10 | interfaces | variant-of-slides |
| Q077 | F | write-code | medium | 11 | multilevel inheritance | variant-of-slides |
| Q078 | F | write-code | hard | 13 | abstract class payment | variant-of-slides |
| Q079 | F | write-code | hard | 13 | interface default methods | variant-of-slides |
| Q080 | F | write-code | hard | 15 | inheritance constructor chaining | variant-of-assignment |
| Q081 | G | write-code | medium | 9 | custom exception try-catch-finally | original |
| Q082 | G | write-code | medium | 10 | ArrayList remove sort search | original |
| Q083 | G | write-code | medium | 11 | Swing form validation | variant-of-test |
| Q084 | G | write-code | hard | 14 | Person Student Course CGPA ArrayList | variant-of-assignment |
| Q085 | G | write-code | hard | 15 | Swing registration CGPA app | variant-of-assignment |
| Q086 | H | predict-output | easy | 3 | string concatenation and equality | original |
| Q087 | H | predict-output | easy | 2 | static counters | original |
| Q088 | H | predict-output | easy | 2 | integer division and casting | original |
| Q089 | H | predict-output | easy | 3 | constructor chaining | variant-of-slides |
| Q090 | H | predict-output | medium | 3 | overloading vs overriding | original |
| Q091 | H | predict-output | medium | 3 | upcasting and dynamic dispatch | original |
| Q092 | H | predict-output | medium | 3 | arrays and pass-by-value | original |
| Q093 | H | predict-output | medium | 4 | finally ordering and exception flow | original |
| Q094 | H | predict-output | hard | 4 | ArrayList remove(int) vs remove(Object) | original |
| Q095 | H | predict-output | hard | 4 | initialisation order and uncaught exception | original |
| Q096 | I | debug-extend | medium | 9 | custom exceptions | original |
| Q097 | I | debug-extend | medium | 9 | ArrayList of objects | original |
| Q098 | I | debug-extend | hard | 12 | abstract classes and inheritance | variant-of-slides |
| Q099 | I | debug-extend | hard | 12 | CGPA calculation with ArrayList | variant-of-assignment |
| Q100 | I | debug-extend | hard | 10 | Swing form and event handling | variant-of-test |

## Study Order

Plan for a two-day push. Times are approximate and assume about 5 hours a day. Questions inside each section run easy to hard, so always go in ID order.

**Day 1: foundation (about 5 hours)**

| Block | Section | IDs | Time | What to do |
|---|---|---|---|---|
| 1 | A: Classes, constructors, encapsulation, inheritance | Q001-Q020 | 90 min | Do all 20. These are the Part 1 style questions. Write line number, type and fix every time. |
| 2 | B: Abstract classes, interfaces, polymorphism, modifiers | Q021-Q035 | 70 min | Do all 15. Q024-Q035 mirror Part 2 (PaymentMethod style). |
| 3 | E: Arrays, recursion, sorting, searching | Q061-Q072 | 90 min | Write the code by hand first. Q071 is the selection-sort question in the lecturer's style. |
| 4 | H (first five): trace the output | Q086-Q090 | 25 min | Trace on paper before you run anything. |
| 5 | Review | Wrong answers from today | 25 min | Re-read the key for each miss. |

**Day 2: exam style (about 5 hours)**

| Block | Section | IDs | Time | What to do |
|---|---|---|---|---|
| 1 | C: ArrayList and exceptions | Q036-Q047 | 60 min | Q044 and Q046 mirror the CGPA code from Part 1. |
| 2 | D: Swing GUI and events | Q048-Q060 | 70 min | Q049, Q050, Q052 and Q055 mirror the real button and window questions. |
| 3 | F: OOP class design | Q073-Q080 | 45 min | Do at least Q074, Q076, Q078 and Q079. |
| 4 | G: ArrayList, exception and Swing programs | Q081-Q085 | 40 min | Do Q084 fully. It is the assignment system. |
| 5 | I: Debug, then extend | Q096-Q100 | 30 min | Fix first, then add the feature. |
| 6 | H (last five) | Q091-Q095 | 20 min | Dynamic dispatch, finally order, remove(int). |
| 7 | Mock papers 1 to 3 | see Mock Papers | 3 x 60 min if time allows | Timed. Mock 1 first. |

**Last hour:** go back to the questions you got wrong. Re-do them without looking at the key, then do the "common mistakes" lines for those questions.

**If time is short, do this order:** Mock 1 (Part 1 and 2 first), then Q049-Q052, Q044, Q071, then A (Q006-Q020), then B (Q024-Q035). The real paper is 9 debugging snippets plus 1 program, so debugging practice pays most.

## Mock Papers

Three full papers built from bank questions (no new questions). Part 1 is five debugging snippets (A/B/C), Part 2 is four (B/C/D, with a Swing question), Part 3 is one program or debug-and-extend task. Mock 1 leans medium, Mock 2 medium-hard, Mock 3 hard. No ID is reused across mocks.

| mock | part | question ids | total points | suggested minutes |
|---|---|---|---|---|
| 1 | 1 | Q005, Q006, Q010, Q024, Q038 | 13 | 27 |
| 1 | 2 | Q025, Q041, Q049, Q052 | 14 | 26 |
| 1 | 3 | Q069 | 10 | 18 |
| 2 | 1 | Q003, Q007, Q013, Q027, Q043 | 16 | 33 |
| 2 | 2 | Q028, Q045, Q050, Q056 | 16 | 31 |
| 2 | 3 | Q097 | 9 | 12 |
| 3 | 1 | Q017, Q014, Q019, Q031, Q044 | 21 | 46 |
| 3 | 2 | Q033, Q034, Q046, Q055 | 18 | 35 |
| 3 | 3 | Q071 | 14 | 25 |
