export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }
    return(
        <>
            <button className="die"
                    style = {styles}
                    onClick={props.hold}
                    aria-pressed={props.isHeld}
                    aria-label={`Die with the value of ${props.value} and it is in ${props.isHeld ? "Green" : "White"}`}
            >
                {props.value}</button>
        </>
    )
}