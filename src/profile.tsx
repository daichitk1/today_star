import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    isAuthenticated && (
      <div className="flex mx-auto">
        <div className="mx-3">
          <h2>名前: {user.name}</h2>
          <h2>メール: {user.email}</h2>
        </div>
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-full w-15 h-15"
        />
      </div>
    )
  );
};
export default Profile;
