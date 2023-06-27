
function Button({btnClass, btnName, disabled, onClick}) {
    return (
        <button className={btnClass} disabled={disabled} onClick={onClick}>
            {btnName}
        </button>
    )
}

export default Button;