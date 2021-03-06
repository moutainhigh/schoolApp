package com.yuxin.wx.controller.classes.appNewClasses;


import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import com.yuxin.wx.api.app.ISysDictAppService;
import com.yuxin.wx.api.classes.IClassTypeService;
import com.yuxin.wx.api.commodity.ICommodityService;
import com.yuxin.wx.api.system.ISysConfigItemRelationService;
import com.yuxin.wx.api.system.ISysConfigItemService;
import com.yuxin.wx.model.app.SysDictApp;
import com.yuxin.wx.model.system.SysConfigItem;
import com.yuxin.wx.model.system.SysConfigItemRelation;
import com.yuxin.wx.utils.FileUtil;
import com.yuxin.wx.utils.PropertiesUtil;
import com.yuxin.wx.utils.WebUtils;
import com.yuxin.wx.vo.classes.ClassTypeVo;
import com.yuxin.wx.vo.classes.FirstRecommend;


/**
 * 已上架课程
 */
@Controller
@RequestMapping("/appNewClasses")
public class shelvesCourses {
    @Autowired
    private ISysDictAppService sysDictAppServiceImpl;

    @Autowired
    private ICommodityService iCommodityService;
    @Autowired
    private IClassTypeService classTypeServiceImpl;
    @Autowired
    private PropertiesUtil propertiesUtil;
    @Autowired
    private ISysConfigItemRelationService sysConfigItemRelationServiceImpl;

    @Autowired
    private ISysConfigItemService sysConfigItemServiceImpl;
    private Log log = LogFactory.getLog("log");

    /**
     * 跳转到已上架课程页面
     *
     * @return
     */
    @RequestMapping(value = "/shelvesCourses", method = RequestMethod.GET)
    public String gotoShelvesCourses(Model model, HttpServletRequest request) {
        //获取一级菜单
        SysDictApp search = new SysDictApp();
        List<SysDictApp> slibMenus = sysDictAppServiceImpl.findSysDictAppByParentId(search);
/*        if(null!=slibMenus && slibMenus.size()>0){
            for(SysDictApp sda : slibMenus){
                if("FIRSTRECOMMEND".equals(sda.getType())){
                    slibMenus.remove(sda);
                    break;
                }
            }
        }*/
        model.addAttribute("firstMenus", slibMenus);
        return "simpleClasses/appNewClasses/shelvesCourses";
    }

    /**
     * 跳转到上架信息编辑
     */
    @RequestMapping(value = "/InformationEditing")
    public String gotoInformationEditing() {
        return "simpleClasses/appNewClasses/informationEditing";
    }

    /**
     * 跳转到首页推荐专题列表
     */
    @RequestMapping(value = "/recommendedList")
    public String gotorecommendedList() {
        return "simpleClasses/appNewClasses/recommendedList";
    }

    /**
     * 跳转到批量首页推荐
     */
    @RequestMapping(value = "/pageRecommendation", method = RequestMethod.GET)
    public String gotopageRecommendation(Model model, String modelId, Integer parentId, HttpServletRequest request) throws UnsupportedEncodingException {
        Integer modelIds = null;
        String modelCode = null;
        if (modelId != null && modelId != "") {
            modelIds = Integer.valueOf(modelId.split("_")[0]);
            modelCode = modelId.split("_")[1];
        }
        SysDictApp search = new SysDictApp();
        List<SysDictApp> slibMenus = sysDictAppServiceImpl.findSysDictAppByParentId(search);
        model.addAttribute("firstMenu",slibMenus);
        //获取二级菜单
        /*List<SysDictApp> menusList = sysDictAppServiceImpl.getStudySectionById(modelIds);

        //获取课程分类名称
        List<SysDictApp> grades = new ArrayList<SysDictApp>();
        List<SysDictApp> stages = new ArrayList<SysDictApp>();
        List<SysDictApp> types = new ArrayList<SysDictApp>();
        for (SysDictApp s : menusList) {
            if (s.getType().equals("STAGE")) {
                stages.add(s);
            } else if (s.getType().equals("TYPE")) {
                types.add(s);
            } else {
                grades.add(s);
            }
        }*/
       /* model.addAttribute("grades", grades);
        model.addAttribute("stages", stages);
        model.addAttribute("types", types);*/

        String mokelName = sysDictAppServiceImpl.getModelById(modelIds);
        model.addAttribute("modelName", mokelName);
        model.addAttribute("modelId", modelIds);
        model.addAttribute("modelCode", modelCode);

        List<SysConfigItemRelation> relations = sysConfigItemRelationServiceImpl.findAllItemFront();

        List<SysDictApp> sysDictApps = sysDictAppServiceImpl.findSysDictAppByCode("GRADE_CODE");


        model.addAttribute("secondItem", sysDictApps);

        return "simpleClasses/appNewClasses/pageRecommendation";
    }

