const Notification = ({ message, messageType }) => {
  const getColor = (messageType) => {
    let color;
    if (messageType === "error") {
      color = "red";
    } else if (messageType === "success") {
      color = "green";
    } else {
      color = "";
    }
    return color;
  };

  const notificationStyle = {
    color: getColor(messageType),
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle} className="error">
      {message}
    </div>
  );
};

export default Notification;
