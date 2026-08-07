"use client"

import { useRef, useState, type FormEvent } from "react"
import { ChevronDownIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "../button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card"
import { Input } from "../input"
import { Label } from "../label"
import { Skeleton } from "../skeleton"
import {
  UnitCard,
  toUnitCardData,
  type LocaleText,
  type Unit,
} from "../UnitCard"
import {
  SortableHandle,
  SortableItem,
  SortableListProvider,
} from "../../lib/dnd"
import {
  sortByOrder,
  type UnitListSection,
} from "../../types/display-unit-list"

const DEFAULT_MAIN_TITLE: LocaleText = {
  ko: "살아 보고 싶었던 동네",
  en: "A neighborhood I wanted to live in",
}

const DEFAULT_SUB_TITLE: LocaleText = {
  ko: "지금 바로 입주할 수 있어요",
  en: "You can move in right now",
}

function ListIdField({
  listId,
  allListIds,
  onCommit,
}: {
  listId: string
  allListIds: string[]
  onCommit: (nextId: string) => void
}) {
  const [draft, setDraft] = useState(listId)
  const [error, setError] = useState<string | null>(null)

  function commit() {
    const next = draft.trim()
    if (!next) {
      setError("리스트 ID를 입력해 주세요.")
      setDraft(listId)
      return
    }
    if (next !== listId && allListIds.includes(next)) {
      setError("이미 사용 중인 리스트 ID입니다.")
      setDraft(listId)
      return
    }
    setError(null)
    if (next !== listId) onCommit(next)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`list-id-${listId}`}>리스트 ID</Label>
      <Input
        id={`list-id-${listId}`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            commit()
          }
        }}
        className="font-mono"
        placeholder="DU... 또는 임시 ID"
        autoComplete="off"
        spellCheck={false}
      />
      <p className="text-xs text-muted-foreground">
        저장(PUT) 시 서버가 새 DU ID를 발급하면 덮어씁니다.
      </p>
      {error ? (
        <p className="text-sm whitespace-pre-wrap text-destructive">{error}</p>
      ) : null}
    </div>
  )
}

function TitleFields({
  idPrefix,
  mainTitle,
  subTitle,
  disabled = false,
  onMainTitleChange,
  onSubTitleChange,
}: {
  idPrefix: string
  mainTitle: LocaleText
  subTitle: LocaleText
  disabled?: boolean
  onMainTitleChange: (value: LocaleText) => void
  onSubTitleChange: (value: LocaleText) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${idPrefix}-main-ko`}>MainTitle (KO)</Label>
          <Input
            id={`${idPrefix}-main-ko`}
            value={mainTitle.ko}
            disabled={disabled}
            onChange={(event) =>
              onMainTitleChange({ ...mainTitle, ko: event.target.value })
            }
            placeholder={DEFAULT_MAIN_TITLE.ko}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${idPrefix}-main-en`}>MainTitle (EN)</Label>
          <Input
            id={`${idPrefix}-main-en`}
            value={mainTitle.en}
            disabled={disabled}
            onChange={(event) =>
              onMainTitleChange({ ...mainTitle, en: event.target.value })
            }
            placeholder={DEFAULT_MAIN_TITLE.en}
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${idPrefix}-sub-ko`}>SubTitle (KO)</Label>
          <Input
            id={`${idPrefix}-sub-ko`}
            value={subTitle.ko}
            disabled={disabled}
            onChange={(event) =>
              onSubTitleChange({ ...subTitle, ko: event.target.value })
            }
            placeholder={DEFAULT_SUB_TITLE.ko}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${idPrefix}-sub-en`}>SubTitle (EN)</Label>
          <Input
            id={`${idPrefix}-sub-en`}
            value={subTitle.en}
            disabled={disabled}
            onChange={(event) =>
              onSubTitleChange({ ...subTitle, en: event.target.value })
            }
            placeholder={DEFAULT_SUB_TITLE.en}
          />
        </div>
      </div>
    </div>
  )
}

