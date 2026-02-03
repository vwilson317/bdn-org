import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { getFlagEmoji } from '../utils/flags';
import { useI18n } from '../i18n/context';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  initial: string;
  countryCode: string;
}

export function Team() {
  const { t } = useI18n();

  const teamMembers: TeamMember[] = [
    {
      name: 'Janeesa Hollingshead',
      role: t.team.roles.coordinator,
      description: 'Janeesa loves creating a positive community in Brazil. She helps people feel welcome, answers their questions and makes spaces fun and useful. She\'s a passionate coordinator for the Brazil Digital Nomads project.',
      initial: 'J',
      countryCode: 'US',
    },
    {
      name: 'Lauro Lana',
      role: t.team.roles.founder,
      description: 'Lauro loves to connect people. That is why he founded the Brazil Digital Nomads community, and is all about supporting inclusion and social projects. He is the go-to person for local contacts, thanks to his strong ties in the community.',
      initial: 'L',
      countryCode: 'BR',
    },
    {
      name: 'Vincent Wilson',
      role: t.team.roles.ambassador,
      description: 'Vincent is passionate about building connections and sharing knowledge within the digital nomad community. As an ambassador, he helps newcomers navigate Brazil and creates opportunities for meaningful connections.',
      initial: 'V',
      countryCode: 'US',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.team.title}</Text>
      <Text style={styles.subtitle}>
        {t.team.subtitle}
      </Text>
      <View style={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.memberCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{member.initial}</Text>
            </View>
            <View style={styles.nameRow}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.flag}>{getFlagEmoji(member.countryCode)}</Text>
            </View>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberDescription}>{member.description}</Text>
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
  teamGrid: {
    gap: 32,
    width: '100%',
    maxWidth: 800,
  },
  memberCard: {
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadius,
    padding: 32,
    alignItems: 'center',
    ...theme.shadow,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: theme.gradient.middle,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.textPrimary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  flag: {
    fontSize: 24,
  },
  memberRole: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.gradient.start,
    marginBottom: 16,
  },
  memberDescription: {
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
});
