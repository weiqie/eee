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
//定义一些不变的量
var WARN='warn';
var OK='ok';
var treeMenu=document.querySelector('.tree-menu');
var breadNav=document.querySelector('.bread-nav');
var folders=document.querySelector('.folders');
var fileItems=folders.getElementsByClassName('file-item');
var fullTipBox=$('.full-tip-box');
var tipText=fullTipBox.find('.tip-text');
var time=null;
//封装提醒框函数
function tip(className,value){
	fullTipBox.css('top',-32);
	fullTipBox[0].style.transition='none';
	tipText.text(value);
	fullTipBox.removeClass(WARN+' ' + OK).addClass(className);
	setTimeout(function(){
		fullTipBox.css('top',0);
		fullTipBox[0].style.transition='0.3s';
	})
	clearTimeout(time);
	time=setTimeout(function(){
		fullTipBox.css('top',-32);
	},2000)
}
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
//根据传入的id使其高亮
function getIdBackground(id){
	$('.tree-menu div>span').css('background','');
	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
}
getIdBackground(1);
//点击树形菜单,同步渲染结构
$('.tree-menu').on('click','div',function(){
	var id=$(this).attr('id');
	breadNav.innerHTML=fn2(id);
	folders.innerHTML=fn3(id);
	console.log(id);
	$('.bread-nav span').css('background','');
	$('.bread-nav span[id="'+id+'"]').css('background','yellow');
//	$('.tree-menu span').css('background','');
//	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
	getIdBackground(id);
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
//	$('.tree-menu span').css('background','');
	$('.tree-menu div[id="'+id+'"]').next('ul').css('display','block');
	getIdBackground(id);
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
//	$('.tree-menu span').css('background','');
//	$('.tree-menu div[id="'+id+'"]>span').css('background','yellow');
	getIdBackground(id);
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
//传入一个数组,根据数组中的id找到其所有子级;第二个参数为true和false,判断是否包含其自身
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
	var checkeds= $('.folders .checked').parents('.file-item');
	if (checkeds.length===0) {
		return;
	}
	$('#tanbox').show();
	$('#tanbox .ok').off('click');
	$('#tanbox .ok').click(function(){
		var arr=[];
		$('#tanbox').hide();
			//先把选中的id找到添加进一个数组中;
		checkeds.each(function(index,item){
			var ids =  $(item).attr('id');
			arr.push(ids);
			return arr;
		})
		console.log(arr)
		//获取到其所有子集
		var a=getChidrenAllIds(arr,true);
		for (var i = 0; i < a.length; i++) {
			for (var j = 0; j < data.length; j++) {
				if (a[i].id==data[j].id) {
					data.splice(j,1);
					break;
				}
			}
		}
		var navId=$('.bread-nav span:last-child').attr('id');
		treeMenu.innerHTML= fn(-1);
		folders.innerHTML=fn3(navId);
		getIdBackground(navId);
		$('.checkedAll').removeClass('checked');
		$('.tree').html(fn(-1));
		tip(OK,'删除成功');
		console.log(data);
		if ($('.file-item').length===0) {
			$('.folders').html('已经没有文件,请上传');
		}
	})
})
$('#tanbox .quxiao').click(function(){
	$('#tanbox').hide();
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
//指定id找到所有兄弟
function getByIdBroters(id){
	var self=getId(id);//通过id找到自己;
	var arr=[];
	for (var i = 0; i < data.length; i++) {
		if (data[i].pid==self.pid) {
			arr.push(data[i]);
		}
	}
	return arr;
}
//指定id,和其所有兄弟对比,看是否存在这个名字
function getByIdBrotersName(id,title){
	var broters=getByIdBroters(id).filter(function(item){
		return item.id!=id;
	})
	for (var i = 0; i < broters.length; i++) {
		if (broters[i].title==title) {
			return true;
		}
	}
	return false;
}
console.log(getByIdBrotersName(111,'我的电影'))
//点击重命名
$('#rename').click(function(){
	var checkeds= $('.folders .checked').parents('.file-item');
	if (checkeds.length===0) {
		tip(WARN,'请选择文件才能重命名');
		return;
	}
	if (checkeds.length!==1) {
		tip(WARN,'不能同时选中多个文件');
	}else{
		checkeds.find('span').css('display','none');
		checkeds.find('input').css('display','block').focus().val(checkeds.find('span').text()).select();
		//正在重命名
		$('#rename').data('isRename',true)
	}
	document.onmousedown=function(ev){
		console.log(1)
		if (!$('#rename').data('isRename')) {
			return;
		}
//		if (ev.target.nodeName=='INPUT') {
//			return;
//		}
		var navId=$('.bread-nav span:last-child').attr('id');
		var id=checkeds.attr('id');
		console.log(navId);
		var span = checkeds.find('span');
		var inp=checkeds.find('input');
	    var value=inp.val().trim();
	    if (getByIdBrotersName(id,value)) {
	    	tip(WARN,'名字不能相同  重命名不成功');
	    	inp.hide();
			span.show();	    	return;
	    }else if (checkeds.length!==1) {
	    	return;
	    }else if(value===''){
	    	tip(WARN,'不能为空,重命名不成功');
	    	inp.hide();
			span.show();	    	return;
	    }else{
	    	checkeds.find('span').css('display','block');
			inp.css('display','none');
			checkeds.find('span').text(value);
			$('.tree').html(fn(-1));
			tip(OK,'重命名成功');
	    }
		checkeds.each(function(index,item){
			var id =  $(item).attr('id');
			for (var i = 0; i < data.length; i++) {
				if (data[i].id==id) {
					data[i].title=value;
				}
			}
			treeMenu.innerHTML= fn(-1);
			getIdBackground(navId);
        });
        $('#rename').data('isRename',false);
	}
})
var isCreate=false;
//点击新建文件夹
$('#create').click(function(){
	isCreate=true;
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
		var navId=$('.bread-nav span:last-child').attr('id');
		if (isCreate) {
			var navId=$('.bread-nav span:last-child').attr('id');
			var val=editor.value;
			if (val==='') {
				tip(WARN,'名字不能为空,新建不成功');
				newDiv.remove();
				isCreate=false;
			}else if(isChidrenName(navId,val)){
				tip(WARN,'文件夹名字不能存在相同的,新建不成功');
				newDiv.remove();
				isCreate=false;
			}else{
				isCreate=false;
				onOff=true;
				folderName.style.display='block';
				editor.style.display='none';
				folderName.innerText=val;
				var childId=new Date().getTime();
				//新建成功在数据中添加这项
				data.unshift({
					id:childId,
					title:val,
					pid:navId
				});
				treeMenu.innerHTML= fn(-1);
//				breadNav.innerHTML=fn2(navId);
				getIdBackground(navId);
				folders.innerHTML=fn3(navId);
				$('.bread-nav span').css('background','');
				$('.bread-nav span[id="'+navId+'"]').css('background','yellow');
				$('.checkedAll').removeClass('checked');
				$('.tree').html(fn(-1));
				tip(OK,'新建成功');
				console.log(data);
			}
		}
		onOff=true;
	}
})
$('.tree').html(fn(-1));
var treeId='';
//点击弹框的树状结构
$('.tree').on('click','div',function(){
	var id=$(this).attr('id');
	$('.tree span').css('background','');
	$('.tree div[id="'+id+'"]>span').css('background','yellow');
	treeId=id;
})
//点击移动到,如果有选中的就出现弹出框
$('#remove').click(function(){
//	var arr=[];
//	var navId=$('.bread-nav span:last-child').attr('id');
	var checkeds= $('.folders .checked').parents('.file-item');
//	checkeds.each(function(index,item){
//		var id=$(item).attr('id');
//		arr.push(id);
//		return arr;
//	})
//	//获取到其父级
//	var b=getId(navId);
//	//获取到其所有的子级,包含子集
//	var a=getChidrenAllIds(arr,true);
//	//获取到选中的子级和父级
//	var c=a.concat(b);
//	console.log(c)
	if (checkeds.length==0) {
		tip(WARN,'请选择文件移动');
		return;
	}else{
		$('#tan-move').css('display','block');
	}
})
//点击X;
$('.cha').click(function(){
	$('#tan-move').css('display','none');
})
//点击取消
$('#quxiao').click(function(){
	$('#tan-move').css('display','none');
})
//点击确定时进行判断,不能把选中的文件移动到自身和它的子级;
//1.改变选中文件的pid为弹框选中文件的id;
//2.怎么改变数据中选中文件的pid,先遍历数据,找到数据中选中的id;
$('#queding').click(function(){
	var arr=[];
	var navId=$('.bread-nav span:last-child').attr('id');
	var checkeds= $('.folders .checked').parents('.file-item');
	checkeds.each(function(index,item){
		var id=$(item).attr('id');
		arr.push(id);
		return arr;
	})
	//获取到其父级
	var b=getId(navId);
	//获取到其所有的子级,包含自己
	var a=getChidrenAllIds(arr,true);
	//获取到选中的子级和父级
	var c=a.concat(b);
	console.log(c);
	for (var i = 0; i < c.length; i++) {
		if (c[i].id==treeId) {
			tip(WARN,'不能添加在它的父级和子级中');
			return;
		}
	}
	console.log(arr)
	console.log(treeId)
	for (var k = 0; k < arr.length; k++) {
		console.log(6666)
		for (var j = 0; j < data.length; j++) {
			console.log(666)
			if (data[j].id==arr[k]) {
				data[j].pid=treeId;
				break;
			}
		}
	}
	console.log(data);
	treeMenu.innerHTML= fn(-1);
	breadNav.innerHTML=fn2(treeId);
	getIdBackground(treeId);
	folders.innerHTML=fn3(treeId);
	$('.bread-nav span').css('background','');
	$('.bread-nav span[id="'+treeId+'"]').css('background','yellow');
	$('#tan-move').css('display','none');
	tip(OK,'移动成功');
})
var oUl=document.querySelectorAll('.tree-menu ul');
var divs=document.querySelectorAll('.tree-menu div');
console.log(oUl)
console.log(divs)
//点击树形结构,展开与收缩
for (var i = 2; i < oUl.length; i++) {
	oUl[i].style.display='none';
}
for (var i = 0; i < divs.length; i++) {
	divs[i].onclick=function(){
		if (this.nextElementSibling) {
//			找到点击的div父级的父级ul
			var spp=this.parentNode.parentNode;
//			通过spp找到它下面所有的ul
			var uls=spp.querySelectorAll('ul');
			for (var i = 0; i < uls.length; i++) {
//				排除了点击的div的兄弟节点ul,让所有的ul隐藏,再统一它的状态
				if (uls[i]!==this.nextElementSibling) {
					uls[i].style.display='none';
					uls[i].isShow=false;
				}
			}
			if(this.nextElementSibling.isShow){
				this.nextElementSibling.style.display = 'none'
				this.nextElementSibling.isShow = false;
			}else{
				this.nextElementSibling.style.display = 'block'
				this.nextElementSibling.isShow = true;
			}
		}
	}
}



