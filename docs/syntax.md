# Neon Syntax

## Keywords
- if
- else
- while
- for
- switch
- case
- default
- return
- break
- continue
- exit
- goto
- true
- false
- type
- asm

## Types
Since Neon is a strongly-typed language, it needs type keywords.
Here they are:
- char (an 8-bit ascii byte)
- bool (true = 1, false = 0)
- int (probably will need integer sizes and signed/unsigned)
- floats (single and double precision)
- struct (object like things)
- union (multiple types at the same memory address)
- void (absence of a type)
- arrays (maybe null terminated or length)
- string (a character array)
- pointer (a memory address)

## Constants
For variable definitions, you may use a constant initializer:
- Character constants: 'a', 'b', '\n'
- String constants: "Hello!", "Test"
- Boolean: true, false
- Integers: 42, 64
- Floats: 12f, 3.14f
- Arrays: [ 1, 2, 3, 4 ]
- Structures: _TODO_

## Variables
Functions may be defined using this syntax. A declaration without a value will have an implicit null value:
```ne
int x = 42;
int y; // Implicit null value

y = x + 8; // Value asignment
```

## Functions
To define functions, you can use this syntax
```ne
<returntype> <identifier> ( <argslist> ) {
    (...code)
}
```
Example:
```ne
int add(int a, int b) {
    return a + b;
}
```
You may also declare functions, without giving them a body to be defined later like this: (argument indentifiers may be ommited)
```ne
<returntype> <identifier> ( <arglist> );
```
Example:
```ne
int add(int, int);
```

