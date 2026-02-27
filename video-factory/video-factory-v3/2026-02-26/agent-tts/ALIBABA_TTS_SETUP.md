# 阿里云语音合成配置

## 必需配置

### 1. 获取API Key
1. 访问 https://www.aliyun.com/product/bailian
2. 开通「语音合成」服务
3. 创建API Key
4. 复制Key到环境变量

### 2. 设置环境变量

```bash
# 临时设置
export DASHSCOPE_API_KEY=sk-xxxxx

# 永久设置 (添加到 ~/.bashrc)
echo 'export DASHSCOPE_API_KEY=sk-xxxxx' >> ~/.bashrc
source ~/.bashrc
```

### 3. 或使用.env文件

```bash
# 在视频项目目录创建.env文件
echo 'DASHSCOPE_API_KEY=sk-xxxxx' > .env
```

## 可选配置

### 自定义音色
```bash
# 使用其他系统音色
export COSYVOICE_VOICE=longshu  # 龙叔音色
export COSYVOICE_VOICE=longanyang  # 龙向阳音色

# 查看所有音色: https://help.aliyun.com/zh/model-studio/cosyvoice-voices
```

### 选择模型
```bash
# 选择模型 (默认: cosyvoice-v3-plus)
export COSYVOICE_MODEL=cosyvoice-v3-plus  # 高质量
export COSYVOICE_MODEL=cosyvoice-v3-flash  # 快速
export COSYVOICE_MODEL=cosyvoice-v2  # 兼容版
```

## 声音克隆 (复刻音色)

### 步骤1: 准备参考音频
- 录制10-20秒清晰的语音
- 保存为WAV格式，16kHz，单声道
- 文件大小不超过5MB

### 步骤2: 调用复刻API
```python
from dashscope.audio.tts_v2 import VoiceClone

# 复刻声音
voice_clone = VoiceClone()
cloned_voice = voice_clone.clone(
    audio_file="reference.wav",
    text="这是参考音频的文本内容"
)

# 使用复刻音色
export COSYVOICE_VOICE=cloned_voice_id
```

### 步骤3: 使用复刻音色生成语音
```bash
python aliyun-tts-agent.py
```

## 价格参考

| 模型 | 价格 | 特点 |
|------|------|------|
| cosyvoice-v3-flash | 免费 | 快速，基础质量 |
| cosyvoice-v3-plus | ¥0.015/千字符 | 高质量，推荐 |
| cosyvoice-v2 | ¥0.015/千字符 | 兼容性好 |

## 快速测试

```bash
# 1. 设置API Key
export DASHSCOPE_API_KEY=sk-xxxxx

# 2. 运行TTS Agent
cd agent-tts
python aliyun-tts-agent.py

# 3. 合并音频
ffmpeg -f concat -safe 0 -i <(for f in segment-*.wav; do echo "file '$f'"; done) final-voice.wav
```

## 常见问题

### Q: API Key无效？
A: 检查Key是否复制完整，是否开通了语音合成服务

### Q: 合成失败？
A: 检查网络连接，或尝试更换模型 (v3-flash -> v3-plus)

### Q: 如何克隆声音？
A: 参考 https://help.aliyun.com/zh/model-studio/cosyvoice-clone-api

---
配置时间: 2026-02-26
