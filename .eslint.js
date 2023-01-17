/**
 * The "global" error severity level. The user can specify that they only want to be 
 * warned of linter issues.
 **/
const lintSeverity = process.env.LINT_SEVERITY ?? "error";

module.exports = {
    root: true,
    // React rules used for Gutenberg
    extends: ["eslint:recommended", "plugin:react/recommended"],
    env: {
      node: true,
      es6: true,
      amd: true,
      browser: true,
      jquery: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        globalReturn: true,
        generators: false,
        objectLiteralDuplicateProperties: false,
        experimentalObjectRestSpread: true,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    // React plugin used for Gutenberg
    plugins: ["react", "jsdoc", "prefer-arrow"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? 2 : 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "comma-dangle": [
        lintSeverity,
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "ignore",
        },
      ],
      "no-var": lintSeverity,
      "yoda": lintSeverity,
      "prefer-arrow/prefer-arrow-functions": lintSeverity,
      "jsdoc/require-jsdoc": lintSeverity,
      "jsdoc/require-param": lintSeverity,
      "jsdoc/require-param-description": lintSeverity,
      "jsdoc/require-param-name": lintSeverity,
      "jsdoc/require-param-type": lintSeverity,
      "jsdoc/require-returns": lintSeverity,
    },
  };
  