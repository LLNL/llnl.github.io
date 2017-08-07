# d3.tip: Tooltips for d3.js Version 4, without ES6

![Screenshot](https://gist.githubusercontent.com/davegotz/bd54b56723c154d25eedde6504d30ad7/raw/edc4930517ca462886debd1bf0a90eabe0dbb393/thumbnail.png)

See a [live example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7).

## Origins

While it hasn't been updated since 2015, the popular d3-tip code from Justin Palmer (Caged on github; http://github.com/Caged/d3-tip) has been widely used with d3js version 3.  I was one of those users.

With the release of d3js version 4, the old d3-tip code no longer worked.  Thanks to a fork from Constantin Gavrilete (cgav on github; https://github.com/cgav), the code was updated to work with d3js version 4. However, this new version from cgav used the JavaScript ES6 import statement, which is not widely supported in today's browsers.

I needed a version that was both D3js v4 and standard-browser compatible.

## Using d3-tip with D3js v4, without ES6

The version of d3-tip in this repository is D3js v4 compatible.  At the same time, it does not require ES6 support from your browser.  This is accomplished with two basic changes.

1. **d3.functor** is defined.  This was defined in version 3 of D3, but disappeared in version 4.  It gets redefined in this version of d3-tip.

2. **d3.tip** is defined.  This mimics the prior behavior of d3-tip, allowing you to use tooltips as documented in the original repository (https://github.com/Caged/d3-tip).


