'use strict'

chrome.alarms.onAlarm.addListener(
    () => {
        
        chrome.tabs.query({url: "https://www.facebook.com/*"}, function(tabs) {
            console.log('riiiing...riiing');
            
            chrome.tabs.sendMessage(tabs[0].id, {minute: "1"}, function(response) {
              console.log(response, typeof(response));
              if (response >= 3) {
                terminateAlarms();
                alarmsLength = undefined;
                console.log(`killed all alarms after ${response} minutes`);
                
              }
            });
          });
    }
);

let alarmsLength;
chrome.runtime.onMessage.addListener(
    
    function (request, sender, sendResponse) {
        
        
        console.log('request', request);
        if (request.time && alarmsLength == undefined) {
            const timer = request.time;
            chrome.alarms.getAll(function(alarms) { alarmsLength = alarms.length });
            console.log('alarms at this moment:', alarmsLength, typeof (alarmsLength));
            // if (alarmsLength !== 1) {
            createAlarm();
            // }
            console.log('alarm created');
            // console.log('AFTER new alarm:', chrome.alarms.getAll(function(alarms) { console.log((alarms.length)) }));
        };

        sendResponse(() => {
            return false;
        });
    }
);

function createAlarm() {
    console.log('alarm actually created');
    chrome.alarms.create(
        "drink_water",
        {
            delayInMinutes: 1,
            periodInMinutes: 1
        }
    );
}


//const CSS = "body { .navbanner : 20px solid red; }";
//chrome.tabs.insertCSS({code: CSS});

chrome.runtime.onInstalled.addListener(() => {
    terminateAlarms();
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


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => { 
    const currentTab = getCurrentTab();
    console.log('changeInfo:', changeInfo, 'tabInfo:', tabInfo, 'changeinfo.url:', changeInfo.url);
    currentTab.then(result => {
        //console.log('then result:', result, "url: ", result.url);
        if (changeInfo.status === 'complete' && result.url && result.url.includes ("facebook.com")) {
            console.log('We are on a FB page!', 'tab id is', tabId);
            console.log('alarms:', alarmsLength);
            
            // chrome.storage.sync.set({ 
            //     fbTab : tabId
            //  });
            runFBScript(tabId);
        }
        else console.log('This is not a FB page');
   
    });
           
});

function runFBScript(tabid) {
    // Inject script from file into the webpage
    console.log('run FB script just activated');
    
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

function terminateAlarms () {
    chrome.alarms.clearAll();
    chrome.tabs.query({url: "https://www.facebook.com/*"}, function(tabs) {
        //console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {terminated: "yes", minute: "1"}, function(response) {
        //console.log('response:', response);
        });
        console.log('done deal');
});
}