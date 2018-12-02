from django.contrib.auth.models import User
from django.db import models

from app.models.security import Group, InviteCode


## This class describes the global parameters of the application
class ApplicationConfiguration(models.Model):
    ## Toggle if an invitation code is needed for the login
    inviteCodeEnabled = models.BooleanField(default=False)
    ## The default group of a new user
    defaultGroup = models.ForeignKey(Group, on_delete=models.CASCADE, null=True)


## This class stores the preferences and the information about a user.
class UserSetting(models.Model):
    ## The invite code of the user.
    inviteCode = models.ForeignKey(InviteCode, on_delete=models.CASCADE, null=True)
    ## The groups of the user
    groups = models.ManyToManyField(Group)
    ## The user linked to the preferences
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ## The path to the avatar of the user.
    avatar = models.FilePathField(default='/defaultimgpath')  # FIXME : mettre un vrai chemin
    ## The invite code the user used to create an account
    usedInviteCode = models.ForeignKey(InviteCode, on_delete=models.CASCADE, null=True, related_name='used_invite_code')
    ## The language the user choosed
    language = models.CharField(max_length=5, null=True)
