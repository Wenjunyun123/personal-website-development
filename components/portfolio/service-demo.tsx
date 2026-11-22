"use client";

import { useState } from "react";
import styles from "./service-demo.module.css";

export function ServiceDemo() {
  const [stage, setStage] = useState(0);
  const [tab, setTab] = useState<"tickets" | "log">("tickets");
  const status = ["待分派", "处理中", "已完成"][stage];
  const log = ["收到报障，记录已建立", ...(stage > 0 ? ["分派至 MES 业务线，开始处理"] : []), ...(stage > 1 ? ["完成处理，回写结束时间", "生成反馈入口，记录处置结果"] : [])];

  return <section className={styles.demo} aria-label="工单流程交互演示" data-demo="service-desk">
    <header className={styles.header}><span>IT service desk</span><span className={styles.demoTag}>交互演示 / 示例数据</span></header>
    <div className={styles.workspace}>
      <aside className={styles.sidebar}><span className={styles.workspaceName}>服务工作台</span><button type="button" onClick={() => setTab("tickets")} aria-pressed={tab === "tickets"}>工单处理</button><button type="button" onClick={() => setTab("log")} aria-pressed={tab === "log"}>运行日志</button><span className={styles.sidebarFoot}>受理 → 处理 → 反馈</span></aside>
      <div className={styles.content}>
        <div className={styles.title}><div><span className={styles.eyebrow}>WORKFLOW / 01</span><h2>{tab === "tickets" ? "让每个问题都有下文。" : "每一步，都可以回查。"}</h2></div><span className={styles.status} data-stage={stage}>{status}</span></div>
        {tab === "tickets" ? <>
          <div className={styles.fields}><div><span>示例工单</span><strong>MES 工位登录失败</strong></div><div><span>业务线</span><strong>生产系统 MES</strong></div><div><span>处理责任</span><strong>{stage === 0 ? "等待分派" : "MES 业务线负责人"}</strong></div></div>
          <div className={styles.table}><div className={styles.tableHeader}><span>流程节点</span><span>状态</span><span>回写内容</span></div><div><span>报障受理</span><span className={styles.complete}>已记录</span><span>问题、来源、业务线</span></div><div><span>分派与处理</span><span className={stage > 0 ? styles.complete : styles.wait}>{stage > 0 ? "已分派" : "待开始"}</span><span>负责人、当前状态</span></div><div><span>完成与反馈</span><span className={stage > 1 ? styles.complete : styles.wait}>{stage > 1 ? "已完成" : "等待处理"}</span><span>结束时间、反馈入口</span></div></div>
          <div className={styles.actions}><p role="status">{stage === 0 ? "从受理开始，试着推进这张工单。" : stage === 1 ? "处理中。完成后将回写结果并关联反馈。" : "流程闭环：处理结果、完成记录与反馈入口已关联。"}</p>{stage < 2 ? <button type="button" onClick={() => setStage(stage + 1)}>{stage === 0 ? "分派并开始处理" : "完成处理"}</button> : <button type="button" onClick={() => { setStage(0); setTab("tickets"); }}>重新体验</button>}</div>
        </> : <ol className={styles.log}>{log.map((event, index) => <li key={event}><span>0{index + 1}</span><p>{event}</p><small>已记录</small></li>)}</ol>}
      </div>
    </div>
    <footer className={styles.footer}>流程交互示意，使用示例数据。此演示不会向飞书发送消息或修改真实记录。</footer>
  </section>;
}

export function ReleasePreview() {
  return <section className={styles.demo} data-demo="release" aria-label="插件交付结构示意">
    <header className={styles.header}><span>Plugin delivery</span><span className={styles.demoTag}>交付结构示意</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>BUILD / CHECK / HANDOFF</span><h2>从一个插件，到一条交付链。</h2><p>让界面、包体与发布状态互相对得上。</p><div className={styles.platforms}>{["Adobe Express", "Canva Apps", "Office", "Safari"].map((name, i) => <div key={name}><span>0{i + 1}</span><strong>{name}</strong><small>{["界面与包体", "应用与审核", "Manifest", "Extension"][i]}</small></div>)}</div><div className={styles.releaseFlow}><span>Source</span><span>Package</span><span>Checks</span><span>Handoff</span></div><small className={styles.legend}>既有履历项目 / 展示交付范围，不表示所有包体均已正式发布</small></div>
  </section>;
}

