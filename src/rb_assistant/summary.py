from rb_assistant.models import ExtractedItem, ItemKind, Priority


def build_daily_summary(items: list[ExtractedItem]) -> str:
    tasks = sorted(
        [item for item in items if item.kind == ItemKind.TASK],
        key=lambda item: _priority_rank(item.priority),
    )[:3]
    events = [item for item in items if item.kind == ItemKind.EVENT]
    materials = [item for item in items if item.kind == ItemKind.MATERIAL]
    ideas = [item for item in items if item.kind == ItemKind.IDEA]
    review = [item for item in items if item.review_needed]

    sections = [
        ("Top 3 Things To Do", tasks),
        ("Upcoming Deadlines And Events", events),
        ("New Materials", materials),
        ("Operation Ideas", ideas),
        ("Needs Review", review),
    ]
    lines: list[str] = ["# Daily Director Brief", ""]
    for title, section_items in sections:
        lines.append(f"## {title}")
        if not section_items:
            lines.append("- None")
        else:
            for item in section_items:
                lines.append(f"- [{item.priority}] {item.title}")
        lines.append("")
    return "\n".join(lines).strip()


def _priority_rank(priority: Priority) -> int:
    return {Priority.HIGH: 0, Priority.MEDIUM: 1, Priority.LOW: 2}[priority]
