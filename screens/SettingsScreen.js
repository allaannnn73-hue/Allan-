import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/constants';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleResetData = () => {
    Alert.alert('Reset Data', 'Are you sure you want to reset all data?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Reset',
        onPress: () => Alert.alert('Success', 'Data has been reset.'),
        style: 'destructive',
      },
    ]);
  };

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'Clear app cache?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => Alert.alert('Success', 'Cache cleared successfully.'),
      },
    ]);
  };

  const SettingRow = ({ icon, label, value, onPress, isToggle, onValueChange }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={isToggle ? 1 : 0.7}
      disabled={isToggle}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingLabel}>{label}</Text>
          {value && !isToggle && <Text style={styles.settingValue}>{value}</Text>}
        </View>
      </View>
      {isToggle && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.surface, true: COLORS.primary }}
          thumbColor={value ? COLORS.primary : COLORS.card}
        />
      )}
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Notifications Section */}
        <SettingSection title="Notifications & Sound">
          <SettingRow
            icon="🔔"
            label="Enable Notifications"
            value={notifications}
            isToggle={true}
            onValueChange={setNotifications}
          />
          <SettingRow
            icon="🔊"
            label="Sound Effects"
            value={soundEnabled}
            isToggle={true}
            onValueChange={setSoundEnabled}
          />
          <SettingRow
            icon="📳"
            label="Vibration"
            value={vibrationEnabled}
            isToggle={true}
            onValueChange={setVibrationEnabled}
          />
        </SettingSection>

        {/* Charging Settings */}
        <SettingSection title="Charging">
          <SettingRow
            icon="🤖"
            label="Auto Mode"
            value={autoMode}
            isToggle={true}
            onValueChange={setAutoMode}
          />
          <SettingRow
            icon="🔋"
            label="Battery Optimization"
            value="Enabled"
            onPress={() => Alert.alert('Battery', 'Optimizing battery usage')}
          />
          <SettingRow
            icon="🌡️"
            label="Thermal Management"
            value="Active"
            onPress={() => Alert.alert('Thermal', 'Temperature: 35°C')}
          />
        </SettingSection>

        {/* Display Settings */}
        <SettingSection title="Display">
          <SettingRow
            icon="🌙"
            label="Dark Mode"
            value={darkMode}
            isToggle={true}
            onValueChange={setDarkMode}
          />
          <SettingRow
            icon="📊"
            label="Show Advanced Stats"
            value="Enabled"
            onPress={() => Alert.alert('Stats', 'Advanced statistics enabled')}
          />
        </SettingSection>

        {/* About Section */}
        <SettingSection title="About">
          <SettingRow
            icon="ℹ️"
            label="App Version"
            value="1.0.0"
            onPress={() => {}}
          />
          <SettingRow
            icon="🔧"
            label="Device Information"
            value="View"
            onPress={() => Alert.alert('Device Info', 'Model: AuraWave Pro\nFirmware: v2.1.5')}
          />
          <SettingRow
            icon="📋"
            label="Terms of Service"
            value="View"
            onPress={() => Alert.alert('Terms', 'Tap to read our terms and conditions')}
          />
          <SettingRow
            icon="🔒"
            label="Privacy Policy"
            value="View"
            onPress={() => Alert.alert('Privacy', 'Your data is protected and encrypted')}
          />
        </SettingSection>

        {/* Data Management */}
        <SettingSection title="Data Management">
          <TouchableOpacity
            style={[styles.settingRow, styles.dangerRow]}
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View style={styles.settingContent}>
              <Text style={styles.settingIcon}>🗑️</Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, styles.dangerText]}>
                  Clear Cache
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingRow, styles.dangerRow]}
            onPress={handleResetData}
            activeOpacity={0.7}
          >
            <View style={styles.settingContent}>
              <Text style={styles.settingIcon}>⚠️</Text>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingLabel, styles.dangerText]}>
                  Reset All Data
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </SettingSection>

        {/* Support Section */}
        <SettingSection title="Support">
          <SettingRow
            icon="📞"
            label="Contact Support"
            value="Email"
            onPress={() => Alert.alert('Support', 'support@aurawave.app')}
          />
          <SettingRow
            icon="🐛"
            label="Report Bug"
            value="Send"
            onPress={() => Alert.alert('Bug Report', 'Thank you for reporting issues')}
          />
          <SettingRow
            icon="⭐"
            label="Rate App"
            value="Review"
            onPress={() => Alert.alert('Rate', 'Thank you for your feedback!')}
          />
        </SettingSection>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AuraWave v1.0.0</Text>
          <Text style={styles.footerSubtext}>Wireless Energy Harvesting</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dangerRow: {
    backgroundColor: COLORS.danger + '10',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  dangerText: {
    color: COLORS.danger,
  },
  settingValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default SettingsScreen;
