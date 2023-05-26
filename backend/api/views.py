from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.gis.geos import Point

from api.models import PathGeometry, Contributor, Submission, ExerciseType
from api.serializers import PathReadSerializer, PathWriteSerializer, ContributorListSerializer, SubmissionListSerializer, ExerciseTypeListSerializer, SubmissionWriteSerializer


class GetActivePath(APIView):
    def get(self, request):
        active_path = PathGeometry.objects.filter(is_active=True)
        if len(active_path) > 1:
            return Response(
                data="There is more than one active path. Please deactivate one.",
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = PathReadSerializer(active_path, many=True)
        return Response(data=serializer.data)

    def post(self, request):
        serializer = PathWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
class GetContributors(APIView):
    def get(self, request):
        contributors = Contributor.objects.all().order_by('name').values()
        serializer = ContributorListSerializer(contributors, many=True)
        return Response(serializer.data)
    
class GetExerciseTypes(APIView):
    def get(self, request):
        exercises = ExerciseType.objects.all().order_by('type').values()
        serializer = ExerciseTypeListSerializer(exercises, many=True)
        return Response(serializer.data)
    
class SubmissionsView(APIView):
    def get(self, request):
        active_path = PathGeometry.objects.filter(is_active=True)
        submissions = Submission.objects.filter(path=active_path[0])
        serializer = SubmissionListSerializer(submissions, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        request.data["distance"] = self.get_distance(request.data)
        request.data["ending_coords"] = self.get_ending_coords()
        serializer = SubmissionWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def get_distance(self, data):
        if (data["duration"]):
            exercise = ExerciseType.objects.get(id=data["exercise_type"])
            if (exercise.to_miles_conversion):
                return data["duration"] * exercise.to_miles_conversion
            total_calories = data["duration"] * exercise.calories_per_min
            # assuming a walking pace of 15 min/mi
            walking_cal_per_min = 7.1
            return total_calories / walking_cal_per_min
        return data["distance"]
    
    def get_ending_coords(self):
        # TODO #9: Replace with real calculations
        return Point([33.359897, 43.505859])
