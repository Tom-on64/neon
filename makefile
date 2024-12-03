# Tools
CC = clang
LD = clang

# Flags
CFLAGS = -O2 -g
LDFLAGS =

# Directories
BIN = ./bin
SRC = ./src

# Files etc.
SRCS = $(SRC)/main.c
OBJS = $(BIN)/main.o
NEON = $(BIN)/neon

.PHONY: all clean

all: $(NEON)
$(NEON): $(OBJS)
	$(LD) $(LDFLAGS) -o $@ $<

$(OBJS): $(SRCS)
	$(CC) $(CFLAGS) -c -o $@ $<

