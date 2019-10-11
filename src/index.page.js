const fs = require("fs");
const projects = require("./markup/projects.js");
const writings = require("./markup/writing.js");
const tools = require("./markup/tools.js");
const podcasts = require("./markup/podcasts.js");

module.exports = function() {
  var criticalcss = fs.readFileSync("./css/main.css", "utf8"); //relative to the root I guesss
  const projectMarkup = projects();
  const writingMarkup = writings();
  const toolMarkup = tools();
  const podcastingMarkup = podcasts();

  return html`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>←? Iain J McCallum</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta charset="utf-8" />
                <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFF0lEQVR42mVVXW8TRxQdm9/AT0CoDyjYFAiEBJKQD4KEUNMfALKEIpr+gEgGgYBA+0AA0TxA4vSpCAECBPEDCqASIfFSIZDIgxEFQoiTxpQUAvbuzJ3Tcze7LinHPpqRPXPOvXfvzBoFvP+CkgJgyFXe24z3khfx4+KkZG34AYCyVKvVxmtBLe/hM7qWNOJ9SkRMwggutMbZiCmBpD1gyHUUHnPOVZwInHX09lDMzs5iYmIC9+/fw/zcnP5e4boxjusAb2iYdk5STrxxamLDwIizqd/fzWsGaS7MkbMkrLWeFMXHjx/9L8PD2Lt3L4aHh325XJZqtSpe9CsQ7nFecqghPYlPxjqXChm4CQJvACjVfYBjoOKkIyQIAhAqitWrV0ejQkUVuoZBOEL3cK8MJHpaJp2kI3Fnc5S1IDwRZ4DE4OnTp+js7MS+ffuwsLCQiCvVTEfPL+feOnE5QIxnyQ0D0Fo1ML0yliEqrpvUIDYES4InT56gv78fe/bsqZvoOqX3Sgip8zJ1G0hjpsxfxnlfsFxAWMRIIlPhoaEhjI6OIgxD3Lx5Ez09PZifn08M6kEASlide5HC0TSMoU6WThVmphHop26guH79OjKZDKanp6MOKhQKePPmzX9rvoaPDSvWuqwRQT5y9E50TAy0PJ8/f9aoo+gPHjyImZmZSJRnAEtLS/XIv0a9zHnDSZFz3ciWrD8wNain//r1a4yMjIBtiQTJOhWKxVZmQU0rUjScP4+D8CqqmzRqxdu3b/HgwQNcuXIFxWIRt27dwp07dzA5OanlUmE11WB0z5fZqK2m8dzo0Y//WCF+9+5dnDhxApcvX8bt27cj3rhxI3rIly5dwvHjx/Hw4cMkG923IovY4INmoAYrSqMYGBiI+OzZMy2RdpN2DrOaidr12LFj2L9/Py5cuKBZJtHrGBPLBpw8F/EgvZroXHHo0CGsXfsNmpu3o7W1jYesC11d3Whra8fWrduwaVMjduxoRXv7TmSzG2h0sV4FT1AOVqyWyBfjDHzirjh8+DC+/XYTBTvQ1NSCbduaOTZzbKFhOzZubGQQRygoOH16iIabUSqVkg70zjsauKIRcfnYQP5vkMlsQEdHF6PsWMGdOzv1Px7As1C8fPkKW7Y04erVqyD0ehHtSErljXVBltoVkeQOSkoUGaggS9GmUSt1zqy0LBtx6tTPULx48SfL1oRr166B8HpO9PBSKmt+O2MMDQqsGiyRdEI+n48NOrXWKqysG6xfn8XZs+egGBv7lSXbjKmpKRA2DC0cNd0BGENJoxeTiC1rq6kHiCNHjqpIkoGynkFLy46oJAcO9LGVB9HQkMHJkz+BkOU7zJetBA2kRq8vGXB0OUuoCeHZopoBu6f7C/FWjT56Bm2t7TTaju7uHpw/P8y6h9o7WhrrQsnZQIwNXNoEQbX+wqH4QECAGBwcdGvWrJXGxq0arbZr1EVN7CJtUW3hM2fOwertT2hpOQu8W37hCGltTW/TkNHb1KNHizRxaedsDsBsZaGCixdHfV9fn/T29squnh6/e9du9H73Pfp/+NGPjhRkcXFRNFtGz8K7Wbrklv75Ow1EFUkxI6Pixnu3/IPzaWFq5Dp4jAGo1GpVzM2VeZpfYZoneq48hzhJrbUKV7zIGCz3ODGghg1tijRhEBqFite59GkpNXHvnvnj8eNV796/zzjv8wDGyRL5QSkipWotGA9D4RlCJpTaKkHVOAZJmoSKfwHmDEZaVNa/DQAAAABJRU5ErkJggg==">
                <!-- <link rel="stylesheet" type="text/css" href="/css/main.css"> -->
                <link rel="manifest" href="manifest.json">
                <style>
                    /* currently this is bringing in everything. Future TODO: split out the crit stuff here! */
                    ${criticalcss}
                </style>
            </head>
            <body>
                <header class="margin-bottom columns">
                    <div class="columns__col">
                        <h1>Iain J McCallum</h1>
                    </div>
                    <div class="columns__col-gap"></div>
                    <div class="columns__col">
                        <a class="margin-right" href="https://github.com/ijmccallum" target="_blank">GitHub</a>
                        <a class="margin-right" href="http://codepen.io/ijmccallum/" target="_blank">CodePen</a>
                        <a class="margin-right" href="https://www.linkedin.com/in/iainjmccallum" target="_blank">Linkedin</a>
                        <a class="margin-right" href="https://twitter.com/IJMcCallum" target="_blank">Twitter</a>
                    </div>
                </header>
                <div class="grid">
                    <div class="margin-bottom span-2">
                        <p>Hi, I'm a Front End Developer</a>. 
                        Professionally I work with performance, accessibility, styling, and everything JavaScript. 
                        Recreationally I work on Node apps, play with DevOps, study app architecture, and consume endless podcasts to keep up with our industry.</p>
                        <p>TLDR: I really enjoy writing code.</p>
                        <p><span id="scremail" class="scremail" title="click to copy">holdonforasec@dont.yet</span></p>
                    </div>
                </div>

                <hr>
                    <div class="margin-bottom grid">
                        <div>
                            <h2>Professional Projects</h2>
                            <p>I have a big spreadsheet to keep track of them all that I'm happy to share. Lets grab a cup of coffee (virtual or otherwise) and I can run through them with you!</p>
                        </div>
                    </div>
                <hr>

                ${projectMarkup}

                <hr>
                    
                ${writingMarkup}

                <hr>
                
                ${toolMarkup}
                
                <hr>
                
                ${podcastingMarkup}

                <hr>

                <div id="footer">
                    <p>Thanks for stopping by!</p>
                </div>

                <script>
                console.log("%cOh hello there, what are you up to? \\nNothing much to see I'm afraid. \\nJust keeping it simple. \\nIf you're looking to see what my JS writings are like, \\nI would recommend https://github.com/WikiLogic. \\nIt's really rather good! \\nThank you for popping in though, \\nit's been a pleasure!", "color: #222; font-family: 'Crimson Text',serif; font-size: 19px; line-height: 1.4;");
                var e = {
                    n: 'iainjmccallum',
                    s: 'gmail',
                    d: 'com'
                };
                /* email scrambler! */
                function scremailer(scremEl){
                    var scrambleSteps = 20, scrambleStepCounter = 0;

                    function rndString(ln) {
                        var rtn = '';
                        var choices = 'abcdefghijklmnopqrstuvwxyz';
                        for (var c = 0; c < ln; c++) {
                            rtn += choices[Math.floor(Math.random() * choices.length)];
                        }
                        return rtn;
                    }

                    function generateEmail(isFinal){
                        if (isFinal) {
                            return e.n +'@'+ e.s +'.'+ e.d;
                        }
                        return rndString(e.n.length) +'@'+ rndString(e.s.length) +'.'+ rndString(e.d.length);
                    }

                    function scrambler(showWhenDone){
                        scremEl.textContent = generateEmail();
                        scrambleStepCounter ++;
                        if (scrambleStepCounter <= scrambleSteps) {
                            window.requestAnimationFrame(() => {scrambler(showWhenDone)});
                        } else {
                            if (showWhenDone) {
                                scremEl.textContent = generateEmail(true);
                            }
                            scrambleStepCounter = 0;
                        }
                    }

                    /*scremEl.addEventListener('mouseover', function(){
                        if (scremEl.className.indexOf('copying') == -1){
                            scrambler(true);
                        }
                    });*/
                    
                    setTimeout(function(){
                        scrambler(true);
                    }, 1000);

                    return {
                        scramble: scrambler
                    }
                };

                var scremEl = document.getElementById('scremail');
                var scremElier = scremailer(scremEl);

                (function(){
                    /* copy email on click */
                    var copyEl = document.getElementById('scremail');

                    function copier(e){
                        copyEl.className = 'scremail copying';
                        document.execCommand('copy');
                        copyEl.textContent = 'Copied to clipboard';
                        setTimeout(function(){
                            scremElier.scramble(true);
                        }, 1300);
                    }

                    copyEl.onclick = copier;
                    copyEl.touchstart = copier;

                    copyEl.addEventListener('copy', function(event) {
                        event.preventDefault();
                        if (event.clipboardData) {
                            event.clipboardData.setData('text/plain', e.n +'@'+ e.s +'.'+ e.d);
                            copyEl.className = 'scremail flash';
                        }
                    });
                })();
                </script>
            </body>
        </html>
    `;
};
