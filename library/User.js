var bgFactory = new BgFactory();
var bg = chrome.extension.getBackgroundPage(); 

UserManager = (function () {
 
  var instance;
  function init() {
 
    // Private properties
    var userList;
    
    initializeList();
    
    function initializeList() {
      if (store.get('userList')) {
        userList = store.get('userList');
      }
      else {
        userList = [];
      }
    }

    function updateUserList() {
      userList = store.get('userList');
    }
    
    return {
 
      getUserList: function () {
        return userList;
      },

      addUser: function (userObj) {
        test = false;
        userObj["list"] = [];
        $.each(userList, function(i,obj) {
          if (obj.user_id === userObj.user_id) {
            console.log("User already present.");
            test = true;
          }
        });

        if (!test) {
          userObj.image = userObj.image.replace("normal", "reasonably_small");
          userList.push(userObj);
          bgFactory.add('user', userObj)
          store.set('userList', userList);
        }
      },

      removeUser: function (user_id) {
        t1 = [];
        $.each(userList, function(i,obj) {
          if (obj.user_id === user_id) {
            bgFactory.del('user', obj);
          }
          else {
             t1.push(obj);
          }
        });
        userList = t1;
        store.set('userList', userList);
      },

      updateUser: function (user) {
        $.each(userList, function(i,obj) {
          if (obj.user_id === user.user_id) {
            userList[i] = user;
          }
        });
        console.log(userList);
        store.set('userList', userList);
      },

      diableUser: function () {

      },

      enableUser: function () {

      },
      getUserObj: function (user_id) {
        var r_val;
        $.each(userList, function(i,obj) {
          if (obj.user_id === user_id) {
            r_val = obj;
          }
        });
        return r_val;
      },
      getAUser: function () {
        var r_val;
        $.each(userList, function(i,obj) {
          if (i === 0 ) {
            r_val = obj;
          }
        });
        return r_val;
      },
      addList(obj, list) {
        bgFactory.add('list', {user: obj, list: list});
        obj = obj.list.push(list);
        this.updateUser(obj); 
      },
      removeList(obj, list) {
        console.log(obj)
        console.log(list)
        bgFactory.del('list', {user: obj, list: list});
        t = [];
        $.each(obj.list, function(i,l) {
          console.log("list " + l);
          if (l === list) {
          }
          else {
            t.push(obj.list[i]);
          }
        });
        obj.list =  t;
        this.updateUser(obj);
      }
    };

  };
 
  return {

    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();


function addUser (user) {
  test = false;
   $.each(bg.userList, function(i,obj) {
     if (obj.user_id === user.user_id) {
       console.log("User already present.");
       test = true;
     }
   });

   if (!test) {
     bg.userList.push(user);
   }
}

function addList (object) {
  for (var i = 0; i < bg.userList.length; i++) {
    if (bg.userList[i].user_id === object.user.user_id) {
        bg.userList[i].list.push(object.list);
    }
  }
}

function delUser (user) {
  $.each(bg.userList, function(i,obj) {
    if (obj.user_id === user.user_id) {
      bg.userList.splice(i,1);
    }
  });
}

function delList (object) {
  for (var i = 0; i < bg.userList.length; i++) {
    if (bg.userList[i].user_id === object.user.user_id) {
      for (var j = 0; j < bg.userList[i].list.length; j++) {
        if (bg.userList[i].list[j] === object.list) {
          bg.userList[i].list.splice(j,1);
        }
      }
    }
  }
}

function BgFactory () {}

BgFactory.prototype.add = function a(option, content) {
  var parentClass = null;
  if (option === 'user') {
    parentClass = addUser;
  }
  else if (option === 'list') {
    parentClass = addList;
  }  
  if (parentClass === null) {
    return false;
  }
  return new parentClass( content );
}

BgFactory.prototype.del = function d(option, content) {
  var parentClass = null;
  if (option === 'user') {
    parentClass = delUser;
  }
  else if (option === 'list') {
    parentClass = delList;
  }  
  if (parentClass === null) {
    return false;
  }
  return new parentClass( content );
}

