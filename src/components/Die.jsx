export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }
    return(
        <>
            <button className="die"
                    style = {styles}
                    onClick={props.hold}
            >
                {props.value}</button>
        </>
    )
}