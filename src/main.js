import { readFile } from "node:fs";
import { Lexer } from "./lexer.js";
import { Parser } from "./parser.js";

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
                if (++i === argv.length) {
                    console.log("Expected file after '-o'!");
                    process.exit(1);
                }
                outfile = argv[i];
                break;
            default:
                console.log(`Unknown command line option '${arg}'!`);
                process.exit(1);
                break;
        }
    } else {
        infile = arg;
    }
}

if (!infile) {
    console.log("No input file given!");
    process.exit(1);
}

console.log(`${infile} -> ${outfile}`);

readFile(infile, (err, data) => {
    if (err) {
        console.error(`${err.code}: File '${err.path}' not found!`);
        process.exit(1);
    }

    // TODO: Preprocessor
    const lexer = new Lexer();
    const parser = new Parser();

    const tokens = lexer.tokenize(data.toString());
    const ast = parser.parse(tokens);
    console.log(ast);
    // TODO: Optimisation??
    // TODO: Code generator
    // TODO: Assembler
    // TODO: Output executable
});

