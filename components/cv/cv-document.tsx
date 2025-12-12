import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register standard fonts if needed, or use default Helvetica
// Font.register({ family: 'Inter', src: '...' }); // Standard Helvetica is safer for ATS

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#38bdf8', // Primary 400
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: '#0f172a', // Slate 900
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: '#38bdf8', // Primary Blue
        fontFamily: 'Helvetica-Bold',
        marginBottom: 10,
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        fontSize: 9,
        color: '#64748b', // Slate 500
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: '#0f172a',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        marginBottom: 8,
        paddingBottom: 2,
    },
    // Experience Item
    expItem: {
        marginBottom: 12,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    rolename: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
        color: '#0f172a',
    },
    company: {
        fontFamily: 'Helvetica-Bold',
        color: '#334155',
    },
    period: {
        fontSize: 9,
        fontFamily: 'Helvetica',
        color: '#64748b',
        textAlign: 'right',
    },
    summary: {
        marginBottom: 4,
        fontSize: 10,
        fontStyle: 'italic',
        color: '#475569',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
    },
    // Skills
    skillRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillTag: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 9,
        color: '#0f172a',
    },
});

// Data (Hardcoded for sync with Site)
const experienceData = [
    {
        role: "Lead Frontend Engineer",
        company: "Big Web Digital",
        location: "Lagos, Nigeria",
        period: "Apr 2020 – Present",
        summary: "Spearheading frontend strategy and enterprise-scale architecture.",
        achievements: [
            "Architected Next.js/React ecosystem serving 100k+ monthly users with 99.9% uptime.",
            "Engineered high-performance rendering engine using Server Components, boosting Core Web Vitals to 95+.",
            "Established Design System & Component Library, increasing feature velocity by 40%.",
            "Mentored 6 engineers and introduced CI/CD automation reducing bugs by 35%.",
            "Led migration of legacy monoliths to micro-frontends."
        ]
    },
    {
        role: "Head of Information Technology",
        company: "Michelle and Anthony Consulting",
        location: "Lagos, Nigeria",
        period: "Feb 2019 – Mar 2020",
        summary: "Directed IT operations and digital transformation initiatives.",
        achievements: [
            "Orchestrated cloud migration (AWS/Azure) ensuring 99.99% data availability.",
            "Implemented ISO 27001 security standards effectively eliminating breaches.",
            "Optimized operational workflows via automation, saving 15 hrs/week per employee."
        ]
    },
    {
        role: "Frontend Engineer",
        company: "Big Web Digital",
        location: "Lagos, Nigeria",
        period: "Feb 2017 – Apr 2020",
        achievements: [
            "Developed 15+ responsive web apps with 100% design fidelity.",
            "Integrated secure payment gateways processing over $1M transactions.",
            "Championed Modern JS (ES6+) adoption and refactored legacy codebases."
        ]
    },
    {
        role: "Software Engineer",
        company: "DG Solutions",
        location: "Lagos, Nigeria",
        period: "Jul 2013 – Jan 2017",
        achievements: [
            "Engineered real-time tools with WebSockets for sub-100ms latency.",
            "Developed RESTful APIs serving high-efficiency payloads.",
            "Automated testing workflows with Selenium reducing regression bugs by 50%."
        ]
    }
];

const projectsData = [
    {
        title: "Optical Router (Game)",
        tech: "Next.js, Canvas API, Algorithms",
        desc: "Interactive puzzle game with 2D raycasting engine and physics-based rendering."
    },
    {
        title: "Adeos - AI Video Maker",
        tech: "React, FFmpeg.wasm, WebGL",
        desc: "Browser-based video editing platform with client-side rendering pipeline."
    },
    {
        title: "Premium Portfolio V2",
        tech: "Next.js 14, Framer Motion, Tailwind",
        desc: "Award-winning portfolio site featuring advanced scroll physics and complex animations."
    }
];

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js",
    "HTML5/CSS3", "Tailwind CSS", "Framer Motion", "Three.js", "WebGL",
    "Git", "CI/CD", "AWS", "Docker", "Agile Leadership"
];

export const CVDoc = () => (
    <Document>
        <Page size="LETTER" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>Daniel Oriazowan</Text>
                <Text style={styles.title}>Senior Frontend Engineer & Solutions Architect</Text>
                <View style={styles.contactRow}>
                    <Text>doriazowan@gmail.com</Text>
                    <Text>+234 802 638 1777</Text>
                    <Link src="https://linkedin.com/in/daniel-oriazowan">linkedin.com/in/daniel-oriazowan</Link>
                    <Link src="https://daniel-orz.vercel.app">daniel-orz.vercel.app</Link>
                </View>
            </View>

            {/* Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                    Senior Frontend Engineer with over 10 years of experience building high-performance web applications.
                    Expert in React/Next.js ecosystems, advanced UI engineering, and scalable architecture.
                    Proven track record of leading technical teams, optimizing enterprise systems, and delivering award-winning user experiences.
                </Text>
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                <View style={styles.skillRow}>
                    {skills.map((skill, i) => (
                        <Text key={i} style={{ fontSize: 10, marginRight: 8, marginBottom: 4 }}>• {skill}</Text>
                    ))}
                </View>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {experienceData.map((job, i) => (
                    <View key={i} style={styles.expItem}>
                        <View style={styles.expHeader}>
                            <View>
                                <Text style={styles.rolename}>{job.role}</Text>
                                <Text style={styles.company}>{job.company}</Text>
                            </View>
                            <Text style={styles.period}>{job.period}</Text>
                        </View>
                        {job.summary && <Text style={styles.summary}>{job.summary}</Text>}
                        <View>
                            {job.achievements.map((point, j) => (
                                <View key={j} style={styles.bulletPoint}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{point}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Projects</Text>
                {projectsData.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10 }}>{proj.title}</Text>
                        <Text style={{ fontSize: 9, color: '#64748b' }}>{proj.tech}</Text>
                        <Text style={{ fontSize: 10 }}>{proj.desc}</Text>
                    </View>
                ))}
            </View>

        </Page>
    </Document>
);
