var obj = document.getElementById("secValue");
obj.addEventListener("change", restart, false);

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
var intervalId
function startInterval(time) {
  getCurrentTab().then((tab) => {
    intervalId = reload(tab.id, time)
    return true
  });
}

function reload(id, time) {
  var inputObj = document.getElementById("secValue");
  var time = inputObj.value * 1000
  console.log(time)
  const func = () => {
    chrome.runtime.sendMessage({ message: "reload", id: id });
    return true
  }
  return setInterval(func, time);
}


function restart() {
  clearInterval(intervalId)
  startInterval()
  getCurrentTab().then((tab) => {
    intervalId = reload(tab.id)
    return true
  });
}
var inputObj = document.getElementById("secValue");
inputObj.value = 2 
restart()
