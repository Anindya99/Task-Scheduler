import FirstButton from './FirstButton'

const Addbutton = ({text,onAdd,showAdd}) => {
    return (
        <div className="add_sec">
          <FirstButton text={text}
          color={showAdd ? 'red' : 'green'}
          onClick={onAdd}
          />
        </div>
    )
};
Addbutton.defaultProps={
  text:'Add',
}
export default Addbutton;
