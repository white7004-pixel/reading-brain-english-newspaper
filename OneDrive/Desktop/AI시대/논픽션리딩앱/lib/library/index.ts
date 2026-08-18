import { AR1_BATCH_01 } from "./ar1-01";
import { AR1_BATCH_02 } from "./ar1-02";
import { AR1_BATCH_03 } from "./ar1-03";
import { AR1_BATCH_04 } from "./ar1-04";
import { AR1_BATCH_05 } from "./ar1-05";
import { AR1_BATCH_06 } from "./ar1-06";
import { buildLibraryDraft, type LibrarySeed } from "./build-draft";
import type { StudioArticle } from "../studio-types";

/** 제작한 지문 시드 전체. 대역별 배치 파일을 여기에서 이어 붙인다. */
export const LIBRARY_SEEDS: LibrarySeed[] = [...AR1_BATCH_01, ...AR1_BATCH_02, ...AR1_BATCH_03, ...AR1_BATCH_04, ...AR1_BATCH_05, ...AR1_BATCH_06];

/** 스튜디오 초안으로 변환한 지문. 검수를 통과하기 전에는 학습자에게 노출되지 않는다. */
export function createLibraryDrafts(): StudioArticle[] {
  return LIBRARY_SEEDS.map(buildLibraryDraft);
}
