const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  console.log(`${message} shown`);
  return <div className="notification">{message}</div>;
};

export default Notification;
