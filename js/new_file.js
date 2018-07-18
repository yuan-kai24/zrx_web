
/*-----------------------------------------------登录效果-----------------------------------------------------------------------*/
var timerright, timerleft, timerdowm, timerup;
var divs = document.getElementById("qwe");
var bool = true;
var divt = document.getElementById("tops");

/**
 * 
 * @param {Object} obj
 * 使用两个方法交替
 * 一个方法写弹出
 * 另一个方法写收缩
 * 利用弱类型语言特性，对同一个定时器对象操作，不冲突
 */
function upanddowns(obj) {
	if(obj) {
		clearInterval(timerdowm);
		clearInterval(timerleft);
		clearInterval(timerright);
		clearInterval(timerup);
		timerdowm = setInterval(function() {
			if(divt.offsetTop < 100) {
				divt.style.top = divt.offsetTop + Math.ceil((200 - divt.offsetTop) / 10) + "px";
			} else {
				clearInterval(timerdowm);
				divt.style.top = "100px";
			}
		}, 30);
	} else {
		clearInterval(timerleft);
		timerleft = setInterval(function() {

			if(Math.abs(divs.offsetLeft) < 200) {

				divs.style.left = divs.offsetLeft - Math.floor((200 - (divs.offsetLeft)) / 25) + "px";
			} else {
				clearInterval(timerleft);
				divs.style.left = "-200px";
				return;
			}

		}, 20);
	}
}

function tj(obj) {
	if(obj) {
		clearInterval(timerdowm);
		clearInterval(timerleft);
		clearInterval(timerright);
		clearInterval(timerup);
		timerright = setInterval(function() {
			if(divs.offsetLeft < 0) {
				divs.style.left = divs.offsetLeft + Math.ceil((200 - divs.offsetLeft) / 25) + "px";
			} else {
				
				divs.style.left = "0px";
				upanddowns(obj);
				clearInterval(timerright);
				return;
			}
		}, 20);
	} else {
		clearInterval(timerup);

		timerup = setInterval(function() {

			if(Math.abs(divt.offsetTop) < 200) {
				divt.style.top = divt.offsetTop - Math.ceil((600 - divt.offsetTop) / 60) + "px";
			} else {
				
				divt.style.top = "-200px";
				upanddowns(obj);
				clearInterval(timerup);
				return;
			}
		}, 30);

	}
}

/*-------------------------星期打印--------------------------------*/

/*
 * 使用JavaScript自带的时间函数
 * 替换掉星期0123456，改为中文
 * 打印日期情况在底部，尽量精确，半秒更新一次
 */
var xinqi = ["日", "一", "二", "三", "四", "五", "六"];

function sj() {
	var sjrq;
	setInterval(function() {
		var datas = new Date();
		var sxw = datas.getHours();
		sjrq = datas.getFullYear() + "年" + (datas.getMonth() + 1) + "月" + datas.getDate() + "日";
		sjrq += "<br />" + sxw + "时" + datas.getMinutes() + "分" + datas.getSeconds() + "秒";
		sjrq += "<br />星期" + xinqi[datas.getDay()] + "<br />";
		if(sxw >= 7 && sxw <= 11) {
			sjrq += "上 午 好";
		} else if(sxw >= 12 && sxw <= 14) {
			sjrq += "中 午 好";
		} else if(sxw >= 15 && sxw <= 18) {
			sjrq += "下 午 好";
		} else {
			sjrq += "晚 上 好";
		}
		document.getElementById("bottom_di").innerHTML = sjrq;
	}, 500);
}

document.getElementById("op").addEventListener("click", function() {
	tj(bool);
	bool = !bool;
}, false);
sj();

