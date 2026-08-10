import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../utils/constants';

const ChargingStats = ({ stats = {} }) => {
  const {
    currentBattery = 88,
    totalEnergyHarvested = 2.45,
    sessionDuration = 15,
    averagePower = 9.8,
    mode = 'Auto',
    distance = 2.5,
  } = stats;

  const StatCard = ({ label, value, unit, color = COLORS.primary }) => (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statValueContainer}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statUnit}>{unit}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Charging Statistics</Text>

      {/* Current Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={styles.gridContainer}>
          <StatCard
            label="Battery Level"
            value={Math.round(currentBattery)}
            unit="%"
            color={currentBattery > 75 ? COLORS.success : currentBattery > 50 ? COLORS.primary : COLORS.warning}
          />
          <StatCard
            label="Charging Mode"
            value={mode}
            unit=""
            color={COLORS.primary}
          />
          <StatCard
            label="Distance"
            value={distance.toFixed(1)}
            unit="m"
            color={COLORS.primary}
          />
        </View>
      </View>

      {/* Session Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session Performance</Text>
        <View style={styles.gridContainer}>
          <StatCard
            label="Energy Harvested"
            value={totalEnergyHarvested.toFixed(2)}
            unit="Wh"
            color={COLORS.success}
          />
          <StatCard
            label="Average Power"
            value={averagePower.toFixed(1)}
            unit="W"
            color={COLORS.primary}
          />
          <StatCard
            label="Session Duration"
            value={sessionDuration}
            unit="min"
            color={COLORS.info}
          />
        </View>
      </View>

      {/* Efficiency Info */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Charging Tips</Text>
        <Text style={styles.infoText}>
          • Keep optimal distance between 1-3 meters{'\n'}
          • Avoid obstacles blocking the signal{'\n'}
          • Cool environment improves efficiency{'\n'}
          • Continuous contact yields best results
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  infoBox: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default ChargingStats;
