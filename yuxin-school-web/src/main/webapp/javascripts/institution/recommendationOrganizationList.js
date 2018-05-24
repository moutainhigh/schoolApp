/* 该js用于首页列表推荐使用 */
var nowIndexPage = 0;
var pageSize = 10;
function getIndexRecommendList(){

    $.ajax({
        url: rootPath+'/institutionRecommend/getRecommendList',
        data: {
             typeId:getCurrentTypeId(),
             page:nowIndexPage,
             pageSize:pageSize,
             status:getStatus(),
             name:$('#recommendName').val()
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
          //  console.log(json);
            if(json.status != 1){
                $.msg(json.msg);
                return;
            }
            var list = json.data.list;
            var html = "";

            //判断是否还有下一页，用于判断最后一个推荐机构上下箭头有几个的问题
            var nowPage = parseInt(nowIndexPage/pageSize) + 1;
            var pageNum = json.data.count <= 10 ? 1 : parseInt(json.data.count / pageSize) + 1;
            var hasNextPage = pageNum > nowPage ;

            for(var i in list){
                html += `
                    <tr>
                        <td>${parseInt(i)+1}</td>
                        <td>${list[i].name}</td>
                        <td>${list[i].lv == 2 ? list[i].name2 : list[i].name1}</td>
                        <td>${list[i].lv == 2 ? '二级' : '一级'}</td>
                        <td class="relationResult">${list[i].is_recommend == 1 ? '已推荐' : '未推荐'}</td>
                        <td>${
                list[i].is_recommend == 1 ? ( (json.data.page*json.data.pageSize + parseInt(i) + 1)
                    + ( (json.data.page == 0 && parseInt(i) == 0 ) ? '' : "<i data-id='"+list[i].rid+"' data-status='up' class='icon iconfont'>&#xe6e3;</i>" )
                    + ((json.data.page*json.data.pageSize + parseInt(i) + 1 >= json.data.recommendNum) ? '' : "<i data-id='"+list[i].rid+"' data-status='down' class='icon iconfont'>&#xe6e4;</i>" ))
                    : '-'
                    }</td>
                        <td class="recomendBtn" data-id="${list[i].rid}" data-insId="${list[i].id}" >${list[i].is_recommend == 1 ? '取消推荐' : '推荐'}</td>
                    </tr>
                `;
            }


            if(list.length == 0){
                html = "<tr><td colspan='7'>没有数据</td></tr>";
            }


            $("#indexRecommendTbody").html(html);

            $(".paginationIndexRecommend").pagination(json.data.count,
                {
                    next_text: "下一页",
                    prev_text: "上一页",
                    current_page:json.data.page,
                    link_to: "javascript:getIndexRecommendList()",
                    num_display_entries: 8,
                    items_per_page: 10,
                    num_edge_entries: 1,
                    callback: function (page) {
                        nowIndexPage = page;
                        getIndexRecommendList();
                    }
                }
            );



         //   $('#onlineTbody').html(html);

            //调整排序
            $('.iconfont').click(function(){
                //upDownOnlineClass($(this).attr('data-id'),$(this).attr('data-status'));

                $.post(rootPath+'/institutionRecommend/sort',{

                    rid:$(this).attr('data-id'),
                    method:$(this).attr('data-status') == 'up' ? 'add' : 'sub',
                    typeId:getCurrentTypeId()
                },function(json){
                    if(json == 'success'){
                        $.msg('操作成功');
                        getIndexRecommendList();
                    }else{
                        $.msg('操作失败!')
                    }
                })

            })

            //取消推荐
            $('.recomendBtn').click(function(){
                // linkClass($(this).attr('data-id'),$(this).html());

                $.post(rootPath+'/institutionRecommend/updateIndexRecommendStatus',{
                    insId:$(this).attr('data-insId'),
                    rid:$(this).attr('data-id'),
                    typeId:getCurrentTypeId()
                },function(json){
                    if(json == 'success'){
                        $.msg('操作成功');
                        getIndexRecommendList();
                    }else{
                        $.msg('操作失败!')
                    }
                })

            });

        }
    });

}


