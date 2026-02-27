import { useState, useEffect } from 'react'
import { Mic, Image, FileText, Film, Zap, Terminal, CheckCircle2, Loader2, Clock, Layers, Cpu } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App(): any {
  const [agents, setAgents] = useState([
    { name: '脚本创作', status: 'completed', progress: 100, message: '✓ 口播稿已生成' },
    { name: '语音合成', status: 'completed', progress: 100, message: '✓ CosyVoice音频已生成' },
    { name: '配图生成', status: 'completed', progress: 100, message: '✓ 13张PPT配图已生成' },
    { name: '时间轴', status: 'idle', progress: 0, message: '等待执行' },
    { name: '视频合成', status: 'idle', progress: 0, message: '等待执行' },
  ])
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [logs, setLogs] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addLog = (msg: string): any => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('zh-CN'), msg }])
  }

  useEffect(() => {
    addLog('工作台已加载')
  }, [])

  const runAll = () => {
    setIsRunning(true)
    addLog('开始执行...')
    setTimeout(() => {
      addLog('执行完成')
      setIsRunning(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-white p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">AI厂长视频工厂</h1>
        </div>
        <button onClick={runAll} disabled={isRunning} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg disabled:opacity-50">
          {isRunning ? '执行中...' : '一键运行'}
        </button>
      </header>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {agents.map(agent => (
          <div key={agent.name} className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-sm font-medium mb-2">{agent.name}</div>
            <div className="text-xs text-gray-400 mb-2">{agent.message}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" style={{ width: `${agent.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black/40 rounded-xl p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>控制台</span>
        </div>
        <div className="font-mono text-sm space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-cyan-300">
              <span className="text-gray-500">[{log.time}]</span> {log.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App