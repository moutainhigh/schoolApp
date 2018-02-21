<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/decorators/import.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>基本信息</title>
    <link rel="stylesheet" href="<%=rootPath %>/stylesheets/splitscreen.css">
    <link rel="stylesheet" href="<%=rootPath %>/stylesheets/fonts/iconfont.css">
    <link rel="stylesheet" href="<%=rootPath %>/stylesheets/riseschool/schoolDetails.css">
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/stylesheets/riseschool/essential.css">

</head>
<body>
<jsp:include page="/WEB-INF/jsp/menu/menu_earlyLitre.jsp"/>
<div class="u-wrap admin overflow schoolDetails">
    <jsp:include page="/WEB-INF/jsp/menu/menu_earlyLitreLeft.jsp"></jsp:include>
    <input type="hidden" id="schoolId" value="${schoolId}">
    <div class="right-side">
        <div class="mainbackground nopadding">
            <div class="heading">
                <h2 class="h5">基本信息</h2>
                <span class="line"></span>
            </div>
            <div class="schoolDetailsContent essentialInfo">
                <div class="essentialInfoContent">
                    <div>
                        <label for="" class="noMargin">学校名称：</label>
                        <span id="schoolName">${result.schoolName}</span>
                    </div>
                    <div>
                        <label for="" class="noMargin">招生方式：</label>
                        <span id="enRollMent" value="${result.enrollmentType}">${result.enrollmentName}</span>
                    </div>
                    <div class="schoolSite">
                        <label for="" class="noMargin">学校地址：</label>
                        <select name="" id="province" onclick="queryRiseSchoolDict(1)">
                            <option value="">请选择省份</option>
                            <option value="${result.provinceCode}" selected>${result.provinceName}</option>
                        </select>
                        <select name="" id="city" onclick="queryRiseSchoolDict(2)">
                            <option value="">请选择城市</option>
                            <option value="${result.cityCode}" selected>${result.cityName}</option>
                        </select>
                        <select name="" id="area">
                            <option value="">请选择区域</option>
                            <c:forEach var="district" items="${areaList}">
                                <c:choose>
                                    <c:when test="${result.district == district.itemCode}">
                                        <option value="${district.itemCode}" selected>${district.itemName}</option>
                                    </c:when>
                                    <c:otherwise>
                                        <option value="${district.itemCode}" >${district.itemName}</option>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                        </select>
                        <br/><input type="text" id="schoolAddress" placeholder="请输入详细地址" maxlength="60" value="${result.detailAddress}">
                    </div>
                    <div>
                        <label for="">学校网址：</label>
                        <input type="text" id="schoolWeb" onblur="judgeSchoolWeb()" placeholder="示例:http://www.cdds365.com或https://www.baidu.com" value="${result.schoolWeb}">
                    </div>
                    <div>
                        <label for="">学校传真：</label>
                        <input type="text" id="schoolFax" value="${result.schoolFax}">
                    </div>
                    <div>
                        <label for="">公交路线：</label>
                        <%--<input type="text" id="busRoad" maxlength="200" value="${result.busRoad}" title="${result.busRoad}">--%>
                        <textarea id="busRoad" maxlength="200" style="width: 492px" >${result.busRoad}</textarea>
                    </div>
                    <div>
                        <label for="">收藏基数：</label>
                        <input type="number" id="collectBaseCount" maxlength="5" max="10000" placeholder="请输入0-10000" value="${result.baseNum}">
                    </div>
                    <div class="countPopupBtn">
                        <a href="##" class="btn btn-sm btn-primary countPopupCancel">取消</a>
                        <a href="javaScript:updateRiseSchoolInfo();" class="btn btn-sm btn-primary countPopupSave">保存</a>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>
<!-- ajax加载中div开始 -->
<div class="loading lp-units-loading" style="display: none">
    <p>
        <i></i>加载中,请稍后...
    </p>
</div>
<div class="loading-bg lp-units-loading-bg" style="display: none"></div>

<script src="<%=rootPath %>/javascripts/riseschool/schoolDetails.js"></script>
<script>
//    左侧active切换
    $selectSubMenus('essential');
</script>
<script>
    $('.countPopupCancel').click(function () {
        history.go(-1);
    });
</script>
</body>
</html>
