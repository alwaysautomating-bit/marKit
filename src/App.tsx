import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Download, Podcast, Lightbulb, Menu, Plus, FileText, Trash2, Image as ImageIcon, X, Sliders, Terminal, Activity, CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import { Project, Note, MarketType, TacticalAssetTarget } from './types';

const generateId = () => Math.random().toString(36).substring(2, 9);
const assetTargetLabels: Record<TacticalAssetTarget, string> = {
  socialMediaBio: 'Social Media Bio',
  pressRelease: 'Press Release',
};
const projectsStorageKey = 'markitable-projects';
const activeProjectStorageKey = 'markitable-active-project';

function readProjectsFromStorage(): Project[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(projectsStorageKey);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed as Project[] : [];
  } catch (error) {
    console.error('Failed to read local projects:', error);
    return [];
  }
}

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      let message = "Something went wrong.";
      try {
        const errInfo = JSON.parse(this.state.error.message);
        if (errInfo.error.includes("insufficient permissions")) {
          message = "You don't have permission to perform this action. Please check your account or contact support.";
        }
      } catch (e) {
        // Not a JSON error
      }
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-12 text-center">
          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-serif font-black uppercase tracking-tighter">System Error</h2>
            <p className="text-lg font-serif italic text-ink/60">{message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-ink text-paper px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const storedProjects = readProjectsFromStorage()
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const storedActiveProjectId = window.localStorage.getItem(activeProjectStorageKey);

    setProjects(storedProjects);
    setActiveProjectId(
      storedActiveProjectId && storedProjects.some((project) => project.id === storedActiveProjectId)
        ? storedActiveProjectId
        : null
    );
    setIsAppReady(true);
  }, []);

  useEffect(() => {
    if (!isAppReady) return;

    window.localStorage.setItem(projectsStorageKey, JSON.stringify(projects));
  }, [projects, isAppReady]);

  useEffect(() => {
    if (!isAppReady) return;

    if (activeProjectId) {
      window.localStorage.setItem(activeProjectStorageKey, activeProjectId);
    } else {
      window.localStorage.removeItem(activeProjectStorageKey);
    }
  }, [activeProjectId, isAppReady]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const createProject = (name: string) => {
    const projectId = generateId();
    const newProject: Project = {
      id: projectId,
      name,
      marketType: 'niche',
      notes: [],
      kit: null,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setProjects((currentProjects) => [newProject, ...currentProjects]);
    setActiveProjectId(projectId);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((currentProjects) =>
      currentProjects
        .map((project) => project.id === id ? { ...project, ...updates, updatedAt: Date.now() } : project)
        .sort((a, b) => b.updatedAt - a.updatedAt)
    );
  };

  const deleteProject = (id: string) => {
    setProjects((currentProjects) => currentProjects.filter((project) => project.id !== id));
    if (activeProjectId === id) setActiveProjectId(null);
  };

  if (!isAppReady) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <div className="w-12 h-12 border-t-2 border-r-2 border-accent rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-paper overflow-x-hidden flex flex-col">
        {/* Nav */}
        <nav className="fixed top-0 left-0 w-full h-16 border-b border-ink/10 bg-paper/90 backdrop-blur-md z-50 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:text-accent transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-serif font-black text-xl md:text-2xl tracking-tighter uppercase cursor-pointer" onClick={() => setActiveProjectId(null)}>markitABLE</span>
            <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-ink/40">
              <span className="text-ink">The Archives</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-ink/40">
              Local Browser Mode
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Vol. 1</span>
          </div>
        </nav>

        <div className="flex flex-1 pt-16 h-[100vh] w-full relative">
          {/* Sidebar Overlay for Mobile */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden fixed inset-0 bg-ink/20 backdrop-blur-sm z-30 pt-16"
              />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside 
                initial={{ width: 0, x: -320, opacity: 0 }}
                animate={{ width: window.innerWidth < 768 ? 280 : 320, x: 0, opacity: 1 }}
                exit={{ width: 0, x: -320, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed md:relative z-40 md:z-auto top-16 md:top-0 left-0 border-r border-ink/10 bg-paper md:bg-white/50 flex flex-col h-[calc(100vh-4rem)] overflow-hidden shrink-0"
              >
                <>
                  <div className="p-6 border-b border-ink/10">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-ink/40">New Project</h2>
                    <p className="text-[11px] font-serif italic text-ink/40 mb-4">
                      Stored locally in this browser.
                    </p>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const input = form.elements.namedItem('projectName') as HTMLInputElement;
                      if (input.value.trim()) {
                        createProject(input.value.trim());
                        input.value = '';
                      }
                    }}>
                      <div className="flex gap-2">
                        <input 
                          name="projectName"
                          placeholder="Project Name..." 
                          className="flex-1 bg-transparent border-b border-ink/20 py-2 text-sm font-serif focus:outline-none focus:border-accent transition-colors"
                        />
                        <button type="submit" className="p-2 text-ink/40 hover:text-accent transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {projects.map(p => (
                      <div 
                        key={p.id}
                        onClick={() => {
                          setActiveProjectId(p.id);
                          if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        className={cn(
                          "group flex items-center justify-between p-4 cursor-pointer transition-all border-l-2",
                          activeProjectId === p.id ? "border-accent bg-ink/5" : "border-transparent hover:bg-ink/5"
                        )}
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className={cn("w-4 h-4 shrink-0", activeProjectId === p.id ? "text-accent" : "text-ink/30")} />
                          <span className="font-serif italic truncate text-sm">{p.name}</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
                          className="opacity-0 group-hover:opacity-100 text-ink/20 hover:text-accent transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {projects.length === 0 && (
                      <div className="p-8 text-center text-ink/30 text-xs font-serif italic">
                        No projects yet. Start by creating one above.
                      </div>
                    )}
                  </div>
                </>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-paper relative h-[calc(100vh-4rem)] w-full w-max-[100vw]">
            {!activeProject ? (
              <div className="h-full flex items-center justify-center p-12">
                <HeroSection />
              </div>
            ) : (
              <ProjectView project={activeProject} updateProject={updateProject} />
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function HeroSection() {
  return (
    <section className="relative py-12 md:py-20 px-6 md:px-12 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">The Systems Issue</span>
            <h1 className="massive-title">
              markit<br/>ABLE<span className="text-accent">.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-serif italic max-w-md text-ink/90"
            >
              "Your best ideas are rotting in your notes app."
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>('input[name="projectName"]');
                input?.focus();
              }}
              className="bg-ink text-paper px-12 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all"
            >
              Start A Local Archive
            </motion.button>
            <p className="max-w-xl text-sm leading-relaxed text-ink/55">
              Everything in this workspace now saves to your browser instead of Firebase. No login required.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectView({ project, updateProject }: { project: Project, updateProject: (id: string, updates: Partial<Project>) => void }) {
  const [newNote, setNewNote] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [messagingTarget, setMessagingTarget] = useState('all');
  const [assetTarget, setAssetTarget] = useState<TacticalAssetTarget>('socialMediaBio');
  const [showPodcastConfig, setShowPodcastConfig] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  
  const [viewMode, setViewMode] = useState<'editorial' | 'spatial'>('editorial');
  const [logs, setLogs] = useState<string[]>(() => [
    `[${new Date().toLocaleTimeString()}] MON_ENG: markitABLE spatial engine online.`,
    `[${new Date().toLocaleTimeString()}] ARCHIVE: Local browser vault mounted successfully.`,
    `[${new Date().toLocaleTimeString()}] SYNAPSE: Active models resolved (gemini-3.5-flash). Ready for synthesis...`
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`]);
  };

  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasGeneratedKitContent = Boolean(
    project.kit && (
      project.kit.headline ||
      project.kit.subheadline ||
      project.kit.valueProposition ||
      project.kit.marketingPlan?.length ||
      project.kit.suggestions?.length ||
      (project.kit.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0) ||
      (project.kit.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0) ||
      project.kit.podcastMatches?.length
    )
  );
  const showEditorialResultsColumn = Boolean(loadingSection || hasGeneratedKitContent);

  useEffect(() => {
    if (project.notes.length === 0) {
      setActiveNoteId(null);
      return;
    }

    if (activeNoteId && !project.notes.some((note) => note.id === activeNoteId)) {
      setActiveNoteId(null);
    }
  }, [project.notes, activeNoteId]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() && !selectedImage) return;
    
    setIsUploading(true);
    let imageUrl = '';

    try {
      if (selectedImage) {
        addLog(`IMAGE_SAVE: Encoding asset '${selectedImage.name}' into local browser storage...`);
        imageUrl = imagePreview || await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
          reader.onerror = () => reject(reader.error || new Error('Failed to read image file.'));
          reader.readAsDataURL(selectedImage);
        });
        addLog(`IMAGE_SAVE: Embedded asset into local archive successfully.`);
      }

      const note: Note = {
        id: generateId(),
        content: newNote.trim(),
        createdAt: Date.now()
      };
      if (imageUrl) note.imageUrl = imageUrl;
      
      updateProject(project.id, { notes: [note, ...project.notes] });
      setActiveNoteId(null);
      addLog(`INFLOW: Dumped manuscript entry (ID: ${note.id.substring(0,6)}). Processing relational schema...`);
      setNewNote('');
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Upload Error:", error);
      addLog(`ERROR: Inflow ingestion crashed: ${error}`);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    updateProject(project.id, { notes: project.notes.filter(n => n.id !== noteId) });
    addLog(`DELETION: Purged entry note-${noteId} from vector database projection.`);
  };

  const handleGenerateStrategy = async () => {
    if (project.notes.length === 0) return;
    setLoadingSection('strategy');
    addLog(`RPC_CALL: Dispatching 'generateMarketStrategy' query to 'gemini-3.5-flash'...`);
    addLog(`RPC_PAYLOAD: Transmitting ${project.notes.length} notes context, style: ${project.marketType}.`);
    try {
      const response = await fetch('/api/market-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: project.notes, marketType: project.marketType }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }
      const strategy = await response.json();
      updateProject(project.id, { kit: { ...project.kit, ...strategy } });
      addLog(`RPC_RESPONSE: Successfully received marketing blueprint. Compiled into dossier model.`);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error: any) {
      console.error(error);
      addLog(`RPC_ERROR: Failure in market-strategy stream: ${error.message || error}`);
      alert(`Failed to generate market strategy: ${error.message || error}`);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleGenerateMessaging = async () => {
    if (project.notes.length === 0) return;
    setLoadingSection('messaging');
    addLog(`RPC_CALL: Dispatching 'generateCoreMessaging' to synthesis core...`);
    addLog(`RPC_PAYLOAD: target scope: '${messagingTarget}' on ${project.notes.length} raw sources.`);
    try {
      const response = await fetch('/api/core-messaging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: project.notes, target: messagingTarget }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }
      const messaging = await response.json();
      updateProject(project.id, { 
        kit: { 
          ...project.kit, 
          coreMessaging: messaging
        } 
      });
      addLog(`RPC_RESPONSE: Core messaging compiling successful. Synchronized target: '${messagingTarget}'.`);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error: any) {
      console.error(error);
      addLog(`RPC_ERROR: Core messaging failed: ${error.message || error}`);
      alert(`Failed to generate core messaging: ${error.message || error}`);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleGenerateAssets = async () => {
    if (project.notes.length === 0) return;
    setLoadingSection('assets');
    addLog(`RPC_CALL: Dispatching 'generateTacticalAssets' for '${assetTargetLabels[assetTarget]}'...`);
    try {
      const response = await fetch('/api/tactical-assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: project.notes, target: assetTarget }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }
      const assets = await response.json();
      updateProject(project.id, { 
        kit: { 
          ...project.kit, 
          tacticalAssets: {
            ...project.kit?.tacticalAssets,
            ...assets
          }
        } 
      });
      addLog(`RPC_RESPONSE: ${assetTargetLabels[assetTarget]} generated and merged into tactical assets.`);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error: any) {
      console.error(error);
      addLog(`RPC_ERROR: Asset compiler failed: ${error.message || error}`);
      alert(`Failed to generate tactical assets: ${error.message || error}`);
    } finally {
      setLoadingSection(null);
    }
  };

  const handleGeneratePodcasts = async () => {
    if (project.notes.length === 0) return;
    setLoadingSection('podcasts');
    addLog(`RPC_CALL: Launching podcast matching engine...`);
    addLog(`RPC_PAYLOAD: Custom filters - desc: ${project.podcastProductDesc ? 'YES' : 'NONE'}, audience: ${project.podcastAudience ? 'YES' : 'NONE'}`);
    try {
      const response = await fetch('/api/podcast-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: project.notes,
          customProductDesc: project.podcastProductDesc,
          customAudience: project.podcastAudience,
          customValueAngle: project.podcastValueAngle,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }
      const podcasts = await response.json();
      updateProject(project.id, { 
        kit: { 
          ...project.kit, 
          podcastMatches: podcasts.podcastMatches
        } 
      });
      addLog(`RPC_RESPONSE: Podcast matchmaking run succeeded. Generated ${podcasts.podcastMatches?.length || 0} tailored outreach pitches.`);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error: any) {
      console.error(error);
      addLog(`RPC_ERROR: Podcast matcher crashed: ${error.message || error}`);
      alert(`Failed to generate podcast outreach: ${error.message || error}`);
    } finally {
      setLoadingSection(null);
    }
  };

  const exportToCSV = () => {
    if (!project.kit) return;
    const { kit } = project;
    
    const rows = [
      ['Category', 'Content'],
    ];

    if (kit.headline) rows.push(['Headline', kit.headline]);
    if (kit.subheadline) rows.push(['Subheadline', kit.subheadline]);
    if (kit.valueProposition) rows.push(['Value Proposition', kit.valueProposition]);
    
    if (kit.coreMessaging) {
      if (kit.coreMessaging.positioningStatement) rows.push(['Positioning Statement', kit.coreMessaging.positioningStatement]);
      if (kit.coreMessaging.oneLiner) rows.push(['One-Liner', kit.coreMessaging.oneLiner]);
      if (kit.coreMessaging.elevatorPitch) {
        if (kit.coreMessaging.elevatorPitch.thirtySecond) rows.push(['Elevator Pitch (30s)', kit.coreMessaging.elevatorPitch.thirtySecond]);
        if (kit.coreMessaging.elevatorPitch.oneMinute) rows.push(['Elevator Pitch (1m)', kit.coreMessaging.elevatorPitch.oneMinute]);
        if (kit.coreMessaging.elevatorPitch.twoMinute) rows.push(['Elevator Pitch (2m)', kit.coreMessaging.elevatorPitch.twoMinute]);
      }
      if (kit.coreMessaging.taglineOptions) {
        kit.coreMessaging.taglineOptions.forEach((tagline, i) => {
          rows.push([`Tagline Option ${i + 1}`, tagline]);
        });
      }
    }

    if (kit.tacticalAssets) {
      if (kit.tacticalAssets.socialMediaBio) rows.push(['Social Media Bio', kit.tacticalAssets.socialMediaBio]);
      if (kit.tacticalAssets.pressRelease) rows.push(['Press Release', kit.tacticalAssets.pressRelease]);
    }

    if (kit.big3) {
      rows.push(['Big 3 - Feature 1', kit.big3.feature1.title]);
      rows.push(['Big 3 - Feature 1 Desc', kit.big3.feature1.description]);
      rows.push(['Big 3 - Feature 1 Why', kit.big3.feature1.why]);
      rows.push(['Big 3 - Feature 2', kit.big3.feature2.title]);
      rows.push(['Big 3 - Feature 2 Desc', kit.big3.feature2.description]);
      rows.push(['Big 3 - Feature 2 Why', kit.big3.feature2.why]);
      rows.push(['Big 3 - Feature 3', kit.big3.feature3.title]);
      rows.push(['Big 3 - Feature 3 Desc', kit.big3.feature3.description]);
      rows.push(['Big 3 - Feature 3 Why', kit.big3.feature3.why]);
    }

    if (kit.podcastOutreach) {
      rows.push(['Legacy Podcast Subject', kit.podcastOutreach.subject]);
      rows.push(['Legacy Podcast Body', kit.podcastOutreach.body]);
    }

    if (kit.podcastMatches) {
      kit.podcastMatches.forEach((match, i) => {
        rows.push([`Podcast Match ${i + 1}`, match.podcastName]);
        rows.push([`Podcast Match ${i + 1} Why`, match.audienceFit]);
        rows.push([`Podcast Match ${i + 1} Email Subject`, match.outreachEmail.subject]);
        rows.push([`Podcast Match ${i + 1} Email Body`, match.outreachEmail.body]);
      });
    }

    if (kit.marketingPlan) {
      kit.marketingPlan.forEach((step, i) => {
        rows.push([`Marketing Plan Step ${i + 1}`, step]);
      });
    }

    if (kit.suggestions) {
      kit.suggestions.forEach((s, i) => {
        rows.push([`Suggestion ${i + 1}`, `${s.improvement} - ${s.reason}`]);
      });
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.map(item => `"${(item || '').replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `markitable_${project.name.replace(/\s+/g, '_').toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("transition-all duration-300", viewMode === 'spatial' ? "p-4 sm:p-6 w-full max-w-full bg-[#070708] text-white min-h-[calc(100vh-4rem)]" : "p-4 sm:p-8 md:p-16 max-w-[1400px] mx-auto bg-transparent text-ink")}>
      {/* Project Header */}
      <header className={cn("mb-10 pb-8 border-b", viewMode === 'spatial' ? "border-white/10" : "border-ink/10")}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] mb-1 block">Project Dossier</span>
            <h1 className={cn("text-4xl sm:text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter leading-none break-words", viewMode === 'spatial' ? "text-white" : "text-ink")}>{project.name}</h1>
          </div>
          
          {/* Work Mode Selector Tabs */}
          <div className={cn("flex items-center gap-1.5 p-1 rounded-xl border select-none sm:self-auto shrink-0 font-sans", viewMode === 'spatial' ? "bg-white/5 border-white/10" : "bg-ink/5 border-ink/10")}>
            <button
              onClick={() => setViewMode('editorial')}
              className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg cursor-pointer",
                viewMode === 'editorial' 
                  ? "bg-white text-ink shadow-sm" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              Editorial View
            </button>
            <button
              onClick={() => {
                setViewMode('spatial');
                addLog("MON_ENG: Spatial workbench viewport requested. Rendered high-contrast workspace.");
              }}
              className={cn(
                "px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg cursor-pointer",
                viewMode === 'spatial' 
                  ? "bg-accent text-white shadow-sm" 
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"
              )}
            >
              Spatial Workbench
            </button>
          </div>
        </div>
        
        {/* Generation Control Panel (Editorial Only) */}
        {viewMode === 'editorial' && (
          <div className="mt-8 pt-8 border-t border-ink/10">
            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strategy */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Market Strategy</span>
                <div className="flex gap-2">
                  <select 
                    value={project.marketType}
                    onChange={(e) => updateProject(project.id, { marketType: e.target.value as MarketType })}
                    className="flex-1 bg-white border border-ink/10 px-2 py-1.5 text-xs font-serif outline-none focus:border-accent"
                  >
                    <option value="niche">Niche Market</option>
                    <option value="saturated">Saturated Market</option>
                  </select>
                  <button 
                    onClick={handleGenerateStrategy}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="bg-ink/5 hover:bg-accent hover:text-white text-ink px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    {loadingSection === 'strategy' ? '...' : 'Run'}
                  </button>
                </div>
              </div>

              {/* Messaging */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Core Messaging</span>
                <div className="flex gap-2">
                  <select 
                    value={messagingTarget}
                    onChange={(e) => setMessagingTarget(e.target.value)}
                    className="flex-1 bg-white border border-ink/10 px-2 py-1.5 text-xs font-serif outline-none focus:border-accent"
                  >
                    <option value="all">All Messaging</option>
                    <option value="positioningStatement">Positioning Statement</option>
                    <option value="oneLiner">One-Liner</option>
                    <option value="taglineOptions">Taglines</option>
                    <option value="elevatorPitch">Elevator Pitches</option>
                  </select>
                  <button 
                    onClick={handleGenerateMessaging}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="bg-ink/5 hover:bg-accent hover:text-white text-ink px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    {loadingSection === 'messaging' ? '...' : 'Run'}
                  </button>
                </div>
              </div>

              {/* Assets */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Tactical Assets</span>
                <div className="flex gap-2">
                  <select 
                    value={assetTarget}
                    onChange={(e) => setAssetTarget(e.target.value as TacticalAssetTarget)}
                    className="flex-1 bg-white border border-ink/10 px-2 py-1.5 text-xs font-serif outline-none focus:border-accent"
                  >
                    <option value="socialMediaBio">Social Media Bio</option>
                    <option value="pressRelease">Press Release</option>
                  </select>
                  <button 
                    onClick={handleGenerateAssets}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="bg-ink/5 hover:bg-accent hover:text-white text-ink px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                  >
                    {loadingSection === 'assets' ? '...' : `Run ${assetTargetLabels[assetTarget]}`}
                  </button>
                </div>
              </div>

              {/* Podcasts */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink/50">Podcast Outreach</span>
                  <button 
                    onClick={() => setShowPodcastConfig(!showPodcastConfig)}
                    className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 border ${showPodcastConfig ? 'bg-ink text-paper border-ink' : 'border-ink/10 text-ink/50 hover:border-ink/40'} transition-all`}
                  >
                    {showPodcastConfig ? 'Close Params' : 'Set Specifics'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <div 
                    onClick={() => setShowPodcastConfig(true)}
                    className="flex-1 bg-white border border-ink/10 px-2 py-1.5 flex items-center cursor-pointer hover:border-accent transition-colors overflow-hidden"
                  >
                    <span className="text-xs font-serif text-ink/60 truncate">
                      {project.podcastAudience || project.podcastProductDesc || project.podcastValueAngle 
                        ? "Custom niche defined"
                        : "Find podcasts & draft pitches"
                    }
                    </span>
                  </div>
                  <button 
                    onClick={handleGeneratePodcasts}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="bg-ink/5 hover:bg-accent hover:text-white text-ink px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 font-sans"
                    title="Generate Podcast Matches and Outreach Emails"
                  >
                    {loadingSection === 'podcasts' ? '...' : 'Run'}
                  </button>
                </div>
              </div>
            </div>

            {/* Podcast Parameters Config Drawer */}
            <AnimatePresence>
              {showPodcastConfig && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-ink/10 p-4 md:p-6 mt-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-ink/10 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent font-sans">Podcast Outreach Matching Filters</span>
                      <button 
                        onClick={() => setShowPodcastConfig(false)} 
                        className="text-[9px] uppercase tracking-wider text-ink/40 hover:text-accent font-bold font-sans"
                      >
                        Hide Configuration
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-ink/60 block font-sans">Product / Service Specifics</label>
                        <textarea
                          value={project.podcastProductDesc || ''}
                          onChange={(e) => updateProject(project.id, { podcastProductDesc: e.target.value })}
                          placeholder="HVAC/plumbing automation scheduling SaaS, digital agency model, etc..."
                          className="w-full h-20 bg-paper/30 border border-ink/10 p-2 text-xs font-serif outline-none focus:border-accent resize-none transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-ink/60 block font-sans">Target Podcast Audience / Niche</label>
                        <textarea
                          value={project.podcastAudience || ''}
                          onChange={(e) => updateProject(project.id, { podcastAudience: e.target.value })}
                          placeholder="Tradesmen, plumbing & roofing operators, local service pros..."
                          className="w-full h-20 bg-paper/30 border border-ink/10 p-2 text-xs font-serif outline-none focus:border-accent resize-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-ink/60 block font-sans">Specialist Topic / Topic Hook</label>
                        <textarea
                          value={project.podcastValueAngle || ''}
                          onChange={(e) => updateProject(project.id, { podcastValueAngle: e.target.value })}
                          placeholder="How automatic dispatching eliminates 20 hours of dispatcher phone strain every single week..."
                          className="w-full h-20 bg-paper/30 border border-ink/10 p-2 text-xs font-serif outline-none focus:border-accent resize-none transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-ink/50 font-serif italic flex flex-col sm:flex-row justify-between items-center gap-3 bg-paper/50 p-3">
                      <span>💡 If left empty, Gemini will auto-extract these details organically based on your Manuscript Entries.</span>
                      <button
                        onClick={() => {
                          setShowPodcastConfig(false);
                          handleGeneratePodcasts();
                        }}
                        disabled={loadingSection !== null || project.notes.length === 0}
                        className="bg-ink hover:bg-accent text-paper px-4 py-1.5 uppercase tracking-widest text-[9px] font-bold transition-all disabled:opacity-50 font-sans"
                      >
                        {loadingSection === 'podcasts' ? 'Processing...' : 'Run Matching Engine'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {project.notes.length === 0 && (
              <p className="text-[9px] font-bold uppercase tracking-widest text-accent mt-4">
                Requires at least one manuscript entry to generate
              </p>
            )}
          </div>
        )}
      </header>

      {viewMode === 'editorial' ? (
        <div className="editorial-grid">
          {/* Left Column: Notes Collection */}
        <div className={cn("col-span-12 space-y-12", showEditorialResultsColumn ? "lg:col-span-5" : "lg:col-span-12")}>
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em]">The Manuscript</h2>
              <span className="text-[10px] font-bold text-ink/40">{project.notes.length} Entries</span>
            </div>
            
            {/* Add Note */}
            <div className="magazine-border p-6 bg-white mb-8 space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Paste LLM outputs, random thoughts, or meeting notes here..."
                className="w-full h-32 bg-transparent border-b border-ink/10 py-2 text-lg font-serif focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-ink/20 mb-4"
              />
              
              {imagePreview && (
                <div className="relative w-full h-48 bg-ink/5 magazine-border overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                    className="absolute top-2 right-2 p-1 bg-ink text-paper rounded-full hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-ink/10">
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageSelect} 
                    ref={fileInputRef}
                    className="hidden" 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-ink/40 hover:text-accent transition-colors"
                    title="Add Image"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={handleAddNote}
                  disabled={isUploading || (!newNote.trim() && !selectedImage)}
                  className="text-[10px] font-bold uppercase tracking-widest bg-ink text-paper px-6 py-2 hover:bg-accent transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Save to Archive'}
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-6">
              <AnimatePresence>
                {project.notes.map((note, i) => (
                  <motion.article 
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    onClick={() => setActiveNoteId(activeNoteId === note.id ? null : note.id)}
                    className={cn(
                      "group relative cursor-pointer rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all overflow-hidden",
                      activeNoteId === note.id
                        ? "border-accent/40 shadow-[0_24px_65px_rgba(225,29,72,0.10)]"
                        : "h-[220px] hover:border-ink/20"
                    )}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="absolute left-4 top-4 text-ink/20 hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-start justify-between gap-4 mb-4 pr-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-ink/30 block">
                        Entry {project.notes.length - i} &bull; {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-ink/25">
                        {activeNoteId === note.id ? 'Open' : 'Preview'}
                      </span>
                    </div>

                    {activeNoteId === note.id ? (
                      <motion.div
                        key={`${note.id}-expanded`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {note.imageUrl && (
                          <div className="mb-5 overflow-hidden rounded-2xl border border-ink/10 bg-ink/5">
                            <img src={note.imageUrl} alt="Manuscript Asset" className="w-full h-auto" />
                          </div>
                        )}
                        <p className="text-sm font-serif italic leading-relaxed text-ink/80 whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex h-[150px] flex-col justify-between gap-4">
                        {note.imageUrl && (
                          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink/5">
                            <img src={note.imageUrl} alt="Manuscript Asset" className="h-32 w-full object-cover" />
                          </div>
                        )}
                        <p className={cn(
                          "text-sm font-serif italic leading-relaxed text-ink/65 whitespace-pre-wrap",
                          note.imageUrl ? "line-clamp-2" : "line-clamp-5"
                        )}>
                          {note.content}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent/70">
                          Click to expand
                        </span>
                      </div>
                    )}
                  </motion.article>
                ))}
              </AnimatePresence>
              {project.notes.length === 0 && (
                <p className="text-sm font-serif italic text-ink/40 text-center py-12">
                  Your manuscript is empty. Start collecting ideas above.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Generation & Kit */}
        {showEditorialResultsColumn && (
        <div className="col-span-12 lg:col-span-7 lg:pl-12 lg:border-l border-ink/10">
          {/* Kit Display */}
          {loadingSection && (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <div className="w-12 h-12 border-t-2 border-r-2 border-accent rounded-full" />
              </motion.div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/60">Synthesizing Notes...</p>
            </div>
          )}

          {!loadingSection && project.kit && (
            <div ref={resultRef} className="space-y-24">
               {/* Strategy Section */}
               {project.kit.headline && (
                 <>
                   <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px] break-words w-full sm:w-auto">The Headline</span>
                      <button onClick={exportToCSV} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors self-end sm:self-auto border border-ink/10 sm:border-none px-4 py-2 sm:p-0">
                        <Download className="w-4 h-4" /> Export CSV
                      </button>
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black leading-[0.9] uppercase tracking-tighter text-ink break-words">
                      {project.kit.headline}
                    </h3>
                    <p className="text-xl font-serif italic text-ink/80">{project.kit.subheadline}</p>
                  </div>

                  {project.kit.valueProposition && (
                    <div className="magazine-border-thick p-6 md:p-8 bg-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest mb-4 block text-ink/60">Value Proposition</span>
                      <p className="text-xl md:text-2xl font-serif italic leading-relaxed drop-cap text-ink">
                        {project.kit.valueProposition}
                      </p>
                    </div>
                  )}

                  {project.kit.big3 && (
                    <div>
                      <h4 className="text-2xl font-serif font-black uppercase leading-none mb-8">The Big 3</h4>
                      <div className="space-y-12">
                        {[project.kit.big3.feature1, project.kit.big3.feature2, project.kit.big3.feature3].map((f, i) => (
                          <div key={i} className="space-y-4">
                            <div className="text-2xl font-serif italic text-ink/20">0{i+1}</div>
                            <h5 className="text-lg font-bold uppercase tracking-tight border-b border-ink/10 pb-2 text-ink">{f.title}</h5>
                            <p className="text-sm leading-relaxed text-ink/90">{f.description}</p>
                            <div className="bg-ink text-paper p-4 mt-4">
                              <span className="text-[9px] font-bold uppercase tracking-widest block mb-1 opacity-70">Strategic Why</span>
                              <p className="text-xs italic font-serif leading-relaxed">{f.why}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.kit.marketingPlan && (
                    <div>
                      <h4 className="text-2xl font-serif font-black uppercase tracking-tighter mb-8">The Campaign Plan</h4>
                      <div className="space-y-6">
                        {project.kit.marketingPlan.map((step, i) => (
                          <div key={i} className="flex gap-6 items-start group">
                            <span className="text-2xl font-serif italic text-ink/10 group-hover:text-accent/40 transition-colors">0{i+1}</span>
                            <p className="text-base font-serif italic border-b border-ink/10 pb-4 flex-1 group-hover:border-accent/40 transition-colors text-ink/90">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.kit.podcastMatches && project.kit.podcastMatches.length > 0 && (
                    <div className="space-y-8">
                      <h4 className="text-2xl font-serif font-black uppercase tracking-tighter flex items-center gap-3">
                        <Podcast className="w-5 h-5 text-accent" /> Podcast Matchmaking
                      </h4>
                      <div className="grid grid-cols-1 gap-8">
                        {project.kit.podcastMatches.map((match, i) => (
                          <div key={i} className="magazine-border p-6 md:p-8 bg-white">
                            <div className="mb-6 pb-6 border-b border-ink/10">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2 block">Match 0{i + 1}</span>
                              <h5 className="text-xl md:text-2xl font-serif font-black uppercase leading-tight text-ink mb-3">{match.podcastName}</h5>
                              <div className="bg-ink/5 p-4 border-l-2 border-accent">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60 block mb-1">Audience Fit</span>
                                <p className="text-sm font-serif italic text-ink/80">{match.audienceFit}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/60 block">Crafted Pitch</span>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-1">Subject</span>
                                <p className="text-md font-serif italic border-l-[3px] border-accent pl-3 py-1 bg-ink/5 text-ink">{match.outreachEmail.subject}</p>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 block mb-1">Email Body</span>
                                <div className="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap font-serif">
                                  {match.outreachEmail.body}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.kit.podcastOutreach && !project.kit.podcastMatches && (
                    <div className="magazine-border p-6 md:p-8 bg-white">
                      <h4 className="text-xl font-serif font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <Podcast className="w-4 h-4 text-accent" /> Podcast Outreach
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block mb-2">Subject Line</span>
                          <p className="text-lg font-serif italic border-l-4 border-accent pl-4 text-ink">{project.kit.podcastOutreach.subject}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block mb-2">The Pitch</span>
                          <div className="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap font-serif italic">
                            {project.kit.podcastOutreach.body}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.kit.suggestions && (
                    <div className="bg-ink text-paper p-8 relative overflow-hidden">
                      <h4 className="text-3xl font-serif font-black uppercase leading-[0.9] mb-8 flex items-center gap-4">
                        <Lightbulb className="w-6 h-6 text-accent" /> Editorial Notes
                      </h4>
                      <div className="space-y-8">
                        {project.kit.suggestions.map((s, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <h5 className="text-xs font-bold uppercase tracking-widest">{s.improvement}</h5>
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed italic font-serif pl-4 border-l border-white/10">
                              {s.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                 </>
               )}

              {/* Core Messaging */}
              {project.kit.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0 && (
                <div>
                  <h4 className="text-2xl font-serif font-black uppercase leading-none mb-8">Core Messaging</h4>
                  <div className="space-y-12">
                    
                    {/* Positioning & One-Liner */}
                    {(project.kit.coreMessaging.positioningStatement || project.kit.coreMessaging.oneLiner) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.kit.coreMessaging.positioningStatement && (
                          <div className="space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block border-b border-ink/10 pb-2">Positioning Statement</span>
                            <p className="text-lg font-serif italic text-ink/90 leading-relaxed">{project.kit.coreMessaging.positioningStatement}</p>
                          </div>
                        )}
                        {project.kit.coreMessaging.oneLiner && (
                          <div className="space-y-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block border-b border-ink/10 pb-2">One-Liner</span>
                            <p className="text-xl font-bold uppercase tracking-tight text-ink">{project.kit.coreMessaging.oneLiner}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Taglines */}
                    {project.kit.coreMessaging.taglineOptions && (
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block border-b border-ink/10 pb-2">Tagline Options</span>
                        <div className="flex flex-wrap gap-4">
                          {project.kit.coreMessaging.taglineOptions.map((tagline, i) => (
                            <span key={i} className="px-4 py-2 bg-ink/5 text-ink font-serif italic text-sm">
                              "{tagline}"
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Elevator Pitches */}
                    {project.kit.coreMessaging.elevatorPitch && (
                      <div className="space-y-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block border-b border-ink/10 pb-2">Elevator Pitches</span>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="bg-white p-6 magazine-border">
                            <span className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">30-Second</span>
                            <p className="text-sm font-serif italic text-ink/80 leading-relaxed">{project.kit.coreMessaging.elevatorPitch.thirtySecond}</p>
                          </div>
                          <div className="bg-white p-6 magazine-border">
                            <span className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">1-Minute</span>
                            <p className="text-sm font-serif italic text-ink/80 leading-relaxed">{project.kit.coreMessaging.elevatorPitch.oneMinute}</p>
                          </div>
                          <div className="bg-white p-6 magazine-border">
                            <span className="text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">2-Minute</span>
                            <p className="text-sm font-serif italic text-ink/80 leading-relaxed">{project.kit.coreMessaging.elevatorPitch.twoMinute}</p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* Tactical Assets */}
              {project.kit.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0 && (
                <div>
                  <h4 className="text-2xl font-serif font-black uppercase tracking-tighter mb-8">Tactical Assets</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Social Bio */}
                    {project.kit.tacticalAssets.socialMediaBio && (
                      <div className="magazine-border p-8 bg-ink text-paper">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-paper/60 block mb-4">Social Media Bio</span>
                        <p className="text-base font-serif italic leading-relaxed">{project.kit.tacticalAssets.socialMediaBio}</p>
                      </div>
                    )}
                    {/* Press Release */}
                    {project.kit.tacticalAssets.pressRelease && (
                      <div className={cn("magazine-border p-8 bg-white", !project.kit.tacticalAssets.socialMediaBio ? "col-span-1 lg:col-span-2" : "")}>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60 block mb-4">Press Release Draft</span>
                        <div className="text-sm font-serif leading-relaxed text-ink/80 whitespace-pre-wrap max-h-[600px] overflow-y-auto pr-4">
                          {project.kit.tacticalAssets.pressRelease}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
        )}
      </div>
      ) : (
        <SpatialWorkbenchView 
          project={project}
          updateProject={updateProject}
          isUploading={isUploading}
          loadingSection={loadingSection}
          logs={logs}
          setLogs={setLogs}
          handleGenerateStrategy={handleGenerateStrategy}
          handleGenerateMessaging={handleGenerateMessaging}
          handleGenerateAssets={handleGenerateAssets}
          handleGeneratePodcasts={handleGeneratePodcasts}
          messagingTarget={messagingTarget}
          setMessagingTarget={setMessagingTarget}
          assetTarget={assetTarget}
          setAssetTarget={setAssetTarget}
          showPodcastConfig={showPodcastConfig}
          setShowPodcastConfig={setShowPodcastConfig}
        />
      )}
    </div>
  );
}

interface SpatialProps {
  project: Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  isUploading: boolean;
  loadingSection: string | null;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  handleGenerateStrategy: () => Promise<void>;
  handleGenerateMessaging: () => Promise<void>;
  handleGenerateAssets: () => Promise<void>;
  handleGeneratePodcasts: () => Promise<void>;
  messagingTarget: string;
  setMessagingTarget: (v: string) => void;
  assetTarget: TacticalAssetTarget;
  setAssetTarget: (v: TacticalAssetTarget) => void;
  showPodcastConfig: boolean;
  setShowPodcastConfig: (v: boolean) => void;
}

export function SpatialWorkbenchView({
  project,
  updateProject,
  isUploading,
  loadingSection,
  logs,
  setLogs,
  handleGenerateStrategy,
  handleGenerateMessaging,
  handleGenerateAssets,
  handleGeneratePodcasts,
  messagingTarget,
  setMessagingTarget,
  assetTarget,
  setAssetTarget,
  showPodcastConfig,
  setShowPodcastConfig
}: SpatialProps) {
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  // Mobile zoom scaling (default scaled-out on mobile, slightly less on desktop for premium visual breathing space)
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 0.65 : 0.95;
    }
    return 1.0;
  });

  const [lines, setLines] = useState<{ id: string, path: string, isActive: boolean }[]>([]);

  // Smooth scroll feed telemetry
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const calculateLines = () => {
    if (!whiteboardRef.current) return;
    const containerRect = whiteboardRef.current.getBoundingClientRect();
    const newLines: { id: string, path: string, isActive: boolean }[] = [];

    const getNodeCoords = (nodeId: string, side: 'left' | 'right') => {
      const el = whiteboardRef.current?.querySelector(`[data-node-id="${nodeId}"]`);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const x = (rect.left - containerRect.left) / zoom;
      const y = (rect.top - containerRect.top) / zoom;
      const w = rect.width / zoom;
      const h = rect.height / zoom;

      return {
        x: side === 'left' ? x : x + w,
        y: y + h / 2
      };
    };

    // Connections from note cards to core AI hub
    project.notes.forEach((note) => {
      const start = getNodeCoords(`note-${note.id}`, 'right');
      const end = getNodeCoords('hub-core', 'left');
      if (start && end) {
        const controlOffset = Math.max(80, Math.abs(end.x - start.x) / 1.5);
        const path = `M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`;
        newLines.push({ id: `note-${note.id}-hub`, path, isActive: true });
      }
    });

    // Connections from core AI hub to output columns
    const outputs = [
      { id: 'node-strategy', isActive: !!project.kit?.headline },
      { id: 'node-[#ff2a5f]--messaging', isActive: !!project.kit?.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0 },
      { id: 'node-assets', isActive: !!project.kit?.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0 },
      { id: 'node-podcasts', isActive: !!project.kit?.podcastMatches && project.kit.podcastMatches.length > 0 }
    ];

    // Correct IDs in connection drawing matching elements inside DOM
    const elementIds = [
      { domId: 'node-strategy', isActive: !!project.kit?.headline },
      { domId: 'node-messaging', isActive: !!project.kit?.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0 },
      { domId: 'node-assets', isActive: !!project.kit?.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0 },
      { domId: 'node-podcasts', isActive: !!project.kit?.podcastMatches && project.kit.podcastMatches.length > 0 }
    ];

    elementIds.forEach((out) => {
      const start = getNodeCoords('hub-core', 'right');
      const end = getNodeCoords(out.domId, 'left');
      if (start && end) {
        const controlOffset = Math.max(80, Math.abs(end.x - start.x) / 1.5);
        const path = `M ${start.x} ${start.y} C ${start.x + controlOffset} ${start.y}, ${end.x - controlOffset} ${end.y}, ${end.x} ${end.y}`;
        newLines.push({ id: `hub-${out.domId}`, path, isActive: out.isActive });
      }
    });

    setLines(newLines);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateLines();
    }, 150);

    window.addEventListener('resize', calculateLines);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateLines);
    };
  }, [project, zoom]);

  useEffect(() => {
    calculateLines();
  }, [zoom]);

  return (
    <div className="flex flex-col gap-6 relative select-none w-full max-w-full font-sans text-white h-[calc(100vh-14rem)] min-h-[640px] overflow-hidden">
      
      {/* Dynamic Connector SVGs */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-auto relative rounded-3xl border border-white/5 bg-[#0a0a0c] cursor-grab active:cursor-grabbing shadow-[inset_0_4px_32px_rgba(0,0,0,0.9)]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        onScroll={calculateLines}
      >
        <motion.div 
          ref={whiteboardRef}
          drag
          dragConstraints={scrollContainerRef}
          dragMomentum={false}
          onDrag={calculateLines}
          className="flex flex-row items-center gap-16 md:gap-24 w-max min-w-full p-12 md:p-16 h-full select-none z-10 relative bg-transparent"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        >
          {/* Connector SVGs Lines */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible">
            {lines.map((ln) => (
              <path
                key={ln.id}
                d={ln.path}
                fill="none"
                className="transition-all duration-300"
                style={{
                  stroke: ln.isActive ? '#ff2a5f' : 'rgba(255,255,255,0.08)',
                  strokeWidth: ln.isActive ? '2px' : '1px',
                  strokeDasharray: ln.isActive ? 'none' : '4 4',
                  filter: ln.isActive ? 'drop-shadow(0 0 4px #ff2a5f)' : 'none'
                }}
              />
            ))}
          </svg>

          {/* ================= COLUMN 1: MANUSCRIPT DUMPS ================= */}
          <div className="flex flex-col gap-6 z-10 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Manuscript Inputs</span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                {project.notes.length} Dump{project.notes.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-none">
              {project.notes.length === 0 ? (
                <div className="w-[300px] border border-white/5 bg-[#0e0e11]/80 rounded-xl p-5 text-center text-xs text-white/40 font-serif">
                  No manuscript dumps inside dossier. Combine ideas to start synthesis.
                </div>
              ) : (
                project.notes.map((note) => (
                  <div
                    key={note.id}
                    data-node-id={`note-${note.id}`}
                    className="w-[300px] bg-[#0c0c0e] border border-white/10 hover:border-white/20 p-4 rounded-xl text-left shadow-lg relative transition-colors"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 font-mono text-[9px] text-white/40">
                      <span>[ INPUT_NODE // {note.id.substring(0, 6)} ]</span>
                      <span>{new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                    
                    {note.imageUrl && (
                      <div className="w-full h-20 overflow-hidden mb-2 rounded-lg bg-black/40 border border-white/5">
                        <img src={note.imageUrl} referrerPolicy="no-referrer" alt="Uploaded Context" className="w-full h-full object-cover grayscale opacity-60" />
                      </div>
                    )}
                    
                    <p className="text-xs font-mono text-white/80 leading-relaxed font-light line-clamp-4 select-text">
                      {note.content}
                    </p>
                    
                    {/* Anchor Pin Connection Right Center */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2a5f]/80 translate-x-1" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ================= COLUMN 2: PROCESS MODULE CORE ================= */}
          <div className="flex flex-col gap-3 z-10 pointer-events-auto">
            <div 
              data-node-id="hub-core"
              className="w-[280px] bg-[#121215] border-2 border-[#ff2a5f]/40 p-6 rounded-2xl text-center relative shadow-[0_4px_32px_rgba(255,42,95,0.15)] bg-gradient-to-b from-[#18181d] to-[#121215]"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2a5f] -translate-x-1.5 shadow-[0_0_8px_#ff2a5f]" />
              
              <div className="flex items-center justify-center mb-4">
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#ff2a5f]/10 border border-[#ff2a5f]/30">
                  <Activity className="w-6 h-6 text-[#ff2a5f] animate-pulse" />
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#ff2a5f]/20 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
              </div>

              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white">Synthesis Core</h3>
              <p className="text-[10px] font-mono text-[#ff2a5f] uppercase tracking-wider mt-0.5">Model Engine v3.5</p>

              <div className="mt-4 pt-4 border-t border-white/5 space-y-2 text-left font-mono text-[9px] text-white/40">
                <div className="flex justify-between">
                  <span>RESOLVER:</span>
                  <span className="text-white/60">GEMINI_FLASH</span>
                </div>
                <div className="flex justify-between">
                  <span>INPUTS_INGESTED:</span>
                  <span className="text-white/60">0{project.notes.length} RAW</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-emerald-500 animate-pulse">ACTIVE_ONLINE</span>
                </div>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff2a5f] translate-x-1.5 shadow-[0_0_8px_#ff2a5f]" />
            </div>
          </div>

          {/* ================= COLUMN 3: STRATEGY & MESSAGING ================= */}
          <div className="flex flex-col gap-8 z-10 pointer-events-auto">
            
            {/* Strategy Node */}
            <div 
              data-node-id="node-strategy"
              className={cn(
                "w-[340px] p-5 rounded-2xl border transition-all text-left relative",
                project.kit?.headline 
                  ? "bg-[#101012] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
                  : "bg-[#0b0b0c] border-[#ff2a5f]/30 border-dashed"
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2a5f] -translate-x-1" />
              
              {!project.kit?.headline ? (
                <div className="space-y-4 py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase text-amber-500 tracking-wider">Awaiting Synthesis Run</span>
                  </div>
                  <p className="text-xs text-white/50 font-serif leading-relaxed">Combine manuscript inputs into a high-converting market positioning strategy and campaign blueprint.</p>
                  
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Market Density</label>
                    <select 
                      value={project.marketType}
                      onChange={(e) => updateProject(project.id, { marketType: e.target.value as MarketType })}
                      className="w-full bg-[#121214] text-white border border-white/10 px-2.5 py-1.5 text-xs outline-none focus:border-[#ff2a5f] rounded-lg font-mono cursor-pointer"
                    >
                      <option value="niche">Niche Market</option>
                      <option value="saturated">Saturated Market</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateStrategy}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="w-full py-2 bg-[#ff2a5f] hover:bg-[#e02050] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loadingSection === 'strategy' ? "Compiling..." : "Compile Strategy Blueprint"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Strategy Blueprint</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#ff2a5f] uppercase bg-[#ff2a5f]/10 px-1.5 py-0.5 rounded">Synced</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Core Hook</span>
                    <h4 className="text-sm font-serif font-bold italic text-white mt-1 break-words">{project.kit.headline}</h4>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Differential Edge</span>
                    <p className="text-xs font-serif italic text-white/70 leading-relaxed mt-1 break-words">{project.kit.subheadline}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Unique Value Proposition</span>
                    <p className="text-xs font-mono text-white/80 leading-relaxed mt-1 bg-white/5 p-2 rounded-lg break-words">{project.kit.valueProposition}</p>
                  </div>
                  
                  {project.kit.marketingPlan && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase block mb-1">Execution Steps</span>
                      <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                        {project.kit.marketingPlan.map((step, idx) => (
                          <div key={idx} className="text-[10px] font-mono text-white/60 leading-normal flex gap-1">
                            <span className="text-accent font-bold">-{idx+1}</span>
                            <span className="break-words">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleGenerateStrategy}
                    disabled={loadingSection !== null}
                    className="text-[9px] font-mono text-[#ff2a5f] hover:underline uppercase block tracking-wider pt-2 border-t border-white/5 text-right w-full cursor-pointer"
                  >
                    {loadingSection === 'strategy' ? "Compiling..." : "Re-Run Strategy Synthesizer"}
                  </button>
                </div>
              )}
            </div>

            {/* Messaging Node */}
            <div 
              data-node-id="node-messaging"
              className={cn(
                "w-[340px] p-5 rounded-2xl border transition-all text-left relative",
                project.kit?.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0
                  ? "bg-[#101012] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
                  : "bg-[#0b0b0c] border-[#ff2a5f]/30 border-dashed"
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2a5f] -translate-x-1" />
              
              {!(project.kit?.coreMessaging && Object.keys(project.kit.coreMessaging).length > 0) ? (
                <div className="space-y-4 py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase text-amber-500 tracking-wider">Awaiting Synthesis Run</span>
                  </div>
                  <p className="text-xs text-white/50 font-serif leading-relaxed">Extract brand positionings, elevator pitches, and Taglines matched to target customer demographics.</p>
                  
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Scope Target</label>
                    <select 
                      value={messagingTarget}
                      onChange={(e) => setMessagingTarget(e.target.value)}
                      className="w-full bg-[#121214] text-white border border-[#27272a] px-2.5 py-1.5 text-xs outline-none focus:border-[#ff2a5f] rounded-lg font-mono cursor-pointer"
                    >
                      <option value="all">All Messaging</option>
                      <option value="positioningStatement">Positioning Statement</option>
                      <option value="oneLiner">One-Liner</option>
                      <option value="taglineOptions">Taglines</option>
                      <option value="elevatorPitch">Elevator Pitches</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateMessaging}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="w-full py-2 bg-[#ff2a5f] hover:bg-[#e02050] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loadingSection === 'messaging' ? "Compiling..." : "Compile Core Messaging"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Brand Core Messaging</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#ff2a5f] uppercase bg-[#ff2a5f]/10 px-1.5 py-0.5 rounded">Synced</span>
                  </div>
                  
                  {project.kit.coreMessaging.positioningStatement && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Positioning Statement</span>
                      <p className="text-xs font-serif italic text-white/80 mt-1 break-words">{project.kit.coreMessaging.positioningStatement}</p>
                    </div>
                  )}

                  {project.kit.coreMessaging.oneLiner && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Signature One-Liner</span>
                      <p className="text-xs font-mono text-white/90 leading-relaxed mt-1 bg-white/5 p-2 rounded-lg break-words">{project.kit.coreMessaging.oneLiner}</p>
                    </div>
                  )}

                  {project.kit.coreMessaging.taglineOptions && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Tagline Pool</span>
                      <ul className="space-y-1 mt-1 bg-white/5 p-2 rounded-lg max-h-32 overflow-y-auto">
                        {project.kit.coreMessaging.taglineOptions.map((tagline, idx) => (
                          <li key={idx} className="text-[10px] font-mono text-white/70 italic list-disc list-inside break-words">{tagline}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button 
                    onClick={handleGenerateMessaging}
                    disabled={loadingSection !== null}
                    className="text-[9px] font-mono text-[#ff2a5f] hover:underline uppercase block tracking-wider pt-2 border-t border-white/5 text-right w-full cursor-pointer"
                  >
                    {loadingSection === 'messaging' ? "Compiling..." : "Re-Run Messaging Core"}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* ================= COLUMN 4: TACTICAL & PODCASTS ================= */}
          <div className="flex flex-col gap-8 z-10 pointer-events-auto">
            
            {/* Tactical Assets Node */}
            <div 
              data-node-id="node-assets"
              className={cn(
                "p-5 rounded-2xl border transition-all text-left relative",
                project.kit?.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0
                  ? "bg-[#101012] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
                  : "bg-[#0b0b0c] border-[#ff2a5f]/30 border-dashed",
                project.kit?.tacticalAssets?.pressRelease && (!project.kit.tacticalAssets.socialMediaBio) 
                  ? "w-[540px]" 
                  : "w-[340px]"
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2a5f] -translate-x-1" />
              
              {!(project.kit?.tacticalAssets && Object.keys(project.kit.tacticalAssets).length > 0) ? (
                <div className="space-y-4 py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase text-amber-500 tracking-wider">Awaiting Synthesis Run</span>
                  </div>
                  <p className="text-xs text-white/50 font-serif leading-relaxed">Generate targeted PR drafts, and public media copy custom optimized for your marketing push.</p>
                  
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Output Format</label>
                    <select 
                      value={assetTarget}
                      onChange={(e) => setAssetTarget(e.target.value as TacticalAssetTarget)}
                      className="w-full bg-[#121214] text-white border border-[#27272a] px-2.5 py-1.5 text-xs outline-none focus:border-[#ff2a5f] rounded-lg font-mono cursor-pointer"
                    >
                      <option value="socialMediaBio">Social Media Bio</option>
                      <option value="pressRelease">Press Release</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateAssets}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="w-full py-2 bg-[#ff2a5f] hover:bg-[#e02050] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loadingSection === 'assets' ? "Compiling..." : `Generate ${assetTargetLabels[assetTarget]}`}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Tactical Materials</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#ff2a5f] uppercase bg-[#ff2a5f]/10 px-1.5 py-0.5 rounded">Synced</span>
                  </div>
                  
                  {project.kit.tacticalAssets.socialMediaBio && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Bio Placement</span>
                      <p className="text-xs font-serif italic text-white/80 mt-1 bg-white/5 p-2 rounded-lg break-words">{project.kit.tacticalAssets.socialMediaBio}</p>
                    </div>
                  )}

                  {project.kit.tacticalAssets.pressRelease && (
                    <div>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Press Release PR Copy</span>
                      <div className={cn(
                        "font-mono text-white/70 leading-relaxed whitespace-pre-wrap mt-1 bg-white/5 rounded-lg overflow-y-auto break-words scrollbar-none",
                        (!project.kit.tacticalAssets.socialMediaBio) ? "text-[11px] p-4 h-[400px]" : "text-[10px] p-2 max-h-32"
                      )}>
                        {project.kit.tacticalAssets.pressRelease}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleGenerateAssets}
                    disabled={loadingSection !== null}
                    className="text-[9px] font-mono text-[#ff2a5f] hover:underline uppercase block tracking-wider pt-2 border-t border-white/5 text-right w-full cursor-pointer"
                  >
                    {loadingSection === 'assets' ? "Compiling..." : `Re-Run ${assetTargetLabels[assetTarget]}`}
                  </button>
                </div>
              )}
            </div>

            {/* Podcast Pitcher Node */}
            <div 
              data-node-id="node-podcasts"
              className={cn(
                "w-[340px] p-5 rounded-2xl border transition-all text-left relative",
                project.kit?.podcastMatches && project.kit.podcastMatches.length > 0
                  ? "bg-[#101012] border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" 
                  : "bg-[#0b0b0c] border-[#ff2a5f]/30 border-dashed"
              )}
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#ff2a5f] -translate-x-1" />
              
              {!(project.kit?.podcastMatches && project.kit.podcastMatches.length > 0) ? (
                <div className="space-y-3.5 py-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[9px] font-mono uppercase text-amber-500 tracking-wider">Awaiting Synthesis Run</span>
                  </div>
                  <p className="text-xs text-white/50 font-serif leading-relaxed">Match niche venues in target industries. Write custom pitches explaining why you provide maximum audience interest.</p>
                  
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-mono text-white/40 uppercase">Filtering Specs</span>
                      <button 
                        onClick={() => setShowPodcastConfig(!showPodcastConfig)}
                        className="text-[8px] font-mono border border-white/10 px-1 py-0.5 rounded text-white/50 hover:text-white"
                      >
                        {showPodcastConfig ? "Collapse" : "Configure"}
                      </button>
                    </div>
                    
                    {showPodcastConfig ? (
                      <div className="space-y-2 bg-white/5 p-2.5 rounded-lg">
                        <input 
                          type="text" 
                          value={project.podcastProductDesc || ''} 
                          onChange={(e) => updateProject(project.id, { podcastProductDesc: e.target.value })} 
                          placeholder="Your SaaS/Product description..." 
                          className="w-full bg-[#121214] text-white border border-white/10 p-1.5 text-[10px] outline-none rounded font-mono"
                        />
                        <input 
                          type="text" 
                          value={project.podcastAudience || ''} 
                          onChange={(e) => updateProject(project.id, { podcastAudience: e.target.value })} 
                          placeholder="Target Podcast Audience..." 
                          className="w-full bg-[#121214] text-white border border-white/10 p-1.5 text-[10px] outline-none rounded font-mono"
                        />
                      </div>
                    ) : (
                      <div className="text-[10px] font-mono text-white/30 italic">
                        No custom specifications set. Gemini will extract values organically.
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleGeneratePodcasts}
                    disabled={loadingSection !== null || project.notes.length === 0}
                    className="w-full py-2 bg-[#ff2a5f] hover:bg-[#e02050] text-white text-[9px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer font-sans"
                  >
                    {loadingSection === 'podcasts' ? "Matching..." : "Match Podcasts & Pitches"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a5f]" />
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Podcast Outreach matches</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#ff2a5f] uppercase bg-[#ff2a5f]/10 px-1.5 py-0.5 rounded">Synced</span>
                  </div>
                  
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-none">
                    {project.kit.podcastMatches.map((match, idx) => (
                      <div key={idx} className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1.5">
                        <div className="flex justify-between items-center font-mono text-[9px]">
                          <span className="text-[#ff2a5f] font-bold uppercase">VENUE_0{idx+1}</span>
                          <span className="text-white/40 uppercase">Fit: {match.audienceFit.substring(0, 15)}...</span>
                        </div>
                        <h5 className="text-xs font-serif font-bold text-white leading-snug break-words">{match.podcastName}</h5>
                        <p className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block">EMAIL: {match.outreachEmail.subject.substring(0,25)}...</p>
                        <div className="text-[9px] font-mono text-white/60 leading-relaxed max-h-20 overflow-y-auto whitespace-pre-wrap bg-black/40 p-1.5 rounded break-words font-sans">
                          {match.outreachEmail.body}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleGeneratePodcasts}
                    disabled={loadingSection !== null}
                    className="text-[9px] font-mono text-[#ff2a5f] hover:underline uppercase block tracking-wider pt-2 border-t border-white/5 text-right w-full cursor-pointer"
                  >
                    {loadingSection === 'podcasts' ? "Compiling..." : "Re-Run Matchmaking"}
                  </button>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>

      {/* Floating Zoom / Reset Overlays */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#121214] border border-white/10 p-1.5 rounded-xl text-white select-none shadow-md">
        <button 
          onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} 
          className="p-1 px-2.5 bg-white/5 hover:bg-white/15 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          title="Zoom Out"
        >
          -
        </button>
        <span className="font-mono text-xs text-white/60 min-w-10">{(zoom * 100).toFixed(0)}%</span>
        <button 
          onClick={() => setZoom(Math.min(1.3, zoom + 0.1))} 
          className="p-1 px-2.5 bg-white/5 hover:bg-white/15 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          title="Zoom In"
        >
          +
        </button>
        <div className="w-px h-4 bg-white/10" />
        <button 
          onClick={() => setZoom(window.innerWidth < 768 ? 0.65 : 0.95)} 
          className="p-1 px-2 bg-white/5 hover:bg-[#ff2a5f] hover:text-white rounded-lg text-xs uppercase tracking-widest font-mono text-white/60 text-[9px] transition-colors cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* ================= TELEMETRY CONSOLE TERMINAL FEED ================= */}
      <div className="h-[150px] shrink-0 border border-white/10 bg-[#050507] rounded-3xl flex flex-col overflow-hidden relative shadow-[0_4px_32px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between bg-[#0e0e11]/80 px-5 py-2 border-b border-white/10 shrink-0 font-mono text-[9px] tracking-widest text-white/40">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#ff2a5f]" />
            <span>TERMINAL FEEDS // LOCAL_VIRT_PORT_3000</span>
          </div>
          <span className="text-emerald-500">● LIVE_STREAM_CONNECTED</span>
        </div>

        <div className="flex-1 p-4 md:p-5 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 text-left bg-[#050507]">
          {logs.map((log, idx) => {
            const isError = log.includes('ERROR');
            const isSuccess = log.includes('RESPONSE') || log.includes('SUCCESS');
            const isCall = log.includes('CALL') || log.includes('PAYLOAD');
            return (
              <p 
                key={idx} 
                className="font-mono text-xs text-left max-w-full overflow-hidden whitespace-pre-wrap flex items-start gap-2 leading-relaxed"
                style={{
                  color: isError ? '#ef4444' : isSuccess ? '#10b981' : isCall ? '#3b82f6' : 'rgba(255,255,255,0.85)'
                }}
              >
                <span className="text-[10px] select-none text-white/20">0{idx+1}.</span>
                <span className="break-all">{log}</span>
              </p>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>

    </div>
  );
}
