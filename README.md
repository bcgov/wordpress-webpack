# WordPress Webpack configurations.

## Description.
This will be the base wepback configuration for all WordPress plugins and themes

## Installations

In package.json
``` 
"dependencies": {   
    "@bcgov/webpack-wordpress": "git+https://apps.itsm.gov.bc.ca/bitbucket/scm/wp/bcgov-webpack-wordpress.gitt#development"
}
```

## Commands
* ``` npm run start ```
* ``` npm run build ```
* ``` npm run build:production ```
* ``` npm run test ```

## Resources 
* Have access to mixens.
* Have access to some assets

## Todo
* Incorporate this into all plugins that use webpack.
* Incorporate this into all child themes.
* Incorporate this into main theme ???
* Incorporate use for blocks code?? combine npm run start:wp and npm run start as one.
* Add resources like bcgov log, and maybe other resources...
* Add standalone test for this repo, for ease of development and testing.