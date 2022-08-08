//get from storage the variable value holding the number of kills
//and set the text to appear in the extension pop up

chrome.storage.sync.get("kills", ({ kills }) => {
  const div = document.getElementById('counter');
  div.textContent = `Reels killed: ${kills}`;
});

  // function setPageBackgroundColor() {
  //   reels = document.getElementsByClassName('d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em mdeji52x a5q79mjw g1cxx5fr lrazzd5p oo9gr5id');
  //   console.log(reels.length);
  //   for (let i=0; i <reels.length; i++){
  //       if (reels[i].innerHTML.indexOf('Reels and short') != -1) {
  //           console.log('grandparent was:', (reels[i].parentNode).parentNode.parentNode.parentNode.parentNode.parentNode);
  //           properDiv = (reels[i].parentNode).parentNode.parentNode.parentNode.parentNode.parentNode;
  //           console.log('reels was found and terminated');
  //           reels[i].parentNode.removeChild(reels[i]);
  //           properDiv.remove();
  //       }
  //       else {
  //           console.log('got no reels');
  //       }

  //   }
    
  // }