<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!doctype html>
<html lang="zh-cn">
<head>
 <%@include file="/decorators/import.jsp" %>
    <title>学校管理</title>
	<link rel="stylesheet" type="text/css" href="<%=rootPath%>/stylesheets/fatstyle.css">
	<link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/manage.css"/>
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/system.css"/>
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" />
	<link rel="stylesheet" type="text/css" href="<%=rootPath%>/stylesheets/popupwin.css">
	<link rel="stylesheet" href="<%=rootPath %>/stylesheets/fonts/iconfont.css">
	<link rel="stylesheet" type="text/css" href="<%=rootPath%>/stylesheets/riseschool/earlyLitre.css">


    <style type="text/css">
		.tips{
			color:red;
		}
    </style>
</head>

<body>
<input type="hidden" value="${isDelete }" id="isDelete"/>
<input type="hidden" value="${registConfig.mobileFlag }" id="mobileSet"/>
<input type="hidden" value="${registConfig.usernameFlag }" id="userNameSet"/>
<input type="hidden" value="${address }" id="addreSet"/>
<input type="hidden" value="${proxyOrgRole }" id="proxyOrgRole"/>
<input type="hidden" value="${userorg_roleopenflag }" id="userorg_roleopenflag"/>
<jsp:include page="/WEB-INF/jsp/menu/menu_earlyLitre.jsp"/>
<div class="u-wrap set-system">
    <div class="mainbackground nopadding">
        <div class="heading"> 
            <h2 class="h5">学校管理</h2>
            <span class="line"></span>
        </div>
        <form method="post" id="searchForm">
			<div class="searchFormArea">
				<div class="enrolment">
					<label for="">招生类型</label>
					<a href="##" class="btn btn-primary btn-sm">全部</a>
					<a href="##" class="btn btn-default btn-sm">自主招生</a>
					<a href="##" class="btn btn-default btn-sm">按片划分</a>
				</div>
				<div class="topState">
					<label for="">置顶状态</label>
					<a href="##" class="btn btn-primary btn-sm">全部</a>
					<a href="##" class="btn btn-default btn-sm">已置顶</a>
				</div>
				<%--<input type="text" id="stuMobile" name="mobile" placeholder="手机号" maxlength="11"/>--%>
				<%--<input type="text" id="stuusername" name="username" placeholder="用户名"/>--%>
				<%--<input type="text" id="stuName" name="name" placeholder="姓名"/>--%>
				<%--<input type="hidden" id="sfzh" name="identityId" placeholder="证件号码"/>--%>
				<div>
					<label for="">所属省份</label>
					<select name="eduArea" id="eduArea">
						<option value="">请选择省份</option>
						<c:forEach items="${areas}" var="area" >
							<option value="${area.itemCode}" data-id="${area.id}" ${student.eduArea==area.itemValue?"selected":""}>${area.itemValue}</option>
						</c:forEach>
					</select>
					<select name="eduSchool" id="eduSchool" data-id="${student.eduSchool}">
						<option value="">请选择市</option>
					</select>
					<select id="registStatus" name="status">
						<option value="">请选择区</option>
					</select>
					<select id="registMethods" name="registType">
						<option value="">请选择上下架状态</option>
					</select>
				</div>



			</div>
			<div style="margin-top: 10px;">
				<label>创建时间</label>
				<span><input type="text" name="startTime" class="date-picker from"/><em>到</em><input type="text" name="endTime" class="date-picker to"/></span>
				<%--<c:if test="${address==1}">--%>
				<%--<span style="padding:0 15px;" id="caddress">--%>
					<%--<select id="prov" name="province"></select> --%>
					<%--<select id="city" name="city"></select>--%>
					<%--<select id="dist" name="county"></select>--%>
				<%--</span>--%>
				<%--</c:if>--%>
				<%--<c:if test="${userorg_roleopenflag==1 }">--%>
				<%--<shiro:hasAnyRoles name="机构管理员,代理机构">--%>
				<input type="text" placeholder='请输入学校名称'/>
				<%--</shiro:hasAnyRoles>--%>
				<%--</c:if>--%>
				<span><a href="javascript:;" class="btn btn-primary searchContents">搜索</a></span>
			</div>
			<div style="margin-top: 10px;text-align:right;padding:0 10px;">
				<span><a href="javascript:;" class="btn btn-primary addSchool">添加学校</a></span>
			</div>
        </form>
        <div class="user-list">
          	<table class="table table-center" id="tableList">
				<tr data-buy="true">
					<th width="5%">序号</th>
					<th width="16%">学校名称</th>
					<th width="8%">招生类型</th>
					<th width="8%">省份</th>
					<th width="8%">市</th>
					<th width="8%">区</th>
					<th width="8%">创建时间</th>
					<th width="10%">上下架状态</th>
					<th width="8%">置顶状态</th>
					<th width="20">操作</th>
				</tr>
				<tr data-buy="true">
					<td>1</td>
					<td>成都市三原外国语学校</td>
					<td>自主招生</td>
					<td>四川</td>
					<td>成都</td>
					<td>高新</td>
					<td>2018-2-1</td>
					<td class="offShelfState">已上架</td>
					<td>未置顶</td>
					<td class="slink">
						<a class="offShelf"  href="##">下架</a>|
						<a class="top"  href="##">置顶</a>|
						<a class="countManagement"   href="##">账号管理</a>|
						<a class="more" href="#3">管理</a>
						<ul class="none box" style="display: none;">
							<li><a class=""  href="##">基本信息</a></li>
							<li><a class=""   href="##">学校详情</a></li>
							<li><a class=""  href="##">学校风采</a></li>
							<li><a href="##">升学</a></li>
						</ul>
					</td>
				</tr>

				<c:choose>
					<c:when test="${userorg_roleopenflag==1 && proxyOrgRole ==1 }">
						<tr><td colspan="15">暂无数据</td></tr>
					</c:when>
					<c:otherwise>
						<tr><td colspan="14">暂无数据</td></tr>
					</c:otherwise>
				</c:choose>
				
				
		</table>
			<div class="pages pagination">

			</div>
        </div>
    </div>
