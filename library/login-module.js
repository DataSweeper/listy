var Login = {

  cookieManager : new CookieManager(),

  loginCookie: {},

  loginCheck : false,

  // a very basic method
 setLoginCookie : function(params) {
    console.log("inside set login cookie")
      paramsList = params.split(",");
      for (i = 0; i <  paramsList.length; i++) {
        if (paramsList[i] == "oauth_verifier") {
          oauth_verifier = paramsList[i+1];
        }
      }
      console.log("oauth_verifier : " + oauth_verifier);
      auth_token = this.cookieManager.getRestTokenOauth("oauth_token");
      auth_token_secret = this.cookieManager.getRestTokenOauth("oauth_token_secret");
      console.log(auth_token + " :: " + auth_token_secret);
      token = {
        public: auth_token,
        secret: auth_token_secret
      }
      var baby = new Listbaby({url: "https://api.twitter.com/oauth/access_token", method: "POST", data:{"oauth_verifier" : oauth_verifier}}, token);
      setcookieManager = new CookieManager();
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth),
         async:   false
      }).done(function(data){
          console.log(":) " + data);
          setcookieManager.setCookie("access_token", data.split("&"));
          auth_token = setcookieManager.getAccesstokenOauth("oauth_token");
          auth_token_secret = setcookieManager.getAccesstokenOauth("oauth_token_secret");
          console.log(auth_token + " :) :) " + auth_token_secret)
          Login.loginCheck = true;
      });
    },

  // output a value based on the current configuration
  getUrlParam: function(param) {
  pageUrl = window.location.href;
  params = pageUrl.split("?")[1];
  paramsList = params.split("&");
  for(i = 0; i < paramsList.length; i++) {
    paramsList[i] = paramsList[i].split("=")
  }
  paramsList = paramsList.toString();
  return paramsList;
  },

  loginCookieCheck: function() {
      auth_token = this.cookieManager.getAccesstokenOauth("oauth_token");
      auth_token_secret  = this.cookieManager.getAccesstokenOauth("oauth_token_secret");
      this.loginCookie = {"oauth_token":auth_token, "oauth_token_secret" : auth_token_secret}
      console.log(auth_token + " : " + auth_token_secret);
      if (this.loginCookie.oauth_token) {
        console.log("login cookie setted");
        this.loginCheck = true;
      }
  },

  showLogoutButton: function() {
    $("[id=auth_button]").hide();
    $("[id=logout_button]").show();
  },

  showLoginButton: function() {
    $("[id=auth_button]").show();
    $("[id=logout_button]").hide();
  },

  removeLoginCookie: function() {
    this.cookieManager.setCookie("access_token", "");
  }
};