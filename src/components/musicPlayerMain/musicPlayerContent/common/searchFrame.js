window.onload = function () {
    const searchFrame = document.querySelector('.search_frame')
    document.addEventListener('click', function (e) {
        const isDisplay = searchFrame.style.display
        if (isDisplay === '' || isDisplay === 'none') {
            return null
        }
        searchFrame.style.display = 'none'
        // console.log(searchFrame.cssR)
    })
}