export type DisplayUnitListEditorProps = {
  displayId: string
  onDisplayIdChange: (value: string, options?: { composing?: boolean }) => void
  feedLoading: boolean
  feedSaving: boolean
  feedDeleting: boolean
  feedError: string | null
  onLoad: () => void
  onAddList: () => void
  onSaveAll: () => void
  onDelete: () => void
  /** false면 displayId 불러오기/전체저장/화면삭제/Add list Admin API 카드 숨김 (기본 true) */
  showFeedControls?: boolean
  orderedLists: UnitListSection[]
  unitsById: Record<string, Unit>
  hydrating: boolean
  loadingListId: string | null
  editingByList: Record<string, boolean>
  expandedByList: Record<string, boolean>
  errorByList: Record<string, string | null>
  unitIdByList: Record<string, string>
  onReorderLists: (lists: UnitListSection[]) => void
  onToggleContent: (listId: string) => void
  onSaveList: (listId: string) => void
  onEditList: (listId: string) => void
  onRemoveList: (listId: string) => void
  onUpdateList: (
    listId: string,
    patch: Partial<
      Pick<
        UnitListSection,
        "id" | "mainTitle" | "subTitle" | "units" | "routePath" | "externalFl"
      >
    >
  ) => void
  onAddUnit: (event: FormEvent<HTMLFormElement>, listId: string) => void
  onUnitIdInputChange: (listId: string, value: string) => void
  onRemoveUnit: (listId: string, unitId: string) => void
  onReorderUnits: (listId: string, units: Unit[]) => void
}

