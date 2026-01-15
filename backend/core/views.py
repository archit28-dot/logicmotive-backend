from django.shortcuts import render

# Create your views here.
def home_page(request):
    return render(request,'home.html')

def about_page(request):
    return render(request,'core/about.html')

def product_page(request):
    return render(request,'core/product.html')

def service_page(request):
    return render(request,'core/services.html')