import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../utils/constants';

const RadarDisplay = ({ signal = 80, distance = 2.5 }) => {
  const [rotation, setRotation] = useState(0);
  const size = 200;
  const center = size / 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 6) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Calculate signal strength visualization
  const getSignalColor = (level) => {
    if (level > 75) return COLORS.success;
    if (level > 50) return COLORS.primary;
    if (level > 25) return COLORS.warning;
    return COLORS.danger;
  };

  const signalColor = getSignalColor(signal);
  const radarRadius = (signal / 100) * (center - 30);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AuraWave Radar</Text>
      
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer circles */}
        <Circle cx={center} cy={center} r={center - 10} fill="none" stroke={COLORS.card} strokeWidth="1" />
        <Circle cx={center} cy={center} r={(center - 10) * 0.66} fill="none" stroke={COLORS.card} strokeWidth="1" />
        <Circle cx={center} cy={center} r={(center - 10) * 0.33} fill="none" stroke={COLORS.card} strokeWidth="1" />

        {/* Crosshairs */}
        <Line x1={10} y1={center} x2={size - 10} y2={center} stroke={COLORS.card} strokeWidth="0.5" />
        <Line x1={center} y1={10} x2={center} y2={size - 10} stroke={COLORS.card} strokeWidth="0.5" />

        {/* Rotating sweep */}
        <Line
          x1={center}
          y1={center}
          x2={center + radarRadius * Math.cos((rotation * Math.PI) / 180)}
          y2={center + radarRadius * Math.sin((rotation * Math.PI) / 180)}
          stroke={signalColor}
          strokeWidth="2"
          opacity="0.7"
        />

        {/* Signal strength circle */}
        <Circle
          cx={center}
          cy={center}
          r={radarRadius}
          fill="none"
          stroke={signalColor}
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Distance labels */}
        <SvgText x={center - 5} y={15} fontSize="10" fill={COLORS.textSecondary} textAnchor="middle">
          10m
        </SvgText>
        <SvgText x={center - 5} y={center + 5} fontSize="10" fill={COLORS.textSecondary} textAnchor="middle">
          0m
        </SvgText>
      </Svg>

      {/* Stats below */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Signal</Text>
          <Text style={[styles.statValue, { color: signalColor }]}>{signal}%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>{distance.toFixed(1)}m</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RadarDisplay;
