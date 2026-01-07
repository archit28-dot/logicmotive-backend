from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lead
import json

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        Lead.objects.create(
            name=data.get('name'),
            email=data.get('email'),
            mobile=data.get('mobile'),
            company=data.get('company'),
            service=data.get('service'),
            message=data.get('message'),
        )

        return JsonResponse({"status": "success"})

    return JsonResponse({"error": "Invalid request"}, status=400)
