#include <stdio.h>

int main(int argc, char** argv) {
    char* infile = NULL;
    char* outfile = "out.s";

    // Loop through arguments
    for (int i = 1; i < argc; i++) {
        // Input file
        if (argv[i][0] != '-') {
            if (infile == NULL) infile = argv[i];
            else printf("%s: \x1b[33mWarning:\x1b[0m ignoring file %s.\n", argv[0], argv[i]);
            continue;
        }

        if (argv[i][1] == '\0') {
            printf("%s: \x1b[31mError:\x1b[0m expected option after '-'.", argv[0]);
            return 1;
        }

        char opt = argv[i][1]; // Character after '-'

        if (opt == 'h') {
            printf("Usage: %s [-hov] <filename>\n", argv[0]);
            return 0;
        } else if (opt == 'o') {
            if (i+1 >= argc) printf("%s: \x1b[31mError:\x1b[0m no output file given!\n", argv[0]);
            outfile = argv[++i];
        } else if (opt == 'v') {
            printf("%s: Verbose coming soon!\n", argv[0]);
        }
    }

    // No input given
    if (infile == NULL) {
        printf("%s: \x1b[31mError:\x1b[0m no input file given!\n", argv[0]);
        return 1;
    }

    printf("%s: \x1b[32mDebug:\x1b[0m Will compile '%s' into '%s'\n", argv[0], infile, outfile);
    
    return 0;
}
