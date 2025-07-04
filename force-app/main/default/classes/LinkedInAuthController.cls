public with sharing class LinkedInAuthController {

    @AuraEnabled(cacheable=false)
    public static String getAccessToken(String code, String redirectUri) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://www.linkedin.com/oauth/v2/accessToken'); 
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded'); 

        String body = 'grant_type=authorization_code'
                    + '&code=' + code
                    + '&redirect_uri=' + EncodingUtil.urlEncode(redirectUri, 'UTF-8')
                    + '&client_id=' + '860x1xolxuuzf4'
                    + '&client_secret=' + 'WPL_AP1.bAatEZmqWbwQdK0s.oeLwfg==';
        req.setBody(body);

        Http http = new Http();
        HttpResponse res = http.send(req); 

        if (res.getStatusCode() == 200) {
            return res.getBody(); 
        } else {
            throw new AuraHandledException('Error retrieving access token: ' + res.getBody());
        }
    }
}