import "./message.css";
import { formatDistanceToNow } from 'date-fns'

export default function Message({ message, own, photo }) {
  console.log(photo)

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? photo.minePhoto.data.image : photo.hisPhoto.data.image}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{formatDistanceToNow(new Date(message.createdAt), {includeSeconds: true})}</div>
    </div>
  );
}
