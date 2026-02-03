import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/K5LTdexWpVgGJK66Iso9PC?utm_campaign=WhatsApp%20General%20Group%20Chat&utm_medium=web&utm_source=beacons';

export function Hero() {
  const { t } = useI18n();
  
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
      <Text style={styles.title}>{t.hero.title}</Text>
      <Text style={styles.subtitle}>{t.hero.subtitle}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          {t.hero.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.whatsappButton} onPress={handleJoinWhatsApp}>
        <FontAwesome5 name="whatsapp" size={24} color={theme.bgPrimary} />
        <Text style={styles.whatsappButtonText}>{t.hero.joinWhatsApp}</Text>
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.gradient.middle,
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
    backgroundColor: '#2ECC71',
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
  whatsappButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.bgPrimary,
    textAlign: 'center',
  },
});
