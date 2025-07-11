import { useEffect, useState } from "react"
import { useUser } from "../context/UserContext"


const Profile = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    profilePic: "",
  })
  const {setUser} = useUser();
  const [previewPic, setPreviewPic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          credentials:'include'
        })
        const data = await res.json();
        setUserData(data)
        setPreviewPic(data.profilePic)
      } catch (err) {
        showToast("Failed to load profile. Please try again later.", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!userData.name || userData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    }

    if ((userData.phone && !/^\+?[\d\s\-()]{10,}$/.test(userData.phone)) || userData.phone.length !== 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setUserData({ ...userData, profilePic: reader.result })
      setPreviewPic(reader.result)
      showToast("Profile picture updated successfully!")
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!validateForm()) {
      showToast("Please fix the errors before saving", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
        showToast("Profile updated successfully!");

        const refreshed = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            
            credentials:'include'
          }
        );
        const newData = await refreshed.json();
        setUserData(newData);
        setPreviewPic(newData.profilePic);

        setIsEditing(false);
      } else {
        showToast(data.message || "Failed to update profile", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-white dark:bg-slate-950-custom dark:border-none  py-8 px-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg text-white font-medium ${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-700 dark:border-none rounded-2xl shadow-xl overflow-hidden border">
          <div
            className="px-8 py-6 text-center 
            bg-gradient-to-r from-blue-600 to-indigo-600 
          dark:from-slate-800 dark:via-black-900 dark:to-gray-800 
          dark:text-gray-200
          "
          >
            <h1 className="text-3xl font-bold text-white dark:text-gray-200">Your Profile</h1>
            <p className="text-blue-100 dark:text-gray-200">Manage your personal information</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-blue-200 dark:border-none shadow-lg overflow-hidden bg-gray-100">
                  {previewPic ? (
                    <img
                      src={previewPic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100">
                      <span className="text-3xl font-bold text-blue-600">
                        {userData.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <label
                htmlFor="profile-pic"
                className={`cursor-pointer bg-slate-200 text-black px-4 py-2 rounded-lg border border-gray-300 ${
                  isEditing
                    ? "hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Change Picture
              </label>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
                className="hidden"
              />
            </div>

            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email || ""}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 dark:border-none rounded-lg bg-white dark:bg-gray-400 cursor-not-allowed text-black"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your full name"
                  className={`w-full bg-slate-200 dark:bg-gray-400 text-black px-4 py-3 border dark:border-none rounded-lg ${
                    !isEditing
                      ? "bg-white text-black cursor-not-allowed"
                      : "focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                  } ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                  className={`w-full bg-slate-200 dark:bg-gray-400 text-black px-4 py-3 border dark:border-none rounded-lg ${
                    !isEditing
                      ? "bg-white cursor-not-allowed"
                      : "focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                  } ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-center gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                      saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
