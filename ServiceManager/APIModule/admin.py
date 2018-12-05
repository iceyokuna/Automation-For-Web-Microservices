from django.contrib import admin

# Modified code
from .models import service, connecting_method, method#, service_input_requirement, service_output_requirement


admin.site.register(service)
admin.site.register(connecting_method)
admin.site.register(method)
#admin.site.register(service_input_requirement)
#admin.site.register(service_output_requirement)