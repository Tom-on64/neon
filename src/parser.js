import { ttype, keywords } from "./lexer.js";
import ast from "./ast.js";
import { ntype } from "./ast.js";
import { error, warn } from "./error.js";

const opOrder = {
    [ttype.LT]: 0,
    [ttype.LTE]: 0,
    [ttype.GT]: 0,
    [ttype.GTE]: 0,
    [ttype.EQUIV]: 0,
    [ttype.NOT_EQUIV]: 0,
    [ttype.ASSIGN]: 0,
    [ttype.AND]: 0,
    [ttype.OR]: 0,
    [ttype.NOT]: 0,
    [ttype.PERIOD]: 0,
    [ttype.PLUS]: 1,
    [ttype.MINUS]: 1,
    [ttype.BIT_AND]: 1,
    [ttype.BIT_OR]: 1,
    [ttype.BIT_NOT]: 1,
    [ttype.BIT_XOR]: 1,
    [ttype.MODULO]: 2,
    [ttype.STAR]: 2,
    [ttype.SLASH]: 2,
}

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
        if (this.tokens[this.index].type === tokenType) return this.consume();
        error(`Expected ${tokenType}!`);
    }

    parse(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.ast = [];

        while (this.peek().type !== ttype.EOF) this.ast.push(this.stmt());

        return this.ast;
    }

    stmt() {
        const t = this.peek();
        
        if (t.type === ttype.TYPE) { return this.decl(); }
        else if (t.type === ttype.KEYWORD) {
            switch (t.value) {
                case "exit": { this.consume();
                    const e = this.expr(); 
                    this.expect(ttype.EOL); 
                    return ast.Exit(e); 
                }
                default: 
                    error(`Unexpected ${t.value} keyword!`);
                    break;
            }
        } else { return this.expr(); }
    }

    decl() {
        const type = this.expect(ttype.TYPE).value;
        const ident = this.expect(ttype.IDENT).value;

        if (this.peek().type === ttype.ASSIGN) { // Definition
            this.expect(ttype.ASSIGN);
            const value = this.expr();
            this.expect(ttype.EOL);

            return ast.Var(ident, value, type);
        } else if (this.peek().type === ttype.EOL) { // Declaration (no value)
            this.expect(ttype.EOL);
            
            return ast.Var(ident, null, type);
        }

        // Function
        const params = [];

        this.expect(ttype.LPAREN);
        if (this.peek().type !== ttype.RPAREN) {
            params.push({ type: this.expect(ttype.TYPE).value, ident: this.expect(ttype.IDENT).value });

            while (this.peek().type === ttype.COMMA) {
                this.expect(ttype.COMMA);
                params.push({ type: this.expect(ttype.TYPE).value, ident: this.expect(ttype.IDENT).value });
            }
        }
        this.expect(ttype.RPAREN);

        const body = this.scope();

        return ast.Func(ident, body, params, type);
    }

    scope() {
        const body = [];

        this.expect(ttype.LBRACE);
        while (this.peek().type !== ttype.RBRACE) { body.push(this.stmt()); }
        this.expect(ttype.RBRACE);

        return ast.Scope(body);
    }

    expr() {
        const left = this.simple();
        
        if (this.isOp(this.peek().type)) {
            const op = this.consume().type;
            const right = this.expr();

            if (right.type === ntype.BINOP && opOrder[op] > opOrder[right.op]) {
                return ast.Binary(
                    ast.Binary(left, op, right.left),
                    right.op,
                    right.right
                );
            }

            return ast.Binary(left, op, right);
        }

        return left;
    }

    simple() {
        const t = this.consume();

        switch (t.type) {
            case ttype.L_INT: return ast.L_Int(parseInt(t.value));
            case ttype.L_FLOAT: return ast.L_Float(parseFloat(t.value));
            case ttype.L_CHAR: return ast.L_Char(t.value);
            case ttype.L_BOOL: return ast.L_Bool(t.value);
            case ttype.L_STRING: return ast.L_String(t.value);
            case ttype.IDENT: return ast.Var(t.value);
            case ttype.LPAREN: {
                const expr = this.expr();
                this.expect(ttype.RPAREN);
                return expr;
            }
            case ttype.LBRACKET: {
                let items = [];
                if (this.peek().type !== ttype.RBRACKET) items = this.exprList();
                this.expect(ttype.RBRACKET);
                return ast.L_Array(items);
            }
        }

        error(`Expected expression, but got ${t.type}${t.value ? " ('" + t.value + "')" : ""}.`);
    }

    exprList() {
        const list = [];
        list.push(this.expr());

        while (this.peek().type === ttype.COMMA) {
            this.consume(); // Consume comma
            list.push(this.expr());
        }

        return list;
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

