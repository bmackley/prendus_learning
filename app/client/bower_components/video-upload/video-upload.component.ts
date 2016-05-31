class VideoUploadComponent {

    public is;
    public properties;

    beforeRegister() {
        this.is = 'prendus-video-upload';
        this.properties = {
            uploaded: {
                type: Boolean,
                observer: 'uploadedHandler'
            }
        };
    }

    uploadClick() {
        const name = this.$.nameInput.value;
        const url = this.$.urlInput.value;

        this.fire('uploadclick', {
            name,
            url
        }, {
            bubbles: false
        });
    }

    uploadedHandler(newValue, oldValue) {
        this.$.uploadedToast.open();
    }

    updateSrc() {
        const inputUrl = this.$.urlInput.value;
        this.url = inputUrl;
    }
}

Polymer(VideoUploadComponent);
