document.addEventListener('click', function (e) {
    const selectorFrame = document.querySelector('.select_frame')
    if (!selectorFrame) {
        return
    }
    const isDisplay = selectorFrame.style.display
    if (isDisplay === '' || isDisplay === 'none') {
        return null
    }
    selectorFrame.style.display = 'none'
})