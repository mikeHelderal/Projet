import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';


const Alerte = (props: any) => {
    const [show, setShow] = useState();
    const [message, setMessage] = useState();
    const [variant, setVariant] = useState();


    useEffect(() => {
      console.log("Alerte");
        setMessage(props.message);
        setVariant(props.variant);
        setShow(props.show);
    },[message,variant,show])



  return (
        <Alert  show={show} variant={variant} onClose={() => {setShow(false)}} >        
          tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt       
      </Alert>
  )
}

export default Alert