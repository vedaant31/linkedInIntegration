import { LightningElement, track,wire } from 'lwc';
import searchYt from '@salesforce/apex/YoutubeSearch.searchYt';
import Images from '@salesforce/resourceUrl/Youtube'

export default class YoutubeComponent extends LightningElement {

    ytLogo = Images + '/logos/ytLogo.png';
    searchBtn = Images + '/logos/search.png';
    crossBtn = Images + '/logos/cross.png';



    @track body;
    @track errorMsg;
    @track videoList =[];// To hold the list of videos
    @track boolFlag = false;
    searchQuery;
    @track videoResult=[];
    // connectedCallback()
    // {
    //   //  this.getList();

    //     console.log('helo');
    // }
    // @wire(searchYt)
    // getData({error,data})
    // {
    //     if(data)
    //     {
    //         this.boolFlag=true;
    //         this.videoResult=data;
    //         console.log('VAA',JSON.parse(JSON.stringify(this.videoResult)));
    //     }
    //     else if(error)
    //     {
    //         console.error(error);
    //     }
    // }

    HandleInput(event)
    {
        this.searchQuery=event.target.value;
       // console.log('sear',this.searchQuery);
    }
    async getList() {
        try {
            //console.log('searchquer',searchQuery);
            
            console.log('sear',this.searchQuery);
            const response = await searchYt({ searchQuery: this.searchQuery });
            this.boolFlag=true;
            const parsedResponse = JSON.parse(response); // Parse the JSON string into an object
            this.videoList = parsedResponse.items.map(item => ({
                title: item.snippet.title,
                description: item.snippet.description,
                url: item.snippet.thumbnails.medium.url,
                publishTime: item.snippet.publishTime
            }));
        } catch (error) {
            console.log('error',error.body);
            console.log('error2',error.body.message);


            this.errorMsg = error.body ? error.body.message : 'Unknown error';
        }
        for (let index = 0; index < this.videoList.length; index++) {
            const element = this.videoList[index].url;
            console.log(element);
            
        }
        console.log('heee');
        console.log('videolist',JSON.stringify(this.videoList));


    }
    handleEnter(event)
    {
        if(event.key==="Enter")
        {
            console.log('entered enter');

            this.getList();
        }
    }
}