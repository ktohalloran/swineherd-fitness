from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from api.models import PathGeometry, Contributor, Submission, ExerciseType
from api.serializers import PathReadSerializer, PathWriteSerializer, ContributorListSerializer, SubmissionListSerializer, ExerciseTypeListSerializer


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
    
class GetSubmissions(APIView):
    def get(self, request):
        active_path = PathGeometry.objects.filter(is_active=True)
        submissions = Submission.objects.filter(path=active_path[0])
        serializer = SubmissionListSerializer(submissions, many=True)
        return Response(serializer.data)
