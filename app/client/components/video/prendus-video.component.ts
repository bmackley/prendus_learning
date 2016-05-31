import {VideoModel} from '../../models/video.model.ts';

class PrendusVideoComponent {
    public is;
    public properties;

    public xAPIEndpointURL;
    public videoSrc;
    public postBody;

    //TODO everything that has to do with mutating the below should perhaps be done in redux or more functionally somehow
    private timeBeforeSeek = 0;
    private seeking = false;
    private muteClick = false;
    private previousRate;
    private previousVolume;
    private queryParams;

    beforeRegister() {
        this.is = 'prendus-video';
        this.properties = {
        };
    }

    async ready() {
        this.prepareQueryParams();
        const html5Player = this.$.theVideoPlayer;
        //TODO figure out how to automatically configure this for when in development versus when in production
        //this.xAPIEndpointURL = 'http://localhost:5000/api/xapi/sendstatement'; //development endpoint
        this.xAPIEndpointURL = 'https://prenduslearning.com/api/xapi/sendstatement'; //production endpoint
        const video = await VideoModel.getById(this.queryParams.content);
        this.videoSrc = video.url;
        this.attachInternalListeners();
        this.previousRate = html5Player.playbackRate;
    }

    prepareQueryParams() {
        const getQueryParams = () => {
            return window.location.search.slice(1).split('&').reduce((prev, curr) => {
                const split = curr.split('=');
                const key = split[0];
                const value = decodeURIComponent(split[1]);
                prev[key] = value;
                return prev;
            }, {});
        };

        this.queryParams = getQueryParams();
    }

    sendStatement(eventInfo, sync) {
        console.log(eventInfo);
        this.postBody = {
            eventInfo
        };

        if (!sync) {
            this.$.ironAjaxElement.generateRequest();
        }
        else {
            // This is here only for the beforeunload event. Unless the request is synchronous, Chrome and potentially other browsers ignore the request on beforeunload
            const request = new XMLHttpRequest();
            request.open('POST', this.xAPIEndpointURL, false);
            request.setRequestHeader('content-type', 'application/json');
            request.send(JSON.stringify(this.postBody));
        }
    }

