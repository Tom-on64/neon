export interface Token {
  value: string;
  type: TokenType;
}

export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen,
  CloseParen,
  BinaryOperator,
  Let,
  EOF, 
}

const KEYWORDS: Record<string, TokenType> = {
    "let": TokenType.Let
}

function token(value = "", type: TokenType): Token {
  return { value, type };
}

function isAlpha(src: string) {
  return src.toUpperCase() != src.toLocaleLowerCase();
}

function isInt(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

function isSkipable(str: string) {
    return str == " " || str == "\n" || str == "\t";
}

export function tokenize(sourceCode: string): Token[] {
  const tokens = new Array<Token>();
  const src = sourceCode.split("");

  // Build each token
  while (src.length > 0) {
    if (src[0] == "(") tokens.push(token(src.shift(), TokenType.OpenParen));
    else if (src[0] == ")")
      tokens.push(token(src.shift(), TokenType.CloseParen));
    else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/")
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    else if (src[0] == "=") tokens.push(token(src.shift(), TokenType.Equals));
    else {
      // Handle multicharacter tokens
      if (isInt(src[0])) {
        // Build Number Token
        let num = "";
        while (src.length > 0 && isInt(src[0])) num += src.shift();
        tokens.push(token(num, TokenType.Number));
      } else if (isAlpha(src[0])) {
        // Build String Token
        let id = "";
        while (src.length > 0 && isAlpha(src[0])) id += src.shift();
        
        // Reserved check
        const reserved = KEYWORDS[id];
        if (reserved === undefined)
            tokens.push(token(id, TokenType.Identifier));
        else
            tokens.push(token(id, reserved));
      } else if (isSkipable(src[0])) 
        src.shift(); // Skip
      else {
        console.log("Unknown Character: ", src[0])
        Deno.exit(1);
      }
    }
  }

  tokens.push(token("EndOfFile", TokenType.EOF))
  return tokens;
}

const source = await Deno.readTextFile("test.ne")

for (const token of tokenize(source)) {
    console.log(token)
}
