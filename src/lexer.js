import { error, warn } from "./error.js";

// Token Types
export const ttype = { // TODO: Change these to numbers
    EOF: "EOF",
    EOL: "EOL",
    IDENT: "Identifier",
    KEYWORD: "Keyword",
    TYPE: "Type",
    LPAREN: "(",
    RPAREN: ")",
    LBRACKET: "[",
    RBRACKET: "]",
    LBRACE: "{",
    RBRACE: "}",
    ASSIGN: "=",
    EQUIV: "==",
    NOT_EQUIV: "!=",
    GT: ">",
    GTE: ">=",
    LT: "<",
    LTE: "<=",
    OR: "||",
    AND: "&&",
    NOT: "!", 
    PLUS: "+",
    MINUS: "-",
    STAR: "*",
    SLASH: "/",
    MODULO: "%",
    BIT_OR: "|",
    BIT_AND: "&",
    BIT_NOT: "~",
    BIT_XOR: "^",
    PERIOD: ".",
    COMMA: ",",
    L_INT: "Lit:int",
    L_FLOAT: "Lit:float",
    L_CHAR: "Lit:char",
    L_STRING: "Lit:string",
};

export const keywords = [
    /* Control flow */
    "if",
    "else",
    "switch",
    "case",
    "default",
    "return",
    "continue",
    "break",
    "goto",
    "exit",
    /* Loops */
    "while",
    "for",
    /* Storage specifiers */
    "const",
    // TODO: static, public, private, ...
    "struct",
    "union",
    "enum",
    /* Special Keywords */
    "sizeof",
    "typedef",
    "asm",
    "null",
];

const types = [
    "void",
    "int", // TODO: Maybe a better integer naming system for different sizes
    "uint", 
    "float",
    "double",
    "char",
    "string",
];

export const token = (type, value = null) => ({ type, value });

export class Lexer {
    tokens = []; // Token[]
    string = []; // Char[]
    index = 0;

    peek(dist = 0) {
        if (this.index + dist >= this.string.length) error("Unexpected End Of File!");
        return this.string[this.index + dist];
    }

    consume() {
        if (this.index < this.string.length) return this.string[this.index++];
        error("Unexpected End Of File!");
    }

    match(c) {
        if (this.peek() === c) return this.consume();
        return false;
    }

    tokenize(code) {
        this.tokens = [];
        this.string = code.split('');
        this.index = 0;

        while (this.index < this.string.length) { 
            const t = this.nextToken();
            if (t) this.tokens.push(t);
        }

        this.tokens.push(token(ttype.EOF));
        return this.tokens;
    }

    nextToken() {
        if (this.peek().match(/\s/)) { // Whitespace
            this.consume();
        } else if (this.peek() === '/' && (this.peek(1) == '/' || this.peek(1) == '*')) { // Comments
            this.consume();
            if (this.consume() === '/') {
                while (this.peek() !== '\n') {
                    this.consume();
                }
                this.consume();
            } else {
                while (this.peek() !== '*' && this.peek(1) != '/') {
                    this.consume();
                }
                this.consume();
                this.consume();
            }
        } else if (this.peek().match(/[A-Za-z_]/)) { // Identifier or keyword
            let string = this.consume();
            while (this.peek().match(/[A-Za-z0-9_]/)) {
                string += this.consume();
            }

            if (keywords.includes(string)) {
                return token(ttype.KEYWORD, string);
            } else if (types.includes(string)) {
                return token(ttype.TYPE, string);
            }

            return token(ttype.IDENT, string);
        } else if (this.peek().match(/[0-9]/)) { // Int/Float literal
            let numString = this.consume();

            while (this.peek().match(/[0-9]/)) {
                numString += this.consume();
            }

            if (this.peek() !== '.' && this.peek() !== 'f') {
                return token(ttype.L_INT, numString);
            } else if (this.match('f')) {
                return token(ttype.L_FLOAT, numString);
            }

            numString += this.consume();

            while (this.peek().match(/[0-9]/)) {
                numString += this.consume();
            }

            if (!this.match('f')) error("Expected 'f' after float literal!");

            return token(ttype.L_FLOAT, numString);
        } else if (this.match('\'')) { // Char literal
            const c = this.getChar(); 
            if (!this.match('\'')) error("Expected closing quote after character literal!");
            
            return token(ttype.L_CHAR, c);
        } else if (this.match('"')) { // String literal
            let string = "";
            while (!this.match('"')) { string += this.getChar(); }
            return token(ttype.L_STRING, string);
        } else if (this.match(';')) { // End of line
            return token(ttype.EOL);
        } else { 
            const c = this.consume();

            switch (c) {
                case '(': return token(ttype.LPAREN);
                case ')': return token(ttype.RPAREN);
                case '[': return token(ttype.LBRACKET);
                case ']': return token(ttype.RBRACKET);
                case '{': return token(ttype.LBRACE);
                case '}': return token(ttype.RBRACE);
                case '+': return token(ttype.PLUS);
                case '-': return token(ttype.MINUS);
                case '*': return token(ttype.STAR);
                case '/': return token(ttype.SLASH);
                case '%': return token(ttype.MODULO);
                case '.': return token(ttype.PERIOD);
                case '|': return this.match('|') ? token(ttype.OR) : token(ttype.BIT_OR);
                case '&': return this.match('&') ? token(ttype.AND) : token(ttype.BIT_AND);
                case '~': return token(ttype.BIT_NOT);
                case '^': return token(ttype.BIT_XOR);
                case '!': return this.match('=') ? token(ttype.NOT_EQUIV) : token(ttype.NOT);
                case '=': return this.match('=') ? token(ttype.EQUIV) : token(ttype.ASSIGN);
                case '>': return this.match('=') ? token(ttype.GTE) : token(ttype.GT);
                case '<': return this.match('=') ? token(ttype.LTE) : token(ttype.LT);
                case ',': return token(ttype.COMMA);
            }

            if ("()[]{}?:=,".includes(c)) return token(ttype.SPECIAL, c);
            error(`Unexpected '${c}'!`);
        }
    }

    getChar() {
        const c = this.consume();
        if (c !== '\\') return c;

        const esc = this.consume();

        switch (esc) { // TODO: \xAA \uAAAA etc.
            case 'n':
                return '\n';
            case '0':
                return '\0';
            case '\'':
                return '\'';
            case 'e':
                return '\x1b';
            case '\\':
                return '\\';
            case '"':
                return '"';
            default: // TODO: Is this right?
                return esc;
        }
    }
}