</div>
<!-- ajax加载中div开始 -->
<div class="loading lp-units-loading" style="display:none">
	<p><i></i>加载中,请稍后...</p>
</div>
<div class="loading-bg lp-units-loading-bg" style="display:none"></div>
<!--  ajax加载中div结束 -->

<%--账号管理弹窗--%>
<div class="opacityPopup"></div>
<div class="countPopup">
	<h5>账号管理</h5>
	<div>
		<label for="">账号：</label>
		<span>sssssssss</span>
	</div>
	<div>
		<label for="">密码：</label>
		<input type="password">
	</div>
	<div class="countPopupBtn">
		<a href="##" class="btn btn-sm btn-primary countPopupCancel">取消</a>
		<a href="##" class="btn btn-sm btn-primary countPopupSave">保存</a>
	</div>
</div>

<%--添加学校弹窗--%>
<div class="addNewSchool">
	<h5>添加学校</h5>
	<div>
		<i class="icon iconfont star">&#xe605;</i>
		<label for="" class="noMargin">学校名称：</label>
		<input type="text"  maxlength="60">
	</div>
	<div class="schoolCount">
		<i class="icon iconfont star">&#xe605;</i>
		<label for="" class="noMargin">学校账号：</label>
		<input type="text" placeholder="请输入学校管理员账号">
		<span>初始密码为：111111</span>
	</div>
	<div>
		<i class="icon iconfont star">&#xe605;</i>
		<label for="" class="noMargin">招生方式：</label>
		<select name="" id="">
			<option value="">请选择招生方式</option>
		</select>
	</div>
	<div class="schoolSite">
		<i class="icon iconfont star">&#xe605;</i>
		<label for="" class="noMargin">学校地址：</label>
		<select name="" id="">
			<option value="">学校所在省份</option>
		</select>
		<select name="" id="">
			<option value="">学校所在市</option>
		</select>
		<select name="" id="">
			<option value="">学校所在区</option>
		</select>
		<input type="text" placeholder="请输入详细地址" maxlength="60">
	</div>
	<div>
		<label for="">学校网址：</label>
		<input type="text">
	</div>
	<div>
		<label for="">学校传真：</label>
		<input type="text">
	</div>
	<div>
		<label for="">公交路线：</label>
		<input type="text" maxlength="200">
	</div>
	<div>
		<label for="">收藏基数：</label>
		<input type="text" maxlength="4" placeholder="请输入0-1000">
	</div>
	<div class="countPopupBtn">
		<a href="##" class="btn btn-sm btn-primary countPopupCancel">取消</a>
		<a href="##" class="btn btn-sm btn-primary countPopupSave">保存</a>
	</div>
</div>


<input type="hidden" id="selectCounts" value="10">
<script type="text/javascript" src="<%=rootPath %>/javascripts/riseschool/studentlist.js"></script>
<script type="text/javascript" src="<%=rootPath %>/javascripts/ajaxfileupload.js"></script>
<script type="text/javascript" src="<%=rootPath%>/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="<%=rootPath%>/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=rootPath%>/javascripts/plus/jquery.pagination.js"></script>
<script type="text/javascript" src="<%=rootPath %>/plugins/jquery-validation/jquery.validate.js"></script>
<script type="text/javascript" src="<%=rootPath%>/javascripts/common/DateUtils"></script>
<script type="text/javascript" src="<%=rootPath %>/javascripts/common/utils.js"></script>
<script type="text/javascript" src="<%=rootPath%>/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="<%=rootPath%>/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=rootPath%>/javascripts/popupwin.js"></script>
<script type="text/javascript" src="<%=rootPath %>/javascripts/company/jquery.cityselect.js"></script>
<script type="text/javascript" src="<%=rootPath%>/javascripts/selectStudentGroup.js"></script>
<script type="text/javascript" src="<%=rootPath%>/javascripts/riseschool/earlyLitre.js"></script>

<script>
	//分页
    $(".pagination").pagination('',
        {
            next_text: "下一页",
            prev_text: "上一页",
            current_page: '',
            link_to: "javascript:void(0)",
            num_display_entries: 8,
            items_per_page: 1,
            num_edge_entries: '',
            callback: function (page, jq) {
                var pageNo = page + 1;

            }
        }
    );

</script>
</body>
</html>