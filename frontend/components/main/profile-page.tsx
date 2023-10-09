export const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="text-center py-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          className="mx-auto rounded-full w-32 h-32"
        />
        <h1 className="text-2xl font-semibold mt-2">John Doe</h1>
        <p className="text-gray-600">@johndoe</p>
      </header>

      <section className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          ultricies libero, non venenatis justo tristique at.
        </p>
      </section>

      <section className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
        <p className="text-gray-600">
          Email: johndoe@example.com
          <br />
          Phone: (123) 456-7890
        </p>
      </section>

      <button className="bg-blue-500 text-white mt-8 py-2 px-4 rounded hover:bg-blue-600 w-full">
        Manage Account
      </button>
    </div>
  );
};