export function DisplayUnitListEditor({
  displayId,
  onDisplayIdChange,
  feedLoading,
  feedSaving,
  feedDeleting,
  feedError,
  onLoad,
  onAddList,
  onSaveAll,
  onDelete,
  showFeedControls = true,
  orderedLists,
  unitsById,
  hydrating,
  loadingListId,
  editingByList,
  expandedByList,
  errorByList,
  unitIdByList,
  onReorderLists,
  onToggleContent,
  onSaveList,
  onEditList,
  onRemoveList,
  onUpdateList,
  onAddUnit,
  onUnitIdInputChange,
  onRemoveUnit,
  onReorderUnits,
}: DisplayUnitListEditorProps) {
  const displayIdComposingRef = useRef(false)
  const feedBusy = feedLoading || feedSaving || feedDeleting

  return (
    <>
      {showFeedControls ? (
        <Card size="sm">
          <CardHeader className="border-b">
            <CardTitle>유닛 리스트 (Admin API)</CardTitle>
            <CardDescription>
              displayId는 화면 ID입니다. 불러오기(GET) / 전체 저장(PUT) / 화면
              삭제(DELETE)로 lp-dev display-unit-list API와 연동합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="display-id">displayId (화면)</Label>
              <Input
                id="display-id"
                value={displayId}
                onChange={(event) => {
                  const value = event.currentTarget.value
                  onDisplayIdChange(value, {
                    composing: displayIdComposingRef.current,
                  })
                }}
                onCompositionStart={() => {
                  displayIdComposingRef.current = true
                }}
                onCompositionEnd={(event) => {
                  displayIdComposingRef.current = false
                  onDisplayIdChange(event.currentTarget.value)
                }}
                placeholder="home"
                autoComplete="off"
                spellCheck={false}
                lang="en"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                영문만 · path param (예: home) · lists[].id는 서버 DU… 발급
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={feedBusy}
                onClick={onLoad}
              >
                {feedLoading ? "불러오는 중…" : "불러오기 (GET)"}
              </Button>
              <Button type="button" onClick={onAddList} disabled={feedBusy}>
                <PlusIcon data-icon="inline-start" />
                Add list
              </Button>
              <Button
                type="button"
                variant="default"
                disabled={feedBusy}
                onClick={onSaveAll}
              >
                {feedSaving ? "저장 중…" : "전체 저장 (PUT)"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={feedBusy}
                onClick={onDelete}
              >
                <Trash2Icon data-icon="inline-start" />
                {feedDeleting ? "삭제 중…" : "화면 삭제 (DELETE)"}
              </Button>
            </div>
            {feedError ? (
              <p className="text-sm whitespace-pre-wrap text-destructive">
                {feedError}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : feedError ? (
        <p className="text-sm whitespace-pre-wrap text-destructive">{feedError}</p>
      ) : feedLoading ? (
        <p className="text-sm text-muted-foreground">불러오는 중…</p>
      ) : null}

      {orderedLists.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {showFeedControls
            ? "Add list로 리스트를 만든 뒤 제목과 유닛을 입력하세요."
            : "표시할 섹션이 없습니다."}
        </p>
      ) : (
        <SortableListProvider
          items={orderedLists}
          getItemId={(list) => list.id}
          onReorder={onReorderLists}
          axis="vertical"
          restrictToBoundary
          className="flex flex-col gap-6"
        >
          {orderedLists.map((list, listIndex) => {
            const isEditing = Boolean(editingByList[list.id])
            const isExpanded = isEditing || Boolean(expandedByList[list.id])
            const isLoading = loadingListId === list.id
            const pendingUnitIds = sortByOrder(list.units)
              .map((ref) => ref.unitId)
              .filter((unitId) => !unitsById[unitId])
            const listUnits = sortByOrder(list.units)
              .map((ref) => unitsById[ref.unitId])
              .filter((unit): unit is Unit => Boolean(unit))
            const isHydratingList = hydrating && pendingUnitIds.length > 0
            const canSortUnits =
              isEditing &&
              listUnits.length > 0 &&
              !isLoading &&
              !isHydratingList
            const hasUnitRefs = list.units.length > 0

            return (
              <SortableItem
                key={list.id}
                id={list.id}
                index={listIndex}
                disabled={isEditing}
                type="unit-list"
                accept="unit-list"
                withHandle={false}
                className="rounded-xl"
              >
                {({ handleRef }) => (
                  <Card
                    size="sm"
                    className="gap-0 py-3"
                    data-list-id={list.id}
                  >
                    <CardHeader className="border-0 pb-0">
                      <div className="flex min-w-0 flex-col gap-1">
                        <CardTitle>
                          {list.mainTitle.ko.trim() ||
                            list.mainTitle.en.trim() ||
                            `List ${listIndex + 1}`}
                        </CardTitle>
                        <CardDescription>
                          {isEditing ? "수정 모드" : "저장됨"} ·{" "}
                          {list.units.length} units
                          <span className="ml-2 font-mono text-[11px]">
                            id: {list.id}
                          </span>
                        </CardDescription>
                      </div>
                      <CardAction className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          disabled={isEditing}
                          aria-expanded={isExpanded}
                          aria-label={
                            isExpanded ? "콘텐츠 접기" : "콘텐츠 펼치기"
                          }
                          className="min-w-20"
                          onClick={() => onToggleContent(list.id)}
                        >
                          <ChevronDownIcon
                            data-icon="inline-start"
                            className={
                              isExpanded
                                ? "rotate-180 transition-transform"
                                : "transition-transform"
                            }
                          />
                          {isExpanded ? "접기" : "펼치기"}
                        </Button>
                        {isEditing ? (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => onSaveList(list.id)}
                          >
                            저장
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => onEditList(list.id)}
                          >
                            수정
                          </Button>
                        )}
                        {isEditing ? (
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="outline"
                            aria-label="Remove list"
                            onClick={() => onRemoveList(list.id)}
                          >
                            <Trash2Icon />
                          </Button>
                        ) : (
                          <SortableHandle handleRef={handleRef} />
                        )}
                      </CardAction>
                    </CardHeader>

                    {isExpanded ? (
                      <CardContent className="mt-3 flex flex-col gap-4 border-t pt-4">
                        {isEditing ? (
                          <>
                            <ListIdField
                              key={list.id}
                              listId={list.id}
                              allListIds={orderedLists.map((item) => item.id)}
                              onCommit={(nextId) =>
                                onUpdateList(list.id, { id: nextId })
                              }
                            />
                            <TitleFields
                              idPrefix={list.id}
                              mainTitle={list.mainTitle}
                              subTitle={list.subTitle}
                              onMainTitleChange={(mainTitle) =>
                                onUpdateList(list.id, { mainTitle })
                              }
                              onSubTitleChange={(subTitle) =>
                                onUpdateList(list.id, { subTitle })
                              }
                            />
                          </>
                        ) : null}

                        <div className="space-between flex flex-row gap-3 px-1">
                          <div className="flex w-1/2 flex-col gap-1">
                            <p className="text-xs font-medium text-muted-foreground">
                              KO
                            </p>
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                              {list.mainTitle.ko.trim() || "MainTitle (KO)"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {list.subTitle.ko.trim() || "SubTitle (KO)"}
                            </p>
                          </div>
                          <div className="flex w-1/2 flex-col gap-1">
                            <p className="text-xs font-medium text-muted-foreground">
                              EN
                            </p>
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                              {list.mainTitle.en.trim() || "MainTitle (EN)"}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              {list.subTitle.en.trim() || "SubTitle (EN)"}
                            </p>
                          </div>
                        </div>

                        {isEditing ? (
                          <form
                            onSubmit={(event) => onAddUnit(event, list.id)}
                            className="flex flex-col gap-3"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row">
                              <Input
                                value={unitIdByList[list.id] ?? ""}
                                onChange={(event) =>
                                  onUnitIdInputChange(
                                    list.id,
                                    event.target.value
                                  )
                                }
                                placeholder="Unit ID"
                                disabled={isLoading}
                                className="font-mono"
                              />
                              <Button
                                type="submit"
                                disabled={isLoading}
                                className="shrink-0"
                              >
                                {isLoading ? "Loading…" : "Add unit"}
                              </Button>
                            </div>
                          </form>
                        ) : null}

                        {errorByList[list.id] ? (
                          <p className="text-sm whitespace-pre-wrap text-destructive">
                            {errorByList[list.id]}
                          </p>
                        ) : null}

                        {listUnits.length > 0 || isHydratingList ? (
                          <SortableListProvider
                            items={listUnits}
                            getItemId={(unit) => unit.unitId}
                            onReorder={(units) =>
                              onReorderUnits(list.id, units)
                            }
                            restrictToBoundary
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          >
                            {listUnits.map((unit, unitIndex) => (
                              <SortableItem
                                key={unit.unitId}
                                id={unit.unitId}
                                index={unitIndex}
                                disabled={!canSortUnits}
                                type="unit"
                                accept="unit"
                                group={list.id}
                                withHandle={false}
                              >
                                {({ handleRef: unitHandleRef }) => (
                                  <div className="relative">
                                    {isEditing ? (
                                      <div className="absolute top-2 right-2 z-30 flex items-center gap-1">
                                        <Button
                                          type="button"
                                          size="icon-sm"
                                          variant="outline"
                                          aria-label={`Remove ${unit.unitId}`}
                                          onClick={() =>
                                            onRemoveUnit(list.id, unit.unitId)
                                          }
                                        >
                                          <Trash2Icon />
                                        </Button>
                                        {canSortUnits ? (
                                          <SortableHandle
                                            handleRef={unitHandleRef}
                                          />
                                        ) : null}
                                      </div>
                                    ) : null}
                                    <UnitCard
                                      data={toUnitCardData(unit, "ko")}
                                      className="w-full"
                                      onClick={(event) => {
                                        event.preventDefault()
                                      }}
                                    />
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                            {isLoading || isHydratingList
                              ? pendingUnitIds.map((unitId) => (
                                  <div
                                    key={`pending-${unitId}`}
                                    className="flex flex-col gap-3"
                                  >
                                    <Skeleton className="aspect-16/10 w-full rounded-lg" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                  </div>
                                ))
                              : null}
                            {isLoading && pendingUnitIds.length === 0 ? (
                              <div className="flex flex-col gap-3">
                                <Skeleton className="aspect-16/10 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                              </div>
                            ) : null}
                          </SortableListProvider>
                        ) : hasUnitRefs ? (
                          <p className="text-sm text-muted-foreground">
                            저장된 유닛을 불러오지 못했습니다. 다시 추가해
                            주세요.
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {isEditing
                              ? "유닛 ID를 입력하고 Add unit으로 카드를 추가하세요."
                              : "유닛이 없습니다. 수정으로 추가하세요."}
                          </p>
                        )}
                      </CardContent>
                    ) : null}
                  </Card>
                )}
              </SortableItem>
            )
          })}
        </SortableListProvider>
      )}
    </>
  )
}
