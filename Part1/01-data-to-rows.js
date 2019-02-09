
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Part 1: here we use the same skills you developed in assignment 2.                              //
//  However, instead of writing functions to return sentences, you will write                      //
// functions that return valid HTML.  Work your way slowly through the problems.                   //
// They are not conceptually difficult, but may require some tinkering to get right.               //
// Comments are inline.                                                                            //
//                                                                                                 //
// Your code will then be used by another script in "ïndex.html" to generate a set of table rows.  //
/////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
// Data Source: Please do not edit these variables. They will be used later on to generate HTML.  //
////////////////////////////////////////////////////////////////////////////////////////////////////

let biko = {
  name: 'Steve Biko',
  born: 1946,
  died: 1977,
  affiliations: ['SASO', 'Black Consciousness'],
  quote: `The most potent weapon in the hands of the oppressor is the mind of the oppressed.`,
  description: `Influenced by Frantz Fanon and the African-American Black Power movement, Biko and his compatriots developed Black Consciousness as SASO's official ideology. The movement campaigned for an end to apartheid and the transition of South Africa toward universal suffrage and a socialist economy. It organised Black Community Programmes (BCPs) and focused on the psychological empowerment of black people. Biko believed that black people needed to rid themselves of any sense of racial inferiority, an idea he expressed by popularizing the slogan "black is beautiful". In 1972, he was involved in founding the Black People's Convention (BPC) to promote Black Consciousness ideas among the wider population. The government came to see Biko as a subversive threat and placed him under a banning order in 1973, severely restricting his activities. He remained politically active, helping organise BCPs such as a healthcare centre and a crèche in the Ginsberg area. During his ban he received repeated anonymous threats, and was detained by state security services on several occasions. Following his arrest in August 1977, Biko was severely beaten by state security officers, resulting in his death. Over 20,000 people attended his funeral. ` 
},
    tambo = {
      name: 'Oliver Tambo',
      born: 1917,
      died: 1993,
      affiliations: ['ANC'],
      quote: `The fight for freedom must go on until it is won; until our country is free and happy and peaceful as part of the community of man, we cannot rest.`,
      image: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Oliver_Tambo_%281981%29.jpg/800px-Oliver_Tambo_%281981%29.jpg`,
      description: `Tambo, Mandela and Walter Sisulu were the founding members of the ANC Youth League in 1943, with Tambo becoming its first National Secretary and a member of the National Executive in 1948. The Youth League proposed a change in the tactics of the anti-apartheid movement. Previously, the ANC had sought to further its cause by actions such as petitions and demonstrations; the Youth League felt these actions were insufficient to achieve the group's goals and proposed their own 'Programme of Action'. This programme advocated tactics such as boycotts, civil disobedience, strikes, and non-collaboration.
Tambo being greeted on arrival in East Germany (1978). In 1955, Tambo became Secretary General of the ANC after Sisulu was banned by the South African government under the Suppression of Communism Act. In 1958, he became Deputy President of the ANC and in 1959 was served with a five-year banning order by the government. In response, Tambo was sent abroad by the ANC to mobilize opposition to apartheid. He settled with his family in Muswell Hill, north London, where he lived until 1990.[2] He was involved in the formation of the South African Democratic Front. In 1967, Tambo became Acting President of the ANC, following the death of Chief Albert Lutuli. `
    },
    leaders = [biko, tambo];




//////////////////////////////////////////////////////////////////////////
// Problem 1a: Write a simple function that generates an HTML tag when  //
// passed two variables: tag CONTENT and and tag NAME. So for instance, //
// `tagIt ("look at me!", "div")` should return the value "<div>look at //
// me</div>".                                                           //
//////////////////////////////////////////////////////////////////////////



function tagIt(content, tagName) {
  return '';
}



/////////////////////////////////////////////////////////////////////////
// Problem 1b: use `tagIt()` to generate an HTML table row from one of //
// the person objects above, using the "name", "born", "died",         //
// "affiliations", and "quote" properties. So, for instance,           //
// personRow(biko) should return:                                      //
//                                                                     //
// "<tr><td>Steve Biko</td><td>1946</td><td>1977</td><td>SASO,Black    //
// Consciousness</td><td>The most potent weapon in the hands of the    //
// oppressor is the mind of the oppressed.</td></tr>"                  //
/////////////////////////////////////////////////////////////////////////


function personRow (person) {
  return '';
}


//////////////////////////////////////////////////////////////////////////
// Problem 1c: One last function in this part! This one should take as  //
// its parameter an array of "person objects" and create a set of table //
// rows. So, for instance, `peopleRows([biko, tambo])` should return:   //
//                                                                      //
// "<table><tr><td>Steve                                                //
// Biko</td><td>1946</td><td>1977</td><td>SASO,Black                    //
// Consciousness</td><td>The most potent weapon in the hands of the     //
// oppressor is the mind of the oppressed.</td></tr> <tr><td>Oliver     //
// Tambo</td><td>1917</td><td>1993</td><td>ANC</td><td>The fight for    //
// freedom must go on until it is won; until our country is free and    //
// happy and peaceful as part of the community of man, we cannot        //
// rest.</td></tr></table>"                                            //
//////////////////////////////////////////////////////////////////////////


function peopleRows (people) {
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

let functions = [personRow, peopleRows, tagIt ,  biko, leaders];

for (let i in functions) {
  exports[functions[i].name] = functions[i]; // get the name as string first!
}

exports.leaders = leaders;
exports.biko = biko;
exports.tambo = tambo;
