window.onload = function(){
	//运行瀑布流主函数
	PBL('wrap','box');
	//模拟数据
	var data = [
					{'src':'1.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'2.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'3.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'4.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'5.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'6.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'7.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'8.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'9.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
					{'src':'10.jpg','title':'百朋信息科技','price':'234','like':'menu/like.png','num':'56465'},
				];
	
	
	//设置滚动加载
	window.onscroll = function(){
		//校验数据请求
		if(getCheck()){
			var wrap = document.getElementById('wrap');
			for(i in data){
				//创建box
				var box = document.createElement('div');
				box.className = 'box';
				wrap.appendChild(box);
				//创建info
				var info = document.createElement('div');
				info.className = 'info';
				box.appendChild(info);
				//创建pic
				var pic = document.createElement('div');
				pic.className = 'pic';
				info.appendChild(pic);
				//创建a链接
				var a_link = document.createElement("a");
				a_link.href = './details.html';
				pic.appendChild(a_link);
				//创建img
				var img = document.createElement('img');
				img.src = 'images/'+data[i].src;
				img.style.height = 'auto';
				a_link.appendChild(img);
				//创建title
				var title = document.createElement('div');
				title.className = 'title';
				info.appendChild(title);
				//创建a标记
				var a = document.createElement('a');
				a.className = 'a_title';
				a.innerHTML = data[i].title;
				title.appendChild(a);
				//创建span标记
				var span1 = document.createElement('span');
				span1.className = 'float1';
				span1.innerHTML = data[i].price;
				title.appendChild(span1);
				//创建点赞span
				var span2 = document.createElement('span');
				span2.className = 'float2';
				title.appendChild(span2);
				//创建img点赞图片
				var img2 = document.createElement('img');
				img2.src = 'images/'+data[i].like;
				img2.style.width = '20px';
				span2.appendChild(img2);
				//创建b标签
				var b = document.createElement("b");
				b.innerHTML = data[i].num;
				span2.appendChild(b);
			}
			PBL('wrap','box');
		}
		/*<div class="box">
                <div class="info">
                    <div class="pic"><img src="images/2.jpg"></div>
                    <div class="title">
                    	<a href="#" class="a_title">White Strong</a>
                        <span class="float1">￥234</span>
                        <span class="float2"><img src="images/menu/unlike.png" width="20" alt=""> <b>56465</b></span>
                    </div>
                </div>
          </div>*/
	}
}
/**
* 瀑布流主函数
* @param  wrap	[Str] 外层元素的ID
* @param  box 	[Str] 每一个box的类名
*/
function PBL(wrap,box){
	//	1.获得外层以及每一个box
	var wrap = document.getElementById(wrap);
	var boxs  = getClass(wrap,box);
	//	2.获得屏幕可显示的列数
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
	wrap.style.width = boxW*colsNum+'px';//为外层赋值宽度
	//	3.循环出所有的box并按照瀑布流排列
	var everyH = [];//定义一个数组存储每一列的高度
	for (var i = 0; i < boxs.length; i++) {
		if(i<colsNum){
			everyH[i] = boxs[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,everyH);//获得最小的列的高度
			var minIndex = getIndex(minH,everyH); //获得最小列的索引
			getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
			everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
		}
	}
}
/**
* 获取类元素
* @param  warp		[Obj] 外层
* @param  className	[Str] 类名
*/
function getClass(wrap,className){
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == className){
			arr.push(obj[i]);
		}
	}
	return arr;
}
/**
* 获取最小列的索引
* @param  minH	 [Num] 最小高度
* @param  everyH [Arr] 所有列高度的数组
*/
function getIndex(minH,everyH){
	for(index in everyH){
		if (everyH[index] == minH ) return index;
	}
}
/**
* 数据请求检验
*/
function getCheck(){
	var documentH = document.documentElement.clientHeight;
	var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
	return documentH+scrollH>=getLastH() ?true:false;
}
/**
* 获得最后一个box所在列的高度
*/
function getLastH(){
	var wrap = document.getElementById('wrap');
	var boxs = getClass(wrap,'box');
	return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}
/**
* 设置加载样式
* @param  box 	[obj] 设置的Box
* @param  top 	[Num] box的top值
* @param  left 	[Num] box的left值
* @param  index [Num] box的第几个
*/
var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
    	'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//更新请求数据的条数位置
}



/*图片滚动*/
var swiper = new Swiper('.banner', {
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	slidesPerView: 1,
	paginationClickable: true,
	spaceBetween: 30,
	loop: true
});