    /**
     * 跳转到推荐列表
     */
    @RequestMapping(value = "/recommendSpecialList", method = RequestMethod.POST)
    public String gotorecommendSpecialList(Model model) {

        return "simpleClasses/appNewClasses/recommendSpecialList";
    }

    /**
     * 跳转到首页推荐
     */
    @RequestMapping(value = "/homeRecommendation", method = RequestMethod.POST)
    public String gotohomeRecommendation(HttpServletRequest request, Model model) {
        String categerorId = request.getParameter("categerorId");
        String zhiboFlag = request.getParameter("zhiboFlag");
        String commodityId = request.getParameter("commodityId");

        SysDictApp search = new SysDictApp();
        search.setType("TUIJIAN");
        search.setParentId(-1);
        List<SysDictApp> slibMenus = sysDictAppServiceImpl.findSysDictAppByParentId(search);
        model.addAttribute("firstMenu",slibMenus);
/*        if (null != slibMenus && slibMenus.size() > 0) {
            List <SysDictApp> recoSite = new ArrayList<SysDictApp>();
            for (SysDictApp sda : slibMenus) {
                //获取首页推荐位置信息
                if (String.valueOf(sda.getId()).equals(categerorId) || "FIRSTRECOMMEND".equals(sda.getType())) {
                    recoSite.add(sda);
                }
                if(recoSite.size()==2){
                    model.addAttribute("firstMenu",recoSite);
                    break;
                }
            }
        }*/
        ClassTypeVo searchAndResult = new ClassTypeVo();
        List<ClassTypeVo> gardeIdList = new ArrayList<>();
        if ("1".equals(zhiboFlag)) {
            //查询直播课程信息
            searchAndResult.setId(Integer.parseInt(commodityId));
            searchAndResult = classTypeServiceImpl.querySingleLiveClassTypeInfo(searchAndResult);
            //获取学段列表，列表回显
            gardeIdList = classTypeServiceImpl.getGardeIdList(searchAndResult);
        } else {
            //查询录播信息
            searchAndResult.setId(Integer.parseInt(commodityId));
            searchAndResult = classTypeServiceImpl.querySingOtherClassTypeInfo(searchAndResult);
            //获取学段列表，列表回显
            gardeIdList = classTypeServiceImpl.getGardeIdList(searchAndResult);
        }

        model.addAttribute("recomSite",gardeIdList.size()>0?gardeIdList.get(0):null);
        model.addAttribute("searchAndResult", searchAndResult);
        model.addAttribute("gardeIdList", gardeIdList);
        String commodityPicUrl = "http://" + propertiesUtil.getProjectImageUrl() + "/";
        model.addAttribute("commodityPicUrl", commodityPicUrl);

        return "simpleClasses/appNewClasses/homeRecommendation";
    }

    @ResponseBody
    @RequestMapping(value = "/insertRcommondInfo", method = RequestMethod.POST)
    public String insertRcommondInfo(HttpServletRequest request, String ids, String sort, String appId) {

        try {
            List<FirstRecommend> frs = new ArrayList<>();
            String categoryId = request.getParameter("categoryId");
            if(StringUtils.isBlank(categoryId)){
                return "0";
            }
            if (null != ids && !"".equals(ids)) {
                String[] idStrs = ids.split(",");
                for (String idStr : idStrs) {
                    FirstRecommend fr = new FirstRecommend();
                    fr.setAppShelvesId(appId);
                    fr.setGradeNo(idStr);

                    if ("".equals(sort) || null == sort) {
                        fr.setSort(null);
                    } else {
                        fr.setSort(sort);
                    }
                    fr.setCategoryId(categoryId);
                    frs.add(fr);
                }
                classTypeServiceImpl.insertAndUpdateFirstRecommond(frs, sort, appId);
            }else{
                return "0";
            }
            return "1";
        } catch (Exception e) {
            return "0";
        }
    }

    /**
     * 保存图片
     *
     * @param multiPartRquest
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/savePic", method = RequestMethod.POST)
    public String queryPic(MultipartRequest multiPartRquest, HttpServletRequest req) {
        MultipartFile multipartFile = multiPartRquest.getFile("imgData");
        String realPath = null;
        try {
            realPath = FileUtil.upload(multipartFile, "course", WebUtils.getCurrentCompanyId() + "");
        } catch (Exception e) {
            log.error("文件上传失败!", e);
            e.printStackTrace();
        }
        req.getSession().setAttribute("imgUrl", realPath);
        String url = "http://" + propertiesUtil.getProjectImageUrl() + "/" + realPath;
        return "{\"url\":\"" + url + "\"}";
    }

}
