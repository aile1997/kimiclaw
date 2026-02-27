#!/usr/bin/env python3
"""
AGENT 5: FFmpeg视频合成Agent
合成完整PPT视频，包含转场
"""

import json
import os
import subprocess
from pathlib import Path

class VideoComposer:
    def __init__(self, workspace):
        self.workspace = workspace
        self.ffmpeg_cmd = "ffmpeg"
        
    def compose_full_ppt_video(
        self,
        slides_paths,
        transitions_dict=None,
        output_path='output.mp4',
        slide_duration=None,
        include_preview=False,
        preview_video_path=None,
        resolution='1080x1920',
        fps=30
    ):
        """
        合成完整PPT视频
        
        Args:
            slides_paths: PPT图片路径列表
            transitions_dict: 转场配置 {page_index: transition_type}
            output_path: 输出视频路径
            slide_duration: 每页停留时间(秒)，如果为None则使用timeine.json
            include_preview: 是否包含首页预览
            preview_video_path: 首页预览视频路径
            resolution: 输出分辨率
            fps: 帧率
        """
        
        print("🎬 开始合成视频...")
        print(f"  分辨率: {resolution}")
        print(f"  帧率: {fps}")
        print(f"  页面数: {len(slides_paths)}")
        
        # 读取时间轴
        timeline_path = os.path.join(self.workspace, "../agent-timeline/full-timeline.json")
        if os.path.exists(timeline_path) and slide_duration is None:
            with open(timeline_path, 'r') as f:
                timeline = json.load(f)
            print("  使用自动计算的时间轴")
        else:
            # 使用固定时长
            timeline = self._create_simple_timeline(slides_paths, slide_duration or 3)
        
        # 构建FFmpeg命令
        cmd = self._build_ffmpeg_command(
            timeline, slides_paths, output_path, resolution, fps
        )
        
        print(f"\\n🚀 执行: {' '.join(cmd[:10])}...")
        
        # 执行合成
        try:
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode == 0:
                print(f"✅ 视频合成完成: {output_path}")
                return True
            else:
                print(f"❌ 合成失败: {result.stderr}")
                return False
        except Exception as e:
            print(f"❌ 错误: {e}")
            return False
    
    def _create_simple_timeline(self, slides_paths, duration):
        """创建简单时间轴"""
        timeline = []
        current_time = 0
        
        for i, _ in enumerate(slides_paths):
            timeline.append({
                "type": "slide",
                "page": i + 1,
                "start": current_time,
                "end": current_time + duration,
                "duration": duration
            })
            current_time += duration
            
            if i < len(slides_paths) - 1:
                timeline.append({
                    "type": "transition",
                    "start": current_time,
                    "end": current_time + 0.5,
                    "duration": 0.5
                })
                current_time += 0.5
        
        return timeline
    
    def _build_ffmpeg_command(self, timeline, slides_paths, output_path, resolution, fps):
        """构建FFmpeg命令"""
        # 简化的FFmpeg命令
        # 实际使用时需要更复杂的filter_complex
        
        width, height = resolution.split('x')
        
        cmd = [
            self.ffmpeg_cmd,
            '-y',  # 覆盖输出文件
            '-f', 'image2pipe',
            '-framerate', str(fps),
            '-i', '-',  # 从管道输入
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p',
            '-s', resolution,
            '-r', str(fps),
            output_path
        ]
        
        return cmd
    
    def add_audio_track(self, video_path, audio_path, output_path):
        """添加音轨到视频"""
        cmd = [
            self.ffmpeg_cmd,
            '-y',
            '-i', video_path,
            '-i', audio_path,
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-shortest',
            output_path
        ]
        
        subprocess.run(cmd, check=True)
        print(f"✅ 音轨添加完成: {output_path}")

def main():
    """主函数"""
    workspace = "/root/clawd/video-factory-v3/2026-02-26/agent-composer"
    
    composer = VideoComposer(workspace)
    
    # 读取配置
    config_path = os.path.join(workspace, "composer-config.json")
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            config = json.load(f)
    else:
        # 默认配置
        config = {
            "slides_dir": "../agent-image",
            "output_file": "../final/video-final.mp4",
            "resolution": "1080x1920",
            "fps": 30
        }
    
    # 获取图片列表
    slides_dir = config.get("slides_dir", "../agent-image")
    slides_paths = sorted([
        os.path.join(slides_dir, f)
        for f in os.listdir(slides_dir)
        if f.startswith("slide_") and f.endswith(".png")
    ])
    
    if not slides_paths:
        print("❌ 未找到PPT图片")
        return
    
    print(f"🎬 AGENT 5: 视频合成")
    print("=" * 40)
    print(f"📁 图片目录: {slides_dir}")
    print(f"🖼️  图片数量: {len(slides_paths)}")
    
    # 合成视频
    success = composer.compose_full_ppt_video(
        slides_paths=slides_paths,
        output_path=config.get("output_file", "../final/video-final.mp4"),
        resolution=config.get("resolution", "1080x1920"),
        fps=config.get("fps", 30)
    )
    
    if success:
        print("\\n✅ 视频合成完成!")
    else:
        print("\\n❌ 视频合成失败")

if __name__ == "__main__":
    main()
