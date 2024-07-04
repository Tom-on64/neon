export const ntype = {
    VAR: "var",
    BINOP: "binop",
    EXIT: "exit",
    L_INT: "lit:int",
    L_FLOAT: "lit:float",
    L_CHAR: "lit:char",
    L_BOOL: "lit:bool",
    L_STRING: "lit:string",
};

export const Var = (ident, value = null, type = null) => ({ type: ntype.VAR, ident, value, varType: type });
export const Binary = (left, op, right) => ({ type: ntype.BINOP, left, op, right });

export const Exit = (exitCode) => ({ type: ntype.EXIT, exitCode });

export const L_Int = (int) => ({ type: ntype.L_INT, value: int });
export const L_Float = (float) => ({ type: ntype.L_FLOAT, value: float });
export const L_Char = (char) => ({ type: ntype.L_CHAR, value: char });
export const L_Bool = (boolean) => ({ type: ntype.L_BOOL, value: boolean });
export const L_String = (string) => ({ type: ntype.L_STRING, value: string });

export default {
    Var, Binary,
    Exit,
    L_Int, L_Float, L_Char, L_Bool, L_String,
}

