var nowPage = 0;
var nowOnlinePage = 0;
var pageSize = 7;
var pageOnlineSize = 10;
var recommendNum = null;


$(function () {
    //    左侧active切换
    $selectSubMenus('course');
    //图片移入显示隐藏的按钮和文字
    $('.imgList').find('li').mouseover(function () {
        $(this).children('.imgInfo').show();
        $(this).children('.listBg').show();
    });
    $('.imgList').find('li').mouseleave(function () {
        $(this).children('.imgInfo').hide();
        $(this).children('.listBg').hide();
    });
    //筛选
    $('.chooseBtn').children('a').click(function () {
        if(!$(this).hasClass('btn-primary')){
            $(this).addClass('btn-primary').siblings('a').removeClass('btn-primary');
        }
        nowPage = 0;    //切换标签时，分页重置
        nowOnlinePage = 0;
        if($(this).hasClass('onlineStatus')){
            getOnlineClassTypeList();
        }else{
            getClassTypeList();
        }

    });
   /* //删除弹窗
    $('body').on('click','.deleteBtn',function () {
        $.confirm('是否确定删除该课程?',function (data) {
            if(data){
                console.log('点击了确定');
            }
        })
    });*/
    //tab切换
    $('.courseLine').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            if($(this).index()==0){
                $('.courseUnderLine').show();
                $('.courseOnLine').hide();
                $('.addClassPopup').hide();
                nowPage = 0;
                getClassTypeList();
            }else{
                $('.courseUnderLine').hide();
                $('.courseOnLine').show();
                nowOnlinePage = 0;
                getOnlineClassTypeList();
            }
    });
    //二次确认添加课程
    $('body').on('click','.addConfirm',function () {
        $.confirm('是否确定添加该课程？',function (data) {
            if(data){
                $('.addClassPopup').hide();

            }
        });
    });
    //添加课程弹窗
    $('.addCourse').click(function () {
        if($('#userType').val() != 1){
            $.msg('该用户没有权限');
            return;
        }
        $('.addClassPopup').show();
    });
    $('.closeCoursePopup').click(function () {
        $('.addClassPopup').hide();
        $('#findClassName').val('');
        $('#findClassTbody').html('');
        getOnlineClassTypeList();

    });
    //关联
    $('.relation').click(function () {
            if($(this).html()=='关联'){
                $(this).html("取消关联");
                $(this).siblings('.relationResult').html("已关联");
            }else{
                $(this).html("关联");
                $(this).siblings('.relationResult').html("未关联");
            }
    });
    //获取课程信息
    getClassTypeList()
    //获取线上课程信息
  //  getOnlineClassTypeList();

    //为搜索在线课程按钮添加点击事件
    $('.findClassBtn').click(function(){
        findOnlineClass();
    })
});

//根据名字查询在线课程列表（不支持模糊查询 from 需求）
function findOnlineClass(){
    var name = $('#findClassName').val();
    if(null == name || name == '' || name.replace(/^\s+|\s+$/gm,'') == ''){
        $.msg('请输入正确的课程名')
        return;
    }

    $.ajax({
        url: rootPath+'/institutionClassType/queryClassByName',
        data: {
            insId:$('#insId').val(),
            name:$('#findClassName').val()
        },
        type: 'post',
        beforeSend: function () {
            $(".loading").show();
            $(".loading-bg").show();
        },
        complete:function(){
            $(".loading").hide();
            $(".loading-bg").hide();
        },
        success: function (json) {

            var list = json.list;
            var html = "";
            for(var i in list){
                html += `
                   <tr>
                        <td>${parseInt(i) + 1}</td>
                        <td>${list[i].name}</td>
                        <td>${list[i].subject == null ? '' : list[i].subject}</td>
                        <td>${list[i].school}</td>
                        <td><a href="javascript:addOnlineClass(${list[i].cid})" data-id="${list[i].cid}" class="btn btn-primary btn-xs addConfirm addConfirm2">添加</a></td>
                    </tr>
                `;
            }

            if(list.length == 0){
                html = "<tr><td colspan='5'>暂无数据</td></tr>";
            }

            $('#findClassTbody').html(html);



        }
    });
}

function addOnlineClass(cid){
    var insId = $('#insId').val();
    console.log(cid + insId);
    $.confirm('是否确定添加该课程?',function(status){
        if(status) {
            $.post(rootPath + '/institutionClassType/addOnlineClass', {
                cid: cid,
                insId: insId
            }, function (json) {
                if(json == 'success'){
                    $('.addClassPopup').hide();
                    $('#findClassName').val('');
                    $('#findClassTbody').html('');
                    getOnlineClassTypeList();
                }
                $.msg(json == 'success' ? '操作成功' : json);

            })
        }
    })
}


