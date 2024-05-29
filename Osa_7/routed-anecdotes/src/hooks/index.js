import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

// export const useResetField = (initialValues) => {
//     const [values, setValues] = useState(initialValues)

//     const onChange = (e) => {
//         const {name, value} = e.target;
//         setValues({
//             ...values,
//             [name]:value,
//         })
//     }
//     const resetValues = () => {
//         setValues(initialValues)
//     }

//     return {
//         resetValues,
//     }
// }