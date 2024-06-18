#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "error.h"
#include "lexer.h"

#define VERSION "0.0.1"

char* loadFile(char*);

int main(int argc, char** argv) {
    char* infile = NULL;
    char* outfile = "out";

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "--version") == 0) {
            printf("%s %s (Neon)\n", argv[0], VERSION);
            exit(1);
        } else if (strcmp(argv[i], "--help") == 0) {
            printf("Usage: %s <file> [-o <file>] [--version] [--help]\n", argv[0]);
            exit(1);
        } else if (strcmp(argv[i], "-o") == 0) {
            if (i + 1 >= argc) {
                error("Expected file after '-o'. (-o <file>)");
                exit(1);
            }

            outfile = argv[++i];
        } else {
            infile = argv[i];
        }
    }

    if (infile == NULL) {
        error("No input files given!");
        exit(1);
    }

    // Allocates a buffer -> we must free it
    char* code = loadFile(infile);
    token_t tokens[1024] = { 0 };
    tokenize(code, tokens);
    free(code);

    size_t i = 0;
    while (tokens[i].type != END_OF_FILE) {
        token_t tkn = tokens[i++];

        printf("{ type: %d, value: ", tkn.type);
        if (tkn.type == L_INTEGER) printf("%d", tkn.value.integer);
        else if (tkn.type == L_FLOAT);// TODO
        else if (tkn.type == L_CHAR) printf("'%c'", tkn.value.character);
        else if (tkn.type == END_OF_LINE) printf("EOL");
        else printf("\"%s\"", tkn.value.string);
        
        printf(", row: %d, col: %d }\n", tkn.row, tkn.col);
    }

    return 0;
}

char* loadFile(char* file) {
    FILE* fp;
    if ((fp = fopen(file, "r")) == NULL) {
        error("File does not exist!");
        exit(1);
    }

    fseek(fp, 0, SEEK_END);
    size_t len = ftell(fp);
    rewind(fp);

    char* buf = malloc(len);
    if (fread(buf, len, 1, fp) != 1) {
        error("Failed while reading file!");
        exit(1);
    }

    fclose(fp);

    return buf;
}

