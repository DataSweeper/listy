
//listbaby Object
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
    this.token = {
        public: '', 
        secret: ''
    };
  }
  else {
    this.token = token;
  }
  if(!this.redirecturi) {
  this.auth =  this.oauth.authorize(this.request_data, this.token);
  }
  else {
    this.auth =  this.oauth.authorize(this.request_data, this.token, this.redirecturi);
  }
}

var twitter_urlcall = {

    t_response_to_json: function(params) {
    string = '"'+params.replace(/=/gi, '":"').replace(/&/gi, '","')+'"';;
    string = "{" + string + "}";
    return JSON.parse(string); // return json
  },

  request_token: function() {
     var baby = new Listbaby({url: "https://api.twitter.com/oauth/request_token", method: "POST", data:{}, redirecturi: window.location.href});
     var return_data;
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth),
         async: false
      }).done(function(data){
          store.set('request_token', twitter_urlcall.t_response_to_json(data));
          return_data = twitter_urlcall.t_response_to_json(data);
      });
      return return_data;
  },

  getUserInfo: function(data) {

    token = {
        public: data.oauth_token,
        secret: data.oauth_token_secret
      }

      var baby = new Listbaby({url: "https://api.twitter.com/1.1/users/show.json", method: "GET", data:{"user_id" : data.user_id}}, token);
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth),
         async:   false
      }).done(function(userdata){
          data["image"] = userdata.profile_image_url_https;
          data["name"] = userdata.name;
     });      
     return data;
  },

  access_Token: function(data) {
      var return_data;
      value = store.get('request_token');
      token = {
        public: value.oauth_token,
        secret: value.oauth_token_secret
      }
      var baby = new Listbaby({url: "https://api.twitter.com/oauth/access_token", method: "POST", data:{"oauth_verifier" : data.oauth_verifier}}, token);
      $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth),
         async:   false
      }).done(function(data){
          return_data = twitter_urlcall.getUserInfo(twitter_urlcall.t_response_to_json(data));
     });
      return return_data;
  },
  tUrlCaller : function ( user, url, method, data ) {
    var r_val;
    token = {
      public: user.oauth_token,
      secret: user.oauth_token_secret
    }
    var baby = new Listbaby({url: url, method: method, data: data}, token);
    $.ajax({
         url: baby.request_data.url,
         type:  baby.request_data.method,
         data: baby.request_data.data,
         headers: baby.oauth.toHeader(baby.auth),
         async:   false
      }).done(function(data){
        r_val = data;
     });
    return r_val;
  }
};


