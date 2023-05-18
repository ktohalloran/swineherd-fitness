from rest_framework_gis import serializers as gis_serializers
from django.contrib.gis.geos import GEOSGeometry
import json


from api.models import PathGeometry


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
