from rb_assistant.kakaotalk_pc import normalize_clipboard_text


def test_normalize_clipboard_text_strips_noise():
    text = "﻿\n2026. 6. 27. 오후 2:01, 김원장 : 신청 마감입니다.\r\n"

    assert normalize_clipboard_text(text) == "2026. 6. 27. 오후 2:01, 김원장 : 신청 마감입니다."
