$(function(){
    		$selectSubMenu('student_message'); 
    		// $("#two").hide();
    		$(".btn-one:first").attr("class","btn btn-mini btn-one btn-success");
    		$(".classes-type").delegate("a","click",function () {
				$(this).addClass("btn-success").siblings().removeClass("btn-success");
				if($(this).attr("data-type") == 'STUDENT_MESSAGE_WEIXIN'){
					$(".classes-type p").show();
					$(".typeFlag").hide();
				}else if($(this).attr("data-type") == 'STUDENT_MESSAGE_AFFICHE'){
					$(".courseFlag").hide();
					$(".stepFlag").hide();
					$(".subjectFlag").hide();
					$(".typeFlag").hide();
				}else{
					$(".classes-type p").show();
				}
                selDetail(1);
            })
	/*$(".btn-notice").each(function(){
    			$(this).click(function(){
    				$(this).attr("class","btn btn-mini btn-notice btn-success");
    				$(this).prevAll().attr("class","btn btn-mini btn-notice btn-link");
    				$(this).nextAll().attr("class","btn btn-mini btn-notice btn-link");
					selDetail(1);
    			});
    		});
    		$(".btn-one").each(function(){
    			$(this).click(function(){
    				$(this).attr("class","btn btn-mini btn-one btn-success");
    				$(this).prevAll().attr("class","btn btn-mini btn-one btn-link");
    				$(this).nextAll().attr("class","btn btn-mini btn-one btn-link");
    				// getTwoItem();
                    selDetail(1);
    			});
    		});
    		$(".btn-method").each(function(){
    			$(this).click(function(){
    				$(this).attr("class","btn btn-mini btn-method btn-success");
    				$(this).prevAll().attr("class","btn btn-mini btn-method btn-link");
    				$(this).nextAll().attr("class","btn btn-mini btn-method btn-link");
					selDetail(1);
    			});
    		});*/
    		//getTwoItem();
    selDetail(1);
    	});
		//加载 学科小类
		// function getTwoItem(){
		// 	if($(".btn-one.btn-success").attr("data-id") > 0){
		// 		$.ajax({
		// 			url:rootPath + "/sysConfigItem/twoProByClass",
		// 			type:"post",
		// 			data:{"oneItemId":$(".btn-one.btn-success").attr("data-id")},
		// 			dataType:"json",
		// 			success:function(data){
		// 				if(data.twoItem != null){
		// 					$("#two").show();
		// 					$("#two").html("");
		// 					$.each(data.twoItem,function(index,item){
		// 						$("#two").append("<a class='btn btn-mini btn-two btn-link' href='javascript:;' data-id='" + item.id + "'>" + item.itemName+ "</a>");
		// 					});
		// 					$(".btn-two:first").attr("class","btn btn-mini btn-two btn-success");
		// 					$(".btn-two").each(function(){
		// 						$(this).click(function(){
		// 							$(this).attr("class","btn btn-mini btn-two btn-success");
		// 							$(this).prevAll().attr("class","btn btn-mini btn-two btn-link");
		// 							$(this).nextAll().attr("class","btn btn-mini btn-two btn-link");
		// 							selDetail(1);
		// 						});
		// 					});
		// 					selDetail(1);
		// 				}
		// 			}
		// 		});
		// 	}else{
	    	// 	$("#two").hide();
		// 		$("#two").html("");
		// 		selDetail(1);
		// 	}
		// }
    	//加载详细信息
    	function selDetail(pageNo){
    		if(affiche =="goAffiche"){
    			$("a.btn-success").removeClass("btn-success");
    			$("#affiche").removeClass();
    			$("#affiche").attr("class","btn btn-mini btn-notice btn-success");
    			affiche = "";
    		}
    		messageType = $.trim($(".btn-notice.btn-success").attr("data-type"));
    		var url = rootPath + "/classModuleLesson/noticeDetail";
    		if(messageType == "STUDENT_MESSAGE_AFFICHE"){
    			url = rootPath +"/student/goAffichePage";
    			$('#studentNotice').html("公告通知");
    			$('#addStudentNotice').html("新增公告通知");
    		}else{
    			$('#studentNotice').html("学员通知");
    			$('#addStudentNotice').html("新建学员通知");
    		}
    		itemOneId = $.trim($(".btn-one.btn-success").attr("data-id"));
    		itemSecondId = $.trim($(".btn-two.btn-success").attr("data-id"));
            itemThirdId = $.trim($(".btn-three.btn-success").attr("data-id"));
	   		messageMethod = 	$.trim($(".btn-method.btn-success").attr("data-type"));
	   		pageSize = 	$.trim($("#pageSize").val());
	   		$.ajax({
	   			url : url,
	   			type:"post",
	   			data:{"page":pageNo,"itemOneCode":itemOneId,"itemSecondCode":itemSecondId,"itemThirdCode":itemThirdId,"messageType":messageType,"messageMethod":messageMethod,"pageSize":pageSize},
	   			dataType:"html",
	   			beforeSend:function(XMLHttpRequest){
	   	              $(".loading").show();
	   	              $(".loading-bg").show();
	   	         },
	   			success:function(data){
	   				$(".notice-list").html(data);
	   			},
	   			complete:function(XMLHttpRequest,textStatus){
	   				$(".loading").hide();
	   	            $(".loading-bg").hide();
	   	        }
   			});
    	}
    	
    	function goAffiche(){
    		  $.ajax({
    	 			url : rootPath +"/student/goAffichePage",
    	 			type:"post",
    	 			data:{},
    	 			dataType:"html",
    	 			beforeSend:function(XMLHttpRequest){
    	 	              $(".loading").show();
    	 	              $(".loading-bg").show();
    	 	         },
    	 			success:function(data){
    	 				$(".notice-list").html(data);
    	 			},
    	 			complete:function(XMLHttpRequest,textStatus){
    	 				$(".loading").hide();
    	 	            $(".loading-bg").hide();
    	 	        }
    				});
    	  }
    	
    	function goAddPage(){
    		if(messageType == "STUDENT_MESSAGE_AFFICHE"){
    			window.location = rootPath +"/student/createNotice?addAffiche=addAffiche";
    		}else if(messageType == "STUDENT_MESSAGE_WEIXIN"){
				window.location = rootPath +"/student/createWeixin";
			}else{
    			window.location = rootPath +"/student/createNotice";
    		}
    	}