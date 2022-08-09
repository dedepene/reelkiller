let kills = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ kills });
  console.log('Number of kills:', `kills: ${kills}`);
});

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

chrome.tabs.onUpdated.addListener((tabId, tab) => { 
    const currentTab = getCurrentTab();
    
    currentTab.then(result => {
        console.log('then result:', result, "url: ", result.url);
        if (result.url && result.url.includes ("facebook.com")) {
            console.log('We are on a FB page!');
            runFBScript(tabId);
        }
        else console.log('This is not a FB page');
   
    });
           
});

function runFBScript(tabid) {
    // Inject script from file into the webpage
    chrome.scripting.executeScript({
        files: ['facebook.js'],
        target: {
            tabId: tabid,
          },
    });
    return true;
}