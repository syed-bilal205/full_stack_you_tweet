import {
  Home,
  Profile,
  Login,
  Registration,
  // AuthProtector,
  ChangePassword,
  UpdateAccountDetails,
  UpdateAvatar,
  UpdateCoverImage,
  WatchHistory,
  VideoDetails,
  UpdateVideo,
  UserProfile,
  PublishVideo,
  RemoveVideo,
  AllTweets,
  UpdateTweet,
  RemoveTweet,
  TweetDetails,
  UnpublishedVideos,
  GetAllTheLikedVideos,
  GetAllLikedTweets,
  CreatePlaylist,
  UserPlaylist,
  UpdatePlaylist,
  DashBoard,
} from "./features/index.js";
import AuthProtector from "./utility/AuthProtector.jsx";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/profile",
    element: (
      <AuthProtector>
        <Profile />
      </AuthProtector>
    ),
  },
  {
    path: "/change-password",
    element: (
      <AuthProtector>
        <ChangePassword />
      </AuthProtector>
    ),
  },
  {
    path: "/update-account-details",
    element: (
      <AuthProtector>
        <UpdateAccountDetails />
      </AuthProtector>
    ),
  },
  {
    path: "/update-avatar",
    element: (
      <AuthProtector>
        <UpdateAvatar />
      </AuthProtector>
    ),
  },
  {
    path: "/update-cover-image",
    element: (
      <AuthProtector>
        <UpdateCoverImage />
      </AuthProtector>
    ),
  },
  {
    path: "/user/c/:username",
    element: (
      <AuthProtector>
        <UserProfile />
      </AuthProtector>
    ),
  },
  {
    path: "/history",
    element: (
      <AuthProtector>
        <WatchHistory />
      </AuthProtector>
    ),
  },
  {
    path: "/video/:videoId",
    element: (
      <AuthProtector>
        <VideoDetails />
      </AuthProtector>
    ),
  },
  {
    path: "/publish",
    element: (
      <AuthProtector>
        <PublishVideo />
      </AuthProtector>
    ),
  },
  {
    path: "/unpublished-videos",
    element: (
      <AuthProtector>
        <UnpublishedVideos />
      </AuthProtector>
    ),
  },
  {
    path: "/video/update/:videoId",
    element: (
      <AuthProtector>
        <UpdateVideo />
      </AuthProtector>
    ),
  },
  {
    path: "/video/remove:videoId",
    element: (
      <AuthProtector>
        <RemoveVideo />
      </AuthProtector>
    ),
  },
  {
    path: "/tweet",
    element: (
      <AuthProtector>
        <AllTweets />
      </AuthProtector>
    ),
  },
  {
    path: `/tweet/update/:tweetId`,
    element: (
      <AuthProtector>
        <UpdateTweet />
      </AuthProtector>
    ),
  },
  {
    path: `/tweet/remove/:tweetId`,
    element: (
      <AuthProtector>
        <RemoveTweet />
      </AuthProtector>
    ),
  },
  {
    path: `tweet/:tweetId`,
    element: (
      <AuthProtector>
        <TweetDetails />
      </AuthProtector>
    ),
  },
  {
    path: `/liked-videos`,
    element: (
      <AuthProtector>
        <GetAllTheLikedVideos />
      </AuthProtector>
    ),
  },
  {
    path: "/liked-tweets",
    element: (
      <AuthProtector>
        <GetAllLikedTweets />
      </AuthProtector>
    ),
  },
  {
    path: "/create-playlist",
    element: (
      <AuthProtector>
        <CreatePlaylist />
      </AuthProtector>
    ),
  },
  {
    path: "/user-playlist",
    element: (
      <AuthProtector>
        <UserPlaylist />
      </AuthProtector>
    ),
  },
  {
    path: `/update-playlist/:playlistId`,
    element: (
      <AuthProtector>
        <UpdatePlaylist />
      </AuthProtector>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthProtector>
        <DashBoard />
      </AuthProtector>
    ),
  },
];
