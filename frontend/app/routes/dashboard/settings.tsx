import { useAuth } from "~/provider/auth-context";
import { useState } from "react";
import { Avatar } from "~/components/ui/avatar";

export default function SettingsPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme") === "light"
      ? "dark"
      : "light"
  );

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">User Details</h2>
        <div className="bg-muted rounded p-4 flex items-center gap-4">
          <Avatar />
          <div>
            <div>
              <span className="font-medium">Name:</span> {user?.name || "N/A"}
            </div>
            <div>
              <span className="font-medium">Email:</span> {user?.email || "N/A"}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-muted"}`}
            onClick={() => handleThemeChange("light")}
          >
            Light
          </button>
          <button
            className={`px-4 py-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-muted"}`}
            onClick={() => handleThemeChange("dark")}
          >
            Dark
          </button>
        </div>
      </div>
    </div>
  );
}