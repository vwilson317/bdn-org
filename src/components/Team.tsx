import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { getFlagEmoji } from '../utils/flags';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  initial: string;
  countryCode: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Janeesa Hollingshead',
    role: 'Community Coordinator',
    description: 'Janeesa loves creating a positive community in Brazil. She helps people feel welcome, answers their questions and makes spaces fun and useful. She\'s a passionate coordinator for the Brazil Digital Nomads project.',
    initial: 'J',
    countryCode: 'US',
  },
  {
    name: 'Lauro Lana',
    role: 'Community Founder',
    description: 'Lauro loves to connect people. That is why he founded the Brazil Digital Nomads community, and is all about supporting inclusion and social projects. He is the go-to person for local contacts, thanks to his strong ties in the community.',
    initial: 'L',
    countryCode: 'BR',
  },
  {
    name: 'Vincent Wilson',
    role: 'Ambassador',
    description: 'Vincent is passionate about building connections and sharing knowledge within the digital nomad community. As an ambassador, he helps newcomers navigate Brazil and creates opportunities for meaningful connections.',
    initial: 'V',
    countryCode: 'US',
  },
];

export function Team() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meet the Team</Text>
      <Text style={styles.subtitle}>
        The passionate people behind Brazil Digital Nomads
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
    backgroundColor: theme.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    color: theme.yellowDark,
    marginBottom: 16,
  },
  memberDescription: {
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
});
