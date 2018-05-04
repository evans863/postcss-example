# Instructions

Run `yarn` then `yarn run build:dev` or `yarn run build:prod`. Then open `dist/index.html`.

## About the issue

It appears that the variables, or `:root` itself are never defined after mini-css-extract-plugin runs. If you comment out the `postcss-loader` in `webpack.config.babel.js` then the `:root` shows up in the bundle and everything appears to be ok.

I've also noticed that you don't need the `optimization.splitChunks.cacheGroups` config settings to bundle into single file (at least for this webpack configuration I've created). However I'm unsure of a reason why yet.
