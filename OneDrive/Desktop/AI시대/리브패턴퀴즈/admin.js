const state = {
  adminPin: localStorage.getItem("rb-admin-pin") || "",
  students: [],
  commentStudentId: "",
  commentPeriod: "daily",
};

const $ = (selector) => document.querySelector(selector);

const elements = {
  adminLoginForm: $("#adminLoginForm"),
  adminPinInput: $("#adminPinInput"),
  adminLoginMessage: $("#adminLoginMessage"),
  studentForm: $("#studentForm"),
  studentNameInput: $("#studentNameInput"),
  studentDisplayNameInput: $("#studentDisplayNameInput"),
  studentSchoolGradeInput: $("#studentSchoolGradeInput"),
  studentPinInput: $("#studentPinInput"),
  studentFormMessage: $("#studentFormMessage"),
  studentListPanel: $("#studentListPanel"),
  studentCount: $("#studentCount"),
  studentTableBody: $("#studentTableBody"),
  refreshStudentsButton: $("#refreshStudentsButton"),
  commentPanel: $("#commentPanel"),
  commentStudentSelect: $("#commentStudentSelect"),
  commentPeriodSelect: $("#commentPeriodSelect"),
  parentCommentText: $("#parentCommentText"),
  copyCommentButton: $("#copyCommentButton"),
  commentMessage: $("#commentMessage"),
};

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showManager() {
  elements.studentForm.classList.remove("hidden");
  elements.studentListPanel.classList.remove("hidden");
  elements.commentPanel.classList.remove("hidden");
}

async function adminRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Pin": state.adminPin,
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "요청을 처리하지 못했습니다.");
  return data;
}

async function loadStudents() {
  const data = await adminRequest("/api/admin/students");
  state.students = data.students || [];
  if (!state.commentStudentId && state.students.length) {
    state.commentStudentId = state.students[0].id;
  }
  renderStudents();
  renderCommentOptions();
  renderParentComment();
}

