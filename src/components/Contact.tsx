import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { theme } from '../theme';

const REGISTRATION_FORM_URL = 'https://form.typeform.com/to/dAkHiZxN';

export function Contact() {
  const openRegistrationForm = async () => {
    try {
      const supported = await Linking.canOpenURL(REGISTRATION_FORM_URL);
      if (supported) {
        await Linking.openURL(REGISTRATION_FORM_URL);
      }
    } catch (error) {
      console.error('Error opening registration form:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register Community Service</Text>
        <Text style={styles.description}>
          Offer your services to members of the community. These will be reviewed by the team and we will contact you.
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={openRegistrationForm}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Register Your Service</Text>
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
