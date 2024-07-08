export const ntype = {
    VAR: "var",
    UNOP: "unop",
    BINOP: "binop",
    EXIT: "exit",
    LITERAL: "literal",
    L_INT: "lit:int",
    L_FLOAT: "lit:float",
    L_CHAR: "lit:char",
    L_BOOL: "lit:bool",
    L_STRING: "lit:string",
    L_ARRAY: "lit:array",
};

export const Var = (ident, value = null, type = null) => ({ type: ntype.VAR, ident, value, varType: type });
export const Unary = (op, expr) => ({ type: ntype.UNOP, expr });
export const Binary = (left, op, right) => ({ type: ntype.BINOP, left, op, right });
// TODO: Ternary
export const Exit = (exitCode) => ({ type: ntype.EXIT, exitCode });

export const L_Int = (int) => ({ type: ntype.LITERAL, ltype: ntype.L_INT, value: int });
export const L_Float = (float) => ({ type: ntype.LITERAL, ltype: ntype.L_FLOAT, value: float });
export const L_Char = (char) => ({ type: ntype.LITERAL, ltype: ntype.L_CHAR, value: char });
export const L_Bool = (boolean) => ({ type: ntype.LITERAL, ltype: ntype.L_BOOL, value: boolean });
export const L_String = (string) => ({ type: ntype.LITERAL, ltype: ntype.L_STRING, value: string });
export const L_Array = (array) => ({ type: ntype.LITERAL, ltype: ntype.L_ARRAY, value: array });

export default {
    Var, Unary, Binary, Exit,
    L_Int, L_Float, L_Char, L_Bool, L_String, L_Array,
}

