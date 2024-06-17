#include <stdint.h>
#include <stdlib.h>
#include "lexer.h"

int tokenize(char* code, token_t* tokens) {
    uint32_t i = 0;
    uint32_t row = 1;
    uint32_t col = 1;

    uint32_t tokenCount = 0;

    while (code[i] != '\0') {
        char c = code[i++];
    }

    tokens[tokenCount] = (token_t) { 
        .type = END_OF_FILE,
        .value = NULL,
        .content = NULL,
        .row = row,
        .col = col,
    };

    return 0;
}

