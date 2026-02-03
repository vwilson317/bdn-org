import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

export function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Brazil Digital Nomads</Text>
          <Text style={styles.description}>
            Building connections, sharing knowledge, and creating opportunities for digital nomads 
            in beautiful Brazil.
          </Text>
        </View>
        <View style={styles.links}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Legal & Privacy</Text>
          </TouchableOpacity>
          <Text style={styles.copyright}>
            © 2025 Brazil Digital Nomads. Building community by the Brazilian coast.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.bgSecondary,
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: theme.borderColor,
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  links: {
    gap: 12,
  },
  linkText: {
    fontSize: 14,
    color: theme.textSecondary,
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: theme.textLight,
    lineHeight: 18,
  },
});
