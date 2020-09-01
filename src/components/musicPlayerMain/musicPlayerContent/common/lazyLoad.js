export default function (target) {
    const imgs = document.querySelectorAll(target)
    // console.log(imgs)
    console.log(document.querySelectorAll())
    let flag = true
    let count = 0
    function lazyLoad() {
        if (flag === true) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = document.documentElement.clientHeight
            flag = false
            for (let i = count; i < imgs.length; i++) {
                if (imgs[i].offsetTop < scrollTop + clientHeight) {
                    if (imgs[i].getAttribute('src')) continue
                    imgs[i].src = imgs[i].getAttribute('data-src')
                    count++
                }
            }
            flag = true
        }
    }
    lazyLoad()
    document.addEventListener('scroll', lazyLoad)
}