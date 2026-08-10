// AuraWave Charging Physics Simulation Engine
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POWER_OUTPUT, MAX_DISTANCE, OPTIMAL_DISTANCE, BATTERY_MAX } from './constants';

class ChargingEngine {
  constructor() {
    this.currentBattery = 50;
    this.currentMode = 'Auto';
    this.distance = 2;
    this.isCharging = false;
    this.chargeHistory = [];
    this.totalEnergyHarvested = 0; // Watt-hours
    this.sessionStartTime = null;
  }

  // Calculate power based on distance and mode
  calculatePower(distance, mode) {
    const basePower = POWER_OUTPUT[mode] || POWER_OUTPUT.AUTO;
    
    // Distance falloff: power decreases with square of distance
    const distanceFactor = Math.max(0, 1 - (distance / MAX_DISTANCE) ** 2);
    const effectivePower = basePower * distanceFactor;
    
    return Math.max(0, effectivePower);
  }

  // Calculate efficiency based on temperature
  calculateEfficiency(temperature) {
    // Optimal temperature: 25°C
    // Efficiency decreases by 2% per 5°C deviation
    const optimalTemp = 25;
    const deviation = Math.abs(temperature - optimalTemp);
    const efficiency = Math.max(0.5, 1 - (deviation / 5) * 0.02);
    return efficiency;
  }

  // Main charging update loop (call every second)
  updateCharging(distance, mode, temperature = 25) {
    if (!this.isCharging) return;

    const power = this.calculatePower(distance, mode);
    const efficiency = this.calculateEfficiency(temperature);
    const effectivePower = power * efficiency;

    // Convert watts to percentage per second (assuming 5000mAh battery = 18.5Wh)
    const batteryCapacity = 18.5; // Wh
    const percentagePerSecond = (effectivePower / batteryCapacity) * 100;

    // Update battery
    this.currentBattery = Math.min(
      BATTERY_MAX,
      this.currentBattery + percentagePerSecond
    );

    // Track energy
    const energyThisSecond = effectivePower / 3600; // Convert W to Wh per second
    this.totalEnergyHarvested += energyThisSecond;

    // Update distance (simulate slight movement)
    this.distance = distance + (Math.random() - 0.5) * 0.5;

    // Log to history
    this.chargeHistory.push({
      timestamp: Date.now(),
      battery: this.currentBattery,
      power: effectivePower,
      distance: this.distance,
      efficiency
    });

    // Keep only last 3600 entries (1 hour at 1/sec)
    if (this.chargeHistory.length > 3600) {
      this.chargeHistory.shift();
    }

    return {
      battery: this.currentBattery,
      power: effectivePower,
      distance: this.distance,
      efficiency,
      eta: this.calculateETA()
    };
  }

  // Calculate time to full charge
  calculateETA() {
    const remainingBattery = BATTERY_MAX - this.currentBattery;
    const avgPower = 12; // Average 12W
    const batteryCapacity = 18.5;
    const remainingWh = (remainingBattery / 100) * batteryCapacity;
    const secondsToFull = (remainingWh / avgPower) * 3600;
    
    const minutes = Math.floor(secondsToFull / 60);
    const seconds = Math.floor(secondsToFull % 60);
    
    return { minutes, seconds };
  }

  // Start charging session
  startCharging(mode = 'Auto') {
    this.isCharging = true;
    this.currentMode = mode;
    this.sessionStartTime = Date.now();
  }

  // Stop charging session
  stopCharging() {
    this.isCharging = false;
  }

  // Get statistics
  getStats() {
    const sessionDuration = this.sessionStartTime 
      ? (Date.now() - this.sessionStartTime) / 1000 / 60 // minutes
      : 0;

    return {
      currentBattery: this.currentBattery,
      totalEnergyHarvested: this.totalEnergyHarvested.toFixed(2),
      sessionDuration: Math.floor(sessionDuration),
      averagePower: sessionDuration > 0 
        ? ((this.totalEnergyHarvested / sessionDuration) * 60).toFixed(2)
        : 0,
      isCharging: this.isCharging,
      mode: this.currentMode,
      distance: this.distance.toFixed(1)
    };
  }

  // Save to storage
  async saveSession() {
    try {
      const sessionData = {
        date: new Date().toISOString(),
        ...this.getStats()
      };
      
      const existing = await AsyncStorage.getItem('chargingSessions');
      const sessions = existing ? JSON.parse(existing) : [];
      sessions.push(sessionData);
      
      await AsyncStorage.setItem('chargingSessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  // Load sessions from storage
  async loadSessions() {
    try {
      const data = await AsyncStorage.getItem('chargingSessions');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }
}

export default new ChargingEngine();
