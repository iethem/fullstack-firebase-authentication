import { useAuth } from 'containers/AuthProvider';

function ProfilePage() {
  const auth = useAuth();
  return <div>Welcome {auth.user.displayName}! You are now signed-in!</div>;
}

export default ProfilePage;
