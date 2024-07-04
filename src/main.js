import { readFile } from "node:fs";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";
import { error, warn } from "./error.js";

const HELP_MSG = "Usage: neon <file> [-o <file>] [-h] [-v]";
const VERSION = "0.0.1";

const argv = [...process.argv];
let infile = null;
let outfile = "out.s"; // We will be outputting assembly for now

if (argv[0].includes("node")) { 
    argv.shift(); // Gets rid of node.js arg and sets up expected state
}

if (argv.length < 2) {
    console.log(HELP_MSG);
    process.exit(1);
}

// Parse command line args
for (let i = 1; i < argv.length; i++) {
    const arg = argv[i];

    if (arg[0] === '-') {
        switch (arg) {
            case "-h":
                console.log(HELP_MSG);
                process.exit(0);
                break;
            case "-v":
                console.log(`Neon ${VERSION}`);
                process.exit(0);
                break;
            case "-o":
                if (++i === argv.length) error("Expected file after '-o'!");
                outfile = argv[i];
                break;
            default:
                error(`Unknown command line option '${arg}'!`);
                break;
        }
    } else {
        infile = arg;
    }
}

if (!infile) error("No file given!");

console.log(`${infile} -> ${outfile}`);

readFile(infile, (err, data) => {
    if (err) error(err.message);

    // TODO: Preprocessor
    const lexer = new Lexer();
    const parser = new Parser();

    const tokens = lexer.tokenize(data.toString());
    //console.log(tokens);
    const ast = parser.parse(tokens);
    console.log(JSON.stringify(ast, null, ' '));
    // TODO: Optimisation??
    // TODO: Code generator
    // TODO: Assembler
    // TODO: Output executable
});

