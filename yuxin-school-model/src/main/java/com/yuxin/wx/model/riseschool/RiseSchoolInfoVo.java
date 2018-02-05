package com.yuxin.wx.model.riseschool;

import com.yuxin.wx.common.BaseEntity;

/**
 * Created by lym_gxm on 18/2/5.
 */
@SuppressWarnings("serial")
public class RiseSchoolInfoVo extends BaseEntity {

    private String schoolName;
    private String enrollmentType;
    private String provinceName;
    private String cityName;
    private String districtName;
//    private String isTop;
//    private String isShalve;
    private String detailAddress;
    private String schoolWeb;
    private String schoolFax;
    private String busRoad;
    private String userId;
//    private String updateTime;
//    private String createTime;
    private Integer collectNum;
    private Integer isCollect;
    private Integer collectId;

    private String districtCode;

    private String enrollmentCode;

    public String getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
    }

    public String getEnrollmentCode() {
        return enrollmentCode;
    }

    public void setEnrollmentCode(String enrollmentCode) {
        this.enrollmentCode = enrollmentCode;
    }

    public Integer getCollectId() {
        return collectId;
    }

    public void setCollectId(Integer collectId) {
        this.collectId = collectId;
    }

    public Integer getCollectNum() {
        return collectNum;
    }

    public void setCollectNum(Integer collectNum) {
        this.collectNum = collectNum;
    }

    public Integer getIsCollect() {
        return isCollect;
    }

    public void setIsCollect(Integer isCollect) {
        this.isCollect = isCollect;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getEnrollmentType() {
        return enrollmentType;
    }

    public void setEnrollmentType(String enrollmentType) {
        this.enrollmentType = enrollmentType;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

//    public String getIsTop() {
//        return isTop;
//    }
//
//    public void setIsTop(String isTop) {
//        this.isTop = isTop;
//    }
//
//    public String getIsShalve() {
//        return isShalve;
//    }
//
//    public void setIsShalve(String isShalve) {
//        this.isShalve = isShalve;
//    }

    public String getDetailAddress() {
        return detailAddress;
    }

    public void setDetailAddress(String detailAddress) {
        this.detailAddress = detailAddress;
    }

    public String getSchoolWeb() {
        return schoolWeb;
    }

    public void setSchoolWeb(String schoolWeb) {
        this.schoolWeb = schoolWeb;
    }

    public String getSchoolFax() {
        return schoolFax;
    }

    public void setSchoolFax(String schoolFax) {
        this.schoolFax = schoolFax;
    }

    public String getBusRoad() {
        return busRoad;
    }

    public void setBusRoad(String busRoad) {
        this.busRoad = busRoad;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

//    public String getUpdateTime() {
//        return updateTime;
//    }
//
//    public void setUpdateTime(String updateTime) {
//        this.updateTime = updateTime;
//    }
//
//    public String getCreateTime() {
//        return createTime;
//    }
//
//    public void setCreateTime(String createTime) {
//        this.createTime = createTime;
//    }
}
