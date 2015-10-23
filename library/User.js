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
          console.log("User not present already " + userList);
          userList.push(userObj);
          store.set('userList', userList); 
        }
      },

      removeUser: function (user_id) {
        t1 = [];
        $.each(userList, function(i,obj) {
          if (obj.user_id === user_id) {
            console.log("removeUser : " + user_id);
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
        obj = obj.list.push(list);
        this.updateUser(obj); 
      },
      removeList(obj, list) {
        t = [];
        $.each(obj.list, function(i,l) {
          console.log("list " + l);
          if (l === list) {
            //continue;
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
