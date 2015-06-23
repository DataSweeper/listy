function Listbaby(params) {

  //url for list https://api.twitter.com/1.1/lists/list.json, GET
  //url for list members https://api.twitter.com/1.1/lists/members.json, GET, {"list_id" : "203783396"}
  //url for adding member to list https://api.twitter.com/1.1/lists/members/create.json, POST, {"list_id" : "203783396", "screen_name" : "facebook"}

  this.oauth = OAuth({
    consumer: {
        public: 'HFPTqx1Ef7lZDT9lISUHmdHuP',
        secret: 'tDYak1hVc4a79gG8dXBeXz3OMiDWAahKrX44Ym7Ea7tfqR1xPI'
    },
    signature_method: 'HMAC-SHA1',
    version: "1.0"
  });

  this.request_data = {
    url: params.url,
    method: params.method,
    data: params.data
  };

  this.token = {
        public: '',
        secret: ''
  };

  this.auth =  this.oauth.authorize(this.request_data, this.token);
}
var screenName;
chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
    screenName = request.source.replace("@", "");
  }
});


Listbaby.prototype.twitterLists = function(jsonObj) {
  this.lists = "";
  console.log(jsonObj.length);
  for(i=0; i < jsonObj.length; i++) {
    this.lists = this.lists + '<div><button class="btn btn-default" style="text-align: center" id="inbutton' + i +'" value="' + jsonObj[i].id +'">' + jsonObj[i].name + '</button></div>';
  }
  $("body").append(this.lists);

  $("[id^=inbutton]").click(function(){
    var babyObj = new Listbaby({url: "https://api.twitter.com/1.1/lists/members/create.json", method: "POST", data:{"list_id" : $(this).prop("value"), "screen_name" : screenName}});
    console.log(babyObj.request_data.method);  
      $.ajax({
         url: babyObj.request_data.url,
         type:  babyObj.request_data.method,
         data: babyObj.request_data.data,
         headers: babyObj.oauth.toHeader(babyObj.auth)
      }).done(function(data){
          console.log("added");
      }).fail(function() {
          alert( "could not be added to list" );
      });
  });
}

//calls from UI
$("#button").click(function(){
      var baby = new Listbaby({url: "https://api.twitter.com/1.1/lists/list.json", method: "GET", data:{}});
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth)
      }).done(function(data){
          baby.twitterLists(data);
      });
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "library/listy-inject.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
