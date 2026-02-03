import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, Animated } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

interface SocialLink {
  name: string;
  iconName: string;
  iconType: 'fa5' | 'fa';
  backgroundColor: string;
  url?: string;
}

const socialLinks: SocialLink[] = [
  { name: 'WhatsApp', iconName: 'whatsapp', iconType: 'fa5', backgroundColor: '#D4EDDA', url: 'https://chat.whatsapp.com/K5LTdexWpVgGJK66Iso9PC?utm_campaign=WhatsApp%20General%20Group%20Chat&utm_medium=web&utm_source=beacons' },
  { name: 'Instagram', iconName: 'instagram', iconType: 'fa5', backgroundColor: '#FFE4E6', url: 'https://www.instagram.com/riodigitalnomads' },
  { name: 'Facebook', iconName: 'facebook', iconType: 'fa5', backgroundColor: '#E3F2FD' },
  { name: 'Medium', iconName: 'medium', iconType: 'fa5', backgroundColor: '#FFFFFF' },
  { name: 'LinkedIn', iconName: 'linkedin', iconType: 'fa5', backgroundColor: '#E3F2FD' },
  { name: 'Eventbrite', iconName: 'calendar-alt', iconType: 'fa5', backgroundColor: '#FFF3E0' },
];

function SocialCard({ link, index, onPress }: { link: SocialLink; index: number; onPress: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconScaleAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isHovered ? 1.05 : 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.spring(iconScaleAnim, {
        toValue: isHovered ? 1.1 : 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowAnim, {
        toValue: isHovered ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isHovered, scaleAnim, iconScaleAnim, shadowAnim]);

  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      setIsHovered(false);
    }
  };

  const shadowOpacity = shadowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  const shadowRadius = shadowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  return (
    <TouchableOpacity 
      style={styles.socialCard}
      onPress={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.socialCardAnimated,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.socialIconContainer,
            { backgroundColor: link.backgroundColor },
            {
              transform: [{ scale: iconScaleAnim }],
              shadowOpacity,
              shadowRadius,
            },
          ]}
        >
          {link.iconType === 'fa5' ? (
            <FontAwesome5 name={link.iconName as any} size={24} color="#000000" style={styles.icon} />
          ) : (
            <FontAwesome name={link.iconName as any} size={24} color="#000000" style={styles.icon} />
          )}
        </Animated.View>
        <Text style={styles.socialName}>{link.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function Connect() {
  const { t } = useI18n();
  
  const handleSocialClick = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) => {
        console.error('Failed to open link:', err);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.connect.title}</Text>
      <Text style={styles.subtitle}>
        {t.connect.subtitle}
      </Text>
      <View style={styles.card}>
        <View style={styles.socialGrid}>
          {socialLinks.map((link, index) => (
            <SocialCard
              key={index}
              link={link}
              index={index}
              onPress={() => handleSocialClick(link.url)}
            />
          ))}
        </View>
        <Text style={styles.footerText}>
          {t.connect.footerText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: theme.bgSecondary,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  card: {
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadiusLarge,
    padding: 32,
    width: '100%',
    maxWidth: 800,
    ...theme.shadow,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  socialCard: {
    width: '30%',
    minWidth: 100,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  socialCardAnimated: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  icon: {
    opacity: 1,
  },
  socialName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 15,
    color: theme.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
});
