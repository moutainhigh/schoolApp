package com.yuxin.wx.controller.system;

import java.text.SimpleDateFormat;
import java.util.Date;

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

import com.yuxin.wx.api.system.ISysTaskLogService;
import com.yuxin.wx.model.system.SysTaskLog;

/**
 * Controller of SysTaskLog
 * @author wang.zx
 * @date 2015-6-17
 */
@Controller
@RequestMapping("/sysTaskLog")
public class SysTaskLogController {
	
	@Autowired
	private ISysTaskLogService sysTaskLogServiceImpl;
	
	@RequestMapping(method = RequestMethod.GET)
	public String list(Model model, SysTaskLog search){
		if (search == null) {
			search = new SysTaskLog();
			// search.setPageSize(20);
		}
		model.addAttribute("list", sysTaskLogServiceImpl.findSysTaskLogByPage(search));
		return "sysTaskLog/list";
	}
	
	@RequestMapping(value="/add", method = RequestMethod.POST)
	public String add(SysTaskLog SysTaskLog) {
		sysTaskLogServiceImpl.insert(SysTaskLog);
		return "redirect:/sysTaskLog";
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	public String update(SysTaskLog SysTaskLog) {
		sysTaskLogServiceImpl.update(SysTaskLog);
		return "redirect:/sysTaskLog";
	}
	
	@RequestMapping(value="/del/{id}", method = RequestMethod.GET)
	public String del(Model model, @PathVariable Integer id) {
		sysTaskLogServiceImpl.deleteSysTaskLogById(id);
		return "redirect:/sysTaskLog";
	}
	
	@ResponseBody
	@RequestMapping(value="/{id:\\d+}", method = RequestMethod.GET)
	public SysTaskLog getJson(Model model, @PathVariable Integer id){
		return sysTaskLogServiceImpl.findSysTaskLogById(id);
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
