/**
 * parseTitle takes a state object as an argument and returns a properly formatted title
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
    brand ? parseBrandOrStore(brand) : brand,
    store ? parseBrandOrStore(store) : store
  );
}

/**
 * concatTitle takes a parsedQuery, parsedBrand, and parsedStore as arguments and returns a properly formatted title
 * @param {string} parsedQuery - the parsed query string to be concatenated
 * @param {string} parsedBrand - the parsed brand string to be concatenated
 * @param {string} parsedStore - the parsed store string to be concatenated
 * @returns {string} title - the concatenated output string to be displayed on the front end
 */

function concatTitle(parsedQuery, parsedBrand, parsedStore) {
  if (parsedQuery && parsedBrand && parsedStore) {
    return `${deDupeQuery(parsedQuery, parsedBrand, parsedStore)} by ${parsedBrand} at ${parsedStore}`;
  }
  else if (parsedQuery && parsedBrand) {
    return `${deDupeQuery(parsedQuery, parsedBrand)} by ${parsedBrand}`;
  }
  else if (parsedQuery && parsedStore) {
    return `${deDupeQuery(parsedQuery, parsedStore)} at ${parsedStore}`;
  }
  else { return parsedQuery || parsedBrand || parsedStore || ''; }
}

/**
 * parseQuery takes a query as an argument and returns a parsedQuery in title case with spaces between words
 * @param {string} query - the string value stored at the query key of the state object
 * @returns {string} parsedQuery - the parsed query string ready for deduping, if needed, followed by concatenation
 */

function parseQuery(query) {
  return query
    .split('+')
    .map(searchTerm => applyTitleCase(searchTerm))
    .join(' ');
}

/**
 * parseBrandOrStore takes a brand or store as an argument and returns a parsedBrand or a parsedStore in title case with spaces between words
 * @param {string} brandOrStore - the string value stored at the brand or store key of the state object
 * @returns {string} parsedBrand or parsedStore - the parsed brand or store string ready for concatenation
 */

function parseBrandOrStore(brandOrStore) {
  return brandOrStore
    .split('-')
    .map(brandOrStoreTerm => parsePlusOrAmpersand(applyTitleCase(brandOrStoreTerm)))
    .join(' ');
}

/**
 * parsePlusOrAmpersand takes a brand or a store term as an argument and returns a term with capitalized characters following an ampersand or a plus
 * @param {string} brandOrStoreTerm - the string value of a store term containing a plus or ampersand character
 * @returns {string} parsedBrandTerm or parsedStoreTerm - the parsed brand or store term string
 */

function parsePlusOrAmpersand(brandOrStoreTerm) {
  return brandOrStoreTerm
    .split('')
    .map((brandOrStoreChar, i) => {
      return brandOrStoreTerm[i - 1] === '&' || brandOrStoreTerm[i - 1] === '+' ? 
        brandOrStoreChar.toUpperCase() : 
        brandOrStoreChar;
    }) 
    .join('');
}

/**
 * applyTitleCase takes a keyword as an argument and returns a title cased keyword
 * @param {string} keyword - the string that represents an individual word from the value stored at the query, store, or brand key of the state object
 * @returns {string} titleCasedWord - the string properly formatted in title case with the first letter capitalized
 */

function applyTitleCase(keyword) {
  return `${keyword[0].toUpperCase()}${keyword.slice(1)}`;
}

/**
 * deDupeQuery takes a parsedQuery, parsedStr1 (optional), and parsedStr2 (optional) as arguments and returns a deduped query string
 * @param {string} parsedQuery - the parsed query string to be deduped, if required
 * @param {string} parsedStr1 - optional parsedBrand or parsedStore string to be reviewed for dupes
 * @param {string} parsedStr2 - optional parsedBrand or parsedStore string to be reviewed for dupes
 * @returns {string} title - the deduped, concatenated output string to be displayed on the front end
 */

function deDupeQuery(parsedQuery = null, parsedStr1, parsedStr2) {
  return parsedQuery
    .replace(parsedStr1, '')
    .replace(parsedStr2, '')
    .trim()
}
