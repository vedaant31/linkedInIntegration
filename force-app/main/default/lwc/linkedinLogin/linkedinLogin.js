import { LightningElement } from 'lwc';

export default class LinkedinLogin extends LightningElement {
    handleLogin() {
        const clientId = '860x1xolxuuzf4';
        const redirectUri = encodeURIComponent('https://growthnatives50-dev-ed.develop.lightning.force.com/lightning/page/home');
        const state = 'secureRandomString123';
        const scope = 'openid%20profile%20email%20w_member_social';

        const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
        window.location.href = authUrl;
    }
}