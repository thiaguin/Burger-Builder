export const validateForm = (value, rules) => {
    let valid = true
    let changed = false

    if (rules) {
        if (rules.required) {
            valid = value.trim() !== '' && valid
            changed = true
        }
        if (rules.minLength) {
            valid = value.length >= rules.minLength && valid
            changed = true
        }
        if (rules.maxLength) {
            valid = value.length <= rules.maxLength && valid
            changed = true
        }

        if (rules.isEmail) {
            const emailRegex = /\S+@\S+\.\S+/
            changed = emailRegex.test(value)
        }
    }

    return changed ? valid : false
}
