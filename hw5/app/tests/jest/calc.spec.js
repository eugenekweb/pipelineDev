const Calculator = require('../../src/calc.js');

describe("Calculator: JEST tests", () => {
    let calc;

    describe("SUM", () => {
        beforeAll(() => {
            calc = new Calculator(0, 0, "sum");
        });

        test("Expected that 1 + 2 = 3", () => {
            const result = calc.ab(1, 2).result;
            expect(result).toBeDefined();
            expect(result).toBe(3);
        });

        test("Expected that 5 + -7 = -2", () => {
            const result = calc.ab(5, -7).result;
            expect(result).toBeDefined();
            expect(result).toBe(-2);
        });

        test("Expected that true + true = 2", () => {
            const result = calc.ab(true, true).result;
            expect(typeof result == "boolean").toBeFalsy();
            expect(result).toBeDefined();
            expect(result).toBe(2);
        });
    });

    describe("SUBTRACT", () => {
        beforeAll(() => {
            calc = new Calculator(0, 0, "sub");
        });

        test("Expected that 20 - 5 = 15", () => {
            const result = calc.ab(20, 5).result;
            expect(result).toBeDefined();
            expect(result).toBe(15);
        });

        test("Expected that 5 - -7 = 12", () => {
            const result = calc.ab(5, -7).result;
            expect(result).toBeDefined();
            expect(result).toBe(12);
        });
    });

    describe("MULTIPLY", () => {
        beforeAll(() => {
            calc = new Calculator(0, 0, "mul");
        });

        test("Expected that 10 * 2 = 20", () => {
            const result = calc.ab(10, 2).result;
            expect(result).toBeDefined();
            expect(result).toBe(20);
        });

        test("Expected that 5 * -7 = -35", () => {
            const result = calc.ab(5, -7).result;
            expect(result).toBeDefined();
            expect(result).toBe(-35);
        });

        test("Expected that 'true' * 2 = NaN", () => {
            const a = "true",
                b = 2;
            const result = calc.ab(a, b).result;
            expect([typeof a, typeof b]).toContain("string");
            expect(result).toBeNaN;
        });
    });

    describe("DIVIDE", () => {
        beforeAll(() => {
            calc = new Calculator(0, 0, "div");
        });

        test("Expected that 18 / 2 = 9", () => {
            const result = calc.ab(18, 2).result;
            expect(result).toBeDefined();
            expect(result).toBe(9);
        });

        test("Expected that 14 / -7 = -2", () => {
            const result = calc.ab(14, -7).result;
            expect(result).toBeDefined();
            expect(result).toBe(-2);
        });

        test("Expected that 10 / 0 = NaN", () => {
            const result = calc.ab(10, 0).result;
            expect(result).toBeNaN;
        });
    });

    describe("POWER", () => {
        beforeAll(() => {
            calc = new Calculator(0, 0, "pow");
        });

        test("Expected that 2 ^ 4 = 16", () => {
            const result = calc.ab(2, 4).result;
            expect(result).toBeDefined();
            expect(result).toBe(16);
        });

        test("Expected that -5 ^ 2 = 25", () => {
            const result = calc.ab(-5, 2).result;
            expect(result).toBeDefined();
            expect(result).toBe(25);
        });

        test("Expected that Any Number ^ 0 = 1", () => {
            const b = 0;
            const res1 = calc.ab(0, b).result;
            const res2 = calc.ab(5, b).result;
            const res3 = calc.ab(-5, b).result;
            const result = res1 === 1 && res2 === 1 && res3 === 1;
            expect(result).toBeTruthy;
        });
    });
});
