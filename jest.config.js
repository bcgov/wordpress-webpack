module.exports = {
  roots: ["<rootDir>/src"],
  transform: {'^.+\\.[jt]sx?$': require.resolve( 'babel-jest' )},
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [ "js", "jsx", "json", "node"]
};
