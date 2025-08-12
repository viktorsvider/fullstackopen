const Notification = ({ notificationMessage, errorMessage }) => {
  if(notificationMessage) {return (
    <div
      style={{
        fontSize: '24px',
        color: 'black',
        background: 'green',
        borderColor: 'greenyellow',
        padding: '2px',
        display: 'inline',
        border: '5px',
      }}
    >
      {notificationMessage}
    </div>
  )}

  if(errorMessage) {
    return (
      <div
        style={{
          fontSize: '24px',
          color: 'black',
          background: 'red',
          borderColor: 'magenta',
          padding: '2px',
          display: 'inline',
          border: '5px',
        }}
      >
        {errorMessage}
      </div>
    )
  }
}

export default Notification