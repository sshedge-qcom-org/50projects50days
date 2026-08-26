const codes = document.querySelectorAll('.code')

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(/^[0-9]$/.test(e.key)) {
            codes[idx].value = ''
            if(codes[idx + 1]) setTimeout(() => codes[idx + 1].focus(), 10)
        } else if(e.key === 'Backspace') {
            if(codes[idx - 1]) setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})