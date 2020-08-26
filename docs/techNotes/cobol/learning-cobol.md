# Learning Cobol

Am I mad? :D Just curious.

---

 - [ ] Starter project, cobol program to read json and convert it into cobol? har har har
 - [ ] Document the fundamentals / map between cobol to JS
 - [ ] Find an existing codebase to look through

Install cobol `brew install gnu-cobol`
Check it worked `cobc -v`

In VS Code I went for the `Z Open Editor` for syntax highlighting (and more by the looks of it!)

Compile the program: `cobc -x helloworld.cob`
Run the program `./helloworld`

---

## The layout of a cobol copybook:

1. `IDENTIFICATION DIVISION` - metadata
2. `ENVIRONMENT DIVISION` - system requirements / expectations
3. `DATA DIVISION`
    1. `FILE SECTION` - input/output
    2. `LINKAGE SECTION` - data from other programs?
    3. `WORKING-STORAGE SECTION` - global variables
    4. `LOCAL-STORAGE SECTION` - scoped variables
4. `PROCEDURE DIVISION` - the code!

## Variables, PIC / PICTURE

key can be no longer than 30 chars, cannot start or end with -, cannot start with _.

 - Numeric
    - `PIC 9` - single digit number 
    - `PIC 9(4)` - 4 digit number
    - `PIC 99V99` || `PIC 9(2)V9(2)` || `PIC 9(2)V99` || `PIC 99V9(2)` 25.31 (I think)
 - Alphabetic
 - Alphanumeric
    - `PIC X` - single character alphanumeric
    - `PIC X(4)` - 4 char alphanumeric
 - Currency symbol `cs`

Levels of data - like files and folders but for data

```
01  TOP-LEVEL
    02  MID-LEVEL-DATA       PIC X(4)
    02  MID-LEVEL
        03  LOWER-LEVEL-DATA PIC 9(4)
```
Could also be written as
```
01  TOP-LEVEL
    40  MID-LEVEL-DATA       PIC X(4)
    40  MID-LEVEL
        80  LOWER-LEVEL-DATA PIC 9(4)
```

Special level number meanings:

 - 66
 - 77
 - 88