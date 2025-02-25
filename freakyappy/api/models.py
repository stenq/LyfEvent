from django.db import models


from django.contrib.auth.models import User





class Event(models.Model):
    host=models.ForeignKey(User,on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255,verbose_name="Event Title")
    description = models.TextField(verbose_name="Event Description")
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    capacity = models.IntegerField(verbose_name="Event Capacity",blank=False)
    category = models.CharField(max_length=50, verbose_name="Event Category")
    image = models.ImageField(upload_to="event_images", blank=True, null=True, default="event_images/default.jpg")
    participants = models.ManyToManyField(User, related_name="joined_event", blank=True)
    date = models.DateTimeField(verbose_name="Event Date")
    location = models.CharField(max_length=255, verbose_name="Event Location")

   
    def __str__(self):
        return f"{self.title} - Event"
    
    def has_space(self):
        return self.participants.count() < self.maxPeople

    def is_user_joined(self, user):
        return self.participants.filter(id=user.id).exists()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    def __str__(self):
        return self.user.username