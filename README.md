# WordPress Webpack configurations.

## Description.
This will be the base wepback configuration for all WordPress plugins and themes

## Installation

### Basic

In package.json, add BC Gov Webpack Wordpress as a dev dependency:
``` 
"devDependencies": {   
    "@bcgov/webpack-wordpress": "git+https://apps.itsm.gov.bc.ca/bitbucket/scm/wp/bcgov-webpack-wordpress.git#1.2.0"
}
```

### JS Linting

To add the JS linter rules, create an `.eslint.js` file in your repository(if none present),
and add the rules under the "extends" key:

```
extends: [
    "./node_modules/@bcgov/webpack-wordpress/.eslint.js",
]
```

You have the option to reduce the error severity to warnings if your project requires it. Declare a `LINT_SEVERITY` environment variable in the relevant npm script and set it to `warn`. If no such environment variable is set, the default severity level will be `error`.

```
"scripts": {
    ...
    "lint:js" : "LINT_SEVERITY=warn wp-scripts lint-js ./src/scripts"
}
```

In this rule set, `console.log()` calls  are not permitted in production builds. To enable this,
declare a `NODE_ENV` environment variable in the relevant npm script. Set its value to `production` to ensure `console` calls are flagged.

## Resources 

### Include Mixins
```sass @import "~@bcgov/webpack-wordpress/src/styles/mixins";```

### Include WordPress common styles.

#### General block styles.
```@import "~@bcgov/webpack-wordpress/src/styles/components/blocks";```

#### General Gravity form styles.
```@import "~@bcgov/webpack-wordpress/src/styles/components/gform";```

#### General WordPress article/post styles.
```@import "~@bcgov/webpack-wordpress/src/styles/components/posts";```

#### General print css styles.
```@import "~@bcgov/webpack-wordpress/src/styles/components/print";```

#### General WordPress classes for alignment styles.
```@import "~@bcgov/webpack-wordpress/src/styles/components/wp-classes";```


## Todo
* upgrade @wordpress/scripts to the latest to include webpack major versoin 5
* Add standalone test for this repo, for ease of development and testing.