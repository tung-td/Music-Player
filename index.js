
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
            path: "../Music-Player/Music/Senorita - Shawn Mendes_ Camila Cabello.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/c/e/e/f/ceefcdad646dce8d5efb9ed056e22e33.jpg"
        },
        {
            name: "Sunroof",
            singer: "Nicky Youre x Dazy",
            path: "../Music-Player/Music/Sunroof - Nicky Youre_ Dazy.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/1/7/a/e/17ae054afcb12c3aad084cd5ce88c84d.jpg"
        },
        {
            name: "As It Was",
            singer: "Harry Styles",
            path: "../Music-Player/Music/As It Was - Harry Styles.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/3/5/5/c/355c9290d8b91bcf9f843b792fa05e8f.jpg"
        },
        {
            name: "Best Friend",
            singer: "Rex Orange County",
            path: "../Music-Player/Music/Best Friend - Rex Orange County.mp3",
            image: "https://media.pitchfork.com/photos/5daf7411515e4800080955b2/1:1/w_320,c_limit/pony.jpg"
        },
        {
            name: "Television / So Far So Good",
            singer: "Rex Orange County",
            path: "../Music-Player/Music/Television_ So Far So Good - Rex Orange.mp3",
            image:
                "https://media.pitchfork.com/photos/5daf7411515e4800080955b2/1:1/w_320,c_limit/pony.jpg"
        },
        {
            name: "Troublemaker",
            singer: "Olly Murs x Flo Rida",
            path: "../Music-Player/Music/Troublemaker - Olly Murs_ Flo Rida.mp3",
            image: "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/5/0/2/d/502d5fa1fb7a4d4688cfab21d9165323.jpg"
        },
        {
            name: "Grow Up",
            singer: "Olly Murs",
            path: "../Music-Player/Music/Grow Up - Olly Murs.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/8/9/b/0/89b0922d65dd038f30e51f9238573aa8.jpg"
        },
        {
            name: "Moves",
            singer: "Olly Murs x  Snoop Dogg",
            path: "../Music-Player/Music/Moves - Olly Murs_ Snoop Dogg.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/8/9/b/0/89b0922d65dd038f30e51f9238573aa8.jpg"
        },
        {
            name: "Dance With Me Tonight",
            singer: "Olly Murs",
            path: "../Music-Player/Music/Dance With Me Tonight - Olly Murs.mp3",
            image:
                "https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/covers/4/1/414d6f5d6d72c1405594a9bdf7583485_1322879872.jpg"
        },
        {
            name: "Nothing's Gonna Change My Love For You",
            singer: "Westlife",
            path: "../Music-Player/Music/Nothing_s Gonna Change My Love For You -.mp3",
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
