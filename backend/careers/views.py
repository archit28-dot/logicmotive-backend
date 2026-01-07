from django.shortcuts import render
from .models import JobApplication
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# Create your views here.
@csrf_exempt
def apply_job(request):
    if request.POST:
        name=request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        experience = request.POST.get('experience')
        resume = request.FILES.get('resume')
        JobApplication.objects.create(
            name=name,
            email=email,
            mobile=mobile,
            experience=experience,
            resume=resume
        )
        return JsonResponse({"status":"Application submitted"})
    return JsonResponse({"error":"Invalid request"}, status=400)