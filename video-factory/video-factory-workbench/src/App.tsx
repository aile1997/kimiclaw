import { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Mic, 
  Image, 
  FileText, 
  Film, 
  ChevronRight, 
  Zap, 
  Terminal,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Clock,
  TrendingUp,
  Layers,
  Cpu
} from 'lucide-react';

// 类型定义
interface VideoProject {
  id: string;
  date: string;
  topic: string;
  status: 'pending' | 'script' | 'voice' | 'images' | 'timeline' | 'composing' | 'completed' | 'error';
  progress: number;
  script?: { wordCount: number; duration: number };
  images?: { count: number; completed: number };
  voice?: { duration: number };
}

interface AgentStatus {
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  message: string;
  lastRun?: string;
}

interface LogEntry {
  time: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

// 项目数据
const PROJECTS: VideoProject[] = [
  {
    id: 'video2-openclaw-guide',
    date: '2026-02-27',
    topic: '《OpenClaw高阶进化指南》',
    status: 'images',
    progress: 85,
    script: { wordCount: 2200, duration: 600 },
    images: { count: 13, completed: 13 },
    voice: { duration: 600 },
  },
  {
    id: 'video-factory-v3',
    date: '2026-02-26',
    topic: 'OpenClaw自动化实战 (90秒版)',
    status: 'completed',
    progress: 100,
    script: { wordCount: 228, duration: 90 },
    images: { count: 5, completed: 5 },
    voice: { duration: 90 },
  }
];

// Agent状态
const AGENTS: AgentStatus[] = [
  { name: '脚本创作', status: 'completed', progress: 100, message: '✓ 口播稿已生成', lastRun: '2026-02-25 12:11' },
  { name: '语音合成', status: 'completed', progress: 100, message: '✓ CosyVoice音频已生成', lastRun: '2026-02-25 12:15' },
  { name: '配图生成', status: 'completed', progress: 100, message: '✓ 13张配图已生成', lastRun: '2026-02-26 21:32' },
  { name: '时间轴', status: 'running', progress: 60, message: '⏳ 提取中...' },
  { name: '视频合成', status: 'idle', progress: 0, message: '等待执行' },
];

// 状态样式
const statusColors = {
  idle: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
  running: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-yellow-500/20',
  completed: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  error: 'from-red-500/20 to-rose-500/20 border-red-500/30',
};

const statusLabels: Record<string, string> = {
  pending: '等待中',
  script: '脚本创作',
  voice: '语音合成',
  images: '配图生成',
  timeline: '时间轴',
  composing: '视频合成',
  completed: '已完成',
  error: '错误',
};

const statusIcons = {
  idle: AlertCircle,
  running: Loader2,
  completed: CheckCircle2,
  error: AlertCircle,
};

function App() {
  const [selectedProject, setSelectedProject] = useState<VideoProject>(PROJECTS[0]);
  const [agents, setAgents] = useState<AgentStatus[]>(AGENTS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const time = new Date().toLocaleTimeString('zh-CN');
    setLogs(prev => [...prev, { time, message, type }]);
  };

  const triggerAgent = async (agentName: string) => {
    addLog(`启动 ${agentName}...`, 'info');
    setAgents(prev => prev.map(a => 
      a.name === agentName ? { ...a, status: 'running' as const, message: '执行中...' } : a
    ));

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addLog(`${agentName} 执行完成`, 'success');
    setAgents(prev => prev.map(a => 
      a.name === agentName ? { ...a, status: 'completed' as const, progress: 100, message: '✓ 已完成', lastRun: new Date().toLocaleString('zh-CN') } : a
    ));
  };

  const runAllAgents = async () => {
    setIsRunningAll(true);
    addLog('🚀 启动所有Agent...', 'info');
    
    for (const agent of agents) {
      if (agent.status !== 'completed') {
        await triggerAgent(agent.name);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    addLog('✅ 所有Agent执行完成', 'success');
    setIsRunningAll(false);
  };

  useEffect(() => {
    addLog('工作台已加载', 'info');
    addLog(`当前项目: ${selectedProject.topic}`, 'info');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a1a2e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI厂长视频工厂
                </h1>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  系统运行中
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">效率提升 10x</span>
              </div>
              <button 
                onClick={runAllAgents}
                disabled={isRunningAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunningAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {isRunningAll ? '运行中...' : '一键运行'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 统计卡片 */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Layers} label="总项目" value="2" color="purple" />
          <StatCard icon={CheckCircle2} label="已完成" value="1" color="green" />
          <StatCard icon={Clock} label="运行中" value="1" color="yellow" />
          <StatCard icon={Cpu} label="Agent数" value="5" color="cyan" />
        </section>

        {/* Agent状态 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Agent状态</h2>
            <span className="text-xs text-gray-500">点击卡片触发</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {agents.map((agent) => {
              const StatusIcon = statusIcons[agent.status];
              return (
                <div 
                  key={agent.name}
                  onClick={() => !isRunningAll && triggerAgent(agent.name)}
                  className={`group relative p-5 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-br ${statusColors[agent.status]}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <StatusIcon className={`w-5 h-5 ${agent.status === 'running' ? 'animate-spin text-yellow-400' : agent.status === 'completed' ? 'text-green-400' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium text-gray-400">{agent.progress}%</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">{agent.name}</div>
                  <div className="text-xs text-gray-400 truncate">{agent.message}</div>
                  <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${agent.status === 'completed' ? 'bg-green-500' : agent.status === 'running' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-500'}`} style={{ width: `${agent.progress}%` }} />
                  </div>
                  {agent.lastRun && <div className="text-xs text-gray-500 mt-2">{agent.lastRun}</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* 项目列表 + 详情 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 项目列表 */}
          <section className="lg:col-span-1">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">项目列表</h2>
            <div className="space-y-3">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedProject.id === project.id
                      ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm line-clamp-1">{project.topic}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{project.date}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedProject.id === project.id ? 'rotate-90 text-purple-400' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
                      project.status === 'error' ? 'bg-red-500/20 text-red-400' : 
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {statusLabels[project.status]}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{project.progress}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700/30 rounded-full h-1.5">
                    <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 详情 + 控制台 */}
          <section className="lg:col-span-2 space-y-4">
            {/* 项目详情 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedProject.topic}</h2>
                  <p className="text-sm text-gray-400 mt-1">创建于 {selectedProject.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-purple-500/20 border border-purple-500/50 rounded-xl hover:bg-purple-500/30 transition">
                    <Play className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {selectedProject.script && (
                  <DetailSection icon={FileText} title="口播稿" status="completed" color="blue">
                    <div className="text-sm text-gray-300">{selectedProject.script.wordCount} 字 · {selectedProject.script.duration} 秒</div>
                  </DetailSection>
                )}

                {selectedProject.images && (
                  <DetailSection icon={Image} title={`PPT配图 (${selectedProject.images.completed}/${selectedProject.images.count}张)`} status="completed" color="purple">
                    <div className="grid grid-cols-6 gap-2 mt-2">
                      {Array.from({ length: Math.min(selectedProject.images.count, 12) }, (_, i) => (
                        <div key={i} className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-xs font-medium border border-white/5">
                          P{i + 1}
                        </div>
                      ))}
                      {(selectedProject.images.count || 0) > 12 && (
                        <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center text-xs border border-white/5">
                          +{(selectedProject.images.count || 0) - 12}
                        </div>
                      )}
                    </div>
                  </DetailSection>
                )}

                {selectedProject.voice && (
                  <DetailSection icon={Mic} title="语音合成" status="completed" color="green">
                    <div className="text-sm text-gray-300">总时长: {selectedProject.voice.duration} 秒</div>
                  </DetailSection>
                )}
              </div>
            </div>

            {/* 控制台 */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold">控制台输出</span>
                </div>
                <span className="text-xs text-gray-500">{logs.length} 条日志</span>
              </div>
              <div className="font-mono text-sm space-y-1.5 max-h-48 overflow-y-auto pr-2">
                {logs.length === 0 ? (
                  <span className="text-gray-500 italic">等待操作...</span>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`${
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'warning' ? 'text-yellow-400' :
                      'text-cyan-300'
                    }`}>
                      <span className="text-gray-500">[{log.time}]</span> {log.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// 统计卡片
function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
  };

  return (
    <div className={`p-4 rounded-2xl border bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 opacity-80" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

// 详情区块
function DetailSection({ icon: Icon, title, color, children }: { icon: any; title: string; color: string; children: React.ReactNode }) {
  const colorClasses: Record<string, string> = {
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    green: 'border-green-500/30',
    yellow: 'border-yellow-500/30',
  };

  return (
    <div className={`border-l-2 ${colorClasses[color]} pl-4 py-1`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-sm">{title}</span>
        <CheckCircle2 className="w-4 h-4 text-green-400" />
      </div>
      {children}
    </div>
  );
}

export default App;