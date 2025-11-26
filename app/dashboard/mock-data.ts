export type WeekMeta = {
  weekLabel: string;
  period: string;
  narrative: string;
  focus: string;
};

export type DistilledSignal = {
  title: string;
  summary: string;
  tags: string[];
  aiScore: number;
  humanAgreement: number;
  conviction: "낮음" | "보통" | "높음";
  riskNote: string;
  watchItems: string[];
};

export type Stage = {
  name: string;
  count: number;
  change: string;
  detail: string;
  examples: string[];
};

export type Candidate = {
  title: string;
  type: "macro" | "sector" | "portfolio" | "sentiment";
  score: number;
  human: number;
  tags: string[];
  summary: string;
  alignment: "aligned" | "misaligned";
};

export type Misalignment = {
  title: string;
  aiScore: number;
  humanScore: number;
  insight: string;
};

export type Feedback = {
  persona: string;
  verdict: "가치 있음" | "애매함" | "가치 낮음";
  note: string;
  timeAgo: string;
};

export type Experiment = {
  title: string;
  note: string;
  delta: string;
};

export const weekMeta: WeekMeta = {
  weekLabel: "Week 07",
  period: "2025-03-03 ~ 03-09",
  narrative: "미국 CPI 발표를 앞두고 변동성이 진정, 현금흐름 좋은 메가캡 중심으로 자금 회귀.",
  focus: "Noise → Filter → Signal 흐름을 실험 모드에서 안정화하고, AI·인간 평가 격차를 줄이는 것에 집중.",
};

export const distilledSignal: DistilledSignal = {
  title: "현금흐름 견조한 메가캡으로 회귀하며 변동성 하향",
  summary:
    "대형 기술주(특히 AI 인프라)와 현금흐름이 안정적인 종목으로 자금이 재집중되고 있습니다. VIX는 14 중반까지 하락했고, 채권 금리 기대치도 완만하게 내려가며 위험 선호가 재개되었습니다.",
  tags: ["macro", "equities", "ai-infra", "usd", "volatility"],
  aiScore: 0.82,
  humanAgreement: 0.74,
  conviction: "높음",
  riskNote: "3월 CPI에서 상방 서프라이즈 시 단기 조정 가능. 환율 재반등 여부 모니터링.",
  watchItems: ["CPI 발표(3/12)", "달러인덱스 103선", "NVDA 공급망 주문 동향"],
};

export const stages: Stage[] = [
  {
    name: "Raw",
    count: 146,
    change: "-12% vs 전주",
    detail: "뉴스/레포트/온체인/펀드 포트폴리오 146건 ingest",
    examples: ["TSMC 2월 매출 -11% YoY", "비트코인 ETF 일일 순유입 2.3B", "ISM 제조업 신규주문 하락"],
  },
  {
    name: "Filtered",
    count: 64,
    change: "-56%",
    detail: "중복·낮은 신뢰도 제거, 클러스터링으로 64건 남김",
    examples: ["중복 뉴스 18건 제거", "저신뢰 루머 9건 제외"],
  },
  {
    name: "Candidates",
    count: 12,
    change: "-81%",
    detail: "Score 0.62 이상 후보군 선정",
    examples: ["장단기 금리 역전 완화", "NVDA 공급망 주문 둔화"],
  },
  {
    name: "Distilled",
    count: 1,
    change: "-92%",
    detail: "매크로·미시 합성 점수 0.82로 1건 채택",
    examples: ["메가캡 현금흐름 중심 회귀"],
  },
];

export const candidates: Candidate[] = [
  {
    title: "NVDA 공급망 주문이 2분기 이후 완만해질 조짐",
    type: "sector",
    score: 0.77,
    human: 0.62,
    tags: ["semis", "ai-infra", "inventory"],
    alignment: "misaligned",
    summary: "서플라이 체인에서 H2 주문 가이던스가 완화. AI 인프라 수요는 유지되나, 재고 관리 신호가 포착됨.",
  },
  {
    title: "VIX 14선 진입, 옵션 스큐 완만해지며 리스크 프리미엄 축소",
    type: "macro",
    score: 0.74,
    human: 0.81,
    tags: ["volatility", "macro"],
    alignment: "aligned",
    summary: "CPI 발표 대기에도 변동성 매도가 이어지고 있어 시장의 단기 평온 구간이 연장되는 중.",
  },
  {
    title: "품질주로의 로테이션: 현금흐름 상위 20% 종목 상대강도 상승",
    type: "portfolio",
    score: 0.71,
    human: 0.79,
    tags: ["quality", "factor", "equities"],
    alignment: "aligned",
    summary: "유럽/미국 동시다발적으로 현금흐름·마진 상위 그룹으로 펀드 플로우가 이동.",
  },
  {
    title: "바이오테크 단기 숏커버, 뉴스 대비 과도한 레버리지 우려",
    type: "sector",
    score: 0.58,
    human: 0.27,
    tags: ["biotech", "sentiment"],
    alignment: "misaligned",
    summary: "AI는 공매도 커버링을 단기 기회로 포착했으나, 인간 평가는 근거 부족으로 낮게 부여.",
  },
];

export const misalignments: Misalignment[] = [
  {
    title: "AI 인프라 수요 둔화 vs 인간의 '과도한 우려' 판단",
    aiScore: 0.77,
    humanScore: 0.62,
    insight: "AI는 공급망 신호를 더 중요하게 반영. 인간은 메가캡 실적 가이던스로 상쇄된다고 평가.",
  },
  {
    title: "바이오 숏커버 단기 기회",
    aiScore: 0.58,
    humanScore: 0.27,
    insight: "AI는 가격 모멘텀을 기회로 인식했으나, 인간은 루머 신뢰도를 낮게 봄.",
  },
  {
    title: "VIX 하락 지속",
    aiScore: 0.74,
    humanScore: 0.81,
    insight: "인간은 변동성 축소를 더 강한 신호로 간주, AI는 이벤트 리스크를 반영해 보수적.",
  },
];

export const feedbacks: Feedback[] = [
  {
    persona: "A씨 · 거시",
    verdict: "가치 있음",
    note: "VIX와 실질금리 움직임이 일관됨. 달러 약세까지 오면 더 확신.",
    timeAgo: "10분 전",
  },
  {
    persona: "B씨 · 미시",
    verdict: "애매함",
    note: "NVDA 공급망 신호는 느리게 반영되는 경우가 많아 지켜볼 필요 있음.",
    timeAgo: "38분 전",
  },
  {
    persona: "C씨 · 퀀트",
    verdict: "가치 있음",
    note: "퀄리티 팩터 로테이션 지표가 4주 연속 상위. 모멘텀/퀄리티 교차 신호 유효.",
    timeAgo: "1시간 전",
  },
];

export const experiments: Experiment[] = [
  {
    title: "Macro 가중치 0.42 → 0.48 상향",
    note: "실험군에서 거시 이벤트 민감도를 높여 변동성 하락 구간을 더 빠르게 포착.",
    delta: "+6pp alignment",
  },
  {
    title: "클러스터 중복 제거 강화",
    note: "유사 뉴스/트윗 묶음 처리로 Raw → Filtered 감소폭 6%p 개선.",
    delta: "-18 noise",
  },
  {
    title: "인간 평가 반영 가중 0.18 → 0.22",
    note: "전주 대비 불일치 사례 2건 감소.",
    delta: "-2 misalign",
  },
];
