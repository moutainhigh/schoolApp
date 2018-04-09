package com.yuxin.wx.queAns.mapper;

import java.util.List;
import java.util.Map;

import com.yuxin.wx.common.BaseMapper;
import com.yuxin.wx.model.queAns.QueQuestion;
import com.yuxin.wx.vo.queAns.QuestionVo;

/**
 * Service Interface:Users
 * @author chopin
 * @date 2015-3-12
 */
public interface QuestionMapper extends BaseMapper<QueQuestion> {
	List<QuestionVo> findQuestionVoByPage(QueQuestion search);

	List<QuestionVo> findTeacherQuestion(Map<String, Object> search);
	
	/**
	 * 
	 * @author jishangyang 2017年11月29日 上午10:33:49
	 * @Method: insertQuestion 
	 * @Description: 保存问题
	 * @param queQuestion
	 * @return 
	 * @throws
	 */
	Integer  insertQuestion(QueQuestion queQuestion);
	
	String queryLabelName(String systemTagId);
	
}