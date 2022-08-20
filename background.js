//const CSS = "body { .navbanner : 20px solid red; }";
//chrome.tabs.insertCSS({code: CSS});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.clear();
  let kills = 0;
  chrome.storage.sync.set({ kills });
});

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

//check if facebook is loaded in the tab and then call the content script
const filter = {
    urls: ["https://www.facebook.com/"]
  }  

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => { 
    const currentTab = getCurrentTab();
    console.log('changeInfo:', changeInfo, 'tabInfo:', tabInfo, 'changeinfo.url:', changeInfo.url);
    currentTab.then(result => {
        //console.log('then result:', result, "url: ", result.url);
        if (changeInfo.status === 'complete' && result.url && result.url.includes ("facebook.com")) {
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
    chrome.scripting.insertCSS({
        files: ['styles.css'],
        target: {
            tabId: tabid,
          },
    });
    return true;
}