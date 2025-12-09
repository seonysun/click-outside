# @seonysun/use-click-outside

React 환경에서 특정 요소 외부 클릭을 감지할 때 유용한 `useClickOutside` 훅입니다.  
모달, 드롭다운, 사이드바 등에서 외부 클릭 시 동작을 간단히 처리할 수 있도록 도와줍니다.

---

## 설치

```bash
npm install @seonysun/use-click-outside
# 또는
yarn add @seonysun/use-click-outside
```

---

## 사용 방법

```tsx
import { useRef } from "react";
import { useClickOutside } from "@seonysun/use-click-outside";

const Dropdown = () => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref,
    onClickOutside: () => {
      console.log("Dropdown 외부 클릭 감지!");
    },
    enabled: true,              // 선택 사항, 기본값 true
    eventType: "pointerdown",   // 선택 사항, 기본값 pointerdown
  });

  return (
    <div ref={ref}>
      <p>Dropdown 내용</p>
    </div>
  );
};
```
### 반환값 `ref: React.RefObject<HTMLElement>`
외부 클릭을 감지할 요소에 연결하면 됩니다.

---

## options
| 옵션               | 타입                                             | 기본값             | 설명                                        |
| ---------------- | ---------------------------------------------- | --------------- | ----------------------------------------- |
| `ref`            | `React.RefObject<HTMLElement>`                 | 필수              | 외부 클릭을 감지할 대상 요소의 ref                     |
| `onClickOutside` | `() => void`                                   | 필수              | 요소 외부 클릭 시 실행될 콜백 함수                      |
| `enabled`        | `boolean`                                      | `true`          | false로 설정하면 훅이 비활성화되어 이벤트를 감지하지 않음        |
| `eventType`      | `"pointerdown" \| "mousedown" \| "touchstart"` | `"pointerdown"` | 사용할 이벤트 타입. pointerdown은 마우스, 터치, 펜 모두 지원 |

---

## 특징
- 핸들러 함수를 useRef로 유지하여 불필요한 리스너 재등록 방지
- enabled 옵션으로 필요할 때만 이벤트 리스너 활성화 가능
- 모바일·데스크탑·펜 입력 모두 지원하는 pointerdown 이벤트 기본 적용
- 모달, 드롭다운, 사이드바 등 다양한 UI 컴포넌트에서 범용 사용 가능
