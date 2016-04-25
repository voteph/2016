window.app = window.app || {} ;

var vote = [];
var titleID = document.getElementById("titleID");
var canvas = document.getElementById("canv");
var ctx = "";
var profImage = document.getElementById("profImage");
var profName = document.getElementById("profName");
var dwnld = document.getElementById("btn_dwnld");
app.draw = function(v) {
  ctx = canvas.getContext("2d");
  var ox = 0,
      oy = 0,
      x = 0,
      y = 0,
      X = 0,
      Y = 0,
      XAD = 0;
  function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  function drawLogo(){
    ox = (canvas.width * .9);
    oy = (canvas.height * .05);
    x = canvas.height * .1;
    y = canvas.height * .1;
    ctx.beginPath();
    ctx.moveTo(ox, (y / 2) + oy);
    ctx.lineTo((x) + ox, (y / 2) + oy);
    ctx.lineTo((x / 2) + ox, oy);
    ctx.lineTo(ox, (y / 2) + oy);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo((x / 2) + ox, (y / 2) + oy);
    ctx.arc((x / 2) + ox, (y / 2) + oy, (x * .4), 0, Math.PI);
    ctx.lineTo((x / 2) + ox, (y / 2) + oy);
    ctx.fillStyle = "#ffe39f";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo((x / 2) + ox, ((y * 3) / 4) + oy);
    ctx.arc((x / 2) + ox, ((y * 3) / 4) + oy, (x * .1), 0, Math.PI);
    ctx.lineTo((x / 2) + ox, ((y * 3) / 4) + oy);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.font = "12px Arial";
    ctx.fillText("VPH-2016", (x / 2) + ox - 28, y + 10 + oy);
  }
  function drawText(){
    ctx.font = "20px Arial";
    X = 50;
    Y = 30;
    XAD = X + 250;
    $.each(v, function(index, value) {
        if (value.can[0].length !== 1) {
            $.each(value.can, function(i, g) {
                if (i === 0) {
                    if (g !== undefined) {
                        ctx.fillText(value.pos.replace(/\s\s+/g, ' '), X, Y, XAD);
                        Y = Y + 20;
                        if (value.can.length === 1) {
                            ctx.fillText("    " + g.replace(/\s\s+/g, ' '), X, Y,XAD);
                        } else {
                            ctx.fillText(i + 1 + ": " + g.replace(/\s\s+/g, ' '), X, Y, XAD);
                        }
                    }
                } else {
                    if (g !== undefined) {
                        ctx.fillText(i + 1 + ": " + g.replace(/\s\s+/g, ' '), X, Y, XAD);
                    }
                }
                Y = Y + 20;
                if (Y > canvas.height - 30) {
                    Y = 20;
                    X = X + 330;
                };
            });
            Y = Y + 10
        }
    });
    // ctx.font = "20px Arial";
    // X = 50;
    // Y = 30;
    // XAD = X + 250;
    // function iterCan(g,i,a){
    //   if (i === 0) {
    //       if (g !== undefined) {
    //           ctx.fillText(a.pos.replace(/\s\s+/g, ' '), X, Y, XAD);
    //           Y = Y + 20;
    //           if (a.can.length === 1) {
    //               ctx.fillText("    " + g.replace(/\s\s+/g, ' '), X, Y,XAD);
    //           } else {
    //               ctx.fillText(i + 1 + ": " + g.replace(/\s\s+/g, ' '), X, Y, XAD);
    //           }
    //       }
    //   } else {
    //       if (g !== undefined) {
    //           ctx.fillText(i + 1 + ": " + g.replace(/\s\s+/g, ' '), X, Y, XAD);
    //       }
    //   }
    //   Y = Y + 20;
    //   if (Y > canvas.height - 30) {
    //       Y = 20;
    //       X = X + 330;
    //   };
    // }
    // function iterV(val, ind, arr){
    //   if (arr[0].length !== 1) {
    //       val.pos = arr[ind].pos
    //       val.forEach(iterCan)
    //       Y = Y + 10
    //   }
    // }
    // v.forEach(iterV);
  }
  function drawFB(){
    ox = (canvas.width * .8);
    oy = (canvas.height * .6);
    x = canvas.height * .25;
    y = canvas.height * .25;
    ctx.fillText(profName.innerHTML, ox-50, oy+y+30, x+100);
    var titleText = decodeURI(titleID.text)
    ctx.fillText(titleText, ox-50, oy+y+60, x+100);
    var img = new Image();
        img = document.getElementById("profImage");
        img.height = y;
        img.width = x;
        if (profImage.getAttribute('linksrc') === null){
            profImage.setAttribute('linksrc', '')
        }
        img.src = profImage.getAttribute('linksrc');
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function() {
            ctx.drawImage(img, ox, oy, x, y);
            linkImage();
        }
  }
  function linkImage(){
    dwnld.setAttribute("download", "image.png");
    dwnld.setAttribute("href", canvas.toDataURL("image/png"));
    $.mobile.loading("hide");
  }
  clear();
  drawLogo();
  drawText();
  drawFB();
  linkImage();
};
app.checkLoginState =  function (a) {
  FB.getLoginStatus(function(r) {
      statusChangeCallback(r,a);
  });
}
app.resetVote = function() {
  $.mobile.loading("show");
  $.each($("select[class=selectID]"), function(index, value) {
      $(value).val("").selectmenu("refresh");
      localStorage.removeItem($("#titleID").attr("value") + value.id);
      $(value).parent().parent().show();
  });
  var element =  document.getElementById('district-page');
  if (typeof(element) != 'undefined' && element != null)
  {
    var titleIDValue = '';
    titleIDValue = titleID.getAttribute('value') + "dist"
    if ((localStorage.getItem(titleIDValue) !== null) || (localStorage.getItem(titleIDValue) !== "")) {
        localStorage.removeItem(titleIDValue);
        $.mobile.pageContainer.pagecontainer("change", "#district-page", {});
    }
  }
  app.draw(vote);
  $.mobile.loading("hide");
}
app.saveVote = function() {
  $.mobile.loading("show");
  if (typeof(Storage) !== "undefined") {
      vote = [];
      $.each($("select[class=selectID]"), function(index, value) {
          var itemValue = '';
          itemValue = titleID.getAttribute('value') + value.id
          localStorage.setItem(itemValue, $(value).val());
          if(typeof window.orientation == 'undefined'){
            vote.push({
                "pos": $(value).parent().prev().text(),
                "can": $(value).prev().children(".selectID").text().replace(/\),\s/g, ")|").split("|")
            })
          } else {
            var can = $("option:selected", $(value)).text().replace(/\)/g, ")|").split("|")
            can.pop()
            if (can.length=="0"){
              can.push(" ")
            }
            vote.push({
                "pos": $(value).parent().parent().prev().text(),
                "can": can
            })
          }
      });
      app.draw(vote);
      $.mobile.pageContainer.pagecontainer("change", "#about-page", {});
  }
}
app.homePage = function(){
    $.mobile.loading("show");
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("o");
    }
    $.mobile.loading("hide");
}
app.initialize = function() {
  window.location.hash = '';
  $.mobile.initializePage();
  $.mobile.loading("show");
  if (typeof(Storage) !== "undefined") {
      app.initialize.initDistrict();
      $.each($("select[class=selectID]"), function(index, value) {
          var itemValue = '';
          itemValue = titleID.getAttribute('value') + value.id
          if(typeof window.orientation == 'undefined'){
            $(value).selectmenu("destroy");
            $(value).attr("data-native-menu","false");
            $(value).selectmenu();
          }
          if ((localStorage.getItem(itemValue) !== null) && (localStorage.getItem(itemValue) !== "")) {
              var b = localStorage.getItem(itemValue);
              $.each(b.split(","), function(i, v) {
                  if (v !== "") {
                      var valueOption = "#" + value.id + " option[value=" + v + "]"
                      $(valueOption).prop("selected", true);
                      $(value).selectmenu("refresh", true);
                  }
              });
          }
      });
      $.each($("select[class=selectID]"), function(index, value) {
        if(typeof window.orientation == 'undefined'){
          vote.push({
              "pos": $(value).parent().prev().text(),
              "can": $(value).prev().children(".selectID").text().replace(/\),\s/g, ")|").split("|")
          })
        } else {
          var can = $("option:selected", $(value)).text().replace(/\)/g, ")|").split("|")
          can.pop()
          if (can.length=="0"){
            can.push(" ")
          }
          vote.push({
              "pos": $(value).parent().parent().prev().text(),
              "can": can
          })
        }
      });
      app.initialize.setSelectLimit();
      app.draw(vote);
  }
  $('#profName').hide();
  $('#profImage').hide();
}
app.fbPost = function () {
  $.mobile.loading("show");
    if (profName.innerHTML==""){
      alert('Please login to Facebook.')
      return false;
    }
    var data = canvas.toDataURL("image/png");
    try {
        blob = dataURItoBlob(data);
    } catch (e) {
        console.log(e);
    }
    app.draw(vote);
    app.checkLoginState('post');
}
function getProfilePic(){
  FB.api(
      "/me/picture?type=large",
      function (response) {
        if (response && !response.error) {
          $('#profImage').show();
          var profImage = document.getElementById('profImage');
          profImage.setAttribute('linksrc', response.data.url);
          profImage.src = response.data.url
          profImage.setAttribute('crossOrigin', 'anonymous');
          app.draw(vote);
        } else {
          return false;
        }
        $.mobile.loading("hide");
      }
  );
}
function getUserName(){
  FB.api(
        "/me?fields=id,name",
        function (response) {
          $.mobile.loading("hide");
          if (response && !response.error) {
            var profName = document.getElementById('profName');
            profName.innerHTML = response.name;
            $('#profName').show();
            $.mobile.loading("show");
            getProfilePic(response);
          }
          else {
            return false;
          }
        }
    );
}
function statusChangeCallback(r, a) {
  if (r.status === 'connected') {
    $.mobile.loading("show");
    getUserName();
    if (a === 'post'){
      if (confirm("The image will be uploaded to your photo and post to your feed.")){
        var message = prompt("Write a message.", "");
        postImageToFacebook(r.authResponse.accessToken, "Canvas to Facebook", "image/png", blob, message);
      }
    }
  } else if (r.status === 'not_authorized') {
    profName.innerHTML =  "";
    profImage.src = "";
    print(vote);
  } else {
    profName.innerHTML = "";
    profImage.src = "";
    print(vote);
  }
}
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
  }
