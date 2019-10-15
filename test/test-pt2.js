// initial set up
// currently doing nothing in web page

// test if in browser or node
// cf. https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
// do I want this anymore? 
var isNode=new Function("try {return this===global;}catch(e){ return false;}");

// common variables for both environments

//if (isNode()) {
const chai=require('chai'),
    fs=require('fs'),
    jsdom = require("jsdom"),
    assert=chai.assert,
    expect=chai.expect;

const fileUrl = require('file-url');
const { JSDOM } = jsdom;
const wikiString = 'https://en.wikipedia.org/wiki/';

// unclear why this is necessary? 
var q= require('jquery'); // feels like these should be removed but Pt 2 errors (!)
    

const dtr = require('../Part1/01-data-to-rows.js'),
    dt = require('../Part2/02-dom-tricks.js'),
    dad = require('../Part3/03-dom-data.js');
    // pl='placeholder;';

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
    this.timeout(5000);
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
    let style = $('head').append(`<style>${s}</style>`);
//    let jsScript = $('head').append(`<script>${j}</script>`);
   

    setTimeout(() => {
      // console.log($('main').css('display'));
      let auxScript = $('body').append(`        <script>
         secondBoxBlue();
         navBorderBottom();
         evenBoxesText();
         oddBoxesHtml();
         modifyNav();
        </script>
`);
      // console.log($('#box2').css('background-color'));
      done();
       }, 1500);
    
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
  

  it('WikifySelector should append children to all td elements', function(done) {
    let command = $('body').append(`<script>wikifySelector('name')</script>`);
    
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


