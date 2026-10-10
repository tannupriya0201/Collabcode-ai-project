module.exports = (io, socket) => {

  /* =========================
     JOIN EXAM ROOM
  ========================= */
  socket.on("join-exam", ({ testId, userId, role }) => {
    const roomId = `exam_${testId}`;
    socket.join(roomId);

    console.log(
      `👤 ${role} (${userId}) joined ${roomId}`
    );
  });

  /* =========================
     EXAM START (STUDENT)
  ========================= */
  socket.on("exam-start", (data) => {
    io.to(`exam_${data.testId}`).emit(
      "exam-started",
      data
    );
  });

  /* =========================
     EXAM PROGRESS (STUDENT)
  ========================= */
  socket.on("exam-progress", (data) => {
    io.to(`exam_${data.testId}`).emit(
      "exam-progress-update",
      data
    );
  });

  /* =========================
     EXAM SUBMIT (STUDENT)
  ========================= */
  socket.on("exam-submit", (data) => {
    io.to(`exam_${data.testId}`).emit(
      "exam-submitted",
      data
    );
  });

};
