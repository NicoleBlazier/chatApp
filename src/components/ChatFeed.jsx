import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';


const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    const logout = event => {
      window.localStorage.clear();
      window.location.reload();
    }

    const findUser = () => chat.people.map((person, index) => person.person.first_name === props.userName && (
      <div className='chat-login-center'>
        <div
          style={{
            backgroundImage: `url(${person.person.avatar})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '50px',
            height: '50px',
            float: 'left',
            textAligh: 'center',
          }}
        ></div>

        <div className="logout-buttons">
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    ));

    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
      <div
        key={`read_${index}`}
        className="read-receipt"
        style={{
          float: isMyMessage ? 'right' : 'left',
          backgroundImage: person.person.avatar && `url(${person.person.avatar})`
        }}
      />
    ));

    const renderMessages = () => {
      const keys = Object.keys(messages);

      return keys.map((key, index) => {
          const message = messages[key]
          const lastMessageKey = index === 0 ? null : keys[index - 1];
          const isMyMessage = userName === message.sender.username;

          return (
            <div key={`msg_${index}`} style={{ width: '100%'}}>
              <div className='message-block'>
                {isMyMessage
                  ? <MyMessage message={message}/>
                  : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>
                }
              </div>
              <div className='read-receipts' style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
                {renderReadReceipts(message, isMyMessage)}
              </div>
            </div>
          )
      })
    }

    if (!chat) return <div />;

    return (
      <div className='chat-feed'>
        <div className='chat-title-right'>
          <div>{findUser()}</div>
        </div>
        <div className='chat-title-container'>
          <div className='chat-title-center'>
            <div className='chat-title'>{chat.title}</div>
            <div className='chat-subtitle'>Active Members</div>
            <div className='chat-subtitle'>{chat.people.map((person) => `${person.person.username} `)}</div>
          </div>
        </div>
        {renderMessages()}
        <div style={{ height: '100px'}} />
        <div className='message-form-container'>
          <MessageForm {...props} chatId={activeChat}/>
        </div>
      </div>
    )
}

export default ChatFeed;
