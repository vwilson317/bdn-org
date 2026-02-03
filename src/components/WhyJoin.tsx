import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Animated } from 'react-native';
import { theme } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_MOBILE = SCREEN_WIDTH < 768;
const CARD_WIDTH = IS_MOBILE ? SCREEN_WIDTH - 48 : 350;
const CARD_SPACING = 20;

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    title: 'Networking Opportunities',
    description: 'Digital nomads typically work independently, which can often be isolating. By coming together as a community, we provide opportunities for networking and building connections with like-minded individuals.',
    icon: '🤝',
  },
  {
    title: 'Sharing Knowledge & Resources',
    description: 'Our community serves as a platform for sharing knowledge and resources, such as tips for finding accommodation or the best co-working spaces in the area.',
    icon: '📚',
  },
  {
    title: 'Collaboration & Skill-sharing',
    description: 'By working together and sharing our skills and expertise, we can collaborate on projects and potentially even start businesses together.',
    icon: '💡',
  },
  {
    title: 'Social Support',
    description: 'Moving to a new place can be challenging, but being part of a community can provide social support and a sense of belonging.',
    icon: '❤️',
  },
  {
    title: 'Promoting Local Businesses',
    description: 'By supporting local businesses, we can help boost the economy of Brazil and create a mutually beneficial relationship between our community and the wider community.',
    icon: '🏪',
  },
];

export function WhyJoin() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(1)).current;

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
        <Text style={styles.title}>Why Join Our Community?</Text>
        <Text style={styles.subtitle}>
          As a community of digital nomads, remote workers and locals in Brazil, it is important to 
          understand the "why" behind our existence and the benefits of being part of it.
        </Text>
        
        {/* Swipe hint with animation */}
        <Animated.View style={[styles.swipeHint, { opacity: hintOpacity }]}>
          <Text style={styles.swipeHintText}>← Swipe to explore →</Text>
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
            {benefits.map((benefit, index) => {
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
                  key={index}
                  style={[
                    styles.benefitCard,
                    {
                      width: CARD_WIDTH,
                      marginRight: index === benefits.length - 1 ? 0 : CARD_SPACING,
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>

        {/* Scroll indicators with animation */}
        <View style={styles.indicators}>
          {benefits.map((_, index) => {
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

        <Text style={styles.footerText}>
          By understanding the "why" behind our community, we can better appreciate the benefits of 
          being part of it and work towards making it even stronger.
        </Text>
      </View>
    );
  }

  // Desktop layout (original)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Join Our Community?</Text>
      <Text style={styles.subtitle}>
        As a community of digital nomads, remote workers and locals in Brazil, it is important to 
        understand the "why" behind our existence and the benefits of being part of it.
      </Text>
      <View style={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>{benefit.icon}</Text>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitDescription}>{benefit.description}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.footerText}>
        By understanding the "why" behind our community, we can better appreciate the benefits of 
        being part of it and work towards making it even stronger.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: theme.bgSecondary,
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
  benefitsGrid: {
    gap: 24,
    marginBottom: 32,
  },
  benefitCard: {
    backgroundColor: theme.bgPrimary,
    borderRadius: theme.borderRadius,
    padding: 24,
    ...theme.shadow,
  },
  benefitIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  benefitDescription: {
    fontSize: 15,
    color: theme.textSecondary,
    lineHeight: 22,
  },
  footerText: {
    fontSize: 15,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
