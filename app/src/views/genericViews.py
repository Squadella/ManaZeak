from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


## this class is used for rendering all the templates in the application
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
    ## Send the user ID HTML template
    #   @param request request given by the front
    #   @return the new library template
    def userIDModal(request):
        return render(request, 'modals/userID.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the user ID HTML template
    #   @param request request given by the front
    #   @return the new library template
    def tapBpmModal(request):
        return render(request, 'modals/tapBpm.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the about modal
    #   @param request request given by the front
    #   @return the about template
    def aboutModal(request):
        return render(request, 'modals/about.html')

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the about modal
    #   @param request request given by the front
    #   @return the suggestion template
    def suggestionModal(request):
        return render(request, 'modals/suggestion.html')\

    @staticmethod
    @login_required(redirect_field_name='', login_url='app:login')
    ## Send the about modal
    #   @param request request given by the front
    #   @return the album cover template
    def jumboImageModal(request):
        return render(request, 'modals/jumboimage.html')

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
    def getMzkWorldMapPage(request):
        return render(request, 'views/plugins/mzkWorldMapPage.html')\

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getMzkVisualizerPage(request):
        return render(request, 'views/plugins/mzkVisualizerPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getLibraryPage(request):
        return render(request, 'views/libraryPage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAdminPage(request):
        return render(request, 'views/admin/adminpage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAdminOverviewPage(request):
        return render(request, 'views/admin/views/adminoverviewpage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAdminDatabasePage(request):
        return render(request, 'views/admin/views/admindatabasepage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAdminUserPage(request):
        return render(request, 'views/admin/views/adminuserpage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getAdminSuggestionPage(request):
        return render(request, 'views/admin/views/adminsuggestionpage.html')

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getCommunityPage(request):
        return render(request, 'views/community/communitypage.html')\

    @staticmethod
    @login_required(redirect_field_name='login.html', login_url='app:login')
    def getUserHubPage(request):
        return render(request, 'views/community/userhubpage.html')
