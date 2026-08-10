import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../utils/constants';

const BatteryIndicator = ({ battery = 88, size = 150 }) => {
  const [displayBattery, setDisplayBattery] = useState(battery);
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (battery / 100) * circumference;

  // Determine color based on battery level
  const getColor = (level) => {
    if (level > 75) return COLORS.success;
    if (level > 50) return COLORS.primary;
    if (level > 25) return COLORS.warning;
    return COLORS.danger;
  };

  const color = getColor(battery);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLORS.card}
          strokeWidth="8"
        />

        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />

        {/* Lightning bolt icon in center */}
        <Path
          d="M 50 20 L 60 45 L 40 45 L 65 80 L 35 50 L 55 50 Z"
          fill={color}
          opacity="0.8"
        />
      </Svg>

      {/* Battery percentage text */}
      <Text style={[styles.percentage, { color }]}>
        {Math.round(battery)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BatteryIndicator;