function renderStudents() {
  elements.studentCount.textContent = `${state.students.length}명`;
  elements.studentTableBody.innerHTML = state.students.length
    ? state.students
        .map(
          (student) => `
            <tr>
              <td><strong>${escapeHtml(student.name)}</strong></td>
              <td>
                <input class="student-meta-edit" data-field="displayName" data-student-id="${escapeHtml(student.id)}" value="${escapeHtml(student.displayName || "")}" aria-label="${escapeHtml(student.name)} 학생 이름" />
              </td>
              <td>
                <input class="student-meta-edit school-grade-edit" data-field="schoolGrade" data-student-id="${escapeHtml(student.id)}" value="${escapeHtml(student.schoolGrade || "")}" aria-label="${escapeHtml(student.name)} 학교 학년" />
              </td>
              <td>
                <input class="pin-edit" data-student-id="${escapeHtml(student.id)}" value="${escapeHtml(student.pin)}" aria-label="${escapeHtml(student.name)} PIN" />
              </td>
              <td>${student.score.toLocaleString()}</td>
              <td>${student.masteredCount}</td>
              <td>${student.reviewCount}</td>
              <td>${formatDate(student.updatedAt)}</td>
              <td>
                <div class="row-actions">
                  <button class="ghost small" data-action="save-pin" data-student-id="${escapeHtml(student.id)}" type="button">PIN 저장</button>
                  <button class="ghost small" data-action="save-info" data-student-id="${escapeHtml(student.id)}" type="button">정보 저장</button>
                  <button class="ghost small" data-action="comment" data-student-id="${escapeHtml(student.id)}" type="button">코멘트</button>
                  <button class="secondary small" data-action="reset" data-student-id="${escapeHtml(student.id)}" type="button">진도 초기화</button>
                  <button class="danger small" data-action="delete" data-student-id="${escapeHtml(student.id)}" type="button">삭제</button>
                </div>
              </td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="9" class="empty-cell">등록된 학생이 없습니다.</td></tr>`;
}

function renderCommentOptions() {
  elements.commentStudentSelect.innerHTML = state.students.length
    ? state.students
        .map(
          (student) =>
            `<option value="${escapeHtml(student.id)}" ${student.id === state.commentStudentId ? "selected" : ""}>${escapeHtml(student.name)}</option>`,
        )
        .join("")
    : `<option value="">등록된 학생 없음</option>`;
}

function periodConfig(period) {
  return {
    daily: { label: "오늘", days: 1, title: "데일리" },
    weekly: { label: "이번 주", days: 7, title: "위클리" },
    monthly: { label: "이번 달", days: 30, title: "먼슬리" },
  }[period];
}

function periodStats(student, period) {
  const config = periodConfig(period);
  const cutoff = Date.now() - config.days * 24 * 60 * 60 * 1000;
  const logs = (student.log || [])
    .filter((entry) => {
      const time = new Date(entry.at).getTime();
      return !Number.isNaN(time) && time >= cutoff;
    })
    .sort((a, b) => new Date(a.at) - new Date(b.at));

  const first = logs[0];
  const last = logs[logs.length - 1];
  const scoreGain = first && last ? Math.max(0, Number(last.score || 0) - Number(first.score || 0)) : 0;
  const masteredGain =
    first && last ? Math.max(0, Number(last.masteredCount || 0) - Number(first.masteredCount || 0)) : 0;
  const reviewChange =
    first && last ? Number(last.reviewCount || 0) - Number(first.reviewCount || 0) : Number(student.reviewCount || 0);

  return {
    ...config,
    activityCount: logs.length,
    scoreGain,
    masteredGain,
    reviewChange,
  };
}

function progressTone(student, stats) {
  if (stats.activityCount === 0) {
    return "최근 학습 기록이 아직 많지 않아, 다음 수업에서는 짧게라도 꾸준히 접속하며 학습 루틴을 만드는 데 초점을 두겠습니다.";
  }
  if (stats.masteredGain >= 5 || stats.scoreGain >= 100) {
    return "새 표현을 익히는 속도가 좋고, 퀴즈와 복습 활동에서도 집중력이 잘 이어지고 있습니다.";
  }
  if (stats.reviewChange > 0) {
    return "새 표현을 만나며 복습할 항목도 생겼지만, 다시 확인해야 할 문장을 분명히 찾았다는 점이 좋습니다.";
  }
  if (student.reviewCount > 0) {
    return "전체 흐름은 안정적이며, 남아 있는 복습 문장만 조금 더 반복하면 표현 정확도가 더 좋아질 것 같습니다.";
  }
  return "학습 흐름이 안정적으로 유지되고 있고, 배운 표현을 차근차근 쌓아가고 있습니다.";
}

function generateParentComment(student, period) {
  if (!student) return "";
  const stats = periodStats(student, period);
  const studentLabel = student.displayName || student.name;
  const schoolGradeText = student.schoolGrade ? ` (${student.schoolGrade})` : "";
  const activityText =
    stats.activityCount > 0
      ? `${stats.label} 학습 활동 ${stats.activityCount}회, 점수 +${stats.scoreGain}점, 새로 익힌 표현 ${stats.masteredGain}개를 기록했습니다.`
      : `${stats.label}에는 아직 기록된 학습 활동이 많지 않습니다.`;
  const reviewText =
    student.reviewCount > 0
      ? `현재 복습이 필요한 표현은 ${student.reviewCount}개입니다.`
      : "현재 복습이 필요한 표현은 없습니다.";

  return `[${stats.title} 학습 코멘트]\n${studentLabel} 학생${schoolGradeText}은 현재 총 ${student.score.toLocaleString()}점, 마스터 표현 ${student.masteredCount}개를 기록하고 있습니다. ${activityText} ${progressTone(student, stats)} ${reviewText} 가정에서는 하루 5분 정도 소리 내어 읽기와 뜻 말하기를 함께 해 주시면 학습 효과가 더 잘 이어집니다.`;
}

function renderParentComment() {
  const student = state.students.find((item) => item.id === state.commentStudentId);
  elements.parentCommentText.value = generateParentComment(student, state.commentPeriod);
  elements.copyCommentButton.disabled = !student;
}

async function handleAdminLogin(event) {
  event.preventDefault();
  state.adminPin = elements.adminPinInput.value.trim();
  localStorage.setItem("rb-admin-pin", state.adminPin);
  elements.adminLoginMessage.textContent = "학생 목록을 불러오는 중입니다...";
  try {
    await loadStudents();
    showManager();
    elements.adminLoginMessage.textContent = "관리자 인증 완료";
  } catch (error) {
    elements.adminLoginMessage.textContent = error.message;
  }
}

async function handleStudentCreate(event) {
  event.preventDefault();
  const name = elements.studentNameInput.value.trim();
  const displayName = elements.studentDisplayNameInput.value.trim();
  const schoolGrade = elements.studentSchoolGradeInput.value.trim();
  const pin = elements.studentPinInput.value.trim();
  elements.studentFormMessage.textContent = "";
  try {
    await adminRequest("/api/admin/students", {
      method: "POST",
      body: JSON.stringify({ name, displayName, schoolGrade, pin }),
    });
    elements.studentForm.reset();
    elements.studentFormMessage.textContent = `${name} 학생을 등록했습니다.`;
    await loadStudents();
  } catch (error) {
    elements.studentFormMessage.textContent = error.message;
  }
}

async function handleStudentAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = button.dataset.studentId;
  const action = button.dataset.action;
  const row = button.closest("tr");

  try {
    if (action === "comment") {
      state.commentStudentId = id;
      elements.commentStudentSelect.value = id;
      renderParentComment();
      elements.commentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (action === "save-pin") {
      const pin = row.querySelector(".pin-edit").value.trim();
      await adminRequest(`/api/admin/students/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ pin }),
      });
    }

    if (action === "save-info") {
      const displayName = row.querySelector('[data-field="displayName"]').value.trim();
      const schoolGrade = row.querySelector('[data-field="schoolGrade"]').value.trim();
      await adminRequest(`/api/admin/students/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ displayName, schoolGrade }),
      });
    }

    if (action === "reset") {
      if (!confirm("이 학생의 점수와 학습 기록을 초기화할까요?")) return;
      await adminRequest(`/api/admin/students/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ resetProgress: true }),
      });
    }

    if (action === "delete") {
      if (!confirm("이 학생 아이디를 삭제할까요?")) return;
      await adminRequest(`/api/admin/students/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    }

    await loadStudents();
  } catch (error) {
    alert(error.message);
  }
}

