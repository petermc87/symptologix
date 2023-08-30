'use client'

// This button is a client component!
// Use the standard react button Component.
import React, { ComponentPropsWithoutRef } from 'react'

// Declare the type for the button as the html element.
type Props = ComponentPropsWithoutRef<'button'> & {
    // The type that needs to be defined is the clicking action since its a client
    // component performing a serveside action in the same component.
    onClick?: () => Promise<void> | void
}

// The button component type is a React functional component taking the Props types in.
const Button: React.FC<Props> = ({ onClick, ...props}) => {
    return (
        <button 
            {...props}
            // It is just giving back a Promise and not returning anything as per the clicking action.
            // This is only if there is a click present. Otherwise, do nothing.
            onClick={async () => {
                if (onClick) await onClick()
            }}
        />
    )
}

export default Button