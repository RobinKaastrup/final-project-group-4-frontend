function Message({ message }) {
  return (
    <div className="message">
      <img
        className="message-pic"
        src="https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_256,pg_1,t_base_params,w_256/v1575591291/avatars/000/161/315/161315-original.jpg?1575591291"
        alt="User avatar"
      />
      <span className="message-name">
        <b>User</b> {/* It is user for now */}
      </span>
      <p className="message-body">{message}</p>
    </div>
  );
}

export default Message;
