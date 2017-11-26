<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>通知结果</title>
    <%@include file="/decorators/import.jsp" %>
     <link rel="stylesheet" type="text/css" href="<%=rootPath %>/stylesheets/student.css"/>
	 <script type="text/javascript" src="<%=rootPath %>/javascripts/plus/jquery.pagination.js"></script>
     <script type="text/javascript" src="<%=rootPath%>/javascripts/student.js"></script>
     <script type="text/javascript" src="<%=rootPath%>/javascripts/student/notice/selMessage.js"></script>
	<style type="text/css">
		.msg-content{
			width: 100%;
			heigth: auto;
		}
	</style>
</head>
<body>

<jsp:include page="/WEB-INF/jsp/menu/menu_student.jsp"/>
<div class="u-wrap student">
    <div class="mainbackground">
        <div class="main-content nospace notice-list">
            <table class="table table-noline">
                <col width="25%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="15%">
	               <tr>
	                   <td rowspan="2">
	                       <span class="c-title">${msg.title }</span>
	                       <input type="hidden" value="${msg.id }" id="msgId"/>
	                   </td>
	                   <td>
	                       <span class="t-title">通知类型：</span>
	                       <span class="t-content">
	                       		<c:if test="${msg.messageType == 'STUDENT_MESSAGE_CLASSTYPE' }">
	                       			课程通知
	                       		</c:if>
	                       		<c:if test="${msg.messageType == 'STUDENT_MESSAGE_MODULENO' }">
	                       			班号通知
	                       		</c:if>
	                       		<c:if test="${msg.messageType == 'STUDENT_MESSAGE_SPECIAL' }">
	                       			指定通知
	                       		</c:if>
	                       		<c:if test="${msg.messageType == 'STUDENT_MESSAGE_GROUP' }">
	                       			分组通知
	                       		</c:if>
	                       		<c:if test="${msg.messageType == 'STUDENT_MESSAGE_WEIXIN' }">
	                       			微信通知
	                       		</c:if>
	                       </span>
	                   </td>
	                   <td>
	                   <c:if test="${msg.messageType == 'STUDENT_MESSAGE_CLASSTYPE' }">
	                       <span class="t-title">课程：</span>
	                       <span class="t-content">${msg.classTypeName }</span>
	                   </c:if>
	                   <c:if test="${msg.messageType == 'STUDENT_MESSAGE_WEIXIN' }">
	                       <span class="t-title">课程：</span>
	                       <span class="t-content">${msg.classTypeName }</span>
	                   </c:if>
	                   <c:if test="${msg.messageType == 'STUDENT_MESSAGE_MODULENO' }">
	                       <span class="t-title">班号：</span>
	                       <span class="t-content">${msg.moduleNoName }</span>
	                   </c:if>
	                   <c:if test="${msg.messageType == 'STUDENT_MESSAGE_GROUP' }">
	                       <span class="t-title">分组：</span>
	                       <span class="t-content">${msg.groupOneName }<c:if test="${!empty msg.groupTwoName}">/${msg.groupTwoName}</c:if></span>
	                   </c:if>
	                   </td>
	                   <td>
	                       <span class="t-title">操作人：</span>
	                       <span class="t-content">
							<c:if test="${!empty msg.creatorName}">
								${msg.creatorName }
							</c:if>
							<c:if test="${empty msg.creatorName && !empty msg.username}">
								${msg.username }
							</c:if>
							<c:if test="${empty msg.creatorName && empty msg.username}">
								${msg.mobile }
							</c:if>
	                      </span>
	                   </td>
	                   <td rowspan="2">
	                       <a href="javascript:;" class="btn btn-sm btn-default btn-returns">返回</a>
	                   </td>
	               </tr>
	               <tr>
	                   <td>
	                       <span class="t-title">通知方式：</span>
	                       <span class="t-content">
	                       		<c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_MOBILE' }">
	                       			短信通知
	                       		</c:if>
	                       		<c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_WEB' }">
	                       			站内信
	                       		</c:if>
	                       		<c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_EMAIL' }">
	                       			邮件通知
	                       		</c:if>
	                       		<c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_MOBILE_WEIXIN' }">
	                       			微信指定通知
	                       		</c:if>
	                       </span>
	                   </td>
	                   <td>
	                       <span class="t-title">通知人数：</span>
	                       <span class="t-content">${msg.sendNum }</span>
	                   </td>
	                   <td>
	                       <span class="t-title">发送时间：</span>
	                       <span class="t-content">
	                       	<fmt:formatDate value="${msg.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/>
	                       </span>
	                   </td>
	               </tr>
            </table>
        </div>
    </div>
