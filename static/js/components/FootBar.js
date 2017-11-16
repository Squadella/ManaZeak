/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  PlaylistBar class - handle the playlist bar                                        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var FootBar = function() {

    this.footBar = document.createElement("DIV");

    this.controlsContainer = document.createElement("DIV");
    this.progressContainer = document.createElement("DIV");

    this.footBar.id = "footBar";
    this.controlsContainer.id = "controlsContainer";

    //this.trackPreview    = new TrackPreview();
    this.controls        = new Controls(this.controlsContainer);
    this.playlistPreview = new PlaylistPreview(this.footBar);

    this.footBar.appendChild(this.controlsContainer);
    this.progressBar = new ProgressBar(this.controlsContainer);

    this._init();
};


FootBar.prototype = {

    _init: function() {

        this._eventListener();
    },


    _eventListener: function() {

        var that = this;
        window.app.addListener('togglePlay', function() {
            if(window.app.player.getIsPlaying())
                that.progressBar.startRefreshInterval(window.app.player);
            else
                that.progressBar.stopRefreshInterval();
        });

        window.app.addListener('stopPlayback', function() {
            that.progressBar.stopRefreshInterval();
            that.progressBar.resetProgressBar();
        });

        window.app.addListener(['fastForward', 'rewind'], function() {
            that.progressBar.updateProgress(window.app.player);
        });

    },

    getFootBar: function() { return this.footBar; }
};
