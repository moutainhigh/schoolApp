package com.yuxin.wx.util.qiniuVideo;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.Map;

/**
 * Created by qiniu
 * <p>
 * 域名管理
 * 包括创建域名，设置默认域名，停用启用域名，防盗链设置，获取域名列表，获取单条域名信息
 */
public class DomainManage {
    private static HttpClient httpClient;

    public DomainManage(String ak,String sk) {
        httpClient = HttpClient.getHttpClient(ak,sk);

    }

    /**
     * POST /v1/hubs/<Hub>/domains
     */
    public boolean createCustomDomain(String hub, CustomDomainArgs args) {
        Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();

        String bodyStr = gson.toJson(args);
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains";

        String auth = httpClient.getHttpRequestSign("POST", rawUrl, bodyStr, true);
        Map<String, Object> ret = httpClient.doRequest("POST", rawUrl, bodyStr, true, auth);

        if ((Integer) ret.get("code") == 200) {
            return true;
        }
        System.out.println("http response status:" + ret.get("code") + " error");
        return false;

    }

    /***
     * DELETE /v1/hubs/<Hub>/domains/<Domain>
     */
    public boolean removeCustomDomain(String hub, String domain) {
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains/" + domain;
        String auth = httpClient.getHttpRequestSign("DELETE", rawUrl, null, false);

        Map<String, Object> ret = httpClient.doRequest("DELETE", rawUrl, null, false, auth);

        if ((Integer) ret.get("code") == 200) {
            return true;
        }
        System.out.println("http response status:" + ret.get("code") + " error");
        return false;
    }

    /**
     * PUT  /v1/hubs/<Hub>/domains/<Domain>/default/<Default>
     */
    public boolean setCustomDomain(String hub, String domain, int defaultNum) {
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains/" + domain + "/default/" + defaultNum;
        String auth = httpClient.getHttpRequestSign("PUT", rawUrl, null, false);

        Map<String, Object> ret = httpClient.doRequest("PUT", rawUrl, null, false, auth);

        if ((Integer) ret.get("code") == 200) {
            return true;
        }
        System.out.println("http response status:" + ret.get("code") + " error");
        return false;
    }

    /***
     * GET /v1/hubs/<Hub>/domains/<Domain>
     */
    public String getCustomDomainInfo(String hub, String domain) {
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains/" + domain;
        String auth = httpClient.getHttpRequestSign("GET", rawUrl, null, false);

        Map<String, Object> ret = httpClient.doRequest("GET", rawUrl, null, false, auth);
        return new Gson().toJson(ret);
    }

    /***
     * GET /v1/hubs/<Hub>/domains
     */
    public String getCustomDomainInfoList(String hub) {
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains";
        String auth = httpClient.getHttpRequestSign("GET", rawUrl, null, false);

        Map<String, Object> ret = httpClient.doRequest("GET", rawUrl, null, false, auth);
        return new Gson().toJson(ret);
    }

    /***
     * POST /v1/hubs/<Hub>/domains/<Domain>/enabled/<Enabled>
     */
    public boolean enableCustomDomain(String hub, String domain, int enableNum) {
        String rawUrl = Const.HOST + "/v1/hubs/" + hub + "/domains/" + domain + "/enabled/" + enableNum;
        String auth = httpClient.getHttpRequestSign("POST", rawUrl, null, false);

        Map<String, Object> ret = httpClient.doRequest("POST", rawUrl, null, false, auth);

        if ((Integer) ret.get("code") == 200) {
            return true;
        }
        System.out.println("http response status:" + ret.get("code") + " error");
        return false;
    }


}
