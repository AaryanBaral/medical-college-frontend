import { useEffect, useState } from 'react';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Input } from '@/components/ui/input';
import { apiGet } from '@/lib/api';
import { Search, Award, BookOpen } from 'lucide-react';

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department?: string;
  qualifications?: string;
  publications_count?: number;
  email?: string;
}

export default function Faculty() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadFaculty() {
      try {
        const response = await apiGet<FacultyMember[]>('/faculty', {
          q: searchQuery || undefined,
        });
        setFaculty(response.data || []);
      } catch (error) {
        // Mock data for demo
        setFaculty([
          {
            id: '1',
            name: 'Dr. Sarah Johnson',
            designation: 'Professor & Head',
            department: 'General Medicine',
            qualifications: 'MBBS, MD, FRCP',
            publications_count: 45,
            email: 'sarah.johnson@medcollege.edu',
          },
          {
            id: '2',
            name: 'Dr. Michael Chen',
            designation: 'Associate Professor',
            department: 'Surgery',
            qualifications: 'MBBS, MS, FICS',
            publications_count: 32,
            email: 'michael.chen@medcollege.edu',
          },
          {
            id: '3',
            name: 'Dr. Priya Sharma',
            designation: 'Assistant Professor',
            department: 'Pediatrics',
            qualifications: 'MBBS, MD (Pediatrics)',
            publications_count: 18,
            email: 'priya.sharma@medcollege.edu',
          },
        ]);
      }
    }
    const timer = setTimeout(loadFaculty, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      <Section>
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground">
            Our Faculty
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our distinguished faculty members who are leaders in medical education and research.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search faculty by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Section>

      <Section alternate>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <Card key={member.id}>
              <div className="mb-4">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium">{member.designation}</p>
                {member.department && (
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                )}
              </div>

              {member.qualifications && (
                <div className="flex items-start gap-2 mb-3">
                  <Award className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{member.qualifications}</p>
                </div>
              )}

              {member.publications_count !== undefined && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    {member.publications_count} Publications
                  </p>
                </div>
              )}

              {member.email && (
                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {member.email}
                  </a>
                </div>
              )}
            </Card>
          ))}
        </div>

        {faculty.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery
                ? 'No faculty members found matching your search.'
                : 'Loading faculty information...'}
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
