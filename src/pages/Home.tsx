import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  FlaskConical, 
  GraduationCap, 
  FileText, 
  Library,
  ArrowRight
} from 'lucide-react';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { AlertBanner } from '@/components/AlertBanner';
import { apiGet } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Notice {
  id: string;
  title: string;
  content: string;
  audience: string;
}

export default function Home() {
  const [emergencyNotice, setEmergencyNotice] = useState<Notice | null>(null);
  const [servicesVisible, setServicesVisible] = useState(false);

  useEffect(() => {
    async function loadNotices() {
      try {
        const response = await apiGet<Notice[]>('/notices/public/feed');
        const emergency = response.data?.find(n => 
          n.title.toLowerCase().includes('emergency') || 
          n.content.toLowerCase().includes('emergency')
        );
        if (emergency) {
          setEmergencyNotice(emergency);
        }
      } catch (error) {
        // Silently fail if API is not available
      }
    }
    loadNotices();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setServicesVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => setServicesVisible(true), 100);
    return () => window.clearTimeout(timeout);
  }, []);

  const services = [
    {
      icon: GraduationCap,
      title: 'Admissions',
      description: 'Apply for undergraduate and postgraduate medical programs',
      link: '/admissions',
      color: 'text-primary',
    },
    {
      icon: BookOpen,
      title: 'Programs',
      description: 'Explore our comprehensive medical education programs',
      link: '/programs',
      color: 'text-secondary',
    },
    {
      icon: FlaskConical,
      title: 'Research',
      description: 'Discover cutting-edge medical research and publications',
      link: '/research',
      color: 'text-accent',
    },
    {
      icon: Users,
      title: 'Student Portal',
      description: 'Access grades, timetables, and course materials',
      link: '/portal',
      color: 'text-primary',
    },
    {
      icon: Library,
      title: 'Digital Library',
      description: 'Browse our extensive collection of medical resources',
      link: '/library',
      color: 'text-secondary',
    },
    {
      icon: FileText,
      title: 'Notices',
      description: 'Stay updated with latest announcements and results',
      link: '/notices',
      color: 'text-accent',
    },
  ];

  return (
    <div className="min-h-screen">
      {emergencyNotice && (
        <AlertBanner 
          message={emergencyNotice.title} 
          type="emergency"
        />
      )}

      {/* Hero Section */}
      <Section>
        <div className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
            Welcome to Medical College
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Excellence in medical education, research, and healthcare. 
            Shaping the future of medicine since 1950.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/admissions">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/programs">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Services Grid */}
      <Section alternate>
        <h2 className="text-3xl font-heading font-bold text-center mb-12 text-foreground">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} to={service.link} className="block">
              <div
                style={{ transitionDelay: `${index * 100}ms` }}
                className={cn(
                  'h-full transition-all duration-500 ease-out',
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <Card className="h-full hover:border-primary">
                  <service.icon className={`h-12 w-12 mb-4 ${service.color}`} />
                  <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Quick Stats */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-heading font-bold text-primary mb-2">70+</div>
            <div className="text-muted-foreground">Years of Excellence</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-secondary mb-2">2000+</div>
            <div className="text-muted-foreground">Students Enrolled</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-accent mb-2">150+</div>
            <div className="text-muted-foreground">Expert Faculty</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Placement Rate</div>
          </div>
        </div>
      </Section>
    </div>
  );
}
