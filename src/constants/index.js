import {
    car,
    contact,
    css,
    git,
    github,
    html,
    javascript,
    linkedin,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    tailwindcss
} from "../assets/icons";
// import { meta, shopify, starbucks, tesla } from "../assets/images";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
];

export const experiences = [
    {
        title: "Frontend Developer",
        company_name: "Flying Devs",
        // icon: ,
        iconBg: "#accbe1",
        date: "July 2023 - Current",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
        ],
    },
    {
        title: "Flutter Developer",
        company_name: "Smart Odisha Hackathon 2022",
        // icon: ,
        iconBg: "#a2d2ff",
        date: "Dec 2023",
        points: [
            "Participated in Smart Odisha Hackathon with my team and made a project on Alumni ChatApp for the colleges and universities of Odisha.",
        ],
    },
    {
        title: "Web Developer",
        company_name: "Cisco thingQbator",
        // icon: ,
        iconBg: "#b7e4c7",
        date: "May 2022 - June 2022",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Participated in Cisco thingQbator with my team and worked on drone project for solving traffic problems."
        ],
    },
    {
        title: "App Developer",
        company_name: "Smart India Hackathon 2022",
        // icon: ,
        iconBg: "#fbc3bc",
        date: "March 2022 - April 2022",
        points: [
            "Participated in Smart India Hackathon with my team and made a project about electric vehicle charging station finder."
        ],
    },
];

export const educations = [
    {
        title: "MCA",
        company_name: "Pimpri Chinchwad University, Pune, Maharashtra",
        // icon: ,
        iconBg: "#accbe1",
        date: "September 2023 - Current",
        points: [
            "Currently pursuing MCA from Pimpri Chinchwad University, Pune, Maharashtra.",
        ],
    },
    {
        title: "BCA",
        company_name: "Trident Academy of Creative Technology, Bhubaneswar, Odisha",
        // icon: ,
        iconBg: "#accbe1",
        date: "November 2020 - May 2023",
        points: [
            "Secured 7.3 CGPA overall.",
        ],
    },
    {
        title: "12TH",
        company_name: "DAV Public School, NIT Campus, Adityapur, Jharhand",
        // icon: ,
        iconBg: "#accbe1",
        date: "April 2019 - April 2020",
        points: [
            "Secured 84% in 12th board examination.",
        ],
    },
    {
        title: "10TH",
        company_name: "DAV Public School, NIT Campus, Adityapur, Jharhand",
        // icon: ,
        iconBg: "#a2d2ff",
        date: "April 2017 - April 2018",
        points: [
            "Secured 82% in 10th board examination.",
        ],
    }
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/adarshraj26',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/adarsh-raj26',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Alumni ChatApp',
        description: "Developed a chatapp for the alumni of colleges and universities of Odisha, to track the records of their alumni's and allowing users to connect with their friends and teachers in a familiar social media environment.",
        link: 'https://github.com/adarshraj26/AlumniChatApp',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Booking Application',
        description: 'Designed and built a web app for booking cars, allowing users to browse and reserve vehicles for their desired dates and times.',
        link: 'https://car-rental-22fe5.web.app',
    },
    {
        iconUrl: pricewise,
        theme: 'btn-back-pink',
        name: 'AI-SaaS Application',
        description: 'Developed a web app for generating audio, video, text, and image content using AI, allowing users to create content for their social media platforms.',
        link: 'https://ai-saa-s-azure.vercel.app/',
    },
    {
        iconUrl: pricewise,
        theme: 'btn-back-green',
        name: 'NGO Website',
        description: 'Developed a website for an NGO, allowing users to donate and contribute to the organization, as well as learn more about their mission and goals.',
        link: 'ngo-website-psi.vercel.app',
    }
];