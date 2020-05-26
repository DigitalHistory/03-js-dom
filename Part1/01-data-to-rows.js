
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
    sisulu = {
      name: 'Walter Sisulu',
      born: 1912,
      died: 2003,
      affiliations: ['ANC'],
      quote: ``,
      description: ` Sisulu was a South African anti-apartheid activist and member of the African National Congress (ANC), serving at times as Secretary-General and Deputy President of the organization. He was jailed at Robben Island, where he served more than 25 years' imprisonment.`
    },
    sobukwe = {
      name: 'Robert Sobukwe',
      born: 1924,
      died: 1978,
      affiliations: ['ANC', 'PAC'],
      description: `Founder of the Pan Africanist Congress, which split from the ANC over a set of ideological issues including the question of alliance between Africans and other racial groups. During his lifetime, Sobukwe was considered to be so dangerous by the National Party government that its parliament enacted the "Sobukwe clause", a statute which on its face seemed to grant broadly applicable powers, but was specifically intended to authorise the arbitrary extension of Sobukwe's imprisonment. `
    },
    goldberg = {
      name: 'Denis Goldberg',
      born: 1933,
      died: 2020,
      affiliations: ['SACOD', 'ANC', 'SACP'],
      description: `When the underground armed wing of the ANC, Umkhonto we Sizwe was founded in 1961, Goldberg became a technical officer. In 1963 he was arrested at the Rivonia headquarters of their army. He was sentenced in 1964 at the end of the famous Rivonia Trial to four terms of life imprisonment. He was the only white member of Umkhonto we Sizwe to be arrested and sentenced in the Rivonia Trial to life imprisonment.`
    },
    first = {
      name: 'Ruth First',
      born: 1925,
      died: 1982,
      affiliations: ['SACP', 'ANC'],
      description: `Ruth First was one of the defendants in the Treason Trial of 1956-1961, alongside 156 other leading anti-apartheid activists who were key figures in the Congress Alliance. After the state of emergency that followed the Sharpeville massacre in 1960 she was listed and banned. She could not attend meetings or publish, and she could not be quoted. In 1963, during another government crackdown, she was imprisoned and held in isolation without charge for 117 days under the Ninety-Day Detention Law. She was the first white woman to be detained under this law. She was killed by a parcel bomb addressed specifically to her in Mozambique, where she worked in exile from South Africa.`
    },
    ngoyi = {
      name: 'Lillian Ngoyi',
      born: 1911,
      died: 1980,
      affiliations: ['ANC', 'FEDSAW'],
      description: `Ngoyi was the first woman elected to the executive committee of the African National Congress, and helped launch the Federation of South African Women.`
    },
    tutu = {
      name: 'Desmond Tutu',
      born: 1931,
      died: null,
      affiliations: ['SACC'],
      description: `South African Anglican cleric and theologian known for his work as an anti-apartheid and human rights activist. He was the Bishop of Johannesburg from 1985 to 1986 and then the Archbishop of Cape Town from 1986 to 1996, in both cases being the first black African to hold the position. Theologically, he sought to fuse ideas from black theology with African theology`
    },
    mandela = {
      name: 'Nelson Mandela',
      born: 1918,
      died: 2013,
      affiliations: ['ANC', 'SACP'],
      quote: `For to be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.`,
      description: `The first black South African head of state and the first elected in a fully representative democratic election. His government focused on dismantling the legacy of apartheid by tackling institutionalised racism and fostering racial reconciliation. Ideologically an African nationalist and socialist. Mandela studied law before working as a lawyer in Johannesburg. There he became involved in anti-colonial and African nationalist politics, joining the ANC in 1943 and co-founding its Youth League in 1944.  Mandela was appointed President of the ANC's Transvaal branch, rising to prominence for his involvement in the 1952 Defiance Campaign and the 1955 Congress of the People. He was repeatedly arrested for seditious activities and was unsuccessfully prosecuted in the 1956 Treason Trial. Although initially committed to non-violent protest, in association with the SACP he co-founded the militant Umkhonto we Sizwe in 1961 and led a sabotage campaign against the government. He was arrested and imprisoned in 1962, and subsequently sentenced to life imprisonment for conspiring to overthrow the state following the Rivonia Trial.`
    };

leaders = [biko, tambo, mandela, tutu, ngoyi, sobukwe, goldberg, first];




//////////////////////////////////////////////////////////////////////////
// Problem 1a: Write a simple function that generates an HTML tag when  //
// passed two variables: tag CONTENT and and tag NAME. So for instance, //
// `tagIt ("look at me!", "div")` should return the value "<div>look at //
// me</div>".                                                           //
//////////////////////////////////////////////////////////////////////////



/**
 * return a string of the form <tagName>content</tagName>, where `content`
 * and `tagName` are string parameters passed to the function.
 * @param {string} content
 * @param {string} tagName
 * @returns {string} 
 */
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


/**
 * Builds a valid HTML table row (as a string) from the attributes of
 * `person`, which should at minimum have these attributes (see sample data above):
 * name, born, died, affiliations, quote.
 * `affiliations` can be either a string or an array of strings
 * @param {Object} person
 * @param {string} person.name
 * @param {string} person.quote
 * @param {number} person.born
 * @param {number} person.died
 * @param {string|string[]} person.affiliations
 * @returns {string} 
 */
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


/**
 * Builds a valid HTML table (as a string) from an array of `Person` objects.
 * Please do not generate a table header -- so, just create html of the form
 * <table><tr><td></td>....</tr></table>
 * 
 * @param {Object[]} people
 * @param {string} people[].name
 * @param {string} people[].quote
 * @param {number} people[].born
 * @param {number} people[].died
 * @param {string|string[]} people[].affiliations
 * @returns {} string
 */
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

let modFuns = [personRow, peopleRows, tagIt ,  biko, leaders];

for (let i in modFuns) {
  exports[modFuns[i].name] = modFuns[i]; // get the name as string first!
}

exports.leaders = leaders;
exports.biko = biko;
exports.tambo = tambo;
