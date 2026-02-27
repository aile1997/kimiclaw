#!/bin/bash
# 🤖 AI厂长视频工厂 - 多Agent主控脚本
# 一键启动所有Agent (阿里云TTS版本)

set -e

OUTPUT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🤖 AI厂长视频工厂 - 多Agent系统"
echo "=================================="
echo ""

# 检查依赖
echo "🔍 检查依赖..."
command -v python3 >/dev/null 2>&1 || { echo "❌ 需要Python3"; exit 1; }
command -v ffmpeg >/dev/null 2>&1 || echo "⚠️  建议安装FFmpeg"

# 检查阿里云API Key
if [ -z "$DASHSCOPE_API_KEY" ]; then
    if [ -f "$OUTPUT_DIR/.env" ]; then
        export $(cat "$OUTPUT_DIR/.env" | xargs)
    fi
fi

if [ -z "$DASHSCOPE_API_KEY" ]; then
    echo "⚠️  未设置DASHSCOPE_API_KEY"
    echo "   获取API Key: https://www.aliyun.com/product/bailian"
    echo "   设置: export DASHSCOPE_API_KEY=sk-xxxxx"
fi

echo "✅ 依赖检查完成"
echo ""

# AGENT 1: 脚本创作 (已完成)
echo "📝 AGENT 1: 脚本创作"
echo "  状态: ✅ 已完成"
echo "  文件: agent-script/script-final.md"
echo ""

# AGENT 2: 阿里云TTS语音合成
echo "🎤 AGENT 2: 阿里云CosyVoice TTS"
echo "  模型: cosyvoice-v3-plus"
echo "  音色: longanyang (可更换)"
echo "  命令: python3 agent-tts/aliyun-tts-agent.py"
echo ""

if [ -z "$DASHSCOPE_API_KEY" ]; then
    echo "❌ 跳过: 未配置API Key"
    echo "   查看: agent-tts/ALIBABA_TTS_SETUP.md"
else
    read -p "是否生成语音? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cd "$OUTPUT_DIR/agent-tts" && python3 aliyun-tts-agent.py || echo "⚠️  TTS失败"
    fi
fi
echo ""

# AGENT 3: NanoBanana配图 (并行)
echo "🎨 AGENT 3: NanoBanana配图"
echo "  命令: python3 agent-image/generate-images.py"
echo "  提示: 需要GEMINI_API_KEY环境变量"
echo ""
read -p "是否生成配图? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$OUTPUT_DIR/agent-image" && python3 generate-images.py || echo "⚠️  配图跳过"
fi
echo ""

# AGENT 4: 时间轴提取
echo "⏱️ AGENT 4: Whisper时间轴提取"
echo "  命令: python3 agent-timeline/extract-timeline.py"
echo "  需要: agent-tts/final-voice.wav"
echo ""
read -p "是否提取时间轴? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$OUTPUT_DIR/agent-timeline" && python3 extract-timeline.py || echo "⚠️  时间轴跳过"
fi
echo ""

# AGENT 5: 视频合成
echo "🎬 AGENT 5: FFmpeg视频合成"
echo "  命令: python3 agent-composer/video-composer.py"
echo ""
read -p "是否合成视频? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd "$OUTPUT_DIR/agent-composer" && python3 video-composer.py || echo "⚠️  合成跳过"
fi
echo ""

# 汇总
echo "=================================="
echo "✅ 多Agent执行完成!"
echo "=================================="
echo ""
echo "📁 输出文件:"
echo "  📝 脚本: agent-script/"
echo "  🎤 语音: agent-tts/"
echo "  🎨 图片: agent-image/"
echo "  ⏱️ 时间轴: agent-timeline/"
echo "  🎬 视频: final/"
echo ""
echo "💡 提示:"
echo "  1. 阿里云TTS需要API Key"
echo "  2. 声音克隆参考ALIBABA_TTS_SETUP.md"
echo "  3. 可以单独运行每个Agent"
echo "=================================="