function postImageToFacebook(token, filename, mimeType, imageData, message) {
    var fd = new FormData();
    fd.append("access_token", token);
    fd.append("source", imageData);
    fd.append("no_story", true);

    //UPLOAD PHOTO TO USER
    $.mobile.loading("show");
    $.ajax({
        url: "https://graph.facebook.com/me/photos?access_token=" + token,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            //GET IMAGE LINK
            FB.api(
                "/" + data.id + "?fields=images",
                function (response) {
                    if (response && !response.error) {
                        //SHARE TO FEED
                        FB.api(
                            "/me/feed",
                            "POST",
                            {
                                "message": message,
                                "picture": response.images[0].source,
                                "link": 'http://voteph.github.io/2016/index.html',
                                "name": "Are you ready for this coming election?",
                                "description": "Share your vote to your love one and show your support to your candidates."
                            },
                            function (response) {
                                if (response && !response.error) {
                                    $.mobile.loading("hide");
                                }
                                else {
                                  alert('Sending failed. Please try again.');
                                }
                            }
                        );
                    }
                }
            );
            $.mobile.loading("hide");
        },
        error: function (shr, status, data) {
            $.mobile.loading("hide");
            alert('Sending failed. Please try again.');
            console.log("error " + data + " Status " + shr.status);
        },
        complete: function (data) {
            $.mobile.loading("hide");
            alert("Done!");
        }
    });
}
app.selectLimit = function(id, limit){
  var select = document.getElementById(id);
  select.verified = []
  $(select).on("change", function(){
    if (typeof window.orientation == "undefined") {
        var selected = $("option:selected", select).length;
        if (selected === limit) {
            $("option:not(:selected)", select).prop("disabled", true);
            $(select).selectmenu("refresh", true);
        }
        if (selected < limit) {
            $("option:disabled", select).prop("disabled", false);
            $(select).selectmenu("refresh", true);
        }
    } else {
        if (select.querySelectorAll("option:checked").length <= limit) {
            select.verified = Array.apply(null, select.querySelectorAll("option:checked"));
        } else {
            Array.apply(null, select.querySelectorAll("option")).forEach(function(e) {
                    e.selected = select.verified.indexOf(e) > -1;
                });
            alert("Please select only " + limit + " candidates.");
            $(select).selectmenu("refresh", true);
        }
    }
  })
}
