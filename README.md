# An Angular 1.x bookmark manager with Redux
This is a simple bookmark manager built with AngularJS, [ng-redux](https://github.com/wbuchwalter/ng-redux), ES6, Webpack, and Gulp. It illustrates storing state in one place via Redux, and then using controllers to "glue" that state to the views.

## Getting Started
You will need `node` (`brew install node` or https://nodejs.org/en/) and `npm` (which ships with node).

## Installing
```bash
git clone https://github.com/simpulton/eggly-redux.git
cd eggly-redux
npm i
npm run start
```

## Testing
To run the tests, run `npm test` or `karma start`.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.

## Generating Components
There is a convenient Gulp task called `component` to generate components. To do so, simply run `gulp component --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `client/app/components`. To change this, apply the `--parent` flag, followed by a path relative to `client/app/components/`.

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names.
