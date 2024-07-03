# Data Types
Every variable in Neon must have a type.

## List of types
- void - Represents the absence of a type
- int - A signed integer _TODO: Different int sizes_
- uint - An unsigned integer
- float - A 32-bit single precision floating point number
- double - A 64-bit double precision floating point number
- char - A single ASCII byte
- string - An array of characters _TODO: Is it null terminated or does it have a length property?_
- arrays - A collection of values of type **T** _See [Arrays](#Arrays)_
- pointer - A reference to a value of type **T** _See [Pointers](#Pointers)_
- struct - A structured collection of values of different types _See [Structs](#Structs)_
- union - A collection of different types stored at the same memory address _See [Unions](#Unions)_
- enums - _TODO_ _See [Enums](#Enums)_

## Arrays
An array is a collection of **N** values all of the type **T**, stored in memory immediatly following each other.
_TODO: write the rest_

## Pointers
For all data types **T**, there is a corresponding type '**T** Pointer'.
A Pointer contains the memory address of a variable with it's type.
A pointer can be declared using and asterisk ('\*') after the type (Whitespace before and after is optional).

## Structs
_TODO: write the rest_

## Unions
_TODO: write the rest_

## Enums
_TODO: write the rest_