function getOnlineClassTypeList(){

    $.ajax({
        url: rootPath+'/institutionClassType/getOnlineClassTypeList',
        data: {
            insId:$('#insId').val(),
            link:getUpDownStatus('chooseBtn2'),
            pageStart:nowOnlinePage,
            pageSize:pageOnlineSize
        },
        type: 'post',
        beforeSend: function () {
            $(".loading").show();
            $(".loading-bg").show();
        },
        complete:function(){
            $(".loading").hide();
            $(".loading-bg").hide();
        },
        success: function (json) {
            var list = json.data;
            var html = `
                        <tr data-buy="true">
                            <th width="3%">序号</th>
                            <th width="12%">课程名称</th>
                            <th width="5%">关联状态</th>
                            <th width="5%">排序</th>
                            <th width="5%">操作</th>
                        </tr>
            `;
            for(var i in list){
                html += `
                    <tr>
                        <td>${parseInt(i)+1}</td>
                        <td>${list[i].name}</td>
                        <td class="relationResult">${list[i].isLink == 1 ? '已关联' : '未关联'}</td>
                        <td>${
                            list[i].isLink == 1 ? list[i].sort+
                                (list[i].sort != 1 ? "<i data-id='"+list[i].rid+"' data-status='up' class='icon iconfont'>&#xe6e3;</i>" :'' )+
                                (list[i].sort != json.onlineNum ? "<i data-id='"+list[i].rid+"' data-status='down' class='icon iconfont'>&#xe6e4;</i>" : '')
                                : '-'
                            }</td>
                        <td class="relation" data-id="${list[i].rid}" >${list[i].isLink == 1 ? '取消关联' : '关联'}</td>
                    </tr>
                `;
            }

            if(list.length == undefined || list.length == 0){
                html += "<tr><td colspan='5'>暂无数据</td></tr>";
            }

            //解决分页插件不自动隐藏问题
            if(json.rowCount <= pageOnlineSize){
                $(".paginationOnLine").html('');
            }else{
                $(".paginationOnLine").pagination(json.rowCount,
                    {
                        next_text: "下一页",
                        prev_text: "上一页",
                        current_page:json.pageNo,
                        link_to: "javascript:getOnlineClassTypeList()",
                        num_display_entries: pageOnlineSize,
                        items_per_page: pageOnlineSize,
                        num_edge_entries: 1,
                        callback: function (page) {
                            nowOnlinePage = page;
                            getOnlineClassTypeList();
                        }
                    }
                );
            }




            $('#onlineTbody').html(html);


        $('.iconfont').click(function(){
             //upDownOnlineClass($(this).attr('data-id'),$(this).attr('data-status'));

            $.post(rootPath+'/institutionClassType/updateSortOnlineClass',{
                insId:$('#insId').val(),
                rid:$(this).attr('data-id'),
                method:$(this).attr('data-status') == 'up' ? 'add' : 'sub'
            },function(json){
                if(json == 'success'){
                    $.msg('操作成功');
                    getOnlineClassTypeList();
                }else{
                    $.msg('操作失败!')
                }
            })

        })

        $('.relation').click(function(){
           // linkClass($(this).attr('data-id'),$(this).html());
            var len = $("#onlineTbody").find('tr').length;
            if(len <= 2 && getUpDownStatus('chooseBtn2') != 0){
                nowOnlinePage = nowOnlinePage - pageOnlineSize <= 0 ? 0 : nowOnlinePage - pageOnlineSize ;
            }
            $.post(rootPath+'/institutionClassType/linkOnlineClass',{
                insId:$('#insId').val(),
                rid:$(this).attr('data-id')
            },function(json){
                if(json == 'success'){
                    $.msg('操作成功');
                    getOnlineClassTypeList();
                }else{
                    $.msg('操作失败!')
                }
            })

        });

        }
    });
}

/*

function upDownOnlineClass(id,method){
    console.log(id + method);
}

function linkClass(id,method){
    console.log(id + method);
}
*/


