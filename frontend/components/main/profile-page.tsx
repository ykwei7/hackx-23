import { get_user_info } from "@/app/api/users/route";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";

export const ProfilePage = () => {
  const user_id = sessionStorage.getItem("user_id");
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [bio, setBio] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  function capitalize(str) {
    // Check if the string is empty or null
    if (!str) return str;

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const logout = () => {
    sessionStorage.removeItem("user_id");
    router.push("/");
  };

  useEffect(() => {
    get_user_info(user_id)
      .then((res) => {
        setEmail(res.email);
        setUsername(res.name);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return isLoaded ? (
    <div className="bg-gray-100 px-4 min-h-screen">
      <header className="text-center py-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="mx-auto rounded-full w-32 h-32"
        />
        <h1 className="text-2xl font-semibold mt-2">
          {capitalize(username) ?? "-"}
        </h1>
      </header>

      <section className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <p className="text-gray-600">
          {bio ??
            "Dedicated cyclist, exploring new routes and pushing boundaries. Passion for endless adventures."}
        </p>
      </section>

      <section className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
        <p className="text-gray-600">
          Email: {email ?? "-"}
          <br />
          Phone: {phoneNum ?? "9123 4567"}
        </p>
      </section>

      <div className="w-full px-3 py-8">
        <button
          className="btn text-white bg-black hover:bg-gray-700 w-full"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-center items-start pt-4">
        <CircularProgress sx={{ color: "grey" }} />
      </div>
    </>
  );
};
