import React from 'react';
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Linkify from 'react-linkify';
import Overlay from './Overlay';
import { Picker } from 'emoji-mart';

const ChatWindow = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 700px;
  box-sizing: border-box;
`
const ChatPanel = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px ;
  z-index: 1;
  color: #fafafa !important;
  border-bottom: 1px solid;
`

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`

const NoDots = styled.div`
  hr {
    visibility: hidden;
  }
`

const OutputText = styled.div`
  white-space: normal !important;
  word-break: break-all !important;
  overflow: initial !important;
  width: 100%;
  height: auto !important;
  color: #000000 !important;
`

const InputPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  align-self: center;
  // border-top: 1px solid #fafafa;
`

const ChatroomImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
`

const Scrollable = styled.div`
  height: 100%;
  overflow: auto;
`

export default class Chatroom extends React.Component {
  constructor(props, context) {
    super(props, context)

    const { chatHistory } = props

    this.state = {
      chatHistory,
      input: ''
    }

    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.updateChatHistory = this.updateChatHistory.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }

  componentDidMount() {
    this.props.registerHandler(this.onMessageReceived)
    this.scrollChatToBottom()
  }

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  componentWillUnmount() {
    this.props.unregisterHandler()
  }

  onInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  // addEmoji(emojiObject) {
  //   this.setState({
  //     input: this.state.input + emojiObject.native
  //   })
  // };

  onSendMessage() {
    if (!this.state.input)
      return

    this.props.onSendMessage(this.state.input, (err) => {
      if (err)
        return console.error(err)

      return this.setState({ input: '' })
    })
  }

  onMessageReceived(entry) {
    console.log('onMessageReceived:', entry)
    this.updateChatHistory(entry)
    return
  }

  updateChatHistory(entry) {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
    return
  }

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
  }

  render() {
    console.log("", this.state.chatHistory);
    return (
      <div style={{ height: '100%' }}>
        <ChatWindow>
          <Header>
            <Title>
              {this.props.chatroom.name}
            </Title>
            <RaisedButton
              primary
              icon={
                <FontIcon
                  style={{ fontSize: 24 }}
                  className="material-icons"
                >
                  {'close'}
                </FontIcon>
              }
              onClick={this.props.onLeave}
            />
          </Header>
          {/* <ChatroomImage
            src={this.props.chatroom.image}
            alt=""
          /> */}
          <ChatPanel style={{ backgroundColor: 'white' }}>
            <Scrollable innerRef={(panel) => { this.panel = panel; }}>
              <List style={{ backgroundColor: 'white' }}>
                {
                  this.state.chatHistory.map(
                    ({ user, message, event }, i) => [
                      <NoDots>
                        <ListItem
                          key={i}
                          style={{ color: '#000000' }}
                          leftAvatar={<Avatar src={user.image} />}
                          primaryText={`${user.name} ${event || ''}`}
                          secondaryText={
                            message &&
                            // <OutputText>
                            <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>{message}</Linkify>
                            // </OutputText>
                          }
                        />
                      </NoDots>,
                      <Divider inset />
                    ]
                  )
                }
              </List>
            </Scrollable>
            <div>

              {/* <span>
                <Picker onSelect={(emoji)=>this.addEmoji(emoji)}
                perLine={9}
                showPreview={false}
                />
                <Picker
                perLine={6}
                 style={{  width : '700px', height : '200px', backgroundColor: "red", flexWrap:"wrap" }}
                  />
              </span> */}

            </div>
            <InputPanel>
              <TextField
                textareaStyle={{ color: '#000000' }}
                style={{ width: '600px' }}
                hintStyle={{ color: '#fafafa' }}
                floatingLabelStyle={{ color: '#CCCCCC' }}
                hintText="Enter a message."
                floatingLabelText="Enter a message."
                multiLine
                rows={1}
                rowsMax={4}
                onChange={this.onInput}
                value={this.state.input}
                onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
              />

              <FloatingActionButton
                onClick={this.onSendMessage}
                style={{ marginLeft: 20 }}
              >

                <FontIcon
                  style={{ fontSize: 28, color: '#CCCCCC' }}
                  className="material-icons"
                  onClick={this.onSendMessage}
                >
                  {'send'}
                </FontIcon>
              </FloatingActionButton>

            </InputPanel>
          </ChatPanel>
          <Overlay
            opacity={0.6}
            background="#111111"
          />
        </ChatWindow>
      </div>
    )
  }
}
