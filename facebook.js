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

document.addEventListener ('scroll', removeReels);

