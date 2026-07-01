import { useState } from 'react';
import { Mail, Lock, UserPlus, ArrowRight, User, Briefcase, Phone, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    skills: '',
    linkedin: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: false,
    terms: false
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // Max 5
  };

  const strength = calculatePasswordStrength(formData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-500'];

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (strength < 4) {
      setError('Password is not strong enough. Ensure it is at least 12 chars with upper, lower, numbers, and symbols.');
      return;
    }
    if (!formData.captcha) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update profile with additional data (We'd typically send this to our Nest backend)
      // For now, Firebase Auth creation will trigger the backend auto-provision on first token use.

      // Send verification email
      await sendEmailVerification(userCredential.user);
      
      // Redirect handled by AuthContext + ProtectedRoute, it will show PendingApproval
      // We just need to navigate to dashboard to trigger the auth check
      navigate('/dashboard');
    } catch (err: any) {
      setError('Failed to create account: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] -z-10" />

      <div className="relative z-10 w-full max-w-xl p-8 md:p-10 bg-card/80 backdrop-blur-xl border border-border/50 shadow-2xl rounded-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 mb-6 shadow-lg shadow-purple-500/30">
            <UserPlus className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Create an Account</h1>
          <p className="text-muted-foreground">Join the secure enterprise workspace</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= i ? 'bg-purple-600 text-white' : 'bg-secondary text-muted-foreground'}`}>
                {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
              </div>
              {i < 3 && <div className={`w-12 h-1 mx-2 rounded-full transition-colors ${step > i ? 'bg-purple-600' : 'bg-secondary'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input required type="text" name="firstName" value={formData.firstName} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="John" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input required type="text" name="lastName" value={formData.lastName} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="Doe" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input required type="tel" name="phone" value={formData.phone} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Professional Info */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Department</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select required name="department" value={formData.department} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none">
                    <option value="" disabled>Select Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Key Skills</label>
                <input required type="text" name="skills" value={formData.skills} onChange={updateForm} className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="React, Node.js, UI/UX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">LinkedIn Profile</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="https://linkedin.com/in/johndoe" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Security & Credentials */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Company Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input required type="email" name="email" value={formData.email} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="john.doe@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input required type="password" name="password" value={formData.password} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="••••••••••••" minLength={12} />
                </div>
                {/* Password Strength Indicator */}
                {formData.password.length > 0 && (
                  <div className="pt-2">
                    <div className="flex gap-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`flex-1 ${i <= strength ? strengthColors[strength] : 'bg-transparent'}`} />
                      ))}
                    </div>
                    <p className={`text-xs mt-1.5 ${strength < 4 ? 'text-destructive' : 'text-green-500'}`}>
                      {strengthLabels[strength]} - Requires 12+ chars, uppercase, lowercase, number, & symbol.
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={updateForm} className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none" placeholder="••••••••••••" minLength={12} />
                </div>
              </div>
              
              {/* Mock CAPTCHA & Terms */}
              <div className="pt-4 space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl bg-secondary/30 cursor-pointer">
                  <input required type="checkbox" name="captcha" checked={formData.captcha} onChange={updateForm} className="w-5 h-5 rounded border-border text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm font-medium">I am human (reCAPTCHA v3 Mock)</span>
                </label>
                <label className="flex items-start gap-3">
                  <input required type="checkbox" name="terms" checked={formData.terms} onChange={updateForm} className="w-4 h-4 mt-0.5 rounded border-border text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-muted-foreground">I agree to the <a href="#" className="text-purple-500 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-500 hover:underline">Privacy Policy</a>.</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button type="button" onClick={handlePrev} className="px-6 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-secondary transition-colors">
                Back
              </button>
            )}
            <button 
              disabled={loading}
              type="submit" 
              className="group relative flex-1 flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-foreground hover:bg-foreground/90 transition-all disabled:opacity-50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {step === 3 ? 'Create Account' : 'Continue'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
