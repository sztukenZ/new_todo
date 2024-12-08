from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)  # Tytuł zadania
    completed = models.BooleanField(default=False)  # Status ukończenia
    created_at = models.DateTimeField(auto_now_add=True)  # Data utworzenia

    def __str__(self):
        return self.title