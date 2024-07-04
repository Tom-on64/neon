export const error = (msg) => {
    console.error(`\x1b[0;31;1mError: \x1b[22m${msg}\x1b[m`);
    process.exit(1);
}

export const warn = (msg) => {
    console.warn(`\x1b[0;33;1mWarning: \x1b[22m${msg}\x1b[m`);
}