function getClassTypeList(){
    if(recommendNum == null){
        getRecommendCount2();
        return;
    }
    $.ajax({
        url: rootPath+'/institutionClassType/getClassTypeList',
        data: {
            insId:$('#insId').val(),
            status:getUpDownStatus('chooseBtn1'),
            pageStart:nowPage,
            pageSize:pageSize
        },
        type: 'post',
        beforeSend: function () {
            $(".loading").show();
            $(".loading-bg").show();
        },
        complete:function(){
            $(".loading").hide();
            $(".loading-bg").hide();
        },
        success: function (json) {
           var isrecommendCount = json.isrecommendCount;
           var list = json.page.data;
           var html = `<li class="addImg mienShow" id="">
                            <i class="icon iconfont"></i>
                       </li>`;
           // <img src="${list[i].coverUrl == null || list[i].coverUrl == '' ? '' :  list[i].fullCoverUrl}" alt="" style="width: 100%;max-height:190px;">
           for(var i in list){
               html += `<li>
                            ${list[i].coverUrl == null || list[i].coverUrl == '' ? '' : "<img src='"+list[i].fullCoverUrl+"' alt='' style=\"width: 100%;max-height:190px\";>" }

                                <span class="imgInfo">${list[i].name}</span>
                                ${
                                    list[i].isRecommend == 1 ? 
                                        "<a href='javascript:void(0)' data-id="+list[i].id+" class='btn btn-primary btn-sm rightShow'>取消推荐</a>" :
                                        ( isrecommendCount < 2 && list[i].isRecommend == 0 && list[i].isShelves == 1  ? 
                                            "<a href='javascript:void(0)' data-id="+list[i].id+" class='btn btn-primary btn-sm rightShow'>推荐</a>" : 
                                            '')
                                            
                                } 
                                <div class="listBg">
                                <a href="javascript:void(0)" data-id="${list[i].id}" class="btn btn-warning btn-sm deleteBtn">删除</a>
                                <a href="javascript:void(0)" data-id="${list[i].id}" class="btn btn-success btn-sm ">${list[i].isShelves == 1 ? '下架' : '上架'}</a>
                                <a href="javascript:void(0)" data-id="${list[i].id}" class="btn btn-success btn-sm infoBtn " >管理</a>
                                </div>
                        </li>`;
           }


           //当总条数少于每页分页条数的时候，不显示分页 -- 处理分页插件显示问题
            if(json.page.rowCount <= 7){
               $('.paginationUnderLine').html('');
            }else{

                $(".paginationUnderLine").pagination(json.page.rowCount,
                    {
                        next_text: "下一页",
                        prev_text: "上一页",
                        current_page:json.page.pageNo,
                        link_to: "javascript:getClassTypeList()",
                        // num_display_entries: 7,
                        items_per_page: 7,
                        num_edge_entries: 0,
                        callback: function (page) {
                            nowPage = page;
                            getClassTypeList();
                        }
                    }
                );
            }








        $('#courseContainer').html(html);

            $('.imgList').find('li').mouseover(function () {
                $(this).children('.imgInfo').show();
                $(this).children('.listBg').show();
            });
            $('.imgList').find('li').mouseleave(function () {
                $(this).children('.imgInfo').hide();
                $(this).children('.listBg').hide();
            });

            //添加监听器
            $("li a").click(function(){
                controlClass(this);
            });

            $('.addImg').click(function(){
                window.location.href = rootPath + "/InsInfoBase/newLineCourse/"+$("#insId").val()+"/0"
            });

            $('.infoBtn').click(function(){
                window.location.href = rootPath + "/InsInfoBase/newLineCourse/"+$("#insId").val()+"/"+$(this).attr('data-id');
            })
        }
    });
}


function controlClass(dom){
   var id = $(dom).attr('data-id');
   var action = $(dom).html() ;
    if(action == '下架' || action == '上架' ) {
       /*
        提示框暂时不用
       $.confirm("是否要" + action + "该课程?", function (s) {
            if (s) {

            }
        })*/

        $.post(rootPath + '/institutionClassType/upDownClass', {cid: id}, function (json) {
            $.msg(json == 'success' ? '操作成功' : '操作失败');
            if (json == 'success') {
                getRecommendCount2();
                var len = $("#courseContainer").find('li').length;
                console.log('重置分页参数前,nowTypePageStart = '+ nowPage  );
                if(len <= 2 && getUpDownStatus('chooseBtn1') != 0){
                    //如果当前页只有1个课程，则执行前一页操作
                    nowPage = nowPage - 1 <= 0 ? 0 : nowPage - 1;
                }

                getClassTypeList();
            }
        })

    } else if(action == '取消推荐' || action == '推荐'){

        $.post(rootPath+"/institutionClassType/recommend",{insId:$('#insId').val() , cid:id },function(json){
            if (json == 'success') {
                $.msg('操作成功');
                getRecommendCount2();
               // getClassTypeList();
            }else{
                $.msg(json);
            }
        })


    } else if(action == '删除'){
        $.confirm('是否确定删除该课程?',function (data) {
            if(data){
                $.post(rootPath + '/institutionClassType/delClass', {cid: id,insId:$('#insId').val()}, function (json) {
                    $.msg(json == 'success' ? '操作成功' : '操作失败');
                    if (json == 'success') {
                      //  window.location.reload();
                        var len = $("#courseContainer").find('li').length;
                        console.log('重置分页参数前,nowTypePageStart = '+ nowPage);
                        if(len <= 2){
                            //如果当前页只有1个课程，则执行前一页操作
                            nowPage = nowPage - 1 <= 0 ? 0 : nowPage - 1;
                        }
                        getClassTypeList();
                    }
                })
            }
        })
    }

}

function getRecommendCount2(){
    $.post(rootPath+"/institutionClassType/recommendCount",{insId:$('#insId').val()},function(json){
        if(json.status == 1){
            recommendNum = json.num;
            getClassTypeList();
        }

    })
}


function getRecommendCount(){
    $.post(rootPath+"/institutionClassType/recommendCount",{insId:$('#insId').val()},function(json){
       // json =  JSON.parse(json);
        if(json.status == 1){
            recommendNum = json.num;
        }
    })
}



function getUpDownStatus(id){
    var arr = $("#"+id).find("a");
    for(var i in arr){
       if($(arr[i]).hasClass('btn-primary')){
           return i;
       }
    }
}

