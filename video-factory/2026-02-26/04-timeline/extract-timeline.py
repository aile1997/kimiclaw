#!/usr/bin/env python3
"""
Whisper时间戳提取 - 自动计算每页停留时间
"""

import whisper
import json
import os
from datetime import timedelta

def format_time(seconds):
    """格式化时间为SRT格式"""
    td = timedelta(seconds=seconds)
    hours, remainder = divmod(td.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    milliseconds = int(td.microseconds / 1000)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

def extract_timeline(audio_file, output_dir):
    """提取音频时间戳"""
    print(f"🎤 正在分析音频: {audio_file}")
    
    # 加载Whisper模型
    model = whisper.load_model("base")
    
    # 转录音频
    result = model.transcribe(audio_file, language="zh")
    
    # 生成详细时间轴
    segments = result["segments"]
    
    timeline = []
    for seg in segments:
        timeline.append({
            "id": seg["id"],
            "start": seg["start"],
            "end": seg["end"],
            "text": seg["text"].strip(),
            "duration": seg["end"] - seg["start"]
        })
    
    # 保存JSON
    timeline_file = os.path.join(output_dir, "timeline.json")
    with open(timeline_file, "w", encoding="utf-8") as f:
        json.dump(timeline, f, ensure_ascii=False, indent=2)
    
    # 生成SRT字幕
    srt_file = os.path.join(output_dir, "subtitles.srt")
    with open(srt_file, "w", encoding="utf-8") as f:
        for seg in timeline:
            f.write(f"{seg['id'] + 1}\\n")
            f.write(f"{format_time(seg['start'])} --> {format_time(seg['end'])}\\n")
            f.write(f"{seg['text']}\\n\\n")
    
    # 生成页面时间映射 (假设5页PPT)
    total_duration = timeline[-1]["end"] if timeline else 90
    page_duration = total_duration / 5
    
    page_timeline = []
    for i in range(5):
        start = i * page_duration
        end = (i + 1) * page_duration if i < 4 else total_duration
        page_timeline.append({
            "page": i + 1,
            "slide": f"slide_{i+1:02d}.png",
            "start_time": start,
            "end_time": end,
            "duration": end - start
        })
    
    page_file = os.path.join(output_dir, "page-timeline.json")
    with open(page_file, "w", encoding="utf-8") as f:
        json.dump(page_timeline, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 时间轴: {timeline_file}")
    print(f"✅ 字幕文件: {srt_file}")
    print(f"✅ 页面时间: {page_file}")
    
    return timeline, page_timeline

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("用法: python extract-timeline.py <audio_file.wav> [output_dir]")
        sys.exit(1)
    
    audio_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "."
    
    extract_timeline(audio_file, output_dir)
