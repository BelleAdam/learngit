var winSaleName,//销售名称
	wincarName,
	windealerName,//
	serbrandname,//
	winCode,//二维码
	serCx="";//车系名称

var chat;
function setchatData(){
	chat={
		modlue101Head:"images/modlue101icon1.png",
		modlue101Title:"苹果秋季发布会",
		modlue101:[
			{
				type:"date",
				text:"3:00"
			},{
				type:"left",
				text:"老铁们，iPhoneX已经发布了，准备好钱吧"
				// headName:"牛魔王"
			},{
				type:"right",
				// head:"images/hhehead.png",
				text:"老库啊，都有啥卖点"
			},{
				type:"left",
				text:"faceID人脸解锁"
				// headName:"牛魔王"
			},{
				type:"right",
				// head:"images/hhehead.png",
				// pClass:"emoji",
				text:'那吴彦祖解锁我手机简直太简单了，我觉得我的隐私权受到了侵犯'
			},{
				type:"left",
				head:"images/modlue101icon2.png",
				// pClass:"emoji",
				text:'那网红脸是不是都能解开对方手机了'
				// headName:"牛魔王"
			},{
				type:"left",
				// head:"images/tsgzhead.png",
				text:"..."
				// headName:"铁扇公主"
			},{
				type:"left",
				text:"我们还有全面屏，够炫酷"
			},{
				type:"right",
				// head:"images/hhehead.png",
				// pClass:"emoji",
				text:'得了吧，都被人叫刘海X'
			},{
				type:"left",
				text:"用iPhoneX能装X啊"
				// headName:"牛魔王"
			},{
				type:"right",
				// head:"images/tsgzhead.png",
				text:"论装X，一台手机能比得过我"+serCx+"？",
				// headName:"铁扇公主"
			},{
				type:"right",
				pClass:"wx-code",
				text:'<p>买'+serCx+'找我</p><img src="'+winCode+'">'
			}
		],
		modlue63Head:"images/wxchathead01.png",
		modlue63Title:"..............",
		modlue63:[
			{
				type:"date",
				text:"10:00"
			},{
				type:"left",
				text:winSaleName+"，你那个"+serCx+"多少钱？"
			},{
				type:"right",
				text:"我不卖车了，我在山上放羊呢，信号不好，先这样吧！"
			},{
				type:"left",
				text:"为啥"
			},{
				type:"date",
				text:"10:15"
			},{
				type:"right",
				text:"我原本只是"+windealerName+"的一个普通销售，但是，你加了我微信都3年了，问了两年半也从来都没有来店里看过车，我觉得我都不适合卖车了！"
			},{
				type:"left",
				pClass:"emoji",
				text:'<img src="images/emoji01.png"><img src="images/emoji01.png">'
			},{
				type:"left",
				text:"你羊多少钱"
			},{
				type:"right",
				pClass:"emoji",
				text:'滚！<img src="images/emoji02.png">'
			}
		],
		modlue67Head:"images/nmwhead.png",
		modlue67Title:"轰轰烈烈一家人",
		modlue67:[
			{
				type:"date",
				text:"10:00"
			},{
				type:"left",
				text:"孩儿啊，都开始放暑假了，你什么时候回家啊",
				headName:"牛魔王"
			},{
				type:"right",
				head:"images/hhehead.png",
				text:"不回了，回去的车不好买票，太拥挤，而且又热！"
			},{
				type:"left",
				text:"孩儿啊，都开始放暑假了，你什么时候回家啊",
				headName:"牛魔王"
			},{
				type:"left",
				text:"啥？不是有那啥，有火车吗？",
				headName:"牛魔王"
			},{
				type:"date",
				text:"10:15"
			},{
				type:"right",
				head:"images/hhehead.png",
				pClass:"emoji",
				text:'就是不想去车站挤，去年就是在车站里丢了钱包！<img src="images/emoji01.png">'
			},{
				type:"left",
				pClass:"emoji",
				text:'<img src="images/emojing.png"><img src="images/emojing.png"><img src="images/emojing.png">',
				headName:"牛魔王"
			},{
				type:"left",
				head:"images/tsgzhead.png",
				text:"不用坐火车了，咱们家买车去接你回来，"+windealerName+"现在买"+serCx+"有优惠，我和你爸买辆"+serCx+"，开车去接你回来！",
				headName:"铁扇公主"
			},{
				type:"right",
				head:"images/hhehead.png",
				pClass:"emoji",
				text:'<img src="images/emojigz.png"><img src="images/emojigz.png"><img src="images/emojigz.png">'
			},{
				type:"left",
				text:"老婆，你说的都是真的吗，你听谁说的？",
				headName:"牛魔王"
			},{
				type:"left",
				head:"images/tsgzhead.png",
				text:"悟空上次让我扫码，推荐了个金牌汽车销售"+winSaleName+"，我感觉靠谱！",
				headName:"铁扇公主"
			},{
				type:"left",
				pClass:"wx-code",
				text:'<img src="'+winCode+'">'
			}
		]

	}
}
