import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { theme } from '../theme';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/K5LTdexWpVgGJK66Iso9PC?utm_campaign=WhatsApp%20General%20Group%20Chat&utm_medium=web&utm_source=beacons';

export function Hero() {
  const handleJoinWhatsApp = () => {
    Linking.openURL(WHATSAPP_GROUP_LINK).catch((err) => {
      console.error('Failed to open WhatsApp:', err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>BDN</Text>
        </View>
      </View>
      <Text style={styles.title}>Brazil Digital Nomads</Text>
      <Text style={styles.subtitle}>Where Brazilian coastal vibes meet digital innovation</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Join our vibrant community of digital nomads, remote workers and locals in beautiful Brazil. 
          We're building connections, sharing knowledge, and creating opportunities while living the 
          remote work dream by the Brazilian coast.
        </Text>
      </View>
      <TouchableOpacity style={styles.whatsappButton} onPress={handleJoinWhatsApp}>
        <Text style={styles.whatsappIcon}>💬</Text>
        <Text style={styles.whatsappButtonText}>Join Our Community on WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: theme.bgPrimary,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.textPrimary,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.textPrimary,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  descriptionBox: {
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadius,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    maxWidth: 600,
    ...theme.shadow,
  },
  description: {
    fontSize: 16,
    color: theme.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minWidth: 280,
    ...theme.shadow,
  },
  whatsappIcon: {
    fontSize: 24,
  },
  whatsappButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.bgPrimary,
    textAlign: 'center',
  },
});
