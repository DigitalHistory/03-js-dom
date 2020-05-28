/* eslint-env node, mocha */
// the above does not work for me!
// 'use strict';


// Stop eslint complaints about mocha globals
// see e.g. https://eslint.org/docs/user-guide/configuring#specifying-globals
// for official recommendations, but these are not working for me
// let describe, before, it, beforeAll, expect, assert;

const path = require('path'),
      gitCommits = require('git-commits'),
      fs=require('fs'),
      hwc=require('html-word-count'),
      gitConfig = require('git-config'),
      // gitConfig = require('gitconfig'),
      gitState = require('git-state'),
      jsdom = require("jsdom"),
      chai=require('chai'),
      expect=chai.expect,
      assert=chai.assert,
      randw = require('random-words');

const fileUrl = require('file-url');
const { JSDOM } = jsdom;
const wikiString = 'https://en.wikipedia.org/wiki/';



// why these? 
var repoPath = path.resolve(process.env.REPO || (__dirname + '/../.git'));
var ignoreCommitEmails = 'matt.price@utoronto.ca';
const matchesProfEmail = function (email, profEmails) {
  return (profEmails.indexOf(email) > -1);
};



// git specific
let studentCommits = 0;
const minCommits = 6;

chai.use(require('chai-fs'));

// dom-specific stuff, parts 1-2-3
// unclear why this is necessary? 
var q= require('jquery'); // feels like these should be removed but Pt 2 errors (!)

// placeholders for the 3 problem sheet modules
let dtr, dt, dad;

// set depending on whether testing solutions
// don'thtin kthis will work though!!
if (process.env.SOLUTIONS) {
  // test solutions if passing the env variable
  dtr = require('../Part1/01-data-to-rows-instructor.js'),
  dt = require('../Part2/02-dom-tricks.js'),
  dad = require('../Part3/03-dom-data-instructor.js');
} else { 
  // default values
  dtr = require('../Part1/01-data-to-rows.js'),
  dt = require('../Part2/02-dom-tricks.js'),
  dad = require('../Part3/03-dom-data.js');
}

let name,email,githubid;

gitConfig(function (err, config) {
  if (err) return done(err); 
  // console.log(config);
  if (config.user.name) { name = config.user.name; }
  if (config.user.email) { email = config.user.email; }
  if (config.github.user) { githubid = config.github.user; }

});


/////////////////////////////
///
///  tests start here
///
////////////////////////////
// var name,email,githubid;

describe('Git Checks', function() {
  let gitCheck;
  before(function(done) {

    gitCheck  = gitState.checkSync('./', function(r,e) {
      //return [r, e];
    });

    gitCommits(repoPath)
      .on('data', function (commit) {
        if (!matchesProfEmail(commit.author.email, ignoreCommitEmails))
        {
          studentCommits++;
        }
      })
      .on('end', function () {
      })
    ;
    done();

      //return [r, e];
    });

  it('You should have made at least ' + minCommits + ' git commits ', function() {
    if (process.env.MARKING === 'instructor' ) return this.skip();
    expect(studentCommits).to.be.at.least(minCommits);
  });

  it('Git should be configured with username and email information', function() {
      expect(name, "your Git user name has not been set").not.to.be.undefined;
      expect(email, "your Git email has not been set").not.to.be.undefined;
      expect(githubid, "your Github user name has not been set").not.to.be.undefined;
  });

  it('All changes in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    if (process.env.MARKING === 'instructor' ) return this.skip();
    expect(gitCheck.dirty, 'looks like you have changed some files and not committed the changes yet').to.equal(0);
  });

  it('All files in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    if (process.env.MARKING === 'instructor' ) return this.skip();
    expect(gitCheck.untracked, 'looks like you have some files in the directory which have not been added to the repository. \n      Make sure your answers do not rely on them, or tests will fail on the server.').to.equal(0);
  });
});


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
    let b = dtr.biko;
    let r = dtr.personRow(b);
    expect (r, 'Check carefully to see how your output differs from the expected').
      to.equal('<tr><td>Steve Biko</td><td>1946</td><td>1977</td><td>SASO,Black Consciousness</td><td>The most potent weapon in the hands of the oppressor is the mind of the oppressed.</td></tr>') ;
  });

  it('peopleRows should return a full <table> with appropriate data', function() {
    expect (dtr.peopleRows([dtr.biko, dtr.tambo]),
            'Check your table code for differences').to
      .equal(`<table><tr><td>Steve Biko</td><td>1946</td><td>1977</td><td>SASO,Black Consciousness</td><td>The most potent weapon in the hands of the oppressor is the mind of the oppressed.</td></tr><tr><td>Oliver Tambo</td><td>1917</td><td>1993</td><td>ANC</td><td>The fight for freedom must go on until it is won; until our country is free and happy and peaceful as part of the community of man, we cannot rest.</td></tr></table>`) ;
  });
});


