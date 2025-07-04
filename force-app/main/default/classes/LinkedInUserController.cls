public with sharing class LinkedInUserController {
    @AuraEnabled(cacheable=false)
    public static String getLinkedInProfile() {
        String accessToken='AQWcVxLyuPSQNToepiJawVtLiqZBoPaBuBrdmY4fvPJEL1N3t5yN-z5uc7GzNIGxz1UJJzlRX1ACXBvYNAK5iUyfyqqGqksg53JPDIMP_jfLmtgNeBf28xyhuNbvBXLC7L2CAMK6-z6YH8O1uetfFYgDIv2-hUNX6eQl3o0cAL0qOu5wgRdY0J2Lr1J8WEDuwxKMIFIJ0IxWeeENNZWfuGcABw9Gk5wGgGl3anOYhNL5Xh5Qtztkc_BrZQaI0a6twwRu8Qr0NXh9qSZeRl5LpllnvM3NV11TvF1vbThItFETL3ifU3E1M6ktKGoYSMDJKmbDX52z18ii-Sn9IMobqy1XapqKjg';
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