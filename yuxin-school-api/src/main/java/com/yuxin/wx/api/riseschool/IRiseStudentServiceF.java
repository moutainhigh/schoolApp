package com.yuxin.wx.api.riseschool;

import java.util.List;
import java.util.Map;

import com.yuxin.wx.model.company.NoticeTemplatVo;
import com.yuxin.wx.model.riseschool.RiseEduExperience;
import com.yuxin.wx.model.riseschool.RiseNopassReason;
import com.yuxin.wx.model.riseschool.RisePersonalHonor;
import com.yuxin.wx.model.riseschool.RiseSchoolInfoVo;
import com.yuxin.wx.model.riseschool.RiseSchoolManageVo;
import com.yuxin.wx.model.riseschool.RiseStudentVo;
import com.yuxin.wx.model.user.UsersFront;

/**
 * 后台学员管理
 */
public interface IRiseStudentServiceF {
	/**
	 * 查询全部学生
	 */
	List<RiseStudentVo> queryAllStudent(RiseStudentVo riseStudent);
	/**
	 * 查询全部学校
	 * @return
	 */
	List<RiseSchoolManageVo> queryAllSchool();
	/**
	 * 查询个数
	 * @return
	 */
	Integer queryAllStudentCount(RiseStudentVo riseStudent);
	
	void passStudent(Map map);
	//查询学生信息
	RiseStudentVo findById(Map map);
	//学校编号
	String findSchoolNo(String id);
	//学生人数
	String findStudentCount();
	String findStudentGrade(Map map);
	//通过更新状态
	void updateIsCheck(Map map);
	void updateIsCheckNoPass(RiseNopassReason reason);
	//查询教育经历
	List<RiseEduExperience> findExperience(Integer userId);
	//查询个人荣誉
	List<RisePersonalHonor> findHonor(Integer userId);
	//不通过原因
	List<RiseNopassReason> queryNoPass();
	UsersFront findUserByStudentId(Integer id);
	RiseSchoolInfoVo getSchoolName(Integer id);
	NoticeTemplatVo queryNoticeTemplateByUrl(Map<String, Object> paramsMap);
	//已经通过了几个审核
	Integer passCount(String id);
}
