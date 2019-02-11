// initial set up
// currently doing nothing in web page

// test if in browser or node
// cf. https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
var isNode=new Function("try {return this===global;}catch(e){ return false;}");

// common variables for both environments

//if (isNode()) {
var chai=require('chai'),
    chaidom = require('chai-dom'),
    fs=require('fs'),
    jsdom = require("jsdom");

var fileUrl = require('file-url');
const { JSDOM } = jsdom;
var wikiString = 'https://en.wikipedia.org/wiki/';

// declare jquery and window-related vars
var window, jq,
    q= require('jquery'),
    assert=chai.assert,
    expect=chai.expect;

chai.use(chaidom);
var dtr = require('../Part1/01-data-to-rows.js'),
    //fns = require('../Part1/01-solution.js'),
    dt = require('../Part2/02-dom-tricks.js'),
    dad = require('../Part3/03-dom-data.js'),
    pl='placeholder;';
//ocl = require('../Part1/02-solution.js');

var chai=require('chai'),
    assert=chai.assert;

// random word generator
const randw = require('random-words');

//////////////////////////////////////
///
///   tests start here
///
//////////////////////////////////////

// 'dtr' contains module exportsfrom 01-data-to-rows
describe('Part 1: From Data to Rows', function() {

  it('tagIt should return a string of the form <tagname>content</tagname>, even if the content and tagname are random English words', function() {
    let t = 'h1',
        c = 'Header Words',
        rt=randw(1),
        rc=randw(4);
    expect(dtr.tagIt(c,t), 'tagIt is not returning the right value').
      to.equal(`<${t}>${c}</${t}>`);
    expect(dtr.tagIt(rc,rt), 'tagIt is not returning the right value').
      to.equal(`<${rt}>${rc}</${rt}>`);

  });

  it('personRow should return a full <tr> with appropriate data in <td> elements ', function() {
    let b = dtr['Steve Biko'];
    let r = dtr.personRow(b);
    expect (r, 'Check carefully to see how your output differs from the expected').
      to.equal('<tr><td>Steve Biko</td><td>1946</td><td>1977</td><td>SASO,Black Consciousness</td><td>The most potent weapon in the hands of the oppressor is the mind of the oppressed.</td></tr>') ;
  });

  it('peopleRows should return a full <table> with appropriate data', function() {
    expect (dtr.peopleRows([dtr.biko, dtr.tambo]), 'Check your table code for differences').to.equal(`<table><tr><td>Steve Biko</td><td>1946</td><td>1977</td><td>SASO,Black Consciousness</td><td>The most potent weapon in the hands of the oppressor is the mind of the oppressed.</td></tr>
<tr><td>Oliver Tambo</td><td>1917</td><td>1993</td><td>ANC</td><td>The fight for freedom must go on until it is won; until our country is free and happy and peaceful as part of the community of man, we cannot rest.</td></tr>
</table>`) ;
  });
});

// trying to set up some tests
describe('Part 2: Dom Tricks', function(done) {
  before (function (done) {
    let f = fs.readFileSync('Part2/index.html', "utf8");

    let dom = new JSDOM(f,
                        {runScripts: 'dangerously',
                         resources: "usable",
                         url: fileUrl('Part2/index.html') })
    ;
    let s = fs.readFileSync('Part1/style.css', "utf8");
    let j = fs.readFileSync('Part2/02-dom-tricks.js', "utf8");

    global.window = window = dom.window;
    global.document = document = window.document;
    $ = global.jQuery = require('jquery')(window);
    let auxScript = $('body').append(`        <script>
         secondBoxBlue();
         navBorderBottom();
         evenBoxesText();
         oddBoxesHtml();
         modifyNav();
        </script>
`);

    setTimeout(() => {
      console.log($('main').css('display'));
      done();
       }, 500);
    
  });


it('Second Box Blue', function(done) {
  expect($('#box2').css("background-color"), 'The `background-color` property should be set to blue').
    to.equal('blue');
  done();
});

  // it('Nav Border Color', function(done) {
  //   expect($('nav').css("border-bottom"),  'The `background-color` property should be set to blue').
  //     to.equal('blue');
  //   done();
  // });

  it('Even Boxes Text', function(done) {
    expect($('#box4').text(),
           'All the even numbered boxes should contain the text "I am a box". If this seems confusing or impossible, read about the ":nth-child()" CSS selector.').
      to.equal('I am a box');
    done();
  });


  it('Odd Boxes Html', function(done) {
    expect($('#box3').text(),
           `All the odd  numbered boxes should contain the HTML "<div> I am an inner box</div>". 
If this seems confusing or impossible, read about the ":nth-child()" CSS selector.`).
      to.contain('I am an inner box');
    done();
  });


  it('Remove "Your Name"', function(done) {
    expect ($('nav h1').html(), '').to.not.contain('Your Name');
    done();
  });         
  
});

describe('Part 3: Data to DOM (static tests)', function() {
    it('Wiki URL should return an appropriate string', function() {
    let n = randw(2);
    expect(dad.wikiUrl (n),
           'the expected return vaue is a simple string that adds the Wikipedia URL path in front of the name').
      to.equal('https://en.wikipedia.org/wiki/' + n) ;
  });

  it('wikiLink should return a fully-formed link, as a string', function() {
    let n = randw(2);
    expect (dad.wikiLink(n), 'look carefully at the structure and check for minor errors').
      to.equal(`<a href="https://en.wikipedia.org/wiki/${n}">${n}</a>`);
  });

 
});


