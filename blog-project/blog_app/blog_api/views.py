from django.shortcuts import render
from rest_framework import generics
from .serializers import UserCreateSerializer,PostSerializer,CommentSerializer
from django.contrib.auth.models import User
from .models import Post,Comment
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from .permissions import IsAuthorOrReadOnly, IsAuthor

# Create your views here.
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    
class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
       
    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,IsAuthorOrReadOnly]
    
class PostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        username = self.kwargs['username']
        return Post.objects.filter(author__username=username)
    
class GetUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    lookup_field = 'id'

class GetAllUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated]


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        post_id = self.kwargs['post_id']
        obj =  Comment.objects.filter(post__id=post_id)
        self.check_object_permissions(self.request, obj)
        return obj
    
    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        post = Post.objects.get(id=post_id)
        serializer.save(author=self.request.user, post=post)
        
class CommentDeleteview(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthor]
    
    def get_object(self):
        post_id = self.kwargs['post_id']
        comment_id = self.kwargs['comment_id']
        obj = Comment.objects.get(id=comment_id, post__id=post_id)
        self.check_object_permissions(self.request, obj)
        return obj
