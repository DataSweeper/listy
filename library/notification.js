var nFactory = new notificationFactory();


function notifyTweet ( options ) {
   chrome.notifications.create(getNotificationId(), {
     title: options.user.name,
     iconUrl: "1024025.jpg",
     type: 'basic',
     message: options.text
   }, function() {}); 
}

function notifyLoginError ( options ) {

}

function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}

function notificationFactory () {}

notificationFactory.prototype.creat = function createNotify( option, content ) {
  var parentClass = null;
  if ( option === 'tweet' ) {
    parentClass = notifyTweet;
  }
  else if ( option === 'loginerror') {
    parentClass = notifyLoginError;
  }
  if( parentClass === null ) {
    return false;
  }
  return new parentClass( content );
}

function Starter() {
  setInterval(function(){ NotifyStarter() }, 3000);
}

var notifying = [];

function NotifyStarter() {
  this.userlist = userList;
  for (var i = 0; i < this.userlist.length; i++) {
    console.log(this.userlist[i]);
    for (var j = 0; j < this.userlist[i].list.length; j++) {
      console.log("calling add to list " +  i + " : " + j + " : " + this.userList[i] + " : " +  this.userList[i].list[j]);
      addToNotifying(this.userlist[i], this.userlist[i].list[j]);
    }
  }

  for (var i = 0; i < notifying.length; i++) {
    test = false;
    for (var j = 0; j < this.userlist.length; j++) {
      for (var k = 0; k < this.userlist[j].list.length; k++) {
        if (notifying[i].list == this.userlist[j].list[k] && notifying[i].user.user_id == this.userlist[j].user_id) {
           test = true;
        }
      }
    }
    if (!test) {
      clearInterval(notifying[i].id);
      notifying.splice(i,1)
    }
  }
}

function addToNotifying(user, list) {
  console.log("inside add notify " + user + " : " + list)
  test = false;
  for (var i = 0; i < notifying.length; i++) {
    if (notifying[i].list == list && notifying[i].user.user_id == user.user_id) {
     test = true;
   }
  }
  if (!test) {
      console.log("inside !test calling ");
      id = setInterval(function(){ new listNotifier(user, list); }, 60000);
      notifying.push({id: id, user: user, list: list, date: new Date});
  }
}

function listNotifier(user, list) {
  for(var i = 0; i < notifying.length; i++) {
    if (notifying[i].list == list && notifying[i].user.user_id == user.user_id) {
    this.timeline = twitter_urlcall.tUrlCaller(notifying[i].user,"https://api.twitter.com/1.1/lists/statuses.json", "GET", {"list_id": notifying[i].list} )
  for(var j = 0; j < this.timeline.length; j++) {
    console.log("before if....");
    console.log(Date.parse(notifying[i].date));
    console.log(Date.parse(this.timeline[j].created_at));
    if (Date.parse(this.timeline[j].created_at) > Date.parse(notifying[i].date)) {
      console.log("inside if ....");
      nFactory.creat('tweet', this.timeline[j]);
      notifying[i].date = this.timeline[j].created_at;
    }
    }
    }
  }
}
