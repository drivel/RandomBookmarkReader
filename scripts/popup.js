// connect to background script
var bg = chrome.extension.getBackgroundPage();

function makeItSo() {

	// TODO sloppy, get info from updateBadge();
	chrome.bookmarks.getChildren(bg.rbrFdId, function (bmArr) {
		var unreadCount = bmArr.length;

		if (unreadCount !== 0) {

			$("body").empty();
			$("<ul class='bookmarks'>").appendTo("body")
			$.each(bmArr, function (pos, bm) {
				$('<li id="' + bm.id + '" title="' + bm.title + '&#13;' + bm.url + '">').appendTo('.bookmarks');
				$('<h2><img src="chrome://favicon/' + bm.url + '" width="16" height="16" class="icon"> ' + bm.title + '</h2>').appendTo('li#' + bm.id);
				$('<a>' + bm.url + '</a>').appendTo('li#' + bm.id);
			});

			$("li").mousedown(function(e) {
				btnCode = e.button;

				bg.openLink(this.id, e.button);

				if (btnCode !== 2) {
					self.close();
				}
			});

		}

		bg.updateBadge();
	});
}

document.addEventListener('DOMContentLoaded', function () {
	makeItSo();
});