// Part 2 
describe('Part 2: Dom Tricks', function(done) {
  let $
  before (function (done) {
    this.timeout(5000);
    let f = fs.readFileSync('Part2/index.html', "utf8");
    // TODO: update to new async declaratin see assignment 1
    let dom = new JSDOM(f,
                        {runScripts: 'dangerously',
                         resources: "usable",
                         url: fileUrl('Part2/index.html') })
    ;
    let s = fs.readFileSync('Part1/style.css', "utf8");
    let j = fs.readFileSync('Part2/02-dom-tricks.js', "utf8");
    let window, document;

    global.window = window = dom.window;
    global.document = document = window.document;
    $ = global.jQuery = require('jquery')(window);
    let style = $('head').append(`<style>${s}</style>`);
    if (process.env.SOLUTIONS) {
      j = fs.readFileSync('Part2/02-dom-tricks-instructor.js', 'utf8');
      $('head').append(`<script>${j}</script>`);
    }

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

  // TODO: fix  

  it('Nav Border Color', function(done) {
    expect($('nav').css("border-bottom-width"),
           'The `border-bottom width` property should be set to 10px').
      to.equal('10px');
    expect($('nav').css("border-bottom-style"),
           'The `border-bottom-style` property should be set to solid').
      to.equal('solid');
    expect($('nav').css("border-bottom-color"),
           'The `border-bottom-color` property should be set to rgb(180,40,40)').
      to.equal('rgb(180,40,40)');

    done();
  });

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

//part 3, static
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



// Part 3, dynamic
describe('Part 3: Data to DOM (dynamic tests)', function(done) {
  beforeEach (function (done) {
    let cells=`<html><head></head><body><table><tr><td class="name">Billiy Joel</td><td class="name">Elton John</td></tr></table></body></html>`;
    let f = fs.readFileSync('Part3/index.html', "utf8");

    let dom = new JSDOM(f,
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
    if (process.env.SOLUTIONS) {
      let j = fs.readFileSync('Part3/03-dom-data-instructor.js', 'utf8');
      $('head').append(`<script>${j}</script>`);

    }

    setTimeout(() => {
      done();
    }, 500);

    
  });

  it('wikifyElementHtml should add a child to its target element', function(done) {
    let s = $('body').append(`<script>wikifyElementHtml($('td')[3])</script>`);
    setTimeout(() => {
      let e = $('td')[3];
      let t = $(e).text();
      // expect($('td').html(), '').to.equal(`<a href="${wikiString}${t}">${t}</a>`) ;
      expect($(e).children().length).to.be.above(0);
          done();
    }, 500);
    
  });
  

  it('WikifySelector(\'td\') should append children to all td elements with class name', function(done) {
    let command = $('body').append(`<script>wikifySelector('td')</script>`);
    
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

// Reflection
describe('Reflection Checks (not required unless you are attempting an "A" grade!)', function() {
  it('Reflection file should exist', function() {
    //let r = `Reflection/${githubid}.md`;
    let r = `Reflection/reflection.md`;
    expect(r, `I can't find the file ${r}`).to.be.a.file();
  });
  it('The total word count for your reflection should be at least 625', function() {
    //let content=fs.readFileSync(`Reflection/${githubid}.md`, 'utf-8');
    let content=fs.readFileSync(`Reflection/reflection.md`, 'utf-8');
    expect(hwc(content), "").to.be.at.least(625);
  });
});
