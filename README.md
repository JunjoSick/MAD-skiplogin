# MAD Auth Bypasser 🎓

> Logs in faster than Lore Sgabuzzini solves a Rubik's cube 🧊

A Tampermonkey userscript that automatically bypasses the login form on Matematica al Dini.

No more typing your university email every single time.

## Quick Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click one of the links below:

| Option | Description | Install |
|--------|-------------|---------|
| Form Filler | Safe & reliable | [Install](https://github.com/JunjoSick/MAD-skiplogin/raw/refs/heads/main/mad-auth-autofiller.user.js) |
| Prototype Patch | Minimal & experimental | [Install](https://github.com/JunjoSick/MAD-skiplogin/raw/refs/heads/main/mad-auth-bypasser.user.js) |

3. Edit the script to add your `@edu.unifi.it` or `@unifi.it` email (Form Filler only)
4. Visit the site and enjoy instant access

## Options

### Option 1 — Form Filler (Recommended)

The safe and reliable approach. Fills the email input and clicks the button automatically.

**Pros:** Stable, predictable, easy to understand  
**Cons:** Slightly more code, requires email configuration

---

### Option 2 — Prototype Patch (Experimental)

The "I like to live dangerously" approach. Patches `String.prototype.includes` to make any email pass validation.

**Pros:** Minimal code, no email configuration needed  
**Cons:** Modifies global prototypes, might break other things

---

## How it works

The site checks if your email contains `@edu.unifi.it` or `@unifi.it`:

```js
(r.value.includes("@edu.unifi.it") || r.value.includes("@unifi.it")) && (n.value = !0)
```

- **Option 1** fills the input with a valid email before clicking
- **Option 2** makes `.includes()` return `true` for those domain checks

## Disclaimer

This script is for educational purposes and personal convenience only.
Use responsibly. The author is not responsible for any misuse.

## License

This is free and unencumbered software released into the public domain. See [UNLICENSE](UNLICENSE) for details.

---

*Much love for **Sgabuzzini** ✨*
