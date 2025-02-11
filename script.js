// VARS
let echo = true;
let commands = new Map();

document.body.onload = function () {
  // INIT vars
  let output = document.getElementById('output');
  let prompt = document.getElementById('prompt');
  let pre = document.getElementById('pre');
  let carat = document.getElementById('carat');
  let post = document.getElementById('post');
  
  prompt.innerHTML = 'User>';
  carat.innerHTML = ' ';
  document.addEventListener('keydown', handleKeypress);
  var intro = document.createElement('span');
  intro.innerHTML = 'Welcome to my "Terminal Emulator."\nActually it\'s just a web dev exercise\nand a bit of fun. :)\ntype "help" for commands\n';
  document.getElementById('output').appendChild(intro);
};

// Commands
function echocmd (args) {
  if (args[0].toUpperCase() == 'OFF') {
    echo = false;
    output('Echo is OFF');
  } else if (args[0].toUpperCase() == 'ON') {
    echo = true;
    output('Echo is ON');
  } else {
    output(args.join(' '));
  }
}
commands.set('echo', echocmd);
function clearcmd(args) {
  document.getElementById('output').innerHTML = '';
}
commands.set('clear', clearcmd);
function flipcmd(args) {
  var cf = ['\\', '|', '/', '-'];
  var out = document.createElement('span');
  out.innerHTML = '-<br>';
  out = document.getElementById('output').appendChild(out);
  var i = 0;
  var intervalId = setInterval(() =>{
    out.innerHTML = cf[i%cf.length];
    i++;
  }, 100);
  setTimeout(() => {
    clearInterval(intervalId);
    out.innerHTML = ['heads<br>', 'tails<br>'][Math.floor(Math.round(Math.random()))];
    
  }, 2000);
}
commands.set('flip', flipcmd);
function helpcmd(args) {
  for (p of commands) {
    output(p[0]);
  }
}
commands.set('help', helpcmd);
// end Commands

function output(text) {
  var out = document.createElement('span');
  out.innerHTML = text.replace(/\n/g, '<br>');
  out.innerHTML += '<br>';
  document.getElementById('output').appendChild(out);
}

function handleKeypress(e) {
  if (e.key.length === 1) {
    document.getElementById('pre').innerHTML += e.key;
  } else if (e.key === 'Backspace') {
    var val = document.getElementById('pre').innerHTML;
    document.getElementById('pre').innerHTML = val.slice(0, val.length-1);
  } else if (e.key === 'Enter') {
    var prompt = document.getElementById('prompt').innerHTML;
    var pre = document.getElementById('pre').innerHTML;
    var carat = document.getElementById('carat').innerHTML;
    var post = document.getElementById('post').innerHTML;
    var val = pre + carat + post;
    if (echo) {
      output(prompt + val);
    }
    handleInput(val)
    document.getElementById('pre').innerHTML = '';
    document.getElementById('carat').innerHTML = ' ';
    document.getElementById('post').innerHTML = '';
  }
}

function handleInput(input) {
  var args = input.match(/(["']).*?\1|\S+/g);
  var cmd = commands.get(args.shift());
  if (cmd) {
    cmd(args);
  }
}