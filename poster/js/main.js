var myDate=new Date();
var Year=myDate.getFullYear();//年
var Month=myDate.getMonth()+1;//月
var rgetDate=myDate.getDate();//日
var mDay=myDate.getDay();//周几
var weeks = ["日","一","二","三","四","五","六"];
var m={
    fullPath:window.location.href,//页面url
    ajaxUrl:"//pocket.pcauto.com.cn",
    // ajaxUrl:"//testpocket2.pcauto.com.cn",
    APP:false,
    APPModlueName:"",
    windowHost:window.location.host,
    thisModlue:"",
    photoBase64:"",
    appCarUrl:"",
    appBtnType:false,
    appSaveType:false,
    serType:false,
    controlLoading:false,
    // ajaxUrl:"//cjl.pcauto.com.cn",
    salesId:"",//销售id
    uploadPicCon:$("#uploadPic-con"),
    imgCrop:$("#imgCrop"),//裁剪框
    save:$("#save"),//裁剪按钮
    file:$("#file"),//上传控件
    fileBg:$("#file-imgbg"),
    hit:$("#hit"),
    loading:$("#loading"),//loading页面
    outputPicCon:$("#outputPic-con"),//合成显示img
    modlueList:$("#modlue-type .modlue-select"),//模板列表
    modlueFont:"",//字体
    settime:"",
    brandIds:"",
    saleName:"",//销售名称
    carName:"",//品牌名称
    dealerCity:"",//地区
    mobile:"",//手机号
    dealerAddress:"",
    manufacturerIds:"",
    mId:"",
    level:"",
    sate:false,
    seriesOne:false,
    cliType:true,
    saledealerName:"",//
    dealerName:"",
    saleHead:"",
    proName:"",
    carNameS:"",
    allPro:false,
    seriesType:true,
    seriesPop:$("#series-pop"),
    saleLogo:$(".sale-logo img").eq(0),//品牌logo
    modlueName:$("#modlue-type .active").attr("data-modluename"),//模板编号
    modlueText:$("#modlue-type .active .modlue-type-name").html(),//模板名称
    dcCodeUrl:"",//东财二维码链接
    Logo:false,//
    wxHeadUrl:"",//微信头像
    saleCode:$("#sale-code"),
    saleCodeCrop:$("#sale-imgCrop"),//二维码裁剪框
    salecodeFile:$("#sale-code-file"),//
    salecodeSave:$("#sale-code-save"),//二维码裁剪按钮
    winW:$("body").width(),
    salecodeImg:$(".sale-code-img img").eq(0),
    inputPlder:$("#input"),
    zdTxt:$(".zd-txt"),
    tipMask:$(".tip-mask"),
    ViewPhotoArr:[],
    saleData:"",
    bgURL:"",
    Qualification:"",
    ranking:"",
    urlPoster:0,
    custom_hf_cc_dealer:[15965,20199,20237,26906,27616,29047,35321,36388,37033,37812,38915,38916,38920,38922,38924,38925,38927,38931,38932,38934,38939,38940,38943,38944,38946,38947,38949,38951,38953,38957,38958,38959,38960,38961,38965,38968,38970,38972,38973,38974,38975,38986,38993,38994,38996,39008,39010,39011,39012,39016,39018,39021,39022,39023,39024,39025,39028,39029,3903,39031,39038,39040,39042,39043,39044,39045,39046,39049,39050,39051,39052,39053,39054,39055,39056,39057,39061,39062,39068,39069,39072,39075,39076,39077,39079,39083,39084,39085,39086,39087,39088,39089,39090,39092,39093,39095,39096,39098,39100,39102,39103,39104,39105,39107,39108,39112,39116,39117,39118,39125,39126,39127,39129,39130,39132,39133,39135,39136,39137,39138,39140,39142,39143,39149,39152,39154,39158,39161,39162,39165,39166,39168,39170,39172,39173,39174,39175,39176,39177,39178,39179,39180,39181,39185,39190,39191,39192,39193,39194,39196,39197,39198,39199,39200,39202,39206,39210,39212,39213,39214,39215,39217,39218,39219,39220,39223,39224,47694,49030,49251,4952,86010,111560],// 哈弗 长城
    getSaleId:function(){/*从url获取参数*/
        this.salesId=this.GetQueryString("salesId");
        this.APP=this.GetQueryString("fromApp");
        this.APPModlueName=this.GetQueryString("modlueName");
        this.controlLoading=this.GetQueryString("controlLoading");
        this.bgURL=this.GetQueryString("bgURL");
        this.urlPoster=this.GetQueryString("urlPoster");
        console.log(this.urlPoster,125);
        if (!this.APP) {
            this.initLoading();
            $("body").addClass('modlue-btn-type-show');
        }
        if (this.salesId && !this.urlPoster) {
            this.getSaleData();
        }
        if (this.urlPoster) {
            this.setURLposter();
        }
    },
    GetQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    str2JSON(str){
        return eval('('+ str +')')
    },
    setURLposter(){
        var that=this;
        $.ajax({
            url:that.ajaxUrl+"/interface/outer/get_poster_info_by_type.jsp",
            data:{
                posterType:that.APPModlueName,
            },
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                if (data.code=="1") {
                    var json=that.str2JSON(data.content);
                    that.URLposterData=json;
                    var font="";
                    if (json.fontName) {
                        font='data-font="'+json.fontName+'"';
                    }
                    var selectHTML='<div class="modlue-select" '+font+' data-modlueName="'+that.APPModlueName+' saveNone urlposter"><span class="modlue-type-name">'+json.title+'</span></div>';
                    $("#modlue-type").append(selectHTML)
                    that.modlueList=$("#modlue-type .modlue-select");
                    that.modlueList.unbind("click");
                    that.modlueSwitch();
                    that.getSaleData();
                }else{
                    alert("id错误")
                }
            }
        })
    },
    setURLposterData(){
        var that=this;
        var json=that.URLposterData;
        console.log(json)
        for(var t in json){
            console.log(t)
            // 背景图片
            $("#uploadPic-con").css({
                background:"url(images/"+json['bgName']+") center no-repeat",
                backgroundSize:"100% 100%",
                height:json['bgHeight'],
                'fontFamily':json['fontName']
            })
            if (t=="saleHead") {
                $(".sale-head").attr("style",json[t]).show()
            }
            if (t == "saleCode") {
                $(".sale-code-con").attr("style",json[t]).show()
            }
            if (t.indexOf("editText")>-1) {
                // 这是文字
                if (json[t].indexOf("HTMLTEXT:")>-1) {
                    var div=$('<div></div>');
                    var style=json[t].split("HTMLTEXT:");
                    var str8=style[1]
                    for(var w in that.saleData){
                        var r="{"+w+"}";
                        str8=str8.replace(r,that.saleData[w])
                    }
                    div.attr("style",style[0]).html(str8).css({
                        position:"absolute"
                    })
                    $("#uploadPic-con").append(div);
                }
                
            }

        }
    },
    isDate:function(){
        $("#modlue-type .modlue-select[data-date]").each(function(i,m){
            var s=$(m).attr("data-date");
            if (!s) {return;}
            var a=s.split(","),
                thisTime=new Date().getTime();
            a[1] = a[1] ? a[1] : "3018-02-07";
            var st=new Date(a[0]).getTime(),
                et=new Date(a[1]).getTime();
            console.log(new Date())
            console.log(thisTime-st)
            if (thisTime > st && thisTime < et) {
                console.log(s)
                $(m).css({
                    "display":"inline-block"
                });
            }else{
                $(m).remove()
            }
        });
    },
    isAppointModlue:function(){
        console.log(0)
        if (m.saleData.dealerId == "86010") {//86010全部露出
            $("#modlue-type .modlue-select[data-AppointModlue]").css({
                display:"inline-block"
            });
        }else{
            $("#modlue-type .modlue-select[data-AppointModlue]").each(function(i,k){
                var _this=$(this);
                    a=_this.attr("data-AppointModlue").split(","),
                    type=_this.attr("data-AppointModlue-type"),
                    tArr=m.manufacturerIds;
                if (type == "brandIds") {
                    tArr=m.brandIds;
                }
                for (var v in a) {
                    if ($.inArray(a[v],tArr) > -1) {
                        _this.css({
                            display:"inline-block"
                        });
                        break;
                    }
                }
            });
        }
    },

    getSaleData:function(){/*获取销售信息*/
        var that=this;
        $.ajax({
            url:that.ajaxUrl+"/interface/cms/get_footer_json.jsp",
            data:{
                salesId:that.salesId,
                serial_ids:"undefined"
            },
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                console.log(data);
                if (data.code==1) {
                    that.saleData=data;
                    // 绑定图片裁剪事件
                    that.setPhotoClip();
                    var name = data.name;//名字
                        headUrl = data.headUrl,//头像
                        gender = data.gender,//性别，1：男，2：女
                        dealerName = data.dealerName,//公司
                        level = data.level,//顾问等级
                        salesLevel=data.salesLevel,
                        saleCode = data.qrcode,//二维码链接
                        _logo=data.logo,//品牌logo
                        _proName=data.carName.split("、")[0],//品牌
                        _dealerCity=data.dealerCity,//地区
                        dealerAddress=data.dealerAddress,
                        gitMid=data.gitMid;
                    if (!data.isReal) {
                        data.manufacturerIds="-1";
                        data.brandIds="-1";
                        data.carName=_proName="品牌";
                        dealerName="简称";
                        $(".modlue-select[data-modluename *= series]").remove();
                    }
                    if(data.isIdent == '-1'){
                       dealerName=" ";
                    }
                    // console.log(data.agentQualification)
                    that.Qualification = data.agentQualification;
                    that.dealerAddress=dealerAddress;
                    that.Logo=_logo;
                    that.saleName=winSaleName=name;
                    that.mId=data.manufacturerIds;
                    that.manufacturerIds=data.manufacturerIds.split(",");
                    that.dealerCity=_dealerCity;
                    that.saledealerName=dealerName;
                    that.dealerName=windealerName=dealerName;
                    that.proName=that.carName=_proName;
                    that.level=level;
                    that.mobile=data.mobile;
                    that.brandIds=data.brandIds.split(",");
                    that.carNameS=data.carName.split("、")[0];
                    that.appCarUrl="pcautoaction://choose-car/"+that.mId;
                    if (data.carName == "全品牌") {
                        that.allPro=true;
                    }
                    if(data.agentQualification ==2){
                        $('.modlue-select[data-exhibition]').css({
                            display:"inline-block"
                            });

                    }

                    // 哈弗 长城经销入口
                    if($.inArray(m.saleData.dealerId, that.custom_hf_cc_dealer) != -1) {
                        $('.modlue-select[data-hafo]').css({
                            display:"inline-block"
                            });
                    }
                    // 个人微店二维码
                    // var _salesIndex="http://pocket.pcauto.com.cn/buyer/s"+that.salesId+"/";
                    // new QRCode(document.getElementById("qrcode"),_salesIndex);
                    if(data.codeUrl){
                               saleCode = data.codeUrl
                               console.log(data.codeUrl)
                                $('#qrcode').html('<img src="'+data.codeUrl+'">')
                                that.imgTobase64(data.codeUrl,'#qrcode img')
                            }else if(data.xcxQrCode){
                               saleCode = data.xcxQrCode
                               console.log(data.xcxQrCode)
                                $('#qrcode').html('<img src="'+data.xcxQrCode+'">')
                                that.imgTobase64(data.xcxQrCode,'#qrcode img') 
                            }
                            else{
                                saleCode = data.qrcode
                                // 个人微店二维码
                                var _salesIndex="http://pocket.pcauto.com.cn/buyer/s"+that.salesId+"/";
                                new QRCode(document.getElementById("qrcode"),_salesIndex);
                            }
                    //头像
                    that.imgTobase64(data.wxHeadUrl,'.sale-head-img');
                    // 按经销商露出
                    that.isAppointModlue();
                    that.isDate();
                    // 新车信息卡
                    if (!that.APP) {
                        that.getNewCar();
                    }
                    // 东财海报 E
                    if (gender==1) {
                        $(".sale-sex").attr("src","images/nan.png");
                    }else if(gender==2){
                        $(".sale-sex").attr("src","images/nv.png");
                    }else{
                        $(".sale-sex").remove();
                    }
                    $(".sale-name,.ly-name i,.name-text").html(name);
                    $(".dealerName").html(dealerName);
                    $(".sale-dealerAddress").html(dealerAddress);
                    $(".dw-dm").html("买车就到"+dealerName);
                    $(".dw-xm").html("要找"+name+"啊！");
                    $(".carName-tx").html(that.carName);
                    $(".dealerName-text").html(dealerName);
                    $("#modlue-type .modlue-select").each(function(i,m){
                        var t=$(m).is(":hidden");
                        if (t && !that.APP) {
                            $(m).remove();
                        }
                    });
                    $("#modlue-type .modlue-select").removeClass("active");
                    $("#modlue-type .modlue-select").eq(0).addClass("active");
                    // 懒加载
                    if (!that.APP) {
                        $(function () {
                            $("#modlue-type img").lazyload({
                                id:"#modlue-type",
                                effect: "fadeIn"
                            });
                        });
                    }
                    setTimeout(function(){
                        $("#modlue-type").scrollLeft(1);
                    },200);
                    if (that.urlPoster) {
                        that.setURLposterData();
                    }
                }

            }
        })
    },
    getSeriesData:function(mids,model){/*车系弹窗数据*/
        var that=this;
        $.ajax({
            url:that.ajaxUrl+"/interface/app/get_serial_group.jsp",
            data:{mIds:mids},
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                console.log(data)
                if (data.code == 1) {
                    var _html="";
                    var mList=data.mList;
                    for (var i = 0; i < mList.length; i++) {
                        var brandName=mList[i].mName;
                        _html+='<p>'+brandName+'</p >';
                        var a="m"+mList[i].mId;
                        var l=data[a];
                        $.each(l,function(s,m){
                            var Mname=m.name,
                                MkindId=m.id,
                                Mphoto=m.photo ? m.photo:"//www1.pcauto.com.cn/zt/gz20160608kdcs/mcjs/0608003.jpg",
                                // serial_price=m.price,
                                carType2='';
                            if(m.carType == 2){
                                carType2='carcarType2s'
                            }
                            _html+='<a href="javascript:;" data-carType="'+m.carType+'" class="'+carType2+'" data-url="'+Mphoto+'" data-name="'+brandName+'" data-id="'+MkindId+'" target="_self" title="">'+Mname+'<i class="a-icon"></i></a>';
                        })
                    }
                    $("#series-pop .series-list").html(_html);
                    that.seriesClik();
                    var body = $('body');
                    if(body.hasClass('.vvvvvvv')){
                        if ($(".vvvvvvv #series-pop .series-list a[data-carType='2']").size() == "0") {
                            alert('你的主营车型暂无新能源汽车');
                            $(".prev-btn").click();
                        };
                    }
                }
            }
        })
    },
    getAppSeriesData:function(data){
        var data=eval(data);
        var that=this;
        var _id=data.sId,
            _text=data.sname,
            _brandname=data.brandName,
            url='//www1.pcauto.com.cn/piclib/sogouvrsg/'+_id+'.jpg',
            MphotoUrl=data.photo;
        serbrandname=_brandname;
        serCx=_text;
        var modelName = data.modelName;
        that.setSerData(_id,_text,_brandname,MphotoUrl,url,modelName);
        if ($("#uploadPic-con").hasClass("series-imgCrop")) {
            $(".app-change-pic-btn").css("display","inline-block");
            $(".app-series-pop .fl").css("display","none");
        }else{
            $(".app-change-pic-btn,.app-series-pop .fl").removeAttr("style");
        }
        that.serType=true;
        var c=$("#uploadPic-con");
        if(c.hasClass('carModlue')){
        $(".app-series-pop .fr").html(modelName);
        }else{
            $(".app-series-pop .fr").html(_text);
        }
        
        // alert(_text)
        that.appCheck();
    },
    seriesPopShow:function(){/*车系弹窗显示*/
        var _len=$("#series-pop .series-list").html().length;
        var carModel = "model";
        if (_len < 10) {
            this.getSeriesData(this.mId);
        }
        $("#modlue-type").hide();
        this.seriesPop.show();
        this.seriesClik();
        var body = $('body')
        if(body.hasClass('.vvvvvvv')){
            if ($(".vvvvvvv #series-pop .series-list a[data-carType='2']").size() == "0" && _len > 10) {
            alert('你的主营车型暂无新能源汽车');
            $(".prev-btn").click();
            };
        }else{

        }
    },
    seriesClik:function(){/*车系选择*/
        $(".series-list a").click(function(){
            $(this).addClass("active").siblings("a").removeClass("active");
        });
    },
    seriesPopHide:function(){/*车系弹窗关闭*/
        this.seriesPop.hide();
    },
    startSave:function(){
        var a=this.uploadPicCon.hasClass("saveNone");
        if (a) {
            this.photoClipNoneSaveShow();
        }
    },
    getNewCar:function(){
        var that=this;
        $.ajax({
            url:that.ajaxUrl+"/interface/newcar/get_new_car_poster_list.jsp",
            data:{salesId:that.salesId},
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                if (data.code==1) {
                    var _html='';
                    $.each(data.posterArray,function(i,m){
                        console.log(m);
                        _html+='<div class="modlue-select" data-pgName="20171030a.html?yituType='+m.id+'&marketId='+m.id+'&salesId='+that.salesId+'" data-modlueName="modlue222 saveNone newCar newCar1 jumpLink"><img data-original="images/newCar1x.jpg" src="images/newCar1x.jpg"><span class="modlue-type-name">'+m.sgName+'</span></div>';
                        if (m.pointCount == "3") {
                            _html+='<div class="modlue-select" data-pgName="20171030b.html?yituType='+m.id+'&marketId='+m.id+'&salesId='+that.salesId+'" data-modlueName="modlue222 saveNone newCar newCar2 jumpLink"><img data-original="images/newCar2x.jpg" src="images/newCar2x.jpg"><span class="modlue-type-name">'+m.sgName+'</span></div><div class="modlue-select" data-pgName="20171030c.html?yituType='+m.id+'&marketId='+m.id+'&salesId='+that.salesId+'" data-modlueName="modlue222 saveNone newCar newCar3 jumpLink"><img data-original="images/newCar3x.jpg" src="images/newCar3x.jpg"><span class="modlue-type-name">'+m.sgName+'</span></div>';
                        }
                    });
                    var afCon= $("#modlue-type .newCarPrev").size() ? $("#modlue-type .newCarPrev") : $("#modlue-type .active");
                    afCon.after(_html);
                    that.modlueList=$("#modlue-type .modlue-select");
                    that.modlueList.unbind("click");
                    that.modlueSwitch();
                }
            }
        });
    },
    setPhotoClip:function(){/*图片裁剪*/
        var that=this,
            w=that.imgCrop.width(),
            h=that.imgCrop.height();
        that.file.val(null);
        fileReader=null;
        $(that.save,that.file,that.hit).unbind();
        $(that.imgCrop).html("");
        $(that.imgCrop).photoClip({
            width: w,
            height: h,
            file: that.file,
            view: that.hit,
            strictSize:true,
            ok: that.save,
            loadStart: function (fileReader) {
                that.loading.show();
                that.loading.find(".load-txt").html("玩命加载中....");
                console.log("start")
            },
            loadComplete: function () {
                that.loading.hide();
                $("#file-btn,#modlue-type").hide();
                if (that.APP) {
                    that.fileBg.hide();
                    if ($("#uploadPic-con").hasClass("series-imgCrop")) {/*选车+换图*/
                        $("body").addClass("app-series");
                        // that.serType=true;
                    }else{
                        $("body").addClass("app-pic-show");
                    }
                }
                that.imgCrop.show();
                that.appSaveType=true;
                that.appCheck();
            },
            clipFinish: function (dataURL) {
                that.loading.show();
                var _img=$("<img>").attr("src",dataURL);
                that.imgCrop.html(_img);
                if (that.APP) {
                    setTimeout(function(){
                        that.getBgUrl();
                    },500);
                }else{
                    that.getBgUrl();
                }
                // 提交计数到口袋
                that.submitPocket(1,that.modlueText+"----"+that.saleName);
            }
        });
    },
    // app输入框检查
    appCheck:function(){
        var that=this;
        var _inputValue;
        var a=$("#g-doc .areaInput:visible,#g-doc textarea:visible,.contenteditable:visible");
        var saveNone=$("#uploadPic-con").hasClass("saveNone");
        var ser=$("#uploadPic-con").hasClass("series");
        if (!ser) {
            that.serType=true;
        }
        if (saveNone) {
            that.appSaveType=true;
        }
        if (a.length == 0 || $("#uploadPic-con").attr("class").indexOf("input") < 0) {
            that.appBtnType=true;
        }
        that.appBtn();
        a.on("input blur focus change",function(){
            function c(){
                var t=false;
                a.each(function(i,m){
                    var _this=$(m),
                        _c=_this.attr("class");
                    if (_c.indexOf("contenteditable") > -1) {
                        _inputValue=_this.text();
                    }else{
                        _inputValue=_this.val();
                    }
                    if (_inputValue.length == 0) {
                        that.appBtnType=false;
                        return false;
                    }
                    that.appBtnType=true;
                });
                return that.appBtnType;
            }
            that.appBtnType=c();
            that.appBtn();
        });
    },
    appBtn:function(){
        if (this.appBtnType && this.appSaveType && this.APP && this.serType) {
            console.log("可生成/pcautoaction://change_generate_btn_state/1");
            this.addIframe("pcautoaction://change_generate_btn_state/1");
        }else{
            console.log("不可生成/pcautoaction://change_generate_btn_state/0");
            if (this.APP) {
                this.addIframe("pcautoaction://change_generate_btn_state/0");
            }
        }
        if (this.controlLoading) {
            this.controlLoading=false;
            this.addIframe("pcautoaction://poster_loading_dismiss");
        }
    },
    addIframe:function(url){
        var f=$("<iframe/>").attr("src",url);
            f.css({
                display:"none"
            });
        $("body").append(f);
    },
    iscode2input:function(){

        // input textarea 输入检查
        if (this.modlueName.indexOf("input") >-1 || this.modlueName.indexOf("textarea") >-1) {
            // alert(22)
            var inputType;
            $("#g-doc .areaInput,#g-doc textarea,.contenteditable").each(function(i,m){
                var thisInput=$(m),
                    thisClass=thisInput.attr("class"),
                    inputHide=thisInput.is(":hidden");
                if (!inputHide) {/*显示的*/
                    var _inputValue;
                    if (thisClass.indexOf("contenteditable") > -1) {
                        _inputValue=thisInput.text();
                    }else{
                        _inputValue=thisInput.val();
                    }
                    if (_inputValue.length < 1) {
                        // console(111)
                        setTimeout(function(){
                            m.focus();
                        },300);
                        inputType=false;
                        return false;
                    }
                    if (thisClass.indexOf("contenteditable") > -1) {
                        thisInput.text("");
                        thisInput.focus();
                        thisInput[0].innerHTML=_inputValue;
                        thisInput.blur();
                    }
                    inputType=true;
                }
                // else{
                    
                // }
            });
            if (!inputType) {
                this.tipTxt("填写完海报内容才能生成喔~");
                return false;
            }
        }
        if (this.modlueName.indexOf("saveNone") == -1) {
            var it=$("#file-btn").is(":hidden");
            if (!it) {
                this.tipTxt("请上传图片~");
                return false;
            }
        }
        if (this.APP && !this.serType) {
            this.tipTxt("请选择相关车系~");
            return false;
        }
        // input转html，行高问题
        this.inputToHTML();
        // return false;
        if (this.modlueName.indexOf("saveNone") > -1) {
            this.loading.show();
            this.loading.find(".load-txt").html("正在生成海报");
            this.getBgUrl();
            this.submitPocket(1,this.modlueText+"----"+this.saleName);
            return false;
        }
        return true;
    },
    inputToHTML:function(){
        $(".areaInput,textarea").each(function(){
            var _this=$(this),
                _val=_this.val(),
                _class=_this.attr("class");
            var  _html='<p class="'+_class+' addp">'+_val+'</p>';
            _this.after(_html);
            _this.val(null).attr("placeholder",null)
        })
    },
    addTextToInput:function(){
        $(".addp").each(function(i,m){
            var _this=$(this),
                _text=_this.html(),
                prevT=_this.prev();
            prevT.val(_text);
            _this.remove();
        });
    },
    getBgUrl:function(){/*获取背景图url*/
        var that=this;
        $("#g-doc .icon,.uploadPic-con").each(function(i,m){
            var _this=$(this),
                _class=_this.attr("class"),
                bgUrl=_this.css("backgroundImage").replace('url(','').replace(')','');
            if (bgUrl && bgUrl!="none") {
                if (_class.indexOf("uploadPic-con") > -1) {/*背景图片*/
                    that.setIconPic(_this,bgUrl,"bg");
                }else{
                    that.setIconPic(_this,bgUrl);
                }

            }
        })
        that.isSaleHead();
    },
    setIconPic:function(obj,url,t){/*背景图转换为img -- 防止背景图模糊 obj:背景图对象，url背景图链接，t类型--*/
        url=url.replace(/\"/g, "");
        var p=obj.position();
        var w=obj.width();
        var h=obj.height();
        if (t=="bg") {
            var bgImg=$("<img>").attr("src",url).addClass("modluebg");
            $("#file-btn").after(bgImg);
        }else{
            var img=$("<img>").attr("src",url).css({
                width:w,
                height:h,
                left:p.left,
                top:p.top
            }).addClass("iconPic");
            obj.after(img).hide();
        }
    },
    clearIconPic:function(){/*删除添加的img*/
        $(".iconPic,.modluebg").remove();
        $("#g-doc .icon").show();
    },
    outputPic:function (id){/*图片合成*/
        var that=this;
        var shareContent = document.getElementById(id);//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 2; //定义任意放大倍数 支持小数
        if (that.modlueName.indexOf("scale") > -1) {
            var a=that.modlueName.split(" ");
            var s;
            for (var i = 0; i < a.length; i++) {
                if (a[i].indexOf("scale")) {}
                s=a[i].replace(/[^0-9]/ig,"");
            }
            scale=s;
        }
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale,scale);
        var opts = {
            scale:scale, // 添加的scale 参数
            canvas:canvas,
            logging: false, //日志开关
            width:width,
            height:height
        };
        html2canvas(shareContent, opts).then(function (canvas) {
            var url = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height,"jpeg").src;
            $(".outputPic-con").show();
            $("#outputPic-con").attr("src",url);
            that.photoBase64=url;
            $("#g-doc,#save-links").hide();
            $("#save-success-link").show();
            that.loading.hide();
            that.addTextToInput();
            if (that.APP) {
                $(".app-series-pop").hide();
                window.location.href="pcautoaction://generate_posters";
            }
        });
    },
    isSaleHead:function(){/*图片合成，判断头像是否加载成功*/
        var that=this;
        that.inputTipCheck(true);
        window.scrollTo(0,0);
        var _len=$(".sale-head-img").attr("src"),
            _s=$("#uploadPic-con").hasClass("saveNone"),
            _logoLen=that.saleLogo.attr("src").length,
            serPicLen=$(".series-pic img").eq(0).attr("src").length;
        if (_len < 10 && !_s || (that.modlueName.indexOf("saleLogo") > -1 && _logoLen < 10) || (!$(".series-pic").is(":hidden")) && serPicLen < 5 ) {
            console.log("头像未加载成功");
            that.settime=setTimeout(function(){
                that.isSaleHead();
            },100);
        }else{
            that.outputPic("g-doc");
            clearTimeout(that.settime);
        }
    },
    changePic:function(){/*更换图片*/
        this.file.click();
    },
    prevModlue:function(){/*重选模板*/
        $("#file-btn,#modlue-type").show();
        $("#modlue-type .active").click();
    },
    closeFun:function(){/*关闭事件*/
        $("body").removeClass("saveShow");
        $(".outputPic-con").hide();
        $("#outputPic-con").attr("src","");
        $("#g-doc,#file-btn,#modlue-type").show();
        $("#save-success-link,#imgCrop,#save-links").hide();
    },
    prevchangeFun:function(){/*重选-更换-关闭-按钮事件绑定*/
        var that=this;
        var c=$("#uploadPic-con");
        // 重选模板
        $(".prev-btn").click(function(){
            that.prevModlue();
        });
        // 更换图片
        $(".change-btn").click(function(){
            if (c.hasClass("viewphoto")) {
                that.viewphotoShow();
            }else{
                that.changePic();
            }
        });
        // 关闭
        $(".close-btn").click(function(){
            that.closeFun();
            that.clearIconPic();
            that.setPhotoClip();
            $("body").addClass("modluebtnShow");
        });
        // 二维码裁剪框关闭
        $("#sale-code-close").click(function(){
            that.saleCodeHide();
        });
        // 海报合成
        $("#save-xn").click(function(){
            that.boxSave();
        });
        $(".series-btn").click(function(){
            if ($("#series-pop .active").length > 0) {
                var obj=this;
                that.seriesBtnCli(obj);
            }
        });
        $(".viewphoto-btn").click(function(){
            that.viewphotoSubmit();
        });
        $(".tip-mask-close-btn").click(function(){
            that.inputTipCheck(true);
            // $('.modlue337 .tip-mask a').click(function(){
            $('.cover-pic-modlue337').css({display:'none'})
            $('.modlue337 .tip-mask').css({display:'none'})
                        // })
        });
        // 确认按钮
        $(".modlue-btn a").click(function(){
            $('.tip-mask').hide()
            if ($("#uploadPic-con").hasClass("jumpLink")) {
                that.jumpLink();
            }else{
                that.btnEventClick();
            }
        });
        if (that.APP) {
            $("#imgCrop").click(function(){
                window.location.href="pcautoaction://choose-photo/";
            });
            $(".app-series-pop .fl,.app-series-pop .fr").click(function(){
                // if (!$(this).find(".fl").eq(0).is(":hidden")) {
                //     window.location.href=that.appCarUrl;
                // }
                if (!$(this).find(".fl").eq(0).is(":hidden")) {
                    if(c.hasClass('carModlue')){
                        console.log(12334)
                        window.location.href = 'pcautoaction://choose-car-model/'
                    }else{
                        console.log(1233)
                        window.location.href=that.appCarUrl;
                    }
                    
                }
            });
        };
    },
    boxSave:function(){
        var istype=this.iscode2input();
        if (istype) {
            this.save.click();
        }
    },
    // 跳转链接--五图
    jumpLink:function(){
        var c=$("#uploadPic-con"),
            url="";
        if (c.hasClass("modlue124")) {
            url="//www1.pcauto.com.cn/wap/zt/gz20170811hqhb/20171019a.html";
        };
        if (c.hasClass("modlue135")) {
            url="//www1.pcauto.com.cn/wap/zt/gz20170811hqhb/20171107a.html";
        };
        if (c.hasClass("newCar")) {
            var _pgName=$("#modlue-type .active").attr("data-pgName");
            url='//www1.pcauto.com.cn/pocket/20180110/carcard/'+_pgName;
            window.location.href=url;
            return;
        }
        if (url!="") {
            window.location.href=url+"?yituType="+$("#modlue-type .active").attr("data-modluename").split(" ")[0]+"&marketId=false&salesId="+this.salesId;
        };
    },
    appseriesEventClick:function(){
        $("body").addClass("app-series");
        $(".save-links").hide();
    },
    btnEventClick:function(){
        $("body").removeClass("modluebtnShow");
        
        console.log(1)
        var a=$("#uploadPic-con");
        if (!a.hasClass("appCover") || !this.APP) {
            $(".cover-pic").hide();
        }
        if (a.hasClass("chat-bottom")) {
            this.photoClipNoneSaveShow();
        }else if(a.hasClass("saveNone") && !a.hasClass("series") && !a.hasClass("chat")){/*无上传图片-无车型-非对话*/
            this.photoClipNoneSaveShow();
        }else if(a.hasClass("series") && !a.hasClass("chat")){/*车系弹窗，非对话*/
            if (this.APP) {
                this.appseriesEventClick();
            }else{
                this.seriesPopShow();
            }
            this.seriesOne=true;
            this.sate=true;
        }else if(a.hasClass("chat")){/*对话*/
            if (this.APP) {
                this.appseriesEventClick();
            }else{
                this.seriesPopShow();
            }
            this.chatFun();
            this.seriesOne=true;
            this.sate=true;
        }else{
            $("body").addClass("saveShow");
            $(".change-btn").show();
            $("#save-links").show();
            $("#modlue-type").hide();
        }
    },
    carsking:function(){
        var that = this;
        var a=$("#uploadPic-con");
        $.ajax({
            url:"//king.pcauto.com.cn/appapi/1.0/challenge/userRankPoster.do",
            data:{
                uid:that.salesId,
                matchId:"191"
            },
            dataType:'jsonp',
            success:function(data){
                if(data.code==0){
                    console.log(data.better)
                    that.ranking = data.better
                    if (a.hasClass("modlue356")) {
                        that.zdTxt.html('<p>我是<i>'+that.saleName+'</i></p><p>我在e战成王哈弗专场挑战赛</p><p>击败了<i class="ranking">'+that.ranking+'</i>名对手</p>')
                    }
                }
            }
        })
        
    },
    modlueSwitch:function(){/*模板切换*/
        var that=this,
            c=$("#uploadPic-con");
        that.modlueList.click(function(){
            var _this=$(this);
            that.modlueName=_this.attr("data-modlueName");
            that.modlueText=_this.find(".modlue-type-name").html();
            that.modlueFont=_this.attr("data-font");
            $("title").html(that.modlueText);
            that.inputTipCheck(false);
            c.attr("class","uploadPic-con").addClass(that.modlueName);
            if (!that.APP || $("#uploadPic-con").hasClass("modlue337")) {
                var coverImgURL="images/cover"+that.modlueName.split(" ")[0].replace(/[^0-9]/ig,"")+".jpg";
                $(".cover-pic").attr("class","cover-pic").addClass("cover-pic-"+that.modlueName.split(" ")[0]).show();
                console.log($(".cover-pic").attr("class"))
            }
            that.viewphotoHide();
            _this.addClass("active").siblings().removeClass("active");
            that.setPhotoClip();
            that.loading.hide();
            var carsKing=$("#uploadPic-con").hasClass("carsKing");
            console.log(carsKing)
            if(carsKing){
                that.carsking()
            }
            // 加载字体
            if (that.modlueFont) {
                var fontUrl="",
                    fontArr=that.modlueFont.split(",");
                if (that.windowHost == "www1.pcauto.com.cn") {
                    fontUrl="//www1.pcauto.com.cn/zt/pocket/font/";
                }else{
                    fontUrl="fonts/";
                };
                $.each(fontArr,function(i,m){
                    that.loadFontFace(m,fontUrl+m+".jpg");
                });
            }
            // 东财海报
            that.setDCcode();
            if (that.APP) {
                that.setFilebg(_this);
                if (c.hasClass("series")) {
                    m.setSerData("2924",'碰碰车',"默认文案",'//www1.pcauto.com.cn/wap/pocket/20170516poster/images/modlue214mr.jpg','//www1.pcauto.com.cn/piclib/sogouvrsg/4550.jpg');
                }
                that.appCheck();
            }
            $("body").addClass("sale-head-show");
        });
    },
    setFilebg:function(obj){
        if (!$("#uploadPic-con").hasClass("saveNone")) {
            var c=$("#file-btn");
            this.fileBg.css({
                width:c.width(),
                height:c.height(),
                left:c.position().left,
                top:c.position().top,
                borderRadius:c.css("border-radius"),
                background:"url(images/filebg.jpg) center no-repeat",
                backgroundSize:"100% 100%"
            });
        }

    },
    setDCcode:function(){/*东财海报*/
        var a=$("#uploadPic-con");
        if (a.hasClass("modlue27")) {
            $(".modlue27 .icon1").css({
                "background":"url("+this.dcCodeUrl+")",
                "background-size":"100% 100%"
            });
        }
        this.seriesPopHide();
        this.setzdTxt();
        $("body").addClass("modluebtnShow");
        if (a.hasClass("sel-type")) {
            $("body").addClass("vvvvvvv");
        }else{
            $("body").removeClass("vvvvvvv");
        }
        // 对话
        if (a.hasClass("chat-bottom")) {
            $("body").addClass("modluebtnShow");
            if (a.hasClass("modlue41") || a.hasClass("modlue42")) {
                $(".dh-bg2").attr("src","images/modlue41bg2.png");
            }else{
                $(".dh-bg2").attr("src","images/modlue34bg2.png");
            }
            $(".dh-head").attr("src",$(".sale-head-img").attr("src"));
            $(".dh-name").html($(".sale-name").html());
            $(".dh-txt").html("来，到"+this.dealerName+"就可以买到，扫一扫这个二维码咱们聊聊");
        }else if(a.hasClass("saveNone") && !a.hasClass("series") && !a.hasClass("chat")){/*无上传图片-无车型-非对话*/
            $("body").addClass("modluebtnShow");
            if (a.hasClass("modlue44") || a.hasClass("modlue46") || a.hasClass("modlue47")) {
                $(".sale-name").html(this.saleName+"&nbsp&nbsp"+this.carName);
            }else if(a.hasClass("modlue45")){
                $(".sale-name").html("联系"+"&nbsp"+this.saleName);
            }else{
                $(".sale-name").html(this.saleName);
            }
            if (a.hasClass("modlue49")) {
                $(".zd-txt").html("揭秘"+this.dealerCity+"新首富"+this.saleName+"致富之路 —— 把顾客当上帝是前提，买车优惠力度大是根本.");
                $(".zd-txt2").html("扫码看看首富"+this.saleName+"的致富经.");
                $(".textarea").attr("placeholder","请输入内容(特价车型以及优惠详情)");
            }
            if (a.hasClass("modlue50")) {
                $(".zd-txt").html("来"+this.saledealerName);
                $(".zd-txt2").html("找"+this.saleName+"呐");
            }
        }
        this.sate=true;
    },
    tipTxt:function(str){
        var s='<div class="tip-txt" style="position: fixed;left: 0;width: 100%;text-align: center;color: #fff;font-size: .26rem;top: 5rem;z-index: 100002;display: none;" id="tip-txt"><p style="display: inline-block;margin: 0 .5rem; padding: .2rem .5rem; background: rgba(0,0,0,0.8); line-height: .45rem; overflow: hidden; border-radius: 5px;"></p></div>';
        if (!$("#tip-txt")[0]) {
            $("body").append(s);
        };
        if (!$("#tip-txt").is(":hidden")) {
            return false;
        };
        $("#tip-txt").show();
        $("#tip-txt p").html(str);
        setTimeout(function(){
            $("#tip-txt").hide();
        },3000);
    },
    // 设置文案
    setzdTxt:function(){
        var a=$("#uploadPic-con");
        if (a.hasClass("modlue33")) {
            this.inputPlder.attr("placeholder","端午促销限时3天！（点击编辑）");
        }else if(a.hasClass("modlue38")){
            this.inputPlder.attr("placeholder","月底促销3天！（点击编辑）");
        }else if(a.hasClass("modlue43") || a.hasClass("modlue45")){
            this.inputPlder.attr("placeholder","请输入内容");
        }else if(a.hasClass("modlue51")){
            this.inputPlder.attr("placeholder","请输入优惠内容，不超过16个字");
        }else if(a.hasClass("modlue52")){
            this.inputPlder.attr("placeholder","(请输入日期)");
            this.zdTxt.html(this.saledealerName+'约定您!<br />扫码联系销售顾问'+this.saleName);
        }else if(a.hasClass("modlue53")){
            this.zdTxt.html('品牌：'+this.carName+'<br />门店：'+this.dealerName);
            $(".zd-txt2").html('找'+this.saleName+'<br />砍价去!!!')
        }else if(a.hasClass("modlue54")){
            this.zdTxt.html('记得来<i class="red">'+this.saledealerName+'</i><br />找我<i class="red">'+this.saleName+'</i>哟!');
        }else if(a.hasClass("modlue55")){
            this.zdTxt.html('为了让成年玩家安心玩游戏<br />也为了你的孩子身心健康<br />趁着暑期买辆车带着他出去郊游吧<br />马上到'+this.dealerName+'<br />找'+this.saleName+'咨询吧');
        }else if(a.hasClass("modlue57")){
            this.zdTxt.html('马上扫码到<br /><em>'+this.saledealerName+'</em><br />把你的骑士开回家')
        }else if(a.hasClass("modlue58")){
            this.inputPlder.attr("placeholder","请输入优惠内容，不超过15个字");
        }else if(a.hasClass("modlue59")){
            $("#textarea").attr("placeholder","请输入优惠内容");
        }else if(a.hasClass("modlue60")){
            this.zdTxt.html('因为如果给开'+this.carName+'的同学');
            $(".zd-txt2").html('到'+this.saledealerName+'<br />'+this.saleName+'和一起你去追梦')
        }
        if(a.hasClass("modlue61")){
            this.zdTxt.html('我是<br /><span class="red">'+this.carName+'<br />销售顾问');
            $(".zd-txt2").html('<span>'+this.saleName+'</span>');
            if (this.saleName.length >4) {
                $(".zd-txt2 span").css("font-size","1.1rem")
            }
            $(".zd-txt3").html('<span>或者</span>我在<i class="red">'+this.saledealerName+'</i>等你');
        }else{
            $(".zd-txt2 span").removeAttr("style")
        }
         if(a.hasClass("modlue62")){
            this.zdTxt.html('我是<span class="red">'+this.saleName+'</span><br />我为<i class="red">'+this.carName+'</i>带盐');
           $(".zd-txt2").html('我在<i class="red">'+this.saledealerName+'</i>等你')
         }
         if (a.hasClass("modlue64")) {
            this.zdTxt.html(this.saleName+"<br />品牌："+this.carName+"<br />门店："+this.saledealerName);
         }
         if (a.hasClass("modlue65") || a.hasClass("modlue438") ) {
            this.inputPlder.attr("placeholder","请输入时间");
            $("#input2").attr("placeholder","请输入地址");
         }
        if (a.hasClass("modlue66")) {
            this.zdTxt.html('这一切<span class="yellow">'+this.saleName+'</span>都可以帮到你，<br />还不赶紧抓住<br /><span class="yellow">灰姑娘变白雪公主</span>，<br />青蛙变王子的机会么！<br />快到<span class="yellow">'+this.saledealerName+'</span>找Ta吧！');
        }
        if (a.hasClass("modlue68")) {
            this.zdTxt.html('<span class="name-txt yellow">'+this.saleName+'</span>站在<br><span class="dealerName yellow">'+this.saledealerName+'</span>门口');
        }
        if (a.hasClass("modlue69")) {
            $(".box-input").html('<div><span class="red db">'+this.dealerCity+'</span><span class="db">车神</span><p contenteditable="true" class="contenteditable contenteditable4 db red" placeholder="名称"></p><span class="db">座驾升级</span></div><div><span class="f44 db">正式提</span><p contenteditable="true" placeholder="请输入车系" class="contenteditable contenteditable5 f44 db"></p><span class="f44 db">，引起全城围观！</span></div><p class="modlue69-text">(&nbsp;&nbsp;)—— 自从开上(&nbsp;&nbsp;)，腰不酸了，腿不疼了。现在开始，在广州再没有人可以超我的车！</p>');
            this.zdTxt.html('对于消费者的高度评价送锦旗的行为，'+this.saledealerName+'低调回应：他好，我也好');
            $(".zd-txt2").html('来自<span class="f45">'+this.saledealerName+'</span><br><span class="red">的销售顾问<i class="f45">'+this.saleName+'</i></span><br>有望当选今年全国劳模');
            $(".zd-txt3").html('<div>'+Month+'/'+rgetDate+'</div><div class="f4">'+Year+'</div><div>星期'+weeks[mDay]+'</div>');
            $(".contenteditable4")[0].oninput=function(){
                var _this=$(this);
                var s1=$(".contenteditable4").text().length > 0 ? $(".contenteditable4").text() : "";
                var s2=$(".contenteditable5").text().length > 0 ? $(".contenteditable5").text() : "";
                if (s1.length > 3) {
                    s1=s1.substring(0,3);
                }
                if (!s2) {
                    s2="";
                }
                if (s2.length > 6) {
                    s2=s2.substring(0,6);
                }
                var _str=s1+'—— 自从开上'+s2+'，腰不酸了，腿不疼了。现在开始，在'+m.dealerCity+'在没有人可以超我的车！';
                $(".modlue69-text").html(_str);
            }
            $(".contenteditable5")[0].oninput=function(){
                var _this=$(this);
                var s1=$(".contenteditable4").text().length > 0 ? $(".contenteditable4").text() : "";
                var s2=$(".contenteditable5").text().length > 0 ? $(".contenteditable5").text() : "";
                if (s1.length > 3) {
                    s1=s1.substring(0,3);
                }
                if (!s2) {
                    s2="";
                }
                if (s2.length > 6) {
                    s2=s2.substring(0,6);
                }
                var _str=s1+'—— 自从开上'+s2+'，腰不酸了，腿不疼了。现在开始，在'+m.dealerCity+'在没有人可以超我的车！';
                $(".modlue69-text").html(_str);
            }
        }
        if (a.hasClass("modlue71")) {
            this.zdTxt.html(this.saleName+"&nbsp;&nbsp;"+this.proName);
        }
        if (a.hasClass("modlue72")) {
            this.zdTxt.html('来'+this.saledealerName+'<br />扫码找'+this.saleName+'<br />一次满足你的所有愿望');
        }
        if (a.hasClass("carCard")) {
            this.zdTxt.html("<p class='box73'><span>"+this.saleName+"</span><span class='sale-name73'>"+this.proName+"</span></p><p class='locatname73'>"+this.saledealerName+"</p>");
        };
        if (a.hasClass("modlue74")) {
            this.zdTxt.html("<p class='box74'><span>"+this.saleName+"</span><span class='sale-name74'>"+this.proName+"</span></p><p class='locatname74'>"+this.saledealerName+"</p>");
        };
        if (a.hasClass("modlue78")) {
            this.zdTxt.html('<span class="yellow">'+this.saleName+'</span><br />'+this.carNameS+this.level);
            $(".box-input").html('<span class="db">恭喜</span><p contenteditable="true" class="contenteditable contenteditable4 db yellow" placeholder="请输入客户名称"></p><span class="db">喜提</span><br /><p contenteditable="true" class="contenteditable contenteditable5 yellow" placeholder="请输入车型"></p><br /><p class="db">'+this.dealerName+'</p><br /><p class="db">全体员工祝您和您的家人</p><p class="db">身体健康，用车愉快！</p>');
        };
        if (a.hasClass("modlue79")) {
            this.zdTxt.html('<img src="images/modlue79icon1.png" alt="">'+this.saleName);
            $(".zd-txt2").html('<p><b class="b b1"></b><b class="b b2"></b><b class="b b3"></b><b class="b b4"></b>我在'+this.dealerCity+'为灾区祈福</p>');
        }
        if (a.hasClass("modlue80")) {
            this.zdTxt.html('<span class="db">我叫</span><span class="db m-name">'+this.saleName+'</span><br /><span class="db m-dm">'+this.dealerName+'</span><br /><span class="db">的一名</span><span class="db">'+this.level+'</span>');
        };
        if (a.hasClass("modlue81")) {
            this.zdTxt.html('就到'+this.dealerName+'<br />要优惠<br />就扫码联系'+this.saleName);
            $(".box-input").html('<p contenteditable="true" data-max="15" class="contenteditable" placeholder="输入优惠内容(10个字)"></p>');
            if (this.proName.length > 4) {
                $(".zd-txt2").html(this.carNameS+'<span class="red">厂家直销专场</span>'+this.dealerCity+'站');
            }else{
                $(".zd-txt2").html(this.carNameS+'<span class="red">厂家直销专场</span><br />'+this.dealerCity+'站');
            }
        }
        if (a.hasClass("modlue90")) {
            this.zdTxt.html('马上扫码联系你的专属顾问<p class="yellow">'+this.saleName+'</p>享受车展优惠价');
        }
        if (a.hasClass("modlue91")) {
            this.zdTxt.html('来<span class="yellow" id="dealerShortName">'+this.dealerName+'</span><br />'+this.saleName+'帮你度过一个<br>浪漫的七夕');
        }
        if (a.hasClass("modlue97")) {
            this.zdTxt.html('我是<i class="bs">'+this.saleName+'</i>我在'+this.dealerCity+'为中国队呐喊助威！');
        }
        if (a.hasClass("modlue105")) {
            this.zdTxt.html(this.saleName+"&nbsp;&nbsp;"+this.proName)
        }
        if (a.hasClass("modlue107")) {
            this.zdTxt.html(this.dealerName);
        }
        if (a.hasClass("modlue111")) {
            this.zdTxt.html('<div><span class="yellow">'+this.saleName+'</span>祝你节日快乐<br /><p>'+this.dealerName+'</p></div>');
            $(".contenteditable1").attr("placeholder","请输入优惠内容");
            var _v=$(".contenteditable1").height();
            $(".contenteditable1").on("input blur focus",function(){
                if ($(this).height() > _v) {
                    $(".contenteditable1").height("1.1rem");
                }
            });
        }else{
            $(".contenteditable1").attr("style",null)
        }
        if (a.hasClass("modlue114") || a.hasClass("modlue115")) {
            this.zdTxt.html('<div><p>'+this.saleName+'&nbsp;&nbsp;'+this.proName+'</p><p class="yellow">'+this.dealerName+'</p></div>');
        }
        if (a.hasClass("modlue116")) {
            this.zdTxt.html(this.saleName+":"+this.level);
            $(".zd-txt2").html(Month);
            $(".zd-txt3").html(rgetDate);
            $(".zd-txt4").html('星期'+weeks[mDay]);
        }
        if (a.hasClass("modlue127") || a.hasClass("modlue132")) {
            this.zdTxt.html('<div><p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p></div>');
        }
        if (a.hasClass("modlue128") || a.hasClass("modlue467")) {
            this.zdTxt.html('<div><p><span>'+this.saleName+'</span>'+this.level+'</p><p>'+this.dealerName+'</p></div>');
            $(".zd-txt2").html('<span>到'+this.dealerName+'，一起来“鬼混”</span>');
        }
        if (a.hasClass("modlue130") || a.hasClass("modlue522")) {
            this.zdTxt.html('<div>来'+this.dealerName+'<br />我们聊聊如何奔小康<br />讨厌！不要叫我'+this.saleName+'<br /><span>叫我雷锋</span></div>');
        }
        if (a.hasClass("modlue131") || a.hasClass("modlue523")) {
            this.zdTxt.html('<div>来'+this.dealerName+'<br />不要叫我'+this.saleName+'<br /><span>叫我雷锋</span></div>');
        }
        if (a.hasClass("modlue136")) {
            var dday=this.countDown('2018-1-1 00:00:00');
            this.zdTxt.html('我是<span class="p-name">'+this.saleName+'</span><br />你来或不来<br />都会在<span class="red">'+this.dealerName+'</span>等你');
            $(".zd-txt2").html('结束还有<span>'+dday.day+'</span>天');
        }
        if (a.hasClass("modlue137")) {
            this.zdTxt.html('我叫<span class="red">'+this.saleName+'</span><br />我有些话想说出来很久了<br />我在汽车行业工作那么多年<br />也知道经销商<span class="red">很多不为人知的内幕</span><br />我觉得，我不能再隐瞒下去了<br />今天我<span class="red">必须</span>要说出来');
            $(".zd-txt2").html('为了完成年底业绩冲刺<br />汽车经销商在这个时候<br />都会<span class="yellow">不计成本</span>，拿出<span class="yellow">最大优惠</span><br />就像<span class="yellow">'+this.dealerName+'</span><span class="img"><img src="images/modlue137icon1.png" alt="" /></span>');
            $(".zd-txt3").html(this.mobile);
            $(".zd-txt4").html(Year+"<br />"+Month+"."+rgetDate);
        };
        if (a.hasClass("modlue138") || a.hasClass("modlue543")) {
            this.zdTxt.html(this.saleName);
            $(".zd-txt2").html('<b>'+dealerName+'</b><br />为感恩新老客户的支持与信赖');
            $(".contenteditable1").attr("placeholder","请输入优惠内容");
        };
        if (a.hasClass("modlue139") || a.hasClass("modlue544")) {
            this.zdTxt.html(this.saleName);
        };
        if (a.hasClass("modlue148")) {
            this.zdTxt.html('<span>'+this.dealerName+'</span>');
            $(".zd-txt2").html("大baobao_"+this.saleName);
        };
        if (a.hasClass("modlue150")) {
            this.zdTxt.html(this.saleName);
            $(".zd-txt2").html(this.dealerName);
        };
        if (a.hasClass("modlue151")) {
            this.zdTxt.html(this.saleName);
            $(".zd-txt2").html('或者直接来'+this.dealerName+'<br />我等你');
        };
        if (a.hasClass("modlue153")) {
            var dday=this.countDown('2018-1-1 00:00:00');
            this.zdTxt.html(dday.day);
            $(".zd-txt2").html('<div><p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p></div>')
        };
        if (a.hasClass("modlue155") || a.hasClass("modlue569")) {
            this.zdTxt.html('<div><p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p></div>');
            $(".zd-txt3").html('就来'+this.dealerName);
            $(".contenteditable1").attr("placeholder","请输入优惠内容");
        }
        if (a.hasClass("modlue156")) {
            this.zdTxt.html('<p><img src="images/modlue156icon.png" alt="" /><span>'+this.saleName+'</span><img src="images/modlue156icon2.png" alt="" /></p>');
        };
        if (a.hasClass("modlue157")) {
            this.zdTxt.html('我是<span>'+this.saleName+'</span><br />来自'+this.dealerName+'<br />我为东风日产代言');
        }
        if (a.hasClass("modlue158")) {
            this.zdTxt.html(this.saleName);
        }
        if (a.hasClass("modlue162")) {
            this.zdTxt.html('<div><p>'+this.saleName+'</p><p>'+this.level+'</p></div>');
            $(".zd-txt2").html(this.dealerName+'<br />'+this.dealerAddress);
        };
        if (a.hasClass("modlue167")) {
            this.zdTxt.html('<p>来'+this.dealerName+'</p><p>'+this.saleName+'来告诉你</p><p>我们和他们哪里不同</p>');
        }
        if (a.hasClass("modlue186")) {
            this.zdTxt.html('<div><p>来啊~ 看车啊~</p><p>找'+this.saleName+'~ 反正有<b>大把优惠</b></p></div>');
            $(".zd-txt2").html(this.dealerName);
        }
        if (a.hasClass("modlue187")) {
            this.zdTxt.html(this.dealerCity+'是什么样子吗？');
            $(".zd-txt2").html('我是'+this.saleName);
        };
        if (a.hasClass("modlue199") || a.hasClass("modlue578")) {
            this.zdTxt.html("就在"+this.dealerName);
            $(".zd-txt2").html('<span>'+this.saleName+'</span><span>'+this.proName+'</span>')
        }
        if (a.hasClass("modlue201")) {
            this.zdTxt.html("就找"+this.saleName);
            $(".zd-txt2").html(this.dealerName);
        };
        if (a.hasClass("modlue210")) {
            $(".zd-txt3").html(this.saleName)
           $(".zd-txt2").html('<div><p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p></div>');
        };
        if (a.hasClass("modlue237")) {
            $(".zd-txt3").html(this.saleName)
        };
        if (a.hasClass("modlue238")) {
            $(".zd-txt3").html(this.dealerCity)
            $(".zd-txt2").html('<p><i>'+this.mobile+'</i>&nbsp;&nbsp;<i>'+this.saleName+'</i></p>')
            $(".zd-txt4").html('<p><i>'+this.dealerName+'</i><i class="sou"></i></p>')
        };
        if (a.hasClass("modlue154")) {
            this.bgURL=this.bgURL ?  this.bgURL : "";
            if (this.bgURL) {
                $(".modlue154").css({
                    background:"url("+this.bgURL+") top center no-repeat",
                    backgroundSize:"100% 100%"
                });
            }
        }
        if (a.hasClass("modlue220")) {
            this.zdTxt.html('<div><p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p></div>')
        };
        if (a.hasClass("modlue221")) {
            this.zdTxt.html('<div><p>'+this.saleName+'</p><p>'+this.dealerName+'</p></div>')
        };
        if (a.hasClass("modlue222")) {
            this.zdTxt.html(this.proName+",总有一款适合你");
            $(".zd-txt2").html(this.level+this.saleName+'和'+this.dealerName+'全体工作人员祝你用车愉快！我们将竭诚为您今后的用车生活保驾护航。');
            $("#input").attr("placeholder","（请填写车主信息，如：XXX成功提车）");
            $(".zd-txt3").html(this.level+"<br />"+this.saleName)
        }
        if (a.hasClass("modlue269") || a.hasClass("modlue271") || a.hasClass("modlue272")) {
            this.zdTxt.html('<p>在'+this.dealerName+'</p><p>2017年</p><p>团队的合作才让我们看到您满意的微笑</p><p>2018年</p><p>我们的团队将会为您带来更优质的服务</p>');
            $(".zd-txt2").html('<p>更优质的服务</p><p>让'+this.saleName+'带您体验</p>');
        };
        if (a.hasClass("modlue283")) {
            var cjClass;
            if (Month*1 == 2) {
                if (rgetDate == 15) {
                    cjClass='chuxi';
                }else if (rgetDate == 16) {
                    cjClass='chuyi';
                }else if (rgetDate == 17) {
                    cjClass='chuer';
                }else if (rgetDate == 18) {
                    cjClass='chusan';
                }else if (rgetDate == 19) {
                    cjClass='chusi';
                }else if (rgetDate == 20) {
                    cjClass='chuwu';
                }else if (rgetDate == 21) {
                    cjClass='chuliu';
                }else if (rgetDate == 22) {
                    cjClass='chuqi';
                }
                a.addClass(cjClass);
                $("#modlue-type .active img").attr({
                    "data-original":"images/"+cjClass+".jpg",
                    "src":"images/"+cjClass+".jpg"
                })
            }
        };
        if (a.hasClass("modlue284")) {
            this.zdTxt.html('<p>来自'+this.dealerName+'</p><p>'+this.level+this.saleName+'的温馨提醒</p>');
        };
        if (a.hasClass("modlue285")) {
            var rq=this.CNDateString(myDate);
            this.zdTxt.html(rq.year+"|"+rq.month);
            $(".zd-txt2").html('<div><p>新的一年'+this.dealerName+'</p><p>全体员工将继续全心全意为</p><p>广大新老客户真诚服务</p><p>我是'+this.saleName+'&nbsp;买车请找我</p></div>')
        }
        if (a.hasClass("modlue286")) {
            this.zdTxt.html('<p>'+this.level+'<b class="red">'+this.saleName+'</b></p><p>携<span class="red">'+this.dealerName+'</span>全体员工祝</p>')
        }
        if (a.hasClass("modlue287")) {
            this.zdTxt.html('<p>'+this.level+'<b class="red">'+this.saleName+'</b></p><p>携<span class="red">'+this.dealerName+'</span>全体员工</p><p>向广大新老客户们拜年啦！</p>')
        }
        if (a.hasClass("modlue288")) {
            this.zdTxt.html('<p>'+this.dealerName+'</p><p>'+this.level+this.saleName+'祝您元宵节快乐</p>')
        };
        if (a.hasClass("modlue289") || a.hasClass("modlue290") || a.hasClass("modlue291")) {
            this.zdTxt.html('来自 <span>'+this.dealerName+'</span> 的女神 <i>'+this.saleName+'</i>')
        }
        if (a.hasClass("modlue292")) {
            this.zdTxt.html('<div><p>要买车？扫码找'+this.saleName+'</p><p>就在'+this.dealerName+'</p></div>')
        }
        if (a.hasClass("modlue293")) {
            this.zdTxt.html('我是'+this.saleName+'，我为诚信代言！');
            $(".zd-txt2").html('<p>选择'+this.proName+'</p><p>选择'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue296")) {
            this.zdTxt.html('<p>我是'+this.saleName+'</p><p>诚邀你莅临'+this.dealerName+'</p>');
        }
        if (a.hasClass("modlue297")) {
            $(".contenteditable1").attr("placeholder","请输入团购活动日期");
            this.zdTxt.html('<p>不见不散</p><p>我在'+this.dealerName+'等你</p>');
            $(".zd-txt2").html('<p>扫码找'+this.saleName+'</p><p>有更多购车惊喜</p>');
        }
        if (a.hasClass("modlue298")) {
            $(".zd-txt2").html('<p>—— 尼古拉斯·'+this.saleName+'</p>');
        }
        if(a.hasClass('modlue302')){
            this.zdTxt.html('<p>'+this.saleName+'就是要开单</p><p>怎么实现不用管</p>');
        }
        if(a.hasClass('modlue303')){
            this.zdTxt.html('<p>'+this.dealerName+this.saleName+'</p>');
            $(".zd-txt2").html('<p>如遇突发事件，请致电<i>'+this.mobile+'</i></p><p>我们将用最优质的服务为您的出行保驾护航</p>');
        }
        if (a.hasClass("bjcz0425")) {
            this.zdTxt.html('<p>'+this.saleName+"&nbsp;&nbsp;"+this.proName+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue318")) {
            this.zdTxt.html('<p>风里雨里节日里，我都会在</p><p>'+this.dealerName+'等你</p>')
        }
        if (a.hasClass("modlue320")) {
            this.zdTxt.html('<p>这，就是'+this.saleName+'的故事，</p><p>愿你也能成为更好的自己！</p>')
        }
        if (a.hasClass("modlue321")) {
            this.zdTxt.html('<p>看车电话：<i>'+this.mobile+'</i></p>')
            $(".zd-txt2").html('<p>'+this.dealerName+'</p>');
        }
        if (a.hasClass("modlue324")) {
            this.zdTxt.html('<p>'+this.saleName+'<i>'+this.level+'</i></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue325")) {
            this.zdTxt.html('<p>'+this.saleName+'<i>'+this.level+'</i></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue327")) {
            this.zdTxt.html('<p>我是<i>'+this.saleName+'</i></p><p>扫码开启长情告白</p>')
        }
        if (a.hasClass("modlue329")) {
            this.zdTxt.html('<p>一汽丰田</p><p>表白<span>520</span></p><p>'+this.saleName+'<i>邀您</i></p><p><i>扫码</i>领福利</p>')
        }
        if (a.hasClass("modlue330")) {
            this.zdTxt.html('<p>'+this.saleName+'的日记</p>')
            $(".zd-txt2").html('<p>我爱'+this.dealerName+'</p>')
            $(".zd-txt3").html('<p>'+this.fun_date(-3)+'</p>')
            $(".zd-txt4").html('<p>'+this.fun_date(-2)+'</p>')
            $(".zd-txt5").html('<p>'+this.fun_date(-1)+'</p>')
            $(".zd-txt6").html('<p>'+this.fun_date(0)+'</p>')
            $(".zd-txt7").html('<p>'+this.fun_date(0)+'补充：经理说，年中冲量活动是要搞的，</p>')
        }
        if (a.hasClass("modlue331")) {
            this.zdTxt.html('<p>'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue332")) {
            this.zdTxt.html('<p>'+this.saleName+'<i>'+this.proName+'</i></p>')
            $(".zd-txt2").html('<p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue333")) {
            this.zdTxt.html('<p>'+this.saleName+'<i>'+this.proName+'</i></p>')
            $(".zd-txt2").html('<p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue334")) {
            this.zdTxt.html('<p>买英菲尼迪</p><p>就到'+this.dealerName+'专营店</p>')
        }
        if (a.hasClass("modlue335")) {
            this.zdTxt.html('<p>扫码到'+this.dealerName+'</p><p>给你的爱车清凉一“夏”</p>')
        }
        if (a.hasClass("modlue339")) {
            this.zdTxt.html('<p>'+this.saleName+'</p><p>'+this.level+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue341")) {
            this.zdTxt.html('<p>'+this.saleName+'</p>')
            $(".zd-txt3").html('<p>'+this.saleName+'</p>')
            $(".zd-txt2").html('<p>或者，你可以选择把车送到</p><p><i>'+this.dealerName+'</i>来保养，扫码预约</p>')
        }
        if (a.hasClass("modlue342")) {
            this.zdTxt.html('<p>'+this.saleName+'</p><p>'+this.level+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue343")) {
            this.zdTxt.html('<p>买车就买<i>'+this.proName+'</i></p><p>买'+this.proName+'就到'+this.dealerName+'</p><p>来'+this.dealerName+'就找'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue345")) {
            this.zdTxt.html('<p>'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue352")) {
            this.zdTxt.html('<p>'+this.saleName+'</p><p>'+this.level+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue354")) {
            this.zdTxt.html('<p>扫码找'+this.saleName+'</p><p>来'+this.dealerName+'</p><p>一起WEY胜利呐喊！</p>')
        }
        if (a.hasClass("modlue359")) {
            this.zdTxt.html('<p>扫码找'+this.saleName+'</p><p>今晚和你一起吃鸡</p>')
        }
        if (a.hasClass("modlue360")) {
            this.zdTxt.html('<p>'+this.saleName+'&nbsp;'+this.level+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue362")) {
            this.zdTxt.html('<p>'+this.saleName+'&nbsp;'+this.level+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue366")) {
            this.zdTxt.html('<p>'+this.saleName+'&nbsp;'+this.proName+'</p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue367")) {
            this.zdTxt.html('潜伏在'+this.dealerName)
        }
        if (a.hasClass("modlue368")) {
            this.zdTxt.html('<p>马上找'+this.saleName+'订车电话</p><p>'+this.mobile+'</p>')
        }
        if (a.hasClass("modlue369")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.proName+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue370")) {
            var that = this;
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
            that.zdTxt.html('<p>我是'+that.saleName+'</p><p>邀您共同见证</p>')
            /*
            var time1 = new Date("2018/08/25 00:00:00").getTime();//倒数第二天
            var time2 = new Date("2018/08/26 00:00:00").getTime();//倒数第一天
            var time3 = new Date("2018/08/27 00:00:00").getTime();//上线
            var time4 = new Date().getTime();
            console.log(new Date().getDate())
            if(time1<time4 && time4<time2){
                $('.modlue370').addClass('modlue370_2bg')
            }else if(time2<time4 && time4<time3){
                console.log(233)
                $('.modlue370').removeClass('modlue370_2bg')
                $('.modlue370').addClass('modlue370_3bg')
            }else if(time4>time3){
                $('.modlue370').removeClass('modlue370_2bg')
                $('.modlue370').removeClass('modlue370_3bg')
                $('.modlue370').addClass('modlue370_4bg')
                that.zdTxt.html('<p>我是'+that.saleName+'</p><p>邀您共同见证</p>')
            }
            */
        }
        if (a.hasClass("modlue372")) {
            $(".zd-txt2").html('<p>·<span>'+this.saleName+'提醒您</span>·</p>')
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.proName+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue373")) {
            
            var time1 = new Date("2018/08/27 00:00:00").getTime();//倒数第二天
            var time2 = new Date("2018/08/28 00:00:00").getTime();//倒数第一天
            var time3 = new Date("2018/08/29 00:00:00").getTime();//上线
            var time4 = new Date().getTime();
            if(time1<time4 && time4<time2){
                // 222222222 倒数2
                $('#uploadPic-con').attr("class","uploadPic-con modlue373 saveNone modlue373_2bg")
            }else if(time2<time4 && time4<time3){
                //33333333 倒数1
                $('#uploadPic-con').attr("class","uploadPic-con modlue373 saveNone modlue373_1bg")
            }else if(time4>time3){

            }
            
            this.zdTxt.html('<span>'+this.saleName+'</span><i>'+this.proName+'</i>');
            $(".zd-txt2").html(this.dealerName)
        }
        if (a.hasClass("modlue375")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue377")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue378")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue379")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue380")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue381")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue382")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
         if (a.hasClass("modlue383")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue384")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("cz0830")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue390")) {
            this.zdTxt.html('<p>我是'+this.saleName+'</p><p>邀您体验匠心魏派</p>')
        }
        if (a.hasClass("modlue400") || a.hasClass("modlue405") || a.hasClass("modlue406") || a.hasClass("modlue407")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue402")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue403")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue405")) {
            // this.zdTxt.html('<p></p>')
        }
        if (a.hasClass("modlue408")) {
            this.zdTxt.html('<p>'+this.saleName+'<span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue409")) {
            this.zdTxt.html('<p>我是'+this.saleName+'呀！</p>')
        }
        if (a.hasClass("modlue410")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue411")) {
            this.zdTxt.html('<p>我<span>'+this.saleName+'</span>啊！</p>')
            $(".zd-txt2").html('<p>来<span>'+this.dealerName+'</span></p>')
            $(".zd-txt3").html('<img src="./images/modlue411ss_03.png">')
        }
        if (a.hasClass("modlue413")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue414")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue415") || a.hasClass("modlue416") || a.hasClass("modlue417") || a.hasClass("modlue480") || a.hasClass("modlue482") || a.hasClass("modlue484") || a.hasClass("modlue481")|| a.hasClass("modlue476") || a.hasClass("modlue477") || a.hasClass("modlue418") || a.hasClass("modlue470") || a.hasClass("modlue471") || a.hasClass("modlue472") || a.hasClass("modlue473") || a.hasClass("modlue419") || a.hasClass("modlue469") || a.hasClass("modlue421")|| a.hasClass("modlue422")|| a.hasClass("modlue423")|| a.hasClass("modlue424")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue425") || a.hasClass("modlue434")|| a.hasClass("modlue435")|| a.hasClass("modlue436") || a.hasClass("modlue552") || a.hasClass("modlue437") || a.hasClass("modlue441") || a.hasClass("m18930") || a.hasClass("modlue449") || a.hasClass("modlue451") || a.hasClass("modlue452") || a.hasClass("modlue454") || a.hasClass("modlue455")|| a.hasClass("modlue458") || a.hasClass("modlue461") || a.hasClass("modlue464") || a.hasClass("modlue465") || a.hasClass("modlue466") || a.hasClass("modlue468")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue420")) {
            this.zdTxt.html('<p>来'+this.dealerName+'，</p>')
        }
        if (a.hasClass("modlue426")) {
            $(".zd-txt2").html('<p>我是售后服务人员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue427")) {
            $(".zd-txt2").html('<p>我是销售人员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue428")) {
            $(".zd-txt2").html('<p>我是市场专员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue429")) {
            $(".zd-txt2").html('<p>我是电销专员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue430")) {
            $(".zd-txt2").html('<p>我是销售人员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue431")) {
            $(".zd-txt2").html('<p>我是市场专员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue432")) {
            $(".zd-txt2").html('<p>我是客服人员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue433")) {
            $(".zd-txt2").html('<p>我是试驾人员<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("modlue439")) {
            this.zdTxt.html('<p>我是'+this.saleName+'</p>')
            $(".zd-txt2").html('<p>'+this.dealerCity+'高桥梁介</p>')
            $(".zd-txt3").html('<p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue440")) {
            this.zdTxt.html('<p>我是'+this.saleName+'</p><p>我在<span>'+this.dealerCity+'</span>为祖国庆生</p>')
        }
        if (a.hasClass("modlue450")) {
            this.zdTxt.html('<p>马上找<span>'+this.saleName+'</span></p>')
        }
        if (a.hasClass("hf0928") || a.hasClass("nhf0928")) {
            this.zdTxt.html('<p>我是'+this.dealerName+'<span>'+this.level+'</span><span>'+this.saleName+',</span>诚邀您一起竞逐哈弗之星！</p>')
        }
        if (a.hasClass("modlue453")) {
            this.zdTxt.html('<p>扫码找'+this.saleName+'买车</p><p>送同款网红眉毛造型</p>')
        }
        if (a.hasClass("modlue456")) {
            this.zdTxt.html(this.saleName)
            $(".zd-txt2").html('<p>甲方：'+this.dealerName+'</p>')
            $(".zd-txt3").html('<p>'+this.level+'</p><p>'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue460")) {
            this.zdTxt.html('<p>来'+this.dealerName+'</p><p>'+this.saleName+'和你玩转智炫座驾</p>')
        }
        if (a.hasClass("modlue462")) {
            this.zdTxt.html('-'+this.saleName+'的套马杆-')
        }
        if (a.hasClass("modlue463") || a.hasClass("modlue479")) {
            this.zdTxt.html('<p>'+this.saleName+'邀您</p><p>共同见证!</p>')
        }
        if (a.hasClass("modlue474") || a.hasClass("modlue475")) {
            this.zdTxt.html('<p>我是'+this.saleName+',</p><p>连接你我的桥从这里开始</p>')
        }
        if (a.hasClass("modlue478")) {
            this.zdTxt.html('<p>我是'+this.saleName+'</p><p>我在使用口袋蜜蜂</p>')
        }
        if (a.hasClass("modlue487") || a.hasClass("modlue488") || a.hasClass("modlue611") || a.hasClass("modlue560") || a.hasClass("modlue605") || a.hasClass("modlue606") || a.hasClass("modlue607") || a.hasClass("modlue608") || a.hasClass("modlue609") || a.hasClass("modlue594") || a.hasClass("modlue554")|| a.hasClass("modlue558") || a.hasClass("modlue556") || a.hasClass("modlue557") || a.hasClass("modlue555") || a.hasClass("modlue489") || a.hasClass("modlue490") || a.hasClass("modlue491") || a.hasClass("modlue492")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue494")) {
            this.zdTxt.html('<p>今晚20：00</p><p>'+this.saleName+'邀您</p><p>共同见证</p>')
        }
        if (a.hasClass("modlue495") || a.hasClass("modlue496") || a.hasClass('modlue510') || a.hasClass('modlue511') || a.hasClass('modlue514')) {
            this.zdTxt.html('<p>'+this.saleName+'邀您共同见证</p>')
        }
        if (a.hasClass("modlue521")) {
            this.zdTxt.html('<p>'+this.saleName+'邀请你共同关注</p><p>新一代福克斯上市发布会</p>')
        }
        if (a.hasClass("modlue524")) {
            this.zdTxt.html('<p>'+this.saleName+'收</p>')
        }
        if (a.hasClass("modlue529")) {
            this.zdTxt.html('<p>'+this.saleName+'邀您见证新梦想开启</p>')
        }
        if (a.hasClass("modlue530")) {
            this.zdTxt.html('<p>今晚18：10</p><p>'+this.saleName+'邀您</p><p>探寻魅力之境</p>')
        }
        if (a.hasClass("modlue531")) {
            this.zdTxt.html('<p>'+this.saleName+'为你竭力服务</p>')
            $(".zd-txt2").html('<p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("cz1116")) {
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if (a.hasClass("modlue545")) {
            this.zdTxt.html('<p>我'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue553")) {
            var date1 = new Date(),
            time1=date1.getFullYear()+"年"+(date1.getMonth()+1)+"月"+date1.getDate()+'日';
            this.zdTxt.html('<i>为什么</i>我'+this.saleName+'一直都在')
            $(".zd-txt2").html('<p>'+this.saleName+'</p><p>'+time1+'</p><p>写于'+this.dealerName+'</p>')
            this.fun_date(0)
        }
        if (a.hasClass("modlue561") || a.hasClass("modlue568")) {
            this.zdTxt.html('<p>你就是我'+this.saleName+'在等的人</p>')
            $(".zd-txt2").html('就在'+this.dealerName)
        }
        if (a.hasClass("modlue572")) {

            this.zdTxt.html('<span>'+this.saleName+'</span><span>'+this.level+'</span>')
            $(".zd-txt2").html(''+this.dealerName)
        }
        if (a.hasClass("modlue573")) {
            this.zdTxt.html('<span>我，'+this.saleName+'</span>')
            $(".zd-txt3").html('在'+this.dealerName+'等你')
            $(".zd-txt2").html('都一直在这里')
        }
        if (a.hasClass("modlue575")) {
            this.zdTxt.html('<p>'+this.saleName+'提醒你</p><p>请勿滥用远光灯</p>')
        }
        if (a.hasClass("modlue576")) {
            this.zdTxt.html('<p>----'+this.saleName+'</p>')
        }
        if (a.hasClass("modlue577")) {
            this.zdTxt.html(this.saleName+"邀您共同见证")
        }
        if (a.hasClass("modlue562")) {
            this.zdTxt.html(this.level+this.saleName)
        }
        if(a.hasClass("modlue580")){
            this.zdTxt.html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
            $(".zd-txt2").html(Year+"年"+Month+"月"+rgetDate+"日")
        }
        if(a.hasClass("modlue582")){
            this.zdTxt.html('<p><span>'+this.saleName+'提醒您年底最后购车时间还剩</span>')
            var time6 = new Date("2018/12/26 00:00:00").getTime();//倒数第二天
            var time5 = new Date("2018/12/27 00:00:00").getTime();//倒数第一天
            var time4 = new Date("2018/12/28 00:00:00").getTime();//上线
            var time3 = new Date("2018/12/29 00:00:00").getTime();//倒数第二天
            var time2 = new Date("2018/12/30 00:00:00").getTime();//倒数第一天
            var time1 = new Date("2018/12/31 00:00:00").getTime();//上线
            var time7 = new Date().getTime();
            if(time5>time7 && time7>time6){
                console.log(12333)
                $('.modlue582').css('background','url(images/modlue582_06.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }else if(time4>time7 && time7>time5){
                console.log(123334)
                $('.modlue582').css('background','url(images/modlue582_05.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }else if(time3>time7 && time7>time4){
                console.log(123334)
                $('.modlue582').css('background','url(images/modlue582_04.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }else if(time2>time7 && time7>time3){
                console.log(123334)
                $('.modlue582').css('background','url(images/modlue582_03.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }else if(time1>time7 && time7>time2){
                console.log(123334)
                $('.modlue582').css('background','url(images/modlue582_02.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }else if(time7>time1){
                console.log(123334)
                $('.modlue582').css('background','url(images/modlue582_01.jpg) no-repeat')
                $('.modlue582').css('background-size','100% 100%')
            }
            // $(".zd-txt2").html(Year+"年"+Month+"月"+rgetDate+"日")
        }
        if(a.hasClass("modlue583")){
             this.zdTxt.html("<p>"+this.saleName+"继续和你一起</p><p>披荆斩棘，乘风破浪</p>")
        }
        if(a.hasClass("modlue584")){
            var text584 = ["天天开单","月月爆单","业绩达标","有钱","暴富","一夜暴富","马上暴富","躺着暴富","身价暴涨","赚他一个亿","肚子不再撑爆衬衫扣"]
            var rd = Math.floor(Math.random()*text584.length)
             this.zdTxt.html("<p>继续卖车</p>")
             $(".zd-txt3").html("<p>"+this.saleName+"</p><p>风华绝代金牌销售</p>")
             $(".zd-txt2").html("<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>"+"<p>"+text584[rd]+"</p>")
        }
        if(a.hasClass("modlue587")){
             this.zdTxt.html("<p>我，"+this.saleName+"</p>")
        }
        if(a.hasClass("modlue588")){
             this.zdTxt.html("<p>"+this.saleName+"</p>")
        }
        if(a.hasClass("modlue589")){
             this.zdTxt.html('<p>'+this.saleName+'<i>祝您元旦快乐 诸事顺意</i></p>')
        }
        if(a.hasClass("modlue590")){
             this.zdTxt.html('<p>'+this.saleName+'<i>力攀高峰</i></p>')
        }
        if(a.hasClass("modlue592")){
             this.zdTxt.html('<p>'+this.saleName+'带你</p><p>1分钟读懂新个税政策</p>')
        }
        if(a.hasClass("modlue593")){
             this.zdTxt.html('<p>我是'+this.saleName+'</p><p>'+this.dealerName+'</p>')
        }
        if(a.hasClass("modlue594")){
             // $(".zd-txt3").html('<p>'+Year+'</p><p>'+Month+'/'+rgetDate+'</p>')
        }
        if(a.hasClass("yiqiCountdown")){
             this.zdTxt.html(this.dealerCity+'站')
             $(".zd-txt3").html('<p><span>'+this.saleName+'</span><span>'+this.level+'</span></p><p>'+this.dealerName+'</p>')
        }
        if(a.hasClass("modlue601")){
             this.zdTxt.html(this.saleName+'邀您')
            
        }
        if(a.hasClass("modlue610") || a.hasClass("modlue612")){
            $(".zd-txt4").html("恭喜<span>"+this.dealerName+"</span>")
            $(".zd-txt2").html("地址:<span>"+this.dealerAddress+"</span>")
            $(".zd-txt3").html("电话:<span>"+this.mobile+"</span>")
             this.zdTxt.html('<p><span class="sp1">'+this.saleName+'</span><span class="sp2">'+this.level+'</span><span>'+this.dealerName+'</span></p>')
        }
        if (a.hasClass("saleLogo")) {
            if (!this.Logo) {
                this.Logo="images/pocketLog.jpg";
                this.saleLogo.attr("src",this.Logo);
            }else{
                this.imgTobase64(this.Logo,".sale-logo img");
                // this.imgToCanvasbase(this.Logo,function(data){
                //     $(".sale-logo img").attr("src",data);
                // });
            }
        }
    },
    fun_date:function(aa){//默认时间设置
            var date1 = new Date(),
            time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate()+aa);
            var time2 = (date2.getMonth()+1)+"月"+date2.getDate()+"日"
            return time2
    },
        // fun_date(7)
    inputTipCheck:function(type){
        if (this.modlueName.indexOf("tipmask") > 0) {
            if (type == true) {
                $("#uploadPic-con").removeClass("tipmask");
            }
            var a=$("#uploadPic-con").attr("class").split(" ")[1],
                b=this.modlueName.split(" ")[0];
            if (a == b && this.tipMask.is(":hidden")) {
                this.modlueName=this.modlueName.replace("tipmask","");
            }
        }
    },
    // 配置图片
    getViewPhoto:function(sgId){
        var that=this,
            c=$("#uploadPic-con");
        that.loading.show();
        that.loading.find(".load-txt").html("玩命加载中...");
        $.ajax({
            url:"//price.pcauto.com.cn/price/api/v1/pocket/model/view_photo",
            data:{sgId:sgId},
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                that.setViewPhoto(data);
            }
        });
    },
    setViewPhoto:function(data){
        var that=this;
        var _html="";
        that.ViewPhotoArr.length=0;
        if (data && data.length > 0) {
            $.each(data,function(i,m){
                if (m.bigThumb) {
                    if (m.name == "前灯" || m.name == "外后视镜" || m.name=="中控全景" || m.name == "仪表盘" || m.name == "发动机舱") {
                        that.ViewPhotoArr.push(m);
                        _html+='<a href="javascript:;" data-url="'+m.bigThumb+'" target="_self" title="">'+m.type+'--'+m.name+'<i class="a-icon"></i></a>';
                    }
                }
            });
            $("#viewphoto-pop .series-list").html(_html);
            that.seriesClik();
            $("#viewphoto-pop .series-list a:first").click();
            that.viewphotoSubmit();
        }
        $(".change-btn").show();
    },
    viewphotoShow:function(){
        $("#viewphoto-pop").show();
    },
    viewphotoHide:function(){
        $("#viewphoto-pop").hide();
    },
    viewphotoSubmit:function(){
        var active=$("#viewphoto-pop .active");
        if (active.length > 0) {
            this.viewphotoHide();
            var _url=active.attr("data-url");
            this.imgToCanvasbase(_url,function(data){
                filePicLoad(data);
            });
        }
    },
    // 车系点击
    seriesBtnCli:function(obj){
        var that=this;
        var _id=$("#series-pop .series-list .active").attr("data-id"),//车系id
            _text=$("#series-pop .series-list .active").html(),//车系名称
            _brandname=$("#series-pop .series-list .active").attr("data-name"),//品牌名称
            url='//www1.pcauto.com.cn/piclib/sogouvrsg/'+_id+'.jpg',
            MphotoUrl=$("#series-pop .series-list .active").attr("data-url");//实拍图-车系
        serbrandname=_brandname;
        serCx=_text;
        that.setSerData(_id,_text,_brandname,MphotoUrl,url);
    },
    imgToCanvasbase:function(url,fn){
        var that=this;
        if (!that.APP) {
            that.loading.show();
            that.loading.find(".load-txt").html("玩命加载中...");
        }
        var canvas = document.createElement('canvas');
            ctx=canvas.getContext("2d"),
            img=new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function(){
            canvas.width=this.naturalWidth;
            canvas.height=this.naturalHeight;
            ctx.drawImage(img,0,0);
            var b=canvas.toDataURL("image/jpeg",0.8);
            fn&&fn(b);
            that.loading.hide();
        };
        img.src=url;
    },
    setSerData:function(_id,_text,_brandname,MphotoUrl,baiditu,modelName){
        var that=this,
            c=$("#uploadPic-con");
        if (c.hasClass("chat")) {
            that.chatFun();
        }
        if (c.hasClass("modlue56")) {
            $(".series-name").html(_text);
            $(".zd-txt").html("看我的"+_text);
            $(".zd-txt2").html(" WOW,这可是"+_brandname+"的"+_text+"，请问你是在哪里买的？");
            $(".zd-txt3").html('老人：“年轻人，假如你想得到<br />这辆'+_text+'，有位高人可以帮你他通常在'+that.saledealerName+'出现，名字叫'+that.saleName+'。你去找他吧。假如想了解更多可以扫下面的二维码。');
        }
        if (c.hasClass("modlue68")) {
            $(".zd-txt2").html('赶紧找我<br>买辆<span class="yellow">'+_text+'</span>吧~');
        }
        if (c.hasClass("modlue75")) {
            this.zdTxt.html('<p class="yellow mb1">请记住<br />英雄永不过时</p>在你身后<br />总有<span class="yellow br-bot">'+_text+'</span>和你一起披荆斩棘、<br />一路向前!<br /><p class="w-534">扫码到<span class="fs-46">'+that.saledealerName+'</span></p>和你的战友一起开启征途')
        };
        if (c.hasClass("modlue82")) {
            this.zdTxt.html(_text);
            $(".zd-txt2").html("买"+_text+"到哪里买？")
            $(".zd-txt3").html(that.saledealerName)
        }
        if (c.hasClass("modlue96")) {
            this.zdTxt.html('你的孩子却已经坐在<b>'+_text+'</b><br />的后座上开始了崭新的一天');
            $(".zd-txt2").html('买车就到<span class="yellow">'+this.saledealerName+'</span><br />'+that.saleName+'和你携手呵护孩子的未来');
        }
        if (c.hasClass('modlue98')) {
            this.zdTxt.html('没错，我说的就是'+_text);
            $(".zd-txt2").html('到'+this.saledealerName+'找'+this.saleName+'<br />凭教师证买'+_text+'，可享受更多感恩礼包<br />马上扫码到店');
        }
        if (c.hasClass("modlue99")) {
            this.zdTxt.html('不用再寻觅了<br />请让我给你所有<br /><b>—'+_text+'</b>');
        }
        if (c.hasClass("modlue100")) {
            this.zdTxt.html('<p>根据<span class="red">'+this.dealerCity+'</span>地区车主调查结果，目前'+this.dealerCity+'广受信赖的汽车品牌是<span class="red">'+_brandname+'</span>。</p><p>网调显示，<span class="red">'+this.saledealerName+'</span>在售后服务等各方面都有着不俗的口碑，现在到店购买<span class="red">'+_text+'</span>还可享受优惠，需要买车的小伙伴可以扫码联系该店销售顾问'+this.saleName+'。</p>')
        };
        if (c.hasClass("modlue102")) {
            this.zdTxt.html('<p>'+this.dealerName+'</p><p class="phone">未来热线：'+this.mobile+'</p>');
            $(".zd-txt2").html(_text);
        };
        if (c.hasClass("modlue103")) {
            this.zdTxt.html(this.dealerCity);
            $(".zd-txt2").html("听说，iPhone X和<br />"+_text+"更配喔~");
            $(".zd-txt3").html("已经签收，签收人"+this.saleName);
            $(".zd-txt4").html("快件到达【"+this.dealerName+"】");
            $(".zd-txt5,.zd-txt6").html(Year+"-"+Month+"-"+rgetDate)
        };
        if (c.hasClass("modlue113")) {
            $(".zd-txt2").html('<p>就别把思念寄回家</p><p>让'+_text+'带你回家</p>');
            this.zdTxt.html('<div><p>'+this.saleName+'</p><p>'+this.dealerName+'</p><p class="yellow">祝您中秋阖家团圆</p></div>');
        }
        if (c.hasClass("modlue121")) {
            this.zdTxt.html('<div><p>'+this.saleName+'<span>'+this.proName+'</span></p><p>'+this.dealerName+'</p></div>');
            $(".zd-txt2").html('现在买'+_text+'<br />');
            var dday=this.countDown('2018-1-1 00:00:00');
            dday=dday.day.toString().split("");
            $(".zd-txt3").html(dday[0]);
            $(".zd-txt4").html(dday[1]);
        };
        if (c.hasClass("modlue122")) {
            this.zdTxt.html(this.saleName+'成为'+_brandname+'新代言人');
            $(".zd-txt2").html(this.saleName+'成为'+_brandname+'新代言人');
            $(".zd-txt3").html(_text+"成汽车品质新标杆");
            $(".zd-txt4").html(_text+"成汽车品质新标杆");
        };
        if (c.hasClass("modlue123")) {
            this.zdTxt.html('购置税优惠即将结束 购车需加紧时间');
            $(".zd-txt2").html('购置税优惠即将结束 购车需加紧时间');
            $(".zd-txt3").html('拥有一台'+_text+'是小康家庭的标志');
            $(".zd-txt4").html('拥有一台'+_text+'是小康家庭的标志');
        };
        if (c.hasClass("modlue129")) {
            $(".contenteditable1").attr("placeholder","请输入猜中奖励");
        }
        if (c.hasClass("modlue133")) {
            this.zdTxt.html('<p>蝎子们就是天生的行动派 , 精力旺盛唯有<span class="red">'+_text+'</span>才能符合天蝎们的严苛要求</p><p>来<span class="red">'+this.dealerName+'</span></p><p>你的车 , <span class="red">'+this.saleName+'</span>已经为你准备好</p>');
        };
        if (c.hasClass("modlue149")) {
            this.zdTxt.html('<span>'+this.dealerName+'</span><br /><i>'+this.saleName+'</i>温馨提醒您');
            $(".zd-txt2").html('买辆'+_text+'吧');
            $(".zd-txt3").html(this.mobile)
        };
        if (c.hasClass("modlue152")) {
            var dday=this.countDown('2018-1-1 00:00:00');
            this.zdTxt.html('其实，现在入手<span>'+_text+'</span>是最合适的了');
            $(".zd-txt2").html('<div>我是'+this.saleName+'</div><div>扫码找我拿优惠</div><br /><div>顺便提醒你<br />离购置税优惠结束还有<span class="red">'+dday.day+'</span>天</div>');
        };
        if (c.hasClass("modlue159")) {
            this.zdTxt.html(_text);
            $(".zd-txt2").html('买'+_text+',找'+this.saleName+'<br />就在'+this.dealerName);
        };
        if (c.hasClass("modlue160")) {
            this.zdTxt.html('不是我吹牛<br />到'+this.dealerName+'<br />砍价能把'+this.saleName+'砍到哭！');
            $(".zd-txt2").html(_text);
        };
        if (c.hasClass("modlue161")) {
            this.zdTxt.html('前往'+this.dealerName+'<br />带着朕的旨意找'+this.saleName+'<br />你就可以底价拿到车');
            $(".zd-txt2").html('你没有一辆'+_text);
        };
        if (c.hasClass("modlue163")) {
            this.zdTxt.html('<div><p><span class="name">'+this.saleName+'</span>'+this.proName+'</p><p>'+this.dealerName+'</p></div>');
            $(".contenteditable1").attr("placeholder","请输入优惠内容");
        };
        if (c.hasClass("modlue198")) {
            var _v=_text.replace('<i class="a-icon"></i>',"");
            var a=_v.split("");
            this.zdTxt.html("选择"+a.join("<br>"));
            $(".zd-txt2").html(this.dealerName);
            $(".zd-txt3").html(this.saleName+"提醒你");
        };
        if (c.hasClass("modlue200") || c.hasClass("modlue579")) {
            this.zdTxt.html('<div>头戴圣诞帽<br />驾着<span class="yellow">'+_text+'</span>来娶我</div>');
            $(".zd-txt2").html('我是<span class="yellow">'+this.saleName+'</span><br />你的盖世英雄<br />我来帮你打造');
        };
        if (c.hasClass("modlue214")) {
            $(".zd-txt4").html('2017年'+_text+'关键词');
            this.zdTxt.html('<div><p>'+this.saleName+'</p><p>'+this.dealerName+'</p></div>');
        };
        if (c.hasClass("modlue233")) {
            this.zdTxt.html('去'+this.dealerName);
            $(".zd-txt2").html('买'+_text);
            $(".zd-txt3").html('找'+this.saleName)
        };
        if (c.hasClass("modlue270")) {
            this.zdTxt.html('阿妈，我要去'+this.saleName+'那里买'+_text);
        };
        if (c.hasClass("modlue273")) {
            this.zdTxt.html(this.proName);
            $(".zd-txt2").html('<em></em><span>'+_text+'</span><em></em>');
            $(".zd-txt3").html('<p>来自'+this.dealerName+'</p><p>'+this.saleName+'的专业推荐</p>')
        }
        if (c.hasClass("modlue282")) {
            // this.zdTxt.html(this.proName);
            $(".zd-txt2").html('<p class="p1">如果</p><p class="p2">你有一辆<i class="yellow">'+_text+'</i></p><p class="p3">那就不一样了</p><p class="p4 yellow">风里雨里，想走就走</p>');
            $(".zd-txt3").html('<p>来找<i class="yellow">'+this.saleName+'买<i class="yellow">'+_text+'</i></i></p><p>这个新年伴你平安出行</p>')
        }
        if (c.hasClass("modlue294")) {
            this.zdTxt.html('<p>'+_text+'新车现已到店</p><p>欢迎广大新老客户亲临本店品鉴试驾</p>');
            $(".zd-txt2").html('<p>我是'+this.level+'<span class="yellow">'+this.saleName+'</span></p><p>我在<span class="yellow">'+this.dealerName+'</span>等着你</p>')
        }
        if (c.hasClass("modlue295")) {
            this.zdTxt.html('这就是'+_text);
            $(".zd-txt2").html('<p>来'+this.dealerName+'</p><p>'+this.saleName+'和你一起激发出行正能量！</p>');
        }
        if (c.hasClass("modlue299")) {
            this.zdTxt.html('是的<p>，</p>你需要 <i class="bbb"><img src="images/modlue299text_03.png" alt="" /><span class="dd">一辆</span><span class="red dd">'+_text+'</span></i>');
            $(".zd-txt2").html('<p>光宗耀祖</p><p>扫码找<i class="red">'+this.saleName+'</i></p>');
            var height =  $('.modlue299 .zd-txt .bbb').height();
            $('.modlue299 .zd-txt img').css('height',height);
        }
        if (c.hasClass("modlue300")) {
            var m300sex="what";
            if (this.saleData.gender == 1) {
                m300sex="男";
            }else if(this.saleData.gender == 2){
                m300sex="女";
            }
            this.zdTxt.html('<p>手握</p><p>'+_text+'方向盘</p><p>掌声送给</p>');
            $(".zd-txt2").html('来自<span>猪猪'+m300sex+'孩'+this.saleName+'</span>的良心推荐')
        };
        if (c.hasClass("modlue301")) {
            this.zdTxt.html('寻找'+_text+'的');
            $(".zd-txt2").html('就在'+this.dealerName);
            $(".zd-txt3").html('<p>扫码联系你的</p><p>领航员<span>'+this.saleName+'</span></p>');
        }
        if (c.hasClass("modlue319")) {
            this.zdTxt.html('<p></p><p>真的没有开着<span>'+_text+'</span>去追快</p><p></p>');
            $(".zd-txt2").html('<p>在'+this.dealerName+'</p><p>总有'+this.saleName+'和你一起去追逐梦想</p>')
        }
        if (c.hasClass("modlue322")) {
            this.zdTxt.html('<p>却还没有成交一辆<i>'+_text+'</i></p>');
        }
        if (c.hasClass("modlue323")) {
            this.zdTxt.html('<p>'+_text+'</p><p>让每一次出行</p><p>都成为最温暖的陪伴</p>');
            $(".zd-txt2").html('<p>我是<i>'+this.saleName+'</i></p><p>扫码开启长情告白</p>')
        }
        if (c.hasClass("modlue328")) {
            this.zdTxt.html('<p>你需要一辆<i>'+_text+'</i></p>');
            $(".zd-txt2").html('<p>扫描二维码</p><p><i>'+this.saleName+'</i>和你一起征战宇宙</p><span class="sp1"></span>')
            $(".zd-txt3").html('你们对<i>'+this.proName+'</i>的力量简直一无所知')
        }
        if (c.hasClass("modlue336")) {
            this.zdTxt.html('<p>你和别人的距离</p><p>只差了一辆<i>'+_text+'</i></p><p>而你和'+_text+'的距离</p><p>只差了一个我</p>');
            // $(".zd-txt2").html('<p>扫描二维码</p><p><i>'+this.saleName+'</i>和你一起征战宇宙</p><span class="sp1"></span>')
            // $(".zd-txt3").html('你们对<i>'+this.proName+'</i>的力量简直一无所知')
        }
        if(c.hasClass("modlue337")){
            if (_brandname == "默认文案") {
                console.log(0)
                $(".cover-pic").show();
            }
            this.zdTxt.html('<p>'+_text+'</p>');
            $(".zd-txt2").html('<span>首付仅需</span><p contenteditable="true" class="contenteditable contenteditable4"></p><span>元起！</span>')
            $(".zd-txt3").html('<span>最低月供仅需</span><p contenteditable="true" class="contenteditable contenteditable5"></p><span>元</span>')
            $(".zd-txt4").html('<p contenteditable="true" class="contenteditable contenteditable6"></p>')
            $(".zd-txt5").html('<p>来'+this.dealerName+'</p><p>享受更多惊喜购车优惠</p>')
            $(".zd-txt6").html('<p>地址：'+this.dealerAddress+'</p>')
            $(".zd-txt7").html('<p>扫码联系你的专属</p><p>购车顾问<i>'+this.saleName+'</i></p>')
        }
        if (c.hasClass("modlue340")) {
            this.zdTxt.html(_text);
            $(".zd-txt2").html('只为在<span>'+this.dealerName+'</span>等你');
            $(".zd-txt3").html(this.saleName);
        }
        if (c.hasClass("modlue344")) {
            this.zdTxt.html('<p>接过'+_text+'的钥匙</p>');
            $(".zd-txt2").html('<p>'+this.saleName+'</p><p>'+Year+'年'+Month+'月'+rgetDate+'日</p><p>写于'+this.dealerName+'</p>');
        }
        if (c.hasClass("modlue350")) {
            this.zdTxt.html('<p>他<img src="images/modlue350dot_03.png" alt="" /></p><p>应该是忘了带</p><p>'+_text+'的车钥匙？</p>');
            $(".zd-txt2").html('<p>扫码来找<i>'+this.saleName+'</i></p><p>我们来聊聊</p><p>用右脚可以解决的那些事</p>');
        }
        if (c.hasClass("modlue351")) {
            this.zdTxt.html('<p>谢谢你，这些年你辛苦了，今天一起去看'+_text+'吧！</p>');
            $(".zd-txt2").html('<p>扫码找<i>'+this.level+this.saleName+'，</i></p><p>我在'+this.dealerName+'等你</p><p>和你一起感恩同行</p>');
        }
        if (c.hasClass("modlue358")) {
            this.zdTxt.html('<p>坐在'+_text+'里</p><p class="p2">看着别人晒太阳了</p>');
            
        }
        if (c.hasClass("modlue361")) {
            this.zdTxt.html('<p>来'+this.dealerName+'看看'+_text+'就更加好啦</p><p>你会发现不一样的惊喜</p>');
        }
        if (c.hasClass("modlue364")) {
            this.zdTxt.html('如果有一台'+_text+'就更加好啦');
            $(".zd-txt2").html('要是他有'+_text+'的话我马上就嫁');
            $(".zd-txt3").html('<p>脱单告急? 神器选购?</p><p>就在'+this.dealerName+'</p>');
        }
        if (c.hasClass("modlue404")) {
            if(c.hasClass('carModlue')){
                this.zdTxt.html(modelName);
                $(".zd-txt2").html('<p>以梦为马 ，不负韶华，梦想，</p><p>在'+this.dealerName+'这里起步</p>');
            }else{
                this.zdTxt.html(_text);
                $(".zd-txt2").html('<p>以梦为马 ，不负韶华，梦想，</p><p>在'+this.dealerName+'这里起步</p>');
            }
            
        }
        if (c.hasClass("modlue506")) {
            this.zdTxt.html('隔壁小王的'+_text);
            $(".zd-txt2").html('坐上了隔壁小王的<span>'+_text+'</span>');
            $(".zd-txt3").html('<p>我是'+this.saleName+'</p><p>扫码我来告诉你</p>');
        }
        if (c.hasClass("modlue412")) {
            if(c.hasClass('carModlue')){
                this.zdTxt.html(modelName)
                $(".zd-txt2").html(this.dealerName)
                $(".zd-txt3").html('<p>我是'+this.saleName+'</p><p>世间所有的相遇</p><p>都是久别重逢</p>')
            }else{
                this.zdTxt.html(_text)
                $(".zd-txt2").html(this.dealerName)
                $(".zd-txt3").html('<p>我是'+this.saleName+'</p><p>世间所有的相遇</p><p>都是久别重逢</p>')
            }
            
        }
        if (c.hasClass("appCover") && _brandname !="默认文案") {
            $(".cover-pic,.tip-mask").hide();
        }
        if (!$(".series-pic").is(":hidden")) {//需要车系图
            if (c.hasClass("whitecarpic")) {//白底图
                var addHTTPURL="https:"+baiditu;
                // $(".series-pic img").attr("src",baiditu);
                that.imgTobase64(addHTTPURL,".series-pic img");
            }else{
                that.imgTobase64(MphotoUrl,".series-pic img");
            };
        }
        if ((!$("#file-btn").is(":hidden") || !$("#imgCrop").is(":hidden") || !$(".file-imgbg").is(":hidden") ) && c.hasClass("series-imgCrop") && c.hasClass("series-imgCrop")) {
            var seriesImgCropURL= c.hasClass("whitecarpic") ? "https:"+baiditu:MphotoUrl;
            that.imgTobase64(seriesImgCropURL,"filePicLoad");
        }

        // 价格
        if (c.hasClass("serprice")) {
            this.getSerPrice(_id);
        };
        // 配置图
        if (c.hasClass("viewphoto")) {
            that.getViewPhoto(_id);
        }
        // 2017关键字
        if (c.hasClass("serType")) {
            this.getKeyText(_id);
        };
        that.seriesPopHide();
        that.photoClipNoneSaveShow();
        if (!c.hasClass("saveNone") && c.hasClass("series-imgCrop")) {
            $(".change-btn").show();
        }
    },
    getSerPrice:function(sid){
        var that=this,
            c=$("#uploadPic-con");
        that.loading.show();
        that.loading.find(".load-txt").html("玩命加载中...");
        $.ajax({
            url:"//price.pcauto.com.cn/price/api/v1/pocket/model/model_max_price_lower16",
            data:{serialGroupId:sid},
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                that.loading.hide();
                console.log(data);
                var maxPrice=data.maxPrice;
                if (maxPrice || maxPrice=="0") {
                    if (c.hasClass("modlue121")) {
                        $(".zd-txt2").html($(".zd-txt2").html()+'最高能便宜<span>'+Math.ceil(maxPrice*250*1.17)+'</span>元');
                    }

                }
            }
        });
    },
    // 获取2017关键字
    getKeyText:function(sid){
        var that=this,
            textArr=[
                {key_0:"豪华",key_1:"表里如一，杰出典范"},
                {key_0:"尊贵",key_1:"梦想与美丽的融合，助你成就梦想"},
                {key_0:"旗舰",key_1:"每时每刻，高人一等，快人一步"},
                {key_0:"品质",key_1:"每一个细节都是杰出的艺术品，助你每一次的安全出行"},
                {key_0:"高贵",key_1:"回眸一笑百媚生，六宫粉黛无颜色"},
                {key_0:"典雅",key_1:"仿佛兮若轻云之蔽月,飘飘兮若流风之回雪"},
                {key_0:"动感",key_1:"怒如列缺光，迅与芬轮俱"},
                {key_0:"激情",key_1:"火山五月行人少，看君马去疾如鸟"},
                {key_0:"卓越",key_1:"崇尚科技创新，打造一流品牌"},
                {key_0:"杰出",key_1:"成就出众，勇武过人，吾辈之英才。"},
                {key_0:"强悍",key_1:"永远年轻，永远热泪盈眶。"},
                {key_0:"地位",key_1:"承其重，戴其冠，驰骋属于你的河山。"},
                {key_0:"品味",key_1:"陪你细心感受，一起静静体会。"},
                {key_0:"格调",key_1:"奢华而不失低调，谦虚而不忘张扬。"},
                {key_0:"风度",key_1:"举止潇洒，言谈风雅，谈笑间陪你看遍冬夏。"},
                {key_0:"精品",key_1:"你眼中的坚定，看尽世间最美的光辉。"}
            ],
            c=$("#uploadPic-con");
        $.ajax({
            url:"//price.pcauto.com.cn/price/api/v1/serialgroup/serial_group_infos",
            data:{sgid:sid},
            cache:true,
            jsonp: "callback",
            jsonpCallback:'abc',
            dataType:'jsonp',
            success:function(data){
                var sgKindName=data.sgKindName;
                if(sgKindName == "小型SUV" || sgKindName == "紧凑型SUV" || sgKindName == "中型SUV" || sgKindName == "中大型SUV" || sgKindName == "大型SUV"){
                    // SUV
                    textArr.push({key_0:"跨越",key_1:"无论遇到何种路况，它都能带你勇敢跨越，无惧前进"},{key_0:"视野",key_1:"走得更远，看得更清，得到更多"});
                }
                var r=Math.floor(Math.random()*textArr.length);
                if (c.hasClass("modlue214")) {
                    $(".zd-txt2").html(textArr[r].key_0);
                    $(".zd-txt3").html(textArr[r].key_1);
                }
            }
        });
    },
    photoClipNoneSaveShow:function(){
        if (this.sate) {
            $(".change-btn").hide();
            if ($(".sale-code-img img").eq(0).attr("src").length > 0) {
                $("body").addClass("saveShow");
                $("#file-btn,#modlue-type").hide();
                $("#save-links").show();
            }
        }
        this.sate=true;
    },
    countDown:function(o){
        var sec=(new Date(o.replace(/-/ig,'/')).getTime() - new Date().getTime())/1000;
        var _day=parseInt(sec/24/3600) < 10 ? "0"+parseInt(sec/24/3600) : parseInt(sec/24/3600);
        return {
            day:_day
        }
    },
    imgTobase64:function(url,elm){/*图片转换base64*/
        var that=this;
        if (!that.APP) {
            that.loading.show();
            that.loading.find(".load-txt").html("玩命加载中...");
        }
        $.ajax({
            url:that.ajaxUrl+"/interface/outer/get_base64_by_url.jsp",
            data:{url:url},
            cache:true,
            dataType:'jsonp',
            success:function(data){
                $(elm).attr("src",data.image);
                that.loading.hide();
                if (elm == "filePicLoad") {
                    filePicLoad(data.image);
                };
                if (elm == '.sale-head-img') {
                    that.saleHead=data.image;
                    setchatData();
                    if (that.cliType) {
                        that.cliType=false;
                        if (that.APP) {
                            that.appStart();
                            that.btnEventClick();
                        }else{
                            $("#modlue-type .active").click();
                        }

                    }
                }
            },
        })
    },
    submitPocket:function(type,imgUrl){/* type=0:个人二维码 type=1：海报 ；计数*/
        var that=this,
            posterType=that.modlueName.split(" ")[0];
        if (that.APP) {
            return false;
        }
        $.ajax({
            url:that.ajaxUrl+"/interface/sales/get_sales_poster.jsp",
            type : "POST",
            data:{
                salesId:that.salesId,
                type:type,url:imgUrl,
                posterType:posterType,
                title:that.modlueText
            },
            dataType:'jsonp',
            success:function(data){
                if (type=="0") {
                    if (data.qrCode) {
                        // that.imgTobase64(data.qrCode,"#sale-code-img");
                    }
                }
            }
        })
    },
    getSubmitJson:function(){
        var appJson={
                title:this.modlueText,
                posterType:this.modlueName.split(" ")[0]
            };
        return appJson;
    },
    dhsetHead:function(){
        $(".dh-head").attr("src",$(".sale-head-img").attr("src"));
    },
    submitUPC:function(dataurl,type){/*图片上传upc*/
        var that=this;
        $.post("//upc.pcauto.com.cn/upload_quick_base64.jsp?referer=//play10.pcauto.com.cn/",{
            application:'play',
            readExif:'yes',
            keepSrc:'yes',
            data : dataurl
        },function(data){
            if(data.retCode<1){
                var fnum = data.files.length;
                if(fnum>0){//有返回图片再处理
                    for(var i=0;i<fnum;i++){
                        if(data.files[i].isorg==1){//取原图
                            turlB = data.files[i].url;
                            // 上传口袋
                            // that.submitPocket(type,turlB)
                        }
                    }
                }
            }else{
                alert("上传失败，请重试！");
            }
        },"json");
    },
    codePhotoClip:function(){/*二维码上传*/
        var that=this;
        that.saleCodeCrop.photoClip({
            width: that.winW,
            height: that.winW,
            file: that.salecodeFile,
            view: that.hit,
            ok: that.salecodeSave,
            loadStart: function (fileReader) {
                that.loading.show();
                that.saleCode.show();
            },
            loadComplete: function () {
                that.loading.hide();
            },
            clipFinish: function (dataURL) {
                that.saleCodeHide();
                $(".sale-code-img img").eq(0).attr("src",dataURL);
                that.setDCcode();
            }
        });
    },
    saleCodeHide:function(){
        this.saleCode.hide();
    },
    initLoading:function(){
        this.loading.show();
    },
    // 获取字符串长度
    txtLen:function (txt){
        var _txt=txt;
        var iCount=0;
        var sStr=_txt.split("");
        for (var i=0; i<sStr.length; i++){
            strTemp=escape(sStr[i]);
            if (strTemp.indexOf("%u",0)==-1){
                iCount=iCount+0.5;
            }else{
                iCount=iCount+1;
            }
        }
        return {
            iCount:iCount,
            text:strTemp
        };
    },
    // 加载字体
    loadFontFace:function(name,url){
        try{
            var f = new FontFace(name, "url('"+url+"')", {});
            f.load().then(function (loadedFace) {
                document.fonts.add(loadedFace);
            });
        }
        catch(err){
            this.noEs6LoadFont(name,url);
        }
    },
    noEs6LoadFont:function (name,url){
        var f='@font-face {font-family: "'+name+'";src: url("'+url+'");font-weight: normal;font-style: normal;}';
        var s=document.createElement("style");
            s.innerHTML=f;
        document.body.appendChild(s);
    },
    // 对话
    chatFun:function(){
        setchatData();
        winCode=$("#qrcode img").attr("src");
        var n=this.modlueName.split(" ")[0],
            _html="",
            y=n+"Head",
            t=n+"Title",
            head=chat[y],
            that=this;
        for (var i = 0; i < chat[n].length; i++) {
            _html+=that.setChat(chat[n][i],chat[t],head);

        }
        $(".wx-chat .chat-con").html(_html);
        $("#chat-wxhead-by").attr("src","images/wxhead-by.jpg");
        $("#chat-wxfooter").attr("src","images/wxfooter.png");
    },
    // 对话赋值
    setChat:function(obj,tit,head){
        var _type=obj.type,
            _text=obj.text,
            pClass=obj.pClass ? obj.pClass : "",
            headUrl= obj.head ? obj.head:head,
            _html="";
        that=this;
        $(".wx-chat-tit").html(tit);
        if (_type == "date") {
            _html='<div class="date"><span>'+_text+'</span></div>';
            $(".wx-chat-top-date").html(_text);
        }else if(_type == "left"){
            _html='<div class="chat-left">'+
                    '<div class="chat-head">'+
                        '<img src="'+headUrl+'">'+
                    '</div>';
                    if (obj.headName) {
                        _html+='<div class="wx-left-name">'+obj.headName+'</div>';
                    }
                    _html+='<div class="chat-text '+pClass+'">'+_text+'</div>'+
                '</div>';
        }else if(_type == "right"){
            var head = obj.head ? obj.head : that.saleHead;
            _html='<div class="chat-right">'+
                    '<div class="chat-text '+pClass+'">'+_text+'</div>'+
                    '<div class="chat-head">'+
                        '<img class="wx-sale-head" src="'+head+'">'+
                    '</div>'+
                '</div>';
        }
        return _html;
    },
    // app初始化
    appStart:function(){
        var that=this;
        var appSateM=$("#modlue-type .modlue-select[data-modlueName ~='"+that.APPModlueName+"']"),
            sz=appSateM.size();
            console.log(that.APPModlueName)
            $("body").addClass("app-body");
        if (sz > 0) {
            appSateM.click();
        }else{
            // alert("id错误");
            that.setURLposter();
        }
    },
    getPhotoBase64:function(){
        return this.photoBase64;
    },
    getModlueTxt:function(){
        return this.modlueText;
    },
    CNDateString:function(date){
        var cn = ["零","一","二","三","四","五","六","七","八","九","十","十一","十二","二十","三十"];
        var year=date.getFullYear(),
            MM = date.getMonth()+1,
            DD = date.getDate(),
            a=year.toString().split(""),
            b=DD.toString().split("")
            y="";
            r="";
        for (var i = 0; i < a.length; i++) {
            y+=cn[a[i]];
        };
        if (DD < 11) {
            r=cn[DD];
        }else{
            for (var i = 0; i < b.length; i++) {
                if (b[1] == 0) {
                    b[1]=10;
                }else{
                    if (b[0] == 1) {
                        b[0]=10;
                    };
                    if (b[0] == 2) {
                        b[0]=13;
                    };
                    if (b[0] == 3) {
                        b[0]=14;
                    };
                }
                r+=cn[b[i]];
            };
        }
        return{
            year:y,
            month:cn[MM]+"月"+r
        }
    },
    init:function(){/*初始化*/
        this.getSaleId();//获取id
        // this.codePhotoClip();
        // this.submitPocket(0,"");//获取个人二维码
        this.modlueSwitch();//绑定模板切换事件
        this.prevchangeFun();//绑定关闭-更换图片事件
    }
}
m.init();
