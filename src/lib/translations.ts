export type Language = 'FR' | 'EN';

export const translations = {
  FR: {
    nav: {
      accueil: "Accueil",
      paul: "Qui sommes-nous",
      comment: "Comment ça marche",
      services: "Services",
      temoignages: "Témoignages",
      parents: "Parents",
      contact: "Contact",
    },
    hero: {
      badge: "Installés en Australie depuis 8 ans",
      title: "Parce qu'on est déjà",
      titleAccent: "passé par là.",
      subtitle: "On t'aide à comprendre, t'orienter et t'installer en Australie.",
      description: "Visa, logement, école, job, quotidien... On répond à tes vraies questions, sans bullshit.",
      ctaWhatsapp: "Expliquer ma situation",
      ctaPacks: "Voir comment ça marche",
      stats: {
        location: "Basé à Melbourne",
        support: "Réponse sous 24h",
        backpackers: "Humain, pas robot",
      }
    },
    paul: {
      badge: "Qui sommes-nous",
      title: "OZ Connection,",
      titleAccent: "c'est quoi ?",
      greeting: "Je m'appelle Paul. Je vis en Australie depuis plus de 8 ans.",
      p1: "Quand je suis arrivé, j'étais perdu. Arnaques au logement, galères administratives, mauvais conseils... J'ai tout vécu. Et j'ai perdu du temps, de l'énergie et de l'argent.",
      p2: "OZ Connection est né de cette expérience. J'ai voulu créer ce que j'aurais aimé avoir à l'époque : un contact humain, sur place, qui connaît vraiment le terrain. Aujourd'hui, je me suis entouré d'une équipe pour aider les backpackers à éviter les mêmes galères.",
      p3: "On ne promet rien. On ne vend pas de rêve. On t'aide juste à y voir plus clair et à avancer sans te faire avoir.",
      experience: "8+ ans",
      experienceLabel: "sur le terrain",
      status: "Disponible",
      whatWeDo: "Ce qu'on fait",
      whatWeDoDesc: "On t'oriente, on t'explique tes options, on te connecte aux bons partenaires (écoles, agent de migration, réseau local).",
      whatWeDontDo: "Ce qu'on ne fait pas",
      whatWeDontDoDesc: "On ne fait pas les visas nous-mêmes, on ne garantit pas de job, on ne promet pas de miracles. On est honnêtes.",
    },
    howItWorks: {
      badge: "Comment ça marche",
      title: "Ton parcours",
      titleAccent: "avec nous",
      subtitle: "On suit le chemin que tu traverses, pas une checklist de services.",
      steps: [
        {
          number: "1",
          title: "Tu nous expliques ta situation",
          desc: "Où tu en es, ce que tu veux faire, ce qui te bloque. On écoute, sans jugement.",
        },
        {
          number: "2",
          title: "On t'aide à comprendre tes options",
          desc: "Visa, école, timing, budget... On te donne une vision claire de ce qui est possible (et ce qui ne l'est pas).",
        },
        {
          number: "3",
          title: "On te connecte aux bons partenaires",
          desc: "Agent de migration enregistré, écoles, contacts locaux... On te met en relation avec des gens de confiance.",
        },
        {
          number: "4",
          title: "Tu avances avec clarté",
          desc: "Tu sais où tu vas, tu as quelqu'un sur place en cas de question ou de pépin. Tu n'es plus seul.",
        },
      ],
      cta: "Nous contacter",
    },
    gallery: {
      badge: "La réalité du terrain",
      title: "On connaît",
      titleAccent: "l'Australie",
      subtitle: "Pas celle des brochures. Celle du quotidien. Des bons plans, des galères, des vraies infos qu'on ne trouve pas sur Google.",
      items: {
        roadTrips: "Road Trips",
        surf: "Surf & Plages",
        diving: "Plongée",
        nature: "Nature sauvage",
      }
    },
    services: {
      badge: "Nos domaines",
      title: "Sur quoi on peut",
      titleAccent: "t'aider",
      subtitle: "On t'oriente et te connecte aux bonnes ressources. Honnêtement, sans promesses.",
      items: [
        { title: "Visa & Immigration", desc: "On t'explique les options et on te met en contact avec notre agent de migration partenaire (enregistré MARA). On ne fait pas les visas nous-mêmes." },
        { title: "École & Études", desc: "Choix d'école, inscription, démarches. On accompagne déjà des étudiants internationaux sur tout le processus." },
        { title: "Job & Réseau", desc: "Conseils pour ta recherche, mise en relation avec notre réseau local à Melbourne. Pas de garantie, mais des vraies pistes." },
        { title: "Logement", desc: "Aide pour trouver un logement fiable, éviter les arnaques, comprendre le marché local." },
        { title: "Transport & Scooter", desc: "Conseils pour l'achat ou la location de véhicule. On connaît les pièges à éviter." },
        { title: "Installation longue durée", desc: "Tu veux rester ? On peut t'orienter sur les démarches pour construire ton avenir ici." },
      ],
      cta: "Nous contacter",
      disclaimer: "Les démarches de visa sont gérées par notre agent de migration partenaire, enregistré auprès de MARA (Migration Agents Registration Authority). Nous ne sommes pas agents de migration.",
    },
      testimonials: {
        badge: "Témoignages",
        title: "Ils nous ont",
        titleAccent: "fait confiance",
        items: [
          {
            name: "Camille R.",
            origin: "Lyon, France",
            text: "J'arrivais à Sydney sans rien avoir préparé. Paul m'a remis les idées en place, expliqué mes options visa et mis en contact avec un agent. Sans lui j'aurais fait n'importe quoi.",
          },
          {
            name: "Antoine D.",
            origin: "Bordeaux, France",
            text: "Ce que j'ai apprécié c'est qu'il ne m'a pas promis la lune. Il m'a expliqué la réalité, les délais, les coûts. On a trouvé une école ensemble. Ça m'a vraiment aidé à me lancer.",
          },
          {
            name: "Juliette M.",
            origin: "Nantes, France",
            text: "Mes parents étaient très inquiets de me voir partir si loin. Le fait qu'il y ait quelqu'un de francophone sur place les a vraiment rassurés. Et moi aussi.",
          }
        ]
      },
    parents: {
      badge: "Pour les parents",
      title: "Votre enfant part",
      titleAccent: "loin de vous ?",
      p1: "C'est normal d'être inquiet. L'Australie c'est loin, et on ne sait jamais vraiment ce qui se passe là-bas.",
      p2: "Avec OZ Connection, votre enfant a un contact français sur place. Quelqu'un qui peut répondre à ses questions, l'orienter, et intervenir en cas de problème.",
      p3: "On ne remplace pas les parents. Mais on peut être un relais de confiance, sur le terrain.",
      secure: "Contact sur place",
      fieldSupport: "Disponible en cas de besoin",
      features: [
        "Présence réelle en Australie",
        "Joignable en cas d'urgence",
        "Accompagnement personnalisé",
        "Français sur le terrain",
      ],
      cta: "Nous contacter",
    },
    contact: {
      title: "Une question ?",
      titleAccent: "On est là.",
      subtitle: "Pas de formulaire compliqué. Tu nous écris, on te répond. Simplement.",
      email: "Email",
      features: [
        "Réponse sous 24h",
        "Premier échange gratuit",
        "Sans engagement",
      ]
    },
    footer: {
      tagline: "Sur le terrain en Australie",
      copyright: "© 2024 OZ Connection",
    }
  },
  EN: {
    nav: {
      accueil: "Home",
      paul: "About us",
      comment: "How it works",
      services: "Services",
      temoignages: "Testimonials",
      parents: "Parents",
      contact: "Contact",
    },
    hero: {
      badge: "Based in Australia for 8 years",
      title: "Because we've been",
      titleAccent: "through it too.",
      subtitle: "We help you understand, navigate and settle in Australia.",
      description: "Visa, housing, school, job, daily life... We answer your real questions, no BS.",
      ctaWhatsapp: "Explain my situation",
      ctaPacks: "See how it works",
      stats: {
        location: "Based in Melbourne",
        support: "Response within 24h",
        backpackers: "Human, not robot",
      }
    },
    paul: {
      badge: "About us",
      title: "What is",
      titleAccent: "OZ Connection?",
      greeting: "My name is Paul. I've been living in Australia for over 8 years.",
      p1: "When I arrived, I was lost. Housing scams, admin nightmares, bad advice... I've been through it all. And I lost time, energy and money.",
      p2: "OZ Connection was born from this experience. I wanted to create what I wish I'd had back then: a human contact, on the ground, who actually knows the terrain. Today, I've built a team around me to help backpackers avoid the same struggles.",
      p3: "We don't promise anything. We don't sell dreams. We just help you see things more clearly and move forward without getting ripped off.",
      experience: "8+ years",
      experienceLabel: "on the ground",
      status: "Available",
      whatWeDo: "What we do",
      whatWeDoDesc: "We guide you, explain your options, and connect you with the right partners (schools, migration agent, local network).",
      whatWeDontDo: "What we don't do",
      whatWeDontDoDesc: "We don't do visas ourselves, we don't guarantee jobs, we don't promise miracles. We're honest.",
    },
    howItWorks: {
      badge: "How it works",
      title: "Your journey",
      titleAccent: "with us",
      subtitle: "We follow the path you're on, not a checklist of services.",
      steps: [
        {
          number: "1",
          title: "You explain your situation",
          desc: "Where you're at, what you want to do, what's blocking you. We listen, no judgment.",
        },
        {
          number: "2",
          title: "We help you understand your options",
          desc: "Visa, school, timing, budget... We give you a clear picture of what's possible (and what's not).",
        },
        {
          number: "3",
          title: "We connect you with the right partners",
          desc: "Registered migration agent, schools, local contacts... We put you in touch with trusted people.",
        },
        {
          number: "4",
          title: "You move forward with clarity",
          desc: "You know where you're going, you have someone on-site for questions or problems. You're not alone anymore.",
        },
      ],
      cta: "Contact us",
    },
    gallery: {
      badge: "The real deal",
      title: "We know",
      titleAccent: "Australia",
      subtitle: "Not the brochure version. The daily reality. The good tips, the struggles, the real info you won't find on Google.",
      items: {
        roadTrips: "Road Trips",
        surf: "Surf & Beaches",
        diving: "Diving",
        nature: "Wild nature",
      }
    },
    services: {
      badge: "Our areas",
      title: "What we can",
      titleAccent: "help with",
      subtitle: "We guide you and connect you to the right resources. Honestly, no promises.",
      items: [
        { title: "Visa & Immigration", desc: "We explain your options and connect you with our partner migration agent (MARA registered). We don't do visas ourselves." },
        { title: "School & Studies", desc: "School selection, enrollment, paperwork. We're already supporting international students through the whole process." },
        { title: "Job & Network", desc: "Advice for your search, connections to our local Melbourne network. No guarantees, but real leads." },
        { title: "Housing", desc: "Help finding reliable housing, avoiding scams, understanding the local market." },
        { title: "Transport & Scooter", desc: "Advice for buying or renting a vehicle. We know the traps to avoid." },
        { title: "Long-term Settlement", desc: "Want to stay? We can guide you on the steps to build your future here." },
      ],
      cta: "Contact us",
      disclaimer: "Visa procedures are handled by our partner migration agent, registered with MARA (Migration Agents Registration Authority). We are not migration agents.",
    },
      testimonials: {
        badge: "Testimonials",
        title: "They trusted",
        titleAccent: "us",
        items: [
          {
            name: "James K.",
            origin: "London, UK",
            text: "I landed in Melbourne with no plan and a lot of questions. Paul cut through all the noise — visa options, school choices, what to actually expect. Honest advice, no upselling.",
          },
          {
            name: "Sofia T.",
            origin: "São Paulo, Brazil",
            text: "I was overwhelmed before I even arrived. OZ Connection helped me understand the student visa process and connected me directly with their migration agent. It saved me so much stress.",
          },
          {
            name: "Liam O.",
            origin: "Dublin, Ireland",
            text: "What I liked most was the no-BS approach. Paul told me what was realistic, what wasn't, and what steps to take first. Exactly what I needed when I felt completely lost.",
          }
        ]
      },
    parents: {
      badge: "For parents",
      title: "Your child is going",
      titleAccent: "far away?",
      p1: "It's normal to be worried. Australia is far, and you never really know what's happening over there.",
      p2: "With OZ Connection, your child has a French contact on-site. Someone who can answer their questions, guide them, and step in if there's a problem.",
      p3: "We don't replace parents. But we can be a trusted relay on the ground.",
      secure: "On-site contact",
      fieldSupport: "Available when needed",
      features: [
        "Real presence in Australia",
        "Reachable in emergencies",
        "Personalized support",
        "French on the ground",
      ],
      cta: "Contact us",
    },
    contact: {
      title: "Got a question?",
      titleAccent: "We're here.",
      subtitle: "No complicated form. You write to us, we reply. Simple.",
      email: "Email",
      features: [
        "Response within 24h",
        "First chat free",
        "No commitment",
      ]
    },
    footer: {
      tagline: "On the ground in Australia",
      copyright: "© 2024 OZ Connection",
    }
  }
};
