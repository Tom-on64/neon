#include <stdio.h>
#include <stdint.h>
#include "error.h"

void error(char* msg) {
    fprintf(stderr, "\x1b[31;1mError: \x1b[m%s\x1b[m\n", msg);
}

