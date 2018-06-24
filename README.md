**Note:** Node v6+ is required for this project.

We recommend using [yarn](https://code.facebook.com/posts/1840075619545360) to manage dependencies. To begin using yarn, install globally with `npm install -g yarn`.

Then simply clone the repository and install using the `yarn` command.

```
git clone <repo.git>
cd <one level in>
yarn
```

To build the dev environment with hot reloading of JS and CSS, type:

`npm run browser`

To build for production w/ server rendering, type:

`npm run server`

By default, the site is available at http://localhost:3000

The intention is to provide a basic, but comprehensive, skeleton for React projects. The tools included are:

- React (of course)
- Redux (state management)
- React Router (routing)
- webpack (bundling assets)
- Stylelint and eslint (modified AirBnB)
- Babel (latest JS)

#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in `package.json`. If you need to add some task to these scripts, look for documentation on either the CLI or Node API for the tool you are considering.
