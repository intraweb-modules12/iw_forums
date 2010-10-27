function chgUsers(gid){
	var pars = "module=iw_forums&func=chgUsers&gid=" + gid;
        showinfo();
	var myAjax = new Ajax.Request("ajax.php", 
	{
		method: 'get', 
		parameters: pars, 
		onComplete: chgUsers_response,
		onFailure: chgUsers_failure
	});
}

function chgUsers_failure(){
        showinfo();
	Element.update('uid', '').innerHTML;
}

function chgUsers_response(req){
	if (req.status != 200 ) { 
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	showinfo();
	Element.update('uid', json.content).innerHTML;
}

/**
 * Show a bus while ajax process
 * called twice: 
 * #1: Show the icon
 * #2: restore normal display
 *
 *@return none;
 *@author Albert Pérez Monfort
 */
function showinfo()
{
	var info = 'chgInfo';

	if(!Element.hasClassName(info, 'pn-hide')) {
		Element.update(info, '&nbsp;');
		Element.addClassName(info, 'pn-hide');
	} else {
		Element.update(info, '<img src="images/ajax/circle-ball-dark-antialiased.gif">');
		Element.removeClassName(info, 'pn-hide');
	}
}

function modifyField(fid,char){
	showfieldinfo(fid, modifyingfield);
	var pars = "module=iw_forums&func=modifyForum&fid=" + fid + "&char=" + char;
	var myAjax = new Ajax.Request("ajax.php", 
	{
		method: 'get', 
		parameters: pars, 
		onComplete: modifyField_response,
		onFailure: modifyField_failure
	});
}

function modifyField_response(req){
	if (req.status != 200 ){
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);

	changeContent(json.fid);
}

function modifyField_failure(){

}

function showfieldinfo(fndid, infotext){
    if(fndid) {
        var info = 'foruminfo_' + fndid;
        if(!Element.hasClassName(info, 'pn-hide')) {
            Element.update(info, '&nbsp;');
            Element.addClassName(info, 'pn-hide');
        } else {
            Element.update(info, infotext);
            Element.removeClassName(info, 'pn-hide');
        }
    } else {
        $A(document.getElementsByClassName('fieldinfo')).each(function(info){
            Element.update(info, '&nbsp;');
            Element.addClassName(info, 'pn-hide');
        });
    }
}

function changeContent(fid){
	var pars = "module=iw_forums&func=changeContent&fid=" + fid;
	var myAjax = new Ajax.Request("ajax.php", 
	{
		method: 'get', 
		parameters: pars, 
		onComplete: changeContent_response,
		onFailure: changeContent_failure
	});
}

function changeContent_response(req){
	if (req.status != 200 ) { 
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	Element.update('forumChars_'+json.fid, json.content).innerHTML;

}

function changeContent_failure(){

}

function mark(fid,fmid){
	var pars = "module=iw_forums&func=mark&fid=" + fid + "&fmid=" + fmid;
	var myAjax = new Ajax.Request("ajax.php", 
	{
		method: 'get', 
		parameters: pars, 
		onComplete: mark_response,
		onFailure: mark_failure
	});
}

function mark_failure(){
}

function mark_response(req){
	if (req.status != 200 ) { 
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	if (json.reloadFlags) {
		reloadFlaggedBlock();
	}
	if(json.m == 1){
		$(json.fmid).src="modules/iw_forums/pnimages/marcat.gif";
		$("msgMark" + json.fmid).src="modules/iw_forums/pnimages/marcat.gif";
		Element.update('msgMark' + json.fmid, json.fmid).innerHTML;
	}else{
		$(json.fmid).src="modules/iw_forums/pnimages/res.gif";
		$("msgMark" + json.fmid).src="modules/iw_forums/pnimages/res.gif";
		Element.update('msgMark' + json.fmid, json.fmid).innerHTML;
	}
}

function deleteGroup(gid,fid){
	var response = confirm(deleteConfirmation);
	if(response){
		var pars = "module=iw_forums&func=deleteGroup&gid=" + gid + "&fid=" + fid;
		Element.update('groupId_' + gid + '_' + fid, '<img src="images/ajax/circle-ball-dark-antialiased.gif">');
		var myAjax = new Ajax.Request("ajax.php", 
		{
			method: 'get', 
			parameters: pars, 
			onComplete: deleteGroup_response,
			onFailure: deleteGroup_failure
		});
	}
}

function deleteGroup_failure(){
}

function deleteGroup_response(req){
	if (req.status != 200 ) { 
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	$('groupId_' + json.gid + '_' + json.fid).toggle()
}

function deleteModerator(fid,id){
	var response = confirm(deleteModConfirmation);
	if(response){
		var pars = "module=iw_forums&func=deleteModerator&id=" + id + "&fid=" + fid;
		Element.update('mod_' + fid + '_' + id, '<img src="images/ajax/circle-ball-dark-antialiased.gif">');
		var myAjax = new Ajax.Request("ajax.php", 
		{
			method: 'get', 
			parameters: pars, 
			onComplete: deleteModerador_response,
			onFailure: deleteModerador_failure
		});
	}
}

function deleteModerador_failure(){
}

function deleteModerador_response(req){
	if (req.status != 200 ) { 
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	$('mod_' + json.fid + '_' +json. id).toggle()
}

function openMsg(fmid,fid,ftid,u,oid,inici){
	var pars = "module=iw_forums&func=openMsg&fmid=" + fmid + "&fid=" + fid + "&ftid=" + ftid + "&u=" + u + "&oid=" + oid + "&inici=" + inici;
	$('openMsgIcon_' + fmid).src="images/ajax/circle-ball-dark-antialiased.gif";
	var myAjax = new Ajax.Request("ajax.php", 
	{
		method: 'get', 
		parameters: pars, 
		onComplete: openMsg_response,
		onFailure: openMsg_failure
	});
}

function openMsg_response(req){
	if (req.status != 200 ) {
		pnshowajaxerror(req.responseText);
		return;
	}
	var json = pndejsonize(req.responseText);
	Element.update('openMsgRow_' + json.fmid, json.content).innerHTML;
	$('openMsgIcon_' + json.fmid).toggle();
	$('msgImage_' + json.fmid).src="modules/iw_forums/pnimages/msg.gif";
}

function openMsg_failure(){

}

function closeMsg(fmid){
	Element.update('openMsgRow_' + fmid, '').innerHTML;
	$('openMsgIcon_' + fmid).src="modules/iw_forums/pnimages/msgopen.gif";
	$('openMsgIcon_' + fmid).toggle();
}
