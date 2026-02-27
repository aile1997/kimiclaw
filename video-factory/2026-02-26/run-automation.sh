#!/bin/bash
# 视频工厂自动化执行脚本

echo "🎬 开始自动化视频制作..."
echo "======================="

# 步骤1: GPT-SoVITS语音合成
echo ""
echo "🎤 步骤1: 语音合成 (需要GPT-SoVITS服务运行)..."
echo "请确保: http://localhost:9880 可访问"
echo "参考: https://github.com/RVC-Boss/GPT-SoVITS"

# 步骤2: Whisper时间戳提取
echo ""
echo "⏱️ 步骤2: 提取时间戳..."
echo "运行: python3 04-timeline/extract-timeline.py 02-audio/final-mix.wav 04-timeline/"

# 步骤3: NanoBanana配图生成
echo ""
echo "🎨 步骤3: 配图生成..."
echo "访问: https://nanobana.google"
echo "使用: 03-images/nanobanana-prompts.txt 中的提示词"

# 步骤4: 剪映导入
echo ""
echo "🎬 步骤4: 导入剪映..."
echo "打开: 05-final/jianying-auto.json"

echo ""
echo "======================="
echo "✅ 自动化流程准备完成!"
