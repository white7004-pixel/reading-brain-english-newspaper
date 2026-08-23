package app.monggle.focus;

final class NativeMasteryPolicy {
    enum Tone { SUPPORTIVE, FIRM, ANGRY }

    static int onPrompt(int misses, boolean previousAnswered) {
        return previousAnswered ? misses : misses + 1;
    }

    static int onResponse(int misses, String response) {
        if ("done".equals(response)) return 0;
        if ("later".equals(response)) return misses + 1;
        return misses;
    }

    static Tone tone(int misses) {
        if (misses >= 3) return Tone.ANGRY;
        if (misses >= 2) return Tone.FIRM;
        return Tone.SUPPORTIVE;
    }

    static String message(Tone tone, String taskTitle) {
        if (tone == Tone.ANGRY) return "또 미뤄지? 지금 딱 5분만 시작해!";
        if (tone == Tone.FIRM) return "이번에는 넘어가지 않을 거야. " + taskTitle + " 지금 시작하자.";
        return taskTitle + " 했어? 오늘 목표를 끝까지 마스터하자.";
    }

    private NativeMasteryPolicy() {}
}
