import { LightningElement, track } from 'lwc';
import shareToLinkedIn from '@salesforce/apex/LinkedInShareController.shareToLinkedIn';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LinkedInPost extends LightningElement {
    @track postMessage = '';

    linkedInUrn = 'xt0PAVwR48';
    accessToken = 'AQWcVxLyuPSQNToepiJawVtLiqZBoPaBuBrdmY4fvPJEL1N3t5yN-z5uc7GzNIGxz1UJJzlRX1ACXBvYNAK5iUyfyqqGqksg53JPDIMP_jfLmtgNeBf28xyhuNbvBXLC7L2CAMK6-z6YH8O1uetfFYgDIv2-hUNX6eQl3o0cAL0qOu5wgRdY0J2Lr1J8WEDuwxKMIFIJ0IxWeeENNZWfuGcABw9Gk5wGgGl3anOYhNL5Xh5Qtztkc_BrZQaI0a6twwRu8Qr0NXh9qSZeRl5LpllnvM3NV11TvF1vbThItFETL3ifU3E1M6ktKGoYSMDJKmbDX52z18ii-Sn9IMobqy1XapqKjg';

    handleInputChange(event) {
        this.postMessage = event.target.value;
    }

    handlePostClick() {
        shareToLinkedIn({ 
            messageText: this.postMessage, 
            linkedInUrn: this.linkedInUrn, 
            accessToken: this.accessToken 
        })
        .then(result => {
            this.showToast('Success', 'Post shared on LinkedIn!', 'success');
            this.postMessage = '';
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}

