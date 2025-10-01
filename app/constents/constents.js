
import { X } from "lucide-react";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

export const socials = [
  {
    icon: (
      <RiInstagramFill className="w-7 h-7 text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:via-red-500 hover:to-purple-600 transition-all duration-300" />
    ),
    href: "https://instagram.com",
    bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  },
  {
    icon: (
      <FaLinkedin className="w-7 h-7 text-gray-600 hover:text-[#0A66C2] transition" />
    ),
    href: "https://linkedin.com",
    bg: "bg-[#0A66C2]", // LinkedIn official
  },
  {
    icon: (
      <FaFacebookSquare className="w-7 h-7 text-gray-600 hover:text-[#1877F2] transition" />
    ),
    href: "https://facebook.com",
    bg: "bg-[#1877F2]", // Facebook official
  },
  {
    icon: (
      <FaTwitter className="w-7 h-7 text-gray-600 hover:text-[#1DA1F2] transition" />
    ),
    href: "https://x.com",
    bg: "bg-[#1DA1F2]", // Twitter (X) blue
  },
  {
    icon: (
      <TfiYoutube className="w-7 h-7 text-gray-600 hover:text-[#FF0000] transition" />
    ),
    href: "https://youtube.com",
    bg: "bg-[#FF0000]", // YouTube red
  },
];