</div>
<div class="u-wrap student">
    <div class="mainbackground">
        <div class="heading">
            <h2 class="h5">通知结果</h2>
            <span class="line"></span>
        </div>
        <div class="main-content">
            <div class="notice-result-list">
                <div class="n-result">
                    <div class="m-title">
                        <h2 class="h6">
                        	<span>发送时间：<span class="send-time"><fmt:formatDate value="${msg.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/></span></span> 
                        	<span class="t-name">发送人：
								<c:if test="${!empty msg.creatorName}">
									${msg.creatorName }
								</c:if>
								<c:if test="${empty msg.creatorName && !empty msg.username}">
									${msg.username }
								</c:if>
								<c:if test="${empty msg.creatorName && empty msg.username}">
									${msg.mobile }
								</c:if>
                        	</span>
                        	<span class="t-name">通知状态：
                        		<c:if test="${msg.messageStatus == 'STUDENT_MESSAGE_CREATE' }">
                        			未提交发送
                        		</c:if>
                        		<c:if test="${msg.messageStatus == 'STUDENT_MESSAGE_COMMIT' }">
                        			已提交发送
                        		</c:if>
                        		<c:if test="${msg.messageStatus == 'STUDENT_MESSAGE_FINISH' }">
                        			已执行
                        		</c:if>
                        	</span>
                        </h2>
                    </div>
                    <div class="result-main">
                        <div class="c">
                            <span class="c-title">通知内容：</span>
                            <span class="c-content l-content">
                                <span class="msg-content" style="width:700px;word-break: break-all;">
                                	${msg.content }
                                </span>
                            </span>
                        </div>
                  		<c:if test="${msg.messageMethod != 'STUDENT_MESSAGE_WEB' }">
                        <p class="c">
                            <span class="c-title">成功发送：</span>
                            <span class="c-content">
                                <a href="javascript:;" class="btn btn-link btn-view" data-type="1">
                                ${msg.sendNum - msg.failNum }
								</a>人
                            </span>
                            <c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_MOBILE' }">
								<span class="c-title">消耗短信：</span>
								<span class="c-content">
									${msg.messageCost }条
								</span>
							</c:if>
                            <c:if test="${msg.messageMethod == 'STUDENT_MESSAGE_EMAIL' }">
								<span class="c-title">消耗邮件：</span>
								<span class="c-content">
									${msg.messageCost }条
								</span>
							</c:if>
                        </p>
                        <p class="c">
                            <span class="c-title">发送失败：</span>
                            <span class="c-content">
                                <em class="alert">
                                <a href="javascript:;" class="btn btn-link btn-failure" data-type="0">
                                	${msg.failNum }</a>条</em>
                            </span>
                        </p>
                  		</c:if>
						<div>
							<span class="c-title">订阅统计：</span>
							<button class="btn btn-primary checkOutData">导出名单</button>
							<div class="">
								<table class="table table-center">
									<tr>
										<th width="15%" >序号</th>
										<th width="15%" >手机号</th>
										<th width="15%" >用户名称</th>
										<th width="15%" >报名</th>
										<th width="15%" >同意</th>
										<th width="15%" >反对</th>
									</tr>
									<tr>
										<td>1</td>
										<td>xxxxxxx</td>
										<td>xxxxxxx</td>
										<td>xxxxxxx</td>
										<td>1</td>
										<td>0</td>
									</tr>
									<tr>
										<td>1</td>
										<td>xxxxxxx</td>
										<td>xxxxxxx</td>
										<td>xxxxxxx</td>
										<td>1</td>
										<td>0</td>
									</tr>

								</table>
								<div class="pages ">
									<ul class="pagination">
									</ul>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="add-classes">
    <div class="heading">
        <h2 class="h5">学员列表</h2>
        <span class="line"></span>
        <i class="iconfont close">&#xe610;</i>
    </div>
    <div class="place-list">
        
    </div>
    <div class="pages">
        <ul class="paginations">
	
		</ul>
    </div>
    <div class="btns text-center">
        <p class="text-center" style="margin-left: 130px;">
            <a href="javascript:;" class="btn btn-default btn-cancel">确定</a>
        </p>
    </div>
</div>
<div class="add-classes-bg"></div>

<!-- ajax加载中div开始 -->
	<div class="loading lp-units-loading" style="display:none">
        <p><i></i>加载中,请稍后...</p>
    </div>
    <div class="loading-bg lp-units-loading-bg" style="display:none"></div>
<!--  ajax加载中div结束 -->
<script>
    //    分页
    $(".pagination").pagination($("#rowCount").val(), {
        next_text : "下一页",
        prev_text : "上一页",
        current_page : ($("#pageNo").val() - 1),
        link_to : "javascript:;",
        num_display_entries : 5,
        items_per_page : $("#pageSize").val(),
        num_edge_entries : 1,
        callback : function(page, jq) {
            var pageNo = page + 1;
        }
    });
</script>
</body>
</html>