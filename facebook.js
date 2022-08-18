//this function instead of e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode

function getParentNode(element, level =1) {
    while (level-- > 0) {
        element = element.parentNode;
        if (!element) return null; 
    }
    return element;
}

function removeReels() {
    reels = document.getElementsByClassName('gvxzyvdx aeinzg81 t7p7dqev gh25dzvf exr7barw b6ax4al1 gem102v4 ncib64c9 mrvwc6qr sx8pxkcf f597kf1v cpcgwwas m2nijcs8 szxhu1pg hpj0pwwo sggt6rq5 innypi6y pbevjfx6');
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
    const stories = document.getElementsByClassName('alzwoclg jl2a5g8c jcxyg2ei p8bdhjjv q46jt4gp');
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
