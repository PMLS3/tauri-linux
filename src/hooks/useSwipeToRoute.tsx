import { useEffect } from "react"
import { To, useNavigate } from "react-router-dom"

const useSwipeToRoute = (buttonRef: any, routePath: To) => {
  const history = useNavigate()

  const handleButtonClick = () => {
    console.log("handleButtonClick", routePath)
    history(routePath)
  }

  useEffect(() => {
    const handleTouchEnd = (event: any) => {
      const touch = event.changedTouches[0]

      // Check if the touch event originated from the button
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const isTouchOnButton =
          touch.clientX >= buttonRect.left &&
          touch.clientX <= buttonRect.right &&
          touch.clientY >= buttonRect.top &&
          touch.clientY <= buttonRect.bottom

        if (isTouchOnButton) {
          // Allow default behavior for button touch
          handleButtonClick()
        }
      }
    }

    window.addEventListener("touchend", (event: TouchEvent) => handleTouchEnd(event))

    return () => {
      const handleTouchEnd = (event: TouchEvent) => {
        const touch = event.changedTouches[0]

        // Check if the touch event originated from the button
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect()
          const isTouchOnButton =
            touch.clientX >= buttonRect.left &&
            touch.clientX <= buttonRect.right &&
            touch.clientY >= buttonRect.top &&
            touch.clientY <= buttonRect.bottom

          if (isTouchOnButton) {
            // Allow default behavior for button touch
            handleButtonClick()
          }
        }
      }

      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [buttonRef, handleButtonClick])

  return handleButtonClick
}

export default useSwipeToRoute
