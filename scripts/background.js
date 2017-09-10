var rbrFd = 'My Bookmark Reader';
var delOnRead = false;
var showUnread = true;
var showUnreadColor = '#0099bb';
var openNewTab = false;
var showPopup = true;

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

	////////////////////

// if (!localStorage[rbrFd])
// 	localStorage[rbrFd] = rbrFd;

// if (!localStorage[delOnRead])
// 	localStorage[delOnRead] = delOnRead;

// if (!localStorage[showUnread])
// 	localStorage[showUnread] = showUnread;

// if (!localStorage[showUnreadColor])
// 	localStorage[showUnreadColor] = showUnreadColor;

// if (!localStorage[openNewTab])
// 	localStorage[openNewTab] = openNewTab;

// if (!localStorage[showPopup])
// 	localStorage[showPopup] = showPopup;

var otherFdId = null;
var rbrFdId = null;

var unreadCount = null;

function getRbrFd() {

	chrome.bookmarks.getTree(function (bmTree) {
		otherFdId = bmTree[0].children[1].id;

		chrome.bookmarks.getChildren(otherFdId, function (folders) {
			for (var i = 0; i < folders.length; i++) {
				if (folders[i].title == get_option('rbrFd')) {
					setRbrFd(folders[i]);
					break;
				}
			}

			if (rbrFdId == null) {
				chrome.bookmarks.create({ 'parentId': otherFdId, 'title': get_option('rbrFd') }, function (newFolder) {
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

function delBm(bm) {
	console.log('DELETE? ' + get_option('delOnRead'));
	if ( get_option('delOnRead') === true ) {
		chrome.bookmarks.remove(bm.id);
		//updateBadge();
	}
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

// // set options

function set_option(option, value) {
	localStorage.setItem( option, value );
}

// document ready

document.addEventListener('DOMContentLoaded', function () {
	getRbrFd();
	console.log("test1");
});