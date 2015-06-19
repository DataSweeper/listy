var oauth = OAuth({
    consumer: {
        public: 'HFPTqx1Ef7lZDT9lISUHmdHuP',
        secret: 'tDYak1hVc4a79gG8dXBeXz3OMiDWAahKrX44Ym7Ea7tfqR1xPI'
    },
    signature_method: 'HMAC-SHA1',
    //last_ampersand: "",
    version: "1.0"
});

var request_data = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
    data: {}
};

var token = {
        public: '1421407057-w7ZVCAAiPplFkwSJrds3BeuY4E4jhWGCiluPe0F',
        secret: '1IkEWx2KDofhR7xmDm3etnvl6tAqr25vDQ6DoPPMWwHfc'
};

//var auth = oauth.authorize(token);

function setHeader() {
/* return function(xhr){
 xhr.setRequestHeader('oauth_consumer_key', auth.oauth_consumer_key);
 xhr.setRequestHeader('oauth_nonce', auth.oauth_nonce);
 xhr.setRequestHeader('oauth_signature', auth.oauth_signature);
 xhr.setRequestHeader('oauth_signature_method', auth.oauth_signature_method);
 xhr.setRequestHeader('oauth_timestamp', auth.oauth_timestamp);
 xhr.setRequestHeader('oauth_version', auth.oauth_version);
 };*/
 //return oauth.toHeader(auth);
}

$("#button").click(function(){
      auth =  oauth.authorize(request_data, token);
      $.ajax({
         url: "https://api.twitter.com/oauth/request_token",
         type: "POST",
         headers: oauth.toHeader(auth)
      }).done(function(data){
      console.log(" data : " + data);
      });
});