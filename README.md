# Simplified Discord.JS v2
The rewrite for SDJS.

# SDJS2 Overview
Everything is stored in 1 file now.

SDJS2 generates the code for you. Some of the command names is almost like Javascript with a slight modification.

SDJS2 requires node.js and discord.js in order to run.

You enter code and the code outputs at `output.js`.

# SDJS2 (current) Events/Actions Overview
Currently, there is only `on ready [` and `on message [` as event functions.

Currently, there is `return`, `log`, `send`, `if`, `set` and `delete`.

# Bot Example
```
on ready [
  log "Bot is ready!"
]

on message [
  if message.author.bot {
    return
  }
  if message.content == "!help" {
    set nicethisisthevariablename "Hi!"
    send `${nicethisisthevariablename}`
    delete heck
  }
]
```

# still in development
