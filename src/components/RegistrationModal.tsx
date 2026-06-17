import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';

type ModalType = 'course' | 'internship';

interface RegistrationModalProps {
  type: ModalType;
  itemName: string;
  onClose: () => void;
}

const courseFields = [
  { id: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
  { id: 'college_name', label: 'College Name', type: 'text', placeholder: 'Your college' },
  { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'year', label: 'Year of Study', type: 'text', placeholder: 'e.g. 2nd Year' },
];

const internshipFields = [
  { id: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
  { id: 'college_name', label: 'College Name', type: 'text', placeholder: 'Your college' },
  { id: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Computer Science' },
  { id: 'year', label: 'Year of Study', type: 'text', placeholder: 'e.g. 2nd Year' },
  { id: 'domain', label: 'Preferred Domain', type: 'text', placeholder: 'e.g. Web Development' },
];

export default function RegistrationModal({ type, itemName, onClose }: RegistrationModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const fields = type === 'course' ? courseFields : internshipFields;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const table = type === 'course' ? 'course_registrations' : 'internship_registrations';
      const payload = {
        ...formData,
        [type === 'course' ? 'course_name' : 'internship_name']: itemName,
        registration_date: new Date().toISOString(),
      };

      const { error: dbError } = await supabase.from(table).insert(payload);
      if (dbError) throw dbError;

      setSuccess(true);
    } catch (err: unknown) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg rounded-2xl border p-6 max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-light-border'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-all ${
            isDark ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-dark-bg/10 text-dark-bg/50 hover:text-dark-bg'
          }`}
        >
          <X size={18} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-400" size={48} />
            </div>
            <h3 className={`text-xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-dark-bg'}`}>
              Registration Successful!
            </h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
              You've registered for <span className="text-brand-purple font-semibold">{itemName}</span>. We'll contact you soon.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-xl text-sm font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple/10 text-brand-purple mb-3">
                {type === 'course' ? 'Course Registration' : 'Internship Registration'}
              </div>
              <h3 className={`text-xl font-display font-bold ${isDark ? 'text-white' : 'text-dark-bg'}`}>{itemName}</h3>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(field => (
                <div key={field.id}>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-white/60' : 'text-dark-bg/60'}`}>
                    {field.label} <span className="text-brand-pink">*</span>
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={e => setFormData(d => ({ ...d, [field.id]: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 ${
                      isDark
                        ? 'bg-dark-bg border-dark-border text-white placeholder-white/30'
                        : 'bg-light-muted border-light-border text-dark-bg placeholder-dark-bg/30'
                    }`}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register Now'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
