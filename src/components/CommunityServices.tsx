import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Animated } from 'react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_MOBILE = SCREEN_WIDTH < 768;
const CARD_WIDTH = IS_MOBILE ? SCREEN_WIDTH - 48 : 350;
const CARD_SPACING = 20;

interface Service {
  id: string;
  title: string;
  description: string;
  day: string;
  date: string;
  time: string;
  location: string;
  locationFull: string;
  imageUri?: string;
}

const featuredServices: Service[] = [
  {
    id: '1',
    title: 'Co-Working Space Access',
    description: 'Access to premium co-working spaces with high-speed internet and networking opportunities.',
    day: 'MONDAY',
    date: 'Every Week',
    time: '09:00h',
    location: 'Digital Hub',
    locationFull: 'Digital Hub - São Paulo',
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
  },
];

interface CommunityServicesProps {
  onShowMore?: () => void;
}

export function CommunityServices({ onShowMore }: CommunityServicesProps) {
  const { t } = useI18n();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(1)).current;

  // Map service data with translations
  const getTranslatedService = (service: Service): Service => {
    const dayMap: Record<string, string> = {
      'MONDAY': t.communityServices.days.monday,
      'TUESDAY': t.communityServices.days.tuesday,
      'WEDNESDAY': t.communityServices.days.wednesday,
      'THURSDAY': t.communityServices.days.thursday,
      'FRIDAY': t.communityServices.days.friday,
      'SATURDAY': t.communityServices.days.saturday,
      'SUNDAY': t.communityServices.days.sunday,
      'DAILY': t.communityServices.days.daily,
    };
    
    const dateMap: Record<string, string> = {
      'Every Week': t.communityServices.dates.everyWeek,
      'Monthly': t.communityServices.dates.monthly,
      'Bi-weekly': t.communityServices.dates.biWeekly,
      'On Demand': t.communityServices.dates.onDemand,
      'By Appointment': t.communityServices.dates.byAppointment,
    };
    
    const timeMap: Record<string, string> = {
      'Flexible': t.communityServices.times.flexible,
    };

    return {
      ...service,
      day: dayMap[service.day] || service.day,
      date: dateMap[service.date] || service.date,
      time: timeMap[service.time] || service.time,
    };
  };

  const translatedServices = featuredServices.map(getTranslatedService);

  useEffect(() => {
    // Pulse animation for hint
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(hintOpacity, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(hintOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        setCurrentIndex(index);
      },
    }
  );

  if (IS_MOBILE) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t.communityServices.title}</Text>
        <Text style={styles.subtitle}>
          {t.communityServices.subtitle}
        </Text>
        
        {/* Swipe hint with animation */}
        <Animated.View style={[styles.swipeHint, { opacity: hintOpacity }]}>
          <Text style={styles.swipeHintText}>{t.communityServices.swipeHint}</Text>
        </Animated.View>

        <View style={styles.scrollContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled={false}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            snapToAlignment="start"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {translatedServices.map((service, index) => {
              const inputRange = [
                (index - 1) * (CARD_WIDTH + CARD_SPACING),
                index * (CARD_WIDTH + CARD_SPACING),
                (index + 1) * (CARD_WIDTH + CARD_SPACING),
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={service.id}
                  style={[
                    styles.card,
                    {
                      width: CARD_WIDTH,
                      marginRight: index === translatedServices.length - 1 ? 0 : CARD_SPACING,
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <View style={styles.banner}>
                    <Text style={styles.bannerTitle}>{t.communityServices.bdnService}</Text>
                    <Text style={styles.bannerText}>{service.day} • {service.date} • {service.time}</Text>
                    <Text style={styles.bannerLocation}>{service.locationFull}</Text>
                  </View>
                  <View style={styles.contentArea}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceDescription}>{service.description}</Text>
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>{t.communityServices.viewService}</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>

        {/* Scroll indicators with animation */}
        <View style={styles.indicators}>
          {translatedServices.map((_, index) => {
            const indicatorWidth = scrollX.interpolate({
              inputRange: [
                (index - 1) * (CARD_WIDTH + CARD_SPACING),
                index * (CARD_WIDTH + CARD_SPACING),
                (index + 1) * (CARD_WIDTH + CARD_SPACING),
              ],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });

            const isActive = index === currentIndex;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  {
                    width: indicatorWidth,
                    backgroundColor: isActive ? theme.gradient.middle : theme.borderColor,
                  },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.showMoreButton} onPress={onShowMore}>
          <Text style={styles.showMoreText}>{t.communityServices.showMore}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Desktop layout (original)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.communityServices.title}</Text>
      <Text style={styles.subtitle}>
        {t.communityServices.subtitle}
      </Text>
      <View style={styles.cardsContainer}>
        {translatedServices.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.banner}>
              <Text style={styles.bannerTitle}>{t.communityServices.bdnService}</Text>
              <Text style={styles.bannerText}>{service.day} • {service.date} • {service.time}</Text>
              <Text style={styles.bannerLocation}>{service.locationFull}</Text>
            </View>
            <View style={styles.contentArea}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>{t.communityServices.viewService}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.showMoreButton} onPress={onShowMore}>
        <Text style={styles.showMoreText}>{t.communityServices.showMore}</Text>
      </TouchableOpacity>
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
  },
  swipeHint: {
    marginBottom: 16,
    alignItems: 'center',
  },
  swipeHintText: {
    fontSize: 13,
    color: theme.textLight,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    position: 'relative',
    marginBottom: 32,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
    marginTop: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.borderColor,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
    width: '100%',
    maxWidth: 1200,
  },
  card: {
    width: '100%',
    maxWidth: 350,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
    backgroundColor: theme.bgPrimary,
    borderWidth: 1,
    borderColor: theme.borderColor,
  },
  banner: {
    backgroundColor: 'transparent',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: theme.gradient.middle,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 4,
  },
  bannerLocation: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  contentArea: {
    padding: 20,
    backgroundColor: theme.bgPrimary,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  viewButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.gradient.middle,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.gradient.start,
  },
  showMoreButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: theme.borderRadius,
    borderWidth: 1,
    borderColor: theme.borderColor,
    backgroundColor: 'transparent',
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
});
