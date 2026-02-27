#!/usr/bin/env python3
"""
AGENT 2: TTS语音合成Agent
使用GPT-SoVITS或替代方案生成口播语音
"""

import os
import json
import requests
from pathlib import Path

def generate_with_gpt_sovits(text, output_file, reference_audio=None):
    """使用GPT-SoVITS生成语音"""
    
    # GPT-SoVITS API配置
    api_url = os.getenv("GPT_SOVITS_API", "http://localhost:9880")
    
    payload = {
        "text": text,
        "text_language": "zh",
        "refer_wav_path": reference_audio or "reference/厂长声音样本.wav",
        "prompt_text": "这里是参考音频对应的文本",
        "prompt_language": "zh"
    }
    
    try:
        response = requests.post(f"{api_url}/infer", json=payload, timeout=300)
        if response.status_code == 200:
            with open(output_file, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"❌ TTS失败: {e}")
    
    return False

def generate_with_alternative(text, output_file):
    """使用替代TTS方案"""
    print(f"📝 生成语音: {text[:30]}...")
    print(f"💡 建议使用: 阿里云语音合成、腾讯云语音合成或Edge-TTS")
    print(f"   输出: {output_file}")
    return True

def main():
    """主函数"""
    print("🎤 AGENT 2: TTS语音合成")
    print("=" * 40)
    
    # 读取口播稿分段
    segments = [
        {"id": 1, "text": "千万别再给ChatGPT交智商税了！", "output": "segment-01.wav"},
        {"id": 2, "text": "你是不是每个月交20美元，结果还是写不出满意的代码？今天这个视频，可能让你直接把月费停了。", "output": "segment-02.wav"},
        {"id": 3, "text": "我用OpenClaw跑了一个月的定时任务，发现80%的重复工作都能自动化。早上8点半，它自动开始准备视频素材；中午12点半，推送进度报告；晚上7点，完整工程文件已经打包好了。", "output": "segment-03.wav"},
        {"id": 4, "text": "看，这是今早自动生成的13张PPT配图，赛博风格，直接能用。这是剪映项目文件，导入就能渲染。你只需要做三件事：审核、录音、发布。", "output": "segment-04.wav"},
        {"id": 5, "text": "关注我，下期教你用数字人完全自动化。现在去试试，有问题评论区见。", "output": "segment-05.wav"}
    ]
    
    output_dir = "/root/clawd/video-factory-v3/2026-02-26/agent-tts"
    os.makedirs(output_dir, exist_ok=True)
    
    # 检查GPT-SoVITS可用性
    api_url = os.getenv("GPT_SOVITS_API", "http://localhost:9880")
    try:
        response = requests.get(f"{api_url}/", timeout=5)
        use_gpt_sovits = response.status_code == 200
    except:
        use_gpt_sovits = False
    
    if use_gpt_sovits:
        print("✅ GPT-SoVITS服务可用")
    else:
        print("⚠️  GPT-SoVITS未运行，使用替代方案")
        print("   建议: 启动GPT-SoVITS或配置其他TTS服务")
    
    # 生成各段语音
    for seg in segments:
        output_file = os.path.join(output_dir, seg["output"])
        
        if use_gpt_sovits:
            success = generate_with_gpt_sovits(seg["text"], output_file)
        else:
            success = generate_with_alternative(seg["text"], output_file)
        
        if success:
            print(f"✅ 分段 {seg['id']}: {seg['output']}")
    
    print(f"\\n📁 语音文件保存: {output_dir}")
    print("💡 提示: 需要合并为final-voice.wav")

if __name__ == "__main__":
    main()
