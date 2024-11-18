import { generate } from 'otp-generator'

export const generateOtp = () => {
    return generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
    })
}
