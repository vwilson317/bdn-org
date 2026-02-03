import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useRef, useState } from 'react';
import { Header } from './src/components/Header';
import { Hero } from './src/components/Hero';
import { Announcements } from './src/components/Announcements';
import { WhyJoin } from './src/components/WhyJoin';
import { Connect } from './src/components/Connect';
import { CommunityServices } from './src/components/CommunityServices';
import { Team } from './src/components/Team';
import { Contact } from './src/components/Contact';
import { Footer } from './src/components/Footer';
import { ServicesPage } from './src/components/ServicesPage';
import { theme } from './src/theme';

export default function App() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionY, setSectionY] = useState({
    home: 0,
    whyJoin: 0,
    connect: 0,
    team: 0,
    register: 0,
  });
  const [showServicesPage, setShowServicesPage] = useState(false);

  const scrollToSection = (section: keyof typeof sectionY, offset: number = 20) => {
    const y = sectionY[section];
    const scrollY = Math.max(0, y - offset);
    scrollViewRef.current?.scrollTo({ y: scrollY, animated: true });
  };

  const scrollToHome = () => scrollToSection('home', 0);
  const scrollToWhyJoin = () => scrollToSection('whyJoin');
  const scrollToConnect = () => scrollToSection('connect');
  const scrollToTeam = () => scrollToSection('team');
  const scrollToRegister = () => scrollToSection('register');

  if (showServicesPage) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ServicesPage onBack={() => setShowServicesPage(false)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        onHomePress={scrollToHome}
        onWhyJoinPress={scrollToWhyJoin}
        onConnectPress={scrollToConnect}
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
        <CommunityServices onShowMore={() => setShowServicesPage(true)} />
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
