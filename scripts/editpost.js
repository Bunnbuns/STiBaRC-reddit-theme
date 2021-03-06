//
//CREDIT TO https://stibarc.com/
//
//editpost.js
function toLink(item) {
	try {
		var i = item.indexOf(':');
		var splits = [item.slice(0, i), item.slice(i + 1)];
		document.getElementById("list").innerHTML = document.getElementById("list").innerHTML.concat('<li><a href="post.html?id=').concat(splits[0]).concat('">').concat(splits[1]).concat("</a></li>");

	} catch (err) {
		console.log("Whoops");
	}
}

function post() {
	var content = document.getElementById("content").value;
	var title = document.getElementById("title").value;
	var sess = window.localStorage.getItem("sess");
	var id = getAllUrlParams().id;
	if (content != "" && content != undefined && title != "" && title != undefined) {
		var thing = new XMLHttpRequest();
		thing.open("POST", "https://api.stibarc.com/editpost.sjs", false);
		thing.send("sess="+sess+"&id="+id+"&title="+encodeURIComponent(title)+"&content="+encodeURIComponent(content).replace(/%0A/g, "%0D%0A"));
		location.href = "post.html?id=" + id;
		document.getElementById("content").value = "";
		document.getElementById("title").value = "";
	}
}

function doneLoading() {
    document.getElementById("load").style.display = "none";
    document.getElementById("page").style.display = "";
}

window.onload = function () {
    sessCheck();
      document.getElementById("sm-search-bar").style.display = "none";
      document.getElementById("search-btn").onclick = function(evt) {
        searchBtnClicked();
      };
	var id = getAllUrlParams().id;
	if (id != "" && id != undefined) {
		var thing = new XMLHttpRequest();
		thing.open("GET", "https://api.stibarc.com/getpost.sjs?id="+id, false);
		thing.send(null);
		var tmp = JSON.parse(thing.responseText);
		document.getElementById("title").value = tmp['title'];
		document.getElementById("content").value = tmp['content'];
		document.getElementById("send").onclick = function (evt) {
			post();
		}
	}
}
