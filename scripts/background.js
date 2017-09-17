// options

var rbrFd = 'My Bookmark Reader';
var delOnRead = false;
var showUnread = true;
var showUnreadColor = '#0099bb';
var openNewTab = false;
var showPopup = true;

// populate local storage if empty

if (!localStorage.getItem('rbrFd'))
	localStorage.setItem( 'rbrFd', rbrFd );

if (!localStorage.getItem('delOnRead'))
	localStorage.setItem( 'delOnRead', delOnRead );

if (!localStorage.getItem('showUnread'))
	localStorage.setItem( 'showUnread', showUnread );

if (!localStorage.getItem('showUnreadColor'))
	localStorage.setItem( 'showUnreadColor', showUnreadColor );

if (!localStorage.getItem('openNewTab'))
	localStorage.setItem( 'openNewTab', openNewTab );

if (!localStorage.getItem('showPopup'))
	localStorage.setItem( 'showPopup', showPopup );

var otherFdId = null;
var rbrFdId = null;

// TODO
var unreadCount = "";

// get bookmark folder or create one

function getRbrFd() {

	chrome.bookmarks.getTree(function (bmTree) {
		otherFdId = bmTree[0].children[1].id;

		chrome.bookmarks.getChildren(otherFdId, function (folders) {

			for (var i = 0; i < folders.length; i += 1) {
				if (folders[i].title === get_option('rbrFd')) {
					setRbrFd(folders[i]);
					break;
				}
			}

			if (rbrFdId === null) {
				chrome.bookmarks.create({ 'parentId': otherFdId, 'title': get_option('rbrFd') }, function (newFolder) {
					setRbrFd(newFolder);
				})
			}
		});

	});
}

// set bookmark folder ID

function setRbrFd(folder) {
	rbrFdId = folder.id;
	
	updateBadge();
}

function updateBadge() {

	if (get_option("showUnread")) {
		chrome.bookmarks.getChildren(rbrFdId, function (bmArr) {
			var unreadCount = bmArr.length;
			
			chrome.browserAction.setBadgeText({ text: unreadCount.toString() });
		});
	} else {
		var unreadCount = "";
		chrome.browserAction.setBadgeText({ text: unreadCount.toString() });
	}

	chrome.browserAction.setBadgeBackgroundColor({ color: get_option("showUnreadColor") });
}

// open bookmark

function openLink(itemID, button) {

	chrome.bookmarks.get(itemID, function(bm) {
		if (get_option('openNewTab') || button === 1) {
			chrome.tabs.create({ url: bm[0].url });
		} else {
			chrome.tabs.update(null, { url: bm[0].url });
		}

		delBm(bm[0]);
	});

}

// delete bookmark

function delBm(bm) {
	if ( get_option('delOnRead') === true ) {
		chrome.bookmarks.remove(bm.id, function () {
			updateBadge();
		});
	}

	// updateBadge();
}

// get options

function get_option(option) {
	value = localStorage.getItem(option);

	// enforce boolean if boolean
	switch (value) {
		case 'true':
			return true;
			break;
		case 'false':
			return false;
			break;
		default:
			return value;
	}
}

// set options

function set_option(option, value) {
	localStorage.setItem( option, value );
}

// document ready

document.addEventListener('DOMContentLoaded', function () {
	getRbrFd();
});