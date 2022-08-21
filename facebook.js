//this function instead of e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

function getParentNode(element, level =1) {
    while (level-- > 0) {
        element = element.parentNode;
        if (!element) return null; 
    }
    return element;
}

function removeReels() {
    for (const a of document.querySelectorAll("span")) {
        //find the span element containing a "Stories" string
        if (a.textContent.includes("Reels and short")) {
          //go 9 elements up the DOM three
          const properNode = getParentNode (a, 7);
          const targetNodeClassName = properNode.className;
          const elementToKill = document.getElementsByClassName(targetNodeClassName);
          

          for (let i=0; i < elementToKill.length; i++){
            if (elementToKill[i].innerText.indexOf('Reels and short') != -1) {
                
                elementToKill[i].remove();
                console.log('Reels just got killed');

                //add a kill to the tally
                chrome.storage.sync.get("kills", ({ kills }) => {
                    kills++
                    chrome.storage.sync.set({ kills });
    
                   });
    
            }
            else {
                //console.log('got no reels');
            }
          
        }
      }
    }}

function removeStories(){
    for (const a of document.querySelectorAll("span")) {
        //find the span element containing a "Stories" string
        if (a.textContent.includes("Stories")) {
          //go 9 elements up the DOM three
          const properNode = getParentNode (a, 9);
          const targetNodeClassName = properNode.className;
          const elementToKill = document.getElementsByClassName(targetNodeClassName);
          
          //remove the top container element
          while (elementToKill.length > 0) {
            elementToKill[0].parentNode.removeChild(elementToKill[0]);
            console.log('Stories just got killed');
        }
          
        }
      }
}

function productivityTimer(){
    let buttonDiv = document.body.firstChild;
    const html = `
    <div class = "footer rcorners">
        <p> CLICK TO SNOOZE FACEBOOK </p>
    </div>
    `;
    if (buttonDiv.id != 'pButton') {

    let div=document.createElement('div');
    div.innerHTML = html.trim(); 
    document.body.insertBefore(div, document.body.firstChild); 
    buttonDiv = document.body.firstChild;
    buttonDiv.setAttribute("id","pButton");
    
    const productivityButton = document.getElementsByClassName('footer');
    productivityButton[0].addEventListener('click', snoozeFb);
    }

   
};

//check if the reels toggle is flipped in settings and call the reels cleanup routine
function check_reels() {

    chrome.storage.sync.get({
      checkedReels: true, 
      //checkedStories: true
    }, (items) => {
        if (items.checkedReels === true) {
            removeReels();
        };
    });
    
}  

//check if the stories toggle is flipped in settings and call the stories clean up routine
function check_stories() {
    
    chrome.storage.sync.get({ 
        chekedStories: true,
    }, (items) => {
        //console.log('stories:', items.chekedStories);
        if (items.chekedStories === true) {
            removeStories();
        };
    });
    
}  

//check if the productivity toggle is flipped in settings
function check_productivity() {

    chrome.storage.sync.get({ 
        checkedProductivity: true,
    }, (items) => {
        console.log('productivity:', items.checkedProductivity);
        if (items.checkedProductivity === true) {
            productivityTimer();
        } else {console.log('productivity off')};
    });
    
}  

function snoozeFb (){
    console.log('facebook has been snoozed');
    chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
        console.log('response:', response);
        if (response.time) {
          const time = new Date(response.time);
          console.log('time from background:', time);
        } else {console.log('no time came with response');}
      });
}

function startTimer(time) {
    if (time.getTime() > Date.now()) {
      setInterval(() => {
        // display the remaining time
      }, 1000)
  
    }
  }
  
function startTime(time) {
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: time });
    startTimer(time);
  }

check_productivity();

//scrub stories
check_stories();
//scrub reels and videos block at each scroll event
document.addEventListener ('scroll', check_reels);
//window.addEventListener ('DOMContentLoaded', check_stories);