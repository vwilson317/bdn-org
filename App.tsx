import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { I18nProvider } from './src/i18n/context';
import { Header } from './src/components/Header';
import { Hero } from './src/components/Hero';
import { Announcements } from './src/components/Announcements';
import { WhyJoin } from './src/components/WhyJoin';
import { Connect } from './src/components/Connect';
import { Carnival } from './src/components/Carnival';
import { CommunityServices } from './src/components/CommunityServices';
import { Team } from './src/components/Team';
import { Contact } from './src/components/Contact';
import { Footer } from './src/components/Footer';
import { ServicesPage } from './src/components/ServicesPage';
import { LandingPage } from './src/components/LandingPage';
import { theme } from './src/theme';
import { initPostHog, trackPageView, trackEvent } from './src/lib/posthog';
import { hasEngaged, recordEngagement, getCurrentPath } from './src/utils/visitTracking';

export default function App() {
  // ── Routing & visitor state ──────────────────────────────────────────────
  // path tracks the current URL so we can react to pushState changes.
  const [path, setPath] = useState<string>(() => getCurrentPath());
  // isReturning is true once the visitor has engaged (cookie present).
  const [isReturning, setIsReturning] = useState<boolean>(() => hasEngaged());

  // Show the minimal landing when:
  //  • not on /explore (which is always the full site), AND
  //  • no engagement cookie exists yet
  const showLanding = !path.startsWith('/explore') && !isReturning;

  const handleEngagement = (source: string) => {
    recordEngagement(source);
    trackEvent('visitor_engaged', { source });
    setIsReturning(true);
  };

  const handleExplore = () => {
    handleEngagement('explore_link');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/explore');
      setPath('/explore');
    }
  };

  // ── Full-site scroll state ───────────────────────────────────────────────
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionY, setSectionY] = useState({
    home: 0,
    whyJoin: 0,
    connect: 0,
    team: 0,
    register: 0,
  });
  const [showServicesPage, setShowServicesPage] = useState(false);
  const [showCarnivalPage, setShowCarnivalPage] = useState(false);

  // Initialize PostHog and listen for back/forward navigation
  useEffect(() => {
    initPostHog();
    if (!showLanding) {
      trackPageView('home');
    }
    // If someone navigates directly to /explore, mark them as engaged
    if (path.startsWith('/explore')) {
      recordEngagement('direct_explore');
    }
    if (typeof window !== 'undefined') {
      const handlePopState = () => setPath(window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToSection = (section: keyof typeof sectionY, offset: number = 20) => {
    const y = sectionY[section];
    const scrollY = Math.max(0, y - offset);
    scrollViewRef.current?.scrollTo({ y: scrollY, animated: true });
  };

  const scrollToHome = () => {
    trackPageView('home');
    scrollToSection('home', 0);
  };
  const scrollToWhyJoin = () => {
    trackPageView('why_join');
    scrollToSection('whyJoin');
  };
  const scrollToConnect = () => {
    trackPageView('connect');
    scrollToSection('connect');
  };
  const scrollToCarnival = () => {
    trackPageView('carnival');
    setShowCarnivalPage(true);
  };
  const scrollToTeam = () => {
    trackPageView('team');
    scrollToSection('team');
  };
  const scrollToRegister = () => {
    trackPageView('register');
    scrollToSection('register');
  };

  // ── Landing page (first-time visitors) ──────────────────────────────────
  if (showLanding) {
    return (
      <I18nProvider>
        <View style={styles.container}>
          <LandingPage onEngagement={handleEngagement} onExplore={handleExplore} />
        </View>
      </I18nProvider>
    );
  }

  if (showServicesPage) {
    return (
      <I18nProvider>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <ServicesPage onBack={() => {
            trackPageView('home');
            setShowServicesPage(false);
          }} />
        </View>
      </I18nProvider>
    );
  }

  if (showCarnivalPage) {
    return (
      <I18nProvider>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Carnival onBack={() => {
            trackPageView('home');
            setShowCarnivalPage(false);
          }} />
        </View>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header 
          onHomePress={scrollToHome}
          onWhyJoinPress={scrollToWhyJoin}
          onConnectPress={scrollToConnect}
          onCarnivalPress={scrollToCarnival}
          onTeamPress={scrollToTeam}
          onRegisterPress={scrollToRegister}
        />
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSectionY(prev => ({ ...prev, home: y }));
            }}
          >
            <Hero />
          </View>
          <Announcements />
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSectionY(prev => ({ ...prev, whyJoin: y }));
            }}
          >
            <WhyJoin />
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSectionY(prev => ({ ...prev, connect: y }));
            }}
          >
            <Connect />
          </View>
          <CommunityServices onShowMore={() => {
            trackPageView('services');
            setShowServicesPage(true);
          }} />
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSectionY(prev => ({ ...prev, team: y }));
            }}
          >
            <Team />
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setSectionY(prev => ({ ...prev, register: y }));
            }}
          >
            <Contact />
          </View>
          <Footer />
        </ScrollView>
      </View>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
