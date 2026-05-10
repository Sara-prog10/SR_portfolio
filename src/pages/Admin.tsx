import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { db, loginWithEmail, logOut, resetPassword } from '../lib/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, LogOut, Check, Trash2, Mail, LayoutTemplate } from 'lucide-react';
import { SKILLS, PROJECTS, EXPERIENCE } from '../lib/constants';
import { HighlightsEditor } from '../components/admin/HighlightsEditor';
import { SkillsEditor } from '../components/admin/SkillsEditor';
import { ProjectsEditor } from '../components/admin/ProjectsEditor';
import { ExperienceEditor } from '../components/admin/ExperienceEditor';

export function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { content, updateContent, loading: contentLoading } = useContent();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'content' | 'messages'>('content');
  const [messages, setMessages] = useState<any[]>([]);

  const [editState, setEditState] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'success' | 'error'>>({});
  const [saveErrors, setSaveErrors] = useState<Record<string, string>>({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  useEffect(() => {
    if (user && isAdmin) {
      const messagesRef = ref(db, 'messages');
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const msgs: any[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(child => {
            msgs.push({ id: child.key, ...child.val() });
          });
        }
        // sort descending
        msgs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setMessages(msgs);
      });
      return () => unsubscribe();
    }
  }, [user, isAdmin]);

  const handleDeleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await remove(ref(db, `messages/${id}`));
      } catch (e) {
        console.error("Failed to delete message", e);
      }
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await loginWithEmail(email, password);
    } catch (err: any) {
      setLoginError('Invalid email or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setLoginError('');
    if (!email) {
      setLoginError('Please enter your email to reset password.');
      return;
    }
    setIsLoggingIn(true);
    try {
      await resetPassword(email);
      setResetMessage('Password reset email sent. Please check your inbox.');
      setIsResetting(false);
    } catch (err: any) {
      setLoginError(err.message || 'Failed to send reset email.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const sections = [
    { id: 'hero_title', label: 'Hero Title', default: 'Ravichandran' },
    { id: 'hero_subtitle', label: 'Hero Subtitle', default: 'Saravanan' },
    { id: 'hero_description', label: 'Hero Description', default: 'Building intelligent systems with data, AI, and automation. I specialize in developing RAG systems, data-driven dashboards, and seamless IoT combinations.' },
    { id: 'about_text', label: 'About Text', default: "I am a Data Analyst and AI Engineer with a deep passion for building intelligent, data-driven solutions. My expertise lies at the intersection of Generative AI, interactive analytics, and process automation.\n\nWhether it's architecting a complex RAG system for knowledge retrieval, deploying automated n8n workflows, or integrating edge IoT devices with AI models, I focus on delivering scalable, real-time solutions that drive tangible business value." },
    { id: 'about_highlights', label: 'About Highlights', default: JSON.stringify([
      { icon: "Bot", title: "Generative AI", desc: "LLMs, RAG Systems, Advanced Prompting" },
      { icon: "Database", title: "Data Analytics", desc: "Power BI, SQL, Real-time Visualizations" },
      { icon: "Workflow", title: "Automation", desc: "n8n Workflows, Data Pipelines" },
      { icon: "Cpu", title: "IoT + AI", desc: "Edge AI, Sensor Integration, Embedded Systems" },
    ], null, 2)},
    { id: 'skills_list', label: 'Technical Arsenal', default: JSON.stringify(SKILLS, null, 2) },
    { id: 'projects_list', label: 'Featured Projects', default: JSON.stringify(PROJECTS, null, 2) },
    { id: 'experience_list', label: 'Experience Timeline', default: JSON.stringify(EXPERIENCE, null, 2) }
  ];

  useEffect(() => {
    if (!contentLoading) {
      setEditState(prev => {
        const newState = { ...prev };
        sections.forEach(sec => {
          if (newState[sec.id] === undefined) {
            let val = content[sec.id] ?? sec.default;
            if (sec.id.includes('_list') || sec.id.includes('_highlights')) {
               try {
                 val = JSON.stringify(JSON.parse(val), null, 2);
               } catch(e) {}
            }
            newState[sec.id] = val;
          }
        });
        return newState;
      });
    }
  }, [contentLoading, content]);

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mb-4" />
        <p className="text-gray-400">Loading admin panel...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-dark-900 border border-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 mb-8">{isResetting ? "Reset your password." : "Sign in with your email and password."}</p>
          
          <form onSubmit={isResetting ? handleResetPassword : handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-dark-950 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
            />
            {!isResetting && (
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-950 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:outline-none transition-colors"
              />
            )}
            {loginError && <p className="text-red-400 text-sm text-left">{loginError}</p>}
            {resetMessage && <p className="text-green-400 text-sm text-left">{resetMessage}</p>}
            
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 mt-2 bg-primary-500 text-dark-950 hover:bg-primary-400 disabled:bg-primary-500/50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLoggingIn ? 'Processing...' : isResetting ? 'Send Reset Email' : 'Sign in'}
            </button>
          </form>

          <div className="flex flex-col gap-4 mt-6">
            <button 
              onClick={() => {
                setIsResetting(!isResetting);
                setLoginError('');
                setResetMessage('');
              }}
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              {isResetting ? "Back to Login" : "Forgot Password?"}
            </button>

            <button 
              onClick={() => navigate('/')} 
              className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft size={16} /> Back to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-dark-900 border border-red-900/50 p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-4">
            Your account ({user.email}) does not have admin permissions.
          </p>
          <p className="text-gray-500 text-sm mb-8 text-left p-4 bg-dark-950 rounded-lg border border-gray-800">
            <strong>Note:</strong> Since you manually created this user, make sure you also added a document in the <code className="text-primary-400">admins</code> collection in Firestore exactly matching your UID: 
            <br/><br/>
            UID: <code className="text-white select-all">{user.uid}</code>
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={logOut}
              className="py-3 bg-dark-800 text-white hover:bg-dark-700 rounded-lg font-medium transition-colors"
            >
              Sign out
            </button>
            <button
              onClick={() => navigate('/')}
              className="py-3 bg-transparent text-gray-400 hover:text-white rounded-lg font-medium transition-colors"
            >
              Return to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (id: string, value: string) => {
    setEditState(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async (id: string) => {
    const newVal = editState[id];
    if (newVal === undefined) return;
    
    setSaving(id);
    setSaveStatus(prev => ({ ...prev, [id]: 'saving' }));
    setSaveErrors(prev => ({ ...prev, [id]: '' }));
    try {
      await updateContent(id, newVal);
      setSaveStatus(prev => ({ ...prev, [id]: 'success' }));
    } catch (err: any) {
      console.error(err);
      setSaveStatus(prev => ({ ...prev, [id]: 'error' }));
      let errMsg = err.message || 'Failed to save';
      try {
        const parsed = JSON.parse(errMsg);
        if (parsed.error) errMsg = parsed.error;
      } catch (e) {}
      setSaveErrors(prev => ({ ...prev, [id]: errMsg }));
    } finally {
      setTimeout(() => {
        setSaving(null);
        setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              View Site
            </button>
            <button
              onClick={logOut}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </header>

        <div className="flex justify-between items-center mb-8 border-b border-gray-800">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-4 px-2 font-medium flex items-center gap-2 transition-colors border-b-2 ${
                activeTab === 'content' ? 'border-primary-500 text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <LayoutTemplate size={18} /> Content Manager
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 px-2 font-medium flex items-center gap-2 transition-colors border-b-2 ${
                activeTab === 'messages' ? 'border-primary-500 text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Mail size={18} /> Messages
              {messages.length > 0 && (
                <span className="bg-primary-500 text-dark-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>
          </div>
          
          {activeTab === 'content' && (
            <button
              onClick={async () => {
                let anyFailed = false;
                for (const sec of sections) {
                  setSaving(sec.id);
                  setSaveStatus(prev => ({ ...prev, [sec.id]: 'saving' }));
                  try {
                    await updateContent(sec.id, editState[sec.id] ?? content[sec.id] ?? sec.default);
                    setSaveStatus(prev => ({ ...prev, [sec.id]: 'success' }));
                  } catch (err: any) {
                    console.error(err);
                    setSaveStatus(prev => ({ ...prev, [sec.id]: 'error' }));
                    let errMsg = err.message || 'Failed to save';
                    try {
                      const parsed = JSON.parse(errMsg);
                      if (parsed.error) errMsg = parsed.error;
                    } catch (e) {}
                    setSaveErrors(prev => ({ ...prev, [sec.id]: errMsg }));
                    anyFailed = true;
                  } finally {
                    setSaving(null);
                    setTimeout(() => {
                      setSaveStatus(prev => ({ ...prev, [sec.id]: 'idle' }));
                    }, 3000);
                  }
                }
                if (!anyFailed) {
                  alert("All content successfully saved to Realtime Database!");
                } else {
                  alert("Some content failed to save. Check the error messages.");
                }
              }}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-200 text-sm font-medium rounded-lg transition-colors border border-gray-700 mb-4"
            >
              Push All to Realtime DB
            </button>
          )}
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-8">
            {sections.map(section => {
              const currentValue = editState[section.id] ?? content[section.id] ?? section.default;
              const isChanged = editState[section.id] !== undefined && editState[section.id] !== (content[section.id] ?? section.default);
              const isSaving = saving === section.id;

              return (
                <div key={section.id} className="bg-dark-900 border border-gray-800 rounded-xl p-6">
                  <label className="block text-sm font-medium text-gray-400 mb-4">
                    {section.label}
                  </label>
                  
                  {section.id === 'about_highlights' ? (
                    <HighlightsEditor
                      value={currentValue}
                      onChange={(val) => handleEdit(section.id, val)}
                    />
                  ) : section.id === 'skills_list' ? (
                    <SkillsEditor
                      value={currentValue}
                      onChange={(val) => handleEdit(section.id, val)}
                    />
                  ) : section.id === 'projects_list' ? (
                    <ProjectsEditor
                      value={currentValue}
                      onChange={(val) => handleEdit(section.id, val)}
                    />
                  ) : section.id === 'experience_list' ? (
                    <ExperienceEditor
                      value={currentValue}
                      onChange={(val) => handleEdit(section.id, val)}
                    />
                  ) : (
                    <textarea
                      value={currentValue}
                      onChange={(e) => handleEdit(section.id, e.target.value)}
                      className="w-full bg-dark-950 border border-gray-700 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-primary-500 resize-y font-mono text-sm leading-relaxed min-h-[100px]"
                      spellCheck={false}
                    />
                  )}

                  <div className="mt-6 flex flex-col items-end gap-2">
                    {saveStatus[section.id] === 'success' && (
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <Check size={16} /> Saved to Firestore!
                      </span>
                    )}
                    {saveStatus[section.id] === 'error' && (
                      <span className="text-red-400 text-sm max-w-md text-right">
                        Error: {saveErrors[section.id]}
                      </span>
                    )}
                    <button
                      onClick={() => handleSave(section.id)}
                      disabled={!isChanged || isSaving}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        isChanged
                          ? 'bg-primary-500 text-dark-950 hover:bg-primary-400'
                          : 'bg-dark-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-dark-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
                <Mail className="mx-auto mb-4 opacity-50" size={48} />
                <p>No messages yet.</p>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="bg-dark-900 border border-gray-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6 relative group">
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-400 hover:bg-dark-950 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Message"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-800 pb-4 sm:pb-0 sm:pr-6">
                    <h3 className="font-medium text-white mb-1">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-primary-400 hover:underline mb-2 block truncate">
                      {msg.email}
                    </a>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="sm:w-2/3">
                    <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
