import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildPrompt } from "@/lib/prompts";
import {
  demoNewspaper,
  demoBlog,
  demoInsta,
  demoNewsletter,
  demoSms,
} from "@/lib/demo";

export const maxDuration = 60;

const VALID_TYPES = ["newspaper", "nblog", "insta", "newsletter", "sms"];

function demoContent(type: string, params: Record<string, string>) {
  const academyName = params.academyName || "리딩브레인 영어학원";
  switch (type) {
    case "nblog":
      return demoBlog({ topic: params.topic || "", academyName, keywords: params.keywords || "" });
    case "insta":
      return demoInsta({ topic: params.topic || "", academyName });
    case "newsletter":
      return demoNewsletter({ month: params.month || "", academyName });
    case "sms":
      return demoSms({
        purpose: params.purpose || "",
        academyName,
        studentName: params.studentName || "",
      });
    default:
      return demoNewspaper({
        topic: params.topic || "",
        level: params.level || "beginner",
        levelLabel: params.levelLabel || "Beginner · 초급",
        academyName,
      });
  }
}

export async function POST(req: NextRequest) {
  let body: { type?: string; params?: Record<string, string> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const type = body.type || "newspaper";
  const params = body.params || {};

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "지원하지 않는 콘텐츠 유형입니다." }, { status: 400 });
  }

  const userKey = req.headers.get("x-user-api-key") || "";
  const apiKey = userKey || process.env.ANTHROPIC_API_KEY || "";

  // API 키가 없으면 데모 콘텐츠로 응답 (설치 직후에도 바로 체험 가능)
  if (!apiKey) {
    return NextResponse.json({ mode: "demo", data: demoContent(type, params) });
  }

  try {
    const client = new Anthropic({ apiKey });
    const prompt = buildPrompt(type, params);

    const message = await client.messages.create({
      model: process.env.CLAUDE_MODEL || "claude-sonnet-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    // 모델이 코드블록으로 감쌌을 경우 대비
    const jsonText = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
    const data = JSON.parse(jsonText);

    return NextResponse.json({ mode: "ai", data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("authentication") || msg.includes("401")) {
      return NextResponse.json(
        { error: "API 키가 올바르지 않습니다. 설정에서 키를 확인해 주세요." },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: `콘텐츠 생성 중 오류가 발생했습니다: ${msg}` },
      { status: 500 }
    );
  }
}
