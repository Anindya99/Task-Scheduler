import {BsPlusLg} from 'react-icons/bs'

const FirstButton=({text,color,onClick})=>{
    return(
        <div className='firstbutton'>
            <BsPlusLg 
             style={{ backgroundColor: color }}
            className='btn '
            onClick={onClick}>
        
            </BsPlusLg>
        </div>
        
    )
}

export default  FirstButton;