function tabReload() {
  window.location.reload(true)
}

async function procReload(request) {
  const r = await chrome.scripting.executeScript({
    target: { tabId: request.id },
    func: tabReload
  });
  console.log(r)
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("message->" + request.message + " id->" + request.id)
  if (request.message === "reload") {
    procReload(request)
  }
  return true
});

