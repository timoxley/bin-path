# bin-path

[![Build Status](https://travis-ci.org/timoxley/bin-path.png?branch=master)](https://travis-ci.org/timoxley/bin-path)

`bin-path` gives you absolute paths to dependee modules' executable scripts

## Usage

```js
// pass in require so we can resolve relative to the calling module.
var binPath = require('bin-path')(require)

binPath('tape', function(err, bin) {
  if (err) return console.error(err)
  console.log(bin)
  // => {"tape":"/Users/timoxley/Projects/find-bin/node_modules/tape/bin/tape"}

  // bin-path can also be executed syncronously:
  var rimRafBin = binPath('rimraf')
  console.log(rimRafBin)
  // => { rimraf: '/Users/timoxley/Projects/find-bin/node_modules/rimraf/bin.js' })
})

```

## Why

1. `npm bin` will return the location of the `node_modules/.bin` directory, but it does not take
into account being called within the context of another module, this is
a problem because:
2. You can't rely on `__dirname + '/node_modules/'` actually containing your
module, the module may exist higher in the hierarchy due to deduping.
If the module does exist higher, then `node_modules/.bin` will also be
missing for your module.
3. Shelling out to `npm bin` is slow anyway; it has to wait for all of
  npm to boot up, and npm is a heavy dependency to include if all you
want is to get a bin path.
4. Relying on hard paths to executables is brittle e.g. linking directly to a module's `bin/executable`. Using the
the `bin` field in `package.json` allows module authors to change the path ofthe actual executable
without breaking dependee modules. Finding the actual path to the executable is also a problem because of
point 2 above.

## How
`bin-path` resolves module location, and loads `bin` 
from `package.json` directly, resolving to normalized, absolute paths.

## Alternative Solution

Invoke your modules via npm scripts (e.g. npm start), this will set up the `$PATH` to find 
executables correctly. This still incurs the startup time of npm though, and isn't always
practical, for example, npm scripts cannot accept commandline parameters (though you can use
environment variables largely for the same purpose).

## Licence

MIT
