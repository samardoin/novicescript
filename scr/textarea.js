var tabHit = function(ta, event){
  let keyCode;
  if (event.keyCode) keyCode = event.keyCode;
  else if (event.charCode) keyCode = event.charCode;
  else {keyCode = event.which;}

  let tabKey = 9;
  let noOtherKey = (!event.shiftKey && !event.ctrlKey && !event.altKey);
	if (keyCode == tabKey && noOtherKey){
		let scrollTop = ta.scrollTop;
		if (ta.setSelectionRange){
			let selectionStart = ta.selectionStart;
			let selectionEnd = ta.selectionEnd;
			ta.value = ta.value.substring(0, selectionStart) + "\t" + ta.value.substr(selectionEnd);
			ta.setSelectionRange(selectionStart + 1, selectionStart + 1);
			ta.focus();
		}
		else if (ta.createTextRange){
			document.selection.createRange().text = "\t";
			event.returnValue = false;
		}
		ta.scrollTop = scrollTop;
		if (event.preventDefault) event.preventDefault();
		return false;
	}
	return true;
}
