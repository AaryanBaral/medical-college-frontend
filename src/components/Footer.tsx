import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6" />
              <h3 className="font-heading text-lg font-semibold">Medical College</h3>
            </div>
            <p className="text-sm text-footer-foreground/80">
              Excellence in medical education, research, and healthcare since 1950.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/admissions" className="hover:text-accent transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-accent transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-accent transition-colors">
                  Faculty
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-accent transition-colors">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/library" className="hover:text-accent transition-colors">
                  Digital Library
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-accent transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-accent transition-colors">
                  Notices
                </Link>
              </li>
              <li>
                <Link to="/grievances" className="hover:text-accent transition-colors">
                  Grievances
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-footer-foreground/80">
                  123 Medical Campus<br />
                  City, State 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@medcollege.edu" className="hover:text-accent transition-colors">
                  info@medcollege.edu
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-footer-foreground/20">
              <p className="text-xs font-semibold text-destructive">
                Emergency Helpline: +1 (234) 567-999
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-footer-foreground/20 pt-8 text-center text-sm text-footer-foreground/80">
          <p>&copy; {new Date().getFullYear()} Medical College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
