function toOnsaleEdit(ids,zhiboFlag){
	$.ajax({
		url : rootPath + "/simpleClasses/showAppShelvesEdit",
		type : "post",
		data:{"ids":ids,"zhiboFlag":zhiboFlag},
		beforeSend:function(XMLHttpRequest){
            $(".loading").show();
            $(".loading-bg").show();
        },
		success : function(result) {
			$("#shelvesdetils").html(result);
		},
		 complete:function(XMLHttpRequest,textStatus){
				$(".loading").hide();
	            $(".loading-bg").hide();
	     }
	});
}
function chooseSlibMenu(obj){
	var id = obj.attr("id").replace("List","");
	console.log(id);
	var parentId = obj.val();
	$.ajax({
		url : rootPath +"/simpleClasses/querySlibMenu",
		type : "post",
		data : {"parentId":parentId,"typeId":id},
		success : function(result) {

			var data = result.comm;
			var stages = result.stages;
			var types = result.types;

			if("courseCaId"==id){
				$("#gradeIdList").html("");
				var html='';
				for(var i=0;i<data.length;i++){
					if(i==0){
						html+=' <option value="'+data[i].id+'" selected="selected">'+data[i].name+'</option>';
					}else{
						html+=' <option value="'+data[i].id+'">'+data[i].name+'</option>';
					}
				}
				$("#gradeIdList").html(html);
				chooseSlibMenu($("#gradeIdList"));

				//阶段
				$("#stageIdList").html("");
				var html='';
				for(var i=0;i<stages.length;i++){
					if(i==0){
						html+=' <option value="'+stages[i].id+'" selected="selected">'+stages[i].name+'</option>';
					}else{
						html+=' <option value="'+stages[i].id+'">'+stages[i].name+'</option>';
					}
				}
				$("#stageIdList").html(html);

				//类型
				$("#typeIdList").html("");
				var html='';
				for(var i=0;i<types.length;i++){
					if(i==0){
						html+=' <option value="'+types[i].id+'" selected="selected">'+types[i].name+'</option>';
					}else{
						html+=' <option value="'+types[i].id+'">'+types[i].name+'</option>';
					}
				}
				$("#typeIdList").html(html);


			}else if("gradeId"==id){
				$("#subjectIdList").html("");
				var html='';
				for(var i=0;i<data.length;i++){
					if(i==0){
						html+=' <option value="'+data[i].id+'" selected="selected">'+data[i].name+'</option>';
					}else{
						html+=' <option value="'+data[i].id+'">'+data[i].name+'</option>';
					}
				}
				$("#subjectIdList").html(html);
				chooseSlibMenu($("#subjectIdList"));
			}else if("subjectId"==id){
				$("#kwonProIdList").html("");
				var html='';
				for(var i=0;i<data.length;i++){
					if(i==0){
						html+=' <option value="'+data[i].id+'" selected="selected">'+data[i].name+'</option>';
					}else{
						html+=' <option value="'+data[i].id+'">'+data[i].name+'</option>';
					}
				}
				$("#kwonProIdList").html(html);
				chooseSlibMenu($("#kwonProIdList"));
			}else if("kwonProId"==id){
				$("#knowIdList").html("");
				var html='';
				for(var i=0;i<data.length;i++){
					if(i==0){
						html+=' <option value="'+data[i].id+'" selected="selected">'+data[i].name+'</option>';
					}else{
						html+=' <option value="'+data[i].id+'">'+data[i].name+'</option>';
					}
				}
				$("#knowIdList").html(html);
			}
		}
	});
}

function queryClassDetails(id){
	$("#myForm").html("");
	var input="<input type='hidden' value='"+id+"' name='id'/><input type='hidden' value='"+$("#lab").val()+"' name='lable'/>";
	$("#myForm").html(input);
	$("#myForm").attr("action","/editSimpleCourse/editClassTypeMessage").submit();
}

//请求状态
var isLoading = false;
function toShelves(flag,editFlag){
	var courseCaId = $("#courseCaIdList").val();
	var gradeId = $("#gradeIdList").val();
	var subjectId = $("#subjectIdList").val();
	var kwonProId = $("#kwonProIdList").val();
	var knowId = $("#knowIdList").val();
	var stageId = $("#stageIdList").val();
	var typeId = $("#typeIdList").val();
	var id = $("#commodityId").val();
	var appId = $("#appId").val();
    var shelvesTime = $("#shelvesTime").val();
    var labDesc = $("#labDesc").val();
    var appPrice = $("#appPrice").val();
    var salePrice = $("#salePrice").val();


    if (courseCaId == null || courseCaId == "") {
        alert("请选择课程分类");
    } else if (gradeId == null || gradeId == "") {
        alert("请选择学段");
    } else if (subjectId == null || subjectId == "") {
        alert("请选择学科");
    } else if (kwonProId == null || kwonProId == "") {
        alert("请选择知识点专题");
    } else if (knowId == null|| knowId == "") {
        alert("请选择知识点");
    }else {
        if(appPrice){
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!reg.test(appPrice)) {
                alert("请输入正确的价格");
                return;
            }
        }
        if(appPrice){
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!reg.test(appPrice)) {
                alert("请输入正确的价格");
                return;
            }
        }
        if("0"==flag && new Date() > new Date(shelvesTime)){
            alert("预约时间不能小于当前时间");
            return;
        }
        if(salePrice){
            if (!reg.test(salePrice)) {
                alert("请输入正确的销售价格");
                return;
            }
        }
        if("0"==flag && ""== $.trim(shelvesTime) ){
            alert("预约上架时间不能为空");
            return;
        }
//请求状态为请求中则返回
        if(isLoading){
            alert("网络繁忙，请稍等！");
            return;
        }
        //改变请求状态
        isLoading = true;
        $.ajax({
            url : rootPath +"/simpleClasses/insertShelvesInfo",
            type : "post",
            data : {"id":id,"appId":appId,"courseCaId":courseCaId,"gradeId":gradeId,"subjectId":subjectId,"kwonProId":kwonProId,
                "appPrice":appPrice,"salePrice":salePrice,"knowId":knowId,"stageId":stageId,"typeId":typeId,"shelvesFlag":flag,"shelvesTime":shelvesTime,"labDesc":labDesc},
            success : function(result) {
                if("1"==result){
                    alert("成功")
                    $('.popupContainer').hide();
                    $('.popupOpacity').hide();
                    if('1'==editFlag){
                        reloadCurrunt();
                    }else{
                        Form.queryAllCommdityByItemNew(1);
                    }
                }else{
                    alert("失败");
                }
                //重置请求状态
                isLoading = false
            }
        });
	}




}

function savePic(){
    $.ajaxFileUpload({
		url: rootPath + "/appNewClasses/savePic",
		secureuri : false,// 安全协议
		async : false,
		fileElementId : 'imgData',
		dataType:'json',
		type : "POST",
		success : function(data) {
			// $("#pic").attr("src",data.url);
		},
		error:function(arg1,arg2,arg3){
			//console.log(arg1);
		},
		loadingEle: '#target',
		fileName: 'imgData'
	});
}



