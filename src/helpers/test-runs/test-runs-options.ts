export const testIf = (condition: boolean): jest.It => condition ? test : test.skip
