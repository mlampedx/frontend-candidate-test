# Javascript Title Parser

We store our data in a small object with various parts of a search query. Using only this data, the goal is to build
a title good enough to be displayed on the front end. When I have a simple query, like "dress", I would like to
see a title cased version: "Dress".

As the state becomes more complex, we have a few rules to adhere to:
* Stores should come at the end, preceded by an "at"
* Brands should come at the end, preceded by a "by"
* You should be able to combine all three

Open up the `index.html` in a browser and you will see a number of failing tests for each case we are trying to solve.
If you haven't used mocha before, don't worry too much about it, reloading the browser will reload the tests.
The goal is to get every test to pass.

The `title.js` file has a function `parseTitle` which is where all your work will be done. Feel free to add other
functions or anything else you need, but please, no libraries.
