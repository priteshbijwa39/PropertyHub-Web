import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "../../components/common/Toast";
import { updateProfile } from "../../services/propertyService";
import { Mail, Phone, User } from "lucide-react";

interface ProfileFormData {
  name: string;
  email: string;
  mobileNumber: string;
}

const Profile = () => {
  const user = useAuthStore((state) => state?.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    mobileNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
      });
    }
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   useEffect(() => {
  // const response=getProfile();
  // console.log('user data ------->>>>',response);
  //   }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await updateProfile(formData);
      updateUser(response.user);
      toast.success("User Profile updated successfully!");
    } catch (error) {
      toast.error(`Failed to update profile: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Profile" subtitle="Manage your profile information"  showProfile={false}>
      <div className="mx-auto w-full max-w-3xl  ">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-(--shadow-sm) sm:p-8">
          <div className="mb-6 border-b border-gray-200 pb-5 ">
            <div className="flex items-center gap-3  justify-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-secondary-dark) text-lg font-bold text-black">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-black">
                  Personal Information
                </h2>

                <p className="mt-0.5 text-sm text-gray-500">
                  Update your personal and contact information.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Enter your full name"
              onChange={handleChange}
              icon={<User size={18} />}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email address"
              onChange={handleChange}
              icon={<Mail size={18} />}
            />

            <Input
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              placeholder="Enter your mobile number"
              onChange={handleChange}
              icon={<Phone size={18} />}
            />

            <div className="flex justify-center pt-3">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
