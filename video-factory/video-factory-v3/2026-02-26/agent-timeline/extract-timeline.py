#!/usr/bin/env python3
"""
AGENT 4: Whisper时间轴提取Agent
提取口播时间戳，计算每页停留时间
"""

import whisper
import json
import os
from datetime import timedelta

def format_time(seconds):
    """格式化为SRT时间格式"""
    td = timedelta(seconds=seconds)
    hours, remainder = divmod(td.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    milliseconds = int(td.microseconds / 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

def format_simple_time(seconds):
    """格式化为简单时间"""
    minutes = int(seconds // 60)
    secs = int(seconds % 60)
    return f"{minutes}:{secs:02d}"

def extract_timeline(audio_file, output_dir):
    """提取完整时间轴"""
    print(f"🎤 分析音频: {audio_file}")
    
    # 加载Whisper模型
    model = whisper.load_model("base")
    
    # 转录音频
    result = model.transcribe(audio_file, language="zh", verbose=False)
    
    segments = result["segments"]
    
    # 1. 生成详细时间轴
    timeline = []
    for seg in segments:
        timeline.append({
            "id": seg["id"],
            "start": seg["start"],
            "end": seg["end"],
            "text": seg["text"].strip(),
            "duration": seg["end"] - seg["start"]
        })
    
    # 2. 生成SRT字幕
    srt_content = []
    for seg in timeline:
        srt_content.append(f"{seg['id'] + 1}")
        srt_content.append(f"{format_time(seg['start'])} --> {format_time(seg['end'])}")
        srt_content.append(seg['text'])
        srt_content.append("")
    
    srt_file = os.path.join(output_dir, "subtitles.srt")
    with open(srt_file, 'w', encoding='utf-8') as f:
        f.write('\\n'.join(srt_content))
    
    # 3. 生成页面时间映射 (根据口播稿分段)
    # Hook: 0-3s, 痛点: 3-10s, 方案: 10-40s, 演示: 40-80s, CTA: 80-90s
    page_timeline = [
        {"page": 1, "type": "hook", "start": 0, "end": 3, "duration": 3, "slide": "slide_01.png"},
        {"page": 2, "type": "pain_point", "start": 3, "end": 10, "duration": 7, "slide": "slide_02.png"},
        {"page": 3, "type": "solution", "start": 10, "end": 40, "duration": 30, "slide": "slide_03.png"},
        {"page": 4, "type": "demo", "start": 40, "end": 80, "duration": 40, "slide": "slide_04.png"},
        {"page": 5, "type": "cta", "start": 80, "end": 90, "duration": 10, "slide": "slide_05.png"}
    ]
    
    # 4. 生成带转场时间的完整时间轴
    # 转场时间: 每页之间0.5秒
    full_timeline = []
    transition_duration = 0.5
    
    current_time = 0
    for i, page in enumerate(page_timeline):
        # 页面显示时间
        full_timeline.append({
            "type": "slide",
            "page": page["page"],
            "file": page["slide"],
            "start": current_time,
            "end": current_time + page["duration"],
            "duration": page["duration"]
        })
        
        current_time += page["duration"]
        
        # 转场时间 (最后一页不需要)
        if i < len(page_timeline) - 1:
            full_timeline.append({
                "type": "transition",
                "from_page": page["page"],
                "to_page": page_timeline[i+1]["page"],
                "start": current_time,
                "end": current_time + transition_duration,
                "duration": transition_duration
            })
            current_time += transition_duration
    
    # 保存所有时间轴文件
    files = {
        "whisper-timeline.json": timeline,
        "page-timeline.json": page_timeline,
        "full-timeline.json": full_timeline
    }
    
    for filename, data in files.items():
        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ {filename}")
    
    print(f"✅ SRT字幕: {srt_file}")
    
    return {
        "total_duration": current_time,
        "pages": len(page_timeline),
        "transitions": len(page_timeline) - 1
    }

if __name__ == "__main__":
    import sys
    
    audio_file = sys.argv[1] if len(sys.argv) > 1 else "../agent-tts/final-voice.wav"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "."
    
    result = extract_timeline(audio_file, output_dir)
    
    print(f"\\n📊 分析结果:")
    print(f"  总时长: {result['total_duration']:.1f}秒")
    print(f"  页面数: {result['pages']}")
    print(f"  转场数: {result['transitions']}")