describe('Part 3: Data to DOM (dynamic tests)', function(done) {
  beforeEach (function (done) {
    let cells=`<html><head></head><body><table><tr><td class="name">Billiy Joel</td><td class="name">Elton John</td></tr></table></body></html>`;
    // let f = fs.readFileSync('Part3/index.html', "utf8");

    let dom = new JSDOM(cells,
                        {runScripts: 'dangerously',
                         resources: "usable",
                         url: fileUrl('Part3/index.html') })
    ;
    let s = fs.readFileSync('Part1/style.css', "utf8");
    let j = fs.readFileSync('Part3/03-dom-data.js', "utf8");

    global.window = window = dom.window;
    global.document = document = window.document;
    $ = global.jQuery = require('jquery')(window);
    let style = $('head').append(`<style>${s}</style>`);
    let jsScript = $('head').append(`<script>${j}</script>`);

    setTimeout(() => {
      done();
    }, 500);

    
  });

  it('wikifyElementHtml should add a child to its target element', function(done) {
    let s = $('body').append(`<script>wikifyElementHtml($('td')[0])</script>`);
    setTimeout(() => {
      let e = $('td')[0];
      let t = $(e).text();
      // expect($('td').html(), '').to.equal(`<a href="${wikiString}${t}">${t}</a>`) ;
      expect($(e).children().length).to.be.above(0);
          done();
    }, 500);
    
  });
  

  it('WikifyClass should append children to all td elements', function(done) {
    let command = $('body').append(`<script>wikifyClass('name')</script>`);
    
    let e = $('td')[1];
    let t = $(e).text();
    expect($(e).html(), '').to.equal(`<a href="${wikiString}${t}">${t}</a>`) ;
    done();
    $('.name').each(function () {
      let t = $(e).text();
      expect($(e).html(), '').to.equal(`<a href="${wikiString}${t}">${t}</a>`) ;
      
      
    });
  });

});


// describe('Part 3: Data to DOM', function() {
//   describe('Unit Tests', function() {

//     beforeEach (function (done) {
//       // window = new JSDOM(testhtml).window;
//       // jq = q(window);
//       // global.window = window;
//       // global.document = window.document;
//       // done();
//     });
    
//     it('function addLink(node, "Some Name", "https://en.Wikipedia.org/wiki/Some Name") should return the original node with a new <a> tag inside', function() {
//       let td = jq('td')[0],
//           t  = "Some Name",
//           u  = "https://en.wikipedia.org/wiki/" + t;
//       lm.addLink(td,t,u);
//       expect(td,
//              'element has contains no a tag with href ' + u).
//         to.have.descendant('a').with.attr('href').equal(u);
//       expect(td,
//              'element has no a tag with text ' + t).
//         to.have.descendant('a').with.text(t);
//       expect(td.textcontent).to.be.undefined;
//       // console.log(td.outerHTML);
//       // assert.equal(lm.addLink(td,t,u).outerHTML,
//       //              jq('<td class="PM"><a href="https://en.wikipedia.org/wiki/Some Name">Some Name</a></td>')[0].outerHTML );
//           });
//     it('function wikify("Elijah Harper") should return "https://en.wikipedia.org/wiki/Elijah_Harper" (Elijah Harper & Elijah_Harper both accepted)',
//        function() {
//       expect(lm.wikify("Elijah Harper" ) == "https://en.wikipedia.org/wiki/Elijah Harper" ||
//                    lm.wikify("Elijah Harper" ) == "https://en.wikipedia.org/wiki/Elijah_Harper",
//                   "wikify should turn 'Elijah Harper' into either https://en.wikipedia.org/wiki/Elijah Harper" +
//                     " or https://en.wikipedia.org/wiki/Elijah_Harper").to.be.true;
//     });
//     it('function linkifyClass should linkify all elements of a given class', function() {
//       lm.linkifyClass("PM");
//       for(var i = 0; i < jq('td.PM').length; i++) {
//         let el = jq('td.PM')[i]; 
//         expect(el,
//                'this test will fail if a td element does not have a child "a" node').
//           to.contain('a');
//         expect(el.textcontent,
//                'this test will fail if the td element contains text outside of its child node').
//           to.be.undefined;
//       }
//       for(var i = 0; i < jq('td.PM a').length; i++) {
//         let el = jq('td.PM a')[i];
//         expect(el,
//                'this test will fail if an <a> element \in the table does not have a Wikipedia href').
//           to.have.attr('href').with.string("https://en.wikipedia.org/wiki/");
//       }
//     });

//   });

//   describe('Integration tests: does the page load as expected?', function() {
//     let indexHtml = fs.readFileSync("Part2/index.html", "utf-8");
//     beforeEach (function (done) {
//       window = new JSDOM(indexHtml).window;
//       jq = q(window);
//       global.window = window;
//       global.document = window.document;
//       done();
//     });

//     it('Check to see whether index.html is still set up correctly. Running updatePage() in index.html should perform the correct updates.', function() {
//       lm.updatePage();
//       for(var i = 0; i < jq('td.PM').length; i++) {
//         let el = jq('td.PM')[i]; 
//         expect(el,
//                'this test will fail if a td element does not have a child "a" node').
//           to.contain('a');
//         expect(el.textcontent,
//                'this test will fail if the td element contains text outside of its child node').
//           to.be.undefined;
//       }
//       for(var i = 0; i < jq('td.PM a').length; i++) {
//         let el = jq('td.PM a')[i];
//         expect(el,
//                'this test will fail if an <a> element \in the table does not have a Wikipedia href').
//           to.have.attr('href').with.string("https://en.wikipedia.org/wiki/");
//       }
//     });

//   });

// });
