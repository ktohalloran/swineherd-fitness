from rest_framework_gis import serializers as gis_serializers
from rest_framework import serializers
from django.contrib.gis.geos import GEOSGeometry
import json


from api.models import PathGeometry, Contributor, Submission, ExerciseType


class PathReadSerializer(gis_serializers.GeoFeatureModelSerializer):
    class Meta:
        model = PathGeometry
        geo_field = "geometry"
        exclude = ["centroid"]
        id_field = False


class PathWriteSerializer(gis_serializers.GeoFeatureModelSerializer):
    class Meta:
        model = PathGeometry
        geo_field = "geometry"
        exclude = ["centroid"]
        id_field = False

    def to_internal_value(self, data):
        geo_data = str(json.dumps(data["geometry"]["geometry"]))
        data["geometry"] = GEOSGeometry(geo_data)
        return data

class ContributorListSerializer(serializers.Serializer):
    class Meta:
        model = Contributor
        fields = ('__all__')
    
    name = serializers.CharField()
    color = serializers.CharField(source="user_color")

class ExerciseTypeListSerializer(serializers.Serializer):
    class Meta: 
        model = ExerciseType
        fields = ("type")
    
    type = serializers.CharField()

class SubmissionListSerializer(gis_serializers.GeoFeatureModelSerializer):
    class Meta:
        model = Submission
        geo_field = "ending_coords"
        exclude = ["path"]
        id_field = False