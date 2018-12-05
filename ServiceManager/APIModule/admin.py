from django.contrib import admin

# Modified code
from .models import service, connecting_service#, service_input_requirement, service_output_requirement


admin.site.register(service)
admin.site.register(connecting_service)
#admin.site.register(service_input_requirement)
#admin.site.register(service_output_requirement)