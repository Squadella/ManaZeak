from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


## this class is used fir rendering all the templates in the application
class GenericViews(object):

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Log out the user
    #   @param request request given by the front
    #   @return the login page
    def logoutView(request):
        logout(request)
        return redirect('app:login')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the new library HTML template
    #   @param request request given by the front
    #   @return the new library template
    def newLibraryModal(request):
        return render(request, 'modals/newLibrary.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the user menu context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def userMenuContext(request):
        return render(request, 'contexts/userMenuContext.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the change view context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def changeViewContext(request):
        return render(request, 'contexts/changeViewContext.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the change view context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def trackContext(request):
        return render(request, 'contexts/trackContext.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the queue context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def queueContext(request):
        return render(request, 'contexts/queueContext.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    ## Send the change view context HTML template
    #   @param request request given by the front
    #   @return the user menu template
    def playbackRateContext(request):
        return render(request, 'contexts/PlaybackRateContext.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getMainPage(request):
        return render(request, 'views/mainPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getPartyPage(request):
        return render(request, 'views/partyPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getLibraryPage(request):
        return render(request, 'views/libraryPage.html')

    # New url to process
    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleArtistPage(request):
        return render(request, 'views/singleObject/singleArtistPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleAlbumPage(request):
        return render(request, 'views/singleObject/singleAlbumPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getSingleGenrePage(request):
        return render(request, 'views/singleObject/singleGenrePage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllArtistsPage(request):
        return render(request, 'views/tags/allArtistsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllAlbumsPage(request):
        return render(request, 'views/tags/allAlbumsPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAllGenresPage(request):
        return render(request, 'views/tags/allGenresPage.html')
