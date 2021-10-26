# WordPress Webpack configurations.

## Description.
This will be the base wepback configuration for all WordPress plugins and themes

## Installations

In package.json
``` 
"devDependencies": {   
    "@bcgov/webpack-wordpress": "git+https://apps.itsm.gov.bc.ca/bitbucket/scm/wp/bcgov-webpack-wordpress.git#1.2.0"
}
```


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