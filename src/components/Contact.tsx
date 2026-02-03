import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';
import { trackEvent } from '../lib/posthog';

const REGISTRATION_FORM_URL = 'https://form.typeform.com/to/dAkHiZxN';

export function Contact() {
  const { t } = useI18n();
  
  const openRegistrationForm = async () => {
    try {
      const supported = await Linking.canOpenURL(REGISTRATION_FORM_URL);
      if (supported) {
        trackEvent('registration_form_opened', {
          form_url: REGISTRATION_FORM_URL,
        });
        await Linking.openURL(REGISTRATION_FORM_URL);
      }
    } catch (error) {
      console.error('Error opening registration form:', error);
      trackEvent('registration_form_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t.contact.title}</Text>
        <Text style={styles.description}>
          {t.contact.description}
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={openRegistrationForm}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t.contact.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: theme.bgPrimary,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    maxWidth: 600,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    minWidth: 200,
    borderWidth: 2,
    borderColor: theme.gradient.middle,
    ...theme.shadow,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.gradient.start,
  },
});
