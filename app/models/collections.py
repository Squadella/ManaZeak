from django.contrib.auth.models import User
from django.db import models
from django.db.models import DO_NOTHING

from app.models import Track, TrackInScopeStats


## This class describes the playlists in the database.
class Playlist(models.Model):
    ## The name of the playlist
    name = models.CharField(max_length=100, default='Playlist')
    ## The tracks contained in the playlist
    tracks = models.ManyToManyField(Track)
    ## The total listening time of the playlist
    listeningTime = models.IntegerField()
    ## If the playlist is a library
    isLibrary = models.BooleanField()
    ## If the playlist is public
    isPublic = models.BooleanField()
    ## The owner of the playlist
    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    ## The description of the playlist
    description = models.CharField(max_length=5000, null=True)
    ## The picture of the playlist
    picture = models.URLField(max_length=1000, null=True)
    ## Stat of the genre
    stat = models.ForeignKey(TrackInScopeStats, on_delete=DO_NOTHING, null=True)


## This class describes a library.
class Library(models.Model):
    ## The library path.
    path = models.FilePathField(max_length=1000)
    ## The playlist associated to the library.
    playlist = models.ForeignKey(Playlist, on_delete=models.DO_NOTHING, null=True)


## This class is used to get the information about a library when the scan or the rescan takes place.
class LibraryScanStatus(models.Model):
    ## The total track to scan.
    totalTracks = models.IntegerField()
    ## The tracks that have been scanned by the algorithm.
    processedTrack = models.IntegerField()
    ## If the library has been scanned
    isScanned = models.BooleanField()
    ## The associated library
    library = models.ForeignKey(Library, on_delete=models.DO_NOTHING)
