
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <%@include file="/decorators/import.jsp" %>
    <title>首页banner图设置</title>
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/manage.css">
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/classes.css">
    <link rel="stylesheet" type="text/css" href="<%=rootPath %>/stylesheets/operate.css" />
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/plugins/jcrop/css/jquery.Jcrop.css"/>
 <style type="text/css">
 #details::-webkit-scrollbar {
		display: none;
	}
.p1 {
	display: block;
	position: absolute;
	z-index: 2000;
	top: 10px;
	right: -280px;
/*	padding: 6px;
 	border: 1px rgba(0, 0, 0, .4) solid;
	background-color: white;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	border-radius: 6px;
	-webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2); */
}

.p2 {
	display: block;
	position: absolute;
	z-index: 2000;
	top: 10px;
	right: -280px;
/*	padding: 6px;
 	border: 1px rgba(0, 0, 0, .4) solid;
	background-color: white;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	border-radius: 6px;
	-webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2); */
}

.p3 {
	display: block;
	position: absolute;
	z-index: 2000;
	top: 10px;
	right: -280px;
/* 	padding: 6px;
	border: 1px rgba(0, 0, 0, .4) solid;
	background-color: white;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	border-radius: 6px;
	-webkit-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2);
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.2); */
}

.p1 .preview-container {
	width: 446px;
	height: 241px;
	overflow: hidden;
}

.p2 .preview-container {
	width: 255px;
	height: 138px;
	overflow: hidden;
}

.p3 .preview-container {
	width: 181px;
	height: 96px;
	overflow: hidden;
}
#cke_newsContents{width: 900px !important;margin-left: 150px;}
#cke_1_top,#cke_1_bottom{margin-right: 0 !important;}
.contentBox{height: auto !important;}
.opacityPopup{display: none;width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: rgba(0,0,0,.5);}
.countPopup{
display: none;width: 360px;height: 600px;z-index:9997;
padding: 0 30px;position: fixed;left: 50%;top: 50%;
margin-left: -180px;margin-top: -300px;
background: url(../../../images/yulaniphone.png)  0 0 no-repeat;
background-size: 80%;border: 1px solid #797979;
padding-top: 40px;
}
#details{
    overflow-x: hidden;
    background: #fff;
    width: 350px;
    height: 640px;
    overflow-y: auto;
    padding: 0 3px;
    position: absolute;
    left: -20px;
    top: 0px;
    transform: scale(0.8);
	}
#accountBtn{position: absolute;left: -60px;top: 550px;}
#details p{margin:10px auto;}
#details em{font-style:oblique;}


#details img{ max-width:100% !important;height: auto! important;}

/* #cke_Link_116 {display: none;}
#cke_Link_118 {display: none;}
#cke_Link_119 {display: none;}
#cke_Link_131 {display: none;}
#cke_Link_121 {display: none;}
#cke_Link_123 {display: none;}
#cke_Link_124 {display: none;}
#cke_Link_129 {display: none;}
#cke_Link_133 {display: none;}
#cke_Link_132 {display: none;}
#cke_Link_148 {display: none;}
#cke_Link_287 {display: none;} */
/*隐藏自带弹窗*/
    /*.cke_dialog_body{display: none;}*/
     .checkName{display: none;}

