
////////////////////////////////////////////////////////////////////////
  // In this section of the assignment, we use the jQuery "$" functions //
  // to maniulate the DOM. We are really just practicing here, getting  //
  // used to the ufnctions we will need to use in part 3.               //
  ////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////
  // Remember that the $ function takes a CSS-style selector as an        //
  // argument, and then returns an object that has many, many methods to  //
  // choose from. Among other things, the ".text()" method gets or sets   //
  // the text content of an element (or group of elements); the ".html()" //
  // method gets or sets the full html content of an element (or group of //
  // elements); and the .css method takes a property name as the first    //
  // value, and either gets or sets the vlaue of that property.           //
  //////////////////////////////////////////////////////////////////////////




// Problem 2a: Turn the second box blue

/**
 * set property `background-color` of DOM node with id `#box2` to `blue`
 * no need for any particular return value
 * @returns {null} 
 */
function secondBoxBlue () {
  // set the background-color property of box #box2 to "blue"
  return '';

}

// Problem 2b: give the nav bar a bottom border

/**
 * set css property `border-bottom` of DOM `nav` elements to `10px solid rgb(180,40,40)`
 * no need for any particular return value
 * @returns {} 
 */
function navBorderBottom () {
  // give the nav bar a border-bottom property of "10px solid rgb(180,40,40)"
  return '';
  // return $()
}

// Problem 2c: Set the Text content of even-numbered boxes.
/**
 * add the text content "I am a box" to all the even-numbered boxes in <article>
 * no need for any particular return value
 * @returns {} 
 */
function evenBoxesText () {
  // add the text content "I am a box" to all the even-numbered boxes in <article>
  // hint: use the ":nth-child()" pseudo-selector.
  return '';
}


// Problem 2d: set the HTML content of odd-numbered boxes.
/**
 * set the HTML content of the odd boxes to "<div> I am an inner box</div>"
 * no need for any particular return value
 * @returns {} 
 */
function oddBoxesHtml () {
  // set the HTML content of the odd boxes to "<div> I am an inner box</div>"
  return '';
}


// Problem 2e: the built-in String method "replace" can replace part of a string
// with some other string.
//
// so for instance,:
// let s = "My Name";
// s = s.replace("My", "Your");
// s // "Your Name:"
// use this trick to replace the phrase "Your Name" in the header with your actual name. 


/**
 * replace text `Your Name` in the nav element with your actual name
 * no need for any particular return value
 * @returns {} 
 */
function modifyNav ()  {
  return '';
}



// DO NOT MODIFY -- FOR AUTOMATED TESTING ONLY
// MODIFYING THIS CODE WILL ALMOST CERTAINLY CAUSE YOUR TESTS TO BREAK
// AND YOUR ASSIGNMENT TO FAIL!
var exports;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  exports = module.exports = {};
}
else {
  exports = window.skeleton = {};
}

let modFuns = [secondBoxBlue, navBorderBottom, evenBoxesText ,  oddBoxesHtml];

for (let i in modFuns) {
  exports[modFuns[i].name] = modFuns[i]; // get the name as string first!
}

