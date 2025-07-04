public with sharing class LinkedInShareController {
    @AuraEnabled
    public static String shareToLinkedIn(String messageText, String linkedInUrn, String accessToken) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.linkedin.com/v2/ugcPosts');
        request.setMethod('POST');
        request.setHeader('Authorization', 'Bearer ' + accessToken);
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('X-Restli-Protocol-Version', '2.0.0');

        String body = JSON.serialize(new Map<String, Object>{
            'author' => 'urn:li:person:'+ linkedInUrn, 
            'lifecycleState' => 'PUBLISHED',
            'visibility' => new Map<String, Object>{ 'com.linkedin.ugc.MemberNetworkVisibility' => 'PUBLIC' },
            'specificContent' => new Map<String, Object>{
                'com.linkedin.ugc.ShareContent' => new Map<String, Object>{
                    'shareCommentary' => new Map<String, Object>{ 'text' => messageText },
                    'shareMediaCategory' => 'NONE'
                }
            }
        });

        request.setBody(body);
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 201) {
            return 'Success';
        } else {
            throw new AuraHandledException('LinkedIn post failed: ' + response.getBody());
        }
    }
}