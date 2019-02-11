

// this function should return a new string with a valid Wikipedia link of the form
// "https://en.wikipedia.org/wiki/Some Name"
function wikiUrl (name) {
  return 'https://en.wikipedia.org/wiki/' + name;
}

// given a name, this function should return, as a string, a valid link to a wiki page
// of the form <a href='link url'>content</a>
// the function `wikiURL` should make it easier to do this.
function wikiLink (name) {
  return '<a href="' + wikiUrl(name) + '">' + name + '</a>';
  // return $()
}

// passed an HTML element object as a parameter, this function should
// set the element's HTML content to a wikiLink whose internal text content is the original
// element's text content. 
function wikifyElementHtml (element) {
  let content =$(element).text(),
      link=wikiLink(content);
  // console.log(link);
  $(element).html(link);
  return $(element).html();
}

// passed a class name or other selector, this function should iterate through all
// the matching elements and wikify their text.  
function wikifyClass (selector) {
  let allElements = $(selector);
  for (e of allElements) {
    wikifyElementHtml (e);
  }
}


function wikifySelector(selector) {
  $(selector).
    map(function () {
      $(this).html(function () {
        return '<a href="https://en.Wikipedia.org/wiki/' + $(this).text() + '">' +
          $(this).text() + '</a>';
      });
    }
    );
        };
  
// wikifyClass('.name');




// DO NOT MODIFY -- FOR AUTOMATED TESTING ONLY
// MODIFYING THIS CODE WILL ALMOST CERTAINLY CAUSE YOUR TESTS TO BREAK
// AND YOUR ASSIGNMENT TO FAIL!
var exports;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  exports = module.exports = {};
}
else {
  exports = window.skeleton = {};
  wikifyClass('.name');

}

let modFuns = [wikiUrl, wikiLink, wikifyElementHtml, wikifyClass];

for (let i in modFuns) {
  exports[modFuns[i].name] = modFuns[i]; // get the name as string first!
}



