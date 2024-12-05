#include <stdio.h>
#include <stdarg.h>
#include <stdlib.h>
#include "error.h"

char* err_exename = NULL;

int error(int errtype, char* fmt, ...) {
    va_list va;
    va_start(va, fmt);
    int ret = verror(errtype, fmt, va);
    va_end(va);
    return ret;
}

int verror(int errtype, char* fmt, va_list va) {
    int ret = 0;
    ret += printf("%s: ", err_exename);
    
    switch (errtype) {
        case E_ERR: ret += printf("\x1b[31;1mError: \x1b[0m"); break;
        case E_WRN: ret += printf("\x1b[33;1mWarning: \x1b[0m"); break;
        case E_DBG: ret += printf("\x1b[32;1mDebug: \x1b[0m"); break;
    }

    ret += vprintf(fmt, va);
    if (errtype == E_ERR) exit(1);

    return ret;
}

