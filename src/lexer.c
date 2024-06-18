#include <stdint.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <ctype.h>
#include "error.h"
#include "lexer.h"

int isSpecial(char);

int tokenize(char* code, token_t* tokens) {
    uint32_t i = 0;
    uint32_t row = 1;
    uint32_t col = 1;

    uint32_t tokenCount = 0;

    while (code[i] != '\0') {
        char c = code[i++];
        col++;
        token_t token = { 0 };
        
        if (isspace(c)) {
            if (c == '\n') {
                row++;
                col = 0;
            }
            continue;
        } else if (isalpha(c)) {
            int charPos = 0;
            token.value.string[charPos++] = c;

            while (isalnum(code[i])) {
                token.value.string[charPos++] = code[i++];
                col++;
            }

            token.type = IDENTIFIER;
            token.row = row;
            token.col = col;
        } else if (c == ';') {
            token.type = END_OF_LINE;
            token.row = row;
            token.col = col;
        } else if (isdigit(c)) {
            uint32_t num = c - '0';
            while (isdigit(code[++i])) {
                num *= 10;
                num += code[i] - '0';
            }

            token.type = L_INTEGER;
            token.value.integer = num;
        } else {
            if (isSpecial(c)) {
                token.type = SPECIAL;
                token.value.character = c;
            } else {
                printf("Unexpected '%c'!\n", c);
                continue;
            }
        }

        tokens[tokenCount++] = token;
    }

    tokens[tokenCount].type = END_OF_FILE;
    tokens[tokenCount].row = row;
    tokens[tokenCount].col = col;

    return 0;
}

int isSpecial(char c) {
    char* s = (char*)"(){}[]+-*/='\"<>%";
    while (*s != '\0') {
        if (c == *s++) return 1;
    }

    return 0;
}

