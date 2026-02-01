import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Make sure .env file exists with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This script migrates all hardcoded data to Supabase
// Run this once after setting up the database schema

async function migrateData() {
  console.log('Starting data migration...');

  try {
    // Migrate Projects
    console.log('Migrating projects...');
    const projects = [
      {
        id: "1",
        title: "Portfolio-Website",
        description: "This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey.",
        full_description: "This portfolio website serves as a personal space to highlight my achievements, projects, and professional journey. Built with modern technologies, it ensures a smooth and visually appealing user experience.",
        image_url: "/PortfolioProject(2).png",
        tags: ["Portfolio", "skills"],
        live_link: "https://portfolio-website-vaibhavee.vercel.app/",
        github_link: "https://github.com/Vaibhavee89/portfolio-website-vaibhavee",
        display_order: 0,
        featured: true
      },
      {
        id: "2",
        title: "QuizWhiz",
        description: "A fast and interactive quiz app with a wide range of categories and questions.",
        full_description: "Welcome to QuizWhiz, a fast and interactive trivia quiz app that pulls questions from Trivia API and provides instant feedback!",
        image_url: "/TriviaQuiz.png",
        tags: ["Quiz", "TriviaChallenge"],
        live_link: "https://quiz-whiz-red.vercel.app/",
        github_link: "https://github.com/Vaibhavee89/QuizWhiz",
        display_order: 1
      },
      {
        id: "3",
        title: "Short.ly",
        description: "A URL shortening service that provides detailed analytics and custom short links.",
        full_description: "Short.ly is a simple API that shortens long URLs and redirects users when they access the shortened links. It is built with modern web technologies, ensuring fast performance and a seamless experience.",
        image_url: "/Shortly.png",
        tags: ["URL", "Shortner", "Analytics"],
        live_link: "https://short-ly-wine.vercel.app/",
        github_link: "https://github.com/Vaibhavee89/Short.ly",
        display_order: 2
      },
      {
        id: "4",
        title: "Crypto Wallet Mobile App",
        description: "Designed a mobile app for managing cryptocurrency transactions, including wallet management and transaction history.",
        full_description: "This project is a mobile application designed to manage cryptocurrency transactions, including wallet management and transaction history. The app provides a user-friendly interface for users to view their wallet balance, transaction history, and perform transactions securely.",
        image_url: "/Crypto.avif",
        tags: ["Mobile App", "Crypto Wallet", "UI/UX Design"],
        display_order: 3
      },
      {
        id: "6",
        title: "Sudoku-Solver",
        description: "This is a simple Sudoku solver application written in C++. It takes a 9x9 Sudoku puzzle as input and solves it using a backtracking algorithm.",
        full_description: "Sudoku Solver is a web application that allows users to input a Sudoku puzzle and get the solution instantly. The app uses a backtracking algorithm to solve the puzzle efficiently.",
        image_url: "/SudokuSolver.png",
        tags: ["C++", "Backtracking Algorithm", "Conceptual Problem Solving"],
        github_link: "https://github.com/Vaibhavee89/Sudoku-Solver",
        display_order: 4
      },
      {
        id: "7",
        title: "Ziplyn",
        description: "Experimental project to create a file compression and extraction utility in Rust.",
        full_description: "Ziplyn is an experimental project to create a file compression and extraction utility in Rust. The application is designed to be fast, efficient, and user-friendly, with a focus on simplicity and performance.",
        image_url: "/Ziplyn.png",
        tags: ["Rust", "File Compression", "File Extraction"],
        github_link: "https://github.com/Vaibhavee89/Ziplyn",
        display_order: 5
      }
    ];

    const { error: projectsError } = await supabase.from('projects').insert(projects);
    if (projectsError) throw projectsError;
    console.log('✓ Projects migrated');

    // Migrate Project Images
    console.log('Migrating project images...');
    const projectImages = [
      { project_id: "1", image_url: "/PortfolioProject(2).png", display_order: 0 },
      { project_id: "2", image_url: "/TriviaQuiz.png", display_order: 0 },
      { project_id: "3", image_url: "/Shortly.png", display_order: 0 },
      { project_id: "4", image_url: "/Crypto.avif", display_order: 0 },
      { project_id: "6", image_url: "/SudokuSolver.png", display_order: 0 },
      { project_id: "7", image_url: "/Ziplyn.png", display_order: 0 }
    ];

    const { error: imagesError } = await supabase.from('project_images').insert(projectImages);
    if (imagesError) throw imagesError;
    console.log('✓ Project images migrated');

    // Migrate Skills
    console.log('Migrating skills...');
    const skills = [
      { name: 'Python', icon_name: 'FileCode', display_order: 0 },
      { name: 'JavaScript', icon_name: 'Zap', display_order: 1 },
      { name: 'TypeScript', icon_name: 'Code', display_order: 2 },
      { name: 'React', icon_name: 'Component', display_order: 3 },
      { name: 'Next.js', icon_name: 'Code', display_order: 4 },
      { name: 'TensorFlow', icon_name: 'Brain', display_order: 5 },
      { name: 'PyTorch', icon_name: 'Brain', display_order: 6 },
      { name: 'Scikit-learn', icon_name: 'Database', display_order: 7 },
      { name: 'Pandas', icon_name: 'Database', display_order: 8 },
      { name: 'NumPy', icon_name: 'Database', display_order: 9 },
      { name: 'NLP', icon_name: 'MessageSquare', display_order: 10 },
      { name: 'Computer Vision', icon_name: 'Smartphone', display_order: 11 },
      { name: 'PowerBI', icon_name: 'BarChart', display_order: 12 },
      { name: 'Tableau', icon_name: 'BarChart', display_order: 13 },
      { name: 'AWS', icon_name: 'Cloud', display_order: 14 },
      { name: 'GCP', icon_name: 'Cloud', display_order: 15 },
      { name: 'Git', icon_name: 'GitBranch', display_order: 16 },
      { name: 'GitHub', icon_name: 'Github', display_order: 17 },
      { name: 'Docker', icon_name: 'Server', display_order: 18 },
      { name: 'Kubernetes', icon_name: 'Server', display_order: 19 },
      { name: 'Jupyter', icon_name: 'BookMarked', display_order: 20 },
      { name: 'SQL', icon_name: 'Database', display_order: 21 },
      { name: 'NoSQL', icon_name: 'Database', display_order: 22 },
      { name: 'HTML/CSS', icon_name: 'Code', display_order: 23 }
    ];

    const { error: skillsError } = await supabase.from('skills').insert(skills);
    if (skillsError) throw skillsError;
    console.log('✓ Skills migrated');

    // Migrate Certifications
    console.log('Migrating certifications...');
    const certifications = [
      {
        name: "AWS Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "May 2024",
        icon_name: "Cloud",
        credential_url: "https://www.credly.com/badges/8ebcbe71-30e8-4961-9c8b-4ad852f0aed5/public_url",
        description: "Fundamental knowledge of AWS Cloud, services, and terminology. Covers security, technology, billing, pricing, and core services.",
        display_order: 0
      },
      {
        name: "Supervised Machine Learning: Classification",
        issuer: "IBM",
        date: "Nov 2024",
        icon_name: "Brain",
        credential_url: "https://coursera.org/share/cd753b05dce213265c899ae6cdb81d75",
        description: "This course introduces the concept of Ensemble Learning, Machine Learning(ML) Algorithms, Supervised Learning, Classification Algorithms, Decision Tree",
        display_order: 1
      },
      {
        name: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization, and Optimization",
        issuer: "Deeplearning.AI",
        date: "Nov 2024",
        icon_name: "Brain",
        credential_url: "https://coursera.org/share/ec108e28939b593ac32dd1721302c122",
        description: "This course offers skills in TensorFlow, Deep Learning, Hyperparameter turing, Mathematical Optimization",
        display_order: 2
      },
      {
        name: "Simulation and Modeling of Natural Processes",
        issuer: "University of Geneva",
        date: "Nov 2024",
        icon_name: "Award",
        credential_url: "https://coursera.org/share/af94e2e3392a83c452a9090e19ab3374",
        description: "Computer Programming, Python Programming, Mathematics, Probability ans Statisctics",
        display_order: 3
      },
      {
        name: "The Bits and Bytes of Computer Networking",
        issuer: "Google",
        date: "Apr 2024",
        icon_name: "GraduationCap",
        credential_url: "https://coursera.org/share/64b9a6e0733428bc7eb1160be6ac745d",
        description: "In-depth knowledge of computer networks such as Domain Name System, IP addressing, and routing.",
        display_order: 4
      },
      {
        name: "Introduction to Computers, Operating Systems & Security",
        issuer: "Microsoft",
        date: "Apr 2024",
        icon_name: "GraduationCap",
        credential_url: "https://coursera.org/share/adfe89cc12c35b9c0c6469869b9f72fb",
        description: "In-depth knowledge of Operating Systems, Computer Architecture and Cloud Computing",
        display_order: 5
      },
      {
        name: "Foundations of User Experience (UX) Design",
        issuer: "Google",
        date: "Jul 2023",
        icon_name: "GraduationCap",
        credential_url: "https://coursera.org/share/6ea80fd2cfb6166fe1d581f173ce6735",
        description: "Introduction to User Experience (UX), Prototype, Wireframe, User Expericence Design (UXD), UX Research",
        display_order: 6
      }
    ];

    const { error: certsError } = await supabase.from('certifications').insert(certifications);
    if (certsError) throw certsError;
    console.log('✓ Certifications migrated');

    // Migrate Education
    console.log('Migrating education...');
    const education = [
      {
        title: 'B.Tech in Computer Science & Engineering',
        period: '2022 - 2026',
        description: "Pursuing a bachelor's with a focus on Artificial Intelligence, Machine Learning, Cloud Computing, and Computer Vision, building strong foundations in data structures, algorithms, and distributed systems.",
        display_order: 0
      },
      {
        title: 'Cloud Certifications & Research',
        period: '2024',
        description: 'Completed multiple industry-recognized credentials across AWS and deep learning, applying the knowledge to practical projects and research-led initiatives.',
        display_order: 1
      },
      {
        title: 'High School Diploma — Science with Computer Science',
        period: '2020 - 2022',
        description: 'Graduated with honors while leading technology-driven activities, laying a strong analytical and mathematical groundwork for my engineering journey.',
        display_order: 2
      }
    ];

    const { error: eduError } = await supabase.from('education').insert(education);
    if (eduError) throw eduError;
    console.log('✓ Education migrated');

    // Migrate Work Experience
    console.log('Migrating work experience...');
    const workExperience = [
      {
        title: 'Cybersecurity & Network Simulation Intern',
        organisation: 'Centre for Development of Advanced Computing (C-DAC)',
        period: 'Jun 2025 – Aug 2025',
        badge: '25',
        description: 'Built and demonstrated network attack simulations including ping flood and unauthorized access mitigation using ACLs and firewall policies. Co-developed a Python Flask network auditing tool leveraging Nmap, Postman, and GCP services.',
        display_order: 0
      },
      {
        title: 'Internship Trainee – Analytics & Research',
        organisation: 'CSIR-Central Institute of Mining and Fuel Research',
        period: 'Jul 2024 – Aug 2024',
        badge: '24',
        description: 'Led sentiment analysis for educational video content and delivered dashboards capturing audience engagement insights to support strategic communication decisions.',
        display_order: 1
      },
      {
        title: 'Research Co-head',
        organisation: 'WIE-IEEE, Bennett Chapter',
        period: 'Sep 2023 – May 2024',
        badge: '23',
        description: 'Planned and executed research-focused initiatives, workshops, and collaborative projects that increased member participation in innovation and scholarship.',
        display_order: 2
      },
      {
        title: 'Design Co-head',
        organisation: 'Bennett Cloud Computing Club & Product Design and Technology Club',
        period: 'Sep 2023 – May 2024',
        badge: '23',
        description: 'Directed design strategy for cloud-centric events, enabling hands-on AWS and GCP sessions that elevated the club\'s technical outreach efforts.',
        display_order: 3
      }
    ];

    const { error: workError } = await supabase.from('work_experience').insert(workExperience);
    if (workError) throw workError;
    console.log('✓ Work experience migrated');

    // Migrate Blog Posts
    console.log('Migrating blog posts...');
    const blogPosts = [
      {
        id: "blog-1",
        title: "Tech Giants vs. Open Source: The Arms Race of GenAI",
        excerpt: "An epic clash unfolds between tech giants and open-source rebels, each vying to shape the future of generative AI through innovation, access, and control.",
        date: "March 5, 2025",
        read_time: "3 min",
        dev_to_url: "https://dev.to/vaibhavee_singh89/tech-giants-vs-open-source-the-arms-race-of-genai-381p",
        display_order: 0
      },
      {
        id: "blog-2",
        title: "Live Coding and Hot Code Swapping- Updating a running program without restarting it",
        excerpt: "Discover how Live Coding and Hot Code Swapping can supercharge your development workflow by letting you update code on the fly—no restarts needed!",
        date: "March 15, 2025",
        read_time: "13 min",
        dev_to_url: "https://dev.to/vaibhavee_singh89/live-coding-hot-code-swapping-updating-a-running-program-without-restarting-it-35f9",
        display_order: 1
      },
      {
        id: "blog-3",
        title: "Meta Programming - Writing code that generates or modifies other code dynamically",
        excerpt: "Unlock the power of metaprogramming to automate tasks like logging by letting your code dynamically write and modify itself.",
        date: "March 20, 2025",
        read_time: "8 min",
        dev_to_url: "https://dev.to/vaibhavee_singh89/meta-programming-writing-code-that-generates-or-modifies-other-code-dynamically-11ck",
        display_order: 2
      }
    ];

    const { error: blogsError } = await supabase.from('blog_posts').insert(blogPosts);
    if (blogsError) throw blogsError;
    console.log('✓ Blog posts migrated');

    // Migrate Events
    console.log('Migrating events...');
    const events = [
      {
        image_url: "/GitTogether.jpg",
        alt_text: "Git Together at Microsoft office Greater Noida- Nov 2024",
        caption: "Git Together at Microsoft office Greater Noida- Nov 2024",
        display_order: 0
      },
      {
        image_url: "/Student_volunteer_conference.jpg",
        alt_text: "Student volunteer at ICICC-2025",
        caption: "Student Volunteer at ICICC-2025",
        display_order: 1
      },
      {
        image_url: "/ResearchHackathon.jpg",
        alt_text: "Participated in Research Hackathon organized at Bennett University during first year of college",
        caption: "Participated in Research Hackathon organized at Bennett University during first year of college",
        display_order: 2
      },
      {
        image_url: "/HP_PowerLab.jpg",
        alt_text: "HP PowerLab Hackathon Certificate",
        caption: "HP PowerLab Hackathon Certificate",
        display_order: 3
      },
      {
        image_url: "/Team-Luminous.jpg",
        alt_text: "With my team at Luminous Techno-X Hackathon",
        caption: "With my team at Luminous Techno-X Hackathon",
        display_order: 4
      },
      {
        image_url: "/LuminousHackathon.jpg",
        alt_text: "Luminous Techno-X Hackathon",
        caption: "Luminous Techno-X Hackathon",
        display_order: 5
      },
      {
        image_url: "/ProjectShowcase2ndYear.jpg",
        alt_text: "Project Showcase during 2nd year of college",
        caption: "Project Showcase during 2nd year of college",
        display_order: 6
      },
      {
        image_url: "/AWS_StudentCommunityDay.jpg",
        alt_text: "AWS Student Community Day",
        caption: "AWS Student Community Day",
        display_order: 7
      },
      {
        image_url: "/AnshMehra.jpg",
        alt_text: "Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023",
        caption: "Got an opportunity to meet Ansh Mehra at Google DevFest New Delhi- 2023",
        display_order: 8
      },
      {
        image_url: "/Paper_Presentation_Certificate.jpg",
        alt_text: "Paper Presentation Certificate",
        caption: "Paper Presentation Certificate",
        display_order: 9
      },
      {
        image_url: "/GoogleDevFest-2023.jpg",
        alt_text: "Google DevFest New Delhi- 2023",
        caption: "Google DevFest New Delhi- 2023",
        display_order: 10
      },
      {
        image_url: "/Hackcbs.jpg",
        alt_text: "HackCBS 7.0",
        caption: "HackCBS 7.0",
        display_order: 11
      }
    ];

    const { error: eventsError } = await supabase.from('events').insert(events);
    if (eventsError) throw eventsError;
    console.log('✓ Events migrated');

    console.log('\n✅ Data migration completed successfully!');
    console.log('All portfolio data has been migrated to Supabase.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('\nMigration script finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nMigration script failed:', error);
    process.exit(1);
  });
