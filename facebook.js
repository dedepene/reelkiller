//this function instead of e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

function getParentNode(element, level =1) {
    while (level-- > 0) {
        element = element.parentNode;
        if (!element) return null; 
    }
    return element;
}

function removeReels() {
    reels = document.getElementsByClassName('d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em mdeji52x a5q79mjw g1cxx5fr lrazzd5p oo9gr5id');
    for (let i=0; i <reels.length; i++){
        if (reels[i].innerHTML.indexOf('Reels and short') != -1) {
            properNode = getParentNode (reels[i], 6);
            properNode.remove();
            console.log('reels was found and terminated');
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

function removeStories(){
    const stories = document.getElementsByClassName('j83agx80 btwxx1t3 taijpn5t sjgh65i0 cxgpxx05');
    while (stories.length > 0) {
        stories[0].parentNode.removeChild(stories[0]);
        console.log('Stories just got killed');
    }
}



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
        console.log('stories:', items.chekedStories);
        if (items.chekedStories === true) {
            removeStories();
        };
    });
    
}  

//scrub stories
check_stories();
//scrub reels and videos block at each scroll event
document.addEventListener ('scroll', check_reels);
