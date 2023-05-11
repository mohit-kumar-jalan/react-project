export const NOTIFICATIONS_PAGE_SIZE = 20;
export const REQUIRED_ACTIONS_PAGE_SIZE = 20;
export const DEFAULT_DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A";
export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

export const filterActivityOptions: any = [
  {
    name: "APPT_REQUEST",
    value: "APPT_REQUEST",
    label: "Appt Request",
    color: "#f2a039",
  },
  { name: "FORM", value: "FORM", label: "Form", color: "#5759e6" },
  {
    name: "APPOINTMENT",
    value: "APPOINTMENT",
    label: "Appointment",
    color: "#59a93f",
  },
  { name: "PAYMENT", value: "PAYMENT", label: "Payment", color: "#3b82b9" },
  { name: "REVIEW", value: "REVIEW", label: "Review", color: "#2e2e2e" },
  { name: "FEEDBACK", value: "FEEDBACK", label: "Feedback", color: "#dc5f5d" },
];

export const actionFilterMap: any = {
  APPT_REQUEST: {
    text: "Appt Request",
    filters: ["AR", "AC", "ASF"],
    background: "#f6d9b8",
    color: "#f2a039",
  },
  FORM: {
    text: "Form",
    filters: ["UPFS", "FSRS", "FURAS", "FWAPS"],
    background: "#dfdef9",
    color: "#5759e6",
  },
  APPOINTMENT: {
    text: "Appointment",
    filters: ["CR", "UMR"],
    background: "#d9f4d8",
    color: "#62ae4a",
  },
  PAYMENT: {
    text: "Payment",
    filters: ["PR"],
    background: "#c4d8e8",
    color: "#4588bd",
  },
  REVIEW: {
    text: "Review",
    filters: ["URR"],
    background: "#c7c7c9",
    color: "#2e2e2e",
  },
  FEEDBACK: {
    text: "Feedback",
    filters: ["FR"],
    background: "#eec2c2",
    color: "#dc605e",
  },
};

export const actionEventTypeMap: any = {
  UNFAVORABLE_REVIEW_RECEIVED: "URR",
  UNCLASSIFIED_MESSAGE_RECEIVED: "UMR",
  CALLBACK_REQUESTED: "CR",
  FEEDBACK_RECEIVED: "FR",
  APPOINTMENT_REQUESTED: "AR",
  APPOINTMENT_SYNC_FAILED: "ASF",
  APPOINTMENT_CONFLICTED: "AC",
  PAYMENT_RECEIVED: "PR",
  GENERAL_FORM_SUBMISSION_PRACTICE_ALERT: "FWAPS",
  FORM_SUBMISSION_REQUIRE_STAFF_SIGNATURE: "FSRS",
  UNKNOWN_PATIENT_FORM_SUBMITTED: "UPFS",
  GENERAL_FORM_SUBMISSION_UNKNOWN_REFERRAL_ALERT: "FURAS",
  GENERAL_FORM_SUBMISSION_REQUIRE_DOCTOR_SIGNATURE: "FRDS",
};

export const actionStatus: any = {
  PENDING: "pending",
  IGNORED: "ignored",
  COMPLETED: "completed",
};

export const actionDescriptionMap: any = {};

export const notificationFilterMap: any = {
  APPT_REQUEST: {
    text: "Appt Request",
    filters: ["CA", "ARA"],
    background: "#f6d9b8",
    color: "#f2a039",
  },
  FORM: {
    text: "Form",
    filters: ["FS"],
    background: "#dfdef9",
    color: "#5759e6",
  },
  APPOINTMENT: {
    text: "Appointment",
    filters: ["AC"],
    background: "#d9f4d8",
    color: "#62ae4a",
  },
  PAYMENT: {
    text: "Payment",
    filters: ["PR"],
    background: "#c4d8e8",
    color: "#4588bd",
  },
  REVIEW: {
    text: "Review",
    filters: ["RR"],
    background: "#c7c7c9",
    color: "#2e2e2e",
  },
  FEEDBACK: {
    text: "Feedback",
    filters: [],
    background: "#f6dcdb",
    color: "#dc605e",
  },
};

export const notificationEventTypeMap: any = {
  REVIEW_RECEIVED: "RR",
  APPOINTMENT_CONFIRMED: "AC",
  APPOINTMENT_REQUEST_ACCEPTED: "ARA",
  CONFLICTED_APPOINTMENT: "CA",
  PAYMENT_RECEIVED: "PR",
  FORM_SUBMITTED: "FS",
};

export const notificationStatus: any = {
  UNREAD: "unread",
  MARKED_AS_READ: "read",
};

export const notificationDescriptionMap: any = {};
