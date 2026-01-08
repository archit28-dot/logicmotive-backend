from django.shortcuts import render
from .models import JobApplication
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
# Create your views here.
@csrf_exempt
def apply_job(request):
    if request.method != "POST":
        return JsonResponse({"error":"Invalid request method"})
    else:
        # Extract form fields
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        experience = request.POST.get('experience')
        resume = request.FILES.get('resume')
        # Required field validation
        if not name:
            return JsonResponse({"error": "Name is required"}, status=400)

        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)

        if not mobile:
            return JsonResponse({"error": "Mobile number is required"}, status=400)

        if not experience:
            return JsonResponse({"error": "Experience is required"}, status=400)

        if not resume:
            return JsonResponse({"error": "Resume file is required"}, status=400)
        # Choice validation (VERY IMPORTANT)
        valid_experience = [choice[0] for choice in JobApplication.EXPERIENCE_CHOICES]
        if experience not in valid_experience:
            return JsonResponse({"error": "Invalid experience value"}, status=400)

        # File type validation
        if not resume.name.lower().endswith('.pdf'):
            return JsonResponse({"error": "Only PDF resumes are allowed"}, status=400)
        
        # Save valid data
        JobApplication.objects.create(
            name=name,
            email=email,
            mobile=mobile,
            experience=experience,
            resume=resume
        )

        return JsonResponse({"status": "application submitted"}, status=201)