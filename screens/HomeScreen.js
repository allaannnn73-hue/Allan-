import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS, DEVICE } from '../utils/constants';
import BatteryIndicator from './BatteryIndicator';
import RadarDisplay from './RadarDisplay';
import ChargingStats from './ChargingStats';
import ModeSelector from './ModeSelector';
import NotificationCenter from './NotificationCenter';

const HomeScreen = ({ navigation }) => {
  const [chargingMode, setChargingMode] = useState('Auto');
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [signal, setSignal] = useState(80);
  const [distance, setDistance] = useState(2.5);
  const [isCharging, setIsCharging] = useState(true);

  // Simulate charging updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        const newLevel = Math.min(prev + 0.5, 100);
        return newLevel;
      });

      // Simulate signal fluctuation
      setSignal((prev) => {
        const variation = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(100, prev + variation));
      });

      // Simulate distance changes
      setDistance((prev) => {
        const variation = (Math.random() - 0.5) * 0.2;
        return Math.max(0.5, Math.min(5, prev + variation));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = {
    currentBattery: batteryLevel,
    totalEnergyHarvested: (batteryLevel / 100) * 3.5,
    sessionDuration: 45,
    averagePower: 12.5,
    mode: chargingMode,
    distance: distance,
  };

  const handleStartStop = () => {
    setIsCharging(!isCharging);
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

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
          <View>
            <Text style={styles.greeting}>AuraWave</Text>
            <Text style={styles.subGreeting}>Wireless Energy Harvesting</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Status Badge */}
        <View style={[styles.statusBadge, isCharging && styles.statusBadgeActive]}>
          <View
            style={[
              styles.statusIndicator,
              isCharging && styles.statusIndicatorActive,
            ]}
          />
          <Text style={styles.statusText}>
            {isCharging ? '🔋 Charging Active' : '⚠️ Charging Stopped'}
          </Text>
        </View>

        {/* Battery Indicator */}
        <View style={styles.section}>
          <BatteryIndicator
            percentage={Math.round(batteryLevel)}
            isCharging={isCharging}
          />
        </View>

        {/* Radar Display */}
        <View style={styles.section}>
          <RadarDisplay signal={Math.round(signal)} distance={distance} />
        </View>

        {/* Mode Selector */}
        <View style={styles.section}>
          <ModeSelector
            currentMode={chargingMode}
            onModeChange={(mode) => setChargingMode(mode)}
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.quickStatsContainer}>
            <Text style={styles.sectionLabel}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statBoxLabel}>Signal Strength</Text>
                <Text style={[styles.statBoxValue, { color: COLORS.success }]}>
                  {Math.round(signal)}%
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statBoxLabel}>Distance</Text>
                <Text style={[styles.statBoxValue, { color: COLORS.primary }]}>
                  {distance.toFixed(1)}m
                </Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statBoxLabel}>Power Output</Text>
                <Text style={[styles.statBoxValue, { color: COLORS.info }]}>
                  12.5W
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Control Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.controlButton, !isCharging && styles.controlButtonInactive]}
            onPress={handleStartStop}
            activeOpacity={0.8}
          >
            <Text style={styles.controlButtonIcon}>
              {isCharging ? '⏸️' : '▶️'}
            </Text>
            <Text style={styles.controlButtonText}>
              {isCharging ? 'Stop Charging' : 'Start Charging'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Notifications</Text>
          <NotificationCenter />
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
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 20,
  },
  statusBadge: {
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  statusBadgeActive: {
    borderLeftColor: COLORS.success,
    backgroundColor: COLORS.success + '15',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
    marginRight: 10,
  },
  statusIndicatorActive: {
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  quickStatsContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statBoxLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
    textAlign: 'center',
  },
  statBoxValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.success,
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  controlButtonInactive: {
    backgroundColor: COLORS.warning,
  },
  controlButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;
