var rbrOption = {
	rbrFd: 'My Bookmark Reader',
	delOnRead: true,
	showUnread: true,
	showUnreadColor: '#0099bb',
	openNewTab: true,
	showPopup: true
};

if (!localStorage[rbrOption['rbrFd']])
	localStorage[rbrOption['rbrFd']] = rbrOption['rbrFd'];

if (!localStorage[rbrOption['delOnRead']])
	localStorage[rbrOption['delOnRead']] = rbrOption['delOnRead'];

if (!localStorage[rbrOption['showUnread']])
	localStorage[rbrOption['showUnread']] = rbrOption['showUnread'];

if (!localStorage[rbrOption['showUnreadColor']])
	localStorage[rbrOption['showUnreadColor']] = rbrOption['showUnreadColor'];

if (!localStorage[rbrOption['openNewTab']])
	localStorage[rbrOption['openNewTab']] = rbrOption['openNewTab'];

if (!localStorage[rbrOption['showPopup']])
	localStorage[rbrOption['showPopup']] = rbrOption['showPopup'];

var otherFdId = null;
var rbrFdId = null;

var unreadCount = null;

function getRbrFd() {

	chrome.bookmarks.getTree(function (bmTree) {
		otherFdId = bmTree[0].children[1].id;

		chrome.bookmarks.getChildren(otherFdId, function (folders) {
			for (var i = 0; i < folders.length; i++) {
				if (folders[i].title == rbrOption['rbrFd']) {
					setRbrFd(folders[i]);
					break;
				}
			}

			if (rbrFdId == null) {
				chrome.bookmarks.create({ 'parentId': otherFdId, 'title': rbrOption['rbrFd'] }, function (newFolder) {
					setRbrFd(newFolder);
				})
			}
		});

	});
}

function setRbrFd(folder) {
	rbrFdId = folder.id;

	chrome.bookmarks.getChildren(rbrFdId, function (folder) {
		unreadCount = folder.length.toString();
		
		//updateBadge(unreadCount);
	});
}

// function updateBadge(unreadCount) {
// 	if (!rbrOption['showUnread']) {
// 		chrome.browserAction.setBadgeText({ text: '' });
// 	} else {
// 		chrome.browserAction.setBadgeText({ text: unreadCount });
// 	}
	
// 	chrome.browserAction.setBadgeBackgroundColor({ color: rbrOption['showUnreadColor'] });
// }

function delOnRead(bm) {
	if (rbrOption['delOnRead']) {
		chrome.bookmarks.remove(bm.id);
		//updateBadge();
	}
}

// get options

function get_option(option) {
	return localStorage[rbrOption[option]];
}

// // set options

function set_option(option, value) {
	return localStorage[rbrOption[option]] = value;
}

// document ready

document.addEventListener('DOMContentLoaded', function () {
	getRbrFd();
});