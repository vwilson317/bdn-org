export type Language = 'en' | 'pt-BR' | 'es' | 'fr';

export interface Translations {
  // Header
  header: {
    home: string;
    whyJoin: string;
    connect: string;
    team: string;
    registerService: string;
    registerServiceShort: string;
    menu: string;
  };
  
  // Hero
  hero: {
    title: string;
    subtitle: string;
    description: string;
    joinWhatsApp: string;
  };
  
  // Announcements
  announcements: {
    title: string;
    subtitle: string;
    joinGroup: string;
  };
  
  // WhyJoin
  whyJoin: {
    title: string;
    subtitle: string;
    swipeHint: string;
    footerText: string;
    benefits: {
      networking: {
        title: string;
        description: string;
      };
      knowledge: {
        title: string;
        description: string;
      };
      collaboration: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
      localBusiness: {
        title: string;
        description: string;
      };
    };
  };
  
  // Connect
  connect: {
    title: string;
    subtitle: string;
    footerText: string;
  };
  
  // CommunityServices
  communityServices: {
    title: string;
    subtitle: string;
    swipeHint: string;
    showMore: string;
    viewService: string;
    bdnService: string;
    categories: {
      workspace: string;
      learning: string;
      networking: string;
      support: string;
      social: string;
    };
    days: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
      daily: string;
    };
    dates: {
      everyWeek: string;
      monthly: string;
      biWeekly: string;
      onDemand: string;
      byAppointment: string;
    };
    times: {
      flexible: string;
    };
  };
  
  // ServicesPage
  servicesPage: {
    back: string;
    title: string;
  };
  
  // Team
  team: {
    title: string;
    subtitle: string;
    roles: {
      coordinator: string;
      founder: string;
      ambassador: string;
    };
  };
  
  // Contact
  contact: {
    title: string;
    description: string;
    button: string;
  };
  
  // Footer
  footer: {
    description: string;
    legalPrivacy: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      home: 'Home',
      whyJoin: 'Why Join',
      connect: 'Connect',
      team: 'Team',
      registerService: 'Register Community Service',
      registerServiceShort: 'Register Service',
      menu: 'Menu',
    },
    hero: {
      title: 'Brazil Digital Nomads',
      subtitle: 'Where Brazilian coastal vibes meet digital innovation',
      description: 'Join our vibrant community of digital nomads, remote workers and locals in beautiful Brazil. We\'re building connections, sharing knowledge, and creating opportunities while living the remote work dream by the Brazilian coast.',
      joinWhatsApp: 'Join Our Community on WhatsApp',
    },
    announcements: {
      title: 'Announcements',
      subtitle: 'Stay updated with the latest events and opportunities in our community.',
      joinGroup: 'Join Group',
    },
    whyJoin: {
      title: 'Why Join Our Community?',
      subtitle: 'As a community of digital nomads, remote workers and locals in Brazil, it is important to understand the "why" behind our existence and the benefits of being part of it.',
      swipeHint: '← Swipe to explore →',
      footerText: 'By understanding the "why" behind our community, we can better appreciate the benefits of being part of it and work towards making it even stronger.',
      benefits: {
        networking: {
          title: 'Networking Opportunities',
          description: 'Digital nomads typically work independently, which can often be isolating. By coming together as a community, we provide opportunities for networking and building connections with like-minded individuals.',
        },
        knowledge: {
          title: 'Sharing Knowledge & Resources',
          description: 'Our community serves as a platform for sharing knowledge and resources, such as tips for finding accommodation or the best co-working spaces in the area.',
        },
        collaboration: {
          title: 'Collaboration & Skill-sharing',
          description: 'By working together and sharing our skills and expertise, we can collaborate on projects and potentially even start businesses together.',
        },
        support: {
          title: 'Social Support',
          description: 'Moving to a new place can be challenging, but being part of a community can provide social support and a sense of belonging.',
        },
        localBusiness: {
          title: 'Promoting Local Businesses',
          description: 'By supporting local businesses, we can help boost the economy of Brazil and create a mutually beneficial relationship between our community and the wider community.',
        },
      },
    },
    connect: {
      title: 'Connect With Us',
      subtitle: 'Join the conversation and stay updated with our community across all platforms',
      footerText: 'Follow us for updates, events, and community highlights from Brazil!',
    },
    communityServices: {
      title: 'Community Services',
      subtitle: 'Discover resources, support, and opportunities available to our community members',
      swipeHint: '← Swipe to explore →',
      showMore: 'Show More Services',
      viewService: 'View Service →',
      bdnService: 'BDN Service',
      categories: {
        workspace: 'Workspace',
        learning: 'Learning',
        networking: 'Networking',
        support: 'Support',
        social: 'Social',
      },
      days: {
        monday: 'MONDAY',
        tuesday: 'TUESDAY',
        wednesday: 'WEDNESDAY',
        thursday: 'THURSDAY',
        friday: 'FRIDAY',
        saturday: 'SATURDAY',
        sunday: 'SUNDAY',
        daily: 'DAILY',
      },
      dates: {
        everyWeek: 'Every Week',
        monthly: 'Monthly',
        biWeekly: 'Bi-weekly',
        onDemand: 'On Demand',
        byAppointment: 'By Appointment',
      },
      times: {
        flexible: 'Flexible',
      },
    },
    servicesPage: {
      back: 'Back',
      title: 'All Community Services',
    },
    team: {
      title: 'Meet the Team',
      subtitle: 'The passionate people behind Brazil Digital Nomads',
      roles: {
        coordinator: 'Community Coordinator',
        founder: 'Community Founder',
        ambassador: 'Ambassador',
      },
    },
    contact: {
      title: 'Register Community Service',
      description: 'Offer your services to members of the community. These will be reviewed by the team and we will contact you.',
      button: 'Register Your Service',
    },
    footer: {
      description: 'Building connections, sharing knowledge, and creating opportunities for digital nomads in beautiful Brazil.',
      legalPrivacy: 'Legal & Privacy',
      copyright: '© 2025 Brazil Digital Nomads. Building community by the Brazilian coast.',
    },
  },
  
  'pt-BR': {
    header: {
      home: 'Início',
      whyJoin: 'Por Que Participar',
      connect: 'Conectar',
      team: 'Equipe',
      registerService: 'Registrar Serviço Comunitário',
      registerServiceShort: 'Registrar Serviço',
      menu: 'Menu',
    },
    hero: {
      title: 'Brazil Digital Nomads',
      subtitle: 'Onde os ares costeiros brasileiros encontram a inovação digital',
      description: 'Junte-se à nossa vibrante comunidade de nômades digitais, trabalhadores remotos e locais no belo Brasil. Estamos construindo conexões, compartilhando conhecimento e criando oportunidades enquanto vivemos o sonho do trabalho remoto na costa brasileira.',
      joinWhatsApp: 'Junte-se à Nossa Comunidade no WhatsApp',
    },
    announcements: {
      title: 'Anúncios',
      subtitle: 'Mantenha-se atualizado com os últimos eventos e oportunidades em nossa comunidade.',
      joinGroup: 'Entrar no Grupo',
    },
    whyJoin: {
      title: 'Por Que Participar da Nossa Comunidade?',
      subtitle: 'Como uma comunidade de nômades digitais, trabalhadores remotos e locais no Brasil, é importante entender o "porquê" por trás da nossa existência e os benefícios de fazer parte dela.',
      swipeHint: '← Deslize para explorar →',
      footerText: 'Ao entender o "porquê" por trás da nossa comunidade, podemos melhor apreciar os benefícios de fazer parte dela e trabalhar para torná-la ainda mais forte.',
      benefits: {
        networking: {
          title: 'Oportunidades de Networking',
          description: 'Nômades digitais geralmente trabalham de forma independente, o que pode ser isolante. Ao nos unirmos como comunidade, fornecemos oportunidades de networking e construção de conexões com pessoas que pensam como nós.',
        },
        knowledge: {
          title: 'Compartilhamento de Conhecimento e Recursos',
          description: 'Nossa comunidade serve como uma plataforma para compartilhar conhecimento e recursos, como dicas para encontrar acomodação ou os melhores espaços de coworking na região.',
        },
        collaboration: {
          title: 'Colaboração e Compartilhamento de Habilidades',
          description: 'Ao trabalharmos juntos e compartilharmos nossas habilidades e expertise, podemos colaborar em projetos e potencialmente até iniciar negócios juntos.',
        },
        support: {
          title: 'Suporte Social',
          description: 'Mudar para um novo lugar pode ser desafiador, mas fazer parte de uma comunidade pode fornecer suporte social e um senso de pertencimento.',
        },
        localBusiness: {
          title: 'Promovendo Negócios Locais',
          description: 'Ao apoiar negócios locais, podemos ajudar a impulsionar a economia do Brasil e criar um relacionamento mutuamente benéfico entre nossa comunidade e a comunidade em geral.',
        },
      },
    },
    connect: {
      title: 'Conecte-se Conosco',
      subtitle: 'Participe da conversa e mantenha-se atualizado com nossa comunidade em todas as plataformas',
      footerText: 'Siga-nos para atualizações, eventos e destaques da comunidade do Brasil!',
    },
    communityServices: {
      title: 'Serviços Comunitários',
      subtitle: 'Descubra recursos, suporte e oportunidades disponíveis para os membros da nossa comunidade',
      swipeHint: '← Deslize para explorar →',
      showMore: 'Mostrar Mais Serviços',
      viewService: 'Ver Serviço →',
      bdnService: 'Serviço BDN',
      categories: {
        workspace: 'Espaço de Trabalho',
        learning: 'Aprendizado',
        networking: 'Networking',
        support: 'Suporte',
        social: 'Social',
      },
      days: {
        monday: 'SEGUNDA',
        tuesday: 'TERÇA',
        wednesday: 'QUARTA',
        thursday: 'QUINTA',
        friday: 'SEXTA',
        saturday: 'SÁBADO',
        sunday: 'DOMINGO',
        daily: 'DIÁRIO',
      },
      dates: {
        everyWeek: 'Toda Semana',
        monthly: 'Mensal',
        biWeekly: 'Quinzenal',
        onDemand: 'Sob Demanda',
        byAppointment: 'Por Agendamento',
      },
      times: {
        flexible: 'Flexível',
      },
    },
    servicesPage: {
      back: 'Voltar',
      title: 'Todos os Serviços Comunitários',
    },
    team: {
      title: 'Conheça a Equipe',
      subtitle: 'As pessoas apaixonadas por trás do Brazil Digital Nomads',
      roles: {
        coordinator: 'Coordenador da Comunidade',
        founder: 'Fundador da Comunidade',
        ambassador: 'Embaixador',
      },
    },
    contact: {
      title: 'Registrar Serviço Comunitário',
      description: 'Ofereça seus serviços aos membros da comunidade. Estes serão revisados pela equipe e entraremos em contato com você.',
      button: 'Registrar Seu Serviço',
    },
    footer: {
      description: 'Construindo conexões, compartilhando conhecimento e criando oportunidades para nômades digitais no belo Brasil.',
      legalPrivacy: 'Legal e Privacidade',
      copyright: '© 2025 Brazil Digital Nomads. Construindo comunidade na costa brasileira.',
    },
  },
  
  es: {
    header: {
      home: 'Inicio',
      whyJoin: 'Por Qué Unirse',
      connect: 'Conectar',
      team: 'Equipo',
      registerService: 'Registrar Servicio Comunitario',
      registerServiceShort: 'Registrar Servicio',
      menu: 'Menú',
    },
    hero: {
      title: 'Brazil Digital Nomads',
      subtitle: 'Donde las vibras costeras brasileñas se encuentran con la innovación digital',
      description: 'Únete a nuestra vibrante comunidad de nómadas digitales, trabajadores remotos y locales en la hermosa Brasil. Estamos construyendo conexiones, compartiendo conocimiento y creando oportunidades mientras vivimos el sueño del trabajo remoto en la costa brasileña.',
      joinWhatsApp: 'Únete a Nuestra Comunidad en WhatsApp',
    },
    announcements: {
      title: 'Anuncios',
      subtitle: 'Mantente actualizado con los últimos eventos y oportunidades en nuestra comunidad.',
      joinGroup: 'Unirse al Grupo',
    },
    whyJoin: {
      title: '¿Por Qué Unirse a Nuestra Comunidad?',
      subtitle: 'Como una comunidad de nómadas digitales, trabajadores remotos y locales en Brasil, es importante entender el "por qué" detrás de nuestra existencia y los beneficios de ser parte de ella.',
      swipeHint: '← Desliza para explorar →',
      footerText: 'Al entender el "por qué" detrás de nuestra comunidad, podemos apreciar mejor los beneficios de ser parte de ella y trabajar para hacerla aún más fuerte.',
      benefits: {
        networking: {
          title: 'Oportunidades de Networking',
          description: 'Los nómadas digitales típicamente trabajan de forma independiente, lo que puede ser aislante. Al unirnos como comunidad, proporcionamos oportunidades para networking y construir conexiones con personas afines.',
        },
        knowledge: {
          title: 'Compartir Conocimiento y Recursos',
          description: 'Nuestra comunidad sirve como una plataforma para compartir conocimiento y recursos, como consejos para encontrar alojamiento o los mejores espacios de coworking en el área.',
        },
        collaboration: {
          title: 'Colaboración e Intercambio de Habilidades',
          description: 'Al trabajar juntos y compartir nuestras habilidades y experiencia, podemos colaborar en proyectos y potencialmente incluso iniciar negocios juntos.',
        },
        support: {
          title: 'Apoyo Social',
          description: 'Mudarse a un nuevo lugar puede ser desafiante, pero ser parte de una comunidad puede proporcionar apoyo social y un sentido de pertenencia.',
        },
        localBusiness: {
          title: 'Promover Negocios Locales',
          description: 'Al apoyar negocios locales, podemos ayudar a impulsar la economía de Brasil y crear una relación mutuamente beneficiosa entre nuestra comunidad y la comunidad en general.',
        },
      },
    },
    connect: {
      title: 'Conéctate Con Nosotros',
      subtitle: 'Únete a la conversación y mantente actualizado con nuestra comunidad en todas las plataformas',
      footerText: '¡Síguenos para actualizaciones, eventos y destacados de la comunidad de Brasil!',
    },
    communityServices: {
      title: 'Servicios Comunitarios',
      subtitle: 'Descubre recursos, apoyo y oportunidades disponibles para los miembros de nuestra comunidad',
      swipeHint: '← Desliza para explorar →',
      showMore: 'Mostrar Más Servicios',
      viewService: 'Ver Servicio →',
      bdnService: 'Servicio BDN',
      categories: {
        workspace: 'Espacio de Trabajo',
        learning: 'Aprendizaje',
        networking: 'Networking',
        support: 'Apoyo',
        social: 'Social',
      },
      days: {
        monday: 'LUNES',
        tuesday: 'MARTES',
        wednesday: 'MIÉRCOLES',
        thursday: 'JUEVES',
        friday: 'VIERNES',
        saturday: 'SÁBADO',
        sunday: 'DOMINGO',
        daily: 'DIARIO',
      },
      dates: {
        everyWeek: 'Cada Semana',
        monthly: 'Mensual',
        biWeekly: 'Quincenal',
        onDemand: 'Bajo Demanda',
        byAppointment: 'Con Cita',
      },
      times: {
        flexible: 'Flexible',
      },
    },
    servicesPage: {
      back: 'Volver',
      title: 'Todos los Servicios Comunitarios',
    },
    team: {
      title: 'Conoce al Equipo',
      subtitle: 'Las personas apasionadas detrás de Brazil Digital Nomads',
      roles: {
        coordinator: 'Coordinador de la Comunidad',
        founder: 'Fundador de la Comunidad',
        ambassador: 'Embajador',
      },
    },
    contact: {
      title: 'Registrar Servicio Comunitario',
      description: 'Ofrece tus servicios a los miembros de la comunidad. Estos serán revisados por el equipo y nos pondremos en contacto contigo.',
      button: 'Registrar Tu Servicio',
    },
    footer: {
      description: 'Construyendo conexiones, compartiendo conocimiento y creando oportunidades para nómadas digitales en la hermosa Brasil.',
      legalPrivacy: 'Legal y Privacidad',
      copyright: '© 2025 Brazil Digital Nomads. Construyendo comunidad en la costa brasileña.',
    },
  },
  
  fr: {
    header: {
      home: 'Accueil',
      whyJoin: 'Pourquoi Rejoindre',
      connect: 'Se Connecter',
      team: 'Équipe',
      registerService: 'Enregistrer un Service Communautaire',
      registerServiceShort: 'Enregistrer Service',
      menu: 'Menu',
    },
    hero: {
      title: 'Brazil Digital Nomads',
      subtitle: 'Où les vibes côtières brésiliennes rencontrent l\'innovation numérique',
      description: 'Rejoignez notre communauté dynamique de nomades numériques, travailleurs à distance et locaux dans la belle Brésil. Nous construisons des connexions, partageons des connaissances et créons des opportunités tout en vivant le rêve du travail à distance sur la côte brésilienne.',
      joinWhatsApp: 'Rejoignez Notre Communauté sur WhatsApp',
    },
    announcements: {
      title: 'Annonces',
      subtitle: 'Restez informé des derniers événements et opportunités dans notre communauté.',
      joinGroup: 'Rejoindre le Groupe',
    },
    whyJoin: {
      title: 'Pourquoi Rejoindre Notre Communauté?',
      subtitle: 'En tant que communauté de nomades numériques, travailleurs à distance et locaux au Brésil, il est important de comprendre le "pourquoi" derrière notre existence et les avantages d\'en faire partie.',
      swipeHint: '← Glissez pour explorer →',
      footerText: 'En comprenant le "pourquoi" derrière notre communauté, nous pouvons mieux apprécier les avantages d\'en faire partie et travailler à la rendre encore plus forte.',
      benefits: {
        networking: {
          title: 'Opportunités de Réseautage',
          description: 'Les nomades numériques travaillent généralement de manière indépendante, ce qui peut être isolant. En se rassemblant en communauté, nous offrons des opportunités de réseautage et de création de liens avec des personnes partageant les mêmes idées.',
        },
        knowledge: {
          title: 'Partage de Connaissances et Ressources',
          description: 'Notre communauté sert de plateforme pour partager des connaissances et des ressources, comme des conseils pour trouver un logement ou les meilleurs espaces de coworking dans la région.',
        },
        collaboration: {
          title: 'Collaboration et Partage de Compétences',
          description: 'En travaillant ensemble et en partageant nos compétences et notre expertise, nous pouvons collaborer sur des projets et potentiellement même créer des entreprises ensemble.',
        },
        support: {
          title: 'Soutien Social',
          description: 'Déménager dans un nouvel endroit peut être difficile, mais faire partie d\'une communauté peut fournir un soutien social et un sentiment d\'appartenance.',
        },
        localBusiness: {
          title: 'Promouvoir les Entreprises Locales',
          description: 'En soutenant les entreprises locales, nous pouvons aider à stimuler l\'économie du Brésil et créer une relation mutuellement bénéfique entre notre communauté et la communauté au sens large.',
        },
      },
    },
    connect: {
      title: 'Connectez-vous Avec Nous',
      subtitle: 'Rejoignez la conversation et restez informé de notre communauté sur toutes les plateformes',
      footerText: 'Suivez-nous pour les mises à jour, événements et points forts de la communauté du Brésil!',
    },
    communityServices: {
      title: 'Services Communautaires',
      subtitle: 'Découvrez les ressources, le soutien et les opportunités disponibles pour les membres de notre communauté',
      swipeHint: '← Glissez pour explorer →',
      showMore: 'Afficher Plus de Services',
      viewService: 'Voir le Service →',
      bdnService: 'Service BDN',
      categories: {
        workspace: 'Espace de Travail',
        learning: 'Apprentissage',
        networking: 'Réseautage',
        support: 'Soutien',
        social: 'Social',
      },
      days: {
        monday: 'LUNDI',
        tuesday: 'MARDI',
        wednesday: 'MERCREDI',
        thursday: 'JEUDI',
        friday: 'VENDREDI',
        saturday: 'SAMEDI',
        sunday: 'DIMANCHE',
        daily: 'QUOTIDIEN',
      },
      dates: {
        everyWeek: 'Chaque Semaine',
        monthly: 'Mensuel',
        biWeekly: 'Bihebdomadaire',
        onDemand: 'Sur Demande',
        byAppointment: 'Sur Rendez-vous',
      },
      times: {
        flexible: 'Flexible',
      },
    },
    servicesPage: {
      back: 'Retour',
      title: 'Tous les Services Communautaires',
    },
    team: {
      title: 'Rencontrez l\'Équipe',
      subtitle: 'Les personnes passionnées derrière Brazil Digital Nomads',
      roles: {
        coordinator: 'Coordinateur de la Communauté',
        founder: 'Fondateur de la Communauté',
        ambassador: 'Ambassadeur',
      },
    },
    contact: {
      title: 'Enregistrer un Service Communautaire',
      description: 'Offrez vos services aux membres de la communauté. Ceux-ci seront examinés par l\'équipe et nous vous contacterons.',
      button: 'Enregistrer Votre Service',
    },
    footer: {
      description: 'Construire des connexions, partager des connaissances et créer des opportunités pour les nomades numériques dans la belle Brésil.',
      legalPrivacy: 'Légal et Confidentialité',
      copyright: '© 2025 Brazil Digital Nomads. Construire une communauté sur la côte brésilienne.',
    },
  },
};
