import Parser from "./src/parser.ts";

repl()

function repl() {
    const parser = new Parser();
    console.log("\nREPL v0.1")

    while (true) {
        const input = prompt("> ")

        if (!input || input.includes("exit")) 
            Deno.exit(1)

        const program = parser.produceAST(input)
        console.log(program)
    }
}