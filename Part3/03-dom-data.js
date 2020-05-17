

/**
 * this function should return a new string with a valid Wikipedia link of the form
 * "https://en.wikipedia.org/wiki/Some Name"
 * @param {string} name
 * @returns {string} of form https://en.Wikipedia.org/wiki/name
 */
function wikiUrl (name) {
  return '';
}


/**
 * given a name, this function should return, as a string, a valid link to a wiki page
 * of the form <a href="link url">name</a>
 * the function `wikiURL` should make it easier to do this.
 * @param {string} name
 * @returns {} 
 */
function wikiLink (name) {
  return '';
  // return $()
}


/**
 * passed an HTML element object as a parameter, this function should
 * set the element's HTML content to a wikiLink whose internal text content is the original
 * element's text content. 
 * @param {HTMLElement} element
 * @returns {string} modified HTML content
 */
function wikifyElementHtml (element) {
  return '';
}


/**
 * passed a class name or other selector, this function should iterate through all
 * the matching elements and wikify their text.  
 * @param {string} selector
 */
function wikifySelector(selector) {
  // fetch a list of all elements in the page that match 'selector'
  // *and* set a variable equal to that list
  
  
  // loop through that list
  // and inside the loop do
  // call wikifyElementHtml on each element
  
};
  

// DO NOT MODIFY -- FOR AUTOMATED TESTING ONLY
// MODIFYING THIS CODE WILL ALMOST CERTAINLY CAUSE YOUR TESTS TO BREAK
// AND YOUR ASSIGNMENT TO FAIL!
var exports;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  exports = module.exports = {};
}
else {
  exports = window.skeleton = {};
  wikifySelector('.name');

}

let modFuns = [wikiUrl, wikiLink, wikifyElementHtml, wikifySelector];

for (let i in modFuns) {
  exports[modFuns[i].name] = modFuns[i]; // get the name as string first!
}



