import { ttype } from "./lexer.js";

export const ntype = {
    PROGRAM: "program",
    EXIT: "exit",
};

export class Parser {
    tokens = []; // Token[]
    index = 0;

    peek(dist = 0) {
        if (this.index + dist >= this.tokens.length) return null; // TODO: Error!!
        return this.tokens[this.index + dist];
    }

    consume() {
        if (this.index < this.tokens.length) return this.tokens[this.index++];
        return null; // TODO: Error!!
    }

    expect(tokenType) {
        if (this.tokens[this.index].type == tokenType) return this.consume();
        
        console.error(`Expected ${tokenType}!`);
    }

    parse(tokens) {
        this.tokens = tokens;
        this.index = 0;

        const ast = this.parseProgram();

        return ast;
    }

    parseProgram() {
        const program = { type: ntype.PROGRAM, statements: [] };
        
        while (this.peek().type != ttype.EOF) {
            program.statements.push(this.parseStatement());
        }

        return program;
    }

    parseStatement() {
        const t = this.consume();
        
        if (t.type == ttype.KEYWORD) {
            const exitCode = this.expect(ttype.L_INT).value;
            this.expect(ttype.EOL);
            
            return { type: ntype.EXIT, exitCode };
        } else console.error("NA");
    }
}

