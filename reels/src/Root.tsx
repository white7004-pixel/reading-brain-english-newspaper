import { Composition, Folder } from "remotion";
import { Reels } from "./Reels";
import { Hook } from "./scenes/Hook";
import { Problem } from "./scenes/Problem";
import { Shift } from "./scenes/Shift";
import { Evidence } from "./scenes/Evidence";
import { Cta } from "./scenes/Cta";
import { ComicEpisode } from "./comic/ComicEpisode";
import type { Timeline } from "./comic/types";
import irregularPast from "../public/ep/irregular-past/timeline.json";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reels"
        component={Reels}
        defaultProps={{ audio: "full" as const }}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Comic-irregular-past"
        component={ComicEpisode}
        defaultProps={{ timeline: irregularPast as unknown as Timeline, audio: "full" as const }}
        durationInFrames={irregularPast.frames}
        fps={irregularPast.fps}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition id="Hook" component={Hook} durationInFrames={75} fps={30} width={1080} height={1920} />
        <Composition id="Problem" component={Problem} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="Shift" component={Shift} durationInFrames={165} fps={30} width={1080} height={1920} />
        <Composition id="Evidence" component={Evidence} durationInFrames={330} fps={30} width={1080} height={1920} />
        <Composition id="Cta" component={Cta} durationInFrames={220} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};
