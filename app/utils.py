from django.utils.html import strip_tags

from app.models import FileType, Genre, Album, Artist, Permissions, Groups


# Split a table in 4 table of equal size
def splitTable(table):
    if len(table) % 4 == 0:
        chunkSize = int(len(table) / 4)
    else:
        chunkSize = int(len(table) / 4) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


# Split a table in x tables of equal size
def splitTableCustom(table, number):
    if len(table) % number == 0:
        chunkSize = int(len(table) / number)
    else:
        chunkSize = int(len(table) / number) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


# Format for vorbis tags
def processVorbisTag(tag):
    tag = strip_tags(tag)
    tag = tag[2:]
    tag = tag[:-2]
    return tag


# Return a readable time code for a time code
def timeCodeToString(timestamp):
    return str(timestamp.day).zfill(2) + "/" + str(timestamp.month).zfill(2) + \
           "/" + str(timestamp.year) + " - " + str(timestamp.hour) + ":" + \
           str(timestamp.minute)


# Generate the base of any status message
def errorCheckMessage(isDone, error):
    errorTitle = ""
    errorMessage = ""

    if error is None:
        errorTitle = "null"
        errorMessage = "null"

    elif error == "badFormat":
        errorTitle = "Wrong format"
        errorMessage = "The server didn't understood what you said."

    elif error == "badRequest":
        errorTitle = "Bad request"
        errorMessage = "The server didn't expected this request."

    elif error == "dbError":
        errorTitle = "Database error"
        errorMessage = "Something went wrong with the database."

    elif error == "fileNotFound":
        errorTitle = "No such file"
        errorMessage = "The server didn't find the file you asked."

    elif error == "dirNotFound":
        errorTitle = "No such directory"
        errorMessage = "The server didn't find the directory you asked."

    elif error == "emptyLibrary":
        errorTitle = "The library is empty"
        errorMessage = "There is no file to add in the library"

    elif error == "coverError":
        errorTitle = "Can't create file"
        errorMessage = "The server cannot generate the file for the covers, check the permissions."

    elif error == "permissionError":
        errorTitle = "Not permitted"
        errorMessage = "You are not allowed to do this."

    elif error == "rescanError":
        errorTitle = "Library isn't ready"
        errorMessage = "Another scan is running in background, be a little more patient"

    elif error == "noHistory":
        errorTitle = "Your history is empty"
        errorMessage = "Can't go backward if you never played any song!"

    elif error == "noSameArtist":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track by the same artist"

    elif error == "noSameGenre":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same genre"

    elif error == "noSameAlbum":
        errorTitle = "No results were found"
        errorMessage = "Can't find any track with the same album"

    elif error == "syncthingError":
        errorTitle = "Fail to communicate with syncthing"
        errorMessage = "Check if syncthing is running correctly"

    elif error == "userDeleteError":
        errorTitle = "Can't delete this user"
        errorMessage = "You can't delete your own account if you are admin"

    elif error == "noStats":
        errorTitle = "Can't display stats"
        errorMessage = "Use the application for generating stats"

    elif error == "badFileName":
        errorTitle = "The filename is invalid"
        errorMessage = "Change the filename if you want to upload it"

    elif error == "fileExists":
        errorTitle = "File already exists"
        errorMessage = "The file you want to upload exists already"

    elif error == "valueError":
        errorTitle = "Wrong value"
        errorMessage = "The value wasn't expected"

    elif error == "dNdError":
        errorTitle = "The drag and drop hasn't been setup"
        errorMessage = "The administrator didn't configured correctly the buffer folder"

    elif error == "formatError":
        errorTitle = "The format provided doesn't have support"
        errorMessage = "We don't supports this extension"

    elif error == "downloadLimit":
        errorTitle = "You maximum download limit reached"
        errorMessage = "Select less tracks and try again"

    elif error == "dirCreationError":
        errorTitle = "Can't create a folder"
        errorMessage = "The application can't create a folder contact the administrator"

    return {
        'DONE': isDone,
        'ERROR_H1': "" + errorTitle + "",
        'ERROR_MSG': "" + errorMessage + "",
    }


# Create the file type entry
def populateDB():
    if FileType.objects.all().count() == 0:
        print("Created files types")
        FileType(name="mp3").save()
        FileType(name="ogg").save()
        FileType(name="flac").save()
        FileType(name="wav").save()
    if Artist.objects.all().count() == 0:
        print("Created default artist")
        Artist(name=None).save()
    if Album.objects.all().count() == 0:
        print("Created default album")
        Album(title=None).save()
    if Genre.objects.all().count() == 0:
        print("Created default genre")
        Genre(name=None).save()
    if Permissions.objects.all().count() == 0:
        print("Creating default permission")
        Permissions(name="Login", code="LOGI").save()
        Permissions(name="Music listening", code="PLAY").save()
        Permissions(name="Wish creation", code="WISH").save()
        Permissions(name="Tag submission", code="")
        Permissions(name="Tag edition", code="TAGE").save()
    if Groups.objects.all().count() == 0:
        print("Creating the defaults groups")
        Groups(name="Naab", rank=0).save()
        Groups(name="User", rank=1).save()
        Groups(name="Moderator", rank=2).save()
        Groups(name="Admin", rank=3).save()
        Groups(name="Root", rank=4).save()