export const footerLinks = [
  {
    title: "Explore Spreads",
    links: [
      { name: "Sign Up", href: "/signup" },
      { name: "Help Center", href: "/help" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Developers", href: "/developers" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { name: "Jobs", href: "/jobs" },
      { name: "Microblog Circles", href: "/microblogs" },
      { name: "Salaries", href: "/salaries" },
      { name: "Top Roles", href: "/top-roles" },
      { name: "Remote Work", href: "/remote" },
      { name: "Global Talent Feed", href: "/global-talent" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { name: "Jobs", href: "/jobs" },
      { name: "Microblog Circles", href: "/microblogs" },
      { name: "Salaries", href: "/salaries" },
      { name: "Top Roles", href: "/top-roles" },
      { name: "Remote Work", href: "/remote" },
      { name: "Global Talent Feed", href: "/global-talent" },
    ],
  },
  {
    title: "For Organizations",
    links: [
      { name: "Talent Solutions", href: "/org/talent" },
      { name: "Hiring Dashboard", href: "/org/dashboard" },
      { name: "Employer Branding", href: "/org/branding" },
      { name: "Community Hiring", href: "/org/hiring" },
    ],
  },
  {
    title: "Directories",
    links: [
      { name: "Members", href: "/directory/members" },
      { name: "Jobs", href: "/directory/jobs" },
      { name: "Startups", href: "/directory/startups" },
      { name: "Universities", href: "/directory/universities" },
      { name: "Articles", href: "/directory/articles" },
      { name: "Circles", href: "/directory/circles" },
      { name: "Creators", href: "/directory/creators" },
      { name: "Fellowships", href: "/directory/fellowships" },
    ],
  },
];

export const footerPolicies = [
  { name: "About", href: "/about" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Brand Policy", href: "/brand" },
  { name: "Guest Controls", href: "/guest-controls" },
  { name: "Community Guidelines", href: "/community-guidelines" },
];


export const FIELD_LIMITS = {
  name: 17,
  headline: 150,
  location: 25,
  youmaynowabout:50,
  email: 30,
  joined: 15,
  company: 25,
};




// utils/dummyUsers.js
export const users = [
  {
    id: "u12345",
    username: "rupendra",
    name: "Rupendra Vishwakarma",
    headline: "Full Stack Developer | AI + Frontend EnthusiastFull Stack Developer | AI + Frontend EnthusiastFull Stack Developer | AI + Frontend EnthusiastFull Stack Developer | AI + Frontend EnthusiastFull Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "rupendravishwarkam@gmail.com",
    phone: ["9876543210"],
    joined: "21 June 2025",
    about:
      "Passionate about building AI-powered frontend experiences. MERN + Next.js + LangChain.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rupendra",
      github: "https://github.com/rupendra",
      twitter: "https://twitter.com/rupendra",
      website: "https://rupendra.dev",
    },
    followers: 1280,
    connections: 900,
    views: 4500,
    experience: [
      {
        id: "exp1",
        role: "Software Engineer",
        company: "Google",
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        duration: "2023 – Present",
        location: "Bangalore, India",
        description:
          "Working on scalable frontend architecture and AI-driven solutions for Google Cloud Platform.",
      },
    ],
    education: [
      {
        id: "edu1",
        name: "IIT Bombay",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/0a/IIT_Bombay_Logo.svg",
        degree: "B.Tech in Computer Science",
        duration: "2016 – 2020",
      },
    ],
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "LangChain",
      "OpenAI API",
      "MERN",
      "System Design",
    ],
    projects: [
      {
        id: "p1",
        title: "AI-Powered Job Portal",
        description:
          "Built a job portal with AI-based recommendations for skill matching.",
        link: "https://github.com/rupendra/jobportal",
        tech: ["Next.js", "LangChain", "OpenAI API"],
      },
      {
        id: "p2",
        title: "Realtime Chat App",
        description: "End-to-end encrypted chat app with group support.",
        link: "https://github.com/rupendra/realtime-chat",
        tech: ["React", "Node.js", "Socket.IO"],
      },
    ],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "1h" },
        content:
          "When designing frontend systems at scale, which approach do you prefer for state management?",
        poll: {
          question: "Best State Management?",
          options: ["Redux", "Zustand", "React Query", "MobX"],
          votes: [5, 2, 4, 3],
          timeLeft: "12h left",
        },
        tags: ["React", "State", "SystemDesign"],
        likes: 75,
        liked: true,
        saved: false,
        reposts: 6,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "2h" },
        content: "Exploring Zustand vs Redux Toolkit for large-scale projects.",
        tags: ["React", "State"],
        likes: 90,
        liked: false,
        saved: false,
        reposts: 4,
        comments: [],
        activity: "Posts",
      },
      {
        id: "post3",
        type: "image",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "3h" },
        content: "New architecture diagram for microfrontend setup 🚀",
        image: "/AboutDumImg.jpeg",
        tags: ["Microfrontend", "Architecture"],
        likes: 40,
        liked: false,
        saved: true,
        reposts: 8,
        comments: [],
        activity: "Posts",
      },
      {
        id: "post4",
        type: "image",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "3h" },
        content: "Sneak peek of my AI + frontend dashboard redesign 🚀",
        image: "/AboutDumImg.jpeg",
        tags: ["AI", "UI/UX", "Frontend"],
        likes: 180,
        liked: false,
        saved: true,
        reposts: 12,
        comments: [],
        activity: "Repost",
      },
      {
        id: "post5",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "5h" },
        content:
          "Just wrapped up a GenAI + React POC where AI suggests code fixes in real-time 🔥.",
        tags: ["AI", "React", "DevTools"],
        likes: 300,
        liked: false,
        saved: false,
        reposts: 20,
        comments: [
          {
            id: "c3",
            user: { name: "Jay Vishwakarma", username: "jay", avatar: "" },
            content: "That sounds game-changing 👏",
          },
        ],
        activity: "Comments",
      },
      {
        id: "post6",
        type: "text",
        user: { name: "Priya Sharma", username: "priya", avatar: "", time: "6h" },
        content: "Excited to share my new blog on MLOps best practices 🚀",
        tags: ["MLOps", "AWS", "BestPractices"],
        likes: 220,
        liked: true,
        saved: false,
        reposts: 15,
        comments: [],
        activity: "Likes",
      },
      {
        id: "post7",
        type: "text",
        user: { name: "Rupendra Vishwakarma", username: "rupendra", avatar: "", time: "7h" },
        content: "Another liked post for testing View All button.",
        tags: ["Testing", "Likes"],
        likes: 30,
        liked: true,
        saved: false,
        reposts: 2,
        comments: [],
        activity: "Likes",
      },
    ],
  },
  {
    id: "u12346",
    name: "Amana Vishwakarma",
    username: "aman2",
    headline: "Full Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "amana.vishwakarma@gmail.com",
    phone: ["9876543211"],
    joined: "21 June 2025",
    about:
      "Passionate about building AI-powered frontend experiences. MERN + Next.js + LangChain.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    socialLinks: {
      linkedin: "https://linkedin.com/in/amana",
      github: "https://github.com/amana",
      twitter: "https://twitter.com/amana",
      website: "https://amana.dev",
    },
    followers: 980,
    connections: 750,
    views: 3000,
    experience: [],
    education: [],
    skills: ["React", "Next.js", "MERN", "AI"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Amana Vishwakarma", username: "amana", avatar: "", time: "1h" },
        content: "Which frontend framework do you prefer in 2025?",
        poll: {
          question: "Frontend Choice?",
          options: ["React", "Next.js", "Vue", "Svelte"],
          votes: [120, 80, 40, 10],
          timeLeft: "10h left",
        },
        tags: ["Frontend", "React", "Next.js"],
        likes: 50,
        liked: false,
        saved: false,
        reposts: 3,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Amana Vishwakarma", username: "amana", avatar: "", time: "2h" },
        content: "Exploring SvelteKit for modern web apps.",
        tags: ["SvelteKit", "Frontend"],
        likes: 30,
        liked: false,
        saved: false,
        reposts: 1,
        comments: [],
        activity: "Posts",
      },
    ],
  },
  {
    id: "u12347",
    username: "javed23",
    name: "Javed Akhtar", 
    headline: "Full Stack Developer | AI + Frontend Enthusiast",
    location: "India",
    email: "javed.akhtar@gmail.com",
    phone: ["9876543212"],
    joined: "21 June 2025",
    about: "",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413",
    socialLinks: {},
    followers: 1020,
    connections: 800,
    views: 4000,
    experience: [],
    education: [],
    skills: ["React", "Node.js", "Next.js", "AI"],
    projects: [],
    posts: [
      {
        id: "post1",
        type: "poll",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "1h" },
        content: "Which backend framework do you prefer for production apps?",
        poll: {
          question: "Backend Choice?",
          options: ["Express", "NestJS", "Fastify", "Koa"],
          votes: [70, 50, 30, 20],
          timeLeft: "8h left",
        },
        tags: ["Backend", "Node.js", "API"],
        likes: 40,
        liked: false,
        saved: false,
        reposts: 2,
        comments: [],
        pollVoted: false,
        pollSelection: null,
        activity: "Posts",
      },
      {
        id: "post2",
        type: "text",
        user: { name: "Javed Akhtar", username: "javed", avatar: "", time: "2h" },
        content: "Trying out NestJS with GraphQL integration.",
        tags: ["NestJS", "GraphQL"],
        likes: 25,
        liked: false,
        saved: false,
        reposts: 1,
        comments: [],
        activity: "Posts",
      },
    ],
  },
];

