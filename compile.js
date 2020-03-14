// Settings
const token ="discord token"
const filename = "file name.sdjs2"

// Load NPMs
const fs = require("fs");

// Starts to compile the code.
console.log(`Starting to compile code...`);

let code = fs.readFileSync(`./${filename}`).toString().split('\n');
let newcode = [];
let spacing = [];

// Compiles
loopnum = 0;
while (loopnum < code.length) {
  spacing[loopnum] = code[loopnum].slice(0, code[loopnum].length - code[loopnum].trim().length)
  if (code[loopnum].trim() == "]") {
    newcode[loopnum] = spacing[loopnum] + `});`
  } else if (code[loopnum].trim() == "}") {
    newcode[loopnum] = spacing[loopnum] + `};`
  } else if (code[loopnum].trim() == "return" || code[loopnum].trim() == "stop" || code[loopnum].trim() == "end") {
    newcode[loopnum] = spacing[loopnum] + `return;`
  } else if (code[loopnum].trim().startsWith("on ") || code[loopnum].trim() == "on") {
    if (code[loopnum].trim() == "on") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid event function.`);
    } else {
      if (code[loopnum].trim().slice(3).slice(-2) !== " [") {
        console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. An event function should end with " [".`);
      } else if (code[loopnum].trim().slice(3) == "") {
        console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid event function.`);
      } else {
        if (code[loopnum].trim().slice(3, -2) == "ready" || code[loopnum].trim().slice(3, -2) == "start" || code[loopnum].trim().slice(3, -2) == "load" || code[loopnum].trim().slice(3, -2) == "bot ready" || code[loopnum].trim().slice(3, -2) == "bot start" || code[loopnum].trim().slice(3, -2) == "bot load") {
          newcode[loopnum] = spacing[loopnum] + `client.on('ready', () => {`;
        } else if (code[loopnum].trim().slice(3) == "message [" || code[loopnum].trim().slice(3) == "new message [") {
          newcode[loopnum] = spacing[loopnum] + `client.on('message', async message => {`;
        } else {
          console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid event function.`);
        }
      }
    }
  } else if (code[loopnum].trim().startsWith("log ") || code[loopnum].trim() == "log") {
    if (code[loopnum].trim() == "log") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid usage of "log".`);
    } else {
      newcode[loopnum] = spacing[loopnum] + `console.log(${code[loopnum].trim().slice(4).replace(/`/g, "\\`")});`;
    }
  } else if (code[loopnum].trim().startsWith("if ") || code[loopnum].trim() == "if") {
    if (code[loopnum].trim() == "if") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid usage of "if".`);
    } else {
      if (code[loopnum].trim().slice(3).slice(-2) !== " {") {
        console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. An if statement should end with " [".`);
      } else {
        newcode[loopnum] = spacing[loopnum] + `if (${code[loopnum].trim().slice(3, -2)}) {`;
      }
    }
  } else if (code[loopnum].trim().startsWith("send ") || code[loopnum].trim() == "send") {
    if (code[loopnum].trim() == "send") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid usage of "send".`);
    } else {
      newcode[loopnum] = spacing[loopnum] + `message.channel.send(${code[loopnum].trim().slice(5)});`;
    }
  } else if (code[loopnum].trim().startsWith("set ") || code[loopnum].trim() == "set" || code[loopnum].trim().startsWith("let ") || code[loopnum].trim() == "let" || code[loopnum].trim().startsWith("const ") || code[loopnum].trim() == "const") {
    if (code[loopnum].trim() == "set" || code[loopnum].trim() == "let" || code[loopnum].trim() == "const") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid usage of "${code[loopnum].trim()}".`);
    } else {
      if (code[loopnum].trim().startsWith("const ")) {
        newcode[loopnum] = spacing[loopnum] + `const ${code[loopnum].trim().slice(6).split(" ")[0]} = ${code[loopnum].trim().slice(9).slice(code[loopnum].trim().slice(4).split(" ")[0].length).slice(1)};`
      } else if (code[loopnum].trim().startsWith("let ")) {
        newcode[loopnum] = spacing[loopnum] + `let ${code[loopnum].trim().slice(4).split(" ")[0]} = ${code[loopnum].trim().slice(4).slice(code[loopnum].trim().slice(4).split(" ")[0].length).slice(1)};`
      } else {
        newcode[loopnum] = spacing[loopnum] + `${code[loopnum].trim().slice(4).split(" ")[0]} = ${code[loopnum].trim().slice(4).slice(code[loopnum].trim().slice(4).split(" ")[0].length).slice(1)};`
      }
    }
  } else if (code[loopnum].trim().startsWith("delete ") || code[loopnum].trim() == "delete") {
    if (code[loopnum].trim() == "delete") {
      console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Invalid usage of "delete".`);
    } else {
      newcode[loopnum] = spacing[loopnum] + `delete ${code[loopnum].trim().slice(7)};`
    }
  } else if (code[loopnum].trim() == "") { // ignore blank lines
  } else {
    console.log(`An error has occured in line ${loopnum + 1} while trying to compile the code. Unknown keyword.`);
  }
  loopnum = loopnum + 1;
}

// Create file
console.log("Creating file...")

fs.writeFile("output.js", `const Discord = require('discord.js');\nconst client = new Discord.Client();\n\n` + newcode.join("\n") + `\n\nclient.login(\`${token}\`);`, function(err) {
if (err) throw err;
});

console.log("Done!")
