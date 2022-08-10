//get from storage the variable value holding the number of kills
//and set the text to appear in the extension pop up

chrome.storage.sync.get("kills", ({ kills }) => {
  const div = document.getElementById('counter');
  div.textContent = `Reels killed: ${kills}`;
});
