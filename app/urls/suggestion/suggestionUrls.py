from django.urls import path

from app.src.services.suggestion.suggestionService import SuggestionService

app_name = 'app'

urlpatterns = [
    ## Create a suggestion
    path('create/', SuggestionService.createSuggestion, name='createSuggestion'),
    ## Get the suggestion of the current user
    path('get/', SuggestionService.getUserSuggestions, name='getSuggestions'),
    ## Get all the suggestions.
    path('getAll/', SuggestionService.getAllSuggestion, name='getAllSuggestions'),
]
