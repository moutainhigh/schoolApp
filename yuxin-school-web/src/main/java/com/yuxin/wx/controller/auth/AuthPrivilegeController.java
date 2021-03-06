package com.yuxin.wx.controller.auth;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yuxin.wx.api.system.ISysConfigDictService;
import com.yuxin.wx.model.system.SysConfigDict;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.yuxin.wx.model.auth.AuthPrivilege;
import com.yuxin.wx.model.auth.AuthPrivilegeCategory;
import com.yuxin.wx.model.auth.AuthRole;
import com.yuxin.wx.model.auth.AuthUserRole;
import com.yuxin.wx.model.company.CompanyConfigProxyOrg;
import com.yuxin.wx.model.system.SysConfigItem;
import com.yuxin.wx.model.system.SysConfigSchool;
import com.yuxin.wx.model.system.SysConfigTeacher;
import com.yuxin.wx.model.user.Users;
import com.yuxin.wx.user.mapper.UsersMapper;
import com.yuxin.wx.utils.ParameterUtil;
import com.yuxin.wx.utils.WebUtils;
import com.yuxin.wx.vo.privilege.PrivilegeListVo;
import com.yuxin.wx.vo.privilege.TreeNode;
import com.yuxin.wx.vo.privilege.UserRolesListVo;
import com.yuxin.wx.vo.system.SysConfigTeachersVo;
import com.yuxin.wx.api.auth.IAuthPrivilegeCategoryService;
import com.yuxin.wx.api.auth.IAuthPrivilegeService;
import com.yuxin.wx.api.auth.IAuthRoleService;
import com.yuxin.wx.api.auth.IAuthUserRoleService;
import com.yuxin.wx.api.company.ICompanyConfigProxyOrgService;
import com.yuxin.wx.api.system.ISysConfigItemService;
import com.yuxin.wx.api.system.ISysConfigSchoolService;
import com.yuxin.wx.api.system.ISysConfigTeacherService;
import com.yuxin.wx.api.user.IUsersService;
import com.yuxin.wx.common.PageFinder;

/**
 * Controller of AuthPrivilege
 * @author wang.zx
 * @date 2015-1-27
 */
@Controller
@RequestMapping("/authPrivilege")
public class AuthPrivilegeController {
	
