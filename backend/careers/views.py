from django.shortcuts import render
from .models import JobApplication
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.mail import EmailMessage,send_mail
from django.conf import settings

# Create your views here.
def job_apply_page(request):
    return render(request,'careers/apply.html')

def apply_job_view(request):
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
            return JsonResponse({"success":False,"message": "Name is required"}, status=400)

        if not email:
            return JsonResponse({"success":False,"message": "Email is required"}, status=400)

        if not mobile:
            return JsonResponse({"success":False,"message": "Mobile number is required"}, status=400)

        if not experience:
            return JsonResponse({"success":False,"message": "Experience is required"}, status=400)

        if not resume:
            return JsonResponse({"success":False,"message": "Resume file is required"}, status=400)
        
        # Choice validation (VERY IMPORTANT)
        valid_experience = [choice[0] for choice in JobApplication.EXPERIENCE_CHOICES]
        if experience not in valid_experience:
            return JsonResponse({"success":"false","message": "Invalid experience value"}, status=400)

        # File type validation
        if not resume.name.lower().endswith('.pdf'):
            return JsonResponse({"success":False,"error": "Only PDF resumes are allowed"}, status=400)
        
        # Save valid data
        job=JobApplication.objects.create(
            name=name,
            email=email,
            mobile=mobile,
            experience=experience,
            resume=resume
        )
        
        msg = EmailMessage(
                    subject="New Job Application Received",
                    body=f"""
                Name: {name}
                Email: {email}
                Mobile: {mobile}
                Experience: {experience}
                """,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[settings.EMAIL_HOST_USER],
                )

        # Attach the PDF resume
        msg.attach_file(job.resume.path)

        msg.send(fail_silently=False)
        
        send_mail(
        subject="We received your message | LogicMotive",
        message=(
            f"Hi {name},\n\n"
            "Thank you for applying to LogicMotive.\n\n"
            "We have received your application and one of our consultants "
            "will contact you within 1 business day.\n\n"
            "If you did not submit any job application, please ignore this email.\n\n"
            "Best regards,\n"
            "LogicMotive Team\n"
            "https://logicmotive.in"
        ),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],  # USER email
        fail_silently=False,
        )

        return JsonResponse({"success":True,"message": "application submitted"}, status=201)