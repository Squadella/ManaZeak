from django.urls import path

from app.src.views.genericViews import GenericViews

app_name = 'app'

## The modals URLS.
urlpatterns = [
    # FIXME: remove the S
    path('userMenu/', GenericViews.userMenuContext, name='userMenu'),
    path('changeView/', GenericViews.changeViewContext, name='userMenu'),
    path('newLibrary/', GenericViews.newLibraryModal, name='newLibraryModal'),
    path('userID/', GenericViews.userIDModal, name='userIDModal'),
    path('tapBpm/', GenericViews.tapBpmModal, name='tapBpmModal'),
    path('about/', GenericViews.aboutModal, name='aboutModal'),
]