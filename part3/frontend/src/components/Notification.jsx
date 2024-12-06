const Notification = ({ message, isError }) => {
  if (message === "") {
    return null;
  }

  const className = isError ? "error" : "notification";
  return <div className={className}>{message}</div>;
};

export default Notification;
