Multigraph
==========

For more information about using Multigraph, see http://www.multigraph.org.

Development
===========

To work on the _nodify_ branch of Multigraph, prepare your computer by
installing the required dev tools.  These tools are not needed for simply
viewing Multigraph graphs, but they are needed for working on the Multigraph
code. (The only thing needed for viewing a graph is a browser).

* npm
* nodejs
* sudo npm install -g browserify
* sudo npm install -g uglify-js

Then, to obtain and work with the code, do the following:

```bash
# 1. Clone the repo:
git clone git@github.com:embeepea/js-multigraph

# 2. Cd into it:
cd js-multigraph

# 3. Check out the 'nodify' branch:
git checkout nodify

# 4. Initialize git submodules:
git submodule update --init --recursive

# 5. Install npm modules:
npm install

# 6. Run the unit tests (note that you might have to
#       sudo npm install -g jasmine-node
#    on your computer, if you don't already have _jasmine-node_ installed):
npm test

# 7. Build the browser-runnable JS files (multigraph.js, and multigraph-standalone.js):
make

# 8. Add a new MUGL file for testing:
#    create a new *.xml file in spec/mugl, optionally edit spec/mugl/tests.js
npm run update-graphics-tests

# 9. View the graph test suite:
#       load the file spec/graphics/index.html in a browser
```
