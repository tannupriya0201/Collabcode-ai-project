import api from "../api/axios";

/* =========================
   ✅ ACTIVE BACKEND APIS
========================= */

// mentor dashboard summary
export const getMentorDashboard = () => {
  return api.get("/mentor/dashboard");
};

// get mentor tests
export const getMentorTests = () => {
  return api.get("/mentor/tests");
};

// create test
export const createTest = (data) => {
  return api.post("/mentor/tests", data);
};

// delete test
export const deleteTest = (testId) => {
  return api.delete(`/mentor/tests/${testId}`);
};

/* =========================
   🧪 FUTURE / MOCK APIS
   (Backend not implemented yet)
========================= */

// assignments
export const createAssignment = (data) => {
  return api.post("/mentor/assignments", data);
};

export const getAssignments = () => {
  return api.get("/mentor/assignments");
};

// grading
export const gradeAssignment = (assignmentId, data) => {
  return api.post(`/mentor/assignments/${assignmentId}/grade`, data);
};

// analytics
export const getMentorAnalytics = () => {
  return api.get("/mentor/analytics");
};

// messaging
export const getMentorMessages = () => {
  return api.get("/mentor/messages");
};
export const sendMentorMessage = (data) => {
  return api.post("/mentor/messages", data);
};
// course management
export const createCourse = (data) => {
  return api.post("/mentor/courses", data);
};
export const getMentorCourses = () => {
  return api.get("/mentor/courses");
};
export const updateCourse = (courseId, data) => {
  return api.put(`/mentor/courses/${courseId}`, data);
};
export const deleteCourse = (courseId) => {
  return api.delete(`/mentor/courses/${courseId}`);
};  
// discussion forums
export const getMentorDiscussions = () => {
  return api.get("/mentor/discussions");
};  
export const postMentorDiscussion = (data) => {
  return api.post("/mentor/discussions", data);
};
export const replyToDiscussion = (discussionId, data) => {
  return api.post(`/mentor/discussions/${discussionId}/reply`, data);
};
// quizzes
export const createQuiz = (data) => {
  return api.post("/mentor/quizzes", data);
};
export const getMentorQuizzes = () => {
  return api.get("/mentor/quizzes");
};  
export const gradeQuiz = (quizId, data) => {
  return api.post(`/mentor/quizzes/${quizId}/grade`, data);
};
export const getQuizResults = (quizId) => {
  return api.get(`/mentor/quizzes/${quizId}/results`);
};
// student progress tracking
export const getMentorStudentProgress = () => {
  return api.get("/mentor/student-progress");
};
// resource sharing
export const uploadResource = (data) => {
  return api.post("/mentor/resources", data);
};
export const getMentorResources = () => {
  return api.get("/mentor/resources");
};
export const deleteResource = (resourceId) => {
  return api.delete(`/mentor/resources/${resourceId}`);
};
// live sessions
export const scheduleLiveSession = (data) => {
  return api.post("/mentor/live-sessions", data);
};
export const getMentorLiveSessions = () => {
  return api.get("/mentor/live-sessions");
};
export const cancelLiveSession = (sessionId) => {
  return api.delete(`/mentor/live-sessions/${sessionId}`);
};
// feedback collection
export const getMentorFeedback = () => {
  return api.get("/mentor/feedback");
};
export const respondToFeedback = (feedbackId, data) => {
  return api.post(`/mentor/feedback/${feedbackId}/respond`, data);
};
// notifications
export const getMentorNotifications = () => {
  return api.get("/mentor/notifications");
};
export const markMentorNotificationAsRead = (notificationId) => {
  return api.post(`/mentor/notifications/${notificationId}/read`);
};
// scheduling
export const getMentorSchedule = () => {
  return api.get("/mentor/schedule");
};
export const updateMentorAvailability = (data) => {
  return api.post("/mentor/schedule/availability", data);
};
// virtual classroom
export const startLiveSession = (sessionId) => {
  return api.post(`/mentor/live-sessions/${sessionId}/start`);
};
export const endLiveSession = (sessionId) => {
  return api.post(`/mentor/live-sessions/${sessionId}/end`);
};
// certifications
export const getMentorCertificates = () => {
  return api.get("/mentor/certificates");
};
export const approveCertificateRequest = (requestId) => {
  return api.post(`/mentor/certificates/${requestId}/approve`);
};
export const rejectCertificateRequest = (requestId) => {
  return api.post(`/mentor/certificates/${requestId}/reject`);
};
// study groups
export const getMentorStudyGroups = () => {
  return api.get("/mentor/study-groups");
};  
export const manageStudyGroup = (groupId, data) => {
  return api.post(`/mentor/study-groups/${groupId}/manage`, data);
};
// achievements
export const getMentorAchievements = () => {
  return api.get("/mentor/achievements");
};
export const awardMentorAchievement = (data) => {
  return api.post("/mentor/achievements/award", data);
};
export const revokeMentorAchievement = (achievementId) => {
  return api.post(`/mentor/achievements/${achievementId}/revoke`);
};
// peer reviews
export const getPeerReviews = () => {
  return api.get("/mentor/peer-reviews");
};
export const submitPeerReview = (data) => {
  return api.post("/mentor/peer-reviews/submit", data);
};
// gamification features
export const getMentorGamificationStatus = () => {
  return api.get("/mentor/gamification-status");
};  
export const updateMentorGamificationSettings = (data) => {
  return api.post("/mentor/gamification-settings", data);
};
// mentorship programs
export const getMentorshipPrograms = () => {
  return api.get("/mentor/mentorship-programs");
};
export const enrollInMentorshipProgram = (programId) => {
  return api.post(`/mentor/mentorship-programs/${programId}/enroll`);
};
export const leaveMentorshipProgram = (programId) => {
  return api.post(`/mentor/mentorship-programs/${programId}/leave`);
};
// mentor collaborations
export const getMentorCollaborations = () => {
  return api.get("/mentor/collaborations");
};
export const initiateMentorCollaboration = (data) => {
  return api.post("/mentor/collaborations/initiate", data);
};
export const respondToMentorCollaboration = (collaborationId, data) => {
  return api.post(`/mentor/collaborations/${collaborationId}/respond`, data);
};
// mentor profiles
export const getMentorProfile = () => {
  return api.get("/mentor/profile");
};
export const updateMentorProfile = (data) => {
  return api.put("/mentor/profile", data);
};
export const uploadMentorAvatar = (data) => {
  return api.post("/mentor/profile/avatar", data);
};
// mentor settings
export const getMentorSettings = () => {
  return api.get("/mentor/settings");
};
export const updateMentorSettings = (data) => {
  return api.post("/mentor/settings", data);
};
// mentor notifications settings
export const getMentorNotificationSettings = () => {
  return api.get("/mentor/notifications/settings");
};  
export const updateMentorNotificationSettings = (data) => {
  return api.post("/mentor/notifications/settings", data);
};
// mentor password management
export const changeMentorPassword = (data) => {
  return api.post("/mentor/change-password", data);
};
// mentor two-factor authentication
export const enableMentorTwoFactorAuth = () => {
  return api.post("/mentor/2fa/enable");
};
export const disableMentorTwoFactorAuth = () => {
  return api.post("/mentor/2fa/disable");
};
export const verifyMentorTwoFactorAuth = (data) => {
  return api.post("/mentor/2fa/verify", data);
};
// mentor activity logs
export const getMentorActivityLogs = () => {
  return api.get("/mentor/activity-logs");
};
// mentor billing and subscriptions
export const getMentorBillingInfo = () => {
  return api.get("/mentor/billing");
};
export const updateMentorSubscription = (data) => {
  return api.post("/mentor/billing/subscription", data);
};
export const getMentorInvoices = () => {
  return api.get("/mentor/billing/invoices");
};
export const downloadMentorInvoice = (invoiceId) => {
  return api.get(`/mentor/billing/invoices/${invoiceId}/download`);
};
// mentor referrals
export const getMentorReferrals = () => {
  return api.get("/mentor/referrals");
};  
export const sendMentorReferral = (data) => {
  return api.post("/mentor/referrals/send", data);
};
export const getMentorReferralRewards = () => {
  return api.get("/mentor/referrals/rewards");
};  
// mentor service feedback
export const submitMentorServiceFeedback = (data) => {
  return api.post("/mentor/service-feedback", data);
};
// mentor resource analytics
export const getMentorResourceAnalytics = () => {
  return api.get("/mentor/resource-analytics");
};
// mentor content recommendations
export const getMentorContentRecommendations = () => {
  return api.get("/mentor/content-recommendations");
};
// mentor skill assessments
export const getMentorSkillAssessments = () => {
  return api.get("/mentor/skill-assessments");
};
export const createMentorSkillAssessment = (data) => {
  return api.post("/mentor/skill-assessments/create", data);
};
export const getMentorSkillAssessmentResults = (assessmentId) => {
  return api.get(`/mentor/skill-assessments/${assessmentId}/results`);
};
export const gradeMentorSkillAssessment = (assessmentId, data) => {
  return api.post(`/mentor/skill-assessments/${assessmentId}/grade`, data);
};  
export const getMentorSkillAssessmentAnalytics = () => {
  return api.get("/mentor/skill-assessments/analytics");
};
export const getMentorSkillAssessmentRecommendations = () => {
  return api.get("/mentor/skill-assessments/recommendations");
};  
export const assignMentorSkillAssessmentToStudent = (assessmentId, studentId) => {
  return api.post(
    `/mentor/skill-assessments/${assessmentId}/assign/${studentId}`
  );
};  
export const getAssignedMentorSkillAssessments = (studentId) => {
  return api.get(`/mentor/skill-assessments/assigned/${studentId}`);
};
export const getMentorSkillAssessmentDetails = (assessmentId) => {
  return api.get(`/mentor/skill-assessments/${assessmentId}/details`);
};
export const updateMentorSkillAssessment = (assessmentId, data) => {
  return api.put(`/mentor/skill-assessments/${assessmentId}`, data);
};
export const deleteMentorSkillAssessment = (assessmentId) => {
  return api.delete(`/mentor/skill-assessments/${assessmentId}`);
};  
export const resendMentorSkillAssessmentInvitation = (assessmentId, studentId) => {
  return api.post(
    `/mentor/skill-assessments/${assessmentId}/resend-invitation/${studentId}`
  );
};
export const getMentorSkillAssessmentQuestions = (assessmentId) => {
  return api.get(`/mentor/skill-assessments/${assessmentId}/questions`);
};