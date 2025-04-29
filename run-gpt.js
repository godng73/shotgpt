export default async function runGPT(filePath) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Result from GPT.....')
        }, 4000)
    })
}