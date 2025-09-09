# pylint: disable=missing-class-docstring
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post,Comment

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","email","password"]
        extra_kwargs = {
            "id": {"read_only":True},
            "password":{"write_only":True}
        }
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source = 'author.username',read_only = True)
    
    class Meta:
        model = Post
        fields = '__all__'   
        
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['post', 'author']
    
    
           
