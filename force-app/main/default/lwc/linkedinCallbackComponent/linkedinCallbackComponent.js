import { LightningElement } from 'lwc';
import getAccessToken from '@salesforce/apex/LinkedInAuthController.getAccessToken';
import getLinkedInProfile from '@salesforce/apex/LinkedInUserController.getLinkedInProfile';

export default class LinkedinCallbackComponent extends LightningElement {
    connectedCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const redirectUri = window.location.origin + window.location.pathname;

        if (code) {
            getAccessToken({ code, redirectUri })
                .then(result => {
                    const response = JSON.parse(result);
                    const token = response.access_token;
                    return getLinkedInProfile({ accessToken: token });
                })
                .then(profile => {
                    console.log('✅ LinkedIn Profile:', profile);
                })
                .catch(error => {
                    console.error('❌ Error:', error);
                });
        }
    }
}