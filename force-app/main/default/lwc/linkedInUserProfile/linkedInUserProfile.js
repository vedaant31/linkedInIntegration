import { LightningElement, track } from 'lwc';
import getLinkedInProfile from '@salesforce/apex/LinkedInUserController.getLinkedInProfile';

export default class LinkedInUserProfile extends LightningElement {
    @track profile = {};
    @track emailClass = 'verified';

    connectedCallback() {
        this.loadProfile();
    }

    loadProfile() {
        getLinkedInProfile()
            .then(response => {
                const data = JSON.parse(response);
                this.profile = data;
                this.emailClass = data.email_verified ? 'verified' : 'unverified';
            })
            .catch(error => {
                console.error('Failed to fetch profile', error);
            });
    }
}
