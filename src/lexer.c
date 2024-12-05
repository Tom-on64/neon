#include <stdlib.h>
#include "token.h"
#include "lexer.h"

#define DEF_TKN_COUNT   128

static TokenList tokens = { 0 };

TokenList* tokenize(char* code) {
    tokens.count = 0;
    tokens.tokens = malloc(sizeof(Token) * DEF_TKN_COUNT);
    tokens.capacity = DEF_TKN_COUNT;

    tokens.tokens[0] = (Token) {
        .type = T_MINUS,
        .lexeme = "test",
        .row = 4,
        .col = 20
    };
    tokens.count++;
    tokens.capacity--;

    return &tokens;
}

