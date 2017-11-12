/**
 * author zhang.zx
 * 页面js封装
 */
var originType = null;
(function($){
	var Form={
			init : function(){
			var $this=this;
			$selectMenu("course_class_type");
			//$(".footer").addClass("footer-fixed");

			//初始化日期框
			$(".date-picker").datetimepicker({
				format: "yyyy-mm-dd",
 				minView:2,
 				autoclose: true,
 				language: "zh-CN"
			});
			$('.date-picker1').datetimepicker({
    	        language:  'zh-CN',
    			autoclose: 1,
    			todayHighlight: 1,
    			startView: 1,
    			minView: 0,
    			maxView: 1,
    			forceParse: 0,
    			autoclose: true
    	    }).on("changeDate", function(){
    	    	var dataType = $(this).attr("dataType");
    	    	var currentTime = $(this).val().replace(":","");
    	    	if(dataType == "startTime"){
    	    		//查找endTime的值
    	    		var lessonTimeEnd = $("#endD").val().replace(":","");
    	    		if(parseInt(lessonTimeEnd) <= currentTime){
    	    			$.msg("结束时间不能小于开始时间");
    	    		}
    	    		if(parseInt(lessonTimeEnd) == currentTime){
    	    			$.msg("结束时间不能等于开始时间");
    	    		}
    	    	}else if(dataType == "endTime"){
    	    		//查找startTime的值
    	    		var lessonTimeStart = $("#startD").val().replace(":","");
    	    		if(parseInt(lessonTimeStart) >= currentTime){
    	    			$.msg("开始时间不能大于结束时间");
    	    		}
    	    		if(parseInt(lessonTimeStart) == currentTime){
    	    			$.msg("结束时间不能等于开始时间");
    	    		}
    	    	}
    	    });
			//初始化数据
			$this.loadData();
			//打开添加课次框
			$(".addcourseDetail").on('click',function(){
				$("#omoduelId").val('');
				$("#chaptermark").val(1);
				$("#eidtype").val("add");
				$(".popupwin-title").find(".h5").text("添加课次");
				$(".onepopuwin").popup("show");
			});
			//添加课程
			$(".addCourse").on('click',function(){
				var chapter='<li class="item item-chapter non-children" ids="" mark="">'+
         		'<div class="ball"></div><div class="line"></div>'+
         		'<div class="content">'+
         		'<div class="tt">'+
         		'<span class="h3"><input type="text" id="addcontents" maxlength="20" class="addcou"/></span>'+
         		'<a href="javascript:void(0);"  class="btn btn-default savecon">保存</a>'+
         		'</div>'+
         		'<div class="action">'+
         		'<a href="javascript:void(0);" class="adddel"><i class="iconfont">&#xe626;</i></a>'+
         		'</div>'+
         		'</div>'+
         		'</li>';
				$(".courseliList").append(chapter);
				$("#addcontents").focus();
			});
			
			//添加课程
			$(".courseliList").on('click','a.savecon',function(){
				var name=$(this).prev().find("input[type=text]").val();
				var id=$(this).parents("li.item-chapter").attr("ids");
				if(name==""){
					$.msg("请输入课程单元名称");
					return;
				}
				if(name.length>20){
					$.msg("课程单元名称最多输入20个字符");
					return;
				}
				if(id&&id!=""){
					 $.ajax({
						url: rootPath+"/classModule/updateMoudle",
						type:"post",
						data : {"id":id,"name":name},
						dataType:"json",
						success: function(jsonData){
							Form.loadData();
							 //$(this).parents("div.tt").addClass("none").prev().removeClass("none");
						}
					});
				}else{
					$.ajax({
						url : rootPath + "/classModule/checkName",
						type : "post",
						data : {"name":name},
						dataType : "json",
						success : function(b) {
							if(b){
								$this.saveCourse(name);
								$(this).parents("li.item-chapter").remove();
							}else{
								$.msg("课程单元名称已存在");
							}
						}
				 })
			   }
			});
			
			//编辑课程
			 $(".courseliList").on('click','a.editfather',function(){
				 var $this=$(this);
				 var mark=$this.attr("mark");
				 if("edit"==mark){
					 $this.parent().prev().removeClass("none").prev().addClass("none"); 
					 $this.parent().prev().find("input[type=text]")[0].focus();
				 }
				 if("del"==mark){
					 $.ajax({
							url: rootPath+"/classModule/delModule",
							type:"post",
							data : {"moduleId":$this.attr("ids")},
							dataType:"json",
							success: function(res){
								if("success"==res){
									 $this.parents("li.item-chapter").remove();
								}else{
									$.msg("请先删除该课程单元下课次");
									return;
								}
							}
						});
				 }
				 //点击显示或隐藏下拉列表
				 if("chose"==mark){
					 var num=$this.attr("m");
					 if(num=="close"){
						 $this.attr("m","open");
						 $this.next().removeClass("none"); 
					 }else{
						 $this.attr("m","close");
						 $this.next().addClass("none");
					 }
				 }
			 })//添加节
			 .on('click','a.addlec',function(){
				 var $this=$(this);
				 $("#chaptermark").val(0);
				 $("#omoduelId").val($this.attr("ids"));
				 $("#eidtype").val("add");
				 $("#teacherList").select2();
				 $("#tassitList").select2();
				 $(".popupwin-title").find(".h5").text("添加课次");
				 $(".onepopuwin").popup("show");
				 $this.parents("ul.box").addClass("none");
			 })//添加课程资料
			 .on('click','a.courseresource',function(){
				 var $this=$(this);
				 var id=$this.attr("ids");
				 if(id&&id!=""){
					 $("#doctype").attr("lecid",id);
				 }else{
					 $("#doctype").attr("lecid","");
				 }
				 Form.queryCorseResoure(id);
				 $(".class-resource").show();
				 $(".loading-bg").show();
				 $this.parents("ul.box").addClass("none");
			 })//添加课程单元时取消添加
			 .on('click','a.adddel',function(){
				 $(this).parents("li.item-chapter").remove();
			 })
			  .on("mouseover",'a.chosec',function(){
				 $(this).next().show();
			 })
			 .on("mouseleave",".box",function(e){
				 $(this).hide();
			 })
			 .on("mouseleave",".action",function(e){
				 $(this).find(".box").hide();
				 return false;
			 });
			 
			//关闭资料弹框
			$(".btn-cancel").click(function(){
				$(".class-resource").hide();
				$(".loading-bg").hide();
				$("#doctype").val("");
				$("#dochint").html("");
			});
			//上传资料
//			$("#doctype").on('change',function(){
//				$this.docChange();
//			});
			//保存资料
			$(".btn-ok").on('click',function(){
				$(".loading-bg").show();
				var oneItem=$("#itemOneId").val();
				var twoItem=$("#itemSecondId").val(); 
				var classid=$("#classtypeId").val();
				//类型code
				var resource=$("#classresource").val();
				//类型name
				var resName = $.trim($("#classresource").find("option:selected").text());
				var classTypeName=$("#className").val();
				var lectureId=$("#doctype").attr("lecid");
				var docurl=$("#doctype").attr("url");
    			var docname=$("#doctype").attr("cname");
    			var docsize=$("#doctype").attr("mark");
    			if(docurl == null || docurl == ""){
					$.msg("请先上传文档");
					$(".loading-bg").hide();
					return false;
				}
	    	    //console.log("课程资料信息---节："+lectureId+"---文件名"+docname);
					$.ajax({
						url : rootPath + "/classTypeResource/save",
						type:"post",
						data:{"itemOneId":oneItem,
							"itemSecondId":twoItem,
							"classTypeId":classid,
							"resourceType":resource,
							"classTypeName":classTypeName,
							"fileId":docurl,
							"lectureId":lectureId,
							"lectureType":"TEACH_METHOD_FACE"},
						dataType:"json",
						success:function(data){
							if(data.msg == "success"){
								//$(".class-resource").hide();
								$("#doctype").attr("url","");
					    		//$("#dochint").html("");
					    		Form.queryCorseResoure(lectureId);
					    		$(".loading-bg").hide();
					    		$.msg("资料保存成功");
							}else{
								$(".loading-bg").hide();
								$.msg("保存资料失败");
							}
						}
					});
			});
			
			//删除课程资料
			$("#resourceLists").on("click","a.delresource",function(){
				var $t=$(this);
				var id=$t.attr("ids");
				$.ajax({
					url : rootPath + "/classTypeResource/delete/"+id,
					type:"post",
					dataType:"json",
					success:function(data){
						$t.parent().remove();
					}
				});
			});	
			
			 //编辑课次
			 $(".courseliList").on('click','a.editson',function(){
				 var $this=$(this);
				 var mark=$this.attr("mark");
				 var oid=$this.attr("oid");//课次id
				 var pid=$this.attr("pid");//模块id
				 /*var isJigou = $("#isJigou").val();
				 var isFenxiao = $("#isFenxiao").val();
				 if(isJigou == false || isJigou == 'false'&& isFenxiao==false || isFenxiao=='false'){
					 var ta = $this.attr("teac");
					 var flag = $("#isFusheng").val();
					 var teacherId = $("#teacherId").val();
					 if(flag == true || flag == 'true' && ta!=teacherId){
						 $this.off('click','a.editson');
						 return;
					 }
				 }*/
				 if("edit"==mark){
					 $.ajax({
							url: rootPath+"/classModule/queryLessonDetail",
							type:"post",
							data : {"lessonId":oid},
							dataType:"json",
							success: function(lesson){
								var startd=lesson.lessonDate;
								$("#startDay").val(startd);
								//var endt=dateToStr("yyyy-MM-dd",dateAdds("d",lesson.lessonHour/24,new Date(lesson.lessonDate)))+" "+lesson.lessonTimeEnd;
								$("#lessonName").val(lesson.lessonName);
								$("#startD").val(lesson.lessonTimeStart);
								$("#endD").val(lesson.lessonTimeEnd);
								var teacherId=lesson.teachers;
								var assistants=lesson.assistants;
								var classroomId=lesson.classroomId;
								$("#classList").find('option[value='+classroomId+']').attr("selected","selected");
								$("#classList").select2();
								$("#teacherList").find('option[value='+teacherId+']').attr("selected","selected");
								$("#teacherList").select2();
								$("#tassitList").find('option[value='+assistants+']').attr("selected","selected");
								$("#tassitList").select2();
								$("#lessonId").val(lesson.id);
								$("#chaptermark").val(lesson.chapterFlag);
								//console.log("老师教务id=="+teacherId+"----"+assistants);
							}
						});
					 $(".popupwin-title").find(".h5").text("编辑课次");
					 $(".onepopuwin").popup("show");
					 $("#eidtype").val("update");
					 $("#omoduelId").val('').val(pid);
				 }
				 if("del"==mark){
					 $.confirm("您确认删除此节课吗?",function(b){
						if(b){
							 $.ajax({
									url: rootPath+"/classModule/delModuleLesson",
									type:"post",
									data : {"lessonId":oid},
									dataType:"json",
									success: function(res){
										if("success"==res){
											Form.loadData();
										}else{
											$.msg("删除失败");
											return;
										}
									}
								});
						} 
					 });
				 }
				 if("chose"==mark){
					 var num=$this.attr("m");
					 if(num=="close"){
						 $this.attr("m","open");
						 $this.next().removeClass("none"); 
					 }else{
						 $this.attr("m","close");
						 $this.next().addClass("none");
					 }
				 }
				
			 })
			 
			//添加课次
			$(".addclassLesson").on('click',function(){
				$this.saveclassLesson();
			});
			
			//返回
			$(".cancle").on('click',function(){
				$("#myForm").attr("action",rootPath+"/simpleClasses/updateClassTypeMessage").submit();
			});
			
			//开始招生
			$(".complete").on('click',function(){
				$("#myForm").attr("action",rootPath+"/simpleClasses/onSale").submit();
			})
			
			//绑定排序事件
			$(".sortable").sortable({
				placeholder: "ui-state-highlight",
				update:function(event,ui){
					$this.sort(ui.item.siblings());
					$this.sort(ui.item);
				},
				receive:function(event,ui){
					$this.mvLecture(ui.sender,$(event.target).parents(".dis"),ui.item);
				},
				delay: 200,
				connectWith: ".son",
				cursor: "move"
			}).disableSelection();
		},
		loadData : function(){
			$(".courseliList").html('');
			$.ajax({
				url: rootPath+"/simpleClasses/queryDetail",
				type:"post",
				data : {"classtypeId":$("#classtypeId").val(),"teachMethod":"TEACH_METHOD_FACE"},
				dataType:"json",
				success: function(jsonData){
					originType = $("#originType").val();
					$.each(jsonData,function(i,module){
						if(module.chapterFlag&&module.chapterFlag==1){
							if(module.classmoudleNo&&module.classmoudleNo!=null){
								$("#moduleNoIdkc").val(module.classmoudleNo.id);
								$.each(module.classmoudleNo.classModuleLessons,function(i,lesson){
									var lec='<li class="item item-chapter" ids="'+lesson.id+'" moduleId="'+module.id+'">'+
									'<div class="ball"></div><div class="line"></div>'+
		                     		'<div class="content">'+
		                     		'<div class="tt">'+
		                     		'<span class="h3" title='+(lesson.lessonName?lesson.lessonName:"")+'>'+(lesson.lessonName?(lesson.lessonName.length>8?lesson.lessonName.substring(0,8)+"...":lesson.lessonName):"")+'</span><span>共'+(lesson.lessonHour?lesson.lessonHour:"0")+'课时</span>'+
		                     		'</div>'+	
		                     		'<div class="info">'+
		                     		'<span class="time">'+lesson.lessonDate+'  '+(lesson.weekType?lesson.weekType:"")+'  '+(lesson.lessonTimeStart?lesson.lessonTimeStart:'')+'</span>'+
		                     		'<span class="address">'+(!lesson.classroom?"":lesson.classroom.length>7?lesson.classroom.substring(0,7)+'...':lesson.classroom)+'</span>'+
		                     		'<span class="people">'+(lesson.teachers=='del'?'此老师已删除':(!lesson.teachersName?"":lesson.teachersName.length>7?lesson.teachersName.substring(0,7)+'...':lesson.teachersName))+'</span>'+
		                     		'</div>'+
		                     		ceshi(module.id,lesson.id,lesson.teachers)+
		                     		'</div></li>';
									$(".courseliList").append(lec);
								});
							}
						}else{
							var chapter='<li class="item item-chapter" id="father'+module.id+'" ids="'+module.id+'" sort="'+module.sort+'" modulenoid="'+(module.classmoudleNo?module.classmoudleNo.id:"")+'">'+
	                 		'<div class="ball"></div><div class="line"></div>'+
	                 		'<div class="content">'+
	                 		'<div class="tt">'+
	                 		'<span class="h3">'+(module.name?module.name:"")+'</span><span class="sta">未排课</span><span>共'+(module.totalClassHour?module.totalClassHour:"0")+'课时</span>'+
	                 		'</div>'+	
	                 		'<div class="tt none">'+
	                 		'<span class="h3"><input type="text" value="'+(module.name?module.name:'')+'" class="addcou"/></span>'+
	                 		'<a href="javascript:void(0);"  class="btn btn-default savecon">保存</a>'+
	                 		'</div>';
							if(originType=="1"){
								chapter+='<div class="action">'+
								'<a href="javascript:void(0);" ids='+module.id+' class="editfather" mark="edit"><i class="iconfont">&#xe625;</i></a>'+
								'<a href="javascript:void(0);" ids='+module.id+' class="editfather" mark="del"><i class="iconfont">&#xe626;</i></a>'+
								'<a href="javascript:void(0);" style="text-decoration: none;" class="editfather chosec" m="close" mark="chose"><i class="iconfont">&#xe623;</i></a>'+
								'<ul class="box none"><a href="javascript:void(0);" class="courseresource"><li>课程资料</li></a>'+
								'<a href="javascript:void(0);" ids="'+module.id+'" class="addlec"><li>添加课次</li></a></ul>'+
								'</div>';
							}
							chapter+='</div>'+
	                 		'</li>';
							$(".courseliList").append(chapter);
							if(module.classmoudleNo&&module.classmoudleNo!=null){
								if((module.classmoudleNo.classModuleLessons).length<=0){
									$("#father"+module.id).find("span.sta").text("未排课");
								}else{
									$("#father"+module.id).find("span.sta").text("已排课");
								}
								$.each(module.classmoudleNo.classModuleLessons,function(i,lesson){
									var nowDate=dateToStr("yyyy-MM-dd",new Date());
									if(lesson.lessonDate<nowDate){
										$("#father"+module.id).find("span.sta").text("已结课");
									}
									var lec='<li class="item item-lession" ids="'+lesson.id+'">'+
		                     		'<div class="content">'+
		                     		'<div class="tt">'+
		                     		'<span class="h3" title='+(lesson.lessonName?lesson.lessonName:"")+'>'+(lesson.lessonName?(lesson.lessonName.length>10?lesson.lessonName.substring(0,10)+"...":lesson.lessonName):"")+'</span><span>共'+(lesson.lessonHour?lesson.lessonHour:"0")+'课时</span>'+
		                     		'</div>'+	
		                     		'<div class="info">'+
		                     		'<span class="time">'+lesson.lessonDate+'  '+(lesson.weekType?lesson.weekType:"")+'  '+(lesson.lessonTimeStart?lesson.lessonTimeStart:'')+'</span>'+
		                     		'<span class="address">'+(!lesson.classroom?"":lesson.classroom.length>7?lesson.classroom.substring(0,7)+'...':lesson.classroom)+'</span>'+
		                     		'<span class="people">'+(lesson.teachers=='del'?'此老师已删除':(!lesson.teachersName?"":lesson.teachersName.length>7?lesson.teachersName.substring(0,7)+'...':lesson.teachersName))+'</span>'+
		                     		'</div>'+
		                     		ceshi(module.id,lesson.id,lesson.teachers)+
		                     		'</div></li>';
									$(".courseliList").append(lec);
								});
								if(module.classmoudleNo.classModuleLessons.length>0){
									$("#father"+module.id).removeClass("non-children");
								}else{
									$("#father"+module.id).addClass("non-children");
								}
							}
						}
					});
				}
			});
			//加载教室信息
				$.ajax({
					url: rootPath+"/sysConfigClassroom/loadClassroom",
					type:"post",
					dataType:"json",
					success: function(jsonData){
						var len=jsonData.length;
						var html="";
						if(len>0){
							$.each(jsonData,function(i,room){
								html+='<option value='+room.id+'>'+room.roomName+'</option>';
							});
							$("#classList").html("").append(html);
						}else{
							$(".nullnum1").removeClass("none");
							$("#classList").addClass("none");
						}
					}
				});
			//加载教师
			$.ajax({
				url: rootPath+"/simpleClasses/queryTeachers",
				type:"post",
				data : {"type":"PERSON_TEACHER"},
				dataType:"json",
				success: function(jsonData){
					var len=jsonData.length;
					var html="";
					if(len>0){
						$.each(jsonData,function(i,teacher){
							html+='<option value='+teacher.id+'>'+teacher.name+'</option>';
						});
						$("#teacherList").html("").append(html);
					}else{
						$(".nullnum2").removeClass("none");
						$("#teacherList").addClass("none");
					}
				}
			});
			//加载教务
			$.ajax({
				url: rootPath+"/simpleClasses/queryTeachers",
				type:"post",
				data : {"type":"PERSON_ASSISTANT"},
				dataType:"json",
				success: function(jsonData){
					var len=jsonData.length;
					var html="";
					if(len>0){
						$.each(jsonData,function(i,teacher){
							html+='<option value='+teacher.id+'>'+teacher.name+'</option>';
						});
						$("#tassitList").html("").append(html);
					}else{
						$(".nullnum3").removeClass("none");
						$("#tassitList").addClass("none");
					}
					
				}
			});
		},
		saveCourse : function(moduleName){
			var classtypeId=$("#classtypeId").val();
			var itemOneId=$("#itemOneId").val();
			var itemSecondId=$("#itemSecondId").val();
			var teachMethod="TEACH_METHOD_FACE";
			//获取总的li个数
			var sort=$(".courseliList").find("li:last").index()+1;
			if($(".savecon").hasClass("disabled")){
				return;
			}
			$(".savecon").addClass("disabled");
			$.ajax({
				url: rootPath+"/classModule/saveCourse",
				type:"post",
				data : {"classtypeId":classtypeId,"name":moduleName,"itemOneId":itemOneId,"itemSecondId":itemSecondId,"teachMethod":teachMethod,"sort":sort},
				dataType:"json",
				success: function(data){
					$(".savecon").removeClass("disabled");
					Form.loadData();
				}
			});
		},
		saveclassLesson : function(){
			var classtypeId,itemOneId,itemSecondId,teachMethod,moduleId,lessonId,
			lessonDate,lessonTimeStart,lessonTimeEnd,teachers,classroomName,classroomId,
			assistants,teachersName,assistantsName,lessonName,moduleName,classNoId,mark,data={};
			var startDay=$("#startDay").val();
			var from=$("#startD").val();
			var to=$("#endD").val();
			var hour=(to.substring(0,2))-(from.substring(0,2));
			if($("#lessonName").val()==""){
				$.msg("课次名称不能为空");
				return;
			}
			if($("#lessonName").val().length>30){
				$.msg("课次名称最多输入30个字符");
				return;
			}
			var fla="";
			if($("#eidtype").val()=="add"){
				$.ajax({
					url: rootPath+"/classModuleLesson/checklessonName",
					type:"post",
					async: false,
					data : {"lessonName":$("#lessonName").val(),"mouduleNoId":$("#omoduelId").val()},
					dataType:"json",
					success: function(data){
						fla=data;
					}
				 });
			}
			if(fla=="error"){
				$.msg("课次名称已存在");
				return;
			}
			if(from==""||to==""){
				$.msg("请选择上课时间");
				return;
			}
			var today=dateTostring("yyyy-MM-dd",new Date());
			if(startDay<today){
				$.msg("请选择有效的日期");
				return;
			}
			if(from>to||from==to){
				$.msg("开始时间不能大于或等于结束时间");
				return;
			}
			if($("#teacherList").val()==""){
				$.msg("请选择教师");
				return;
			}
		//	var sd=from.substring(0,10);
			//var ed=to.substring(0,10);
		//	var hour=dateDiff("h",strToDate(sd).getTime(),strToDate(ed).getTime());
//			var _b = strToDate(today + ' ' + from + ':00');
//			var _e = strToDate(today + ' ' + to + ':00');
//			hour = timeDifference(_b,_e)+'';
			data.classtypeId=$("#classtypeId").val();
			data.itemOneId=$("#itemOneId").val();
			data.itemSecondId=$("#itemSecondId").val();
			data.teachMethod="TEACH_METHOD_FACE";
			data.totalHours=hour;
			data.lessonDate=startDay.replace(/-/g,"/");
			data.lessonTimeStart=from;
			data.lessonTimeEnd=to;
			data.lessonHour=hour;
			data.teachers=$("#teacherList").val();
			data.teachersName=$("#teacherList").find("option:selected").text();
			data.assistants=$("#tassitList").val();
			data.assistantsName=$("#tassitList").find("option:selected").text();
			data.lessonName=$("#lessonName").val();
			data.moduleName=$("#className").val();
			data.mark=$("#chaptermark").val();
			data.classroomId=$("#classList").val();
			data.classroomName=$("#classList").find("option:selected").text();
			var url="";
			if($("#chaptermark").val()==1){
				if($("#eidtype").val()=="add"){
					//班号
					data.classNoId=$("#moduleNoIdkc").val();
					url=rootPath+"/classModule/addCourseLesson";
				}else{
					data.lessonId=$("#lessonId").val();
					url=rootPath+"/classModule/updateCourseLesson";
				}
			}else{
				if($("#eidtype").val()=="add"){
					data.moduleId=$("#omoduelId").val();
					url=rootPath+"/classModule/addModuleCourseLesson"
				}else{
					data.moduleId=$("#omoduelId").val();
					data.lessonId=$("#lessonId").val();
					url=rootPath+"/classModule/updateCourseLesson";
				}
			}
			if($(".addclassLesson").hasClass("disabled")){
				return;
			}
			$(".addclassLesson").addClass("disabled");
			$.ajax({
				url: url,
				type:"post",
				data : data,
				dataType:"json",
				success: function(data){
					$(".addclassLesson").removeClass("disabled");
					if(data.msg=="success"){
						$(".onepopuwin").popup("hide");
						Form.loadData();	
					}
				}
			 });
			},
			docChange:function(){
				//改变 上传
				$("#dochint").html("<span style='color:red;' >正在上传</span>");
			    $.ajaxFileUpload({
			    	url:rootPath + "/classTypeResource/docupload;"+ window["sessionName"] + "=" + window["sessionId"],
			    	type:"post",
			    	secureuri:false,
			    	fileElementId:"doctype",
			    	dataType: "json",
			    	success:function(data){
			    		if(data.msg == "formatNotRight"){
			    			$("#dochint").html("<span style='color:red;'>上传文件格式不正确</span>");
			    		}else if(data.msg == "sizeOutOf"){
			    			$("#dochint").html("<span style='color:red;'>文件不能大于2MB</span>");
			    		}else if(data.msg == "success"){
			    			$("#doctype").attr("url",data.fileId);
			    			$("#dochint").html("<span style='color:green;'>上传成功</span>");
			    		}else if(data.msg == "nameTooLang"){
			    			$("#dochint").html("<span style='color:red;'>文件名太长</span>");
			    		}else{
			    			$("#dochint").html("<span style='color:green;'>" + data.msg + "</span>");
			    		}
			    	}
			    });
			},
			sort: function(ele){
				var list=new Array();
				if(ele.hasClass("item-chapter")){
					//章排序
					$(".courseliList").find(".item-chapter").each(function(i){
						var chapter={};
						chapter.id=$(this).attr("ids");
						chapter.sort=i+1;
						list.push(chapter);
					})
					$.ajax({
						url: rootPath+"/simpleClasses/sortChapter",
						data:"list="+JSON.stringify(list),
						type: "post",
						dataType: "json",
						success: function(chapters){
							$.each(chapters,function(i,data){
								$(".item-chapter[ids='"+data.id+"']").attr("sort",data.sort).data("attrs",data);
							})
						}
					})
				}else{
					var minIndex=ele.prevAll(".item-chapter").length?ele.prevAll(".item-chapter").eq(0).index():1;
					var maxIndex=ele.nextAll(".item-chapter").length?ele.nextAll(".item-chapter").eq(0).index():1;
					var father=ele.prevAll(".item-chapter").eq(0);
					if(minIndex >= maxIndex){
						var lession={};
						lession.id=ele.attr("ids");
						lession.sort=minIndex+1;
						lession.moduleNoId=father.attr("modulenoid");
						list.push(lession);
					}else{
						//节排序
						$(".courseliList").find(".item").each(function(i){
							if(i>minIndex && i<maxIndex){
								var lession={};
								lession.id=$(this).attr("ids");
								lession.sort=i+1;
								lession.moduleNoId=father.attr("modulenoid");
								list.push(lession);
							}
						})
					}
					
					if(list.length){
						$.ajax({
							url: rootPath+"/simpleClasses/sortLession",
							data:"list="+JSON.stringify(list),
							type: "post",
							dataType: "json",
							success: function(lessions){
								$.each(lessions,function(i,data){
									$(".item-lession[ids='"+data.id+"']").attr("sort",data.sort).data("attrs",data);
								})
							}
						})
					}
				}
			},
			queryCorseResoure : function(id){
				var oneItem=$("#itemOneId").val();
				var twoItem=$("#itemSecondId").val(); 
				var classid=$("#classtypeId").val();
				 $.ajax({
					 url : rootPath + "/classTypeResource/rourseList",
					 type: "post",
					 async: false,
					 data:{"itemOneId":oneItem,"itemSecondId":twoItem,"classTypeId":classid,"lectureId":id,"lectureType":"TEACH_METHOD_FACE"},
					 dataType:"json",
					 success:function(data){
						 var html="";
						 $.each(data,function(i,item){
							 var name=item.name;
							 if(name.substring(name.lastIndexOf(".")+1)=="doc"||name.substring(name.lastIndexOf(".")+1)=="docx"){
								html+='<span class="resouList"><i class="iconfont">&#xe649;</i><font>'+item.name+'</font><a href="javascript:void(0);" class="delresource" style="margin-left:20px;" ids="'+item.id+'"><i class="iconfont">&#xe626;</i></a></span>';
							 }else if(name.substring(name.lastIndexOf(".")+1)=="xls"||name.substring(name.lastIndexOf(".")+1)=="xlsx"){
								 html+='<span class="resouList"><i class="iconfont">&#xe646;</i><font>'+item.name+'</font><a href="javascript:void(0);" class="delresource"  style="margin-left:20px;" ids="'+item.id+'"><i class="iconfont">&#xe626;</i></a></span>';
							 }else if(name.substring(name.lastIndexOf(".")+1)=="pdf"){
								 html+='<span class="resouList"><i class="iconfont">&#xe64b;</i><font>'+item.name+'</font><a href="javascript:void(0);" class="delresource"  style="margin-left:20px;" ids="'+item.id+'"><i class="iconfont">&#xe626;</i></a></span>';
							 }else if(name.substring(name.lastIndexOf(".")+1)=="ppt"||name.substring(name.lastIndexOf(".")+1)=="pptx"){
								 html+='<span class="resouList"><i class="iconfont">&#xe64a;</i><font>'+item.name+'</font><a href="javascript:void(0);" class="delresource"  style="margin-left:20px;" ids="'+item.id+'"><i class="iconfont">&#xe626;</i></a></span>';
							 }else{
								 html+='<span class="resouList"><i class="iconfont">&#xe64c;</i><font>'+item.name+'</font><a href="javascript:void(0);" class="delresource"  style="margin-left:20px;" ids="'+item.id+'"><i class="iconfont">&#xe626;</i></a></span>';
							 }
						 });
//						 if(id!=""){
//							 $("#rsourceLists"+id).html("").append(html); 
//						 }else{
//							 $("#rsourceLists"+classid).html("").append(html); 
//						 }
						 $("#resourceLists").html("").append(html);
					 }
				 });
			}
		}
	
	function ceshi(moduleId,lessonId,teachers){
		var flag = $("#isFusheng").val();
		var isJigou = $("#isJigou").val();
		 var isFenxiao = $("#isFenxiao").val();
		var html = '<div class="action">'+
 		'<a href="javascript:void(0);" pid='+moduleId+' oid='+lessonId+' teac='+teachers+' mark="edit" class="editson"><i class="iconfont">&#xe625;</i></a>'+	
 		'<a href="javascript:void(0);" pid='+moduleId+' oid='+lessonId+' teac='+teachers+' mark="del" class="editson"><i class="iconfont">&#xe626;</i></a>'+
 		'<a href="javascript:void(0);" style="text-decoration: none;" pid='+moduleId+' oid='+lessonId+' teac='+teachers+' mark="chose" m="close" class="editson chosec"><i class="iconfont">&#xe623;</i></a>'+
 		'<ul class="box none"><a href="javascript:void(0);" ids="'+lessonId+' teac='+teachers+'" class="courseresource"><li>课程资料</li></a>'+
 		'</ul>'+
 		'</div>';
		var teacherId = $("#teacherId").val();
		if((isJigou == false || isJigou == 'false')&& (isFenxiao==false || isFenxiao=='false')){
			if(teacherId!=teachers && (flag == true || flag == 'true')){
				return "";	
				}
		}
		
		//if(isJigou == false || isJigou == 'false'&& isFenxiao==false || isFenxiao=='false'){
		return html;
	}
	$(document).ready(function(){
		Form.init();
	})
	window.Form=Form;
})(jQuery)