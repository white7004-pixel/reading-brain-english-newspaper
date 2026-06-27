# Reading Brain Director Assistant Design

## Purpose

Build a personal assistant for the Reading Brain English academy director. The assistant organizes selected KakaoTalk group chat content from academy directors into Notion, then produces prioritized daily work items, schedules, useful materials, and operational ideas.

The first target source is one or more selected KakaoTalk group chats used by academy directors. The first target output is a structured Notion workspace. Later outputs may include KakaoTalk, KakaoWork, or other daily notifications.

## Scope

The first version is a laptop-run synchronization tool, not an always-on background service.

When the director opens her personal laptop and runs the tool, it should:

1. Use PC KakaoTalk automation to open the selected group chat.
2. Collect recent messages since the last successful sync where technically possible.
3. Collect downloadable materials such as PDFs, documents, images, and shared files into a local managed folder.
4. Extract useful items from the messages and files with AI.
5. Save organized results into Notion databases.
6. Show a short run summary: new tasks, urgent dates, saved materials, and items that need review.

## Non-Goals for the First Version

- It will not use an unofficial KakaoTalk server API.
- It will not require the laptop to stay on all day.
- It will not promise perfect real-time collection.
- It will not automatically act on sensitive messages without review.
- It will not ingest every KakaoTalk room by default.

## Recommended Workflow

The director opens the laptop, confirms PC KakaoTalk is logged in, and runs "Today Sync."

The tool opens the selected group chat, copies or exports recent visible conversation content using PC automation, downloads or detects newly saved attachments, and stores raw source artifacts locally. The AI pipeline then classifies each item and writes structured pages to Notion.

The system keeps a sync state so repeated runs do not create duplicate Notion entries. When exact message IDs are unavailable, deduplication uses timestamp, sender, text similarity, file hash, and Notion item similarity.

## Notion Structure

Use four core databases in the first version.

### Tasks

Stores work the director may need to do.

Properties:

- Title
- Status: Inbox, Today, This Week, Waiting, Done, Archived
- Priority: High, Medium, Low
- Due date
- Category: consultation, marketing, class, curriculum, operations, parents, administration, other
- Source chat
- Source excerpt
- Related file
- AI confidence
- Review needed

### Events

Stores seminars, deadlines, lectures, webinars, education events, and application periods.

Properties:

- Event name
- Date and time
- Registration deadline
- Location or link
- Event type
- Source chat
- Source excerpt
- Related file
- Review needed

### Materials

Stores shared files, links, PDFs, images, templates, and useful references.

Properties:

- Material title
- Material type: PDF, image, document, link, video, template, other
- Topic
- Local file path or Notion file
- Source chat
- Source excerpt
- Summary
- Suggested use

### Ideas

Stores academy operation insights.

Properties:

- Idea title
- Area: marketing, consultation, re-enrollment, curriculum, teacher management, parent management, test prep, systems, other
- Summary
- Why it matters
- Suggested next action
- Priority
- Source chat
- Source excerpt

## AI Classification Rules

The assistant should classify each source item into one primary destination and optional related destinations.

- If the item requires the director to act, create or update a Task.
- If the item has a date, deadline, or event, create or update an Event.
- If the item is a file, link, template, or reference, create or update a Material.
- If the item is a useful strategy or operational insight, create or update an Idea.
- If the item is unclear but potentially useful, mark it as Review needed.

The assistant should not treat every message as a task. It should be selective and prioritize items that affect the director's academy operations.

## Daily Summary

After each sync, the tool should generate a concise summary with:

- Top 3 things to do today
- Upcoming deadlines or events
- New useful materials
- High-value academy operation ideas
- Items needing manual review

The first version can show this summary on screen and save it to a Notion daily page. KakaoTalk notification delivery can be added after the ingestion and Notion workflow are stable.

## Technical Approach

The first version uses PC automation because KakaoTalk personal and group chat reading is not available through a normal official read API.

Likely components:

- Desktop automation layer for PC KakaoTalk
- Local source archive for copied messages and downloaded attachments
- Parser and deduplication layer
- AI extraction and classification layer
- Notion writer
- Local sync state
- Simple desktop or command-line launcher

The automation should be defensive. If KakaoTalk is not open, not logged in, the chat room cannot be found, or the visible UI changes, the tool should stop with a clear recovery message instead of writing unreliable data to Notion.

## Privacy and Safety

The selected group chat may include sensitive business and personal information. The system should:

- Limit collection to explicitly selected chat rooms.
- Keep raw archives local unless the director chooses to upload them.
- Mark low-confidence AI decisions for review.
- Avoid sharing source messages back into any group chat.
- Keep API keys and Notion tokens out of source code.

## Risks

PC KakaoTalk automation can break when KakaoTalk updates, the laptop display scale changes, the window is minimized, or the login session expires. The first version should minimize fragile UI steps and offer clear manual recovery instructions.

Message collection may be incomplete if old messages are not visible or if files have expired. The system should report what it actually collected instead of implying full coverage.

## Success Criteria

The first version is successful when the director can run one sync from her laptop and see:

- New KakaoTalk-derived tasks in Notion
- New events or deadlines in Notion
- Downloaded or linked materials organized in Notion
- Useful academy operation ideas summarized in Notion
- A daily summary that is accurate enough to guide the director's day

## Implementation Sequence

1. Create the Notion workspace schema.
2. Build a local source archive and sync state.
3. Prototype PC KakaoTalk collection for one selected group chat.
4. Add attachment detection and file hashing.
5. Add AI extraction and classification.
6. Add Notion writing and deduplication.
7. Add daily summary generation.
8. Add a simple launcher and recovery messages.
9. Validate with a small sample before using real full chat history.
