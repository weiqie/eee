window.onload=function(){
	var inputText=document.querySelector('.testQQ .inputText');
	var btn=document.querySelector('.testQQ .btn');
	var tips=document.querySelector('.tips');
	var tip=document.querySelector('.tip');
//	1. 输入纯数字，不是纯数字，提示“请输入数字”
//	2. 数字个数在5 ~ 10位之间，包含5为和10位，输入的个数不够，提醒：输入的数字必须在5位以上、10位以内
//
//	3. 不能0开头，如果0开头，提醒“不能有0在前面”
//	4. 以上所有通过，提示“QQ通过”
	btn.onclick=function(){
		if(isNaN(inputText.value)){
			tips.style.display='block';
		}else if(inputText.value.length<5){
			tips.style.display='block';
			tip.innerHTML='输入的数字必须在5位以上 、10位以内';
		}else if(inputText.value.length>10){
			tips.style.display='block';
			tip.innerHTML='输入的数字必须在10位以内';
		}else if(inputText.value.charAt(0)<1){
			tips.style.display='block';
			tip.innerHTML='不能有0在前面';
		}else if (parseFloat(inputText.value)!==parseInt(inputText.value)) {
			tips.style.display='block';
			tip.innerHTML='不能为小数';
		}else{
			tips.style.display='block';
			tip.innerHTML='QQ通过';
		}
		
	}
}
