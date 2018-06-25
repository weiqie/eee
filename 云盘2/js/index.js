(function(){	
//自适应宽高
	var section = document.querySelector('#section');
	var head = document.querySelector('#head');
	function resize(){
		var clientH = document.documentElement.clientHeight;
		section.style.height = clientH - head.offsetHeight+'px';
}
window.onresize = resize;
resize();
})();
var treeMenu=document.querySelector('.tree-menu');
var breadNav=document.querySelector('.bread-nav');
var folders=document.querySelector('.folders');
var fileItems=folders.getElementsByClassName('file-item');
//根据id找到数据中的某一项
function getId(id){
	for (var i = 0; i < data.length; i++) {
		if (data[i].id==id) {
			return data[i];
		}
	}
	return null;
}
//console.log(getId(222))
//根据id找到其的子集
function getChidrenId(id){
	var arr=[];
	for (var i = 0; i < data.length; i++) {
		if (data[i].pid==id) {
			arr.push(data[i])
		}
	}
	return arr;
}
//console.log(getChidrenId(1))
//根据传入的id生成树形结构
function fn(id){
	var childs=getChidrenId(id);
	var html='';
	if (childs.length) {
		html+='<ul>';
		for (var i = 0; i < childs.length; i++) {
			html+='<li><div id="'+childs[i].id+'" class="tree-title tree-ico close"><span>'+childs[i].title+'</span></div>';
			html+=fn(childs[i].id);
			html+='</li>';
		}
		html+='</ul>';
	}
	return html;
}
treeMenu.innerHTML= fn(-1);
//根据传入的id找到其所有父级
function getParentsId(id){
	var arr=[];
	var item=getId(id);
	if (item) {
		arr.push(item);
		arr=arr.concat(getParentsId(item.pid));
	}
	return arr;
}
//console.log(getParentsId(3333))
//根据传入的id生成导航区域的结构
function fn2(id){
	var parents=getParentsId(id).reverse();
	var html='';
	for (var i = 0; i < parents.length; i++) {
		html+='<span id="'+parents[i].id+'">'+parents[i].title+'</span>';
	}
	return html;
}
breadNav.innerHTML=fn2(1);
//根据传入的id渲染文件区域
function fn3(id){
	var childs=getChidrenId(id);
	var html='';
	if (childs.length) {
		for (var i = 0; i < childs.length; i++) {
			html+='<div id="'+childs[i].id+'" class="file-item">\
						<img id="'+childs[i].id+'" src="img/folder-b.png" alt="" />\
						<span class="folder-name">'+childs[i].title+'</span>\
						<input type="text" class="editor"/>\
						<i></i>\
					</div>';
		}
	}
	return html;
}
folders.innerHTML=fn3(1);
$('.tree-menu div[id=1]>span').css('background','yellow');
//点击树形菜单,同步渲染结构
$('.tree-menu').on('click','div',function(){
	var id=$(this).attr('id');
	breadNav.innerHTML=fn2(id);
	folders.innerHTML=fn3(id);
	console.log(id);
	$('.bread-nav span').css('background','');
	$('.bread-nav span[id="'+id+'"]').css('background','yellow');
	$('.tree-menu span').css('background','');
	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
	if (getChidrenId(id).length==0) {
		$('.folders').html('已经没有文件,请上传');
	}
	$('.checkedAll').removeClass('checked');
})
//点击文件区域,同步渲染结构
$('.folders').on('click','img',function(){
	var id=$(this).attr('id');
	breadNav.innerHTML=fn2(id);
	folders.innerHTML=fn3(id);
	$('.tree-menu span').css('background','');
	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
	$('.bread-nav span').css('background','');
	$('.bread-nav span[id="'+id+'"]').css('background','yellow');
	if (getChidrenId(id).length==0) {
		$('.folders').html('已经没有文件,请上传');
	}
	$('.checkedAll').removeClass('checked');
})
//点击导航
$('.bread-nav').on('click','span',function(){
	var id=$(this).attr('id');
	folders.innerHTML=fn3(id);
	breadNav.innerHTML=fn2(id);
	$('.bread-nav span').css('background','');
	$('.bread-nav span[id="'+id+'"]').css('background','yellow');
	$('.tree-menu span').css('background','');
	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
	if (getChidrenId(id).length==0) {
		$('.folders').html('已经没有文件,请上传');
	}
	$('.checkedAll').removeClass('checked');
})
console.log($('.checkedAll'))
//点击全选
$('.checkall').on('click','i',function(){
	var quan=$(this).toggleClass('checked').is('.checked');
	if (quan) {
		$('.folders i').addClass('checked');
	}else{
		$('.folders i').removeClass('checked');
	}
})
//点击单选
$('.folders').on('click','i',function(){
	$(this).toggleClass('checked');
	if ($('.folders i').length==$('.folders .checked').length) {
		$('.checkedAll').addClass('checked');
	}else{
		$('.checkedAll').removeClass('checked');
	}
	
})
//给框选加个状态,在多个onmousedown不互相影响
var onOff=true;
//框选
folders.onmousedown=function(ev){
	if (!$(ev.target).is('.folders')) {
		return;
	}
	var newDiv=document.createElement('div');
	newDiv.classList.add('box');
	$('newDiv').data('isAppend',false);
	var disX=ev.clientX;
	var disY=ev.clientY;
	newDiv.style.left=disX+'px';
	newDiv.style.top=disY+'px';
	document.onmousemove=function(ev){
		if (onOff) {
		//有范围只有在10个像素内才会产生div
		if (Math.abs(ev.clientX-disX)>10||Math.abs(ev.clientY-disY)>10) {
			if (!$('newDiv').data('isAppend')) {
				document.body.appendChild(newDiv);
				$('newDiv').data('isAppend',true);
			}
		}else{
			return;
		}
		newDiv.style.width=Math.abs(ev.clientX-disX)+'px';
		newDiv.style.height=Math.abs(ev.clientY-disY)+'px';
		newDiv.style.left=Math.min(ev.clientX,disX)+'px';
		newDiv.style.top=Math.min(ev.clientY,disY)+'px';
		for (var i = 0; i < fileItems.length; i++) {
			if (peng(newDiv,fileItems[i])) {
				fileItems[i].lastElementChild.classList.add('checked');
			}else{
				fileItems[i].lastElementChild.classList.remove('checked');
			}
		}
		if ($('.folders i').length==$('.folders .checked').length) {
			$('.checkedAll').addClass('checked');
		}else{
			$('.checkedAll').removeClass('checked');
		}
	};
	}
	document.onmouseup=function(){
		document.onmousedown=document.onmousemove=null;
		newDiv.remove();
	}
	return false;
}
//获取到元素到可视区域的距离
function getBonCli(el){
	return el.getBoundingClientRect();
}
//拖拽碰上返回true
function peng(tuo,peng){
	var r=getBonCli(tuo);
	var p=getBonCli(peng);
	if (r.left>p.right||r.right<p.left||r.bottom<p.top||r.top>p.bottom) {
		return false;
	}
	return true;
}
//根据传入的id找到所有子级
function getChidrenAllId(id){
	var arr=[];
	for (var i = 0; i < data.length; i++) {
		if (data[i].pid==id) {
			arr.push(data[i]);
			arr=arr.concat(getChidrenAllId(data[i].id));
		}
	}
	return arr;
}
console.log(getChidrenAllId(1))
//传入一个数组,根据数组中的id找到其所有子级
function getChidrenAllIds(ids,isSelf){
	var arr=[];
	for (var i = 0; i < ids.length; i++) {
		if (isSelf) {
			arr.push(getId(ids[i]));
		}
		arr=arr.concat(getChidrenAllId(ids[i]));
	}
	return arr;
}
//点击删除,删除一个id之后，连同这个id所有的子孙级全删除
$('#del').click(function(){
	var arr=[];
	var checkeds= $('.folders .checked').parents('.file-item');
	//先把选中的id找到添加进一个数组中;
	checkeds.each(function(index,item){
		var ids =  $(item).attr('id');
		arr.push(ids);
		return arr;
	})
	console.log(arr)
	var a=getChidrenAllIds(arr,true);
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < data.length; j++) {
			if (a[i].id==data[j].id) {
				data.splice(j,1);
				break;
			}
		}
	}
	treeMenu.innerHTML= fn(-1);
	breadNav.innerHTML=fn2(1);
	folders.innerHTML=fn3(1);
	$('.checkedAll').removeClass('checked');
	console.log(data)	;
})
//根据传入的id,找到其下的子级,判断是否包含这个name,包含返回true,不包含返回false;
function isChidrenName(id,title){
	var childs=getChidrenId(id);
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].title==title) {
			return true;
		}
	}
	return false;
}
//console.log(isChidrenName(1,'我的文'));
//点击重命名
$('#rename').click(function(){
	var checkeds= $('.folders .checked').parents('.file-item');
	if (checkeds.length===0) {
		return;
	}
	if (checkeds.length!==1) {
		alert('不能同时选中多个文件');
	}else{
		checkeds.find('span').css('display','none');
		checkeds.find('input').css('display','block');
		checkeds.find('input').focus();	
	}
	document.onmousedown=function(ev){
		if (ev.target.nodeName=='INPUT') {
			return;
		}
		onOff=false;
		var navId=$('.bread-nav span:last-child').attr('id');
		console.log(navId);
		var inp=checkeds.find('input');
	    var value=inp.val();
	    if (isChidrenName(navId,value)) {
	    	alert('名字不能相同  重命名不成功');
			return;
	    }else if (checkeds.length!==1) {
	    	return;
	    }else if(value===''){
	    	alert('不能为空,重命名不成功');
	    	return;
	    }else{
	    	checkeds.find('span').css('display','block');
			inp.css('display','none');
			checkeds.find('span').text(value);
			onOff=true;
	    }
		checkeds.each(function(index,item){
			var id =  $(item).attr('id');
			for (var i = 0; i < data.length; i++) {
				if (data[i].id==id) {
					data[i].title=value;
				}
			}
			treeMenu.innerHTML= fn(-1);
			breadNav.innerHTML=fn2(1);
			folders.innerHTML=fn3(1);
        });
	}
})
//点击新建文件夹
$('#create').click(function(){
	var newDiv=document.createElement('div');
	newDiv.classList.add('file-item');
	newDiv.innerHTML='<img src="img/folder-b.png" alt="" />\
						<span class="folder-name">新建文件夹</span>\
						<input type="text" class="editor"/>\
						<i></i>';
	folders.insertBefore(newDiv,folders.firstElementChild);
	var folderName=newDiv.querySelector('.folder-name');
	var editor=newDiv.querySelector('.editor');
	folderName.style.display='none';
	editor.style.display='block';
	editor.focus();
	document.onmousedown=function(){
//		onOff=false;
		var val=editor.value;
		if (val==='') {
//			alert('名字不能为空,新建不成功');
			newDiv.remove();
		}
		folderName.style.display='block';
		editor.style.display='none';
		folderName.innerText=val;
	}
})


