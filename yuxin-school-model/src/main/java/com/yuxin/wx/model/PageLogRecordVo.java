package com.yuxin.wx.model;

import com.yuxin.wx.common.BaseEntity;

/**
 * Created by lym_gxm on 18/5/23.
 */
public class PageLogRecordVo extends BaseEntity {


    /**
     * 页面编码
     */
    private String pageNo;

    /**
     * 用户标识
     */
    private String userFlag;

    /**
     * 进入时间
     */
    private String inTime;

    /**
     * 推出页面时间
     */
    private String outTime;

    /**
     * 客户端类型   1:ios 2:安卓
     */
    private String clientType;

    /**
     * 记录业务类型 1:机构
     */
    private String recordType;

    /**
     * 挂载id
     */
    private String pkId;


    /**
     * 初始化实体数据
     * @param pageNo
     * @param userFlag
     * @param inTime
     * @param outTime
     * @param clientType
     * @param recordType
     * @param pkId
     */
    public PageLogRecordVo(String pageNo, String userFlag, String inTime, String outTime, String clientType, String recordType, String pkId) {
        this.pageNo = pageNo;
        this.userFlag = userFlag;
        this.inTime = inTime;
        this.outTime = outTime;
        this.clientType = clientType;
        this.recordType = recordType;
        this.pkId = pkId;
    }


    public PageLogRecordVo() {
    }

    public String getPageNo() {
        return pageNo;
    }

    public void setPageNo(String pageNo) {
        this.pageNo = pageNo;
    }

    public String getUserFlag() {
        return userFlag;
    }

    public void setUserFlag(String userFlag) {
        this.userFlag = userFlag;
    }

    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }

    public String getOutTime() {
        return outTime;
    }

    public void setOutTime(String outTime) {
        this.outTime = outTime;
    }

    public String getClientType() {
        return clientType;
    }

    public void setClientType(String clientType) {
        this.clientType = clientType;
    }

    public String getRecordType() {
        return recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public String getPkId() {
        return pkId;
    }

    public void setPkId(String pk_id) {
        this.pkId = pkId;
    }
}
