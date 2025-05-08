import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import OrdersComponent from "@/components/OrdersComponent";
import styled from "styled-components";
import { FaUserCircle, FaLock } from "react-icons/fa";
import axios from "axios";

const PageContainer = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 4rem auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProfileTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ProfileSubtitle = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 300px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultProfileIcon = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
  color: #d1d5db;
`;

const UserName = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0;
  text-align: center;
`;

const UserContact = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
  text-align: center;
`;

const UploadInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ChangePhotoButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;

const ChangePasswordCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: 300px;
`;

const ChangePasswordTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }
`;

const ChangePasswordButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`;

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [carRentals, setCarRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch user data, orders, bookings, and car rentals
  useEffect(() => {
    if (session?.user?.email) {
      Promise.all([
        axios.get(`/api/user?email=${session.user.email}`),
        axios.get(`/api/orders?email=${session.user.email}`),
        axios.get(`/api/bookings?email=${session.user.email}`),
        axios.get(`/api/car-rental-bookings?email=${session.user.email}`)
      ])
      .then(([userResponse, ordersResponse, bookingsResponse, carRentalsResponse]) => {
        setUser(userResponse.data);
        setOrders(ordersResponse.data);
        setBookings(bookingsResponse.data);
        setCarRentals(carRentalsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    }
  }, [session]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", session.user.email);

      try {
        const response = await axios.post("/api/upload-profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUser(response.data);
        await update();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/changepassword", {
        email: session.user.email,
        currentPassword,
        newPassword,
      });
      alert(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Failed to change password.");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Center>
          <PageContainer>
            <EmptyState>Loading profile information...</EmptyState>
          </PageContainer>
        </Center>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <PageContainer>
          <ProfileHeader>
            <ProfileTitle>User profile</ProfileTitle>
            <ProfileSubtitle>Manage your details, view your rentals, bookings, orders and change your password.</ProfileSubtitle>
          </ProfileHeader>

          <ContentContainer>
            {/* Left column - Profile details */}
            <ProfileCard>
              <ProfileImageContainer>
                {user?.image ? (
                  <ProfileImage 
                    src={user.image} 
                    alt={user.name} 
                    onClick={() => document.getElementById("profile-image-upload").click()}
                  />
                ) : (
                  <DefaultProfileIcon 
                    onClick={() => document.getElementById("profile-image-upload").click()}
                  />
                )}
                <UploadInput
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <UserName>{user?.name}</UserName>
                <UserContact>{user?.email}</UserContact>
              </ProfileImageContainer>
              
              <ButtonContainer>
                <ChangePhotoButton onClick={() => document.getElementById("profile-image-upload").click()}>
                  Change Picture
                </ChangePhotoButton>
              </ButtonContainer>
            </ProfileCard>

            {/* Right column - Change password */}
            <ChangePasswordCard>
              <ChangePasswordTitle>
                <FaLock />
                Change Password
              </ChangePasswordTitle>
              <InputField
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ChangePasswordButton onClick={handleChangePassword}>
                Change Password
              </ChangePasswordButton>
            </ChangePasswordCard>
          </ContentContainer>

          {/* Orders Component - Contains car rentals, bookings, and order history */}
          <OrdersComponent 
            orders={orders}
            bookings={bookings}
            carRentals={carRentals}
          />
        </PageContainer>
      </Center>
      <Footer />
    </>
  );
}