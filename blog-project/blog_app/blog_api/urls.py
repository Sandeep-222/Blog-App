from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import UserCreateView,PostDetailView,PostListCreateView,PostsListView,GetUserView,GetAllUsersView,CommentListCreateView,CommentDeleteview

urlpatterns = [
    path('user/create/',UserCreateView.as_view(), name="create-user"),
    path('token/', TokenObtainPairView.as_view(), name="get-token"),
    path('token/refresh/',TokenRefreshView.as_view(), name="refresh-token"),
    path('posts/',PostListCreateView.as_view(),name= 'Posts-list-create'),
    path('posts/<int:pk>/',PostDetailView.as_view(),name='post-detail'),
    path('users/<str:username>/posts/',PostsListView.as_view(),name='user-posts'),
    path('users/<int:id>/',GetUserView.as_view(),name='user-detail'),
    path('users/',GetAllUsersView.as_view(),name='getall-users'),
    path('comments/<int:post_id>/', CommentListCreateView.as_view(), name='comment-list-create'),   
    path('comments/<int:post_id>/<int:comment_id>/', CommentDeleteview.as_view(), name='comment-delete'),
]
