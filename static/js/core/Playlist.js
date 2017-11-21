/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                     *
 *  Playlist class - Allow multiple tracks manipulation                                *
 *                                                                                     *
 *  id         : integer      - the playlist ID in db                                  *
 *  newLibrary : boolean      - true means user wants to create a new library,         *
 *                              false means that user wants to load existing playlist  *
 *  cookies    : DOM Obj      - user cookies                                           *
 *  tracks     : Array[Track] - Playlist tracks                                        *
 *  callback   : function     - function to call after _fillTrack on newLibrary        *
 *                                                                                     *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//TODO: get shuffle and repeat from server
var Playlist = function(id, name, isLibrary, isLoading, rawTracks, callback) {

    // NewLibrary relative attributes, useless (if isLibrary = false && isLoading = false)
    this.ui = {
        infoLabel: null,
        name:      null,
        path:      null,
        convert:   null,
        scan:      null
    };
    this.scanModal = null;


    // Playlist internal attributes
    this.id = id;
    this.name = name;
    this.isLibrary = isLibrary;
    this.isLoading = isLoading;
    this.isShuffle = false;
    this.isRepeat  = false;

    //TODO: fix this
    if (typeof rawTracks !== 'undefined') {
        this.rawTracks = rawTracks;
    } else {
        this.rawTracks = [];
    }
    if (typeof callback !== 'undefined') {
        this.callback = callback;
    } else {
        this.callback = null;
    }

    // Boolean to add to know if tracks are set or not
    this.tracks = [];
    this.currentTrack = 0;
    this.getTracksIntervalId = -1; // Interval id for _getTracksFromServer_aux


    this.trackTotal    = 0;
    this.artistTotal   = 0;
    this.albumTotal    = 0;
    this.durationTotal = 0;

    var viewkeys = Object.keys(window.app.availableViews);
    this.views = new Array(viewkeys.length).fill(null);
    this.activeView = window.app.availableViews[viewkeys[0]];

    this._init(); // Playlist initialization
};

