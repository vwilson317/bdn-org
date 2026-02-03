import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_MOBILE = SCREEN_WIDTH < 768;

interface Announcement {
  title: string;
  startDate: string;
  endDate: string;
  icon?: string | number;
  whatsappLink?: string;
  instagramLink?: string;
}

const announcements: Announcement[] = [
  {
    title: 'Carnival Hackaton',
    startDate: 'February 2, 2026',
    endDate: 'March 1, 2026',
    icon: require('../../assets/logo-text-pink.png'),
    whatsappLink: 'https://chat.whatsapp.com/BlM8NsH1PgJ3B3FTBUUJz5?mode=gi_t',
    instagramLink: 'https://www.instagram.com/carioca_coastal_club',
  },
];

export function Announcements() {
  const { t } = useI18n();
  
  const formatDateRange = (start: string, end: string) => {
    return `${start} - ${end}`;
  };

  const parseDate = (dateString: string): Date => {
    // Parse date string like "February 2, 2026"
    return new Date(dateString);
  };

  const formatDateForCalendar = (date: Date): string => {
    // Format as YYYYMMDDTHHmmssZ (UTC)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}T000000Z`;
  };

  const handleAddToCalendar = (announcement: Announcement) => {
    const startDate = parseDate(announcement.startDate);
    const endDate = parseDate(announcement.endDate);
    
    // Set time to start of day for start, end of day for end
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    if (Platform.OS === 'web') {
      // Use Google Calendar URL for web
      const startStr = formatDateForCalendar(startDate);
      const endStr = formatDateForCalendar(endDate);
      const title = encodeURIComponent(announcement.title);
      const details = encodeURIComponent(`Join us for ${announcement.title}`);
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}`;
      
      Linking.openURL(googleCalendarUrl).catch((err) => {
        console.error('Failed to open Google Calendar:', err);
      });
    } else {
      // For native, try to open calendar app
      // iOS: calendar://
      // Android: content://com.android.calendar/time/
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      
      if (Platform.OS === 'ios') {
        // iOS calendar URL format
        const calendarUrl = `calshow:${startTime / 1000}`;
        Linking.openURL(calendarUrl).catch((err) => {
          console.error('Failed to open iOS calendar:', err);
          // Fallback: try to create .ics file
          createICSFile(announcement, startDate, endDate);
        });
      } else {
        // Android: try to open calendar
        const calendarUrl = `content://com.android.calendar/time/${startTime}`;
        Linking.canOpenURL(calendarUrl).then((supported) => {
          if (supported) {
            Linking.openURL(calendarUrl).catch((err) => {
              console.error('Failed to open Android calendar:', err);
              createICSFile(announcement, startDate, endDate);
            });
          } else {
            createICSFile(announcement, startDate, endDate);
          }
        });
      }
    }
  };

  const createICSFile = (announcement: Announcement, startDate: Date, endDate: Date) => {
    // Create .ics file content
    const startStr = formatDateForCalendar(startDate);
    const endStr = formatDateForCalendar(endDate);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Carnival Hackaton//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${announcement.title}`,
      `DESCRIPTION:Join us for ${announcement.title}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download (for web) or share (for native)
    if (Platform.OS === 'web') {
      // @ts-ignore - web-specific APIs
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      // @ts-ignore - web-specific APIs
      const url = URL.createObjectURL(blob);
      // @ts-ignore - web-specific APIs
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${announcement.title.replace(/\s+/g, '-')}.ics`);
      // @ts-ignore - web-specific APIs
      document.body.appendChild(link);
      link.click();
      // @ts-ignore - web-specific APIs
      document.body.removeChild(link);
      // @ts-ignore - web-specific APIs
      URL.revokeObjectURL(url);
    } else {
      // For native, we'd need a file system library to save the file
      // For now, just log it
      console.log('ICS file content:', icsContent);
    }
  };

  const handleJoinWhatsApp = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open WhatsApp:', err);
    });
  };

  const handleOpenInstagram = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open Instagram:', err);
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
              typeof announcement.icon === 'string' ? (
                <Text style={styles.announcementIcon}>{announcement.icon}</Text>
              ) : (
                <View style={styles.logoContainer}>
                  <Image 
                    source={announcement.icon} 
                    style={styles.announcementLogo}
                    contentFit="contain"
                  />
                </View>
              )
            )}
            <View style={styles.announcementContent}>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <TouchableOpacity
                onPress={() => handleAddToCalendar(announcement)}
                activeOpacity={0.7}
                style={styles.dateContainer}
              >
                <FontAwesome5 name="calendar-alt" size={14} color={theme.textSecondary} style={styles.calendarIcon} />
                <Text style={styles.announcementDate}>
                  {formatDateRange(announcement.startDate, announcement.endDate)}
                </Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                {announcement.instagramLink && (
                  <View
                    style={[
                      styles.instagramButtonWrapper,
                      Platform.OS === 'web' && {
                        // @ts-ignore - React Native Web CSS properties
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        backgroundColor: undefined,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.instagramButton}
                      onPress={() => handleOpenInstagram(announcement.instagramLink!)}
                      activeOpacity={0.8}
                    >
                      <FontAwesome5 name="instagram" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                )}
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
    ...theme.shadow,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  announcementIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
  },
  announcementLogo: {
    width: 200,
    height: 60,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  calendarIcon: {
    marginRight: 8,
  },
  announcementDate: {
    fontSize: 15,
    color: theme.textSecondary,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
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
    ...theme.shadow,
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.bgPrimary,
  },
  instagramButtonWrapper: {
    borderRadius: theme.borderRadius,
    backgroundColor: '#E1306C',
    ...theme.shadow,
    width: 44,
    height: 44,
  },
  instagramButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
});
