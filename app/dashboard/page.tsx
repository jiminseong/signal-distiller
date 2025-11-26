import { Fragment } from "react";
import {
  candidates,
  distilledSignal,
  experiments,
  feedbacks,
  misalignments,
  stages,
  weekMeta,
} from "./mock-data";

function ScoreBar({ label, value, tone }: { label: string; value: number; tone?: "accent" | "muted" }) {
  const percent = Math.round(value * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{label}</span>
        <span className="font-mono text-xs text-white">{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-panelAlt/60">
        <div
          className={`h-full rounded-full ${tone === "accent" ? "bg-[linear-gradient(90deg,_#7bf0c1,_#6dd5ff)]" : "bg-white/40"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="tag text-xs">
          {tag}
        </span>
      ))}
    </div>
  );
}

function StageBadge({ name }: { name: string }) {
  const palettes: Record<string, string> = {
    Raw: "from-slate-800/80 to-slate-900/80",
    Filtered: "from-indigo-900/60 to-slate-900/70",
    Candidates: "from-sky-900/70 to-indigo-900/60",
    Distilled: "from-[#7bf0c1]/20 to-[#6dd5ff]/20",
  };

  return (
    <div
      className={`rounded-full border border-white/5 px-4 py-2 text-sm font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)] bg-gradient-to-r ${palettes[name] ?? "from-slate-900/60 to-slate-900/60"}`}
    >
      {name}
    </div>
  );
}

function CandidatePill({ type }: { type: string }) {
  const typeStyle: Record<string, string> = {
    macro: "text-emerald-200 bg-emerald-400/10 border-emerald-400/30",
    sector: "text-sky-200 bg-sky-400/10 border-sky-400/30",
    portfolio: "text-amber-200 bg-amber-400/10 border-amber-400/40",
    sentiment: "text-fuchsia-200 bg-fuchsia-400/10 border-fuchsia-400/30",
  };
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-tight ${typeStyle[type] ?? "text-white"}`}
    >
      {type}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-muted">Signal Distiller Lab · Mock 데이터 퍼블리싱</p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Noise → Filter → Signal</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-white/85">{weekMeta.narrative}</p>
        </div>
        <div className="flex gap-3">
          <button className="shine rounded-full bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
            Export snapshot
          </button>
          <button className="rounded-full bg-[linear-gradient(120deg,_#7bf0c1,_#6dd5ff)] px-5 py-2 text-sm font-semibold text-slate-900 shadow-glow">
            Mock distill run
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel lg:col-span-2 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <StageBadge name="Distilled" />
            <div className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white">{weekMeta.weekLabel}</div>
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs">{weekMeta.period}</div>
          </div>
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{distilledSignal.title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-white/85">{distilledSignal.summary}</p>
          <div className="mt-4">
            <TagRow tags={distilledSignal.tags} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ScoreBar label="AI 합성 Score" value={distilledSignal.aiScore} tone="accent" />
            <ScoreBar label="인간 평가 동의율" value={distilledSignal.humanAgreement} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="panel-ghost p-4">
              <p className="text-xs font-semibold text-muted">Conviction</p>
              <p className="mt-2 text-lg font-semibold text-white">{distilledSignal.conviction}</p>
              <p className="text-sm leading-relaxed text-white/80">리스크 노트: {distilledSignal.riskNote}</p>
            </div>
            <div className="panel-ghost p-4">
              <p className="text-xs font-semibold text-muted">Watch</p>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85">
                {distilledSignal.watchItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel-ghost p-4">
              <p className="text-xs font-semibold text-muted">이번 주 포커스</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{weekMeta.focus}</p>
            </div>
          </div>
        </div>

        <div className="panel p-6 sm:p-7 space-y-5">
          <div>
            <p className="text-xs font-semibold text-muted">Quick metrics</p>
            <h3 className="mt-2 text-xl font-semibold">Pipeline snapshot</h3>
          </div>
          <div className="space-y-4">
            {stages.map((stage) => (
              <div key={stage.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">{stage.name}</p>
                  <p className="text-2xl font-semibold text-white">{stage.count}</p>
                </div>
                <div className="text-sm text-accent">{stage.change}</div>
              </div>
            ))}
          </div>
          <div className="glow-separator" />
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide text-muted">이번 주 실험</p>
            {experiments.map((exp) => (
              <div key={exp.title} className="panel-ghost p-3">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{exp.title}</span>
                  <span className="text-accent">{exp.delta}</span>
                </div>
                <p className="mt-1 text-sm text-white/80">{exp.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-muted">Flow</p>
            <h3 className="text-xl font-semibold">증류 플로우 단계</h3>
            <p className="text-sm leading-relaxed text-white/80">Raw → Filtered → Candidates → Distilled 줄어드는 과정을 숫자와 예시로 노출</p>
          </div>
          <div className="flex gap-2 text-xs text-muted">
            <span className="rounded-full border border-white/10 px-3 py-1">Score threshold 0.62</span>
            <span className="rounded-full border border-white/10 px-3 py-1">클러스터 dedup on</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {stages.map((stage, idx) => (
            <Fragment key={stage.name}>
              <div className="panel-ghost relative h-full p-4">
                <div className="flex items-center justify-between">
                  <StageBadge name={stage.name} />
                  <div className="text-sm font-mono text-white">{stage.count}</div>
                </div>
                <p className="mt-2 text-xs font-semibold text-muted">{stage.change}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{stage.detail}</p>
                <div className="mt-3 space-y-1 text-xs leading-relaxed text-white/80">
                  {stage.examples.map((example) => (
                    <div key={example} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
              {idx < stages.length - 1 && (
                <div className="hidden items-center justify-center md:flex">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel p-6 sm:p-7 lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-muted">Candidates</p>
              <h3 className="text-xl font-semibold">상위 후보 신호</h3>
              <p className="text-sm leading-relaxed text-white/80">Score 상위 후보군을 미시/거시 관점으로 정렬</p>
            </div>
            <div className="flex gap-2 text-xs text-muted">
              <span className="rounded-full border border-white/10 px-3 py-1">AI Score ≥ 0.62</span>
              <span className="rounded-full border border-white/10 px-3 py-1">인간 평가 병렬</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {candidates.map((candidate) => (
              <div
                key={candidate.title}
                className="panel-ghost flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CandidatePill type={candidate.type} />
                    <p className="text-base font-semibold text-white">{candidate.title}</p>
                <span
                  className={`rounded-full border px-2 py-1 text-xs font-semibold ${
                    candidate.alignment === "aligned"
                      ? "border-emerald-400/50 text-emerald-200"
                      : "border-amber-300/40 text-amber-200"
                  }`}
                >
                  {candidate.alignment === "aligned" ? "AI=Human" : "불일치"}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/80">{candidate.summary}</p>
              <TagRow tags={candidate.tags} />
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-52">
              <ScoreBar label="AI" value={candidate.score} tone="accent" />
              <ScoreBar label="Human" value={candidate.human} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6 sm:p-7 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted">AI vs Human</p>
            <h3 className="text-xl font-semibold">불일치 사례</h3>
          </div>
          <div className="space-y-3">
            {misalignments.map((item) => (
              <div key={item.title} className="panel-ghost p-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-white/5 px-2 py-1 font-mono">AI {Math.round(item.aiScore * 100)}%</span>
                  <span className="rounded-full bg-white/5 px-2 py-1 font-mono">Human {Math.round(item.humanScore * 100)}%</span>
                  <span className="text-amber-200">gap {Math.round((item.aiScore - item.humanScore) * 100)}pp</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{item.insight}</p>
              </div>
            ))}
          </div>
          <div className="glow-separator" />
          <div>
            <p className="text-xs font-semibold text-muted">Feedback</p>
            <h3 className="text-lg font-semibold">인간 평가 로그</h3>
          </div>
          <div className="space-y-3">
            {feedbacks.map((feedback) => (
              <div key={feedback.persona} className="panel-ghost flex items-start justify-between gap-3 p-3">
                <div>
                  <p className="text-sm font-semibold text-white">{feedback.persona}</p>
                  <p className="text-xs text-muted">{feedback.timeAgo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{feedback.note}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    feedback.verdict === "가치 있음"
                      ? "bg-emerald-400/10 text-emerald-200"
                      : feedback.verdict === "애매함"
                        ? "bg-amber-400/10 text-amber-100"
                        : "bg-rose-400/10 text-rose-200"
                  }`}
                >
                  {feedback.verdict}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="pb-10 pt-4 text-sm text-muted">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Mock 데이터 기반 퍼블리싱 전용 뷰입니다.</span>
          <span className="text-xs font-mono">Week snapshot · Last refresh: 실험 모드</span>
        </div>
      </footer>
    </main>
  );
}
