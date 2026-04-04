@ECHO OFF

IF EXIST node_modules (
    code .
) ELSE (
    pnpm i
    code .
)
