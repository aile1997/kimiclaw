#!/usr/bin/env python3
"""
AGENT 2: 阿里云CosyVoice TTS Agent
使用阿里云语音合成生成口播语音
支持声音克隆（复刻音色）
"""

import os
import sys
import json
import dashscope
from dashscope.audio.tts_v2 import SpeechSynthesizer, ResultCallback
from datetime import datetime
from pathlib import Path

# 配置
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY", "")
MODEL = "cosyvoice-v3-plus"  # 或 cosyvoice-v2, cosyvoice-v3-flash
VOICE = "longanyang"  # 默认音色，可替换为复刻音色

class TTSCallback(ResultCallback):
    """TTS回调处理"""
    
    def __init__(self, output_file):
        self.output_file = output_file
        self.file = None
        self.first_package = True
        
    def on_open(self):
        print(f"  🔌 连接建立，开始合成...")
        self.file = open(self.output_file, 'wb')
        
    def on_complete(self):
        print(f"  ✅ 合成完成")
        if self.file:
            self.file.close()
            
    def on_error(self, message: str):
        print(f"  ❌ 合成错误: {message}")
        
    def on_close(self):
        if self.file:
            self.file.close()
            
    def on_data(self, data: bytes) -> None:
        if self.first_package:
            print(f"  📦 收到首包音频")
            self.first_package = False
        if self.file:
            self.file.write(data)

def generate_voice(text, output_file, voice=None, model=None):
    """
    生成单段语音
    
    Args:
        text: 要合成的文本
        output_file: 输出文件路径
        voice: 音色ID（默认使用环境变量或默认值）
        model: 模型名称
    """
    if not DASHSCOPE_API_KEY:
        print("❌ 错误: 未设置DASHSCOPE_API_KEY环境变量")
        print("   获取API Key: https://help.aliyun.com/zh/model-studio/get-api-key")
        return False
    
    # 设置API Key
    dashscope.api_key = DASHSCOPE_API_KEY
    dashscope.base_websocket_api_url = 'wss://dashscope.aliyuncs.com/api-ws/v1/inference'
    
    # 使用默认或传入的参数
    use_voice = voice or VOICE
    use_model = model or MODEL
    
    try:
        # 创建合成器
        synthesizer = SpeechSynthesizer(
            model=use_model,
            voice=use_voice
        )
        
        # 调用合成
        audio = synthesizer.call(text)
        
        # 保存音频
        with open(output_file, 'wb') as f:
            f.write(audio)
            
        # 获取延迟信息
        request_id = synthesizer.get_last_request_id()
        delay = synthesizer.get_first_package_delay()
        
        print(f"  📊 请求ID: {request_id}")
        print(f"  ⏱️  首包延迟: {delay}ms")
        
        return True
        
    except Exception as e:
        print(f"  ❌ 合成失败: {e}")
        return False

def generate_voice_streaming(text, output_file, voice=None, model=None):
    """
    使用流式合成（适合长文本）
    """
    if not DASHSCOPE_API_KEY:
        print("❌ 错误: 未设置DASHSCOPE_API_KEY环境变量")
        return False
    
    dashscope.api_key = DASHSCOPE_API_KEY
    dashscope.base_websocket_api_url = 'wss://dashscope.aliyuncs.com/api-ws/v1/inference'
    
    use_voice = voice or VOICE
    use_model = model or MODEL
    
    callback = TTSCallback(output_file)
    
    try:
        synthesizer = SpeechSynthesizer(
            model=use_model,
            voice=use_voice,
            callback=callback
        )
        
        synthesizer.call(text)
        return True
        
    except Exception as e:
        print(f"  ❌ 合成失败: {e}")
        return False

def clone_voice(reference_audio, reference_text, output_voice_id):
    """
    声音克隆 - 复刻音色
    
    Args:
        reference_audio: 参考音频文件路径（10-20秒）
        reference_text: 参考音频对应的文本
        output_voice_id: 输出的音色ID
    """
    print("🎤 声音克隆功能")
    print("=" * 40)
    print("使用阿里云CosyVoice声音复刻API")
    print("参考: https://help.aliyun.com/zh/model-studio/cosyvoice-clone-api")
    print("")
    print("步骤:")
    print("1. 准备10-20秒参考音频")
    print("2. 调用声音复刻API")
    print("3. 获取复刻音色ID")
    print("4. 使用复刻音色进行TTS")
    print("")
    print(f"参考音频: {reference_audio}")
    print(f"参考文本: {reference_text}")
    print(f"输出音色: {output_voice_id}")
    
    # 这里需要调用声音复刻API
    # 实际实现需要额外的API调用
    
    return True

