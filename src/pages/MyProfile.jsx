import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!userData) {
    return (
      <div className="pt-40 text-center text-gray-500">Loading profile...</div>
    );
  }

  // API call to update profile
  const updateUserProfileData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("userId", userData._id);
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", JSON.stringify(userData.address || {}));

      if (imageFile) formData.append("image", imageFile); // <-- here we append the image

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Profile Updated Successfully!");
        setIsEdit(false);
        setImageFile(null); // reset after upload
        loadUserProfileData(); // refresh updated user data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-8 mb-10">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#2563EB]"
            />

            {isEdit && (
              <label className="absolute bottom-0 right-0 bg-[#2563EB] p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7v10c0 1.1.9 2 2 2h14a2 2 0 002-2V7M16 3h-4a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex-1">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-2xl font-semibold border-b border-gray-300 focus:outline-none focus:border-[#2563EB] w-full"
              />
            ) : (
              <h2 className="text-3xl font-bold text-[#0F172A]">
                {userData.name}
              </h2>
            )}
            <p className="text-gray-500 mt-1">{userData.email}</p>
          </div>
        </div>

        <hr className="my-8" />

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-[#2563EB] mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-medium">Email</p>
              <p>{userData.email}</p>
            </div>

            <div>
              <p className="font-medium">Phone</p>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="border rounded-lg px-3 py-1 w-full"
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <p className="font-medium">Address</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userData.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="border rounded-lg px-3 py-1 w-full"
                  />
                  <input
                    type="text"
                    value={userData.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="border rounded-lg px-3 py-1 w-full"
                  />
                </div>
              ) : (
                <p>
                  {userData.address?.line1}
                  <br />
                  {userData.address?.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-[#2563EB] mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-medium">Gender</p>
              {isEdit ? (
                <select
                  value={userData.gender || "Male"}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="border rounded-lg px-3 py-1 w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="font-medium">Date of Birth</p>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="border rounded-lg px-3 py-1 w-full"
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 text-right">
          {isEdit ? (
            <button
              disabled={loading}
              onClick={updateUserProfileData}
              className="bg-[#22C55E] text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Information"}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MyProfile;
