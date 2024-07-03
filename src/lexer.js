// Token Types
export const ttype = { // TODO: Change these to numbers
    EOF: "EOF",
    EOL: "EOL",
    IDENT: "Identifier",
    KEYWORD: "Keyword",
    SPECIAL: "Special",
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
    /* Types */
    "void",
    "int", // TODO: Maybe a better integer naming system for different sizes
    "uint", 
    "float",
    "double",
    "char",
    "string",
    "struct",
    "union",
    "enum",
    /* Special Operators */
    "sizeof",
    "typedef",
    "asm",
]

export const token = (type, value = null) => ({ type, value });

export class Lexer {
    tokens = []; // Token[]
    string = []; // Char[]
    index = 0;

    peek(dist = 0) {
        if (this.index + dist >= this.string.length) return null; // TODO: Error!!!
        return this.string[this.index + dist];
    }

    consume() {
        if (this.index < this.string.length) return this.string[this.index++]
        return null; // TODO: Error!!!
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
            return
        } else if (this.peek().match(/[A-Za-z_]/)) { // Identifier or keyword
            let string = this.consume();
            while (this.peek().match(/[A-Za-z0-9_]/)) {
                string += this.consume();
            }

            if (keywords.includes(string)) {
                return token(ttype.KEYWORD, string);
            }

            return token(ttype.IDENT, string);
        } else if (this.peek().match(/[0-9]/)) { // Int/Float literal
            const numString = this.consume();

            while (this.peek().match(/[0-9]/)) {
                numString += this.consume();
            }

            if (this.peek() != '.' && this.peek() != 'f') {
                return token(ttype.L_INT, numString);
            } else if (this.consume() == 'f') {
                return token(ttype.L_FLOAT, numString);
            }

            numString += '.';

            while (this.peek().match(/[0-9]/)) {
                numString += this.consume();
            }

            if (this.peek() != 'f') return; // TODO Error!!

            return token(ttype.L_FLOAT, numString);
        } else if (this.peek() == '\'') { // Char literal
            this.consume(); // Consume quote
            const c = this.getChar(); 
            if (this.peek() != '\'') return; // TODO: Error!!
            this.consume(); 

            return token(ttype.L_CHAR, c);
        } else if (this.peek() == '"') { // String literal
            this.consume(); // Consume quote

            let string = "";
            while (this.peek() != '"') {
                string += this.getChar();
            }

            this.consume(); // We know this is a quote, because the loop has stopped
            return token(ttype.L_STRING, string);
        } else if (this.peek() == ';') { // End of line
            this.consume();
            return token(ttype.EOL);
        } else { 
            const c = this.consume();
            const special = "()[]{}=<>!&|~^+-/*%?:.," // All special characters allowed
            
            if (special.includes(c)) {
                return token(ttype.SPECIAL, c);
            } else { // TODO: Proper error
                console.log(`Unexpected '${c}'!`);
                return;
            }
        }
    }

    getChar() {
        const c = this.consume();
        if (c != '\\') return c;

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

