import "./Button.css";

interface ButtonProps{
    text: string;
    onClick?: () => void;
}

function ButtonTsx(props: ButtonProps) {
    const {text, onClick} = props
  return (
    <>
      <a
        className="btn btn-primary"        
        role="button"
        onClick={onClick}
        style={{            
            
            "background-color": "#C65D1A",
            "border":"0px",
            "fontWeight":"bold",
            "maxWidth":"155px"
        }}
      >
        {text}
      </a>
    </>
  );
}

export default ButtonTsx;
