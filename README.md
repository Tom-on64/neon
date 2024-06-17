# Neon
_A ~~Stable~~, ~~Fast~~, Compiled programming language written in C_

## Usage
[_More detailed documentation_](./docs/main.md)

### Writing a program
You can write a program in Neon by creating a file that ends in `.ne` and writing your code.
Here's a Hello, World example:
```ne
// test.ne
import stdio;

void main() {
    log("Hello, World!");
}
```

### Compiling a program
For compiling, you can use the Neon compiler.
Here's an example compiling our Hello, World program:
`neon test.ne -o test`

We can run this using `./neon` and we should see:\\
`Hello, World!`

## For planned features, see [Todo](./todo.txt)

## Known issues
_If you find any issues that are not here, you can report them_

- There's no programming language :/

