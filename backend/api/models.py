from django.contrib.gis.db import models

class PathGeometry(models.Model):
    name = models.CharField()
    geometry = models.GeometryField(srid=4326)
    centroid = models.PointField(srid=4326, null=True)
    is_active = models.BooleanField(default=False)
