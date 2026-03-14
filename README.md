# Adarsh Raj — Portfolio Website

A modern, minimalist full-stack developer portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
├── app/
│   ├── globals.css        # Global styles + Tailwind directives
│   ├── layout.js          # Root layout with SEO metadata
│   ├── page.js            # Main page assembling all sections
│   └── providers.js       # next-themes ThemeProvider wrapper
│
├── components/
│   ├── Navbar.jsx         # Sticky nav with scroll detection + mobile drawer
│   ├── Hero.jsx           # Full-viewport hero with CTAs
│   ├── About.jsx          # Bio + animated stat cards
│   ├── Skills.jsx         # Skill category cards with progress bars
│   ├── Experience.jsx     # Timeline-style work experience
│   ├── Projects.jsx       # Featured project cards with tech stack
│   ├── Achievements.jsx   # Hackathon & competition cards
│   ├── Education.jsx      # Academic background
│   ├── Certifications.jsx # Professional certifications
│   ├── Contact.jsx        # Contact info + message form
│   ├── Footer.jsx         # Footer with social links + back-to-top
│   ├── SectionWrapper.jsx # Reusable animated section container
│   └── SectionHeading.jsx # Reusable section heading component
│
├── public/
│   └── Adarsh_Raj_9386012794.pdf  # Resume (copy here)
│
├── tailwind.config.js     # Custom theme extensions
├── next.config.mjs        # Next.js config
└── jsconfig.json          # Path alias @ → root
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light mode)
- **Icons**: react-icons
- **Scroll Detection**: react-intersection-observer

## Customization

Update content in each component file:
- Personal info → `Hero.jsx`
- Bio & stats → `About.jsx`
- Skills → `Skills.jsx`
- Work experience → `Experience.jsx`
- Projects → `Projects.jsx`
- Email for contact form → connect `emailjs` in `Contact.jsx`
