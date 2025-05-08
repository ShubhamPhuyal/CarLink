import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Bell, X } from "lucide-react";
import styled from "styled-components";
import io from "socket.io-client";

// Styled Components for Notification
const NotificationIconWrapper = styled.div`
  position: relative;
  display: inline-block;
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

// Modal for showing notification details
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  padding: 0.25rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

const ModalMessage = styled.p`
  margin: 0 0 0.5rem;
  color: #374151;
`;

const ModalTimestamp = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: #6B7280;
`;

const ModalDetails = styled.div`
  background-color: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
`;

const ModalDetailTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.25rem;
`;

const ModalDetailText = styled.p`
  font-size: 0.75rem;
  color: #4B5563;
  margin: 0;
`;




// All your styled components remain unchanged
// ... keep all the styled components from the original file

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [socket, setSocket] = useState(null);
  const { data: session } = useSession();
  const dropdownRef = useRef(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!session) return;

    // Initialize Socket.IO connection
    const initSocket = async () => {
      // Make a request to the socket endpoint to initialize the server
      await fetch('/api/socket');
      
      const socketInstance = io();
      
      socketInstance.on('connect', () => {
        console.log('Socket connected:', socketInstance.id);
      });
      
      socketInstance.on('newActivities', (newActivities) => {
        console.log('New activities received:', newActivities);
        handleNewActivities(newActivities);
      });
      
      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected');
      });
      
      setSocket(socketInstance);
      
      return () => {
        socketInstance.disconnect();
      };
    };
    
    initSocket();
  }, [session]);

  // Load notifications from localStorage on initial render
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
      
      // Calculate unread count
      const unread = JSON.parse(storedNotifications).filter(n => !n.read).length;
      setUnreadCount(unread);
    }
  }, []);

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

  // Initial fetch of recent activities from API
  useEffect(() => {
    if (!session) return;

    const fetchRecentActivities = async () => {
      try {
        // Get last timestamp to only fetch newer activities
        const lastTimestamp = lastUpdated ? lastUpdated.getTime() : 0;
        
        // Fetch from your notification API endpoint
        const res = await fetch(`/api/stats?lastFetchedTimestamp=${lastTimestamp}`);
        const data = await res.json();
        
        if (data.recentActivities && data.recentActivities.length > 0) {
          handleNewActivities(data.recentActivities);
        }
        
        setLastUpdated(new Date(data.timestamp));
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    };
    
    fetchRecentActivities();
    
    // Keep a backup polling mechanism in case WebSockets fail
    const interval = setInterval(fetchRecentActivities, 60000);
    return () => clearInterval(interval);
  }, [session]);

  // Handle new activities from either socket or API
  const handleNewActivities = (newActivities) => {
    // Get existing notifications from localStorage to preserve read status
    const existingNotificationsString = localStorage.getItem('notifications');
    const existingNotifications = existingNotificationsString 
      ? JSON.parse(existingNotificationsString) 
      : [];
    
    // Create a map of existing notifications for quick lookup
    const existingNotificationsMap = {};
    existingNotifications.forEach(notification => {
      // Create a unique key based on notification type and ID
      const key = `${notification.type}_${notification.metadata?.[`${notification.type}Id`]}`;
      existingNotificationsMap[key] = notification;
    });
    
    // Process new notifications while preserving read status
    const newNotificationsToAdd = newActivities.filter(activity => {
      // Create the same key for lookup
      const key = `${activity.type}_${activity.metadata?.[`${activity.type}Id`]}`;
      return !existingNotificationsMap[key]; // Only add if it doesn't exist
    }).map(activity => ({
      ...activity,
      read: false
    }));
    
    if (newNotificationsToAdd.length > 0) {
      // Play notification sound if there are new notifications
      playNotificationSound();
      
      // Update state and localStorage
      const updatedNotifications = [...newNotificationsToAdd, ...existingNotifications]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 50); // Limit to 50 notifications
      
      setNotifications(updatedNotifications);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      
      // Update unread count
      const unread = updatedNotifications.filter(n => !n.read).length;
      setUnreadCount(unread);
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.play();
    } catch (error) {
      console.log('Sound play failed:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };
  
  // Toggle notification dropdown and mark all as read when opening
  const toggleNotificationDropdown = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    
    // If opening the dropdown, mark all as read
    if (newState && unreadCount > 0) {
      markAllAsRead();
    }
  };
  
  // View a specific notification
  const handleViewNotification = (notification) => {
    // Mark this notification as read
    const updatedNotifications = notifications.map(n => 
      n === notification ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    
    // Recalculate unread count
    const unread = updatedNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Show the modal with the selected notification
    setSelectedNotification(notification);
    setIsOpen(false);
  };

  return (
    <NotificationIconWrapper ref={dropdownRef} className="notification-container">
      <NotificationButton onClick={toggleNotificationDropdown}>
        <Bell size={24} className="text-gray-500" />
        {unreadCount > 0 && (
          <NotificationBadge>
            {unreadCount > 9 ? '9+' : unreadCount}
          </NotificationBadge>
        )}
      </NotificationButton>

      {/* Notification Dropdown */}
      {isOpen && (
        <NotificationDropdown>
          <NotificationHeader>
            <NotificationTitle>Notifications</NotificationTitle>
            <ClearAllButton onClick={markAllAsRead} disabled={notifications.length === 0 || unreadCount === 0}>
              Mark all as read
            </ClearAllButton>
          </NotificationHeader>

          <NotificationList>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <NotificationItem 
                  key={index} 
                  onClick={() => handleViewNotification(notification)}
                  style={{ backgroundColor: notification.read ? "white" : "#f0f9ff" }}
                >
                  <NotificationContent>
                    <NotificationIcon>
                      {notification.type === "order" ? "🚗" : 
                       notification.type === "booking" ? "📅" : 
                       notification.type === "rental" ? "🔑" : "📣"}
                    </NotificationIcon>
                    <NotificationInfo>
                      <NotificationMessage>{notification.title}</NotificationMessage>
                      <NotificationTime>
                        {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' • '}
                        {new Date(notification.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </NotificationTime>
                    </NotificationInfo>
                  </NotificationContent>
                </NotificationItem>
              ))
            ) : (
              <EmptyNotification>No new notifications</EmptyNotification>
            )}
          </NotificationList>
        </NotificationDropdown>
      )}

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedNotification.title}</ModalTitle>
              <ModalCloseButton onClick={() => setSelectedNotification(null)}>
                <X size={20} />
              </ModalCloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalMessage>{selectedNotification.message}</ModalMessage>
              <ModalTimestamp>
                {new Date(selectedNotification.createdAt).toLocaleString([], { 
                  dateStyle: 'medium', 
                  timeStyle: 'short' 
                })}
              </ModalTimestamp>
              
              {selectedNotification.metadata && (
                <ModalDetails>
                  <ModalDetailTitle>Details</ModalDetailTitle>
                  {selectedNotification.type === 'order' && (
                    <ModalDetailText>Order ID: {selectedNotification.metadata.orderId}</ModalDetailText>
                  )}
                  {selectedNotification.type === 'booking' && (
                    <ModalDetailText>Booking ID: {selectedNotification.metadata.bookingId}</ModalDetailText>
                  )}
                  {selectedNotification.type === 'rental' && (
                    <ModalDetailText>Rental ID: {selectedNotification.metadata.rentalId}</ModalDetailText>
                  )}
                </ModalDetails>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </NotificationIconWrapper>
  );
};

export default NotificationComponent;