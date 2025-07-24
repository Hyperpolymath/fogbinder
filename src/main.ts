// Main entry point for Fogbinder
function safeText(text) {
  // Sanitize text for injection safety
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Initialize plugin UI with accessibility
function createAccessibleButton(label, icon) {
  const btn = document.createElement("button");
  btn.innerText = icon;
  btn.setAttribute("aria-label", label);
  btn.setAttribute("role", "button");
  btn.tabIndex = 0;
  return btn;
}
