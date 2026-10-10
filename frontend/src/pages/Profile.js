
import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/user/profile")
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
}

export default Profile;
