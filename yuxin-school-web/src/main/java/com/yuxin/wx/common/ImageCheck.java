package com.yuxin.wx.common;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.apache.http.Consts;
import org.apache.http.client.HttpClient;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.yuxin.wx.utils.HttpClient4Utils;
import com.yuxin.wx.utils.SignatureUtils;

import sun.misc.BASE64Encoder;

/**
 * 调用易盾反垃圾云服务图片在线检测接口API示例，该示例依赖以下jar包：
 * 1. httpclient，用于发送http请求
 * 2. commons-codec，使用md5算法生成签名信息，详细见SignatureUtils.java
 * 3. gson，用于做json解析
 * 
 * @author hzgaomin
 * @version 2016年2月3日
 */
public class ImageCheck {
    /** 产品密钥ID，产品标识 */
    private final static String SECRETID = "4ebfc3e6f3ea895a756e4f42b107928d";
    /** 产品私有密钥，服务端生成签名信息使用，请严格保管，避免泄露 */
    private final static String SECRETKEY = "4c0da0c13a52e054ebf95ae43b2e0d10";
    /** 业务ID，易盾根据产品业务特点分配 */
    private final static String BUSINESSID = "fd7a3b8f88f29c5fc37158cec5da8238";
    /** 易盾反垃圾云服务图片在线检测接口地址 */
    private final static String API_URL = "https://api.aq.163.com/v3/image/check";
    /** 实例化HttpClient，发送http请求使用，可根据需要自行调参 */
    private static HttpClient httpClient = HttpClient4Utils.createHttpClient(100, 20, 10000, 2000, 2000);

    /**
     * 
     * @param args
     * @throws Exception
     */
    public static boolean ImageCheck(String url) throws Exception {
    	boolean flag =false;
        Map<String, String> params = new HashMap<String, String>();
        // 1.设置公共参数
        params.put("secretId", SECRETID);
        params.put("businessId", BUSINESSID);
        params.put("version", "v3");
        params.put("timestamp", String.valueOf(System.currentTimeMillis()));
        params.put("nonce", String.valueOf(new Random().nextInt()));
        // 2.设置私有参数
        JsonArray jsonArray = new JsonArray();
        // 传图片url进行检测，name结构产品自行设计，用于唯一定位该图片数据
        //JsonObject image1 = new JsonObject();
        /*第一个是命名，第二个是你传的是URL还是base64格式（type1 是url， type 2是base64），第三个是传的图片的url或者base64*/
       /* image1.addProperty("name", "pic");
        image1.addProperty("type", 1);
        image1.addProperty("data", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2466834245,1162383153&fm=27&gp=0.jpg");
        jsonArray.add(image1);*/

       //用此方法，直接传路径网易服务器存在图片不能下载的情况
        // 传图片base64编码进行检测，name结构产品自行设计，用于唯一定位该图片数据
       
        JsonObject image2 = new JsonObject();
        image2.addProperty("name", "{\"imageId\": 33451123, \"contentId\": 78978}");
        image2.addProperty("type", 2);
        image2.addProperty("data",url);
        jsonArray.add(image2);

        params.put("images", jsonArray.toString());
        /*params.put("account", "java@163.com");
        params.put("ip", "123.115.77.137");*/

        // 3.生成签名信息
        String signature = SignatureUtils.genSignature(SECRETKEY, params);
        params.put("signature", signature);

        // 4.发送HTTP请求，这里使用的是HttpClient工具包，产品可自行选择自己熟悉的工具包发送请求
        String response = HttpClient4Utils.sendPost(httpClient, API_URL, params, Consts.UTF_8);

        // 5.解析接口返回值
        JsonObject resultObject = new JsonParser().parse(response).getAsJsonObject();
        int code = resultObject.get("code").getAsInt();
        //String msg = resultObject.get("msg").getAsString();
        if (code == 200) {
            JsonArray resultArray = resultObject.getAsJsonArray("result");
            for (JsonElement jsonElement : resultArray) {
                JsonObject jObject = jsonElement.getAsJsonObject();
                String name = jObject.get("name").getAsString();
                String taskId = jObject.get("taskId").getAsString();
                JsonArray labelArray = jObject.get("labels").getAsJsonArray();
                System.out.println(String.format("taskId=%s，name=%s，labels：", taskId, name));
                int maxLevel = -1;
                // 产品需根据自身需求，自行解析处理，本示例只是简单判断分类级别
                for (JsonElement labelElement : labelArray) {
                    JsonObject lObject = labelElement.getAsJsonObject();
                    int label = lObject.get("label").getAsInt();
                    int level = lObject.get("level").getAsInt();
                    double rate = lObject.get("rate").getAsDouble();
                    System.out.println(String.format("label:%s, level=%s, rate=%s", label, level, rate));
                    maxLevel = level > maxLevel ? level : maxLevel;
                }
                switch (maxLevel) {
                    case 0:
                    	flag=true;
                        break;
                    case 1:
                    	flag=true;
                        break;
                    case 2:
                    	flag=false;
                        break;
                    default:
                        break;
                }
            }
        } else {
        	flag=false;
        }
       return flag;
    }

    //编码
    @SuppressWarnings("restriction")
	public static String GetImageStr(String imgFilePath) throws IOException {// 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        byte[] data = null;
        // 读取图片字节数组
        try {
            InputStream in = new FileInputStream(imgFilePath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        String s = encoder.encode(data);
        return s;// 返回Base64编码过的字节数组字符串
    }

}
