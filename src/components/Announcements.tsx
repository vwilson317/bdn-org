import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_MOBILE = SCREEN_WIDTH < 768;

interface Announcement {
  title: string;
  startDate: string;
  endDate: string;
  icon?: string;
  whatsappLink?: string;
}

const announcements: Announcement[] = [
  {
    title: 'Carioca Coastal Club Carnival Hackaton',
    startDate: 'February 2, 2026',
    endDate: 'March 1, 2026',
    icon: '🎉',
    whatsappLink: 'https://chat.whatsapp.com/BlM8NsH1PgJ3B3FTBUUJz5?mode=gi_t',
  },
];

export function Announcements() {
  const { t } = useI18n();
  
  const formatDateRange = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  const handleJoinWhatsApp = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open WhatsApp:', err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.announcements.title}</Text>
      <Text style={styles.subtitle}>
        {t.announcements.subtitle}
      </Text>
      <View style={styles.announcementsList}>
        {announcements.map((announcement, index) => (
          <View key={index} style={styles.announcementCard}>
            {announcement.icon && (
              <Text style={styles.announcementIcon}>{announcement.icon}</Text>
            )}
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementDate}>
                {formatDateRange(announcement.startDate, announcement.endDate)}
              </Text>
              {announcement.whatsappLink && (
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => handleJoinWhatsApp(announcement.whatsappLink!)}
                  activeOpacity={0.8}
                >
                  <FontAwesome5 name="whatsapp" size={18} color={theme.bgPrimary} />
                  <Text style={styles.joinButtonText}>{t.announcements.joinGroup}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: theme.bgPrimary,
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
    maxWidth: 600,
  },
  announcementsList: {
    width: '100%',
    maxWidth: 800,
    gap: 20,
  },
  announcementCard: {
    backgroundColor: theme.bgSecondary,
    borderRadius: theme.borderRadius,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...theme.shadow,
  },
  announcementIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: IS_MOBILE ? 18 : 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
    lineHeight: 26,
  },
  announcementDate: {
    fontSize: 15,
    color: theme.textSecondary,
    fontWeight: '500',
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
    ...theme.shadow,
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.bgPrimary,
  },
});
