CC = clang
LD = clang

CCFLAGS = -std=c11 -O2 -Wall -Wextra -Wpedantic -Iinclude\
		  -Wno-unused-parameter
LDFLAGS = 

SRC_DIR = ./src
BIN_DIR = ./bin

NEON_SRC = $(wildcard src/*.c)
NEON_OBJ = $(NEON_SRC:.c=.o)

NEON = $(BIN_DIR)/neon

all: neon

clean:
	rm -rf $(BIN_DIR)
	rm -f ./**/*.o

%.o: %.c
	$(CC) -o $@ -c $< $(CCFLAGS)

dirs: 
	[[ -d $(BIN_DIR) ]] || mkdir $(BIN_DIR)

neon: dirs $(NEON_OBJ)
	$(LD) -o $(NEON) $(filter %.o, $^) $(LDFLAGS)

