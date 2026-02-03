import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

interface InstagramLink {
  name: string;
  handle: string;
  url: string;
}

interface CarnivalProps {
  onBack: () => void;
}

export function Carnival({ onBack }: CarnivalProps) {
  const { t } = useI18n();

  const instagramLinks: InstagramLink[] = [
    { name: t.carnival.instagram.blocosRio.name, handle: t.carnival.instagram.blocosRio.handle, url: 'https://www.instagram.com/blocosriodejaneiro' },
    { name: t.carnival.instagram.blocosRJ.name, handle: t.carnival.instagram.blocosRJ.handle, url: 'https://www.instagram.com/blocosrj' },
    { name: t.carnival.instagram.carnavalRio.name, handle: t.carnival.instagram.carnavalRio.handle, url: 'https://www.instagram.com/carnavalriodejaneiro' },
    { name: t.carnival.instagram.rioCarnival.name, handle: t.carnival.instagram.rioCarnival.handle, url: 'https://www.instagram.com/riocarnival' },
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open link:', err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome5 name="arrow-left" size={20} color={theme.textPrimary} />
          <Text style={styles.backText}>{t.servicesPage.back}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{t.carnival.title}</Text>
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          {t.carnival.subtitle}
        </Text>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.carnival.aboutBlocos.title}</Text>
            <Text style={styles.sectionText}>
              {t.carnival.aboutBlocos.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.carnival.borario.title}</Text>
            <Text style={styles.sectionText}>
              {t.carnival.borario.description}
            </Text>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => handleLinkPress('https://borario.com')}
              activeOpacity={0.7}
            >
              <Text style={styles.linkButtonText}>{t.carnival.borario.visitWebsite}</Text>
              <FontAwesome5 name="external-link-alt" size={14} color={theme.bgPrimary} style={styles.linkIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.carnival.instagram.title}</Text>
            <Text style={styles.sectionText}>
              {t.carnival.instagram.description}
            </Text>
            <View style={styles.instagramGrid}>
              {instagramLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.instagramCard}
                  onPress={() => handleLinkPress(link.url)}
                  activeOpacity={0.8}
                >
                  <View style={styles.instagramIconContainer}>
                    <FontAwesome5 name="instagram" size={24} color="#E4405F" />
                  </View>
                  <Text style={styles.instagramName}>{link.name}</Text>
                  <Text style={styles.instagramHandle}>@{link.handle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: theme.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    maxWidth: 800,
  },
  card: {
    backgroundColor: theme.bgSecondary,
    borderRadius: theme.borderRadiusLarge,
    padding: 32,
    width: '100%',
    maxWidth: 800,
    ...theme.shadow,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.gradient.start,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius,
    gap: 8,
    alignSelf: 'flex-start',
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  linkButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.bgPrimary,
  },
  linkIcon: {
    marginLeft: 4,
  },
  instagramGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  instagramCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadius,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.borderColor,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  instagramIconContainer: {
    marginBottom: 12,
  },
  instagramName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  instagramHandle: {
    fontSize: 12,
    color: theme.textLight,
    textAlign: 'center',
  },
});
