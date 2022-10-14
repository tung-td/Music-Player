
/*
    1. Render songs
    2. Scroll top
    3. Play/ pause/ seek
    4. CD rotate
    5. Next/ Previous
    6. Random
    7. Next/ Repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Señorita",
            singer: "Shawn Mendes x Camila Cabello",
            path: "https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/e0d59dcc7f8b96d5cf9a/6652135623353309218?authen=exp=1665858081~acl=/e0d59dcc7f8b96d5cf9a/*~hmac=beff8cbe4c460d7c9f3dffcd41fd2661",
            image: "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/c/e/e/f/ceefcdad646dce8d5efb9ed056e22e33.jpg"
        },
        {
            name: "Sunroof",
            singer: "Nicky Youre x Dazy",
            path: "https://mp3-s1-m-zmp3.zmdcdn.me/fdc4940e514fb811e15e/7229745453288750947?authen=exp=1665857782~acl=/fdc4940e514fb811e15e/*~hmac=7770894398b950884baa39d9a388a8cf",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/1/7/a/e/17ae054afcb12c3aad084cd5ce88c84d.jpg"
        },
        {
            name: "As It Was",
            singer: "Harry Styles",
            path: "https://vnso-zn-16-tf-mp3-s1-m-zmp3.zmdcdn.me/397dfae855a9bcf7e5b8/3316510322627274731?authen=exp=1665895869~acl=/397dfae855a9bcf7e5b8/*~hmac=f162495aaf2e15b55c9564ad01e0e9cc",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/3/5/5/c/355c9290d8b91bcf9f843b792fa05e8f.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Rex Orange County",
            path:
                "https://vnso-zn-16-tf-mp3-320s1-m-zmp3.zmdcdn.me/edaf402d706d9933c07c/7635354546918029300?authen=exp=1665896654~acl=/edaf402d706d9933c07c/*~hmac=04f6fa620877af9d45ec5688c37cbf2a",
            image: "https://media.pitchfork.com/photos/5daf7411515e4800080955b2/1:1/w_320,c_limit/pony.jpg"
        },
        {
            name: "Pluto Projector",
            singer: "Rex Orange County",
            path: "https://vnno-vn-6-tf-mp3-320s1-m-zmp3.zmdcdn.me/2f6793aa34edddb384fc/7608017747915900161?authen=exp=1665896776~acl=/2f6793aa34edddb384fc/*~hmac=ece7dca357e2ddfb961d2b61ebd17fc5",
            image:
                "https://media.pitchfork.com/photos/5daf7411515e4800080955b2/1:1/w_320,c_limit/pony.jpg"
        },
        {
            name: "Troublemaker",
            singer: "Olly Murs x Flo Rida",
            path: "https://vnno-vn-5-tf-mp3-320s1-m-zmp3.zmdcdn.me/c4aa6907e040091e5051/632175896883152569?authen=exp=1665897117~acl=/c4aa6907e040091e5051/*~hmac=8f650a389663327e78f7e120942a5b57",
            image: "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/5/0/2/d/502d5fa1fb7a4d4688cfab21d9165323.jpg"
        },
        {
            name: "Grow Up",
            singer: "Olly Murs",
            path: "https://vnno-vn-6-tf-mp3-320s1-m-zmp3.zmdcdn.me/4213d8bf51f8b8a6e1e9/4804052102389176125?authen=exp=1665897186~acl=/4213d8bf51f8b8a6e1e9/*~hmac=99d82b34c2f2761d15e4354507018804",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/8/9/b/0/89b0922d65dd038f30e51f9238573aa8.jpg"
        },
        {
            name: "Moves",
            singer: "Olly Murs x  Snoop Dogg",
            path: "https://vnso-zn-5-tf-mp3-320s1-m-zmp3.zmdcdn.me/fd9c498662c68b98d2d7/7493855688773216115?authen=exp=1665897252~acl=/fd9c498662c68b98d2d7/*~hmac=3b059ec00f75664740bf4c5fd0d23c34",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/8/9/b/0/89b0922d65dd038f30e51f9238573aa8.jpg"
        },
        {
            name: "Dance With Me Tonight",
            singer: "Olly Murs",
            path: "https://vnso-zn-23-tf-mp3-320s1-m-zmp3.zmdcdn.me/2da78308334cda12835d/8855363606247989612?authen=exp=1665897326~acl=/2da78308334cda12835d/*~hmac=04cdbfdfa28a67199fdb8b37d01e4449",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/covers/4/1/414d6f5d6d72c1405594a9bdf7583485_1322879872.jpg"
        },
        {
            name: "Nothing's Gonna Change My Love For You",
            singer: "Westlife",
            path: "https://mp3-320s1-m-zmp3.zmdcdn.me/c08a0085a5c14c9f15d0/4754418519380090596?authen=exp=1665897516~acl=/c08a0085a5c14c9f15d0/*~hmac=6c0ec25383886905067d7a432de951b4",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/covers/1/c/1c365655bf106969d67bdae5acf93b4a_1377083460.jpg"
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `
        })
        playlist.innerHTML = htmls.join('');
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10sec
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click play btn & pause btn
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()

            } else {
                audio.play()
            }
        }

        // Khi song đc play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song đc pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý bật tắt random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý next song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click()
            }
        }

        // Xử lý lặp lại song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {

                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xử lý khi click vào song option

            }
        }

    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex
        this.currentIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex === newIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        //Gán cấu hình từ config vào app
        this.loadConfig()

        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        //Lắng nghe và xử lý các sự kiện
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playlists
        this.render();

        // Hiển thị trạng thái ban đầu của btn repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start();
