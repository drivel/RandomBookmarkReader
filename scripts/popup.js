// connect to background script
var bg = chrome.extension.getBackgroundPage();

function makeItSo() {
	$('#bookmarks').empty();
	chrome.bookmarks.getChildren(bg.rbrFdId, function (bmArr) {
		if (bmArr.length == 0) {
			$('body').empty();
			$('<p class="empty">No bookmarks found.</p>').appendTo('body');
		} else {
			$.each(bmArr, function (pos, bm) {
				$('<li id="' + bm.id + '" title="' + bm.title + '&#13;' + bm.url + '">').appendTo('#bookmarks');
				$('<h2><img src="chrome://favicon/' + bm.url + '" width="16" height="16"> ' + bm.title + '</h2>').appendTo('li#' + bm.id);
				$('<a>' + bm.url + '</a>').appendTo('li#' + bm.id);
			});
	
			$('li').click(function () {
				chrome.bookmarks.get(this.id, function (bm) {
					chrome.tabs.update(null, { url: bm[0].url });

					bg.delBm(bm[0]);
					self.close();
				});
			});

		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	makeItSo();
});