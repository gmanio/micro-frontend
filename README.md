# 따로또같이

**따로** 만들고, **같이** 붙인다.

AI·사람·팀이 영역을 나눠 확장해도 한 제품으로 자연스럽게 합쳐지도록, 프론트엔드를 **Next.js Multi-Zones** 기반으로 재편한다. 도메인별로 독립 배포·독립 빌드가 가능하고(`따로`), 단일 도메인·공유 UI·문서화된 결정으로 통합 비용을 낮춘다(`같이`).

## 왜 이 구조인가

| 원칙 | 의미 |
|------|------|
| 따로 | zone(`apps/*`)은 경로·빌드·배포가 분리되어 AI/팀이 병렬로 확장하기 쉽다 |
| 같이 | `apps/home` rewrites + `@repo/ui` + ADR/plans로 통합 규칙이 한곳에 모인다 |
| 유연한 확장 | 새 표면은 zone 추가 = path + `assetPrefix` + rewrite (모듈 연동 지옥트 최소화) |
| 통합 마찰 감소 | 교차 zone은 hard link(`<a>`), 공유 컴포넌트는 shadcn/Tailwind 단일 소스 |

설계·결정 이력은 [ADRs](docs/adr/README.md), 작업 단위는 [Plans](plans/README.md), 운영은 [GUIDE](docs/GUIDE.md) / [AGENTS](AGENTS.md).

## 기존 React / Next.js 마이그레이션에 적합한가?

**결론: path 단위로 쪼개 옮기는 점진 마이그레이션에 최적화되어 있다.** 한 페이지 안에서 앱을 섞는 런타임 federation용은 아니다.

| 출발점 | 적합도 | 이유 |
|--------|--------|------|
| **기존 Next.js 앱** | 높음 | 공식 Multi-Zones 패턴. 경로 묶음(` /passport` 등)을 zone으로 분리 → `assetPrefix` + home `rewrites`만으로 같은 도메인에 편입. 앱 전체를 한 번에 재작성할 필요 없음 |
| **기존 React(SPA/CRA/Vite) 앱** | 중~높음 | zone은 Next가 아니어도 됨([docs](https://nextjs.org/docs/app/guides/multi-zones): 다른 프레임워크 허용). SPA를 path에 올린 뒤 home rewrite로 붙이고, 이후 Next zone으로 교체 가능 |
| **모놀리스를 도메인별로 쪼개기** | 높음 | `따로` 배포·`같이` 도메인. 팀/AI가 legacy·신규를 병렬로 가져가기 좋음 |
| **같은 URL에서 위젯 단위 합성** | 낮음 | zone 간은 hard navigation. Module Federation·임베드가 맞음 (ADR [0001](docs/adr/0001-multi-zones.md)에서 의도적으로 제외) |

### 마이그레이션에 유리한 점

- **Strangler 패턴**: 레거시를 catch-all(home) 또는 특정 path에 두고, 기능 단위로 zone을 잘라 교체
- **계약이 단순함**: 통합 포인트 ≈ URL path + rewrite + (선택) `@repo/ui` — 공유 번들 런타임 계약이 거의 없음
- **Next 앱 이관 비용이 작음**: 이미 App/Pages Router면 zone 설정 추가가 핵심 작업
- **롤백 용이**: zone 단위로 rewrite만 되돌리면 됨

### 한계 (알고 쓸 것)

- zone 경계 이동은 full page load (soft nav는 zone 내부만)
- 쿠키·인증·디자인 토큰은 zone 간 합의가 필요 (`@repo/ui`·ADR로 관리)
- React SPA는 “바로 Next가 되는” 것이 아니라 **먼저 path로 붙인 뒤** Next로 재작성하는 2단계가 현실적

정리하면, **기존 웹앱을 경로 기준으로 흡수·교체하는 아키텍처로는 맞고**, **컴포넌트 마이크로 프론트 합성용으로는 비추천**이다.

## Quick start

```bash
# once: brew install mkcert && mkcert -install
pnpm install
pnpm --filter @repo/storybook build:storybook
pnpm dev
```

Local Next apps use HTTPS (`--experimental-https`) — ADR [0012](docs/adr/0012-https-local-next-dev.md).

| URL | Zone |
|-----|------|
| https://localhost:3000 | Home (라우터) |
| https://localhost:3000/passport | Passport |
| https://localhost:3000/storybook/ | Storybook (local HMR via Vite — ADR [0013](docs/adr/0013-storybook-zone-hmr-dev.md)) |

## Structure

```text
plans/             # 날짜·시간 플랜 (append-only)
apps/home          # :3000  — 도메인 라우터 (같이)
apps/passport      # :3100  — /passport (따로)
apps/storybook     # :6006 static + :6007 Vite HMR — /storybook
packages/ui              # @repo/ui — zone 공유 UI (같이)
packages/betterliving-ui # @dndproperty/betterliving-ui — 배포용 UI
docs/adr           # 아키텍처 결정
```

새 zone을 붙일 때는 [GUIDE — Adding a Next.js zone](docs/GUIDE.md)을 따른다.