export function ArchitecturePreview() {
  return <section className={styles.demo} data-demo="architecture" aria-label="Aily 知识与动作分层方案">
    <header className={styles.header}><span>Aily architecture review</span><span className={styles.demoTag}>架构方案</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>RETRIEVAL ≠ LIVE STATE</span><h2>让知识归知识，让状态归查询。</h2><p>对内与对外分别授权，写入由确认与回读闭环。</p><div className={styles.layers}><div><small>01 / KNOWLEDGE</small><strong>规范与技术资料</strong><span>语义检索 · 附带出处</span></div><div><small>02 / LIVE QUERIES</small><strong>工单与业务状态</strong><span>精确查询 · 按身份授权</span></div><div><small>03 / CONTROLLED ACTIONS</small><strong>受控写入与审批</strong><span>预览 → 确认 → 执行 → 回读</span></div></div><small className={styles.legend}>基于实际材料核查的架构评审 / 实施规划</small></div>
  </section>;
}

export function GatewayPreview({ zh }: { zh: boolean }) {
  const steps = zh
    ? [["01 / CHANNEL", "Udesk", "客户消息与前台展示"], ["02 / GATEWAY", "接入中间件", "鉴权、去重与日志"], ["03 / AGENT", "飞书 Aily", "知识与工具调用"], ["04 / RESPONSE", "结果回传", "正文、链接与等待提示"]]
    : [["01 / CHANNEL", "Udesk", "Messages and presentation"], ["02 / GATEWAY", "Middleware", "Verification, deduplication, logs"], ["03 / AGENT", "Feishu Aily", "Knowledge and tools"], ["04 / RESPONSE", "Delivery", "Answers, links, waiting states"]];
  return <section className={styles.demo} data-demo="gateway" aria-label={zh ? "智能客服接入结构示意" : "Customer service integration diagram"}>
    <header className={styles.header}><span>Customer service integration</span><span className={styles.demoTag}>{zh ? "结构示意 / 已脱敏" : "Illustration / anonymized"}</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>CONNECT / TRACE / DELIVER</span><h2>{zh ? "答案到达客户，才算走完链路。" : "The answer has to reach the customer."}</h2><p>{zh ? "沿每一层找证据，让接入、排障与交付对应起来。" : "Trace each layer and connect the fix to a verified release."}</p>
      <div className={styles.platforms}>{steps.map(([label, title, detail]) => <div key={label}><span>{label}</span><strong>{title}</strong><small>{detail}</small></div>)}</div>
      <div className={styles.releaseFlow}><span>{zh ? "消息进入" : "Message in"}</span><span>{zh ? "日志定位" : "Trace"}</span><span>{zh ? "修复与复测" : "Fix & retest"}</span><span>{zh ? "发布交接" : "Release"}</span></div>
      <small className={styles.legend}>{zh ? "依据实际项目材料绘制的结构示意，不包含客户数据或真实运行状态" : "Illustrated from project records; no client data or live status"}</small>
    </div>
  </section>;
}

export function KnowledgePreview({ zh }: { zh: boolean }) {
  const cards = zh
    ? [["01 / CORPUS", "889 份产品文档", "解析、去重、结构化"], ["02 / CARDS", "235 条 QA + 184 张知识卡", "型号、参数、接口、装箱、横比"], ["03 / ACCEPTANCE", "225 题 UI 验收", "平均 9.96s · P95 14.46s"]]
    : [["01 / CORPUS", "889 product documents", "Parse, dedupe, structure"], ["02 / CARDS", "235 QA + 184 cards", "Models, specs, interfaces, packing, comparison"], ["03 / ACCEPTANCE", "225 UI checks", "9.96s average · 14.46s P95"]];
  return <section className={styles.demo} data-demo="knowledge" aria-label={zh ? "产品知识工程结构示意" : "Product knowledge engineering diagram"}>
    <header className={styles.header}><span>Product knowledge</span><span className={styles.demoTag}>{zh ? "结构示意 / 已脱敏" : "Illustration / anonymized"}</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>STRUCTURE / RETRIEVE / VERIFY</span><h2>{zh ? "让型号、参数和文件都答得准。" : "Make models, specs, and files answerable."}</h2><p>{zh ? "从 889 份文档到可查询的知识卡，再把边界写进验收。" : "From 889 documents to queryable knowledge cards, with boundaries built into acceptance."}</p>
      <div className={styles.layers}>{cards.map(([label, title, detail]) => <div key={label}><small>{label}</small><strong>{title}</strong><span>{detail}</span></div>)}</div>
      <div className={styles.releaseFlow}><span>{zh ? "型号别名" : "Model aliases"}</span><span>{zh ? "固件边界" : "Firmware boundaries"}</span><span>{zh ? "文件链接" : "File links"}</span><span>{zh ? "多轮追问" : "Multi-turn follow-up"}</span></div>
      <small className={styles.legend}>{zh ? "客户项目脱敏展示；结构示意，不包含真实产品数据" : "Anonymized client delivery; structural illustration without real product data"}</small>
    </div>
  </section>;
}

