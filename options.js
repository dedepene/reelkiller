//select the two checkbox elements
const reelsCheckBox = document.getElementById ('reels');
const storiesCheckBox = document.getElementById ('stories');
const productivityCheckBox = document.getElementById ('productivity');


//when the page loads, also load the states of each toggle
document.addEventListener('DOMContentLoaded', restore_options);

//when each toggle is switched, update the toggle state in browser storage
reelsCheckBox.addEventListener('change', save_options);
storiesCheckBox.addEventListener('change', save_options);
productivityCheckBox.addEventListener('change', save_options);



console.log("reels box? ", reelsCheckBox.checked, "stories box?", storiesCheckBox.checked, "productivity box?", productivityCheckBox.checked);

//update the status of toggles in browser storage
function save_options() {
    let reels = document.getElementById('reels').checked;
    let stories = document.getElementById('stories').checked;
    let productivity = document.getElementById('productivity').checked;
    console.log('reels', reels, 'stories', stories, 'productivity', productivity);
    chrome.storage.sync.set({
      checkedReels: reels,
      checkedStories: stories,
      checkedProductivity: productivity
    }, function() {
      // Update status to let user know options were saved.
      let status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 1500);
    });
  }

//get states for the toggle buttons from browser storage
  function restore_options() {
    chrome.storage.sync.get({
      checkedReels: true,
      checkedStories: true,
      checkedProductivity: true
    }, function(items) {
      document.getElementById('reels').checked = items.checkedReels;
      document.getElementById('stories').checked = items.checkedStories;
      document.getElementById('productivity').checked = items.checkedProductivity;
    });
}