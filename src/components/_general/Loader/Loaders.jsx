import { RotatingLines, ThreeDots } from  'react-loader-spinner'

export function LoaderCircle({strokeWidth, duration, width }) {
    return (
        <RotatingLines
            strokeColor="grey"
            strokeWidth={strokeWidth}
            animationDuration={duration}
            width={width}
            visible={true}
        />
    )
}

export function LoaderDots({hw, radius }) {
    return (
        <ThreeDots 
            height={hw} 
            width={hw} 
            radius={radius}
            color="black" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}
