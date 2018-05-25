package com.yuxin.wx.institution.impl;

import com.yuxin.wx.api.institution.ReServApplyService;
import com.yuxin.wx.common.BaseServiceImpl;
import com.yuxin.wx.common.PageFinder;
import com.yuxin.wx.institution.mapper.ReServApplyMapper;
import com.yuxin.wx.model.institution.ReServApply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ReServApplyServiceImpl extends BaseServiceImpl implements ReServApplyService{
    @Autowired
    private ReServApplyMapper reServApplyMapper;


    @Override
    public void update(ReServApply reServApply) {
        reServApplyMapper.update(reServApply);
    }

    @Override
    public List<ReServApply> findReServApplyIns() {

        return reServApplyMapper.findReServApplyIns();
    }

    @Override
    public List<ReServApply> findReServApplyClass() {
        return reServApplyMapper.findReServApplyClass();
    }

    @Override
    public PageFinder<ReServApply> findReServApplyList(ReServApply reServApply){
        if(reServApply.getPage() == 1){
            reServApply.setPage(0);
        }else{
            reServApply.setPage((reServApply.getPage()-1)*reServApply.getPageSize());
        }
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
       /* String startTime =null;
        if(null != reServApply.getStartTime() && !"".equals(reServApply.getStartTime())){
            startTime = format.format(reServApply.getStartTime());
        }
        String endTime = null;
        if(null != reServApply.getEndTime() && !"".equals(reServApply.getEndTime())){
            endTime = format.format(reServApply.getEndTime());
        }



        reServApply.setStartTimes(startTime);
        reServApply.setEndTimes(endTime);*/
        //查找机构预约列表
        List<ReServApply> data = reServApplyMapper.findReServApplyList(reServApply);
        Integer count = reServApplyMapper.findReServApplyListCount(reServApply);

        PageFinder<ReServApply> pageFinder = new PageFinder<>(reServApply.getPage()/reServApply.getPageSize(),reServApply.getPageSize(),count,data);

        int j=1;
        for(int i = 0;i<pageFinder.getData().size();i++){
            pageFinder.getData().get(i).setSort(j);
            pageFinder.getData().get(i).setTime(format.format(pageFinder.getData().get(i).getCreateTime()));
            j++;
        }
        if(null != reServApply.getInsClassId() && !"".equals(reServApply.getInsClassId())){
            for(int i = 0;i<pageFinder.getData().size();i++){
                if( null == pageFinder.getData().get(i).getClassName() || "".equals(pageFinder.getData().get(i).getClassName()) ){
                    pageFinder.getData().remove(i);
                    i--;
                }
            }
        }

        return pageFinder;
    }

    @Override
    public List<Map<Object,Object>> findReServApplyMap(ReServApply reServApply) {
        //查找机构预约列表
        List<Map<Object, Object>> data = reServApplyMapper.findReServApplyMap(reServApply);
        int j = 1;
        for (int i = 0; i < data.size(); i++) {
            data.get(i).put("id", j);
            j++;
            if((Integer)data.get(i).get("dealStatus") == 1){
                data.get(i).put("dealStatus","已处理");
            }else{
                data.get(i).put("dealStatus","未处理");
            }
        }
        return data;
    }
}