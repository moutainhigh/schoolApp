
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <%@include file="/decorators/import.jsp" %>
    <title>已上架课程</title>
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/manage.css">
    <link rel="stylesheet"  type="text/css" href="<%=rootPath %>/stylesheets/classes.css">
    <link rel="stylesheet" type="text/css" href="<%=rootPath %>/stylesheets/operate.css" />
    
    <script type="text/javascript" src="<%=rootPath%>/javascripts/plus/jquery.pagination.js"></script>
</head>
<body style="position:relative;">
    <!-- 二级导航 -->
    <jsp:include page="/WEB-INF/jsp/menu/menu_class.jsp"></jsp:include>
    <%--已上架课程分类筛选--%>
    <div class="u-wrap classes">
        <div class="mainbackground nopadding">
        <div class="classes-type">
            <p class="c">
                <span class="t-title">课程分类</span>
                <span class="t-content" id="courseCaId">
                    <a href="javascript:Form.showAllShelvesClssType('all','courseCaId');" data-code="all" class="btn btn-mini btn-default btn-success">全部</a>
                    <c:forEach items="${firstMenus}" var="menu">
                        <a href="javascript:Form.showAllShelvesClssType('${menu.id}','courseCaId');" data-code="${menu.id}" class="btn btn-mini btn-default">${menu.name}</a>
                    </c:forEach>
                </span>
            </p>
            <p class="c">
                <span class="t-title">学段</span>
                <span class="t-content" id="gradeId">
                     <a href="javascript:Form.showAllShelvesClssType('all','gradeId');" data-code="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
            <p class="c">
                <span class="t-title">学科</span>
                <span class="t-content" id="subjectId">
                    <a href="javascript:Form.showAllShelvesClssType('all','subjectId');" data-code="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
            <p class="c">
                <span class="t-title">知识点专题</span>
                <span class="t-content" id="kwonProId">
                    <a href="javascript:Form.showAllShelvesClssType('all','kwonProId');" data-code="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
            <p class="c">
                <span class="t-title">知识点</span>
                <span class="t-content" id="knowId">
                	<a href="javascript:Form.showAllShelvesClssType('all','knowId');" ids="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
            <p class="c">
                <span class="t-title">阶段</span>
                <span class="t-content" id="stageId">
                	<a href="Form.showAllShelvesClssType('all','stageId');" ids="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
            <p class="c">
                <span class="t-title">类型</span>
                <span class="t-content" id="typeId">
                	<a href="javascript:Form.showAllShelvesClssType('all','typeId');" ids="all" class="btn btn-mini btn-default btn-success">全部</a>
                </span>
            </p>
        </div>
    </div>
    </div>
    <div class="u-wrap classes">
        <div class="mainbackground nopadding">
			<div id="ShelvesCourseDetailList">
			
			</div>
        </div>

        <div class="user-list">
            <table class="table table-center" id="tableList">
                <tbody>
                    <tr data-buy="true">
                        <th width="1%"><input type="checkbox" class="checkboxAll"></th>
                        <th width="5%">课程图片</th>
                        <th width="5%">课程名称</th>
                        <th width="10%">学段</th>
                        <th width="5%">学科</th>
                        <th width="10%">知识点专题</th>
                        <th width="10%">知识点</th>
                        <th width="5%">阶段</th>
                        <th width="8%">类型</th>
                        <th width="6%">上架时间</th>
                        <th width="6%">直播时间</th>
                        <th width="3%">学习人数</th>
                        <th width="3%">价格</th>
                        <th width="3%">实际价格</th>
                        <th width="20%">操作</th>
                    </tr>
                    <tr data-buy="false">
                        <td><input type="checkbox" class="signUpMany" uname="sdsdsd" value=""></td>
                        <td><img src="/images/1.jpg" alt="" class="shelvesIcon"></td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>2017-11-14</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>
                            <span><a href="javascript:;" class="btn btn-primary btn-sm">下架</a></span>
                            <span><a href="/appNewClasses/homeRecommendation" class="btn btn-primary btn-sm">推荐</a></span>
                            <span><a href="##" class="btn btn-primary btn-sm eidtShelvesCourses">编辑</a></span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pages pagination"></div>
        </div><input type="hidden" id="rowCount" value="68266"><input type="hidden" id="pageNo" value="1"><input type="hidden" id="maxCount" value="999999999">
    </div>

    <%--弹出框--%>
    <div class="popupContainer">
        <span class="closePopupContainer">x</span>
    </div>
    <div class="popupOpacity"></div>
    <script type="text/javascript" src="<%=rootPath %>/javascripts/app/shelvesCourses.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/javascripts/classes.js"></script>
    <script type="text/javascript" src="<%=rootPath %>/javascripts/common/utils.js"></script>
</body>
</html>
