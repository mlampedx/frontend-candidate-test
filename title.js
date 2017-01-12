/**
 * This is where you will build your solution. This function is called in the test file and the `state`
 * object will be passed through there. If you want to see exactly what is passed in each case, take
 * a look in `title-test.js`
 * @param {object} state - the query object representing a search
 * @returns {string} title - the output string to be displayed on the front end
 */

function parseTitle (state) {
  if (!state || state.constructor !== Object) { 
    throw new Error('parseTitle must be invoked with an object-typed argument.');
  }
  const { query, brand, store, category } = state;
  return concatTitle(
           query ? parseQuery(query) : query,
           brand ? parseBrand(brand) : brand,
           store ? parseStore(store) : store
         );
}

/**
 * @param {string} query - the string value of the query property of the state object
 * @returns {string} parsedQuery - the parsed query string ready for concatenation
 */

function parseQuery(query) {
  return query.split('+')
              .map(searchTerm => `${searchTerm[0].toUpperCase()}${searchTerm.slice(1)}`)
              .join(' ');
}

/**
 * @param {string} brand - the string value of the brand property of the state object
 * @returns {string} parsedBrand - the parsed brand string ready for concatenation
 */

function parseBrand(brand) {
  return brand.split('-')
              .map(brandTerm => `${brandTerm[0].toUpperCase()}${brandTerm.slice(1)}`)
              .join(' ');
}

/**
 * @param {string} store - the string value of the store property of the state object
 * @returns {string} parsedStore - the parsed store string ready for concatenation
 */

function parseStore(store) {
  return store.split('-')
              .map(storeTerm => `${storeTerm[0].toUpperCase()}${storeTerm.slice(1)}`)
              .join(' ');
}

/**
 * @param {string} parsedQuery - the parsed query string to be concatenated
 * @param {string} parsedBrand - the parsed brand string to be concatenated
 * @param {string} parsedStore - the parsed store string to be concatenated
 * @returns {string} title - the concatenated output string to be displayed on the front end
 */

function concatTitle(parsedQuery, parsedBrand, parsedStore) {
  if (parsedQuery && parsedBrand && parsedStore) {
    return deDupeTitle(`${parsedQuery} by ${parsedBrand} at ${parsedStore}`);
  }
  else if (parsedQuery && parsedBrand) {
    return deDupeTitle(`${parsedQuery} by ${parsedBrand}`);
  }
  else if (parsedQuery && parsedStore) {
   return deDupeTitle(`${parsedQuery} at ${parsedStore}`);
  }
  else if (parsedQuery) {
    return parsedQuery;
  }
  else if (parsedBrand) {
    return parsedBrand;
  }
  else if (parsedStore) {
    return parsedStore;
  }
  else { return ''; }
}

/**
 * @param {string} title - the concatenated output string with potential dupes to be deduped
 * @returns {string} title - the concatenated output string to be displayed on the front end
 */

function deDupeTitle(title) {
  return title.split(' ')
              .filter((titleWord, i, titleArr) => { return i === titleArr.lastIndexOf(titleWord); })
              .join(' ');
}
