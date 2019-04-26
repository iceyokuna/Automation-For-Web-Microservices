from django.contrib import admin

# Modified code
from .models import Service, Connecting_method, Method, UserMethod, UserService#, service_input_requirement, service_output_requirement


admin.site.register(Service)
admin.site.register(Connecting_method)
admin.site.register(Method)
admin.site.register(UserMethod)
admin.site.register(UserService)
#admin.site.register(service_input_requirement)
#admin.site.register(service_output_requirement)