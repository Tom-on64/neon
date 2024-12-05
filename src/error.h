#ifndef ERROR_H
#define ERROR_H

#include <stdarg.h>

#define E_ERR   0
#define E_WRN   1
#define E_DBG   2

extern char* err_exename;

int error(int errtype, char* fmt, ...);
int verror(int errtype, char* fmt, va_list va);

#endif
