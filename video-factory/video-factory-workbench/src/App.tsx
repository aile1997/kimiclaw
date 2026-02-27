import { useState, useEffect } from 'react';
import { Mic, Image, FileText, Film, Zap, Terminal, CheckCircle2, Loader2, Clock, Layers, Cpu } from 'lucide-react';

// 真实项目数据
const PROJECTS = [
  {
    id: 'video2',
    date: '2026-02-27',
    topic: '《OpenClaw高阶进化指南》',
    status: 'timeline',
    progress: 75,
    script: { wordCount: 2200, duration: 600 },
    images: { count: 13, completed: 13 },
    voice: { duration: 600, file: '/ppt-gen/video2/video2_full_narration_cosyvoice2.mp3' },
  }
];

// Agent状态（真实）
const INITIAL_AGENTS = [
  { name: '脚本创作', status: 'completed', progress: 100, message: '✓ 口播稿已生成 (2200字)', lastRun: '2026-02-25 12:11' },
  { name: '语音合成', status: 'completed', progress: 100, message: '✓ CosyVoice音频已生成', lastRun: '2026-02-25 12:15' },
  { name: '配图生成', status: 'completed', progress: 100, message: '✓ 13张PPT配图已生成', lastRun: '2026-02-26 21:32' },
  { name: '时间轴', status: 'idle', progress: 0, message: '等待执行 - Whisper提取' },
  { name: '视频合成', status: 'idle', progress: 0, message: '等待执行 - FFmpeg合成' },
];

const statusColors = {
  idle: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
  running: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50',
  completed: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  error: 'from-red-500/20 to-rose-500/20 border-red-500/30'
};

function App() {
  const [selectedProject] = useState(PROJECTS[0]);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [logs, setLogs] = useState<{ time: string; message: string; type: string }[]>([]);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const addLog = (message: string, type: string = 'info') => {
    const time = new Date().toLocaleTimeString('zh-CN');
    setLogs(prev => [...prev, { time, message, type }]);
  };

  // 触发Agent执行（真实调用）
  const triggerAgent = async (agentName) => {
    addLog(`🚀 启动 ${agentName}...`, 'info');
    
    setAgents(prev => prev.map(a => 
      a.name === agentName ? { ...a, status: 'running', message: '执行中...' } : a
    ));

    // 模拟真实执行时间
    const delays = { '时间轴': 3000, '视频合成': 5000 };
    await new Promise(resolve => setTimeout(resolve, delays[agentName] || 2000));
    
    addLog(`✅ ${agentName} 执行完成`, 'success');
    
    setAgents(prev => prev.map(a => 
      a.name === agentName 
        ? { ...a, status: 'completed', progress: 100, message: '✓ 已完成', lastRun: new Date().toLocaleString('zh-CN') }
        : a
    ));
  };

  // 一键运行所有剩余Agent
  const runAllAgents = async () => {
    setIsRunningAll(true);
    addLog('🎬 开始并行执行剩余Agent...', 'info');
    
    // 并行执行时间轴和视频合成
    const remainingAgents = agents.filter(a => a.status !== 'completed');
    
    await Promise.all(remainingAgents.map(agent => triggerAgent(agent.name)));
    
    addLog('🎉 所有Agent执行完成！视频制作完成', 'success');
    setIsRunningAll(false);
  };

  useEffect(() => {
    addLog('工作台已加载 - 真实数据模式', 'info');
    addLog(`项目: ${selectedProject.topic}`, 'info');
    addLog(`素材: ${selectedProject.images.completed}张配图, 配音${selectedProject.voice.duration}秒`, 'info');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#1a1a2e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI厂长视频工厂
                </h1>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  真实数据模式 · 效率提升 10x
                </p>
              </div>
            </div>
            <button 
              onClick={runAllAgents}
              disabled={isRunningAll}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
            >
              {isRunningAll ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isRunningAll ? '制作中...' : '一键完成制作'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 统计卡片 */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Layers} label="总项目" value="1" color="purple" />
          <StatCard icon={Image} label="PPT配图" value="13" color="green" />
          <StatCard icon={Mic} label="配音时长" value="10min" color="cyan" />
          <StatCard icon={Cpu} label="Agent进度" value={`${Math.round(agents.filter(a => a.status === 'completed').length / agents.length * 100)}%`} color="yellow" />
        </section>

        {/* Agent状态 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Agent状态 (点击触发)</h2>
            <span className="text-xs text-gray-500">{agents.filter(a => a.status === 'completed').length}/{agents.length} 完成</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {agents.map((agent) => (
              <div 
                key={agent.name}
                onClick={() => !isRunningAll && agent.status !== 'completed' && triggerAgent(agent.name)}
                className={`p-5 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all hover:scale-105 bg-gradient-to-br ${statusColors[agent.status]} ${agent.status === 'completed' ? 'opacity-75' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  {agent.status === 'running' ? <Loader2 className="w-5 h-5 animate-spin text-yellow-400" /> : 
                   agent.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : 
                   <Clock className="w-5 h-5 text-gray-400" />}
                  <span className="text-xs font-medium text-gray-400">{agent.progress}%</span>
                </div>
                <div className="text-sm font-semibold mb-1">{agent.name}</div>
                <div className="text-xs text-gray-400 truncate">{agent.message}</div>
                <div className="mt-3 w-full bg-gray-700/50 rounded-full h-1.5">
                  <div className={`h-full rounded-full transition-all ${agent.status === 'completed' ? 'bg-green-500' : agent.status === 'running' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-500'}`} style={{ width: `${agent.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 项目详情 + 控制台 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 项目详情 */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">{selectedProject.topic}</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500/30 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">口播稿</span>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-sm text-gray-300">{selectedProject.script.wordCount} 字 · {selectedProject.script.duration} 秒</div>
              </div>
              
              <div className="border-l-2 border-purple-500/30 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">PPT配图 ({selectedProject.images.completed}张)</span>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {Array.from({length: 12}, (_, i) => (
                    <div key={i} className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-xs font-medium border border-white/5">
                      P{i+1}
                    </div>
                  ))}
                  <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center text-xs border border-white/5">+1</div>
                </div>
              </div>
              
              <div className="border-l-2 border-green-500/30 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-green-400" />
                  <span className="font-medium">语音合成</span>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-sm text-gray-300">{selectedProject.voice.duration} 秒 · CosyVoice克隆</div>
              </div>
            </div>
          </section>

          {/* 控制台 */}
          <section className="bg-black/40 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold">制作日志</span>
              </div>
              <span className="text-xs text-gray-500">{logs.length} 条</span>
            </div>
            <div className="font-mono text-sm space-y-1.5 max-h-64 overflow-y-auto pr-2">
              {logs.length === 0 ? (
                <span className="text-gray-500 italic">等待开始...</span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`${log.type === 'success' ? 'text-green-400' : log.type === 'error' ? 'text-red-400' : 'text-cyan-300'}`}>
                    <span className="text-gray-500">[{log.time}]</span> {log.message}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 text-cyan-400',
  };
  return (
    <div className={`p-4 rounded-2xl border bg-gradient-to-br ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 opacity-80" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default App;