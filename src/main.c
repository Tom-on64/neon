#include <stdio.h>
#include "error.h"

int main(int argc, char** argv) {
    char* infile = NULL;
    char* outfile = "out.s";

    // Set executable name for error printing
    err_exename = argv[0];

    // Loop through arguments
    for (int i = 1; i < argc; i++) {
        // Input file
        if (argv[i][0] != '-') {
            if (infile == NULL) infile = argv[i];
            else error(E_WRN, "ignoring file %s.\n", argv[i]);
            continue;
        }

        // Check if we don't have just a '-'
        if (argv[i][1] == '\0') error(E_ERR, "expected option after '-'.");
        
        // Character after '-'
        char opt = argv[i][1]; 

        // Check options
        if (opt == 'h') { // '-h' Help
            printf( "Usage: %s [-hov] <filename>\n"
                    "\x1b[1mOptions:\x1b[0m\n"
                    "  -h           Displays this help message\n"
                    "  -o <file>    Sets the output file\n"
                    "  -v           Verbose output\n",
                    argv[0]
                    );
            return 0;
        } else if (opt == 'o') { // '-o <filename>' Output file
            if ((i + 1) >= argc) error(E_ERR, "no output file given!\n");
            outfile = argv[++i];
        } else if (opt == 'v') { // '-v' Verbose
            error(E_DBG, "verbose coming soon.\n");
        }
    }

    // No input given
    if (infile == NULL) error(E_ERR, "no input file given!\n");

    // TODO: Actual compilation
    error(E_DBG, "will compile '%s' into '%s'\n", infile, outfile);
    
    return 0;
}
