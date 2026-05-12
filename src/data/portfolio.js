export const personal = {
  name: "Sivabalan Jayaraman",
  title: ".NET Full Stack Developer",
  location: "Kuala Lumpur, Malaysia (On-Site)",
  email: "sivabalanjayaraman23@gmail.com",
  phone: "+91 7339338852",
  linkedin: "https://linkedin.com/in/sivabalanj2303",
};

export const stats = [
  { label: "Years Experience", value: 4 },
  { label: "Projects Delivered", value: 8 },
  { label: "Enterprise Clients", value: 5 },
  { label: "Countries Worked", value: 2 },
];

export const skills = {
  Languages: ["C#", "JavaScript", "TypeScript"],
  Frameworks: [
    "ASP.NET Core",
    "ASP.NET MVC",
    "ASP.NET Zero",
    "Entity Framework",
  ],
  Architecture: ["Clean Architecture", "CQRS", "Repository Pattern"],
  "Front-End": [
    "Angular",
    "React",
    "HTML5",
    "CSS3",
    "Bootstrap",
    "Tailwind CSS",
    "jQuery",
  ],
  Databases: ["Microsoft SQL Server", "Stored Procedures", "Schema Design"],
  "APIs & Services": ["RESTful APIs", "Web API", "Windows Services", "AWS S3"],
  DevTools: ["Visual Studio", "Git", "SVN"],
  Methodologies: ["Agile / Scrum", "Code Reviews", "Sprint Planning"],
};

export const experience = [
  {
    company: "Eleware Technology Sdn Bhd",
    location: "Kuala Lumpur, Malaysia",
    role: "Full Stack Developer",
    period: "Jan 2025 – Present",
    projects: [
      {
        name: "AOP – AVSEC Online Pass",
        client: "Malaysia Airports",
        tag: "Airport Security",
        color: "#00d4ff",
        description:
          "Airport security access control web application serving thousands of airport personnel. Contributed to development, maintenance, and critical bug resolution.",
        highlights: [
          "Security access control for thousands of airport personnel",
          "Critical bug resolution improving system stability",
          "Reduced incident response time significantly",
        ],
        tech: ["ASP.NET Core", "Angular", "SQL Server", "TypeScript"],
      },
      {
        name: "Permit to Work (PTW)",
        client: "Facilities Management",
        tag: "Enterprise Platform",
        color: "#ff6b35",
        description:
          "End-to-end digital permit platform deployed across data centers, commercial malls, and facilities — enabling vendors and visitors to request and manage work permits with full RBAC and audit trails.",
        highlights: [
          "Role-based access control with multi-level approval workflows",
          "MyKad (national ID) reader & QR code kiosk check-in",
          "Access card issuance, check-out tracking & drop-box reconciliation",
          "Full audit trail for safety protocol compliance",
        ],
        tech: [
          "ASP.NET Core",
          "Angular",
          "SQL Server",
          "RBAC",
          "QR Integration",
        ],
      },
      {
        name: "Real-Time AI Camera Notifier",
        client: "Multi-site Clients",
        tag: "AI Integration",
        color: "#a855f7",
        description:
          "Real-time incident monitoring system integrated with AI-enabled cameras. Live alarm events pushed directly to the app with in-app collaborative chat, analytics dashboards, and AWS S3 file management.",
        highlights: [
          "Live AI camera alarm event ingestion and display",
          "In-app chat with file & image attachment for alarm closure",
          "People movement analytics per device group",
          "AWS S3 cloud storage for incident media",
          "AI-generated incident summary reports",
        ],
        tech: ["ASP.NET Core", "Angular", "AWS S3", "SignalR", "SQL Server"],
      },
    ],
  },
  {
    company: "ISC Global Solutions",
    location: "Chennai, India",
    role: "Junior Software Developer",
    period: "Oct 2022 – Jan 2025",
    projects: [
      {
        name: "Meeting Scheduler",
        tag: "SaaS Tool",
        color: "#22c55e",
        description:
          "Multi-platform meeting scheduler with native integrations for Google Meet, Zoom, and Microsoft Teams.",
        highlights: [
          "Google Meet, Zoom & Microsoft Teams integrations",
          "Built with .NET Core, Web API, Entity Framework, LINQ",
        ],
        tech: [".NET Core", "Web API", "Entity Framework", "LINQ"],
      },
      {
        name: "E-Commerce Platform for bMobile",
        tag: "E-Commerce",
        color: "#f59e0b",
        description:
          "Full-featured e-commerce solution with product listings, user authentication, and card payment processing via RESTful APIs.",
        highlights: [
          "Product listings & user authentication",
          "Card payment processing via RESTful APIs",
        ],
        tech: ["ASP.NET", "Entity Framework", "REST APIs", "SQL Server"],
      },
      {
        name: "Vehicle Route Optimization",
        tag: "Logistics",
        color: "#06b6d4",
        description:
          "Integrated NextBillion.ai and Google Cloud Fleet Routing APIs to compute optimal multi-stop delivery routes, reducing travel time and operational costs.",
        highlights: [
          "NextBillion.ai & Google Cloud Fleet Routing integration",
          "Optimal multi-stop route computation",
          "Reduced travel time & logistics costs",
        ],
        tech: [".NET Core", "Google Cloud APIs", "NextBillion.ai", "LINQ"],
      },
    ],
  },
];

export const freelance = [
  {
    name: "Time Attendance & Leave Management System",
    tag: "HR / Workforce",
    color: "#ec4899",
    description:
      "A full-featured workforce management platform. Handles employee shift scheduling, attendance tracking, and leave management end-to-end.",
    highlights: [
      "Employee sign-in / sign-out per shift",
      "Leave application & approval workflow",
      "Manager approval / rejection of leaves",
      "Admin: create & assign shifts, manage holidays",
      "User, manager & admin role hierarchy",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "RBAC"],
  },
  {
    name: "Inventory & Sales Dashboard",
    tag: "Business Tool",
    color: "#10b981",
    description:
      "Inventory management platform for a retail business. Admin-facing tool for product management, order entry, and visual sales analytics.",
    highlights: [
      "Product catalog management",
      "Order creation and tracking",
      "Sales analytics dashboard",
      "Inventory level monitoring",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "Chart.js"],
  },
];
