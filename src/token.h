#ifndef TOKEN_H
#define TOKEN_H

typedef enum {
    T_EOL,
    T_PLUS,
    T_MINUS,
    T_STAR,
    T_SLASH,
    T_INTLIT
} TokenType;

typedef struct {
    TokenType type;
    char* lexeme;
    int row, col;
} Token;

typedef struct {
    Token* tokens;
    int count;
    int capacity;
} TokenList;

#endif
