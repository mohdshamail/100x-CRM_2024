export const ForgotPasswordFormData = [
    {
      label: "Email address",
      placeholder: "Enter Email address",
      type: "text",
      name: "email",
      secureTextEntry: false,
      leftIcon: "account",
    },
]


export const changePasswordFormData = [
    {
      label: "Old Password",
      placeholder: "Enter Old Password",
      type: "text",
      name: "oldPassword",
      secureTextEntry: false,
      leftIcon: "lock",
      helperText: "Enter Password sent on your Email to verify it's you",
    },
    {
      label: "New Password",
      placeholder: "Enter New Password",
      type: "text",
      name: "newPassword",
      secureTextEntry: true,
      leftIcon: "lock",
    },
    {
      label: "Confirm New Password",
      placeholder: "Confirm New Password",
      type: "text",
      name: "confirmNewPassword",
      secureTextEntry: true,
      leftIcon: "lock",
    },
  ];
  