# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lead
import json

@csrf_exempt
def contact_view(request):
    if request.method != 'POST':
        return JsonResponse({"error":"Invalid request method (only POST allowed)"},status=400)
    
    try:
        raw_body = request.body.decode("utf-8")
        data=json.loads(raw_body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    #extract fields
    name = data.get('name')
    email = data.get('email')
    mobile = data.get('mobile')
    company = data.get('company')
    service = data.get('service')
    message = data.get('message')
    #required field validation
    if not name:
        return JsonResponse({"error": "Name is required"}, status=400)

    if not email:
        return JsonResponse({"error": "Email is required"}, status=400)

    if not mobile:
        return JsonResponse({"error": "Mobile number is required"}, status=400)

    if not company:
        return JsonResponse({"error": "Company is required"}, status=400)

    if not message:
        return JsonResponse({"error": "Message is required"}, status=400)
    
    # Choice validation
    valid_services=[]
    for choice in Lead.SERVICE_CHOICES:
        valid_services.append(choice[0])
        
    if service not in valid_services:
        return JsonResponse({"error": "Invalid service selected"}, status=400)
    
    # Saves only VALID data
    Lead.objects.create(
        name=name,
        email=email,
        mobile=mobile,
        company=company,
        service=service,
        message=message
    )
    return JsonResponse({"status": "success"}, status=201)