Playlist.prototype = {

    _init: function() {
        //if (typeof rawTracks === undefined) { return; }

        if (this.isLoading) {
            if (this.isLibrary) { this._loadLibrary(); } // Library loading process
        }
        else {
            if (this.isLibrary) { this._newLibrary(); } // Library creation process
        }
    },


    /*  Library creation and loading  */

    _loadLibrary: function() {
        this._fillTracks(this.rawTracks);
    },


    _newLibrary: function() {
        this.isLibrary = true;
        var that = this;

        JSONParsedGetRequest(
            "components/newLibrary",
            true,
            function(response) { // TODO : create modals of procedure
                // TODO : test response to see if it's html or void
                document.getElementById("mainContainer").insertAdjacentHTML('beforeend', response);

                that.ui.infoLabel   = document.getElementById("infoLabel");
                that.ui.name        = document.getElementById("name");
                that.ui.path        = document.getElementById("path");
                that.ui.convert     = document.getElementById("convert");
                that.ui.scan        = document.getElementById("scan");

                // TODO : Typography style to set - Replace newLibrary bool by radiobox (must disapear in the end)

                that.ui.infoLabel.innerHTML = "Welcome! Fill the path with your library's one, name it and let the magic begin!" +
                    "<br><br>Some additionnal features are waiting for you if your library is synced with other devices, using " +
                    "<a href=\"http://syncthing.net\" target=\"_blank\">SyncThing</a>.<br><br>Check out the " +
                    "<a href=\"https://github.com/Squadella/ManaZeak\" target=\"_blank\">read me</a> to know more about it.";
                // TODO : remove path input depending on radioBox

                that.ui.scan.addEventListener("click", that._checkInputs.bind(that));
            }
        );
    },


    _checkInputs: function() {
        if (this.ui.name.value !== '' && this.ui.path.value !== '') {
            this._requestNewLibrary();
            // TODO : remove ui.scan listener
        }

        else {
            if (this.ui.name.value !== '') {
                this.ui.path.style.border = "solid 1px red";
                new Notification("Path field is empty.", "You must specify the path of your library.");
            }

            else if (this.ui.path.value !== '') {
                this.ui.name.style.border = "solid 1px red";
                new Notification("Name field is empty.", "You must give your library a name.");
            }

            else {
                this.ui.path.style.border = "solid 1px red";
                this.ui.name.style.border = "solid 1px red";
                new Notification("Both fields are empty.", "You must fill both fields to create a new library.");
            }
        }
    },


    _requestNewLibrary: function() {
        var that = this;

        JSONParsedPostRequest(
            "ajax/newLibrary/",
            JSON.stringify({
                CONVERT: this.ui.convert.checked,
                NAME:    this.ui.name.value,
                URL:     this.ui.path.value
            }),
            function(response) {
                /* response = {
                 *     DONE:       bool
                 *     LIBRARY_ID: int or undefined
                 *     ERROR_H1:   string
                 *     ERROR_MSG:  string
                 * } */
                if (response.DONE) {
                    that.name = that.ui.name.value;
                    that.scanModal = new Modal("scanLibrary");
                    that.scanModal.open();
                    that.id = response.LIBRARY_ID;
                    that._initialLibraryScan(response.LIBRARY_ID);
                }

                else {
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _initialLibraryScan: function(libraryId) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/initialScan/",
            // "{\"LIBRARY_ID\":" + libraryId + "}", TODO : test this
            JSON.stringify({
                LIBRARY_ID: libraryId
            }),
            function(response) {
                /* response = {
                 *     DONE:        bool
                 *     PLAYLIST_ID: int or undefined
                 *     ERROR_H1:    string
                 *     ERROR_MSG:   string
                 * } */
                if (response.DONE) {
                    that._getTracksFromServer(response.PLAYLIST_ID);
                }

                else {
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    _getTracksFromServer: function(playlistId) {
        var that = this;

        this.getTracksIntervalId = setInterval(function() {
            that._getTracksFromServer_aux(playlistId);
        }, 20000); // every 20s
    },


    _getTracksFromServer_aux: function(playlistId) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/checkLibraryScanStatus/",
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                /* response = {
                 *     DONE:        bool
                 *     ERROR_H1:    string
                 *     ERROR_MSG:   string
                 * } */
                var self = that;

                clearInterval(that.getTracksIntervalId);
                that.getTracksIntervalId = -1;

                if (response.DONE) {
                    JSONParsedPostRequest(
                        "ajax/getSimplifiedTracks/",
                        JSON.stringify({
                            PLAYLIST_ID: playlistId
                        }),
                        function(response) {
                            // response = raw tracks JSON object
                            self.rawTracks = response;
                            self.scanModal.close();
                            self._fillTracks(self.rawTracks);
                            self.refreshViews();
                            self.showView(self.activeView);

                            if (self.callback) {
                                self.callback();
                            }
                        }
                    );
                }
                else if (response.ERROR_H1 === "null") {
                    // TODO : refresh UI to come back to Library/Playlist creation
                    new Notification(response.ERROR_H1, response.ERROR_MSG);
                }
            }
        );
    },


    getPlaylistsTracks: function(playlistId, callback) {
        var that = this;

        JSONParsedPostRequest(
            "ajax/getSimplifiedTracks/",
            JSON.stringify({
                PLAYLIST_ID: playlistId
            }),
            function(response) {
                // response = raw tracks JSON object
                that.rawTracks = response;
                that._fillTracks(that.rawTracks);
                that.refreshViews();
                that.showView(that.activeView);
                callback();
            }
        );
    },


    /* Class utilities */

    _fillTracks: function(tracks) {
        for (var i = 0; i < tracks.length ;++i) {
            ++this.trackTotal;
            this.durationTotal += tracks[i].DURATION;

            this.tracks.push(new Track(tracks[i]));
        }
    },


    playNextTrack: function() {
        var that = this;

        if (this.isShuffle) {
            JSONParsedPostRequest(
                "ajax/randomNextTrack/",
                JSON.stringify({
                    PLAYLIST_ID: that.id
                    // TODO: send isRepeat here
                }),
                function(response) {
                    // TODO : make controller function in App.controller
                    // that.currentTrack = response.TRACK_ID; // TODO : get track ID from serv heres
                    //window.app.trackPreview.setVisible(true);
                    //window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], response.COVER);
                    //window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        } else {
            this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
            window.app.changeTrack(this.tracks[this.currentTrack]);
        }
    },


    playPreviousTrack: function() {
        var that = this;

        if (this.isShuffle) {
            //TODO: Get from server history
            JSONParsedPostRequest(
                "ajax/randomNextTrack/",
                JSON.stringify({
                    PLAYLIST_ID: that.id
                    // TODO: send isRepeat here
                }),
                function(response) {
                    // that.currentTrack = response.TRACK_ID; // TODO : get track ID from serv heres

                    window.app.trackPreview.setVisible(true);
                    //window.app.trackPreview.changeTrack(that.tracks[that.currentTrack], response.COVER);
                    //window.app.topBar.changeMoodbar(that.currentTrack);
                    window.app.player.changeTrack("../" + response.PATH);
                }
            );
        } else {
            this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
            window.app.changeTrack(this.tracks[this.currentTrack]);
        }
    },


    activate: function() {
        window.app.activePlaylist = this;
        this.showView(window.app.availableViews.LIST);
    },

    showView: function(viewType) {
        var v = this.views[viewType.index];
        if(v === null) {
            this.views[viewType.index] = new viewType.class(viewType.class.prototype.getDataFromPlaylist(this));
            v = this.views[viewType.index];
        }
        v.show();
        this.activeView = v;
    },

    refreshViews: function() {
        for(var i = 0; i < this.views.length; ++i)
            if(this.views[i] !== null)
                this.views[i].init(this.views[i].getDataFromPlaylist(this));
    },

    setCurrentTrack: function(track) {
        for (var i = 0; i < this.tracks.length ;++i) {
            if (this.tracks[i].id === track.id) {
                this.currentTrack = i;
            }
        }
    },

    // Class Getters and Setters
    getId: function()         { return this.id;        },
    getTracks: function()     { return this.tracks;    },
    getName: function()       { return this.name;      },
    getIsLibrary: function()  { return this.isLibrary; },

    setName: function(name)   { this.name = name;      }
};