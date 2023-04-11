const MyMessage = ({ message }) => {
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt='message-attachment'
        className='my-message-image'
      />
    );
  }

  return (
    <div className='my-message'>
      {message.text}
    </div>
  );
};

export default MyMessage;
