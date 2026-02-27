import{r as p,a as E,R as T}from"./vendor-wGySg1uH.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function d(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=d(t);fetch(t.href,a)}})();var P={exports:{}},b={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I=p,F=Symbol.for("react.element"),q=Symbol.for("react.fragment"),z=Object.prototype.hasOwnProperty,D=I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,V={key:!0,ref:!0,__self:!0,__source:!0};function $(r,n,d){var c,t={},a=null,l=null;d!==void 0&&(a=""+d),n.key!==void 0&&(a=""+n.key),n.ref!==void 0&&(l=n.ref);for(c in n)z.call(n,c)&&!V.hasOwnProperty(c)&&(t[c]=n[c]);if(r&&r.defaultProps)for(c in n=r.defaultProps,n)t[c]===void 0&&(t[c]=n[c]);return{$$typeof:F,type:r,key:a,ref:l,props:t,_owner:D.current}}b.Fragment=q;b.jsx=$;b.jsxs=$;P.exports=b;var e=P.exports,v={},L=E;v.createRoot=L.createRoot,v.hydrateRoot=L.hydrateRoot;/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(r,n)=>{const d=p.forwardRef(({color:c="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:l,className:u="",children:m,...y},j)=>p.createElement("svg",{ref:j,...Z,width:t,height:t,stroke:c,strokeWidth:l?Number(a)*24/Number(t):a,className:["lucide",`lucide-${B(r)}`,u].join(" "),...y},[...n.map(([h,g])=>p.createElement(h,g)),...Array.isArray(m)?m:[m]]));return d.displayName=`${r}`,d};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=o("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=o("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=o("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=o("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=o("Film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=o("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=o("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=o("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=o("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=o("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=o("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=o("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),M=[{id:"video2-openclaw-guide",date:"2026-02-27",topic:"《OpenClaw高阶进化指南》",status:"images",progress:60,script:{wordCount:2200,duration:600},images:{count:13,completed:13},voice:{duration:600}},{id:"video-factory-v3",date:"2026-02-26",topic:"OpenClaw自动化实战 (90秒版)",status:"completed",progress:100,script:{wordCount:228,duration:90},images:{count:5,completed:5},voice:{duration:90}}],ee=[{name:"脚本创作",status:"completed",progress:100,message:"✓ 口播稿已生成 (2200字/10分钟)",lastRun:"2026-02-25 12:11"},{name:"语音合成",status:"completed",progress:100,message:"✓ CosyVoice音频已生成",lastRun:"2026-02-25 12:15"},{name:"配图生成",status:"running",progress:100,message:"⏳ 13张配图已生成 (100%)",lastRun:"2026-02-26 21:32"},{name:"时间轴",status:"idle",progress:0,message:"等待执行"},{name:"视频合成",status:"idle",progress:0,message:"等待执行"}],se={idle:"bg-gray-500/20 border-gray-500/30",running:"bg-yellow-500/20 border-yellow-500/30",completed:"bg-green-500/20 border-green-500/30",error:"bg-red-500/20 border-red-500/30"},te={pending:"等待中",script:"脚本创作",voice:"语音合成",images:"配图生成",timeline:"时间轴",composing:"视频合成",completed:"已完成",error:"错误"},re={idle:_,running:O,completed:f,error:_};function ae(){var h,g,N,w,k,C,R,A;const[r,n]=p.useState(M[0]),[d,c]=p.useState(ee),[t,a]=p.useState([]),[l,u]=p.useState(!1),m=(s,i="info")=>{const x=new Date().toLocaleTimeString("zh-CN");a(S=>[...S,{time:x,message:s,type:i}])},y=async s=>{m(`启动 ${s}...`,"info"),c(i=>i.map(x=>x.name===s?{...x,status:"running",message:"执行中..."}:x)),await new Promise(i=>setTimeout(i,1500)),m(`${s} 执行完成`,"success"),c(i=>i.map(x=>x.name===s?{...x,status:"completed",progress:100,message:"✓ 已完成",lastRun:new Date().toLocaleString("zh-CN")}:x))},j=async()=>{u(!0),m("🚀 启动所有Agent...","info");for(const s of d)s.status!=="completed"&&(await y(s.name),await new Promise(i=>setTimeout(i,500)));m("✅ 所有Agent执行完成","success"),u(!1)};return p.useEffect(()=>{m("工作台已加载","info"),m(`当前项目: ${r.topic}`,"info")},[]),e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-cyber-dark via-[#0f0f1a] to-[#1a1a2e]",children:[e.jsx("header",{className:"sticky top-0 z-50 glass border-b border-cyber-purple/30",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 py-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-purple to-cyber-cyan flex items-center justify-center",children:e.jsx(U,{className:"w-5 h-5 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-lg font-bold bg-gradient-to-r from-cyber-purple to-cyber-cyan bg-clip-text text-transparent",children:"AI厂长视频工厂"}),e.jsx("p",{className:"text-xs text-gray-400",children:"Vite + React + Tailwind"})]})]}),e.jsx("div",{className:"flex gap-2",children:e.jsx("button",{onClick:j,disabled:l,className:"flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyber-purple to-cyber-cyan rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed",children:l?e.jsxs(e.Fragment,{children:[e.jsx(O,{className:"w-4 h-4 animate-spin"}),"运行中..."]}):e.jsxs(e.Fragment,{children:[e.jsx(X,{className:"w-4 h-4"}),"一键运行所有Agent"]})})})]})})}),e.jsxs("main",{className:"max-w-7xl mx-auto px-4 py-6",children:[e.jsxs("section",{className:"mb-6",children:[e.jsx("h2",{className:"text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider",children:"Agent状态 (点击触发)"}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-3",children:d.map(s=>{const i=re[s.status];return e.jsxs("div",{onClick:()=>!l&&y(s.name),className:`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all hover:scale-105 ${se[s.status]}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(i,{className:`w-4 h-4 ${s.status==="running"?"animate-spin":""}`}),e.jsx("span",{className:"text-sm font-medium",children:s.name})]}),e.jsx("div",{className:"text-xs text-gray-400 mb-2 truncate",children:s.message}),e.jsx("div",{className:"w-full bg-gray-700/50 rounded-full h-1.5",children:e.jsx("div",{className:"progress-bar h-1.5 rounded-full transition-all duration-500",style:{width:`${s.progress}%`}})}),s.lastRun&&e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:s.lastRun})]},s.name)})})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsxs("section",{className:"lg:col-span-1",children:[e.jsx("h2",{className:"text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider",children:"项目列表"}),e.jsx("div",{className:"space-y-3",children:M.map(s=>e.jsxs("div",{onClick:()=>n(s),className:`p-4 rounded-xl border cursor-pointer transition-all ${r.id===s.id?"bg-cyber-purple/10 border-cyber-purple":"glass hover:bg-white/10"}`,children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-medium text-sm truncate",children:s.topic}),e.jsx("div",{className:"text-xs text-gray-500",children:s.date})]}),e.jsx(J,{className:`w-4 h-4 transition-transform ${r.id===s.id?"rotate-90":""}`})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:`text-xs ${s.status==="completed"?"text-green-400":s.status==="error"?"text-red-400":"text-cyber-cyan"}`,children:te[s.status]}),e.jsxs("span",{className:"text-xs text-gray-500",children:[s.progress,"%"]})]}),e.jsx("div",{className:"mt-2 w-full bg-gray-700/50 rounded-full h-1",children:e.jsx("div",{className:"progress-bar h-1 rounded-full transition-all",style:{width:`${s.progress}%`}})})]},s.id))})]}),e.jsxs("section",{className:"lg:col-span-2 space-y-4",children:[e.jsxs("div",{className:"glass rounded-xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-bold",children:r.topic}),e.jsxs("p",{className:"text-sm text-gray-400",children:["创建于 ",r.date]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{className:"p-2 bg-cyber-purple/20 border border-cyber-purple rounded-lg hover:bg-cyber-purple/30 transition",children:e.jsx(H,{className:"w-4 h-4"})}),e.jsx("button",{className:"p-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition",children:e.jsx(Y,{className:"w-4 h-4"})})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"border-l-2 border-cyber-purple/30 pl-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(K,{className:"w-4 h-4 text-cyber-cyan"}),e.jsx("span",{className:"font-medium",children:"口播稿"}),e.jsx(f,{className:"w-4 h-4 text-green-400"})]}),e.jsxs("div",{className:"text-xs text-gray-500",children:[(h=r.script)==null?void 0:h.wordCount,"字 · ",(g=r.script)==null?void 0:g.duration,"秒"]})]}),e.jsxs("div",{className:"border-l-2 border-cyber-purple/30 pl-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(W,{className:"w-4 h-4 text-cyber-cyan"}),e.jsxs("span",{className:"font-medium",children:["PPT配图 (",(N=r.images)==null?void 0:N.completed,"/",(w=r.images)==null?void 0:w.count,"张)"]}),e.jsx(f,{className:"w-4 h-4 text-green-400"})]}),e.jsxs("div",{className:"grid grid-cols-6 gap-2",children:[Array.from({length:Math.min(((k=r.images)==null?void 0:k.count)||0,12)},(s,i)=>e.jsxs("div",{className:"aspect-video bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 rounded flex items-center justify-center text-xs",children:["P",i+1]},i)),(((C=r.images)==null?void 0:C.count)||0)>12&&e.jsxs("div",{className:"aspect-video bg-white/10 rounded flex items-center justify-center text-xs",children:["+",(((R=r.images)==null?void 0:R.count)||0)-12]})]})]}),e.jsxs("div",{className:"border-l-2 border-cyber-purple/30 pl-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(G,{className:"w-4 h-4 text-cyber-cyan"}),e.jsx("span",{className:"font-medium",children:"语音合成"}),e.jsx(f,{className:"w-4 h-4 text-green-400"})]}),e.jsxs("div",{className:"text-xs text-gray-500",children:["总时长: ",(A=r.voice)==null?void 0:A.duration,"秒"]})]})]})]}),e.jsxs("div",{className:"glass rounded-xl p-4",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx(Q,{className:"w-4 h-4 text-cyber-cyan"}),e.jsx("span",{className:"text-sm font-medium",children:"控制台输出"}),e.jsxs("span",{className:"text-xs text-gray-500 ml-auto",children:[t.length," 条日志"]})]}),e.jsx("div",{className:"font-mono text-xs space-y-1 max-h-48 overflow-y-auto",children:t.length===0?e.jsx("span",{className:"text-gray-500",children:"等待操作..."}):t.map((s,i)=>e.jsxs("div",{className:`${s.type==="error"?"text-red-400":s.type==="success"?"text-green-400":s.type==="warning"?"text-yellow-400":"text-cyber-cyan/80"}`,children:[e.jsxs("span",{className:"text-gray-500",children:["[",s.time,"]"]})," ",s.message]},i))})]})]})]})]})]})}v.createRoot(document.getElementById("root")).render(e.jsx(T.StrictMode,{children:e.jsx(ae,{})}));
//# sourceMappingURL=index-BGj1pVUj.js.map
