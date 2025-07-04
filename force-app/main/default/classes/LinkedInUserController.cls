public with sharing class LinkedInUserController {
    @AuraEnabled(cacheable=false)
    public static String getLinkedInProfile(String accessToken) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.linkedin.com/v2/userinfo');
        req.setMethod('GET');
        req.setHeader('Authorization', 'Bearer ' + accessToken);
        req.setHeader('X-Restli-Protocol-Version', '2.0.0');

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
			system.debug('res'+ res.getBody());
            return res.getBody(); 
        } else {
            system.debug('Failed to fetch profile: ');
            return 'Failed to fetch profile: ';
        }
    }
}