import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../utils/constants';

const ModeSelector = ({ currentMode = 'Auto', onModeChange = () => {} }) => {
  const modes = [
    {
      name: 'Auto',
      description: 'Smart adaptive charging',
      icon: '🤖',
      power: 'Variable',
    },
    {
      name: 'Eco',
      description: 'Battery efficient mode',
      icon: '🌱',
      power: '5W',
    },
    {
      name: 'Balanced',
      description: 'Optimal balance',
      icon: '⚖️',
      power: '12W',
    },
    {
      name: 'Turbo',
      description: 'Maximum power output',
      icon: '⚡',
      power: '20W',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Charging Mode</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modeList}>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode.name}
            style={[
              styles.modeCard,
              currentMode === mode.name && styles.modeCardActive,
            ]}
            onPress={() => onModeChange(mode.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.modeIcon}>{mode.icon}</Text>
            <Text style={[styles.modeName, currentMode === mode.name && styles.modeNameActive]}>
              {mode.name}
            </Text>
            <Text style={styles.modeDescription}>{mode.description}</Text>
            <Text style={[styles.modePower, currentMode === mode.name && styles.modePowerActive]}>
              {mode.power}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mode Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>ℹ️ Mode Details</Text>
        <Text style={styles.infoText}>
          {currentMode === 'Auto'
            ? 'Auto mode adjusts charging power based on distance and signal strength for optimal efficiency.'
            : currentMode === 'Eco'
            ? 'Eco mode minimizes energy consumption while maintaining steady charging at 5W output.'
            : currentMode === 'Balanced'
            ? 'Balanced mode provides stable 12W charging with good efficiency.'
            : 'Turbo mode maximizes charging speed at 20W, best for quick battery top-ups.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  modeList: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modeCard: {
    width: 140,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  modeName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  modeNameActive: {
    color: COLORS.primary,
  },
  modeDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  modePower: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  modePowerActive: {
    color: COLORS.primary,
  },
  infoContainer: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default ModeSelector;
