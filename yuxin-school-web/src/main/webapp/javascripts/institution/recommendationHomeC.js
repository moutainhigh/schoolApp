var zTree; //用于保存创建的树节点

$(function () {



    getTreeData();


    $('.commit').click(function(){
        var nodeArr = new Array();
        var nodes = zTree.getNodes() ;
        for(var i in nodes){
            nodeArr.push({id:nodes[i].id , checked:nodes[i].checked == true ? 1 : 0})
            if(nodes[i].children != undefined){
                var childList = nodes[i].children;
                for(var j in childList){
                    nodeArr.push({id:childList[j].id , checked:childList[j].checked == true ? 1 : 0})
                }
            }
        }



        $.ajax({
            url: rootPath+'/institutionRecommend/updateTree',
            data: {
                tree:JSON.stringify(nodeArr)
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
                if(json.status == 1){
                    $.msg("操作成功");
                    getTreeData();
                }
            }
        });


    })



});


function getTreeData(){

    $.ajax({
        url: rootPath+'/institutionRecommend/typeListAll',
        data: {

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
            console.log(json);

            var oneArr = new Array();
            for(var i in json){
                if(json[i].codeLevel == 1){
                    oneArr.push({name:json[i].codeName,children:new Array() , checked:json[i].thirdRecommend == 1 , id:json[i].id  });
                }else{
                    findAndAddChildren(oneArr,json[i]);
                }
            }

            createTree(oneArr, "#ztree"); //创建

           /* $("#myButton").click(function() {
                var treeObj = $.fn.zTree.getZTreeObj("ztree");
                var nodes = treeObj.getCheckedNodes(true);
                if(0 === nodes.length) {
                    alert("请选择!");
                    return;
                }
                var dataNodes = "";
                for(var i = 0; i < nodes.length; i++) {
                    dataNodes += nodes[i].name + ",";
                }
                alert(dataNodes); //获取选中节点的值
            });
*/

        }
    });

}

//前端组装tree
function findAndAddChildren(oneArr , child){
    for(var i = 0 ;i<oneArr.length;i++){
        if(oneArr[i].id == child.parentId){
            oneArr[i].children.push({name:child.codeName,id:child.id , checked : child.thirdRecommend == 1})
        }
    }
}


function createTree(url, treeId) {

    var setting = { //设置
        check: {
            enable: true
        },
        view: {
            showLine: true, //显示辅助线
            dblClickExpand: true,
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: 0
            }
        }
    };

    zTree = $.fn.zTree.init($(treeId), setting, url); //创建树

}