    attachInternalListeners() {
        const videoId = this.queryParams.content;
        const userFullName = this.queryParams.userfullname;
        const courseId = 350;
        const userEmail = this.queryParams.useremail;
        const baseUri = window.location.origin;
        const fullUrl = baseUri + window.location.pathname;
        const videoJSPlayer = videojs('theVideoPlayer');
        const html5Player = this.$.theVideoPlayer;

        const getEventInfo = () => {
            return {
                videoId,
                userFullName,
                userEmail,
                courseId,
                baseUri,
                fullUrl,
                timestamp: new Date(),
                videoTime: this.$.theVideoPlayer.currentTime,
                muted: this.$.theVideoPlayer.muted,
                currentSpeed: this.$.theVideoPlayer.playbackRate,
                currentVolume: this.$.theVideoPlayer.volume
            };
        };

        videoJSPlayer.on('fullscreenchange', (e) => {
            const eventInfo = getEventInfo();
            const isFullscreen = videoJSPlayer.isFullscreen();

            if (isFullscreen) {
                eventInfo.verb = 'enter_fullscreen';
                eventInfo.extensions = {
                    [`${baseUri}/playerTime`]: eventInfo.videoTime
                };
                this.sendStatement(eventInfo);
                console.log('enter_fullscreen', eventInfo);
            }
            else {
                eventInfo.verb = 'exit_fullscreen';
                eventInfo.extensions = {
                    [`${baseUri}/playerTime`]: eventInfo.videoTime
                };
                this.sendStatement(eventInfo);
                console.log('minimize clicked', eventInfo);
            }
        });

        html5Player.addEventListener('playing', (e) => {
            const eventInfo = getEventInfo();

            if (eventInfo.videoTime === 0) {
                eventInfo.verb = 'started';
                eventInfo.extensions = {};
                this.sendStatement(eventInfo);
                console.log('started', eventInfo);
            }
            else {
                eventInfo.verb = 'played';
                eventInfo.extensions = {
                    [`${baseUri}/playerTime`]: eventInfo.videoTime
                };
                this.sendStatement(eventInfo);
                console.log('played', eventInfo);
            }
        });

        html5Player.addEventListener('ended', (e) => {
            const eventInfo = getEventInfo();
            eventInfo.verb = 'ended';
            eventInfo.extensions = {
                [`${baseUri}/playerTime`]: eventInfo.videoTime
            };
            this.sendStatement(eventInfo);
            console.log('ended', eventInfo);
        });

        html5Player.addEventListener('pause', (e) => {
            const eventInfo = getEventInfo();
            eventInfo.verb = 'paused';
            eventInfo.extensions = {
                [`${baseUri}/playerTime`]: eventInfo.videoTime
            };
            this.sendStatement(eventInfo);
            console.log('paused', eventInfo);
        });

        html5Player.addEventListener('timeupdate', (e) => {
            const eventInfo = getEventInfo();

            if (!this.seeking) {
                this.timeBeforeSeek = eventInfo.videoTime;
                this.seeking = true;
            }
        });

        html5Player.addEventListener('seeked', (e) => {
            const getJumpStartTime = (timeBeforeSeek, videoTime) => {
                if (timeBeforeSeek === videoTime) {
                    return 0;
                }
                return timeBeforeSeek;
            };

            const eventInfo = getEventInfo();
            eventInfo.verb = 'jumped';
            eventInfo.extensions = {
                [`${baseUri}/oldTime`]: getJumpStartTime(this.timeBeforeSeek, eventInfo.videoTime),
                [`${baseUri}/newTime`]: eventInfo.videoTime
            };
            this.sendStatement(eventInfo);
            console.log('jumped', eventInfo);
            this.seeking = false;
        });

        //TODO I'm not handling the case where the user clicks unmute when the volume is already at 0. It will say it is an unmute even though the click will result in a still muted state
        html5Player.addEventListener('volumechange', (e) => {
            const eventInfo = getEventInfo();

            if (eventInfo.muted) {
                const muteEventInfo = Object.assign({}, eventInfo);
                this.muteClick = true;
                muteEventInfo.verb = 'changed_volume';
                muteEventInfo.extensions = {
                    [`${baseUri}/playerTime`]: muteEventInfo.videoTime,
                    [`${baseUri}/volume`]: muteEventInfo.currentVolume
                };
                this.sendStatement(muteEventInfo);
                console.log('mute click', muteEventInfo);
            }
            else if(this.muteClick) {
                const unmuteEventInfo = Object.assign({}, eventInfo);
                this.muteClick = false;
                unmuteEventInfo.verb = 'changed_volume';
                unmuteEventInfo.extensions = {
                    [`${baseUri}/playerTime`]: unmuteEventInfo.videoTime,
                    [`${baseUri}/volume`]: unmuteEventInfo.currentVolume
                };
                this.sendStatement(unmuteEventInfo);
                console.log('unmute click', unmuteEventInfo);
            }

            eventInfo.verb = 'changed_volume';
            eventInfo.extensions = {
                [`${baseUri}/playerTime`]: eventInfo.videoTime,
                [`${baseUri}/volume`]: eventInfo.currentVolume
            };
            this.sendStatement(eventInfo);
            console.log('change volume', eventInfo);
        });

        html5Player.addEventListener('ratechange', (e) => {
            const eventInfo = getEventInfo();
            eventInfo.verb = 'changed_playrate';
            eventInfo.extensions = {
                [`${baseUri}/playerTime`]: eventInfo.videoTime,
                [`${baseUri}/playRate`]: eventInfo.currentRate
            };
            this.sendStatement(eventInfo);

            //eventInfo.previousSpeed = this.previousRate;
            //eventInfo.currentSpeed = eventInfo.currentRate;
            console.log('changed_playrate', eventInfo);
            //this.previousRate = eventInfo.currentRate;
        });

        document.addEventListener('visibilitychange', (e) => {
            const eventInfo = getEventInfo();

            if (document.visibilityState === 'visible') {
                eventInfo.verb = 'resumed';
                eventInfo.extensions = {
                    [`${baseUri}/playerTime`]: eventInfo.videoTime
                };
                this.sendStatement(eventInfo);
                console.log('resumed');
            }
            else {
                eventInfo.verb = 'suspended';
                eventInfo.extensions = {
                    [`${baseUri}/playerTime`]: eventInfo.videoTime
                };
                this.sendStatement(eventInfo);
                console.log('suspended');
            }

        });

        window.addEventListener('beforeunload', (e) => {
            const eventInfo = getEventInfo();

            eventInfo.verb = 'closed_video';
            eventInfo.extensions = {
                [`${baseUri}/playerTime`]: eventInfo.videoTime
            };
            this.sendStatement(eventInfo, true);
            console.log('closed_video');
        });
    }
}

Polymer(PrendusVideoComponent);
