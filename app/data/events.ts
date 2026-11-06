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
    title: "Campus Tech Summit",
    category: "Tech",
    date: "2026-11-18",
    time: "10:00 AM",
    venue: "Faculty of Engineering Auditorium",
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
    venue: "University Sports Ground",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cheer on the finalists as two faculty teams compete for the campus football trophy. Bring your friends, wear your faculty colours, and enjoy an afternoon of lively student support.",
  },
  {
    id: "evening-of-worship-2026",
    title: "Evening of Worship",
    category: "Faith",
    date: "2026-11-22",
    time: "5:30 PM",
    venue: "Main Chapel",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80",
    description:
      "Take a pause from lectures for an evening of music, prayer, and reflection led by the campus fellowship worship team. Students from every department are welcome.",
  },
  {
    id: "freshers-movie-under-stars-2026",
    title: "Freshers' Movie Under the Stars",
    category: "Social",
    date: "2026-11-25",
    time: "7:00 PM",
    venue: "Student Centre Courtyard",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    description:
      "Settle in for an outdoor movie night organised by the student union. Bring a mat or blanket, pick up snacks at the courtyard, and meet students from across campus.",
  },
  {
    id: "design-and-code-workshop-2026",
    title: "Design and Code Workshop",
    category: "Tech",
    date: "2026-11-28",
    time: "11:00 AM",
    venue: "ICT Resource Centre, Lab 2",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Learn how to turn a simple idea into a polished web page. This beginner-friendly session pairs interface design exercises with hands-on coding; bring a laptop if you have one.",
  },
  {
    id: "campus-wellness-walk-2026",
    title: "Campus Wellness Walk",
    category: "Sports",
    date: "2026-12-02",
    time: "7:00 AM",
    venue: "Meet at the Main Library Gate",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Start the day with a relaxed group walk around campus. The student health association will share simple wellbeing tips, and walkers of all fitness levels can join.",
  },
  {
    id: "community-carol-service-2026",
    title: "Community Carol Service",
    category: "Faith",
    date: "2026-12-06",
    time: "4:00 PM",
    venue: "University Main Auditorium",
    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80",
    description:
      "Join the campus choir and student fellowships for an afternoon of carols, readings, and seasonal music. Friends, staff, and families are welcome to attend.",
  },
  {
    id: "end-of-semester-cultural-night-2026",
    title: "End-of-Semester Cultural Night",
    category: "Social",
    date: "2026-12-10",
    time: "6:00 PM",
    venue: "New Student Union Hall",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description:
      "Celebrate the end of lectures with student performances, music, food stalls, and displays from campus cultural associations. Come ready to support your fellow students.",
  },
];
