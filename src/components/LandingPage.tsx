/**
 * LandingPage — shown to first-time visitors at the root URL.
 *
 * Design goals:
 *  • Fits entirely within a single mobile viewport (no scroll).
 *  • A curated "link in bio" list of the community's key channels.
 *  • Any click records engagement → returning visitors see the full Explorer.
 *  • The "Explore" link navigates to /explore (always full site).
 */

import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { trackPageView, trackEvent } from '../lib/posthog';

// ─── Link definitions ────────────────────────────────────────────────────────

interface LinkDef {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  url: string | null; // null = internal navigation
  iconColor: string;
  iconBg: string;
}

const LANDING_LINKS: LinkDef[] = [
  {
    id: 'whatsapp',
    label: 'Join WhatsApp Group',
    sublabel: 'Chat with the community',
    icon: 'whatsapp',
    url: 'https://chat.whatsapp.com/K5LTdexWpVgGJK66Iso9PC?utm_campaign=WhatsApp%20General%20Group%20Chat&utm_medium=web&utm_source=beacons',
    iconColor: '#25D366',
    iconBg: '#E8FFF2',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    sublabel: '@riodigitalnomads',
    icon: 'instagram',
    url: 'https://www.instagram.com/riodigitalnomads',
    iconColor: '#E1306C',
    iconBg: '#FFF0F5',
  },
  {
    id: 'register',
    label: 'Register to Join',
    sublabel: 'Become a member',
    icon: 'pen-alt',
    url: 'https://form.typeform.com/to/dAkHiZxN',
    iconColor: theme.yellow,
    iconBg: '#EBF8FF',
  },
  {
    id: 'explore',
    label: 'Explore the Community Hub',
    sublabel: 'Events, services, team & more',
    icon: 'globe-americas',
    url: null, // handled by onExplore
    iconColor: theme.textPrimary,
    iconBg: theme.bgSecondary,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface LandingPageProps {
  onEngagement: (source: string) => void;
  onExplore: () => void;
}

export function LandingPage({ onEngagement, onExplore }: LandingPageProps) {
  useEffect(() => {
    trackPageView('landing');
  }, []);

  const handlePress = (link: LinkDef) => {
    onEngagement(link.id);
    trackEvent('landing_link_clicked', { link_id: link.id, label: link.label });
    if (link.id === 'explore') {
      onExplore();
    } else if (link.url) {
      Linking.openURL(link.url).catch((err) =>
        console.error('Failed to open link:', err)
      );
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* ── Identity header ──────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>BDN</Text>
        </View>
        <Text style={styles.title}>Brazil Digital Nomads</Text>
        <Text style={styles.subtitle}>Rio de Janeiro · Community</Text>
      </View>

      {/* ── Link list ─────────────────────────────────────────── */}
      <View style={styles.linkList}>
        {LANDING_LINKS.map((link) => (
          <TouchableOpacity
            key={link.id}
            style={styles.linkRow}
            onPress={() => handlePress(link)}
            activeOpacity={0.72}
            accessibilityRole="link"
            accessibilityLabel={link.label}
          >
            {/* Icon bubble */}
            <View style={[styles.iconWrap, { backgroundColor: link.iconBg }]}>
              <FontAwesome5 name={link.icon as any} size={19} color={link.iconColor} />
            </View>

            {/* Text */}
            <View style={styles.linkText}>
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Text style={styles.linkSub}>{link.sublabel}</Text>
            </View>

            {/* Chevron */}
            <FontAwesome5 name="chevron-right" size={11} color={theme.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Footer ───────────────────────────────────────────── */}
      <Text style={styles.footer}>brazildigitalnomads.org</Text>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 32 : 52, // account for status bar on native
    paddingBottom: 24,
    justifyContent: 'space-between',
  },

  // Header
  header: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2.5,
    borderColor: theme.gradient.middle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  logoText: {
    fontSize: 21,
    fontWeight: '800',
    color: theme.textPrimary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: theme.textLight,
    textAlign: 'center',
  },

  // Links
  linkList: {
    gap: 10,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.borderColor,
    gap: 12,
    ...theme.shadow,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  linkText: {
    flex: 1,
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  linkSub: {
    fontSize: 11,
    color: theme.textLight,
    marginTop: 1,
  },

  // Footer
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.textLight,
    letterSpacing: 0.3,
  },
});
