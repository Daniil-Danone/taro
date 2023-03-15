from django.db import models
from main.managers import UserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=255, default="user")
    isAdmin = models.BooleanField(default=False)
    imageUrl = models.CharField(max_length=255, blank=True, null=True)
    unableCourses = models.TextField(blank=True, null=True)
    is_superuser = models.BooleanField(blank=True, default=False)
    is_staff = models.BooleanField(blank=True, default=False)
    is_active = models.BooleanField(blank=True, default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("name", "surname", "role", "isAdmin", "imageUrl", "unableCourses",
                       "created_at", "is_superuser", "is_staff", "is_active")

    def __str__(self):
        return f'UserID {self.id}: {self.name} {self.surname} | {self.email} | {self.role}'


class Course(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    imageUrl = models.CharField(max_length=255, blank=True, null=True)
    isFree = models.BooleanField(default=False)

    def __str__(self):
        return f'CourseID {self.id}: {self.title} | {self.isFree}'


class Theme(models.Model):
    course_id = models.ForeignKey(Course, on_delete=models.PROTECT)
    title = models.CharField(max_length=255)
    content = models.TextField()
    isFree = models.BooleanField(default=False)
    videoUrl = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'ThemeID {self.id}: {self.title} | {self.isFree}'

    # class Meta:
    #     verbose_name = _('user')
    #     verbose_name_plural = _('users')
    #
    # def get_full_name(self):
    #     return u'%s %s' % (self.name, self.surname)
    #
    # def get_short_name(self):
    #     return u'%s' % self.name
    #
    # def __unicode__(self):
    #     return self.email
    #
    # def has_perm(self, perm, obj=None):
    #     return True
    #
    # def has_module_perms(self, app_label):
    #     return True
    #
    # def email_user(self, subject, message, from_email=None):
    #     send_mail(subject, message, from_email, [self.email])
    #
    # @property
    # def is_staff(self):
    #     return self.is_admin
