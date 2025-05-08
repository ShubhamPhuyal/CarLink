import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";

// Styled Components
const NotificationIconWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 0.75rem;
`;

const NotificationButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
    transform: scale(1.1);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: -100px;
  width: 320px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  max-height: 400px;
`;

const NotificationHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #0066cc;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const NotificationList = styled.div`
  overflow-y: auto;
  max-height: 350px;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const NotificationMessage = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  color: #374151;
`;

const NotificationTime = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const EmptyNotification = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
`;

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (!session || !isOpen) return;

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/notifications", {
          params: { userId: session.user.id }
        });
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [session, isOpen]);

  const handleClearAll = async () => {
    if (!session || notifications.length === 0) return;

    try {
      await axios.post("/api/notifications/clear", {
        userId: session.user.id
      });
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.post("/api/notifications/read", {
        notificationId,
        userId: session.user.id
      });
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
      
      // Here you could also add logic to navigate to relevant page
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Sample notifications for display (remove in production)
  const demoNotifications = [
    {
      id: 1,
      type: "order",
      message: "Your order #12345 has been shipped",
      createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
      read: false
    },
    {
      id: 2,
      type: "system",
      message: "New car models are available for booking",
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      read: true
    }
  ];

  // For demo purposes, use the demo notifications if real ones are empty
  const displayNotifications = notifications.length > 0 ? notifications : demoNotifications;

  return (
    <NotificationIconWrapper ref={dropdownRef}>
      <NotificationButton onClick={() => setIsOpen(!isOpen)}>
        <FaBell size={24} />
        {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
      </NotificationButton>

      {isOpen && (
        <NotificationDropdown>
          <NotificationHeader>
            <NotificationTitle>Notifications</NotificationTitle>
            <ClearAllButton 
              onClick={handleClearAll} 
              disabled={displayNotifications.length === 0}
            >
              Clear All
            </ClearAllButton>
          </NotificationHeader>

          <NotificationList>
            {loading ? (
              <EmptyNotification>Loading notifications...</EmptyNotification>
            ) : displayNotifications.length > 0 ? (
              displayNotifications.map((notification) => (
                <NotificationItem 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  style={{ backgroundColor: notification.read ? "white" : "#f0f9ff" }}
                >
                  <NotificationContent>
                    <NotificationIcon>
                      {notification.type === "order" ? "🚗" : "📣"}
                    </NotificationIcon>
                    <NotificationInfo>
                      <NotificationMessage>{notification.message}</NotificationMessage>
                      <NotificationTime>
                        {new Date(notification.createdAt).toLocaleString()}
                      </NotificationTime>
                    </NotificationInfo>
                  </NotificationContent>
                </NotificationItem>
              ))
            ) : (
              <EmptyNotification>No orders right now</EmptyNotification>
            )}
          </NotificationList>
        </NotificationDropdown>
      )}
    </NotificationIconWrapper>
  );
};

export default NotificationComponent;