package app.monggle.focus;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class NativeMasteryPolicyTest {
    @Test
    public void unansweredThirdPromptBecomesAngry() {
        int misses = NativeMasteryPolicy.onPrompt(2, false);
        assertEquals(3, misses);
        assertEquals(NativeMasteryPolicy.Tone.ANGRY, NativeMasteryPolicy.tone(misses));
    }

    @Test
    public void answeredPromptDoesNotIncreaseMisses() {
        assertEquals(2, NativeMasteryPolicy.onPrompt(2, true));
    }

    @Test
    public void completionResetsMisses() {
        assertEquals(0, NativeMasteryPolicy.onResponse(4, "done"));
    }
}
