import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { 
  Calendar, 
  ClipboardCheck, 
  GraduationCap, 
  FileText, 
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentPortal() {
  const portalSections = [
    {
      icon: Calendar,
      title: 'Timetable',
      description: 'View your class schedule and upcoming lectures',
      link: '/portal/timetable',
      color: 'text-primary',
    },
    {
      icon: ClipboardCheck,
      title: 'Attendance',
      description: 'Check your attendance records and percentage',
      link: '/portal/attendance',
      color: 'text-secondary',
    },
    {
      icon: GraduationCap,
      title: 'Grades',
      description: 'Access your exam results and academic performance',
      link: '/portal/grades',
      color: 'text-accent',
    },
    {
      icon: FileText,
      title: 'Assignments',
      description: 'Submit assignments and track due dates',
      link: '/portal/assignments',
      color: 'text-primary',
    },
    {
      icon: BookOpen,
      title: 'Course Materials',
      description: 'Download lecture notes and study resources',
      link: '/portal/materials',
      color: 'text-secondary',
    },
  ];

  return (
    <div className="min-h-screen">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground">
            Student Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all your academic information and resources in one place.
          </p>
        </div>
      </Section>

      {/* Quick Stats */}
      <Section alternate>
        <h2 className="text-2xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Quick Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-secondary mb-2">87%</div>
              <div className="text-muted-foreground">Overall Attendance</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-accent mb-2">8.5</div>
              <div className="text-muted-foreground">Current CGPA</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Pending Assignments</div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Portal Sections */}
      <Section>
        <h2 className="text-2xl font-heading font-semibold mb-6 text-foreground">
          Portal Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portalSections.map((section) => (
            <Link key={section.title} to={section.link}>
              <Card className="h-full hover:border-primary">
                <section.icon className={`h-12 w-12 mb-4 ${section.color}`} />
                <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                  {section.title}
                </h3>
                <p className="text-muted-foreground">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
