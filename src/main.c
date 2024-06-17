#include <stdio.h>
#include <stdlib.h>
#include <string.h>
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
                printf("Expected file after '-o'. (-o <file>)\n");
                exit(1);
            }

            outfile = argv[++i];
        } else {
            infile = argv[i];
        }
    }

    if (infile == NULL) {
        fprintf(stderr, "Error: no input files given!\n");
        exit(1);
    }

    // Allocates a buffer -> we must free it
    char* code = loadFile(infile);
    token_t tokens[1024] = { 0 };
    tokenize(code, tokens);
    free(code);

    printf("%d\n", tokens[0].type);

    return 0;
}

char* loadFile(char* file) {
    FILE* fp;
    if ((fp = fopen(file, "r")) == NULL) {
        fprintf(stderr, "File %s does not exist!\n", file);
        exit(1);
    }

    fseek(fp, 0, SEEK_END);
    size_t len = ftell(fp);
    rewind(fp);

    char* buf = malloc(len);
    if (fread(buf, len, 1, fp) != 1) {
        fprintf(stderr, "Failed while reading %s!\n", file);
        exit(1);
    }

    fclose(fp);

    return buf;
}

