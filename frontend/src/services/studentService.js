
import api from "../api/axios";

/* =========================
   ✅ ACTIVE BACKEND APIS
========================= */
export const getStudentDashboard = () => {
  return api.get("/student/dashboard");
};

export const getStudentProfile = () => {
  return api.get("/user/profile");
};

export const updateStudentProfile = (data) => {
  return api.put("/user/profile", data);
};

export const getStudentTests = () => {
  return api.get("/student/tests");
};

export const attemptTest = (testId, data) => {
  return api.post(`/student/tests/${testId}/attempt`, data);
};

export const getStudentProgress = () => {
  return api.get("/student/progress");
};

/* =========================
   🧪 FUTURE / MOCK APIS
   (Backend not implemented yet)
========================= */
// Keep as-is, DO NOT USE IN UI YET
export const enrollInCourse = (courseId) => {
  return api.post(`/student/enroll/${courseId}`);
};  
export const submitAssignment = (assignmentId, data) => {
  return api.post(`/student/assignments/${assignmentId}/submit`, data);
};
export const getStudentCourses = () => {
  return api.get("/student/courses");
};
export const getStudentAssignments = () => {
  return api.get("/student/assignments");
};
export const getStudentGrades = () => {
  return api.get("/student/grades");
};
export const participateInDiscussion = (discussionId, data) => {
  return api.post(`/student/discussions/${discussionId}/participate`, data);
};
export const getDiscussionThreads = (discussionId) => {
  return api.get(`/student/discussions/${discussionId}/threads`);
};
export const takeQuiz = (quizId, data) => {
  return api.post(`/student/quizzes/${quizId}/take`, data);
};
export const getStudentQuizzes = () => {
  return api.get("/student/quizzes");
};
export const submitFeedback = (data) => {
  return api.post("/student/feedback", data);
};
export const getStudentNotifications = () => {
  return api.get("/student/notifications");
};
export const markNotificationAsRead = (notificationId) => {
  return api.post(`/student/notifications/${notificationId}/read`);
};
export const getStudentSchedule = () => {
  return api.get("/student/schedule");
};
export const joinLiveSession = (sessionId) => {
  return api.post(`/student/live-sessions/${sessionId}/join`);
};
export const downloadCourseMaterial = (materialId) => {
  return api.get(`/student/materials/${materialId}/download`, {
    responseType: "blob",
  });
};
export const getStudentCertificates = () => {
  return api.get("/student/certificates");
};
export const requestCertificate = (courseId) => {
  return api.post(`/student/certificates/request/${courseId}`);
};
export const getStudentMessages = () => {
  return api.get("/student/messages");
};
export const sendMessageToMentor = (mentorId, data) => {
  return api.post(`/student/messages/${mentorId}/send`, data);
};
export const getStudentStudyGroups = () => {
  return api.get("/student/study-groups");
};
export const joinStudyGroup = (groupId) => {
  return api.post(`/student/study-groups/${groupId}/join`);
};  
export const leaveStudyGroup = (groupId) => {
  return api.post(`/student/study-groups/${groupId}/leave`);
};
export const createStudyGroup = (data) => {
  return api.post("/student/study-groups/create", data);
};
export const getStudyGroupMembers = (groupId) => {
  return api.get(`/student/study-groups/${groupId}/members`);
};
export const postInStudyGroup = (groupId, data) => {
  return api.post(`/student/study-groups/${groupId}/post`, data);
};
export const getStudyGroupPosts = (groupId) => {
  return api.get(`/student/study-groups/${groupId}/posts`);
};
export const getStudentAchievements = () => {
  return api.get("/student/achievements");
};
export const getStudentBadges = () => {
  return api.get("/student/badges");
};
export const redeemBadge = (badgeId) => {
  return api.post(`/student/badges/${badgeId}/redeem`);
};
export const getStudentEvents = () => {
  return api.get("/student/events");
};
export const registerForEvent = (eventId) => {
  return api.post(`/student/events/${eventId}/register`);
};
export const getEventDetails = (eventId) => {
  return api.get(`/student/events/${eventId}/details`);
};
export const submitEventFeedback = (eventId, data) => {
  return api.post(`/student/events/${eventId}/feedback`, data);
};
export const getStudentResources = () => {
  return api.get("/student/resources");
};
export const downloadResource = (resourceId) => {
  return api.get(`/student/resources/${resourceId}/download`, {
    responseType: "blob",
  });
};
export const getStudentFAQs = () => {
  return api.get("/student/faqs");
};
export const searchFAQs = (query) => {
  return api.get(`/student/faqs/search`, {
    params: { q: query },
  });
};
export const getStudentSupportTickets = () => {
  return api.get("/student/support-tickets");
};
export const createSupportTicket = (data) => {
  return api.post("/student/support-tickets/create", data);
};  
export const getSupportTicketDetails = (ticketId) => {
  return api.get(`/student/support-tickets/${ticketId}/details`);
};
export const respondToSupportTicket = (ticketId, data) => {
  return api.post(`/student/support-tickets/${ticketId}/respond`, data);
};  
export const closeSupportTicket = (ticketId) => {
  return api.post(`/student/support-tickets/${ticketId}/close`);
};
export const getStudentLearningPaths = () => {
  return api.get("/student/learning-paths");
};
export const enrollInLearningPath = (pathId) => {
  return api.post(`/student/learning-paths/${pathId}/enroll`);
};
export const getLearningPathDetails = (pathId) => {
  return api.get(`/student/learning-paths/${pathId}/details`);
};
export const getLearningPathProgress = (pathId) => {
  return api.get(`/student/learning-paths/${pathId}/progress`);
};
export const completeLearningPathModule = (pathId, moduleId) => {
  return api.post(
    `/student/learning-paths/${pathId}/modules/${moduleId}/complete`
  );
};
export const getStudentCertificatesOfCompletion = () => {
  return api.get("/student/certificates-of-completion");
};
export const requestCertificateOfCompletion = (pathId) => {
  return api.post(`/student/certificates-of-completion/request/${pathId}`);
};
export const getStudentReferrals = () => {
  return api.get("/student/referrals");
};
export const referAFriend = (data) => {
  return api.post("/student/referrals/refer", data);
};
export const getReferralRewards = () => {
  return api.get("/student/referrals/rewards");
};
export const redeemReferralReward = (rewardId) => {
  return api.post(`/student/referrals/rewards/${rewardId}/redeem`);
};
export const getStudentLearningAnalytics = () => {
  return api.get("/student/learning-analytics");
};
export const getLearningRecommendations = () => {
  return api.get("/student/learning-recommendations");
};
export const getStudentSkillAssessments = () => {
  return api.get("/student/skill-assessments");
};
export const takeSkillAssessment = (assessmentId, data) => {
  return api.post(`/student/skill-assessments/${assessmentId}/take`, data);
};
export const getSkillAssessmentResults = (assessmentId) => {
  return api.get(`/student/skill-assessments/${assessmentId}/results`); 
};  
export const getStudentCareerServices = () => {
  return api.get("/student/career-services");
};
export const scheduleCareerCounseling = (data) => {
  return api.post("/student/career-services/schedule-counseling", data);
};
export const getCareerResources = () => { 
  return api.get("/student/career-services/resources");
};
export const applyForInternship = (data) => {
  return api.post("/student/career-services/apply-internship", data);
};  
export const getInternshipApplications = () => {
  return api.get("/student/career-services/internship-applications");
};
export const getInternshipApplicationStatus = (applicationId) => {
  return api.get(
    `/student/career-services/internship-applications/${applicationId}/status`
  );
};
export const withdrawInternshipApplication = (applicationId) => {
  return api.post(
    `/student/career-services/internship-applications/${applicationId}/withdraw`
  );
};
