
const fs = require('fs');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

require('jsdom-global')();


let f = fs.readFileSync('../Part2/index.html', "utf8");
// let h = fs.readFileSync('../Part2/head.html', "utf8");
// let b = fs.readFileSync('../Part2/body.html', "utf8");
let s = fs.readFileSync('../Part1/style.css', "utf8");
let j = fs.readFileSync('../Part2/02-dom-tricks.js', "utf8");
// document.head.innerHTML=h;
// document.body.innerHTML=b;

// console.log(document.body.innerHTML);
// console.log(window.$);

let dom = new JSDOM(f,
                    {runScripts: 'dangerously',
                     resources: "usable",
                     url: "file:///home/matt/DH/Assignments/03-json-to-table/Part2/index.html" })
;

// const { window } = dom;
// const { document } = window;
// global.window = window;
global.window = window = dom.window;
    
global.document = document = window.document;
let $ = global.jQuery = require('jquery');
let style = $('head').append(`<style>${s}</style>`);
let jsScript = $('head').append(`<script>${j}</script>`);
let auxScript = $('body').append(`        <script>
         secondBoxBlue();
         navBorderBottom();
         evenBoxesText();
         oddBoxesHtml();
         modifyNav();
        </script>
`);
console.log($('nav').html());
console.log($('nav').html());
console.log($('nav').css('background-color'));

// // document = sillyDom.window.document;
//   // const { window } = dom;
//   // const { document } = window;
//   // // Also set global window and document before requiring jQuery
//   // global.window = window;
//   // global.document = document;

// let $ = require('jquery')(dom.window);
// let el = dom.window.document.querySelector('nav');
// console.log(el.innerHTML);


// console.log($);
//   // const $ = global.jQuery = require( 'jquery' );

//   // console.log( `jQuery ${global.jQuery.fn.jquery} working! Yay!!!` );
//   // const inputElement = $( '#fiptest' );

//   // $ = global.jQuery = 
//   // sillyNav = sillyDom('nav');

//   // console.log(dom.serialize()) 
//   // console.log(sillyNav.serialize())

// // setTimeout(() => {
// //   console.log(dom.window.document.body.textContent.trim());
// // }, 5000);
// // console.log($('aside')[0]);
// $('#box2').css('background-color', 'blue');
// console.log(dom.window.document.querySelector('main').text());

// console.log($('nav'));
// console.log($('link'));
// console.log($('main').css('display'));

// // const jsdom = require("jsdom");
// // const { JSDOM } = jsdom;

// let  dom2 = new JSDOM(`<body>
//   <script>document.body.appendChild(document.createElement("hr"));</script>
// </body>`, {runScripts: 'dangerously'});

// // The script will not be executed, by default:
// console.log(dom2.window.document.body.children.length === 1);

// let dom3 = new JSDOM (`<head>${h}</head><body>$(b})</body>`);
//  // $ = require('jquery')(dom3.window);
// console.log(dom.window.$);
// let style = dom.window.document.$('head').append(`<style>${s}</style>`);
// let jsScript = $('head').append(`<script>${j}</script>`);

// console.log(dom3.window.document.querySelector('main'));
//  // console.log($('aside')[0]);
//  // $('#box2').css('background-color', 'blue');
//  // console.log($('nav'));
//  // console.log($('link'));
//  // console.log($('main').css('display'));
