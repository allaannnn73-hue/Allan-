import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../utils/constants';

const NotificationCenter = ({ notifications = [] }) => {
  const [dismissedNotifications, setDismissedNotifications] = useState([]);

  const defaultNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Charging Started',
      message: 'Wireless charging session initiated. Battery: 88%',
      timestamp: '2 min ago',
      icon: '✅',
    },
    {
      id: 2,
      type: 'info',
      title: 'Signal Detected',
      message: 'AuraWave signal detected at 2.5m distance',
      timestamp: '5 min ago',
      icon: '📡',
    },
    {
      id: 3,
      type: 'warning',
      title: 'Optimal Distance',
      message: 'Move closer for better charging efficiency',
      timestamp: '8 min ago',
      icon: '⚠️',
    },
    {
      id: 4,
      type: 'info',
      title: 'Mode Changed',
      message: 'Charging mode switched to Balanced',
      timestamp: '15 min ago',
      icon: '⚙️',
    },
  ];

  const activeNotifications = (notifications.length > 0 ? notifications : defaultNotifications).filter(
    (notif) => !dismissedNotifications.includes(notif.id)
  );

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'danger':
        return COLORS.danger;
      case 'info':
      default:
        return COLORS.primary;
    }
  };

  const handleDismiss = (id) => {
    setDismissedNotifications([...dismissedNotifications, id]);
  };

  const handleClearAll = () => {
    Alert.alert('Clear All', 'Clear all notifications?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => {
          setDismissedNotifications(activeNotifications.map((n) => n.id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        {activeNotifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      {activeNotifications.length > 0 ? (
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {activeNotifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationCard,
                {
                  borderLeftColor: getNotificationColor(notification.type),
                },
              ]}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationIcon}>{notification.icon}</Text>
                  <View style={styles.notificationTitleContainer}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
                  </View>
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>

              <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => handleDismiss(notification.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.dismissText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔔</Text>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyText}>You're all caught up!</Text>
        </View>
      )}

      {/* Notification Badge */}
      {activeNotifications.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{activeNotifications.length}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  clearButton: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    alignItems: 'flex-start',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  notificationTitleContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  notificationTimestamp: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  notificationMessage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginLeft: 30,
  },
  dismissButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  dismissText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 16,
    backgroundColor: COLORS.danger,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NotificationCenter;
