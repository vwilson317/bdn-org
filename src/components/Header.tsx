import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, useWindowDimensions } from 'react-native';
import { theme } from '../theme';
import { useI18n } from '../i18n/context';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  onHomePress?: () => void;
  onWhyJoinPress?: () => void;
  onConnectPress?: () => void;
  onTeamPress?: () => void;
  onRegisterPress?: () => void;
}

export function Header({ 
  onHomePress, 
  onWhyJoinPress, 
  onConnectPress, 
  onTeamPress,
  onRegisterPress
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuVisible, setMenuVisible] = useState(false);
  const { t } = useI18n();

  const handleNavPress = (callback?: () => void) => {
    setMenuVisible(false);
    callback?.();
  };

  const navItems: Array<{
    label: string;
    onPress?: () => void;
  }> = [
    { label: t.header.home, onPress: onHomePress },
    { label: t.header.whyJoin, onPress: onWhyJoinPress },
    { label: t.header.connect, onPress: onConnectPress },
    { label: t.header.team, onPress: onTeamPress },
    { label: isMobile ? t.header.registerServiceShort : t.header.registerService, onPress: onRegisterPress },
  ];

  return (
    <View style={[
      styles.container,
      { 
        paddingHorizontal: isMobile ? 16 : 24,
        paddingVertical: isMobile ? 12 : 16,
        minHeight: isMobile ? 56 : 64,
      }
    ]}>
      <View style={[
        styles.logoContainer,
        { gap: isMobile ? 8 : 12 }
      ]}>
        <View style={[
          styles.logoCircle,
          {
            width: isMobile ? 36 : 40,
            height: isMobile ? 36 : 40,
            borderRadius: isMobile ? 18 : 20,
          }
        ]}>
          <Text style={[
            styles.logoText,
            { fontSize: isMobile ? 12 : 14 }
          ]}>BDN</Text>
        </View>
        {!isMobile && (
          <Text style={[
            styles.logoTextFull,
            { fontSize: 16 }
          ]}>Brazil Digital Nomads</Text>
        )}
      </View>
      
      {isMobile ? (
        <>
          <View style={styles.mobileRightContainer}>
            <LanguageSelector />
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.hamburger}>
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
                <View style={styles.hamburgerLine} />
              </View>
            </TouchableOpacity>
          </View>
          
          <Modal
            visible={menuVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setMenuVisible(false)}
          >
            <Pressable 
              style={styles.modalOverlay}
              onPress={() => setMenuVisible(false)}
            >
              <View style={styles.mobileMenu}>
                <View style={styles.mobileMenuHeader}>
                  <Text style={styles.mobileMenuTitle}>{t.header.menu}</Text>
                  <TouchableOpacity 
                    onPress={() => setMenuVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                {navItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.mobileNavItem}
                    onPress={() => handleNavPress(item.onPress)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.mobileNavText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </>
      ) : (
        <View style={styles.navContainer}>
          <View style={styles.nav}>
            {navItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.navItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Text style={styles.navText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <LanguageSelector />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoCircle: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.gradient.middle,
  },
  logoText: {
    fontWeight: '800',
    color: theme.textPrimary,
  },
  logoTextFull: {
    fontWeight: '700',
    color: theme.textPrimary,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  nav: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 44, // Better touch target
  },
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  menuButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: theme.textPrimary,
    borderRadius: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  mobileMenu: {
    backgroundColor: theme.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    paddingTop: 8,
    paddingBottom: 16,
    ...theme.shadow,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  mobileMenuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: theme.bgSecondary,
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.textPrimary,
    fontWeight: '600',
  },
  mobileNavItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    minHeight: 56, // Better touch target for mobile
  },
  mobileNavText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  mobileRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
