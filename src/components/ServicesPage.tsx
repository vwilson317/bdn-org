import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';

interface Service {
  id: string;
  title: string;
  description: string;
  day: string;
  date: string;
  time: string;
  location: string;
  locationFull: string;
  category: string;
}

const allServices: Service[] = [
  {
    id: '1',
    title: 'Co-Working Space Access',
    description: 'Access to premium co-working spaces with high-speed internet and networking opportunities.',
    day: 'MONDAY',
    date: 'Every Week',
    time: '09:00h',
    location: 'Digital Hub',
    locationFull: 'Digital Hub - São Paulo',
    category: 'Workspace',
  },
  {
    id: '2',
    title: 'Portuguese Language Exchange',
    description: 'Practice Portuguese with locals and fellow nomads in a relaxed, friendly environment.',
    day: 'WEDNESDAY',
    date: 'Every Week',
    time: '18:00h',
    location: 'Café Cultural',
    locationFull: 'Café Cultural - Rio de Janeiro',
    category: 'Learning',
  },
  {
    id: '3',
    title: 'Business Networking Events',
    description: 'Connect with entrepreneurs, freelancers, and business professionals in Brazil.',
    day: 'FRIDAY',
    date: 'Monthly',
    time: '19:00h',
    location: 'Business Center',
    locationFull: 'Business Center - Florianópolis',
    category: 'Networking',
  },
  {
    id: '4',
    title: 'Housing Assistance',
    description: 'Get help finding short-term and long-term accommodation options in Brazil.',
    day: 'DAILY',
    date: 'On Demand',
    time: 'Flexible',
    location: 'Online',
    locationFull: 'Virtual Consultation',
    category: 'Support',
  },
  {
    id: '5',
    title: 'Visa & Legal Support',
    description: 'Expert guidance on visa requirements, work permits, and legal matters for digital nomads.',
    day: 'TUESDAY',
    date: 'By Appointment',
    time: 'Flexible',
    location: 'Legal Office',
    locationFull: 'Legal Office - São Paulo',
    category: 'Support',
  },
  {
    id: '6',
    title: 'Cultural Immersion Tours',
    description: 'Explore Brazilian culture, cuisine, and landmarks with fellow community members.',
    day: 'SATURDAY',
    date: 'Bi-weekly',
    time: '10:00h',
    location: 'Various',
    locationFull: 'Multiple Locations',
    category: 'Social',
  },
];

interface ServicesPageProps {
  onBack: () => void;
}

export function ServicesPage({ onBack }: ServicesPageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <FontAwesome5 name="arrow-left" size={20} color={theme.textPrimary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>All Community Services</Text>
      </View>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {allServices.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.banner}>
                <View style={styles.bannerLeft}>
                  <View style={styles.polkaDots}>
                    {[...Array(12)].map((_, i) => (
                      <View key={i} style={styles.dot} />
                    ))}
                  </View>
                  <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>BDN Service</Text>
                    <Text style={styles.bannerText}>{service.day}</Text>
                    <Text style={styles.bannerText}>{service.date}</Text>
                    <Text style={styles.bannerText}>{service.time}</Text>
                    <Text style={styles.bannerLocation}>{service.location}</Text>
                    <Text style={styles.bannerLocationSmall}>{service.locationFull}</Text>
                  </View>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{service.category}</Text>
                </View>
              </View>
              <View style={styles.contentArea}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.details}>
                  <View style={styles.detailRow}>
                    <FontAwesome5 name="calendar-alt" size={14} color="#000000" />
                    <Text style={styles.detailText}>{service.day}, {service.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <FontAwesome5 name="map-marker-alt" size={14} color="#000000" />
                    <Text style={styles.detailText}>{service.locationFull}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Service →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  },
  cardsContainer: {
    gap: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    borderRadius: theme.borderRadiusLarge,
    overflow: 'hidden',
    backgroundColor: theme.bgPrimary,
    ...theme.shadow,
  },
  banner: {
    backgroundColor: 'transparent',
    padding: 20,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 3,
    borderBottomColor: theme.gradient.middle,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  polkaDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 60,
    marginRight: 16,
    marginTop: 4,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.bgPrimary,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  bannerLocation: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textPrimary,
    marginTop: 8,
  },
  bannerLocationSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  contentArea: {
    padding: 24,
    backgroundColor: theme.bgPrimary,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  serviceDescription: {
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  details: {
    gap: 12,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    color: theme.textPrimary,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.gradient.middle,
  },
  viewButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.gradient.start,
  },
});
