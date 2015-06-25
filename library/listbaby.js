
//listbaby class
function Listbaby(params, token) {
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

  this.redirecturi = params.redirecturi;
  if(!token) {
    console.log("no token");
    this.token = {
        public: '', //1421407057-w7ZVCAAiPplFkwSJrds3BeuY4E4jhWGCiluPe0F
        secret: '' //1IkEWx2KDofhR7xmDm3etnvl6tAqr25vDQ6DoPPMWwHfc
    };
  }
  else {
    this.token = token;
  }
  if(!this.redirecturi) {
  this.auth =  this.oauth.authorize(this.request_data, this.token);
  }
  else {
    console.log("else");
    this.auth =  this.oauth.authorize(this.request_data, this.token, this.redirecturi);
  }
}

Listbaby.prototype.twitterLists = function(jsonObj) {
  this.lists = "";
  console.log(jsonObj.length);
  for(i=0; i < jsonObj.length; i++) {
    this.lists = this.lists + '<div><button class="btn btn-default" style="text-align: center" id="inbutton' + i +'" value="' + jsonObj[i].id +'">' + jsonObj[i].name + '</button></div>';
  }
  $("body").append(this.lists);

  $("[id^=inbutton]").click(function(){
    cookieManager = new CookieManager();
    var babyObj = new Listbaby({url: "https://api.twitter.com/1.1/lists/members/create.json", method: "POST", data:{"list_id" : $(this).prop("value"), "screen_name" : screenName}}, cookieManager.getAccesstoken());
    console.log(babyObj.request_data.method);  
      $.ajax({
         url: babyObj.request_data.url,
         type:  babyObj.request_data.method,
         data: babyObj.request_data.data,
         headers: babyObj.oauth.toHeader(babyObj.auth)
      }).done(function(data){
          alert("added");
          console.log("added");
      }).fail(function() {
          alert( "could not be added to list" );
      });
  });
}

//cookieManager class
function CookieManager() {

}

CookieManager.prototype.setCookie = function(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

CookieManager.prototype.getCookie = function(cname) {
  var cookie = document.cookie;
  cookieList = cookie.split(";");
  for(i = 0; i < cookieList.length; i++) {
    firstKey = cookieList[i].split("=")[0];
      if (firstKey.trim() == cname) {
        return cookieList[i];
      }
  }
}

CookieManager.prototype.getRestTokenOauth = function(param) {
            cookie = this.getCookie("request_token").split("=");
          for(i = 0; i < cookie.length; i++) {
            cookie[i] = cookie[i].split(",");
          }
          cookie = cookie.toString().split(",");
          console.log(cookie);
          for(i = 0; i < cookie.length; i++) {
            if (cookie[i] == param) {
              token = cookie[i+1];
            }
          }
          return token;
}

CookieManager.prototype.getAccesstokenOauth = function(param) {
          token = "";
          cookie = this.getCookie("access_token").split("=");
          for(i = 0; i < cookie.length; i++) {
            cookie[i] = cookie[i].split(",");
          }
          cookie = cookie.toString().split(",");
          console.log(cookie.length);
          for(i = 0; i < cookie.length; i++) {
            if (cookie[i] == param) {
              token = cookie[i+1];
            }
          }
          return token;
}

CookieManager.prototype.getAccesstoken = function() {
      auth_token = this.getAccesstokenOauth("oauth_token");
      auth_token_secret = this.getAccesstokenOauth("oauth_token_secret");
      return {
        public: auth_token,
        secret: auth_token_secret
      }
}


//calls from UI
$("#button").click(function(){
      cookieManager = new CookieManager();
      var baby = new Listbaby({url: "https://api.twitter.com/1.1/lists/list.json", method: "GET", data:{}}, cookieManager.getAccesstoken());
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth)
      }).done(function(data){
          baby.twitterLists(data);
      });
});

$("[id=auth_button]").click(function(){
      var baby = new Listbaby({url: "https://api.twitter.com/oauth/request_token", method: "POST", data:{}, redirecturi: window.location.href});
      cookieManager = new CookieManager();
      console.log(baby.auth);
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth)
      }).done(function(data){
          cookieManager.setCookie("request_token", data.split("&"));
          auth_token = cookieManager.getRestTokenOauth("oauth_token");
          auth_token_secret = cookieManager.getRestTokenOauth("oauth_token_secret");
          console.log(auth_token + " :) " + auth_token_secret)
          window.open("https://api.twitter.com/oauth/authorize?oauth_token="+auth_token);
      });
});

$("[id=logout_button]").click(function(){
  console.log("check");
  Login.removeLoginCookie();
  Login.showLoginButton();
});

//window onload functions
function onWindowLoad() {

  Login.loginCookieCheck();
  if(!Login.loginCheck) {
    if (window.location.pathname.replace("/", "") == "popup.html") {
      Login.showPopupHref();
    }
    else {
      console.log("LoginCookie not setted");
      Login.showLoginButton();
      Login.setLoginCookie(Login.getUrlParam());
      console.log(" loginCheck " + Login.loginCheck.toString());
      if (Login.loginCheck) {
        Login.showLogoutButton();
      }
    }
  }
  else {
    Login.showLogoutButton();
  }

  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "library/listy-inject.js"
  }, function() {
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });
}

var screenName;

chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
    screenName = request.source.replace("@", "");
  }
});

window.onload = onWindowLoad;