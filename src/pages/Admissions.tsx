import { useEffect, useState } from 'react';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { apiGet } from '@/lib/api';
import { GraduationCap, Calendar, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AdmissionCycle {
  id: string;
  name: string;
  year: number;
  start_date: string;
  end_date: string;
  is_open: boolean;
}

interface Program {
  id: string;
  name: string;
  level: string;
  duration: string;
  description?: string;
}

export default function Admissions() {
  const [cycles, setCycles] = useState<AdmissionCycle[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const [cyclesRes, programsRes] = await Promise.all([
          apiGet<AdmissionCycle[]>('/admissions/cycles', { is_open: true }),
          apiGet<Program[]>('/programs'),
        ]);
        setCycles(cyclesRes.data || []);
        setPrograms(programsRes.data || []);
      } catch (error) {
        // Mock data for demo
        setCycles([
          {
            id: '1',
            name: 'Spring 2025 Admission',
            year: 2025,
            start_date: '2025-01-01',
            end_date: '2025-03-31',
            is_open: true,
          },
        ]);
        setPrograms([
          {
            id: '1',
            name: 'MBBS',
            level: 'Undergraduate',
            duration: '5 years',
            description: 'Bachelor of Medicine, Bachelor of Surgery',
          },
          {
            id: '2',
            name: 'MD (General Medicine)',
            level: 'Postgraduate',
            duration: '3 years',
            description: 'Master of Medicine in General Medicine',
          },
        ]);
      }
    }
    loadData();
  }, []);

  const handleApply = () => {
    if (!user) {
      toast.error('Please login to apply');
      return;
    }
    toast.info('Application form will open here');
  };

  return (
    <div className="min-h-screen">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground">
            Admissions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our prestigious institution and embark on your journey to excellence in medical education.
          </p>
        </div>
      </Section>

      {/* Open Cycles */}
      <Section alternate>
        <h2 className="text-2xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Open Admission Cycles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cycles.map((cycle) => (
            <Card key={cycle.id}>
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground">
                {cycle.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Application Period: {new Date(cycle.start_date).toLocaleDateString()} - {new Date(cycle.end_date).toLocaleDateString()}
              </p>
              <Button onClick={handleApply} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Apply Now
              </Button>
            </Card>
          ))}
          {cycles.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-8">
              No open admission cycles at the moment. Please check back later.
            </p>
          )}
        </div>
      </Section>

      {/* Available Programs */}
      <Section>
        <h2 className="text-2xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-secondary" />
          Available Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {program.name}
                </h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {program.level}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Duration: {program.duration}
              </p>
              {program.description && (
                <p className="text-sm text-muted-foreground">
                  {program.description}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Admission Process */}
      <Section alternate>
        <h2 className="text-2xl font-heading font-semibold mb-6 text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-accent" />
          Admission Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: 1, title: 'Apply Online', desc: 'Submit your application through our portal' },
            { step: 2, title: 'Document Verification', desc: 'Upload and verify required documents' },
            { step: 3, title: 'Entrance Test', desc: 'Appear for entrance examination' },
            { step: 4, title: 'Interview', desc: 'Attend personal interview' },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-heading font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
