// ==UserScript==
// @name         MAD Auth Autofiller
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically fills institutional email on login pages.
// @author       Anonymous
// @match        https://matematica-al-dini.netlify.app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  //Feel free to use your own email
  const EMAIL = "rocco.commisso@edu.unifi.it";
  const SUBMIT_DELAY = 50;

  const filledInputs = new WeakSet();

  function setNativeValue(element, value) {
    const setter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(element),
      "value"
    )?.set;

    setter ? setter.call(element, value) : (element.value = value);
  }

  function triggerEvents(element) {
    element.focus();
    element.dispatchEvent(new Event("focus", { bubbles: true }));
    element.dispatchEvent(
      new InputEvent("input", { bubbles: true, inputType: "insertText" })
    );
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function isLoginPage() {
    const heading = document.querySelector("h1");
    return heading?.textContent?.includes("mail universitaria");
  }

  function getAccediButton() {
    return Array.from(document.querySelectorAll("button")).find(
      (b) => b.textContent.trim().toUpperCase() === "ACCEDI"
    );
  }

  function attemptFill() {
    if (!isLoginPage()) return;

    const btn = getAccediButton();
    const input = btn?.parentElement?.querySelector("input");

    if (!input || input.value || filledInputs.has(input)) return;

    console.log("[Bypasser] Filling login form...");

    setNativeValue(input, EMAIL);
    triggerEvents(input);
    filledInputs.add(input);

    setTimeout(() => {
      console.log("[Bypasser] Clicking ACCEDI...");
      btn.click();
    }, SUBMIT_DELAY);
  }

  // Debounced observer
  let timeout;
  const observer = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(attemptFill, 50);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("hashchange", () => setTimeout(attemptFill, 100));
  window.addEventListener("load", attemptFill);
})();
