
console.log("hoge")
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
getCurrentTab().then((tab) => {
  console.log("kita" + tab)
  reload(tab.id)
  return true
});

function reload(id) {
  const func = () => {
    chrome.runtime.sendMessage({ message: "reload", id: id});
    return true
  }
  setInterval(func, 2000);
}