	@Autowired
	private IAuthPrivilegeService authPrivilegeServiceImpl;
	@Autowired
	private IAuthPrivilegeCategoryService authPrivilegeCategoryServiceImpl ;
	@Autowired
	private ISysConfigSchoolService sysConfigSchoolServiceImpl;
	@Autowired
	private IAuthRoleService authRoleServiceImpl;
	@Autowired
	private IUsersService userServiceImpl;
	@Autowired
	private ISysConfigTeacherService sysConfigTeacherServiceImpl;
	@Autowired
	private IAuthUserRoleService authUserRoleServiceImpl;
	@Autowired
	private ISysConfigItemService sysConfigItemServiceImpl;
	@Autowired
	private ICompanyConfigProxyOrgService companyConfigProxyOrgServiceImpl;
	@Autowired
	private ISysConfigDictService sysConfigDictService;
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 跳转到用户权限首页
	 * @author zhang.zx
	 * @date 2015年5月18日 下午7:46:09
	 * @modifier
	 * @modify-date 2015年5月18日 下午7:46:09
	 * @version 1.0
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/showAuth",method=RequestMethod.GET)
	public String showAuthPrivilegePage(Model model,HttpServletRequest request){
		Integer userId=WebUtils.getCurrentUserId(request);
		Integer companyId=WebUtils.getCurrentCompanyId();
		Integer schoolId=WebUtils.getCurrentSchoolId();
		if(authRoleServiceImpl.hasRoleFlag(userId)){
			model.addAttribute("peoplemark", "admin");
			List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(companyId);
			model.addAttribute("schoolId", schoolId);
			model.addAttribute("schoolList", schoolList);
		}else{
			model.addAttribute("peoplemark", "schooladmin");
			SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(schoolId);
			model.addAttribute("school1",school);
		}
		
		return "system/authPrivilegeIndex";
	} 
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description:查询用户角色并分页
	 * @author zhang.zx
	 * @date 2015年5月18日 下午9:15:36
	 * @modifier
	 * @modify-date 2015年5月18日 下午9:15:36
	 * @version 1.0
	 * @return
	 */
	@RequestMapping(value="/queryUserRoles",method=RequestMethod.POST)
	public String queryUserRoleListsByPage(Model model,Integer page, Integer schoolId,String condition,HttpServletRequest request){
		Integer userId=WebUtils.getCurrentUserId(request);
		if(authRoleServiceImpl.hasRoleFlag(userId)){
			model.addAttribute("peoplemark", "admin");
		}
//		Subject subject = SecurityUtils.getSubject();
//		if(subject.hasRole("机构管理员")){
//			model.addAttribute("peoplemark", "admin");
//		}
		UserRolesListVo search=new UserRolesListVo();
		search.setCompanyId(WebUtils.getCurrentCompanyId());
		if(StringUtils.isNotBlank(condition)) {
			if(ParameterUtil.isMobilePhone(condition)) {
				search.setMobile(condition);
			}else if(ParameterUtil.isUserName(condition)) {
				search.setUsername(condition);
			}else {
				search.setRealName(condition);
			}
		}
		search.setSchoolId(schoolId);
		search.setPage(page);
		PageFinder<UserRolesListVo> pageFinder=authRoleServiceImpl.queryAllUser(search);
		model.addAttribute("pageFinder", pageFinder);
		model.addAttribute("userId", userId);
		List<SysConfigDict> dictList = sysConfigDictService.findAll();
		model.addAttribute("dictList", dictList);
		return "system/authPrivilegeAjaxList";
	}
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 修改用户状态
	 * @author zhang.zx
	 * @date 2015年5月19日 上午11:47:47
	 * @modifier
	 * @modify-date 2015年5月19日 上午11:47:47
	 * @version 1.0
	 * @param users
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/changeStatus",method=RequestMethod.POST)
	public Users changeStatusStatus(Users users,HttpServletRequest request){
		userServiceImpl.updateStatus(users);
		return userServiceImpl.findUsersById(users.getId());
	}
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 编辑用户
	 * @author zhang.zx
	 * @date 2015年5月19日 下午1:56:51
	 * @modifier
	 * @modify-date 2015年5月19日 下午1:56:51
	 * @version 1.0
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/addAuthPrivilage",method=RequestMethod.POST)
	public String addAuthPrivilage(Model model,HttpServletRequest request,String type,Integer userId,String schoolId){
		Integer uId=WebUtils.getCurrentUserId(request);
		if("save".equals(type)){
			//查询校区列表
			Integer companyId=WebUtils.getCurrentCompanyId();
			if(authRoleServiceImpl.hasRoleFlag(uId)){
				model.addAttribute("peoplemark", "admin");
				List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(companyId);
				model.addAttribute("schoolId", schoolId);
				model.addAttribute("schoolList", schoolList);
				List<AuthRole> authRoleList= authRoleServiceImpl.findByCompanyId(companyId);
				if(authRoleList.size()<=0){
					authRoleList=authRoleServiceImpl.findByCompanyId(0);
				}
				model.addAttribute("authRoleList", authRoleList);
			}else{
				model.addAttribute("peoplemark", "schooladmin");
				SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(Integer.parseInt(schoolId));
				model.addAttribute("school1",school);
				AuthRole search=new AuthRole();
				search.setRoleUid(1+"");
				search.setCompanyId(companyId);
				List<AuthRole> authRoleList= authRoleServiceImpl.queryRolesByCondition(search);
				if(authRoleList.size()<=0){
					search.setCompanyId(0);
					authRoleList=authRoleServiceImpl.queryRolesByCondition(search);
				}
				model.addAttribute("authRoleList", authRoleList);
			}
//			Subject subject = SecurityUtils.getSubject();
//			if(subject.hasRole("机构管理员")){
//				model.addAttribute("peoplemark", "admin");
//				List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(companyId);
//				model.addAttribute("schoolId", schoolId);
//				model.addAttribute("schoolList", schoolList);
//				List<AuthRole> authRoleList= authRoleServiceImpl.findByCompanyId(companyId);
//				if(authRoleList.size()<=0){
//					authRoleList=authRoleServiceImpl.findByCompanyId(0);
//				}
//				model.addAttribute("authRoleList", authRoleList);
//			}else if(subject.hasRole("分校管理员")){
//				model.addAttribute("peoplemark", "schooladmin");
//				SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(Integer.parseInt(schoolId));
//				model.addAttribute("school1",school);
//				AuthRole search=new AuthRole();
//				search.setRoleUid(1+"");
//				search.setCompanyId(companyId);
//				List<AuthRole> authRoleList= authRoleServiceImpl.queryRolesByCondition(search);
//				if(authRoleList.size()<=0){
//					search.setCompanyId(0);
//					authRoleList=authRoleServiceImpl.queryRolesByCondition(search);
//				}
//				model.addAttribute("authRoleList", authRoleList);
//			}
		}else{
			Integer companyId=WebUtils.getCurrentCompanyId();
			Users user= userServiceImpl.findUsersById(userId);
			model.addAttribute("user", user);
			if(authRoleServiceImpl.hasRoleFlag(uId)){
				model.addAttribute("peoplemark", "admin");
				List<AuthRole> authRoleList= authRoleServiceImpl.findByCompanyId(companyId);
				if(authRoleList.size()<=0){
					authRoleList=authRoleServiceImpl.findByCompanyId(0);
				}
				model.addAttribute("authRoleList", authRoleList);
			}else{
				model.addAttribute("peoplemark", "schooladmin");
				AuthRole search=new AuthRole();
				search.setRoleUid(1+"");
				search.setCompanyId(WebUtils.getCurrentCompanyId());
				List<AuthRole> authRoleList= authRoleServiceImpl.queryRolesByCondition(search);
				if(authRoleList.size()<=0){
					search.setCompanyId(0);
					authRoleList=authRoleServiceImpl.queryRolesByCondition(search);
				}
				model.addAttribute("authRoleList", authRoleList);
			}
//			Subject subject = SecurityUtils.getSubject();
//			if(subject.hasRole("机构管理员")){
//				model.addAttribute("peoplemark", "admin");
//				List<AuthRole> authRoleList= authRoleServiceImpl.findByCompanyId(companyId);
//				if(authRoleList.size()<=0){
//					authRoleList=authRoleServiceImpl.findByCompanyId(0);
//				}
//				model.addAttribute("authRoleList", authRoleList);
//			}else if(subject.hasRole("分校管理员")){
//				model.addAttribute("peoplemark", "schooladmin");
//				AuthRole search=new AuthRole();
//				search.setRoleUid(1+"");
//				List<AuthRole> authRoleList= authRoleServiceImpl.queryRolesByCondition(search);
//				if(authRoleList.size()<=0){
//					search.setCompanyId(0);
//					authRoleList=authRoleServiceImpl.queryRolesByCondition(search);
//				}
//				model.addAttribute("authRoleList", authRoleList);
//			}else{
//				
//			}
			SysConfigTeachersVo sysConfigTeacher=new SysConfigTeachersVo();
			sysConfigTeacher.setUserId(userId);
			List<SysConfigTeachersVo> arr= sysConfigTeacherServiceImpl.findSysConfigTeachersByName(sysConfigTeacher);
			model.addAttribute("teacherList", arr);
		}
		//查询菜单列表
		PrivilegeListVo privilege=new PrivilegeListVo();
		List<PrivilegeListVo> privilegeList=authPrivilegeCategoryServiceImpl.queryOnePrivilege(privilege);
		model.addAttribute("privilegeList", privilegeList);
		model.addAttribute("type", type);
		//代理机构
		CompanyConfigProxyOrg search = new CompanyConfigProxyOrg();
		search.setCompanyId(WebUtils.getCurrentCompanyId());
		List<CompanyConfigProxyOrg> proxyOrgs = this.companyConfigProxyOrgServiceImpl.queryProxyByCompanyId(search);
		model.addAttribute("proxyOrgs", proxyOrgs);
		
		return "system/editAuthPrivilege";
	}
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 添加用户
	 * @author zhang.zx
	 * @date 2015年5月20日 上午10:49:23
	 * @modifier
	 * @modify-date 2015年5月20日 上午10:49:23
	 * @version 1.0
	 * @param user
	 * @param
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value="/saveUser",method=RequestMethod.POST)
	public void saveUser(Users user,String rolesId,String teachersId,HttpServletRequest request,HttpServletResponse response, Model model) throws IOException{
		user.setCompanyId(WebUtils.getCurrentCompanyId());
		user.setStatus(1);
		user.setPassword(new Md5Hash(user.getPassword(),ByteSource.Util.bytes(user.getUsername()+"salt")).toHex());	
		
		//添加用户信息
		userServiceImpl.insert(user);
		//添加用户角色权限信息
		if(rolesId!=null&&!"".equals(rolesId)){
			String r=rolesId.substring(0, rolesId.length()-1);
			String[] roles=r.split(",");
			for(int i=0;i<roles.length;i++){
			    AuthUserRole authUserRole=new AuthUserRole();
			    authUserRole.setUserId(user.getId());
			    authUserRole.setRoleUid(roles[i]);
			    authUserRole.setCreateTime(new Date());
			    authUserRole.setCreator(WebUtils.getCurrentUserId(request)+"");
			    authUserRole.setUpdateTime(new Date());
			    authUserRole.setUpdator(WebUtils.getCurrentUserId(request)+"");
				authUserRoleServiceImpl.insert(authUserRole);
			}
		}
		
		//修改教师信息
		if(teachersId!=null&&!"".equals(teachersId)){
			String t=teachersId.substring(0, teachersId.length()-1);
			String[] teachers=t.split(",");
			for(int i=0;i<teachers.length;i++){
				SysConfigTeacher sysConfigTeacher=new SysConfigTeacher();
				sysConfigTeacher.setId(Integer.parseInt(teachers[i]));
				sysConfigTeacher.setUserId(user.getId());
				sysConfigTeacherServiceImpl.updateauthTeacher(sysConfigTeacher);		
			}
		}
		Integer uId=WebUtils.getCurrentUserId(request);
		if(authRoleServiceImpl.hasRoleFlag(uId)){
			model.addAttribute("peoplemark", "admin");
			List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(WebUtils.getCurrentCompanyId());
			model.addAttribute("schoolId", user.getSchoolId());
			model.addAttribute("schoolList", schoolList);
		}else{
			model.addAttribute("peoplemark", "schooladmin");
			SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(user.getSchoolId());
			model.addAttribute("school1",school);
		}
//		Subject subject = SecurityUtils.getSubject();
//		if(subject.hasRole("机构管理员")){
//			model.addAttribute("peoplemark", "admin");
//			List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(WebUtils.getCurrentCompanyId());
//			model.addAttribute("schoolId", user.getSchoolId());
//			model.addAttribute("schoolList", schoolList);
//		}else if(subject.hasRole("分校管理员")){
//			model.addAttribute("peoplemark", "schooladmin");
//			SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(user.getSchoolId());
//			model.addAttribute("school1",school);
//		}
//		Integer companyId=WebUtils.getCurrentCompanyId();
//		List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(companyId);
//		model.addAttribute("schoolId", user.getSchoolId());
//		model.addAttribute("schoolList", schoolList);
		//return "system/authPrivilegeIndex";
		response.sendRedirect("showAuth");
	}
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 修改用户
	 * @author zhang.zx
	 * @date 2015年5月20日 上午10:49:38
	 * @modifier
	 * @modify-date 2015年5月20日 上午10:49:38
	 * @version 1.0
	 * @param user
	 * @param
	 * @return
	 */
	@RequestMapping(value="/updateUser",method=RequestMethod.POST)
	public String updateUser(Users user,String usernames, String rolesId,String teachersId,HttpServletRequest request,Model model){	
		//修改用户
		if(user.getPassword()!=null&&!"".equals(user.getPassword())){
			user.setUsername(usernames);
			user.setPassword(new Md5Hash(user.getPassword(),ByteSource.Util.bytes(user.getUsername()+"salt")).toHex());
		}
		userServiceImpl.update(user);
		//修改用户角色
		if(rolesId!=null&&!"".equals(rolesId)){
			//清除原来用户角色
			authUserRoleServiceImpl.deleteAuthUserRoleById(user.getId());
			String r=rolesId.substring(0, rolesId.length()-1);
			String[] roles=r.split(",");
			for(int i=0;i<roles.length;i++){
				 AuthUserRole authUserRole=new AuthUserRole();
			     authUserRole.setUserId(user.getId());
			     authUserRole.setRoleUid(roles[i]);
			     authUserRole.setCreateTime(new Date());
			     authUserRole.setCreator(WebUtils.getCurrentUserId(request)+"");
			     authUserRole.setUpdateTime(new Date());
			     authUserRole.setUpdator(WebUtils.getCurrentUserId(request)+"");
				 authUserRoleServiceImpl.insert(authUserRole);
			}	
		}
		//修改教师
		if(teachersId!=null&&!"".equals(teachersId)){
			//清除
			List<SysConfigTeacher> teac=sysConfigTeacherServiceImpl.findTeachersByUserId(user.getId());
			for(SysConfigTeacher t1:teac){
				t1.setUserId(null);
				sysConfigTeacherServiceImpl.updateauthTeacher(t1);
			}
			String t=teachersId.substring(0, teachersId.length()-1);
			String[] teachers=t.split(",");
			for(int i=0;i<teachers.length;i++){
				SysConfigTeacher sysConfigTeacher=new SysConfigTeacher();
				sysConfigTeacher.setId(Integer.parseInt(teachers[i]));
				sysConfigTeacher.setUserId(user.getId());
				sysConfigTeacherServiceImpl.updateauthTeacher(sysConfigTeacher);
			}
		}
		Users user1=userServiceImpl.findUsersById(user.getId());
		Integer uId=WebUtils.getCurrentUserId(request);
		if(authRoleServiceImpl.hasRoleFlag(uId)){
			model.addAttribute("peoplemark", "admin");
			List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(WebUtils.getCurrentCompanyId());
			model.addAttribute("schoolId", user1.getSchoolId());
			model.addAttribute("schoolList", schoolList);
		}else{
			model.addAttribute("peoplemark", "schooladmin");
			SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(user1.getSchoolId());
			model.addAttribute("school1",school);
		}
//		Subject subject = SecurityUtils.getSubject();
//		if(subject.hasRole("机构管理员")){
//			model.addAttribute("peoplemark", "admin");
//			List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(WebUtils.getCurrentCompanyId());
//			model.addAttribute("schoolId", user1.getSchoolId());
//			model.addAttribute("schoolList", schoolList);
//		}else if(subject.hasRole("分校管理员")){
//			model.addAttribute("peoplemark", "schooladmin");
//			SysConfigSchool school=sysConfigSchoolServiceImpl.findSysConfigSchoolById(user1.getSchoolId());
//			model.addAttribute("school1",school);
//		}
//		Integer companyId=WebUtils.getCurrentCompanyId();
//		List<SysConfigSchool> schoolList=sysConfigSchoolServiceImpl.findSysConfigSchoolByCompanyId(companyId);
//		model.addAttribute("schoolId", user1.getSchoolId());
//		model.addAttribute("schoolList", schoolList);
		return "system/authPrivilegeIndex";
	}
	
	/**
	 * 
	 * Class Name: AuthPrivilegeController.java
	 * @Description: 删除用户信息
	 * @author zhang.zx
	 * @date 2015年12月21日 上午10:50:32
	 * @modifier
	 * @modify-date 2015年12月21日 上午10:50:32
	 * @version 1.0
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteById")
	public String deleteUserById(Integer id,HttpServletRequest request){
		Integer uId=WebUtils.getCurrentUserId(request);
		if(authRoleServiceImpl.hasRoleFlag(uId)){
			Users user= userServiceImpl.findUsersById(id);
			if(null!=user&&null!=user.getId()){
				userServiceImpl.deleteUsersById(user.getId());
				List<AuthUserRole> arr=authUserRoleServiceImpl.findByRoleId(user.getId()+"");
				if(null!=arr&&arr.size()>0){
					for(AuthUserRole auth:arr){
						//清除用户角色信息
						if(null!=auth&&null!=auth.getId()&&!"".equals(auth.getId())){
							authUserRoleServiceImpl.deleteByRoleId(auth.getId());
						}
					}
				}
			}
			return "success";
		}
//		Subject subject = SecurityUtils.getSubject();
//		if(subject.hasRole("机构管理员")){
//			Users user= userServiceImpl.findUsersById(id);
//			if(null!=user&&null!=user.getId()){
//				userServiceImpl.deleteUsersById(user.getId());
//				List<AuthUserRole> arr=authUserRoleServiceImpl.findByRoleId(user.getId()+"");
//				if(null!=arr&&arr.size()>0){
//					for(AuthUserRole auth:arr){
//						//清除用户角色信息
//						if(null!=auth&&null!=auth.getId()&&!"".equals(auth.getId())){
//							authUserRoleServiceImpl.deleteByRoleId(auth.getId());
//						}
//					}
//				}
//			}
//			return "success";
//		}
		return "error";
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String list(Model model, AuthPrivilege search){
		if (search == null) {
			search = new AuthPrivilege();
			// search.setPageSize(20);
		}
		model.addAttribute("list", authPrivilegeServiceImpl.findAuthPrivilegeByPage(search));
		return "authPrivilege/list";
	}
	
	@RequestMapping(value="/add", method = RequestMethod.POST)
	public String add(AuthPrivilege AuthPrivilege) {
		authPrivilegeServiceImpl.insert(AuthPrivilege);
		return "redirect:/authPrivilege";
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	public String update(AuthPrivilege AuthPrivilege) {
		authPrivilegeServiceImpl.update(AuthPrivilege);
		return "redirect:/authPrivilege";
	}
	
	@RequestMapping(value="/del/{id}", method = RequestMethod.GET)
	public String del(Model model, @PathVariable Integer id) {
		authPrivilegeServiceImpl.deleteAuthPrivilegeById(id);
		return "redirect:/authPrivilege";
	}
	
 @RequestMapping(value="/save", method = RequestMethod.POST)
 public String save(HttpServletRequest request) {
  List<TreeNode> nodes=JSONObject.parseArray(request.getParameter("tree"),com.yuxin.wx.vo.privilege.TreeNode.class);
//  authPrivilegeServiceImpl.savePrivilegeByCategory(nodes,UserHolder.getCurrentUser());
  return "redirect:/authPrivilege";
 }
	
	@ResponseBody
	@RequestMapping(value="/{id:\\d+}", method = RequestMethod.GET)
	public AuthPrivilege getJson(Model model, @PathVariable Integer id){
		return authPrivilegeServiceImpl.findAuthPrivilegeById(id);
	}
	
 @ResponseBody
 @RequestMapping(value="/privilegeList", method = RequestMethod.POST)
 public List<TreeNode> getPrivilegeList(HttpServletRequest request){
//     List<Map<String,String>> nodes=new ArrayList<Map<String,String>>();
     List<TreeNode> nodes=new ArrayList<TreeNode>();
     List<AuthPrivilegeCategory> categories= authPrivilegeCategoryServiceImpl.finAll();
     for(AuthPrivilegeCategory category : categories){
//         TreeNode node=new TreeNode();
         TreeNode node=new TreeNode();
         node.setId(""+category.getId());
         node.setName(category.getCategoryName());
         if(category.getParentId()!=null){
             node.setPId(category.getParentId());
         }else{
             node.setPId(0);
         }
         
         nodes.add(node);
     }
     for(AuthPrivilegeCategory category : categories){
         List<AuthPrivilege> privileges=authPrivilegeServiceImpl.findAuthPrivilegeByCategory(category.getId());
         for(AuthPrivilege privilege: privileges){
//             Map<String,String> subnode=new HashMap<String,String>();
             TreeNode subnode=new TreeNode();
             subnode.setId("s"+privilege.getId());
             subnode.setName(privilege.getDescription());
             subnode.setPId(category.getId());
             nodes.add(subnode);
         }
     }
     System.out.println(JSONArray.toJSONString(nodes));
     return nodes;
 }

 	
 	@ResponseBody
	@RequestMapping(value="/checkUserName",method=RequestMethod.POST)
	public String checkUserName(String userName,HttpServletRequest request){
 		if(null!=userName&&!"".equals(userName)){
 			if(ParameterUtil.isUserName(userName)){
 				Users u=new Users();
 				u.setUsername(userName);
 				List<Users> arr=userServiceImpl.queryuserIsExist(u);
 	 			if(null!=arr&&arr.size()>0){
 	 				return "用户名已存在";
 	 			}
 	 			return "true";
 			}else{
 				return "用户名只能以字母开头并由数字0-9，字母（a-z，A-Z）和下划线_组成";
 			}
 			
 		}else{
 			return "用户名不能为空";
 		}
		
	}
 
	/**
	 * 后台接收Date转换
	 */
	@InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
    }
}
