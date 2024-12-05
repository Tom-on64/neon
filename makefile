# Tools
CC = clang
LD = clang

# Flags
CFLAGS = -O2 -g -Wall -Wextra -Wpedantic
LDFLAGS =

# Directories
BIN = ./bin
SRC = ./src

# Files etc.
SRCS = $(shell find $(SRC) -name '*.c')
OBJS = $(patsubst $(SRC)/%.c, $(BIN)/%.o, $(SRCS))
NEON = $(BIN)/neon

.PHONY: all clean

all: $(NEON)
$(NEON): $(OBJS)
	$(LD) $(LDFLAGS) -o $@ $(OBJS)

$(BIN)/%.o: $(SRC)/%.c | $(BIN)
	$(CC) $(CFLAGS) -c -o $@ $<

$(BIN):
	mkdir -p $(BIN)

clean:
	rm -rf $(BIN)

