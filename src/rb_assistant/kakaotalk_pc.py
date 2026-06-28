import time

import pyautogui
import pyperclip


def normalize_clipboard_text(text: str) -> str:
    return text.replace("﻿", "").replace("\r\n", "\n").strip()


def collect_visible_chat_text(wait_seconds: float = 0.5) -> str:
    pyperclip.copy("")
    pyautogui.hotkey("ctrl", "a")
    time.sleep(wait_seconds)
    pyautogui.hotkey("ctrl", "c")
    time.sleep(wait_seconds)
    text = normalize_clipboard_text(pyperclip.paste())
    if not text:
        raise RuntimeError("No KakaoTalk text was copied. Open the selected chat room and try again.")
    return text
