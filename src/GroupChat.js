import { Redirect } from "react-router-dom";
import chat from "../lib/chat";
import config from "../config";
class Groupchat extends React.Component {
  constructor(props) {
    super(props);
this.state = {
      receiverID: "",
      messageText: null,
    groupMessage: [],
    cls: [],
      user: {},
      isAuthenticated: true
    };
this.GUID = config.GUID;
  }
sendMessage = () => {
    chat.sendGroupMessage(this.GUID, this.state.messageText).then(
      message => {
        console.log("Message sent successfully:", message);
        this.setState({ messageText: null });
      },
      error => {
        if (error.code === "ERR_NOT_A_MEMBER") {
          chat.joinGroup(this.GUID).then(response => {
            this.sendMessage();
          });
        }
      }
    );
  };
scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    chat.scrollTop = chat.scrollHeight;
  };
handleSubmit = event => {
    event.preventDefault();
    this.sendMessage();
    event.target.reset();
  };
handleChange = event => {
    this.setState({ messageText: event.target.value });
  };
getUser = () => {
    chat
      .getLoggedinUser()
      .then(user => {
        console.log("user details:", { user });
        this.setState({ user });
      })
      .catch(({ error }) => {
        if (error.code === "USER_NOT_LOGED_IN") {
          this.setState({
            isAuthenticated: false
          });
        }
      });
  };
messageListener = () => {
    chat.addMessageListener((data, error) => {
      if (error) return console.log(`error: ${error}`);
      this.setState(
        prevState => ({
          groupMessage: [...prevState.groupMessage, data]
        }),
        () => {
          this.scrollToBottom();
        }
      );
    });
};

messageClassifier = ( textClassifier ) => {
    chat.addMessageListener((data,error) => {
	if (error) {
	    return console.log(`error: ${error}`);
	}
	// do whatever processing with textCLassifier
	// such as setting state
	var classification = textClassifier( data )
	this.setState(
            prevState => ({
		cls: [...prevState.cls, classification]
            })
	);
	
    });
};
    
componentDidMount() {
    this.getUser();
    this.messageListener();
    this.messageClassifier( (msg) => 1 );// change this
    // chat.joinGroup(this.GUID)
  }
render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="chatWindow">
        <ul className="chat" id="chatList">
          {this.state.groupMessage.map(data => (
            <div key={data.id}>
              {this.state.user.uid === data.sender.uid ? (
                <li className="self">
                  <div className="msg">
                    <p>{data.sender.uid}</p>
                    <div className="message"> {data.data.text}</div>
                  </div>
                </li>
              ) : (
                <li className="other">
                  <div className="msg">
                    <p>{data.sender.uid}</p>
                   <div className="message"> {data.data.text} </div>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>
        <div className="chatInputWrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              className="textarea input"
              type="text"
              placeholder="Enter your message..."
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Groupchat;
