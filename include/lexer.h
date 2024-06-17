#ifndef LEXER_H
#define LEXER_H

#include <stdint.h>

typedef enum {
    END_OF_LINE,
    END_OF_FILE,
} tokenType_t;

typedef struct {
    tokenType_t type;
    char* value;
    char* content;
    uint32_t row;
    uint32_t col;
} token_t;

int tokenize(char*, token_t*);

#endif
