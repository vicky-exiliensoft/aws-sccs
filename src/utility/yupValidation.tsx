import * as Yup from "yup";

export const changPassword = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required").min(6, "New Password must be at least 6 characters"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm New Password is required"),
});
// adding new  rules schema's for validation
export const newRulesValidation = Yup.object().shape({
  newRuleName: Yup.string().required("Rule Name is required"),
  newRuleCondition: Yup.string().required("Rule Condition is required"),
  newRuleAction: Yup.string().required("Rule Action is required"),
});
