/*
    Note: This file is in JS, because of some stupid TypeScript stuff
*/

/**
 * Throws an error
 * @param {number} code Error code
 * @param {string[]} args Arguments for the error message
 * @param {number|undefined} lineNum Line number of error
 * @returns {never}
 */
export const error = (code = 0, args = [], lineNum = undefined) => {
    // if (Object.keys(errors).includes(errCode))
    const errCode = code.toString().padStart(3, "0");
    let err = errors[errCode];

    args.forEach((arg, i) => {err = err.replaceAll(`%${i}`, arg)});

    console.error(`\u001b[31mError: ${err ? err : "Unknown Error"}    \u001b[90m${lineNum ? ` Line: ${lineNum} ` : ""}\u001b[1mNE${errCode}\u001b[0m`);
    return Deno.exit(1);
}

const errors = {
    // System
    "000": "Unknown Error", 
    // Lexer
    "100": "Lexer Error", 
    "101": "Expected single character, but got more", 
    "102": "Expected 'f' after float literal", 
    "103": "Invalid character '%0'", 
    "104": "Unexpected End of file", 
    // Parser
    "200": "Parser Error", 
    "201": "Failed while parsing expression", 
    "202": "Expected '%0'", 
    "203": "Peek out of range", 
    "204": "Expected statement, but got '%0'", 
    "205": "Unknown operator", 
    "206": "Expected expression", 
    // Generator
    "300": "Generation Error", 
    "301": "Undefined variable '%0'", 
    "302": "Assignment to undeclared variable", 
    "303": "Variable already exists", 
    "304": "Generation Error", 
    "305": "Undefined function '%0'", 
    "306": "Function '%0' expected %1 arguments, but got %2", 
    // Other
    "500": "Fatal Error", 
    "501": "You must begin a scope before closing it!", 
    "502": "No input file provided!", 
    "503": "Expected a file path", 
    "504": "Unknown option. Use 'neon --help' for a list of available options", 
}