.selectName{z-index: 100000000;position: absolute;background : #fff;height: 200px;overflow-y: auto;width: 216px;border: 1px solid #ddd;margin-left: 354px;border-top: none;margin-top: -2px;}
.selectName li{padding-left: 3px;}
.checkName{border-radius: 0 !important;}
.targetSite{height: 60px;}
.selectName{display: none;left: 120px;}
.selectName li{cursor: pointer;}
.selectName li.active{background: #0e90d2;color: #fff;}

.linkPopup{display: none;z-index: 20100;width: 370px;height: 360px;background: #fff;position: fixed;left: 50%;top: 50%;
    margin-left: -185px;margin-top: -180px;font-size: 14px;color: #474747;border: 2px solid #e1e1e1;}
.linkHeader{height: 30px;line-height: 30px;border-bottom: 1px solid #e1e1e1;}
.linkHeader span{margin-left: 10px;}
.linkHeader i{float: right;margin-right: 9px;}
.linkTitle{height: 30px;border-bottom: 1px solid #e1e1e1;position: relative;}
.linkTitle span{cursor: pointer;position: absolute;top: 5px;display: inline-block;width: 76px;height: 24px;text-align: center;line-height: 24px;color: #333333;
    border: 1px solid #e1e1e1;border-top-left-radius:3px;border-top-right-radius: 3px;vertical-align: bottom;}
.linkTitle span:first-child{left: 9px;}
.linkTitle span:last-child{left: 100px;}
.linkTitle span.active{border-bottom: 1px solid #fff;}
.linkContent{height: 250px;border-bottom: 1px solid #e1e1e1;}
.linkContent input{margin-top: 37px;margin-left: 10px;border: 1px solid #707070;width: 220px;height: 20px;
    line-height: 20px;border-radius: 0;}
.linkNameList{height: 200px;position: absolute;overflow-y : auto;width: 196px;border: 1px solid #707070;margin-left: 10px;border-top: none;
    display: none;}
.linkNameList li{cursor: pointer;padding-left: 3px;}
.linkNameList li.active{background: #0e90d2;color: #fff;}
.link-btn{height: 48px;line-height: 48px;text-align: right;}
.link-btn button:last-child{margin-right: 20px;background: #8acb11;border: 1px solid #8acb11;}
.linkName{display: none;}

 .wrongTips{color: orangered;position: absolute;font-size: 14px;display: inline-block;margin-left: 5px;left: 210px;}
 .wrongTipsF{top: 105px;}
 .wrongTipsS{top: 173px;}
 .wrongTipsC{top: 104px;}
 /*.detailsBg{background: #fff;width: 950px;height: 667px;margin: -47px  0 0 -350px;
 transform:scale(0.3,0.74);position: relative;}*/
 div[aria-labelledby*="cke_dialog_title_59"]{display: none;}
#cke_32{display: none;}
#cke_35{display: none;}
.linkLinkSpan{margin-top: 43px;display: inline-block;float: left;margin-left:5px;}
 .cke_dialog_tab[title*='链接']{display: none;}
 a:link {
     color: -webkit-link;
     text-decoration: underline;
 }
     #modelList a:link {
         color: #333;
         text-decoration: none;
     }
     
     #cke_22 ,#cke_23{
		display:none;
	}

</style>
</head>
<body style="position:relative;">
<input type="hidden" value="${bannerType }" id="bannerType"/>
<input type="hidden" value="${detailType }" id="detailType"/>
<!-- 二级导航 -->
<jsp:include page="/WEB-INF/jsp/menu/menu_operate.jsp"></jsp:include>
<%--已上架课程列表--%>
<div id="modelList" class="pageRecommendtionBg">
    <div class="mainbackground nopadding">
        <div class="heading">
            <h2 class="h5" style="display: inline-block;margin: 10px 0;">banner修改</h2>
            <span class="line"></span>
        </div>
        <div class="user-list">
            <div class="findQuestion">
                <div>
                    <span>banner图片:</span>
                	<span class="c-content bannerImg">
							<span class="view">
	                            <img id="commdotityPic" src="${msgPage.bannerImgUrl}" realPath="${msgPage.realyBannerImgUrl}" >
	                        </span>
	                        <span class="btns"><a href="javascript:;" class="btn btn-default btn-upload">选择封面</a></span>
                        </span>
                </div>
                <div class="checkBoxBtn">
                    <span>名称:</span>
                    <input type="text" name="bannerName" id="bannerName" value="${msgPage.bannerName }" class="bannerInput" maxlength="32" placeholder="最长可输入32个字符">
                    <input type="hidden" name="bannerId" id="bannerId" value="${msgPage.id}" >
                </div>
                <div class="checkBoxBtn">
                    <span>描述:</span>
                    <input type="text" name="bannerDescribe" id="bannerDescribe" value="${msgPage.bannerDescribe }" class="bannerInput" maxlength="255" placeholder="最长可输入255个字符">
                </div>
                <div class="checkBoxBtn targetSite">
                    <span><input type='radio' name="only" value="0" id='targetSiteInput' >目标地址:</span>
                    <div style='display:inline-block;' class='targetSiteContent'>
	                    <select name="" id="selectOption" style="margin-left: 48px;width: 200px;">
	                        <option value="0">活动</option>
	                        <option value="1">课程</option>
	                    </select>
	
	                    <input type="text" name="bannerDescribe" id="linkHref" value=""  maxlength="255" placeholder="示例:http(https)://www.cdds365.com" style="width: 200px;" class="checkLink">
	                    <input type="text" name="bannerDescribe" id="searchClass" value="" data-value="" maxlength="255" placeholder="请输入课程名称" style="width: 200px;" class="checkName">
	                    <ul class="selectName">
	
	                    </ul>
                    </div>	
                    
                </div>
                <div class="contentBox">
                    <span><input type='radio' name="only" value="1" id='contentInput'>内容:</span>
                        <textarea id="newsContents" id="bannerContent"  name="bannerContent" class="msg-content">${msgPage.bannerContent }</textarea>
                    </div>
                </div>

                <div class="putQuestion bannerBtnGroup">
                	<c:if test="${detailType eq 2}">
                	<button href='#' onclick="yulan()"  id="yulan" class='btn btn-success' style="display:inline-block">预览</button>
                	</c:if>
                	<c:if test="${detailType ne 2}">
                	<button href='#' onclick="yulan()"  id="yulan" class='btn btn-success' style="display:none">预览</button>
                	</c:if>
                    <button type="button" class="btn btn-success" id="saveBtn"  >保存</button>
                    <button onclick="history.go(-1)" type="button"  class="btn btn-danger"  >取消</button>
                </div>
            </div>
        </div>
    </div>
</div>
<form method="post" id="hiddenForm" target="_blank" >
	<input type="hidden" id="hiddenBannerContent" name="bannerContent">
</form>
<div class="opacityPopup"></div>
<div class="countPopup" >
	
		<div  id="details">
		
		</div>

	
	<div class="countPopupBtn" id="accountBtn">
		<a href="##" class="btn btn-sm btn-primary countPopupCancel">关闭</a>
	</div>
</div>
<div class="upload-layer none" id="chooseDiv" style="width:1080px;height: 550px;">
    <div class="upload-title">
        <h2 class="h5">上传封面</h2>
        <i class="iconfont close">&#xe610;</i>
    </div>
    <div class="pic-upload">
        <p class="tips">
        	 <input type="file" class="btn btn-mini btn-primary" name="imgData" id="imgData" accept=".jpg,.jpeg,.gif,.png,.bmp,.ico" onchange="savePic()" value="重新选择文件"/>
          	<!--<a href="javascript:;" class="btn btn-mini btn-primary">重新选择文件</a>--> 
          	<div style="margin-top: 5px;">建议上传的图片尺寸为：720*420px </div> 
        </p>
        <div class="upload-content" style="padding:10px;">
        <div class="attributes none">
        	 <input type="hidden" id="x" name="x" value="0"/>
            <input type="hidden" id="y" name="y" value="0"/>
            <input type="hidden" id="w" name="w" value="0"/>
            <input type="hidden" id="h" name="h" value="0"/>
            <input type="hidden" id="x2" name="x2" value="0"/>
            <input type="hidden" id="y2" name="y2" value="0"/>
        </div>
        	<div class="pic" style="width:516px;height:282px;background-color:#f2f2f2;">
        		 <img id="target" src="" />
            </div>
            <div class="upload-big p1" style="width:456px;">
            	<div class="preview-container" style="margin:0 auto;">
                <img src="">
                </div>
            </div>
            <div class="upload-sm p2">
            	<div class="preview-container">
                <img src="">
                </div>
            </div>
            <div class="upload-mini p3">
           		<div class="preview-container">
                <img src="">
                </div>
            </div>
        </div>
        <p class="text-center">
            <a href="javascript:classTypePic();" class="btn btn-primary">确定</a>
        </p>
    </div>
</div>
<div class="add-layer-bg none" id="stopDiv"></div>
<div class="loading lp-units-loading" style="display:none">
        <p><i></i>加载中,请稍后...</p>
    </div>
    <div class="loading-bg lp-units-loading-bg" style="display:none"></div>
<%--新弹窗begin--%>

<div class="linkPopup">
    <div class="linkHeader">
        <span>超链接</span>
        <i class="icon iconfont closePopup">&#xe610;</i>
    </div>
    <div class="linkTitle">
        <span class="active">活动</span>
        <span>课程</span>
    </div>
    <div class="linkContent">
    	<span class="linkLinkSpan">活动名称：</span>	
        <input type="text" placeholder="请输入活动名称" class="linkLink" id="activeName" maxlength="20">
        <span class="wrongTips wrongTipsS"></span>
        <br/>
        <span class="linkLinkSpan">活动链接：</span>	
        <input type="text" placeholder="示例:http(https)://www.cdds365.com" class="linkLink" id="linkLinkHerf">
        <span class="wrongTips wrongTipsF"></span>
        <input type="text" placeholder="请输入课程名称" class="linkName" data-value="">
        <span class="wrongTips wrongTipsC"></span>
        <ul class="linkNameList">

        </ul>
    </div>
    <div  class="link-btn">
        <button class="btn btn-mb btn-default closePopup">取消</button>
        <button class="btn btn-mb btn-success addLink sureLink">确定</button>
    </div>
</div>
<script>
/* query();
function query(){
	var detaiType = $('#detailType').val();
	console.log(detaiType+detaiType);
	if(detailType == 2){
		document.getElementById("yulan").style.display = "block";
	}
} */

$("input[type='radio']").click(function () {
	var checkNmuber = Number($(this).val());
	if(checkNmuber == 0){
//		document.getElementById("yulan").style.display = "none";
		$('#yulan').css('display',"none");
		$('#cke_newsContents').css('display',"none");
		
		$('.targetSiteContent').css('display',"inline-block");
		
		
		
	}
	if(checkNmuber == 1){
//		document.getElementById("yulan").style.display = "block";
        $('#yulan').css('display',"inline-block");
        $('#cke_newsContents').css('display',"block");
        
        $('.targetSiteContent').css('display',"none");
        
	}
});
    $('.linkTitle span').click(function () {
        $(this).addClass('active');
        $(this).siblings('span').removeClass('active');
        if($(this).index()){
            $('.linkName').show();
            $('.linkLink').hide().val("");

            $(' .wrongTipsF').hide();
            $(' .wrongTipsS').hide();
            $(' .wrongTipsC').show();
            $(' .linkLinkSpan').hide();

        }else{
            $('.linkName').hide().val("");
            $('.linkLink').show();

            $(' .wrongTipsF').show();
            $(' .wrongTipsS').show();
            $(' .wrongTipsC').hide();
            $(' .linkLinkSpan').show();

        }
    });
  //隐藏超链接
	 $(document).click(function(){
		/* $("[aria-labelledby='cke_dialog_title_75']").hide(); 
		$("[aria-labelledby='cke_dialog_title_65']").hide(); 
		$("[aria-labelledby='cke_dialog_title_60']").hide(); 
		$("[aria-labelledby='cke_dialog_title_63']").hide(); 
		//$("[aria-labelledby='cke_dialog_title_64']").hide(); 
		$("[aria-labelledby='cke_dialog_title_162']").hide(); 
		$("[aria-labelledby='cke_dialog_title_92']").hide(); 
		$("[aria-labelledby='cke_dialog_title_73']").hide(); 
		$("[aria-labelledby='cke_dialog_title_77']").hide(); 
		$("[aria-labelledby='cke_dialog_title_76']").hide(); 
		$("[aria-labelledby='cke_dialog_title_67']").hide(); 
		$("[aria-labelledby='cke_dialog_title_68']").hide(); 
		$("[aria-labelledby='cke_dialog_title_59']").hide();  */
		//$("[title='链接']").hide();
		
		/*$('.cke_dialog_body').hide(); */
		
		
	}); 
	//图像按钮阻止冒泡
	$('body').on('click','#cke_34',function(){
		$('.cke_dialog_body').show(); 
		return false;
	});
	//弹窗阻止冒泡
	$('body').on('click','.cke_dialog_body',function(){
		return false;
	});
    //课程名称模糊搜索
    $('.linkName').keyup(function () {
    	$('.linkName').attr('data-value','');
        if($(this).val().length>0){
            var className = $(this).val();
            $.ajax({
                url: rootPath + "/Banner/queryClass",
                type:"post",
                data:{"className":className
                },
                success:function(data){
                    var html = '';
                    for (var i=0;i<data.length;i++)
                    {
                    	html = html + "<li data-value=\""+data[i].id+","+data[i].name+","+data[i].liveFlag+","+data[i].commodityId+","+data[i].teacherName+","+data[i].cover+"\" >"+data[i].name+"</li>";
                    }
                    if(data.length == 0){
                    	$('.linkNameList').hide();
                	}else{
                		$('.linkNameList').show();
                	}
                    $('.linkNameList').html('').html(html);
                }
            });
            $('.linkNameList').show();
        }else {
            $('.linkNameList').hide();
        }
    });
    //移入和移除鼠标，li样式变化
    $('.linkNameList').on('mouseenter','li',function(){
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    }).on('click','li',function(){
        $('.linkName').val($(this).html());
        $('.linkName').attr('data-value',$(this).attr('data-value'));
        $('.linkNameList').hide();
    });
    //打开和关闭弹窗
    $('.closePopup').click(function(){
       $('.linkPopup').hide();
       $('.cke_dialog_background_cover').hide();
       $('.cke_dialog').css('visibility','hidden');

        $('.linkLink').val("");
        $('.linkName').val("");
        $('.linkNameList').hide();
    });

    $('body').on('click','#cke_31',function(){
        $('.linkPopup').show();
    });

//    $('body').on('click','.cke_toolgroup',function(){
//        $('.cke_dialog').css('visibility','visible');
//    })
</script>
<%--新弹窗end--%>
<script>
    //课程和链接相互切换
    $('#selectOption').change(function(){
        if(Number($(this).val())){
            $('.checkLink').hide();
            $('.checkName').show();
        }else{
            $('.checkLink').show();
            $('.checkName').hide();
        }
    });
    //课程li下拉
    $('.checkName').keyup(function () {
    	$('.checkName').attr('data-value','');
        if($(this).val().length>0){
            var className = $(this).val();
            $.ajax({
                url: rootPath + "/Banner/queryClass",
                type:"post",
                data:{"className":className
                },
                success:function(data){
                    var html = '';
                    for (var i=0;i<data.length;i++)
                    {
                    	html = html + "<li data-value=\""+data[i].id+","+data[i].name+","+data[i].liveFlag+","+data[i].commodityId+","+data[i].teacherName+","+data[i].cover+"\" >"+data[i].name+"</li>";
                    }
                    if(data.length == 0){
                    	$('.selectName').hide();
                	}else{
                		$('.selectName').show();
                	}
                    $('.selectName').html('').html(html);
                }
            });

            $('.selectName').show();
        }else {
            $('.selectName').hide();
        }
    });
    //移入和移除鼠标，li样式变化
    $('.selectName').on('mouseenter','li',function(){
        $(this).addClass('active');
        $(this).siblings('li').removeClass('active');
    }).on('click','li',function(){
        $('.checkName').val($(this).html());
        $('.checkName').attr('data-value',$(this).attr('data-value'));
        $('.selectName').hide();
    });
</script>
<script type="text/javascript" src="<%=rootPath%>/plugins/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/javascripts/ajaxfileupload.js"></script>
     <script type="text/javascript" src="<%=rootPath %>/plugins/jcrop/js/jquery.Jcrop.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/javascripts/riseschool/addClassTypeOnsale.js"></script>
	<script type="text/javascript">
	
	function yulan(){
   	 CKupdate();
   	 var bannerContent=editor.document.getBody().getHtml();
   	 if(null!=bannerContent && '<p><br></p>'!=bannerContent){
   		$('.opacityPopup').fadeIn();
        $('.countPopup').fadeIn();
        $('#details').append(bannerContent);
				/* $("#hiddenBannerContent").val(bannerContent);
				$("#hiddenForm").attr("action",rootPath+"/Banner/yulan").submit(); */
				
	   	 }else{
	   		 alert("预览内容不能为空");
	   	 }
	   //基础宽度为1000px，小于1000设置比例
	 	/*var imgList = $('#details').find('img');
	 	var imgScaleWidth;
	 	var imgScaleHeight;
	 	if(imgList.length>0){
	 		for(var i=0;i<imgList.length;i++){
	 			var imgWidth = imgList.eq(i).css('width').split('px')[0];
	 			var imgHeight = imgList.eq(i).css('height').split('px')[0];
					//宽度
		    		if(imgWidth<1000){
		    			imgScale = imgWidth/10
		    			imgList.eq(i).css('width',imgScale+'%');
		    		}else{
		    			imgList.eq(i).css('width','100%');
		    		}
					//高度
		    		 if(imgHeight>250){
		    			imgScaleHeight = imgHeight/665;
		    			imgList.eq(i).css('height',imgHeight*250/665);
		    		} 
		    	}
	 	}*/
   }
	
	$(function(){
		$('.countPopupCancel').click(function () {
	        $('.opacityPopup').fadeOut();
	        $('.countPopup').fadeOut();
	        $('#details').html('');
	    });
		$(".btn-upload").on('click',function(){
			$("#chooseDiv").css("display", "block");
			$("#stopDiv").css("display", "block");
		});
 		// 弹层处理
 	      $('.upload-layer')
 	          .on('click','i.close',function(){
 	              $('.upload-layer').fadeOut(200,function(){
 	                  $('.add-layer-bg').fadeOut(200);
 	              });
 	          })
 	          // 取消
 	          .on('click','.btn-cancel',function(){
 	              $(this).parents('.pic-upload').fadeOut(200,function(){
 	                 // alert('这个仅作示例，为了展示列表')
 	            	  $('.upload-layer').css({'height':'481px'});
 	              })
 	          })
 	          .on('click','li.add',function(){
 	              $('.pic-upload').fadeIn(200,function(){
 	                  //alert('仅作示例，具体根据实际情况自行修改！')
 	            	  $('.upload-layer').css({'height':'540px'});
 	              })
 	          });
		});
	
	    //处理CKEDITOR的值
		function CKupdate() {
			for (instance in CKEDITOR.instances) {
				CKEDITOR.instances[instance].updateElement();
			}
		}
		var editor = CKEDITOR.replace('newsContents');
		editor.config.width="570px";
		editor.config.toolbar = [
				[ 'mode', 'document', 'doctools' ],
				[ 'Source', '-', 'NewPage' ],
				[ 'basicstyles', 'cleanup' ],
				[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript',
						'Superscript' ],
				[ 'list', 'indent', 'blocks', 'align', 'bidi' ],
				[ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
						'JustifyLeft', 'JustifyCenter', 'JustifyRight',
						'JustifyBlock' ], [ 'Link', 'Unlink' ],
				[ 'Image', 'Table' ],
				[ 'Styles', 'Format', 'Font', 'FontSize' ],
				[ 'TextColor', 'BGColor' ], [ 'Maximize' ], [ '-' ]];
		editor.config.baseFloatZIndex = 10100;
		editor.config.customConfig = 'config.js';
		$(".lj-tops").bind("click",function(){
			
			var _checkbox= $(this).siblings().find("input");
			if(_checkbox.is(":checked")){
				_checkbox.attr('checked',false);
			}
		});
		/* function goback(){
			window.location.href = "comBannerIndex";
		} */
		//添加超链接
	    //点击确定
	    var linkValue;

	    $('.sureLink').click(function () {
	        if($('.linkTitle').children('span').eq(0).hasClass('active')){
	            linkValue = $('#linkLinkHerf').val();
	            activeName = $('#activeName').val();
           	  if(activeName == ''){
            	   $('.wrongTipsF').html("请输入活动名称!");
            	   return ;
           	  }
              $('.wrongTipsF').html("");
              if(linkValue == ''){
                $('.wrongTipsS').html("请输入活动链接!");
                return ;
              }
              $('.wrongTipsS').html("");
	          //检验网址
	            var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
	            var regTwo=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
	            
	          	/* if(!reg.test(linkValue)){
//	                $.msg("请输入有效的网址!",1000);
                    $('.wrongTipsF').html("请输入有效的网址!");
	                return ;
	            } */
	          	/* if(!regTwo.test(activeName)){
//	                $.msg("只能输入纯文本",1000);
                    $('.wrongTipsF').html("只能输入纯文本!");
	                return ;
	            }
	          	$('.wrongTipsF').html(""); */
	          	var body = editor.document.getBody().getHtml();
	          	editor.document.getBody().setHtml(body+"<p><a href='"+linkValue+"' onclick=\"hrefClassName('"+activeName+"')\">"+activeName+"</a></p>");
	           // editor.document.getBody().innerHTML = "<p><a href='"+linkValue+"'></a></p>";
	           $('.linkPopup').hide();
	            $('.cke_dialog_background_cover').hide();
	            $('.cke_dialog').css('visibility','hidden');
//	            editor.document.getBody().append("<p><a href='"+linkValue+"'></a></p>");
	            /*$('.cke_editable cke_editable_themed cke_contents_ltr cke_show_borders').html("<p><a herf="+linkValue+"></a></p>");*/
	        }else{
	            linkValue = $('.linkName').attr('data-value');
	            var linkClassName = $('.linkName').val();
	            if(linkClassName == '' || linkClassName == null){
	            	$('.wrongTipsC').html("请输入课程名称!");
	    			return;
	    		}
	    		if(linkValue == '' || linkValue == null){
	    			$('.wrongTipsC').html("请输入有效课程!");
	    			return;
	    		}
	            var body = editor.document.getBody().getHtml();
	            editor.document.getBody().setHtml(body+"<p><a href='javascript:void(0)' onclick=\"buttonClick('"+linkValue+"')\">"+linkClassName+"</a></p>");
	        }
	        $('.linkPopup').hide();
	        $('.cke_dialog_background_cover').hide();
	        $('.cke_dialog').css('visibility','hidden');
	        $('.linkLink').val("");
	        $('.linkName').val("");
	        $('.linkNameList').hide();
	    });
			/* function goback(){
				window.location.href = "comBannerIndex";
			} */
	    var radioList = $("input[type='radio']");
			
	$('#saveBtn').click(function () {
		for(var i = 0;i< radioList.length;i++){
            if(radioList.eq(i).prop('checked')){
            	var bannerImgUrl=$("#commdotityPic").attr("realPath");
      			 if(null==bannerImgUrl || ''==bannerImgUrl){
      				 alert("banner图不能为空");
      				 return;
      			 }
      	    	 var bannerName=$("#bannerName").val();
      	    	if(null==bannerName || ''==bannerName){
                    alert("banner名称不能为空");
                    return;
                }
      	    	 var id=$("#bannerId").val();
      	    	 var bannerDescribe=$("#bannerDescribe").val();
      	    	if(null==bannerDescribe || ''==bannerDescribe){
                    alert("banner描述不能为空");
                    return;
                }
      	    	 var bannerType = $("#bannerType").val();
            	//i等于0就是选择的目标地址
                if(i == 0){
                	var selectOption = $('#selectOption').val();
                	//selectOption为0则是活动
                	if(selectOption == 0){
                		var linkHref = $('#linkHref').val();
                		if(linkHref == '' || linkHref == null){
                			$.msg("请输入活动地址!",1000);
                			return;
                		}
                		var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                		/* if (!reg.test(linkHref)){
                            $.msg("请输入有效的网址!",1000);
                            return ;
                        } */
                		$.ajax({
            	 	 			url: rootPath + "/Banner/update",
            	 	 			type:"post",
            	 	 			data:{"id":id,"bannerName":bannerName,"linkHref" : linkHref,"bannerDescribe":bannerDescribe,"bannerImgUrl" :bannerImgUrl,"detailType" :0},
            	 	 			dataType:"json",
            	 	 			success:function(data){
            	 	 				if(data.msg == 'success'){
            	 	 					alert("保存成功");
            	 	 					if(bannerType == 0){
            	 	 						window.location.href = "<%=rootPath %>/Banner/comBannerIndex";
            	 	 					}else if(bannerType == 1){
            	 	 						window.location.href = "<%=rootPath %>/Banner/riseBannerIndex";
            	 	 					}else{
            	 	 						window.location.href = "<%=rootPath %>/Banner/acrcoBannerIndex";
            	 	 					}
            	 	 				}
            	 	 			}
            	 	 		});
                	}else{
                		var searchClass = $('#searchClass').attr('data-value');
                		var searchClassName = $('#searchClass').val();
                		if(searchClassName == '' || searchClassName == null){
                			$.msg("请输入课程名称!",1000);
                			return;
                		}
                		if(searchClass == '' || searchClass == null){
                			$.msg("请输入有效课程!",1000);
                			return;
                		}
                		$.ajax({
            	 	 			url: rootPath + "/Banner/update",
            	 	 			type:"post",
            	 	 			data:{"id":id,"bannerName":bannerName,"searchClass" : searchClass,"searchClassName" : searchClassName,"bannerDescribe":bannerDescribe,"bannerImgUrl" :bannerImgUrl,"detailType" :1},
            	 	 			dataType:"json",
            	 	 			success:function(data){
            	 	 				if(data.msg == 'success'){
            	 	 					alert("保存成功");
            	 	 					if(bannerType == 0){
            	 	 						window.location.href = "<%=rootPath %>/Banner/comBannerIndex";
            	 	 					}else if(bannerType == 1){
            	 	 						window.location.href = "<%=rootPath %>/Banner/riseBannerIndex";
            	 	 					}else{
            	 	 						window.location.href = "<%=rootPath %>/Banner/acrcoBannerIndex";
            	 	 					}
            	 	 				}
            	 	 			}
            	 	 		});
                	}
                }else{
       	    	 CKupdate();
       	    	 var bannerContent=editor.document.getBody().getHtml();
       	    	 if(null!=bannerContent && '<p><br></p>'!=bannerContent){
       	    		 $.ajax({
       	 	 			url: rootPath + "/Banner/update",
       	 	 			type:"post",
       	 	 			data:{"id":id,"bannerName":bannerName,"bannerContent" : bannerContent,"bannerDescribe":bannerDescribe,"bannerImgUrl" :bannerImgUrl,"detailType" :2},
       	 	 			dataType:"json",
       	 	 			success:function(data){
       	 	 				if(data.msg == 'success'){
       	 	 					alert("保存成功");
       	 	 					if(bannerType == 0){
       	 	 						window.location.href = "<%=rootPath %>/Banner/comBannerIndex";
       	 	 					}else if(bannerType == 1){
       	 	 						window.location.href = "<%=rootPath %>/Banner/riseBannerIndex";
       	 	 					}else{
       	 	 						window.location.href = "<%=rootPath %>/Banner/acrcoBannerIndex";
       	 	 					}
       	 	 				}
       	 	 			}
       	 	 		});
       	    	 }else{
       	    		 alert("内容不能为空");
       	    	 }
                }
            }
		}
	    }); 
		//上传截取后的图片
		function classTypePic() {
			$.ajax({
						url : rootPath + "/Banner/saveCutPic",
						data : {
							path : $("#target").attr("src"),
							x : $("#x").val(),
							y : $("#y").val(),
							w : $("#w").val(),
							h : $("#h").val(),
							itemOneid : $("#itemOneid").val(),
							bannerType:$("#bannerType").val()
						},
						type : "post",
						dataType : "json",
						success : function(data) {
							chooseOnePic(data.picOriginalUrl,
									data.realPath);
						}
					})
			$("#chooseDiv").css("display", "none");
			$("#stopDiv").css("display", "none");
			return;
		}
		//选择封面
		function chooseOnePic(url,path){
			$("#chooseDiv").css("display","none");
			$("#stopDiv").css("display","none");
			$("#commdotityPic").attr({"src":url,"realPath":path});
		}
		
		$(".pic").on("change","#target", function() {
			var theImage = new Image();
			console.log($(this).attr("src"));
			theImage.src = $(this).attr("src");
			var bannerType = $("#bannerType").val();
			 if (theImage.complete) {
				 	sourceHeight = theImage.height;
					sourceWidth = theImage.width;
					$.init(sourceWidth, sourceHeight,bannerType);
 			    } else {
 			    	theImage.onload = function () {
 			        	sourceHeight = theImage.height;
						sourceWidth = theImage.width;
						$.init(sourceWidth, sourceHeight,bannerType);
 			        };
 			    };
			
		});
		//选择图片
		function savePic(){
				$.ajaxFileUpload({
				url : rootPath+"/simpleClasses/savePic;"+ window["sessionName"] + "=" + window["sessionId"],
				secureuri : false,// 安全协议
				async : false,
				fileElementId : 'imgData',
				dataType:'json',
				type : "POST",
				success : function(data) {
				  $("#sourcePic").attr("src",data.url);
				  $("#target").parent().html('<img id="target" src="'+data.url+'" style="width:516px;height:282px;"/>');
			      $("#target").trigger("change");
			      $(".p1 img").attr("src",data.url);
			      $(".p2 img").attr("src",data.url);
			      $(".p3 img").attr("src",data.url);
				},
				error:function(arg1,arg2,arg3){
					//console.log(arg1);
				}
//				loadingEle: '#target',
//				fileName: 'imgData'
			});
		}
		
		//回显数据
		if(Number($('#detailType').val())==0||Number($('#detailType').val())==1){
			$('#targetSiteInput').prop('checked',true);
			if(Number($('#detailType').val())==0){
				$('#linkHref').val('${msgPage.linkHref}');
				$('#selectOption').children('option').eq(0).attr('selected',"selected");
				$('#linkHref').show();
				$('#searchClass').hide();
		        
				
				
			}else{
				$('#searchClass').val('${msgPage.searchClassName}');
				$('#searchClass').attr('data-value','${msgPage.searchClass}');
				$('#selectOption').children('option').eq(1).attr('selected',"selected");
				$('#linkHref').hide();
				$('#searchClass').show();
				
			}
			
			setTimeout(function(){
				$('#cke_newsContents').css('display',"none");
				$('.targetSiteContent').css('display',"inline-block");
			},200);
			
			
		
		}else if(Number($('#detailType').val())==2){
			
			$('#contentInput').prop('checked',true);
			
			$('#cke_newsContents').css('display',"block");
	        
	        $('.targetSiteContent').css('display',"none");
		}
		
	</script>
<script>
    //        二级菜单加active
    $(function () {
        $selectSubMenu('comBannerIndex');
    });
</script>
</body>
</html>
