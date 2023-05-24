from django.contrib.gis.db import models as gisModels
from django.db import models

COLOR_CHOICES = (
    ("#D32A0E", "Red"),
    ("#2CD30E", "Green"),
    ("#64BAF5", "Blue"),
    ("#F050CE", "Pink"),
    ("#AC50F0", "Purple"),
    ("#50F0EE", "Turquoise"),
    ("#F0EE50", "Yellow"),
    ("#139713", "Forest Green"),
    ("#132B97", "Dark Blue"),
    ("#BF166A", "Dark Pink"),
    ("#787677", "Gray"),
    ("#000000", "Black"),
    ("#DC35ED", "Purple Pink"),
    ("#C0ED35", "Lime Green"),
    ("#FB9111", "Orange")
)

class PathGeometry(gisModels.Model):
    name = gisModels.CharField()
    geometry = gisModels.GeometryField(srid=4326)
    centroid = gisModels.PointField(srid=4326, null=True)
    is_active = gisModels.BooleanField(default=False)

class Contributor(models.Model):
    name = models.CharField()
    user_color = models.CharField(max_length=20, choices=COLOR_CHOICES)

    def __str__(self):
        return self.name

class ExerciseType(models.Model):
    # Not all activities (eg walking, running) don't need to be converted at all
    # Those that do can be either given a value for converting straight to miles
    # or calories burned to then be converted to miles
    # to_miles_conversion is in miles/min
    type = models.CharField(max_length=50)
    needs_conversion = models.BooleanField(default=True)
    to_miles_conversion = models.FloatField(null=True)
    calories_per_min = models.IntegerField(null=True)

    def __str__(self):
        return self.type

class Submission(gisModels.Model):
    contributor_id = gisModels.ForeignKey(Contributor, on_delete=gisModels.CASCADE)
    date = gisModels.DateField(auto_now_add=True)
    exercise_type = gisModels.ForeignKey(ExerciseType, on_delete=gisModels.CASCADE)
    duration = gisModels.FloatField(null=True)
    distance = gisModels.FloatField()
    ending_coords = gisModels.PointField(srid=4326)
    last_checkpoint = gisModels.IntegerField()
    path = gisModels.ForeignKey(PathGeometry, on_delete=gisModels.CASCADE)