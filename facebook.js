function removeReels() {
    reels = document.getElementsByClassName('d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em mdeji52x a5q79mjw g1cxx5fr lrazzd5p oo9gr5id');
    console.log('type of reels: ', typeof(reels), "content of reels: ", reels);
    for (let i=0; i <reels.length; i++){
        if (reels[i].innerHTML.indexOf('Reels and short') != -1) {
            // console.log('grandparent was:', (reels[i].parentNode).parentNode.parentNode.parentNode.parentNode.parentNode);
            properDiv = (reels[i].parentNode).parentNode.parentNode.parentNode.parentNode.parentNode;
            //reels[i].parentNode.removeChild(reels[i]);
            properDiv.remove();
            console.log('reels was found and terminated');

            chrome.storage.sync.get("kills", ({ kills }) => {
                kills++
                chrome.storage.sync.set({ kills });

                //changeColor.style.backgroundColor = color;
              });

        }
        else {
            //console.log('got no reels');
        }

    }
}

//removeReels();

document.addEventListener ('scroll', removeReels);