def main():
    """主函数 - 生成口播语音"""
    
    print("🎤 AGENT 2: 阿里云CosyVoice TTS")
    print("=" * 40)
    
    # 检查API Key
    if not DASHSCOPE_API_KEY:
        print("❌ 未设置DASHSCOPE_API_KEY环境变量")
        print("")
        print("获取API Key:")
        print("1. 访问 https://www.aliyun.com/product/bailian")
        print("2. 开通语音合成服务")
        print("3. 创建API Key")
        print("4. 设置环境变量: export DASHSCOPE_API_KEY=sk-xxxxx")
        print("")
        print("💡 或使用.env文件:")
        print("   echo 'DASHSCOPE_API_KEY=sk-xxxxx' > .env")
        sys.exit(1)
    
    # 输出目录
    output_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 口播稿分段
    segments = [
        {
            "id": 1,
            "name": "Hook",
            "text": "千万别再给ChatGPT交智商税了！",
            "output": "segment-01.wav",
            "emotion": "强调"
        },
        {
            "id": 2,
            "name": "痛点",
            "text": "你是不是每个月交20美元，结果还是写不出满意的代码？今天这个视频，可能让你直接把月费停了。",
            "output": "segment-02.wav",
            "emotion": "疑问"
        },
        {
            "id": 3,
            "name": "方案",
            "text": "我用OpenClaw跑了一个月的定时任务，发现80%的重复工作都能自动化。早上8点半，它自动开始准备视频素材；中午12点半，推送进度报告；晚上7点，完整工程文件已经打包好了。",
            "output": "segment-03.wav",
            "emotion": "陈述"
        },
        {
            "id": 4,
            "name": "演示",
            "text": "看，这是今早自动生成的13张PPT配图，赛博风格，直接能用。这是剪映项目文件，导入就能渲染。你只需要做三件事：审核、录音、发布。",
            "output": "segment-04.wav",
            "emotion": "展示"
        },
        {
            "id": 5,
            "name": "CTA",
            "text": "关注我，下期教你用数字人完全自动化。现在去试试，有问题评论区见。",
            "output": "segment-05.wav",
            "emotion": "号召"
        }
    ]
    
    print(f"📝 共 {len(segments)} 段口播")
    print(f"🎙️  音色: {VOICE}")
    print(f"🤖 模型: {MODEL}")
    print("")
    
    # 生成各段语音
    success_count = 0
    for seg in segments:
        output_file = os.path.join(output_dir, seg["output"])
        
        print(f"[{seg['id']}/{len(segments)}] {seg['name']} ({seg['emotion']})")
        print(f"  文本: {seg['text'][:40]}...")
        
        if generate_voice(seg["text"], output_file):
            success_count += 1
            print(f"  ✅ 已保存: {seg['output']}")
        else:
            print(f"  ❌ 生成失败")
        
        print("")
    
    # 汇总
    print("=" * 40)
    print(f"✅ 成功: {success_count}/{len(segments)} 段")
    print(f"📁 输出目录: {output_dir}")
    print("")
    
    # 生成合并脚本
    merge_script = os.path.join(output_dir, "merge-audio.sh")
    with open(merge_script, 'w') as f:
        f.write("#!/bash\\n")
        f.write("# 合并所有音频片段\\n\\n")
        f.write("ffmpeg -i segment-01.wav -i segment-02.wav -i segment-03.wav -i segment-04.wav -i segment-05.wav \\\\\n")
        f.write("  -filter_complex '[0:a][1:a][2:a][3:a][4:a]concat=n=5:v=0:a=1[out]' \\\\\n")
        f.write("  -map '[out]' final-voice.wav\\n")
    
    os.chmod(merge_script, 0o755)
    
    print("💡 合并音频:")
    print(f"   ./{merge_script}")
    print("   或: ffmpeg -f concat -i <(echo -e ...) final-voice.wav")

if __name__ == "__main__":
    main()
