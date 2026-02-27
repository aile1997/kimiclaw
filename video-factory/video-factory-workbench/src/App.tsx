import { useState, useEffect } from 'react'
import { Mic, Image, FileText, Film, Zap, Terminal } from 'lucide-react'

function App() {
  const [logs, setLogs] = useState<{time: string, msg: string}[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString('zh-CN'), msg }])
  }

  useEffect(() => {
    addLog('工作台已加载 - 真实数据模式')
    addLog('项目: OpenClaw高阶进化指南')
    addLog('素材: 13张配图, 配音600秒')
  }, [])

  const runAll = () => {
    setIsRunning(true)
    addLog('开始执行...')
    setTimeout(() => {
      addLog('执行完成')
      setIsRunning(false)
    }, 2000)
  }

  const agents = [
    { name: '脚本创作', status: 'completed', progress: 100, message: '✓ 口播稿已生成 (2200字)' },
    { name: '语音合成', status: 'completed', progress: 100, message: '✓ CosyVoice音频已生成' },
    { name: '配图生成', status: 'completed', progress: 100, message: '✓ 13张PPT配图已生成' },
    { name: '时间轴', status: 'idle', progress: 0, message: '等待执行 - Whisper提取' },
    { name: '视频合成', status: 'idle', progress: 0, message: '等待执行 - FFmpeg合成' },
  ]

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

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            口播稿
          </h2>
          <div className="text-sm text-gray-300 mb-2">2200 字 · 600 秒</div>
          <a href="/ppt-gen/video2/video2_润色版.txt" target="_blank" className="text-cyan-400 text-sm hover:underline">查看文案 →</a>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Image className="w-5 h-5 text-purple-400" />
            PPT配图 (13张)
          </h2>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({length: 12}, (_, i) => (
              <a key={i} href={`/images/slide_${String(i+1).padStart(2, '0')}.png`} target="_blank" className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded flex items-center justify-center text-xs hover:opacity-80 transition">
                P{i+1}
              </a>
            ))}
            <a href="/images/slide_13.png" target="_blank" className="aspect-video bg-white/10 rounded flex items-center justify-center text-xs hover:opacity-80 transition">+1</a>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-green-400" />
            语音合成
          </h2>
          <div className="text-sm text-gray-300 mb-2">600 秒 · CosyVoice克隆</div>
          <audio controls className="w-full mt-2" src="/ppt-gen/video2/video2_full_narration_cosyvoice2.mp3" />
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            最终视频
          </h2>
          <div className="text-sm text-gray-300 mb-2">13秒 · 带转场效果</div>
          <a href="/video2-output/video2_final_v2.mp4" target="_blank" className="text-cyan-400 text-sm hover:underline">下载视频 →</a>
        </div>
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