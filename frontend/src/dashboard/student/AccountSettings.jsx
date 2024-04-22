const AccountSettings = () => {
  return (
    <div>
      AccountSettings
      <button
        onClick={() => {
          localStorage.removeItem("user_type");
          localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default AccountSettings;
