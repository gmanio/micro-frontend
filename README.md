# micro-frontend

AI 에이전트와 사람이 같은 규칙으로 확장할 수 있도록 맞춘 **Next.js Multi-Zones** 모노레포입니다.  
표면(zone)은 URL path 단위로 분리하고, 통합은 home rewrite · 공유 UI · ADR/plans로 고정합니다.

이 구조는 Module Federation처럼 런타임에 위젯을 합성하는 방식이 아닙니다. **경로 단위로 앱을 붙이고 교체하는** 마이크로 프론트엔드입니다.

## AI 기반 개발에 맞춘 이유

에이전트는 문맥 창이 유한하고, 암묵적 합의를 잘 모릅니다. 그래서 “찾기 쉬운 경계 + 문서화된 계약”이 생산성을 좌우합니다.

| 설계 | AI에 유리한 점 |
|------|----------------|
| **Zone = path 경계** | 작업 범위를 `apps/<zone>`으로 한정하기 쉽고, 병렬 에이전트가 서로 다른 표면을 건드려도 충돌이 적음 |
| **통합 계약이 얇음** | path · `assetPrefix` · home `rewrites` · 교차 zone은 `<a>` — 공유할 런타임 계약이 거의 없어 환각·오결합 여지가 작음 |
| **Plan-first** | `plans/`에 날짜별 플랜을 쌓고, 구현·완료 상태를 남김 → 세션이 바뀌어도 목표와 잔여 작업을 복원 가능 |
| **ADR** | “왜 이렇게 됐는지”가 `docs/adr/`에 남아, 에이전트가 과거 결정을 뒤집지 않고 확장 |
| **Cursor rules / `AGENTS.md`** | 루트 위생·zone 체크리스트·읽기 순서가 항상 주입되어 스타일·아키텍처 일관성 유지 |
| **공유 UI 단일 소스** | `@repo/ui`(Tailwind + shadcn)로 토큰·컴포넌트 계약을 한곳에 모아 zone 간 UI 드리프트 감소 |

**문서 읽기 순서 (에이전트·기여자 공통):** 활성 plan → [ADRs](docs/adr/README.md) → [GUIDE](docs/GUIDE.md) / [AGENTS](AGENTS.md) → `.cursor/rules/`

## 마이크로 프론트엔드 기준

| 기준 | 이 레포의 선택 |
|------|----------------|
| 독립 빌드·배포 | zone(`apps/*`)별 Next 앱. path·포트·`assetPrefix` 분리 |
| 단일 진입점 | `apps/home`이 사용자 도메인(`:3000`)에서 나머지로 rewrite |
| 공유 디자인 | `@repo/ui` — zone 공용. 배포용 패키지는 `@dndproperty/betterliving-ui` |
| 내비 | zone 안: Next soft nav. zone 사이: hard link (`<a>`만) |
| 확장 단위 | 새 제품 표면 ≈ 새 zone (path + rewrite + ADR) |
| 비목표 | 같은 문서에서 타 앱 컴포넌트를 런타임 합성 (Federation 등은 범위 밖 — ADR [0001](docs/adr/0001-multi-zones.md)) |

### 확장할 때

1. `plans/`에 dated plan 추가  
2. `apps/<name>` — routes under `app/<name>`, `assetPrefix: '/<name>-static'`  
3. home `rewrites` + `serverActions.allowedOrigins`  
4. 교차 zone 링크는 `<a>`  
5. 구조 변경이면 ADR + 인덱스 갱신  

세부 절차: [GUIDE — Adding a Next.js zone](docs/GUIDE.md).

### 마이그레이션 적합도

경로 단위 **점진 흡수(strangler)** 에 맞습니다. 레거시를 path에 두고 zone으로 잘라 교체·롤백(rewrite만 되돌리기)하기 쉽습니다.  
같은 URL 안에서 위젯 단위로 섞는 용도에는 맞지 않습니다.

## Quick start

```bash
# once: brew install mkcert && mkcert -install
pnpm install
pnpm --filter @repo/storybook build:storybook
pnpm dev
```

로컬 Next는 HTTPS(`--experimental-https`) — ADR [0012](docs/adr/0012-https-local-next-dev.md).

| URL | Zone |
|-----|------|
| https://localhost:3000 | Home (라우터) |
| https://localhost:3000/passport | Passport |
| https://localhost:3000/storybook/ | Storybook (로컬 Vite HMR — ADR [0013](docs/adr/0013-storybook-zone-hmr-dev.md)) |

## Structure

```text
plans/                   # dated plans (append-only)
apps/home                # :3000 — domain router
apps/passport            # :3100 — /passport
apps/storybook           # :6006 static + :6007 Vite HMR — /storybook
packages/ui              # @repo/ui — zone shared UI
packages/betterliving-ui # @dndproperty/betterliving-ui — publishable UI
docs/adr/                # architecture decisions
```
