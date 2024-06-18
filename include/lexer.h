#ifndef LEXER_H
#define LEXER_H

#include <stdint.h>

typedef enum {
    KEYWORD,
    TYPE,
    IDENTIFIER,
    SPECIAL,
    L_INTEGER,
    L_FLOAT,
    L_CHAR,
    L_STRING,
    END_OF_LINE,
    END_OF_FILE,
} tokenType_t;

typedef struct {
    tokenType_t type;
    union {
        uint32_t integer;
        // TODO: floats
        char character;
        char string[256];
    } value;
    uint32_t row;
    uint32_t col;
} token_t;

int tokenize(char*, token_t*);

#endif
