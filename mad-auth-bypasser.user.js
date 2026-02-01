// ==UserScript==
// @name         MAD Auth Bypasser
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Instant login bypass - patches validation, auto-clicks
// @match        https://matematica-al-dini.netlify.app/*
// @author       Anonymous
// @grant        none
// @run-at       document-start
// ==/UserScript==

(originalIncludes => {
  let clicked = false;

  String.prototype.includes = function(s) {
    if (s === '@edu.unifi.it' || s === '@unifi.it') return true;
    return originalIncludes.call(this, s);
  };

  new MutationObserver(() => {
    if (clicked) return;
    const btn = [...document.querySelectorAll('button')]
      .find(b => b.textContent.trim() === 'ACCEDI');
    if (btn) {
      clicked = true;
      btn.click();
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})(String.prototype.includes);