export function DataMigrationPreview({ zh }: { zh: boolean }) {
  const cards = zh
    ? [["01 / MIGRATE", "9 张表 · 2,041 条记录", "38,819 个字段单元格"], ["02 / RECONCILE", "51 个公式字段 · 5 条工作流", "全量回读 0 项未解释差异"], ["03 / OPERATE", "会议看板 + 证书智能体", "121 场会议 · 189 项自动化测试"]]
    : [["01 / MIGRATE", "9 tables · 2,041 records", "38,819 field cells"], ["02 / RECONCILE", "51 formula fields · 5 workflows", "0 unexplained differences after read-back"], ["03 / OPERATE", "Meeting dashboard + certificate agent", "121 meetings · 189 automated tests"]];
  return <section className={styles.demo} data-demo="migration" aria-label={zh ? "企业数据迁移与业务看板结构示意" : "Enterprise data migration diagram"}>
    <header className={styles.header}><span>Data systems</span><span className={styles.demoTag}>{zh ? "结构示意 / 已脱敏" : "Illustration / anonymized"}</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>MIGRATE / RECONCILE / OPERATE</span><h2>{zh ? "把表格迁移成可运行的业务系统。" : "Turn spreadsheets into an operating system."}</h2><p>{zh ? "数据、看板和智能体共享同一套口径与权限。" : "Data, dashboards, and agents share one set of definitions and permissions."}</p>
      <div className={styles.layers}>{cards.map(([label, title, detail]) => <div key={label}><small>{label}</small><strong>{title}</strong><span>{detail}</span></div>)}</div>
      <div className={styles.releaseFlow}><span>{zh ? "原表口径" : "Source definitions"}</span><span>{zh ? "回读对账" : "Read-back reconciliation"}</span><span>{zh ? "权限边界" : "Permissions"}</span><span>{zh ? "交接文档" : "Handoff docs"}</span></div>
      <small className={styles.legend}>{zh ? "客户项目脱敏展示；结构示意，不包含真实业务数据" : "Anonymized client delivery; structural illustration without real business data"}</small>
    </div>
  </section>;
}

export function EvaluationPreview({ zh }: { zh: boolean }) {
  const stages = zh
    ? [["CONNECTION", "连接确认", "握手成功，还不等于已回答"], ["ANSWER", "正文首现", "识别所有回答气泡中的正文"], ["COMPLETION", "采集结束", "正文稳定或达到空闲退出条件"]]
    : [["CONNECTION", "Acknowledgement", "Connected does not mean answered"], ["ANSWER", "First answer text", "Inspect body text across answer bubbles"], ["COMPLETION", "Collection ends", "Body stability or an independent idle exit"]];
  return <section className={styles.demo} data-demo="evaluation" aria-label={zh ? "测评采集口径示意" : "Evaluation measurement diagram"}>
    <header className={styles.header}><span>Evaluation engineering</span><span className={styles.demoTag}>{zh ? "判定逻辑示意" : "Measurement illustration"}</span></header>
    <div className={styles.releaseBody}><span className={styles.eyebrow}>MEASURE THE ANSWER</span><h2>{zh ? "先确认量得对，再判断答得好。" : "Check the measurement before the model."}</h2><p>{zh ? "把连接、正文与结束分开，避免采集器制造假失败。" : "Separate connection, answer text, and completion."}</p>
      <div className={styles.layers}>{stages.map(([label, title, detail]) => <div key={label}><small>{label}</small><strong>{title}</strong><span>{detail}</span></div>)}</div>
      <small className={styles.legend}>{zh ? "修复涉及正文识别、稳定判断、等待参数与多行输入；此图不表示性能提升数据" : "The fix covers body detection, stability, timeouts, and multiline input; this is not a performance chart"}</small>
    </div>
  </section>;
}
