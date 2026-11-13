export const portfolioData = {
  personal: {
    name: "Yash Mali",
    title: "Computer Science Engineer | Full Stack Developer",
    subtitle: "Turning ideas into interactive digital experiences.",
    tagline: "Final-year CSE student with 2 full-stack internships, hackathon prizes & alumni portal developer",
    status: "OPEN TO FULL-TIME & INTERNSHIP OPPORTUNITIES",
    email: "yashsmali91@gmail.com",
    phone: "+91-8830651820",
    location: "Shegaon, Maharashtra, India",
    linkedin: "https://linkedin.com/in/yashpatilmali",
    linkedinHandle: "in/yashpatilmali",
    github: "https://github.com/yashpatilmali",
    githubHandle: "github.com/yashpatilmali",
    portfolioUrl: "https://yashpatilmaliportfolio.vercel.app",
    portfolioHandle: "yashpatilmaliportfolio.vercel.app",
    resumePdf: "./resume.pdf",
    college: "Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)",
    degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
    cgpa: "7.73 / 10",
    gradYear: "2023 – 2027 (Expected)",
    summary: "Final-year Computer Science and Engineering student with two full-stack developer internships, skilled in Java, JavaScript, React.js, and Node.js. Built SSGMCE’s official alumni portal and an exam management portal. Two-time hackathon prize winner; led CSESA’s 25+ member committee as President (2025–26)."
  },
  
  skills: [
    {
      category: "Frontend Mastery",
      items: [
        {
          name: "React.js",
          powerup: "Fire Flower",
          icon: "flower",
          color: "#E52521",
          level: 92,
          description: "Component architecture, hooks, state management, SPA routing, API integration. Used to build SSGMCE Alumni Portal, Forensic System, and TruScholar web applications."
        },
        {
          name: "JavaScript (ES6+)",
          powerup: "Super Mushroom",
          icon: "mushroom",
          color: "#FCD116",
          level: 90,
          description: "Asynchronous programming, closures, DOM manipulation, promises, event-driven programming, and modern modular architecture."
        },
        {
          name: "Next.js",
          powerup: "Super Leaf",
          icon: "leaf",
          color: "#00A800",
          level: 80,
          description: "SSR, SSG, file-based routing, SEO optimization, and hybrid full-stack web application development."
        },
        {
          name: "HTML5 & CSS3",
          powerup: "Coin Blocks",
          icon: "block",
          color: "#FF9900",
          level: 95,
          description: "Semantic layouts, responsive flexbox/grid, CSS animations, Tailwind CSS, cross-browser styling."
        },
        {
          name: "Responsive Design",
          powerup: "Super Cape",
          icon: "feather",
          color: "#5C94FC",
          level: 92,
          description: "Mobile-first philosophy, fluid viewports, media queries, touch gestures, and adaptive UI layouts."
        }
      ]
    },
    {
      category: "Backend & Databases",
      items: [
        {
          name: "Node.js",
          powerup: "Star Power",
          icon: "star",
          color: "#FCD116",
          level: 85,
          description: "RESTful API creation, Express framework, middleware architecture, authentication mechanisms, and server-side automation."
        },
        {
          name: "MongoDB",
          powerup: "Green Shell",
          icon: "shell",
          color: "#00A800",
          level: 82,
          description: "NoSQL document modeling, indexing, aggregation pipelines, Mongoose ODM, and scalable data persistence."
        },
        {
          name: "Java",
          powerup: "1-Up Mushroom",
          icon: "green-mushroom",
          color: "#00D000",
          level: 86,
          description: "Object-oriented software development, enterprise algorithms, robust data structures, and strong typing foundation."
        }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        {
          name: "Git & GitHub",
          powerup: "Golden Key",
          icon: "key",
          color: "#FCD116",
          level: 90,
          description: "Version control workflows, branching, PR reviews, merge management, and collaborative open-source practices."
        },
        {
          name: "Vercel",
          powerup: "P-Wing",
          icon: "wing",
          color: "#5C94FC",
          level: 88,
          description: "Continuous deployment pipelines, serverless functions, environment configuration, and production hosting."
        },
        {
          name: "VS Code & Figma",
          powerup: "Power Hammer",
          icon: "hammer",
          color: "#E52521",
          level: 90,
          description: "Full modern frontend developer toolchain, UI prototyping, wireframing, component tokenization, and rapid debugging."
        },
        {
          name: "AI-Assisted Dev",
          powerup: "Magic Wand",
          icon: "wand",
          color: "#9933FF",
          level: 85,
          description: "Prompt engineering, intelligent code synthesis, workflow acceleration, and automated refactoring."
        }
      ]
    },
    {
      category: "Core Foundations",
      items: [
        {
          name: "Data Structures & Algorithms",
          powerup: "POW Block",
          icon: "pow",
          color: "#0026FF",
          level: 84,
          description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, Dynamic Programming, and complexity optimization."
        },
        {
          name: "OOP Concepts",
          powerup: "Castle Brick",
          icon: "brick",
          color: "#B84418",
          level: 90,
          description: "Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, and clean modular architecture."
        }
      ]
    }
  ],

  projects: [
    {
      id: "world-3-1",
      world: "WORLD 3-1",
      title: "SSGMCE Alumni Connect",
      tagline: "Official College Alumni Portal",
      status: "LIVE PRODUCTION",
      badge: "Flagship Project",
      liveUrl: "https://alumni.ssgmce.ac.in",
      githubUrl: "https://github.com/yashpatilmali",
      tech: ["React.js", "Node.js", "MongoDB", "OAuth 2.0", "Tailwind CSS"],
      description: "Engineered and deployed the official alumni networking web platform for Shri Sant Gajanan Maharaj College of Engineering, serving thousands of graduates and students worldwide.",
      highlights: [
        "Implemented secure OAuth authentication (Google, LinkedIn) and custom email sign-in with administrative verification for alumni credibility.",
        "Built dynamic event & alumni-meet registration engine featuring downloadable personalized alumni ID cards and QR venue check-in.",
        "Developed full-fledged modules for alumni financial contributions, newsletter publication, college annual reports, and high-resolution photo galleries.",
        "Ensured zero-downtime deployment and high responsive compatibility across mobile and desktop devices."
      ],
      marioWorldType: "Grassland Plains",
      levelColor: "#00A800"
    },
    {
      id: "world-3-2",
      world: "WORLD 3-2",
      title: "Exam Management Portal",
      tagline: "SSGMCE Exam Centre Daily Automation",
      status: "CAMPUS DEPLOYED",
      badge: "Campus Production",
      liveUrl: null,
      githubUrl: "https://github.com/yashpatilmali",
      tech: ["React.js", "Node.js", "Express", "Document Automation", "REST APIs"],
      description: "Spearheaded the design and delivery of a specialized web portal built specifically for the SSGMCE Exam Centre to automate critical examination documentation workflows.",
      highlights: [
        "Automated the parsing and extraction of university control sheets into daily operational exam hall sheets.",
        "Replaced manual paper-based document preparation with an error-free 1-click automated printing workflow.",
        "Saves staff hours every single examination morning, eliminating human error in student seat allocations and attendance sheets.",
        "Secured with role-based access for exam superintendents and staff."
      ],
      marioWorldType: "Desert Sands",
      levelColor: "#E45C10"
    },
    {
      id: "world-3-3",
      world: "WORLD 3-3",
      title: "Forensic Report Management System",
      tagline: "Tamper-Resistant Blockchain Records",
      status: "INNOVATION PROJECT",
      badge: "Blockchain & Security",
      liveUrl: null,
      githubUrl: "https://github.com/yashpatilmali",
      tech: ["React.js", "Blockchain", "Cryptography", "Node.js", "Smart Contracts"],
      description: "Engineered a tamper-resistant forensic medical and investigative report storage architecture combining an intuitive React frontend with cryptographic verification.",
      highlights: [
        "Engineered tamper-resistant forensic report pipeline leveraging blockchain consensus to guarantee data integrity and judicial transparency.",
        "Implemented cryptographic hashing and signature verification for every evidence and forensic record to guarantee immutable audit trails.",
        "Designed clean hospital/forensic scientist workflow dashboard with real-time audit logs and chain-of-custody tracking.",
        "Prevents retroactive evidence tampering in sensitive medical and legal investigations."
      ],
      marioWorldType: "Sky High Bridges",
      levelColor: "#5C94FC"
    },
    {
      id: "world-3-4",
      world: "WORLD 3-4",
      title: "CSESA SSGMCE Official Website",
      tagline: "Department Association Web Portal",
      status: "OFFICIAL LAUNCH",
      badge: "Association Portal",
      liveUrl: "https://github.com/yashpatilmali",
      githubUrl: "https://github.com/yashpatilmali",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "UI/UX"],
      description: "Developed and maintained the official web portal for the Computer Science and Engineering Students Association (CSESA), acting as the central hub for student announcements, workshops, and team showcase.",
      highlights: [
        "Showcases committee members, technical event registrations, notifications, and workshop archives.",
        "Delivers smooth interactive animations, responsive mobile navigation, and optimized media assets.",
        "Built with clean semantic HTML5, CSS3 styling, and modular JavaScript without heavy framework overhead."
      ],
      marioWorldType: "Underground Cavern",
      levelColor: "#B84418"
    }
  ],

  experience: [
    {
      id: "exp-1",
      world: "WORLD 4-1: THE CHIP FORTRESS",
      role: "Full Stack Developer Intern",
      company: "TruScholar (Asset Chain Techlligence Pvt. Ltd.)",
      location: "Amravati, Maharashtra (On-site)",
      duration: "Jan 2026 – Apr 2026",
      type: "On-site Internship",
      badge: "Current / Recent",
      icon: "shield",
      description: "Contributed to core development of credential verification and blockchain-backed digital trust infrastructure.",
      responsibilities: [
        "Built and enhanced production user-facing web application features utilizing React.js, modern JavaScript, and Tailwind.",
        "Co-designed scalable client-server system architectures and secure RESTful APIs alongside senior engineering staff.",
        "Investigated and debugged complex front-end application bottlenecks, contributing to performance optimization and production releases.",
        "Participated in agile sprints, peer code reviews, and staging verification before live deployments."
      ],
      technologies: ["React.js", "JavaScript", "REST APIs", "System Architecture", "Performance Tuning"]
    },
    {
      id: "exp-2",
      world: "WORLD 4-2: CLOUD CITADEL",
      role: "Full Stack Web Developer Intern",
      company: "Webstack Academy",
      location: "Remote",
      duration: "Sep 2025 – Nov 2025",
      type: "Remote Internship",
      badge: "Completed",
      icon: "cloud",
      description: "Engineered real-world, industry-standard web applications focusing on modern frontend interactivity and responsive layouts.",
      responsibilities: [
        "Developed responsive, production-ready web interfaces using semantic HTML5, CSS3, and modern JavaScript.",
        "Implemented interactive UI components with modular code, cross-browser support, and clean architectural principles.",
        "Integrated client-side state handling with dynamic asynchronous data fetching.",
        "Practiced professional Git version control, branch management, and collaborative development."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"]
    }
  ],

  leadership: [
    {
      role: "President",
      organization: "Computer Science and Engineering Students Association (CSESA)",
      duration: "Sep 2025 – Sep 2026",
      details: "Led a 25+ member committee, overseeing technical symposia, coding bootcamps, community workshops, and student mentorship initiatives."
    },
    {
      role: "Coordinator",
      organization: "Innovo’24 & Innovo’25 – SSGMCE Annual Technical Fest",
      duration: "Aug 2023 – Jun 2025",
      details: "Managed end-to-end planning and execution for flagship Project Expo, RC Car Racing championship, and inter-collegiate hackathons."
    },
    {
      role: "Technical Team Member & Event Manager",
      organization: "E-Cell & CSESA",
      duration: "Jun 2024 – Sep 2025",
      details: "Organized college-level technical events, supported national entrepreneurship challenge (NEC) activities, and hackathon logistics."
    },
    {
      role: "Volunteer",
      organization: "National Service Scheme (NSS)",
      duration: "Community Leadership",
      details: "Completed two 7-day community service rural immersion camps focusing on social outreach, literacy, and community health."
    }
  ],

  achievements: [
    {
      id: "ach-1",
      trophy: "GOLD_MEDAL",
      place: "3rd Prize (Podium Finish)",
      title: "Medical Device Hackathon (MEDHA)",
      organizer: "K. J. Somaiya School of Engineering, Mumbai",
      highlight: true,
      badge: "Special Honors",
      description: "Won 3rd prize at this prestigious medical engineering hackathon in Mumbai for conceptualizing and prototyping innovative biomedical tech solutions under rigorous time constraints.",
      skillsApplied: "Rapid Prototyping, Biomedical Engineering Interface, Problem Solving, Presentation"
    },
    {
      id: "ach-2",
      trophy: "SILVER_MEDAL",
      place: "3rd Prize",
      title: "Aavishkar Research Convention",
      organizer: "District Level Research Competition",
      highlight: false,
      badge: "Research Honor",
      description: "Awarded 3rd prize at the district level for demonstrating scientific research acumen, technical methodology, and innovative prototype implementation.",
      skillsApplied: "Research Methodology, Data Presentation, Scientific Analysis"
    },
    {
      id: "ach-3",
      trophy: "GOLD_TROPHY",
      place: "1st Place Winner",
      title: "Internal Hackathon 2025 – 2026",
      organizer: "SSGMCE Shegaon",
      highlight: false,
      badge: "Champion",
      description: "Secured top position across engineering departments for building high-impact full-stack software addressing critical institutional and social challenges.",
      skillsApplied: "Full Stack Architecture, Rapid Development, Pitching"
    },
    {
      id: "ach-4",
      trophy: "STAR_BADGE",
      place: "Round 2 Qualifier (Top 5%)",
      title: "Devthon 2025",
      organizer: "450+ Competing Engineering Teams",
      highlight: false,
      badge: "Top 5% Nationwide",
      description: "Selected for Round 2 among more than 450+ competitive developer teams across top engineering institutes for exceptional algorithm design and solution architecture.",
      skillsApplied: "Competitive Programming, System Design, Algorithms"
    }
  ],

  certifications: [
    {
      title: "Google AI Essentials",
      issuer: "Coursera / Google",
      category: "Artificial Intelligence",
      badge: "Google Certified"
    },
    {
      title: "Google Cybersecurity",
      issuer: "Coursera / Google",
      category: "Cybersecurity & Systems",
      badge: "Google Certified"
    },
    {
      title: "Data Structures & Algorithms using Java",
      issuer: "NPTEL (Ministry of Education, Govt. of India)",
      category: "Computer Science Core",
      badge: "NPTEL Elite"
    },
    {
      title: "Gen AI Study Jams",
      issuer: "Google Developer Groups (Multiple Tracks)",
      category: "Generative AI",
      badge: "GDG Recognized"
    }
  ],

  education: {
    degree: "Bachelor of Engineering (B.E.)",
    branch: "Computer Science and Engineering",
    college: "Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)",
    location: "Shegaon, Maharashtra, India",
    duration: "2023 – 2027 (Expected)",
    cgpa: "7.73 / 10",
    status: "Final Year Student",
    highlights: [
      "President of Computer Science and Engineering Students Association (CSESA 2025–26)",
      "Coordinator of Innovo'24 & Innovo'25 Annual Technical Fest",
      "Official Developer of the SSGMCE Alumni Portal (alumni.ssgmce.ac.in) and Exam Centre Management Portal",
      "Winner & 2-Time Hackathon Podium Awardee representing SSGMCE at state and regional stages"
    ]
  }
};
