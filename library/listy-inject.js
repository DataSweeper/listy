//div = '<button id="button" class="  u-sizeFull js-tooltip btn primary-btn tweet-action tweet-btn" type="button">to list</button>'
//$(".ProfileHeaderCard").append(div);

chrome.extension.sendMessage({
    action: "getSource",
    source: $(".ProfileHeaderCard-screennameLink").text()
});