function getCurrentTypeId(){
    var alist = $('#recommendBtnContainor').find('.recommendTypeBtn');
    // console.log(alist);
    for(var i = 0;i<alist.length;i++){
        if($(alist[i]).parent().hasClass('btn-primary')){
            return $(alist[i]).parent().attr('data-id');
        }
    }
    return 1;
}

function getStatus(){
    var alist = $('#recommendStatusContainor').find('.btn-default');
    for(var i = 0;i<alist.length;i++){
        if($(alist[i]).hasClass('btn-primary')){
           if($(alist[i]).html() == '全部'){
               return "";
           }else if($(alist[i]).html() == '已推荐'){
               return 1;
           }else{
               return 0;
           }
        }
    }
}


/**
 * 获取推荐分类，用于筛选推荐机构
 */
function getRecommendTypeData(id){
    $.post(rootPath + '/institutionRecommend/typeIndexListAll' , {type:1} , function(json){


    var arr = new Array();
    for(var i in json){
        if(json[i].thirdRecommend == 1){
            arr.push(json[i]);
        }
    }

    json = arr;

    var html = '<span>推荐分类</span>';
        if(!id){
            for(var i in json){
                html += parseInt(i) == 0 ? "<a href=\"javascript:void(0)\" data-id='"+json[i].id+"'  class=\"btn  btn-default btn-primary btn-sm\">" :  "<a href=\"##\" data-id='"+json[i].id+"' class=\"btn  btn-default  btn-sm\">";
                html += parseInt(i) == 0 ?'':"<span class='pullLeft' data-id='"+json[i].id+"'>&lt;</span>";
                html += "<span data-id='"+json[i].id+"' class='recommendTypeBtn'>"+json[i].codeName+"</span>";
                html += parseInt(i) == json.length - 1 ? '' : "<span class='pullRight' data-id='"+json[i].id+"'>&gt;</span>";
                html += '</a>';

            }
        }else{

            for(var i in json){
                html += json[i].id == id ? "<a href=\"javascript:void(0)\" data-id='"+json[i].id+"'  class=\"btn  btn-default btn-primary btn-sm\">" :  "<a href=\"##\" data-id='"+json[i].id+"' class=\"btn  btn-default  btn-sm\">";
                html += parseInt(i) == 0 ?'':"<span class='pullLeft' data-id='"+json[i].id+"'>&lt;</span>";
                html += "<span data-id='"+json[i].id+"' class='recommendTypeBtn'>"+json[i].codeName+"</span>";
                html += parseInt(i) == json.length - 1 ? '' : "<span class='pullRight' data-id='"+json[i].id+"'>&gt;</span>";
                html += '</a>';

            }

        }

        html += " <span>\n" + "<a href=\"/InsInfoBase/recommendationHomeC/1\" style=\"color: red;\">管理</a>\n" + "</span>";

       $('#recommendBtnContainor').html(html);


       $('.recommendTypeBtn').click(function() {

           //取消其他标签的class属性
           var alist = $('#recommendBtnContainor').find('.recommendTypeBtn');
          // console.log(alist);
           //$("#test1").parent()
            for(var i = 0;i<alist.length;i++){
                if($(alist[i]).parent().hasClass('btn-primary')){
                    $(alist[i]).parent().removeClass('btn-primary');
                }
            }


           //给当前a标签添加class
           $(this).parent().addClass('btn-primary');

           getIndexRecommendList();
       })


    })
}


$(function () {
    //点击箭头
    $('body').on('click', '.pullLeft', function () {
        //alert("点击了左边");
        var id = getCurrentTypeId();
        $.post(rootPath+'/institutionRecommend/changeSort',{
            third:1,
            method:'up',
            id:$(this).attr('data-id')
        },function(json){
           if(json.status == 1){
               $.msg('操作成功');
               getRecommendTypeData(id);
           }else{
               $.msg('操作失败');
           }
        })

    });
    $('body').on('click', '.pullRight', function () {
        var id = getCurrentTypeId();
        $.post(rootPath+'/institutionRecommend/changeSort',{
            third:1,
            method:'down',
            id:$(this).attr('data-id')
        },function(json){
            if(json.status == 1){
                $.msg('操作成功');
                getRecommendTypeData(id);

            }else{
                $.msg('操作失败');
            }
        })
    });
});





