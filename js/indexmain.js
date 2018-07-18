
/*---------------标题栏-----------------------*/
var huakai = document.getElementById("huakuai");
var huakaixy = huakai.offsetLeft;
var lis = document.getElementsByClassName("lis");
var body_cen = document.getElementById('body_cen');

var lisnum = [10, 95, 180];
for(var i = 0; i < lis.length; i++) {
	/*
	 * 循环给标题栏的li添加事件
	 * 单击事件
	 * 鼠标移入
	 * 鼠标移出
	 */
	
	//鼠标移入，滑块跟随
	lis[i].onmouseover = function() {
		setStyleAction(huakai, "left", "timer", this.offsetLeft, 5);

	}
	//鼠标移出，滑块归位
	lis[i].onmouseout = function() {
		setStyleAction(huakai, "left", "timer", huakaixy, 5);

	}
	/*
	 * 鼠标单击事件
	 * 采用ajax技术
	 * 读取文档里的代码
	 * 局部改变信息栏里的类容
	 * 
	 */
	lis[i].onclick = function(e) {
		huakaixy = this.offsetLeft;
		Ajax('get',"page"+e.target.tabIndex,function (str)
		{
			/*
			 用ajax导入的文档浏览器不能直接解释JavaScript
			 所以，采用的Function动态执行
			 * */
			body_cen.innerHTML = str;
			var patt = '<script type="text/javascript">';
			var sindex = str.indexOf(patt);
			if(sindex > -1){
				str = str.substring(sindex+patt.length);
				
				str = str.substring(0,str.length-'</script>'.length);
				new Function(str)();
			}
		});
	}
}


/*---------------------------banner效果----------------------*/

var banner = document.getElementById("banner");
var banul = document.getElementById("banul");

var jtleft = document.getElementById("jtleft");
var leftbut = document.getElementById("leftbut");
var jtright = document.getElementById("jtright");
var rightbut = document.getElementById("rightbut");

var liu = 0;
var boolul = true;

//定时器，每三秒触发一次切换banner
var timerul = setInterval('blgd()', 3000);

//banner的切换方法
function blgd() {

	boolul ? liu++ : liu--;
	if(liu > 2) {
		boolul = false;
		liu = 1
	}
	if(liu < 0) {
		boolul = true;
		liu = 1;
	}
	setStyleAction(banul, "top", "timer", -(banul.offsetHeight * liu), 10);

}

//鼠标移入banner时清除定时器使之不在切换
banner.onmouseover = function() {
	clearInterval(timerul);
}

//鼠标移出时再次启用
banner.onmouseout = function() {
	timerul = setInterval('blgd()', 3000);

}

/*
 * banner上两个箭头的切换实现
 */

//鼠标移动到箭头范围内，箭头显示
jtleft.onmouseover = function() {
	setStyleAction(leftbut, "opacity", "timerle", 100, 10);
	//单击箭头触发事件，判断是否越界
	leftbut.onclick = function() {
		if(liu > 0) liu--;
		setStyleAction(banul, "top", "timer", -(banul.offsetHeight * liu), 10);
	}
}

//鼠标移出时箭头隐藏
jtleft.onmouseout = function() {
	setStyleAction(leftbut, "opacity", "timerle", 0, 10);
}

//右边箭头，重复左边箭头的操作
jtright.onmouseover = function() {
	setStyleAction(rightbut, "opacity", "timerle", 100, 10);
	rightbut.onclick = function() {
		if(liu < 2) liu++;
		setStyleAction(banul, "top", "timer", -(banul.offsetHeight * liu), 10);
	}
}
jtright.onmouseout = function() {
	setStyleAction(rightbut, "opacity", "timerle", 0, 10);
}

/*---------------------------------------------------------*/
