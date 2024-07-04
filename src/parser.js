import { ttype } from "./lexer.js";
import ast from "./ast.js";
import { error, warn } from "./error.js";

export class Ast {}

export class Parser {
    tokens = []; // Token[]
    ast = {}; // Abstarct Syntax Tree
    index = 0;

    peek(dist = 0) {
        if (this.index + dist >= this.tokens.length) error("Unexpected End Of File!");
        return this.tokens[this.index + dist];
    }

    consume() {
        if (this.index < this.tokens.length) return this.tokens[this.index++];
        error("Unexpected End Of File!");
    }

    expect(tokenType) {
        if (this.tokens[this.index].type == tokenType) return this.consume();
        error(`Expected ${tokenType}!`);
    }

    parse(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.ast = [];

        while (this.peek().type != ttype.EOF) this.ast.push(this.stmt());

        return this.ast;
    }

    stmt() {
        const t = this.peek();

        switch (t.type) {
            case ttype.KEYWORD: 
                if (t.value != "exit") break;
                this.consume()
                const e = this.expr();
                this.expect(ttype.EOL);
                return ast.Exit(e);
            default:
                return this.expr();
        }
    }

    expr() {
        const left = this.simple();
        
        if (this.isOp(this.peek().type)) {
            const op = this.consume();
            const right = this.expr();
            return ast.Binary(left, op, right);
        }

        return left;
    }

    simple() {
        const t = this.consume();

        switch (t.type) {
            case ttype.L_INT:
                return ast.L_Int(parseInt(t.value));
            case ttype.L_FLOAT:
                return ast.L_Float(parseFloat(t.value));
            case ttype.L_CHAR:
                return ast.L_Char(t.value);
            case ttype.L_BOOL:
                return ast.L_Bool(t.value);
            case ttype.L_STRING:
                return ast.L_String(t.value);
            case ttype.IDENT:
                return ast.Var(t.value);
            // TODO: Arrays
        }

        error(`Expected expression, but got ${t.type}${t.value ? " ('" + t.value + "')" : ""}.`);
    }

    isOp(type) {
        return [
            ttype.ASSIGN,
            ttype.EQUIV,
            ttype.NOT_EQUIV,
            ttype.GT,
            ttype.GTE,
            ttype.LT,
            ttype.LTE,
            ttype.OR,
            ttype.AND,
            ttype.NOT, 
            ttype.PLUS,
            ttype.MINUS,
            ttype.STAR,
            ttype.SLASH,
            ttype.BIT_OR,
            ttype.BIT_AND,
            ttype.BIT_NOT,
            ttype.BIT_XOR,
            ttype.PERIOD,
        ].includes(type); 
    }
}

