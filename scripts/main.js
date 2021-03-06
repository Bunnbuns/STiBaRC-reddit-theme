//
//CREDIT TO https://stibarc.com/
//
//main.js
function toLink(id, item) {
  try {
    if (item["deleted"]) {
      item["title"] = "Post deleted";
    }
    document.getElementById("list").innerHTML = document
      .getElementById("list")
      .innerHTML.concat('<div class="post"> <div class="flexy-boi"><div class="post-up_down">'
      )
      .concat(
        "&#8679; " +
          item["upvotes"] +
          " &#8681; " +
          item["downvotes"] +
          ""
      )+'</div> <div class="post-list-boi"> <a style="font-size:100%;text-decoration:none;" href="post.html?id='
      .concat(id)
      +'"><b>'
      .concat(
        item["title"]
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
      )+'</b></a><br><span class="posted-by">Posted by: <a href="user.html?id='
      .concat(item["poster"])
      .concat('">')
      .concat(item["poster"])
    +'</a><br></span> </div> </div> </div>';
    lastid = id;
  } catch (err) {
    console.log(err);
  }
}

function getAnnounce() {
	var sess = window.localStorage.getItem("sess");
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://api.stibarc.com/getannounce.sjs?sess="+sess,true);
	xhr.send(null);
	xhr.onload = function(e) {
		if (xhr.responseText != "\n") {
			var tmp = JSON.parse(xhr.responseText);
			document.getElementById("announce").innerHTML += '<div class="note-light yellow" style="margin:.35rem 0 1rem 0;"><h2>'+tmp['title']+'</h2><p>'+tmp['content'].replace('href="https://stibarc.com/tv/"', 'href="tv.html"')+'</p></div>';
		}
	}
}


var lastid = 1;

function loadMore() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "https://api.stibarc.com/v2/getposts.sjs?id="+lastid, false);
	xmlHttp.send(null);
	if (xmlHttp.responseText.trim() != "") {
		var tmp = JSON.parse(xmlHttp.responseText);
		var tmp2 = lastid-1;
		for (var i = tmp2; i > tmp2-20; i--) {
			toLink(i,tmp[i]);
		}
	} else {
		document.getElementById("loadmorecontainer").style.display = "none";
	}
}