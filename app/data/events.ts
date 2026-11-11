export type EventCategory = "Tech" | "Sports" | "Faith" | "Social";

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
};

export const events: CampusEvent[] = [
  {
    id: "campus-tech-summit-2026",
    title: "Campus Tech & Innovation Workshop",
    category: "Tech",
    date: "2026-11-18",
    time: "10:00 AM",
    venue: "ICT Centre",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    description:
      "Meet student founders, developers, and technology professionals for a day of practical talks, product demos, and conversations about building useful technology in Nigeria.",
  },
  {
    id: "inter-faculty-football-final-2026",
    title: "Inter-Faculty Football Final",
    category: "Sports",
    date: "2026-11-20",
    time: "4:00 PM",
    venue: "University Sports Field",
    image:
      "https://plus.unsplash.com/premium_photo-1733342559406-34859aaf2c4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "Cheer on the finalists as two faculty teams compete for the campus football trophy. Bring your friends, wear your faculty colours, and enjoy an afternoon of lively student support.",
  },
  {
    id: "mssn-program",
    title: "MSSN Usrah Program",
    category: "Faith",
    date: "2026-11-22",
    time: "10:00 AM",
    venue: "Mbasir First Floor",
    image:
      "https://images.unsplash.com/photo-1651293478838-1f51675131c5?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "An Islamic gathering for learning, reflection and strengthening brotherhood and sisterhood.",
  },
  {
    id: "student-enterpreneurship",
    title: "Student Entrepreneur Fair",
    category: "Social",
    date: "2026-11-25",
    time: "2:00 PM",
    venue: "Entreprenuership Hall",
    image:
      "https://plus.unsplash.com/premium_photo-1714060723069-6b824bb942d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "Student showcase business ideas, products and creative ventures.",
  },
  {
    id: "ai-technology",
    title: "AI & Emerging Technology Summit",
    category: "Tech",
    date: "2026-11-28",
    time: "11:00 AM",
    venue: "IFF Accounting Lab",
    image:
      "https://media.istockphoto.com/id/2191084357/photo/japanese-woman-interacts-with-futuristic-transparent-screen-displaying-digital-graphs-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=u7kSdaY8wfQ5KxBDFgm7EsNWxhYhwDr2Sv4egaFK1n8=",
    description:
      "Exploring artifical intelligence and how it is changing different industries",
  },
  {
    id: "campus-basketball-2026",
    title: "Campus Basket Championship",
    category: "Sports",
    date: "2026-12-02",
    time: "7:00 AM",
    venue: "University Basketball court",
    image:
      "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "",
  },
  {
    id: "quran-session",
    title: "Qur'an Recitation & Tajweed Session",
    category: "Faith",
    date: "2026-12-06",
    time: "4:30 PM",
    venue: "University Central Mosque",
    image:
      "https://plus.unsplash.com/premium_photo-1726718571654-af0f681bce8a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "An interactive session where students come together to recite the Holy Qur'an. improve their Tajweed, correct their recitation, and deepen their understanding of its teachings.",
  },
  {
    id: "inter-department-debate",
    title: "Inter-department debate competition",
    category: "Social",
    date: "2026-12-10",
    time: "11:00 AM",
    venue: "Adiat Hall",
    image:
      "https://images.unsplash.com/photo-1660795938356-b584cf857ba5?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description:
      "A friendly intellectual competition where students represent their department, exchange opinions, defend arguments and develop their public speaking skills.",
  },
];
