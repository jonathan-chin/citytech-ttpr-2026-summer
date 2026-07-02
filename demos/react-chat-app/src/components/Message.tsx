
// @ts-expect-error
const Message = ({text, name, timestamp}) => {
    return <>
      <p className='message'>
        {text}
        <br />
        {name} - {timestamp.toString()}
      </p>
    </>;
}

export default Message;