function handleCommentStudentChange(event) {
  state.commentStudentId = event.target.value;
  renderParentComment();
}

function handleCommentPeriodChange(event) {
  state.commentPeriod = event.target.value;
  renderParentComment();
}

async function copyParentComment() {
  const text = elements.parentCommentText.value.trim();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    elements.commentMessage.textContent = "학부모용 코멘트를 복사했습니다.";
  } catch {
    elements.parentCommentText.focus();
    elements.parentCommentText.select();
    document.execCommand("copy");
    elements.commentMessage.textContent = "학부모용 코멘트를 복사했습니다.";
  }
}

function bindEvents() {
  elements.adminLoginForm.addEventListener("submit", handleAdminLogin);
  elements.studentForm.addEventListener("submit", handleStudentCreate);
  elements.refreshStudentsButton.addEventListener("click", loadStudents);
  elements.studentTableBody.addEventListener("click", handleStudentAction);
  elements.commentStudentSelect.addEventListener("change", handleCommentStudentChange);
  elements.commentPeriodSelect.addEventListener("change", handleCommentPeriodChange);
  elements.copyCommentButton.addEventListener("click", copyParentComment);
}

function init() {
  elements.adminPinInput.value = state.adminPin;
  bindEvents();
  if (state.adminPin) {
    loadStudents()
      .then(() => {
        showManager();
        elements.adminLoginMessage.textContent = "관리자 인증 완료";
      })
      .catch(() => {
        localStorage.removeItem("rb-admin-pin");
      });
  }
}

init();
