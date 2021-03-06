var bg = chrome.extension.getBackgroundPage();

// rbrFd: 'My Bookmark Reader',
// delOnRead: true,
// showUnread: true,
// showUnreadColor: '#0099bb',
// openNewTab: true,
// showPopup: true

function updateOptions() {
	$('#rbrFd').val( bg.get_option('rbrFd') );
	$('#rbrFd').change(function() {
		console.log('rbrF: ' + bg.get_option('rbrFd'));
    bg.set_option( 'rbrFd', $('#rbrFd').val() );
		console.log('rbrF: ' + bg.get_option('rbrFd'));
	});

	$('#delOnRead').prop( 'checked', bg.get_option('delOnRead') );
	$('#delOnRead').click(function() {
		console.log('delOnRead: ' + bg.get_option('delOnRead'));
		bg.set_option( 'delOnRead', $('#delOnRead').prop('checked') );
		console.log('delOnRead: ' + bg.get_option('delOnRead'));
	});
	
	$('#showUnread').prop( 'checked', bg.get_option('showUnread') );
	$('#showUnread').click(function() {
		console.log('showUnread: ' + bg.get_option('showUnread'));
		bg.set_option( 'showUnread', $('#showUnread').prop('checked') );
		console.log('showUnread: ' + bg.get_option('showUnread'));
		bg.updateBadge();
	});

	$('#showUnreadColor').val( bg.get_option('showUnreadColor') );
	$("#showUnreadColor").on("change",function(){
		console.log('showUnreadColor: ' + bg.get_option('showUnreadColor'));
    bg.set_option( 'showUnreadColor', $('#showUnreadColor').val() );
		console.log('showUnreadColor: ' + bg.get_option('showUnreadColor'));
		bg.updateBadge();
	});
	
	$('#openNewTab').prop( 'checked', bg.get_option('openNewTab') );
	$('#openNewTab').click(function() {
		console.log('openNewTab: ' + bg.get_option('openNewTab'));
		bg.set_option( 'openNewTab', $('#openNewTab').prop('checked') );
		console.log('openNewTab: ' + bg.get_option('openNewTab'));
	});
	
	$('#showPopup').prop( 'checked', bg.get_option('showPopup') );
	$('#showPopup').click(function() {
		console.log('showPopup: ' + bg.get_option('showPopup'));
		bg.set_option( 'showPopup', $('#showPopup').prop('checked') );
		console.log('showPopup: ' + bg.get_option('showPopup'));
	});
}

document.addEventListener('DOMContentLoaded', function () {
	updateOptions();
});